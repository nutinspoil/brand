import { kicker } from '../components/primitives.mjs';
import { renderDocument } from '../components/layout.mjs';
import { COOKIES, PRIVACY, TERMS } from '../content/legal.mjs';

function legalPage(doc) {
  const toc = doc.sections
    .map(section => `<li><a href="#${section.id}">${section.title}</a></li>`)
    .join('');

  const sections = doc.sections
    .map(
      section => `<section class="legal-section" id="${section.id}" aria-labelledby="${section.id}-title">
        <h2 id="${section.id}-title">${section.title}</h2>
        ${section.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
      </section>`
    )
    .join('');

  const body = `
    <div class="shell">
      <header class="legal-header">
        <div>
          ${kicker(doc.eyebrow)}
          <h1 class="title-1" id="page-title">${doc.title}</h1>
          <p class="lead lead--large">${doc.intro}</p>
        </div>
        <p class="legal-header__updated"><span>Current version</span>${doc.updated}</p>
      </header>
    </div>

    <section class="band band--frost" aria-label="${doc.title} details">
      <div class="shell legal-layout">
        <nav class="legal-toc" aria-label="On this page">
          <p class="kicker">On this page</p>
          <ol>${toc}</ol>
        </nav>
        <div class="legal-body">
          ${sections}
          <p class="legal-note">${doc.note}</p>
        </div>
      </div>
    </section>
  `;

  return renderDocument({
    title: `${doc.title} | Success Above Dreams`,
    description: doc.intro,
    path: `/${doc.slug}/`,
    body
  });
}

export function privacyPage() {
  return legalPage(PRIVACY);
}

export function termsPage() {
  return legalPage(TERMS);
}

export function cookiesPage() {
  return legalPage(COOKIES);
}
