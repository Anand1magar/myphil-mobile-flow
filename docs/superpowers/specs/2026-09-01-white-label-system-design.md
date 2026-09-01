# White-Label Flow System — Design

**Date:** 2026-09-01
**Status:** Approved for planning

## Problem

`myphil-base-flow/` is a finished (modulo minor tweaks) Vite + React + react-router
app of ~21 screens, composed from the repo's shared design system via the `@ds`
alias. We need to produce many branded ("white-label") versions of this exact flow
— same screens, navigation, interactions, layout, responsive behavior — changing
only visual brand identity. Doing this by hand (copy + edit every screen per brand)
does not scale.

**Base Flow = source of truth. White-label = branded version of the Base Flow.**

## Chosen approach

**Single shared app; brand selected at build/run time.** Screen and component code
is never copied per brand. Each brand is a *pure-data folder* (theme + config +
assets, no code). Running or deploying a brand points the base flow at that folder
via a `BRAND` environment variable.

Rejected alternatives:
- *Per-brand Vite project* — config drift across brands, more moving parts, no
  benefit since screens are shared.
- *Full copy per brand* — defeats the "don't rebuild the flow" goal; ruled out by
  the user.

### Scope decisions (from brainstorming)

- Brand-specific config covers **colors** and **logo / image assets** only.
- Typography/fonts are **not** themed per brand (shared design-system fonts).
- Copy strings are **not** themed. **Known limitation:** white-label previews still
  render the literal words "PhilRx" / "© Phil, Inc." in the SMS body and footer.
  Accepted for now; a `strings` map can be added later without rework.
- Base flow tweaks are done *after* this system is built; they propagate
  automatically because screens are shared.

## Folder structure

```
brands/
  base/                 PhilRx identity, extracted from today's design system
    brand.json
    theme.css
    assets/
  <brand-slug>/
    brand.json
    theme.css
    assets/
myphil-base-flow/       unchanged location — source of truth for screens/flow
scripts/
  new-brand.mjs
  run.mjs
  deploy.mjs
.claude/skills/white-label/SKILL.md
```

`brands/base/` is generated once by extracting the current PhilRx logo + color
tokens. With `BRAND` unset, the base flow defaults to `base` and behaves exactly as
today.

## Data contracts

### `brands/<slug>/brand.json`

```json
{
  "name": "Brand 2",
  "slug": "brand-2",
  "logo": "assets/brand2.png",
  "images": { "hero": "assets/hero.png" },
  "vercelProject": "myphil-brand-2",
  "previewUrl": null
}
```

- `name` — used for `<title>` and logo `alt` text only (not injected into screen copy).
- `logo` / `images.*` — paths relative to the brand folder.
- `vercelProject` — Vercel project slug for this brand's deploy.
- `previewUrl` — written back by `deploy.mjs` after a successful deploy.

### `brands/<slug>/theme.css`

Only the brand-owned color tokens; neutrals stay shared from
`tokens/colors.css`. Loaded *after* the design-system tokens so it overrides.

```css
:root{
  --sky: #XXXXXX;              /* brand primary */
  --sky-hover: <derived lighten ~12%>;
  --sky-disabled: <derived lighten ~40%>;
  --brand-primary: var(--sky);
  /* teal/foliage family only when the brand supplies secondary colors */
}
```

Derived shades are computed by `new-brand.mjs` from the primary; can be
hand-edited afterward.

## Base-flow changes (one-time, behavior-preserving)

1. **`myphil-base-flow/vite.config.js`** — read `process.env.BRAND` (default
   `base`); add `@brand` alias → `../brands/<BRAND>`; expose `brand.json` as a
   virtual module (`virtual:brand`).
2. **`myphil-base-flow/src/main.jsx`** — import `@brand/theme.css` after
   `@ds/styles.css`; wrap `<App/>` in `<BrandProvider>` holding parsed brand
   config + resolved asset URLs (Vite `new URL('@brand/...', import.meta.url)` or
   glob import of the brand assets folder).
3. **`src/brand/BrandContext.jsx`** (new) — `BrandProvider` + `useBrand()` hook.
4. **`src/components/PhilRxHeader.jsx`, `PhilRxAppHeader.jsx`** — replace direct
   `philrx-logo-color.png` import with `useBrand().logo` / `.name`.
5. **`src/pages/SmsPage.jsx`, `src/pages/CheckoutSmsPage.jsx`** — replace hardcoded
   `#2363c3` link color with `var(--sky)`.
6. **`src/assets/nav-rx.svg`, `src/assets/nav-profile.svg`** — change baked
   `fill="#00827E"` to `fill="currentColor"`; set `color: var(--foliage)` on the
   `<img>`→inline-SVG usage (switch these two to inline `<svg>` or a
   `mask`-based icon so `currentColor` takes effect).
7. **`index.html`** — `<title>` becomes generic ("Flow preview"); per-brand title
   set at runtime from `useBrand().name` in `main.jsx`.

No other screen changes. Layout, navigation, routes, interactions, copy unchanged.

## Scripts

### `scripts/new-brand.mjs <slug>`

1. Refuse if `brands/<slug>/` exists.
2. Copy `brands/base/` → `brands/<slug>/`.
3. Overwrite `theme.css` with the supplied primary + derived shades.
4. Drop the supplied logo into `assets/`, update `brand.json`
   (`name`, `slug`, `logo`, `vercelProject: "myphil-<slug>"`, `previewUrl: null`).
5. Print next steps.

### `scripts/run.mjs [slug]`

1. If no slug: list `brands/*`, prompt for a choice.
2. `BRAND=<slug> npm --prefix myphil-base-flow run dev`.
3. Print the localhost URL (with brand name).

### `scripts/deploy.mjs <slug>`

1. `BRAND=<slug> npm --prefix myphil-base-flow run build` — fail loudly on broken
   imports.
2. `vercel deploy --prod --yes --cwd myphil-base-flow/dist` (or `vercel` with
   `--name <vercelProject>`), non-interactive.
3. Parse the deployment URL, write it to `brands/<slug>/brand.json:previewUrl`.
4. `curl -sf <url>` — assert HTTP 200 and that `brand.name` appears in the HTML.
5. Print **local + public URLs**.

`vercel login` is a one-time manual step by the user before the first deploy.

## The agent skill — `.claude/skills/white-label/SKILL.md`

`user-invocable: true`. Recognizes three intents:

- **Create white-label** — "Create a white-label for Brand 2, logo
  `assets/brand2.png`, primary `#XXXXXX`":
  run `new-brand.mjs`, then `deploy.mjs`, return local + Vercel URLs.
- **Run** — "Run this project": enumerate `brands/*`, ask which, run `run.mjs`,
  return localhost URL.
- **New independent flow** — when the request is *not* a brand of the base flow:
  do **not** touch `brands/`; scaffold a separate sibling app.

The skill workflow mirrors the diagram: create brand folder → apply config → apply
logo/assets → apply colors → `vite build` (validate) → deploy → return both links.
It must not modify the base flow's screens, navigation, interactions, or copy
unless the user explicitly asks.

## Testing / validation

- No unit-test framework added (base flow has none today).
- `vite build` per brand is the structural check (catches broken imports/aliases).
- Post-deploy HTTP 200 + brand-name-in-HTML smoke check in `deploy.mjs`.
- Manual: `run.mjs base` must render identically to today's `npm run dev`.

## Out of scope

- Theming fonts/typography per brand.
- Theming copy strings (documented limitation above).
- CI/CD automation of deploys.
- Auth or any backend for previews.
