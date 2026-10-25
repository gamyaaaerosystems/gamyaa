# GAMYAA AeroSystems — Premium Experience V2 Report

Date: 25 October 2026 · Base commit: `a245158` · **Nothing committed, pushed or deployed.**

## Executive Summary

The whole `/aerosystems` tree was redesigned around one idea: **Engineering Assurance Intelligence**, carried visually by the **Evidence Line** (a hairline with nodes, read left to right, filled at the decision point). AEAIP™ is the flagship (Platform 01); DAQIP™ (Platform 02, Manufacturing Assurance Intelligence) and AirCert AI™ (Platform 03, Certification Assurance Intelligence) are shown as specializations inside it on every page that mentions them.

What changed, in short:

- A reusable component library in `src/components/system/` replaces one-off diagrams (Evidence Line, interactive line, evidence-graph explorer, review-gate navigator, validity sequence, evidence-trace drawer, spacecraft explorer, glossary browser, solution template and more).
- First-level pages say less. Long lists became `<details>` rows, which stay in the HTML for search engines and no-JS readers. The repetitions of the AEAIP chain on the homepage were merged into one interactive "How AEAIP thinks" block.
- Company pages (About, Research, Services, Careers, Internships, Contact) were rewritten for the AEAIP-led identity. Truthful maturity stages replace the dated timeline, and the reused LinkedIn link was removed.
- The dark theme moved from neutral near-black to a **blue-black "midnight" palette** (user request), with all muted text ≥ 5:1 contrast.
- QA: typecheck, lint and production build clean. No horizontal overflow at 8 widths × 2 themes. 24/24 interaction checks pass. No PII in analytics. Lighthouse Accessibility, Best Practices and SEO are 100 on all tested pages.

**Hero wording.** The V2 brief requires the hero H1 to read "Engineering Assurance Intelligence" and says not to shorten it to "Engineering Intelligence". This reverses the earlier one-line tweak requested during V1. The brief was followed, and the H1 now wraps to two lines on desktop.

## Routes Reviewed

All 32 AeroSystems routes plus the two parent routes they share components with:

| Area | Routes |
|---|---|
| Company home | `/aerosystems` |
| AEAIP™ | `/aerosystems/aeaip`, `/demo`, `/engineering-evidence-graph`, `/verification-validation`, `/review-gates`, `/configuration-assurance`, `/cybersecurity-assurance`, `/continuous-assurance`, `/operational-evidence`, `/satellites-spacecraft`, `/standards-frameworks`, `/glossary`, `/strategy` |
| Products | `/aerosystems/products`, `/daqip`, `/aircert-ai` |
| Solutions | `/aerosystems/solutions` and 8 detail pages: drawing-intelligence, first-article-inspection, inspection-intelligence, manufacturing-quality, supplier-quality, airworthiness-certification, certification-evidence, engineering-assurance |
| Company | `/aerosystems/research`, `/services`, `/about`, `/careers`, `/internships`, `/contact` |
| Parent (shared components) | `/`, `/contact` |

## Strategic Consistency Fixes

- Platform numbering and roles everywhere: AEAIP™ Platform 01 · Engineering Assurance Intelligence; DAQIP™ Platform 02 · Manufacturing Assurance Intelligence; AirCert AI™ Platform 03 · Certification Assurance Intelligence. AirCert was previously labelled Platform 02 in places.
- DAQIP and AirCert pages each state they are "Part of AEAIP™" and show their own Evidence Line (DAQIP: Drawing → Characteristic → Inspection Method → Measurement → Evidence → Approval; AirCert: Requirement → Certification Basis → Means of Compliance → Verification → Evidence → Authority Review).
- Authority wording kept distinct. Company level: "AI assists. Engineers verify. Authorized authorities approve." DAQIP keeps its own "Quality approves" and explains why.
- Research no longer says areas "feed DAQIP/AirCert". It is grouped as Assurance Core / Specialized Assurance / Cross-Cutting Research.
- Statuses are taken from one source (`content/status.ts`, `AEAIP_CAPABILITIES`). The Engineering Assurance solution now matches AEAIP (Research & Architecture). Previously it said "Research".
- Claim audit: no "NASA-grade", "flight proven", "certified", "compliant", "world's first", "guaranteed readiness" or financial projections. AS9102/AS9100 notices state that DAQIP does not by itself make an organisation compliant.

