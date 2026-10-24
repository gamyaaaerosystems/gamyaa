import Link from "next/link";
import { GateRail } from "@/components/aeaip/diagrams";
import {
  AeaipRelation,
  ArticleSection,
  LearnCta,
  LearnHero,
  LearnJsonLd,
  References,
  RelatedTopics,
} from "@/components/aeaip/learn";
import { FlowChain } from "@/components/diagrams/flow";
import { FaqSection } from "@/components/sections/shared";
import { ButtonLink, JsonLd } from "@/components/ui/primitives";
import { AEAIP_DEMO_HREF, learnPage } from "@/content/aeaip";
import { refs } from "@/content/references";
import { faqLd, pageMetadata } from "@/lib/seo";

const page = learnPage("satellites-spacecraft");
const TITLE = "Satellite & Spacecraft Assurance — Verification, Qualification & Mission Readiness | AEAIP";
const DESCRIPTION =
  "How satellite and spacecraft programmes prove readiness: subsystem requirements and evidence, environmental testing (vibration, TVAC, EMC), qualification, acceptance, integration and mission readiness.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const SUBSYSTEMS: Array<[string, string, string]> = [
  ["Mission", "Objectives, coverage, revisit, lifetime, orbit and disposal", "Mission analysis, concept of operations, end-to-end mission simulation"],
  ["Payload", "Imaging resolution, MTF, signal-to-noise, data volume", "Optical and radiometric tests, calibration, MTF measurement on the flight model"],
  ["Electrical power (EPS)", "Power generation, energy balance, battery charge control, bus regulation", "Power budget analysis, solar-array illumination tests, battery and charge-regulation tests"],
  ["ADCS / GNC (where applicable)", "Pointing accuracy, stability, slew rates, safe-mode behaviour", "Simulation and Monte Carlo analysis, sensor polarity and phasing tests, HIL closed-loop tests"],
  ["Avionics / on-board computer", "Processing, memory, data handling, radiation tolerance, interfaces", "Functional and interface tests, radiation analysis, EMC tests, worst-case timing"],
  ["Flight software", "Modes, fault detection and recovery, commanding, telemetry", "Requirements-based tests, SIL/HIL campaigns, regression, coverage, code analysis"],
  ["Communications", "Link margins, frequency plan, data rates, ground compatibility", "Link-budget analysis, RF tests, end-to-end RF compatibility with ground stations"],
  ["Thermal", "Unit temperature limits with margin in all modes", "Thermal analysis, thermal balance and thermal-vacuum tests, model correlation"],
  ["Structures & mechanisms", "Strength, stiffness, natural frequencies, deployments", "Structural analysis, sine and random vibration, shock, deployment tests"],
  ["Propulsion (where applicable)", "Thrust, impulse, leak tightness, contamination", "Proof and leak tests, hot-fire or flow tests, cleanliness verification"],
  ["Cybersecurity", "Command authentication, secure boot, software provenance", "Threat model, secure-design review, penetration test and retest, SBOM per build"],
  ["Ground segment (where applicable)", "Command and control, scheduling, data reception and security", "Ground system verification, end-to-end tests, operations rehearsals, security assessments"],
];

const ENV_TESTS: Array<[string, string]> = [
  ["Vibration (sine and random)", "Launch loads transmitted through the launch-vehicle interface. Sine surveys before and after reveal structural changes."],
  ["Shock", "Separation and deployment pyrotechnic or release events."],
  ["Acoustic (where applicable)", "Fairing acoustic environment, significant for large, light structures such as arrays and reflectors."],
  ["Thermal vacuum (TVAC) and thermal cycling", "Vacuum and temperature extremes; verifies thermal design and functional performance hot and cold."],
  ["EMC / EMI", "Electromagnetic emissions and susceptibility, so units do not interfere with each other or with the launch vehicle."],
  ["Deployment and mechanism tests", "Solar arrays, antennas and booms deploying in representative conditions, often with gravity off-loading."],
  ["Mass properties and alignment", "Mass, centre of gravity, inertia and alignment of sensors and payload."],
  ["RF compatibility", "End-to-end links with the ground network before launch."],
];

