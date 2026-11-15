# Factual verification for owner sign-off

This site was built under a strict evidence rule: no invented clients, outcomes, metrics or technical claims. Every project statement is either drawn from the built products, drawn from the practice’s own record, or explicitly framed as an unverified boundary.

The items below need confirmation from Emmanuel Drah (and legal review where noted) before the site is treated as launch-ready. To change anything, edit `src/content/`, run `npm run build`, then `npm run check`.

## 1. Client names and permission

| Work | What the site says | Confirm |
| --- | --- | --- |
| NS Luxury Villa | Named; Lokoe, Ho, Ghana; hospitality website; status `live`; live link `https://www.nsvilla.com` | Permission to name the client and show captures; that the URL is the intended live site |
| CR Cosmetics & Essentials | Named; Accra, Ghana; e-commerce storefront; status `live`; live link `https://www.crcosmeticsgh.com` | Permission to name the client and show captures; that the URL is the intended live site |
| Retail POS & Shift Ledger | Unnamed private client; status `private`; role model, split cash/Mobile Money tender, inventory movement and shift close | That this describes the delivered system; that no detail identifies the client |
| Multi-Role Business Operations | Unnamed private system; status `private`; role-scoped requests, approvals and recorded decisions | That this engagement may be represented in this form; that the role model is accurate |
| Offline-Resilient Register Engine | Status `testing`; local-first capture with later synchronisation; “not a released product” | That the technical test is in progress and the description is fair |
| SAD Tactile Product System | Status `ongoing`; in-house component and surface system; “used across this website”; not a public client product | That it should be represented as a practice artifact |

Captures shown for the public products: `work-nsvilla.jpg`, `work-nsvilla-rooms.jpg`, `work-nsvilla-gallery.jpg`, `work-crcosmetics-shop.jpg`, `work-crcosmetics-product.jpg`, `work-crcosmetics.jpg` (all in `assets/img/`). Confirm these reflect the current products and that the logos and product photography may be displayed.

## 2. Status labels at launch

Current labels, from `src/content/projects.mjs`:

- `live` — NS Luxury Villa, CR Cosmetics & Essentials
- `private` — Retail POS & Shift Ledger, Multi-Role Business Operations
- `testing` — Offline-Resilient Register Engine
- `ongoing` — SAD Tactile Product System

Confirm each label is true on the day the site goes live. Statuses are written in words on the site, not shown by colour alone.

## 3. Live links

| Link | Where it appears | Confirm |
| --- | --- | --- |
| `https://www.nsvilla.com` | NS project card and case study | Reachable, owned by the client, intended destination |
| `https://www.crcosmeticsgh.com` | CR project card and case study | Reachable, owned by the client, intended destination |
| `https://emmanueldrah.vercel.app/` | About, contact, footer | The correct founder portfolio |
| `https://wa.me/233543671806` | Contact options, prepared brief handoff, footer, mobile drawer | The correct WhatsApp number for enquiries |

## 4. Numbers and outcomes

The site publishes **no metrics**: no revenue, speed, accuracy, uptime, conversion or headcount figures. Case-study “result” paragraphs describe the state of the product, for example:

- NS: “Guests can review the main stay information before contacting the property.”
- CR: “Customers can browse products, prices, options, and delivery information in a structured storefront.”
- POS: “Cash and Mobile Money totals can be reviewed against recorded sales when a shift closes.”

Confirm that no verified figures should be added. If figures are added later, they must be sourced and dated; the current copy has no place for unsourced numbers.

## 5. Evidence boundaries that need a factual check

These sentences limit what the site claims. Confirm each is accurate:

- NS: “Public product. Captures show the live guest experience; booking completion happens with the property.”
- CR: “Captures show catalogue, search, product, and cart states. Delivery details and order placement are not visually verified here.”
- POS: “Private and confidential. Client identities and records are withheld; the workflow and system logic are shown.” Also: “No speed, revenue, or accuracy metric is published. None has been verified for public use.”
- Operations: “Client identities, records, and outcomes are withheld; the role model is shown.”
- Register engine: “Not publicly available; screen states are shown as schematics.”
- Tactile system: “It is not a public client product; the evidence is this website.”

## 6. Founder and contact facts

- Name: Emmanuel Drah. Role: Founder and principal engineer. Base: Ghana.
- “Every project is led by Emmanuel Drah from definition through handover.” (Work page)
- “Every enquiry is read by the person who would do the work. There is no separate sales team.” (Contact page)
- A public email address is deliberately **not** published; WhatsApp is the only reply channel named on the site.
- Privacy, terms and cookie pages are dated 15 November 2026.

Confirm the role wording, the no-public-email decision, and the date format used on the legal pages.

## 7. Legal and entity details (owner and legal review)

The legal pages intentionally do not invent a registered company name, company number, governing law, or formal notice address. The terms page carries this note:

> “The legal entity details, governing law, and formal notice address are subject to owner and legal review before any project engagement.”

Before launch, decide whether to:

1. supply the registered entity name, governing law and notice address and add them to `src/content/legal.mjs`; or
2. keep the current generic wording and accept that formal details are only in the engagement agreement.

Also confirm these statements remain true:

- The site sets no cookies and uses no tracking storage.
- No analytics, advertising or third-party font requests are made.
- The hosting provider may process standard technical information to deliver the site.

If analytics or a server-side form is added later, the privacy and cookie pages must change **before** that feature goes live — the current copy says so.

## 8. Domain and default date

- Canonical origin: `https://successabovedreams.vercel.app` (`SITE.domain` in `src/content/site.mjs`).
- Sitemap `lastmod`: `2026-11-15`.
- Legal pages and footer metadata: 15 November 2026.

If the site moves to a custom domain, change `SITE.domain` and rebuild; canonical tags, Open Graph URLs, the sitemap, `robots.txt` and the seven redirect stubs all derive from it.

## 9. Wording that encodes a product position

Confirm or rewrite these editorial positions:

- Work intro: “Two live public products. Two private systems. Two experiments.”
- Contact facts row: “Public email” → “Not published.”
- Brief introduction: “You do not need a complete technical specification.” (intake page lead)
- About: ownership and handover language describing what a client keeps at the end of an engagement.

## Sign-off

| # | Item | Confirmed by | Date | Change required? |
| --- | --- | --- | --- | --- |
| 1 | Client naming and capture permission | | | |
| 2 | Status labels | | | |
| 3 | Live links | | | |
| 4 | No-metrics position | | | |
| 5 | Evidence boundaries | | | |
| 6 | Founder and contact facts | | | |
| 7 | Legal entity and governing law | | | |
| 8 | Domain and date | | | |
| 9 | Editorial positions | | | |
