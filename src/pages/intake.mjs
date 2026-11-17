import { json, esc } from '../lib/html.mjs';
import { btn, chip, kicker, note } from '../components/primitives.mjs';
import { ctaPanel, pageIntro } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import { SITE } from '../content/site.mjs';
import {
  CONTACT,
  INTAKE,
  NOT_FOUND,
  SERVICE_PREFILL,
  SITUATION_PREFILL
} from '../content/intake.mjs';

const field = ({
  name,
  id,
  label,
  placeholder = '',
  required = false,
  multiline = false,
  options = null,
  error
}) => {
  const control = options
    ? `<select id="${id}" name="${name}"${required ? ' required' : ''} aria-describedby="${id}-error">
        ${options.map(option => `<option>${esc(option)}</option>`).join('')}
      </select>`
    : multiline
      ? `<textarea id="${id}" name="${name}" rows="5" placeholder="${esc(placeholder)}"${required ? ' required' : ''} aria-describedby="${id}-error"></textarea>`
      : `<input id="${id}" name="${name}" type="text" placeholder="${esc(placeholder)}"${required ? ' required' : ''} autocomplete="${name === 'name' ? 'name' : 'off'}" aria-describedby="${id}-error">`;

  return `<div class="field${multiline ? ' field--wide' : ''}">
    <label for="${id}">${esc(label)}${required ? '<span class="field__required">Required</span>' : '<span class="field__optional">Optional</span>'}</label>
    ${control}
    <p class="field__error" id="${id}-error" data-error-for="${name}" hidden>${esc(error)}</p>
  </div>`;
};

