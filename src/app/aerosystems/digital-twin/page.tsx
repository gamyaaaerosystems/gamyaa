import Image from "next/image";
import { CtaBand, FaqSection, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  ArrowLink,
  BulletList,
  ButtonLink,
  Container,
  JsonLd,
  Notice,
  Section,
  SectionHeader,
  SmartLink,
  StatusBadge,
} from "@/components/ui/primitives";
import { faqLd, pageMetadata, webPageLd } from "@/lib/seo";
import { aero, EXTERNAL, PRIMARY_ORIGIN } from "@/lib/site";
import banner from "./digital-twin-design.webp";

const TITLE = "Digital Twin for Aerospace, Defence & Space | Gamyaa AeroSystems";
// Kept under ~160 characters so search results show it in full.
const DESCRIPTION =
  "Physics-based, mathematical and data-driven digital twins for aircraft, defence platforms, satellites and launch vehicles, traceable to real configuration.";
const BANNER_ALT =
  "Digital Twin Design, physics based: a satellite drawn with engineering dimensions above the Earth, with the GAMYAA Aero Systems mark. Space Systems & Digital Twin Research for Aerospace, Defence and Space.";

// The preview image comes from opengraph-image.jpg in this folder (the banner, letterboxed to 1200×630).
export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  href: aero("/digital-twin"),
  hasOwnOgImage: true,
});

const CONTACT_HREF = internalContact("digital-twin");

/** Visible on the page and repeated as FAQPage data, so search engines and AI assistants can quote it. */
const FAQ = [
  {
    q: "What is a digital twin in aerospace, defence and space?",
    a: "A digital twin is a virtual model of a specific aircraft, defence platform, spacecraft or subsystem that is kept in step with its real configuration and data. Engineers use it to predict behaviour, test changes and plan maintenance before acting on the hardware.",
  },
  {
    q: "What is the difference between physics-based, mathematical-model and data-driven digital twins?",
    a: "Physics-based twins solve first-principles models of structures, heat, fluids and orbital or flight dynamics. Mathematical-model twins use reduced-order or analytical models fast enough for control design and real-time simulation. Data-driven twins learn from test, telemetry and maintenance data. Most programmes combine all three.",
  },
  {
    q: "Is a 3D model a digital twin?",
    a: "No. A 3D model shows geometry. A digital twin also models how the system behaves and stays linked to its real configuration and data. The interactive 3D demos on this page are visualisations, not digital twins.",
  },
  {
    q: "How does Gamyaa AeroSystems approach digital twins?",
    a: "Every model is linked to the requirements it informs, the configuration it represents and the test or flight data that validates it, so each prediction can be traced and is flagged for review when the design changes. This work is at research stage.",
  },
  {
    q: "How can I discuss a digital twin for my programme?",
    a: "Contact Gamyaa AeroSystems in Bangalore, India, with the platform, the question the twin must answer and the data you have today.",
  },
];

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

/** Interactive 3D demos. They are visualisations only and must never be labelled as digital twins. */
const DEMOS: Array<{ label: string; caption: string; href: string }> = [
  { label: "Satellite Engineering", caption: "Spacecraft systems architecture", href: EXTERNAL.satelliteEngineering },
  { label: "Satellite Explorer 3D", caption: "Interactive satellite model", href: EXTERNAL.satelliteExplorer3d },
  { label: "Rocket Engine 3D", caption: "Interactive propulsion model", href: EXTERNAL.rocketEngine3d },
  { label: "Rocket Engine 3D (Advanced)", caption: "Propulsion and pressure visualisation", href: EXTERNAL.rocketEngine3dAdvanced },
  { label: "UFlight™ 3D", caption: "eVTOL aircraft visualisation", href: EXTERNAL.uflight3d },
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
      <JsonLd
        data={webPageLd({
          name: TITLE,
          description: DESCRIPTION,
          href: aero("/digital-twin"),
          about: [
            "Digital twin",
            "Physics-based digital twin",
            "Data-driven digital twin",
            "Reduced-order model",
            "Aerospace engineering",
            "Defence systems engineering",
            "Spacecraft engineering",
          ],
          image: {
            url: `${PRIMARY_ORIGIN}${banner.src}`,
            width: banner.width,
            height: banner.height,
            caption: BANNER_ALT,
          },
        })}
      />
      <JsonLd data={faqLd(FAQ)} />
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

      <Section labelledBy="demos-title" section="digital_twin_demos" className="pt-0 md:pt-0">
        <Container>
          <figure className="twin-frame ticks rounded-sm p-1.5 sm:p-2">
            <div className="relative overflow-hidden rounded-[1px] border border-line">
              <Image
                src={banner}
                alt={BANNER_ALT}
                sizes="(min-width: 1280px) 1216px, 100vw"
                loading="eager"
                fetchPriority="high"
                className="block h-auto w-full"
              />
              {/* Credits sit on the image's bottom-right corner: stacked on phones so they clear the banner text. */}
              <p className="absolute bottom-1.5 right-1.5 flex flex-col items-end gap-0.5 rounded-sm bg-black/65 px-2 py-1.5 text-right text-[0.6875rem] leading-tight text-white/80 backdrop-blur-sm sm:bottom-3 sm:right-3 sm:flex-row sm:items-center sm:gap-2 sm:px-3 sm:text-xs">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/60">Credits</span>
                <SmartLink
                  href={EXTERNAL.iTelematics}
                  label="itelematics"
                  className="text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
                >
                  iTelematics.com
                </SmartLink>
              </p>
            </div>
          </figure>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="demos-title" className="heading text-2xl text-ink sm:text-[1.75rem]">
                  Interactive 3D demos
                </h2>
                <StatusBadge status="concept-demo" />
              </div>
              <Notice className="mt-5">
                <strong className="font-medium text-ink">Note: for demonstration only.</strong> These are interactive
                3D models, not digital twins. They are not driven by physics models, test data or live telemetry.
                Contact us for your digital twin requirements.
              </Notice>
              <div className="mt-6 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <ButtonLink href={EXTERNAL.satelliteExplorer3d} label="Open Satellite Explorer 3D">
                  Open Satellite Explorer 3D
                </ButtonLink>
                <ButtonLink href={CONTACT_HREF} variant="secondary" label="Contact us for a digital twin">
                  Contact us for a digital twin
                </ButtonLink>
              </div>
            </div>
            <ul className="border-b border-line lg:col-span-7">
              {DEMOS.map((d) => (
                <li
                  key={d.href}
                  className="grid gap-x-6 border-t border-line py-2 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <ArrowLink href={d.href}>{d.label}</ArrowLink>
                  <span className="pb-2 text-sm text-muted sm:pb-0">{d.caption}</span>
                </li>
              ))}
            </ul>
          </div>
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

      <FaqSection title="Digital twin questions" items={FAQ} />

      <CtaBand
        title="Planning a digital twin for your programme?"
        body="Tell us about the platform, the question the twin must answer and the data you have today."
        primary={{ label: "Discuss a digital twin", href: CONTACT_HREF }}
        secondary={{ label: "Explore AEAIP™", href: aero("/aeaip") }}
      />
    </>
  );
}
