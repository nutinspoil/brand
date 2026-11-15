import {
  breadcrumb,
  btn,
  checkList,
  sectionHead,
  statusBadge
} from '../components/primitives.mjs';
import { proofStrip } from '../components/proof.mjs';
import { boundaryPanel, ctaPanel, pageIntro } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import { PRODUCT_TYPES, SERVICES, SERVICES_INTRO, serviceBySlug } from '../content/services.mjs';
import { projectById } from '../content/projects.mjs';
import { waHref } from '../content/site.mjs';

function ServiceProof({ ids }) {
  return `<div class="service-proof">${ids
    .map(id => {
      const project = projectById(id);
      if (!project) return '';
      const href = project.caseStudyHref || project.primaryHref || (project.liveHref?.startsWith('/') ? project.liveHref : '/work/');
      return `<a class="service-proof__item" href="${href}">
        <span class="service-proof__meta">${statusBadge(project.status, { short: true })}<span>${project.type}</span></span>
        <strong>${project.title}</strong>
        <span>${project.resultOrState}</span>
      </a>`;
    })
    .join('')}</div>`;
}

export function servicesPage() {
  const index = SERVICES.map(
    service => `<li>
      <a href="#service-${service.slug}">
        <span class="service-index__n">${String(service.order).padStart(2, '0')}</span>
        <span class="service-index__name">${service.name}</span>
        <span class="service-index__short">${service.short}</span>
        <span class="service-index__arrow" aria-hidden="true">&#8595;</span>
      </a>
    </li>`
  ).join('');

  const types = PRODUCT_TYPES.map(
    type => `<article class="product-type" id="type-${type.key}">
      <div class="product-type__head">
        <span class="product-type__n">${type.number}</span>
        <h3>${type.title}</h3>
        <p>${type.plain}</p>
      </div>
      <dl class="definitions product-type__defs">
        <div class="definitions__row"><dt>Best for</dt><dd>${type.bestFor}</dd></div>
        <div class="definitions__row"><dt>Form</dt><dd>${type.built}</dd></div>
        <div class="definitions__row"><dt>What changes</dt><dd>${type.changes}</dd></div>
        <div class="definitions__row"><dt>Not a fit</dt><dd>${type.notFit}</dd></div>
      </dl>
      <div class="product-type__foot">
        ${ServiceProof({ ids: type.proof })}
        <div class="actions">
          ${btn({ label: type.action.label, href: type.action.href, variant: 'quiet' })}
        </div>
      </div>
    </article>`
  ).join('');

  const blocks = SERVICES.map(
    service => `<section class="service-block" id="service-${service.slug}" aria-labelledby="service-${service.slug}-title">
      <div class="service-block__head">
        <span class="service-block__n">${String(service.order).padStart(2, '0')}</span>
        <h3 class="title-2" id="service-${service.slug}-title">${service.name}</h3>
        <p class="service-block__short">${service.short}</p>
      </div>
      <div class="service-block__grid">
        <div class="service-block__copy">
          <p class="lead">${service.definition}</p>
          <p class="service-block__best"><strong>Best for</strong> ${service.bestFor}</p>
          ${ServiceProof({ ids: service.proof })}
          <div class="actions">
            ${btn({ label: service.cta.label, href: service.cta.href })}
          </div>
        </div>
        <div class="service-block__detail">
          <div>
            <h4>What gets built</h4>
            ${checkList(service.built)}
          </div>
          <div>
            <h4>What changes</h4>
            <ul class="plain-list">${service.changes.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="service-block__fit">
            <h4>Not the right fit when</h4>
            <p>${service.notFit}</p>
          </div>
        </div>
      </div>
    </section>`
  ).join('');

  const body = `
    <div class="shell">
      ${pageIntro({
        eyebrow: SERVICES_INTRO.eyebrow,
        title: SERVICES_INTRO.title,
        lead: SERVICES_INTRO.lead,
        aside: `<div class="intro-aside">
          <p class="intro-aside__count">${SERVICES_INTRO.indexNote}</p>
          <blockquote class="principle">“${SERVICES_INTRO.principle}”</blockquote>
        </div>`
      })}
      <nav class="service-index" aria-labelledby="service-index-title">
        <h2 class="sr-only" id="service-index-title">Services on this page</h2>
        <ol>${index}</ol>
      </nav>
    </div>

    <section class="band band--frost" aria-labelledby="forms-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Choose the form',
          title: 'Public, operational, or evolving.',
          lead: 'The same business can need all three over time. The first release only needs the one that matches the current situation.',
          id: 'forms-title'
        })}
        <div class="product-types">${types}</div>
      </div>
    </section>

    <section class="band" aria-labelledby="all-services-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Services',
          title: 'Seven services, each with a boundary.',
          lead: 'A service description is useful when it says what it builds, what changes, and when it is not the right answer.',
          id: 'all-services-title'
        })}
        <div class="service-blocks">${blocks}</div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: 'Start with the form that matches the situation.',
      body: 'Describe what exists now and what should change. The reply will name the service, the first release, or the reason not to build.',
      primary: { label: 'Describe the situation', href: '/start-a-project/' },
      secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
      id: 'services-cta'
    })}
  `;

  return renderDocument({
    title: 'Services — websites, stores and systems | Success Above Dreams',
    description:
      'Seven services from Success Above Dreams: web development, e-commerce, POS, business management systems, custom software, cross-device applications, and maintenance.',
    path: '/services/',
    body
  });
}

