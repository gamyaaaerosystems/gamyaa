# UFlight Division 03 Implementation Report

Date: 25 October 2026 · Scope: the GAMYAA corporate homepage (`/`) and its footer only. **Nothing committed, pushed or deployed.**

## Confirmations

- **No separate UFlight page was created.** There is no `/uflight` or `/division/uflight`, and the sitemap is unchanged.
- **The CTA links directly to `https://www.uflight.in/`**, opening in a new tab with `rel="noopener noreferrer"`.
- **No unsupported ownership or subsidiary claim was introduced.** The words "subsidiary", "owned", "a Gamyaa company" and "legally" are not used, and UFlight is not added to the Organization structured data.
- **Division 03 spans the full width on tablet, laptop and desktop (≥ 768 px).** Its left edge equals Division 01's left edge and its right edge equals Division 02's right edge, measured at every width.
- **On mobile the cards stack correctly:** 01 → 02 → 03, all full width.
- **Nothing was committed, pushed or deployed.**

## 1. Files changed

| File | Change |
|---|---|
| `src/app/(gamyaa)/page.tsx` | Division 03 card, `UFlightGlyph` SVG, `division` param on cards 01/02, hero sentence, meta description |
| `src/components/site/footer.tsx` | GAMYAA footer: UFlight™ ↗ under Businesses; optional ↗ marker on external items (UFlight™, EV Society™, EV.ENGINEER™). AeroSystems footer unchanged. |
| `src/lib/analytics.ts` | `division_card_click` event; `division` parameter allow-listed to `aerosystems` / `ventures` / `uflight` |
| `src/lib/site.ts` | `EXTERNAL.uflight = "https://www.uflight.in/"` |

## 2. Exact homepage content added

- Label: `03` · `DIVISION`
- Name: **UFlight™**
- Descriptor: **Aircraft Health & Usage Monitoring Systems**
- Description: "Health and usage intelligence for aircraft and advanced flight systems — connecting condition monitoring, anomaly detection and predictive maintenance."
- Tags: HUMS · Aircraft Health · Condition Monitoring · Predictive Maintenance · Flight Systems
- CTA: **Explore UFlight™ ↗**, with screen-reader text "(opens the UFlight website in a new tab)"
- Second CTA (added on request): **Cybersecurity & Digital Twin ↗**, linking to `https://cybersecurity.uflight.in/`. Because a link cannot contain another link, the card is a container: "Explore UFlight™" stretches over the whole card, so the whole card is still clickable, and the second CTA sits above it with its own target. Keyboard focus on the primary link rings the whole card; focus on the second link rings only that link.
- No numerical claims and no content copied from uflight.in.

## 3. Desktop layout (≥ 1024 px)

Row 1 is unchanged: Division 01 and Division 02 as two equal cards. Row 2 is Division 03 as one card spanning the grid. Inside it:

- **Left 7/12:** name, descriptor, description (two lines at 1440), tags, CTA.
- **Right 5/12:** an original line-art HUMS visual, capped at 28 rem and aligned right. It shows sensors on an aircraft (top view) feeding one signal, an anomaly flagged in the raw trace, then condition monitoring → health intelligence → maintenance decision as Evidence Line nodes, with the last node filled.

The card uses the same `card ticks` frame, corner ticks, type scale, padding, hover border and focus ring as Divisions 01 and 02.

## 4. Tablet layout (768–1023 px)

The same two-row structure. Division 03 is full width, with text left and the visual right; the visual is about 240–340 px wide, so it stays secondary.

## 5. Mobile layout (< 768 px)

Cards stack 01 → 02 → 03, all full width. Division 03 uses the other cards' order: label row, then the visual (small, max 17 rem), then the text. Typography is not reduced. The CTA is 44 px tall. There is no horizontal scroll at 360, 390 or 430 px.

## 6. CTA destination

`https://www.uflight.in/`, an external link opening in a new tab with `noopener noreferrer`. It was verified to return 200. UFlight itself was not modified.

Second CTA: `https://cybersecurity.uflight.in/` (verified to resolve; it redirects to `/aerospace` on that site), with the same new-tab and `noopener noreferrer` attributes. It fires `division_card_click` (`division: uflight`, `cta_label: Cybersecurity & Digital Twin`), plus an automatic domain-only outbound click.

## 7. Footer / navigation change

The GAMYAA footer's **Businesses** column now reads: Gamyaa AeroSystems, Gamyaa Ventures, **UFlight™ ↗**.

The label was kept because:

