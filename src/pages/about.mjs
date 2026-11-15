import { btn, kicker, sectionHead } from '../components/primitives.mjs';
import { practiceProofCards } from '../components/blocks.mjs';
import { ctaPanel } from '../components/blocks.mjs';
import { renderDocument } from '../components/layout.mjs';
import { ABOUT } from '../content/about.mjs';
import { PROJECTS } from '../content/projects.mjs';
import { SITE, waHref } from '../content/site.mjs';

export function aboutPage() {
  const body = `
    <section class="about-hero">
      <div class="shell about-hero__grid">
        <div class="about-hero__copy">
          ${kicker(ABOUT.eyebrow)}
          <h1 class="title-1" id="page-title">${ABOUT.title}</h1>
          <p class="lead lead--large">${ABOUT.lead}</p>
          <dl class="facts">${ABOUT.facts
            .map(([term, value]) => `<div class="facts__row"><dt>${term}</dt><dd>${value}</dd></div>`)
            .join('')}</dl>
          <div class="actions">
            ${btn({ label: 'Discuss what needs an owner', href: '/start-a-project/' })}
            ${btn({ label: 'Read the process', href: '/process/', variant: 'quiet' })}
          </div>
        </div>
        <figure class="about-portrait">
          <div class="about-portrait__frame">
            <img src="${ABOUT.portrait.src}" alt="${ABOUT.portrait.alt}" width="960" height="1280" loading="eager" decoding="async">
          </div>
          <figcaption>${ABOUT.portrait.caption}</figcaption>
        </figure>
      </div>
    </section>

    <section class="band band--frost" aria-labelledby="practice-proof-title">
      <div class="shell">
        <div class="founder-statement">
          <p class="kicker">Proof of practice</p>
          <h2 class="title-2" id="practice-proof-title">The work is the biography.</h2>
          <p>${ABOUT.founderLine}</p>
        </div>
        ${practiceProofCards(ABOUT.proof, PROJECTS, { id: 'practice-proof' })}
      </div>
    </section>

    <section class="band" id="accountability" aria-labelledby="accountability-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Accountability',
          title: 'One person carries the standard.',
          lead: 'The responsibilities below are not departments. They are the parts of the work that run through the same person.',
          id: 'accountability-title'
        })}
        <ol class="accountability">${ABOUT.accountability
          .map(
            item => `<li>
              <span class="accountability__n">${item.n}</span>
              <h3>${item.label}</h3>
              <p>${item.body}</p>
            </li>`
          )
          .join('')}</ol>
      </div>
    </section>

    <section class="band band--frost" id="philosophy" aria-labelledby="philosophy-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Philosophy',
          title: 'Action, discipline, roots.',
          lead: 'These are working commitments, not slogans. Each one changes how a project is run.',
          id: 'philosophy-title'
        })}
        <div class="philosophy">${ABOUT.philosophy
          .map(
            item => `<article class="philosophy__item">
              <h3>${item.label}</h3>
              <p class="philosophy__body">${item.body}</p>
              <p class="philosophy__practice"><span>In practice</span>${item.practice}</p>
            </article>`
          )
          .join('')}</div>
      </div>
    </section>

    <section class="band" aria-labelledby="values-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Working values',
          title: 'How the work is handled.',
          lead: 'Specific language, honest evidence, one owner, and a clean exit.',
          id: 'values-title'
        })}
        <div class="values">${ABOUT.values
          .map(
            (value, index) => `<article class="value">
              <span class="value__n">${String(index + 1).padStart(2, '0')}</span>
              <h3>${value.title}</h3>
              <p>${value.body}</p>
            </article>`
          )
          .join('')}</div>
      </div>
    </section>

    <section class="band band--frost band--tight" aria-labelledby="relationship-title">
      <div class="shell">
        <div class="relationship">
          <div>
            ${kicker('Brand and founder')}
            <h2 class="title-2" id="relationship-title">${ABOUT.relationship.title}</h2>
          </div>
          <div class="relationship__cols">
            <div>
              <h3>This site</h3>
              <p>${ABOUT.relationship.brand}</p>
            </div>
            <div>
              <h3>The portfolio</h3>
              <p>${ABOUT.relationship.founder}</p>
              <a class="text-link" href="${ABOUT.relationship.link.href}" target="_blank" rel="noopener noreferrer">${ABOUT.relationship.link.label}<span aria-hidden="true">&#8599;</span><span class="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: ABOUT.cta.title,
      body: ABOUT.cta.body,
      primary: ABOUT.cta.primary,
      secondary: { label: 'Message Emmanuel on WhatsApp', href: waHref(), external: true },
      id: 'about-cta'
    })}
  `;

  return renderDocument({
    title: 'About — a founder-led software practice in Ghana | Success Above Dreams',
    description:
      'Success Above Dreams is led by Emmanuel Drah, who designs, builds and reviews every product through definition and handover. A founder-led practice in Ghana.',
    path: '/about/',
    body
  });
}
