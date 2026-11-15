export function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function json(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

export function cx(...values) {
  return values.filter(Boolean).join(' ');
}

export function externalAttrs(external) {
  return external ? ' target="_blank" rel="noopener noreferrer"' : '';
}

export function arrow(name = 'right') {
  const glyph = name === 'up-right' ? '&#8599;' : name === 'down' ? '&#8595;' : '&#8594;';
  return `<span class="arrow" aria-hidden="true">${glyph}</span>`;
}

export function srOnly(text) {
  return `<span class="sr-only">${esc(text)}</span>`;
}
