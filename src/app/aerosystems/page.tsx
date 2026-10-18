import Link from "next/link";
import { IntegrationDiagram, LifecycleDiagram } from "@/components/diagrams/flow";
import { Timeline } from "@/components/diagrams/timeline";
import { EngineeringEvidence, EvidenceRecordCard, ProblemsList, ProductCards } from "@/components/sections/aero";
import {
  CommercialCtas,
  CtaBand,
  EngineeringInitiatives,
  internalContact,
  LeadershipSection,
  PartnersSection,
} from "@/components/sections/shared";
import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink, Container, KeywordLine, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { AUDIENCES } from "@/content/company";
import { SOLUTIONS } from "@/content/solutions";
import { ENGINEERING_ASSURANCE_DEFINITION, pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Gamyaa AeroSystems | Aerospace & Defence Engineering Technology",
  description:
    "Gamyaa AeroSystems builds engineering intelligence platforms for aerospace and defence quality, airworthiness, inspection, manufacturing and engineering evidence.",
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
            <p className="eyebrow anim-fade-up">Engineering Assurance Intelligence for Aerospace &amp; Defence</p>
            <h1
              className="display anim-fade-up mt-6 text-[2.5rem] text-ink sm:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: "60ms" }}
            >
              Gamyaa AeroSystems
            </h1>
            <p
              className="heading anim-fade-up mt-5 text-2xl text-ink-2 sm:text-3xl lg:text-[2.125rem]"
              style={{ animationDelay: "120ms" }}
            >
              Intelligence for Aerospace &amp; Defence Manufacturing
            </p>
            <p className="lede anim-fade-up mt-6 max-w-2xl" style={{ animationDelay: "180ms" }}>
              Engineering technology connecting design intent, airworthiness, manufacturing, inspection, quality
              evidence and approval.
            </p>
            <div className="anim-fade-up mt-9 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: "240ms" }}>
              <ButtonLink href="#products" label="Explore Products">
                Explore Products
              </ButtonLink>
              <ButtonLink
                href={internalContact()}
                variant="secondary"
                ga={{ event: "contact_sales_click" }}
                label="Talk to Gamyaa"
              >
                Talk to Gamyaa
              </ButtonLink>
            </div>
            <KeywordLine
              className="mt-10"
              items={["Aerospace", "Defence", "Quality", "Airworthiness", "Inspection", "Manufacturing Intelligence"]}
            />
          </div>
          <div className="anim-fade-up lg:col-span-5" style={{ animationDelay: "200ms" }}>
            <div className="mx-auto max-w-md lg:ml-auto">
              <EvidenceRecordCard />
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · Engineering Intelligence Platforms */}
      <Section id="products" labelledBy="products-title" section="products">
        <Container>
          <SectionHeader eyebrow="Products" id="products-title" title="Engineering Intelligence Platforms" />
          <div className="mt-12">
            <ProductCards />
          </div>
        </Container>
      </Section>

      {/* 3 · Engineering lifecycle */}
      <Section labelledBy="lifecycle-title" section="lifecycle">
        <Container>
          <SectionHeader
            eyebrow="Engineering Assurance Intelligence"
            id="lifecycle-title"
            title="One lifecycle, from design intent to approval"
            lede={ENGINEERING_ASSURANCE_DEFINITION}
          />
          <div className="reveal mt-12">
            <LifecycleDiagram />
          </div>
        </Container>
      </Section>

      {/* 4 · Who we serve */}
      <Section labelledBy="audience-title" section="audiences">
        <Container>
          <SectionHeader eyebrow="Who we serve" id="audience-title" title="Built for the people who sign off the evidence" />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a, i) => (
              <li key={a.title} className="bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-lg font-medium leading-snug text-ink">{a.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5 · Engineering evidence */}
      <Section labelledBy="evidence-title" section="engineering_evidence">
        <Container>
          <SectionHeader
            eyebrow="What exists today"
            id="evidence-title"
            title="Engineering Evidence"
            lede="DAQIP is in development. Here is what you can examine now: an interactive prototype, the research behind it, the problem analysis that shaped it and an honest roadmap."
          />
          <div className="mt-12">
            <EngineeringEvidence />
          </div>
          <CommercialCtas location="engineering_evidence" className="mt-10" />
        </Container>
      </Section>

      {/* Lower priority ------------------------------------------------ */}

      <Section labelledBy="problems-title" section="problems">
        <Container>
          <SectionHeader eyebrow="Customer problems" id="problems-title" title="Problems We Are Solving" />
          <div className="mt-12">
            <ProblemsList />
          </div>
        </Container>
      </Section>

      <Section labelledBy="integration-title" section="integration">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="DAQIP™ + AirCert AI™"
              id="integration-title"
              title="Design → Certification → Manufacturing → Inspection → Evidence → Approval"
              lede={
                <>
                  <p>
                    AirCert AI covers design assurance and certification. DAQIP covers manufacturing assurance and
                    quality.
                  </p>
                  <p className="mt-4">
                    Connected, a certification requirement can be followed to the manufactured characteristic, the
                    measurement that verified it and the human review that accepted it.
                  </p>
                </>
              }
            />
            <p className="mt-6">
              <StatusBadge status="research" />{" "}
              <span className="ml-2 text-sm text-muted">Integration is on the roadmap.</span>
            </p>
          </div>
          <div className="reveal lg:col-span-7">
            <IntegrationDiagram />
          </div>
        </Container>
      </Section>

      <Section labelledBy="solutions-title" section="solutions">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Solutions"
              id="solutions-title"
              title="Solutions by workflow"
              lede="Start from the problem you have today."
            />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-8">
            {SOLUTIONS.map((s) => (
              <li key={s.slug}>
                <Link
                  href={aero(`/solutions/${s.slug}`)}
                  className="group flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4"
                >
                  <span className="text-lg text-ink transition-colors group-hover:text-accent">{s.label}</span>
                  <span className="flex items-center gap-4">
                    <StatusBadge status={s.status} />
                    <ArrowRight className="text-subtle transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="timeline-title" section="timeline">
        <Container>
          <SectionHeader
            eyebrow="Evolution"
            id="timeline-title"
            title="From Idea to Aerospace Engineering Intelligence"
            lede="2026 marks the transition from research and proof of concept to product and company."
          />
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </Section>

      <EngineeringInitiatives />
      <LeadershipSection />
      <PartnersSection />

      <CtaBand
        title="Start with one part and one inspection workflow."
        body="DAQIP is in development. Talk to us about piloting it on a real First Article Inspection or inspection workflow in your organisation."
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