export function intakePage() {
  const body = `
    <div class="shell">
      ${pageIntro({
        eyebrow: INTAKE.eyebrow,
        title: INTAKE.title,
        lead: INTAKE.lead,
        className: 'page-intro--intake',
        aside: `<div class="intake-aside">
          <p class="intro-aside__label">Before you start</p>
          <ul class="intake-aside__list">${INTAKE.reassurance
            .map(item => `<li><strong>${item.label}</strong><span>${item.body}</span></li>`)
            .join('')}</ul>
        </div>`
      })}
    </div>

    <section class="band band--frost" aria-labelledby="intake-form-title">
      <div class="shell intake-layout">
        <h2 class="sr-only" id="intake-form-title">Project brief</h2>
        <form class="intake-form" data-intake-form novalidate>
          <noscript>
            <div class="intake-noscript">
              <p><strong>The structured brief needs JavaScript.</strong> The form runs in your browser and prepares a WhatsApp message; without JavaScript it cannot build the transcript.</p>
              <p><a class="button button--primary" href="${INTAKE.direct.href}" target="_blank" rel="noopener noreferrer">Message Emmanuel directly instead<span class="button__arrow" aria-hidden="true">&#8599;</span></a></p>
              <p>You can also call or message <a href="${INTAKE.direct.href}" target="_blank" rel="noopener noreferrer">+233 54 367 1806 on WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>.</p>
            </div>
          </noscript>

          <fieldset class="intake-stage">
            <legend class="intake-stage__legend">
              <span class="intake-stage__n">${INTAKE.stages.required.n}</span>
              <span class="intake-stage__label">${INTAKE.stages.required.label}</span>
              <span class="intake-stage__note">${INTAKE.stages.required.note}</span>
            </legend>
            <div class="intake-stage__fields">
              ${field({
                name: 'name',
                id: 'intake-name',
                label: INTAKE.fields.name.label,
                placeholder: INTAKE.fields.name.placeholder,
                required: true,
                error: 'Enter your name so the reply can address you.'
              })}
              ${field({
                name: 'contact',
                id: 'intake-contact',
                label: INTAKE.fields.contact.label,
                placeholder: INTAKE.fields.contact.placeholder,
                required: true,
                error: 'Add an email address or WhatsApp number so there is a way to reply.'
              })}
              ${field({
                name: 'brief',
                id: 'intake-brief',
                label: INTAKE.fields.brief.label,
                placeholder: INTAKE.fields.brief.placeholder,
                required: true,
                multiline: true,
                error: 'Describe the situation in a sentence or two.'
              })}
            </div>
          </fieldset>

          <fieldset class="intake-stage">
            <legend class="intake-stage__legend">
              <span class="intake-stage__n">${INTAKE.stages.optional.n}</span>
              <span class="intake-stage__label">${INTAKE.stages.optional.label}</span>
              <span class="intake-stage__note">${INTAKE.stages.optional.note}</span>
            </legend>
            <div class="intake-stage__fields">
              ${field({
                name: 'organisation',
                id: 'intake-organisation',
                label: INTAKE.fields.organisation.label,
                placeholder: INTAKE.fields.organisation.placeholder,
                error: ''
              })}
              ${field({
                name: 'situation',
                id: 'intake-situation',
                label: INTAKE.fields.situation.label,
                placeholder: INTAKE.fields.situation.placeholder,
                error: ''
              })}
              ${field({
                name: 'firstVersion',
                id: 'intake-first-version',
                label: INTAKE.fields.firstVersion.label,
                placeholder: INTAKE.fields.firstVersion.placeholder,
                error: ''
              })}
              ${field({
                name: 'timing',
                id: 'intake-timing',
                label: INTAKE.fields.timing.label,
                options: INTAKE.timingOptions,
                error: ''
              })}
              ${field({
                name: 'budget',
                id: 'intake-budget',
                label: INTAKE.fields.budget.label,
                options: INTAKE.budgetOptions,
                error: ''
              })}
            </div>
          </fieldset>

          <div class="intake-stage intake-stage--review">
            <div class="intake-stage__legend">
              <span class="intake-stage__n">${INTAKE.stages.review.n}</span>
              <span class="intake-stage__label">${INTAKE.stages.review.label}</span>
              <span class="intake-stage__note">${INTAKE.stages.review.note}</span>
            </div>
            <div class="transcript" data-transcript>
              <div class="transcript__head">
                <h2 class="transcript__title">${INTAKE.transcript.title}</h2>
                <p class="transcript__state" data-transcript-state role="status" aria-live="polite">${INTAKE.transcript.states.incomplete}</p>
              </div>
              <p class="transcript__body" data-transcript-body>${INTAKE.transcript.empty}</p>
              <p class="transcript__note">${INTAKE.transcript.note}</p>
            </div>
          </div>

          <fieldset class="intake-stage intake-stage--consent">
            <legend class="intake-stage__legend">
              <span class="intake-stage__n">${INTAKE.stages.consent.n}</span>
              <span class="intake-stage__label">${INTAKE.stages.consent.label}</span>
              <span class="intake-stage__note">${INTAKE.stages.consent.note}</span>
            </legend>
            <div class="consent">
              <p class="consent__text" id="intake-consent-text">${INTAKE.consent}</p>
              <div class="consent__check">
                <input type="checkbox" id="intake-consent" name="consent" aria-describedby="intake-consent-text intake-consent-error">
                <label for="intake-consent">I agree to this handoff.</label>
              </div>
              <p class="field__error" id="intake-consent-error" data-error-for="consent" hidden>Confirm this to prepare the message.</p>
            </div>
          </fieldset>

          <div class="intake-submit">
            <button class="button button--primary intake-submit__button" type="submit" data-intake-submit>Review my WhatsApp draft<span class="button__arrow" aria-hidden="true">&#8594;</span></button>
            <p class="intake-submit__note">Nothing is sent by this site. The draft opens WhatsApp so you can review it before sending.</p>
          </div>
        </form>

        <aside class="intake-rail" aria-label="What happens next">
          <div class="intake-rail__block">
            <p class="kicker">After the brief</p>
            <ol class="intake-rail__steps">
              <li><strong>Emmanuel reads it.</strong><span>Not a sales team, and not an automated reply.</span></li>
              <li><strong>The first reply names a next step.</strong><span>A conversation, a scope, or an honest recommendation not to build.</span></li>
              <li><strong>Scope before work.</strong><span>The first release and its exclusions are agreed in writing.</span></li>
            </ol>
          </div>
          <div class="intake-rail__block intake-rail__direct">
            <p class="kicker">Skip the structure</p>
            <h2>${INTAKE.direct.title}</h2>
            <p>${INTAKE.direct.body}</p>
            <a class="text-link" href="${INTAKE.direct.href}" target="_blank" rel="noopener noreferrer">${INTAKE.direct.label}<span aria-hidden="true">&#8599;</span><span class="sr-only"> (opens in a new tab)</span></a>
          </div>
          <div class="intake-rail__block">
            <p class="kicker">One public example</p>
            <p>If the brief resembles a hospitality site, the NS Luxury Villa work is the nearest public evidence.</p>
            <a class="text-link" href="/work/ns-luxury-villa/">Read the NS case study<span aria-hidden="true">&#8594;</span></a>
          </div>
        </aside>
      </div>
    </section>

    <section class="band band--tight" aria-labelledby="intake-prepared-title" data-prepared hidden>
      <div class="shell">
        <div class="prepared" data-prepared-panel tabindex="-1">
          <p class="prepared__state" role="status" aria-live="polite">${INTAKE.transcript.states.prepared}</p>
          <h2 class="title-2" id="intake-prepared-title">${INTAKE.prepared.title}</h2>
          <p>${INTAKE.prepared.body}</p>
          <p><a class="button button--primary" data-prepared-link href="${INTAKE.direct.href}" target="_blank" rel="noopener noreferrer">${INTAKE.prepared.action}<span class="button__arrow" aria-hidden="true">&#8599;</span></a></p>
          <p class="prepared__next">${INTAKE.prepared.next}</p>
          <p class="prepared__reset"><button class="text-link" type="button" data-prepared-reset>Edit the brief and prepare another message</button></p>
        </div>
      </div>
    </section>

    <script type="application/json" id="intake-prefills">${json({
      services: SERVICE_PREFILL,
      situations: SITUATION_PREFILL,
      whatsapp: SITE.whatsapp.number
    })}</script>
  `;

  return renderDocument({
    title: 'Start a project — prepare a structured brief | Success Above Dreams',
    description:
      'Describe the situation, the people affected, and a useful first version. The brief runs in your browser and opens a prepared WhatsApp message for you to review and send.',
    path: '/start-a-project/',
    body,
    bodyClass: 'page-intake'
  });
}

