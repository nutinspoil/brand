# Baseline build and test report

Status date: 13 November 2026  
Repository: `C:\Users\NUTIN SPOIL\Documents\brand`  
Branch: `main`  
Remote: `https://github.com/nutinspoil/brand.git`

> Timing note: this report records the current state after the Sprint 1–6 implementation pass. A pre-change snapshot was not committed, so the scores below are current-state evidence, not a historical before/after comparison.

## Build and tooling

This is a static HTML, CSS, and JavaScript site. There is no `package.json`, lockfile, build pipeline, linter, or automated test runner in the repository at the time of this baseline.

| Check | Result | Method |
|---|---|---|
| Install | Not applicable | No package manager or dependency manifest. |
| Build | Not applicable | HTML, CSS, and JS are served directly. |
| Lint | Not configured | No lint configuration or script found. |
| Unit / integration tests | Not configured | No test runner found. |
| Local preview | Pass | Static HTTP server on port 8765. |
| Route count | 36 HTML files | 29 non-redirect pages plus 7 meta-refresh aliases. |
| Git state at capture | Clean | Only the untracked `audit-artifacts/` review captures were present. |

## Route coverage

All 36 HTML files were parsed for titles, headings, links, images, forms, duplicate IDs, and accessible names. The 7 aliases (`about.html`, `creed.html`, `philosophy.html`, `pillars.html`, `story.html`, `studio.html`, `work.html`) are meta-refresh redirects and are not standalone content pages.

Static checks found:

- No heading-level skips on non-redirect pages.
- No empty accessible names on functional links or buttons.
- No broken internal links or missing local images on the audited routes.
- No duplicate IDs on real pages.
- The only static-audit flags were the redirect stubs themselves, which intentionally have no skip link or H1.

## Lighthouse baseline

Lighthouse was run against 12 major routes. Each returned:

- Accessibility: 100
- Best practices: 100
- SEO: 100
- No reported failures

Routes covered: homepage, Work, the three case studies, Services, Solutions, Process, About, Insights, Start a Project, and Contact.

## Responsive checks

Headless Chrome was used at 320px, 375px, and 390px CSS widths.

| Check | Result |
|---|---|
| 320px horizontal page overflow on major routes | Pass, except where a contained scroll region is intentional. |
| 375px and 390px layout | Pass on checked routes. |
| Business Systems table at 320px | Pass. Wrapper is 246px, content is 360px, scrollLeft moves from 0 to 114, page width remains 320px. |
| Mobile menu at 375px | Pass. Focus moves to Close menu; Tab remains inside; Escape closes and returns focus to Open menu. |
| Work search at 375px | Pass. Case-insensitive search, combined category filters, live count, empty state, and reset. |
| Start a Project form at mobile widths | Pass. Fields collapse to one column and validation text is associated with each field. |
| 200% zoom approximation, 12 major routes | Pass. Emulated 720 CSS px at DPR 2; no horizontal page overflow. |
| `prefers-reduced-motion: reduce`, 12 major routes | Pass. 0 pending reveal/stamp elements and 0 non-zero animation or transition durations. |

## Morphism consistency pass

A targeted material pass strengthened the existing neumorphic and claymorphic language without changing the palette, radii, or shadow tokens.

- Page plates, panels, cards, pillars, cases, the closing sheet, the evidence note, the mast tile, and the raised index deck now carry a consistent 1px light rim.
- Recessed panels, cards, pillars, and cases use a quieter dark-surface rim, so an inset well does not read as a flat outline.
- Dark islands (`panel--ink`, clay-turned-sea panels) use a softer chalk rim instead of the frost-white edge.
- The Business Systems role table is mounted in a rounded, inset well with a paired dark shade and low light edge.
- `state--held` is a recessed well with a dashed rim and hollow dot, distinct from raised status keys.
- Work filter chips are 44px high; text links keep their compact underline while exposing a 44px hit area (28px for links inside running prose).

## Tap-target measurement

Measured at 320px, 375px, and 390px with a union of the element box and its expanded hit area.

