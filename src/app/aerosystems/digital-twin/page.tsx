import Image from "next/image";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, BulletList, ButtonLink, Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";
import banner from "./digital-twin-design.webp";

export const metadata = pageMetadata({
  title: "Digital Twin for Aerospace, Defence & Space | Gamyaa AeroSystems",
  description:
    "Physics-based, mathematical-model and data-driven digital twins for aerospace, defence and space systems, each traceable to the requirements, configuration and evidence behind its predictions.",
  href: aero("/digital-twin"),
  hasOwnOgImage: true,
});

const CONTACT_HREF = internalContact("digital-twin");

/** The three kinds of twin, from first principles to learned behaviour. */
const TWINS: Array<{ code: string; title: string; body: string; uses: string[] }> = [
  {
    code: "01",
    title: "Physics-based",
    body: "Built from first principles: structural, thermal, fluid, orbital and flight dynamics. Finite-element, CFD and multibody models predict how a configuration will behave before hardware exists, and explain why.",
    uses: [
      "Launch loads, vibration and structural margins",
      "Spacecraft thermal balance, power and orbit budgets",
      "Airframe loads, flutter and propulsion performance",
    ],
  },
  {
    code: "02",
    title: "Mathematical model",
    body: "Reduced-order and analytical models (state-space, transfer-function, estimator and surrogate models) fast enough for control design, trade studies and real-time simulation.",
    uses: [
      "Guidance, navigation and control design",
      "Hardware-in-the-loop and real-time simulation",
      "Rapid trade studies across many configurations",
    ],
  },
  {
    code: "03",
    title: "Data-driven",
    body: "Learned from test, telemetry and maintenance data, and calibrated against physics so that predictions stay explainable rather than black-box.",
    uses: [
      "Telemetry anomaly detection",
      "Degradation trends and remaining useful life",
      "Fleet reliability and maintenance planning",
    ],
  },
];

const DOMAINS: Array<{ title: string; body: string }> = [
  {
    title: "Aerospace",
    body: "Aircraft, UAVs, engines and subsystems: performance, loads and health monitoring, with the evidence that airworthiness and certification reviews ask for.",
  },
  {
    title: "Defence",
    body: "Platforms and subsystems that must stay mission-ready: availability, sustainment and lifecycle evidence under strict configuration control.",
  },
  {
    title: "Space",
    body: "Satellites, payloads and launch systems: structural, thermal, power and orbit behaviour from design and qualification through launch and operations.",
  },
];

export default function DigitalTwinPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Digital Twin", href: aero("/digital-twin") },
            ]}
          />
        }
        eyebrow={
          <>
            <span>Digital Twin · Aerospace · Defence · Space</span>
            <StatusBadge status="research" />
          </>
        }
        title="Digital Twin"
        lede="Aerospace, defence and space-specific digital twins (physics-based, mathematical-model and data-driven) that predict how a configuration will behave, and stay traceable to the requirements, configuration and test evidence behind every prediction."
      >
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={CONTACT_HREF} label="Discuss a digital twin">
            Discuss a digital twin
          </ButtonLink>
          <ButtonLink href={aero("/research")} variant="secondary" label="Engineering assurance research">
            Engineering assurance research
          </ButtonLink>
        </div>
      </PageHero>

      <Section section="digital_twin_banner" className="pt-0 md:pt-0">
        <Container>
          <figure className="overflow-hidden rounded-sm border border-line">
            <Image
              src={banner}
              alt="Digital Twin Design, physics based: a satellite drawn with engineering dimensions above the Earth, with the GAMYAA Aero Systems mark. Space Systems & Digital Twin Research for Aerospace, Defence and Space."
              sizes="(min-width: 1280px) 1232px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </figure>
        </Container>
      </Section>

      <Section labelledBy="twins-title" section="digital_twin_types" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Three kinds of twin"
              id="twins-title"
              title="Physics, mathematics and data"
              lede="Each answers a different question. Most programmes need more than one."
            />
          </div>
          <ol className="border-b border-line lg:col-span-8">
            {TWINS.map((t) => (
              <li key={t.code} className="grid gap-x-6 gap-y-2 border-t border-line py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-subtle">{t.code}</span>
                <div>
                  <h3 className="text-[1.0625rem] font-medium text-ink">{t.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{t.body}</p>
                  <BulletList className="mt-4" items={t.uses} />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="domains-title" section="digital_twin_domains" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Domains" id="domains-title" title="Built for Aerospace, Defence & Space" />
          </div>
          <dl className="border-b border-line lg:col-span-8">
            {DOMAINS.map((d) => (
              <div key={d.title} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="font-medium text-ink">{d.title}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-2">{d.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section labelledBy="trace-title" section="digital_twin_assurance" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Engineering assurance"
              id="trace-title"
              title="A twin is only as good as the configuration it represents"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              Every model is linked to the requirements it informs, the configuration it represents and the test or
              flight data that validates it. When the design changes, predictions built on the old configuration are
              flagged for review, not silently reused.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <ArrowLink href={aero("/aeaip/operational-evidence")}>Operational evidence</ArrowLink>
              <ArrowLink href={aero("/aeaip/configuration-assurance")}>Configuration assurance</ArrowLink>
              <ArrowLink href={aero("/aeaip/verification-validation")}>Verification &amp; validation</ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Planning a digital twin for your programme?"
        body="Tell us about the platform, the question the twin must answer and the data you have today."
        primary={{ label: "Discuss a digital twin", href: CONTACT_HREF }}
        secondary={{ label: "Explore AEAIP™", href: aero("/aeaip") }}
      />
    </>
  );
}
