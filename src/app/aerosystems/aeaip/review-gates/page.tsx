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
import { FaqSection } from "@/components/sections/shared";
import { BulletList, Container, JsonLd } from "@/components/ui/primitives";
import { learnPage } from "@/content/aeaip";
import { GATES } from "@/content/review-gates";
import { refs } from "@/content/references";
import { faqLd, pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

const page = learnPage("review-gates");
const TITLE = "Spacecraft Review Gates: MCR, SRR, PDR, CDR, TRR, FRR & MRR Explained | AEAIP";
const DESCRIPTION =
  "Spacecraft engineering reviews explained: purpose, typical questions and evidence for MCR, SRR, SDR, PDR, CDR, SIR, TRR, SAR, ORR, FRR and MRR, and why review gates must be configurable.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const PDR_CDR: Array<[string, string, string]> = [
  ["Design maturity", "Preliminary: the approach is defined and credible", "Detailed: the design is complete enough to build"],
  ["Main question", "Should we commit to detailed design?", "Should we commit to fabrication and verification?"],
  ["Baseline", "Allocated requirements and preliminary design", "Build-to (detailed) design under configuration control"],
  ["Analyses", "Preliminary, showing feasibility and margin", "Final, against the released design revision"],
  ["Verification", "Approach and plan defined per requirement", "Detailed plans and procedures ready to execute"],
  ["Typical risk focus", "Feasibility, margins, long-lead items, technology", "Producibility, testability, open design issues"],
];

const FAQ = [
  {
    q: "What is a Test Readiness Review for a satellite?",
    a: "A Test Readiness Review (TRR) is held before a formal verification test, such as system-level thermal vacuum or vibration testing, to confirm that the test article is in the right configuration, procedures are approved and traced to requirements, facilities and instrumentation are calibrated, prerequisite tests are complete, open anomalies are dispositioned and safety controls are in place. Its purpose is to ensure the test will produce valid, traceable evidence.",
  },
  {
    q: "What is the difference between PDR and CDR?",
    a: "A Preliminary Design Review (PDR) shows that the preliminary design meets the requirements with acceptable risk and margin, so the project can commit to detailed design. A Critical Design Review (CDR) shows that the detailed design is complete, analyses close against the released design, and the project is ready to build, integrate and verify.",
  },
  {
    q: "What is a Flight Readiness Review?",
    a: "A Flight Readiness Review (FRR) examines the tests, analyses, demonstrations and audits behind a flight system to determine whether it is ready for a safe and successful flight or launch, including its launch-vehicle interfaces, open anomalies, waivers and residual risk.",
  },
  {
    q: "What does MRR mean on this site?",
    a: "In GAMYAA's illustrative model, MRR means Mission Readiness Review: the final integrated readiness review across flight system, launch, ground segment and operations. Some programmes combine it with the Flight Readiness Review or use launch readiness reviews instead.",
  },
  {
    q: "What evidence is needed before a spacecraft review?",
    a: "It depends on the review and the programme's entrance criteria. In general: the documents the review assesses at the right revision, the analyses and test results that support them, the current status of requirements and their verification, open issues (NCRs, anomalies, deviations, waivers) with their dispositions, risks, and the closure of actions from the previous review.",
  },
];

