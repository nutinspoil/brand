export const INSIGHTS_INTRO = {
  eyebrow: 'Insights · Decisions',
  title: 'The decision before the build.',
  lead:
    'Practical notes for founders and operators deciding what to build, what to buy, and what has to be fixed before either makes sense.',
  featuredNote: 'One guide leads. The rest are ordered by the decision they help make.'
};

export const TOPICS = [
  {
    label: 'Build or buy',
    note: 'Whether the workflow justifies custom software.',
    href: '/insights/custom-software-or-off-the-shelf/'
  },
  {
    label: 'First release',
    note: 'What belongs in the first version, and what does not.',
    href: '/insights/custom-software-or-off-the-shelf/#first-release'
  },
  {
    label: 'Commerce',
    note: 'Catalogue, price, and delivery decisions before a storefront.',
    href: '/insights/before-building-an-online-store/'
  },
  {
    label: 'Operations',
    note: 'When manual reconciliation stops being sufficient.',
    href: '/insights/why-a-business-needs-a-pos/'
  },
  {
    label: 'Ownership and maintenance',
    note: 'Who carries the product after handover.',
    href: '/process/'
  }
];

export const PRACTICE_MAP = [
  {
    label: 'Build or buy',
    text: 'The register engine is a technical test, not a released product.',
    href: '/work/',
    link: 'See the experiment'
  },
  {
    label: 'Commerce',
    text: 'A catalogue and product decisions in a working shop.',
    href: '/work/cr-cosmetics/',
    link: 'CR Cosmetics'
  },
  {
    label: 'Operations',
    text: 'Split tender, stock movement, and a shift ledger.',
    href: '/work/business-systems/',
    link: 'POS and shift ledger'
  }
];

