export const PROCESS_INTRO = {
  eyebrow: 'Process · Ownership',
  title: 'From possibility to a product you own.',
  lead:
    'One system runs from the first conversation to the day the product changes hands. The stages are public so the handover is not a surprise.',
  readout: [
    {
      label: 'The system',
      value: 'Seven stages',
      note: 'Understand through Continue, each with a defined output and exit decision.'
    },
    {
      label: 'Entry routes',
      value: 'Three ways in',
      note: 'Structured brief, direct WhatsApp, or a review of an existing system.'
    },
    {
      label: 'Ownership',
      value: 'You keep it',
      note: 'Repository, accounts, documentation, deployment walkthrough, and a named maintainer.'
    }
  ]
};

export const HANDOVER = {
  eyebrow: 'What changes hands',
  title: 'The handover is a checklist, not a promise.',
  lead:
    'A product is not handed over because the work is finished. It is handed over when the client can operate, change, and defend it.',
  items: [
    { label: 'Repository with history', note: 'The full source, not a flat export.' },
    { label: 'Hosting and domain accounts', note: 'In the client’s control, with access confirmed.' },
    { label: 'Setup and deployment documentation', note: 'Written for the person who comes next.' },
    { label: 'Deployment walkthrough', note: 'A live pass through publishing and rolling back.' },
    { label: 'Content and admin notes', note: 'What can change without an engineer.' },
    { label: 'Maintenance responsibility', note: 'A named owner, or a clean exit to another team.' },
    { label: 'Ownership confirmation', note: 'A written record of what has transferred.' }
  ]
};

export const STAGES = [
  {
    n: '01',
    name: 'Understand',
    input: 'The situation, the current tools, and the constraint that matters most.',
    work: 'Listen, inspect the current flow, and ask for the evidence behind the problem.',
    output: 'A written situation summary and the scope boundary.',
    exit: 'The problem is clear enough to define.'
  },
  {
    n: '02',
    name: 'Define',
    input: 'Priorities, the people affected, and the first release the business can support.',
    work: 'Define the first release, roles, the observable change, and what is deliberately excluded.',
    output: 'A scope and release definition with exclusions.',
    exit: 'The scope is agreed in writing.'
  },
  {
    n: '03',
    name: 'Design',
    input: 'Real content, the brand, and examples from the actual workflow.',
    work: 'Structure the flow, design the interface, cover the states, and review accessibility.',
    output: 'A reviewed interface design for the release.',
    exit: 'Flows, states, and content are agreed.'
  },
  {
    n: '04',
    name: 'Build',
    input: 'Content, accounts, and the decisions recorded in the design.',
    work: 'Implement, version the work, and test the parts that carry the most risk.',
    output: 'A staging build that matches the agreed scope.',
    exit: 'The build is ready for review.'
  },
  {
    n: '05',
    name: 'Review',
    input: 'The staging build and the devices, browsers, and roles that matter.',
    work: 'Check keyboard use, responsive widths, content, links, contrast, and form states.',
    output: 'A review record and the fixes that came from it.',
    exit: 'The release criteria are met.'
  },
  {
    n: '06',
    name: 'Handover',
    input: 'Accounts, domain access, and the people who will operate the product.',
    work: 'Transfer the work, document it, and walk through deployment and ownership.',
    output: 'Repository, accounts, documentation, walkthrough, and ownership confirmation.',
    exit: 'The client can operate the product.'
  },
  {
    n: '07',
    name: 'Continue',
    input: 'Live feedback and a prioritised change list.',
    work: 'Maintain, fix, or evolve the product, or prepare a clean exit to another team.',
    output: 'A maintenance plan or a documented exit.',
    exit: 'Responsibility is named.'
  }
];

export const REVIEW_RECORD = {
  eyebrow: 'Delivery proof',
  title: 'A review record from this website.',
  lead:
    'This site was built with the same review discipline. The record below is the practice artifact behind the promise, not a client result.',
  rows: [
    ['Route inventory', 'Every public route and legacy alias checked.'],
    ['Internal links', 'Same-origin links resolved against the built files.'],
    ['Keyboard', 'Skip link, header, disclosure, menu, filters, selector, form, and table.'],
    ['Responsive widths', '390, 560, 640, 900, 1265, and 1280 pixels.'],
    ['Contrast', 'Text and control pairs measured against WCAG AA.'],
    ['Reduced motion', 'Content and state changes preserved without transforms.'],
    ['Form states', 'Incomplete, ready to review, prepared, error, and consent gating.']
  ],
  status: 'Checked for release'
};

export const OWNERSHIP = {
  eyebrow: 'Ownership',
  title: 'What you keep.',
  items: [
    'The source code and its history.',
    'The hosting, domain, and service accounts.',
    'The documentation needed to run and deploy the product.',
    'A walkthrough of the deployment and the points of risk.',
    'A maintenance decision that belongs to the client, not a condition of the work.'
  ],
  note:
    'Ownership is confirmed in writing at handover. The engagement itself is governed by a separate agreement, not by this website.',
  link: { label: 'Read the terms of work', href: '/terms-and-conditions/' }
};

export const ENTRY_ROUTES = [
  {
    label: 'Structured brief',
    note: 'The situation, what a useful first version looks like, and the context needed to reply well.',
    detail: 'Best when the project is new or the problem needs framing.',
    action: { label: 'Start the brief', href: '/start-a-project/' }
  },
  {
    label: 'Direct WhatsApp',
    note: 'The fastest route for a short question or an existing relationship.',
    detail: 'Skips the structured context and the transcript.',
    action: {
      label: 'Message Emmanuel on WhatsApp',
      href: 'https://wa.me/233543671806?text=Hi%20Emmanuel%2C%20I%27d%20like%20to%20talk%20about%20a%20project.',
      external: true
    }
  },
  {
    label: 'Existing system review',
    note: 'Bring the live system, access, and the decisions that need to change.',
    detail: 'Best when a product already exists and the next release is unclear.',
    action: { label: 'Discuss a system review', href: '/start-a-project/?service=software-maintenance&ref=review' }
  }
];

export const PROCESS_CTA = {
  title: 'Define the first release.',
  body:
    'The first useful step is a written scope: what the release changes, who it serves, and what it deliberately leaves out.',
  primary: { label: 'Define the first release', href: '/start-a-project/' },
  secondary: { label: 'Ask how the work is handed over', href: '/contact/' }
};
