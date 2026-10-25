import Link from "next/link";
import { VALIDITY_STATES } from "@/components/aeaip/diagrams";
import { ValiditySequence } from "@/components/system/validity-sequence";
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
import { faqLd, pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

const page = learnPage("configuration-assurance");
const TITLE = "Configuration-Aware Evidence Validity — Configuration Assurance in Aerospace | AEAIP";
const DESCRIPTION =
  "Why verified evidence can stop being valid: requirement, design, hardware, software, test-article, tool, procedure and environment changes, and how configuration assurance keeps verification status true.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const FACTORS: Array<{ title: string; what: string; why: string; example: string; check: string }> = [
  {
    title: "Requirement revision",
    what: "The requirement text, value, tolerance or condition changes.",
    why: "Evidence proves the requirement as written when the test was run, not as written today.",
    example: "Charge-termination tolerance tightened from ±0.02 V to ±0.015 V.",
    check: "Does the result still meet the new criterion, with the measurement uncertainty?",
  },
  {
    title: "Design revision",
    what: "A drawing, model, schematic or interface definition changes.",
    why: "Analyses and tests reflect the design they were run on.",
    example: "Interface control document Rev C → Rev D changes a telemetry rate.",
    check: "Which evidence references the earlier design revision?",
  },
  {
    title: "Hardware revision",
    what: "A board, part, material or supplier changes, or a unit is replaced.",
    why: "Form, fit or function may differ, and workmanship evidence is unit-specific.",
    example: "EPS board PCB Rev B → Rev C with a changed sense resistor.",
    check: "Was the evidence produced on the revision and serial number now installed?",
  },
  {
    title: "Software revision",
    what: "Flight software, firmware, FPGA image or configuration table changes.",
    why: "A new build can change behaviour anywhere, including in untouched code paths.",
    example: "Battery management firmware 2.3.0 → 2.4.0.",
    check: "Which results were produced on the earlier build, and what does the regression set cover?",
  },
  {
    title: "Test configuration",
    what: "Harnessing, test equipment, simulators, stimuli or setup differ from the flight configuration.",
    why: "A test only proves what it exercised, through the interfaces it actually used.",
    example: "A HIL simulator upgraded from v3.0 to v3.1 between runs.",
    check: "Are differences between test and flight configuration documented and justified?",
  },
  {
    title: "Test article pedigree",
    what: "The history and build state of the unit that was tested.",
    why: "Engineering, qualification and flight models differ by design. Evidence transfers only with a documented rationale.",
    example: "Payload MTF measured on the engineering model, not the flight model.",
    check: "Is the tested unit representative of flight for this requirement?",
  },
  {
    title: "Tool version",
    what: "Analysis software, compilers, code generators and test scripts change.",
    why: "A different tool version can produce a different answer from the same input.",
    example: "Structural solver upgrade between the CDR analysis and the final loads cycle.",
    check: "Is each analysis and build reproducible with the recorded tool versions?",
  },
  {
    title: "Procedure revision",
    what: "The test or inspection procedure, its steps or its pass/fail criteria change.",
    why: "Evidence is valid against the criteria the procedure applied.",
    example: "TP-EPS-022 Rev A → Rev B adds a cold-case charge cycle.",
    check: "Was the evidence produced under the procedure revision now approved?",
  },
  {
    title: "Environment",
    what: "Test levels, facility, calibration state or operating conditions change.",
    why: "A result at one temperature, vibration level or vacuum is not a result at another.",
    example: "Qualification levels revised after a launch-vehicle change.",
    check: "Were the test conditions at least as severe as the conditions now required?",
  },
];

const FAQ = [
  {
    q: "What is configuration-aware evidence?",
    a: "Configuration-aware evidence is verification evidence that is linked to the exact configuration it was produced on: the requirement revision, hardware revision and serial number, software build, procedure revision, tool versions and test environment. That link makes it possible to tell whether the evidence still applies when the configuration under review changes.",
  },
  {
    q: "What happens when a verified component changes revision?",
    a: "The change is assessed through change control. Evidence produced on the earlier revision is identified, and an engineer decides, for each affected requirement, whether the evidence can be retained with a documented rationale (for example a delta analysis or similarity argument), or whether a delta test or full reverification is required. The requirement is reopened until that is done, and the affected review gates are informed.",
  },
  {
    q: "What is configuration management in spacecraft verification?",
    a: "Configuration management identifies every configuration item and its revision, controls changes through formal approval, records the current status of every item, and audits that the as-built product matches its documentation. In verification it ensures that each test or analysis is run on, and recorded against, a known configuration, so that the evidence can be trusted for the product that actually flies.",
  },
];

