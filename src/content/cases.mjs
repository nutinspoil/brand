export const NS_CASE = {
  eyebrow: 'Case study · Hospitality',
  title: 'The answers before the enquiry.',
  lead:
    'A guest-facing hospitality website that helps visitors understand rooms, pricing, facilities, location, and booking options before making contact.',
  facts: [
    ['Status', 'Live / public product'],
    ['Location', 'Lokoe, Ho, Ghana'],
    ['Users', 'Guests and reservation staff'],
    ['Type', 'Hospitality website'],
    ['Evidence', 'Published captures of the live site']
  ],
  primary: {
    label: 'View the live guest experience',
    href: 'https://www.nsvilla.com',
    external: true
  },
  secondary: {
    label: 'Plan a hospitality website',
    href: '/start-a-project/?situation=hospitality'
  },
  summary:
    'The site carries the stay decision: what the rooms are, what they cost, where the property sits, and how to start a booking conversation without an account or a long form.',
  situation:
    'A guest planning a work trip, a family visit, or a short stay needs the practical facts before contacting a property. Room types, rates, facilities, and location are usually spread across social posts, screenshots, and repeated messages.',
  users:
    'Guests compare the stay before they call. Reservation staff need enquiries that already contain context, not a blank message.',
  change:
    'Guests can shortlist a stay, check the setting, and start a direct enquiry from one place. The property receives a more informed first message.',
  captures: [
    {
      src: '/assets/img/work-nsvilla.jpg',
      alt:
        'NS Luxury Villa home page with the villa exterior, the headline, and links to rooms and the stay enquiry.',
      tag: 'Home',
      caption: 'The stay proposition, the property, and the route to rooms in one opening view.'
    },
    {
      src: '/assets/img/work-nsvilla-rooms.jpg',
      alt:
        'NS Luxury Villa rooms page showing the room categories, the bed and finishing details, and a room listing.',
      tag: 'Rooms',
      caption: 'Room categories, rates, and the practical detail a guest compares before booking.'
    },
    {
      src: '/assets/img/work-nsvilla-gallery.jpg',
      alt:
        'NS Luxury Villa gallery page showing the pool, terrace, exterior, and the property from above.',
      tag: 'Gallery',
      caption: 'The pool, terrace, and location, shown before the guest travels.'
    }
  ],
  workflow: [
    {
      label: 'Discover rooms and rates',
      note: 'The guest compares stay types and prices on the site.'
    },
    {
      label: 'Verify facilities and location',
      note: 'The gallery and location information confirm the setting.'
    },
    {
      label: 'Start a direct enquiry',
      note: 'The guest contacts the property with the stay already in mind.'
    }
  ],
  decisions: [
    {
      n: '01',
      title: 'Stay types are decided on the page',
      body:
        'Categorised stays carry the room, the rate, and what the stay includes. A guest can shortlist without opening a conversation to ask what is available.',
      evidence: 1
    },
    {
      n: '02',
      title: 'Place and facilities are checked, not guessed',
      body:
        'The gallery shows the pool, terrace, and surroundings, and location information sits alongside the stay detail. The guest can judge the setting before travelling.',
      evidence: 2
    },
    {
      n: '03',
      title: 'One direct path from interest to enquiry',
      body:
        'Rooms, pool, gallery, rates, and booking stay within reach from the main navigation. The main action is a direct enquiry rather than an account or a long funnel.',
      evidence: 0
    }
  ],
  result: 'Guests can review the main stay information before contacting the property.',
  boundary:
    'Booking completion happens with the property. The website prepares the decision and the enquiry; it does not claim an online booking engine.',
  related: ['cr-cosmetics', 'business-systems'],
  finalCta: {
    title: 'A hospitality site should answer the stay questions first.',
    body:
      'If guests keep asking the same questions before they book, the public site is the first place to fix.',
    primary: { label: 'Plan a hospitality website', href: '/start-a-project/?situation=hospitality' },
    secondary: { label: 'View the live guest experience', href: 'https://www.nsvilla.com', external: true }
  }
};

