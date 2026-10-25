# AEAIP, DAQIP & AirCert — Minimal Cleanup Report

Date: 25 October 2026 · **Nothing committed, pushed or deployed.** No redesign, no new pages, no new capabilities.

## Summary

- **AEAIP™:**
  - sharper Chapter 01 question;
  - stage selector reduced to labels, with one explanation at a time;
  - five core findings, with "View all" for the rest;
  - one Chapter 05 explanation instead of two;
  - grouped knowledge index;
  - one compact, clearly illustrative "PCB Rev C → Rev D" change example.
- **DAQIP™:** the eleven capabilities are grouped into four families (a native one-at-a-time accordion with status kept visible), and an "Engineering outcomes" section was added with no figures.
- **AirCert AI™:** one planned-status statement instead of a "Planned" badge on every row; the areas open one at a time; the CTA is now certification-specific.
- **Not changed, deliberately:** footer credit (see Footer Changes) and Bangalore/Bengaluru (not mixed; see Footer Changes).

## AEAIP Changes

1. **Core question (Ch. 01):** "Can we prove that this exact product configuration is ready?", plus the line "Know whether the exact product configuration is ready — and prove why." once, under the convergence diagram.
2. **Stage repetition (Ch. 02):** the selector already showed one explanation at a time: horizontal on desktop, vertical on phones, arrow-key navigation, never hover-only. It now shows **labels only**; the per-stage notes repeated what the open explanation says. All five explanations remain in the HTML.
3. **Assurance Intelligence Engine (Ch. 03):** five core findings by default:
   - Verification coverage
   - Missing evidence
   - Stale evidence
   - Configuration mismatches
   - Readiness blockers

   **"View all assurance findings (14)"** expands the rest. It uses a native `<details>`, so the expanded state is announced, it works by keyboard and touch, and the content stays crawlable. "Review-gate readiness" was renamed "Readiness blockers" (same concept, the brief's wording); the full list on the Evidence Graph page shows the same names.
4. **Duplicate architecture text (Ch. 05):** replaced with the single explanation:

   > AEAIP™ is the umbrella. DAQIP™ provides manufacturing assurance and AirCert AI™ provides certification assurance within it. Software, cybersecurity, simulation, test and telemetry evidence feed the same Engineering Evidence Graph.

   The diagram's hidden caption, which said the same thing, is omitted on this page so screen readers don't hear it twice. The Products page keeps its caption.
5. **Knowledge index:** four groups, two balanced columns from 768 px, stacked on phones. Plain link rows, not cards. All 10 routes kept.
   - **Core Assurance:** Evidence Graph, Configuration, Continuous
   - **Verification & Readiness:** V&V, Review Gates, Satellites & Spacecraft
   - **Cross-Cutting:** Cybersecurity, Operational Evidence
   - **Reference:** Standards, Glossary
6. **Change-impact example (inside Ch. 02, no new section):** "PCB Rev C → Rev D". Labelled "Illustrative configuration-change scenario · fictitious figures":
   - 12 requirements potentially affected
   - 4 test reports potentially stale
   - 2 engineering reviews required
   - 1 TRR blocker

   The blocker is shown in red and also named in text.

## DAQIP Changes

1. **Capabilities in four families:** native accordion via `<details name>`, one open at a time, first family open by default.
   - **Drawing & FAI:** Drawing Intelligence, First Article Inspection Intelligence
   - **Inspection & Manufacturing:** Inspection Intelligence, Manufacturing Quality
   - **Supplier / NCR:** Supplier Quality, Nonconformance Intelligence
   - **Evidence / Configuration / Security:** Quality Evidence Graph, Configuration Intelligence, AI Assurance, Cybersecurity, Executive Quality Intelligence

   All 11 capabilities and their bullets are kept. Each capability shows its own status badge. Closed family rows also show the family's statuses (In Development / Planned), on phones too, so status is never hidden.
2. **FAI prototype:** unchanged and still the first section after the hero. Balloons are 24 px on phones and 26 px on desktop, and tap selection works (verified with touch emulation).
3. **"Engineering outcomes"** (above the FAQ):
   - **Reduce:** FAI preparation effort · Manual traceability · Missing inspection evidence · Configuration mistakes · NCR closure delays
   - **Improve:** Characteristic accountability · Evidence completeness · Supplier-quality visibility · Audit and review readiness

   Introduced as "Intended outcomes, not measured customer results". No percentages, savings or ROI.
4. **Unchanged:** hero, status, AS9102 disclaimer, "Quality approves" wording and CTAs.

## AirCert Changes

1. **Planned status:** the section lede now reads "The capabilities below describe the planned AirCert AI engineering architecture and workflow direction." One Planned badge sits beside it. The repeated "Planned" badge on each of the seven rows was removed.
2. **Seven areas:** collapsed by default and now one open at a time (`<details name>`). All details are still accessible and in the HTML.
3. **Compliance matrix:** already stacks each requirement into a labelled card below 1024 px. All eight fields are kept: Requirement, Source · Rev · Clause, Means of compliance, Owner, Evidence, Verification, Approval, Authority comments. Unchanged.
4. **Evidence readiness:** already uses evidence-state language (requirements mapped, means of compliance assigned, evidence available, approved internally, open authority comments) and states that readiness is never a percentage of certification. Unchanged.
5. **CTA:** the secondary button is now **"Discuss a Certification Assurance Problem"**. It opens the contact page with the "engineering assurance problem" option selected rather than the quality-problem option. The primary button "Register interest in AirCert AI" is unchanged. The change is in the shared CTA pair, so the two certification solution pages (Airworthiness Certification, Certification Evidence) use the same wording; DAQIP pages keep "Discuss an Aerospace Quality Problem".
6. **Small consistency fix:** any button whose label wraps on a phone now keeps its text centred and evenly split (`.btn`: `text-align: center; text-wrap: balance`). Single-line buttons are unchanged.

## Footer Changes

- **Design credit:** not changed. The brief asks for "Designed by Sudarshana Karkala, EV.ENGINEER™". In the previous task you chose to keep **"Powered by EV.ENGINEER™, Bangalore, India"**, which is already identical on every AeroSystems page. To switch, it is one shared component (`PoweredBy` in `src/components/site/footer.tsx`).
- **Location wording:** the site uses "Bangalore" consistently (14 occurrences, 0 "Bengaluru"). The brief asks for a standard only where the two are mixed, so nothing was changed.

## Mobile QA

Chromium at 360, 390 and 430; WebKit (iOS emulation, touch) at 390; Firefox at 390.

- 0 horizontal overflow, 0 tap targets under 24 px, 0 console errors.
- Touch taps work on the stage selector, findings toggle, both accordions and FAI balloons.
- The knowledge groups stack, and the change example fits as a 2 × 2 grid.

## Tablet QA

768 (Chromium) and 1024 (Chromium):

- 0 overflow.
- Knowledge index in two columns from 768.
- The compliance matrix stays stacked below 1024 and is a table from 1024.

## Desktop QA

1366 and 1440 (and 1280 and 1920 in the first pass), both themes:

- 0 overflow.
- Stage selector horizontal; change example in one row of four with numbers aligned.
- DAQIP families show concise rows with statuses.

## Accessibility

- All new disclosures are native `<details>`/`<summary>`: real buttons with announced expanded state, keyboard (Enter/Space) and touch, never hover-only.
- The stage selector keeps arrow-key navigation and `aria-pressed`.
- Focus rings are unchanged. Status is always written in text, never shown by colour alone (the red "1" is labelled "TRR blocker").
- The change example is a definition list, and its arrow is spoken as "to".
- Reduced motion is unchanged.

## Performance

No dependencies, images, animation or new JavaScript. The accordions and the findings toggle are native HTML. 52/52 pages are still statically prerendered.

## SEO

- Titles, descriptions, canonicals, structured data, internal links, references and routes are unchanged.
- All collapsed content (findings, capabilities, AirCert details) is still in the server HTML.
- The new Chapter 01 question appears only on-page, not in metadata.

## Tests

- TypeScript: 0 errors.
- ESLint: 0 problems.
- `next build`: 52/52 pages.
- The repository has no unit-test suite.
- **Route and console crawl, final build:** 7 routes × 7 widths × 2 themes, plus a first pass of 6 routes × 12 widths × 2 themes. Both found 0 overflow, 0 console errors and 0 broken links or anchors.
- **Interaction checks:** **34/34 pass in Chromium, WebKit and Firefox** (17 checks at 390 and 1440). They cover:
  - the Ch. 01 question;
  - stage tap (one explanation shown) and arrow keys;
  - labels-only selector;
  - findings 5 → 14;
  - the change example fitting;
  - the four knowledge groups, stacked or in two columns;
  - the single Ch. 05 explanation;
  - DAQIP's four families, one at a time, all 11 capabilities, statuses visible when closed;
  - the outcomes section with no numbers;
  - FAI balloon tap;
  - the FAI prototype staying near the top;
  - AirCert's seven areas, one at a time, the single status line, matrix stacking and the CTA wording and link.

## Screenshots Reviewed

These are temporary scratchpad files; copy them if they need to be kept. All are in:

`/private/tmp/claude-502/-Users-ananth-Developer-gamyaa/a748784d-b0d1-4f73-bb39-eac9c47390e7/scratchpad/qa/cleanup/`

- **Changed sections:** `{dark,light}-{390,1440}_aerosystems_{aeaip,daqip,aircert-ai}-N.png`
- **Full pages:** `full-{390x844,768x1024,1366x768,1440x900}_aerosystems_{aeaip,daqip,aircert-ai}.jpg`
- **CTA after the wrap fix:** `recheck-cta-390.png`

Two issues were found by inspection and fixed:

1. The change-example numbers were misaligned when labels wrapped differently.
2. The wrapped AirCert CTA label was left-aligned.

## Physical Devices Not Tested

- Physical iPhone not tested (WebKit emulation with touch only).
- Physical Android device not tested (Chromium emulation only).
- Physical tablet not tested.

## Files Changed

| File | Change |
|---|---|
| `src/app/aerosystems/aeaip/page.tsx` | Question line, labels-only selector, change example, findings toggle, Ch. 05 text, grouped knowledge index |
| `src/content/aeaip.ts` | Sharper question; core findings first ("Readiness blockers"), `ENGINE_CORE_FINDINGS` |
| `src/components/aeaip/learn.tsx` | `KnowledgeGroups`; `KnowledgeIndex` gains `columns` and `h4` |
| `src/components/system/platforms.tsx` | `ArchitectureDiagram` optional hidden caption |
| `src/app/aerosystems/daqip/page.tsx` | Four capability families; Engineering outcomes |
| `src/app/aerosystems/aircert-ai/page.tsx` | Planned statement and single badge; one-at-a-time areas |
| `src/components/sections/shared.tsx` | Certification-specific secondary CTA for AirCert |
| `src/app/globals.css` | Wrapped button labels centred and balanced |

## Git Status

Uncommitted: the eight files above, plus this report (new). Nothing staged.
