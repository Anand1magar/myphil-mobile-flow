# projects/ — base flow + white-label brands

```
projects/
├── myphil-base-flow/   ← the base flow. SOURCE OF TRUTH. Do not brand this folder.
└── Axesome/            ← white-label #1: a full copy of myphil-base-flow, re-branded
```

Each brand is a **complete standalone copy** of `myphil-base-flow` with its own
`package.json` / `npm run dev`. They share the design system at the repo root
(`../../components`, `../../tokens`, `../../assets`) via the `@ds` Vite alias —
only brand-owned CSS variables are overridden per brand.

## Run a brand

    cd projects/<BrandName>
    npm install
    npm run dev

## Make a new white-label brand

1. Copy the base flow to a folder named after the brand:

       cp -R projects/myphil-base-flow "projects/<BrandName>"
       rm -rf "projects/<BrandName>/node_modules" "projects/<BrandName>/dist"

2. In the copy, change only:
   - **`package.json`** → `"name"`
   - **`index.html`** → `<title>`
   - **`src/brand-theme.css`** (new file, imported in `src/main.jsx` right after
     `@ds/styles.css`) → override `--sky`, `--sky-hover`, `--sky-disabled`,
     `--sky-tint`, `--secondary`, `--brand-accent` with the brand's colors
   - **`src/components/BrandHeader.jsx`** (new) → brand logo + tagline color;
     swap `import { MyPhilHeader } from '@ds/.../MyPhilHeader...'` for
     `import { BrandHeader as MyPhilHeader } from '../components/BrandHeader.jsx'`
     in each screen that renders the header
   - **`src/assets/<brand>-logo.svg`** → the brand logo (or a placeholder)
   - **screen text** the client asked to change (drug name, pharmacy name,
     account label, …) — edit the strings directly in the screen files
   - **`src/App.jsx`** → the screen set + order for this client; point each
     screen's primary button at the next route; delete unused `src/pages/*`

3. `npm install && npm run dev`, walk the flow, done.

See `projects/Axesome/README.md` for a worked example.
