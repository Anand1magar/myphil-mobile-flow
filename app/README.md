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