export default function ReviewGatesPage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Spacecraft review gates: from Mission Concept Review to Mission Readiness Review"
        description={DESCRIPTION}
        about={["Spacecraft review gates", "Test Readiness Review", "Preliminary Design Review", "Critical Design Review", "Flight Readiness Review"]}
      />
      <JsonLd data={faqLd(FAQ)} />

      <LearnHero
        page={page}
        topic="Reviews"
        title="Spacecraft review gates: from Mission Concept Review to Mission Readiness Review"
        answer={
          <>
            <p>
              An engineering review gate is a planned decision point where a review board examines the evidence and
              decides whether a programme is ready to proceed. Each review has entrance criteria (what must exist
              before it is held) and success criteria (what must be shown to pass).
            </p>
            <p className="mt-3">
              Review names, order and criteria differ between organisations and frameworks. The sequence on this page is
              an illustrative GAMYAA model for a satellite, not a mandated lifecycle.
            </p>
          </>
        }
      />

      <ArticleSection id="what" n="01" title="What happens at a review gate">
        <p>
          A review is not a presentation; it is an assessment of evidence against criteria agreed in advance. A typical
          gate follows the same pattern:
        </p>
        <ol>
          <li>Entrance criteria are checked: the required documents, analyses and results exist at the right revision.</li>
          <li>Reviewers examine the material and raise review items or actions.</li>
          <li>The board assesses the success criteria and the open items.</li>
          <li>
            A decision is recorded: proceed, proceed with conditions, or not ready (with a delta review). Conditions
            and actions are tracked to closure.
          </li>
        </ol>
        <p>
          The hard part is the first step. Assembling an evidence package that is complete, current and consistent
          with the configuration under review can take weeks, and it is exactly where stale evidence slips through.
        </p>
      </ArticleSection>

      <ArticleSection id="configurable" n="02" title="Why review gates must be configurable">
        <p>
          There is no single universal spacecraft lifecycle. NASA defines life-cycle reviews and their entrance and
          success criteria in its own systems-engineering requirements; ECSS project phasing defines a different review
          set, including qualification and acceptance reviews. Commercial and small-satellite programmes often combine
          or rename reviews; customers may add their own.
        </p>
        <p>AEAIP&apos;s Configurable Assurance Gates are designed so that each programme defines:</p>
        <ul>
          <li>review names and their order</li>
          <li>entrance criteria and success criteria</li>
          <li>the evidence required, by requirement set and subsystem</li>
          <li>who sits on the board and who can accept conditions or risk</li>
        </ul>
        <p>
          The eleven gates below are the illustrative sequence used in the{" "}
          <Link href={aero("/aeaip/demo")}>Interactive Assurance Demo</Link>. Not every gate is mandatory under NASA,
          ISRO or ECSS practice, and the sequence is not presented as &ldquo;the NASA lifecycle&rdquo;.
        </p>
      </ArticleSection>

      <section aria-label="Illustrative sequence" className="border-t border-line py-12 md:py-16">
        <Container>
          <GateRail highlight="" />
        </Container>
      </section>

      <section aria-labelledby="gates-title" className="border-t border-line py-12 md:py-16" data-ga-section="gate_detail">
        <Container>
          <p className="font-mono text-xs text-subtle">03</p>
          <h2 id="gates-title" className="mt-2 text-2xl font-medium tracking-tight text-ink sm:text-[1.75rem]">
            Gate by gate
          </h2>
          <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-2">
            For each review: its purpose, the questions it asks, the evidence it typically examines, the readiness
            question in one line, and what AEAIP would evaluate. Educational and high-level; a programme&apos;s own
            criteria always govern.
          </p>
          <ol className="mt-10 space-y-6">
            {GATES.map((g, i) => (
              <li key={g.code} id={g.code.toLowerCase()} className="scroll-mt-28">
                <article aria-labelledby={`${g.code}-title`} className="card p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 id={`${g.code}-title`} className="text-2xl font-medium tracking-tight text-ink">
                      <span className="font-mono text-accent">{g.code}</span> — {g.name}
                    </h3>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                      Gate {String(i + 1).padStart(2, "0")} · {g.stage}
                    </p>
                  </div>
                  <p className="mt-4 max-w-4xl text-[0.9375rem] leading-relaxed text-ink-2">{g.purpose}</p>
                  <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
                    <div>
                      <h4 className="eyebrow">Typical questions</h4>
                      <BulletList items={g.questions} className="mt-3 text-sm" />
                    </div>
                    <div>
                      <h4 className="eyebrow">Typical evidence</h4>
                      <BulletList items={g.evidence} className="mt-3 text-sm" />
                    </div>
                    <div>
                      <h4 className="eyebrow">What AEAIP would evaluate</h4>
                      <BulletList items={g.aeaip} className="mt-3 text-sm" />
                    </div>
                  </div>
                  <p className="mt-6 border-l-2 border-accent pl-4 text-[0.9375rem] text-ink">
                    <span className="eyebrow mr-2">Readiness</span>
                    {g.readiness}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ArticleSection id="pdr-cdr" n="04" title="PDR and CDR: what is the difference?">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">PDR compared with CDR</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-3" />
              <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">PDR</th>
              <th scope="col" className="py-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">CDR</th>
            </tr>
          </thead>
          <tbody>
            {PDR_CDR.map(([k, a, b]) => (
              <tr key={k} className="border-b border-line align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-ink">{k}</th>
                <td className="py-2.5 pr-3 text-ink-2">{a}</td>
                <td className="py-2.5 text-ink-2">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          A common failure between the two: analyses presented at CDR were run on an earlier design revision. In AEAIP
          terms, the analysis evidence is At Risk because its configuration no longer matches the design being
          reviewed.
        </p>
      </ArticleSection>

      <ArticleSection id="readiness" n="05" title="Readiness is evidence plus conditions">
        <p>
          Most real gates do not end in a clean GO. They end in a decision with conditions: actions that must close
          before a specific later point, such as before the test starts or before shipment. Conditions are where
          programmes lose track, because they live in minutes and action lists rather than next to the evidence they
          qualify.
        </p>
        <p>
          AEAIP is designed to keep each condition attached to the requirement, item and evidence it affects, and to
          carry it forward to the gate where it must be closed. In the demo, eight conditional items allow TRR to
          proceed and become blockers at SAR.
        </p>
        <AeaipRelation status="architecture">
          <p>
            Configurable Assurance Gates are part of the AEAIP architecture: gate definitions, criteria and evidence
            requirements as configuration rather than code. The demo shows the concept with fictitious data.
          </p>
        </AeaipRelation>
      </ArticleSection>

      <FaqSection title="Review gate questions" items={FAQ} />

      <RelatedTopics
        current={page.slug}
        slugs={["verification-validation", "satellites-spacecraft", "configuration-assurance", "engineering-evidence-graph", "glossary"]}
      />
      <References
        status="architecture"
        items={refs("npr-7123", "nasa-seh", "nasa-seh-phase-d", "nasa-seh-assessment", "ecss-project", "iso-15288", "incose-handbook")}
      />
      <LearnCta
        title="How long does your evidence package take to assemble?"
        body="Tell us how your team prepares for its next review, and where readiness questions are hardest to answer."
      />
    </>
  );
}
