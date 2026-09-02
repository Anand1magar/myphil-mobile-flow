# My Phil Design System

**My Phil** is a pharmacy-benefits / prescription-delivery platform: patients enroll (insurance check, coupon/discount lookup, HIPAA authorization, payment, delivery signature) then manage prescriptions, refills and payment in a logged-in "My-Phil" dashboard. The brand also runs a marketing/official website and an internal "MD-Dash" ops/rep admin tool.

**Source:** a Figma file, *"01. My Phil Component Library.fig"*, mounted read-only for this import. It contains ~59k nodes across 52 pages — enrollment flow screens (`01.-Welcome-Screen` → `14.-Profile-Page`), a component library (`Buttons`, `Input`, `Dropdown`, `Checkbox`, `Radio`, `Header`/`Header2`, `Footer`/`Footer2`), the `Phil-Enrollment` and `My-Phil` product pages, and several exploration/archive pages (`XX-*`). No GitHub repo or codebase was attached.

## Coverage & scope note

The Figma file defines **453 component "families"** by the compiler's count, but the overwhelming majority are the *same* pattern (Button, Input, Checkbox, faq-status-accordion, credit-card-form, etc.) duplicated once per enrollment-flow page (14 flow pages × repeated variant tables) or duplicated device-by-device (Mobile/Tablet/Desktop symbols the compiler counts as separate variant sets). A further large slice is Figma-only documentation furniture — spec/anatomy tables, instance-table grids, frame status stamps, the purple dashed annotation overlay. Building all 453 literally would mean hundreds of near-identical copies of ~36 real patterns.

**Blocker as of the latest session:** the .fig mount is no longer reachable (the Figma read tools are not attached), so the remaining families cannot be spec-read. Re-attach *01. My Phil Component Library.fig* via the Import menu to continue coverage.

Given that, this import builds **one canonical, prop-driven component per real pattern** (documented below) rather than one file per Figma duplicate, and lists exactly what was skipped and why. If you need finer-grained fidelity for a specific flow page or a family not listed, tell me which one and I'll pull its exact spec from the .fig and add it.

**Built:** 79 components, 51 icons, full color/type/spacing tokens, 2 UI kits (Enrollment funnel, My-Phil dashboard).

**Not built / intentionally skipped, and why:**
- **`.Status bars`, `.Status bar element`, `Frame title`, `Notes=…/Status=…`, `_Phil/Screen`, `Covers`, `My Phil,Starter Template`, `*-Instance-Table`, `.color-master`** — these are Figma *documentation furniture* (frame status stamps, spec/anatomy tables, instance-table grids, cover art, the purple dashed annotation overlay). They are not product UI and have no meaning outside Figma.
- **`_Input field`, `Input`, `input`, `Input-MyPhil`, `Form Input`, `_Dropdown Elements`, `Checkboxes`, `Radio Buttons`, `MD Dash, Buttons`, `My Phil Button Extended`, `My Phil/Button`** — duplicate/device-split copies of TextInput, InputSpecial, Dropdown, Checkbox, Radio and Button, which are built once each with props for state/device.
- **`Molecules / 1.x–10.x`, `.Molecules / 6.0.2.1 Drug Pre-requisites`, `faq-section` (139 variants), `My-Ph/ Screens/ D. profile`, `Phil-En/Screen …`** — these are *screen-level compositions*, not primitives; they're recreated in `ui_kits/enrollment/` and `ui_kits/my-phil-dashboard/` rather than as components.
- **MD-Dash / Data-Dash / Rep-Portal internal admin tool** (`MD-Dash*`, `State=DataDashboard…`, `State=RP…`) and the **`XX-*` archive/exploration pages** (`XX-Rebranded-MyPhil`, `XX-Exploration-Side-Bars`, `XX-Pop-up`, `XX-Process-cards`, …) — separate, non-patient-facing or explicitly archived surfaces. Tell me if you want the admin tool covered and I'll add it as a third UI kit.

