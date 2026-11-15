export const SOLUTIONS_INTRO = {
  eyebrow: 'Capabilities · Solutions',
  title: 'Start with the situation, not the software.',
  lead:
    'The useful first question is what is happening now. The form of the product follows the situation, not the other way around.',
  rail: [
    { label: 'Frame the situation', note: 'Name what is failing, not the tool you have in mind.' },
    { label: 'Show relevant evidence', note: 'Look at comparable work and what it actually shows.' },
    { label: 'Choose the next path', note: 'Decide the first useful release, or decide not to build.' }
  ]
};

export const SITUATIONS = [
  {
    key: 'public-clarity',
    number: '01',
    label: 'Public clarity',
    plain: 'The business is hard to understand online.',
    signal:
      'Visitors ask the same questions: what you do, where you are, what it costs, and how to start.',
    problem:
      'The public site does not answer the questions a buyer needs before contact, so every enquiry begins from zero.',
    path: 'A clear public website with structured information, location, proof, and a direct enquiry route.',
    proof: ['ns-luxury-villa'],
    services: ['web-development'],
    action: { label: 'Plan a public website', href: '/start-a-project/?situation=public-clarity' },
    readMore: null
  },
  {
    key: 'commerce',
    number: '02',
    label: 'Commerce and transactions',
    plain: 'Orders arrive through chat, screenshots, and repeated price questions.',
    signal:
      'Products, prices, and delivery terms change between conversations, and nobody can see the current range at once.',
    problem:
      'Product information is scattered, so customers cannot compare and staff repeat the same answers.',
    path: 'A structured storefront or order path with a catalogue, options, prices, and delivery information.',
    proof: ['cr-cosmetics'],
    services: ['ecommerce-development'],
    action: { label: 'Plan a storefront', href: '/start-a-project/?situation=commerce' },
    readMore: { label: 'See the retail and commerce path', href: '/solutions/retail-ecommerce/' }
  },
  {
    key: 'operations',
    number: '03',
    label: 'Operational control',
    plain: 'Cash, stock, and shift totals do not reconcile at close.',
    signal:
      'The end of the day requires reconstructing sales from paper books, memory, and separate Mobile Money records.',
    problem:
      'Sales, tender, and stock movement are not recorded in one flow, so discrepancies cannot be traced.',
    path: 'A counter POS with split tender, stock movement, shift close, and role-restricted review.',
    proof: ['business-systems'],
    services: ['pos-development', 'business-management-systems'],
    action: { label: 'Map a counter workflow', href: '/start-a-project/?situation=operations' },
    readMore: {
      label: 'See the business operations path',
      href: '/solutions/business-operations/'
    }
  },
  {
    key: 'new-ventures',
    number: '04',
    label: 'New ventures',
    plain: 'The product exists as an idea, a deck, or a prototype.',
    signal:
      'The audience, the first release, and the thing that must work are still being described in several ways.',
    problem:
      'Without a scoped first release, the build expands and the risk stays undefined.',
    path: 'A first release with one audience, one core flow, and one observable change.',
    proof: ['register-engine'],
    services: ['custom-software-development', 'mobile-desktop-applications'],
    action: { label: 'Define a first release', href: '/start-a-project/?situation=new-ventures' },
    readMore: { label: 'Read the build-or-buy guide', href: '/insights/custom-software-or-off-the-shelf/' }
  },
  {
    key: 'evolution',
    number: '05',
    label: 'Product evolution',
    plain: 'A live product has outgrown its first version.',
    signal:
      'Changes are risky, the original maintainer is unclear, and the next release keeps being postponed.',
    problem:
      'There is no maintained handover or prioritised change set, so the product drifts.',
    path: 'A review of the live system, a prioritised change set, and a maintained handover with a named owner.',
    proof: ['ns-luxury-villa', 'cr-cosmetics'],
    services: ['software-maintenance', 'custom-software-development'],
    action: { label: 'Review a live product', href: '/start-a-project/?situation=evolution' },
    readMore: null
  }
];

export const PRACTICE_STRIP = [
  {
    label: 'Hospitality',
    text: 'Stay information and a direct enquiry path.',
    href: '/work/ns-luxury-villa/',
    link: 'NS Luxury Villa'
  },
  {
    label: 'Commerce',
    text: 'A catalogue, product options, and a working cart.',
    href: '/work/cr-cosmetics/',
    link: 'CR Cosmetics'
  },
  {
    label: 'Operational records',
    text: 'Split tender, stock movement, and a shift ledger.',
    href: '/work/business-systems/',
    link: 'POS and shift ledger'
  },
  {
    label: 'Custom software',
    text: 'A register engine tested for low connectivity.',
    href: '/start-a-project/?ref=register-engine',
    link: 'Register engine'
  },
  {
    label: 'Product evolution',
    text: 'Maintenance with a documented handover.',
    href: '/process/',
    link: 'Process and ownership'
  }
];

