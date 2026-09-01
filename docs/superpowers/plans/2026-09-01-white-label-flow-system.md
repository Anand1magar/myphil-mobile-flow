# White-Label Flow System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single `myphil-base-flow` app into a white-label system where each brand is a data-only folder (colors, logo, text, screen flow), runnable locally by URL segment and deployable to its own Vercel URL — and ship the first brand, Axesome.

**Architecture:** One shared React app under `projects/base-flow/` holds all screen code. Each brand under `projects/<Name>/` holds `brand.json`, `theme.css`, `strings.json`, `flow.json`, `assets/`. A `BrandProvider` reads the active brand (from the URL segment in dev, from a build-time `virtual:brand` module in production) and exposes colors via CSS-variable overrides plus `strings`/`flow` via context. A `useFlow().next()` helper replaces every screen's hardcoded `navigate()` so screen order is per-brand config. Node scripts scaffold, run, and deploy brands.

**Tech Stack:** Vite 5, React 18, react-router-dom 6, Node ≥18 (`node:test`, ES modules), Vercel CLI.

**Spec:** `docs/superpowers/specs/2026-09-01-white-label-system-design.md`

## Global Constraints

- No TypeScript. No new test framework — pure-logic libs use built-in `node:test`; React screens are verified by `vite build` + manual walkthrough.
- Base-flow screens must render **byte-identically for `base`** after every task except where the spec lists a change. Do not touch layout, spacing, copy (beyond the 3 string keys), or interactions.
- Brand-owned color tokens only: `--sky`, `--sky-hover`, `--sky-disabled`, `--sky-tint`, `--brand-primary`, `--brand-primary-hover`, `--brand-primary-disabled`, `--secondary`, `--header-tagline`. Neutrals stay in `tokens/colors.css`.
- Overridable string keys are exactly: `drugName`, `pharmacyName`, `accountLabel`. Base defaults: `"Drugname (chemical compositions) (volume)"`, `"PhilRx Pharmacy"`, `"Phil account"`.
- Vercel project names are lowercase: `myphil-<slug>`. Brand slug is the lowercased folder name.
- Axesome: folder `projects/Axesome/`, display name `Axesome`, slug `axesome`. Primary `#2F1147`, hover `#59416C`, disabled `#ACA0B5`, tint `#F5F3F6`, secondary `#A82B91`, header-tagline `#2F1147`. Screen strings verbatim: `"SYMBRAVO® (meloxicam and rizatriptan)"`, `"Axsome OnMySide Direct"`, `"Axsome OnMySide account"`.
- Axesome flow, in order: `/welcome`, `/insurance-details`, `/contact-information`, `/savings-hipaa`, `/enrollment-success`, `/create-password`. `caregiverModal: false`. `/savings-hipaa` is mandatory — no skip/decline.
- Commit after every task. Conventional Commit messages.

---

## File Structure

**Moved:** `myphil-base-flow/` → `projects/base-flow/` (git mv, history preserved).

**Brand data (no code):**
- `projects/base/{brand.json,theme.css,strings.json,flow.json}` + `assets/philrx-logo-color.png`
- `projects/Axesome/{brand.json,theme.css,strings.json,flow.json}` + `assets/logo-placeholder.svg`

**New app code (`projects/base-flow/src/`):**
- `brand/brandDefaults.js` — the 3 default strings, default tagline color
- `brand/BrandContext.jsx` — `BrandProvider`, `useBrand()`
- `brand/useFlow.js` — `useFlow()` → `{ flow, next, has }`
- `brand/loadBrands.js` — dev-only glob of `projects/*` for the picker
- `pages/BrandPickerPage.jsx` — dev index at `/`
- `pages/SavingsHipaaPage.jsx` — combined mandatory screen at `/savings-hipaa`

**Modified app code:**
- `projects/base-flow/vite.config.js`, `src/main.jsx`, `src/App.jsx`
- `components/navigation/MyPhilHeader/MyPhilHeader.jsx`
- `projects/base-flow/src/components/PhilRxHeader.jsx`, `PhilRxAppHeader.jsx`
- `projects/base-flow/src/assets/nav-rx.svg`, `nav-profile.svg`
- All `projects/base-flow/src/pages/*.jsx` with a hardcoded forward `navigate()` or a target string key

**Scripts / infra:**
- root `package.json` (new — scripts + `node --test`)
- `scripts/lib/deriveColors.mjs` + `.test.mjs`
- `scripts/lib/resolveFlow.mjs` + `.test.mjs`
- `scripts/lib/brandFs.mjs` — shared path helpers
- `scripts/new-brand.mjs`, `scripts/run.mjs`, `scripts/deploy.mjs`

**Agent + docs:**
- `.claude/skills/white-label/SKILL.md`
- `projects/base-flow/README.md` (update)

---

## Task 1: Move base flow into `projects/base-flow/`

**Files:**
- Move: `myphil-base-flow/` → `projects/base-flow/`
- Modify: `projects/base-flow/vite.config.js`

**Interfaces:**
- Produces: the app builds and runs from `projects/base-flow/`; `@ds` alias resolves to the repo root.

- [ ] **Step 1: Move the folder with git**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
mkdir -p projects
git mv myphil-base-flow projects/base-flow
```

- [ ] **Step 2: Fix the `@ds` alias depth**

In `projects/base-flow/vite.config.js`, the alias currently points one level up. It must point two levels up now.

```js
// projects/base-flow/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ds': repoRoot,
    },
  },
});
```

- [ ] **Step 3: Reinstall and build**

```bash
cd projects/base-flow
npm install
npm run build
```

Expected: build succeeds, `dist/` produced, no unresolved `@ds/...` imports.

- [ ] **Step 4: Smoke-run the dev server**

```bash
npm run dev
```

Expected: server starts; open the printed URL + `/welcome` → renders the "Welcome, Patricia!" screen unchanged. Stop the server.

- [ ] **Step 5: Commit**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add -A
git commit -m "refactor: move base flow to projects/base-flow, fix @ds alias depth"
```

---

## Task 2: Root `package.json` + color-derivation lib

**Files:**
- Create: `package.json` (repo root)
- Create: `scripts/lib/deriveColors.mjs`
- Test: `scripts/lib/deriveColors.test.mjs`

**Interfaces:**
- Produces: `deriveColors(primaryHex: string) → { hover: string, disabled: string, tint: string }` — all uppercase `#RRGGBB`. `hover` = primary mixed 25% toward white, `disabled` = 55% toward white, `tint` = 94% toward white.

- [ ] **Step 1: Create the root package.json**

```json
{
  "name": "myphil-white-label",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test scripts/lib/",
    "new-brand": "node scripts/new-brand.mjs",
    "run-brand": "node scripts/run.mjs",
    "deploy-brand": "node scripts/deploy.mjs"
  }
}
```

- [ ] **Step 2: Write the failing test**

```js
// scripts/lib/deriveColors.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deriveColors } from './deriveColors.mjs';

test('derives lighter shades from a dark primary', () => {
  const out = deriveColors('#2F1147');
  assert.equal(out.hover, '#59416C');
  assert.equal(out.disabled, '#ACA0B5');
  assert.equal(out.tint, '#F5F3F6');
});

test('accepts lowercase and no-hash input', () => {
  const out = deriveColors('2f1147');
  assert.equal(out.hover, '#59416C');
});

test('throws on malformed hex', () => {
  assert.throws(() => deriveColors('#12'));
});
```

- [ ] **Step 3: Run it, expect failure**

Run: `node --test scripts/lib/deriveColors.test.mjs`
Expected: FAIL — `Cannot find module './deriveColors.mjs'`.

- [ ] **Step 4: Implement**

```js
// scripts/lib/deriveColors.mjs
function parseHex(input) {
  const h = String(input).trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Bad hex: ${input}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function toHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function mixToWhite(rgb, amount) {
  return rgb.map((c) => c + (255 - c) * amount);
}

export function deriveColors(primaryHex) {
  const rgb = parseHex(primaryHex);
  return {
    hover: toHex(mixToWhite(rgb, 0.25)),
    disabled: toHex(mixToWhite(rgb, 0.55)),
    tint: toHex(mixToWhite(rgb, 0.94)),
  };
}
```

- [ ] **Step 5: Run tests**

Run: `node --test scripts/lib/deriveColors.test.mjs`
Expected: PASS (3/3). If a channel rounds off-by-one from the spec's example values, adjust the `mixToWhite` amounts until `#2F1147 → #59416C / #ACA0B5 / #F5F3F6` exactly, then re-run.

- [ ] **Step 6: Commit**

```bash
git add package.json scripts/lib/deriveColors.mjs scripts/lib/deriveColors.test.mjs
git commit -m "feat: add deriveColors lib for brand shade generation"
```

---

## Task 3: Flow-resolution lib

**Files:**
- Create: `scripts/lib/resolveFlow.mjs`
- Test: `scripts/lib/resolveFlow.test.mjs`

