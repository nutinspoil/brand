# Sprint 0 — baseline, inventory, and design contract

Status date: 13 November 2026  
Status: draft evidence for owner / design review. Not yet approved.

This folder collects the Sprint 0 artefacts that were missing from the repository. The implementation work in Sprints 1–6 is already in the working history; these documents record what exists, what must be preserved, and what still needs factual approval.

## Deliverables

| Deliverable | File | Status |
|---|---|---|
| Route inventory | `route-inventory.md` | Complete for all 36 HTML files. |
| Shared component inventory | `shared-components.md` | Complete for the current shared patterns. |
| Baseline build / test report | `baseline-report.md` | Current-state evidence; pre-change snapshot not available. |
| Copy and terminology inventory | `copy-inventory.md` | Complete for visible H1/H2s and repeated action labels. |
| Factual-content questions | `factual-questions.md` | Pending owner review. |
| Design contract | `design-contract.md` | Draft; pending owner / design approval. |
| Baseline screenshots | `../../audit-artifacts/baseline-1440/` | 12 major routes at 1440×1000. Local evidence, not committed. |

## Current route shape

- 36 HTML files.
- 29 non-redirect pages, including the 404 page.
- 7 meta-refresh aliases: `about.html`, `creed.html`, `philosophy.html`, `pillars.html`, `story.html`, `studio.html`, `work.html`.
- Two form routes: `contact/index.html` and `start-a-project/index.html`.
- Dynamic behaviour lives in `assets/js/site.js`: mobile menu, Work search/filter, form validation and transcript, image fallback, reveal sequence.

## What is already verified

- Lighthouse: 100 accessibility, 100 best practices, 100 SEO on 12 major routes.
- No heading-level skips on non-redirect pages.
- No empty accessible names on functional links or buttons.
- Work search: case-insensitive, combined filters, live count, empty state, reset, `aria-pressed`.
- Mobile menu: focus lands on Close menu, Tab stays inside, Escape closes and returns focus, background inert.
- Business Systems table: usable and keyboard-scrollable at 320px.
- Image failure fallback: broken content image hides and shows “Image unavailable: [alt]”.
- Forms: grouped fields, field-level errors, live transcript states, WhatsApp handoff.

## What still needs review

- Owner confirmation of project statuses, locations, the internal “under 12 seconds” claim, contact details, budget and timing bands, article dates, and legal copy.
- Full-page desktop captures for every non-redirect route (the current set covers the 12 major routes at viewport size).
- 200% zoom and reduced-motion verification across every route.
- Formal tap-target measurement at 320px, 375px, and 390px.
- Owner / design approval of the route map, factual answers, and design contract.

## Gate

Sprint 0 is not closed until the owner/design reviewer approves the route map, factual questions, and design contract. Until then, these files are working evidence, not a signed baseline.
