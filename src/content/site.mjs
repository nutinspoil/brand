export const SITE = {
  name: 'Success Above Dreams',
  descriptor: 'Software practice · Ghana',
  domain: 'https://successabovedreams.vercel.app',
  signature: 'Digital products for ideas worth carrying through.',
  statement:
    'We design and engineer websites, commerce products, and operational software for businesses that need better ways to work.',
  locale: 'en_GH',
  themeColour: '#7fa9d6',
  founderPortfolio: 'https://emmanueldrah.vercel.app/',
  founder: {
    name: 'Emmanuel Drah',
    role: 'Founder and principal engineer',
    base: 'Ghana',
    line:
      'Founded and led by Emmanuel Drah, with direct involvement from product definition through design, engineering, review, and handover.',
    shortLine: 'Led from definition through handover by Emmanuel Drah.'
  },
  whatsapp: {
    number: '233543671806',
    display: '+233 54 367 1806'
  },
  updated: '15 November 2026'
};

export function waHref(text = 'Hi Emmanuel, I would like to talk about a project.') {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const NAV = [
  { type: 'link', label: 'Work', href: '/work/', section: 'work' },
  {
    type: 'menu',
    label: 'Capabilities',
    section: 'capabilities',
    items: [
      { label: 'Services', href: '/services/', note: 'What can be built' },
      { label: 'Solutions', href: '/solutions/', note: 'Situations addressed' }
    ]
  },
  { type: 'link', label: 'Process', href: '/process/', section: 'process' },
  { type: 'link', label: 'About', href: '/about/', section: 'about' },
  { type: 'link', label: 'Insights', href: '/insights/', section: 'insights' }
];

export const FOOTER = {
  statement: SITE.signature,
  columns: [
    {
      title: 'Work',
      links: [
        { label: 'All work', href: '/work/' },
        { label: 'NS Luxury Villa', href: '/work/ns-luxury-villa/' },
        { label: 'CR Cosmetics', href: '/work/cr-cosmetics/' },
        { label: 'POS and shift ledger', href: '/work/business-systems/' }
      ]
    },
    {
      title: 'Capabilities',
      links: [
        { label: 'Services', href: '/services/' },
        { label: 'Solutions', href: '/solutions/' },
        { label: 'Process', href: '/process/' }
      ]
    },
    {
      title: 'Practice',
      links: [
        { label: 'About', href: '/about/' },
        { label: 'Insights', href: '/insights/' },
        { label: 'Emmanuel Drah’s portfolio', href: SITE.founderPortfolio, external: true }
      ]
    },
    {
      title: 'Contact',
      links: [
        { label: 'Start a project', href: '/start-a-project/' },
        { label: 'Contact', href: '/contact/' },
        { label: 'Message on WhatsApp', href: waHref(), external: true }
      ]
    }
  ],
  legal: [
    { label: 'Privacy', href: '/privacy-policy/' },
    { label: 'Terms', href: '/terms-and-conditions/' },
    { label: 'Cookies', href: '/cookie-policy/' }
  ]
};

export const STATUS = {
  live: {
    key: 'live',
    label: 'Live / public product',
    short: 'Live',
    group: 'public',
    groupLabel: 'Public products',
    note: 'A public product you can open.'
  },
  private: {
    key: 'private',
    label: 'Private / confidential system',
    short: 'Private',
    group: 'private',
    groupLabel: 'Private systems',
    note: 'Client records withheld; workflow and logic shown.'
  },
  testing: {
    key: 'testing',
    label: 'Prototype / technical test',
    short: 'Testing',
    group: 'prototype',
    groupLabel: 'Prototypes and technical experiments',
    note: 'Under technical test; not a released product.'
  },
  ongoing: {
    key: 'ongoing',
    label: 'Ongoing / not a released product',
    short: 'Ongoing',
    group: 'prototype',
    groupLabel: 'Prototypes and technical experiments',
    note: 'In use inside the practice; not a public client product.'
  }
};

export const EVIDENCE_LABELS = [
  'Live / public product',
  'Published capture',
  'Private / confidential system',
  'Prototype / technical test',
  'Evidence captured',
  'Evidence not publicly shown'
];
