import { arrow, esc } from '../lib/html.mjs';
import { btn, kicker, sectionHead, statusBadge } from './primitives.mjs';

export function ctaPanel({
  eyebrow = 'Next step',
  title,
  body,
  primary,
  secondary,
  id = 'cta-title',
  className = ''
}) {
  return `<section class="cta-panel ${className}" aria-labelledby="${id}">
    <div class="cta-panel__inner">
      <div class="cta-panel__body">
        ${kicker(eyebrow)}
        <h2 class="cta-panel__title" id="${id}">${title}</h2>
        <p class="cta-panel__lead">${body}</p>
      </div>
      <div class="cta-panel__actions">
        ${primary ? btn({ label: primary.label, href: primary.href, variant: 'light', external: primary.external, icon: primary.external ? 'up-right' : 'right' }) : ''}
        ${secondary ? btn({ label: secondary.label, href: secondary.href, variant: 'outline-light', external: secondary.external, icon: secondary.external ? 'up-right' : 'right' }) : ''}
      </div>
    </div>
  </section>`;
}

export function pageIntro({
  eyebrow,
  title,
  lead,
  actions = '',
  aside = '',
  className = '',
  titleId = 'page-title'
}) {
  return `<section class="page-intro ${className}">
    <div class="page-intro__copy">
      ${kicker(eyebrow)}
      <h1 class="title-1" id="${titleId}">${title}</h1>
      <p class="lead lead--large">${lead}</p>
      ${actions ? `<div class="actions">${actions}</div>` : ''}
    </div>
    ${aside ? `<div class="page-intro__aside">${aside}</div>` : ''}
  </section>`;
}

export function workflowRail(steps, { label = 'Workflow' } = {}) {
  return `<ol class="workflow" aria-label="${esc(label)}">${steps
    .map(
      (step, index) =>
        `<li class="workflow__step${step.captured === false ? ' workflow__step--uncaptured' : ''}">
          <span class="workflow__n">${String(index + 1).padStart(2, '0')}</span>
          <span class="workflow__label">${esc(step.label)}</span>
          ${step.note ? `<span class="workflow__note">${esc(step.note)}</span>` : ''}
          ${step.captured === false ? '<span class="workflow__flag">Not visually verified</span>' : ''}
        </li>`
    )
    .join('')}</ol>`;
}

export function stageStrip(stages, { href = '/process/', label = 'See how the work runs' } = {}) {
  return `<div class="stage-strip" aria-label="Process stages">
    <ol>${stages
      .map(
        stage =>
          `<li><span class="stage-strip__n">${stage.n}</span><span>${esc(stage.name)}</span></li>`
      )
      .join('')}</ol>
    <a class="text-link" href="${href}">${label}${arrow('right')}</a>
  </div>`;
}

export function boundaryPanel({ title = 'Evidence boundary', items, tone = 'quiet', id = 'boundary' }) {
  return `<aside class="boundary boundary--${tone}" aria-labelledby="${id}-title">
    <p class="boundary__label" id="${id}-title">${esc(title)}</p>
    <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
  </aside>`;
}

export function practiceProofCards(proofs, projects, { id = 'practice-proof' } = {}) {
  return `<div class="practice-grid" id="${id}">${proofs
    .map(item => {
      const project = projects.find(entry => entry.id === item.project);
      if (!project) return '';
      return `<article class="practice-card">
        <div class="practice-card__meta">${statusBadge(project.status, { short: true })}<span>${esc(project.type)}</span></div>
        <h3 class="practice-card__title">${esc(project.title)}</h3>
        <p class="practice-card__outcome">${esc(item.outcome)}</p>
        <a class="text-link" href="${project.caseStudyHref || project.primaryHref || '/work/'}">${esc(item.label)}${arrow('right')}</a>
      </article>`;
    })
    .join('')}</div>`;
}

export function sectionHeadBlock(options) {
  return sectionHead(options);
}
