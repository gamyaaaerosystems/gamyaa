# Launch checklist (V1.1)

Tick each item before public launch. The owner column says who acts.

## Product

- [ ] **DAQIP status confirmed** (currently "In Development"). *Owner:* product. *How:* edit `src/content/status.ts`.
- [ ] **AirCert AI status confirmed** (currently "Planned"). *Owner:* product. *How:* edit `src/content/status.ts`.
- [ ] **Capability statuses confirmed** for the 11 DAQIP layers, 7 solutions and 7 research areas. *Owner:* product. *How:* edit `src/content/daqip.ts`, `solutions.ts` and `research/page.tsx`.

- [ ] **AEAIP™ statuses confirmed** (platform Research & Architecture; Evidence Graph and Assurance Gates Architecture; Assurance Intelligence Engine, evidence validity and cybersecurity Research; continuous and operational assurance Concept; integrations Roadmap; predictive assurance Long-term Vision). *Owner:* product. *How:* `src/content/aeaip.ts`.
- [ ] **"Built in India. Designed for globally rigorous engineering programs."** confirmed as company positioning (strategy page). *Owner:* founders.
- [ ] **AEAIP knowledge pages reviewed by a practising systems / V&V engineer** before promotion. *Owner:* engineering. *How:* `/aerosystems/aeaip/*`.
- [ ] **Designer profile link** (`https://aerospace.gamyaa.in/about/sudarshana-karkala`) resolves. *Owner:* tech.

## Commercial

- [ ] **"Request a DAQIP Demo" reaches you.** *Owner:* sales. *How:* click it on `/aerosystems`, `/daqip`, the FAI page, `/services` and `/contact`.
- [ ] **"Discuss an Aerospace Quality Problem" reaches you.** *Owner:* sales. *How:* same pages.
- [ ] **Contact route works.** *Owner:* sales. *How:* `/aerosystems/contact`. Email Us opens your mail app with a pre-filled subject, and Call Us dials.

## Contact

- [ ] **Resend configured, or the form left off.** *Owner:* tech. *How:* set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (verified domain) in Vercel and redeploy; the form then appears automatically. Until then, Email Us / Call Us is shown and no form is displayed.
- [ ] **Corporate domain email.** *Owner:* tech. *How:* once `contact@gamyaa.in` or `aerosystems@gamyaa.in` is configured and monitored, set `active: true` in `src/lib/site.ts` (`CORPORATE_EMAILS`); it becomes the primary email everywhere.

## Legal

- [ ] **Privacy reviewed** (GA4, cookies, local storage, contact data, DPDP Act 2023). *Owner:* counsel. *How:* `/privacy`.
- [ ] **Terms reviewed.** *Owner:* counsel. *How:* `/terms`, then remove the "Legal review required" notices.
- [ ] **Company naming legally accurate.** *Owner:* founders. *How:* set `BRAND.aeroIncorporated = true` only after incorporation.
- [ ] **Product claims, disclaimers and trademarks (™) reviewed.** *Owner:* counsel.
- [ ] **Consent banner decision** for the target geographies. *Owner:* counsel. *How:* the GA block is ready (`REQUIRE_CONSENT_BEFORE_LOADING`).

## Analytics

- [ ] **Enhanced Measurement on:** "Page changes based on browser history events". *Owner:* marketing. *How:* GA4 → Admin → Data streams.
- [ ] **GA4 DebugView verified.** *Owner:* marketing. *How:* deploy once with `NEXT_PUBLIC_GA_DEBUG=1`, or use the GA Debugger extension.
- [ ] **SPA page views:** one per route change. *Owner:* marketing. *How:* DebugView.
- [ ] **New events seen** (`demo_interest`, `problem_discussion_click`) and **no PII** in parameters. *Owner:* marketing. *How:* DebugView.
- [ ] **AEAIP events seen** (`aeaip_explore`, `aeaip_demo_open`, `aeaip_demo_start`, `aeaip_gate_select`, `aeaip_subsystem_select`, `aeaip_evidence_trace_open`, `aeaip_evidence_validity_demo`, `aeaip_reference_open`, `aeaip_partner_interest`, `aeaip_investor_interest`, `platform_card_click`, `designer_profile_click`). Register `source_location`, `gate`, `subsystem`, `trace_category`, `validity_step`, `reference_category` and `platform` as event-scoped custom dimensions. *Owner:* marketing.

## SEO

- [ ] **Search Console:** verify `gamyaa.in`. *Owner:* marketing. *How:* DNS record, or set `GOOGLE_SITE_VERIFICATION` and redeploy.
- [ ] **Sitemap submitted.** *Owner:* marketing. *How:* `https://gamyaa.in/sitemap.xml`.
- [ ] **Indexing requested for AEAIP:** `/aerosystems/aeaip`, `/aerosystems/aeaip/review-gates`, `/aerosystems/aeaip/verification-validation`, `/aerosystems/aeaip/configuration-assurance`. *Owner:* marketing.
- [ ] **Bing Webmaster Tools:** verify and submit the sitemap (no verification token exists in the repository). *Owner:* marketing.
- [ ] **Indexing requested** for `/`, `/aerosystems`, `/aerosystems/daqip`, `/aerosystems/aircert-ai`, `/aerosystems/solutions/first-article-inspection` and `/ventures`. *Owner:* marketing. *How:* Search Console → URL inspection.

## Security

- [ ] **Live security headers checked.** *Owner:* tech. *How:* securityheaders.com and observatory.mozilla.org.
- [ ] **Production rate limiting.** *Owner:* tech. *How:* set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, or add a Vercel Firewall rate-limit rule on `/api/contact`.
- [ ] **Domains:** `gamyaa.in`, `www.gamyaa.in` and `aerosystems.gamyaa.in` are on the Vercel project with HTTPS. *Owner:* tech.

## Devices

- [ ] **iPhone (physical):** navigation, theme toggle, timeline, balloon drawing, contact CTA, no sideways scroll. *Owner:* anyone.
- [ ] **Android phone (physical):** same checks. *Owner:* anyone.
- [ ] **iPad or tablet:** same checks, in portrait and landscape. *Owner:* anyone.
