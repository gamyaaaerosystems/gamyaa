import { CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import type { Status } from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Research & Product Development | Gamyaa AeroSystems",
  description:
    "Research at Gamyaa AeroSystems: engineering drawing understanding, characteristic extraction, quality evidence graphs, certification requirements modelling, human-in-the-loop AI assurance and engineering data security.",
  href: aero("/research"),
});

const AREAS: Array<{ title: string; body: string; status: Status }> = [
  {
    title: "Engineering drawing understanding",
    body: "Recognising dimensions, GD&T, datums, notes and title-block data on aerospace drawings, with engineer verification of every result.",
    status: "in-development",
  },
  {
    title: "Characteristic extraction & ballooning",
    body: "Producing complete, revision-aware characteristic lists suitable for First Article Inspection.",
    status: "in-development",
  },
  {
    title: "Quality evidence graphs",
    body: "Data models linking requirement, method, measurement, evidence and approval with provenance.",
    status: "in-development",
  },
  {
    title: "Certification requirements modelling",
    body: "Structuring certification bases, compliance matrices and means of compliance for airworthiness programmes.",
    status: "research",
  },
  {
    title: "Human-in-the-loop AI assurance",
    body: "Methods for making AI assistance visible, reviewable and auditable in safety-relevant engineering work.",
    status: "research",
  },
  {
    title: "Engineering data security",
    body: "Access control, audit trails and evidence integrity for sensitive aerospace and defence engineering data.",
    status: "research",
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
        title="Research & Product Development"
        lede="Our product work starts with research into real aerospace and defence quality and certification problems, much of it carried out with engineering interns and collaborators."
      >
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink
            href={EXTERNAL.daqipResearch}
            ga={{ event: "daqip_research_click" }}
            label="DAQIP research programme"
          >
            DAQIP research programme
          </ButtonLink>
          <ButtonLink
            href={EXTERNAL.internships}
            variant="secondary"
            ga={{ event: "internship_outbound_click" }}
            label="Engineering internships"
          >
            Engineering internships
          </ButtonLink>
        </div>
      </PageHero>

      <Section labelledBy="areas-title" section="research_areas">
        <Container>
          <SectionHeader eyebrow="Research areas" id="areas-title" title="What we are working on" />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <li key={a.title} className="bg-surface p-6 sm:p-7">
                <StatusBadge status={a.status} />
                <h3 className="mt-5 text-lg font-medium leading-snug text-ink">{a.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{a.body}</p>
              </li>
            ))}
          </ul>
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
        title="Collaborate on aerospace quality research"
        body="We work with engineers, researchers and students on applied problems."
        primary={{ label: "Explore Internships", href: EXTERNAL.internships, ga: { event: "internship_outbound_click" } }}
      />
    </>
  );
}
