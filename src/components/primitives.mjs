import { arrow, cx, esc, externalAttrs, srOnly } from '../lib/html.mjs';
import { STATUS } from '../content/site.mjs';

const ICONS = {
  right: '&#8594;',
  'up-right': '&#8599;',
  down: '&#8595;'
};

export function btn({
  label,
  href,
  variant = 'primary',
  external = false,
  icon = 'right',
  className = '',
  attrs = ''
}) {
  if (!label) return '';
  const glyph = icon && icon !== 'none' ? `<span class="button__arrow" aria-hidden="true">${ICONS[icon] || ICONS.right}</span>` : '';
  return `<a class="${cx('button', `button--${variant}`, className)}" href="${esc(href)}"${externalAttrs(external)}${attrs ? ' ' + attrs : ''}>${label}${glyph}</a>`;
}

export function statusBadge(status, { short = false, className = '' } = {}) {
  const entry = STATUS[status] || STATUS[status?.key] || STATUS.live;
  return `<span class="${cx('status', `status--${entry.key}`, className)}"><span class="status__mark" aria-hidden="true"></span><span class="status__label">${esc(short ? entry.short : entry.label)}</span></span>`;
}

export function kicker(text, index) {
  return `<p class="kicker">${index ? `<span class="kicker__index">${esc(index)}</span>` : ''}<span>${text}</span></p>`;
}

export function sectionHead({ eyebrow, title, lead, action = '', id, level = 2, className = '' }) {
  const Tag = level === 3 ? 'h3' : 'h2';
  const actionHtml = action
    ? typeof action === 'string'
      ? action
      : btn({ label: action.label, href: action.href, variant: action.variant || 'quiet', external: action.external })
    : '';
  return `<div class="${cx('section-head', className)}">
    ${eyebrow ? kicker(eyebrow) : ''}
    <div class="section-head__row">
      <${Tag} class="${Tag === 'h2' ? 'title-2' : 'title-3'}"${id ? ` id="${esc(id)}"` : ''}>${title}</${Tag}>
      ${actionHtml ? `<div class="section-head__action">${actionHtml}</div>` : ''}
    </div>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>`;
}

export function facts(rows, className = '') {
  return `<dl class="${cx('facts', className)}">${rows
    .map(
      ([term, value]) =>
        `<div class="facts__row"><dt>${esc(term)}</dt><dd>${value}</dd></div>`
    )
    .join('')}</dl>`;
}

export function figure({
  src,
  alt,
  caption,
  tag,
  className = '',
  width = 1600,
  height = 1000,
  loading = 'lazy',
  priority = false
}) {
  return `<figure class="${cx('capture', className)}">
    <div class="capture__frame">
      <img src="${esc(src)}" alt="${esc(alt)}" width="${width}" height="${height}" loading="${priority ? 'eager' : loading}" decoding="async"${priority ? ' fetchpriority="high"' : ''}>
    </div>
    ${caption || tag ? `<figcaption class="capture__caption">${tag ? `<span class="capture__tag">${esc(tag)}</span>` : ''}${caption ? `<span>${caption}</span>` : ''}</figcaption>` : ''}
  </figure>`;
}

export function chip(text, variant = '') {
  return `<span class="${cx('chip', variant ? `chip--${variant}` : '')}">${text}</span>`;
}

export function note({ label = 'Evidence boundary', body, className = '' }) {
  return `<div class="${cx('note', className)}"><p class="note__label">${esc(label)}</p><p class="note__body">${body}</p></div>`;
}

export function checkList(items, className = '') {
  return `<ul class="${cx('checks', className)}">${items
    .map(
      item =>
        `<li><span class="checks__mark" aria-hidden="true">&#10003;</span><span>${typeof item === 'string' ? item : item.label}${item.note ? `<span class="checks__note">${item.note}</span>` : ''}</span></li>`
    )
    .join('')}</ul>`;
}

export function readout(items) {
  return `<dl class="readout">${items
    .map(
      item =>
        `<div class="readout__cell"><dt>${esc(item.label)}</dt><dd><span class="readout__value">${esc(item.value)}</span><span class="readout__note">${item.note}</span></dd></div>`
    )
    .join('')}</dl>`;
}

export function definitionRows(rows, className = '') {
  return `<dl class="${cx('definitions', className)}">${rows
    .map(
      row =>
        `<div class="definitions__row"><dt>${esc(row[0])}</dt><dd>${row[1]}</dd></div>`
    )
    .join('')}</dl>`;
}

export function stamp(text) {
  return `<p class="stamp">${text}</p>`;
}

export function iconLink(label, href, { external = false, className = '' } = {}) {
  return `<a class="${cx('text-link', className)}" href="${esc(href)}"${externalAttrs(external)}>${label}${arrow(external ? 'up-right' : 'right')}</a>`;
}

export function externalNote() {
  return `<p class="external-note">${srOnly('Opens in a new tab.')}External link</p>`;
}

export function breadcrumb(items) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${items
    .map((item, index) => {
      const last = index === items.length - 1;
      if (last) return `<li><span aria-current="page">${esc(item.label)}</span></li>`;
      return `<li><a href="${esc(item.href)}">${esc(item.label)}</a></li>`;
    })
    .join('')}</ol></nav>`;
}