**Interfaces:**
- Consumes: a `flow` object `{ start: string, steps: {route:string}[], caregiverModal: boolean, terminal: string }`.
- Produces: `resolveFlow(flow) → { routes: string[], startRoute: string, terminalRoute: string, has(route), nextRoute(currentRoute) }`. `nextRoute` returns the following step's route, or `null` at/after the terminal or for an unknown route.

- [ ] **Step 1: Write the failing test**

```js
// scripts/lib/resolveFlow.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveFlow } from './resolveFlow.mjs';

const flow = {
  start: '/welcome',
  steps: [{ route: '/welcome' }, { route: '/insurance-details' }, { route: '/create-password' }],
  caregiverModal: false,
  terminal: '/create-password',
};

test('lists routes in order', () => {
  assert.deepEqual(resolveFlow(flow).routes, ['/welcome', '/insurance-details', '/create-password']);
});

test('nextRoute walks the list', () => {
  const r = resolveFlow(flow);
  assert.equal(r.nextRoute('/welcome'), '/insurance-details');
  assert.equal(r.nextRoute('/insurance-details'), '/create-password');
});

test('nextRoute returns null at terminal and for unknown route', () => {
  const r = resolveFlow(flow);
  assert.equal(r.nextRoute('/create-password'), null);
  assert.equal(r.nextRoute('/nope'), null);
});

test('has() reflects membership', () => {
  const r = resolveFlow(flow);
  assert.equal(r.has('/welcome'), true);
  assert.equal(r.has('/payment'), false);
});

test('throws if start or terminal not in steps', () => {
  assert.throws(() => resolveFlow({ ...flow, start: '/x' }));
  assert.throws(() => resolveFlow({ ...flow, terminal: '/x' }));
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `node --test scripts/lib/resolveFlow.test.mjs`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```js
// scripts/lib/resolveFlow.mjs
export function resolveFlow(flow) {
  if (!flow || !Array.isArray(flow.steps) || flow.steps.length === 0) {
    throw new Error('flow.steps must be a non-empty array');
  }
  const routes = flow.steps.map((s) => s.route);
  if (!routes.includes(flow.start)) throw new Error(`flow.start ${flow.start} not in steps`);
  if (!routes.includes(flow.terminal)) throw new Error(`flow.terminal ${flow.terminal} not in steps`);

  const has = (route) => routes.includes(route);
  const nextRoute = (currentRoute) => {
    const i = routes.indexOf(currentRoute);
    if (i === -1 || routes[i] === flow.terminal || i === routes.length - 1) return null;
    return routes[i + 1];
  };
  return {
    routes,
    startRoute: flow.start,
    terminalRoute: flow.terminal,
    caregiverModal: Boolean(flow.caregiverModal),
    has,
    nextRoute,
  };
}
```

- [ ] **Step 4: Run tests**

Run: `node --test scripts/lib/resolveFlow.test.mjs`
Expected: PASS (5/5).

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/resolveFlow.mjs scripts/lib/resolveFlow.test.mjs
git commit -m "feat: add resolveFlow lib for per-brand screen ordering"
```

---

## Task 4: `projects/base/` brand data

**Files:**
- Create: `projects/base/brand.json`, `projects/base/theme.css`, `projects/base/strings.json`, `projects/base/flow.json`
- Create: `projects/base/assets/philrx-logo-color.png` (copy of `assets/logos/philrx-logo-color.png`)

**Interfaces:**
- Produces: the canonical PhilRx brand folder — every other brand is scaffolded from this.

- [ ] **Step 1: Copy the logo asset**

```bash
mkdir -p projects/base/assets
cp "assets/logos/philrx-logo-color.png" projects/base/assets/philrx-logo-color.png
```

- [ ] **Step 2: Write `projects/base/brand.json`**

```json
{
  "name": "PhilRx",
  "slug": "base",
  "logo": "assets/philrx-logo-color.png",
  "images": {},
  "vercelProject": "myphil-base",
  "previewUrl": null
}
```

- [ ] **Step 3: Write `projects/base/theme.css`** (defaults already live in the design system)

```css
/* PhilRx = the design-system defaults. No overrides. */
:root {}
```

- [ ] **Step 4: Write `projects/base/strings.json`** (explicit defaults)

```json
{
  "drugName": "Drugname (chemical compositions) (volume)",
  "pharmacyName": "PhilRx Pharmacy",
  "accountLabel": "Phil account"
}
```

- [ ] **Step 5: Write `projects/base/flow.json`** (full current base flow, in App.jsx order)

```json
{
  "start": "/sms",
  "steps": [
    { "route": "/sms" },
    { "route": "/welcome" },
    { "route": "/insurance-details" },
    { "route": "/insurance-card-upload" },
    { "route": "/insurance-card-review" },
    { "route": "/contact-information" },
    { "route": "/savings-enrollment" },
    { "route": "/hipaa-authorization" },
    { "route": "/coupon-enrollment" },
    { "route": "/enrollment-success" },
    { "route": "/create-password" },
    { "route": "/checkout-sms" },
    { "route": "/login" },
    { "route": "/confirm-identity" },
    { "route": "/otp-delivery" },
    { "route": "/otp-verify" },
    { "route": "/my-prescriptions" },
    { "route": "/payment" },
    { "route": "/payment-offer" },
    { "route": "/order-confirmation" }
  ],
  "caregiverModal": true,
  "terminal": "/order-confirmation"
}
```

- [ ] **Step 6: Validate the JSON parses and resolves**

```bash
node -e "import('./scripts/lib/resolveFlow.mjs').then(m=>{const f=require('fs').readFileSync('projects/base/flow.json','utf8');console.log(m.resolveFlow(JSON.parse(f)).routes.length)})" --input-type=module
```

Expected: prints `20`. (If `require` is unavailable under ESM, use `node --input-type=module -e` with `readFile` from `node:fs/promises`.)

- [ ] **Step 7: Commit**

```bash
git add projects/base
git commit -m "feat: add projects/base PhilRx brand data folder"
```

---

## Task 5: Brand defaults + `BrandProvider`/`useBrand`

**Files:**
- Create: `projects/base-flow/src/brand/brandDefaults.js`
- Create: `projects/base-flow/src/brand/BrandContext.jsx`

**Interfaces:**
- Consumes: `brandDefaults.STRINGS`, `brandDefaults.TAGLINE_COLOR`.
- Produces:
  - `<BrandProvider value={brand}>` — `brand` shape `{ name, slug, logo, images, strings, flow }`.
  - `useBrand()` → the same object, with `strings` already merged over defaults (never missing a key).
  - `useBrandStrings()` convenience → `brand.strings`.

- [ ] **Step 1: Write `brandDefaults.js`**

```js
// projects/base-flow/src/brand/brandDefaults.js
export const STRINGS = {
  drugName: 'Drugname (chemical compositions) (volume)',
  pharmacyName: 'PhilRx Pharmacy',
  accountLabel: 'Phil account',
};

export const TAGLINE_COLOR = 'var(--foliage)';
```

- [ ] **Step 2: Write `BrandContext.jsx`**

```jsx
// projects/base-flow/src/brand/BrandContext.jsx
import React, { createContext, useContext, useMemo } from 'react';
import { STRINGS as DEFAULT_STRINGS } from './brandDefaults.js';

const BrandContext = createContext(null);

export function BrandProvider({ brand, children }) {
  const value = useMemo(() => ({
    name: brand.name,
    slug: brand.slug,
    logo: brand.logo,
    images: brand.images || {},
    flow: brand.flow,
    strings: { ...DEFAULT_STRINGS, ...(brand.strings || {}) },
  }), [brand]);
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used inside <BrandProvider>');
  return ctx;
}

export function useBrandStrings() {
  return useBrand().strings;
}
```

- [ ] **Step 3: Type-check by build (no runtime wiring yet)**

```bash
cd projects/base-flow && npm run build
```

Expected: build still succeeds (new files not imported yet, but must be valid).

- [ ] **Step 4: Commit**

```bash
git add projects/base-flow/src/brand
git commit -m "feat: add BrandProvider/useBrand context and string defaults"
```

---

## Task 6: Vite brand resolution — `@brand` alias, `virtual:brand`, brand glob

**Files:**
- Modify: `projects/base-flow/vite.config.js`
- Create: `projects/base-flow/src/brand/loadBrands.js`

