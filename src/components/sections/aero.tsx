import { AIRCERT } from "@/content/aircert";
import { DAQIP } from "@/content/daqip";
import { PRODUCT_STATUS } from "@/content/status";
import { aero, EXTERNAL } from "@/lib/site";
import type { ProblemTopic } from "@/lib/analytics";
import { PROBLEM_HREF, problemGa } from "./shared";
import { ArrowLink, KeywordLine, StatusBadge } from "@/components/ui/primitives";

/** The two flagship product cards used on the AeroSystems and Products pages. */
export function ProductCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <article className="card ticks flex flex-col p-6 sm:p-10" data-ga-section="product_daqip">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">Platform 01</span>
          <StatusBadge status={PRODUCT_STATUS.daqip} />
        </div>
        <H className="mt-8 text-4xl font-medium tracking-tight text-ink sm:text-5xl">{DAQIP.name}</H>
        <p className="mt-3 text-lg font-medium text-ink-2">{DAQIP.expanded}</p>
        <p className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-muted">{DAQIP.shortExplanation}</p>
        <p className="mt-6 text-lg leading-snug tracking-tight text-ink">{DAQIP.coreMessage}</p>
        <KeywordLine className="mt-6" items={["FAI", "AS9102", "Inspection", "Supplier quality", "Evidence"]} />
        <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:gap-8">
          <ArrowLink href={aero("/daqip")} label="Explore DAQIP">
            Explore DAQIP
          </ArrowLink>
          <ArrowLink
            href={EXTERNAL.daqipResearch}
            ga={{ event: "daqip_research_click" }}
            label="Research & Product Development"
          >
            Research &amp; Product Development
          </ArrowLink>
        </div>
      </article>

      <article className="card ticks flex flex-col p-6 sm:p-10" data-ga-section="product_aircert">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">Platform 02</span>
          <StatusBadge status={PRODUCT_STATUS.aircert} />
        </div>
        <H className="mt-8 text-4xl font-medium tracking-tight text-ink sm:text-5xl">{AIRCERT.name}</H>
        <p className="mt-3 text-lg font-medium text-ink-2">{AIRCERT.subtitle}</p>
        <p className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-muted">{AIRCERT.shortExplanation}</p>
        <p className="mt-6 text-lg leading-snug tracking-tight text-ink">{AIRCERT.line}</p>
        <KeywordLine
          className="mt-6"
          items={["Certification basis", "Compliance matrix", "Safety", "Qualification", "Evidence"]}
        />
        <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:gap-8">
          <ArrowLink href={aero("/aircert-ai")} ga={{ event: "aircert_learn_more_click" }} label="Explore AirCert AI">
            Explore AirCert AI
          </ArrowLink>
        </div>
      </article>
    </div>
  );
}

/** "Engineering Evidence": what exists today, not only the vision. */
export function EngineeringEvidence() {
  const items: Array<{
    tag: string;
    title: string;
    body: string;
    cta: string;
    href: string;
    ga?: Parameters<typeof ArrowLink>[0]["ga"];
  }> = [
    {
      tag: "Interactive · illustrative data",
      title: "Interactive FAI Prototype",
      body: "Explore ballooned characteristics, inspection traceability and engineering evidence relationships.",
      cta: "Explore DAQIP Prototype",
      href: `${aero("/daqip")}#fai-prototype`,
    },
    {
      tag: "Research programme",
      title: "DAQIP Research & Development",
      body: "Explore the engineering research, product architecture and development work behind DAQIP.",
      cta: "View Research",
      href: EXTERNAL.daqipResearch,
      ga: { event: "daqip_research_click" },
    },
    {
      tag: "Problem analysis",
      title: "Engineering Workflow Validation",
      body: "Aerospace and defence MSME problem analysis covering FAI, inspection, manufacturing quality and engineering documentation.",
      cta: "Explore Research",
      href: `${aero("/research")}#workflow-validation`,
    },
    {
      tag: "Status transparency",
      title: "Product Roadmap",
      body: "See current, in-development and planned engineering capabilities.",
      cta: "View Product Roadmap",
      href: `${aero("/products")}#roadmap`,
    },
  ];
  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i) => (
        <li key={i.title} className="flex flex-col bg-surface p-6 sm:p-7">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{i.tag}</p>
          <h3 className="mt-5 text-lg font-medium leading-snug text-ink">{i.title}</h3>
          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{i.body}</p>
          <ArrowLink href={i.href} ga={i.ga} label={i.cta} className="mt-6 self-start text-[0.9375rem]">
            {i.cta}
          </ArrowLink>
        </li>
      ))}
    </ul>
  );
}

