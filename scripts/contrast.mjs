import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = await readFile(join(root, 'assets/css/sad.css'), 'utf8');

const tokens = Object.fromEntries(
  [...css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})\b/gi)].map(match => [match[1], match[2]])
);

const missing = [];
const token = name => {
  const value = tokens[name];
  if (!value) missing.push(name);
  return value;
};

const rgb = color =>
  typeof color === 'string'
    ? { r: parseInt(color.slice(1, 3), 16), g: parseInt(color.slice(3, 5), 16), b: parseInt(color.slice(5, 7), 16) }
    : color;

const mix = (top, alpha, bottom) => {
  const a = rgb(top);
  const b = rgb(bottom);
  const channel = key => Math.round(a[key] * alpha + b[key] * (1 - alpha));
  return { r: channel('r'), g: channel('g'), b: channel('b') };
};

const luminance = color => {
  const channel = value => {
    const v = value / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
};

const ratio = (fore, back) => {
  const a = luminance(fore);
  const b = luminance(back);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

const light = ['ground-lit', 'ground', 'ground-deep'].map(name => ({ label: `--${name}`, value: token(name) }));
const dark = ['sea', 'sea-lit', 'sea-deep', 'ink-2'].map(name => ({ label: `--${name}`, value: token(name) }));

const pairs = [];
const add = (label, fore, back, minimum = 4.5) => pairs.push({ label, fore, back, minimum });

for (const surface of light) {
  add(`--ink on ${surface.label}`, token('ink'), surface.value);
  add(`--ink-2 on ${surface.label}`, token('ink-2'), surface.value);
  add(`--ink-mint on ${surface.label}`, token('ink-mint'), surface.value);
  add(`--ink-muted on ${surface.label}`, token('ink-muted'), surface.value);
}
for (const surface of dark) {
  add(`--chalk on ${surface.label}`, token('chalk'), surface.value);
  add(`--chalk-2 on ${surface.label}`, token('chalk-2'), surface.value);
}

add('--ink on --frost', token('ink'), token('frost'));
add('--ink on --frost-3', token('ink'), token('frost-3'));
add('--ink on white', token('ink'), '#ffffff');
add('--alert on --alert-bg', token('alert'), token('alert-bg'));
add('--chalk on primary button top (#1379a8)', token('chalk'), '#1379a8');
add('--chalk-2 on footer radial (#116e9b)', token('chalk-2'), '#116e9b');
add('--chalk-2 on mobile navigation (#0b5f92)', token('chalk-2'), '#0b5f92');
add('--chalk-2 on mobile navigation radial', token('chalk-2'), mix('#1273a0', 0.95, '#0b5f92'));
add('--ink-sea on clay chip over frost', token('ink-sea'), mix('#7fa9d6', 0.2, token('frost')));

const status = [
  ['live', '#155c3a', '#e2f5e8'],
  ['private', '#164a6b', '#e2effc'],
  ['testing', '#6f4805', '#fcf0d6'],
  ['ongoing', '#3f5a70', '#e8f0f8']
];
for (const [name, fore, back] of status) add(`status ${name} label on chip`, fore, back);

if (/color:\s*var\(--clay-deep\)/.test(css)) {
  console.error('FAIL  text is set to --clay-deep, which does not meet 4.5:1 on the powder-blue ground.');
  process.exitCode = 1;
}

if (missing.length) {
  console.error(`FAIL  missing token(s): ${[...new Set(missing)].join(', ')}`);
  process.exitCode = 1;
}

let failures = 0;
for (const pair of pairs) {
  if (!pair.fore || !pair.back) continue;
  const value = ratio(rgb(pair.fore), rgb(pair.back));
  const pass = value >= pair.minimum;
  if (!pass) failures += 1;
  const line = `${pass ? 'PASS' : 'FAIL'}  ${pair.label.padEnd(52)} ${value.toFixed(2)}:1 (needs ${pair.minimum})`;
  if (pass) console.log(line);
  else console.error(line);
}

console.log(`\n${pairs.length} colour pairs checked, ${failures} below AA.`);
if (failures > 0) process.exitCode = 1;
