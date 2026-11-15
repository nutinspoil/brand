import { FOOTER, NAV, SITE, waHref } from '../content/site.mjs';
import { esc, json } from '../lib/html.mjs';

const DEFAULT_WA = waHref();

function sectionFor(path) {
  if (path.startsWith('/work')) return 'work';
  if (path.startsWith('/services') || path.startsWith('/solutions')) return 'capabilities';
  if (path.startsWith('/process')) return 'process';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/insights')) return 'insights';
  if (path.startsWith('/start-a-project')) return 'start';
  return '';
}

function currentAttr(active) {
  return active ? ' aria-current="page"' : '';
}

function brand({ footer = false } = {}) {
  return `<a class="brand${footer ? ' brand--footer' : ''}" href="/" aria-label="Success Above Dreams — home">
    <span class="brand__seal" aria-hidden="true"><img src="/assets/img/logo-shield.png" alt="" width="72" height="72" loading="eager" decoding="async"></span>
    <span class="brand__text"><strong>Success Above Dreams</strong><span>${esc(SITE.descriptor)}</span></span>
  </a>`;
}

function primaryNav(path, section) {
  return NAV.map(item => {
    if (item.type === 'link') {
      const active = section === item.section;
      return `<a class="nav__link" href="${item.href}"${active ? currentAttr(true) : ''}>${item.label}</a>`;
    }
    const active = section === item.section;
    return `<details class="nav__drop" data-nav-drop>
      <summary class="nav__summary"${active ? ' aria-current="true"' : ''}>${item.label}<span class="nav__chevron" aria-hidden="true">&#9662;</span></summary>
      <div class="nav__pop">
        ${item.items
          .map(child => {
            const childActive = path === child.href || path.startsWith(child.href);
            return `<a class="nav__pop-link" href="${child.href}"${childActive ? ' aria-current="page"' : ''}><strong>${child.label}</strong><span>${child.note}</span></a>`;
          })
          .join('')}
      </div>
    </details>`;
  }).join('');
}

function mobileNav(path, section) {
  const links = NAV.map(item => {
    if (item.type === 'link') {
      return `<a class="mobile-nav__link" href="${item.href}"${section === item.section ? ' aria-current="page"' : ''}>${item.label}</a>`;
    }
    return `<p class="mobile-nav__label">${item.label}</p>${item.items
      .map(
        child =>
          `<a class="mobile-nav__link mobile-nav__link--sub" href="${child.href}"><span>${child.label}</span><span class="mobile-nav__note">${child.note}</span></a>`
      )
      .join('')}`;
  }).join('');

  return `<div class="mobile-nav" id="mobile-nav" data-menu aria-hidden="true" inert>
    <div class="shell mobile-nav__inner">
      <div class="mobile-nav__top">
        ${brand()}
        <button class="mobile-nav__close" type="button" data-menu-close><span aria-hidden="true">&#10005;</span><span class="sr-only">Close menu</span></button>
      </div>
      <nav class="mobile-nav__nav" aria-label="Mobile">
        ${links}
      </nav>
      <div class="mobile-nav__foot">
        <a class="button button--primary" href="/start-a-project/">Start a project<span class="button__arrow" aria-hidden="true">&#8594;</span></a>
        <a class="mobile-nav__wa" href="${DEFAULT_WA}" target="_blank" rel="noopener noreferrer">Message Emmanuel on WhatsApp<span class="button__arrow" aria-hidden="true">&#8599;</span></a>
        <p class="mobile-nav__base">${esc(SITE.signature)}</p>
      </div>
    </div>
  </div>`;
}

