import Link from "next/link";
import { LogoMark, LogoWord } from "@/components/brand/logo";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Container, JsonLd, KeywordLine, SmartLink } from "@/components/ui/primitives";
import { gaAttrs } from "@/lib/analytics";
import { pageMetadata, parentOrganizationLd, websiteLd } from "@/lib/seo";
import { aero, EXTERNAL, parent } from "@/lib/site";

export const metadata = pageMetadata({
  title: "GAMYAA | Aerospace, Defence, Space & Deep Tech",
  description:
    "GAMYAA builds and supports engineering technologies across aerospace, defence, space, aircraft health monitoring, manufacturing intelligence and deep tech.",
  href: parent("/"),
});

function AeroGlyph() {
  // Launch → ascent → orbit, above the Earth's limb: the rocket on its trajectory (flown
  // path solid, path still to fly dashed) and the satellite it delivers. The nodes on
  // the path are the Evidence Line motif, in flight.
  return (
    <svg viewBox="0 0 240 120" aria-hidden className="h-auto w-full text-line-strong" fill="none">
      {[[14, 38], [58, 18], [104, 8], [232, 52], [168, 62]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="currentColor" />
      ))}
      {/* Earth's limb and atmosphere */}
      <path d="M0 112Q120 84 240 112" stroke="currentColor" />
      <path d="M0 104Q120 76 240 104" stroke="currentColor" strokeDasharray="1 4" />
      {/* Launch tower */}
      <path d="M21 112V97M21 101h4M21 105.5h4M18 112h8" stroke="currentColor" />
      {/* Trajectory, split at the rocket (t = 0.35 of one cubic): flown, then still to fly */}
      <path d="M28 106C42.7 83.6 60.8 66.4 80 53.8" stroke="var(--accent)" strokeWidth="1.2" className="anim-draw" style={{ ["--gx-len" as string]: 70 }} />
      <path d="M80 53.8C115.5 30.5 154.4 23.5 181 30" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.7" />
      {[[28, 106], [138, 30]].map(([x, y]) => (
        <circle key={`n-${x}`} cx={x} cy={y} r="2.5" fill="var(--surface)" stroke="var(--accent)" />
      ))}
      {/* Rocket, nose along the trajectory's tangent */}
      <g transform="translate(80 53.8) rotate(57)" stroke="var(--accent)" fill="var(--surface)">
        <path d="M-2.4 10.2C-2.4 14 -1 17.5 0 20C1 17.5 2.4 14 2.4 10.2" opacity="0.5" />
        <path d="M-3.5 2.5L-7.5 9V11L-3.5 8.5ZM3.5 2.5L7.5 9V11L3.5 8.5Z" />
        <path d="M0-13C2.6-10.4 3.5-7 3.5-3.5V8.5H-3.5V-3.5C-3.5-7-2.6-10.4 0-13Z" />
        <path d="M-2.4 8.5L-2.9 10.2H2.9L2.4 8.5" />
        <circle cx="0" cy="-3.5" r="1.4" />
      </g>
      {/* Satellite: bus, solar arrays, antenna */}
      <g stroke="var(--accent)">
        <rect x="201" y="25" width="10" height="10" />
        <rect x="181" y="26.5" width="16" height="7" />
        <rect x="215" y="26.5" width="16" height="7" />
        <path d="M197 30h4M211 30h4M186.3 26.5v7M191.7 26.5v7M220.3 26.5v7M225.7 26.5v7M206 25v-5M202 19.5q4 3 8 0" />
      </g>
    </svg>
  );
}

function VenturesGlyph() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden className="h-auto w-full text-line-strong" fill="none">
      {Array.from({ length: 6 }).map((_, c) =>
        Array.from({ length: 3 }).map((__, r) => (
          <circle key={`${c}-${r}`} cx={30 + c * 36} cy={30 + r * 30} r="2" fill="currentColor" />
        )),
      )}
      <path
        d="M30 90 L66 60 L102 60 L138 30 L174 30 L210 30"
        stroke="var(--accent)"
        strokeWidth="1.2"
        className="anim-draw"
        style={{ ["--gx-len" as string]: 220 }}
      />
      <circle cx="210" cy="30" r="5" stroke="var(--accent)" />
    </svg>
  );
}