export const CR_CASE = {
  eyebrow: 'Case study · Commerce',
  title: 'From WhatsApp product posts to a working storefront.',
  lead:
    'A structured shop for a beauty retailer whose customers previously relied on chat posts for products, prices, availability, and delivery.',
  facts: [
    ['Status', 'Live / public product'],
    ['Location', 'Accra, Ghana'],
    ['Users', 'Retail beauty shoppers and fulfilment staff'],
    ['Type', 'E-commerce storefront'],
    ['Evidence', 'Published captures of catalogue and product states']
  ],
  primary: {
    label: 'View the published storefront',
    href: 'https://www.crcosmeticsgh.com',
    external: true
  },
  secondary: {
    label: 'Plan a storefront for your order flow',
    href: '/start-a-project/?situation=commerce'
  },
  summary:
    'The storefront turns scattered product posts into a catalogue a customer can search, compare, and choose from, with prices and delivery information in one place.',
  situation:
    'Products were announced in chat, prices changed between posts, and availability was answered one customer at a time. Customers had to scroll back through conversations to compare.',
  users:
    'Shoppers need to compare products and options without asking for every price. Fulfilment staff need orders that refer to a product and a variant, not a screenshot.',
  change:
    'Customers can browse a catalogue, filter departments, compare product options, and see prices and delivery information in a structured shop.',
  captures: [
    {
      src: '/assets/img/work-crcosmetics-shop.jpg',
      alt:
        'CR Cosmetics shop page with department and category filters, product cards, and prices in Ghana Cedis.',
      tag: 'Catalogue',
      caption: 'Departments, categories, stock state, and prices sit in a searchable catalogue.'
    },
    {
      src: '/assets/img/work-crcosmetics-product.jpg',
      alt:
        'CR Cosmetics product page showing the product image, price, option, quantity control, and add-to-cart action.',
      tag: 'Product',
      caption: 'The product, the price, the option, and the cart action are decided on one page.'
    },
    {
      src: '/assets/img/work-crcosmetics.jpg',
      alt:
        'CR Cosmetics home page with the shop introduction, product rows, and delivery information.',
      tag: 'Home',
      caption: 'The shop opens with the range and the route into the catalogue.'
    }
  ],
  workflow: [
    { label: 'Browse', note: 'Departments and categories narrow the range.', captured: true },
    { label: 'Compare', note: 'Product cards show price and stock state.', captured: true },
    { label: 'Choose', note: 'The product page carries options and the cart action.', captured: true },
    { label: 'Add delivery details', note: 'Not visually captured in the evidence on this page.', captured: false },
    { label: 'Place order', note: 'Not visually captured in the evidence on this page.', captured: false }
  ],
  decisions: [
    {
      n: '01',
      title: 'Catalogue before campaign',
      body:
        'Departments, categories, brands, and stock state are visible filters. A customer can move from a broad range to a relevant product without a conversation.',
      evidence: 0
    },
    {
      n: '02',
      title: 'Price and option on the product, not in chat',
      body:
        'The product page carries the price, the selected option, quantity, and the cart action. The customer chooses with the same information the shop holds.',
      evidence: 1
    },
    {
      n: '03',
      title: 'A storefront, not a feed',
      body:
        'The home page introduces the range and routes into the catalogue. Delivery information has a place in the shop instead of being repeated in every conversation.',
      evidence: 2
    }
  ],
  result:
    'Customers can browse products, prices, options, and delivery information in a structured storefront.',
  boundary:
    'The published captures show catalogue, search, product, and cart states. Delivery details and order placement are not visually verified here, and this page does not claim that every checkout step is shown.',
  related: ['ns-luxury-villa', 'register-engine'],
  finalCta: {
    title: 'A storefront should remove repeated order questions.',
    body:
      'If customers keep asking for prices, options, or delivery detail in chat, the catalogue and the order path need structure.',
    primary: {
      label: 'Plan a storefront for your order flow',
      href: '/start-a-project/?situation=commerce'
    },
    secondary: {
      label: 'View the published storefront',
      href: 'https://www.crcosmeticsgh.com',
      external: true
    }
  }
};

