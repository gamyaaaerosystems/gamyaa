# Minimal UI Polish + Login CTA — Report

Date: 25 October 2026 · **Nothing committed, pushed or deployed.** No redesign; only the changes listed below.

## Summary

- A **Login** link to `https://login.gamyaa.in/` now appears in the headers of both sites in this repository: the GAMYAA corporate site (`gamyaa.in`) and Gamyaa AeroSystems (`/aerosystems`). On phones and portrait tablets it appears in the menu.
- **About `aerospace.gamyaa.in`:** that domain is a separate Next.js project on Vercel (the "Aerospace Learning Platform"), and its source is not in this workspace. As agreed during the task, Login was added to this repository's headers instead. Adding it to aerospace.gamyaa.in itself still needs to happen in that project.
- Two small fixes from the audit:
  - The gamyaa.in header was too wide at tablet sizes once Login was added. It now collapses to the menu below 1024 px instead of cramming.
  - On the DAQIP™ and AirCert AI™ pages, a stray arrow before a colon in "Part of AEAIP™ →: …" was removed.
- One content fix: the Terms page now names AEAIP™ alongside DAQIP™ and AirCert AI™.

## Login CTA

- **Desktop location:**
  - **gamyaa.in (≥ 1024 px):** AeroSystems · Ventures · Contact → **Login** → theme switch.
  - **AeroSystems (≥ 1280 px):** … Careers · Contact → **Login** → theme switch.
  - Login is an outlined button one step quieter than Contact (lighter border, secondary text colour), with the same 40 px height as the other header controls.
- **Mobile / tablet location:** in the menu, as a full-width 48 px button in the bottom area above the theme switch. It is not inside a submenu.
  - gamyaa.in uses the menu below 1024 px; AeroSystems below 1280 px (unchanged).
  - Portrait tablets (768, 820) therefore use the menu. A 1024 px-wide tablet sees the header link on gamyaa.in and the menu on AeroSystems.
- **Destination:** `https://login.gamyaa.in/`, a plain link in the same tab with the accessible name "Login to GAMYAA".
  - No authentication logic, form, token handling or credential storage on this site.
  - No Sign Up / Register links.
- **Analytics:**
  - The new `login_click` event carries one allow-listed parameter, `source` ∈ {`desktop_header`, `mobile_menu`}.
  - The existing listener adds `outbound_click` with the domain only (`login.gamyaa.in`).
  - Not sent: identity, query parameters, email or authentication state. Consent gating is unchanged.
  - A separate `tablet_header` value was not needed, because every tablet below the header breakpoint uses the menu.

## UFlight Verification

Division 03 on the gamyaa.in homepage is correct and unchanged in this task:

- label "03 · DIVISION", **UFlight™**, "Aircraft Health & Usage Monitoring Systems";
- **Explore UFlight™ ↗** → `https://www.uflight.in/`, plus the requested second link **Cybersecurity & Digital Twin ↗** → `https://cybersecurity.uflight.in/`;
- a full-width card from 768 px, stacked on phones.

## UI Issues Found

1. With Login added, the gamyaa.in header overflowed by 106 px at 640 px and squeezed the logo-to-nav gap to 16 px at 768 px.
2. On DAQIP™ and AirCert AI™, the inline "AEAIP™" link's built-in arrow sat before a colon, reading "AEAIP™ →: the …".
3. No other obvious problems:
   - no horizontal scroll, clipped text, overlapping elements or broken menus;
   - no inconsistent badges or outdated platform numbers.

   See Responsive QA below.

## UI Issues Fixed

1. **gamyaa.in header:** the inline navigation (now including Login) shows from 1024 px. Below that, the existing menu is used, and it already contains Login. This follows the brief's "do not create a cramped navigation bar".
2. **DAQIP™ / AirCert AI™:** "AEAIP™" in that sentence is now a plain underlined inline link, with the same destination and the same `aeaip_explore` tracking.

## Content Inconsistencies Fixed

- **Terms page:** the "No certification or approval" and "Intellectual property" clauses named only DAQIP™ and AirCert AI™, a leftover from the two-platform era. Both now read "AEAIP™, DAQIP™ and AirCert AI™". No other legal wording changed. **A legal read is recommended.**
- **Verified consistent, no change needed:**
  - Platform 01 AEAIP™ (Aerospace Engineering Assurance Intelligence Platform, Research & Architecture);
  - Platform 02 DAQIP™ (Defence Aerospace Quality Intelligence Platform, Manufacturing Assurance Intelligence);
  - Platform 03 AirCert AI™ (Airworthiness Certification Engineering Copilot, Certification Assurance Intelligence).
- No "two platforms" wording and no manufacturing-only company description remain.

## Footer Consistency

The brief asked for "Designed by Sudarshana Karkala, EV.ENGINEER™". As confirmed during this task, the footers keep the wording set most recently: **"Powered by EV.ENGINEER™, Bangalore, India"** (EV.ENGINEER™ → `https://ev.engineer`).

- It is the same on every AeroSystems page and every gamyaa.in page, through one shared component.
- GAMYAA copyright is preserved.
- The AEAIP Learn and Strategy pages carry their own small credit, "Designed by EV.ENGINEER™". It was left as is.

## Responsive QA

The production build (`next start`) was crawled across 34 routes. That covers every gamyaa.in and AeroSystems route, including all AEAIP, solution and company pages. Each crawl checked:

