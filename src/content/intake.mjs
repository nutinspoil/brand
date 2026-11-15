export const CONTACT = {
  eyebrow: 'Contact',
  title: 'A direct conversation about what you are trying to create.',
  lead:
    'There are two ways in. A structured brief gives the work enough context to answer properly. WhatsApp is the faster route for a short question.',
  options: [
    {
      key: 'structured',
      label: 'Structured brief',
      title: 'Prepare the message before it sends.',
      body:
        'Describe the situation, the people affected, and what a useful first version looks like. The form runs in your browser and prepares a WhatsApp message you can review.',
      bestFor: 'New projects, a problem that needs framing, or a request with several moving parts.',
      action: { label: 'Prepare a structured brief', href: '/start-a-project/' },
      primary: true
    },
    {
      key: 'direct',
      label: 'Direct WhatsApp',
      title: 'Message Emmanuel directly.',
      body:
        'Open WhatsApp with a short message. This route is faster, but it skips the structured context and the prepared transcript.',
      bestFor: 'An existing relationship, a quick question, or a follow-up to a conversation.',
      action: {
        label: 'Message Emmanuel on WhatsApp',
        href: 'https://wa.me/233543671806?text=Hi%20Emmanuel%2C%20I%27d%20like%20to%20talk%20about%20a%20project.',
        external: true
      },
      primary: false
    }
  ],
  next: [
    {
      n: '01',
      label: 'The message arrives',
      body: 'Emmanuel reads the situation and checks whether it is a fit for the practice.'
    },
    {
      n: '02',
      label: 'The first reply names a next step',
      body: 'That may be a conversation, a short scope, a system review, or an honest recommendation not to build.'
    },
    {
      n: '03',
      label: 'Scope before work',
      body: 'If there is a fit, the first release and its exclusions are agreed in writing before engineering starts.'
    }
  ],
  facts: [
    ['Founder', 'Emmanuel Drah'],
    ['Base', 'Ghana'],
    ['Reply channel', 'WhatsApp'],
    ['Public email', 'Not published']
  ],
  founderNote:
    'Every enquiry is read by the person who would do the work. There is no separate sales team.',
  portfolio: {
    label: 'Looking for biography, milestones, or the wider founder story?',
    href: 'https://emmanueldrah.vercel.app/',
    action: 'Visit Emmanuel Drah’s portfolio'
  }
};

export const NOT_FOUND = {
  eyebrow: 'Error 404',
  title: 'Page not found.',
  lead:
    'The address does not match a page on this site. The work, capabilities, and project brief are still one step away.',
  links: [
    { label: 'See the work', href: '/work/' },
    { label: 'Services', href: '/services/' },
    { label: 'Start a project', href: '/start-a-project/' }
  ]
};

