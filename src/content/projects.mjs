import { STATUS } from './site.mjs';

export const WORK_INTRO = {
  eyebrow: 'Work · 2026',
  title: 'Products and systems carried into real use.',
  lead:
    'Public websites, commerce products, private operational systems, custom software, and active prototypes.',
  founder: 'Every project is led by Emmanuel Drah from definition through handover.',
  countNote: 'Two live public products. Two private systems. Two experiments.'
};

export const GROUPS = [
  {
    key: 'public',
    title: 'Public products',
    lead: 'Live work you can open, with published captures of the customer experience.'
  },
  {
    key: 'private',
    title: 'Private systems',
    lead: 'Client records are withheld. Workflow, roles, and system logic are shown instead.'
  },
  {
    key: 'prototype',
    title: 'Prototypes and technical experiments',
    lead: 'Active tests of product direction. These are not released products.'
  }
];

export const PROJECTS = [
  {
    id: 'ns-luxury-villa',
    slug: 'ns-luxury-villa',
    title: 'NS Luxury Villa',
    group: 'public',
    status: STATUS.live,
    type: 'Hospitality website',
    sector: 'Hospitality',
    location: 'Lokoe, Ho, Ghana',
    audience: 'Guests and reservation staff',
    situation:
      'Guests needed room, rate, facility, direction, and booking information before contacting the property.',
    systemBuilt:
      'A responsive guest-facing website with categorised stays, photography, rates, and a direct enquiry path.',
    resultOrState: 'Guests can review the main stay information before contacting the property.',
    evidenceType: 'Published capture',
    evidenceBoundary:
      'Public product. Captures show the live guest experience; booking completion happens with the property.',
    image: '/assets/img/work-nsvilla.jpg',
    imageAlt:
      'NS Luxury Villa home page showing the villa exterior, room categories and reservation links.',
    caseStudyHref: '/work/ns-luxury-villa/',
    caseStudyLabel: 'Read the NS case study',
    liveHref: 'https://www.nsvilla.com',
    liveLabel: 'View the live guest experience',
    featured: true,
    searchTerms: 'ns luxury villa hospitality website guest booking hotel ho ghana'
  },
  {
    id: 'cr-cosmetics',
    slug: 'cr-cosmetics',
    title: 'CR Cosmetics & Essentials',
    group: 'public',
    status: STATUS.live,
    type: 'E-commerce storefront',
    sector: 'Retail beauty',
    location: 'Accra, Ghana',
    audience: 'Retail beauty shoppers and fulfilment staff',
    situation:
      'Customers relied on WhatsApp posts and repeated conversations about products, prices, availability, and delivery.',
    systemBuilt:
      'A structured storefront with categories, search, filtering, product options, and order and delivery information.',
    resultOrState:
      'Customers can browse products, prices, options, and delivery information in a structured storefront.',
    evidenceType: 'Published capture',
    evidenceBoundary:
      'Public product. Captures show catalogue, search, product, and cart states. Delivery details and order placement are not visually verified here.',
    image: '/assets/img/work-crcosmetics-shop.jpg',
    imageAlt:
      'CR Cosmetics shop page with department filters, product cards and prices in Ghana Cedis.',
    caseStudyHref: '/work/cr-cosmetics/',
    caseStudyLabel: 'Read the CR case study',
    liveHref: 'https://www.crcosmeticsgh.com',
    liveLabel: 'View the published storefront',
    featured: false,
    searchTerms: 'cr cosmetics essentials ecommerce storefront shop beauty accra delivery order'
  },
  {
    id: 'business-systems',
    slug: 'business-systems',
    title: 'Retail POS & Shift Ledger',
    group: 'private',
    status: STATUS.private,
    type: 'Private operational system',
    sector: 'Retail operations',
    location: 'Ghana',
    audience: 'Cashiers, supervisors, accountants, and owners',
    situation:
      'Paper books, unrecorded cash transactions, and manual stock reconciliation created discrepancies.',
    systemBuilt:
      'A counter POS with role-restricted manager tools, split payment records, inventory movement, and a shift-closing ledger.',
    resultOrState:
      'Cash and Mobile Money totals can be reviewed against recorded sales when a shift closes.',
    evidenceType: 'Workflow schematic',
    evidenceBoundary:
      'Private and confidential. Client identities and records are withheld; the workflow and system logic are shown.',
    image: null,
    imageAlt: '',
    schematic: 'workflow',
    caseStudyHref: '/work/business-systems/',
    caseStudyLabel: 'See the system walkthrough',
    liveHref: null,
    liveLabel: null,
    primaryLabel: 'Discuss your POS workflow',
    primaryHref: '/start-a-project/?service=pos-development',
    featured: false,
    searchTerms: 'retail pos point of sale shift ledger cash mobile money inventory manager reconciliation'
  },
  {
    id: 'business-operations',
    slug: 'business-operations',
    title: 'Multi-Role Business Operations',
    group: 'private',
    status: STATUS.private,
    type: 'Custom operational software',
    sector: 'Business operations',
    location: 'Ghana',
    audience: 'Front staff, accounts, managers, and executives',
    situation: 'Requests and approvals lived across chat threads and spreadsheets.',
    systemBuilt:
      'A role-scoped operations workspace for requests, approvals, and recorded decisions.',
    resultOrState:
      'Requests, approvals, and their decisions can be followed in one recorded flow. Client outcomes are not published.',
    evidenceType: 'Role schematic',
    evidenceBoundary:
      'Private system. Client identities, records, and outcomes are withheld; the role model is shown.',
    image: null,
    imageAlt: '',
    schematic: 'roles',
    caseStudyHref: null,
    caseStudyLabel: null,
    liveHref: null,
    liveLabel: null,
    primaryLabel: 'Discuss an operations system',
    primaryHref: '/start-a-project/?service=business-management-systems',
    featured: false,
    searchTerms: 'multi role business operations approvals requests workflow permissions managers accounts'
  },
  {
    id: 'register-engine',
    slug: 'register-engine',
    title: 'Offline-Resilient Register Engine',
    group: 'prototype',
    status: STATUS.testing,
    type: 'Technical experiment',
    sector: 'Retail infrastructure',
    location: 'Ghana',
    audience: 'Counter staff in low-connectivity shops',
    situation: 'Intermittent power and network coverage interrupt transactions.',
    systemBuilt:
      'A register engine built around local-first transaction capture with later synchronisation.',
    resultOrState: 'Under technical and performance testing. Not a released product.',
    evidenceType: 'Technical schematic',
    evidenceBoundary:
      'Prototype and technical test. Not publicly available; screen states are shown as schematics.',
    image: null,
    imageAlt: '',
    schematic: 'register',
    caseStudyHref: null,
    caseStudyLabel: null,
    liveHref: null,
    liveLabel: null,
    primaryLabel: 'Ask about the technical test',
    primaryHref: '/start-a-project/?service=custom-software-development&ref=register-engine',
    featured: false,
    searchTerms: 'offline register engine low connectivity power sync transactions prototype technical test'
  },
  {
    id: 'tactile-system',
    slug: 'tactile-system',
    title: 'SAD Tactile Product System',
    group: 'prototype',
    status: STATUS.ongoing,
    type: 'In-house product system',
    sector: 'Practice product',
    location: 'Ghana',
    audience: 'The practice, and products built on it',
    situation:
      'Digital product patterns needed a consistent material, state, and interaction system across the practice.',
    systemBuilt:
      'A component and surface system for raised, pressed, and recessed controls and panels.',
    resultOrState:
      'Used across this website. Not offered as a public client product.',
    evidenceType: 'Practice artifact',
    evidenceBoundary:
      'In-house practice system. It is not a public client product; the evidence is this website.',
    image: null,
    imageAlt: '',
    schematic: 'system',
    caseStudyHref: null,
    caseStudyLabel: null,
    liveHref: '/about/',
    liveLabel: 'See the practice',
    primaryLabel: null,
    primaryHref: null,
    featured: false,
    searchTerms: 'tactile product system in house design material interface practice components'
  }
];

export const projectById = id => PROJECTS.find(project => project.id === id);
export const projectsByGroup = key => PROJECTS.filter(project => project.group === key);
