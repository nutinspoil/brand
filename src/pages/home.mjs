import { btn, sectionHead, statusBadge } from '../components/primitives.mjs';
import { comparisonRow, featureProof, proofPicker } from '../components/proof.mjs';
import { ctaPanel, stageStrip } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import { projectById } from '../content/projects.mjs';
import { STAGES } from '../content/process.mjs';
import { SITE, waHref } from '../content/site.mjs';

const BUILDS = [
  {
    n: '01',
    title: 'Websites',
    text: 'A public home for the business, organised around what customers need to decide.',
    href: '/services/web-development/'
  },
  {
    n: '02',
    title: 'Online stores',
    text: 'Product catalogues, cart and checkout, order records, and the operating routine behind them.',
    href: '/services/ecommerce-development/'
  },
  {
    n: '03',
    title: 'Business systems',
    text: 'Point of sale, inventory, payment records, shift reconciliation, and access by role.',
    href: '/services/business-management-systems/'
  },
  {
    n: '04',
    title: 'Custom software',
    text: 'Applications and internal tools for a situation the ready-made options do not fit.',
    href: '/services/custom-software-development/'
  }
];

const SITUATIONS = [
  {
    n: '01',
    label: 'Build a new product',
    text: 'A website, store, or internal tool that does not exist yet.',
    href: '/start-a-project/?situation=new-ventures'
  },
  {
    n: '02',
    label: 'Improve an existing experience',
    text: 'A live site or product that is not carrying its weight.',
    href: '/solutions/#situation-evolution'
  },
  {
    n: '03',
    label: 'Replace manual operations',
    text: 'Sales, stock, payments, and shifts held together by paper or memory.',
    href: '/solutions/#situation-operations'
  }
];