export const ARTICLES = [
  {
    slug: 'custom-software-or-off-the-shelf',
    title: 'Custom software or off-the-shelf tools?',
    category: 'Build or buy',
    audience: 'Founders and operators choosing how to support a workflow.',
    decision:
      'Whether the workflow justifies custom software or whether a standard tool should carry it.',
    takeaway:
      'Custom software should earn its complexity by supporting a workflow no standard tool can carry.',
    readingTime: '5 min read',
    updated: 'November 2026',
    featured: true,
    summary:
      'A practical way to decide when custom software is justified, what it costs to own, and when a standard tool is the more disciplined answer.',
    deck:
      'Most software decisions are made from a feature comparison. The more useful comparison is between the workflow that exists and the workflow a tool forces you to adopt.',
    sections: [
      {
        id: 'workflow',
        title: 'Start with the workflow, not the software',
        paragraphs: [
          'Write down the sequence the business actually follows today. Who starts the work, what record is created, who approves it, what happens when something is wrong, and what has to be true at the end of the day. Do this before looking at any product.',
          'A workflow that is stable, specific, and central to the business is a candidate for custom software. A workflow that changes every month, or that exists mainly because nobody has agreed on a process, is not. Software will make the process harder to change, not easier.'
        ],
        list: [
          'Name the record that must exist at the end.',
          'Name the roles that act on it and the boundaries between them.',
          'Name the failure the business cannot afford.',
          'Name the part that is genuinely different from other businesses.'
        ]
      },
      {
        id: 'standard',
        title: 'Where standard tools usually win',
        paragraphs: [
          'Accounting, email, project tracking, payroll, basic inventory, and general customer records are well served by existing products. Building these from scratch buys maintenance, not advantage. The cost of a standard tool is a subscription. The cost of custom software is a subscription plus a codebase you now own.',
          'A standard tool also carries a form of insurance: its failures are shared by many customers, and its vendor is responsible for updates. Custom software concentrates that responsibility in one place. That can be the right choice, but it should be deliberate.'
        ]
      },
      {
        id: 'custom',
        title: 'Where custom software earns its cost',
        paragraphs: [
          'Custom work earns its cost when the workflow is the product, when an existing tool forces a workaround that creates real risk, or when the business needs a record that no standard product keeps in the shape the business needs.',
          'The retail counter is a useful example. A general POS records a sale. It may not record cash and Mobile Money as two tenders of one transaction, move stock at the same moment, close a shift against counted totals, and leave a role-restricted audit trace. When those steps are the operating reality, a custom system has a specific job.'
        ],
        note:
          'Custom is not automatically better. It is better when the workflow it supports is specific enough that a standard tool would force the business to work around it.'
      },
      {
        id: 'ownership',
        title: 'The ownership question',
        paragraphs: [
          'Custom software is not finished at launch. It has a codebase, dependencies, hosting, accounts, documentation, and a person who can change it. If nobody has agreed who carries those after the first release, the product is already at risk.',
          'Ask the ownership question before the build, not after. Who holds the repository, the domain, and the hosting? Where is the deployment documented? What happens when the original engineer is unavailable? A product you cannot hand over is not fully yours.'
        ]
      },
      {
        id: 'test',
        title: 'A practical decision test',
        paragraphs: [
          'Use four questions. If the answers point clearly in one direction, the decision is easier than the feature list suggests.'
        ],
        list: [
          'Is the workflow central to how the business earns or spends money?',
          'Does an existing tool already support it without a costly workaround?',
          'Can the first release be scoped narrowly enough to finish and review?',
          'Is there a named owner for the system after handover?'
        ]
      },
      {
        id: 'first-release',
        title: 'What the first release should contain',
        paragraphs: [
          'A first release should resolve one operational question, not represent the whole product vision. Choose one audience, one core flow, and one observable change. Exclude the rest in writing.',
          'This is not a smaller ambition. It is the only way to review whether the software actually changed the work. A release that cannot be tested against a real situation will be defended with opinion.'
        ],
        note:
          'A release that cannot be tested against a real situation will be defended with opinion.'
      },
      {
        id: 'boundary',
        title: 'When to stop',
        paragraphs: [
          'Stop or change direction when the workflow is still being negotiated, when the business cannot support the operating discipline the software requires, or when a standard tool is close enough and the remaining difference is preference rather than risk.',
          'The disciplined answer is sometimes not to build. That answer protects the client from a codebase they do not need, and it is part of the service, not a failure of it.'
        ]
      }
    ],
    proof: ['business-systems', 'register-engine'],
    related: ['before-building-an-online-store', 'why-a-business-needs-a-pos']
  },
  {
    slug: 'before-building-an-online-store',
    title: 'What to decide before building an online store',
    category: 'Commerce',
    audience: 'Retailers moving from WhatsApp posts to a storefront.',
    decision: 'What must be structured before a storefront is worth building.',
    takeaway:
      'A storefront works when products, prices, options, and delivery information are already consistent.',
    readingTime: '4 min read',
    updated: 'November 2026',
    featured: false,
    summary:
      'The catalogue, pricing, option, and delivery decisions that determine whether a storefront will remove repeated questions or simply host them.',
    deck:
      'A storefront is not a better version of a chat feed. It is a different way of holding product information. If the information is not ready, the shop will expose that faster.',
    sections: [
      {
        id: 'catalogue',
        title: 'The chat is not the catalogue',
        paragraphs: [
          'A WhatsApp feed is chronological. A catalogue is structured. Moving from one to the other means deciding what a product is, what belongs to it, and how it is grouped. Those decisions cannot be left to the theme.',
          'Before the build, list the departments, categories, and the attributes a customer uses to compare. If two staff members would group the same range differently, that is the first thing to fix.'
        ],
        list: [
          'Departments and categories that match how customers shop.',
          'A naming convention for products and variants.',
          'The few attributes customers actually compare.',
          'Which products are in stock, made to order, or unavailable.'
        ]
      },
      {
        id: 'price',
        title: 'Price and option discipline',
        paragraphs: [
          'A price is not a single number floating in a post. It belongs to a product, often to a variant, and sometimes to a quantity. Decide how discounts, delivery fees, and sold-out options are represented before the product page is designed.',
          'If prices change frequently, the shop needs an owner for those changes. A stale price is worse than no shop, because it turns a conversation into a dispute.'
        ],
        note:
          'A stale price is worse than no shop, because it turns a conversation into a dispute.'
      },
      {
        id: 'delivery',
        title: 'Delivery is part of the product',
        paragraphs: [
          'Customers do not separate the product from the delivery experience. Where you deliver, what it costs, how long it takes, and who to contact when something goes wrong are product decisions.',
          'Write the delivery terms once, and make the shop carry them. If delivery is arranged per order, say so plainly at the point where the customer expects certainty.'
        ]
      },
      {
        id: 'first-release',
        title: 'The first release: browse, compare, choose',
        paragraphs: [
          'A sensible first release is a catalogue that customers can search, filter, compare, and use to choose a product. The order path can follow when the catalogue and delivery information are stable.',
          'This staged approach is honest about evidence. If the checkout has not been tested, do not present it as verified. Show the steps that work and label the boundary.'
        ],
        list: [
          'Search and filters that reflect the way the range is organised.',
          'Product pages with price, option, and stock state.',
          'A cart that preserves the chosen variant.',
          'Delivery and order information beside the product, not buried in a policy page.'
        ]
      },
      {
        id: 'boundary',
        title: 'What not to fake',
        paragraphs: [
          'Do not claim a checkout works because the cart exists. Do not claim delivery coverage before it is agreed. Do not publish reviews, ratings, or sales counts that have not happened.',
          'The CR Cosmetics case study on this site follows the same rule. Its captures show catalogue, product, and cart states. Delivery details and order placement are explicitly outside the visual evidence.'
        ]
      }
    ],
    proof: ['cr-cosmetics'],
    related: ['custom-software-or-off-the-shelf', 'why-a-business-needs-a-pos']
  },
  {
    slug: 'why-a-business-needs-a-pos',
    title: 'Why a growing business may need a POS system',
    category: 'Operations',
    audience: 'Owners whose cash, Mobile Money, and stock records no longer reconcile.',
    decision: 'When manual reconciliation stops being sufficient.',
    takeaway:
      'A POS earns its place when the shift cannot be closed without reconstructing the day.',
    readingTime: '5 min read',
    updated: 'November 2026',
    featured: false,
    summary:
      'The reconciliation signs that justify a counter system, the roles it must support, and the process decisions that have to be made before software can help.',
    deck:
      'Most businesses do not buy a POS because they want software. They buy one because the end of the day has become an investigation.',
    sections: [
      {
        id: 'reconstruction',
        title: 'The end-of-day reconstruction',
        paragraphs: [
          'A paper book records one version of the day. The Mobile Money account records another. The stock count happens later, and the person who handled a correction may not be the person reviewing it. Closing the shift becomes an act of reconstruction.',
          'The warning sign is not the size of the business. It is the number of sources that must be consulted to answer a simple question: what was sold, how was it paid for, and what changed in stock?'
        ]
      },
      {
        id: 'tender',
        title: 'One sale, two tenders',
        paragraphs: [
          'A customer may pay part in cash and part by Mobile Money. That is one sale with two tender records. When those records live in separate places, the sale has to be reassembled before it can be checked.',
          'A counter system should record the sale once and attach both tenders to it. The value is not the receipt. It is the ability to compare counted totals with recorded tender at close.'
        ]
      },
      {
        id: 'stock',
        title: 'Stock moves with the sale',
        paragraphs: [
          'Stock adjusted at the end of the week is a second guess at what happened during the week. Inventory movement recorded at the point of sale keeps the sale and the stock in the same event.',
          'This does not require a complex warehouse system. It requires the counter to record what left the shelf at the moment the customer paid.'
        ]
      },
      {
        id: 'roles',
        title: 'Roles and permissions',
        paragraphs: [
          'A cashier should be able to record a sale. A cashier should not be able to adjust stock or approve a void without a trace. A supervisor needs a different set of actions. The owner needs review without changing the day’s records.',
          'Write the role boundaries before choosing a product. If the boundaries are unclear, the software will encode the confusion.'
        ],
        list: [
          'Who records the sale?',
          'Who can void or correct it, and who approves?',
          'Who adjusts stock, and why?',
          'Who closes the shift, and who reviews the close?'
        ]
      },
      {
        id: 'ledger',
        title: 'The shift ledger',
        paragraphs: [
          'The shift ledger is where the system earns trust. It should show recorded sales, tender totals, counted totals, discrepancies, and the role actions attached to them. A discrepancy should be traceable to a transaction and a person, not just a number.',
          'This is also the boundary of what a public case study can show. Client records and identities stay private. The workflow and role model can be shown without exposing the business.'
        ]
      },
      {
        id: 'process',
        title: 'What to fix before buying software',
        paragraphs: [
          'Agree the tender types, the shift definition, the stock adjustment rule, and the approval boundary. Decide what counts as a close and who signs it off. Train the team on the process, not only the buttons.',
          'Software can make a clear process auditable. It cannot make an unclear process consistent.'
        ],
        note:
          'Software can make a clear process auditable. It cannot make an unclear process consistent.'
      },
      {
        id: 'boundary',
        title: 'When a POS is not the answer',
        paragraphs: [
          'A single till with no reconciliation problem, a stable paper record that already matches the day, or a business that has not yet agreed its tender and shift rules may not need a counter system.',
          'The honest answer can be to fix the process first. That is cheaper, and it makes any later system easier to define.'
        ]
      }
    ],
    proof: ['business-systems'],
    related: ['custom-software-or-off-the-shelf', 'before-building-an-online-store']
  }
];

export const insightBySlug = slug => ARTICLES.find(article => article.slug === slug);
export const INSIGHTS_CTA = {
  title: 'Bring us the decision.',
  body:
    'A guide can frame the choice. The useful next step is a short conversation about the workflow behind it.',
  primary: { label: 'Bring us the decision', href: '/start-a-project/' },
  secondary: { label: 'See the work', href: '/work/' }
};
