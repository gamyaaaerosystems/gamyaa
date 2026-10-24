import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  ArrowLink,
  BulletList,
  ButtonLink,
  Container,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui/primitives";
import type { Status } from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering Research & Product Development | Gamyaa AeroSystems",
  description:
    "Product R&D at Gamyaa AeroSystems: AEAIP™ engineering assurance, configuration-aware evidence validity, spacecraft review readiness, FAI automation, drawing intelligence, certification evidence and aerospace cybersecurity.",
  href: aero("/research"),
});

const AREAS: Array<{ title: string; body: string; status: Status; feeds: string }> = [
  {
    title: "Engineering Evidence Graph™",
    body: "A node and relationship model connecting requirements, configuration, verification evidence, issues and approvals, starting with satellites and spacecraft.",
    status: "architecture",
    feeds: "AEAIP™",
  },
  {
    title: "Configuration-aware evidence validity",
    body: "Determining whether verification evidence still applies to the requirement baseline and configuration under review.",
    status: "research",
    feeds: "AEAIP™",
  },
  {
    title: "Review-gate readiness",
    body: "Configurable review gates, their criteria and the evidence each needs, for spacecraft lifecycles first.",
    status: "research",
    feeds: "AEAIP™",
  },
  {
    title: "FAI automation",
    body: "Reducing the manual effort between a drawing and a reviewed First Article Inspection Report, from ballooning to AS9102 forms.",
    status: "in-development",
    feeds: "DAQIP™",
  },
  {
    title: "Drawing intelligence",
    body: "Recognising dimensions, GD&T, datums, notes and title-block data on aerospace drawings, with engineer verification of every result.",
    status: "in-development",
    feeds: "DAQIP™",
  },
  {
    title: "Manufacturing-quality intelligence",
    body: "Data models linking requirement, method, measurement, evidence and approval across in-process and final inspection.",
    status: "in-development",
    feeds: "DAQIP™",
  },
  {
    title: "Cross-domain engineering assurance",
    body: "Connecting design and certification requirements to manufacturing characteristics and their evidence.",
    status: "research",
    feeds: "AEAIP™ with DAQIP™ + AirCert AI™",
  },
  {
    title: "Airworthiness",
    body: "Structuring certification bases, applicable requirements and means of compliance for airworthiness programmes.",
    status: "research",
    feeds: "AirCert AI™",
  },
  {
    title: "Certification evidence",
    body: "Evidence graphs, completeness checks and authority comment tracking, with AI assistance that stays reviewable and auditable.",
    status: "research",
    feeds: "AirCert AI™",
  },
  {
    title: "Aerospace cybersecurity",
    body: "Access control, audit trails and evidence integrity for sensitive aerospace and defence engineering data and connected systems.",
    status: "research",
    feeds: "AEAIP™ cybersecurity assurance",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Research", href: aero("/research") },
            ]}
          />
        }
        eyebrow="Product R&D"
        title="Engineering Research & Product Development"
        lede="Our research exists to build products. Each area below feeds a specific AEAIP™, DAQIP™ or AirCert AI™ capability and carries its current status."
      >
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink
            href={EXTERNAL.daqipResearch}
            ga={{ event: "daqip_research_click" }}
            label="DAQIP research programme"
          >
            DAQIP research programme
          </ButtonLink>
          <ButtonLink href={`${aero("/products")}#roadmap`} variant="secondary" label="View Product Roadmap">
            View Product Roadmap
          </ButtonLink>
        </div>
      </PageHero>

      <Section labelledBy="areas-title" section="research_areas">
        <Container>
          <SectionHeader eyebrow="Focus areas" id="areas-title" title="What we are building towards" />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <li key={a.title} className="flex flex-col bg-surface p-6 sm:p-7">
                <StatusBadge status={a.status} className="self-start" />
                <h3 className="mt-5 text-lg font-medium leading-snug text-ink">{a.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{a.body}</p>
                <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                  Feeds into · <span className="text-accent">{a.feeds}</span>
                </p>
              </li>
            ))}
            {/* Fillers keep the hairline grid rectangular: 10 areas = 3 rows of 3 + 1 on large screens. */}
            <li className="hidden bg-surface lg:block" aria-hidden />
            <li className="hidden bg-surface lg:block" aria-hidden />
          </ul>
        </Container>
      </Section>

      <Section id="workflow-validation" labelledBy="validation-title" section="workflow_validation">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Problem analysis · 2025"
              id="validation-title"
              title="Engineering Workflow Validation"
              lede="Before building DAQIP, we studied how aerospace and defence MSMEs run First Article Inspection, inspection, manufacturing quality and engineering documentation."
            />
          </div>
          <div className="space-y-8 lg:col-span-7">
            <div>
              <h3 className="eyebrow">What we examined</h3>
              <BulletList
                className="mt-4 text-base"
                items={[
                  "FAI preparation: drawing ballooning, characteristic lists and AS9102 forms",
                  "Inspection records, gauges, CMM output and measurement evidence",
                  "Manufacturing quality records, from in-process checks to release",
                  "Engineering documentation, drawing revisions and approvals",
                ]}
              />
            </div>
            <div>
              <h3 className="eyebrow">Recurring problems</h3>
              <BulletList
                className="mt-4 text-base"
                items={[
                  "FAI takes too long: manual ballooning and spreadsheet-based characteristics",
                  "Inspection evidence is disconnected across drawings, measurements, revisions and approvals",
                  "Certification documentation is hard to coordinate across requirements, tests and approvals",
                ]}
              />
            </div>
            <p className="text-sm text-muted">
              These findings shaped the DAQIP roadmap. We do not publish customer names or data from this work.
            </p>
            <ArrowLink href={aero("/aeaip")}>How this work grew into AEAIP™</ArrowLink>
          </div>
        </Container>
      </Section>

      <Section labelledBy="cyber-title" section="research_cyber">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="cyber-title" className="heading text-2xl text-ink sm:text-3xl">
              Aerospace Cybersecurity
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Engineering cybersecurity for connected aerospace systems, avionics, telemetry, embedded systems and
              digital engineering environments.
            </p>
          </div>
          <div className="lg:col-span-6 lg:self-end lg:text-right">
            <ArrowLink href={EXTERNAL.aerospaceCybersecurity} ga={{ event: "aerospace_cybersecurity_click" }} label="Explore Aerospace Cybersecurity">
              Explore Aerospace Cybersecurity
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Working on one of these problems?"
        body="We would like to understand how your team handles FAI, inspection or certification evidence today."
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