export function contactPage() {
  const contactTitle = CONTACT.title.replace(
    'what you are trying to create.',
    '<em>what you are trying to create.</em>'
  );
  const facts = `<dl class="contact-strip">${CONTACT.facts
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('')}</dl>`;
  const body = `
    <div class="shell">
      <header class="contact-opener">
        ${kicker(CONTACT.eyebrow)}
        <h1 class="title-1" id="page-title">${contactTitle}</h1>
        <p class="lead lead--large">${CONTACT.lead}</p>
        ${facts}
      </header>
    </div>

    <section class="band band--frost" aria-labelledby="contact-options-title">
      <div class="shell">
        <h2 class="sr-only" id="contact-options-title">Ways to make contact</h2>
        <div class="contact-options">${CONTACT.options
          .map(
            option => `<article class="contact-option${option.primary ? ' contact-option--primary' : ''}">
              ${chip(option.label)}
              <h3>${option.title}</h3>
              <p>${option.body}</p>
              <p class="contact-option__fit"><strong>Best for</strong> ${option.bestFor}</p>
              ${btn({
                label: option.action.label,
                href: option.action.href,
                variant: option.primary ? 'primary' : 'quiet',
                external: option.action.external
              })}
            </article>`
          )
          .join('')}</div>
      </div>
    </section>

    <section class="band band--tight" aria-labelledby="contact-next-title">
      <div class="shell contact-next">
        <div>
          <p class="kicker">What happens next</p>
          <h2 class="title-2" id="contact-next-title">Three steps, no funnel.</h2>
          <p class="lead">The reply is written by the person who would do the work.</p>
        </div>
        <ol class="contact-next__list">${CONTACT.next
          .map(step => `<li><span class="contact-next__n">${step.n}</span><strong>${step.label}</strong><span>${step.body}</span></li>`)
          .join('')}</ol>
      </div>
    </section>

    <section class="band founder-line" aria-labelledby="contact-founder-title">
      <div class="shell founder-line__grid">
        <div>
          <p class="kicker">The founder</p>
          <h2 class="founder-line__quote" id="contact-founder-title">Every enquiry is read by the person who would do the work.</h2>
        </div>
        <div class="founder-line__body">
          <p>There is no separate sales team.</p>
          <div class="founder-line__portfolio">
            <p>${CONTACT.portfolio.label}</p>
            <a class="text-link" href="${CONTACT.portfolio.href}" target="_blank" rel="noopener noreferrer">${CONTACT.portfolio.action}<span aria-hidden="true">&#8599;</span><span class="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Start',
      title: 'If the situation is already clear, prepare the brief.',
      body: 'Three required fields and an optional context section. Nothing sends until you review the message in WhatsApp.',
      primary: { label: 'Prepare a structured brief', href: '/start-a-project/' },
      secondary: { label: 'See the work', href: '/work/' },
      id: 'contact-cta'
    })}
  `;

  return renderDocument({
    title: 'Contact — a direct conversation | Success Above Dreams',
    description:
      'Contact Success Above Dreams in Ghana. Prepare a structured project brief in the browser, or message Emmanuel Drah directly on WhatsApp. No public email address is published.',
    path: '/contact/',
    body
  });
}

export function notFoundPage() {
  const body = `
    <div class="shell">
      <section class="not-found">
        ${kicker(NOT_FOUND.eyebrow)}
        <h1 class="title-1" id="page-title">${NOT_FOUND.title}</h1>
        <p class="lead lead--large">${NOT_FOUND.lead}</p>
        <div class="actions">${NOT_FOUND.links
          .map(link => btn({ label: link.label, href: link.href, variant: link.href === '/start-a-project/' ? 'primary' : 'quiet' }))
          .join('')}</div>
        <div class="not-found__aside">
          ${note({
            label: 'This page',
            body: 'The address may have changed, or the page may never have existed. The three routes above are maintained.'
          })}
        </div>
      </section>
    </div>
  `;

  return renderDocument({
    title: 'Page not found | Success Above Dreams',
    description: 'The address does not match a page on this site. Return to the work, services, or the project brief.',
    path: '/404.html',
    body,
    bodyClass: 'page-404',
    noindex: true
  });
}
