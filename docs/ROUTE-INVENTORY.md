# Route inventory

Built output: **36 HTML documents** = 28 indexable routes + one 404 + seven legacy redirect stubs, plus `robots.txt` and `sitemap.xml` (28 URLs).

All indexable routes are directory URLs with a trailing slash, rendered as `path/index.html`. Titles and meta descriptions are set per route in the page templates.

## Indexable routes (in `sitemap.xml`)

| # | Route | Page | Primary job |
| --- | --- | --- | --- |
| 1 | `/` | Home | State the practice, show the first proof (NS Luxury Villa), let a visitor pick their situation, compare built vs. not built |
| 2 | `/work/` | Work index | Group work into public products, private systems and prototypes; searchable and filterable with a live count and no-results state |
| 3 | `/work/ns-luxury-villa/` | Case study | Hospitality website: situation, guest journey, three decisions with captures, result, evidence boundary |
| 4 | `/work/cr-cosmetics/` | Case study | E-commerce storefront: fragment-to-structure story, catalogue/product/home captures, unverified delivery and order steps marked as such |
| 5 | `/work/business-systems/` | Private system walkthrough | POS and shift ledger: public status line, system schematic, role table, counter workflow, result, evidence boundary |
| 6 | `/services/` | Capabilities index | Seven services, what each covers, proof mapping, and what each is not the right fit for |
| 7 | `/services/web-development/` | Service detail | Websites and web products: scope, evidence, fit boundary, starting point |
| 8 | `/services/ecommerce-development/` | Service detail | Storefronts and commerce: scope, evidence, fit boundary, starting point |
| 9 | `/services/pos-development/` | Service detail | Counter systems and shift records: scope, evidence, fit boundary, starting point |
| 10 | `/services/business-management-systems/` | Service detail | Operations and approval systems: scope, evidence, fit boundary, starting point |
| 11 | `/services/custom-software-development/` | Service detail | Custom product engineering: scope, evidence, fit boundary, starting point |
| 12 | `/services/mobile-desktop-applications/` | Service detail | Mobile and desktop applications: scope, evidence, fit boundary, starting point |
| 13 | `/services/software-maintenance/` | Service detail | Audit, repair and maintenance: scope, evidence, fit boundary, starting point |
| 14 | `/solutions/` | Solutions index | Situation-based entry point with a diagnostic rail |
| 15 | `/solutions/hospitality/` | Solution detail | Property, guest and booking situations: diagnosis, response, proof, next step |
| 16 | `/solutions/retail-ecommerce/` | Solution detail | Catalogue, order and delivery situations: diagnosis, response, proof, next step |
| 17 | `/solutions/business-operations/` | Solution detail | Reconciliation, roles and approval situations: diagnosis, response, proof, next step |
| 18 | `/process/` | Process | Seven stages from situation to handover, ownership terms, and the “Define the first release” action |
| 19 | `/about/` | About | Founder-led practice, philosophy, how work is owned and handed over |
| 20 | `/insights/` | Insights index | Three published notes, featured note, and what the practice writes about |
| 21 | `/insights/custom-software-or-off-the-shelf/` | Article | When to build and when a standard tool is the better buy |
| 22 | `/insights/before-building-an-online-store/` | Article | What a storefront needs before engineering starts |
| 23 | `/insights/why-a-business-needs-a-pos/` | Article | What a counter system is for, and what it is not |
| 24 | `/start-a-project/` | Structured brief | Staged intake, client-side live transcript, WhatsApp handoff, prepared-message panel with edit action |
| 25 | `/contact/` | Contact | Two ways in (structured brief or direct WhatsApp), what happens next |
| 26 | `/privacy-policy/` | Legal | What the site does and does not process |
| 27 | `/terms-and-conditions/` | Legal | Website use, evidence framing, IP, enquiries, engagements |
| 28 | `/cookie-policy/` | Legal | Records that no cookies or tracking storage are used |

## Not indexable

| Output | Behaviour |
| --- | --- |
| `404.html` | Served for unmatched paths by static hosts that support a custom 404; one `h1`, links to work, services and the brief |
| `about.html` → `/about/` | Meta-refresh + canonical redirect stub, `noindex` |
| `creed.html` → `/about/#philosophy` | Redirect stub, `noindex` |
| `philosophy.html` → `/about/#philosophy` | Redirect stub, `noindex` |
| `pillars.html` → `/about/#philosophy` | Redirect stub, `noindex` |
| `story.html` → `/about/` | Redirect stub, `noindex` |
| `studio.html` → `/about/` | Redirect stub, `noindex` |
| `work.html` → `/work/` | Redirect stub, `noindex` |

The seven stubs preserve old inbound links. They are excluded from the sitemap and carry `meta robots="noindex,follow"`.

## Generated root files

| File | Source |
| --- | --- |
| `robots.txt` | `scripts/build.mjs`; allows all paths and points at the sitemap |
| `sitemap.xml` | `scripts/build.mjs`; one `<url>` per indexable route, origin from `SITE.domain` |
| `index.html`, `work/index.html`, … | `src/pages/registry.mjs` + page templates |

## Query parameters

- `/start-a-project/?service=<slug>` prefills the brief from a service page.
- `/start-a-project/?situation=<key>` prefills the brief from a solution page.
- `ref=register-engine` is carried by the prototype’s “Ask about the technical test” link so the enquiry keeps its source.