export function servicePage(slug) {
  const service = serviceBySlug(slug);
  if (!service) return null;
  const next = SERVICES.filter(item => item.slug !== slug).slice(0, 3);
  const body = `
    <div class="shell">
      ${breadcrumb([
        { label: 'Services', href: '/services/' },
        { label: service.name }
      ])}
      <div class="page-intro">
        <div class="page-intro__copy">
          <p class="kicker">Service · ${String(service.order).padStart(2, '0')}</p>
          <h1 class="title-1" id="page-title">${service.headline}</h1>
          <p class="lead lead--large">${service.definition}</p>
          <div class="actions">
            ${btn({ label: service.cta.label, href: service.cta.href })}
            ${btn({ label: 'See all services', href: '/services/', variant: 'quiet' })}
          </div>
        </div>
        <aside class="intro-aside" aria-label="Service at a glance">
          <p class="intro-aside__label">Best for</p>
          <p class="intro-aside__line">${service.bestFor}</p>
          ${ServiceProof({ ids: service.proof })}
        </aside>
      </div>
    </div>

    <section class="band band--frost" aria-labelledby="scope-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Scope',
          title: 'What the service covers.',
          lead: service.short,
          id: 'scope-title'
        })}
        <div class="service-detail-grid">
          <div>
            <h3>What gets built</h3>
            ${checkList(service.built)}
          </div>
          <div>
            <h3>What changes</h3>
            <ul class="plain-list plain-list--large">${service.changes.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    </section>

    <section class="band" aria-labelledby="proof-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Proof',
          title: 'Relevant work, with its boundary.',
          lead: 'The nearest public evidence for this service. Private and prototype work is labelled as such.',
          id: 'proof-title'
        })}
        ${proofStrip(service.proof)}
      </div>
    </section>

    <section class="band band--tight" aria-labelledby="fit-title">
      <div class="shell shell--narrow">
        <h2 class="sr-only" id="fit-title">Fit</h2>
        ${boundaryPanel({
          title: 'When this is not the right service',
          items: [`<strong>${service.name}:</strong> ${service.notFit}`],
          id: 'service-fit'
        })}
        <div class="next-services">
          <p class="kicker">Related services</p>
          <ul>
            ${next
              .map(
                item => `<li><a href="/services/${item.slug}/"><span>${item.name}</span><span aria-hidden="true">&#8594;</span></a></li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: 'Bring the situation, not a specification.',
      body: 'A useful first conversation starts with what happens now, who it affects, and what would count as a useful change.',
      primary: { label: service.cta.label, href: service.cta.href },
      secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
      id: 'service-cta'
    })}
  `;

  return renderDocument({
    title: `${service.name} in Ghana | Success Above Dreams`,
    description: `${service.headline} ${service.short}`,
    path: `/services/${service.slug}/`,
    body
  });
}
