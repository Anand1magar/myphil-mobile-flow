# My Phil Enrollment App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the four existing enrollment demo screens (`ui_kits/enrollment/*.jsx`, currently a CDN/Babel `useState`-array-of-screens toy) into a real Vite + React app with browser routing, built from the actual design-system components instead of ad-hoc inline markup.

**Architecture:** A new `app/` folder at the repo root, sibling to `components/`/`tokens/`/`assets/`, importing directly from them via a `@ds` Vite alias (no file duplication). One React Router route per screen (`/welcome`, `/insurance`, `/address`, `/thank-you`), one `EnrollmentContext` holding form data collected across steps.

**Tech Stack:** Vite 5, React 18, plain JSX (no TypeScript), react-router-dom v6 (`BrowserRouter`).

**Spec:** `docs/superpowers/specs/2026-08-25-enrollment-app-design.md`

## Global Constraints

- No TypeScript — match the existing component library's plain-JSX style.
- Import components/tokens/assets from the sibling design-system folders via the `@ds` alias; never copy files into `app/`.
- `BrowserRouter` for now (spec defers the public-link/hosting decision; swapping to `HashRouter` later is a one-line change).
- State is in-memory only (`EnrollmentContext` + `useState`) — no localStorage, no backend calls.
- No automated test suite for this phase (per spec's Testing section — this is a visual/UX prototype). In place of unit tests, every task's automated gate is `npm run build`, which fails on broken imports/JSX/references — this is this project's equivalent of a red/green test cycle.
- Only build the 4 screens that already exist as demo content (Welcome, Insurance, Address, Thank you). Do not invent additional screens (e.g. a payment screen) that haven't been provided via Figma yet — the "Continue" button on Address goes straight to Thank-you until a real payment screen is supplied.

---

### Task 1: Scaffold the Vite + React app shell

**Files:**
- Create: `app/package.json`
- Create: `app/vite.config.js`
- Create: `app/index.html`
- Create: `app/.gitignore`
- Create: `app/src/main.jsx`
- Create: `app/src/App.jsx`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a working Vite dev server at `app/`, with a `@ds` alias resolving to the repo root (one level up from `app/`), and `App.jsx` exporting a named `App` component rendered into `#root`. Later tasks rewrite `App.jsx`'s body but keep the same export.

- [ ] **Step 1: Create `app/package.json`**

```json
{
  "name": "my-phil-enrollment-app",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.8"
  }
}
```

- [ ] **Step 2: Create `app/vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ds': path.resolve(__dirname, '..'),
    },
  },
});
```

- [ ] **Step 3: Create `app/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Phil — Enrollment</title>
  </head>
  <body style="margin:0;background:#F4F4F4">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `app/.gitignore`**

```
node_modules
dist
.vite
```

- [ ] **Step 5: Create `app/src/App.jsx`**

```jsx
import React from 'react';

export function App() {
  return <div style={{ padding: 40, fontFamily: 'sans-serif' }}>My Phil enrollment app — scaffold OK</div>;
}
```

- [ ] **Step 6: Create `app/src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ds/styles.css';
import { App } from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 7: Install dependencies**

Run: `cd app && npm install`
Expected: installs without error, creates `app/node_modules` and `app/package-lock.json`.

- [ ] **Step 8: Verify the build succeeds**

Run: `cd app && npm run build`
Expected: `vite build` succeeds and writes `app/dist/`. This confirms the `@ds` alias resolves and `@ds/styles.css` (which itself `@import`s `tokens/*.css`) loads correctly.

- [ ] **Step 9: Verify the dev server serves the scaffold page**

Run: `cd app && npm run dev -- --port 5173 &` then `sleep 1 && curl -s http://localhost:5173/ | grep -o '<title>[^<]*</title>'`
Expected: `<title>My Phil — Enrollment</title>`. Then stop the dev server (`kill %1` or the backgrounded PID).

- [ ] **Step 10: Commit**

```bash
git add app/package.json app/package-lock.json app/vite.config.js app/index.html app/.gitignore app/src/App.jsx app/src/main.jsx
git commit -m "Scaffold Vite + React app shell for enrollment funnel"
```

---

### Task 2: Routing shell, EnrollmentContext, and the Welcome screen

**Files:**
- Modify: `app/package.json` (add `react-router-dom` dependency)
- Create: `app/src/state/EnrollmentContext.jsx`
- Create: `app/src/pages/WelcomePage.jsx`
- Modify: `app/src/App.jsx`

**Interfaces:**
- Consumes: `App` export from Task 1 (rewritten here); `@ds/components/forms/Button/Button.jsx` (`Button({ hierarchy, size, disabled, fullWidth, onClick, children })`); `@ds/components/domain/PolicyTrustRatings/PolicyTrustRatings.jsx` (`PolicyTrustRatings()`, no props); `@ds/assets/images/welcome-hero.png`.
- Produces: `EnrollmentProvider` and `useEnrollment()` from `app/src/state/EnrollmentContext.jsx`, where `useEnrollment()` returns `{ data, updateData }` and `data` has shape `{ hasInsurance: boolean|null, address: { street: string, city: string, zip: string } }`. Routes `/` (redirects to `/welcome`) and `/welcome` (renders `WelcomePage`). Later tasks import `useEnrollment` from this same file and add routes to `App.jsx`.

- [ ] **Step 1: Install react-router-dom**

Run: `cd app && npm install react-router-dom@^6.26.2`
Expected: `app/package.json` dependencies now include `react-router-dom`.

- [ ] **Step 2: Create `app/src/state/EnrollmentContext.jsx`**

```jsx
import React, { createContext, useContext, useState } from 'react';

const EnrollmentContext = createContext(null);

const initialData = {
  hasInsurance: null,
  address: { street: '', city: '', zip: '' },
};

export function EnrollmentProvider({ children }) {
  const [data, setData] = useState(initialData);
  const updateData = (patch) => setData((prev) => ({ ...prev, ...patch }));
  return (
    <EnrollmentContext.Provider value={{ data, updateData }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollment must be used within an EnrollmentProvider');
  return ctx;
}
```

- [ ] **Step 3: Create `app/src/pages/WelcomePage.jsx`**

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { PolicyTrustRatings } from '@ds/components/domain/PolicyTrustRatings/PolicyTrustRatings.jsx';
import heroImage from '@ds/assets/images/welcome-hero.png';

export function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '40px 16px', fontFamily: 'var(--font-body)' }}>
      <img src={heroImage} alt="" style={{ width: '100%', borderRadius: 8 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-black)', color: 'var(--pitch)', margin: 0 }}>
          Get your medication delivered, for less
        </h1>
        <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--gunmetal)', margin: 0 }}>
          My Phil finds you the lowest price on your prescription and ships it free, right to your door.
        </p>
      </div>
      <Button hierarchy="primary" fullWidth onClick={() => navigate('/insurance')}>
        Get started
      </Button>
      <PolicyTrustRatings />
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `app/src/App.jsx`**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnrollmentProvider } from './state/EnrollmentContext.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';