## Navigation Changes

- AEAIP™ is the first global navigation item. "Partners & Ecosystem" points to `/about#partners`.
- The AEAIP section has its own local nav (Overview, How it works, Learn ▾, Demo, Strategy). The Learn panel closes on Esc, on an outside click and on route change.
- The mobile menu has an "AEAIP™ Learn" group.
- Footer: brand, "Engineering Assurance Intelligence · Defence · Aerospace · Space", Platforms, concise AEAIP Learn links, Solutions, Engineering Initiatives (Aerospace Cybersecurity, **Space Research → aerospace.ishavasyam.org/space** (user request), Internships), Company. The design credit is on every AeroSystems page. **Partners & Ecosystem was removed from the footer** (user request); partners remain on About.

## Homepage Redesign

Hero: "Engineering Assurance Intelligence" with a server-rendered readiness-trace aside (Requirement → Configuration → Evidence → Verification → Readiness). Below it:

- The flagship AEAIP block: promise lines and the interactive "How AEAIP thinks" line.
- Specialized platforms: an AEAIP root node whose connector legs land exactly on each card's centre (measured: 0 px offset at 1440 and 1920). On phones it becomes a root node with a rail ending at the last card.
- An audience block: "For the people accountable for readiness", with each role's question.
- Honest status, trust principles and one CTA band.
- The parent home's AeroSystems division illustration was redrawn as aerospace line art (Earth limb, ground station, ascent trajectory with evidence nodes, satellite with solar arrays), replacing a glyph that read as a vehicle.

## AEAIP Overview Redesign

The overview is built as chapters: the question → how it works (core model with detail on demand) → intelligence → the decision → architecture (AEAIP with DAQIP/AirCert, plus cross-cutting software, cybersecurity, simulation, test and telemetry) → initial focus (satellites and spacecraft) → Learn index → CTA.

## Demo Redesign

A three-column console (≥ 64rem): **1 Gate** (radio rail with Held/Now/Forecast) → **2 Readiness** (verdict and six metrics that filter the list) → **3 Subsystem**. The 3D view loads only on wide screens or on request ("Show the 3D spacecraft view") → **4 Open items** → **5 Evidence trace** (native modal `<dialog>`, bottom sheet on phones, right drawer on desktop, focus returns on close) → **6 Evidence validity sequence** (Verified → Configuration changed → Evidence at risk → Reverification required → Current again, with Previous/Next/Play). The rules and a full text version are server-rendered inside `<details>`.

## Evidence Graph Redesign

The explorer is radial from lg and a list below lg. Choosing a node shows its role and evidence. "Change configuration: OBC board Rev D → Rev E" propagates the change with staggered transitions (instant with reduced motion). Tracked as `evidence_graph_node_open` (node type only).

## Review Gates Redesign

The 11-gate navigator sits in the hero: a phone strip with previous/next, arrow-key navigation, and a panel with Purpose, Key question, Typical evidence and AEAIP readiness view. All gate content is also in the article for crawlers.

## DAQIP Changes

The hero has the DAQIP Evidence Line aside, "Part of AEAIP™" and the commercial CTAs. The interactive FAI balloon prototype now comes first. Then: the definition, capability layers as compact `<details>` rows with status, AI assurance titled "AI assists. Engineers verify. Quality approves." with the AS9102/AS9100 notice, FAQ and CTA. The old explore grid, workflow section and parent band were removed.

## AirCert Changes

