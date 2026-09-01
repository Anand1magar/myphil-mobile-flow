# Axesome — white-label enrollment flow

A branded copy of `../myphil-base-flow` (the base flow / source of truth).
Same screens, layout, and interactions — only the brand identity and the
screen set/order differ.

## Run it

    npm install
    npm run dev

Opens at the printed localhost URL, starting on `/welcome`.

## The flow (6 screens, in order)

1. `/welcome` — verify identity (last name + DOB)
2. `/insurance-details` — confirm insurance on file
3. `/contact-information` — confirm / update contact info
4. `/savings-hipaa` — **mandatory** combined savings enrollment + HIPAA
   authorization (no skip / decline)
5. `/enrollment-success` — enrollment complete
6. `/create-password` — create account password

The Caregiver modal from the base flow is **excluded** for this client.

## What was branded

Everything below lives inside this folder; the base flow is untouched.

| Piece | Where |
|---|---|
| Colors (`--sky` family = `#2F1147`, secondary `#A82B91`) | `src/brand-theme.css` (loaded after `@ds/styles.css` in `src/main.jsx`) |
| Logo + header tagline color | `src/assets/axesome-logo.svg`, `src/components/BrandHeader.jsx` |
| Drug name → "SYMBRAVO® (meloxicam and rizatriptan)" | edited directly in the screen files |
| Pharmacy name → "Axsome OnMySide Direct" | `src/pages/WelcomePage.jsx` |
| Account label → "Axsome OnMySide account" | `WelcomePage.jsx`, `CreatePasswordPage.jsx` |
| Screen set + order + navigation | `src/App.jsx` + each screen's primary button |

The shared design system (`@ds/components`, `@ds/tokens`) is still imported,
not copied — only the brand-owned CSS variables are overridden. Footer legal
copy ("© Phil, Inc.") is left on the base default.