export function App() {
  return (
    <EnrollmentProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#fff', maxWidth: 400, margin: '0 auto', boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EnrollmentProvider>
  );
}
```

- [ ] **Step 5: Verify the build succeeds**

Run: `cd app && npm run build`
Expected: succeeds with no errors.

- [ ] **Step 6: Manually verify the Welcome screen**

Run: `cd app && npm run dev -- --port 5173 &`, then open `http://localhost:5173/` in a browser (or `sleep 1 && curl -s http://localhost:5173/`).
Expected: URL redirects to `/welcome`; page shows the hero image, headline "Get your medication delivered, for less", the "Get started" button, and the trust/policy footer. Click "Get started" — the URL changes to `/insurance` (the page will render blank until Task 3, which is expected at this point). Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add app/package.json app/package-lock.json app/src/state/EnrollmentContext.jsx app/src/pages/WelcomePage.jsx app/src/App.jsx
git commit -m "Add routing shell, EnrollmentContext, and Welcome screen"
```

---

### Task 3: Insurance screen

**Files:**
- Create: `app/src/pages/InsurancePage.jsx`
- Modify: `app/src/App.jsx` (add `/insurance` route)

**Interfaces:**
- Consumes: `useEnrollment()` from `app/src/state/EnrollmentContext.jsx` (Task 2); `@ds/components/forms/Button/Button.jsx`; `@ds/components/forms/Radio/Radio.jsx` (`Radio({ label, checked, onChange, name })`).
- Produces: `/insurance` route rendering `InsurancePage`, which writes `data.hasInsurance: boolean` via `updateData`.

- [ ] **Step 1: Create `app/src/pages/InsurancePage.jsx`**

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { Radio } from '@ds/components/forms/Radio/Radio.jsx';
import { useEnrollment } from '../state/EnrollmentContext.jsx';

export function InsurancePage() {
  const navigate = useNavigate();
  const { data, updateData } = useEnrollment();
  const choice = data.hasInsurance;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '40px 16px', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-black)', color: 'var(--pitch)', margin: 0 }}>
        Do you have insurance?
      </h1>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--gunmetal)', margin: 0 }}>
        We'll use it to find your lowest possible price.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio
          name="hasInsurance"
          label="Yes, I have insurance"
          checked={choice === true}
          onChange={() => updateData({ hasInsurance: true })}
        />
        <Radio
          name="hasInsurance"
          label="No, I don't have insurance"
          checked={choice === false}
          onChange={() => updateData({ hasInsurance: false })}
        />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Button hierarchy="tertiary" fullWidth onClick={() => navigate('/welcome')}>
            Back
          </Button>
        </div>
        <div style={{ flex: 2 }}>
          <Button hierarchy="primary" fullWidth disabled={choice === null} onClick={() => navigate('/address')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the route in `app/src/App.jsx`**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnrollmentProvider } from './state/EnrollmentContext.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsurancePage } from './pages/InsurancePage.jsx';

export function App() {
  return (
    <EnrollmentProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#fff', maxWidth: 400, margin: '0 auto', boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/insurance" element={<InsurancePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EnrollmentProvider>
  );
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `cd app && npm run build`
Expected: succeeds with no errors.

- [ ] **Step 4: Manually verify the Insurance screen**

Run: `cd app && npm run dev -- --port 5173 &`, open `http://localhost:5173/insurance`.
Expected: question + two radio options render; Continue is disabled until one is selected; selecting an option fills the radio and enables Continue; Back navigates to `/welcome`; Continue (once enabled) navigates to `/address` (blank until Task 4, expected). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/InsurancePage.jsx app/src/App.jsx
git commit -m "Add Insurance screen"
```

---

### Task 4: Address screen

**Files:**
- Create: `app/src/pages/AddressPage.jsx`
- Modify: `app/src/App.jsx` (add `/address` route)

**Interfaces:**
- Consumes: `useEnrollment()` (Task 2); `@ds/components/forms/Button/Button.jsx`; `@ds/components/forms/TextInput/TextInput.jsx` (`TextInput({ label, placeholder, value, onChange })`); `@ds/components/forms/Checkbox/Checkbox.jsx` (`Checkbox({ label, checked, onChange })`).
- Produces: `/address` route rendering `AddressPage`, which writes `data.address: { street, city, zip }` via `updateData`.

- [ ] **Step 1: Create `app/src/pages/AddressPage.jsx`**

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { useEnrollment } from '../state/EnrollmentContext.jsx';

export function AddressPage() {
  const navigate = useNavigate();
  const { data, updateData } = useEnrollment();
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const setField = (field) => (e) => updateData({ address: { ...data.address, [field]: e.target.value } });
  const canContinue = data.address.street && data.address.city && data.address.zip;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 16px', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-black)', color: 'var(--pitch)', margin: 0 }}>
        Where should we ship it?
      </h1>
      <TextInput label="Street address" placeholder="123 Market St" value={data.address.street} onChange={setField('street')} />
      <TextInput label="City" placeholder="San Francisco" value={data.address.city} onChange={setField('city')} />
      <TextInput label="ZIP code" placeholder="94103" value={data.address.zip} onChange={setField('zip')} />
      <Checkbox label="Same as billing address" checked={sameAsBilling} onChange={() => setSameAsBilling((v) => !v)} />
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Button hierarchy="tertiary" fullWidth onClick={() => navigate('/insurance')}>
            Back
          </Button>
        </div>
        <div style={{ flex: 2 }}>
          <Button hierarchy="primary" fullWidth disabled={!canContinue} onClick={() => navigate('/thank-you')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the route in `app/src/App.jsx`**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnrollmentProvider } from './state/EnrollmentContext.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsurancePage } from './pages/InsurancePage.jsx';
import { AddressPage } from './pages/AddressPage.jsx';

export function App() {
  return (
    <EnrollmentProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#fff', maxWidth: 400, margin: '0 auto', boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/address" element={<AddressPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EnrollmentProvider>
  );
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `cd app && npm run build`
Expected: succeeds with no errors.

- [ ] **Step 4: Manually verify the Address screen**

Run: `cd app && npm run dev -- --port 5173 &`, open `http://localhost:5173/address`.
Expected: three labeled fields + "Same as billing address" checkbox (checked by default) render; Continue is disabled until all three fields have text; typing in each field updates it; Back navigates to `/insurance`; Continue (once enabled) navigates to `/thank-you` (blank until Task 5, expected). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/AddressPage.jsx app/src/App.jsx
git commit -m "Add Address screen"
```

---

### Task 5: Thank-you screen, full click-through verification, and app README

**Files:**
- Create: `app/src/pages/ThankYouPage.jsx`
- Modify: `app/src/App.jsx` (add `/thank-you` route)
- Create: `app/README.md`

**Interfaces:**
- Consumes: `@ds/components/forms/Button/Button.jsx`; `@ds/components/domain/ThankyouContent/ThankyouContent.jsx` (`ThankyouContent({ heading?, body? })`, both optional with sensible defaults).
- Produces: `/thank-you` route rendering `ThankYouPage`, completing the routed loop `/welcome → /insurance → /address → /thank-you → /welcome`. No further tasks consume this.

- [ ] **Step 1: Create `app/src/pages/ThankYouPage.jsx`**

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { ThankyouContent } from '@ds/components/domain/ThankyouContent/ThankyouContent.jsx';

export function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '60px 16px' }}>
      <ThankyouContent />
      {/*
        No dashboard exists yet (out of scope per the spec's Non-goals).
        This loops back to /welcome as a stand-in until that phase begins.
      */}
      <Button hierarchy="primary" fullWidth onClick={() => navigate('/welcome')}>
        Go to My Phil
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Add the route in `app/src/App.jsx`**

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnrollmentProvider } from './state/EnrollmentContext.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsurancePage } from './pages/InsurancePage.jsx';
import { AddressPage } from './pages/AddressPage.jsx';
import { ThankYouPage } from './pages/ThankYouPage.jsx';

export function App() {
  return (
    <EnrollmentProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#fff', maxWidth: 400, margin: '0 auto', boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EnrollmentProvider>
  );
}
```

