# Success Above Dreams

The Success Above Dreams website: a founder-led software practice in Ghana. It is a static site rendered from structured content by a zero-dependency Node generator. There is no framework, no CMS, no database, and no analytics.

- Live domain (canonical): `https://successabovedreams.vercel.app`
- Founder: Emmanuel Drah · WhatsApp `+233 54 367 1806` · no public email by design
- 28 indexable routes, one 404, seven legacy redirect stubs

## Requirements

Node.js 20 or newer. There are no npm dependencies, so `npm install` installs nothing; the scripts run directly on Node.

## Commands

| Command | What it does |
| --- | --- |
| `npm run build` | Renders every page into the repository root, then writes `robots.txt` and `sitemap.xml` |
| `npm run dev` | Builds, then serves the site at `http://localhost:4173` (override with `PORT`) |
| `npm start` | Serves the current files without rebuilding |
| `npm run test` | Builds, then runs the static audit (routes, links, images, headings, ids, form labels, redirects) |
| `npm run check` | Runs the test, then checks the colour tokens in `assets/css/sad.css` for AA contrast |

`npm run check` is the gate to use before publishing. It currently reports:

```
36 routes · 1637 links · 143 images · 434 headings · 497 ids · 10 form controls
All structural checks passed. 0 warnings.
33 colour pairs checked, 0 below AA.
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/*.mjs` | Every fact and every line of copy: projects, cases, services, solutions, process, insights, intake, legal, site config |
| `src/pages/*.mjs` | Page templates. `registry.mjs` is the route table that drives the build and the sitemap |
| `src/components/` | Shared shell (`layout.mjs`), primitives, page blocks, evidence and workflow components |
| `assets/css/sad.css` | The single stylesheet, organised in cascade layers (`tokens → reset → base → layout → components → patterns → utilities`) |
| `assets/js/site.js` | Header state, mobile drawer, home picker, work search and filters, project brief, scrollable table regions, reveal-on-scroll |
| `assets/img/`, `assets/fonts/` | Captures, marks, social image, self-hosted fonts (no third-party requests) |
| `scripts/build.mjs` | The generator |
| `scripts/test.mjs` | Static structural audit |
| `scripts/contrast.mjs` | Token contrast audit |
| `scripts/serve.mjs` | Local static server with clean URLs and `404.html` |

## Editing content

1. Change copy or data in `src/content/`.
2. Run `npm run build`.
3. Run `npm run check`.

The generated HTML lives at the repository root (`index.html`, `work/index.html`, …). Those files are build output: edit `src/`, never the generated pages. `docs/FACTUAL-VERIFICATION.md` lists the facts that must be confirmed by the owner before launch.

## Content rules

These rules are part of the implementation, not just the copy:

- Every project carries a status (`live`, `private`, `testing`, `ongoing`) and an evidence boundary. Status is written in text, never shown by colour alone.
- Private systems never show client identity or records; they show workflow, roles and system logic instead.
- No metrics are published. There are no revenue, speed, uptime or accuracy figures anywhere on the site.
- The project brief runs entirely in the browser. Nothing is transmitted; the user reviews the prepared message in WhatsApp and sends it themselves.
- The site sets no cookies, uses no tracking storage and requests no third-party scripts. The three legal pages describe exactly that.

## Deployment

The repository root is the deployable output. Any static host can serve it.

- **With a build step:** run `npm run build` and publish the repository root (output directory `.`). The build writes in place, so the deploy environment needs write access to the checked-out tree.
- **Without a build step:** publish the committed HTML and assets as they are.
- No SPA rewrites are needed. Routes are real files (`/work/index.html`), and hosts that support a custom 404 will serve `404.html`.
- The canonical origin is `SITE.domain` in `src/content/site.mjs`. It feeds the canonical tags, Open Graph URLs, redirect stubs, `robots.txt` and `sitemap.xml`. Change it there and rebuild when moving to a custom domain.

## Accessibility and interaction notes

- One `h1` per page, a skip link to `#main`, named landmarks and a visible focus ring.
- The mobile drawer is `inert` and `aria-hidden` when closed, traps Tab while open, closes on Escape and restores focus to the toggle.
- Search counts, picker changes, transcript state and prepared-message state are announced through polite live regions.
- The POS controls table keeps row and column header associations at narrow widths, where it stacks into labelled cards. Its scroll wrapper becomes keyboard-focusable only when it actually overflows.
- Reveal animations and smooth scrolling are removed under `prefers-reduced-motion: reduce`.

Rendered QA results and limitations are recorded in `docs/QA-REPORT.md`.
