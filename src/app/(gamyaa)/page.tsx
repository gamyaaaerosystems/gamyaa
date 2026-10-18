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
    "GAMYAA builds and supports engineering technologies across aerospace, defence, space, manufacturing intelligence and deep tech.",
  href: parent("/"),
});

function AeroGlyph() {
  // Characteristic → evidence trace, drawn as a fine technical line.
  return (
    <svg viewBox="0 0 240 120" aria-hidden className="h-auto w-full text-line-strong" fill="none">
      <circle cx="40" cy="60" r="22" stroke="currentColor" />
      <circle cx="40" cy="60" r="9" stroke="currentColor" />
      <path d="M8 60h64M40 28v64" stroke="currentColor" strokeDasharray="6 2 1 2" />
      <path d="M62 60h40l14-22h38l14 22h44" stroke="var(--accent)" strokeWidth="1.2" className="anim-draw" style={{ ["--gx-len" as string]: 200 }} />
      {[102, 116, 154, 168, 212].map((x, i) => (
        <circle key={x} cx={x} cy={i === 1 || i === 2 ? 38 : 60} r="2.5" fill="var(--bg)" stroke="var(--accent)" />
      ))}
      <rect x="212" y="48" width="24" height="24" stroke="currentColor" />
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

const DIVISIONS = [
  {
    n: "01",
    title: "Gamyaa AeroSystems",
    subtitle: "Aerospace & Defence Engineering Technology",
    body: "Engineering intelligence for aerospace and defence assurance, manufacturing and inspection.",
    keywords: ["Quality", "Airworthiness", "Inspection", "Manufacturing", "AI"],
    cta: "Explore AeroSystems",
    href: aero("/"),
    event: "view_aerosystems" as const,
    Glyph: AeroGlyph,
  },
  {
    n: "02",
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
            Engineering intelligence platforms and strategic ventures for aerospace, defence, space and advanced
            manufacturing.
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
                  {...gaAttrs(d.event, { cta_label: d.cta, destination: d.href })}
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
