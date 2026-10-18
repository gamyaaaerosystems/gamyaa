# GAMYAA website — implementation report

Status as of 19 October 2026 (V1.1). Covers gamyaa.in, Gamyaa AeroSystems (`/aerosystems`) and Gamyaa Ventures (`/ventures`). Launch tasks are tracked in [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md); planned reference articles are in [`CONTENT_PROGRAM.md`](CONTENT_PROGRAM.md).

## V1.1 changes (optimisation and launch readiness)

No routes were added or removed, and the architecture, responsiveness, accessibility, SEO, analytics and security features are preserved.

- **Parent home:** new supporting line ("Engineering intelligence platforms and strategic ventures…") and updated AeroSystems and Ventures card statements.
- **AeroSystems home, priority order:** Hero (with "Engineering Assurance Intelligence for Aerospace & Defence") → Engineering Intelligence Platforms → Engineering lifecycle (with the category definition) → Who We Serve → **Engineering Evidence** (new: Interactive FAI Prototype, DAQIP R&D, Engineering Workflow Validation, Product Roadmap). The rest follows: **Problems We Are Solving** (new, three problems), integration, solutions, timeline, initiatives, leadership, partners. The separate DAQIP message band was folded into the DAQIP product card.
- **Commercial CTAs:** "Request a DAQIP Demo" and "Discuss an Aerospace Quality Problem" on the AeroSystems home, DAQIP, FAI, solution, services, research, products and contact pages. They are tracked as `demo_interest` and `problem_discussion_click`.
- **DAQIP:** the short explanation sits under the title; an "In one sentence" block, **What You Can Explore Today** (only what exists on the site) and the prototype flow (Drawing → Characteristic → Inspection Method → Measurement → Evidence → Approval) were added.
- **FAI page:** retitled "First Article Inspection Software for Aerospace & Defence" with "From engineering drawing to reviewed FAIR". Adds a problem section, an `#as9102` anchor and a 4-question FAQ (FAQPage).
- **AirCert AI:** new statement, Requirement → Compliance → Verification → Evidence → Review flow, an "In one sentence" block, and the explicit boundary. The full integration diagram now lives on Engineering Assurance, the home page and Products only.
- **Integration lanes:** AirCert AI = Design Assurance / Certification; DAQIP = Manufacturing Assurance / Quality.
- **Solution pages:** each now follows Problem → Who experiences it → What Gamyaa helps with → Engineering flow → Evidence & outcome → Related product → CTA, with distinct content (measured overlap between bodies: only the product subtitle).
- **Research:** "Engineering Research & Product Development", with 7 product R&D areas (status, and which product each feeds) and `#workflow-validation`.
- **Products:** new `#roadmap` section grouping capabilities by status.
- **Internships:** "Engineering Learning & Research Programs", clearly separate from the commercial business. **Careers:** heading without a full stop.
- **Leadership:** Purushothama Padmanabha (Co-Founder & CEO), Manjunath G (Co-Founder, Sales & Marketing) and Sudarshana Karkala (Co-Founder, Director), with no placeholder avatars. Manjunath G's LinkedIn link currently points to a placeholder URL (see Known limitations). Structured data was updated to match.
- **Ventures:** four themes (Aerospace & Defence; Space & Autonomous Systems; Advanced Manufacturing & Industrial AI; Engineering Infrastructure & Cybersecurity) and "Venture building · Strategic collaboration · Investment exploration".
- **Timeline:** concise labels (Idea, POC, Product & Company, Customer Validation, Engineering Assurance Integration, Aerospace Ecosystem, Vision). 2027 onwards is labelled "Roadmap / Vision — not guaranteed".
- **Contact (launch blocker, Option B):** the online form renders only when Resend is configured at build time. Until then both contact pages show **Email Us** (pre-filled subject and a structured body) and **Call Us**, so a broken form is never shown.
- **Launch hooks:** `GOOGLE_SITE_VERIFICATION`, an optional shared rate limiter (`UPSTASH_REDIS_REST_*`, IP addresses hashed), and a one-line switch to make a corporate email primary (`CORPORATE_EMAILS` in `src/lib/site.ts`).