function UFlightGlyph() {
  // Health & usage monitoring: sensors on an aircraft (top view) feed one signal; an anomaly
  // in the raw trace is flagged, then condition monitoring → health intelligence → the
  // maintenance decision (filled node), drawn on the Evidence Line.
  return (
    <svg viewBox="0 30 320 100" aria-hidden className="h-auto w-full text-line-strong" fill="none">
      {/* Aircraft: fuselage, wings, tailplanes, engine pods */}
      <g stroke="currentColor">
        <path d="M24 80C24 76.5 27 74.5 32 74.5H104C113 74.5 121 77 126 80C121 83 113 85.5 104 85.5H32C27 85.5 24 83.5 24 80Z" />
        <path d="M64 74.5L50 36H59L86 74.5M64 85.5L50 124H59L86 85.5M32 74.5L26 60H32L42 74.5M32 85.5L26 100H32L42 85.5" />
        <rect x="54" y="49" width="14" height="6" rx="3" />
        <rect x="54" y="105" width="14" height="6" rx="3" />
      </g>
      {/* Sensors feeding one signal */}
      <path d="M63.4 52C96 52 118 66 136 80M63.4 108C96 108 118 94 136 80M114.4 80H136" stroke="currentColor" strokeDasharray="1 2.5" />
      {[[61, 52], [61, 108], [112, 80]].map(([x, y]) => (
        <circle key={`s-${x}-${y}`} cx={x} cy={y} r="2.4" fill="var(--surface)" stroke="var(--accent)" />
      ))}
      {/* Raw usage signal with a flagged anomaly */}
      <path
        d="M136 80h7l3-5 3 8 3-6 3 4 3-2 3-17 3 27 3-12 3 5 3-2h16"
        stroke="var(--accent)"
        strokeWidth="1.2"
        className="anim-draw"
        style={{ ["--gx-len" as string]: 160 }}
      />
      <circle cx="163" cy="76" r="14" stroke="var(--accent)" strokeDasharray="2 3" opacity="0.6" />
      {/* Condition monitoring → health intelligence → maintenance decision */}
      <path d="M195 80C203 73 211 73 218 80S233 87 241 80M247 80H293" stroke="var(--accent)" strokeWidth="1.2" />
      {[192, 244].map((x) => (
        <circle key={`n-${x}`} cx={x} cy="80" r="3" fill="var(--surface)" stroke="var(--accent)" />
      ))}
      <circle cx="297" cy="80" r="8" stroke="var(--accent)" opacity="0.4" />
      <circle cx="297" cy="80" r="3.5" fill="var(--accent)" />
    </svg>
  );
}

/**
 * UFlight™ is shown as Division 03 at the owner's request. It is presented through a
 * strategic partnership / venture relationship: no ownership or subsidiary wording, and
 * it is deliberately absent from the Organization structured data.
 */
const UFLIGHT = {
  n: "03",
  title: "UFlight™",
  subtitle: "Aircraft Health & Usage Monitoring Systems",
  body: "Health and usage intelligence for aircraft and advanced flight systems — connecting condition monitoring, anomaly detection and predictive maintenance.",
  keywords: ["HUMS", "Aircraft Health", "Condition Monitoring", "Predictive Maintenance", "Flight Systems"],
  cta: "Explore UFlight™",
  href: EXTERNAL.uflight,
  secondary: { cta: "Cybersecurity & Digital Twin", href: EXTERNAL.uflightCybersecurity },
};

