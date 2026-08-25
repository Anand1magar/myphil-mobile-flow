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

## Known limitations

- **Keyboard accessibility:** the design system's `Radio` and `Checkbox`
  components (used on `/insurance` and `/address`) hide their native
  `<input>` with `display:none`, which removes them from the tab order —
  they currently can't be operated by keyboard or assistive technology.
  This is a pre-existing design-system limitation, not introduced by this
  app. Fixing it requires updating `components/forms/Radio/Radio.jsx` and
  `components/forms/Checkbox/Checkbox.jsx` to use a visually-hidden-but-focusable
  pattern instead of `display:none`.
- **No prop-contract safety net:** this project has no TypeScript and no
  automated tests, so `npm run build` succeeding does not guarantee a
  design-system component's props still match what a page expects — if a
  component's prop name or behavior changes upstream, the app would build
  cleanly but render a degraded or blank control at runtime. Worth
  keeping in mind when editing shared `components/` files.

## Status

Phase 1 (enrollment funnel) — see
`../docs/superpowers/specs/2026-08-25-enrollment-app-design.md`.
Dashboard, admin tool, and public-link hosting are later phases.
