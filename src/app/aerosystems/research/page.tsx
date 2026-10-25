import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, BulletList, ButtonLink, Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import type { Status } from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering Assurance Research | Gamyaa AeroSystems",
  description:
    "Engineering assurance research at Gamyaa AeroSystems: evidence graph, verification, configuration, review readiness, manufacturing, certification and cross-cutting assurance, each with its maturity.",
  href: aero("/research"),
});

type Area = { code: string; title: string; question: string; status: Status; href?: string; link?: string };

/** Three tracks. Statuses mirror AEAIP_CAPABILITIES and PRODUCT_STATUS; change them there first. */
const TRACKS: Array<{ key: string; title: string; summary: string; areas: Area[] }> = [
  {
    key: "core",
    title: "Assurance Core",
    summary: "The model every specialization builds on: evidence, verification, configuration and readiness.",
    areas: [
      {
        code: "A1",
        title: "Engineering Evidence Graph™",
        question: "How should requirements, configuration items, evidence, issues and approvals be modelled so that every readiness claim can be traced?",
        status: "architecture",
        href: aero("/aeaip/engineering-evidence-graph"),
        link: "Engineering Evidence Graph",
      },
      {
        code: "A2",
        title: "Verification Intelligence",
        question: "Can coverage, gaps and the fit of each verification method be derived from the evidence rather than compiled by hand?",
        status: "research",
        href: aero("/aeaip/verification-validation"),
        link: "Verification & Validation",
      },
      {
        code: "A3",
        title: "Configuration Assurance",
        question: "When does evidence stop applying to the configuration under review, and how is that detected early?",
        status: "research",
        href: aero("/aeaip/configuration-assurance"),
        link: "Configuration Assurance",
      },
      {
        code: "A4",
        title: "Review Readiness",
        question: "What does each review gate need, and how can readiness be explained item by item rather than as a score?",
        status: "architecture",
        href: aero("/aeaip/review-gates"),
        link: "Review Gates",
      },
    ],
  },
  {
    key: "specialized",
    title: "Specialized Assurance",
    summary: "The core applied to manufacturing and certification evidence.",
    areas: [
      {
        code: "B1",
        title: "Manufacturing assurance · DAQIP™",
        question: "Drawing intelligence, FAI automation and inspection evidence: from a dense drawing to an approved, traceable FAIR.",
        status: "in-development",
        href: aero("/daqip"),
        link: "DAQIP™",
      },
      {
        code: "B2",
        title: "Certification assurance · AirCert AI™",
        question: "Certification basis, means of compliance and certification evidence, with AI assistance that stays reviewable and auditable.",
        status: "research",
        href: aero("/aircert-ai"),
        link: "AirCert AI™",
      },
    ],
  },
  {
    key: "cross",
    title: "Cross-Cutting Research",
    summary: "Questions that run across every domain and every review gate.",
    areas: [
      {
        code: "C1",
        title: "Cybersecurity assurance",
        question: "Security requirements, findings and retest evidence held in the same model as engineering evidence.",
        status: "research",
        href: aero("/aeaip/cybersecurity-assurance"),
        link: "Cybersecurity Assurance",
      },
      {
        code: "C2",
        title: "Software assurance",
        question: "Software requirements, builds, tests and anomalies traced with the same configuration discipline as hardware.",
        status: "concept",
      },
      {
        code: "C3",
        title: "Continuous assurance",
        question: "Change impact, suspect evidence and reverification, propagated through the graph as the design evolves.",
        status: "concept",
        href: aero("/aeaip/continuous-assurance"),
        link: "Continuous Assurance",
      },
      {
        code: "C4",
        title: "Operational evidence",
        question: "Linking predicted, tested and flown performance back to the requirements they inform.",
        status: "concept",
        href: aero("/aeaip/operational-evidence"),
        link: "Operational Evidence",
      },
      {
        code: "C5",
        title: "Predictive assurance",
        question: "Recognising risk patterns and likely verification problems before they reach a review gate.",
        status: "vision",
        href: `${aero("/aeaip/strategy")}#roadmap`,
        link: "Strategy roadmap",
      },
    ],
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
        eyebrow="Research"
        title="Engineering Assurance Research"
        lede="Our research exists to build products. Each area is a concrete engineering question with its current maturity stated."
      >
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={EXTERNAL.daqipResearch} ga={{ event: "daqip_research_click" }} label="DAQIP research programme">
            DAQIP research programme
          </ButtonLink>
          <ButtonLink href={`${aero("/aeaip/strategy")}#roadmap`} variant="secondary" label="AEAIP roadmap">
            AEAIP™ roadmap
          </ButtonLink>
        </div>
      </PageHero>

      <div data-ga-section="research_areas">
        {TRACKS.map((t, ti) => (
          <Section key={t.key} labelledBy={`track-${t.key}`} className="pt-0 md:pt-0">
            <Container className="grid gap-8 border-t border-line-strong pt-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-subtle">Track {String.fromCharCode(65 + ti)}</p>
                <h2 id={`track-${t.key}`} className="heading mt-2 text-2xl text-ink sm:text-[1.75rem]">
                  {t.title}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{t.summary}</p>
              </div>
              <ol className="border-b border-line lg:col-span-8">
                {t.areas.map((a) => (
                  <li key={a.code} className="grid gap-x-6 gap-y-2 border-t border-line py-5 first:border-t-0 sm:grid-cols-[3rem_1fr_auto] lg:first:border-t">
                    <span className="font-mono text-sm text-subtle">{a.code}</span>
                    <div>
                      <h3 className="text-[1.0625rem] font-medium text-ink">{a.title}</h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{a.question}</p>
                      {a.href ? (
                        <ArrowLink href={a.href} className="mt-1 text-sm">
                          {a.link}
                        </ArrowLink>
                      ) : null}
                    </div>
                    <span className="sm:pt-0.5">
                      <StatusBadge status={a.status} />
                    </span>
                  </li>
                ))}
              </ol>
            </Container>
          </Section>
        ))}
      </div>

      <Section id="workflow-validation" labelledBy="validation-title" section="workflow_validation" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Where it started · 2025"
              id="validation-title"
              title="Engineering workflow validation"
              lede="Before building DAQIP, we studied how aerospace and defence MSMEs run First Article Inspection, inspection, manufacturing quality and engineering documentation."
            />
          </div>
          <div className="lg:col-span-7">
            <h3 className="kicker mb-4">Recurring problems we found</h3>
            <BulletList
              className="text-base"
              items={[
                "FAI takes too long: manual ballooning and spreadsheet-based characteristics",
                "Inspection evidence is disconnected across drawings, measurements, revisions and approvals",
                "Certification documentation is hard to coordinate across requirements, tests and approvals",
              ]}
            />
            <p className="mt-6 text-sm text-muted">
              These findings shaped DAQIP and, later, the AEAIP™ architecture. We do not publish customer names or data
              from this work.
            </p>
            <ArrowLink href={EXTERNAL.aerospaceCybersecurity} ga={{ event: "aerospace_cybersecurity_click" }} label="Explore Aerospace Cybersecurity" className="mt-6">
              Aerospace Cybersecurity
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Working on one of these questions?"
        body="We would like to understand how your team handles verification, configuration, FAI or certification evidence today."
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