Now Platform 03 · Certification Assurance Intelligence, "Part of AEAIP™", with the AirCert journey line in the hero. The 12 capabilities were regrouped into **seven collapsed categories**: Requirements, Safety, Certification Basis, Planning, Engineering Documentation, Qualification / Acceptance, Evidence. The compliance matrix and readiness panel moved inside Evidence. One traceable-recommendation example remains. The page has about 35% fewer visible sections on first load.

## Solutions Changes

- The index is grouped instead of using eight identical cards: **Manufacturing Assurance** (DAQIP™: Drawing Intelligence, FAI, Inspection Intelligence, Manufacturing Quality, Supplier Quality), **Certification Assurance** (AirCert AI™: Airworthiness Certification, Certification Evidence) and **System Assurance** (AEAIP™: Engineering Assurance). Each group shows its platform, and each row shows its status.
- One template for all eight detail pages: Problem → Why it matters → Workflow (Evidence Line) → What GAMYAA intends to provide → Current status → Relevant platform → Illustrative example (fictitious) → Related → CTA. The FAI page uses the same template, adds the AS9102 section (`#as9102` kept) and the interactive balloon prototype as its example, and keeps its FAQ.
- **Engineering Assurance** is now the bridge into AEAIP. Its problem is fragmented evidence; its example is a design change (Rev D → Rev E) putting downstream evidence at risk; its workflow is Requirement → Configuration → Evidence → Verification → Readiness. It links to four concept pages, and the CTA is "Explore AEAIP™" plus the demo. The full architecture is not repeated.

## Research Changes

The page is now "Engineering Assurance Research", a lab portfolio. Each area has a code, a concrete research question, a maturity badge and a link:

- **Track A, Assurance Core:** A1 Evidence Graph (Architecture), A2 Verification Intelligence (Research), A3 Configuration Assurance (Research), A4 Review Readiness (Architecture).
- **Track B, Specialized Assurance:** B1 DAQIP (In Development), B2 AirCert (Research).
- **Track C, Cross-Cutting:** C1 Cybersecurity (Research), C2 Software (Concept), C3 Continuous (Concept), C4 Operational Evidence (Concept), C5 Predictive (Long-term Vision).

The 2025 workflow-validation findings are kept in a short "Where it started" section.

## Services Changes

Eight equal cards became **four families**: Engineering Assurance Advisory, Manufacturing / FAI Digitalisation, Certification & Evidence Engineering, Engineering Cybersecurity / Integration. Each family links to the platform it builds towards. The lede states: "Services help customers adopt GAMYAA platforms and assurance practices."

## About / Company Changes

- **Definition:** "Gamyaa AeroSystems develops Engineering Assurance Intelligence for critical Defence, Aerospace and Space systems."
- **Why we exist:** the problem we chose.
- **Mission:** "Transform fragmented requirements, configurations and engineering evidence into traceable, decision-ready assurance."
- **Principles:** Evidence over marketing claims, Human engineering authority, Configuration fidelity, Security, Status honesty.
- **What we are building:** three platforms with status; where we start; where we intend to go (links to the Strategy page).
- **Timeline:** shortened to five maturity stages on the Evidence Line: 2024 problem exploration; 2025 workflow validation / FAI research; 2026 DAQIP + AirCert concept + AEAIP R&A; Next: assurance validation; Future: continuous / operational / predictive. The old 2027–2030 annual promises were removed.
- **Leadership:** name, role, one sentence and LinkedIn. **Fix:** Manjunatha G was showing Sudarshana Karkala's LinkedIn URL as a placeholder. That link is now removed until Manjunatha's own URL is supplied. The one-sentence summaries were drafted from the role titles and **need confirmation by each person**.
- **Partners**, by category:
  - Engineering Partner: APEX Rocket Systems.
  - **Research & Development Partner: iTelematics** (user request). Description: "Research and development collaboration in engineering software and connected-systems technology." The domain is displayed as **iTelematics.com**.
  - Industry / Education Ecosystem: EV Society™.

