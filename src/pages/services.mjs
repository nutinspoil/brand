import {
  breadcrumb,
  btn,
  checkList,
  sectionHead,
  statusBadge
} from '../components/primitives.mjs';
import { proofStrip } from '../components/proof.mjs';
import { ctaPanel } from '../components/blocks.mjs';
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
  const register = SERVICES.map(
    service => `<li>
      <a href="#service-${service.slug}">
        <span class="service-register__n">${String(service.order).padStart(2, '0')}</span>
        <span class="service-register__name">${service.name}</span>
        <span class="service-register__arrow" aria-hidden="true">&#8595;</span>
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

  const featured = SERVICES[0];
  const featuredProject = projectById(featured.proof[0]);

  const feature = featuredProject
    ? `<article class="service-feature" id="service-${featured.slug}" aria-labelledby="service-${featured.slug}-title">
        <div class="service-feature__copy">
          <p class="kicker">Featured service · ${String(featured.order).padStart(2, '0')}</p>
          <h3 id="service-${featured.slug}-title">${featured.name}</h3>
          <p class="lead">${featured.definition}</p>
          <p class="service-feature__best"><strong>Best for</strong> ${featured.bestFor}</p>
          <ul class="service-feature__changes">${featured.changes.map(item => `<li>${item}</li>`).join('')}</ul>
          <p class="service-feature__boundary"><span>Not the right fit</span>${featured.notFit}</p>
          <div class="service-feature__actions actions">
            ${btn({ label: featured.cta.label, href: featured.cta.href })}
            ${btn({ label: 'See all seven', href: '#service-register-title', variant: 'quiet' })}
          </div>
        </div>
        <div class="service-feature__evidence">
          <figure class="service-feature__media">
            <img src="${featuredProject.image}" alt="${featuredProject.imageAlt}" width="960" height="720" loading="lazy" decoding="async">
            <figcaption class="service-feature__caption">
              <strong>${featuredProject.title}</strong>
              <span>${featuredProject.type} · ${featuredProject.location}</span>
            </figcaption>
          </figure>
          <p class="service-feature__result">${featuredProject.resultOrState}</p>
          <a class="text-link" href="${featuredProject.caseStudyHref || '/work/'}">Read the ${featuredProject.title} record<span aria-hidden="true">&#8594;</span></a>
        </div>
      </article>`
    : '';

  const cells = SERVICES.slice(1)
    .map(
      service => `<article class="service-cell" id="service-${service.slug}" aria-labelledby="service-${service.slug}-title">
        <div class="service-cell__head">
          <span class="service-cell__n">${String(service.order).padStart(2, '0')}</span>
          <h3 id="service-${service.slug}-title"><a href="/services/${service.slug}/">${service.name}</a></h3>
        </div>
        <p class="service-cell__short">${service.short}</p>
        <p class="service-cell__change"><span>What changes</span>${service.changes[0]}</p>
        <div class="service-cell__foot">
          ${ServiceProof({ ids: service.proof })}
          <a class="text-link" href="/services/${service.slug}/">Open<span class="sr-only"> ${service.name}</span><span aria-hidden="true">&#8594;</span></a>
        </div>
      </article>`
    )
    .join('');

  const body = `
    <div class="shell">
      <header class="services-opener">
        <p class="kicker">${SERVICES_INTRO.eyebrow}</p>
        <h1 class="title-1" id="page-title">Different ideas need <em>different forms.</em></h1>
        <p class="lead lead--large">${SERVICES_INTRO.lead}</p>
      </header>

      <nav class="service-register" aria-labelledby="service-register-label">
        <div class="service-register__head">
          <h2 class="service-register__label" id="service-register-label">Seven services</h2>
          <p class="service-register__note">Start with the form that matches the situation.</p>
        </div>
        <ol>${register}</ol>
      </nav>
    </div>

    <section class="band band--ink statement-band" aria-labelledby="principle-title">
      <div class="shell">
        <p class="kicker">Working principle</p>
        <blockquote class="statement-band__quote" id="principle-title">“${SERVICES_INTRO.principle}”</blockquote>
        <p class="statement-band__note">The form is chosen before the stack. When a standard tool already solves the core problem, the honest answer is to say so.</p>
      </div>
    </section>

    <section class="band band--frost" aria-labelledby="forms-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Choose the form',
          title: 'Public, operational, or evolving.',
          lead: 'The same business can need all three over time. The first release only needs the one that matches the current situation.',
          id: 'forms-title',
          className: 'section-head--statement'
        })}
        <div class="product-types">${types}</div>
      </div>
    </section>

    <section class="band" aria-labelledby="service-register-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'The seven',
          title: 'Seven services, each with a boundary.',
          lead: 'A service description is useful when it says what it builds, what changes, and when it is not the right answer.',
          id: 'service-register-title',
          className: 'section-head--margin'
        })}
        <div class="service-ledger">
          ${feature}
          <div class="service-ledger__grid">${cells}</div>
        </div>
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
          id: 'scope-title',
          className: 'section-head--statement'
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
      <div class="shell proof-layout">
        <div class="proof-layout__rail">
          <header class="proof-layout__head">
            <p class="kicker">Proof</p>
            <h2 class="title-2" id="proof-title">Relevant work, with its boundary.</h2>
            <p class="lead">The nearest public evidence for this service. Private and prototype work is labelled as such.</p>
          </header>
          <aside class="proof-layout__aside">
            <p class="micro-label">Evidence boundary</p>
            <p>Public work is captured from the live product. Private systems show workflow and roles with client records withheld. Prototypes are labelled as tests, not releases.</p>
          </aside>
        </div>
        <div class="proof-layout__body">${proofStrip(service.proof)}</div>
      </div>
    </section>

    <section class="band band--ink boundary-band" aria-labelledby="fit-title">
      <div class="shell boundary-band__grid">
        <p class="kicker">Boundary</p>
        <div>
          <h2 class="title-2" id="fit-title">When this is not the right service.</h2>
          <p class="boundary-band__statement"><strong>${service.name}:</strong> ${service.notFit}</p>
        </div>
        <div class="actions">
          ${btn({ label: 'All services', href: '/services/', variant: 'outline-light' })}
          ${btn({ label: service.cta.label, href: service.cta.href, variant: 'light' })}
        </div>
      </div>
    </section>

    <section class="band band--tight" aria-labelledby="related-title">
      <div class="shell">
        <h2 class="sr-only" id="related-title">Related services</h2>
        <p class="kicker">Related services</p>
        <ol class="related-index">
          ${next
            .map(
              (item, index) => `<li><a href="/services/${item.slug}/">
                <span class="related-index__n">${String(index + 1).padStart(2, '0')}</span>
                <span class="related-index__name">${item.name}</span>
                <span class="related-index__short">${item.short}</span>
                <span class="related-index__arrow" aria-hidden="true">&#8594;</span>
              </a></li>`
            )
            .join('')}
        </ol>
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
