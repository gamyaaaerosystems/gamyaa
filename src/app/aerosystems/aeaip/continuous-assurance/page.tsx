import Link from "next/link";
import { ChangeImpactPropagation } from "@/components/system/change-impact";
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
import { learnPage } from "@/content/aeaip";
import { refs } from "@/content/references";
import { pageMetadata } from "@/lib/seo";

const page = learnPage("continuous-assurance");
const TITLE = "Continuous Engineering Assurance — Change Impact on Verification & Readiness | AEAIP";
const DESCRIPTION =
  "Continuous engineering assurance: how an engineering change propagates to requirements, verification evidence, tests and review readiness, and what stays a human decision.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const IMPACT_NOTES: Array<[string, string]> = [
  ["12 requirements affected", "Requirements allocated to the processor board or to functions it hosts, such as timing, power draw and fault detection."],
  ["4 verification results potentially invalidated", "Results produced on board Rev D whose subject the change could influence: power consumption, thermal dissipation, boot timing and watchdog behaviour."],
  ["3 tests may require rerun", "Tests an engineer is likely to re-run after disposition, such as a HIL timing regression, a thermal-cycling functional test and a conducted-emissions check."],
  ["2 qualification artefacts affected", "Qualification evidence that cites the earlier revision, for example the board's qualification test report and its similarity rationale."],
  ["1 cybersecurity assessment affected", "The secure-boot assessment was performed on Rev D, whose boot ROM configuration changed."],
];

export default function ContinuousAssurancePage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Continuous engineering assurance: from engineering change to readiness impact"
        description={DESCRIPTION}
        about={["Continuous engineering assurance", "Change impact analysis", "Verification evidence", "Readiness"]}
      />

      <LearnHero
        page={page}
        topic="Continuous assurance"
        status="concept"
        title="Continuous engineering assurance: from engineering change to readiness impact"
        answer={
          <>
            <p>
              Continuous engineering assurance means re-evaluating verification status and readiness each time an
              engineering change is approved, instead of reconstructing it before every review.
            </p>
            <p className="mt-3">
              Each change is traced to the requirements, evidence, tests and reviews it affects, so engineers can decide
              what must be re-verified while there is still time. In AEAIP this is a concept, not a released capability.
            </p>
          </>
        }
        visual={<ChangeImpactPropagation />}
      />

      <ArticleSection id="decay" n="01" title="Readiness decays between reviews">
        <p>
          A review gate is a snapshot. The evidence package is assembled, checked and presented, and the board decides.
          The next day, the programme keeps changing: change requests are approved, nonconformances are dispositioned,
          software builds are released.
        </p>
        <p>
          Each change is managed correctly on its own terms. What is not continuously maintained is the answer to the
          readiness question: given everything that has changed, what do we still know to be verified? That answer is
          rebuilt, by hand, before the next review. Continuous assurance aims to keep it current instead.
        </p>
      </ArticleSection>

      <ArticleSection id="chain" n="02" title="From change to readiness impact">
        <FlowChain
          label="Continuous assurance chain"
          orientation="vertical"
          numbered
          steps={[
            "Engineering change approved",
            "Impact analysis through the evidence graph",
            "Affected evidence flagged At Risk",
            "Verification reopened where engineers decide it must be",
            "Readiness impact shown for each upcoming gate",
            "Retest or re-analysis on the new configuration",
            "Closure re-approved; readiness restored",
          ]}
        />
        <p>
          The graph does the tracing; engineers make the judgements. Impact analysis follows the{" "}
          <Link href={learnPage("engineering-evidence-graph").href}>Engineering Evidence Graph™</Link> from the changed
          item to evidence produced on its earlier revision, to the requirements that evidence closed, to the reviews
          that relied on them.
        </p>
      </ArticleSection>

      <ArticleSection id="example" n="03" title="What each number in the example means" wide>
        <dl className="grid max-w-5xl gap-x-10 gap-y-4 md:grid-cols-2">
          {IMPACT_NOTES.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.9375rem] font-medium text-ink">{k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
      </ArticleSection>

      <ArticleSection id="suspect" n="04" title="From suspect links to suspect evidence">
        <p>
          Requirements management tools commonly flag a trace link as suspect when an item at one end changes. That is
          valuable, and it works within the tool&apos;s own data.
        </p>
        <p>
          Continuous assurance extends the idea in two directions: from links to evidence validity, by comparing the
          configuration evidence was produced on with the current baseline; and across tool boundaries, so a change in a
          PLM system can affect a test result held in a test system and a review package held somewhere else.
        </p>
      </ArticleSection>

      <ArticleSection id="human" n="05" title="What stays a human decision">
        <ul>
          <li>Whether a change actually affects a piece of evidence, or can be retained with a rationale.</li>
          <li>Whether to re-test, re-analyse or accept a residual risk.</li>
          <li>Whether a gate proceeds, proceeds with conditions or waits.</li>
        </ul>
        <p>
          Continuous assurance narrows the question engineers have to answer. It does not answer it for them, and it
          never closes a requirement or changes a gate decision on its own.
        </p>
      </ArticleSection>

      <ArticleSection id="prerequisites" n="06" title="What a programme needs for this to work">
        <ul>
          <li>Configuration identifiers on every item, build and document that evidence refers to.</li>
          <li>Evidence recorded against the configuration it was produced on, not only against the requirement.</li>
          <li>Change control that names the items affected, so impact can be traced from them.</li>
          <li>Agreed rules for which changes need re-verification, and who decides.</li>
        </ul>
        <p>
          None of this is new; it is good configuration management. The difference is using it continuously rather than
          at audit time. See <Link href={learnPage("configuration-assurance").href}>configuration-aware evidence validity</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="aeaip" n="07" title="Where AEAIP fits">
        <AeaipRelation status="concept">
          <p>
            Continuous Engineering Assurance is stage 3 of the AEAIP product evolution. It depends on the evidence
            foundation (stage 1) and on verification intelligence, including evidence validity (stage 2). The example on
            this page is illustrative; no continuous-assurance software exists today.
          </p>
        </AeaipRelation>
        <ReviewStages codes={["CDR", "TRR", "SAR", "FRR"]} note="Changes late in the lifecycle carry the most readiness risk." />
      </ArticleSection>

      <RelatedTopics
        current={page.slug}
        slugs={["configuration-assurance", "engineering-evidence-graph", "review-gates", "operational-evidence", "cybersecurity-assurance"]}
      />
      <References status="concept" items={refs("nasa-seh-cm", "nasa-seh-verification", "eia-649", "iso-10007", "ecss-cm")} />
      <LearnCta
        title="What did your last late change cost?"
        body="Tell us how your team finds the evidence a change affects."
      />
    </>
  );
}
