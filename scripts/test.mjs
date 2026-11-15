import { readFile, access } from 'node:fs/promises';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from '../src/pages/registry.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

function outputFor(page) {
  if (page.output) return page.output;
  if (page.path === '/') return 'index.html';
  return `${page.path.replace(/^\/|\/$/g, '')}/index.html`;
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name] ?? match);
}

function parseAttributes(source) {
  const attrs = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = pattern.exec(source))) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs[name] = decode(value);
  }
  return attrs;
}

// Minimal tree builder for the HTML this project emits.
function parseHtml(html) {
  const rootNode = { tag: '#root', attrs: {}, children: [], parent: null };
  let current = rootNode;
  let index = 0;
  const textOf = raw =>
    decode(
      raw
        .replace(/<![^>]*>/g, '')
        .replace(/<\?[^>]*>/g, '')
        .replace(/<\/?[a-zA-Z][^>]*>/g, ' ')
    ).replace(/\s+/g, ' ');

  while (index < html.length) {
    const next = html.indexOf('<', index);
    if (next === -1) {
      current.children.push({ text: html.slice(index) });
      break;
    }
    if (next > index) current.children.push({ text: html.slice(index, next) });

    if (html.startsWith('<!--', next)) {
      const end = html.indexOf('-->', next + 4);
      index = end === -1 ? html.length : end + 3;
      continue;
    }

    if (html.startsWith('<!', next)) {
      index = html.indexOf('>', next) + 1;
      continue;
    }

    const close = html.indexOf('>', next);
    if (close === -1) break;
    const raw = html.slice(next + 1, close);
    index = close + 1;

    if (raw.startsWith('/')) {
      const name = raw.slice(1).trim().toLowerCase();
      let node = current;
      while (node && node.tag !== name) node = node.parent;
      if (node && node.parent) current = node.parent;
      continue;
    }

    const space = raw.search(/\s/);
    const selfClosing = raw.endsWith('/');
    const name = (space === -1 ? raw : raw.slice(0, space)).replace(/\/$/, '').toLowerCase();
    const attributes = parseAttributes(space === -1 ? '' : raw.slice(space));

    if (name === 'script' || name === 'style') {
      const end = html.toLowerCase().indexOf(`</${name}`, index);
      const inner = end === -1 ? html.slice(index) : html.slice(index, end);
      const node = { tag: name, attrs: attributes, children: [{ text: inner }], parent: current };
      current.children.push(node);
      if (end === -1) break;
      index = html.indexOf('>', end) + 1;
      continue;
    }

    const node = { tag: name, attrs: attributes, children: [], parent: current };
    current.children.push(node);
    if (!VOID.has(name) && !selfClosing) current = node;
  }

  return rootNode;
}

function walk(node, visit) {
  for (const child of node.children) {
    if (child.tag) {
      if (visit(child) === false) continue;
      walk(child, visit);
    }
  }
}

function textContent(node) {
  if (node.text !== undefined) return node.text;
  return node.children.map(textContent).join(' ').replace(/\s+/g, ' ').trim();
}

function find(node, predicate, results = []) {
  walk(node, child => {
    if (predicate(child)) results.push(child);
  });
  return results;
}

function idsIn(node) {
  return new Set(find(node, child => child.attrs.id).map(child => child.attrs.id));
}

const failures = [];
const warnings = [];
const stats = { routes: 0, links: 0, images: 0, headings: 0, ids: 0, forms: 0 };

function fail(route, check, message) {
  failures.push({ route, check, message });
}

function warn(route, check, message) {
  warnings.push({ route, check, message });
}

const exists = async path => {
  try {
    await access(join(root, path));
    return true;
  } catch {
    return false;
  }
};

