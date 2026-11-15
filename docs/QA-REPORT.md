# QA report

**Build:** Success Above Dreams v2.0.0 · 15 November 2026
**Environment:** Node.js 24.22.1 on Windows 10 · Chromium via Playwright · local static server at `http://localhost:4173`
**Gate:** `npm run check` (build + static audit + token contrast)

## Summary

| Area | Result |
| --- | --- |
| Static structure, links, images, headings, ids, labels | 36 routes · 1637 links · 143 images · 434 headings · 497 ids · 10 form controls — 0 warnings |
| Palette contrast (token pairs) | 33 pairs — 0 below AA (lowest: 4.54:1, primary button) |
| Rendered text contrast | 6,068 samples across 28 routes at 1280 and 390 px — 0 failures, 0 unsampled |
| Mobile drawer contrast | 5 text roles at 320 and 390 px — 6.43:1 to 9.78:1 |
| Reflow | 28 routes at 320 and 640 px — 0 horizontal overflow |
| Route smoke | 29 routes (28 + 404) at 1280 and 390 px — 0 console errors, exactly one `h1`, 0 broken images, `main#main` present |
| Keyboard and interaction | 25 checks — all pass |
| POS table accessibility tree | 1 table · 7 rows · 6 row headers · 18 cells; cell names combine column header and value |

## Method

**Static audit** (`scripts/test.mjs`, run by `npm run check`): parses every generated document, checks internal links and anchors resolve, images exist, one `h1` per page, unique ids, form controls have labels, no focusable hidden controls, redirect stubs are correct, and the sitemap matches the route table.

**Token contrast** (`scripts/contrast.mjs`): parses the design tokens from `assets/css/sad.css` and checks 33 foreground/background pairs at AA (4.5:1 normal text; 3:1 for large text where relevant). It also fails if any text rule uses `--clay-deep`.

**Rendered contrast:** pages were scrolled in 840 px steps at 1280 and 390 CSS px. Text runs were collected after fonts settled, and each run’s background was sampled from a screenshot 3–5 px outside the glyphs (or inside the edge for elements with their own background), taking the median of three points and multiplying opacity into the effective text alpha. Thresholds: 4.5:1 below 24 px, 3:1 at 24 px or 18.66 px bold. The hidden mobile drawer was measured separately on the open drawer.

**Reflow:** 28 routes at 320 CSS px (the full-page reflow proxy for 200% zoom at a 1280 px window) and 640 px, reporting `scrollWidth − clientWidth` and the first offenders.

**Structure sweep:** 28 routes at 390, 560, 640, 900, 1265 and 1280 px with reduced motion; one `h1`, no broken images, no console errors, no horizontal overflow.

**Interactions** were driven in Chromium at 390 and 1280 px: skip link, mobile drawer (open, focus, Tab trap, Escape, focus restore, link navigation), home picker (arrow keys, `aria-pressed`, live status), work index (search, no results, Escape, filter, count, reset), project brief (validation, live transcript, prepared WhatsApp message, edit-again), POS table region, and reduced-motion behaviour.

**Accessibility tree:** the POS table at 390 px was inspected through Chromium’s accessibility tree, where the table stacks into labelled cards.

## Defects found during QA and fixed