function header(path) {
  const section = sectionFor(path);
  return `<header class="site-header" data-header>
    <div class="shell header__row">
      ${brand()}
      <nav class="nav" aria-label="Primary">
        ${primaryNav(path, section)}
      </nav>
      <a class="button button--primary header__cta" href="/start-a-project/"${section === 'start' ? currentAttr(true) : ''}>Start a project<span class="button__arrow" aria-hidden="true">&#8594;</span></a>
      <button class="menu-toggle" type="button" data-menu-open aria-expanded="false" aria-controls="mobile-nav">
        <span class="menu-toggle__lines" aria-hidden="true"><span></span><span></span></span>
        <span class="sr-only">Open menu</span>
      </button>
    </div>
    <noscript>
      <div class="shell"><nav class="nojs-nav" aria-label="Site"><a href="/work/">Work</a><a href="/services/">Services</a><a href="/solutions/">Solutions</a><a href="/process/">Process</a><a href="/about/">About</a><a href="/insights/">Insights</a><a href="/start-a-project/">Start a project</a></nav></div>
    </noscript>
  </header>
  ${mobileNav(path, section)}`;
}

function footer() {
  return `<footer class="site-footer" id="site-footer">
    <div class="shell">
      <div class="footer__lead">
        <div>
          ${brand({ footer: true })}
          <p class="footer__statement">${esc(SITE.signature)}</p>
        </div>
        <div class="footer__lead-action">
          <p>Have a situation that needs a product or a system?</p>
          <a class="button button--light" href="/start-a-project/">Start a project<span class="button__arrow" aria-hidden="true">&#8594;</span></a>
        </div>
      </div>
      <div class="footer__columns">
        ${FOOTER.columns
          .map(
            column => `<section class="footer__col" aria-labelledby="footer-${column.title.toLowerCase()}">
              <h2 class="footer__head" id="footer-${column.title.toLowerCase()}">${column.title}</h2>
              <ul>${column.links
                .map(
                  link =>
                    `<li><a href="${esc(link.href)}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(link.label)}${link.external ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a></li>`
                )
                .join('')}</ul>
            </section>`
          )
          .join('')}
      </div>
      <div class="footer__base">
        <p>&copy; ${new Date().getFullYear()} Success Above Dreams. Built and maintained in Ghana.</p>
        <ul class="footer__legal">${FOOTER.legal
          .map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
          .join('')}</ul>
        <a class="footer__founder" href="${SITE.founderPortfolio}" target="_blank" rel="noopener noreferrer">Emmanuel Drah’s portfolio<span class="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  </footer>`;
}

function floatingWhatsApp() {
  return `<a class="wa-fab" href="${DEFAULT_WA}" target="_blank" rel="noopener noreferrer" aria-label="Message Emmanuel on WhatsApp">
    <img src="/assets/img/whatsapp.svg" alt="" width="22" height="22" loading="lazy" decoding="async">
    <span class="wa-fab__text">WhatsApp</span>
  </a>`;
}

export function renderDocument({
  title,
  description,
  path,
  body,
  bodyClass = '',
  schema = null,
  noindex = false
}) {
  const canonical = `${SITE.domain}${path}`;
  return `<!DOCTYPE html>
<html lang="en-GB" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="${SITE.themeColour}">
  ${noindex ? '<meta name="robots" content="noindex,follow">' : `<link rel="canonical" href="${canonical}">`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE.domain}/assets/img/social-card.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE.domain}/assets/img/social-card.png">
  <link rel="icon" href="/assets/img/shield-mark-232.png" sizes="232x232" type="image/png">
  <link rel="stylesheet" href="/assets/fonts/fonts.css">
  <link rel="stylesheet" href="/assets/css/sad.css">
  <script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
  ${schema ? `<script type="application/ld+json">${json(schema)}</script>` : ''}
</head>
<body class="${esc(bodyClass)}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(path)}
  <main id="main" tabindex="-1">
    ${body}
  </main>
  ${footer()}
  ${floatingWhatsApp()}
  <script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.domain,
    description: SITE.statement,
    founder: { '@type': 'Person', name: SITE.founder.name, url: SITE.founderPortfolio },
    sameAs: [SITE.founderPortfolio],
    areaServed: 'Ghana'
  };
}

export function articleSchema(article, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: '2026-11-15',
    dateModified: '2026-11-15',
    author: { '@type': 'Person', name: SITE.founder.name, url: SITE.founderPortfolio },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.domain },
    mainEntityOfPage: `${SITE.domain}${path}`
  };
}