export const SOLUTION_DETAILS = {
  hospitality: {
    key: 'hospitality',
    eyebrow: 'Solution · Hospitality',
    title: 'The stay decision, answered before the call.',
    lead:
      'For properties whose guests choose between a phone call, a social page, and a conversation that starts with basic questions.',
    facts: [
      ['Situation', 'Public clarity'],
      ['Users', 'Guests and reservation staff'],
      ['Form', 'Hospitality website'],
      ['Proof', 'NS Luxury Villa']
    ],
    situation:
      'A guest needs the room, the rate, the setting, and the route to a booking before travelling. When those facts live in chat and screenshots, the reservation starts with a question instead of a decision.',
    signals: [
      'Guests ask for room types and rates before every booking.',
      'The property’s setting is described in words but not shown clearly.',
      'Enquiries arrive without dates, room preference, or context.'
    ],
    path: [
      'Structure the stays, rates, and what each includes.',
      'Show the property, facilities, and location before travel.',
      'Route the guest into a direct enquiry with the stay already chosen.'
    ],
    proof: ['ns-luxury-villa'],
    services: ['web-development'],
    notFit:
      'Not the first fix if the property has no consistent rate or room information to publish. That has to be decided first.',
    primary: { label: 'Plan a hospitality website', href: '/start-a-project/?situation=hospitality' },
    secondary: { label: 'See the NS case study', href: '/work/ns-luxury-villa/' }
  },
  'retail-ecommerce': {
    key: 'retail-ecommerce',
    eyebrow: 'Solution · Retail and commerce',
    title: 'One catalogue instead of a thread of screenshots.',
    lead:
      'For retailers whose customers currently compare products, prices, and availability across social posts and chat.',
    facts: [
      ['Situation', 'Commerce and transactions'],
      ['Users', 'Shoppers and fulfilment staff'],
      ['Form', 'Storefront and order path'],
      ['Proof', 'CR Cosmetics']
    ],
    situation:
      'When every product announcement is a new post and every price is a message, the catalogue only exists in fragments. Customers cannot compare, and staff answer the same questions all day.',
    signals: [
      'Prices and availability are repeated in individual chats.',
      'Customers send screenshots to ask what an item is or what it costs.',
      'Delivery terms are explained differently depending on who answers.'
    ],
    path: [
      'Put the range into departments, categories, and a searchable catalogue.',
      'Carry price, options, and stock state on the product, not in a message.',
      'Define the delivery and order information the shop will hold.',
      'Add the cart and order path only for the steps the business can support.'
    ],
    proof: ['cr-cosmetics'],
    services: ['ecommerce-development', 'web-development'],
    notFit:
      'Not the right move when the range is too small to maintain a catalogue, or when every order genuinely needs a bespoke conversation.',
    primary: {
      label: 'Plan a storefront for your order flow',
      href: '/start-a-project/?situation=commerce'
    },
    secondary: { label: 'See the CR case study', href: '/work/cr-cosmetics/' }
  },
  'business-operations': {
    key: 'business-operations',
    eyebrow: 'Solution · Business operations',
    title: 'A shift that can be closed and defended.',
    lead:
      'For retail and operations teams whose sales, tender, stock, and approvals are recorded in separate places.',
    facts: [
      ['Situation', 'Operational control'],
      ['Users', 'Cashiers, supervisors, accountants, and owners'],
      ['Form', 'POS and operations systems'],
      ['Proof', 'Private client system']
    ],
    situation:
      'A paper book records one version of the day. The Mobile Money account records another. Stock is counted later. Closing a shift becomes an act of reconstruction rather than a check.',
    signals: [
      'Cash and Mobile Money are reconciled separately at the end of the day.',
      'Stock discrepancies are found long after the sale.',
      'Approvals and corrections happen without a record.',
      'Nobody can say which role changed what.'
    ],
    path: [
      'Record the sale and its tender in one transaction.',
      'Move stock when the sale is recorded.',
      'Give each role a defined boundary and leave an audit trace.',
      'Close the shift by comparing counted totals with recorded tender.'
    ],
    proof: ['business-systems', 'business-operations'],
    services: ['pos-development', 'business-management-systems', 'custom-software-development'],
    notFit:
      'Not worth building when a single till has no reconciliation problem, or when the operating process itself is still changing every week.',
    primary: { label: 'Map your counter workflow', href: '/start-a-project/?situation=operations' },
    secondary: { label: 'See the system walkthrough', href: '/work/business-systems/' }
  }
};

export const situationByKey = key => SITUATIONS.find(situation => situation.key === key);