1. **Insight card kicker contrast.** The featured takeaway kicker measured **3.71:1** on `/insights/` (`--chalk-3` on the deep-sea gradient). Changed to `--chalk-2`; the token audit now covers this pair.
2. **Mobile drawer small-text contrast.** The tagline, group labels, sub-link notes and signature used `--chalk-3`, which computes to **4.04:1** on the drawer gradient’s lightest stop and measured **1.09–1.80:1** in an early screenshot taken mid-transition. Changed to `--chalk-2`; the final open-drawer measurement is **6.43–9.78:1** at 320 and 390 px.
3. **Drawer focus was not transferred.** The open state still carried a `visibility` transition, so the close button was computed `hidden` at the moment `focus()` ran; keyboard focus stayed on the toggle behind the overlay. Removed `visibility` from the transition and forced a style flush before focusing. Verified: focus lands on the close button, Escape restores focus to the toggle, Tab wraps inside the drawer, and a drawer link closes it without leaving the page locked.
4. **320 px horizontal overflow.** The home picker overflowed by 2 px, process entry routes by 26 px and contact options by 31 px because single grid tracks sized to min-content. Changed the base tracks to `minmax(0, 1fr)` and added a ≤420 px rule that wraps button labels and long words. Reflow now reports 0 issues at 320 and 640 px.
5. **POS table tab stop.** The scroll wrapper had a permanent `tabindex="0"` although the table never overflows at the tested widths. `initScrollRegions` now adds the tab stop only while `scrollWidth > clientWidth`, and removes it otherwise. The table keeps full row/column header semantics when it stacks at narrow widths.
6. **Evidence table labels on narrow screens.** Verified in the accessibility tree rather than assumed: at 390 px the table exposes 1 table, 7 rows, 6 row headers and 18 cells, and cells read as header + value (for example, “CASHIER Yes”). The visible `data-label` pseudo-content does not duplicate the accessible name.

## Verified interactions (25 checks)

- Skip link is the first Tab stop and moves focus to `#main`.
- Closed drawer is `inert` and `aria-hidden`; no focusable controls inside it.
- Opening sets `data-open`, `aria-expanded="true"`, unlocks body scroll and focuses the close button.
- Tab from the last drawer control wraps to the first; Escape closes and restores focus to the toggle.
- A drawer link navigates, closes the drawer and releases body scroll.
- Picker: `aria-pressed` follows the selection, ArrowRight selects the next panel, focus follows, and the live region announces “Showing …”.
- Work index: search announces “No projects match” with a visible empty state; Escape clears; filters set `aria-pressed` and narrow the count; reset restores all items and the “N projects” count.
- Brief: empty submit marks fields `aria-invalid`, shows error text and focuses the first field; complete fields produce “Ready to review” and a transcript containing the entered name; submit reveals the prepared panel with a `wa.me/233543671806?text=…` link; “Edit the brief” hides the panel, keeps the values and returns focus to the name field.
- POS table wrapper has no tab stop when it fits; it gains `tabindex="0"` when forced to overflow and loses it when the overflow is removed.
- Reduced motion removes reveal classes and forces `scroll-behavior: auto`.

## Limitations

- **Chromium only.** Firefox and Safari were not run. Behaviour relying on `inert`, `:focus-visible` and the accessibility tree should be spot-checked in Safari before launch.
- **No real screen-reader session.** The accessibility tree and keyboard operation were inspected; NVDA/JAWS/VoiceOver reading order and announcement quality were not tested.
- **Emulated viewports, not physical devices.** No touch-gesture, on-device keyboard or real mobile browser testing.
- **200% zoom is approximated** by a 320 CSS px viewport (1280 ÷ 4). OS-level zoom and text-only zoom (which can enlarge text without shrinking the viewport) were not separately tested.
- **Contrast sampling is screenshot-based** (JPEG, median of three points). Pseudo-element text, such as the POS table’s stacked labels, is covered by token pairs rather than sampled pixels.
- **No performance or Lighthouse run.** No performance budget is asserted. The site has no third-party scripts, no analytics and no web fonts from third parties.
- **No backend security surface.** The brief form is client-side only; nothing is transmitted or stored by the site.
- **Captures are stored assets.** The live client products were not re-captured during this QA pass; the owner should confirm the images still match the live products (see `docs/FACTUAL-VERIFICATION.md`).
- **Automation timing.** The headless compositor throttled CSS transitions during testing, which exposed the drawer visibility/focus defect. Drawer contrast was captured with transitions disabled to sample the settled state; focus, Tab and Escape were verified with transitions active.

## Reproducing the shipped gate

```bash
npm run check
```

That command builds all 36 documents, runs the static audit and checks all 33 token pairs. The rendered and interaction checks above were executed against the same build in Chromium; they are not part of the zero-dependency repository gate.