export default function ConfigurationAssurancePage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Configuration-aware evidence validity: when verified stops meaning verified"
        description={DESCRIPTION}
        about={["Configuration management", "Evidence validity", "Configuration assurance in aerospace", "Change impact analysis"]}
      />
      <JsonLd data={faqLd(FAQ)} />

      <LearnHero
        page={page}
        topic="Configuration"
        status="research"
        title="Configuration-aware evidence validity: when verified stops meaning verified"
        answer={
          <>
            <p>
              Configuration-aware evidence validity means checking that each piece of verification evidence applies to
              the exact requirement revision, hardware and software configuration, test article, procedure, tools and
              environment now under review.
            </p>
            <p className="mt-3">
              Evidence produced on an earlier configuration may no longer prove the requirement. AEAIP is designed to
              flag it as At Risk, so that an engineer either retains it with a recorded rationale or requires
              reverification.
            </p>
          </>
        }
        visual={
          <div>
            <p className="max-w-3xl text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
              SAT-EPS-014 was verified in June. Then the firmware, the PCB revision, the interface and the test procedure
              changed. <span className="text-accent">Is the old evidence still valid?</span>
            </p>
            <div className="mt-10">
              <ValiditySequence headingLevel="h2" />
            </div>
          </div>
        }
      />

      <ArticleSection id="problem" n="01" title="“Verified ✓” is a statement about the past">
        <p>
          A verification matrix that says a requirement is verified is really saying: on a particular date, on a
          particular configuration, under a particular procedure, a result met the requirement as it was then written.
        </p>
        <p>
          Programmes change continuously. Firmware is updated, boards are revised, units are swapped after a fault,
          procedures are corrected and requirements are tightened. Each change is approved through change control, and
          each is reasonable on its own. What is rarely re-checked is the evidence that was produced before it.
        </p>
        <p>
          The result is a matrix that is green and wrong. It is usually discovered late: during a configuration audit,
          at a pre-ship review, or after an anomaly in test or in orbit.
        </p>
      </ArticleSection>

      <ArticleSection
        id="factors"
        n="02"
        title="Nine things that can invalidate evidence"
        lede="Each of these is part of the configuration a result was produced on. A change to any of them is a reason to ask whether the evidence still applies."
        wide
      >
        <ul className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {FACTORS.map((f, i) => (
            <li key={f.title} className="flex flex-col border-t border-line py-6">
              <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-lg font-medium text-ink">{f.title}</h3>
              <dl className="mt-3 space-y-2.5 text-sm leading-relaxed">
                <div>
                  <dt className="sr-only">What changes</dt>
                  <dd className="text-ink-2">{f.what}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Why it matters</dt>
                  <dd className="text-ink-2">{f.why}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Example</dt>
                  <dd className="text-ink-2">{f.example}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-accent">AEAIP would check</dt>
                  <dd className="text-ink">{f.check}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection
        id="states"
        n="03"
        title="Evidence validity states"
        lede="Validity is a state with an owner, not a colour. Each state is shown as text."
      >
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Evidence validity states in the AEAIP model</caption>
          <thead>
            <tr className="border-b border-line">
              {["State", "Meaning", "Who decides"].map((h) => (
                <th key={h} scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VALIDITY_STATES.map((s) => (
              <tr key={s.state} className="border-b border-line align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-ink">{s.state}</th>
                <td className="py-2.5 pr-3 text-ink-2">{s.meaning}</td>
                <td className="py-2.5 text-ink-2">{s.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          A change does not automatically invalidate evidence. Engineering judgement often shows it is unaffected, for
          example a connector change on a board whose evidence concerns software timing. The point is that the
          judgement is made, recorded and reviewable, instead of assumed.
        </p>
      </ArticleSection>

      <ArticleSection id="example" n="04" title="Worked example: SAT-EPS-014">
        <p>
          The story at the top of this page is the worked example: a battery charge-termination requirement verified on
          firmware 2.3.0 and board Rev B, then reopened when firmware 2.4.0, board Rev C, interface Rev D, procedure Rev B
          and a tightened requirement arrived. The same scenario runs inside the{" "}
          <Link href={`${aero("/aeaip/demo")}#validity`}>Interactive Assurance Demo</Link>, next to the TRR readiness it
          affects.
        </p>
      </ArticleSection>

      <ArticleSection id="revision-change" n="05" title="What happens when a verified component changes revision?">
        <FlowChain
          label="Handling a revision change to verified hardware or software"
          orientation="vertical"
          numbered
          steps={[
            "Change request approved through change control",
            "Evidence produced on the earlier revision identified",
            "Affected requirements and reviews identified",
            "Each item dispositioned by an engineer",
            "Retain with rationale, delta test, or full reverification",
            "Requirement closure updated and re-approved",
            "Affected review gates informed",
          ]}
        />
        <p>
          In manufacturing quality the same logic drives a partial or delta First Article Inspection after a design or
          process change; DAQIP™ applies it at the characteristic level. AEAIP applies it at the system level, across
          requirements, verification evidence and review gates.
        </p>
      </ArticleSection>

      <ArticleSection id="cm" n="06" title="Configuration management: the foundation">
        <p>
          Configuration-aware validity rests on ordinary, well-established configuration management. Configuration
          management standards and guidance, such as SAE EIA-649C, ISO 10007 and ECSS-M-ST-40, describe the same core
          functions:
        </p>
        <ul>
          <li><strong>Planning</strong> — how configuration will be managed on the programme.</li>
          <li><strong>Identification</strong> — every configuration item, its documentation and its revision.</li>
          <li><strong>Change control</strong> — proposing, evaluating, approving and implementing changes.</li>
          <li><strong>Status accounting</strong> — the current, recorded state of every item and change.</li>
          <li>
            <strong>Verification and audit</strong> — confirming the product matches its documentation, for example
            through functional and physical configuration audits before acceptance.
          </li>
        </ul>
        <p>
          It helps to keep four configurations distinct: <em>as-designed</em>, <em>as-built</em>, <em>as-tested</em>{" "}
          and <em>as-flown</em>. Evidence is produced on the as-tested configuration and relied on for the as-flown one.
          Every difference between them needs a rationale.
        </p>
      </ArticleSection>

      <ArticleSection id="pedigree" n="07" title="Test article pedigree">
        <p>
          Spacecraft programmes test several physical models: engineering models for development, qualification models
          or protoflight units for design proof, and flight models for acceptance. Each has its own build history,
          nonconformances and repairs.
        </p>
        <p>
          A test article&apos;s pedigree records that history and how the article differs from flight. It is what
          decides whether a result on one unit is evidence for another. In the demo, an imager MTF result on the
          engineering model is treated as an evidence gap for the flight model because the focal-plane mount differs.
        </p>
      </ArticleSection>

      <ArticleSection id="software-tools" n="08" title="Software builds, tools and environments">
        <p>
          For software, configuration means more than a version number: source revision, build configuration,
          compiler and library versions, configuration tables and the target hardware. A result is reproducible only if
          the build is.
        </p>
        <p>
          The same applies to the tools that produce evidence: analysis software, simulators, test scripts and
          measurement instruments with their calibration. These are part of the evidence&apos;s configuration, and AEAIP
          records them as such.
        </p>
      </ArticleSection>

      <ArticleSection id="aeaip" n="09" title="Where AEAIP fits">
        <AeaipRelation status="research">
          <p>
            Configuration-aware evidence validity is a core research direction for AEAIP and one of its intended
            differentiators. The Engineering Evidence Graph™ links every piece of evidence to the configuration it was
            produced on; the Assurance Intelligence Engine™ compares that configuration with the baseline under review
            and flags evidence that is At Risk. Engineers make every disposition.
          </p>
        </AeaipRelation>
        <ReviewStages
          codes={["CDR", "SIR", "TRR", "SAR", "FRR"]}
          note="Validity matters most when evidence is relied on for a decision: test readiness, acceptance and flight."
        />
      </ArticleSection>

      <FaqSection title="Configuration assurance questions" items={FAQ} />

      <RelatedTopics
        current={page.slug}
        slugs={["continuous-assurance", "engineering-evidence-graph", "verification-validation", "review-gates", "satellites-spacecraft"]}
      />
      <References
        status="research"
        items={refs("nasa-seh-cm", "nasa-seh-verification", "nasa-seh-phase-d", "eia-649", "iso-10007", "ecss-cm", "as9102")}
      />
      <LearnCta
        title="When did your evidence last match your configuration?"
        body="Tell us how your programme decides whether old evidence still counts after a change."
      />
    </>
  );
}
