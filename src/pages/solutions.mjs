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
import {
  PRACTICE_STRIP,
  SITUATIONS,
  SOLUTIONS_INTRO,
  SOLUTION_DETAILS
} from '../content/solutions.mjs';
import { projectById } from '../content/projects.mjs';
import { serviceBySlug } from '../content/services.mjs';
import { waHref } from '../content/site.mjs';

function inlineProof(ids) {
  return `<div class="inline-proof">${ids
    .map(id => {
      const project = projectById(id);
      if (!project) return '';
      const href = project.caseStudyHref || project.primaryHref || (project.liveHref?.startsWith('/') ? project.liveHref : '/work/');
      return `<a class="inline-proof__item" href="${href}">
        ${statusBadge(project.status, { short: true })}
        <strong>${project.title}</strong>
        <span>${project.resultOrState}</span>
      </a>`;
    })
    .join('')}</div>`;
}

export function solutionsPage() {
  const rail = SOLUTIONS_INTRO.rail
    .map(
      (step, index) => `<li>
        <span class="rail-step__n">${String(index + 1).padStart(2, '0')}</span>
        <strong>${step.label}</strong>
        <span>${step.note}</span>
      </li>`
    )
    .join('');

  const modules = SITUATIONS.map(
    situation => `<article class="situation-module" id="situation-${situation.key}" aria-labelledby="situation-${situation.key}-title">
      <div class="situation-module__head">
        <span class="situation-module__n">${situation.number}</span>
        <div>
          <h3 class="title-2" id="situation-${situation.key}-title">${situation.label}</h3>
          <p class="situation-module__plain">${situation.plain}</p>
        </div>
      </div>
      <div class="situation-module__grid">
        <div class="situation-module__col">
          <p class="micro-label">The signal</p>
          <p>${situation.signal}</p>
        </div>
        <div class="situation-module__col">
          <p class="micro-label">The problem</p>
          <p>${situation.problem}</p>
        </div>
        <div class="situation-module__col">
          <p class="micro-label">The path</p>
          <p>${situation.path}</p>
        </div>
      </div>
      <div class="situation-module__foot">
        <div>
          <p class="micro-label">Relevant proof</p>
          ${inlineProof(situation.proof)}
        </div>
        <div class="situation-module__actions">
          ${situation.readMore ? `<a class="text-link" href="${situation.readMore.href}">${situation.readMore.label}<span aria-hidden="true">&#8594;</span></a>` : ''}
          ${btn({ label: situation.action.label, href: situation.action.href, variant: 'quiet' })}
        </div>
      </div>
    </article>`
  ).join('');

  const practice = PRACTICE_STRIP.map(
    item => `<a class="practice-strip__item" href="${item.href}">
      <span class="practice-strip__label">${item.label}</span>
      <p>${item.text}</p>
      <span class="practice-strip__link">${item.link}<span aria-hidden="true"> &#8594;</span></span>
    </a>`
  ).join('');

  const body = `
    <div class="shell">
      ${pageIntro({
        eyebrow: SOLUTIONS_INTRO.eyebrow,
        title: SOLUTIONS_INTRO.title,
        lead: SOLUTIONS_INTRO.lead,
        aside: `<div class="intro-aside">
          <p class="intro-aside__label">How this page works</p>
          <ol class="rail-steps">${rail}</ol>
        </div>`
      })}
    </div>

    <section class="band band--frost" aria-labelledby="situations-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Diagnostic',
          title: 'Five situations, each with a different first move.',
          lead: 'Find the closest description. The evidence and the path belong to that situation, not to a service menu.',
          id: 'situations-title'
        })}
        <div class="situation-list">${modules}</div>
      </div>
    </section>

    <section class="band" aria-labelledby="practice-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'In practice',
          title: 'What the work looks like when the situation is named.',
          lead: 'A quick route from each situation into the nearest public evidence.',
          id: 'practice-title'
        })}
        <div class="practice-strip">${practice}</div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: 'Start with the situation in front of you.',
      body: 'If none of these descriptions fits, describe what is happening in plain language. The first reply will help frame it.',
      primary: { label: 'Describe the situation', href: '/start-a-project/' },
      secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
      id: 'solutions-cta'
    })}
  `;

  return renderDocument({
    title: 'Solutions — start with the situation | Success Above Dreams',
    description:
      'Five situations that lead to different products: public clarity, commerce, operational control, new ventures and product evolution. Each with evidence and a next path.',
    path: '/solutions/',
    body
  });
}

export function solutionPage(key) {
  const detail = SOLUTION_DETAILS[key];
  if (!detail) return null;

  const facts = detail.facts
    .map(([term, value]) => `<div class="definitions__row"><dt>${term}</dt><dd>${value}</dd></div>`)
    .join('');

  const body = `
    <div class="shell">
      ${breadcrumb([
        { label: 'Solutions', href: '/solutions/' },
        { label: detail.facts[0][1] }
      ])}
      <div class="page-intro">
        <div class="page-intro__copy">
          <p class="kicker">${detail.eyebrow}</p>
          <h1 class="title-1" id="page-title">${detail.title}</h1>
          <p class="lead lead--large">${detail.lead}</p>
          <div class="actions">
            ${btn({ label: detail.primary.label, href: detail.primary.href })}
            ${btn({ label: detail.secondary.label, href: detail.secondary.href, variant: 'quiet' })}
          </div>
        </div>
        <aside class="intro-aside" aria-label="Solution at a glance">
          <p class="intro-aside__label">At a glance</p>
          <dl class="definitions">${facts}</dl>
        </aside>
      </div>
    </div>

    <section class="band band--frost" aria-labelledby="situation-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'The situation',
          title: 'What is happening now.',
          lead: detail.situation,
          id: 'situation-title'
        })}
        <div class="signals-grid">
          <div>
            <h3>Signals to look for</h3>
            ${checkList(detail.signals)}
          </div>
          <div>
            <h3>The path we would consider</h3>
            <ol class="path-steps">${detail.path
              .map((step, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${step}</p></li>`)
              .join('')}</ol>
          </div>
        </div>
      </div>
    </section>

    <section class="band" aria-labelledby="proof-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Evidence',
          title: 'The nearest work to this situation.',
          lead: 'The proof is shown before the recommendation. Each card keeps its own status and boundary.',
          id: 'proof-title'
        })}
        ${proofStrip(detail.proof)}
      </div>
    </section>

    <section class="band band--tight" aria-labelledby="boundary-title">
      <div class="shell shell--narrow">
        <h2 class="sr-only" id="boundary-title">Boundary and related services</h2>
        ${boundaryPanel({
          title: 'When this is not the right path',
          items: [detail.notFit],
          id: 'solution-boundary'
        })}
        <div class="next-services">
          <p class="kicker">Services that carry this path</p>
          <ul>
            ${detail.services
              .map(service => serviceBySlug(service))
              .filter(Boolean)
              .map(
                service => `<li><a href="/services/${service.slug}/"><span>${service.name}</span><span aria-hidden="true">&#8594;</span></a></li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: 'Test the situation against the work.',
      body: 'Bring the current flow, the records in use, and the point where it breaks. The first reply names a useful next step.',
      primary: detail.primary,
      secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
      id: 'solution-cta'
    })}
  `;

  return renderDocument({
    title: `${detail.eyebrow} | Success Above Dreams`,
    description: detail.lead,
    path: `/solutions/${detail.key}/`,
    body
  });
}
