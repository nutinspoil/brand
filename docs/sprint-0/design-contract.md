# Design contract

Status: draft for owner / design approval  
Status date: 13 November 2026  
Scope: preserve the existing Success Above Dreams identity while allowing information architecture, hierarchy, copy, responsive behaviour, accessibility, and interaction reliability to change.

## What must not change

- **Palette.** Keep the powder-blue ground, blue-clay surfaces, deep sea panels, and navy ink. Blue is the identity; do not introduce a second decorative colour family.
- **One non-blue ink.** `--alert` (`#8a2418`) is reserved for field validation. It must not become a decorative accent.
- **Shield mark.** Keep the shield/seal lockup and the “Success Above Dreams” wordmark. Do not replace them with a generic monogram or stock logo.
- **Morphism.** Keep the paired light-and-shade material system: clay plates for surfaces, neumorphic controls for interactive parts, inset wells for recessed areas.
- **Rounded panels and layered backgrounds.** Keep the substantial radii, soft edges, and layered page surfaces.
- **Founder-led philosophy.** Keep the founder accountability and the “ideas worth carrying through” point of view visible.
- **Editorial tone.** Keep clear, specific, non-hyped writing. Do not turn the site into a generic agency template.
- **No invented proof.** Do not add metrics, clients, awards, timelines, or technical claims without owner confirmation.

## Core tokens

### Colour

| Role | Token | Value |
|---|---|---|
| Ground | `--ground` | `#7fa9d6` |
| Ground, lit | `--ground-lit` | `#97bae4` |
| Ground, deep | `--ground-deep` | `#5f9ad8` |
| Ground, shade | `--ground-shade` | `#4d8bcb` |
| Frost plate | `--frost` | `#dfeaf9` |
| Frost plate, deeper | `--frost-2` | `#c9dcf2` |
| Frost plate, lightest | `--frost-3` | `#f2f8ff` |
| Clay | `--clay` | `#6fa9df` |
| Sea panel | `--sea` | `#0b5f92` |
| Sea, lit | `--sea-lit` | `#1273a0` |
| Sea, deep | `--sea-deep` | `#084a74` |
| Blue key | `--mint` | `#73ace0` |
| Pale blue on sea | `--mint-hi` | `#bad8f3` |
| Primary ink | `--ink` | `#06283f` |
| Secondary ink | `--ink-2` | `#0e3a58` |
| Tertiary ink | `--ink-3` | `#164669` |
| Link on frost | `--ink-sea` | `#0a5f92` |
| Chalk on sea | `--chalk` | `#f2f8ff` |
| Validation ink | `--alert` | `#8a2418` |

### Type

| Role | Token | Family |
|---|---|---|
| Labels, headings | `--f-label` | Archivo, Arial, Helvetica, sans-serif |
| Editorial display | `--f-serif` | Instrument Serif, Georgia, Times New Roman, serif |
| Body | `--f-body` | Inter Tight, Arial, Helvetica, sans-serif |
| Metadata, arrows, code | `--f-mono` | JetBrains Mono, ui-monospace, Courier New, monospace |

Heading sizes are fluid: `--fs-h1` is `clamp(2.15rem, 5.2vw, 4.35rem)`, `--fs-h2` is `clamp(1.65rem, 3vw, 2.7rem)`, and `--fs-lead` is `clamp(1.04rem, 1.4vw, 1.22rem)`. Preserve the visual scale while keeping heading levels semantic.

### Shape and elevation

| Token | Value | Use |
|---|---|---|
| `--r-plate` | `38px` | Large page plates |
| `--r-card` | `28px` | Cards and major panels |
| `--r-tile` | `22px` | Smaller tiles |
| `--r-well` | `16px` | Inset wells and form fields |
| `--r-pill` | `999px` | Pills, chips, round controls |
| `--lift`, `--lift-sm`, `--lift-tight` | layered inner light + inner shade + paired drop | Raised clay plates |
| `--lift-sea`, `--lift-sea-sm` | quieter sea-surface equivalents | Dark panels |
| `--neu-out`, `--neu-out-sm` | paired light/shade | Extruded controls |
| `--neu-in`, `--neu-press` | inverted pair | Pressed / inset controls |
| `--cut`, `--well` | inset well | Recessed areas, form fields |

Do not replace the material system with flat borders, hard drop shadows, glassmorphism blur, or a single uniform card radius.

## Layout

- Shared container: `.shell`, width `min(100% - (var(--pad) * 2), 1280px)`, with `--pad: clamp(18px, 3.4vw, 46px)`.
- Major layout transitions: roughly `560px`, `640px`, `780px`, `900px`, `1040px`, and `1181px`. Page components may add narrower breakpoints, but the shared shell and navigation behaviour must remain coherent.
- Test widths required by the plan: 320px, 375px, 390px, desktop reference, and 200% zoom.
- No route may introduce horizontal page overflow. Intentional data regions such as the Business Systems table may scroll inside a labelled, keyboard-focusable wrapper.

## Component rules

- **Primary action:** `.btn--go` is the main action in a section. Use one primary action per section.
- **Secondary action:** `.btn--ghost` and `.text-link` are quieter. Do not promote several links to primary-button weight in the same section.
- **WhatsApp:** keep it available but secondary to the page’s main action. Do not add a second floating contact control.
- **Project metadata:** use the existing `Situation`, `Users`, `Built`, `Result`, and status vocabulary. Do not invent per-project label sets.
- **Status:** use `Live`, `Private`, and `Ongoing` as defined. A “last verified” date must be real and maintained.
- **Evidence:** use real captures for public work and clearly labelled schematics or workflow maps for private work. Private work must not expose client data.
- **Forms:** keep grouped fields, visible labels, format hints, field-level errors, and the live transcript. Validation must not rely on colour alone.
- **Motion:** keep one authored reveal sequence. Honour `prefers-reduced-motion`; no essential information may depend on animation.
- **Images:** keep meaningful alt text. A failed content image must produce the readable fallback, not a blank frame.

## Accessibility floor

- Skip link on every content page.
- Valid heading hierarchy; visual size may differ from semantic level.
- Visible `:focus-visible` treatment on every interactive control, with offset.
- Closed mobile navigation is `inert` and not keyboard reachable.
- Mobile menu traps focus, closes with Escape, and returns focus to the trigger.
- All functional links and buttons have accessible names.
- Form errors are associated with their fields and announced.
- Search/filter state is exposed with `aria-pressed`; result changes and empty states are announced.
- Contrast must meet the agreed threshold on patterned, glass, CTA, form, menu, and floating-control surfaces.
- Target at least 44×44 CSS px for touch controls; verify rather than assume.
- No horizontal page overflow at the required widths.

## What may change

- Page order, section order, and hierarchy.
- Navigation labels and grouping, provided the visual identity remains.
- Copy, headings, CTA labels, and metadata, subject to factual review.
- Responsive layout, spacing, and typography scales.
- Component structure and markup, provided the shared patterns and material system are preserved.
- Accessibility and interaction behaviour.

## Approval

Owner / design lead: ______________________  Date: ______________

Approved changes or exceptions:

