# White-Label Flow System — Design

**Date:** 2026-09-01
**Status:** Approved for planning (v2 — adds strings, per-brand flow, first brand Axsome)

## Problem

`myphil-base-flow/` is a finished (modulo minor tweaks) Vite + React + react-router
app of ~21 screens, composed from the repo's shared design system via the `@ds`
alias. We need many branded ("white-label") versions of this flow that differ only
in brand identity — and, per real client requirements, in a limited set of screen
text and in which screens run and in what order. Doing this by hand per brand does
not scale.

**Base Flow = source of truth. White-label = branded + configured version of it.**

## Chosen approach

**Single shared app; brand selected locally by URL segment, baked in at deploy.**
Screen/component code is never copied per brand. Each brand is a data folder:
`brand.json`, `theme.css`, `strings.json`, `flow.json`, `assets/`. No brand code.

Rejected: per-brand Vite project (config drift), full copy per brand (defeats the
goal; ruled out by user).

### Scope (from brainstorming, revised)

In scope per brand: **colors**, **logo + image assets**, **a fixed set of screen
text overrides**, **screen selection + order**, **caregiver-modal toggle**.
Out of scope: per-brand fonts/typography; arbitrary copy rewriting (only the
enumerated string keys are overridable); CI automation; auth/backends.

**Known limitation:** strings not in the override key list stay on PhilRx defaults
(e.g. WelcomePage "Phil partners with the makers of…", HIPAA "c/o Phil, Inc.",
footer "© Phil, Inc."). Adding a key later is a one-line change.

## Folder structure

```
projects/
  base-flow/            the current myphil-base-flow/, MOVED here — source of truth
                        for all screen/flow/component code
  base/                 PhilRx brand data (brand.json, theme.css, strings.json,
                        flow.json, assets/)
  Axesome/              first white-label brand (data only; folder name per user)
  <brand-slug>/         data only
scripts/
  new-brand.mjs
  run.mjs
  deploy.mjs
.claude/skills/white-label/SKILL.md
```

Git-move `myphil-base-flow/` → `projects/base-flow/`; update its `@ds` alias from
`..` to `../..`. PhilRx identity is extracted out of `base-flow` into
`projects/base/` so the base flow carries no hardcoded brand.

## Local dev — one server, brand in the URL

`npm run dev` in `projects/base-flow/` starts one server aware of every
`projects/*` folder (glob-imported):

```
localhost:5173/                → brand picker (lists every projects/* brand)
localhost:5173/<brand>/welcome → full flow themed + configured for <brand>
localhost:5173/base/welcome    → PhilRx
```

The brand is the first path segment. `BrandProvider` reads the `:brand` segment,
applies that brand's CSS-variable overrides to `:root`, resolves logo/asset URLs,
and provides `strings` + `flow`. Adding a brand folder makes it appear in the
picker automatically — no code change.

## Deploy — one brand, its own isolated Vercel URL

`node scripts/deploy.mjs <brand>`:

1. `BRAND=<brand> npm --prefix projects/base-flow run build` — brand baked in via
   `virtual:brand`; routes mounted at root (no `/<brand>` prefix). Fails loudly on
   broken imports.
2. `vercel deploy --prod --yes` into project `myphil-<brand>` (non-interactive).
3. Parse deployment URL → write to `projects/<brand>/brand.json:previewUrl`.
4. `curl -sf <url>` → assert HTTP 200 and brand `name` present in HTML.
5. Print **local + public URLs**.

`vercel login` is a one-time manual step before the first deploy. Fallback if no
Vercel account: `cloudflared`/`localtunnel` ephemeral URL.

`BrandProvider` has two modes: **local** = brand from URL segment; **production
build** = brand from `virtual:brand` baked at build time. Same screens both ways.

## Data contracts (`projects/<slug>/`)

### `brand.json`
```json
{
  "name": "Axesome",
  "slug": "axesome",
  "logo": "assets/logo-placeholder.svg",
  "images": {},
  "vercelProject": "myphil-axesome",
  "previewUrl": null
}
```

