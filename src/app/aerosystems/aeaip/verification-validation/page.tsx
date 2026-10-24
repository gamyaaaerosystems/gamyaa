import Link from "next/link";
import {
  AeaipRelation,
  ArticleSection,
  LearnCta,
  LearnHero,
  LearnJsonLd,
  References,
  RelatedTopics,
  ReviewStages,
} from "@/components/aeaip/learn";
import { FlowChain } from "@/components/diagrams/flow";
import { FaqSection } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/primitives";
import { learnPage } from "@/content/aeaip";
import { refs } from "@/content/references";
import { METHOD_FAMILIES } from "@/content/verification-methods";
import { faqLd, pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

const page = learnPage("verification-validation");
const TITLE = "Verification vs Validation in Aerospace — Spacecraft Verification Methods | AEAIP";
const DESCRIPTION =
  "The difference between verification and validation, and how spacecraft are verified: inspection, analysis, demonstration, test, qualification, acceptance, HIL, software and cybersecurity verification.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const VV_ROWS: Array<[string, string, string]> = [
  ["Question", "Did we build the product right?", "Did we build the right product?"],
  ["Measured against", "Specified requirements", "Stakeholder needs and intended use"],
  ["Typical evidence", "Test reports, analyses, inspection records, review records", "Operational scenarios, end-to-end tests, user or operator evaluations, mission simulations"],
  ["Environment", "Controlled conditions defined by the procedure", "The intended operational environment, real or realistically simulated"],
  ["Failure means", "The product does not meet its specification", "The specification, or the product, does not meet the need"],
];

const QA_ROWS: Array<[string, string, string, string]> = [
  ["Purpose", "Prove the design meets requirements with margin", "Prove each unit is built correctly, free of workmanship defects", "Prove design and workmanship on the flight unit itself"],
  ["Article", "Dedicated qualification unit", "Every flight or production unit", "The flight unit"],
  ["Levels", "Above expected environment, typically longer duration", "At expected environment", "Between acceptance and qualification, typically shorter duration"],
  ["Frequency", "Once per design (repeated if the design changes)", "Every unit", "Once, on the unit that will fly"],
  ["Trade-off", "Highest confidence, extra hardware cost", "Does not prove design margin by itself", "Saves a unit; accepts more risk to the flight hardware"],
];

const MATRIX: Array<[string, string, string, string, string, string]> = [
  ["SAT-EPS-014", "Battery charge termination 4.10 V ±0.015 V/cell, 0–40 °C", "Test", "Subsystem", "TP-EPS-022 Rev B in TVAC", "Reopened · reverification required"],
  ["FSW-247", "Safe-mode transition within 2 s of watchdog timeout", "Test (HIL)", "Software / avionics", "HIL campaign C3-R", "Open · retest pending"],
  ["STR-012", "First lateral natural frequency above 50 Hz", "Analysis + test", "System", "Modal analysis; sine survey in vibration test", "Closed · approved"],
  ["THM-014", "Radiator emissivity ≥ 0.88", "Inspection", "Component", "Coating measurement", "Waiver WVR-007"],
  ["COM-002", "TT&C link compatible with ground network", "Test", "System + ground", "End-to-end RF compatibility test", "Planned"],
];

const FAQ = [
  {
    q: "What is the difference between verification and validation?",
    a: "Verification confirms, with objective evidence, that a product meets its specified requirements: did we build the product right? Validation confirms that the product fulfils its intended use and stakeholder needs in its intended environment: did we build the right product? A product can pass verification and still fail validation if the requirements themselves were wrong.",
  },
  {
    q: "What is spacecraft verification?",
    a: "Spacecraft verification is the planned set of inspections, analyses, demonstrations and tests that show each spacecraft requirement is met, at component, subsystem and system level. It includes qualification and acceptance campaigns such as vibration, shock, thermal vacuum and EMC testing, and ends with closure of every requirement before the spacecraft is accepted and flown.",
  },
  {
    q: "What is requirements verification?",
    a: "Requirements verification is the process of assigning each requirement a verification method, planning the event that will produce evidence, executing it on a known configuration, assessing the result against defined criteria and having an authorised person close the requirement. It is usually managed through a verification matrix.",
  },
  {
    q: "How does HIL testing verify avionics?",
    a: "In hardware-in-the-loop (HIL) testing, real avionics hardware such as the on-board computer runs flight software while connected to real-time simulations of sensors, actuators, dynamics and environment. It verifies closed-loop behaviour, timing and fault responses that cannot be safely or affordably tested on the integrated spacecraft. Its evidence is valid only for the hardware revision, software build and simulator version it ran on.",
  },
];