const PROBLEMS: Array<{ title: string; body: string; product: string; topic: ProblemTopic }> = [
  {
    title: "FAI takes too long",
    body: "Manual drawing ballooning, spreadsheet-based characteristics and fragmented inspection evidence slow First Article Inspection.",
    product: "DAQIP™",
    topic: "fai",
  },
  {
    title: "Inspection evidence is disconnected",
    body: "Drawings, measurements, inspection records, revisions and approvals often exist across separate systems.",
    product: "DAQIP™",
    topic: "inspection",
  },
  {
    title: "Certification documentation delays engineering teams",
    body: "Requirements, compliance evidence, test documentation and approval workflows are difficult to coordinate across aerospace certification programmes.",
    product: "AirCert AI™",
    topic: "certification",
  },
];

/** "Problems We Are Solving": three short problems, each tied to a product. */
export function ProblemsList() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {PROBLEMS.map((p, i) => (
        <li key={p.title} className="flex flex-col border-t border-ink pt-5">
          <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight text-ink">{p.title}</h3>
          <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{p.body}</p>
          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
            Related product · <span className="text-accent">{p.product}</span>
          </p>
          <ArrowLink
            href={PROBLEM_HREF}
            ga={problemGa("problems", p.topic)}
            label="Discuss this problem"
            className="mt-2 self-start text-[0.9375rem]"
          >
            Discuss this problem
          </ArrowLink>
        </li>
      ))}
    </ol>
  );
}

/** Hero visual: a single characteristic traced to an approved evidence record. */
export function EvidenceRecordCard() {
  const rows: Array<[string, string]> = [
    ["Requirement", "Ø12.00 ±0.02 · Datum B"],
    ["Method", "Bore gauge · CMM verification"],
    ["Measurement", "Ø12.008"],
    ["Evidence", "AS9102 Form 3 · line 17"],
    ["Reviewer", "Quality engineer · verified"],
  ];
  return (
    <figure className="ticks border border-line bg-surface" aria-label="Illustrative evidence record for one characteristic">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">Evidence record</span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">Illustrative</span>
      </div>
      <div className="px-5 pb-5 pt-4">
        <p className="font-mono text-xs text-subtle">Characteristic</p>
        <p className="mt-0.5 text-3xl font-medium tracking-tight text-ink">#17</p>
        <dl className="relative mt-5">
          <span aria-hidden className="absolute bottom-[1.05rem] left-[4px] top-[1.05rem] w-px bg-line-strong" />
          {rows.map(([k, v], i) => (
            <div key={k} className="relative grid grid-cols-[6.5rem_1fr] items-baseline gap-x-3 py-1.5 pl-6">
              <span
                aria-hidden
                className="anim-fade-up absolute left-0 top-[0.8rem] size-[9px] rounded-full border border-ink bg-surface"
                style={{ animationDelay: `${300 + i * 90}ms` }}
              />
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{k}</dt>
              <dd className="text-sm text-ink">{v}</dd>
            </div>
          ))}
          <div className="relative grid grid-cols-[6.5rem_1fr] items-baseline gap-x-3 py-1.5 pl-6">
            <span
              aria-hidden
              className="anim-fade-up absolute left-0 top-[0.8rem] size-[9px] rounded-full"
              style={{ background: "var(--st-available)", animationDelay: "800ms" }}
            />
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Approval</dt>
            <dd className="text-sm font-medium text-ink">Approved by Quality</dd>
          </div>
        </dl>
      </div>
      <figcaption className="border-t border-line px-5 py-3 text-xs text-subtle">
        AI assists. Engineers verify. Quality approves.
      </figcaption>
    </figure>
  );
}
