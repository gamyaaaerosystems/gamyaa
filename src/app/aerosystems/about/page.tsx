import { ContactDetails } from "@/components/contact/contact-details";
import { Timeline } from "@/components/diagrams/timeline";
import { CtaBand, internalContact, LeadershipSection, PageHero, PartnersSection } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, Container, JsonLd, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { LEADERSHIP } from "@/content/company";
import { PRODUCT_STATUS } from "@/content/status";
import { pageMetadata, personLd } from "@/lib/seo";
import { aero, EXTERNAL, PARENT_HOME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Gamyaa AeroSystems | Engineering Assurance Intelligence for Defence, Aerospace & Space",
  description:
    "Gamyaa AeroSystems develops Engineering Assurance Intelligence for critical defence, aerospace and space systems: AEAIP™, DAQIP™ and AirCert AI™. Why we exist, what we believe and what we are building. Bangalore, India.",
  href: aero("/about"),
});

const PRINCIPLES: Array<[string, string]> = [
  ["Evidence over marketing claims", "We show what exists, and say plainly what does not."],
  ["Human engineering authority", "AI assists. Engineers verify. Authorized authorities approve."],
  ["Configuration fidelity", "Evidence counts only for the configuration it was produced on."],
  ["Security", "Engineering data is sensitive by default; security is designed in from the start."],
  ["Status honesty", "Every capability carries its real status, from Research to Available."],
];

const PLATFORMS = [
  {
    n: "01",
    name: "AEAIP™",
    role: "Engineering Assurance Intelligence",
    line: "Requirement, configuration, evidence and verification, connected into readiness.",
    status: PRODUCT_STATUS.aeaip,
    href: aero("/aeaip"),
  },
  {
    n: "02",
    name: "DAQIP™",
    role: "Manufacturing Assurance Intelligence",
    line: "From the engineering drawing to approved inspection evidence.",
    status: PRODUCT_STATUS.daqip,
    href: aero("/daqip"),
  },
  {
    n: "03",
    name: "AirCert AI™",
    role: "Certification Assurance Intelligence",
    line: "From the certification basis to evidence ready for authority review.",
    status: PRODUCT_STATUS.aircert,
    href: aero("/aircert-ai"),
  },
] as const;

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
        lede="Gamyaa AeroSystems develops Engineering Assurance Intelligence for critical Defence, Aerospace and Space systems."
      />

      {/* Why we exist and the problem we chose */}
      <Section labelledBy="why-title" section="about_why" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Why we exist" id="why-title" title="The problem we chose" />
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">
              Critical systems are approved on evidence. In most programmes that evidence is spread across
              requirements tools, PLM, test reports, quality records and spreadsheets, and no one can easily see
              whether it still matches the configuration being reviewed.
            </p>
            <p className="lede mt-6">
              We chose to work on that problem. We started where it was most concrete, First Article Inspection and
              manufacturing quality, and followed the evidence upstream into certification and system verification.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section labelledBy="mission-title" section="about_mission" className="bg-surface-accent">
        <Container>
          <h2 id="mission-title" className="kicker">
            Mission
          </h2>
          <p className="heading mt-6 max-w-4xl text-[1.75rem] leading-tight text-ink sm:text-[2.5rem]">
            Transform fragmented requirements, configurations and engineering evidence into traceable,
            decision-ready assurance.
          </p>
        </Container>
      </Section>

      {/* Principles */}
      <Section labelledBy="principles-title" section="about_principles">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="What we believe" id="principles-title" title="Principles" />
          </div>
          <dl className="border-b border-line lg:col-span-8">
            {PRINCIPLES.map(([t, b]) => (
              <div key={t} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[16rem_1fr] sm:gap-8">
                <dt className="font-medium text-ink">{t}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-2">{b}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* What we are building, where we start, where we intend to go */}
      <Section labelledBy="building-title" section="about_building" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="What we are building" id="building-title" title="Three platforms, one assurance architecture" />
          </div>
          <div className="lg:col-span-8">
            <ul className="border-b border-line">
              {PLATFORMS.map((p) => (
                <li key={p.name} className="grid gap-3 border-t border-line py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                  <div>
                    <p className="font-mono text-xs text-subtle">Platform {p.n}</p>
                    <h3 className="mt-1 text-lg font-medium text-ink">{p.name}</h3>
                    <p className="mt-2">
                      <StatusBadge status={p.status} />
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">{p.role}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{p.line}</p>
                    <ArrowLink href={p.href} className="mt-2">
                      Explore {p.name}
                    </ArrowLink>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="kicker">Where we start</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  Satellites and spacecraft as the first engineering focus of AEAIP™; First Article Inspection for
                  DAQIP™.
                </dd>
              </div>
              <div>
                <dt className="kicker">Where we intend to go</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  Continuous, operational and predictive assurance across defence, aerospace and space programmes.
                  These are research directions, not commitments.
                </dd>
                <dd className="mt-3">
                  <ArrowLink href={aero("/aeaip/strategy")} ga={{ event: "aeaip_explore", params: { source_location: "strategy_page" } }} label="AEAIP strategy">
                    AEAIP™ strategy and roadmap
                  </ArrowLink>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* Evolution, shortened; the detailed roadmap is on the Strategy page */}
      <Section labelledBy="timeline-title" section="timeline" className="bg-surface-accent">
        <Container>
          <SectionHeader
            eyebrow="Evolution"
            id="timeline-title"
            title="From a quality problem to Engineering Assurance Intelligence"
          />
          <div className="mt-12">
            <Timeline />
          </div>
        </Container>
      </Section>

      <LeadershipSection id="leadership" />
      <PartnersSection />

      <Section labelledBy="about-contact-title" section="about_contact" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="Company" id="about-contact-title" title="Talk to the team" />
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
              Gamyaa AeroSystems is part of{" "}
              <a href={PARENT_HOME} className="text-accent underline">
                GAMYAA
              </a>{" "}
              and is based in Bangalore, India. Registration as Gamyaa AeroSystems Private Limited is planned and not
              yet complete.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <ArrowLink href={aero("/careers")}>Careers</ArrowLink>
              <ArrowLink href={EXTERNAL.aerospaceCybersecurity} ga={{ event: "aerospace_cybersecurity_click" }} label="Explore Aerospace Cybersecurity">
                Aerospace Cybersecurity
              </ArrowLink>
              <ArrowLink href={aero("/internships")}>Engineering learning &amp; research programs</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <ContactDetails />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Working on defence, aerospace or space assurance?"
        primary={{ label: "Talk to Gamyaa", href: internalContact(), ga: { event: "contact_sales_click" } }}
      />
    </>
  );
}
