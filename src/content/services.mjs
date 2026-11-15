export const SERVICES_INTRO = {
  eyebrow: 'Capabilities · Services',
  title: 'Different ideas need different forms.',
  lead:
    'A website, a storefront, a counter system, and a custom tool solve different problems. The first job is to name the form before choosing the stack.',
  principle:
    'Custom software should earn its complexity. If an existing tool solves the core problem better, we will say so.',
  indexNote: 'Seven services. Start with the form that matches the situation.'
};

export const SERVICES = [
  {
    slug: 'web-development',
    name: 'Web development',
    short: 'Websites that explain the business and route the next step.',
    headline: 'A website that carries the business before the first conversation.',
    definition:
      'A public website with a clear structure: what the business offers, who it serves, where it is, and how to begin.',
    bestFor: 'Businesses whose public presence is a profile, a social page, or an outdated site.',
    built: [
      'Responsive page structure and navigation',
      'Service, location, pricing, and enquiry content',
      'Direct enquiry routes without an account',
      'Deployment and a documented handover'
    ],
    changes: [
      'Visitors can understand the offer without a call.',
      'Directions, hours, and next steps sit in one place.',
      'The business stops repeating the same answers in chat.'
    ],
    proof: ['ns-luxury-villa'],
    notFit:
      'Not the first form when the problem is a transaction, an order flow, or an internal reconciliation process.',
    cta: { label: 'Discuss a website project', href: '/start-a-project/?service=web-development' },
    order: 1
  },
  {
    slug: 'ecommerce-development',
    name: 'E-commerce development',
    short: 'Storefronts with a catalogue, options, prices, and order information.',
    headline: 'A storefront that answers the price question once.',
    definition:
      'A structured online shop where products, prices, options, availability, and delivery information are held together instead of repeated in chat.',
    bestFor: 'Retailers moving from social posts and screenshots to a catalogue customers can browse.',
    built: [
      'Catalogue, departments, categories, and search',
      'Product pages with options, price, and stock state',
      'Cart and order-information paths',
      'Delivery and fulfilment content in the shop'
    ],
    changes: [
      'Customers can compare products without asking for every price.',
      'The shop holds one version of the catalogue.',
      'Orders can refer to a product and a variant instead of a screenshot.'
    ],
    proof: ['cr-cosmetics'],
    notFit:
      'Not worth the overhead when the range is very small and every order still needs a personal conversation.',
    cta: { label: 'Discuss an online store', href: '/start-a-project/?service=ecommerce-development' },
    order: 2
  },
  {
    slug: 'pos-development',
    name: 'POS development',
    short: 'Counter sales, split tender, stock movement, and shift close.',
    headline: 'A till that closes the shift with evidence.',
    definition:
      'A point-of-sale built around the retail counter: sales, cash and Mobile Money, stock movement, shift totals, and manager review.',
    bestFor: 'Retail counters where cash and Mobile Money are recorded separately or reconstructed at the end of the day.',
    built: [
      'Counter sale and split tender records',
      'Role-restricted supervisor and owner tools',
      'Inventory movement at the point of sale',
      'Shift ledger and discrepancy review'
    ],
    changes: [
      'Cash and Mobile Money totals are compared with recorded sales at close.',
      'Stock movement has a record at the moment of sale.',
      'Manager actions are visible instead of remembered.'
    ],
    proof: ['business-systems'],
    notFit:
      'Not necessary when a single till has no reconciliation problem and the paper record already matches the day.',
    cta: { label: 'Discuss a POS workflow', href: '/start-a-project/?service=pos-development' },
    order: 3
  },
  {
    slug: 'business-management-systems',
    name: 'Business management systems',
    short: 'Requests, approvals, roles, and records in one flow.',
    headline: 'Requests and approvals out of the chat thread.',
    definition:
      'A role-scoped operational system for work that currently moves through messages, spreadsheets, and memory.',
    bestFor: 'Teams coordinating requests or approvals between front staff, accounts, managers, and owners.',
    built: [
      'Defined request and approval states',
      'Role permissions and visible boundaries',
      'Recorded decisions and history',
      'Views for the people who act on the record'
    ],
    changes: [
      'A request has an owner and a state.',
      'Approvals leave a record instead of disappearing in a thread.',
      'Managers can review the flow without reconstructing it.'
    ],
    proof: ['business-operations'],
    notFit:
      'Not the right answer when a capable standard tool already fits the workflow and the team will use it.',
    cta: {
      label: 'Discuss an operations system',
      href: '/start-a-project/?service=business-management-systems'
    },
    order: 4
  },
  {
    slug: 'custom-software-development',
    name: 'Custom software',
    short: 'Software for a workflow standard tools cannot support.',
    headline: 'Software for a workflow standard tools cannot hold.',
    definition:
      'A scoped product for a workflow that is central to the business and does not fit the shape of an off-the-shelf tool.',
    bestFor: 'Operations with a specific sequence, role model, or constraint that a standard product would force you to work around.',
    built: [
      'A defined first release and scope boundary',
      'Interfaces for the roles that do the work',
      'Records, states, and permissions that match the process',
      'Tests, documentation, and a handover'
    ],
    changes: [
      'The workflow is supported by software built around it.',
      'The team stops maintaining the process in parallel spreadsheets.',
      'The next release starts from a recorded system, not a blank page.'
    ],
    proof: ['register-engine', 'business-systems'],
    notFit:
      'Not justified when an existing tool already solves the core problem, or when the workflow is not stable enough to define.',
    cta: {
      label: 'Discuss a custom system',
      href: '/start-a-project/?service=custom-software-development'
    },
    order: 5
  },
  {
    slug: 'mobile-desktop-applications',
    name: 'Mobile & desktop applications',
    short: 'Work recorded across devices, including away from a desk.',
    headline: 'The same work, recorded away from the desk.',
    definition:
      'An installable or device-focused application for work that happens at a counter, in the field, or across several devices.',
    bestFor: 'Teams whose work moves between phone, tablet, and desktop, or whose connectivity cannot be assumed.',
    built: [
      'Device-appropriate interfaces and controls',
      'Offline-aware states where the risk requires them',
      'A shared data model across devices',
      'Installation, updates, and handover notes'
    ],
    changes: [
      'The same work is recorded across devices without re-entry.',
      'Staff can continue with a clear state when the network drops.',
      'A second device does not mean a second record.'
    ],
    proof: ['register-engine'],
    notFit:
      'Not needed when a responsive web interface already covers the device and connectivity conditions.',
    cta: {
      label: 'Discuss a cross-device product',
      href: '/start-a-project/?service=mobile-desktop-applications'
    },
    order: 6
  },
  {
    slug: 'software-maintenance',
    name: 'Maintenance & support',
    short: 'Care for software already in use, with a named owner.',
    headline: 'A live product with a named owner.',
    definition:
      'A maintenance arrangement for software already in use: fixes, updates, review, documentation, and a clear route for the next change.',
    bestFor: 'Businesses with a live system and no internal owner for its next release.',
    built: [
      'A review of the current system and its risks',
      'Prioritised fixes and dependency updates',
      'Documentation for the parts that are still unclear',
      'A maintained handover and change route'
    ],
    changes: [
      'A live product has a named owner and a documented way to change it.',
      'Known risks are prioritised instead of discovered at the next outage.',
      'A future team can pick up the work from a real record.'
    ],
    proof: ['ns-luxury-villa', 'cr-cosmetics'],
    notFit:
      'Not the right move when the system needs replacement rather than care, or when nobody can access the accounts.',
    cta: {
      label: 'Review a system that needs care',
      href: '/start-a-project/?service=software-maintenance'
    },
    order: 7
  }
];

