# New white-label brand — prompt template

Copy the block below, fill in the blanks, send it. Everything the agent needs
is in it. The agent duplicates `projects/myphil-base-flow`, renames the copy to
the brand, and applies only the changes you list — comparing against the base
flow so nothing else drifts.

---

## Fill-in template

```
Create a new white-label brand from projects/myphil-base-flow.

BRAND NAME: <Brand>            (folder + package name + <title>; used verbatim)
WHITE LABEL: yes              (same product experience, only brand identity + the flow below change)

COLORS
  Primary  (--sky):            #XXXXXX
  Primary hover (--sky-hover): #XXXXXX   (or "auto")
  Primary disabled (--sky-disabled): #XXXXXX   (or "auto")
  Primary tint (--sky-tint):   #XXXXXX   (or "auto")
  Secondary:                   #XXXXXX
  Header tagline color:        #XXXXXX   (default: primary)
  Header background:           #FFFFFF   (base default — change only if needed)
  Text color:                  #0A0A0A   (base default — change only if needed)
  Everything else stays on base defaults.

LOGO: <path to logo file>      (or "placeholder" to generate one)
TAGLINE TEXT: "Rx at your fingertips"   (base default — change only if needed)

TYPOGRAPHY: base defaults      (or: body font <name>, heading font <name>)

SCREEN TEXT   (base default  ->  this brand)
  Drug name:      "Drugname (chemical compositions) (volume)"  ->  "<value>"
  Pharmacy name:  "PhilRx Pharmacy" / "PhilRx"                 ->  "<value>"
  Account label:  "Phil account"                               ->  "<value>"
  <any other exact string to swap, base -> new>

SCREEN FLOW   (exact screens, in this order; each screen's primary button goes to the next)
  1. /welcome                — <description>
  2. /insurance-details      — <description>
  3. /contact-information    — <description>
  4. /savings-hipaa          — combined savings + HIPAA, MANDATORY (no skip/decline)
  5. /enrollment-success     — <description>
  6. /create-password        — <description>  (last screen)

EXCLUDE: Caregiver modal, <any other base screens/steps not in the flow above>

COMBINE: savings-enrollment + hipaa-authorization -> one mandatory /savings-hipaa screen
         (list any other screens to merge, or "none")

After building: run it and give me the localhost URL. Commit. <push to main? yes/no>
```

---

## One-liner (when the flow = base flow, only identity changes)

```
New white-label from projects/myphil-base-flow. Brand: <Brand>. Primary #XXXXXX,
secondary #XXXXXX. Logo: <path>. Drug name -> "<value>", pharmacy -> "<value>",
account label -> "<value>". Same flow as base. Build, run, give me the URL, commit.
```

---

## What the agent does with it (fixed steps)

1. `cp -R projects/myphil-base-flow "projects/<Brand>"`, remove `node_modules/ dist/ .vite/`.
2. Rename: `package.json` + `package-lock.json` `name`, `index.html` `<title>`.
3. `src/brand-theme.css` (new) with the color overrides — imported in `src/main.jsx`
   right after `@ds/styles.css`. `"auto"` shades are derived from the primary
   (~+20% / +60% / +95% toward white for hover / disabled / tint).
4. `src/assets/<brand>-logo.*` + `src/components/BrandHeader.jsx` (brand logo +
   tagline color). Every screen that used `@ds/.../MyPhilHeader` imports
   `BrandHeader as MyPhilHeader` instead.
5. `src/App.jsx` rewritten to exactly the listed routes in order; each screen's
   primary button repointed to the next route; unused `src/pages/*` and
   `src/components/*` deleted; excluded modals removed.
6. Screen-text swaps applied directly in the screen files (base string -> new).
7. `npm install && npm run build` (must pass) + `npm run dev` -> report the URL.
8. `git add -A && git commit`; push to `main` only if you said yes.

The base flow (`projects/myphil-base-flow`) and other brands are never touched.
