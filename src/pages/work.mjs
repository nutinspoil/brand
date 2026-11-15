import { evidenceCard, statusLegend } from '../components/proof.mjs';
import { ctaPanel, pageIntro } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import { GROUPS, PROJECTS, WORK_INTRO } from '../content/projects.mjs';
import { SITE, waHref } from '../content/site.mjs';

const GROUP_IDS = {
  public: 'public-products',
  private: 'private-systems',
  prototype: 'prototypes'
};

const FILTERS = [
  { key: 'all', label: 'All work' },
  { key: 'public', label: 'Public products' },
  { key: 'private', label: 'Private systems' },
  { key: 'prototype', label: 'Prototypes' }
];

export function workPage() {
  const groups = GROUPS.map(
    group => `<section class="work-group" data-work-group id="${GROUP_IDS[group.key]}" aria-labelledby="group-${group.key}">
      <div class="work-group__head">
        <h2 class="title-2" id="group-${group.key}">${group.title}</h2>
        <p>${group.lead}</p>
      </div>
      <div class="work-grid">
        ${PROJECTS.filter(project => project.group === group.key)
          .map(project => evidenceCard(project))
          .join('')}
      </div>
    </section>`
  ).join('');

  const body = `
  <div class="shell">
    ${pageIntro({
      eyebrow: WORK_INTRO.eyebrow,
      title: WORK_INTRO.title,
      lead: WORK_INTRO.lead,
      aside: `<div class="intro-aside">
        <p class="intro-aside__count">${WORK_INTRO.countNote}</p>
        <p class="intro-aside__founder">${WORK_INTRO.founder}</p>
        ${statusLegend()}
      </div>`
    })}
  </div>

  <section class="band band--frost band--tight" aria-labelledby="work-index-title">
    <div class="shell">
      <div class="work-bar">
        <h2 class="sr-only" id="work-index-title">Filter the work</h2>
        <form class="work-search" role="search" data-work-search>
          <label for="work-query">Search the work</label>
          <div class="search-field">
            <input id="work-query" name="q" type="search" placeholder="Product, sector, or situation" autocomplete="off" data-work-input>
            <span class="search-field__icon" aria-hidden="true">&#9906;</span>
          </div>
        </form>
        <div class="work-filters" role="group" aria-label="Filter by evidence type">
          ${FILTERS.map(
            (filter, index) =>
              `<button class="filter" type="button" data-filter="${filter.key}" aria-pressed="${index === 0}">${filter.label}</button>`
          ).join('')}
        </div>
        <div class="work-status">
          <p class="work-count" data-work-count role="status" aria-live="polite">${PROJECTS.length} projects</p>
          <button class="work-reset" type="button" data-work-reset hidden>Reset</button>
        </div>
      </div>
      <div class="work-list" data-work>
        ${groups}
        <div class="work-empty" data-work-empty hidden>
          <p class="work-empty__title">No projects match that search.</p>
          <p>Try a sector, a product type, or a plain word such as <em>store</em>, <em>shift</em>, or <em>hospitality</em>.</p>
          <div class="actions">
            <button class="button button--quiet" type="button" data-work-reset>Reset the filters</button>
            <a class="button button--primary" href="/start-a-project/">Describe a different situation</a>
          </div>
        </div>
      </div>
      <p class="work-boundary">Work cards carry their own evidence boundary. Private systems show workflow and roles instead of client records. Prototypes are labelled as tests, not releases.</p>
    </div>
  </section>

  ${ctaPanel({
    eyebrow: 'Next step',
    title: 'The closest project is rarely the same problem.',
    body: 'Bring the situation behind yours. The first reply names the next useful step, even if that step is not to build.',
    primary: { label: 'Start a project', href: '/start-a-project/' },
    secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
    id: 'work-cta'
  })}
`;

  return renderDocument({
    title: 'Work — products, systems and prototypes | Success Above Dreams',
    description:
      'Live hospitality and commerce products, private operational systems, and prototypes by Success Above Dreams. Each card states its own evidence boundary.',
    path: '/work/',
    body,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Work',
      url: `${SITE.domain}/work/`,
      description: WORK_INTRO.lead,
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.domain }
    }
  });
}