## Components
- **Forms:** Button, MDDashButton, TextInput, InputField, InputMyPhil, InputSpecial, FormInput, Checkbox, Radio, Select, Dropdown, DropdownElements, SearchBar, Calendar
- **Feedback:** ActionBox, Banner, InfoBox, DiscountInfoBox, NoticeInformation, Modal
- **Data display:** Avatar, StatusBadge, PatientStatus, PartsUpdates, NumberedBullet, Highlight, MiscDashboard
- **Navigation & shell:** Header, MyPhilHeader, HeaderPagination, StatusBar, PhilScreen, Footer, MyPhilFooter, DeviceFrame, Accordion, FaqSection, TabItem, DashboardNavLabels
- **Enrollment flow molecules:** WelcomeMsg, ConfirmInformation, LastNameDOB, PolicyTrustRatings, InsuranceInfo, InsuranceSelectScreen, InsuranceSelectModal, InsuranceUpload, RxBin, InsuranceReview, CouponEnrollment, SavingsCard, HippaAuth, Authorizations, CarepointSign, CaregiverModal, DrugPrerequisites, SignatureReason, FirstStep, NextSteps, Checklist, ThankyouContent, CTA
- **Address & delivery:** Address, AddressToggle, BillingAddress, DeliveryInfo, DeliveryConfirmation, DeliveryConfirmationSign, MissingDelivery, PaymentApprovalDelivery, Signature, SignaturePad
- **Payment, cost & refills:** CreditCardForm, PaymentInformation, PaymentMethod, OrderSummary, Statement, PriceBreakdown, PriceBreakdownSteps, JourneySteps, Future
- **Icon:** wraps `assets/icons/icon-data.js` (51 glyphs)

### Intentional additions / name mapping (kit name → component name)
Every component below exists in the kit; the name was slugified to PascalCase or generalized across device/variant splits. Nothing here is invented UI.

