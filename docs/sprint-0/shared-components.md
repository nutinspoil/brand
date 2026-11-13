# Shared component inventory

Status date: 13 November 2026  
Scope: shared patterns observed across the current static HTML, CSS, and JavaScript. Selectors are the stable hooks to reuse rather than recreate per page.

| Component | Primary selectors / hooks | Used on | Responsibility |
|---|---|---|---|
| Skip link | `.skip-link` → `#main` | Every content page | Moves keyboard focus past the header to the main landmark. |
| Site header | `.site-header`, `.letterhead`, `.head-row` | Every page | Brand, primary navigation, header CTA, and mobile menu trigger. |
| Brand lockup | `.brand`, `.seal`, `.brand-name` | Header, footer, mobile nav, closing panels | Shield mark plus the “Success Above Dreams” wordmark. |
| Desktop navigation | `.doc-nav`, `.nav-drop`, `.nav-pop` | Desktop / wide viewports | Primary links plus the Capabilities dropdown for Services and Solutions. |
| Header CTA | `.head-cta` | Desktop / wide viewports | Single “Start a conversation” action in the header. |
| Mobile menu trigger | `.menu-toggle`, `[data-menu-open]` | Narrow viewports | Opens the dialog-style mobile navigation and maintains `aria-expanded`. |
| Mobile navigation | `.mobile-nav`, `[data-menu-close]`, `.mobile-links`, `.mobile-contact` | Narrow viewports | Dialog navigation with focus trap, Escape close, focus return, and inert background. |
| Footer | `.site-footer`, `.foot-grid`, `.foot-col`, `.foot-bottom` | Every page | Brand statement, explore links, enquiry links, legal links, and year. |
| Section shell | `.stage`, `.stage--console`, `.stage--wide`, `.stage--open`, `.stage--close`, `.shell` | Content pages | Page rhythm, surface treatment, and max-width container. |
| Page mast | `.mast`, `.mast--brand`, `.mast--document`, `.mast-lead`, `.mast-rail` | Homepage and interior pages | Page-opening composition and metadata rail. |
| Section heading block | `.stage-head`, `.stage-title`, `.stage-note` | Most sections | Consistent heading plus supporting note. |
| Breadcrumbs | `.crumb` | Nested service, solution, article, and case-study pages | Location within the site hierarchy. |
| Primary button | `.btn`, `.btn--go` | Hero, closing, and action panels | Main page action. |
| Secondary button | `.btn`, `.btn--ghost` | Hero and supporting actions | Quiet alternative action. |
| Contextual link | `.text-link`, `.arrow` | Cards, sections, and case studies | Inline navigation with the standard arrow treatment. |
| Closing panel | `.closing`, `.closing-stub`, `.closing-main`, `.closing-actions` | Major content pages | Final primary action plus optional direct WhatsApp link. |
| Floating WhatsApp control | `.wa-float`, `.wa-glyph`, `.wa-label` | Every page | Persistent direct-contact action; positioned away from the primary page flow. |
| Project card | `.work-featured`, `.work-card`, `.work-card-media`, `.work-card-body`, `.work-card-meta` | Homepage, Work index | Comparable project summary with clickable media, title, metadata, and action. |
| Project metadata | `.spec`, `.spec-row`, `.status-pill`, `.work-meta-list`, `.work-meta-tag` | Homepage, Work index, case studies | Situation, users, built work, result, status, and visibility. |
| Work search toolbar | `.chips`, `.chip`, `.work-toolbar`, `.work-count`, `.reset-link` | Work index | Case-insensitive search, category filters, result count, and reset. |
| Work empty state | `.empty-note`, `[data-empty-search]`, `[data-filter-announcer]` | Work index | Visible no-results guidance plus one live status announcement. |
| Case-study narrative | `.case-hero`, `.case-meta`, `.band`, `.step-num`, `.reading`, `.reading-section` | Case studies and articles | Situation → users → requirement → work → decisions → evidence → result → status. |
| Evidence figures | `.shot`, `.shot-frame`, `.shot-cap`, `.shot-file` | Homepage, case studies | Screenshot or evidence image with caption and source context. |
| Workflow schematic | `.workflow-nodes`, `.workflow-node`, `.workflow-node-state` | Business Systems case study | Shows a sale as a sequence of validated states. |
| Scrollable table | `.table-scroll`, `.redacted-table`, `.table-hint` | Business Systems case study | Keeps the role-permissions table usable at narrow widths; wrapper is a labelled, focusable region. |
| Service decision card | `.index-keys`, `.key`, `.key--primary`, `.conveyor`, `.stop` | Services index and service pages | Best-fit, built work, dependency, and next-step framing. |
| Solution diagnostic block | `.rank`, `.card`, `.panel-copy`, `.ledger`, `.row` | Solutions index and solution pages | Situation, available response, and related evidence. |
| Article card | `.decision-card`, `.decision-meta`, `.decision-title`, `.decision-foot` | Insights index | Audience, decision, takeaway, reading time, update date, and title-specific link. |
| Enquiry form | `.form`, `.form-group`, `.form-grid`, `.field`, `.field--full`, `.field-hint`, `.field-error` | Contact and Start a Project | Grouped fields, format guidance, and field-level validation. |
| Live transcript | `.transcript`, `.transcript-body`, `[data-draft]`, `[data-draft-state]` | Contact and Start a Project | Client-side draft preview with incomplete / ready / prepared states. |
| Form status | `[data-form-status]`, `.form-status` | Contact and Start a Project | Announces the WhatsApp handoff result after preparation. |
| Image fallback | `img.is-missing`, `.img-fallback` | Content images | Hides a failed image and shows “Image unavailable: [alt]” in its place. |
| Reveal sequence | `[data-route]`, `[data-stamp]`, `.is-drawn`, `.is-stamped` | Page openings and section stamps | One authored reveal sequence, disabled under reduced motion. |

## Reuse rules

- Reuse the existing component and modifier classes before adding page-specific variants.
- Keep the primary action visually dominant in each section; contextual links should remain quieter.
- Use the shared `spec-row` metadata vocabulary rather than inventing new labels per project.
- Keep the mobile menu, search/filter, form validation, and image fallback behaviour in `assets/js/site.js`; do not duplicate it inline.
- Do not add a second floating contact control or a second full-size primary CTA per section.
