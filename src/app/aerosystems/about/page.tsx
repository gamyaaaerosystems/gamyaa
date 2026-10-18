import { ContactDetails } from "@/components/contact/contact-details";
import { Timeline } from "@/components/diagrams/timeline";
import {
  CtaBand,
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
  title: "About Gamyaa AeroSystems | Engineering Assurance for Aerospace & Defence",
  description:
    "Gamyaa AeroSystems builds engineering intelligence technologies for defence and aerospace design assurance, manufacturing quality, inspection, airworthiness and engineering evidence. Bangalore, India.",
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
      <JsonLd data={personLd(LEADERSHIP.map((p) => ({ name: p.name, role: p.role, linkedin: p.linkedin })))} />
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
        lede="Gamyaa AeroSystems builds engineering intelligence technologies for defence and aerospace design assurance, manufacturing quality, inspection, airworthiness and engineering evidence."
      />

      <Section labelledBy="mission-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="Mission" id="mission-title" title="Trusted engineering evidence, from requirement to approval" />
          </div>
          <div className="space-y-8 lg:col-span-6">
            <div>
              <h3 className="eyebrow">Focus</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                Aerospace and defence manufacturers and MSMEs in India and their supply chains: First Article
                Inspection, inspection, manufacturing and supplier quality, and airworthiness certification
                engineering.
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
            AI assists. Engineers verify. Quality approves. The platform preserves the evidence.
          </p>
        </Container>
      </Section>

      <Section labelledBy="timeline-title" section="timeline">
        <Container>
          <SectionHeader eyebrow="Evolution" id="timeline-title" title="From Idea to Aerospace Engineering Intelligence" />
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </Section>

      <LeadershipSection id="leadership" />
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
        title="Working on aerospace or defence quality?"
        primary={{ label: "Talk to Gamyaa", href: internalContact(), ga: { event: "contact_sales_click" } }}
      />
    </>
  );
}