| Kit family | Component |
| --- | --- |
| `My-Ph/Atoms/price-break-down` | `PriceBreakdown` |
| `My-Ph/Atoms/sign-pad` | `SignaturePad` |
| `My-Ph/Atoms/checklist` | `Checklist` |
| `My-Ph/Atoms/next-steps` | `NextSteps` |
| `My-Ph/Atoms/address toggle` | `AddressToggle` |
| `My-Ph/Atoms/billing-address` | `BillingAddress` |
| `My-Ph/Atoms/header-pagination` | `HeaderPagination` |
| `My-Ph/Atoms/info-message`, `Info box`, `Discount info box` | `InfoBox` |
| `Molecules / 1.5.1 Numbered Bullet` | `NumberedBullet` |
| `Molecules / 4.2 SavingsCard` | `SavingsCard` |
| `Molecules / 10.1 DeliveryInfo` | `DeliveryInfo` |
| `Molecules / 6.0.3 Statement` | `Statement` |
| `My Phil/Input Special` | `InputSpecial` |
| `MD-Dash, Search Bar` | `SearchBar` |
| `calendar/desktop`, `calendar/mobile` | `Calendar` |
| `My Phil/ navigation/tab`, `Dashboard Nav-Labels` | `TabItem` |
| `Action-box` | `ActionBox` |
| `banner / info`, `banner / danger` | `Banner` |
| `.Notice information` | `NoticeInformation` |
| `_Patient Status` | `PatientStatus` |
| `faq-section` order-status strings (~70) | `StatusBadge` |
| `_Dropdown Elements`, `Dropdown` | `Dropdown` (open panel) + `Select` (closed trigger) |
| `.My-Phil/Header`, `.Official-website/Header` | `Header` (`variant` prop) |
| `Molecules/Footer`, `My-Ph/Footer`, `.Official-website/Footer` | `Footer` |
| `Accordion`, `faq-sub-section` | `Accordion` |
| `Journey steps` | `JourneySteps` |
| `Credit card form` | `CreditCardForm` |
| `My Phil/Button`, `My Phil Button Extended`, `MD Dash, Buttons` | `Button` (`hierarchy`/`size`/`disabled` props) |
| `Input`, `_Input field`, `Input-MyPhil`, `Form Input` | `TextInput` (`state` prop) |
| `Checkboxes`, `checkbox` | `Checkbox` |
| `Radio Buttons` | `Radio` |
| `avatar`, `avatar-phil` | `Avatar` |
| `Molecules / 1.1 WelcomeMsg` | `WelcomeMsg` |
| `ConfirmInformation`, `Molecules / 1.2 ConfirmInformation` | `ConfirmInformation` |
| `LastNameDOB`, `Molecules / 1.3 LastnameDOBInput` | `LastNameDOB` |
| `Molecules / 2.1.1 InsuranceInfo` | `InsuranceInfo` |
| `Molecules / 2.1.2 InsuranceSelectModal` | `InsuranceSelectModal` |
| `Molecules / 2.2.2 InsuranceUpload` | `InsuranceUpload` |
| `Molecules / 2.2.3 RxBin` | `RxBin` |
| `Molecules / 2.2.4 InsuranceReview` | `InsuranceReview` |
| `Molecules / 4.1 Coupon Enrollment`, `Molecules / 4.3 CEModal` | `CouponEnrollment` |
| `Molecules / 5 HippaAuth`, `Molecules / 9.2 HIPPA` | `HippaAuth` |
| `Molecules / 8 Authorizations` | `Authorizations` |
| `Molecules / 9.1 CarepointSign` | `CarepointSign` |
| `Molecules / 100.1 CaregiverModal` | `CaregiverModal` |
| `.Molecules / 6.0.2.1 Drug Pre-requisites` | `DrugPrerequisites` |
| `Molecules / 6.0.4 CTA` | `CTA` |
| `.molecules Thankyou Content`, `Molecules / 7 Thankyou` | `ThankyouContent` |
| `Molecules / 10.3 Missing delivery` | `MissingDelivery` |
| `Molecules / 10.4/10.5 DeliveryConfirmation` | `DeliveryConfirmation` |
| `My-Ph/Atoms/ signature-reason` | `SignatureReason` |
| `My-Ph/Atoms/first-step` | `FirstStep` |
| `My-Ph/Atoms/price-breakdown-steps` | `PriceBreakdownSteps` |
| `#Payment Information Component`, `Molecules / 6.3 Payment` | `PaymentInformation` |
| `My-Ph/Molecules/ payment-approval-page__payment-method` | `PaymentMethod` |
| `My-Ph/Molecules/ payment-approval-page_order-summary` | `OrderSummary` |
| `MD-Dash, Misc. Dashboard` | `MiscDashboard` |
| `Dashboard Nav-Labels` | `DashboardNavLabels` |
| `faq-section`, `faq-sub-section`, `FAQs` | `FaqSection` (+ `StatusBadge` for status strings) |
| 51-glyph icon set | `Icon` |
| `& StatusBar` | `StatusBar` |
| `_Phil/Screen` | `PhilScreen` |
| `_Parts / Updates` | `PartsUpdates` |
| `_Input field`, `Input field` | `InputField` |
| `Input-MyPhil` | `InputMyPhil` |
| `Form Input`, `form/text-field` | `FormInput` |
| `MD Dash, Buttons`, `.MD Dash, Button Master` | `MDDashButton` |
| `Molecules / 3.1 Address` | `Address` |
| `Molecules / 6.0.1 Discount info box` | `DiscountInfoBox` |
| `Molecules / 1.4 Policy, login and trust pilot ratings` | `PolicyTrustRatings` |
| `Molecules / 2.2.1 InsuranceSelectScreen` | `InsuranceSelectScreen` |
| `Molecules / 10.4 DeliveryConfirmationSign` | `DeliveryConfirmationSign` |
| `My-Ph/Molecules/ payment-approval-page__delivery` | `PaymentApprovalDelivery` |
| `My-Ph/Molecules/ signature` | `Signature` |
| `My-Ph/Molecules/ future` | `Future` |

## Index
- `styles.css` — root stylesheet, imports everything below
- `tokens/` — colors, typography, spacing, fonts, `fig-tokens.css` (raw Figma Variables)
- `assets/logos/` — wordmark + icon mark (white-on-dark only, see Iconography)
- `assets/images/` — welcome-screen hero photo, Trustpilot badge
- `assets/icons/` — icon-data.js + Icon component
- `components/forms/`, `components/feedback/`, `components/data-display/`, `components/navigation/`, `components/domain/`
- `ui_kits/enrollment/` — Welcome → Insurance → Address → Thank you, click-through
- `ui_kits/my-phil-dashboard/` — Prescriptions → detail → Profile, click-through
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `SKILL.md` — portable skill file for Claude Code

## Content fundamentals
- **Voice:** short, plain, reassuring — written for someone worried about a medication, not a tech-savvy shopper. Sentence case throughout, no ALL CAPS except tiny badge labels.
- **Person:** second person ("your prescription", "we'll ship it free") — the product speaks directly to the patient.
- **Tone by moment:** upbeat/simple on marketing & welcome screens ("Get your medication delivered, for less"); calm and procedural on official forms (HIPAA, authorizations, insurance); status copy is factual, never alarmist even for "Action needed" states.
- **Emoji:** none found anywhere in the source content.
- **Numbers/specifics:** costs and dates are shown precisely ("$24.99", "Sep 12") — the brand leans on concrete numbers to build trust around pricing.
- **CTAs:** verb-first, short — "Get started", "Continue", "Continue to payment", "Go to My Phil".

