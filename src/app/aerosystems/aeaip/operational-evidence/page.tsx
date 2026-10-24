import Link from "next/link";
import { PtfFigure } from "@/components/aeaip/diagrams";
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
import { learnPage, PTF_CHAIN } from "@/content/aeaip";
import { refs } from "@/content/references";
import { pageMetadata } from "@/lib/seo";

const page = learnPage("operational-evidence");
const TITLE = "Predicted → Tested → Flown: Digital Twin, Qualification & Satellite Telemetry Evidence | AEAIP";
const DESCRIPTION =
  "How simulation and digital-twin predictions, ground qualification and acceptance results, and satellite flight telemetry can be linked to the same requirement as one evidence chain.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const KINDS: Array<{ title: string; source: string; strength: string; limit: string }> = [
  {
    title: "Predicted",
    source: "Analysis, simulation, digital twins",
    strength: "Covers cases that cannot be tested: full orbits, worst-case combinations, thousands of dispersions.",
    limit: "Only as credible as the model, its validation range and its inputs.",
  },
  {
    title: "Tested",
    source: "Qualification and acceptance testing on the ground",
    strength: "Measured behaviour of real hardware under controlled, often enveloping, conditions.",
    limit: "A finite set of conditions, on a specific article and configuration.",
  },
  {
    title: "Flown",
    source: "Telemetry, health monitoring, anomaly records",
    strength: "The actual behaviour of the actual system in the actual environment.",
    limit: "Arrives after the decisions it would have informed, and only for conditions the mission meets.",
  },
];

export default function OperationalEvidencePage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Predicted → Tested → Flown: linking simulation, qualification and flight telemetry"
        description={DESCRIPTION}
        about={["Digital twin verification evidence", "Satellite telemetry evidence", "Spacecraft qualification evidence", "Model correlation"]}
      />

      <LearnHero
        page={page}
        topic="Operational evidence"
        status="concept"
        title="Predicted → Tested → Flown: linking simulation, qualification and flight telemetry"
        answer={
          <>
            <p>
              Predicted → Tested → Flown follows one requirement through its whole evidence life: the model that
              predicted the behaviour, the ground test that measured it, and the flight telemetry that shows how it
              actually behaved.
            </p>
            <p className="mt-3">
              Linking the three lets engineers see margins, correlate models and feed real performance into the next
              design. In AEAIP, digital twins and telemetry are evidence sources, not separate platforms.
            </p>
          </>
        }
      />

      <ArticleSection id="kinds" n="01" title="Three kinds of evidence for one requirement" wide>
        <ul className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {KINDS.map((k) => (
            <li key={k.title} className="bg-surface p-6">
              <h3 className="font-mono text-sm uppercase tracking-[0.1em] text-accent">{k.title}</h3>
              <p className="mt-2 text-[0.9375rem] font-medium text-ink">{k.source}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Strength · </span>
                {k.strength}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Limit · </span>
                {k.limit}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-3xl">
          <FlowChain label="Predicted → Tested → Flown chain" steps={PTF_CHAIN} />
        </div>
      </ArticleSection>

      <ArticleSection id="example" n="02" title="Worked example: a battery temperature requirement" wide>
        <PtfFigure />
        <div className="prose-body mt-8 max-w-3xl">
          <p>
            The thermal model predicted a hot-case battery temperature of 27.5 °C against a 30 °C limit. Qualification
            thermal-vacuum testing measured 28.9 °C, so the model was correlated: it had been running about 1.4 °C cool.
            The corrected prediction still met the requirement, with less margin than first thought.
          </p>
          <p>
            Acceptance testing of the flight unit measured 28.4 °C. In the first ninety days of flight, telemetry showed
            21 °C to 26 °C, because real orbits and attitudes rarely sit at the worst case.
          </p>
          <p>
            Linked together, these records answer questions none of them answers alone: how much margin the mission
            really has, whether the correlated model is trustworthy for the next design, and whether the hot case should
            be revisited if the operations profile changes.
          </p>
        </div>
      </ArticleSection>

      <ArticleSection id="correlation" n="03" title="Model correlation closes the loop between predicted and tested">
        <p>
          Models are not assumed correct. Thermal models are correlated against thermal-vacuum measurements; structural
          models are updated against modal survey and vibration results. Correlation changes the model, which changes
          every prediction made with it.
        </p>
        <p>
          That makes the model version part of the evidence&apos;s configuration. A prediction from the uncorrelated
          model and one from the correlated model are different evidence, even for the same requirement. This is
          configuration-aware validity applied to simulation; see{" "}
          <Link href={learnPage("configuration-assurance").href}>configuration-aware evidence validity</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="digital-twins" n="04" title="Digital twins are evidence sources">
        <p>
          A digital twin is a model kept in step with a specific physical system using that system&apos;s data. It is
          useful exactly to the degree that its outputs can be trusted, which depends on:
        </p>
        <ul>
          <li>its version, and the data it was last updated with;</li>
          <li>the range over which it has been validated against test or flight data;</li>
          <li>the lineage of its inputs, including telemetry provenance.</li>
        </ul>
        <p>
          AEAIP treats a digital twin as one more producer of evidence, held to the same provenance and configuration
          rules as a test bench. It is not positioned as a separate GAMYAA platform.
        </p>
      </ArticleSection>

      <ArticleSection id="telemetry" n="05" title="Telemetry as operational evidence">
        <p>
          After launch, commissioning activities verify functions that could not be fully verified on the ground, such
          as deployments and end-to-end payload performance. Through the mission, telemetry trending shows margins and
          degradation, and anomaly records show where the system behaved unexpectedly.
        </p>
        <p>
          When an in-flight anomaly occurs, the investigation goes back to the ground evidence: what was predicted, what
          was tested, on which configuration. A connected record shortens that investigation and makes its lessons
          reusable for the next mission&apos;s requirements and margins.
        </p>
      </ArticleSection>

      <ArticleSection id="aeaip" n="06" title="Where AEAIP fits">
        <AeaipRelation status="concept">
          <p>
            Linking simulation, ground test and flight evidence to the same requirement is a defined concept in the
            AEAIP architecture. Operational Assurance is stage 5 of the product evolution, a long-term direction. No
            telemetry or simulation integration exists today.
          </p>
        </AeaipRelation>
        <ReviewStages codes={["CDR", "TRR", "SAR", "ORR", "MRR"]} note="Predictions are baselined at CDR, tested from TRR and accepted at SAR; operations readiness and mission readiness look ahead to flight evidence." />
      </ArticleSection>

      <RelatedTopics
        current={page.slug}
        slugs={["satellites-spacecraft", "verification-validation", "configuration-assurance", "continuous-assurance", "engineering-evidence-graph"]}
      />
      <References status="concept" items={refs("nasa-seh-verification", "nasa-seh-validation", "gevs", "ecss-testing", "ecss-verification")} />
      <LearnCta
        title="Do your flight results reach your next design?"
        body="Tell us how your team connects analysis, test and flight data today."
      />
    </>
  );
}
