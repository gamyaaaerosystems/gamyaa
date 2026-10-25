"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GATE_CODES, track, type GateCode, type SubsystemKey, type TraceCategory } from "@/lib/analytics";
import {
  CATEGORY_LABEL,
  COMPLETED_GATES,
  DEMO_PROGRAMME,
  gateMetrics,
  gateMode,
  issuesForGate,
  overallReadiness,
  SUBSYSTEMS,
  subsystemReadiness,
  type Issue,
  type ReadinessLevel,
} from "@/content/aeaip-demo";
import { GATES } from "@/content/review-gates";
import { EvidenceTraceDrawer } from "@/components/system/evidence-trace-drawer";
import { ValiditySequence } from "@/components/system/validity-sequence";
import { LevelTag } from "./demo-preview";

/* The 3D view is an optional enhancement: client-only, loaded after the console and
   only on large screens or when a phone visitor asks for it. If it fails, the list works. */
const SpacecraftView = dynamic(() => import("./spacecraft-view"), {
  ssr: false,
  loading: () => <ModelPlaceholder text="Loading 3D view…" />,
});

function ModelPlaceholder({ text }: { text: string }) {
  return (
    <div className="grid aspect-[16/10] w-full place-items-center rounded-sm border border-dashed border-line-strong text-sm text-subtle">
      {text}
    </div>
  );
}

class ViewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <ModelPlaceholder text="3D view unavailable. Use the subsystem list to explore." />
    ) : (
      this.props.children
    );
  }
}

const NAMES = Object.fromEntries(SUBSYSTEMS.map((s) => [s.key, s.short])) as Record<SubsystemKey, string>;

const OVERALL_COLOR: Record<string, string> = {
  GO: "var(--st-available)",
  "GO WITH CONDITIONS": "var(--st-prototype)",
  "NOT READY": "var(--danger)",
};
const LEVEL_SYMBOL: Record<ReadinessLevel, string> = { READY: "●", CONDITIONAL: "◐", "NOT READY": "○" };
const LEVEL_DOT: Record<ReadinessLevel, string> = {
  READY: "var(--st-available)",
  CONDITIONAL: "var(--st-prototype)",
  "NOT READY": "var(--danger)",
};

function StepLabel({ n, children, className }: { n: number; children: ReactNode; className?: string }) {
  return (
    // A span (not a p) so it is valid inside <legend>.
    <span className={cn("mb-3 flex items-center gap-2 text-sm font-medium text-ink-2", className)}>
      <span aria-hidden className="grid size-6 place-items-center rounded-full border border-line-strong font-mono text-xs text-muted">
        {n}
      </span>
      {children}
    </span>
  );
}

/**
 * Interactive Assurance Demo — a readiness console for a fictitious satellite.
 * Large screens: gate rail | spacecraft & subsystems | readiness, with open items
 * below and the evidence trace in a drawer. Phones: the same parts as a sequence
 * (gate → readiness → subsystem → open items → trace → validity story).
 */