- horizontal overflow;
- console and page errors;
- broken internal links and anchors;
- headings and structured data;
- tap targets under 24 px (at 390 px).

A dedicated Login test also ran in every engine. Results are below.

### iOS / WebKit

**Widths:** 375, 390, 430, plus tablets 768, 820, 1024, 1366, dark theme.

- 0 horizontal overflow, 0 small tap targets, 0 broken links or anchors.
- **Login test:** passes in the header and in the menu, mobile touch emulation included.
  - 18/18 checks pass.
  - The menu Login is 48 px tall and full width.
  - Esc closes the menu.
- The crawl logged 100 console messages. All are cancelled page prefetches ("Fetch API cannot load … due to access control checks"), caused by the local test proxy on `http://localhost`. It cannot occur on the https site; the same artifact was seen in earlier QA.

### Android / Chromium

**Widths:** 360, 375, 384, 390, 412, 430, both themes.

- 0 overflow, 0 console errors, 0 small tap targets.
- Login is in the menu at every width, 48 px tall, with `source: mobile_menu`.

### Tablet

768 × 1024, 820 × 1180 and 1024 × 1366 (Chromium, both themes; WebKit dark):

- 0 overflow.
- Portrait tablets use the menu, with Login inside it, on both sites.
- At 1024 px the gamyaa.in header shows the inline nav with Login. AeroSystems keeps the menu until 1280 px (unchanged).
- UFlight Division 03 is full width from 768 px. The AEAIP platform hierarchy and diagrams render without clipping.

### Desktop / Laptop

1280 × 720, 1366 × 768, 1440 × 900, 1512 × 982 and 1920 × 1080, both themes:

- 0 overflow; the header fits on one line at every width.
- **AeroSystems header:** Login sits between Contact and the theme switch, 26 px clear of the logo at 1280.
- **gamyaa.in header:** Login sits after Contact, before the theme switch.

**Engine totals:**

| Engine | Routes | Overflow | Console errors | Broken links / anchors | SEO issues |
|---|---|---|---|---|---|
| Chromium | 34 × 14 widths × 2 themes | 0 | 0 | 0 / 0 (45 links, 24 anchors) | none |
| WebKit | 34 × 7 widths | 0 | 100 (localhost prefetch artifact only) | 0 / 0 | — |
| Firefox | 34 × 3 widths | 0 | 0 without the proxy (13 pages incl. demo); 34 U+FFFD artifacts under the header-rewriting proxy | 0 / 0 | — |

## Accessibility

- Login is a real link and keyboard-reachable, with a visible focus ring (verified in Chromium, WebKit and Firefox).
- Its accessible name "Login to GAMYAA" contains the visible text "Login".
- The menu is still a native `<dialog>`: focus is trapped, Esc closes it, and focus returns to the trigger.
- Touch targets: the header Login is 40 px tall (same as the other header controls); the menu Login is 48 px.
- Contrast uses existing tokens. Reduced-motion and status labels are unchanged.

## Performance

No new dependencies, images, scripts or animation. Login is a single anchor element. The static output is unchanged (52 prerendered pages).

## SEO

Titles, descriptions, canonical URLs, sitemap, robots and structured data are unchanged. The Terms text change adds a product name only.

## Tests

- TypeScript: 0 errors.
- ESLint: 0 problems.
- `next build`: 52/52 static pages.
- The repository has no test suite, so Playwright scripts were used instead (crawl, Login test, screenshots).
- **External links**, all returning 200:
  - `login.gamyaa.in`, `www.uflight.in`, `cybersecurity.uflight.in`;
  - the Sudarshana profile, EV Society, EV.ENGINEER, iTelematics, the APEX site and partnership page;
  - Aerospace Cybersecurity, Space Research, Internships, LinkedIn.
- **Internal:** `/`, `/aerosystems`, AEAIP, DAQIP, AirCert, About and both contact pages return 200.

## Physical Devices Not Tested

- **Physical iPhone not tested.** WebKit emulation only.
- **Physical Android device not tested.** Chromium emulation only.
- **Physical tablets not tested.**

## Files Changed

| File | Change |
|---|---|
| `src/components/site/login-link.tsx` | New: Login link (header and menu variants, `login_click`) |
| `src/components/site/header.tsx` | Login in both desktop headers; gamyaa.in inline nav from `lg` |
| `src/components/site/mobile-menu.tsx` | Login button in the menu's bottom area |
| `src/lib/analytics.ts` | `login_click` event; `source` parameter allow-list |
| `src/lib/site.ts` | `EXTERNAL.login` |
| `src/app/aerosystems/daqip/page.tsx`, `src/app/aerosystems/aircert-ai/page.tsx` | Inline AEAIP™ link without the stray arrow |
| `src/app/(gamyaa)/terms/page.tsx` | AEAIP™ added to two clauses |

## Git Status

Nothing from this task is staged or committed. `main` is level with `origin/main` at `4c26467` ("updated footer"); the earlier V2, UFlight and footer work was already committed and pushed.

Uncommitted changes from this task:

- **Modified:** `src/app/(gamyaa)/terms/page.tsx`, `src/app/aerosystems/aircert-ai/page.tsx`, `src/app/aerosystems/daqip/page.tsx`, `src/components/site/header.tsx`, `src/components/site/mobile-menu.tsx`, `src/lib/analytics.ts`, `src/lib/site.ts`
- **New:** `src/components/site/login-link.tsx`, `docs/MINIMAL_UI_LOGIN_UPDATE_REPORT.md`
