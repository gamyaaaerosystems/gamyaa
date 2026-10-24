import { ContactDetails } from "@/components/contact/contact-details";
import { Timeline } from "@/components/diagrams/timeline";
import {
  CtaBand,
  EngineeringInitiatives,
  internalContact,
  LeadershipSection,
  PageHero,
  PartnersSection,
} from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, Container, JsonLd, Section, SectionHeader } from "@/components/ui/primitives";
import { LEADERSHIP } from "@/content/company";
import { pageMetadata, personLd } from "@/lib/seo";
import { aero, PARENT_HOME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Gamyaa AeroSystems | Engineering Assurance Intelligence for Defence, Aerospace & Space",
  description:
    "Gamyaa AeroSystems builds Engineering Assurance Intelligence for defence, aerospace and space: AEAIP™, DAQIP™ and AirCert AI™, from engineering requirement to verified evidence and readiness decision. Bangalore, India.",
  href: aero("/about"),
});

const PRINCIPLES = [
  ["Engineering clarity", "over visual effects."],
  ["Evidence", "over marketing claims."],
  ["Visual restraint", "over content volume."],
  ["Human engineering authority", "over AI automation."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personLd(LEADERSHIP.map((p) => ({ name: p.name, role: p.role, linkedin: p.linkedinPlaceholder ? undefined : p.linkedin })))} />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "About", href: aero("/about") },
            ]}
          />
        }
        eyebrow="Company"
        title="About Gamyaa AeroSystems"
        lede="Gamyaa AeroSystems builds Engineering Assurance Intelligence for defence, aerospace and space: technology that connects engineering requirements, configuration, evidence, verification and readiness decisions."
      />

      <Section labelledBy="mission-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Mission"
              id="mission-title"
              title="From engineering requirement to verified evidence and readiness decision"
            />
          </div>
          <div className="space-y-8 lg:col-span-6">
            <div>
              <h3 className="eyebrow">Focus</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                AEAIP™, our flagship, is in research and architecture with satellites and spacecraft as its first
                engineering focus. DAQIP™ serves aerospace and defence manufacturers, MSMEs and their supply chains with
                First Article Inspection, inspection and manufacturing-quality evidence. AirCert AI™ is planned for
                airworthiness certification engineering.
              </p>
            </div>
            <div>
              <h3 className="eyebrow">Company</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                Gamyaa AeroSystems is part of{" "}
                <a href={PARENT_HOME} className="text-accent underline">
                  GAMYAA
                </a>{" "}
                and is based in Bangalore, India. Registration as Gamyaa AeroSystems Private Limited is planned and not
                yet complete.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section labelledBy="philosophy-title" className="bg-surface-accent">
        <Container>
          <SectionHeader eyebrow="Engineering philosophy" id="philosophy-title" title="How we decide" />
          <ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([a, b]) => (
              <li key={a} className="bg-surface p-6">
                <p className="text-lg font-medium text-ink">{a}</p>
                <p className="mt-1 text-[0.9375rem] text-muted">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl font-mono text-sm leading-relaxed text-ink-2">
            AI assists. Engineers verify. Authorized authorities approve. The platform preserves the evidence.
          </p>
        </Container>
      </Section>

      <Section labelledBy="timeline-title" section="timeline">
        <Container>
          <SectionHeader
            eyebrow="Evolution"
            id="timeline-title"
            title="From a quality problem to Engineering Assurance Intelligence"
            lede="The strategy was not fixed from the start. It converged as we learned: from FAI and inspection problems, to DAQIP, to certification, to one assurance architecture."
          />
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </Section>

      <LeadershipSection id="leadership" />
      <EngineeringInitiatives />
      <PartnersSection />

      <Section labelledBy="about-contact-title" section="about_contact">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="Contact" id="about-contact-title" title="Talk to the team" />
            <ArrowLink href={aero("/careers")} className="mt-6">
              Careers at Gamyaa AeroSystems
            </ArrowLink>
          </div>
          <div className="lg:col-span-6">
            <ContactDetails />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Working on aerospace, defence or space assurance?"
        primary={{ label: "Talk to Gamyaa", href: internalContact(), ga: { event: "contact_sales_click" } }}
      />
    </>
  );
}