## Visual foundations
- **Color:** one primary CTA blue (`--sky #2363C3`) used almost everywhere action is needed; a teal/green family (`Foliage/Grass/Teal`) is the secondary/success accent; neutrals run a full Pitch→Pure grey ramp; semantic warning (`Sun`, amber) and error (`Ruby`, red) are used sparingly and only for real states. No gradients anywhere in the source.
- **Type:** Lato is the workhorse UI face (regular body, bold 18/24 labels+buttons with a distinctive +0.02em tracking); Inter appears only in internal spec/dashboard pages; Mark OT is reserved for the "My.Phil" wordmark and a few headline instances (substituted — see Iconography/fonts note below).
- **Backgrounds:** flat white or `Paper` (#F4F4F4) surfaces; one photographic hero image on the welcome screen; no repeating patterns, textures, or illustration style found.
- **Borders/shadows:** borders are 1px "inset box-shadow rings" rather than CSS borders (copied verbatim) — default black/grey, blue on focus, red on error, green on verified. Cards use a soft `--shadow-card`; small floating elements (Journey steps popover) use an unusually hard `10px 10px 10px rgba(0,0,0,0.1)` drop shadow — kept exact, not softened.
- **Radius:** small and consistent — 4px is the workhorse (inputs, cards, action-boxes), buttons use 5px, pills/badges use 99–100px. Nothing rounder.
- **Buttons:** primary = filled blue, secondary = blue-outlined, tertiary = grey-outlined white, link = underlined blue text. Hover lightens/tints; disabled swaps to a pale blue (`#A7C1E7`), never just reduced opacity.
- **Motion:** the .fig defines no transition/easing specs; components here use short (120–150ms) linear/ease transitions for hover and open/close states as a sensible default, not a documented brand rule.
- **Transparency/blur:** none observed — the only translucency is the modal scrim (50% black), which is a UI convention, not a brand motif.
- **Imagery:** the one photographic asset (Welcome-screen hero) is a warm, real-world lifestyle photo, not studio/clinical. No illustration set exists in the source.

## Iconography
- The .fig defines a ~73-glyph Material-Symbols-style icon set (outlined/filled/round/sharp/two-tone variants of `account_circle`, `arrow_*`, `check_*`, `keyboard_arrow_*`, `credit_card`, `local_shipping`, etc.) plus a custom "My Phil / 24·32·44·64 / …" glyph family (plus, cross, checkmark, box, edit, shield, rx, store, trash, exclamation-circle…) and a few full-color compound icons (lock, danger-red, info-full-blue, hand-money).
- **51 of these were extracted programmatically** into `assets/icons/icon-data.js` (see `Icon.d.ts` for the full name list) — real vector paths copied from the file, not redrawn. A few required names weren't resolvable from the mounted VFS (e.g. `list/bullet` had no decodable geometry) and were skipped rather than approximated.
- No emoji or unicode-glyph icons are used anywhere in the source.
- **No full logo mark was found** — only two white-on-dark assets exist (`assets/logos/myphil-wordmark-white.svg`, `phil-icon-mark.svg`). There is no on-light or full-color lockup in the file; on light backgrounds the Header component renders the wordmark inverted rather than inventing a new logo color.

## Font substitution — please read
**Lato** and **Inter** are real Google Fonts, loaded as-is. **Mark OT** (Monotype, used for the "My.Phil" wordmark and a handful of headlines) is a commercial font not present in the .fig's exportable assets and not on Google Fonts — it has been **substituted with Manrope**, the closest free geometric/humanist match. If you have the real Mark OT font files, share them and I'll swap `tokens/fonts.css` to the real face.

## My ask
This is a first pass built from a genuinely huge file (59k nodes, 453 nominal component families) in one session — I prioritized breadth of real, working patterns over literally enumerating every duplicate. Please tell me:
1. Which specific flows or screens matter most to get pixel-exact (I can pull their precise .fig specs next).
2. Whether the Mark OT → Manrope substitution needs the real font files.
3. Any component family I skipped that you actually need (MD-Dash admin, calendar picker, specific modal, etc).

I'll iterate fast once I know where to focus.
