import { SITE } from '../content/site.mjs';

const REDIRECTS = [
  ['about.html', '/about/'],
  ['creed.html', '/about/#philosophy'],
  ['philosophy.html', '/about/#philosophy'],
  ['pillars.html', '/about/#philosophy'],
  ['story.html', '/about/'],
  ['studio.html', '/about/'],
  ['work.html', '/work/']
];

function redirectDocument(from, to) {
  const target = `${SITE.domain}${to}`;
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url=${to}">
  <link rel="canonical" href="${target}">
  <title>Redirecting to ${to} | ${SITE.name}</title>
</head>
<body>
  <main>
    <h1>This page has moved.</h1>
    <p>The current page is <a href="${to}">${target}</a>.</p>
  </main>
</body>
</html>
`;
}

export const LEGACY_PAGES = REDIRECTS.map(([file, to]) => ({
  path: `/${file}`,
  output: file,
  render: () => redirectDocument(file, to)
}));
