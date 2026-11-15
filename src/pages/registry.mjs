import { homePage } from './home.mjs';
import { workPage } from './work.mjs';
import { crCasePage, nsCasePage, posCasePage } from './cases.mjs';
import { servicePage, servicesPage } from './services.mjs';
import { solutionPage, solutionsPage } from './solutions.mjs';
import { processPage } from './process.mjs';
import { aboutPage } from './about.mjs';
import { articlePage, insightsPage } from './insights.mjs';
import { contactPage, intakePage, notFoundPage } from './intake.mjs';
import { cookiesPage, privacyPage, termsPage } from './legal.mjs';
import { LEGACY_PAGES } from './legacy.mjs';
import { SERVICES } from '../content/services.mjs';
import { ARTICLES } from '../content/insights.mjs';

export const PAGES = [
  { path: '/', render: homePage, sitemap: true },
  { path: '/work/', render: workPage, sitemap: true },
  { path: '/work/ns-luxury-villa/', render: nsCasePage, sitemap: true },
  { path: '/work/cr-cosmetics/', render: crCasePage, sitemap: true },
  { path: '/work/business-systems/', render: posCasePage, sitemap: true },
  { path: '/services/', render: servicesPage, sitemap: true },
  ...SERVICES.map(service => ({
    path: `/services/${service.slug}/`,
    render: () => servicePage(service.slug),
    sitemap: true
  })),
  { path: '/solutions/', render: solutionsPage, sitemap: true },
  { path: '/solutions/hospitality/', render: () => solutionPage('hospitality'), sitemap: true },
  { path: '/solutions/retail-ecommerce/', render: () => solutionPage('retail-ecommerce'), sitemap: true },
  { path: '/solutions/business-operations/', render: () => solutionPage('business-operations'), sitemap: true },
  { path: '/process/', render: processPage, sitemap: true },
  { path: '/about/', render: aboutPage, sitemap: true },
  { path: '/insights/', render: insightsPage, sitemap: true },
  ...ARTICLES.map(article => ({
    path: `/insights/${article.slug}/`,
    render: () => articlePage(article.slug),
    sitemap: true
  })),
  { path: '/start-a-project/', render: intakePage, sitemap: true },
  { path: '/contact/', render: contactPage, sitemap: true },
  { path: '/privacy-policy/', render: privacyPage, sitemap: true },
  { path: '/terms-and-conditions/', render: termsPage, sitemap: true },
  { path: '/cookie-policy/', render: cookiesPage, sitemap: true },
  { path: '/404.html', output: '404.html', render: notFoundPage },
  ...LEGACY_PAGES
];