export function AssuranceDemo() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [gate, setGate] = useState<GateCode>(DEMO_PROGRAMME.currentGate);
  const [subsystem, setSubsystem] = useState<SubsystemKey | null>(null);
  const [category, setCategory] = useState<TraceCategory | null>(null);
  const [traceId, setTraceId] = useState<string | null>(null);
  const [wide, setWide] = useState(false);
  const [modelOnPhone, setModelOnPhone] = useState(false);
  const started = useRef(false);
  const issuesRef = useRef<HTMLElement>(null);

  // Render the 3D view automatically only on large screens.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track("aeaip_demo_start", { source_location: "demo_page" });
  }, []);

  const mode = gateMode(gate);
  const gateInfo = GATES.find((g) => g.code === gate)!;
  const metrics = gateMetrics(gate);
  const overall = overallReadiness(gate);
  const levels = useMemo(
    () => Object.fromEntries(SUBSYSTEMS.map((s) => [s.key, subsystemReadiness(s.key, gate)])) as Record<SubsystemKey, ReadinessLevel>,
    [gate],
  );
  const open = issuesForGate(gate);
  const visible = open.filter(
    (x) => (!subsystem || x.issue.subsystem === subsystem) && (!category || x.issue.category === category),
  );
  const traced = open.find((x) => x.issue.id === traceId);
  const conditions = open.filter((x) => x.effect === "conditional");
  const blockers = open.filter((x) => x.effect === "blocking");

  function chooseGate(g: GateCode) {
    start();
    setGate(g);
    setCategory(null);
    track("aeaip_gate_select", { gate: g });
  }
  function chooseSubsystem(k: SubsystemKey | null) {
    start();
    setSubsystem(k);
    if (k) track("aeaip_subsystem_select", { subsystem: k });
  }
  function chooseMetric(c: TraceCategory) {
    start();
    setCategory((cur) => (cur === c ? null : c));
    // On phones the list sits below; bring it into view.
    if (!wide) requestAnimationFrame(() => issuesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
  function openTrace(i: Issue) {
    start();
    setTraceId(i.id);
    track("aeaip_evidence_trace_open", { trace_category: i.category });
  }

  const metricRows: Array<{ label: string; value: string | number; cat?: TraceCategory }> = [
    { label: "Requirements verified", value: `${metrics.verified} / ${metrics.total}` },
    { label: "Evidence gaps", value: metrics.evidenceGaps, cat: "evidence_gap" },
    { label: "NCRs", value: metrics.openNcrs, cat: "ncr" },
    { label: "Configuration mismatches", value: metrics.configMismatches, cat: "configuration_mismatch" },
    { label: "Tests pending", value: metrics.pendingTests, cat: "pending_test" },
    { label: "Security findings", value: metrics.cyberFindings, cat: "cybersecurity_finding" },
  ];

  return (
    <div data-ga-section="assurance_demo">
      <div className="grid gap-x-6 gap-y-10 lg:grid-cols-[11.5rem_minmax(0,1fr)_23rem] lg:gap-y-6">
        {/* 1 · Review gate */}
        <fieldset className="min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <legend className="contents">
            <StepLabel n={1}>Review gate</StepLabel>
          </legend>
          <div className="gx-scroll-x -mx-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
            <div className="flex gap-2 lg:flex-col lg:gap-1">
              {GATE_CODES.map((g) => {
                const m = gateMode(g);
                const info = GATES.find((x) => x.code === g)!;
                const on = g === gate;
                return (
                  <label
                    key={g}
                    className={cn(
                      "relative flex min-h-12 min-w-[5.25rem] cursor-pointer flex-col justify-center rounded-sm border px-3 py-1.5 transition-colors lg:min-w-0 lg:flex-row lg:items-center lg:justify-between lg:gap-2",
                      "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
                      on ? "border-ink bg-ink text-bg" : "border-line text-ink hover:border-line-strong",
                    )}
                    title={info.name}
                  >
                    <input type="radio" name={`${uid}-gate`} value={g} checked={on} onChange={() => chooseGate(g)} className="sr-only" />
                    <span className="font-mono text-sm tracking-[0.04em]">{g}</span>
                    <span className="sr-only"> — {info.name}</span>
                    <span className={cn("text-[0.6875rem]", on ? "text-bg/75" : "text-muted")}>
                      {m === "completed" ? "Held" : m === "current" ? "Now" : "Forecast"}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </fieldset>

        {/* 2 · Readiness */}
        <section aria-labelledby={`${uid}-readiness`} className="min-w-0 lg:col-start-3 lg:row-start-1">
          <StepLabel n={2}>Readiness</StepLabel>
          <div className="rounded-sm border border-line bg-surface">
            <div className="border-b border-line px-5 py-4">
              <p className="text-sm text-muted">
                {gateInfo.name} · {mode === "completed" ? "held" : mode === "current" ? "current gate" : "forecast"}
              </p>
              <h3 id={`${uid}-readiness`} className="mt-1 font-mono text-4xl tracking-[0.02em] text-ink">
                {gate}
              </h3>
            </div>
            <div aria-live="polite" className="px-5 py-5">
              {mode === "completed" ? (
                <div key={gate} className="anim-state">
                  <p className="text-sm text-muted">Recorded board decision (illustrative)</p>
                  <p className="mt-1 text-2xl font-medium tracking-tight text-ink">{COMPLETED_GATES[gate]?.decision}</p>
                  <p className="mt-3 text-[0.9375rem] text-ink-2">{COMPLETED_GATES[gate]?.note}</p>
                  <p className="mt-4 text-sm text-muted">
                    Choose {DEMO_PROGRAMME.currentGate} for the current readiness question, or a later gate for a forecast.
                  </p>
                </div>
              ) : (
                <>
                  <div key={gate} className="anim-state border-l-2 pl-4" style={{ borderColor: OVERALL_COLOR[overall] }}>
                    <p className="text-sm text-muted">
                      {mode === "current" ? "Illustrative readiness recommendation" : "Forecast from current evidence"}
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">{overall}</p>
                    <p className="mt-1 text-sm text-ink-2">
                      {overall === "GO WITH CONDITIONS"
                        ? `${conditions.length} conditions, no blockers`
                        : overall === "NOT READY"
                          ? `${blockers.length} blocking item${blockers.length === 1 ? "" : "s"}`
                          : "No open items affect this gate"}
                    </p>
                  </div>
                  <dl className="mt-5 text-sm">
                    {metricRows.map((r) => (
                      <div key={r.label} className="flex items-center justify-between gap-3 border-t border-line py-1">
                        <dt className="text-ink-2">{r.label}</dt>
                        <dd>
                          {r.cat && Number(r.value) > 0 ? (
                            <button
                              type="button"
                              onClick={() => chooseMetric(r.cat!)}
                              aria-pressed={category === r.cat}
                              aria-label={`${r.label}: ${r.value}. Show these items`}
                              className={cn(
                                "inline-flex min-h-10 min-w-11 items-center justify-center rounded-sm border px-2 font-mono tabular-nums",
                                category === r.cat ? "border-ink bg-ink text-bg" : "border-line-strong text-ink hover:border-ink",
                              )}
                            >
                              {r.value}
                            </button>
                          ) : (
                            <span className="inline-flex min-h-10 items-center px-2 font-mono tabular-nums text-ink">{r.value}</span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
            <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-muted">
              Illustrative readiness recommendation based on sample data. Not a flight-safety or certification
              determination. The review board decides.
            </p>
          </div>
        </section>

        {/* 3 · Subsystem */}
        <section aria-labelledby={`${uid}-sub`} className="min-w-0 lg:col-start-2 lg:row-start-1">
          <StepLabel n={3}>
            <span id={`${uid}-sub`}>Subsystem</span>
          </StepLabel>
          <div className="relative rounded-sm border border-line">
            <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative p-3 sm:p-4">
              {wide || modelOnPhone ? (
                <ViewBoundary>
                  <SpacecraftView
                    selected={subsystem}
                    levels={mode === "completed" ? {} : levels}
                    names={NAMES}
                    onSelect={(k) => chooseSubsystem(k === subsystem ? null : k)}
                    onInteract={start}
                  />
                </ViewBoundary>
              ) : (
                <button
                  type="button"
                  onClick={() => setModelOnPhone(true)}
                  className="flex min-h-12 w-full items-center justify-center rounded-sm border border-dashed border-line-strong text-sm text-ink-2"
                >
                  Show the 3D spacecraft view
                </button>
              )}
            </div>
          </div>
          <fieldset className="mt-4">
            <legend className="sr-only">Choose a subsystem</legend>
            <div className="flex flex-wrap gap-2">
              {[{ key: null, short: "All" } as const, ...SUBSYSTEMS].map((s) => {
                const on = subsystem === s.key;
                const level = s.key && mode !== "completed" ? levels[s.key] : null;
                return (
                  <label
                    key={s.key ?? "all"}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border px-3 text-sm transition-colors",
                      "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
                      on ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
                    )}
                  >
                    <input type="radio" name={`${uid}-sub`} checked={on} onChange={() => chooseSubsystem(s.key)} className="sr-only" />
                    {s.short === "All" ? "All subsystems" : s.short}
                    {level ? <span className="sr-only">, {level}</span> : null}
                    {level ? (
                      <span aria-hidden className="font-mono text-xs" style={{ color: on ? undefined : LEVEL_DOT[level] }}>
                        {LEVEL_SYMBOL[level]}
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>
          {subsystem && mode !== "completed" ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
              <span className="text-ink">{SUBSYSTEMS.find((s) => s.key === subsystem)!.name}</span>
              <LevelTag level={levels[subsystem]} />
              <span>
                {SUBSYSTEMS.find((s) => s.key === subsystem)!.requirements.verified}/
                {SUBSYSTEMS.find((s) => s.key === subsystem)!.requirements.total} requirements verified
              </span>
            </p>
          ) : null}
        </section>

        {/* 4 · Open items → 5 · trace drawer */}
        <section ref={issuesRef} aria-labelledby={`${uid}-issues`} className="min-w-0 scroll-mt-28 lg:col-span-2 lg:col-start-2 lg:row-start-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StepLabel n={4} className="mb-0">
              <span id={`${uid}-issues`}>Open items affecting {gate}</span>
            </StepLabel>
            {category || subsystem ? (
              <button
                type="button"
                onClick={() => {
                  setCategory(null);
                  setSubsystem(null);
                }}
                className="inline-flex min-h-11 items-center text-sm text-accent underline"
              >
                Clear filters
              </button>
            ) : null}
          </div>
          {mode === "completed" ? (
            <p className="mt-3 text-sm text-muted">Items raised at this gate were closed or carried forward.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted">
                {visible.length} of {open.length} shown
                {category ? ` · ${CATEGORY_LABEL[category]}` : ""}
                {subsystem ? ` · ${NAMES[subsystem]}` : ""} · select an item to open its evidence trace (step 5)
              </p>
              <ul className="mt-3 grid gap-2 md:grid-cols-2">
                {visible.length === 0 ? (
                  <li className="text-sm text-muted">No open items match. This selection is READY for {gate}.</li>
                ) : (
                  visible.map(({ issue: i, effect }) => (
                    <li key={i.id}>
                      <button
                        type="button"
                        onClick={() => openTrace(i)}
                        aria-haspopup="dialog"
                        className="flex h-full w-full flex-col items-start gap-1 rounded-sm border border-line px-4 py-3 text-left transition-colors hover:border-ink"
                      >
                        <span className="flex w-full flex-wrap items-center justify-between gap-2 text-xs text-muted">
                          <span>
                            {i.id} · {CATEGORY_LABEL[i.category]} · {NAMES[i.subsystem]}
                          </span>
                          <span className={cn("font-medium", effect === "blocking" ? "text-[var(--danger)]" : "text-[var(--st-prototype)]")}>
                            {effect === "blocking" ? "Blocker" : "Condition"}
                          </span>
                        </span>
                        <span className="text-[0.9375rem] leading-snug text-ink">{i.title}</span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </section>
      </div>

      <EvidenceTraceDrawer
        issue={traced?.issue ?? null}
        subsystemName={traced ? SUBSYSTEMS.find((s) => s.key === traced.issue.subsystem)?.name : undefined}
        condition={traced?.effect === "conditional" ? traced.issue.condition : undefined}
        onClose={() => setTraceId(null)}
      />

      {/* 6 · Configuration validity */}
      <section id="validity" aria-labelledby={`${uid}-validity`} className="mt-20 scroll-mt-28">
        <StepLabel n={6}>
          <span id={`${uid}-validity`}>Configuration validity: when verified evidence becomes stale</span>
        </StepLabel>
        <p className="mb-6 max-w-3xl text-[0.9375rem] text-ink-2">
          Requirement SAT-EPS-014 was verified in June. Then its configuration changed. Is the old evidence still valid?
        </p>
        <ValiditySequence />
      </section>
    </div>
  );
}