## 1. Implemented routes

All pages are statically prerendered (`○` in `next build`). Only `/api/contact` runs on the server.

### GAMYAA (parent)

| Route | Purpose |
| --- | --- |
| `/` | Minimal hero ("Aerospace & Defence Engineering Intelligence. / Building the Future."), two division cards, EV Society™ initiative |
| `/ventures` | Gamyaa Ventures: hero, 11 focus areas, how we work, legal positioning note |
| `/contact` | GAMYAA contact (details + form) |
| `/privacy` | Privacy notice (GA4, cookies, local storage, contact data, rights). Marked for legal review |
| `/terms` | Placeholder terms. Marked "Legal review required before public launch." |

### Gamyaa AeroSystems

| Route | Purpose |
| --- | --- |
| `/aerosystems` | Hero, lifecycle diagram, Engineering Intelligence Platforms, DAQIP message, DAQIP + AirCert AI thread, Who we serve, solutions, evolution timeline, initiatives, leadership, partners |
| `/aerosystems/products` | Both platforms, status legend, integration diagram |
| `/aerosystems/daqip` | DAQIP™: canonical definition, core message, workflow, interactive balloon drawing, 11 capability layers with status, AI assurance, FAQ |
| `/aerosystems/aircert-ai` | AirCert AI™: definition and boundary, problem, 12 planned capabilities, traceable recommendation example, compliance matrix, evidence graph, readiness, integration, FAQ |
| `/aerosystems/solutions` | Solutions index |
| `/aerosystems/solutions/first-article-inspection` | Dedicated FAI page: workflow, balloon drawing, AS9102 Forms 1–3, full/partial/delta FAI, scope, compliance note |
| `/aerosystems/solutions/{drawing-intelligence, inspection-intelligence, manufacturing-quality, supplier-quality, airworthiness-certification, certification-evidence, engineering-assurance}` | Concise solution pages from one template |
| `/aerosystems/services` | 8 consulting offerings (secondary to the products) |
| `/aerosystems/research` | Research areas with status, links to the DAQIP research programme and cybersecurity initiative |
| `/aerosystems/about` | Mission, focus, engineering philosophy, timeline, leadership (`#leadership`), partners, contact |
| `/aerosystems/careers` | Domains; "Current opportunities will be published here." (no invented vacancies) |
| `/aerosystems/internships` | "Engineering Learning & Research Programs" — bridge to aerospace.gamyaa.in/internships |
| `/aerosystems/contact` | Purushothama Padmanabha, Gamyaa AeroSystems, Bangalore; <gamyaa.aerosystems@gmail.com>; +91 98866 43942 (`mailto:` / `tel:`); form |

**Metadata routes:** `/robots.txt`, `/sitemap.xml` (24 URLs), `/manifest.webmanifest`, `/icon.svg` (adapts to dark browser UI), `/favicon.ico`, `/apple-icon.png`, and Open Graph images for GAMYAA, AeroSystems, DAQIP, AirCert AI and Ventures.

**Future SEO entry points (308 → canonical page, no duplicate content):** `/daqip`, `/aircert-ai`, `/first-article-inspection-software`, `/as9102-fai-software`, `/aerospace-quality-management-software`, `/airworthiness-certification-software`, `/aerospace-certification-ai`, `/certification-evidence-management`, `/defence-manufacturing-quality`, `/aerospace-inspection-software`, plus `/aerosystems/leadership` → `/aerosystems/about#leadership`.

## 2. Product status (as of October 2026)

Statuses are centralised in `src/content/status.ts` and the content files. They were inferred from the evolution timeline and **must be confirmed by the product owner**.

| Item | Status shown |
| --- | --- |
| **DAQIP™** (product) | In Development |
| Drawing, FAI, Inspection, Manufacturing Quality, Quality Evidence Graph, AI Assurance, Cybersecurity layers | In Development (CMM integration marked "planned") |
| Supplier Quality, Nonconformance, Configuration, Executive Quality Intelligence | Planned |
| **AirCert AI™** (product and all capabilities) | Planned, not released |
| Engineering Assurance (DAQIP + AirCert AI integration) | Research |

No capability is labelled Available.