- [ ] **Step 3: Create `app/README.md`**

```markdown
# My Phil enrollment app

Real, routed React app for the My Phil enrollment funnel — built from the
design system in the parent folder (`../components`, `../tokens`,
`../assets`, imported via the `@ds` alias, not copied).

## Run it

    npm install
    npm run dev

Open the printed localhost URL. Routes:

- `/welcome` — landing screen
- `/insurance` — insurance yes/no question
- `/address` — shipping address
- `/thank-you` — confirmation (currently loops back to `/welcome`; will
  point at the My-Phil dashboard once that phase is built)

## Adding a screen

1. Get the Figma link for the screen from the user.
2. Pull it via the Figma MCP (`get_design_context` / `get_screenshot`).
3. Add a page component under `src/pages/`, composing existing
   `@ds/components/...` where possible.
4. Add the route in `src/App.jsx` and wire navigation (`useNavigate`) from
   the adjacent screens.

## Status

Phase 1 (enrollment funnel) — see
`../docs/superpowers/specs/2026-08-25-enrollment-app-design.md`.
Dashboard, admin tool, and public-link hosting are later phases.
```

- [ ] **Step 4: Verify the build succeeds**

Run: `cd app && npm run build`
Expected: succeeds with no errors.

- [ ] **Step 5: Manually verify the full click-through flow**

Run: `cd app && npm run dev -- --port 5173 &`, open `http://localhost:5173/`.
Expected, in order:
1. Redirects to `/welcome`; click "Get started" → `/insurance`.
2. Select "Yes, I have insurance"; click "Continue" → `/address`.
3. Fill Street/City/ZIP; click "Continue" → `/thank-you`.
4. Confirmation renders; click "Go to My Phil" → back to `/welcome`.
5. Use the browser back button from `/insurance` → returns to `/welcome` (confirms real browser history, not just in-app state).
6. Refresh the browser while on `/address` → page reloads still on `/address` (confirms real routing, not array-index state).

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add app/src/pages/ThankYouPage.jsx app/src/App.jsx app/README.md
git commit -m "Add Thank-you screen and complete enrollment funnel click-through"
```
