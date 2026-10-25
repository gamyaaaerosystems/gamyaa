import Link from "next/link";
import { EngineArchitecture } from "@/components/aeaip/diagrams";
import { EvidenceGraphExplorer } from "@/components/system/evidence-graph-explorer";
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
import { ISSUES } from "@/content/aeaip-demo";
import { refs } from "@/content/references";
import { pageMetadata } from "@/lib/seo";

const page = learnPage("engineering-evidence-graph");
const TITLE = "Engineering Evidence Graph™ — Engineering Evidence Traceability | AEAIP";
const DESCRIPTION =
  "What an engineering evidence graph is: nodes, typed relationships, configuration, provenance, evidence validity, human approval and change impact, with a worked spacecraft example.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const NODES: Array<[string, string]> = [
  ["Mission / need", "Why the system exists: the objective a stakeholder needs met."],
  ["Stakeholder, system and derived requirements", "What must be true, at each level, with source, revision and rationale."],
  ["Architecture, subsystem, component", "What implements the requirement, down to the configuration item."],
  ["Interface", "An agreement between two items, owned on both sides."],
  ["Design artefact", "Drawings, models, analyses and software design, each at a revision."],
  ["Configuration", "The exact set of revisions, serial numbers, builds and settings a result applies to."],
  ["Implementation / manufacturing", "The as-built item, including its manufacturing and inspection records."],
  ["Verification activity", "Inspection, analysis, simulation, demonstration or test, with its procedure revision."],
  ["Raw evidence", "Measured data, logs and reports, with origin and integrity information."],
  ["Issue", "NCR, anomaly, risk, deviation or waiver, linked to what it affects."],
  ["Corrective action and retest", "What was changed in response, and the evidence that it worked."],
  ["Closure, approval and review", "Who closed the requirement, who approved it, and which review relied on it."],
];

const EDGES: Array<[string, string]> = [
  ["derives from", "A derived requirement and the parent it implements."],
  ["allocated to", "A requirement and the subsystem or component responsible for it."],
  ["verified by", "A requirement and the verification activity planned to prove it."],
  ["produced on", "Evidence and the configuration it was produced on. This edge makes validity computable."],
  ["produced with", "Evidence and the procedure, tool, facility and calibration used."],
  ["affects", "An issue and every requirement, item or evidence record it touches."],
  ["resolved by", "An issue and its corrective action, retest and closure."],
  ["supersedes", "Newer evidence and the older evidence it replaces (kept for history)."],
  ["approved by", "A closure or decision and the authorised person who made it."],
  ["relied on by", "Evidence and each review or certification package that used it."],
];