## Careers / Contact Changes

- **Careers:** "Engineering Assurance Intelligence for Defence · Aerospace · Space"; seven grouped domains (Systems Engineering / V&V, Aerospace Quality, Certification, Software / Platform, AI / Data, Cybersecurity, Product Engineering).
- **Internships:** one paragraph, one CTA, one featured program.
- **Contact:** six intents: Discuss AEAIP™, Request a DAQIP™ Demo, Discuss AirCert AI™, Strategic Partnership, Investor / Strategic Conversation, Careers. Each fires `contact_intent_select` (predefined `intent` value only). The email workflow is unchanged; no new form. The warning is now prominent on both contact pages: "Do not email controlled technical data or proprietary engineering files until a secure method is agreed."

## Mobile UX

- One-column heroes; the Evidence Line turns vertical on phones.
- Review gates: one gate at a time with a strip and previous/next. The evidence graph shows a focused list below lg.
- Demo order on phones: Gate → Readiness → Subsystem → Issues → Evidence. The 3D view is loaded only on request.
- Dense tables became `<details>` rows or definition lists; horizontal scroll is only used inside `.gx-scroll-x` where genuinely needed.
- Touch targets: all interactive elements ≥ 24 px (WCAG 2.5.8), with primary controls at 44–48 px. Balloon labels were raised from 10 px to 11–12 px.
- Remaining 10 px text: the "AEROSYSTEMS" sub-label in the header and footer logo lockup. It was left as part of the brand mark; change it if you want it treated as text.

## Accessibility

- One H1 per page and no heading-level skips. Fixed: the review-gate and spacecraft explorer headings in the hero, and the navigator's sub-headings.
- The native `<dialog>` drawer has focus return. Radio groups support arrow keys. The interactive line uses `aria-pressed`, and live regions announce changes.
- Status never relies on colour alone (symbol plus text).
- Reduced motion collapses all animation (measured 1e-6 s).
- Dark-theme contrast: muted and subtle text ≥ 5.6:1 on every surface; light theme unchanged.

## SEO

- Every route keeps a unique title, a description (all ≤ 230 characters; long ones trimmed), a canonical URL and an OG image.
- Structured data validated as parseable on all routes: Organization, BreadcrumbList, TechArticle, FAQPage, SoftwareApplication, DefinedTermSet, Person/Service graphs.
- Collapsed content (`<details>`) and every interactive component's content is in the server HTML. Verified with JavaScript disabled for the demo, AirCert and glossary.
- Sitemap includes all solution routes.

## AI Search Discoverability

- Definitions open each page in plain sentences: the company definition, "What is DAQIP/AirCert AI?" and solution problems.
- The glossary renders every term as a `DefinedTermSet` with deep links.
- FAQs are in HTML and in FAQPage data.
- Platform relationships are stated in text, not only in diagrams ("Part of AEAIP™ …").

## Analytics

New events (V2): `evidence_line_step`, `evidence_graph_node_open`, `review_gate_select`, `contact_intent_select`. New allowed parameters: `line`, `step` ("01"–"13"), `node_type`, `intent` (enum mirroring contact INTERESTS), `source_location: solution_page`. A second event can be fired by the same click (`data-ga-also`).

Mapping to existing events:

- Contact AEAIP → `contact_sales_click` + `contact_intent_select`
- DAQIP/AirCert → `demo_interest` + `contact_intent_select`
- Careers → `career_cta_click` + `contact_intent_select`

The consent gate is unchanged, and GA was blocked during every automated test. The PII audit over all captured events found 0 violations: no emails, phone numbers, long digit runs or engineering IDs such as SAT-/ANM-/TR-EPS/OBC.

## Performance

Static prerendering on all 52 routes. The 3D model and demo JavaScript load only where used. Lighthouse results are below.

