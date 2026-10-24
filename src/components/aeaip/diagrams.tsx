import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { SourceLocation } from "@/lib/analytics";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, SmartLink, StatusBadge } from "@/components/ui/primitives";
import {
  AEAIP,
  AEAIP_HREF,
  ARCHITECTURE_NOTE,
  CHANGE_IMPACT_EXAMPLE,
  CORE_MODEL,
  ENGINE_FINDINGS,
  ENGINE_FLOW,
  SPECIALISED_PLATFORMS,
} from "@/content/aeaip";
import { GATES } from "@/content/review-gates";
import { PRODUCT_STATUS } from "@/content/status";
import { aero } from "@/lib/site";

/* All diagrams are HTML lists: the text is crawlable, readable by screen readers
   and survives without CSS. Decoration is aria-hidden. */

function FigureFrame({
  label,
  fig,
  children,
  className,
  note,
}: {
  label: string;
  fig?: string;
  children: ReactNode;
  className?: string;
  note?: ReactNode;
}) {
  return (
    <figure className={cn("ticks border border-line bg-surface p-5 sm:p-8", className)}>
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <span className="eyebrow">{label}</span>
        {fig ? <span className="font-mono text-xs text-subtle">{fig}</span> : null}
      </figcaption>
      {children}
      {note ? <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-subtle">{note}</p> : null}
    </figure>
  );
}

/* --------------------------------------------------- Platform hierarchy */

/**
 * PLATFORM 01 AEAIP™ full width and dominant; Platforms 02 and 03 below it, visibly
 * grouped under the AEAIP architecture by a connector and an explicit sentence.
 */
export function PlatformHierarchy({
  headingLevel = "h3",
  location,
}: {
  headingLevel?: "h2" | "h3";
  location: SourceLocation;
}) {
  const H = headingLevel;
  return (
    <div>
      <article
        className="ticks relative overflow-hidden border border-line-strong bg-surface p-6 sm:p-10 lg:p-12"
        data-ga-section="platform_aeaip"
        aria-labelledby="platform-aeaip-name"
      >
        <div aria-hidden className="tech-grid absolute inset-0 opacity-70" />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink">{AEAIP.platformNo}</span>
              <span aria-hidden className="h-px w-6 bg-line-strong" />
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">Flagship</span>
              <StatusBadge status={PRODUCT_STATUS.aeaip} />
            </div>
            <H id="platform-aeaip-name" className="display mt-8 text-5xl text-ink sm:text-6xl lg:text-7xl">
              {AEAIP.name}
            </H>
            <p className="mt-3 text-lg font-medium text-ink-2 sm:text-xl">
              Aerospace <strong className="font-semibold text-accent">Engineering Assurance</strong> Intelligence Platform
            </p>
            <ul aria-label="AEAIP promise" className="heading mt-8 space-y-2 text-2xl text-ink sm:text-[1.75rem]">
              {AEAIP.promiseLines.map((line) => (
                <li key={line} className="flex items-baseline gap-3">
                  <span aria-hidden className="h-px w-4 shrink-0 -translate-y-[0.3em] bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <p className="eyebrow mb-3">Core engineering chain</p>
              <ol aria-label="AEAIP core engineering chain" className="space-y-1.5">
                {AEAIP.chain.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="w-6 font-mono text-[0.6875rem] tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "flex-1 border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em]",
                        i === AEAIP.chain.length - 1 ? "border-ink bg-ink text-bg" : "border-line-strong bg-bg text-ink",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
              <div>
                <dt className="eyebrow">Initial focus</dt>
                <dd className="mt-1.5 text-ink">{AEAIP.initialFocus}</dd>
              </div>
              <div>
                <dt className="eyebrow">Category</dt>
                <dd className="mt-1.5 text-ink">{AEAIP.category}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="relative mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
          <SmartLink
            href={AEAIP_HREF}
            ga={{ event: "aeaip_explore", params: { source_location: location, platform: "aeaip" }, also: "platform_card_click" }}
            label="Explore AEAIP"
            className="btn btn-primary"
          >
            Explore AEAIP™
            <ArrowRight />
          </SmartLink>
          <SmartLink
            href={aero("/aeaip/demo")}
            ga={{ event: "aeaip_demo_open", params: { source_location: location } }}
            label="Explore Interactive Assurance Demo"
            className="btn btn-secondary"
          >
            Explore Interactive Assurance Demo
          </SmartLink>
        </div>
      </article>

      {/* Connector: AEAIP → specialised platforms */}
      <div aria-hidden className="relative hidden h-12 md:block">
        <span className="absolute left-1/2 top-0 h-6 w-px bg-line-strong" />
        <span className="absolute left-1/4 right-1/4 top-6 h-px bg-line-strong" />
        <span className="absolute left-1/4 top-6 h-6 w-px bg-line-strong" />
        <span className="absolute right-1/4 top-6 h-6 w-px bg-line-strong" />
      </div>
      <div aria-hidden className="ml-8 h-8 w-px bg-line-strong md:hidden" />

      <div className="border border-dashed border-line-strong p-3 sm:p-4">
        <p className="px-1 pb-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle sm:pb-4">
          Specialized platforms within the AEAIP™ architecture
        </p>
        <div className="grid gap-3 md:grid-cols-2 sm:gap-4">
          {SPECIALISED_PLATFORMS.map((p) => (
            <article
              key={p.key}
              className="card flex flex-col p-6 sm:p-8"
              data-ga-section={`platform_${p.key}`}
              aria-labelledby={`platform-${p.key}-name`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">{p.no}</span>
                <StatusBadge status={PRODUCT_STATUS[p.key as "daqip" | "aircert"]} />
              </div>
              <H id={`platform-${p.key}-name`} className="mt-6 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                {p.name}
              </H>
              <p className="mt-2 text-[0.9375rem] font-medium text-ink-2">{p.expanded}</p>
              <p className="mt-5 flex-1 font-mono text-xs uppercase tracking-[0.1em] text-accent">{p.category}</p>
              <ArrowLink
                href={p.href}
                ga={{ event: "platform_card_click", params: { platform: p.key as "daqip" | "aircert", source_location: location } }}
                label={p.cta}
                className="mt-5 self-start"
              >
                {p.cta}
              </ArrowLink>
            </article>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[0.9375rem] text-ink-2">{ARCHITECTURE_NOTE}</p>
    </div>
  );
}

/* --------------------------------------------------------- Core model */

export function CoreModel({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol aria-label="Requirement to readiness" className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-5">
      {CORE_MODEL.map((m, i) => (
        <li key={m.step} className="relative flex flex-col bg-surface p-5 sm:p-6">
          <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {i < CORE_MODEL.length - 1 ? <ArrowRight aria-hidden size={12} className="ml-auto hidden text-subtle md:block" /> : null}
          </p>
          <h3
            className={cn(
              "mt-3 font-mono text-sm uppercase tracking-[0.1em]",
              i === CORE_MODEL.length - 1 ? "text-accent" : "text-ink",
            )}
          >
            {m.step}
          </h3>
          <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink">{m.question}</p>
          {detailed ? <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------- Engineering Evidence Graph */

const GRAPH_LANES: Array<{ lane: string; nodes: string[] }> = [
  { lane: "Intent", nodes: ["Mission / Need", "Stakeholder Requirement", "System Requirement", "Derived Requirement"] },
  { lane: "Design", nodes: ["Architecture", "Subsystem / Component", "Interface", "Design Artifact"] },
  { lane: "Configuration", nodes: ["Configuration", "Implementation / Manufacturing"] },
  { lane: "Verification", nodes: ["Inspection · Analysis · Simulation · Demonstration · Test", "Raw Evidence"] },
  { lane: "Issues", nodes: ["NCR · Anomaly · Risk · Deviation · Waiver", "Corrective Action", "Retest / Re-analysis"] },
  { lane: "Authority", nodes: ["Verification Closure", "Authorized Approval", "Review / Certification / Mission Readiness"] },
];

/** 1-based position of the first node of each lane in the overall chain. */
const LANE_START = GRAPH_LANES.map((_, i) => GRAPH_LANES.slice(0, i).reduce((sum, l) => sum + l.nodes.length, 1));

export function EvidenceGraphFigure({ compact = false }: { compact?: boolean }) {
  return (
    <FigureFrame
      label="Engineering Evidence Graph™ — node chain"
      fig="FIG. EEG-1"
      note="Traversable in both directions: down from a need to the evidence that satisfies it, and up from any test result to every requirement and review it supports. Original GAMYAA model; status: Architecture."
    >
      <ol aria-label="Engineering Evidence Graph node chain" className="space-y-5">
        {GRAPH_LANES.map((l, li) => (
          <li key={l.lane} className="grid gap-2 lg:grid-cols-[9rem_1fr] lg:gap-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent lg:pt-2">{l.lane}</p>
            <ol className={cn("flex flex-col gap-1.5", !compact && "md:flex-row md:flex-wrap md:items-center")}>
              {l.nodes.map((node, ni) => {
                const n = LANE_START[li] + ni;
                const last = node.startsWith("Review /");
                return (
                  <li key={node} className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-flex min-h-9 items-center gap-2 border px-3 py-1.5 text-[0.8125rem]",
                        last ? "border-ink bg-ink text-bg" : "border-line-strong bg-bg text-ink",
                      )}
                    >
                      <span className={cn("font-mono text-[0.625rem] tabular-nums", last ? "opacity-70" : "text-subtle")}>
                        {String(n).padStart(2, "0")}
                      </span>
                      {node}
                    </span>
                    {!last ? <ArrowRight aria-hidden size={13} className={cn("hidden shrink-0 text-subtle", !compact && "md:block")} /> : null}
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </FigureFrame>
  );
}

/* --------------------------------------------- Assurance Intelligence Engine */

export function EngineArchitecture() {
  return (
    <FigureFrame
      label="Assurance Intelligence Engine™ — where it sits"
      fig="FIG. AIE-1"
      note="The engine prepares findings. It never closes a requirement, accepts a risk or makes the readiness decision. Status: Research."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <ol aria-label="AEAIP architecture flow" className="space-y-2 lg:col-span-6">
          {ENGINE_FLOW.map((step, i) => {
            const human = i === 3;
            const decision = i === ENGINE_FLOW.length - 1;
            return (
              <li key={step}>
                <div
                  className={cn(
                    "flex items-center gap-3 border px-4 py-3 text-[0.9375rem]",
                    human ? "border-accent bg-surface-accent text-ink" : decision ? "border-ink bg-ink text-bg" : "border-line-strong bg-bg text-ink",
                  )}
                >
                  <span className={cn("font-mono text-[0.6875rem] tabular-nums", decision ? "opacity-70" : "text-subtle")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{step}</span>
                  {human ? (
                    <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.1em] text-accent">Human decision</span>
                  ) : null}
                </div>
                {i < ENGINE_FLOW.length - 1 ? (
                  <span aria-hidden className="ml-7 block h-3 w-px bg-line-strong" />
                ) : null}
              </li>
            );
          })}
        </ol>
        <div className="lg:col-span-6">
          <p className="eyebrow mb-3">What it is designed to help identify</p>
          <ul className="flex flex-wrap gap-2">
            {ENGINE_FINDINGS.map((f) => (
              <li key={f} className="border border-line bg-bg px-2.5 py-1 text-sm text-ink-2">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FigureFrame>
  );
}

/* ------------------------------------------------- Evidence validity */

export const VALIDITY_EXAMPLE = {
  requirement: "SAT-EPS-014",
  text: "The EPS shall terminate battery charging at 4.10 V ±0.02 V per cell between 0 °C and 40 °C.",
  verified: "Verified in June by test report TR-EPS-114 (pass)",
  rows: [
    { item: "Requirement", then: "Rev 2 (±0.02 V)", now: "Rev 3 (±0.015 V)" },
    { item: "Battery management firmware", then: "BMS FW 2.3.0", now: "BMS FW 2.4.0" },
    { item: "EPS board", then: "PCB Rev B", now: "PCB Rev C" },
    { item: "EPS–OBC interface", then: "ICD Rev C", now: "ICD Rev D" },
    { item: "Test procedure", then: "TP-EPS-022 Rev A", now: "TP-EPS-022 Rev B" },
  ],
} as const;

export function ValidityFigure() {
  return (
    <FigureFrame
      label="Configuration-aware evidence validity"
      fig="FIG. CAV-1"
      note="Fictitious requirement and values. The change list is detected automatically in this concept; deciding that reverification is required is an engineering judgement."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs text-subtle">Requirement</p>
          <p className="mt-1 text-2xl font-medium tracking-tight text-ink">{VALIDITY_EXAMPLE.requirement}</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{VALIDITY_EXAMPLE.text}</p>
          <ol aria-label="Evidence validity over time" className="mt-6 space-y-3">
            <ValidityStep state="current" when="June" title="Verified" body={VALIDITY_EXAMPLE.verified} />
            <ValidityStep state="changed" when="Since" title="Configuration changed" body="Five items in the evidence's configuration no longer match the baseline under review." />
            <ValidityStep state="risk" when="Now" title="Evidence validity: At Risk" body="The June evidence was produced on a different configuration." />
            <ValidityStep state="reverify" when="Engineer" title="Reverification Required" body="Delta analysis shows the charge-termination logic changed, so the test must be repeated." />
          </ol>
        </div>
        <div className="lg:col-span-7">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Configuration of the June evidence compared with the current baseline</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Item</th>
                <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Evidence produced on</th>
                <th scope="col" className="py-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Current baseline</th>
              </tr>
            </thead>
            <tbody>
              {VALIDITY_EXAMPLE.rows.map((r) => (
                <tr key={r.item} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="py-2.5 pr-3 font-normal text-ink-2">{r.item}</th>
                  <td className="py-2.5 pr-3 font-mono text-xs text-ink-2">{r.then}</td>
                  <td className="py-2.5 font-mono text-xs text-ink">
                    <span className="mr-1.5 inline-block border border-[var(--st-prototype)] px-1 text-[0.625rem] uppercase tracking-[0.06em] text-[var(--st-prototype)]">
                      Changed
                    </span>
                    {r.now}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FigureFrame>
  );
}

const STATE_STYLE = {
  current: { dot: "var(--st-available)", label: "Current" },
  changed: { dot: "var(--st-planned)", label: "Change" },
  risk: { dot: "var(--st-prototype)", label: "At risk" },
  reverify: { dot: "var(--danger)", label: "Reverify" },
} as const;

function ValidityStep({ state, when, title, body }: { state: keyof typeof STATE_STYLE; when: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-3">
      <span className="pt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{when}</span>
      <div className="border-l border-line-strong pl-3">
        <p className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
          <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: STATE_STYLE[state].dot }} />
          {title}
        </p>
        <p className="mt-0.5 text-sm text-muted">{body}</p>
      </div>
    </li>
  );
}

/** Evidence validity states used across the site (text labels, never colour alone). */
export const VALIDITY_STATES: Array<{ state: string; meaning: string; who: string }> = [
  { state: "Current", meaning: "Produced on the configuration and requirement revision now under review.", who: "Shown by AEAIP; confirmed at closure by the responsible engineer." },
  { state: "At Risk", meaning: "Something in the evidence's configuration, procedure or requirement has changed since it was produced.", who: "Flagged automatically (concept)." },
  { state: "Retained with rationale", meaning: "An engineer has shown, for example by delta analysis or similarity, that the change does not affect this evidence.", who: "Engineering decision, recorded with rationale." },
  { state: "Reverification Required", meaning: "The change affects the evidence; the verification must be repeated or re-analysed.", who: "Engineering decision." },
  { state: "Superseded", meaning: "Replaced by newer evidence for the current configuration. Kept for history.", who: "Recorded on closure of the new evidence." },
];

/* -------------------------------------------------- Change impact */

export function ChangeImpactFigure() {
  return (
    <FigureFrame
      label="Continuous Engineering Assurance — illustrative change impact"
      fig="FIG. CEA-1"
      note="Illustrative result on sample data, to explain the concept. Continuous assurance is at Concept status; this is not a released capability."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs text-subtle">Engineering change</p>
          <p className="mt-1 text-xl font-medium leading-snug tracking-tight text-ink">
            Flight computer processor board revised (Rev D → Rev E)
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            AEAIP follows the change through the Engineering Evidence Graph: requirements allocated to the board,
            evidence produced on Rev D, and reviews that rely on that evidence.
          </p>
        </div>
        <ul aria-label="Illustrative impact" className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {CHANGE_IMPACT_EXAMPLE.map((x) => (
            <li key={x.label} className="bg-bg p-4 sm:p-5">
              <p className="font-mono text-3xl tabular-nums tracking-tight text-ink">{x.value}</p>
              <p className="mt-1 text-sm leading-snug text-ink-2">{x.label}</p>
            </li>
          ))}
          <li className="bg-surface-accent p-4 sm:p-5">
            <p className="font-mono text-sm uppercase tracking-[0.08em] text-accent">TRR readiness</p>
            <p className="mt-1 text-sm leading-snug text-ink">Changes from GO to GO WITH CONDITIONS</p>
          </li>
        </ul>
      </div>
    </FigureFrame>
  );
}

/* --------------------------------------------- Predicted → Tested → Flown */

export const PTF_EXAMPLE = [
  { stage: "Requirement", label: "THM-008", value: "Battery 5 °C to 30 °C in all operating modes", kind: "Requirement" },
  { stage: "Predicted", label: "Thermal model, hot case", value: "27.5 °C predicted", kind: "Simulation / digital twin" },
  { stage: "Tested", label: "Qualification TVAC, hot plateau", value: "28.9 °C measured; model correlated (+1.4 °C)", kind: "Ground qualification" },
  { stage: "Accepted", label: "Flight unit acceptance TVAC", value: "28.4 °C measured", kind: "Acceptance" },
  { stage: "Flown", label: "Flight telemetry, first 90 days", value: "21 °C to 26 °C observed", kind: "Operational evidence" },
] as const;

export function PtfFigure() {
  return (
    <FigureFrame
      label="Predicted → Tested → Flown"
      fig="FIG. PTF-1"
      note="Fictitious values. Operational evidence is a long-term direction (Concept); no telemetry integration exists today."
    >
      <ol aria-label="One requirement across its evidence life cycle" className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-5">
        {PTF_EXAMPLE.map((s, i) => (
          <li key={s.stage} className={cn("flex flex-col p-4 sm:p-5", i === 0 ? "bg-surface-accent" : "bg-bg")}>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent">{s.stage}</p>
            <p className="mt-2 text-sm font-medium text-ink">{s.label}</p>
            <p className="mt-1 flex-1 text-sm leading-snug text-ink-2">{s.value}</p>
            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-subtle">{s.kind}</p>
          </li>
        ))}
      </ol>
    </FigureFrame>
  );
}

/* --------------------------------------------------------- Gate rail */

export function GateRail({ highlight = "TRR", link = true }: { highlight?: string; link?: boolean }) {
  return (
    <div>
      <ol aria-label="Illustrative review gates" className="grid grid-cols-3 gap-px overflow-hidden border border-line bg-line xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-11">
        {GATES.map((g) => {
          const active = g.code === highlight;
          const inner = (
            <>
              <span className={cn("font-mono text-sm tracking-[0.06em]", active ? "text-bg" : "text-ink")}>{g.code}</span>
              <span className={cn("mt-1 text-[0.6875rem] leading-snug", active ? "text-bg/80" : "text-muted")}>{g.name}</span>
            </>
          );
          return (
            <li key={g.code} className={active ? "bg-ink" : "bg-surface"}>
              {link ? (
                <SmartLink
                  href={`${aero("/aeaip/review-gates")}#${g.code.toLowerCase()}`}
                  className={cn("flex h-full min-h-20 flex-col p-3 transition-colors", !active && "hover:bg-surface-2")}
                  label={`Gate ${g.code}`}
                >
                  {inner}
                </SmartLink>
              ) : (
                <div className="flex h-full min-h-20 flex-col p-3">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-muted">
        Illustrative satellite lifecycle. Review names, order, entrance criteria, success criteria and required evidence
        are configured per programme. MRR = Mission Readiness Review in this GAMYAA model.
      </p>
    </div>
  );
}

/* ------------------------------------------------------ Small helpers */

export function ChipList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((i) => (
        <li key={i} className="border border-line-strong bg-surface px-3 py-1.5 text-sm text-ink-2">
          {i}
        </li>
      ))}
    </ul>
  );
}

export function KeyQuestions({ items }: { items: readonly string[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((q, i) => (
        <li key={q} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3.5">
          <span className="font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-[0.9375rem] text-ink">{q}</span>
        </li>
      ))}
    </ol>
  );
}

