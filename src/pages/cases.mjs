import {
  breadcrumb,
  btn,
  chip,
  figure,
  kicker,
  sectionHead,
  statusBadge
} from '../components/primitives.mjs';
import { relatedCard, workflowDiagram } from '../components/proof.mjs';
import { boundaryPanel, ctaPanel, workflowRail } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import { CR_CASE, NS_CASE, POS_CASE } from '../content/cases.mjs';
import { projectById } from '../content/projects.mjs';

function caseHero(data, statusKey, extra = '') {
  const facts = data.facts
    .filter(row => row[0] !== 'Status')
    .map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`)
    .join('');
  return `<section class="case-hero">
    <div class="shell">
      ${breadcrumb([
        { label: 'Work', href: '/work/' },
        { label: data.title }
      ])}
      <div class="case-hero__grid">
        <div class="case-hero__copy">
          ${kicker(data.eyebrow)}
          <h1 class="title-1" id="page-title">${data.title}</h1>
          ${extra}
          <p class="lead lead--large">${data.lead}</p>
          <div class="actions">
            ${btn({ label: data.primary.label, href: data.primary.href, external: data.primary.external, icon: data.primary.external ? 'up-right' : 'right' })}
            ${btn({ label: data.secondary.label, href: data.secondary.href, external: data.secondary.external, variant: 'quiet', icon: data.secondary.external ? 'up-right' : 'right' })}
          </div>
        </div>
        <aside class="case-brief" aria-label="Project at a glance">
          ${statusBadge(statusKey)}
          <dl class="facts">${facts}</dl>
          <p class="case-brief__note">${data.summary}</p>
        </aside>
      </div>
    </div>
  </section>`;
}

function captureStrip(captures, label) {
  return `<section class="band band--frost band--tight" aria-labelledby="captures-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'Evidence',
        title: label,
        lead: 'Each capture is taken from the live product. The caption says what the state shows, not what it might become.',
        id: 'captures-title',
        className: 'section-head--statement'
      })}
      <div class="capture-grid">
        ${captures
          .map((capture, index) =>
            figure({
              src: capture.src,
              alt: capture.alt,
              caption: capture.caption,
              tag: capture.tag,
              priority: index === 0
            })
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

function decisionModules(decisions, captures) {
  return `<div class="decision-list">${decisions
    .map(
      decision => `<article class="decision">
        <div class="decision__copy">
          <span class="decision__n">${decision.n}</span>
          <h3>${decision.title}</h3>
          <p>${decision.body}</p>
        </div>
        <div class="decision__proof">
          ${figure({
            src: captures[decision.evidence].src,
            alt: captures[decision.evidence].alt,
            caption: captures[decision.evidence].caption,
            tag: captures[decision.evidence].tag
          })}
        </div>
      </article>`
    )
    .join('')}</div>`;
}

function resultPanel(result, boundary) {
  return `<div class="result-panel">
    <div class="result-panel__copy">
      <p class="kicker">Result</p>
      <h2 class="title-2">What changed, in plain terms.</h2>
      <p class="result-panel__statement">${result}</p>
    </div>
    <div class="result-panel__boundary">
      ${boundaryPanel({ title: 'Evidence boundary', items: [boundary], id: 'result-boundary' })}
    </div>
  </div>`;
}

function relatedSection(ids, title = 'Related work') {
  return `<section class="band band--tight" aria-labelledby="related-title">
    <div class="shell">
      ${sectionHead({
        eyebrow: 'Continue',
        title,
        lead: 'Comparable work, with the same evidence rules.',
        id: 'related-title'
      })}
      <div class="related-grid">${ids.map(id => relatedCard(projectById(id))).join('')}</div>
    </div>
  </section>`;
}

export function nsCasePage() {
  const data = NS_CASE;
  const body = `
    ${caseHero(data, 'live')}
    ${captureStrip(data.captures, 'The guest experience, as published.')}
    <section class="band" aria-labelledby="context-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Situation',
          title: 'What the guest needed before making contact.',
          lead: data.summary,
          id: 'context-title'
        })}
        <div class="case-context">
          <div>
            <h3>The situation</h3>
            <p>${data.situation}</p>
          </div>
          <div>
            <h3>Who it serves</h3>
            <p>${data.users}</p>
          </div>
        </div>
        <p class="case-change">${data.change}</p>
      </div>
    </section>
    <section class="band band--frost" aria-labelledby="flow-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Workflow',
          title: 'From interest to an informed enquiry.',
          lead: 'The site carries the decision until the guest is ready to talk to the property.',
          id: 'flow-title',
          className: 'section-head--margin'
        })}
        ${workflowRail(data.workflow, { label: 'Guest journey' })}
      </div>
    </section>
    <section class="band" aria-labelledby="decisions-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Decisions',
          title: 'Three decisions, each paired with evidence.',
          lead: 'The reasoning matters only if the published state supports it.',
          id: 'decisions-title',
          className: 'section-head--statement'
        })}
        ${decisionModules(data.decisions, data.captures)}
      </div>
    </section>
    <section class="band band--tight" aria-labelledby="result-title">
      <div class="shell">
        ${resultPanel(data.result, data.boundary)}
      </div>
    </section>
    ${relatedSection(data.related)}
    ${ctaPanel({
      eyebrow: 'Hospitality sites',
      title: data.finalCta.title,
      body: data.finalCta.body,
      primary: data.finalCta.primary,
      secondary: data.finalCta.secondary,
      id: 'case-cta'
    })}
  `;
  return renderDocument({
    title: 'NS Luxury Villa — hospitality website case study | Success Above Dreams',
    description:
      'How a guest-facing hospitality website helps visitors understand rooms, rates, facilities and location before contacting NS Luxury Villa in Lokoe, Ho.',
    path: '/work/ns-luxury-villa/',
    body
  });
}

export function crCasePage() {
  const data = CR_CASE;
  const body = `
    ${caseHero(data, 'live')}
    ${captureStrip(data.captures, 'Catalogue, product and home states, as published.')}
    <section class="band" aria-labelledby="context-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Situation',
          title: 'The catalogue existed in fragments.',
          lead: data.summary,
          id: 'context-title'
        })}
        <div class="case-context">
          <div>
            <h3>The situation</h3>
            <p>${data.situation}</p>
          </div>
          <div>
            <h3>Who it serves</h3>
            <p>${data.users}</p>
          </div>
        </div>
        <p class="case-change">${data.change}</p>
      </div>
    </section>
    <section class="band band--frost" aria-labelledby="flow-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Workflow',
          title: 'What is captured, and what is not.',
          lead: 'The visible states stop where the public evidence stops. Delivery and order placement are marked as unverified.',
          id: 'flow-title',
          className: 'section-head--margin'
        })}
        ${workflowRail(data.workflow, { label: 'Shopping journey' })}
        <p class="band__aside">The two unverified steps are not shown as working screenshots. That boundary is part of the evidence.</p>
      </div>
    </section>
    <section class="band" aria-labelledby="decisions-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Decisions',
          title: 'Structure first, campaign second.',
          lead: 'The storefront holds product information once, in a form customers can use.',
          id: 'decisions-title',
          className: 'section-head--statement'
        })}
        ${decisionModules(data.decisions, data.captures)}
      </div>
    </section>
    <section class="band band--tight" aria-labelledby="result-title">
      <div class="shell">
        ${resultPanel(data.result, data.boundary)}
      </div>
    </section>
    ${relatedSection(data.related)}
    ${ctaPanel({
      eyebrow: 'Online stores',
      title: data.finalCta.title,
      body: data.finalCta.body,
      primary: data.finalCta.primary,
      secondary: data.finalCta.secondary,
      id: 'case-cta'
    })}
  `;
  return renderDocument({
    title: 'CR Cosmetics & Essentials case study | Success Above Dreams',
    description:
      'How a structured e-commerce storefront replaced scattered WhatsApp product posts with a searchable catalogue, product options, prices and delivery information.',
    path: '/work/cr-cosmetics/',
    body
  });
}

export function posCasePage() {
  const data = POS_CASE;
  const rows = data.table.rows
    .map(
      row =>
        `<tr>${row
          .map((cell, index) =>
            index === 0
              ? `<th scope="row">${cell}</th>`
              : `<td data-label="${data.table.columns[index]}">${cell}</td>`
          )
          .join('')}</tr>`
    )
    .join('');

  const body = `
    ${caseHero(
      data,
      'private',
      `<p class="case-boundary-line">${data.statusLine}</p>`
    )}
    <section class="band band--frost band--tight" aria-labelledby="schematic-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'System logic',
          title: 'One sale, recorded once, closed against evidence.',
          lead: data.system,
          id: 'schematic-title',
          className: 'section-head--margin'
        })}
        ${workflowDiagram()}
      </div>
    </section>
    <section class="band" aria-labelledby="roles-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Roles',
          title: 'Every role has a boundary.',
          lead: 'The system gives each person the actions their job needs, and leaves the rest visible but unavailable.',
          id: 'roles-title'
        })}
        <div class="role-grid">
          ${data.scope
            .map(
              role => `<article class="role-card">
                <h3>${role.role}</h3>
                <p>${role.detail}</p>
              </article>`
            )
            .join('')}
        </div>
        <ul class="scope-chips" aria-label="System scope">${data.scopeItems
          .map(item => `<li>${chip(item)}</li>`)
          .join('')}</ul>
      </div>
    </section>
    <section class="band band--frost" aria-labelledby="walkthrough-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Walkthrough',
          title: 'The counter workflow, step by step.',
          lead: 'Each step creates or changes a record. Nothing is reconstructed later from memory.',
          id: 'walkthrough-title',
          className: 'section-head--statement'
        })}
        <div class="pos-walkthrough">
          <ol class="pos-steps">
            ${data.workflow
              .map(
                (step, index) => `<li>
                  <span class="pos-steps__n">${String(index + 1).padStart(2, '0')}</span>
                  <div><h3>${step.label}</h3><p>${step.detail}</p></div>
                </li>`
              )
              .join('')}
          </ol>
          <div class="pos-table">
            <div class="table-wrap" role="region" aria-label="POS controls by role">
              <table class="controls-table">
                <caption>${data.table.caption}. Private client records are not included.</caption>
                <thead><tr>${data.table.columns
                  .map((column, index) => `<th scope="col">${column}${index === 0 ? '' : ''}</th>`)
                  .join('')}</tr></thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
            <p class="pos-table__note">Table cells carry the capability and the role. Status words are written, not shown by colour alone.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="band band--tight" aria-labelledby="result-title">
      <div class="shell">
        <div class="result-panel">
          <div class="result-panel__copy">
            <p class="kicker">Result</p>
            <h2 class="title-2" id="result-title">What the system makes checkable.</h2>
            <p class="result-panel__statement">${data.result}</p>
            <p class="result-panel__caveat">No speed, revenue, or accuracy metric is published. None has been verified for public use.</p>
          </div>
          <div class="result-panel__boundary">
            ${boundaryPanel({ title: 'Evidence boundary', items: data.boundaries, id: 'pos-boundary' })}
          </div>
        </div>
      </div>
    </section>
    <section class="band band--tight" aria-labelledby="pos-related-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Continue',
          title: 'The workflow, and the wider operating picture.',
          lead: 'The POS is one part of a broader operational system.',
          id: 'pos-related-title'
        })}
        <div class="related-grid">
          <a class="related-card" href="/solutions/business-operations/">
            <span class="related-card__meta">${chip('Solution')}<span>Operational control</span></span>
            <strong>A shift that can be closed and defended.</strong>
            <span class="related-card__result">The broader reconciliation and role model behind a counter system.</span>
            <span class="related-card__arrow" aria-hidden="true">&#8594;</span>
          </a>
          <a class="related-card" href="/services/pos-development/">
            <span class="related-card__meta">${chip('Service')}<span>POS development</span></span>
            <strong>A till that closes the shift with evidence.</strong>
            <span class="related-card__result">What a counter system covers, and when it is not the right form.</span>
            <span class="related-card__arrow" aria-hidden="true">&#8594;</span>
          </a>
        </div>
      </div>
    </section>
    ${ctaPanel({
      eyebrow: 'Operations',
      title: data.finalCta.title,
      body: data.finalCta.body,
      primary: data.finalCta.primary,
      secondary: data.finalCta.secondary,
      id: 'case-cta'
    })}
  `;
  return renderDocument({
    title: 'Retail POS and shift ledger — private system | Success Above Dreams',
    description:
      'A private retail point-of-sale and shift ledger: sale recording, split cash and Mobile Money tender, inventory movement, shift close, and role boundaries.',
    path: '/work/business-systems/',
    body
  });
}