## Bugs Fixed

- Speciality connector legs were misaligned with the card centres (user-reported). They now share the cards' grid and gap.
- The chain text on platform cards started a line with an orphan "→" when wrapped. Arrows are now bound to the preceding step.
- Leadership LinkedIn URL reused for two people.
- Heading-level skips on Review Gates and Satellites & Spacecraft.
- Sub-24 px tap targets: "See status", glossary "Read more", inline "AEAIP™" links, services platform links.
- `IntegrationDiagram` duplicate "08 · Human" step: the component is removed, so the duplicate is gone.
- `<p>` inside `<legend>` (invalid HTML) in the demo.
- Local-nav and validity-sequence React lint errors (set-state-in-effect).

## Content Removed from First-Level Pages

- The repeated AEAIP chains on the homepage.
- DAQIP's explore grid, workflow section and parent band.
- AirCert's always-open twelve-area grid.
- The research "feeds into" framing.
- Eight equal service cards.
- The 2027–2030 annual timeline promises.
- The long partner descriptions.
- The Partners column in the footer.
- Unused components: `DemoPreview`, `PlatformHierarchy`, `CoreModel`, `EvidenceGraphFigure`, `ValidityFigure`, `ChangeImpactFigure`, `PtfFigure`, `GateRail`, `IntegrationDiagram`, `TimelineRail`, `EngineeringInitiatives`.

## Content Moved to Child Pages

- Detailed roadmap → AEAIP Strategy.
- Architecture detail → AEAIP overview "How it works".
- Concepts behind Engineering Assurance → AEAIP knowledge pages (linked from the solution).
- Full capability bullets → collapsed rows on DAQIP and AirCert.
- Business-model canvas detail, differentiation table and enterprise engagement → `<details>` on Strategy.

## Screenshot QA

Full-page screenshots of every primary route (27 routes) in the midnight dark theme, taken from the production build:

- Desktop 1440: `/private/tmp/claude-502/-Users-ananth-Developer-gamyaa/a748784d-b0d1-4f73-bb39-eac9c47390e7/scratchpad/qa/v2shots/1440/`
- Mobile 390: `/private/tmp/claude-502/-Users-ananth-Developer-gamyaa/a748784d-b0d1-4f73-bb39-eac9c47390e7/scratchpad/qa/v2shots/390/`

These are temporary scratchpad files. Copy them elsewhere if they need to be kept.

## Browser Testing

| Engine | Widths | Themes | Overflow | Broken links / anchors | Console |
|---|---|---|---|---|---|
| Chromium | 360, 375, 390, 430, 768, 1024, 1280, 1440 | dark + light | 0 | 0 / 0 (45 links, 24 anchors) | 0 errors |
| Firefox | 390, 768, 1280 | dark | 0 | 0 / 0 | 0 errors without the test proxy (10 pages incl. demo). Under the header-rewriting proxy Firefox reports U+FFFD script errors, which are a harness artifact also seen in V1. |
| WebKit | 390, 768, 1280 | dark | 0 | 0 / 0 | Only cancelled RSC prefetches caused by `upgrade-insecure-requests` on http://localhost (not reproducible over https) |

## Commands Executed

```bash
npx tsc --noEmit -p .
npx eslint .
npx next build
npx next start -p 3100
node qa.mjs chromium|firefox|webkit
node interact2.mjs
node ff.mjs
node fullshots.mjs 1440|390
npx lighthouse
```

`qa.mjs`, `interact2.mjs`, `ff.mjs` and `fullshots.mjs` are Playwright scripts in the scratchpad; `npx lighthouse` ran on 5 pages × 2 form factors. External links were checked with `curl`.

## Test Results