**Interfaces:**
- Consumes: `process.env.BRAND` (default `"base"`); folders under repo `projects/*` that contain a `brand.json`.
- Produces:
  - alias `@brand` → `projects/<BRAND>` (used for the production build's baked-in brand).
  - virtual module `virtual:brand` exporting `{ brand }` where `brand` = parsed `brand.json` + `strings` (parsed `strings.json`) + `flow` (parsed `flow.json`) + `logoUrl` (resolved asset URL) for `process.env.BRAND`.
  - `loadBrands()` (dev) → `Array<{ name, slug, logo, images, strings, flow, logoUrl }>` for every `projects/*` brand, via `import.meta.glob`.

- [ ] **Step 1: Add a virtual-module plugin + brand glob root to `vite.config.js`**

```js
// projects/base-flow/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const projectsDir = path.join(repoRoot, 'projects');
const BRAND = process.env.BRAND || 'base';
const brandDir = path.join(projectsDir, BRAND);

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function bakedBrandPlugin() {
  const id = 'virtual:brand';
  const resolved = '\0' + id;
  return {
    name: 'baked-brand',
    resolveId(source) {
      if (source === id) return resolved;
    },
    load(thisId) {
      if (thisId !== resolved) return null;
      const brand = readJson(path.join(brandDir, 'brand.json'));
      brand.strings = readJson(path.join(brandDir, 'strings.json'));
      brand.flow = readJson(path.join(brandDir, 'flow.json'));
      // logo path is relative to the brand folder; import it so Vite fingerprints it
      const logoImport = JSON.stringify('@brand/' + brand.logo);
      return `import logoUrl from ${logoImport};
export const brand = ${JSON.stringify(brand)};
brand.logoUrl = logoUrl;
export default { brand };`;
    },
  };
}

export default defineConfig({
  plugins: [react(), bakedBrandPlugin()],
  server: { fs: { allow: [repoRoot] } },
  resolve: {
    alias: {
      '@ds': repoRoot,
      '@brand': brandDir,
      '@projects': projectsDir,
    },
  },
  define: {
    __BRAND__: JSON.stringify(BRAND),
  },
});
```

- [ ] **Step 2: Write `loadBrands.js` (dev glob)**

```js
// projects/base-flow/src/brand/loadBrands.js
// Eagerly load every brand folder's data + logo URL for the dev-only picker
// and dev-mode URL-segment brand switching.
const brandJson = import.meta.glob('@projects/*/brand.json', { eager: true });
const stringsJson = import.meta.glob('@projects/*/strings.json', { eager: true });
const flowJson = import.meta.glob('@projects/*/flow.json', { eager: true });
const logos = import.meta.glob('@projects/*/assets/*', { eager: true, query: '?url', import: 'default' });

function folderOf(filePath) {
  const m = filePath.match(/\/projects\/([^/]+)\//);
  return m ? m[1] : null;
}

export function loadBrands() {
  const out = [];
  for (const [file, mod] of Object.entries(brandJson)) {
    const folder = folderOf(file);
    const brand = mod.default || mod;
    const strings = (stringsJson[file.replace('brand.json', 'strings.json')] || {});
    const flow = (flowJson[file.replace('brand.json', 'flow.json')] || {});
    const logoUrl = logos[`${file.replace('brand.json', '')}${brand.logo}`];
    out.push({
      ...brand,
      folder,
      strings: strings.default || strings,
      flow: flow.default || flow,
      logoUrl,
    });
  }
  return out.sort((a, b) => (a.slug === 'base' ? -1 : b.slug === 'base' ? 1 : a.slug.localeCompare(b.slug)));
}

export function findBrand(slug) {
  return loadBrands().find((b) => b.slug === slug) || null;
}
```

- [ ] **Step 3: Build with the default brand**

```bash
cd projects/base-flow && BRAND=base npm run build
```

Expected: build succeeds. `virtual:brand` resolves; `dist/assets` contains the PhilRx logo.

- [ ] **Step 4: Build with an explicit non-existent brand to confirm failure is loud**

```bash
BRAND=nope npm run build || echo "failed as expected"
```

Expected: build throws (missing `projects/nope/brand.json`), prints "failed as expected".

- [ ] **Step 5: Commit**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add projects/base-flow/vite.config.js projects/base-flow/src/brand/loadBrands.js
git commit -m "feat: vite brand resolution — @brand alias, virtual:brand, brand glob"
```

---

## Task 7: `useFlow()` hook

**Files:**
- Create: `projects/base-flow/src/brand/useFlow.js`

**Interfaces:**
- Consumes: `useBrand().flow`, react-router `useNavigate`/`useLocation`, `resolveFlow` from `@ds/scripts/lib/resolveFlow.mjs`.
- Produces: `useFlow()` → `{ flow, routes, has(route), next(), goStart() }`. `next()` navigates to the next step after the **current pathname's last segment route**; if none, it no-ops and `console.warn`s in dev. In dev mode the app is mounted under `/:brand`, so `next()` must preserve the `/:brand` prefix.

- [ ] **Step 1: Implement**

```js
// projects/base-flow/src/brand/useFlow.js
import { useNavigate, useLocation } from 'react-router-dom';
import { resolveFlow } from '@ds/scripts/lib/resolveFlow.mjs';
import { useBrand } from './BrandContext.jsx';

const DEV = import.meta.env.DEV;

function splitPath(pathname) {
  // dev: /<brand>/<route...>   prod: /<route...>
  const parts = pathname.replace(/^\/+/, '').split('/');
  if (DEV) {
    const brand = parts.shift() || '';
    return { prefix: `/${brand}`, route: `/${parts.join('/')}` };
  }
  return { prefix: '', route: `/${parts.join('/')}` };
}

export function useFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flow } = useBrand();
  const resolved = resolveFlow(flow);
  const { prefix, route } = splitPath(location.pathname);

  const next = () => {
    const target = resolved.nextRoute(route);
    if (!target) {
      if (DEV) console.warn(`[useFlow] no next step after ${route} for this brand`);
      return;
    }
    navigate(`${prefix}${target}`);
  };

  const goStart = () => navigate(`${prefix}${resolved.startRoute}`);

  return { flow, routes: resolved.routes, has: resolved.has, next, goStart };
}
```

- [ ] **Step 2: Build**

```bash
cd projects/base-flow && npm run build
```

Expected: succeeds (hook not yet consumed).

- [ ] **Step 3: Commit**

```bash
git add projects/base-flow/src/brand/useFlow.js
git commit -m "feat: add useFlow hook for config-driven navigation"
```

---

## Task 8: `main.jsx` + `App.jsx` — mount BrandProvider, generate routes, dev picker

**Files:**
- Modify: `projects/base-flow/src/main.jsx`
- Modify: `projects/base-flow/src/App.jsx`
- Create: `projects/base-flow/src/pages/BrandPickerPage.jsx`

**Interfaces:**
- Consumes: `virtual:brand` (prod), `loadBrands`/`findBrand` (dev), `BrandProvider`, every existing page component, `resolveFlow`.
- Produces: in **dev**, routes mounted under `/:brand/*` with a picker at `/`; in **prod**, routes at `/*` for the baked brand, `/` → `Navigate` to `startRoute`. A screen only mounts if its route is in the active brand's `flow.routes`.

- [ ] **Step 1: Write `BrandPickerPage.jsx`**

```jsx
// projects/base-flow/src/pages/BrandPickerPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { loadBrands } from '../brand/loadBrands.js';

export function BrandPickerPage() {
  const brands = loadBrands();
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Which flow do you want to run?</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {brands.map((b) => {
          const flowStart = b.flow?.start || '/welcome';
          return (
            <li key={b.slug} style={{ border: '1px solid var(--fade)', borderRadius: 8, padding: 16 }}>
              <Link to={`/${b.slug}${flowStart}`} style={{ fontSize: 18, fontWeight: 700 }}>{b.name}</Link>
              <div style={{ fontSize: 13, color: 'var(--gunmetal)' }}>/{b.slug} · {b.flow?.steps?.length ?? 0} screens</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `App.jsx` to generate routes from the flow**

Replace the whole file. Keep the existing page imports; add the map from route → component.

```jsx
// projects/base-flow/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { resolveFlow } from '@ds/scripts/lib/resolveFlow.mjs';
import { BrandProvider } from './brand/BrandContext.jsx';
import { BrandPickerPage } from './pages/BrandPickerPage.jsx';
import { findBrand } from './brand/loadBrands.js';

import { SmsPage } from './pages/SmsPage.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsuranceDetailsPage } from './pages/InsuranceDetailsPage.jsx';
import { InsuranceCardUploadPage } from './pages/InsuranceCardUploadPage.jsx';
import { InsuranceCardReviewPage } from './pages/InsuranceCardReviewPage.jsx';
import { ContactInformationPage } from './pages/ContactInformationPage.jsx';
import { SavingsEnrollmentPage } from './pages/SavingsEnrollmentPage.jsx';
import { HipaaAuthorizationPage } from './pages/HipaaAuthorizationPage.jsx';
import { SavingsHipaaPage } from './pages/SavingsHipaaPage.jsx';
import { CouponEnrollmentPage } from './pages/CouponEnrollmentPage.jsx';
import { EnrollmentSuccessPage } from './pages/EnrollmentSuccessPage.jsx';
import { CreatePasswordPage } from './pages/CreatePasswordPage.jsx';
import { CheckoutSmsPage } from './pages/CheckoutSmsPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ConfirmIdentityPage } from './pages/ConfirmIdentityPage.jsx';
import { OtpDeliveryPage } from './pages/OtpDeliveryPage.jsx';
import { OtpVerifyPage } from './pages/OtpVerifyPage.jsx';
import { MyPrescriptionsPage } from './pages/MyPrescriptionsPage.jsx';
import { PaymentPage } from './pages/PaymentPage.jsx';
import { PaymentOfferPage } from './pages/PaymentOfferPage.jsx';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage.jsx';

const DEV = import.meta.env.DEV;
const WELCOME_MAX_WIDTH = 600;

const ROUTE_COMPONENTS = {
  '/sms': SmsPage,
  '/welcome': WelcomePage,
  '/insurance-details': InsuranceDetailsPage,
  '/insurance-card-upload': InsuranceCardUploadPage,
  '/insurance-card-review': InsuranceCardReviewPage,
  '/contact-information': ContactInformationPage,
  '/savings-enrollment': SavingsEnrollmentPage,
  '/hipaa-authorization': HipaaAuthorizationPage,
  '/savings-hipaa': SavingsHipaaPage,
  '/coupon-enrollment': CouponEnrollmentPage,
  '/enrollment-success': EnrollmentSuccessPage,
  '/create-password': CreatePasswordPage,
  '/checkout-sms': CheckoutSmsPage,
  '/login': LoginPage,
  '/confirm-identity': ConfirmIdentityPage,
  '/otp-delivery': OtpDeliveryPage,
  '/otp-verify': OtpVerifyPage,
  '/my-prescriptions': MyPrescriptionsPage,
  '/payment': PaymentPage,
  '/payment-offer': PaymentOfferPage,
  '/order-confirmation': OrderConfirmationPage,
};

function Frame({ children }) {
  return (
    <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
      {children}
    </div>
  );
}

function BrandFlow({ brand }) {
  const resolved = resolveFlow(brand.flow);
  return (
    <BrandProvider brand={brand}>
      <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>
        <Routes>
          <Route index element={<Navigate to={`.${resolved.startRoute}`.replace('./', '')} replace />} />
          {resolved.routes.map((route) => {
            const Cmp = ROUTE_COMPONENTS[route];
            if (!Cmp) return null;
            return <Route key={route} path={route.slice(1)} element={<Frame><Cmp /></Frame>} />;
          })}
          <Route path="*" element={<Navigate to={resolved.startRoute.slice(1)} replace />} />
        </Routes>
      </div>
    </BrandProvider>
  );
}

// dev: pick brand from the :brand URL segment
function DevBrandRoute() {
  const { brand: slug } = useParams();
  const brand = findBrand(slug);
  if (!brand) return <Navigate to="/" replace />;
  return <BrandFlow brand={brand} />;
}

export function App() {
  if (DEV) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrandPickerPage />} />
          <Route path="/:brand/*" element={<DevBrandRoute />} />
        </Routes>
      </BrowserRouter>
    );
  }
  // production: single baked brand, routes at root
  // eslint-disable-next-line import/no-unresolved
  const { brand } = require('virtual:brand');
  return (
    <BrowserRouter>
      <BrandFlow brand={brand} />
    </BrowserRouter>
  );
}
```

Note: `require('virtual:brand')` will not work — use a static import instead. Correct the production branch:

```jsx
import { brand as BAKED_BRAND } from 'virtual:brand';
// ...
if (!DEV) {
  return (
    <BrowserRouter>
      <BrandFlow brand={BAKED_BRAND} />
    </BrowserRouter>
  );
}
```

Put the `import { brand as BAKED_BRAND } from 'virtual:brand';` at the top with the others. In dev, `virtual:brand` still resolves (to `base` by default) — that's fine, it's just unused.

- [ ] **Step 3: Rewrite `main.jsx`**

```jsx
// projects/base-flow/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ds/styles.css';
import { brand as BAKED_BRAND } from 'virtual:brand';
import { Agentation } from 'agentation';
import { App } from './App.jsx';

// production: load the baked brand's theme overrides after the design-system tokens
if (!import.meta.env.DEV) {
  import('@brand/theme.css');
  document.title = `${BAKED_BRAND.name} — Enrollment`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
  </React.StrictMode>
);
```

For **dev**, per-brand theme CSS is loaded by `BrandFlow` — add to `App.jsx`'s `BrandFlow` a `useEffect` that injects/removes a `<link>` or `<style>` for `projects/<slug>/theme.css`. Simplest reliable approach: glob the theme files and toggle a `<style>` element.

Add to `loadBrands.js`:

```js
const themes = import.meta.glob('@projects/*/theme.css', { eager: true, query: '?raw', import: 'default' });
// in loadBrands(): themeCss: themes[file.replace('brand.json', 'theme.css')] || ':root{}'
```

Add to `BrandFlow` in `App.jsx`:

```jsx
import { useEffect } from 'react';
// ...
useEffect(() => {
  if (!DEV) return;
  const el = document.createElement('style');
  el.dataset.brandTheme = brand.slug;
  el.textContent = brand.themeCss || '';
  document.head.appendChild(el);
  document.title = `${brand.name} — Enrollment`;
  return () => { el.remove(); };
}, [brand]);
```

- [ ] **Step 4: Dev walkthrough**

```bash
cd projects/base-flow && npm run dev
```

Expected:
- `/` shows the picker listing "PhilRx" (and later Axesome).
- `/base/welcome` renders the welcome screen, PhilRx logo, unchanged.
- `/base/sms` renders; navigating still works via existing links (until Task 10 wires `next()`).

- [ ] **Step 5: Production build for base**

```bash
BRAND=base npm run build && BRAND=base npm run preview
```

Expected: `/` redirects to `/sms`; screens render at root paths; `dist/index.html` `<title>` becomes "PhilRx — Enrollment" at runtime.

- [ ] **Step 6: Commit**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add projects/base-flow/src
git commit -m "feat: brand-aware routing — dev picker + /:brand segment, prod baked brand"
```