const DIVISIONS = [
  {
    n: "01",
    key: "aerosystems" as const,
    title: "Gamyaa AeroSystems",
    subtitle: "Engineering Assurance Intelligence · Defence · Aerospace · Space",
    body: "From engineering requirement to verified evidence and readiness decision: AEAIP™, DAQIP™ and AirCert AI™.",
    keywords: ["AEAIP™", "DAQIP™", "AirCert AI™", "Verification", "Readiness"],
    cta: "Explore AeroSystems",
    href: aero("/"),
    event: "view_aerosystems" as const,
    Glyph: AeroGlyph,
  },
  {
    n: "02",
    key: "ventures" as const,
    title: "Gamyaa Ventures",
    subtitle: "Strategic Ventures for Aerospace, Defence, Space & Deep Tech",
    body: "Building and backing engineering-led technologies across aerospace, defence, space and advanced manufacturing.",
    keywords: ["Aerospace", "Defence", "Space", "Advanced Manufacturing", "Deep Tech"],
    cta: "Explore Ventures",
    href: parent("/ventures"),
    event: "view_ventures" as const,
    Glyph: VenturesGlyph,
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={parentOrganizationLd()} />
      <JsonLd data={websiteLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden" data-ga-section="hero">
        <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
        <Container className="relative flex flex-col items-center pb-16 pt-14 text-center sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-28">
          <LogoMark className="anim-fade-up h-16 w-auto sm:h-20" />
          <h1 className="anim-fade-up mt-8 w-full" style={{ animationDelay: "80ms" }}>
            <span className="sr-only">GAMYAA</span>
            <LogoWord className="mx-auto h-auto w-[min(78vw,34rem)]" />
          </h1>
          <p
            className="anim-fade-up display mt-12 max-w-6xl text-balance text-[1.625rem] text-ink sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
            style={{ animationDelay: "160ms" }}
          >
            <span className="block">Aerospace &amp; Defence Engineering Intelligence.</span>{" "}
            <span className="mt-2 block sm:mt-3">Building the Future.</span>
          </p>
          <p
            className="anim-fade-up lede mt-6 max-w-2xl"
            style={{ animationDelay: "240ms" }}
          >
            Engineering intelligence platforms and strategic ventures for aerospace, defence, space, flight systems and
            advanced manufacturing.
          </p>
        </Container>
      </section>

      {/* Divisions */}
      <section aria-labelledby="divisions-title" className="pb-16 sm:pb-24" data-ga-section="divisions">
        <Container>
          <h2 id="divisions-title" className="sr-only">
            GAMYAA businesses
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {DIVISIONS.map((d) => (
              <li key={d.title}>
                <Link
                  href={d.href}
                  {...gaAttrs(d.event, { cta_label: d.cta, destination: d.href, division: d.key }, "division_card_click")}
                  className="card ticks group flex h-full flex-col p-6 transition-colors hover:border-line-strong sm:p-10"
                >
                  <span className="flex items-center justify-between font-mono text-xs text-subtle">
                    <span>{d.n}</span>
                    <span className="uppercase tracking-[0.12em]">Division</span>
                  </span>
                  <span className="mt-8 block w-full max-w-[17rem] sm:mt-10">
                    <d.Glyph />
                  </span>
                  <span className="mt-8 block text-2xl font-medium tracking-tight text-ink sm:text-[2rem]">
                    {d.title}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] font-medium text-ink-2">{d.subtitle}</span>
                  <span className="mt-4 block flex-1 text-[0.9375rem] leading-relaxed text-muted">{d.body}</span>
                  <KeywordLine items={d.keywords} className="mt-6" />
                  <span className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-ink">
                    {d.cta}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
            {/* Division 03 spans the full grid from md; text left, HUMS visual right. On phones it
                stacks like the other cards (visual on top, small). External: opens uflight.in. */}
            <li className="md:col-span-2">
              {/* Two destinations, so the card is not itself a link (links cannot nest): the primary
                  CTA stretches over the whole card; the secondary CTA sits above it. */}
              <div className="card ticks group relative flex h-full flex-col p-6 transition-colors hover:border-line-strong has-[[data-card-link]:focus-visible]:outline-2 has-[[data-card-link]:focus-visible]:outline-offset-2 has-[[data-card-link]:focus-visible]:outline-[var(--focus)] sm:p-10">
                <span className="flex items-center justify-between font-mono text-xs text-subtle">
                  <span>{UFLIGHT.n}</span>
                  <span className="uppercase tracking-[0.12em]">Division</span>
                </span>
                <span className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-12 md:items-center md:gap-10">
                  <span className="block w-full max-w-[17rem] md:order-last md:col-span-5 md:max-w-[28rem] md:justify-self-end">
                    <UFlightGlyph />
                  </span>
                  <span className="flex flex-col md:col-span-7">
                    <span className="block text-2xl font-medium tracking-tight text-ink sm:text-[2rem]">{UFLIGHT.title}</span>
                    <span className="mt-2 block text-[0.9375rem] font-medium text-ink-2">{UFLIGHT.subtitle}</span>
                    <span className="mt-4 block max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{UFLIGHT.body}</span>
                    <KeywordLine items={UFLIGHT.keywords} className="mt-6" />
                    <span className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-1">
                      <a
                        href={UFLIGHT.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-card-link
                        data-ga-label="uflight"
                        {...gaAttrs("division_card_click", { cta_label: UFLIGHT.cta, division: "uflight" })}
                        className="group/uflight inline-flex min-h-11 items-center gap-2 font-medium text-ink after:absolute after:inset-0 focus-visible:outline-none"
                      >
                        {UFLIGHT.cta}
                        <ArrowUpRight className="transition-transform group-hover/uflight:-translate-y-0.5 group-hover/uflight:translate-x-0.5" />
                        <span className="sr-only">(opens the UFlight website in a new tab)</span>
                      </a>
                      <a
                        href={UFLIGHT.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ga-label="uflight_cybersecurity"
                        {...gaAttrs("division_card_click", { cta_label: UFLIGHT.secondary.cta, division: "uflight" })}
                        className="group/cyber relative z-10 inline-flex min-h-11 items-center gap-2 font-medium text-ink"
                      >
                        {UFLIGHT.secondary.cta}
                        <ArrowUpRight className="transition-transform group-hover/cyber:-translate-y-0.5 group-hover/cyber:translate-x-0.5" />
                        <span className="sr-only">(opens the UFlight cybersecurity and digital twin website in a new tab)</span>
                      </a>
                    </span>
                  </span>
                </span>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      {/* EV Society — secondary ecosystem initiative */}
      <section aria-labelledby="ev-title" className="border-t border-line py-14 sm:py-16" data-ga-section="ev_society">
        <Container className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow mb-3">Ecosystem initiative</p>
            <h2 id="ev-title" className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
              EV Society™ Initiatives
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
              Supporting engineering education, research, innovation and industry collaboration across mobility,
              aerospace, defence and advanced engineering ecosystems.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <SmartLink
              href={EXTERNAL.evSociety}
              label="Explore EV Society"
              ga={{ event: "partner_click", params: { partner_name: "EV Society", destination: EXTERNAL.evSociety } }}
              className="link-arrow"
            >
              <span>Explore EV Society™</span>
              <ArrowUpRight className="arrow" />
            </SmartLink>
          </div>
        </Container>
      </section>
    </>
  );
}
