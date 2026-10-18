import { AIRCERT } from "@/content/aircert";
import { DAQIP } from "@/content/daqip";
import { PRODUCT_STATUS } from "@/content/status";
import { aero, EXTERNAL } from "@/lib/site";
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
        <p className="mt-6 text-xl leading-snug tracking-tight text-ink">{DAQIP.tagline}</p>
        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{DAQIP.summary}</p>
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
        <p className="mt-6 text-xl leading-snug tracking-tight text-ink">{AIRCERT.line}</p>
        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{AIRCERT.statement}</p>
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