---

## Task 9: Headers + icon assets read brand values

**Files:**
- Modify: `components/navigation/MyPhilHeader/MyPhilHeader.jsx`
- Modify: `projects/base-flow/src/components/PhilRxHeader.jsx`
- Modify: `projects/base-flow/src/components/PhilRxAppHeader.jsx`
- Modify: `projects/base-flow/src/assets/nav-rx.svg`
- Modify: `projects/base-flow/src/assets/nav-profile.svg`
- Modify: `projects/base-flow/src/pages/SmsPage.jsx`
- Modify: `projects/base-flow/src/pages/CheckoutSmsPage.jsx`

**Interfaces:**
- Consumes: `useBrand().logo` — but note `MyPhilHeader` lives in the shared `@ds` tree and must not import app-local files. Pass the logo down instead: `MyPhilHeader` gains optional props `logoSrc` and `taglineColor`, defaulting to the current PhilRx logo import and `var(--foliage)`. App pages that render it don't change (defaults preserve today's look); the brand wiring is done by a thin wrapper.

Decision: create `projects/base-flow/src/components/BrandHeader.jsx` that calls `useBrand()` and renders `<MyPhilHeader logoSrc={...} taglineColor="var(--header-tagline, var(--foliage))" />`, then swap page imports from `@ds/.../MyPhilHeader` to `../components/BrandHeader.jsx`. This keeps `@ds` free of app coupling.

- [ ] **Step 1: Add props to shared `MyPhilHeader`**

```jsx
// components/navigation/MyPhilHeader/MyPhilHeader.jsx
import React from 'react';
import defaultLogo from '@ds/assets/logos/philrx-logo-color.png';

export function MyPhilHeader({ logoSrc = defaultLogo, logoAlt = 'PhilRx', taglineColor = 'var(--foliage)' }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%', height: 60, background: 'var(--pure)', borderBottom: '1px solid var(--fade)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 17px', boxSizing: 'border-box' }}>
      <img src={logoSrc} alt={logoAlt} style={{ height: 20 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: taglineColor }}>Rx at your fingertips</span>
    </div>
  );
}
```

- [ ] **Step 2: Create `BrandHeader.jsx`**

```jsx
// projects/base-flow/src/components/BrandHeader.jsx
import React from 'react';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { useBrand } from '../brand/BrandContext.jsx';

export function BrandHeader() {
  const { logo, name } = useBrand();
  const src = import.meta.env.DEV ? logo : logo; // both modes: logo is already a resolved URL (see note)
  return <MyPhilHeader logoSrc={src} logoAlt={name} taglineColor="var(--header-tagline, var(--foliage))" />;
}
```

Note on the logo URL: make `BrandProvider` receive a `logoUrl` (resolved) and expose it as `logo`. In dev, `loadBrands()` already sets `logoUrl`; in prod, `virtual:brand` sets `brand.logoUrl`. Update `BrandContext.jsx` to use `brand.logoUrl || brand.logo` for the `logo` field. Update `App.jsx` `BrandFlow`/`DevBrandRoute` to pass the brand object that carries `logoUrl`.

