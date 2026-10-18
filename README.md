# GAMYAA website

Source for **gamyaa.in**: the GAMYAA parent site, **Gamyaa AeroSystems** (`/aerosystems`) and **Gamyaa Ventures** (`/ventures`).

Built with Next.js 16 (App Router, Cache Components, statically prerendered), React 19, TypeScript and Tailwind CSS v4. Every page is static HTML; the only server code is the contact form endpoint (`/api/contact`).

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000 (hot reload; analytics disabled)

npm run build          # production build (type-checks and prerenders every page)
npm run start          # serve the production build on http://localhost:3000
npx next start -p 3100 # …or on another port if 3000 is busy
npm run lint
```

Copy `.env.example` to `.env.local` to change configuration (see below).

## Where to edit things

| What | File |
| --- | --- |
| Contact email, phone, location, external links | `src/lib/site.ts` (`CONTACT`, `EXTERNAL`). To make a corporate mailbox primary, set `active: true` in `CORPORATE_EMAILS` |
| Incorporation flag (switches footer and structured data to "Gamyaa AeroSystems Private Limited") | `src/lib/site.ts` → `BRAND.aeroIncorporated` (only after incorporation is confirmed) |
| Product / capability status labels | `src/content/status.ts`, `src/content/daqip.ts`, `src/content/solutions.ts` |
| DAQIP™ content | `src/content/daqip.ts` |
| AirCert AI™ content | `src/content/aircert.ts` |
| Solutions (8 pages) | `src/content/solutions.ts` |
| Services, Ventures focus areas | `src/content/services.ts`, `src/content/ventures.ts` |
| Leadership, partners, careers domains, contact interests | `src/content/company.ts` (Manjunath G's LinkedIn is a placeholder until his own URL is added) |
| Evolution timeline | `src/content/timeline.ts` |
| Navigation | `src/content/navigation.ts` |
| Theme colours and design tokens | `src/app/globals.css` |
| Default theme (currently dark) | `src/lib/theme.ts` → `DEFAULT_THEME` |
| Logo | `src/components/brand/` (vector trace of `assets/brand/gamyaa-logo-master.png`), static files in `public/brand/` |

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_AEROSYSTEMS_CANONICAL` | `path` (default): `gamyaa.in/aerosystems` is canonical. `aerosystems.gamyaa.in` serves the same deployment: the bare domain opens `aerosystems.gamyaa.in/aerosystems`, parent pages (`/ventures`, `/contact`, `/privacy`, `/terms`) go to gamyaa.in, and canonical tags point to gamyaa.in. `subdomain`: clean subdomain URLs become canonical and `gamyaa.in/aerosystems/*` redirects there. |
| `NEXT_PUBLIC_GA_DISABLED` | `1` disables GA4 (use on preview/staging). GA4 loads only in production builds. |
| `NEXT_PUBLIC_GA_DEBUG` | `1` adds `debug_mode` to custom events for GA4 DebugView. |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Contact form delivery. The form is shown only when the first two are set at build time; otherwise the contact pages show Email Us / Call Us. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Optional shared rate limit for `/api/contact` across instances. |
| `GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML-tag verification. |

## Deploying

The project deploys to Vercel with no extra configuration. Add `gamyaa.in` (and `www.gamyaa.in` redirecting to it) and `aerosystems.gamyaa.in` as domains of the same project. With the default settings, typing `aerosystems.gamyaa.in` opens `aerosystems.gamyaa.in/aerosystems`. To make clean subdomain URLs canonical later, set `NEXT_PUBLIC_AEROSYSTEMS_CANONICAL=subdomain`.

See [`docs/IMPLEMENTATION_REPORT.md`](docs/IMPLEMENTATION_REPORT.md) for routes, analytics events, SEO, security, QA results and known limitations; [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) before going live; and [`docs/CONTENT_PROGRAM.md`](docs/CONTENT_PROGRAM.md) for planned reference articles.