function resolveHref(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  if (clean === '/') return { file: 'index.html', route: '/' };
  const trimmed = clean.replace(/^\//, '');
  if (/\.[a-z0-9]+$/i.test(trimmed)) return { file: trimmed, route: clean };
  return { file: `${trimmed.replace(/\/$/, '')}/index.html`, route: `${trimmed.replace(/\/$/, '')}/` };
}

const documents = new Map();

async function load(route, file) {
  const html = await readFile(join(root, file), 'utf8');
  const doc = parseHtml(html);
  documents.set(route, { doc, html, file });
  return { doc, html, file };
}

function collectText(node, buffer = []) {
  if (node.text !== undefined) {
    if (node.text.trim()) buffer.push(node.text.trim());
  } else {
    for (const child of node.children) collectText(child, buffer);
  }
  return buffer;
}

function accessibleName(node) {
  const labelledBy = (node.attrs['aria-labelledby'] || '')
    .split(/\s+/)
    .filter(Boolean)
    .map(id => {
      const root = node.parentLibRoot || node;
      const target = find(root, child => child.attrs.id === id)[0];
      return target ? textContent(target) : '';
    })
    .join(' ');
  return (
    node.attrs['aria-label'] ||
    labelledBy ||
    node.attrs.title ||
    textContent(node) ||
    find(node, child => child.tag === 'img' && child.attrs.alt)[0]?.attrs.alt ||
    ''
  ).trim();
}

function attachRoots(doc) {
  walk(doc, child => {
    child.parentLibRoot = doc;
  });
}

const routes = PAGES.map(page => ({ route: page.path || page.output, file: outputFor(page), sitemap: Boolean(page.sitemap) }));
const titles = new Map();

for (const { route, file } of routes) {
  stats.routes += 1;
  const { doc, html } = await load(route, file);
  attachRoots(doc);

  const htmlNode = find(doc, node => node.tag === 'html')[0];
  if (!htmlNode || !/^en(-|$)/.test(htmlNode.attrs.lang || '')) fail(route, 'language', 'html lang attribute is not English');

  const isRedirect = Boolean(find(doc, node => node.tag === 'meta' && node.attrs['http-equiv'] === 'refresh')[0]);
  const noindex = /noindex/.test(find(doc, node => node.tag === 'meta' && node.attrs.name === 'robots')[0]?.attrs.content || '');
  const titleNode = find(doc, node => node.tag === 'title')[0];
  const title = titleNode ? textContent(titleNode) : '';
  if (!title) fail(route, 'title', 'missing <title>');
  else {
    if (!isRedirect && title.length > 72) warn(route, 'title', `${title.length} characters`);
    if (titles.has(title) && !isRedirect) fail(route, 'title', `duplicate title also used by ${titles.get(title)}`);
    else if (!isRedirect) titles.set(title, route);
  }

  const description = find(doc, node => node.tag === 'meta' && node.attrs.name === 'description')[0]?.attrs.content || '';
  if (!description && !isRedirect) fail(route, 'description', 'missing meta description');
  else if (!isRedirect && (description.length < 70 || description.length > 175)) warn(route, 'description', `${description.length} characters`);

  if (!find(doc, node => node.tag === 'meta' && node.attrs.name === 'viewport')[0]) fail(route, 'viewport', 'missing viewport meta');

  const canonical = find(doc, node => node.tag === 'link' && node.attrs.rel === 'canonical')[0]?.attrs.href || '';
  if (!canonical.startsWith('https://') && !noindex) fail(route, 'canonical', 'canonical is not absolute');
  if (isRedirect) {
    const refresh = find(doc, node => node.tag === 'meta' && node.attrs['http-equiv'] === 'refresh')[0];
    const target = (refresh.attrs.content.match(/url=(.+)$/i) || [])[1] || '';
    const resolved = resolveHref(target);
    if (!resolved || !(await exists(resolved.file))) fail(route, 'redirect', `unresolved redirect target: ${target}`);
    if (!noindex) fail(route, 'redirect', 'redirect page must be noindex');
  }

  if (!isRedirect) {
    const skip = find(doc, node => node.tag === 'a' && node.attrs.href === '#main')[0];
    const main = find(doc, node => node.tag === 'main')[0];
    if (!skip) fail(route, 'landmarks', 'skip link to #main missing');
    if (!main || main.attrs.id !== 'main') fail(route, 'landmarks', 'main#main missing');
    if (!find(doc, node => node.tag === 'header')[0]) fail(route, 'landmarks', 'header missing');
    if (!find(doc, node => node.tag === 'footer')[0]) fail(route, 'landmarks', 'footer missing');
    if (!find(doc, node => node.tag === 'nav' && node.attrs['aria-label'])[0]) fail(route, 'landmarks', 'labelled nav missing');
  }

  const headings = find(doc, node => /^h[1-6]$/.test(node.tag));
  stats.headings += headings.length;
  const h1s = headings.filter(node => node.tag === 'h1');
  if (h1s.length !== 1) fail(route, 'headings', `${h1s.length} h1 elements`);
  else if (!textContent(h1s[0])) fail(route, 'headings', 'h1 is empty');
  let previous = 0;
  for (const heading of headings) {
    const level = Number(heading.tag[1]);
    if (previous && level > previous + 1) fail(route, 'headings', `${heading.tag} follows h${previous}: "${textContent(heading).slice(0, 50)}"`);
    previous = level;
  }

  const ids = idsIn(doc);
  stats.ids += ids.size;
  const seen = new Set();
  for (const node of find(doc, child => child.attrs.id)) {
    const id = node.attrs.id;
    if (seen.has(id)) fail(route, 'ids', `duplicate id "${id}"`);
    seen.add(id);
  }

  const images = find(doc, node => node.tag === 'img');
  stats.images += images.length;
  for (const image of images) {
    const src = image.attrs.src || '';
    if (!('alt' in image.attrs)) fail(route, 'images', `img without alt: ${src}`);
    if (!src) fail(route, 'images', 'img without src');
    else if (src.startsWith('/') && !(await exists(src.slice(1)))) fail(route, 'images', `missing file: ${src}`);
  }

  const links = find(doc, node => node.tag === 'a' && 'href' in node.attrs);
  stats.links += links.length;
  for (const link of links) {
    const href = link.attrs.href;
    const name = accessibleName(link);
    if (!name) fail(route, 'names', `link without accessible name: ${href}`);
    if (href === '#') fail(route, 'links', 'href="#"');
    if (link.attrs.target === '_blank' && !/noopener/.test(link.attrs.rel || '')) fail(route, 'links', `target=_blank without rel=noopener: ${href}`);
    if (href.startsWith('/')) {
      const resolved = resolveHref(href);
      if (!resolved || !(await exists(resolved.file))) fail(route, 'links', `unresolved local link: ${href}`);
      else if (href.includes('#')) {
        const fragment = href.split('#')[1];
        if (fragment && resolved.file.endsWith('.html')) {
          const target = documents.get(resolved.route);
          if (target && !idsIn(target.doc).has(fragment)) fail(route, 'links', `missing fragment target: ${href}`);
          else if (!target) {
            const raw = await readFile(join(root, resolved.file), 'utf8');
            if (!new RegExp(`id=["']${fragment}["']`).test(raw)) fail(route, 'links', `missing fragment target: ${href}`);
          }
        }
      }
    }
    if (href.startsWith('#') && href.length > 1 && !ids.has(href.slice(1))) fail(route, 'links', `missing in-page target: ${href}`);
  }

  for (const button of find(doc, node => node.tag === 'button')) {
    if (!button.attrs.type) fail(route, 'buttons', `button without type: ${accessibleName(button) || '(unnamed)'}`);
    if (!accessibleName(button)) fail(route, 'names', 'button without accessible name');
  }

  const toggles = find(doc, node => 'data-filter' in node.attrs || 'data-pick' in node.attrs);
  for (const toggle of toggles) {
    const state = toggle.attrs['aria-pressed'];
    if (state !== 'true' && state !== 'false') fail(route, 'toggles', `toggle without aria-pressed: ${accessibleName(toggle)}`);
  }

  const controls = find(doc, node => node.tag === 'input' || node.tag === 'select' || node.tag === 'textarea');
  stats.forms += controls.length;
  const labelFor = new Set(find(doc, node => node.tag === 'label' && node.attrs.for).map(node => node.attrs.for));
  for (const control of controls) {
    const type = (control.attrs.type || '').toLowerCase();
    if (['hidden', 'submit', 'button', 'reset'].includes(type)) continue;
    const id = control.attrs.id || '';
    const labelled = labelFor.has(id) || control.attrs['aria-label'] || control.attrs['aria-labelledby'];
    if (!labelled) fail(route, 'forms', `unlabelled ${control.tag}: ${control.attrs.name || id || '(no name)'}`);
    for (const ref of (control.attrs['aria-describedby'] || '').split(/\s+/).filter(Boolean)) {
      if (!ids.has(ref)) fail(route, 'forms', `aria-describedby target missing: ${ref}`);
    }
    if (control.attrs['aria-invalid'] === 'true' && !find(doc, node => node.attrs.id === id)[0]) fail(route, 'forms', 'invalid control without id');
  }

  for (const table of find(doc, node => node.tag === 'table')) {
    if (!find(table, node => node.tag === 'caption')[0]) fail(route, 'tables', 'table without caption');
    for (const th of find(table, node => node.tag === 'th')) {
      if (!th.attrs.scope) fail(route, 'tables', `th without scope: "${textContent(th).slice(0, 40)}"`);
    }
  }

  for (const script of find(doc, node => node.tag === 'script' && (node.attrs.type || '').includes('ld+json'))) {
    try {
      JSON.parse(textContent(script));
    } catch {
      fail(route, 'schema', 'invalid JSON-LD');
    }
  }

  for (const node of find(doc, child => child.attrs['aria-describedby'])) {
    for (const ref of node.attrs['aria-describedby'].split(/\s+/).filter(Boolean)) {
      if (!ids.has(ref)) fail(route, 'aria', `aria-describedby target missing: ${ref}`);
    }
  }

  if (/lorem ipsum|coming soon|placeholder copy|\btbd\b|todo:/i.test(html)) {
    warn(route, 'content', 'placeholder-style string found');
  }
  if (/last verified/i.test(html)) fail(route, 'content', 'stale "last verified" phrase found');
}

function report(label, list, limit = 12) {
  if (!list.length) {
    console.log(`  PASS  ${label}`);
    return;
  }
  const byCheck = new Map();
  for (const item of list) {
    if (!byCheck.has(item.check)) byCheck.set(item.check, []);
    byCheck.get(item.check).push(item);
  }
  for (const [check, items] of byCheck) {
    console.log(`  ${label === 'WARN' ? 'WARN' : 'FAIL'}  ${check} (${items.length})`);
    items.slice(0, limit).forEach(item => console.log(`        ${item.route}  ${item.message}`));
    if (items.length > limit) console.log(`        … ${items.length - limit} more`);
  }
}

console.log(`Static audit · ${stats.routes} routes · ${stats.links} links · ${stats.images} images · ${stats.headings} headings · ${stats.ids} ids · ${stats.forms} form controls`);
report('FAIL', failures);
report('WARN', warnings);

if (failures.length) {
  console.error(`\n${failures.length} failure${failures.length === 1 ? '' : 's'}.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll structural checks passed. ${warnings.length} warning${warnings.length === 1 ? '' : 's'}.`);
}