- the homepage's own heading for the division cards is "GAMYAA businesses";
- the brief's hierarchy places Division 03 under it;
- the footer entry adds no ownership wording.

If a legally narrower label is preferred later, rename the column or move the entry. It is one line in `footer.tsx`.

The ↗ marker was added to EV Society™ and EV.ENGINEER™ too, so all three outbound links match. The header navigation is unchanged.

## 8. Analytics event

`division_card_click` with allow-listed `division` ∈ {`aerosystems`, `ventures`, `uflight`}.

- **Divisions 01/02:** keep their existing `view_aerosystems` / `view_ventures` events. The same click now also fires `division_card_click`, using the site's existing `data-ga-also` mechanism, with no new architecture.
- **Division 03:** fires `division_card_click` (`division: uflight`, `cta_label`). The existing listener adds `outbound_click` with the domain only (`uflight.in`).
- **Not sent:** the full URL, `destination` for UFlight, user data or free text.
- **Verified on the production build:** no parameter contains a URL, email or long number. Consent gating is unchanged, and GA was blocked during testing.

## 9. SEO changes

- **Title:** unchanged ("GAMYAA | Aerospace, Defence, Space & Deep Tech"). UFlight is not the primary topic.
- **Meta description:** added "aircraft health monitoring". It now reads: "GAMYAA builds and supports engineering technologies across aerospace, defence, space, aircraft health monitoring, manufacturing intelligence and deep tech."
- **Hero supporting sentence:** minimal edit adding "flight systems". It now reads "…for aerospace, defence, space, flight systems and advanced manufacturing." UFlight is not named in the hero.
- No content that competes with uflight.in.

## 10. Structured-data decision

The Organization and WebSite JSON-LD are **unchanged**. UFlight is not added as `subOrganization`, `parentOrganization`, `sameAs` or anything else, because no legal relationship is established in the repository. The visible external link is the only connection (verified: no "UFlight" in any JSON-LD on `/`).

## 11. Accessibility checks

- Keyboard: the card is a single focusable link with a visible 2 px focus outline (measured).
- The external link is semantic `<a>`, and the screen-reader text states that it opens the UFlight website in a new tab.
- The HUMS visual is `aria-hidden`.
- No information is conveyed by colour alone. Text uses the site's tokens (≥ 5:1 in dark, unchanged light theme).
- Heading structure is unchanged and has no skipped levels: H1 GAMYAA → H2 "GAMYAA businesses" (visually hidden) → H2 EV Society™ Initiatives. Card titles keep the same non-heading markup as Divisions 01/02.
- The card is fully rendered without JavaScript.

## 12. Browser / viewport QA

Production build, widths 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 (and 1920 for screenshots):

| Engine | Themes | Overflow | Division 03 | Content overflow | Page errors |
|---|---|---|---|---|---|
| Chromium | dark + light | 0 at all widths | full-width row from 768; stacked below | none | none |
| Firefox | dark | 0 | same | none | none |
| WebKit (Safari engine) | dark | 0 | same | none | none |

**Physical iPhone/Android testing was not available** and was not performed.

## 13. Test / build results

- TypeScript: 0 errors.
- ESLint: 0 problems.
- `next build`: 52/52 static pages.
- **Tests:** the repository has no test suite (`package.json` has no `test` script), so none were run. The checks above were run with Playwright instead.
- Links: `/`, `/ventures`, `/aerosystems`, `/contact`, `/privacy`, `/terms` and `https://www.uflight.in/` all return 200.

## 14. Screenshots reviewed

These are temporary scratchpad files; copy them if they need to be kept. All are in:

`/private/tmp/claude-502/-Users-ananth-Developer-gamyaa/a748784d-b0d1-4f73-bb39-eac9c47390e7/scratchpad/qa/uflight/`

- `dark-{360,390,430,768,1024,1280,1440,1920}.png`: divisions section in the dark theme
- `light-390.png` and `light-1440.png`: light theme
- `footer-1440.png` and `footer-390.png`: GAMYAA footer

## 15. Known limitations

- The "Businesses" footer label is a judgement call (see §7).
- The visual is an original, simplified HUMS concept, not a depiction of any specific UFlight product.
- No physical-device testing.
- The `division` parameter is also attached to the existing `view_aerosystems` / `view_ventures` events. This is harmless, and it is how the shared click fires both events.

## 16. Git status

The four files above are modified (122 insertions, 8 deletions), and this report is new. Nothing is staged or committed. The working tree still contains the uncommitted AeroSystems Premium Experience V2 changes from earlier in this session.
