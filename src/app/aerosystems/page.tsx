import { CoreModel, PlatformHierarchy } from "@/components/aeaip/diagrams";
import { GoDeeper, ReadinessRecordCard, WhatExistsToday } from "@/components/sections/aero";
import { CtaBand, internalContact, PartnersSection } from "@/components/sections/shared";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader, SmartLink } from "@/components/ui/primitives";
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

export default function AeroSystemsPage() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="relative overflow-hidden" data-ga-section="hero">
        <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
        <Container className="relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-7">
            <h1 className="anim-fade-up">
              {/* Brand line: larger than the market line below so the hierarchy reads brand → category → market. */}
              <span className="block text-xl font-medium tracking-tight text-ink-2 sm:text-2xl">Gamyaa AeroSystems</span>
              {/* One line on laptop and desktop screens; wraps naturally on phones. */}
              <span
                className="display anim-fade-up mt-4 block text-[2.5rem] text-ink sm:text-6xl lg:whitespace-nowrap lg:text-[3.4rem] xl:text-[4.25rem]"
                style={{ animationDelay: "60ms" }}
              >
                Engineering Intelligence
              </span>
            </h1>
            <p
              className="anim-fade-up mt-6 font-mono text-sm uppercase tracking-[0.2em] text-ink-2 sm:text-base"
              style={{ animationDelay: "120ms" }}
            >
              Defence <span aria-hidden className="text-steel">·</span> Aerospace{" "}
              <span aria-hidden className="text-steel">·</span> Space
            </p>
            <p className="lede anim-fade-up mt-6 max-w-2xl" style={{ animationDelay: "180ms" }}>
              {AEAIP.statement}
            </p>
            <div className="anim-fade-up mt-9 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: "240ms" }}>
              <ButtonLink
                href={AEAIP_HREF}
                ga={{ event: "aeaip_explore", params: { source_location: "aero_hero" } }}
                label="Explore AEAIP"
              >
                Explore AEAIP™
              </ButtonLink>
              <ButtonLink
                href={internalContact()}
                variant="secondary"
                ga={{ event: "contact_sales_click", params: { source_location: "aero_hero" } }}
                label="Talk to GAMYAA"
              >
                Talk to GAMYAA
              </ButtonLink>
            </div>
          </div>
          <div className="anim-fade-up lg:col-span-5" style={{ animationDelay: "200ms" }}>
            <div className="mx-auto max-w-md lg:ml-auto">
              <ReadinessRecordCard />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Platforms */}
      <Section id="products" labelledBy="products-title" section="platforms">
        <Container>
          <SectionHeader
            eyebrow="Platforms"
            id="products-title"
            title="One assurance architecture, three platforms"
            lede="AEAIP™ is the flagship. DAQIP™ and AirCert AI™ provide manufacturing and certification depth inside it."
          />
          <div className="mt-12">
            <PlatformHierarchy location="platform_card" />
          </div>
        </Container>
      </Section>

      {/* 3 · Core engineering model */}
      <Section labelledBy="model-title" section="core_model">
        <Container>
          <SectionHeader
            eyebrow="Core engineering model"
            id="model-title"
            title="From engineering requirement to readiness decision"
            lede="Engineering Assurance Intelligence means knowing, at any moment, what is verified, on which configuration, by which evidence, and what still stands between the system and its next gate."
          />
          <div className="mt-10">
            <CoreModel />
          </div>
          <ArrowLink
            href={AEAIP_HREF}
            className="mt-6"
            ga={{ event: "aeaip_explore", params: { source_location: "core_model" } }}
            label="Understand the AEAIP architecture"
          >
            Understand the AEAIP architecture
          </ArrowLink>
        </Container>
      </Section>

      {/* 4 · Who we serve */}
      <Section labelledBy="audience-title" section="audiences">
        <Container>
          <SectionHeader eyebrow="Who we serve" id="audience-title" title="For the people accountable for readiness" />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <li key={a.title} className="bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-lg font-medium leading-snug text-ink">{a.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5 · Trust principles */}
      <Section labelledBy="trust-title" section="trust_principles" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Trust principles" id="trust-title" title={AEAIP.governance} />
          </div>
          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {TRUST_PRINCIPLES.map((p) => (
              <li key={p.title} className="bg-surface p-5 sm:p-6">
                <h3 className="font-medium text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6 · What exists today */}
      <Section id="today" labelledBy="today-title" section="what_exists_today">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow={`What exists today · ${STATUS_AS_OF}`}
              id="today-title"
              title="Honest status, platform by platform"
              lede="No platform is generally available yet. The interactive demonstrations use fictitious data, and every capability carries its real status."
            />
          </div>
          <div className="lg:col-span-8">
            <WhatExistsToday />
          </div>
        </Container>
      </Section>

      {/* Go deeper: content moved off this page */}
      <Section labelledBy="deeper-title" section="go_deeper">
        <Container>
          <h2 id="deeper-title" className="eyebrow">
            Go deeper
          </h2>
          <div className="mt-6">
            <GoDeeper />
          </div>
        </Container>
      </Section>

      {/* 7 · Partners & ecosystem (verified relationships only) */}
      <PartnersSection />

      {/* 8 · CTA */}
      <CtaBand
        title="Start with one readiness question."
        body="Tell us about the review, test or acceptance decision your team is preparing for. We will be candid about what exists today."
        actions={
          <>
            <ButtonLink
              href={AEAIP_HREF}
              ga={{ event: "aeaip_explore", params: { source_location: "aero_cta" } }}
              label="Explore AEAIP"
            >
              Explore AEAIP™
            </ButtonLink>
            <ButtonLink
              href={internalContact("assurance-problem")}
              variant="secondary"
              ga={{ event: "contact_sales_click", params: { source_location: "aero_cta" } }}
              label="Discuss an Engineering Assurance Problem"
            >
              Discuss an Engineering Assurance Problem
            </ButtonLink>
            <SmartLink
              href={internalContact("strategic-partnership")}
              ga={{ event: "aeaip_partner_interest", params: { source_location: "aero_cta" } }}
              label="Strategic Partnership"
              className="link-arrow px-1"
            >
              <span>Strategic Partnership</span>
              <ArrowRight className="arrow" />
            </SmartLink>
          </>
        }
      />
    </>
  );
}