- [ ] **Step 3: Point the 5 pages that render `MyPhilHeader` at `BrandHeader`**

Files: `WelcomePage.jsx`, `InsuranceDetailsPage.jsx`, `ContactInformationPage.jsx`, `SavingsEnrollmentPage.jsx`, `HipaaAuthorizationPage.jsx`, `EnrollmentSuccessPage.jsx`, `CreatePasswordPage.jsx` (and any other page importing `MyPhilHeader` — grep first: `grep -rl "navigation/MyPhilHeader" projects/base-flow/src/pages`).

In each: replace
`import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';`
with
`import { BrandHeader as MyPhilHeader } from '../components/BrandHeader.jsx';`
(aliasing keeps the JSX `<MyPhilHeader />` untouched.)

- [ ] **Step 4: Brand-ify `PhilRxHeader.jsx` and `PhilRxAppHeader.jsx`**

Replace `import philrxLogo from '@ds/assets/logos/philrx-logo-color.png';` with `useBrand()`:

```jsx
// PhilRxHeader.jsx
import React from 'react';
import { useBrand } from '../brand/BrandContext.jsx';
export function PhilRxHeader() {
  const { logo, name } = useBrand();
  return (
    <div style={{ width: '100%', height: 60, background: '#fff', borderBottom: '1px solid #d7dcdc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 17px', boxSizing: 'border-box' }}>
      <img src={logo} alt={name} style={{ height: 20 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: 'var(--foliage)' }}>Rx at your fingertips</span>
    </div>
  );
}
```

Do the equivalent one-line swap in `PhilRxAppHeader.jsx` (`<img src={logo} alt={name} ...>`).

- [ ] **Step 5: SVG icons → `currentColor`**

In `projects/base-flow/src/assets/nav-rx.svg` and `nav-profile.svg`, replace every `fill="#00827E"` with `fill="currentColor"`. In `PhilRxAppHeader.jsx`, the icons are rendered via `<img src={tab.icon} />` — `<img>` cannot inherit `currentColor`. Switch those two icons to inline SVG: import with `?raw` and render via `dangerouslySetInnerHTML` inside a `<span style={{ color: 'var(--foliage)' }}>`, or import as React components. Minimal approach: `import navRx from '../assets/nav-rx.svg?raw'` then `<span style={{ color: 'var(--foliage)', display: 'inline-flex' }} dangerouslySetInnerHTML={{ __html: navRx }} />`.

- [ ] **Step 6: `#2363c3` → `var(--sky)`**

`SmsPage.jsx` line ~11 and `CheckoutSmsPage.jsx` line ~11: change `color: '#2363c3'` to `color: 'var(--sky)'`.

- [ ] **Step 7: Verify base is unchanged**

```bash
cd projects/base-flow && npm run dev
```

Open `/base/welcome`, `/base/my-prescriptions` (PhilRxAppHeader), `/base/sms`. Expected: identical to before — PhilRx logo, teal tagline, teal nav icons, blue SMS link.

```bash
BRAND=base npm run build
```

Expected: succeeds.