### `theme.css` — brand-owned color tokens only; neutrals stay shared
```css
:root{
  --sky: #2F1147;          /* primary CTA / accent */
  --sky-hover: #59416C;
  --sky-disabled: #ACA0B5;
  --sky-tint: #F5F3F6;
  --brand-primary: var(--sky);
  --brand-primary-hover: var(--sky-hover);
  --brand-primary-disabled: var(--sky-disabled);
  --secondary: #A82B91;   /* new token; see note */
  --header-tagline: #2F1147;  /* new token consumed by MyPhilHeader tagline */
}
```
`base/theme.css` is empty `:root{}` (design-system defaults already are PhilRx).
`new-brand.mjs` auto-derives hover/disabled/tint from the primary unless supplied.

### `strings.json` — only these keys are overridable
```json
{
  "drugName": "SYMBRAVO® (meloxicam and rizatriptan)",
  "pharmacyName": "Axsome OnMySide Direct",
  "accountLabel": "Axsome OnMySide account"
}
```
base defaults: `"Drugname (chemical compositions) (volume)"`, `"PhilRx Pharmacy"`,
`"Phil account"`. Consumed via `useBrand().strings.*`. Key `drugName` also fills
the HIPAA `[Drugname]` placeholder.

### `flow.json` — ordered route list; drives navigation
```json
{
  "start": "/welcome",
  "steps": [
    { "route": "/welcome" },
    { "route": "/insurance-details" },
    { "route": "/contact-information" },
    { "route": "/savings-hipaa" },
    { "route": "/enrollment-success" },
    { "route": "/create-password" }
  ],
  "caregiverModal": false,
  "terminal": "/create-password"
}
```
- The base flow's per-screen hardcoded `navigate('/next')` calls are replaced by a
  `useFlow().next()` helper that reads `flow.json` and navigates to the next step
  in the list. Secondary/branching buttons (e.g. "No, I have a different card")
  keep explicit targets but those routes must exist in `steps` or the helper
  no-ops with a dev warning.
- Routes present in `base/flow.json` but absent from a brand's `steps` are simply
  not mounted for that brand.
- `caregiverModal: false` makes `/welcome`'s Next call `next()` directly instead of
  opening `CaregiverModal`.

## Base-flow changes (one-time)

1. **`projects/base-flow/vite.config.js`** — `@ds` → `../..`; read
   `process.env.BRAND`; `@brand` alias → `../<BRAND>` (prod) ; glob `../*/` for the
   picker (dev); expose `virtual:brand`.
2. **`src/main.jsx`** — load `@ds/styles.css` then brand `theme.css`; wrap in
   `<BrandProvider>`; set `document.title` from brand name.
3. **`src/brand/BrandContext.jsx`** (new) — `BrandProvider`, `useBrand()`.
4. **`src/brand/useFlow.js`** (new) — `next()`, `flow`, current-step lookup.
5. **`src/App.jsx`** — routes generated from the active `flow.json` (dev: nested
   under `/:brand`); brand picker at `/`.
6. **`components/navigation/MyPhilHeader/MyPhilHeader.jsx`** — logo from
   `useBrand().logo`, `alt`/tagline stay text; tagline color →
   `var(--header-tagline, var(--foliage))`.