export function homePage() {
  const ns = projectById('ns-luxury-villa');
  const body = `
  <section class="hero" aria-labelledby="hero-title">
    <div class="shell hero__grid">
      <div class="hero__copy">
        <p class="kicker">Web products · Commerce · Operational software</p>
        <h1 class="title-1" id="hero-title">Software for businesses moving <em>beyond manual work.</em></h1>
        <p class="hero__lead">We design and engineer websites, online stores and operational software for businesses that need clearer ways to sell, serve and run the work.</p>
        <p class="hero__founder">Founded and led by <strong>Emmanuel Drah</strong>, who designs and builds the work himself.</p>
        <div class="actions">
          ${btn({ label: 'See the work', href: '/work/' })}
          ${btn({ label: 'Describe the problem', href: '/start-a-project/', variant: 'quiet' })}
        </div>
        <p class="hero__signature"><em>Digital products for ideas worth carrying through.</em></p>
      </div>
      <figure class="hero-proof">
        <div class="hero-proof__plate">
          <img src="${ns.image}" alt="${ns.imageAlt}" width="1600" height="1000" fetchpriority="high" decoding="async">
          <span class="hero-proof__status">${statusBadge(ns.status)}</span>
        </div>
        <figcaption class="hero-proof__record">
          <p class="hero-proof__name">${ns.title}</p>
          <p class="hero-proof__meta">${ns.type} · ${ns.location}</p>
          <p class="hero-proof__result">${ns.resultOrState}</p>
          <p class="hero-proof__note">Public product · captured from the live site</p>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="band band--frost" aria-labelledby="first-proof-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'In use · Public product',
        title: 'The first proof is a product guests can use.',
        lead: 'NS Luxury Villa is a public hospitality website in Lokoe, Ho. It carries the standard the rest of this site holds every product to: a specific situation, a specific change, and a result a guest can check.',
        id: 'first-proof-title',
        className: 'section-head--statement'
      })}
      ${featureProof(ns, {
        image: '/assets/img/work-nsvilla-rooms.jpg',
        imageAlt:
          'NS Luxury Villa rooms page showing the room categories, the bed and finishing details, and a room listing.'
      })}
    </div>
  </section>

  <section class="band" aria-labelledby="selector-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'Other proof',
        title: 'The work, in three states.',
        lead: 'A live product, a private system, and a public storefront. Each state changes what can be shown and what must be withheld.',
        id: 'selector-title'
      })}
      ${proofPicker(['ns-luxury-villa', 'cr-cosmetics', 'business-systems'])}
    </div>
  </section>

  <section class="band band--tight" aria-labelledby="kinds-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'What the evidence covers',
        title: 'Public, private and prototype work are not the same kind of proof.',
        lead: 'Status appears beside every project so the record is never mistaken for a release.',
        id: 'kinds-title',
        className: 'section-head--margin'
      })}
      ${comparisonRow()}
    </div>
  </section>

  <section class="band band--frost" aria-labelledby="builds-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'Capability',
        title: 'What the brand builds.',
        lead: 'Products that need to work on a phone, in a shop, on a shift, and after handover.',
        action: { label: 'All services', href: '/services/' },
        id: 'builds-title',
        className: 'section-head--statement'
      })}
      <ul class="rows">
        ${BUILDS.map(
          item => `<li class="rows__item">
            <span class="rows__n">${item.n}</span>
            <h3 class="rows__title"><a href="${item.href}">${item.title}</a></h3>
            <p class="rows__text">${item.text}</p>
            <span class="rows__arrow" aria-hidden="true">&#8594;</span>
          </li>`
        ).join('')}
      </ul>
    </div>
  </section>

  <section class="band" aria-labelledby="situations-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'Situations',
        title: 'Start from what is happening now.',
        lead: 'The right next step depends on what already exists. Pick the closest situation; the site shows the evidence that belongs to it.',
        id: 'situations-title',
        className: 'section-head--margin'
      })}
      <ul class="routes">
        ${SITUATIONS.map(
          item => `<li class="routes__item">
            <span class="routes__n">${item.n}</span>
            <h3 class="routes__title"><a href="${item.href}">${item.label}</a></h3>
            <p>${item.text}</p>
            <span class="routes__arrow" aria-hidden="true">&#8594;</span>
          </li>`
        ).join('')}
      </ul>
      <p class="band__aside">Not sure which one? <a href="/solutions/">Compare the situations</a> or <a href="/start-a-project/">describe it in your own words</a>.</p>
    </div>
  </section>

  <section class="band band--tight" aria-labelledby="process-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'Process',
        title: 'A path with a handover, not a black box.',
        lead: 'Seven stages, each with a named output. Code, documentation and accounts move to the client at handover.',
        action: { label: 'Read the process', href: '/process/' },
        id: 'process-title'
      })}
      ${stageStrip(STAGES)}
    </div>
  </section>

  <section class="band band--frost" aria-labelledby="founder-title">
    <div class="shell founder">
      <figure class="founder__portrait">
        <img src="/assets/img/Drah.jpeg" alt="Emmanuel Drah, founder of Success Above Dreams, seated outdoors beside a pool." width="960" height="1280" loading="lazy" decoding="async">
      </figure>
      <div class="founder__copy">
        <p class="kicker">Accountability</p>
        <h2 class="title-2" id="founder-title">Built and led by the person who does the work.</h2>
        <p>Emmanuel Drah designs, builds and reviews the products shown here. A small practice means fewer handoffs between the person who hears the problem and the person who writes the code.</p>
        <dl class="facts">
          <div><dt>Founder and principal engineer</dt><dd>Emmanuel Drah</dd></div>
          <div><dt>Base</dt><dd>${SITE.founder.base} · working with clients remotely</dd></div>
          <div><dt>Working principle</dt><dd>Evidence before adjectives.</dd></div>
        </dl>
        <div class="actions">
          ${btn({ label: 'About the practice', href: '/about/', variant: 'quiet' })}
          ${btn({ label: 'Founder portfolio', href: SITE.founderPortfolio, variant: 'quiet', external: true, icon: 'up-right' })}
        </div>
      </div>
    </div>
  </section>

  ${ctaPanel({
    eyebrow: 'Next step',
    title: 'Bring the situation. Leave with the next useful step.',
    body: 'The structured project brief asks what exists, who uses it, and what has to change. WhatsApp is the faster route if you would rather start with a conversation.',
    primary: { label: 'Start a project', href: '/start-a-project/' },
    secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
    id: 'home-cta'
  })}
`;

  return renderDocument({
    title: 'Success Above Dreams — digital products for ideas worth carrying through',
    description:
      'Success Above Dreams designs and engineers websites, online stores and operational software for businesses in Ghana and beyond. Evidence-led work by Emmanuel Drah.',
    path: '/',
    body,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: 'https://successabovedreams.com/',
      description: SITE.statement
    }
  });
}