export default function VerificationValidationPage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Verification vs validation in aerospace, and how spacecraft are verified"
        description={DESCRIPTION}
        about={["Verification and validation", "Spacecraft verification", "Requirements verification", "Hardware-in-the-loop testing", "Qualification and acceptance testing"]}
      />
      <JsonLd data={faqLd(FAQ)} />

      <LearnHero
        page={page}
        topic="Verification"
        title="Verification vs validation in aerospace, and how spacecraft are verified"
        answer={
          <>
            <p>
              Verification asks whether a product meets its specified requirements: did we build it right? Validation
              asks whether it fulfils its intended use and stakeholder needs in its intended environment: did we build
              the right thing?
            </p>
            <p className="mt-3">
              Spacecraft verification combines inspection, analysis, demonstration and test with qualification and
              acceptance campaigns, model-based methods, and software and cybersecurity assurance. Methods are chosen
              requirement by requirement.
            </p>
          </>
        }
      />

      <ArticleSection id="definitions" n="01" title="Verification and validation are different questions">
        <p>
          Systems-engineering standards and handbooks treat verification and validation as separate processes, even
          when one test produces evidence for both. NASA&apos;s systems engineering guidance frames verification as
          proof of compliance with specifications and validation as proof that the product accomplishes its intended
          purpose for its stakeholders.
        </p>
        <div className="gx-scroll-x overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
          <caption className="sr-only">Verification compared with validation</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-3" />
              <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Verification</th>
              <th scope="col" className="py-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Validation</th>
            </tr>
          </thead>
          <tbody>
            {VV_ROWS.map(([k, v1, v2]) => (
              <tr key={k} className="border-b border-line align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-ink">{k}</th>
                <td className="py-2.5 pr-3 text-ink-2">{v1}</td>
                <td className="py-2.5 text-ink-2">{v2}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <h3>A satellite example</h3>
        <p>
          A requirement says the X-band downlink shall deliver 40 GB per day. A link-budget analysis and an RF test
          verify it. Validation asks a different question: with real orbits, real ground-station passes and real
          operators, does the mission actually deliver the images its users need, in time to be useful? That is answered
          with end-to-end tests and mission simulations, not by re-reading the requirement.
        </p>
      </ArticleSection>

      <ArticleSection id="requirements-verification" n="02" title="What is requirements verification?">
        <p>
          Requirements verification turns each requirement into a planned, evidenced and approved conclusion. In
          practice it runs through the same steps for every requirement:
        </p>
        <FlowChain
          label="Requirements verification steps"
          orientation="vertical"
          numbered
          steps={[
            "Verifiable requirement",
            "Method selected",
            "Verification event planned",
            "Event executed on a known configuration",
            "Evidence produced",
            "Result assessed against criteria",
            "Issues resolved",
            "Closure approved",
          ]}
        />
        <p>
          Verification happens at several levels (component, subsystem, system) and stages (qualification,
          acceptance, pre-launch and in orbit). A verification matrix records the plan and the status. The weak point
          is rarely the plan. It is keeping the status true as designs, builds and procedures change; see{" "}
          <Link href={learnPage("configuration-assurance").href}>configuration-aware evidence validity</Link>.
        </p>
      </ArticleSection>

      <ArticleSection
        id="methods"
        n="03"
        title="Verification method taxonomy"
        lede="Six families of methods. Methods are selected according to the system, the requirement, the programme and the applicable assurance framework. Not every method applies to every programme."
        wide
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {METHOD_FAMILIES.map((f) => (
            <section key={f.id} id={`methods-${f.id}`} aria-labelledby={`methods-${f.id}-title`} className="card p-6 sm:p-7">
              <h3 id={`methods-${f.id}-title`} className="text-xl font-medium tracking-tight text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.summary}</p>
              <dl className="mt-5 divide-y divide-line border-t border-line">
                {f.methods.map((m) => (
                  <div key={m.name} className="py-3">
                    <dt className="text-[0.9375rem] font-medium text-ink">{m.name}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-ink-2">
                      {m.body}
                      {m.example ? <span className="mt-1 block text-muted">Example: {m.example}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Frameworks group these differently. NASA guidance centres on test, analysis, inspection and demonstration;
          ECSS verification guidance treats test, analysis, review-of-design and inspection as its methods. A
          programme&apos;s verification plan defines which apply.
        </p>
      </ArticleSection>

      <ArticleSection id="qualification-acceptance" n="04" title="Qualification, acceptance and protoflight">
        <p>
          Environmental testing answers two different questions. Is the design good enough, with margin? And was this
          particular unit built correctly? Qualification answers the first; acceptance answers the second. A
          protoflight approach answers both on the flight unit when no separate qualification unit is built.
        </p>
        <div className="gx-scroll-x overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="sr-only">Qualification, acceptance and protoflight compared</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-3" />
              {["Qualification", "Acceptance", "Protoflight"].map((h) => (
                <th key={h} scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QA_ROWS.map(([k, a, b, c]) => (
              <tr key={k} className="border-b border-line align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-ink">{k}</th>
                <td className="py-2.5 pr-3 text-ink-2">{a}</td>
                <td className="py-2.5 pr-3 text-ink-2">{b}</td>
                <td className="py-2.5 text-ink-2">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <p>
          Exact levels, margins and durations come from the programme&apos;s environmental verification standard, for
          example NASA Goddard&apos;s General Environmental Verification Standard or the ECSS testing standard, and from
          the launch vehicle&apos;s requirements.
        </p>
        <h3>Similarity and heritage</h3>
        <p>
          Reusing evidence from a previously qualified item is legitimate and common, but only with a documented
          comparison of design, configuration, manufacturing, environment and application. A small change in any of
          these can be enough to invalidate the heritage claim, which is why AEAIP treats heritage evidence like any
          other evidence: linked to the configuration it actually proves.
        </p>
      </ArticleSection>

      <ArticleSection id="model-based" n="05" title="Model-based and digital verification">
        <p>
          Models let a team verify behaviour that is impractical to test: a full orbit of thermal cycling, thousands of
          Monte Carlo dispersions of a manoeuvre, or a fault that would damage hardware. They also introduce a new
          dependency. A model&apos;s output is evidence only if the model itself is credible for that use: validated
          against test data, run within its validated range, and identified by version.
        </p>
        <p>
          That is why thermal models are correlated against thermal-vacuum results, and why a simulation result in
          AEAIP is linked to the model version and input set that produced it. Digital twins follow the same rule; see{" "}
          <Link href={learnPage("operational-evidence").href}>Predicted → Tested → Flown</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="hil" n="06" title="How does HIL testing verify avionics?">
        <p>
          In hardware-in-the-loop testing, the real on-board computer runs real flight software, connected through its
          real interfaces to a real-time simulation of the spacecraft: sensors, actuators, power, dynamics and
          environment. The computer cannot tell it is not flying.
        </p>
        <ul>
          <li>It verifies closed-loop behaviour: attitude control, mode transitions, fault detection and recovery.</li>
          <li>It allows fault injection that would be unsafe on the integrated spacecraft.</li>
          <li>It measures timing on the real processor, which software-in-the-loop cannot.</li>
        </ul>
        <p>
          Its limits matter as much. The simulator is part of the test configuration: a result is evidence for the
          hardware revision, software build and simulator version it ran on, and only as good as the simulator&apos;s own
          fidelity. When any of those change, the result may need to be repeated. The{" "}
          <Link href={aero("/aeaip/demo")}>Interactive Assurance Demo</Link> follows one HIL failure, FSW-247, through
          anomaly, corrective action and retest.
        </p>
      </ArticleSection>

      <ArticleSection id="software" n="07" title="Software verification and assurance">
        <p>
          Flight software is verified through requirements-based tests at unit, integration and system level, supported
          by static and dynamic analysis and coverage measurement at the level the applicable standard requires. NASA
          programmes follow NPR 7150.2 and NASA-STD-8739.8; European space programmes use the ECSS software
          engineering and software product assurance standards; airborne software is commonly developed to RTCA
          DO-178C.
        </p>
        <p>
          The evidence is only meaningful for a reproducible build. A test report for build 4.2.0 says nothing on its
          own about build 4.2.1, which is why software configuration identifiers sit on every software evidence record
          in AEAIP.
        </p>
      </ArticleSection>

      <ArticleSection id="cybersecurity" n="08" title="Cybersecurity verification">
        <p>
          Security requirements are verified like any other requirement: by design review, analysis and test, including
          penetration testing and fuzzing of command interfaces. Findings are tracked to closure with retest after
          remediation. See <Link href={learnPage("cybersecurity-assurance").href}>cybersecurity as engineering assurance</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="certification" n="09" title="How verification relates to certification">
        <p>
          Verification produces the evidence. Certification is a formal decision by an authorised body that a product
          or design meets a defined set of requirements, made by reviewing that evidence.
        </p>
        <p>
          Aircraft and airborne equipment are certified by civil or military airworthiness authorities. Space systems
          are usually governed by programme and customer acceptance, launch-provider requirements and national
          authorisation regimes rather than a type certificate. In every case, software can help organise and check the
          evidence; it does not certify. Certification evidence is the focus of{" "}
          <Link href={aero("/aircert-ai")}>AirCert AI™</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="matrix" n="10" title="Example: a verification matrix" lede="Fictitious requirements from the demo satellite." wide>
        <div className="gx-scroll-x overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Example verification matrix with fictitious requirements</caption>
            <thead>
              <tr className="border-b border-line">
                {["Requirement", "Statement", "Method", "Level", "Event", "Status"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((r) => (
                <tr key={r[0]} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-4 py-3 font-mono text-xs font-normal text-ink">
                    {r[0]}
                  </th>
                  {r.slice(1).map((c, i) => (
                    <td key={i} className="px-4 py-3 text-ink-2">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ArticleSection>

      <ArticleSection id="aeaip" n="11" title="Where AEAIP fits">
        <AeaipRelation status="research">
          <p>
            AEAIP is designed to hold every row of a verification matrix as connected graph data: the requirement, the
            method, the event, the configuration it ran on, the evidence, the issues and the closure decision. The aim is
            a matrix whose status cannot quietly drift away from reality.
          </p>
        </AeaipRelation>
        <ReviewStages
          codes={["SRR", "PDR", "CDR", "TRR", "SAR"]}
          note="Methods are assigned by SRR, planned by PDR and CDR, executed from TRR and closed by SAR."
        />
      </ArticleSection>

      <FaqSection title="Verification and validation questions" items={FAQ} />

      <RelatedTopics
        current={page.slug}
        slugs={["review-gates", "configuration-assurance", "satellites-spacecraft", "cybersecurity-assurance", "glossary"]}
      />
      <References
        status="research"
        items={refs(
          "nasa-seh-verification",
          "nasa-seh-validation",
          "iso-15288",
          "ecss-verification",
          "ecss-testing",
          "gevs",
          "npr-7150",
          "nasa-std-8739-8",
          "ecss-software",
          "ecss-swpa",
          "sebok-verification",
          "sebok-validation",
        )}
      />
      <LearnCta
        title="Is your verification matrix telling the truth?"
        body="Tell us how your team keeps verification status current as designs and builds change."
      />
    </>
  );
}
