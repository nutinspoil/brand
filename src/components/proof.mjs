import { esc } from '../lib/html.mjs';
import { btn, figure, statusBadge } from './primitives.mjs';
import { GROUPS, projectById } from '../content/projects.mjs';
import { STATUS } from '../content/site.mjs';

export function workflowDiagram() {
  const steps = [
    ['01', 'Record sale', 'Item lines and tender'],
    ['02', 'Split cash / Mobile Money', 'One sale, two payment records'],
    ['03', 'Update inventory', 'Stock moves at the sale'],
    ['04', 'Close shift', 'Counted totals against records'],
    ['05', 'Manager reviews', 'Discrepancies and role actions']
  ];
  return `<figure class="diagram diagram--workflow">
    <div class="diagram__body">
      <ol class="flow">${steps
        .map(
          step =>
            `<li class="flow__step"><span class="flow__n">${step[0]}</span><span class="flow__title">${step[1]}</span><span class="flow__detail">${step[2]}</span></li>`
        )
        .join('')}</ol>
    </div>
    <figcaption class="diagram__caption"><span class="chip">Workflow schematic</span> Client records withheld · system logic shown</figcaption>
  </figure>`;
}

export function rolesDiagram() {
  return `<figure class="diagram diagram--roles">
    <div class="diagram__body">
      <div class="role">
        <p class="role__head">Cashier</p>
        <ul><li>Records the sale</li><li>Splits tender</li><li>Sees the current shift</li></ul>
      </div>
      <div class="role role--mid">
        <p class="role__head">Supervisor / accountant</p>
        <ul><li>Verifies tender</li><li>Adjusts stock</li><li>Verifies the close</li></ul>
      </div>
      <div class="role">
        <p class="role__head">Owner</p>
        <ul><li>Reviews activity</li><li>Reviews role actions</li><li>Does not edit the day</li></ul>
      </div>
    </div>
    <figcaption class="diagram__caption"><span class="chip">Role schematic</span> Access boundaries shown · client records withheld</figcaption>
  </figure>`;
}

export function registerDiagram() {
  return `<figure class="diagram diagram--register">
    <div class="diagram__body">
      <div class="register">
        <div class="register__device">
          <span class="chip">Test build</span>
          <p class="register__title">Counter device</p>
          <ul class="register__queue">
            <li><span>Sale</span><span>Captured locally</span></li>
            <li><span>Sale</span><span>Captured locally</span></li>
            <li><span>Shift</span><span>Open</span></li>
          </ul>
          <p class="register__state">Connection lost · still recording</p>
        </div>
        <div class="register__sync" aria-hidden="true"><span>Sync when connected</span></div>
        <div class="register__ledger">
          <span class="chip">Shift ledger</span>
          <p class="register__title">Reconciled record</p>
          <ul class="register__queue">
            <li><span>Recorded sales</span><span>Queued</span></li>
            <li><span>Tender totals</span><span>Checked</span></li>
            <li><span>Sync state</span><span>Pending</span></li>
          </ul>
          <p class="register__state">No metric claimed · under test</p>
        </div>
      </div>
    </div>
    <figcaption class="diagram__caption"><span class="chip">Technical schematic</span> Prototype · not a released product</figcaption>
  </figure>`;
}

export function systemDiagram() {
  return `<figure class="diagram diagram--system">
    <div class="diagram__body">
      <div class="system">
        <div class="system__keys">
          <span class="system__key"><span>Raised</span></span>
          <span class="system__key system__key--pressed"><span>Pressed</span></span>
          <span class="system__key system__key--recessed"><span>Recessed</span></span>
        </div>
        <div class="system__type">
          <span class="system__aa">Aa</span>
          <span>Archivo · Instrument Serif italic · JetBrains Mono</span>
        </div>
      </div>
    </div>
    <figcaption class="diagram__caption"><span class="chip">Practice artifact</span> In-house product system · used on this site</figcaption>
  </figure>`;
}

export function diagramFor(project) {
  switch (project.schematic) {
    case 'workflow':
      return workflowDiagram();
    case 'roles':
      return rolesDiagram();
    case 'register':
      return registerDiagram();
    case 'system':
      return systemDiagram();
    default:
      return '';
  }
}