| Control | Result |
|---|---|
| Primary and secondary buttons | Pass, at least 44px high. |
| Work filter chips | Pass, 44px high. |
| Standalone text links | Pass, 44px effective hit height. |
| Links inside running prose | 28px effective hit height, above the 24px WCAG 2.2 minimum; intentionally smaller to avoid overlapping adjacent lines. |
| Footer, legal, breadcrumb, and screenshot-caption links | Still below 44px; queued for the formal Sprint 7 tap-target pass. |


## Functional evidence

### Work search and filters

- Search is case-insensitive and matches project text.
- Search and category filters combine.
- Visible count updates.
- No-match state shows the active term and recovery guidance.
- Reset restores all projects and focus.
- A single visually hidden live region announces the count plus empty-state guidance.
- Selected category state is exposed with `aria-pressed`.

### Mobile navigation

- Closed menu is `inert` and hidden from keyboard and assistive technology.
- Opening moves focus into the dialog and sets `aria-expanded="true"`.
- Background regions are inert while the menu is open.
- Tab remains inside the menu.
- Escape closes the menu and returns focus to the trigger.

### Image failure fallback

A broken content image is hidden and replaced with `Image unavailable: [alt text]`. The fallback uses the image’s own alt text and does not invent replacement imagery.

### Business Systems table

The role-permissions table is wrapped in a focusable region with `role="region"`, `aria-label="Role permissions table"`, and `tabindex="0"`. Horizontal scrolling is keyboard reachable and the page itself does not overflow at 320px.

### Form validation and transcript

- Required fields expose field-level errors linked with `aria-describedby`.
- The transcript reports `Nothing drafted yet`, `Incomplete`, `Ready to review`, and `Message prepared`.
- The form prepares a message in the browser and opens WhatsApp; it does not post to a server.
- Invalid submission moves focus to the first invalid field and announces the form status.

## Baseline screenshots

A consistent 1440×1000 viewport set was captured for the 12 major routes:

- `audit-artifacts/baseline-1440/home-1440.png`
- `audit-artifacts/baseline-1440/work-1440.png`
- `audit-artifacts/baseline-1440/business-systems-1440.png`
- `audit-artifacts/baseline-1440/cr-cosmetics-1440.png`
- `audit-artifacts/baseline-1440/ns-luxury-villa-1440.png`
- `audit-artifacts/baseline-1440/services-1440.png`
- `audit-artifacts/baseline-1440/solutions-1440.png`
- `audit-artifacts/baseline-1440/process-1440.png`
- `audit-artifacts/baseline-1440/about-1440.png`
- `audit-artifacts/baseline-1440/insights-1440.png`
- `audit-artifacts/baseline-1440/start-a-project-1440.png`
- `audit-artifacts/baseline-1440/contact-1440.png`

These are local review evidence and are not committed to the site.

A second, full-page set in `audit-artifacts/morphism/` records the material pass at 1440px for the homepage, Work, Business Systems, Solutions, About, and Start a Project, plus 390px for the homepage, Work, Business Systems, and Start a Project. These captures use the reduced-motion end state so below-fold content is visible; they are local review evidence.

## Known baseline gaps

These are not failures of the current implementation; they are checks that still need to be completed before the Sprint 7 / release gate.

- The full-page capture set covers six routes at desktop and four at 390px, not every non-redirect route.
- Formal tap-target fixes remain for footer, legal, breadcrumb, and screenshot-caption links; the primary controls, chips, and standalone text links are measured and passing.
- Owner factual review is still pending for project statuses, locations, the internal performance claim, contact details, commercial bands, and article dates.
- Full production-link verification (DNS, TLS, live URLs, WhatsApp handoff on a real device) remains part of the release gate.

## Review artifacts

Current review captures are in `audit-artifacts/` and include desktop and narrow-width screenshots for the homepage, Work, Business Systems, CR Cosmetics, NS Luxury Villa, Services, Solutions, Process, About, Start a Project, and the mobile menu. These files are local review evidence and are not part of the committed site.