export const POS_CASE = {
  eyebrow: 'Case study · Private system',
  title: 'A sale is not closed until the shift reconciles.',
  lead:
    'A private counter point-of-sale and shift ledger for retail teams working with cash, Mobile Money, and manual stock.',
  statusLine: 'Private operational system · Client records withheld · Workflow and system logic shown.',
  facts: [
    ['Status', 'Private / confidential system'],
    ['Users', 'Cashiers, supervisors, accountants, and owners'],
    ['Type', 'Retail POS and shift ledger'],
    ['Evidence', 'Workflow and role schematics'],
    ['Records', 'Client identities and transactions withheld']
  ],
  primary: {
    label: 'Discuss your POS workflow',
    href: '/start-a-project/?service=pos-development'
  },
  secondary: { label: 'Message Emmanuel on WhatsApp', href: 'https://wa.me/233543671806', external: true },
  summary:
    'A private counter POS that keeps cash, Mobile Money, and stock movement in one record, and closes each shift against a ledger instead of reconstructed paper books.',
  situation:
    'Paper books and memory could not account for cash and Mobile Money together. Stock moved without a record, and the end of a shift required reconstructing the day from several sources.',
  system:
    'A counter POS with role-restricted manager tools, split payment records, inventory movement, and a shift-closing ledger. The system is built around the order a retail team already follows, not a new one.',
  scope: [
    {
      role: 'Cashier',
      detail: 'Records sales, splits cash and Mobile Money, sees only the current shift.'
    },
    {
      role: 'Supervisor / accountant',
      detail: 'Verifies tender, reviews discrepancies, adjusts stock, and closes the shift.'
    },
    {
      role: 'Owner',
      detail: 'Reviews recorded activity, role actions, and the shift ledger without changing the day’s records.'
    }
  ],
  scopeItems: [
    'Transactions',
    'Payment records',
    'Cash and Mobile Money split',
    'Inventory movement',
    'Shift ledger',
    'Role permissions',
    'Discrepancy review',
    'Audit trail'
  ],
  workflow: [
    {
      label: 'Record sale',
      detail: 'Item lines and the tender are recorded at the counter.'
    },
    {
      label: 'Split cash / Mobile Money',
      detail: 'One transaction keeps two payment records instead of two books.'
    },
    {
      label: 'Update inventory',
      detail: 'Stock moves when the sale is recorded, not at the end of the week.'
    },
    {
      label: 'Close shift',
      detail: 'Counted totals are compared with recorded tender.'
    },
    {
      label: 'Manager reviews',
      detail: 'Discrepancies and role actions are reviewed from the ledger.'
    }
  ],
  table: {
    caption: 'Shift controls by role',
    columns: ['Capability', 'Cashier', 'Supervisor / accountant', 'Owner'],
    rows: [
      ['Record a sale', 'Yes', 'Yes', 'Yes'],
      ['Split cash and Mobile Money', 'Yes', 'Yes', 'Yes'],
      ['Void a recorded sale', 'Request only', 'Approve', 'Review'],
      ['Adjust stock', 'No', 'Yes', 'Yes'],
      ['Close a shift', 'Start and submit', 'Verify', 'Review'],
      ['Export recorded activity', 'No', 'Yes', 'Yes']
    ]
  },
  boundaries: [
    'Private and confidential system.',
    'Client identities, transaction records, and outcomes are withheld.',
    'Workflow, roles, and system logic are shown schematically.',
    'Offline resilience is not claimed for this system; it is a separate technical test.',
    'No speed, revenue, or accuracy metric is published because none has been verified for public use.'
  ],
  result:
    'Cash and Mobile Money totals can be reviewed against recorded sales when a shift closes, and role actions leave a record for the owner.',
  finalCta: {
    title: 'Start with the reconciliation, not the till.',
    body:
      'The useful question is not which POS to buy. It is what must be recorded so a shift can be closed and defended.',
    primary: { label: 'Discuss your POS workflow', href: '/start-a-project/?service=pos-development' },
    secondary: { label: 'Message Emmanuel on WhatsApp', href: 'https://wa.me/233543671806', external: true }
  }
};