function projectActions(project) {
  const actions = [];
  if (project.liveHref) {
    actions.push(btn({
      label: project.liveLabel,
      href: project.liveHref,
      variant: 'quiet',
      external: project.liveHref.startsWith('http'),
      icon: project.liveHref.startsWith('http') ? 'up-right' : 'right'
    }));
  }
  if (project.primaryHref) {
    actions.push(btn({ label: project.primaryLabel, href: project.primaryHref, variant: 'quiet' }));
  }
  return actions.join('');
}

export function evidenceCard(project, { feature = false } = {}) {
  const media = project.image
    ? `<img class="evidence__img" src="${esc(project.image)}" alt="${esc(project.imageAlt)}" width="1600" height="1000" loading="${feature ? 'eager' : 'lazy'}" decoding="async"${feature ? ' fetchpriority="high"' : ''}>`
    : diagramFor(project);
  const title = project.caseStudyHref
    ? `<h3 class="evidence__title"><a href="${project.caseStudyHref}">${esc(project.title)}</a></h3>`
    : `<h3 class="evidence__title">${esc(project.title)}</h3>`;
  return `<article class="evidence${feature ? ' evidence--feature' : ''}" data-work-item data-group="${project.group}" data-status="${project.status.key}" data-search="${esc(project.searchTerms)}">
    <div class="evidence__media${project.image ? '' : ' evidence__media--diagram'}">${media}</div>
    <div class="evidence__body">
      <div class="evidence__meta">${statusBadge(project.status)}<span class="evidence__type">${esc(project.type)}</span></div>
      ${title}
      <p class="evidence__situation">${esc(project.situation)}</p>
      <dl class="evidence__record">
        <div><dt>Audience</dt><dd>${esc(project.audience)}</dd></div>
        <div><dt>What changed</dt><dd>${esc(project.resultOrState)}</dd></div>
        <div><dt>Evidence</dt><dd>${esc(project.evidenceType)}</dd></div>
      </dl>
      <p class="evidence__boundary">${esc(project.evidenceBoundary)}</p>
      <div class="evidence__actions">${projectActions(project)}</div>
    </div>
  </article>`;
}

export function relatedCard(project) {
  const href = project.caseStudyHref || project.primaryHref || (project.liveHref?.startsWith('/') ? project.liveHref : '/work/');
  return `<a class="related-card" href="${href}">
    <span class="related-card__meta">${statusBadge(project.status, { short: true })}<span>${esc(project.type)}</span></span>
    <strong>${esc(project.title)}</strong>
    <span class="related-card__result">${esc(project.resultOrState)}</span>
    <span class="related-card__arrow" aria-hidden="true">&#8594;</span>
  </a>`;
}

export function featureProof(project, { image = project.image, imageAlt = project.imageAlt } = {}) {
  return `<article class="feature-proof">
    <div class="feature-proof__media">
      <img src="${esc(image)}" alt="${esc(imageAlt)}" width="1600" height="1000" loading="eager" decoding="async" fetchpriority="high">
      <div class="feature-proof__tag">${statusBadge(project.status)}<span>${esc(project.type)} · ${esc(project.location)}</span></div>
    </div>
    <div class="feature-proof__body">
      <p class="kicker">First proof</p>
      <h3 class="feature-proof__title">${esc(project.title)}</h3>
      <p class="feature-proof__change">${esc(project.resultOrState)}</p>
      <dl class="evidence__record">
        <div><dt>Situation</dt><dd>${esc(project.situation)}</dd></div>
        <div><dt>Users</dt><dd>${esc(project.audience)}</dd></div>
        <div><dt>Evidence</dt><dd>${esc(project.evidenceType)} · public capture</dd></div>
      </dl>
      <div class="feature-proof__actions">
        ${btn({ label: 'View the live guest experience', href: project.liveHref, variant: 'primary', external: true, icon: 'up-right' })}
        ${btn({ label: 'Read the case', href: project.caseStudyHref, variant: 'quiet' })}
      </div>
      <p class="feature-proof__boundary">${esc(project.evidenceBoundary)}</p>
    </div>
  </article>`;
}

