"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useId, useMemo, useRef, useState, type ReactNode } from "react";
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
  VALIDITY_STAGES,
  type Issue,
  type ReadinessLevel,
  type TraceState,
} from "@/content/aeaip-demo";
import { GATES } from "@/content/review-gates";
import { LevelTag } from "./demo-preview";

/* The 3D view is optional enhancement: loaded on the client only, after the rest of
   the demo, so it never blocks content or SEO. If it fails, the list still works. */
const SpacecraftView = dynamic(() => import("./spacecraft-view"), {
  ssr: false,
  loading: () => <ModelPlaceholder text="Loading 3D view…" />,
});

function ModelPlaceholder({ text }: { text: string }) {
  return (
    <div className="grid aspect-[16/10] w-full place-items-center border border-dashed border-line-strong text-sm text-subtle">
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

const STATE_MARK: Record<TraceState, { symbol: string; label: string; color: string }> = {
  done: { symbol: "●", label: "Complete", color: "var(--st-available)" },
  fail: { symbol: "✕", label: "Failed", color: "var(--danger)" },
  attention: { symbol: "▲", label: "Needs attention", color: "var(--st-prototype)" },
  open: { symbol: "○", label: "Open", color: "var(--subtle)" },
  na: { symbol: "–", label: "Not applicable", color: "var(--subtle)" },
};

const NAMES = Object.fromEntries(SUBSYSTEMS.map((s) => [s.key, s.short])) as Record<SubsystemKey, string>;

export function AssuranceDemo() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [gate, setGate] = useState<GateCode>(DEMO_PROGRAMME.currentGate);
  const [subsystem, setSubsystem] = useState<SubsystemKey | null>(null);
  const [category, setCategory] = useState<TraceCategory | null>(null);
  const [issueId, setIssueId] = useState<string | null>("ANM-0219");
  const [validity, setValidity] = useState(0);
  const started = useRef(false);
  const traceRef = useRef<HTMLDivElement>(null);

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
    () =>
      Object.fromEntries(SUBSYSTEMS.map((s) => [s.key, subsystemReadiness(s.key, gate)])) as Record<SubsystemKey, ReadinessLevel>,
    [gate],
  );
  const open = issuesForGate(gate);
  const visible = open.filter(
    (x) => (!subsystem || x.issue.subsystem === subsystem) && (!category || x.issue.category === category),
  );
  const issue: Issue | undefined = open.find((x) => x.issue.id === issueId)?.issue;
  const conditions = open.filter((x) => x.effect === "conditional" && x.issue.condition);
  const blockers = open.filter((x) => x.effect === "blocking");

  function chooseGate(g: GateCode) {
    start();
    setGate(g);
    setCategory(null);
    track("aeaip_gate_select", { gate: g });
    const stillOpen = issuesForGate(g).some((x) => x.issue.id === issueId);
    if (!stillOpen) setIssueId(issuesForGate(g)[0]?.issue.id ?? null);
  }

  function chooseSubsystem(k: SubsystemKey | null) {
    start();
    setSubsystem(k);
    if (k) track("aeaip_subsystem_select", { subsystem: k });
  }

  function openTrace(i: Issue) {
    start();
    setIssueId(i.id);
    track("aeaip_evidence_trace_open", { trace_category: i.category });
    requestAnimationFrame(() => traceRef.current?.focus({ preventScroll: false }));
  }

  function chooseValidity(n: number) {
    start();
    setValidity(n);
    track("aeaip_evidence_validity_demo", { validity_step: VALIDITY_STAGES[n].step });
  }

  const metricRows: Array<{ label: string; value: string | number; cat?: TraceCategory; note?: string }> = [
    { label: "Requirements verified (to date)", value: `${metrics.verified} / ${metrics.total}` },
    { label: "Evidence gaps", value: metrics.evidenceGaps, cat: "evidence_gap" },
    { label: "Open NCRs", value: metrics.openNcrs, cat: "ncr" },
    { label: "Configuration mismatches", value: metrics.configMismatches, cat: "configuration_mismatch" },
    { label: "Pending tests", value: metrics.pendingTests, cat: "pending_test" },
    { label: "Cybersecurity findings", value: metrics.cyberFindings, cat: "cybersecurity_finding" },
    {
      label: "Critical anomalies",
      value: metrics.criticalAnomalies,
      cat: metrics.openAnomalies ? "anomaly" : undefined,
      note: metrics.openAnomalies ? `${metrics.openAnomalies} major anomaly open` : undefined,
    },
    ...(metrics.waivers ? [{ label: "Waivers awaiting acceptance", value: metrics.waivers, cat: "waiver" as const }] : []),
  ];

  return (
    <div className="space-y-8" data-ga-section="assurance_demo">
      {/* Gate selector */}
      <fieldset>
        <legend className="eyebrow mb-3">1 · Choose a review gate</legend>
        <div className="grid grid-cols-4 gap-px overflow-hidden border border-line bg-line xs:grid-cols-6 lg:grid-cols-11">
          {GATE_CODES.map((g) => {
            const m = gateMode(g);
            return (
              <label
                key={g}
                className={cn(
                  "relative flex min-h-14 cursor-pointer flex-col justify-center px-2 py-2 text-center transition-colors",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
                  g === gate ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-surface-2",
                )}
              >
                <input
                  type="radio"
                  name={`${uid}-gate`}
                  value={g}
                  checked={g === gate}
                  onChange={() => chooseGate(g)}
                  className="sr-only"
                />
                <span className="font-mono text-sm tracking-[0.06em]">{g}</span>
                <span className={cn("mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em]", g === gate ? "text-bg/75" : "text-subtle")}>
                  {m === "completed" ? "Held" : m === "current" ? "Now" : "Forecast"}
                </span>
              </label>
            );
          })}
          {/* 11 gates leave one empty cell in the 4- and 6-column layouts; keep the hairline grid even. */}
          <span aria-hidden className="bg-surface lg:hidden" />
        </div>
      </fieldset>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Spacecraft + subsystems */}
        <div className="lg:col-span-7">
          <div className="ticks border border-line bg-surface p-3 sm:p-4">
            <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <ViewBoundary>
                <SpacecraftView
                  selected={subsystem}
                  levels={mode === "completed" ? {} : levels}
                  names={NAMES}
                  onSelect={(k) => chooseSubsystem(k === subsystem ? null : k)}
                  onInteract={start}
                />
              </ViewBoundary>
            </div>
          </div>
          <fieldset className="mt-5">
            <legend className="eyebrow mb-3">2 · Choose a subsystem</legend>
            <div className="flex flex-wrap gap-2">
              {[{ key: null, short: "All subsystems" } as const, ...SUBSYSTEMS].map((s) => {
                const active = subsystem === s.key;
                const level = s.key && mode !== "completed" ? levels[s.key] : null;
                return (
                  <label
                    key={s.key ?? "all"}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center gap-2 border px-3 text-sm transition-colors",
                      "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
                      active ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${uid}-sub`}
                      checked={active}
                      onChange={() => chooseSubsystem(s.key)}
                      className="sr-only"
                    />
                    {s.short}
                    {level ? <span className="sr-only">, {level}</span> : null}
                    {level ? (
                      <span aria-hidden className="font-mono text-xs" style={{ color: active ? undefined : LEVEL_DOT[level] }}>
                        {LEVEL_SYMBOL[level]}
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
            {subsystem ? <SubsystemDetail k={subsystem} level={mode === "completed" ? null : levels[subsystem]} /> : null}
          </fieldset>
        </div>

        {/* Readiness panel */}
        <section aria-labelledby={`${uid}-readiness`} aria-live="polite" className="lg:col-span-5">
          <div className="ticks border border-line bg-surface">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-3">
              <p className="eyebrow">
                {gate} · {gateInfo.name}
              </p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                {mode === "completed" ? "Held · record" : mode === "current" ? "Current gate" : "Forecast"}
              </p>
            </div>
            <div className="p-5">
              <h3 id={`${uid}-readiness`} className="text-lg font-medium text-ink">
                Are we ready for {gate}?
              </h3>
              {mode === "completed" ? (
                <div className="mt-4">
                  <p className="font-mono text-xs text-subtle">Recorded board decision (illustrative)</p>
                  <p className="mt-1 text-2xl font-medium tracking-tight text-ink">{COMPLETED_GATES[gate]?.decision}</p>
                  <p className="mt-3 text-[0.9375rem] text-ink-2">{COMPLETED_GATES[gate]?.note}</p>
                  <p className="mt-4 text-sm text-muted">
                    This gate has already been held in the sample programme. Choose {DEMO_PROGRAMME.currentGate} for the
                    current readiness question, or a later gate for a forecast.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-4 border-l-2 pl-4" style={{ borderColor: OVERALL_COLOR[overall] }}>
                    <p className="font-mono text-xs text-subtle">
                      {mode === "current" ? "Illustrative readiness recommendation" : "Forecast from current evidence"}
                    </p>
                    <p className="mt-1 text-2xl font-medium tracking-tight text-ink sm:text-3xl">{overall}</p>
                    <p className="mt-2 text-sm text-ink-2">
                      {overall === "GO WITH CONDITIONS"
                        ? `${conditions.length} conditions, no blockers.`
                        : overall === "NOT READY"
                          ? `${blockers.length} blocking item${blockers.length === 1 ? "" : "s"} must close first.`
                          : "No open items affect this gate."}
                    </p>
                  </div>
                  <dl className="mt-5 divide-y divide-line border-y border-line text-sm">
                    {metricRows.map((r) => (
                      <div key={r.label} className="flex items-center justify-between gap-3 py-1.5">
                        <dt className="text-ink-2">
                          {r.label}
                          {r.note ? <span className="block text-xs text-subtle">{r.note}</span> : null}
                        </dt>
                        <dd>
                          {r.cat && Number(r.value) + (r.note ? 1 : 0) > 0 ? (
                            <button
                              type="button"
                              onClick={() => {
                                start();
                                setCategory(category === r.cat ? null : (r.cat ?? null));
                              }}
                              aria-pressed={category === r.cat}
                              className={cn(
                                "inline-flex min-h-9 min-w-11 items-center justify-center border px-2 font-mono tabular-nums",
                                category === r.cat ? "border-ink bg-ink text-bg" : "border-line-strong text-ink hover:border-ink",
                              )}
                              aria-label={`${r.label}: ${r.value}. Show these items`}
                            >
                              {r.value}
                            </button>
                          ) : (
                            <span className="inline-flex min-h-9 items-center px-2 font-mono tabular-nums text-ink">{r.value}</span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <ul aria-label="Subsystem readiness" className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1 text-sm xs:grid-cols-2">
                    {SUBSYSTEMS.map((s) => (
                      <li key={s.key} className="flex items-center justify-between gap-2 border-b border-line py-1">
                        <span className="text-ink-2">{s.short}</span>
                        <LevelTag level={levels[s.key]} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-subtle">
              Illustrative readiness recommendation based on sample data. Not a flight-safety or certification
              determination. The review board decides.
            </p>
          </div>
        </section>
      </div>

      {/* Issues and drill-down */}
      {mode !== "completed" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <section aria-labelledby={`${uid}-issues`} className="lg:col-span-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 id={`${uid}-issues`} className="eyebrow">
                3 · Open items affecting {gate}
              </h3>
              {category || subsystem ? (
                <button
                  type="button"
                  onClick={() => {
                    setCategory(null);
                    setSubsystem(null);
                  }}
                  className="inline-flex min-h-9 items-center text-xs text-accent underline"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-subtle">
              {visible.length} of {open.length} shown
              {category ? ` · ${CATEGORY_LABEL[category]}` : ""}
              {subsystem ? ` · ${NAMES[subsystem]}` : ""}
            </p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {visible.length === 0 ? (
                <li className="py-4 text-sm text-muted">No open items match. This subsystem is READY for {gate}.</li>
              ) : (
                visible.map(({ issue: i, effect }) => (
                  <li key={i.id}>
                    <button
                      type="button"
                      onClick={() => openTrace(i)}
                      aria-pressed={issueId === i.id}
                      className={cn(
                        "flex w-full flex-col items-start gap-1 px-2 py-3 text-left transition-colors",
                        issueId === i.id ? "bg-surface-accent" : "hover:bg-surface-2",
                      )}
                    >
                      <span className="flex w-full flex-wrap items-center justify-between gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-subtle">
                        <span>
                          {i.id} · {CATEGORY_LABEL[i.category]}
                        </span>
                        <span className={effect === "blocking" ? "text-[var(--danger)]" : "text-[var(--st-prototype)]"}>
                          {effect === "blocking" ? "Blocking" : "Condition"}
                        </span>
                      </span>
                      <span className="text-[0.9375rem] text-ink">{i.title}</span>
                      <span className="text-xs text-muted">{NAMES[i.subsystem]}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section aria-labelledby={`${uid}-trace`} className="lg:col-span-7">
            <h3 id={`${uid}-trace`} className="eyebrow">
              4 · Evidence trace
            </h3>
            <div
              ref={traceRef}
              tabIndex={-1}
              aria-live="polite"
              className="mt-3 border border-line bg-surface p-5 outline-none focus-visible:outline-2 focus-visible:outline-[var(--focus)] sm:p-6"
            >
              {issue ? (
                <>
                  <p className="font-mono text-xs text-subtle">
                    {issue.id} · {CATEGORY_LABEL[issue.category]} · {NAMES[issue.subsystem]}
                  </p>
                  <p className="mt-1 text-lg font-medium leading-snug text-ink">{issue.title}</p>
                  <p className="mt-1 text-sm text-ink-2">{issue.summary}</p>
                  <ol className="mt-5" aria-label={`Evidence trace for ${issue.id}`}>
                    {issue.trace.map((t, n) => {
                      const s = STATE_MARK[t.state];
                      const last = n === issue.trace.length - 1;
                      return (
                        <li key={t.label} className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-3 last:pb-0">
                          {!last ? <span aria-hidden className="absolute bottom-0 left-[0.7rem] top-5 w-px bg-line-strong" /> : null}
                          <span aria-hidden className="relative z-10 grid size-6 place-items-center bg-surface font-mono text-xs" style={{ color: s.color }}>
                            {s.symbol}
                          </span>
                          <div>
                            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                              {t.label} <span className="sr-only">— {s.label}</span>
                            </p>
                            <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink">{t.value}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  {issue.condition && issueEffectLabel(issue, gate) === "conditional" ? (
                    <p className="mt-5 border-l-2 border-[var(--st-prototype)] pl-3 text-sm text-ink-2">
                      <span className="font-medium text-ink">Condition for {gate}: </span>
                      {issue.condition}
                    </p>
                  ) : null}
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-xs text-subtle" aria-label="Legend">
                    {(["done", "fail", "attention", "open"] as TraceState[]).map((k) => (
                      <li key={k} className="flex items-center gap-1.5">
                        <span aria-hidden style={{ color: STATE_MARK[k].color }}>
                          {STATE_MARK[k].symbol}
                        </span>
                        {STATE_MARK[k].label}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-muted">Select an open item to follow its evidence trace.</p>
              )}
            </div>
          </section>
        </div>
      ) : null}

      {/* Evidence validity */}
      <section id="validity" aria-labelledby={`${uid}-validity`} className="scroll-mt-28 border-t border-line pt-8">
        <h3 id={`${uid}-validity`} className="eyebrow">
          5 · Evidence validity: when verified evidence becomes stale
        </h3>
        <p className="mt-2 max-w-3xl text-[0.9375rem] text-ink-2">
          Requirement SAT-EPS-014 was verified in June. Step through what happens when its configuration changes.
        </p>
        <ol className="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-5" aria-label="Evidence validity steps">
          {VALIDITY_STAGES.map((v, n) => (
            <li key={v.step} className="flex">
              <button
                type="button"
                onClick={() => chooseValidity(n)}
                aria-current={validity === n ? "step" : undefined}
                className={cn(
                  "flex min-h-14 w-full flex-col items-start justify-center px-3 py-2 text-left transition-colors",
                  validity === n ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-surface-2",
                )}
              >
                <span className={cn("font-mono text-[0.625rem] uppercase tracking-[0.08em]", validity === n ? "text-bg/75" : "text-subtle")}>
                  Step {n + 1}
                </span>
                <span className="text-sm leading-snug">{v.state}</span>
              </button>
            </li>
          ))}
        </ol>
        <ValidityPanel n={validity} onPrev={() => chooseValidity(Math.max(0, validity - 1))} onNext={() => chooseValidity(Math.min(VALIDITY_STAGES.length - 1, validity + 1))} />
      </section>
    </div>
  );
}

function issueEffectLabel(i: Issue, gate: GateCode) {
  return issuesForGate(gate).find((x) => x.issue.id === i.id)?.effect;
}

const LEVEL_SYMBOL: Record<ReadinessLevel, string> = { READY: "●", CONDITIONAL: "◐", "NOT READY": "○" };
const LEVEL_DOT: Record<ReadinessLevel, string> = {
  READY: "var(--st-available)",
  CONDITIONAL: "var(--st-prototype)",
  "NOT READY": "var(--danger)",
};
const OVERALL_COLOR: Record<string, string> = {
  GO: "var(--st-available)",
  "GO WITH CONDITIONS": "var(--st-prototype)",
  "NOT READY": "var(--danger)",
};

function SubsystemDetail({ k, level }: { k: SubsystemKey; level: ReadinessLevel | null }) {
  const s = SUBSYSTEMS.find((x) => x.key === k)!;
  const pct = Math.round((s.requirements.verified / s.requirements.total) * 100);
  return (
    <div className="mt-4 border border-line bg-surface p-4" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-ink">{s.name}</p>
        {level ? <LevelTag level={level} /> : null}
      </div>
      <p className="mt-1 text-sm text-ink-2">{s.description}</p>
      <p className="mt-3 font-mono text-xs text-subtle">
        Requirements verified to date: {s.requirements.verified} / {s.requirements.total} ({pct}%)
      </p>
      <div aria-hidden className="mt-1.5 h-1 bg-surface-2">
        <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const CONFIG_ROWS: Array<[keyof (typeof VALIDITY_STAGES)[number]["config"], string]> = [
  ["requirement", "Requirement SAT-EPS-014"],
  ["firmware", "Battery management firmware"],
  ["board", "EPS board"],
  ["icd", "EPS–OBC interface"],
  ["procedure", "Test procedure"],
];

function ValidityPanel({ n, onPrev, onNext }: { n: number; onPrev: () => void; onNext: () => void }) {
  const v = VALIDITY_STAGES[n];
  const evidenceConfig = n === VALIDITY_STAGES.length - 1 ? v.config : VALIDITY_STAGES[0].config;
  return (
    <div className="mt-4 grid gap-6 border border-line bg-surface p-5 sm:p-6 lg:grid-cols-12" aria-live="polite">
      <div className="lg:col-span-5">
        <p className="font-mono text-xs text-subtle">
          Step {n + 1} of {VALIDITY_STAGES.length}
        </p>
        <p className="mt-1 text-xl font-medium tracking-tight text-ink">{v.title}</p>
        <p className="mt-2 inline-flex items-center gap-2 border border-line-strong px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink">
          Evidence validity: {v.state}
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{v.body}</p>
        <p className="mt-3 text-sm text-muted">{v.who}</p>
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onPrev} disabled={n === 0} className="btn btn-secondary disabled:opacity-40">
            Previous
          </button>
          <button type="button" onClick={onNext} disabled={n === VALIDITY_STAGES.length - 1} className="btn btn-primary disabled:opacity-40">
            Next step
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Evidence configuration compared with the baseline under review</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Item</th>
              <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Evidence on</th>
              <th scope="col" className="py-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Under review</th>
            </tr>
          </thead>
          <tbody>
            {CONFIG_ROWS.map(([key, label]) => {
              const a = evidenceConfig[key];
              const b = v.config[key];
              const differs = a !== b;
              return (
                <tr key={key} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="py-2 pr-3 font-normal text-ink-2">{label}</th>
                  <td className="py-2 pr-3 font-mono text-xs text-ink-2">{a}</td>
                  <td className={cn("py-2 font-mono text-xs", differs ? "text-ink" : "text-ink-2")}>
                    {differs ? (
                      <span className="mr-1.5 inline-block border border-[var(--st-prototype)] px-1 text-[0.625rem] uppercase text-[var(--st-prototype)]">
                        Differs
                      </span>
                    ) : (
                      <span className="mr-1.5 inline-block border border-[var(--st-available)] px-1 text-[0.625rem] uppercase text-[var(--st-available)]">
                        Match
                      </span>
                    )}
                    {b}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
