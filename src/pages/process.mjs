import { btn, checkList, sectionHead } from '../components/primitives.mjs';
import { ctaPanel, pageIntro } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import {
  ENTRY_ROUTES,
  HANDOVER,
  OWNERSHIP,
  PROCESS_CTA,
  PROCESS_INTRO,
  REVIEW_RECORD,
  STAGES
} from '../content/process.mjs';
import { waHref } from '../content/site.mjs';

export function processPage() {
  const stages = STAGES.map(
    stage => `<li class="stage-card">
      <div class="stage-card__head">
        <span class="stage-card__n">${stage.n}</span>
        <h3>${stage.name}</h3>
      </div>
      <dl class="stage-card__fields">
        <div><dt>Input</dt><dd>${stage.input}</dd></div>
        <div><dt>Work</dt><dd>${stage.work}</dd></div>
        <div><dt>Output</dt><dd>${stage.output}</dd></div>
        <div><dt>Exit decision</dt><dd>${stage.exit}</dd></div>
      </dl>
    </li>`
  ).join('');

  const handover = HANDOVER.items
    .map(
      (item, index) => `<li>
        <span class="handover__n">${String(index + 1).padStart(2, '0')}</span>
        <div><strong>${item.label}</strong><span>${item.note}</span></div>
      </li>`
    )
    .join('');

  const reviewRows = REVIEW_RECORD.rows
    .map(
      ([label, note]) => `<div class="review-record__row"><dt>${label}</dt><dd>${note}</dd></div>`
    )
    .join('');

  const routes = ENTRY_ROUTES.map(
    route => `<article class="entry-route">
      <h3>${route.label}</h3>
      <p>${route.note}</p>
      <p class="entry-route__detail">${route.detail}</p>
      ${btn({
        label: route.action.label,
        href: route.action.href,
        variant: 'quiet',
        external: route.action.external,
        icon: route.action.external ? 'up-right' : 'right'
      })}
    </article>`
  ).join('');

  const body = `
    <div class="shell">
      ${pageIntro({
        eyebrow: PROCESS_INTRO.eyebrow,
        title: PROCESS_INTRO.title,
        lead: PROCESS_INTRO.lead,
        aside: `<dl class="readout readout--stack">${PROCESS_INTRO.readout
          .map(
            item => `<div class="readout__cell"><dt>${item.label}</dt><dd><span class="readout__value">${item.value}</span><span class="readout__note">${item.note}</span></dd></div>`
          )
          .join('')}</dl>`
      })}
    </div>

    <section class="band band--frost band--tight" aria-labelledby="handover-title">
      <div class="shell">
        <div class="handover-layout">
          <div class="handover-layout__copy">
            ${sectionHead({
              eyebrow: HANDOVER.eyebrow,
              title: HANDOVER.title,
              lead: HANDOVER.lead,
              id: 'handover-title'
            })}
            <p class="handover-layout__note">A checklist is not a promise. It is a list of things that must be true before the work changes hands.</p>
          </div>
          <ul class="handover">${handover}</ul>
        </div>
      </div>
    </section>

    <section class="band" aria-labelledby="stages-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Seven stages',
          title: 'One system, from first conversation to a named owner.',
          lead: 'Every stage has an input, a defined piece of work, an output, and the decision that lets the work move on.',
          id: 'stages-title',
          className: 'section-head--statement'
        })}
        <ol class="stages">${stages}</ol>
      </div>
    </section>

    <section class="band band--frost" aria-labelledby="review-title">
      <div class="shell">
        <div class="review-layout">
          <div>
            ${sectionHead({
              eyebrow: REVIEW_RECORD.eyebrow,
              title: REVIEW_RECORD.title,
              lead: REVIEW_RECORD.lead,
              id: 'review-title'
            })}
            <p class="review-layout__status"><span class="chip chip--clay">${REVIEW_RECORD.status}</span><span>Artifact from this website, not a client result.</span></p>
          </div>
          <dl class="review-record" aria-label="Review record">${reviewRows}</dl>
        </div>
      </div>
    </section>

    <section class="band band--ink" aria-labelledby="ownership-title">
      <div class="shell">
        <div class="ownership">
          <div>
            ${sectionHead({
              eyebrow: OWNERSHIP.eyebrow,
              title: OWNERSHIP.title,
              lead: 'The product should be operable by someone else. Ownership is the point of the work, not a retention strategy.',
              id: 'ownership-title'
            })}
          </div>
          <div class="ownership__body">
            ${checkList(OWNERSHIP.items)}
            <p class="ownership__note">${OWNERSHIP.note}</p>
            <a class="text-link" href="${OWNERSHIP.link.href}">${OWNERSHIP.link.label}<span aria-hidden="true">&#8594;</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="band band--frost" aria-labelledby="entry-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Entry routes',
          title: 'Three ways to begin.',
          lead: 'Each route leads to the same first step: enough context to name a useful next move.',
          id: 'entry-title',
          className: 'section-head--margin'
        })}
        <div class="entry-routes">${routes}</div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: PROCESS_CTA.title,
      body: PROCESS_CTA.body,
      primary: PROCESS_CTA.primary,
      secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
      id: 'process-cta'
    })}
  `;

  return renderDocument({
    title: 'Process — from possibility to ownership | Success Above Dreams',
    description:
      'Seven stages from understand to continue, each with a defined output and exit decision. The handover checklist, review record, ownership terms and three entry routes.',
    path: '/process/',
    body
  });
}