7. **`src/components/PhilRxAppHeader.jsx`, `PhilRxHeader.jsx`** — logo from
   `useBrand()` (not in Axsome's 6 screens but keeps things consistent).
8. **`src/pages/SmsPage.jsx`, `CheckoutSmsPage.jsx`** — `#2363c3` → `var(--sky)`.
9. **`src/assets/nav-rx.svg`, `nav-profile.svg`** — `fill="#00827E"` →
   `currentColor`; render inline so `color: var(--foliage)` applies.
10. **String call-sites** in the 7 affected pages — replace the three overridable
    literals with `useBrand().strings.*` (base defaults preserved).
11. **New screen `src/pages/SavingsHipaaPage.jsx`** at route `/savings-hipaa` —
    combines `SavingsEnrollmentPage` + `HipaaAuthorizationPage` content into one
    scrollable screen: savings terms + "Agree and enroll", then the HIPAA
    authorization text + `SignaturePad`, then a single mandatory primary button
    that calls `useFlow().next()`. **No decline/skip path** (no
    `DeclineEnrollmentModal`, no "No thanks"). Reuses existing sub-content; the
    standalone `/savings-enrollment` and `/hipaa-authorization` screens stay in the
    repo for `base` and other brands.

No layout, spacing, or interaction changes beyond the above. Copy outside the three
string keys is untouched.

## Scripts

- **`new-brand.mjs <slug> --primary <hex> [--secondary <hex>] [--name <str>] [--logo <path>]`**
  — refuse if exists; copy `projects/base/` → `projects/<slug>/`; write `theme.css`
  (derive hover/disabled/tint), `brand.json`, empty `strings.json` (= defaults),
  `flow.json` = copy of base; place logo (or generate an SVG placeholder with the
  brand name); print next steps.
- **`run.mjs [slug]`** — no slug ⇒ list `projects/*` and prompt; then
  `npm --prefix projects/base-flow run dev`; print `localhost:5173/<slug>/…`.
- **`deploy.mjs <slug>`** — build + Vercel deploy + write-back + smoke check (above).

## Agent skill — `.claude/skills/white-label/SKILL.md`

`user-invocable: true`. Intents:

- **Create white-label** — parse brand name / primary / secondary / logo / screen
  list / string overrides / exclusions from the user's message; run
  `new-brand.mjs`; edit `theme.css`, `strings.json`, `flow.json` per the request;
  build to validate; `deploy.mjs`; return **local + Vercel URLs**.
- **Run** — enumerate `projects/*`, ask which, `run.mjs`, return localhost URL.
- **New independent flow** (not brand-of-base) — do not touch `projects/`; scaffold
  a separate sibling app.

Must not alter base-flow screens/navigation/interactions/copy beyond a brand's
declared config unless the user explicitly asks.

## First brand — Axesome (`projects/Axesome/`)

- **folder** `projects/Axesome/` (name per user). **display name** "Axesome".
  **slug** `axesome` — lowercased for the URL segment and the Vercel project name
  (`myphil-axesome`), which must be lowercase.
- The three screen-text values are used **verbatim as supplied** and say "Axsome"
  ("Axsome OnMySide Direct", "Axsome OnMySide account"). The "Axesome" display name
  only appears in the logo placeholder, `<title>`, and logo `alt`. This
  inconsistency is intentional per the user's instructions.
- **theme.css**: `--sky #2F1147`, `--sky-hover #59416C`, `--sky-disabled #ACA0B5`,
  `--sky-tint #F5F3F6`, `--secondary #A82B91`, `--header-tagline #2F1147`. Header
  bg, text color = defaults.
- **logo**: generated SVG placeholder reading "Axsome".
- **strings.json**: the three values above.
- **flow.json**: the 6 steps above, `start /welcome`, `caregiverModal false`,
  `terminal /create-password`. `/savings-hipaa` is the mandatory combined screen.
- Screens excluded for Axsome: everything except the 6 (SMS, insurance upload/
  review, coupon, checkout-sms, login, OTP, prescriptions, payment, order-conf,
  standalone savings & hipaa, caregiver modal).
- Deploy target: `myphil-axesome` → `myphil-axesome.vercel.app`.

## Testing / validation

- No unit-test framework added (base flow has none).
- `vite build` per brand = structural check.
- Post-deploy HTTP 200 + brand-name-in-HTML smoke check.
- Manual: `run.mjs base` renders identically to today's `npm run dev`;
  `run.mjs axesome` walks the 6 screens in order, combined screen is mandatory,
  no caregiver modal.

## Out of scope

Per-brand fonts; arbitrary copy rewriting beyond the string keys; CI/CD;
auth/backends; visual regression testing.
