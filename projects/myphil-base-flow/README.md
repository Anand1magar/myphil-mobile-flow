# My Phil base flow

A second, separate Vite + React app for a different flow than `../app` (the
enrollment funnel). Built from the same design system in the parent folder
(`../components`, `../tokens`, `../assets`, imported via the `@ds` alias, not
copied) — same pattern as `../app`, different screens.

Source: Figma file "1Q26 - 2Q26 MyPhil Branded Template"
(`10Tk5IOa5hql2baZEgZMeu`), nodes `1486:9349`, `1486:9351`, `1486:12585`.

## Run it

    npm install
    npm run dev

Open the printed localhost URL. Routes:

- `/sms` — recreation of the PhilRx text message that starts this flow
  (tap the link to continue)
- `/welcome` — "Welcome, Patricia!" identity-verification screen (last
  name + DOB). Clicking "Next" once both fields are filled opens the
  Caregiver modal as an overlay.

The Caregiver modal ("Caregiver info for minors") is not a route — it's
`components/domain/CaregiverModal`, opened from `/welcome`. Confirm/Cancel
both just close it for now, since no screen exists yet for what happens
after — add the next route when that screen's Figma link arrives.

## Design-system changes made for this flow

- `components/domain/CaregiverModal/CaregiverModal.jsx` was rewritten to
  match the real Figma spec (it previously didn't match at all — different
  copy, different fields). Now reuses the shared `Modal`, `Radio`, and
  `Button` components.
- New shared assets added: `assets/logos/philrx-logo-color.png`,
  `assets/images/trustpilot-rating.png`,
  `assets/images/bbb-accredited-business.jpg`,
  `assets/images/soc2-badge.png`, `assets/icons/hipaa-badge/*.svg`.

## Adding a screen

1. Get the Figma link for the screen from the user.
2. Pull it via the Figma MCP (`get_design_context`).
3. Add a page component under `src/pages/`, composing existing
   `@ds/components/...` where possible; extend a design-system component
   if a real one exists but doesn't match, add a new one if nothing does.
4. Add the route in `src/App.jsx` and wire navigation from adjacent screens.

## Known limitations

Same as `../app`: no TypeScript and no automated tests, so `npm run build`
won't catch a design-system component's prop contract silently changing.
The SMS screen (`/sms`) intentionally keeps its iOS status-bar chrome
(static "9:41", battery/wifi icons) since it's recreating a native Messages
app screenshot, not a real app screen — `/welcome` and the rest of this
app do not fake a status bar, matching `../app`'s convention.