- TypeScript: 0 errors.
- ESLint: 0 problems.
- Build: 52/52 static pages.
- Interaction suite: **24/24 PASS**, covering:
  - the hero H1;
  - Evidence Line tracking;
  - the designer credit URL;
  - demo gate states (TRR / SAR / CDR);
  - the drawer: opens, Esc closes it, focus returns;
  - arrow keys on the gate rail;
  - validity reaching "Evidence at risk";
  - graph node and configuration-change tracking;
  - the gate navigator;
  - contact intents;
  - the controlled-data warning;
  - no page errors;
  - no-JS rendering (demo, AirCert, glossary);
  - reduced motion.
- External links: all ECSS links 200. The Space Research link returns 200. iso.org and O'Reilly return 403, and LinkedIn 999; these are bot blocks, so open them manually. **drdo.gov.in (IMAP 2023 PDF) timed out, as did the whole domain, from this network.** Check it from India before release.

## Lighthouse Results

Production build, GA blocked:

| Page | Mobile (Perf / A11y / BP / SEO) | Desktop |
|---|---|---|
| /aerosystems | 92 / 100 / 100 / 100 · LCP 3.3 s · CLS 0 | 100 / 100 / 100 / 100 · LCP 0.6 s |
| /aerosystems/aeaip | 94 / 100 / 100 / 100 · LCP 2.9 s | 100 / 100 / 100 / 100 |
| /aerosystems/aeaip/demo | 93 / 100 / 100 / 100 · LCP 3.1 s | 100 / 100 / 100 / 100 · CLS 0.011 |
| /solutions/engineering-assurance | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| /aerosystems/about | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

Mobile LCP is measured under Lighthouse's simulated slow-4G throttling, and is driven by the web-font hero text.

## Known Limitations

- Leadership one-sentence summaries are drafts from the role titles. Manjunatha G has no LinkedIn link until a real URL is provided.
- The midnight dark palette is a recommendation implemented for review. The light theme is unchanged.
- The logo-lockup sub-label is still 10 px.
- AEAIP statuses are the product owner's to confirm (as noted in `content/aeaip.ts`).
- Old content constants that are no longer rendered (for example `CORE_MODEL`, `READINESS_QUESTIONS`) remain in `content/aeaip.ts`. They are harmless and can be pruned later.

## Physical Device Testing Still Required

All testing was done in emulated viewports (Chromium, Firefox, WebKit). It still needs checking on real devices: an iPhone (Safari, including the bottom-sheet drawer and safe areas), an Android phone (Chrome), an iPad in both orientations, and a touch laptop. Gestures, momentum scroll in the gate strip, the `<dialog>` sheet and the 3D view's touch rotation have not been verified on hardware.

## V&V Expert Review Still Required

A practising V&V or systems engineer, ideally from spacecraft programmes, should review:

- the review-gate definitions and typical evidence;
- the verification-method families;
- the evidence-validity states;
- the satellite lifecycle and environmental-test wording;
- the ECSS/NASA reference mapping.

Certification wording on AirCert also needs review by a certification engineer before release.

## Git Status

The working tree is modified and **nothing is committed** (per the brief). 55 tracked files changed, with 3,140 insertions and 4,399 deletions; one file was deleted (`src/components/diagrams/timeline-rail.tsx`). New, untracked: `src/components/system/`, `src/content/aeaip-graph.ts`, `src/content/spacecraft.ts` and this report. `.claude/` is untracked and should stay out of any commit.

## Success Test (five readers)

- **CEO.** The hero H1, definition and three-platform connector explain the company in under 30 seconds.
- **CTO / Chief Engineer.** The demo and Evidence Graph show the mechanism, configuration-aware evidence, without marketing language.
- **V&V Engineer.** The terminology follows ECSS/NASA usage, with references. Expert review is still recommended (above).
- **Investor.** The Strategy page covers flagship, wedge (DAQIP/FAI), customer, moat (the evidence graph) and the maturity-staged expansion, without financial projections.
- **Young Engineer.** Ten knowledge pages, a glossary and plain definitions make it possible to learn from the site.
