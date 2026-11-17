import { breadcrumb, btn, kicker, sectionHead, chip } from '../components/primitives.mjs';
import { proofStrip } from '../components/proof.mjs';
import { ctaPanel, pageIntro } from '../components/blocks.mjs';
import { articleSchema, renderDocument } from '../components/layout.mjs';
import {
  ARTICLES,
  INSIGHTS_CTA,
  INSIGHTS_INTRO,
  PRACTICE_MAP,
  TOPICS,
  insightBySlug
} from '../content/insights.mjs';

export function insightsPage() {
  const featured = ARTICLES.find(article => article.featured);
  const rest = ARTICLES.filter(article => !article.featured);

  const body = `
    <div class="shell">
      ${pageIntro({
        eyebrow: INSIGHTS_INTRO.eyebrow,
        title: INSIGHTS_INTRO.title,
        lead: INSIGHTS_INTRO.lead,
        aside: `<div class="intro-aside">
          <p class="intro-aside__label">How this library is arranged</p>
          <p class="intro-aside__line">${INSIGHTS_INTRO.featuredNote}</p>
          <a class="text-link" href="#topics">Browse by decision<span aria-hidden="true">&#8595;</span></a>
        </div>`
      })}
    </div>

    <section class="band band--tight" aria-labelledby="featured-title">
      <div class="shell">
        <h2 class="sr-only" id="featured-title">Featured guide</h2>
        ${featured ? `<article class="featured-guide">
          <div class="featured-guide__copy">
            <p class="kicker">Featured guide · ${featured.category}</p>
            <h3><a href="/insights/${featured.slug}/">${featured.title}</a></h3>
            <p class="featured-guide__deck">${featured.deck}</p>
            <p class="featured-guide__decision"><span>Decision</span>${featured.decision}</p>
            <div class="featured-guide__meta">
              ${chip(featured.readingTime)}
              ${chip(`Updated ${featured.updated}`)}
            </div>
            <div class="actions">
              ${btn({ label: 'Read the guide', href: `/insights/${featured.slug}/` })}
              <a class="text-link" href="/insights/${featured.slug}/#first-release">Jump to the first release<span aria-hidden="true">&#8594;</span></a>
            </div>
          </div>
          <aside class="featured-guide__takeaway" aria-label="Guide takeaway">
            <p class="kicker">Takeaway</p>
            <p>${featured.takeaway}</p>
            <span class="featured-guide__mark" aria-hidden="true">Aa</span>
          </aside>
        </article>` : ''}
      </div>
    </section>

    <section class="band band--frost" aria-labelledby="guides-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Guides',
          title: 'Each guide helps make one decision.',
          lead: 'No trends, no listicles. A situation, the decision it forces, and the conditions under which the answer changes.',
          id: 'guides-title',
          className: 'section-head--statement'
        })}
        <ul class="article-rows">${rest
          .map(
            article => `<li>
              <a href="/insights/${article.slug}/">
                <span class="article-rows__meta">${article.category} · ${article.readingTime}</span>
                <strong>${article.title}</strong>
                <span class="article-rows__decision">${article.decision}</span>
                <span class="article-rows__action">Read the guide<span aria-hidden="true"> &#8594;</span></span>
              </a>
            </li>`
          )
          .join('')}</ul>
      </div>
    </section>

    <section class="band band--tight" id="topics" aria-labelledby="topics-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'By decision',
          title: 'Browse by the problem in front of you.',
          lead: 'A light index. Topics connect to the guide or the page that carries the decision.',
          id: 'topics-title',
          className: 'section-head--margin'
        })}
        <ul class="topic-list">${TOPICS
          .map(
            topic => `<li><a href="${topic.href}"><strong>${topic.label}</strong><span>${topic.note}</span><span class="topic-list__arrow" aria-hidden="true">&#8594;</span></a></li>`
          )
          .join('')}</ul>
      </div>
    </section>

    <section class="band band--frost band--tight" aria-labelledby="practice-map-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'In practice',
          title: 'Where the decisions appear in the work.',
          lead: 'A guide is more useful when it points back to a real product state.',
          id: 'practice-map-title'
        })}
        <div class="practice-map">${PRACTICE_MAP
          .map(
            item => `<a class="practice-map__item" href="${item.href}">
              <span>${item.label}</span>
              <p>${item.text}</p>
              <strong>${item.link}<span aria-hidden="true"> &#8594;</span></strong>
            </a>`
          )
          .join('')}</div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: INSIGHTS_CTA.title,
      body: INSIGHTS_CTA.body,
      primary: INSIGHTS_CTA.primary,
      secondary: INSIGHTS_CTA.secondary,
      id: 'insights-cta'
    })}
  `;

  return renderDocument({
    title: 'Insights — decisions before the build | Success Above Dreams',
    description:
      'Practical guides for founders and operators: custom software or off-the-shelf, what to decide before an online store, and when a business needs a POS system.',
    path: '/insights/',
    body
  });
}

export function articlePage(slug) {
  const article = insightBySlug(slug);
  if (!article) return null;

  const toc = article.sections
    .map(section => `<li><a href="#${section.id}">${section.title}</a></li>`)
    .join('');

  const sections = article.sections
    .map(
      section => `<section class="article-section" id="${section.id}" aria-labelledby="${section.id}-title">
        <h2 id="${section.id}-title">${section.title}</h2>
        ${section.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
        ${section.list ? `<ul>${section.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        ${section.note ? `<p class="article-note">${section.note}</p>` : ''}
      </section>`
    )
    .join('');

  const related = article.related
    .map(insightBySlug)
    .filter(Boolean)
    .map(
      item => `<a class="related-article" href="/insights/${item.slug}/">
        <span>${item.category} · ${item.readingTime}</span>
        <strong>${item.title}</strong>
        <span>${item.decision}</span>
        <span aria-hidden="true">&#8594;</span>
      </a>`
    )
    .join('');

  const body = `
    <div class="shell">
      ${breadcrumb([
        { label: 'Insights', href: '/insights/' },
        { label: article.title }
      ])}
      <header class="article-header">
        <div class="article-header__copy">
          ${kicker(`${article.category} · Guide`)}
          <h1 class="title-1" id="page-title">${article.title}</h1>
          <p class="deck">${article.deck}</p>
          <p class="article-header__audience">${article.audience}</p>
        </div>
        <aside class="article-brief" aria-label="Guide summary">
          <dl class="definitions">
            <div class="definitions__row"><dt>Decision</dt><dd>${article.decision}</dd></div>
            <div class="definitions__row"><dt>Takeaway</dt><dd>${article.takeaway}</dd></div>
            <div class="definitions__row"><dt>Reading time</dt><dd>${article.readingTime}</dd></div>
            <div class="definitions__row"><dt>Updated</dt><dd>${article.updated}</dd></div>
          </dl>
        </aside>
      </header>
    </div>

    <section class="band band--frost" aria-labelledby="guide-title">
      <div class="shell">
        <div class="article-layout">
          <nav class="article-toc" aria-label="On this page">
            <p class="kicker">On this page</p>
            <ol>${toc}</ol>
            <a class="text-link" href="/start-a-project/">Bring us the decision<span aria-hidden="true">&#8594;</span></a>
          </nav>
          <article class="article-body" aria-labelledby="page-title">
            <h2 class="sr-only" id="guide-title">Guide</h2>
            ${sections}
            <div class="article-takeaway">
              <p class="kicker">The takeaway</p>
              <p>${article.takeaway}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="band" aria-labelledby="article-proof-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'In the work',
          title: 'Where this decision appears here.',
          lead: 'The relevant product state, with its evidence boundary.',
          id: 'article-proof-title',
          className: 'section-head--margin'
        })}
        ${proofStrip(article.proof)}
      </div>
    </section>

    <section class="band band--tight" aria-labelledby="related-articles-title">
      <div class="shell">
        ${sectionHead({
          eyebrow: 'Continue',
          title: 'The next decision.',
          lead: 'Two adjacent decisions, not a feed.',
          id: 'related-articles-title'
        })}
        <div class="related-articles">${related}</div>
      </div>
    </section>

    ${ctaPanel({
      eyebrow: 'Next step',
      title: INSIGHTS_CTA.title,
      body: INSIGHTS_CTA.body,
      primary: { label: 'Bring us the decision', href: '/start-a-project/' },
      secondary: { label: 'See the work', href: '/work/' },
      id: 'article-cta'
    })}
  `;

  return renderDocument({
    title: `${article.title} | Success Above Dreams`,
    description: article.summary,
    path: `/insights/${article.slug}/`,
    body,
    schema: articleSchema(article, `/insights/${article.slug}/`)
  });
}