const FAQ = [
  {
    q: "What tests does a satellite go through before launch?",
    a: "Typically: functional and interface tests at unit, subsystem and system level; environmental tests such as vibration, shock, thermal vacuum, thermal cycling and EMC; deployment and mechanism tests; mass-properties and alignment measurements; and end-to-end tests with the ground segment. Qualification-level tests prove the design; acceptance-level tests prove each flight unit's workmanship. The exact campaign depends on the programme, the environmental verification standard it applies and the launch vehicle.",
  },
  {
    q: "How is satellite qualification evidence managed?",
    a: "Qualification evidence is organised by item: for each unit and the system, a qualification approach (dedicated qualification model, protoflight, or qualification by similarity), the tests and analyses performed, the levels achieved, the configuration of the article tested, and any nonconformances and waivers. It must be traceable to the requirements it supports and remain valid for the flight configuration, so design or build changes after qualification have to be assessed against it.",
  },
  {
    q: "What is mission assurance?",
    a: "Mission assurance is the disciplined application of engineering, quality, safety, reliability and risk-management practices across a space programme's lifecycle to raise confidence that the mission will succeed. It spans requirements, design reviews, parts and materials, workmanship, testing, anomaly resolution and readiness reviews.",
  },
];

export default function SatellitesSpacecraftPage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Satellite and spacecraft assurance: from mission requirements to mission readiness"
        description={DESCRIPTION}
        about={["Satellite verification", "Spacecraft qualification evidence", "Environmental testing", "Mission assurance", "Mission readiness"]}
      />
      <JsonLd data={faqLd(FAQ)} />

      <LearnHero
        page={page}
        topic="Satellite assurance"
        title="Satellite and spacecraft assurance: from mission requirements to mission readiness"
        answer={
          <>
            <p>
              Spacecraft assurance is the planned work that proves a satellite will do its mission: requirements flowed
              to every subsystem, verified by analysis and test, qualified and accepted through environmental testing,
              integrated, and reviewed gate by gate up to launch and operations.
            </p>
            <p className="mt-3">
              AEAIP begins here because one spacecraft programme exercises nearly every assurance discipline, on one
              schedule, with no opportunity to repair after launch.
            </p>
          </>
        }
      />

      <ArticleSection id="why" n="01" title="Why satellites and spacecraft first">
        <p>
          AEAIP is architected for defence, aerospace and space systems broadly. It is being proven deeply in one
          domain first, because depth is what earns the trust of engineers who review evidence for a living.
        </p>
        <ul>
          <li>A spacecraft connects mission requirements, hardware, software, avionics, power, thermal, structures, attitude control, communications, payloads and cybersecurity in one product.</li>
          <li>Verification is campaign-based and gate-driven, so readiness questions are explicit and recurring.</li>
          <li>Configuration changes during integration and test are common, and stale evidence is costly.</li>
          <li>After launch there is no repair, so the evidence has to be right the first time.</li>
          <li>
            Private participation in space is growing, including in India under the Indian Space Policy 2023 and
            IN-SPACe authorisation, bringing many new teams to these disciplines at once.
          </li>
        </ul>
        <p>
          Launch systems, defence aerospace systems and aircraft are later expansion directions. The architecture is
          intended to apply to them; those implementations do not exist yet.
        </p>
      </ArticleSection>

      <ArticleSection id="lifecycle" n="02" title="The lifecycle at a glance" wide>
        <FlowChain
          label="Illustrative satellite lifecycle"
          steps={[
            "Concept",
            "Requirements",
            "Design",
            "Manufacture & unit test",
            "Integration",
            "Environmental test",
            "Acceptance & shipment",
            "Launch campaign",
            "Commissioning",
            "Operations",
          ]}
        />
        <div className="mt-8">
          <GateRail highlight="TRR" />
        </div>
      </ArticleSection>

      <ArticleSection
        id="subsystems"
        n="03"
        title="Subsystems and their evidence"
        lede="Representative requirements and evidence. Actual content depends on the mission, the design and the programme's standards."
        wide
      >
        <div className="gx-scroll-x overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <caption className="sr-only">Satellite subsystems with representative requirements and evidence</caption>
            <thead>
              <tr className="border-b border-line">
                {["Subsystem", "Representative requirements", "Representative evidence"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBSYSTEMS.map(([s, r, e]) => (
                <tr key={s} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-4 py-3 font-medium text-ink">{s}</th>
                  <td className="px-4 py-3 text-ink-2">{r}</td>
                  <td className="px-4 py-3 text-ink-2">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ArticleSection>

      <ArticleSection id="environmental" n="04" title="Environmental testing">
        <p>
          Environmental tests reproduce, on the ground, the conditions of launch and space. Levels, durations and the
          sequence come from the programme&apos;s environmental verification standard and the launch vehicle&apos;s
          requirements.
        </p>
        <dl className="divide-y divide-line border-y border-line">
          {ENV_TESTS.map(([k, v]) => (
            <div key={k} className="py-3">
              <dt className="font-medium text-ink">{k}</dt>
              <dd className="mt-0.5 text-[0.9375rem] text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
        <p>
          Every test is preceded by a Test Readiness Review and followed by a functional comparison against the
          pre-test baseline. Any change to the article between tests, such as a unit swap or a software load, is part of
          the evidence&apos;s configuration.
        </p>
      </ArticleSection>

      <ArticleSection id="integration" n="05" title="Integration and test">
        <FlowChain
          label="Typical integration and test flow"
          orientation="vertical"
          numbered
          steps={[
            "Unit acceptance",
            "Subsystem integration and interface verification",
            "System integration",
            "Baseline functional and performance tests",
            "Environmental test campaign",
            "Post-environment functional comparison",
            "End-to-end tests with the ground segment",
            "Acceptance review and shipment",
          ]}
        />
        <p>
          Integration is where configuration changes most often: units are swapped, harnesses reworked, software loads
          updated. Each change may invalidate evidence gathered earlier in the sequence.
        </p>
      </ArticleSection>

      <ArticleSection id="qualification" n="06" title="Qualification evidence">
        <p>
          Each unit and the system need a qualification approach: a dedicated qualification model, a protoflight
          approach on the flight unit, or qualification by similarity to a previously qualified item. The evidence must
          show what was tested, at what levels, on which article and configuration, and what nonconformances or waivers
          were raised.
        </p>
        <p>
          Qualification is done once per design, which is exactly why later design changes matter: a change to a
          qualified item can reopen its qualification. See{" "}
          <Link href={learnPage("verification-validation").href + "#qualification-acceptance"}>qualification, acceptance and protoflight</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="mission-readiness" n="07" title="Mission readiness evidence">
        <ul>
          <li>Verification closure for the flight configuration, with approved exceptions.</li>
          <li>Launch-vehicle interface verification and launch-site processing records.</li>
          <li>Operations readiness: validated procedures, trained operators, rehearsals.</li>
          <li>Ground segment readiness, including security.</li>
          <li>Residual risks and waivers accepted by the responsible authority.</li>
          <li>Applicable authorisations, such as frequency coordination and national space-activity authorisation.</li>
        </ul>
      </ArticleSection>

      <ArticleSection id="smallsat" n="08" title="Small satellites: the same questions, less time">
        <p>
          Small-satellite programmes compress schedules, use more commercial components and often choose protoflight
          approaches. The verification questions do not get smaller: is every requirement proven, on the configuration
          that will fly, with open issues understood? With fewer people and less time, keeping that answer current is
          harder, not easier.
        </p>
      </ArticleSection>

      <ArticleSection id="aeaip" n="09" title="How AEAIP applies">
        <AeaipRelation status="research-architecture">
          <p>
            Satellites and spacecraft are AEAIP&apos;s first engineering focus. The domain model of subsystems,
            evidence types and review gates on this page is the basis of the research and architecture work, and of the
            fictitious GX-1 satellite in the Interactive Assurance Demo.
          </p>
        </AeaipRelation>
        <ButtonLink
          href={AEAIP_DEMO_HREF}
          ga={{ event: "aeaip_demo_open", params: { source_location: "learn_page" } }}
          label="Explore Interactive Assurance Demo"
        >
          Explore Interactive Assurance Demo
        </ButtonLink>
      </ArticleSection>

      <FaqSection title="Satellite assurance questions" items={FAQ} />

      <RelatedTopics
        current={page.slug}
        slugs={["review-gates", "verification-validation", "operational-evidence", "configuration-assurance", "cybersecurity-assurance"]}
      />
      <References
        status="research-architecture"
        items={refs("gevs", "ecss-testing", "ecss-verification", "nasa-seh-phase-d", "nasa-seh-verification", "indian-space-policy", "in-space", "nist-ir-8270")}
      />
      <LearnCta
        title="Building a satellite?"
        body="We would like to understand how your team prepares for TRR, acceptance and flight readiness."
      />
    </>
  );
}