- [ ] **Step 8: Commit**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add -A
git commit -m "feat: headers and nav icons consume brand logo/colors via context"
```

---

## Task 10: Config-driven navigation across all screens

**Files (modify):** every `projects/base-flow/src/pages/*.jsx` that calls `navigate('<hardcoded forward route>')` on a primary "continue" action. From the grep in the spec:
- `WelcomePage.jsx` — `CaregiverModal onConfirm={() => navigate('/insurance-details')}`; also gate the modal on `flow.caregiverModal`
- `InsuranceDetailsPage.jsx` — `navigate('/contact-information')` (primary), `navigate('/insurance-card-upload')` (secondary — keep, guard with `has()`)
- `ContactInformationPage.jsx` — `navigate('/savings-enrollment')`
- `SavingsEnrollmentPage.jsx` — already uses `NEXT_ROUTE`; swap to `next()`
- `HipaaAuthorizationPage.jsx` — `NEXT_ROUTE` (note the current value is a dangling route) → `next()`
- `EnrollmentSuccessPage.jsx` — `navigate('/create-password')`
- `CreatePasswordPage.jsx` — `navigate('/checkout-sms')`
- Any others found by: `grep -rn "navigate('/" projects/base-flow/src/pages`

**Interfaces:**
- Consumes: `useFlow()` from `../brand/useFlow.js`.
- Produces: primary "continue" buttons call `next()`; branch buttons keep explicit targets but wrapped so they no-op when the target route isn't in the brand's flow.

- [ ] **Step 1: Establish the pattern on `ContactInformationPage.jsx`**

```jsx
import { useFlow } from '../brand/useFlow.js';
// inside component:
const { next } = useFlow();
// button:
<Button hierarchy="primary" fullWidth onClick={next}>Next</Button>
```

Remove the now-unused `useNavigate` import if nothing else in the file uses it.

- [ ] **Step 2: Apply the same swap to each file in the list**

For each: add `const { next, has } = useFlow();`. Replace the forward `navigate('/x')` in the primary continue handler with `next()`. For **branch** navigations (e.g. `InsuranceDetailsPage` "different card", `ContactInformationPage` inline "upload it here" link), wrap: `onClick={() => has('/insurance-card-upload') ? navigate(<brand-prefixed>) : next()}` — but simpler and within scope: keep `useNavigate` for branch links, and in dev prefix with the brand. Since branch routes are only used by `base` (Axesome's flow has none), guard with `has()` and fall through to `next()` when absent. Keep `useNavigate` import in those two files only.

- [ ] **Step 3: `WelcomePage.jsx` — gate the caregiver modal**

```jsx
import { useFlow } from '../brand/useFlow.js';
// ...
const { next, flow } = useFlow();
// the Next button:
<Button hierarchy="primary" fullWidth disabled={!canContinue}
  onClick={() => (flow.caregiverModal ? setShowCaregiverModal(true) : next())}>Next</Button>
// the modal:
<CaregiverModal
  open={showCaregiverModal}
  onClose={() => setShowCaregiverModal(false)}
  onConfirm={() => { setShowCaregiverModal(false); next(); }}
/>
```

- [ ] **Step 4: `SavingsEnrollmentPage.jsx` / `HipaaAuthorizationPage.jsx`**

Delete the `const NEXT_ROUTE = ...` line. Replace every `navigate(NEXT_ROUTE)` with `next()`. These standalone screens stay in the repo for `base`; their content is unchanged.

- [ ] **Step 5: Dev walkthrough for `base`**

```bash
cd projects/base-flow && npm run dev
```

Walk `/base/sms` → tap link → `/base/welcome` → fill name+DOB → Next → caregiver modal → Confirm → `/base/insurance-details` → … → `/base/order-confirmation`. Expected: every primary button advances exactly as before; order matches `projects/base/flow.json`.

- [ ] **Step 6: Build**

```bash
BRAND=base npm run build
```

Expected: succeeds; no unused-import errors (Vite won't fail on those, but remove them for cleanliness).

- [ ] **Step 7: Commit**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add projects/base-flow/src/pages
git commit -m "feat: screens navigate via useFlow().next() instead of hardcoded routes"
```

---

## Task 11: String overrides in the affected screens

**Files (modify):** `projects/base-flow/src/pages/`:
- `WelcomePage.jsx` — `NEXT_STEPS` array (×2 "Drugname…"), line ~56 "Your Drugname… is ready! … sent your prescription to PhilRx." (drugName + pharmacyName), line ~79 "Already have a Phil account?" (accountLabel)
- `SavingsEnrollmentPage.jsx` — line ~24 "…enrolling in the Drugname… manufacturer coupon."
- `EnrollmentSuccessPage.jsx` — line ~17 "…your best Drugname… price!"
- `HipaaAuthorizationPage.jsx` — `HIPAA_PARAGRAPHS[3]` contains `[Drugname]`
- `CreatePasswordPage.jsx` — line ~23 "…protect your Phil account."
- (base-only, outside the 6 but still tokenize for consistency) `SmsPage.jsx` ~10 "…ready at PhilRx Pharmacy.", `CheckoutSmsPage.jsx` ~10, `PaymentPage.jsx`, `PaymentOfferPage.jsx`, `MyPrescriptionsPage.jsx` — the `Drugname (chemical compositions) (volume)` literal

**Interfaces:**
- Consumes: `useBrandStrings()` → `{ drugName, pharmacyName, accountLabel }`.

- [ ] **Step 1: `WelcomePage.jsx`**

Move the `NEXT_STEPS` constant into the component (it needs `drugName`), or make it a function. Then:

```jsx
import { useBrandStrings } from '../brand/BrandContext.jsx';
// inside component:
const { drugName, pharmacyName, accountLabel } = useBrandStrings();
const nextSteps = [
  `Phil partners with the makers of ${drugName} to make it easy for patients to access their medications.`,
  `Phil partners with the makers of ${drugName} to make it easy for patients to access their medications.`,
];
```

Line ~56: `Your {drugName} is ready! Dr. Cristina Truman sent your prescription to {pharmacyName}.`
Line ~79: `Already have a {accountLabel}? <a …>Log in</a>`

- [ ] **Step 2: `SavingsEnrollmentPage.jsx`**

```jsx
import { useBrandStrings } from '../brand/BrandContext.jsx';
const { drugName } = useBrandStrings();
// line ~24:
`Join the thousands of patients saving up to 98% by enrolling in the ${drugName} manufacturer coupon.* Agree to the terms and conditions below and save.`
```

- [ ] **Step 3: `EnrollmentSuccessPage.jsx`** — same import; `…your best {drugName} price!`

- [ ] **Step 4: `HipaaAuthorizationPage.jsx`**

`HIPAA_PARAGRAPHS` must become a function of `drugName` (replace the literal `[Drugname]` with `${drugName}`). Build the array inside the component.

- [ ] **Step 5: `CreatePasswordPage.jsx`** — `…protect your {accountLabel}.`

- [ ] **Step 6: base-only pages** — swap the `Drugname (chemical compositions) (volume)` literal for `{drugName}` from `useBrandStrings()` in `SmsPage.jsx`, `CheckoutSmsPage.jsx`, `PaymentPage.jsx`, `PaymentOfferPage.jsx`, `MyPrescriptionsPage.jsx`. `SmsPage.jsx` also: "ready at PhilRx Pharmacy" → `ready at {pharmacyName}`.

- [ ] **Step 7: Verify `base` renders defaults unchanged**

```bash
cd projects/base-flow && npm run dev
```

`/base/welcome`, `/base/sms`, `/base/create-password` → text reads exactly as before ("Drugname (chemical compositions) (volume)", "PhilRx", "Phil account").

- [ ] **Step 8: Build + commit**

```bash
BRAND=base npm run build
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add projects/base-flow/src/pages
git commit -m "feat: screen text pulls drugName/pharmacyName/accountLabel from brand strings"
```

---

## Task 12: Combined `/savings-hipaa` screen

**Files:**
- Create: `projects/base-flow/src/pages/SavingsHipaaPage.jsx`
- (already registered in `ROUTE_COMPONENTS` in Task 8)

**Interfaces:**
- Consumes: `Button`, `SignaturePad`, `BrandHeader` (as `MyPhilHeader`), `MyPhilFooter`, `useFlow().next`, `useBrandStrings().drugName`.
- Produces: one scrollable mandatory screen — savings terms + HIPAA authorization + signature + a single primary "Agree & Continue" button calling `next()`. No decline/skip/secondary button. No `DeclineEnrollmentModal`.

- [ ] **Step 1: Implement (compose the two existing screens' content)**

```jsx
// projects/base-flow/src/pages/SavingsHipaaPage.jsx
import React from 'react';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';
import { BrandHeader as MyPhilHeader } from '../components/BrandHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import { useFlow } from '../brand/useFlow.js';
import { useBrandStrings } from '../brand/BrandContext.jsx';

const SAVINGS_TERMS = 'I understand that if my prescription is not covered by my government sponsored program, I may be eligible for assistance programs from the manufacturer.  If I do take such assistance from the manufacturer on my prescription, I understand that I cannot and will not seek reimbursement from my government sponsored program';

function hipaaParagraphs(drugName) {
  return [
    'I authorize my healthcare providers, pharmacies (including Phil Rx), and health insurers, and their service providers (“Providers”) to disclose information relating to my insurance coverage, treatment and prescription details (“Personal Information”) to Manufacturer Pharma, Inc., its affiliates and service providers (“Manufacturer”) to provide the Services (as described below).  My Providers and Manufacturer may use my personal Information to provide the Services, which include to:',
    '•   Help coordinate insurance coverage for access to and receipt of my medication, including but not limited to prior authorization, formulary exception & appeal.',
    '•   Communicate with me about available copay assistance and financial assistance programs I might be eligible for if I have limited or no prescription coverage, and if I am enrolled, administer my participation in those programs.',
    `•   Send communications about ${drugName} that describe its benefits and related information that might help me manage my condition and its treatment, as well as requests for feedback related to the Services and my treatment, using the contact information I have provided to reach me by mail or email.`,
    '•   Conduct quality assurance reviews of the Services provided',
    'My Providers may receive payment, directly or indirectly, from Manufacturer for providing the Services. Once I authorize disclosure of my Personal Information, it may no longer be protected by federal health privacy law and applicable state laws.  I understand I do not have to sign this Authorization to get my medication or insurance coverage, and if I sign I can cancel this Authorization at any time by writing to:',
    'Manufacturer Pharma',
    'c/o Phil, Inc.',
    '6991 E. Camelback Rd., Suite 340C',
    'Scottsdale, AZ 85251',
    'Cancellation will not affect uses or disclosures that occurred before my cancellation.  I also have a right to a copy of this Authorization which I may obtain by calling (855) 588-0387, Option 3.',
    'This Authorization will expire 5 years after I sign it, or earlier if required by state law, unless I cancel it sooner.  If I do not sign this Authorization or cancel it, I may no longer qualify for the Services, but it will not impact my treatment, enrollment in my health plan or my insurance benefits. I have read and agree to the Authorization statement above.',
  ];
}

export function SavingsHipaaPage() {
  const { next } = useFlow();
  const { drugName } = useBrandStrings();
  const paragraphs = hipaaParagraphs(drugName);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Great News, Great Savings!</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', letterSpacing: '0.024px', color: 'var(--pitch)', margin: 0 }}>
            Join the thousands of patients saving up to 98% by enrolling in the {drugName} manufacturer coupon.* Agree to the terms and conditions below to continue.
          </p>
        </div>

        <div style={{ height: 160, overflowY: 'auto', border: '2px solid var(--fade)', borderRadius: 4, padding: 16, boxSizing: 'border-box' }}>
          <p style={{ fontSize: 14, lineHeight: '20px', letterSpacing: '0.035px', color: 'var(--pitch)', margin: 0, whiteSpace: 'pre-wrap' }}>{SAVINGS_TERMS}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>HIPAA Authorization</h2>
          <p style={{ fontSize: 16, lineHeight: '24px', letterSpacing: '0.024px', color: 'var(--pitch)', margin: 0 }}>
            To assist us in processing your prescription, please review and sign the HIPAA authorization below.
          </p>
        </div>

        <div style={{ height: 154, overflowY: 'auto', border: '2px solid var(--fade)', borderRadius: 4, padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {paragraphs.map((paragraph, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: '20px', letterSpacing: '0.035px', color: 'var(--pitch)', margin: 0, whiteSpace: 'pre-wrap' }}>{paragraph}</p>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.024px', color: 'var(--pitch)', margin: 0 }}>Draw your signature in the box below</p>
          <SignaturePad height={141} />
        </div>

        <Button hierarchy="primary" fullWidth onClick={next}>Agree &amp; Continue</Button>

        <p style={{ fontSize: 12, lineHeight: '24px', letterSpacing: '0.018px', color: 'var(--gunmetal)', margin: 0 }}>*Percentage depends on your insurance coverage.</p>
      </div>

      <MyPhilFooter />
    </div>
  );
}
```

- [ ] **Step 2: Add `/savings-hipaa` to `projects/base/flow.json`? No** — leave `base` on the two standalone screens. `/savings-hipaa` only appears in brands that opt in (Axesome). Confirm `ROUTE_COMPONENTS['/savings-hipaa']` is wired (Task 8).

- [ ] **Step 3: Build**

```bash
cd projects/base-flow && BRAND=base npm run build
```

Expected: succeeds (screen compiles even though `base` doesn't route to it).

- [ ] **Step 4: Commit**

```bash
git add projects/base-flow/src/pages/SavingsHipaaPage.jsx
git commit -m "feat: add combined mandatory /savings-hipaa screen"
```

---

## Task 13: `projects/Axesome/` brand data + placeholder logo

**Files:**
- Create: `projects/Axesome/brand.json`, `theme.css`, `strings.json`, `flow.json`
- Create: `projects/Axesome/assets/logo-placeholder.svg`

- [ ] **Step 1: `projects/Axesome/assets/logo-placeholder.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="132" height="24" viewBox="0 0 132 24" role="img" aria-label="Axesome">
  <rect width="132" height="24" rx="4" fill="#2F1147"/>
  <text x="66" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">AXESOME</text>
</svg>
```

- [ ] **Step 2: `projects/Axesome/brand.json`**

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

- [ ] **Step 3: `projects/Axesome/theme.css`**

```css
:root {
  --sky: #2F1147;
  --sky-hover: #59416C;
  --sky-disabled: #ACA0B5;
  --sky-tint: #F5F3F6;
  --brand-primary: #2F1147;
  --brand-primary-hover: #59416C;
  --brand-primary-disabled: #ACA0B5;
  --secondary: #A82B91;
  --header-tagline: #2F1147;
}
```

- [ ] **Step 4: `projects/Axesome/strings.json`**

```json
{
  "drugName": "SYMBRAVO® (meloxicam and rizatriptan)",
  "pharmacyName": "Axsome OnMySide Direct",
  "accountLabel": "Axsome OnMySide account"
}
```

- [ ] **Step 5: `projects/Axesome/flow.json`**

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

- [ ] **Step 6: Dev walkthrough**

```bash
cd projects/base-flow && npm run dev
```

- `/` picker now lists "Axesome".
- `/axesome/welcome`: purple primary buttons (`--sky #2F1147`), placeholder "AXESOME" logo, tagline in `#2F1147`, "Welcome, Patricia!" copy shows "SYMBRAVO® (meloxicam and rizatriptan)" and "Axsome OnMySide account".
- Next (no caregiver modal) → `/axesome/insurance-details` → `/axesome/contact-information` → `/axesome/savings-hipaa` (combined, single mandatory button, no decline) → `/axesome/enrollment-success` → `/axesome/create-password` (terminal; Next no-ops with a dev warning).

- [ ] **Step 7: Production build for axesome**

```bash
BRAND=axesome npm run build && BRAND=axesome npm run preview
```

Expected: `/` → redirect to `/welcome`; only the 6 routes exist; `<title>` "Axesome — Enrollment".

- [ ] **Step 8: Commit**

```bash
cd "/Users/leapfrog/Downloads/My Phil Experience Mobile - Design System"
git add projects/Axesome
git commit -m "feat: add Axesome white-label brand (first client)"
```

---

## Task 14: `scripts/lib/brandFs.mjs` + `new-brand.mjs`

**Files:**
- Create: `scripts/lib/brandFs.mjs`
- Create: `scripts/new-brand.mjs`

**Interfaces:**
- `brandFs`: `repoRoot`, `projectsDir`, `brandDir(slug)`, `listBrands() → string[]`, `readBrand(slug) → {brand,theme,strings,flow}`, `slugify(name)`.
- `new-brand.mjs` CLI: `node scripts/new-brand.mjs <FolderName> --primary <hex> [--secondary <hex>] [--name <str>] [--logo <path>] [--drug <str>] [--pharmacy <str>] [--account <str>]`. Copies `projects/base/`, writes `theme.css` (via `deriveColors` unless shades passed), `brand.json`, `strings.json`, `flow.json` (= base copy), places the logo (or generates an SVG placeholder from the name). Refuses if the folder exists.

- [ ] **Step 1: Write `brandFs.mjs`**

```js
// scripts/lib/brandFs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const projectsDir = path.join(repoRoot, 'projects');
export const brandDir = (slug) => path.join(projectsDir, slug);
export const slugify = (s) => String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function listBrands() {
  return fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'base-flow')
    .filter((d) => fs.existsSync(path.join(projectsDir, d.name, 'brand.json')))
    .map((d) => d.name);
}

export function readBrand(folder) {
  const dir = brandDir(folder);
  const j = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  return { dir, brand: j('brand.json'), strings: j('strings.json'), flow: j('flow.json') };
}
```

- [ ] **Step 2: Write `new-brand.mjs`**

```js
// scripts/new-brand.mjs
import fs from 'node:fs';
import path from 'node:path';
import { projectsDir, brandDir, slugify } from './lib/brandFs.mjs';
import { deriveColors } from './lib/deriveColors.mjs';

function parseArgs(argv) {
  const [folder, ...rest] = argv;
  const opts = {};
  for (let i = 0; i < rest.length; i += 2) opts[rest[i].replace(/^--/, '')] = rest[i + 1];
  return { folder, opts };
}

const { folder, opts } = parseArgs(process.argv.slice(2));
if (!folder) { console.error('usage: new-brand <FolderName> --primary #hex [--secondary #hex] [--name str] [--logo path] [--drug str] [--pharmacy str] [--account str]'); process.exit(1); }

const dir = brandDir(folder);
if (fs.existsSync(dir)) { console.error(`refusing: ${dir} exists`); process.exit(1); }
if (!opts.primary) { console.error('--primary <hex> is required'); process.exit(1); }

const slug = slugify(folder);
const name = opts.name || folder;
const shades = deriveColors(opts.primary);
const primary = '#' + opts.primary.replace(/^#/, '').toUpperCase();
const secondaryLine = opts.secondary ? `\n  --secondary: ${opts.secondary};` : '';

fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });

const themeCss = `:root {
  --sky: ${primary};
  --sky-hover: ${shades.hover};
  --sky-disabled: ${shades.disabled};
  --sky-tint: ${shades.tint};
  --brand-primary: ${primary};
  --brand-primary-hover: ${shades.hover};
  --brand-primary-disabled: ${shades.disabled};${secondaryLine}
  --header-tagline: ${primary};
}
`;
fs.writeFileSync(path.join(dir, 'theme.css'), themeCss);

let logoRel = 'assets/logo-placeholder.svg';
if (opts.logo && fs.existsSync(opts.logo)) {
  logoRel = `assets/${path.basename(opts.logo)}`;
  fs.copyFileSync(opts.logo, path.join(dir, logoRel));
} else {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="24" viewBox="0 0 140 24" role="img" aria-label="${name}"><rect width="140" height="24" rx="4" fill="${primary}"/><text x="70" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">${name.toUpperCase()}</text></svg>\n`;
  fs.writeFileSync(path.join(dir, logoRel), svg);
}

fs.writeFileSync(path.join(dir, 'brand.json'), JSON.stringify({
  name, slug, logo: logoRel, images: {}, vercelProject: `myphil-${slug}`, previewUrl: null,
}, null, 2) + '\n');

const baseStrings = JSON.parse(fs.readFileSync(path.join(projectsDir, 'base/strings.json'), 'utf8'));
fs.writeFileSync(path.join(dir, 'strings.json'), JSON.stringify({
  drugName: opts.drug || baseStrings.drugName,
  pharmacyName: opts.pharmacy || baseStrings.pharmacyName,
  accountLabel: opts.account || baseStrings.accountLabel,
}, null, 2) + '\n');

fs.copyFileSync(path.join(projectsDir, 'base/flow.json'), path.join(dir, 'flow.json'));

console.log(`✓ created projects/${folder}/  (slug: ${slug})
next:
  - edit projects/${folder}/flow.json for this client's screen set/order
  - node scripts/run.mjs ${slug}
  - node scripts/deploy.mjs ${slug}`);
```

- [ ] **Step 3: Manual test — scaffold a throwaway brand**

```bash
node scripts/new-brand.mjs TestCo --primary "#3355AA"
cat projects/TestCo/theme.css projects/TestCo/brand.json
node scripts/new-brand.mjs TestCo --primary "#3355AA"   # expect: refusing
rm -rf projects/TestCo
```

Expected: first run creates the folder with derived shades and a placeholder SVG; second run refuses; cleanup.

- [ ] **Step 4: Commit**

```bash
git add scripts/lib/brandFs.mjs scripts/new-brand.mjs
git commit -m "feat: new-brand.mjs scaffolds a brand folder from projects/base"
```

---

## Task 15: `scripts/run.mjs`

**Files:**
- Create: `scripts/run.mjs`

**Interfaces:**
- `node scripts/run.mjs [slug]` — no slug ⇒ print the numbered brand list and read a choice from stdin; then spawn `npm run dev` in `projects/base-flow` and print `http://localhost:5173/<slug>/<flow.start>`.

- [ ] **Step 1: Implement**

```js
// scripts/run.mjs
import { spawn } from 'node:child_process';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { listBrands, readBrand, repoRoot, slugify } from './lib/brandFs.mjs';

const folders = listBrands();
const bySlug = new Map(folders.map((f) => [readBrand(f).brand.slug, f]));

let slug = process.argv[2] && slugify(process.argv[2]);
if (!slug) {
  console.log('Which flow do you want to run?\n');
  [...bySlug.keys()].forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const ans = await rl.question('\nnumber or slug: ');
  rl.close();
  slug = [...bySlug.keys()][Number(ans) - 1] || slugify(ans);
}
if (!bySlug.has(slug)) { console.error(`unknown brand: ${slug}`); process.exit(1); }

const { brand, flow } = readBrand(bySlug.get(slug));
const start = flow.start || '/welcome';
console.log(`\n▶ ${brand.name}  →  http://localhost:5173/${slug}${start}\n`);

spawn('npm', ['run', 'dev'], { cwd: path.join(repoRoot, 'projects/base-flow'), stdio: 'inherit' });
```

- [ ] **Step 2: Manual test**

```bash
node scripts/run.mjs axesome
```

Expected: prints the Axesome URL, starts Vite. Open `http://localhost:5173/axesome/welcome` → Axesome-themed. Ctrl-C. Then `node scripts/run.mjs` with no arg → shows the menu.

- [ ] **Step 3: Commit**

```bash
git add scripts/run.mjs
git commit -m "feat: run.mjs — pick a brand and start the dev server"
```

---

## Task 16: `scripts/deploy.mjs`

**Files:**
- Create: `scripts/deploy.mjs`

**Interfaces:**
- `node scripts/deploy.mjs <slug>` — runs `BRAND=<slug> npm run build` in `projects/base-flow`, `vercel deploy --prod --yes --cwd projects/base-flow/dist` (or `vercel deploy --prod --yes --archive=tgz` from `dist`), captures the URL, writes it to `projects/<Folder>/brand.json:previewUrl`, then `curl -sf <url>` asserting HTTP 200 and that `brand.name` appears in the returned HTML. Prints local + public URLs.

- [ ] **Step 1: Implement**

```js
// scripts/deploy.mjs
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { listBrands, readBrand, brandDir, repoRoot, slugify } from './lib/brandFs.mjs';

const input = process.argv[2];
if (!input) { console.error('usage: deploy <slug>'); process.exit(1); }
const slug = slugify(input);
const folder = listBrands().find((f) => readBrand(f).brand.slug === slug);
if (!folder) { console.error(`unknown brand: ${slug}`); process.exit(1); }

const { brand } = readBrand(folder);
const flowDir = path.join(repoRoot, 'projects/base-flow');
const distDir = path.join(flowDir, 'dist');

console.log(`▶ building ${brand.name} …`);
execSync('npm run build', { cwd: flowDir, stdio: 'inherit', env: { ...process.env, BRAND: slug } });

console.log(`▶ deploying to Vercel project ${brand.vercelProject} …`);
const out = execSync(
  `vercel deploy --prod --yes --cwd "${distDir}" --name ${brand.vercelProject}`,
  { cwd: repoRoot, encoding: 'utf8' }
).trim();
const url = (out.match(/https:\/\/\S+\.vercel\.app/) || [out.split('\n').pop()])[0];

const brandJsonPath = path.join(brandDir(folder), 'brand.json');
const bj = JSON.parse(fs.readFileSync(brandJsonPath, 'utf8'));
bj.previewUrl = url;
fs.writeFileSync(brandJsonPath, JSON.stringify(bj, null, 2) + '\n');

console.log('▶ smoke-checking …');
const html = execSync(`curl -sf --retry 3 --retry-delay 2 "${url}"`, { encoding: 'utf8' });
if (!html.includes('<div id="root"></div>')) throw new Error('deployed HTML missing app root');

console.log(`\n✓ ${brand.name} deployed
  Local:  http://localhost:5173/${slug}/  (via: node scripts/run.mjs ${slug})
  Public: ${url}\n`);
```

Note: the brand `name` is injected into `<title>` at runtime (JS), so it won't appear in the raw HTML — assert on the static `<div id="root">` marker plus HTTP 200 (`curl -sf` already fails on non-2xx). If a real content check is wanted, add `--build-env BRAND=<slug>` and set a static `<meta name="brand">` in `index.html` from `virtual:brand` via an html-transform plugin (out of scope; leave the marker check).

- [ ] **Step 2: One-time Vercel auth (manual, by the user)**

```bash
npx vercel login
```

- [ ] **Step 3: Deploy base and axesome**

```bash
node scripts/deploy.mjs base
node scripts/deploy.mjs axesome
```

Expected: two builds, two deployments, `previewUrl` written into each `brand.json`, both URLs return 200. Visit `myphil-axesome.vercel.app` → Axesome flow at root.

- [ ] **Step 4: Commit**

```bash
git add scripts/deploy.mjs projects/base/brand.json projects/Axesome/brand.json
git commit -m "feat: deploy.mjs — per-brand Vercel deploy with smoke check"
```

---

## Task 17: `.claude/skills/white-label/SKILL.md`

**Files:**
- Create: `.claude/skills/white-label/SKILL.md`

- [ ] **Step 1: Write the skill**

```markdown
---
name: white-label
description: Use when the user wants to create, run, or deploy a white-label version of the base enrollment flow (a new brand with its own colors, logo, screen text, and screen order), or asks to "run this project" when multiple brands exist under projects/.
user-invocable: true
---

# White-Label Flow System

The base flow lives in `projects/base-flow/` (the only folder with screen code).
Each brand is a data-only folder `projects/<Name>/` with `brand.json`, `theme.css`,
`strings.json`, `flow.json`, `assets/`. See
`docs/superpowers/specs/2026-09-01-white-label-system-design.md`.

## Intent: create a white-label

Given a brand name, primary color, optional secondary color, optional logo path,
optional screen-text overrides, and an optional screen list/order:

1. `node scripts/new-brand.mjs "<Name>" --primary <hex> [--secondary <hex>] [--logo <path>] [--drug "<x>"] [--pharmacy "<x>"] [--account "<x>"]`
2. If the user gave a specific screen set/order, edit `projects/<Name>/flow.json`:
   `steps` in the requested order, `start` = first route, `terminal` = last route,
   `caregiverModal` false unless they want it. Use `/savings-hipaa` when they ask
   to combine savings + HIPAA into one mandatory screen.
3. Validate: `cd projects/base-flow && BRAND=<slug> npm run build` — fix any error.
4. `node scripts/deploy.mjs <slug>` (needs one-time `npx vercel login`).
5. Report **Local** (`node scripts/run.mjs <slug>`) and **Public** (`previewUrl`) links.

Do NOT edit base-flow screen code, navigation, or copy for a brand — only its
data folder. Only the string keys `drugName`, `pharmacyName`, `accountLabel` are
overridable; adding a new key is a base-flow change and needs the user's OK.

## Intent: run

"Run this project" / "run <brand>": `node scripts/run.mjs [slug]`. With no slug the
script prints a numbered menu — relay it and pass the user's choice.

## Intent: new independent flow (not a white-label)

If the request is a genuinely different product, not a rebrand of the base flow:
do NOT touch `projects/`. Scaffold a separate Vite app and tell the user it's
independent.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/white-label/SKILL.md
git commit -m "feat: white-label agent skill"
```

---

## Task 18: Update `projects/base-flow/README.md`

**Files:**
- Modify: `projects/base-flow/README.md`

- [ ] **Step 1: Replace the "Run it" and add a "White-label" section**

Document: `projects/` layout; `npm run dev` → picker at `/`, brands at `/<slug>/<route>`; `BRAND=<slug> npm run build` for a single-brand production bundle; `scripts/new-brand.mjs`, `run.mjs`, `deploy.mjs`; the `flow.json` / `strings.json` / `theme.css` contracts; the known limitation that non-key copy strings ("Phil partners…", "© Phil, Inc.") stay on PhilRx defaults.

- [ ] **Step 2: Commit**

```bash
git add projects/base-flow/README.md
git commit -m "docs: document the white-label system in the base-flow README"
```

---

## Self-Review

**Spec coverage:**
- `projects/` layout + base-flow move → Task 1, 4, 13
- Local URL-segment brand switching + picker → Task 6, 8
- Per-brand isolated Vercel deploy → Task 16
- `virtual:brand` / `@brand` / two BrandProvider modes → Task 5, 6, 8
- `theme.css` overrides + derived shades → Task 2, 13, 14
- `strings.json` (3 keys, base defaults) → Task 5, 11
- `flow.json`-driven nav + `useFlow().next()` → Task 3, 7, 10
- caregiver-modal toggle → Task 10
- combined `/savings-hipaa` mandatory screen → Task 8 (route), 12
- headers/nav icons/`#2363c3` → Task 9
- scripts new-brand/run/deploy → Task 14, 15, 16
- agent skill → Task 17
- Axesome brand, all values → Task 13
- README → Task 18
- Testing/validation approach (build + node:test + manual) → every task's verify steps

**Placeholder scan:** no "TBD"/"handle errors"/"similar to" — code blocks are complete. Two spots flagged as explicit follow-up decisions inside the plan (deploy content-check depth; branch-link brand-prefixing) have a concrete default chosen.

**Type consistency:** `useBrand()` shape `{name,slug,logo,images,strings,flow}` consistent across Tasks 5/8/9/11/12. `resolveFlow(flow)` → `{routes,startRoute,terminalRoute,caregiverModal,has,nextRoute}` consistent across Tasks 3/7/8. `useFlow()` → `{flow,routes,has,next,goStart}` consistent across Tasks 7/10/12. `deriveColors` → `{hover,disabled,tint}` consistent across Tasks 2/14. `brandFs` exports consistent across Tasks 14/15/16.

**Known risk to watch during execution:** `import.meta.glob` with the `@projects` alias may need the literal relative path (`../../projects/*/...`) instead of the alias — if the glob returns empty in Task 8, switch to the relative form. Noted here so the executor doesn't lose time.
