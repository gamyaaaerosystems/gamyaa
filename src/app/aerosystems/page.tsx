import { MaturityChips } from "@/components/sections/aero";
import { CtaBand, internalContact } from "@/components/sections/shared";
import { AssuranceFlow } from "@/components/system/assurance-flow";
import { FlagshipPlatform, SpecializedPlatforms } from "@/components/system/platforms";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { AEAIP, AEAIP_HREF, AUDIENCES, TRUST_PRINCIPLES } from "@/content/aeaip";
import { STATUS_AS_OF } from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Gamyaa AeroSystems | Engineering Assurance Intelligence — Defence · Aerospace · Space",
  description:
    "Gamyaa AeroSystems builds Engineering Assurance Intelligence: AEAIP™ connects requirement, configuration, evidence, verification and readiness, with DAQIP™ for manufacturing and AirCert AI™ for certification assurance.",
  href: aero("/"),
});

/**
 * AeroSystems landing page: who GAMYAA is, what AEAIP is, how DAQIP and AirCert fit,
 * who it is for, what exists today, and how to engage. Everything deeper lives on
 * child pages.
 */
export default function AeroSystemsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" data-ga-section="hero">
        <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
        <Container className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-7">
            <h1 className="anim-fade-up">
              <span className="block text-lg font-medium tracking-tight text-ink-2 sm:text-xl">Gamyaa AeroSystems</span>
              <span className="display mt-5 block text-[2.75rem] text-ink sm:text-6xl lg:text-[4.25rem]">
                {AEAIP.category}
              </span>
            </h1>
            <p
              className="anim-fade-up mt-7 font-mono text-sm uppercase tracking-[0.22em] text-ink-2 sm:text-base"
              style={{ animationDelay: "80ms" }}
            >
              Defence <span aria-hidden className="text-steel">·</span> Aerospace{" "}
              <span aria-hidden className="text-steel">·</span> Space
            </p>
            <p className="lede anim-fade-up mt-6 max-w-xl" style={{ animationDelay: "140ms" }}>
              {AEAIP.statement}
            </p>
            <div className="anim-fade-up mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ animationDelay: "200ms" }}>
              <ButtonLink
                href={AEAIP_HREF}
                ga={{ event: "aeaip_explore", params: { source_location: "aero_hero" } }}
                label="Explore AEAIP"
              >
                Explore AEAIP™
              </ButtonLink>
              <ButtonLink
                href={internalContact("assurance-problem")}
                variant="secondary"
                ga={{ event: "contact_sales_click", params: { source_location: "aero_hero" } }}
                label="Discuss an Engineering Assurance Problem"
              >
                Discuss an Engineering Assurance Problem
              </ButtonLink>
            </div>
          </div>
          <div className="anim-fade-up lg:col-span-5" style={{ animationDelay: "160ms" }}>
            <AssuranceFlow className="mx-auto max-w-md lg:ml-auto" />
          </div>
        </Container>
      </section>

      {/* Flagship platform (includes "How AEAIP thinks") */}
      <Section id="products" labelledBy="platform-aeaip-name" section="platform_flagship">
        <Container>
          <FlagshipPlatform location="platform_card" />
        </Container>
      </Section>

      {/* Specialized platforms, visibly inside AEAIP */}
      <Section labelledBy="specialized-title" section="platform_specialized" className="pt-0 md:pt-0">
        <Container>
          <SpecializedPlatforms location="platform_card" />
        </Container>
      </Section>

      {/* Who it is for */}
      <Section labelledBy="audience-title" section="audiences" className="bg-surface-accent">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Who it is for" id="audience-title" title="For the people accountable for readiness" />
          </div>
          <dl className="lg:col-span-8">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[14rem_1fr] sm:items-baseline sm:gap-6">
                <dt className="text-sm font-medium text-muted">{a.title}</dt>
                <dd className="text-xl tracking-tight text-ink sm:text-2xl">{a.question}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* What exists today */}
      <Section id="today" labelledBy="today-title" section="what_exists_today">
        <Container>
          <SectionHeader
            eyebrow={`What exists today · ${STATUS_AS_OF}`}
            id="today-title"
            title="Honest status, at a glance"
          />
          <div className="mt-10">
            <MaturityChips />
          </div>
          <ArrowLink href={`${aero("/products")}#status`} className="mt-8" label="View product status">
            View product status
          </ArrowLink>
        </Container>
      </Section>

      {/* Trust principles */}
      <Section labelledBy="trust-title" section="trust_principles" className="pt-0 md:pt-0">
        <Container>
          <h2 id="trust-title" className="kicker">
            Trust principles
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {TRUST_PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t border-line-strong pt-4">
                <h3 className="text-lg font-medium leading-snug text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Bring us a real readiness problem."
        body="Tell us about the review, test or acceptance decision your team is preparing for. We will be candid about what exists today."
        actions={
          <>
            <ButtonLink
              href={internalContact("assurance-problem")}
              ga={{ event: "contact_sales_click", params: { source_location: "aero_cta" } }}
              label="Discuss Engineering Assurance"
            >
              Discuss Engineering Assurance
            </ButtonLink>
            <ButtonLink
              href={internalContact("strategic-partnership")}
              variant="secondary"
              ga={{ event: "aeaip_partner_interest", params: { source_location: "aero_cta" } }}
              label="Explore Strategic Partnership"
            >
              Explore Strategic Partnership
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
