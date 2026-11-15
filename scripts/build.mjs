import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from '../src/pages/registry.mjs';
import { SITE } from '../src/content/site.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = SITE.domain;

function outputFor(page) {
  if (page.output) return join(root, page.output);
  if (page.path === '/') return join(root, 'index.html');
  return join(root, page.path.replace(/^\/|\/$/g, ''), 'index.html');
}

async function writePage(page) {
  const html = page.render();
  const target = outputFor(page);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  const route = page.path || page.output;
  console.log(`  ${route.padEnd(46)} ${(html.length / 1024).toFixed(1)} kB`);
  return { route, target };
}

function sitemapXml(pages) {
  const urls = pages
    .filter(page => page.sitemap && page.path)
    .map(
      page =>
        `  <url><loc>${origin}${page.path}</loc><lastmod>${SITE.updatedISO || '2026-11-15'}</lastmod></url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function build() {
  console.log(`Building ${SITE.name} (${PAGES.length} routes)`);
  const built = [];
  for (const page of PAGES) {
    built.push(await writePage(page));
  }

  await writeFile(
    join(root, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    'utf8'
  );
  await writeFile(join(root, 'sitemap.xml'), sitemapXml(PAGES), 'utf8');
  console.log(`  ${'/robots.txt'.padEnd(46)} written`);
  console.log(`  ${'/sitemap.xml'.padEnd(46)} ${PAGES.filter(p => p.sitemap && p.path).length} urls`);
  console.log('Build complete.');
}

build().catch(error => {
  console.error('Build failed:', error);
  process.exitCode = 1;
});