## 3. Brand, theme and design

- **Logo:** vector-traced from the supplied PNG (master kept at `assets/brand/gamyaa-logo-master.png`). Navy gradient in light theme, silver gradient in dark theme. It ships once per page as an inline SVG sprite.
- **Theme:** "Aerospace Precision": warm white / graphite, near-black ink, steel grey, midnight-blue accent from the logo navy, ice-blue highlights in dark mode, hairline technical grid. **Dark is the default**; Light and System are selectable, the choice persists in `localStorage` (`gamyaa-theme`), applies before first paint (no flash), syncs across tabs and updates the browser `theme-color`.
- **Fonts:** Inter (sans) and IBM Plex Mono (technical labels), self-hosted via `next/font`.
- **Visuals (all original, no stock or customer imagery):** lifecycle diagram, DAQIP workflow, DAQIP + AirCert AI digital thread, fictitious flanged-bushing drawing with balloons 14–19 and an evidence trace panel (#19 shows a rejected characteristic with an NCR), compliance matrix, certification evidence graph, evidence readiness panel (labelled illustrative, never "% certified"), evolution timeline.
- **Timeline:** horizontal rail with tabs on desktop (2024 → 2030, 2026 highlighted as "Now", 2027–2030 dashed and labelled "Roadmap / Vision · not guaranteed"); vertical timeline on phones and tablets. 2030 is the vision node ("Trusted engineering intelligence from requirement to evidence and approval.").
- **Motion:** CSS only: fades, line draw, scroll-linked reveal (progressive enhancement). Everything is disabled under `prefers-reduced-motion`.

## 4. Responsive QA

Automated with Playwright against the production build. Checks: no horizontal overflow, and no console or page errors.

- **Widths:** 320, 375 (iPhone SE), 390 (iPhone standard/Pro), 430 (Pro Max), 568×320 (landscape), 744 (iPad mini), 820 (iPad Air), 1024 (iPad landscape), 1280, 1440, 1920, 2560.
- **Engines:** Chrome (Chromium), WebKit (Safari engine) and Firefox, each in light and dark colour schemes.
- **Result:** 0 overflow issues on 18 routes × 12 widths in all three engines. 0 console errors in Chrome and Firefox.
- **WebKit:** the only entries are RSC prefetch requests (`?_rsc=`) that the test harness cancels by hard-navigating to the next URL. A separate WebKit check showed none when a page is left idle or after a normal client-side navigation.
- **Local-testing note:** WebKit upgrades `http://localhost` subresources because of `upgrade-insecure-requests`, so the harness removes that directive locally. It is harmless over HTTPS in production.
- Safe-area insets (`viewport-fit=cover`) are applied to the header, mobile menu and footers.
- **Not covered by automation:** physical iOS Safari, Chrome iOS, Samsung Internet and Edge. See §11.

## 5. Accessibility

- Semantic landmarks, one `h1` per page, ordered headings, skip link per layout, visible `:focus-visible` rings.
- Mobile menu uses a native `<dialog>`: focus trap, Esc to close, focus returns to the trigger, background scroll locked.
- Theme toggle uses native radio inputs (keyboard and screen-reader friendly). The timeline is an ARIA tablist (arrow keys, Home and End).
- Balloon characteristics are selectable through 44 px buttons; the trace panel is `aria-live`.
- Form: labels, required hints, `aria-invalid`, errors linked with `aria-describedby`, focus moves to the first invalid field, success and errors announced.
- Text tokens pass WCAG AA contrast in both themes (for example, muted text is 6.0:1 in light and 7.1:1 in dark).
- Touch targets: menu and form controls ≥ 44 px; all other controls ≥ 24 px (WCAG 2.2 AA).
- **Lighthouse Accessibility:** 100 on all audited pages.

## 6. SEO

- Unique `<title>` and meta description on every page (verified automatically), canonical URL, Open Graph and Twitter cards with a 1200×630 image on every page.
- `robots.txt` allows everything except `/api/`; `sitemap.xml` lists canonical URLs only.
- Structured data (JSON-LD): `Organization` (GAMYAA, with Gamyaa AeroSystems as sub-organisation), `WebSite`, `SoftwareApplication` (DAQIP, AirCert AI, including status), `FAQPage` (visible FAQs on DAQIP and AirCert AI only), `BreadcrumbList` (all inner pages), `TechArticle` (solutions), `Service` (services) and `Person` (leadership). `legalName` appears only once incorporation is confirmed.
- **Canonical host strategy:** `src/lib/site.ts` (`aero()`, `parent()`, `absoluteUrl()`) and `next.config.ts` host rules. In the default `path` mode, `aerosystems.gamyaa.in` serves the same deployment:

| Request on aerosystems.gamyaa.in | Result |
| --- | --- |
| `/` | 307 → `aerosystems.gamyaa.in/aerosystems` (same host) |
| `/aerosystems/*` | 200, served directly; canonical tag points to `https://gamyaa.in/aerosystems/*` |
| `/ventures`, `/contact`, `/privacy`, `/terms` | 307 → the same page on gamyaa.in |
| Short SEO paths (e.g. `/daqip`) | 308 → `/aerosystems/…` on the same host |

  Links from AeroSystems to the GAMYAA home page are absolute (`https://gamyaa.in`), so they never land on the subdomain's `/`. Switching to `subdomain` mode makes clean subdomain URLs canonical: `gamyaa.in/aerosystems/*` redirects there (308) and the subdomain is rewritten onto the same pages. Either way, only one URL per page is canonical.
- **Lighthouse SEO:** 100 on all audited pages.

## 7. AI search / answer-engine readiness

Each product page answers, in visible text and in structured data: what it is, who makes it, who it is for, what problem it solves, which standards and processes it supports, what is available, what is planned, and the authoritative source (canonical URL).

- **What is DAQIP?** "DAQIP is the Defence Aerospace Quality Intelligence Platform developed by Gamyaa AeroSystems for aerospace and defence manufacturing quality, First Article Inspection, inspection intelligence, manufacturing evidence, supplier quality and engineering traceability."
- **What is AirCert AI?** "AirCert AI is an Airworthiness Certification Engineering Copilot by Gamyaa AeroSystems that assists aerospace and defence teams with certification requirements, planning, compliance matrices, engineering documentation, verification activities and traceable certification evidence." It is followed on the page by "AirCert AI assists certification work. It does not independently certify aerospace products…"

The site uses the required wording ("assists", "human review", "evidence preparation") and was checked automatically for banned phrases such as "certified by AI", "guaranteed approval" and "100% compliant".

## 8. Analytics (GA4 `G-VRS5BMWG9R`)

- The supplied gtag snippet is used unchanged and loaded once from the root layout (`next/script`, `afterInteractive`), in production builds only. Verified: one `gtag/js` request and one `config` call per visit.
- **Page views:** the initial `config` sends the first page view. Client-side navigations are counted by GA4 Enhanced Measurement ("Page changes based on browser history events"), which must stay **enabled** in the GA4 data stream. The site never sends `page_view` itself, so nothing is counted twice.
- **Service:** `src/lib/analytics.ts`. One delegated click listener reads `data-ga-*` attributes, so no per-component client code is needed. View events fire on mount.

| Event | Parameters | Fired by |
| --- | --- | --- |
| `nav_click` | `nav_label`, `destination`, `page_path` | Header and mobile navigation |
| `view_aerosystems`, `view_ventures` | `cta_label`, `destination` | Parent division cards / footer |
| `view_daqip`, `view_aircert_ai`, `view_fai_solution` | `page_path` | Page view of DAQIP, AirCert AI, FAI |
| `daqip_research_click` | `source_section` | DAQIP research links |
| `demo_interest` (V1.1, replaces `request_demo_click`) | `product` (`daqip` / `aircert`), `source_page`, `cta_location` | "Request a DAQIP Demo", "Register interest in AirCert AI" |
| `problem_discussion_click` (V1.1) | `topic` (`fai`, `inspection`, `supplier_quality`, `airworthiness`, `certification`, `manufacturing_quality`, `general`), `source_page`, `cta_location` | "Discuss an Aerospace Quality Problem", "Discuss this problem" |
| `aircert_learn_more_click`, `aircert_contact_click` | `source_section` | AirCert cards and CTAs |
| `contact_sales_click` | `source_section` | "Talk to Gamyaa" CTAs |
| `email_click`, `phone_click` | `source_section` (never the address or number) | Any `mailto:` / `tel:` link |
| `career_view`, `career_cta_click` | — | Careers page / CTA |
| `internship_view`, `internship_outbound_click` | — | Learning & research programs page / outbound links |
| `aerospace_cybersecurity_click` | — | Cybersecurity initiative links |
| `partner_click` | `partner_name` (EV Society, iTelematics), `destination` | Partner links |
| `leadership_link_click` | `person_name` (allow-listed: Purushothama Padmanabha, Manjunath G, Sudarshana Karkala) | LinkedIn links |
| `ventures_contact`, `ventures_focus_click` | — | Ventures CTAs |
| `form_start`, `form_submit`, `form_error` | `form_name`, `page_path`, `error_type` | Contact forms |
| `theme_change` | `theme` (`light` / `dark` / `system`) | Theme toggle |
| `outbound_click` | `destination_domain`, `link_label`, `source_section` | Any link to another domain |

**Privacy safeguards:** only allow-listed parameter keys are sent; enumerated values are checked against allow-lists; free text is truncated and redacted if it looks like an email, phone number or long digit sequence (part numbers, IDs, measurements); destinations are reduced to a path or a domain with no query strings. Automated QA filled the form with a name, email, part number and drawing ID and confirmed none of them reached `dataLayer`.

**Consent:** `REQUIRE_CONSENT_BEFORE_LOADING` in `src/components/analytics/google-analytics.tsx` stops GA from loading so a consent manager can load it after opt-in. No banner is built yet.

## 9. Security

- **Headers on every response:** Content-Security-Policy (self, plus the GA hosts only; `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`), HSTS (`max-age=63072000`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy: same-origin`, a restrictive `Permissions-Policy`, and no `X-Powered-By`.
- **Contact API (`src/app/api/contact/route.ts`), each check verified with curl:**

| Check | Response |
| --- | --- |
| Cross-origin request (`Origin`) | 403 |
| Missing `Origin` | 403 |
| `Sec-Fetch-Site: cross-site` | 403 |
| Non-JSON body | 415 |
| Body over 10 KB | 413 |
| More than 5 requests per IP per 10 minutes | 429 |
| Honeypot filled, or form submitted in under 2.5 s | Silently accepted (dropped) |
| Invalid fields | 422 (same validation rules as the client) |

- Responses are `no-store`, message contents are never logged, and there are no file uploads.
- No secrets in frontend code; configuration comes from environment variables (`.env.example`).
- `npm audit` reports 5 high-severity advisories in ESLint's dependency tree (`eslint-config-next` → `fast-glob` → `micromatch` → `braces`). These are development-only and not shipped to the site; the suggested fix downgrades `eslint-config-next`, so it was not applied.

## 10. Performance (Lighthouse 12, V1.1 production build, dark default, GA blocked)

| Page | Mobile: Perf / A11y / BP / SEO | Desktop: Perf / A11y / BP / SEO |
| --- | --- | --- |
| `/` | 95 / 100 / 100 / 100 (LCP 2.8 s) | 100 / 100 / 100 / 100 (LCP 0.6 s) |
| `/aerosystems` | 94 / 100 / 100 / 100 (LCP 2.9 s) | 100 / 100 / 100 / 100 |
| `/aerosystems/daqip` | 94 / 100 / 100 / 100 (LCP 2.9 s) | 100 / 100 / 100 / 100 |
| `/aerosystems/aircert-ai` | 94 / 100 / 100 / 100 (LCP 2.9 s) | 100 / 100 / 100 / 100 |
| `/aerosystems/solutions/first-article-inspection` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/aerosystems/solutions/engineering-assurance` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/aerosystems/products` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/aerosystems/research` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/aerosystems/contact` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/ventures` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

CLS is 0 everywhere. Mobile LCP is measured under Lighthouse's simulated slow 4G and comes from the hero text waiting for web fonts. The pages ship no images, almost all markup is server-rendered HTML, and the logo is one inline SVG sprite. Check real-world field data after launch.

## 11. Known limitations

1. **Contact form delivery is not configured.** Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (sender on a verified domain) in Vercel and redeploy. The form then appears automatically. Until then the contact pages show Email Us / Call Us, with no form.
2. **Rate limiting** is per server instance unless `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are set (shared limiter implemented) or a Vercel Firewall rule is added.
3. **CSP uses `'unsafe-inline'` for scripts.** Next.js needs it for inline bootstrap scripts on statically prerendered pages; nonces would force every page to render dynamically.
4. **HSTS omits `includeSubDomains` / `preload`** until every gamyaa.in subdomain is confirmed to serve HTTPS.
5. **No consent banner yet** (the architecture is ready, see §8). Confirm the legal requirement before launch.
6. **Legal pages are drafts:** privacy needs counsel review (including the DPDP Act, 2023); terms are placeholders.
7. **Product statuses** (§2) are inferred and need owner confirmation.
8. **Manjunath G's LinkedIn** link is a placeholder: it currently opens `https://linkedin.com/in/sudarshanakarkala`. Replace it with his own profile and remove `linkedinPlaceholder` in `src/content/company.ts`. It is kept out of structured data until then.
9. **Corporate mailboxes** (`contact@gamyaa.in`, `aerosystems@gamyaa.in`) are prepared. Set `active: true` in `CORPORATE_EMAILS` once one is configured, and it becomes primary site-wide.
10. **Incorporation:** the footer shows "© 2026 Gamyaa AeroSystems". Set `BRAND.aeroIncorporated = true` only after incorporation is confirmed.
11. **Not tested on physical devices** or in Edge and Samsung Internet. These are Chromium-based and covered by the Chrome engine tests, but should still be spot-checked.
12. **aerosystems.gamyaa.in** rules were verified locally with a spoofed `Host` header. They need a live check once the domain is added to the Vercel project. The optional `subdomain` canonical mode can only be fully verified then too.
13. **GA4 DebugView** validation needs the live property (see §12). Local QA intercepted all GA traffic, so no test hits reached `G-VRS5BMWG9R`.

## 12. Manual verification steps for the owner

1. **Run it:** `npm install && npm run build && npx next start -p 3100`, then open <http://localhost:3100>.
2. **Theme:** a first visit is dark. Choose Light, reload, and it stays light. Choose System and it follows the OS setting.
3. **Mobile:** on a phone (or Safari's responsive mode), open the ☰ menu, navigate, and press Esc or ✕. Check that nothing scrolls sideways.
4. **DAQIP** (`/aerosystems/daqip`): tap the characteristics #14–#19; #19 should show "Rejected · NCR open".
5. **Timeline** (`/aerosystems`): on desktop, use ← → on the year tabs; 2027 onwards is labelled Roadmap / Vision.
6. **Links:** LinkedIn (Purushothama Padmanabha, Sudarshana Karkala), EV Society, iTelematics, aerospace.gamyaa.in pages, and the `mailto:` / `tel:` links all open the right destination.
7. **Analytics, after deploying to production:** enable GA4 DebugView (Google Analytics Debugger extension, or deploy once with `NEXT_PUBLIC_GA_DEBUG=1`).
   - Load a page: one `page_view`.
   - Navigate to another page: one more `page_view`.
   - Click "Explore DAQIP": `view_daqip` on arrival.
   - Click a partner link: `partner_click` and `outbound_click`.
   - Toggle the theme: `theme_change`.
   - Check that no event parameter contains an email address, phone number or form text.
8. **GA4 admin:** keep Enhanced Measurement "Page changes based on browser history events" enabled, and set data retention.
9. **Contact form:** after configuring Resend, submit a test enquiry and confirm it arrives at <gamyaa.aerosystems@gmail.com> with Reply-To set to the sender.
10. **Security headers:** check the live domain at securityheaders.com and observatory.mozilla.org.
11. **Structured data:** check DAQIP, AirCert AI and the AeroSystems home page in Google's Rich Results Test and validator.schema.org.
12. **Search Console:** add gamyaa.in and submit `https://gamyaa.in/sitemap.xml`.
