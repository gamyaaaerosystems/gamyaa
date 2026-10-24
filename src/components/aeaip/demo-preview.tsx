import { cn } from "@/lib/cn";
import {
  DEMO_PROGRAMME,
  gateMetrics,
  overallReadiness,
  SUBSYSTEMS,
  subsystemReadiness,
  type ReadinessLevel,
} from "@/content/aeaip-demo";

/** Text + symbol for every readiness level, so status never relies on colour alone. */
export const LEVEL_STYLE: Record<ReadinessLevel, { symbol: string; color: string }> = {
  READY: { symbol: "●", color: "var(--st-available)" },
  CONDITIONAL: { symbol: "◐", color: "var(--st-prototype)" },
  "NOT READY": { symbol: "○", color: "var(--danger)" },
};

export function LevelTag({ level, className }: { level: ReadinessLevel; className?: string }) {
  const s = LEVEL_STYLE[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink",
        className,
      )}
    >
      <span aria-hidden style={{ color: s.color }}>
        {s.symbol}
      </span>
      {level}
    </span>
  );
}

/**
 * Static preview of the demo's TRR readiness summary for the AEAIP page. Rendered on
 * the server from the same sample dataset; loads no demo JavaScript.
 */
export function DemoPreview() {
  const gate = DEMO_PROGRAMME.currentGate;
  const m = gateMetrics(gate);
  const overall = overallReadiness(gate);
  const metrics: Array<[string, number | string]> = [
    ["Requirements verified", `${m.verified} / ${m.total}`],
    ["Evidence gaps", m.evidenceGaps],
    ["Open NCRs", m.openNcrs],
    ["Configuration mismatches", m.configMismatches],
    ["Pending tests", m.pendingTests],
    ["Cybersecurity findings", m.cyberFindings],
    ["Critical anomalies", m.criticalAnomalies],
  ];
  return (
    <figure className="ticks border border-line bg-surface">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-3">
        <span className="eyebrow">
          {DEMO_PROGRAMME.name} · {gate} readiness
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Sample data</span>
      </figcaption>
      <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <p className="font-mono text-xs text-subtle">Illustrative readiness recommendation</p>
          <p className="mt-1 text-2xl font-medium tracking-tight text-ink">{overall}</p>
          <dl className="mt-5 space-y-2 text-sm">
            {metrics.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-2 last:border-b-0">
                <dt className="text-ink-2">{k}</dt>
                <dd className="font-mono tabular-nums text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul aria-label="Subsystem readiness" className="space-y-1.5 text-sm">
          {SUBSYSTEMS.map((s) => (
            <li key={s.key} className="flex items-center justify-between gap-3 border-b border-line pb-1.5 last:border-b-0">
              <span className="text-ink-2">{s.short}</span>
              <LevelTag level={subsystemReadiness(s.key, gate)} />
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs text-subtle">
        Illustrative readiness recommendation based on sample data. Not a flight-safety or certification determination.
      </p>
    </figure>
  );
}