export const PRODUCT_TYPES = [
  {
    key: 'public',
    number: '01',
    title: 'Public-facing products',
    plain: 'The part of the business a customer meets without you in the room.',
    bestFor: 'Guests, shoppers, clients, and visitors who need to understand, compare, and act.',
    built: 'Websites and storefronts with structured public information and a direct next step.',
    changes:
      'A customer can answer the common questions before contact, and arrive with context when they do.',
    services: ['web-development', 'ecommerce-development'],
    proof: ['ns-luxury-villa', 'cr-cosmetics'],
    notFit: 'Not the fix when the real problem is internal reconciliation or a broken operating process.',
    action: { label: 'Plan a public product', href: '/start-a-project/?situation=public-clarity' }
  },
  {
    key: 'operational',
    number: '02',
    title: 'Operational products',
    plain: 'The systems staff use to record work, control access, and close the day.',
    bestFor: 'Cashiers, supervisors, accountants, and owners who need one recorded flow.',
    built: 'POS, shift ledgers, role-scoped operations systems, and custom internal tools.',
    changes:
      'Work leaves paper and chat and becomes a record that can be reviewed, closed, and defended.',
    services: ['pos-development', 'business-management-systems', 'custom-software-development'],
    proof: ['business-systems', 'business-operations'],
    notFit: 'Not worth building when a standard tool already matches the process and the team will use it.',
    action: { label: 'Map an operating workflow', href: '/start-a-project/?situation=operations' }
  },
  {
    key: 'evolving',
    number: '03',
    title: 'New and evolving products',
    plain: 'A product that needs a first release, a technical answer, or a new owner.',
    bestFor: 'Founders and teams defining a first version or carrying a live product forward.',
    built: 'Scoped first releases, device-focused applications, maintenance, and technical tests.',
    changes:
      'The product gets a defined next release, a tested technical direction, or a maintained handover.',
    services: [
      'custom-software-development',
      'mobile-desktop-applications',
      'software-maintenance'
    ],
    proof: ['register-engine', 'tactile-system'],
    notFit: 'Not a fit when the product has no named owner and no decision that a release would resolve.',
    action: { label: 'Define a first release', href: '/start-a-project/?situation=new-ventures' }
  }
];

export const serviceBySlug = slug => SERVICES.find(service => service.slug === slug);