export function pickerPanel(project, active = false) {
  const media = project.image
    ? `<img src="${esc(project.image)}" alt="${esc(project.imageAlt)}" width="1600" height="1000" loading="lazy" decoding="async">`
    : diagramFor(project);
  return `<article class="picker__panel" data-panel="${project.id}"${active ? ' data-active="true"' : ''}>
    <div class="picker__media">${media}</div>
    <div class="picker__body">
      <div class="evidence__meta">${statusBadge(project.status)}<span class="evidence__type">${esc(project.type)}</span></div>
      <h3 class="picker__title">${project.caseStudyHref ? `<a href="${project.caseStudyHref}">${esc(project.title)}</a>` : esc(project.title)}</h3>
      <p class="picker__change">${esc(project.resultOrState)}</p>
      <div class="picker__actions">
        ${project.liveHref ? btn({ label: project.liveLabel, href: project.liveHref, variant: 'primary', external: project.liveHref.startsWith('http'), icon: project.liveHref.startsWith('http') ? 'up-right' : 'right' }) : ''}
        ${project.caseStudyHref ? btn({ label: 'Read the case', href: project.caseStudyHref, variant: 'quiet' }) : btn({ label: project.primaryLabel, href: project.primaryHref, variant: 'primary' })}
      </div>
    </div>
  </article>`;
}

export function proofPicker(ids) {
  const projects = ids.map(projectById).filter(Boolean);
  return `<div class="picker" data-picker>
    <div class="picker__bar" role="group" aria-label="Preview another proof">
      ${projects
        .map(
          (project, index) =>
            `<button class="picker__button" type="button" data-pick="${project.id}" aria-pressed="${index === 0 ? 'true' : 'false'}">${esc(project.title)}</button>`
        )
        .join('')}
    </div>
    <div class="picker__panels">
      ${projects.map((project, index) => pickerPanel(project, index === 0)).join('')}
    </div>
    <p class="sr-only" data-picker-status aria-live="polite"></p>
  </div>`;
}

export function comparisonRow() {
  const items = [
    {
      key: 'public',
      title: GROUPS[0].title,
      note: 'Live site or store, with published captures.',
      link: { label: 'See public products', href: '/work/#public-products' }
    },
    {
      key: 'private',
      title: GROUPS[1].title,
      note: 'Workflow, roles, and redacted operational evidence.',
      link: { label: 'See private systems', href: '/work/#private-systems' }
    },
    {
      key: 'prototype',
      title: GROUPS[2].title,
      note: 'Technical direction and current test status.',
      link: { label: 'See prototypes', href: '/work/#prototypes' }
    }
  ];
  return `<ul class="comparison">${items
    .map(
      item =>
        `<li class="comparison__cell"><span class="comparison__status">${statusBadge(item.key === 'public' ? 'live' : item.key === 'private' ? 'private' : 'testing', { short: true })}</span><h3>${item.title}</h3><p>${item.note}</p><a href="${item.link.href}">${item.link.label}<span class="arrow" aria-hidden="true">&#8594;</span></a></li>`
    )
    .join('')}</ul>`;
}

export function proofStrip(ids) {
  return `<div class="proof-strip">${ids
    .map(id => {
      const project = projectById(id);
      if (!project) return '';
      const media = project.image
        ? `<img src="${esc(project.image)}" alt="${esc(project.imageAlt)}" width="1600" height="1000" loading="lazy" decoding="async">`
        : diagramFor(project);
      const href = project.caseStudyHref || project.primaryHref || '/work/';
      return `<a class="proof-strip__item" href="${href}">
        <span class="proof-strip__media">${media}</span>
        <span class="proof-strip__meta">${statusBadge(project.status, { short: true })}<span>${esc(project.type)}</span></span>
        <strong>${esc(project.title)}</strong>
        <span class="proof-strip__result">${esc(project.resultOrState)}</span>
      </a>`;
    })
    .join('')}</div>`;
}

export function mediaFor(project) {
  if (project.image) {
    return `<img src="${esc(project.image)}" alt="${esc(project.imageAlt)}" width="1600" height="1000" loading="lazy" decoding="async">`;
  }
  return diagramFor(project);
}

export function statusLegend() {
  return `<ul class="legend">${Object.values(STATUS)
    .map(
      entry =>
        `<li><span class="legend__mark legend__mark--${entry.key}" aria-hidden="true"></span><span><strong>${esc(entry.label)}</strong><span>${esc(entry.note)}</span></span></li>`
    )
    .join('')}</ul>`;
}

export function captureFigure(capture) {
  return figure({
    src: capture.src,
    alt: capture.alt,
    caption: capture.caption,
    tag: capture.tag
  });
}