export default function EvidenceGraphPage() {
  const fsw = ISSUES.find((i) => i.id === "ANM-0219")!;
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Engineering Evidence Graph™: connecting requirements, configuration and evidence"
        description={DESCRIPTION}
        about={["Engineering evidence traceability", "Requirements traceability", "Verification evidence", "Configuration management"]}
      />
      <LearnHero
        page={page}
        topic="Traceability"
        status="architecture"
        title="Engineering Evidence Graph™: connecting requirements, configuration and evidence"
        answer={
          <>
            <p>
              An engineering evidence graph records every engineering artefact — need, requirement, design item,
              configuration, verification activity, evidence, issue and approval — as a node, and every dependency
              between them as a typed relationship.
            </p>
            <p className="mt-3">
              Engineering evidence traceability means you can walk from a mission need to the exact result that proves
              it, and back from any result to every requirement and review that relies on it. The Engineering Evidence
              Graph™ is GAMYAA&apos;s model for this; it is in architecture and not yet released.
            </p>
          </>
        }
        visual={<EvidenceGraphExplorer />}
      />

      <ArticleSection id="why-graph" n="01" title="Why traceability needs a graph, not only a matrix">
        <p>
          A verification matrix is the classic tool: one row per requirement, columns for method, event, evidence and
          status. It is indispensable, and it is two-dimensional. Real assurance questions are not.
        </p>
        <p>
          &ldquo;Is this requirement verified?&rdquo; depends on the evidence, which depends on the configuration it
          was produced on, the procedure revision used, the anomaly raised during the test, the corrective action, the
          retest and the person who closed it. Each of those has its own history. A requirement may be verified by
          several activities, and one test may verify dozens of requirements.
        </p>
        <p>
          Those are many-to-many, multi-step relationships. A graph holds them naturally, and lets a question travel
          in either direction: down from a need to its evidence, or up from a changed part to every conclusion that
          depended on it.
        </p>
      </ArticleSection>

      <ArticleSection id="nodes" n="02" title="Nodes: the things being connected" wide>
        <dl className="grid gap-x-12 md:grid-cols-2">
          {NODES.map(([k, v]) => (
            <div key={k} className="border-t border-line py-4">
              <dt className="text-[0.9375rem] font-medium text-ink">{k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted">
          Every node carries an identifier, a revision, an owner, a status and its provenance.
        </p>
      </ArticleSection>

      <ArticleSection
        id="relationships"
        n="03"
        title="Relationships: typed, directional, traversable both ways"
        lede="The value is in the edges. A typed relationship says not only that two things are connected, but how."
      >
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Relationship types in the Engineering Evidence Graph</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-4 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                Relationship
              </th>
              <th scope="col" className="py-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                Connects
              </th>
            </tr>
          </thead>
          <tbody>
            {EDGES.map(([k, v]) => (
              <tr key={k} className="border-b border-line align-top">
                <th scope="row" className="whitespace-nowrap py-2.5 pr-4 font-mono text-xs font-normal text-accent">
                  {k}
                </th>
                <td className="py-2.5 text-ink-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Bidirectional traceability is a property of these edges, not a separate report. Downward, a stakeholder need
          resolves to the evidence that satisfies it. Upward, a test result resolves to every requirement, review and
          certification package that relies on it, which is exactly the question a change raises.
        </p>
      </ArticleSection>

      <ArticleSection id="configuration" n="04" title="Configuration is a node, not a column">
        <p>
          Most traceability records say that a requirement is verified by a test. Fewer record which configuration the
          test ran on: requirement revision, hardware revision and serial number, software build, procedure revision,
          tool version and test environment.
        </p>
        <p>
          In the Engineering Evidence Graph, the configuration is its own node, and every piece of evidence has a{" "}
          <strong>produced on</strong> relationship to it. A baseline under review is also a configuration. Comparing
          the two is what makes evidence validity computable rather than a matter of memory.
        </p>
        <p>
          NASA&apos;s guidance on product verification already expects verification reports to record the version of
          the requirements and of the product that was verified. The graph turns that record into something that can be
          queried across thousands of results.
        </p>
      </ArticleSection>

      <ArticleSection id="provenance" n="05" title="Provenance: where every node came from">
        <ul>
          <li>Origin: the system of record, file or instrument a record came from, and when.</li>
          <li>Integrity: a content hash of raw evidence, so a later copy can be shown to be identical.</li>
          <li>Production context: procedure revision, facility, instrumentation and calibration status.</li>
          <li>
            Authorship: who created, edited and approved it. Links suggested by AI are marked as suggestions until an
            engineer accepts them.
          </li>
        </ul>
        <p>
          Provenance is what lets a reviewer trust a status without re-deriving it, and what lets an auditor reconstruct
          why a decision was made.
        </p>
      </ArticleSection>

      <ArticleSection id="validity" n="06" title="Evidence validity and change impact">
        <p>
          Because evidence is linked to its configuration, a change to any configuration item can be followed to every
          piece of evidence produced on the old revision, then to every requirement that evidence closed, then to every
          review that relied on it.
        </p>
        <p>
          That traversal is the basis of two AEAIP concepts:{" "}
          <Link href={learnPage("configuration-assurance").href}>configuration-aware evidence validity</Link> and{" "}
          <Link href={learnPage("continuous-assurance").href}>continuous engineering assurance</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="approval" n="07" title="Human approval is part of the graph">
        <p>
          Closure and approval are nodes too: who decided, in what role, under which authority, on what date and on
          the basis of which evidence. A requirement is not closed because a status field changed; it is closed because
          an authorised person approved a closure that points to current evidence.
        </p>
        <p>
          AI in AEAIP can propose links, classify evidence and draft closure rationale. It cannot create an approval.
        </p>
      </ArticleSection>

      <ArticleSection
        id="example"
        n="08"
        title="Worked example: one evidence chain"
        lede="A fictitious flight-software requirement, from the Interactive Assurance Demo."
      >
        <details className="group">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-ink">
            <span aria-hidden className="text-subtle transition-transform group-open:rotate-90">›</span>
            Show the full FSW-247 evidence chain ({fsw.trace.length} steps)
          </summary>
          <FlowChain className="mt-4" label="Example evidence chain for FSW-247" orientation="vertical" numbered steps={fsw.trace.map((t) => `${t.label}: ${t.value}`)} />
        </details>
        <p>
          Every step is a node; every arrow is a typed relationship. The chain shows not only that FSW-247 is not yet
          verified, but exactly why, what has been done about it and who still has to act.
        </p>
      </ArticleSection>

      <ArticleSection
        id="engine"
        n="09"
        title="Assurance Intelligence Engine™: reasoning over the graph"
        lede="The engine is the second core technology. It asks questions of the graph that people otherwise answer by hand before every review."
        wide
      >
        <EngineArchitecture />
        <div className="prose-body mt-8 max-w-3xl">
          <p>Examples of the questions it is designed to answer, in plain language:</p>
          <ul>
            <li>Which requirements allocated to the on-board computer have evidence produced on a board revision older than the one being integrated?</li>
            <li>Which requirements does the system-level TVAC test close, and which of them still have open anomalies?</li>
            <li>Which waivers were approved internally but not yet accepted by the customer, and which gate needs them?</li>
            <li>What is the shortest list of actions that would move this subsystem from CONDITIONAL to READY for TRR?</li>
          </ul>
          <p>
            Its output is a set of findings with the graph path that explains each one. It is in research; nothing in
            it closes a requirement or makes a readiness decision.
          </p>
        </div>
      </ArticleSection>

      <ArticleSection id="tools" n="10" title="How this relates to existing engineering tools">
        <p>
          Requirements management and ALM tools already provide traceability, verification tracking and change
          flagging, often called suspect links. PLM systems manage configuration and product structure. Test and
          quality systems hold results and nonconformances.
        </p>
        <p>
          The Engineering Evidence Graph is not intended to replace them. It is intended to connect their records into
          one assurance view, with configuration-aware validity across tool boundaries. No integrations are implemented
          today; they are on the roadmap.
        </p>
        <AeaipRelation status="architecture">
          <p>
            The node and relationship model is being defined for the first domain, satellites and spacecraft. The
            reasoning layer, the Assurance Intelligence Engine™, is in research.
          </p>
        </AeaipRelation>
      </ArticleSection>

      <ArticleSection id="stages" n="11" title="Where it matters in the lifecycle">
        <ReviewStages
          codes={["SRR", "PDR", "CDR", "TRR", "SAR", "FRR"]}
          note="Traceability is established at SRR, tested for completeness at PDR and CDR, and relied on for closure from TRR to FRR."
        />
      </ArticleSection>

      <RelatedTopics
        current={page.slug}
        slugs={["configuration-assurance", "continuous-assurance", "verification-validation", "review-gates", "glossary"]}
      />
      <References
        status="architecture"
        items={refs("nasa-seh-verification", "nasa-seh-cm", "iso-15288", "iso-29148", "eia-649", "incose-handbook", "sebok-verification")}
      />
      <LearnCta
        title="How do your teams trace evidence today?"
        body="We are defining the Engineering Evidence Graph with practising engineers. Tell us where traceability breaks down in your programme."
      />
    </>
  );
}