export const INTAKE = {
  eyebrow: 'Start a project · Structured brief',
  title: 'Tell us what you are trying to make possible.',
  lead:
    'You do not need a complete technical specification. Describe what is happening now and what you want to make possible.',
  reassurance: [
    {
      label: 'Nothing is sent by this page',
      body: 'The message is prepared in your browser and opened in WhatsApp for you to review and send.'
    },
    {
      label: 'No account, no database',
      body: 'The brief is not uploaded anywhere. This site has no form server and keeps no copy.'
    },
    {
      label: 'Read by the person who would do the work',
      body: 'Emmanuel reads the enquiry and replies with the next useful step.'
    }
  ],
  stages: {
    required: {
      n: '01',
      label: 'Required context',
      note: 'Three fields. Enough to write a useful reply.'
    },
    optional: {
      n: '02',
      label: 'Optional qualification',
      note: 'Helpful if you have it. Skip anything that is not decided.'
    },
    review: {
      n: '03',
      label: 'Review the message',
      note: 'The transcript updates as you type. Nothing leaves the browser.'
    },
    consent: {
      n: '04',
      label: 'Consent and handoff',
      note: 'Explicit consent is required before the WhatsApp draft is prepared.'
    }
  },
  fields: {
    name: { label: 'Your name', placeholder: 'Name' },
    contact: {
      label: 'Email address or WhatsApp number',
      placeholder: 'How should Emmanuel reply?'
    },
    brief: {
      label: 'What are you trying to build or improve?',
      placeholder:
        'Describe the situation in plain language. What happens now, and what should become possible?'
    },
    organisation: {
      label: 'Organisation or audience',
      placeholder: 'Who is this for, and where does it operate?'
    },
    situation: {
      label: 'Current situation',
      placeholder: 'What tools, records, or workarounds are in use today?'
    },
    firstVersion: {
      label: 'A useful first version',
      placeholder: 'What is the smallest release that would already be useful?'
    },
    timing: { label: 'Timing' },
    budget: { label: 'Budget' }
  },
  timingOptions: [
    'Not decided',
    'As soon as practical',
    'Within 1–3 months',
    'Within 3–6 months',
    'Researching options'
  ],
  budgetOptions: [
    'Not decided',
    'Need guidance on scope',
    'Prefer to discuss in conversation',
    'The scope should determine the budget',
    'Prefer not to say'
  ],
  consent:
    'I agree that this message will be prepared in my browser and opened in WhatsApp for me to review and send. This website does not send or store it. The privacy policy explains the WhatsApp handoff.',
  transcript: {
    title: 'Prepared message',
    empty: 'Your message will appear here as you complete the required fields.',
    states: {
      incomplete: 'Incomplete',
      ready: 'Ready to review',
      prepared: 'Message prepared'
    },
    note: 'Nothing is sent until you open WhatsApp and press send.'
  },
  direct: {
    title: 'Message Emmanuel directly instead.',
    body:
      'This opens WhatsApp without the structured context or this transcript. Use it for a short question or an existing conversation.',
    label: 'Message Emmanuel directly',
    href: 'https://wa.me/233543671806?text=Hi%20Emmanuel%2C%20I%27d%20like%20to%20talk%20about%20a%20project.'
  },
  prepared: {
    title: 'Message prepared.',
    body:
      'Review the transcript, then open WhatsApp and press send. Nothing has been sent by this site.',
    action: 'Open WhatsApp with this message',
    next:
      'Emmanuel replies on WhatsApp. The first reply will name the next useful step, or say honestly if this is not a fit.'
  },
  proof: {
    title: 'Relevant proof',
    body:
      'A useful brief usually resembles work that already exists. This is the nearest public example.',
    project: 'ns-luxury-villa'
  }
};

export const SERVICE_PREFILL = {
  'web-development': 'I would like to discuss a website project.',
  'ecommerce-development': 'I would like to discuss an online store or order flow.',
  'pos-development': 'I would like to discuss a POS and reconciliation workflow.',
  'business-management-systems': 'I would like to discuss an operations system for requests and approvals.',
  'custom-software-development': 'I would like to discuss a custom software project.',
  'mobile-desktop-applications': 'I would like to discuss an application that works across devices.',
  'software-maintenance': 'I would like to discuss maintenance or review of an existing system.'
};

export const SITUATION_PREFILL = {
  'public-clarity': 'The public website does not answer the questions customers ask before contact.',
  hospitality: 'Guests need room, rate, facility, and booking information before contacting the property.',
  commerce: 'Orders and product questions are spread across chat, screenshots, and repeated messages.',
  'retail-ecommerce': 'The product catalogue and order information are spread across chat posts.',
  operations: 'Cash, Mobile Money, stock, and shift totals do not reconcile at close.',
  'business-operations': 'Sales, tender, stock, and approvals are recorded in separate places.',
  'new-ventures': 'I have an idea or prototype and need to define a useful first release.',
  evolution: 'A live product has outgrown its first version and the next release is unclear.'
};
