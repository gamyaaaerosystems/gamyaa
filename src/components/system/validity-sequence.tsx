"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { VALIDITY_STAGES, type ValidityStage } from "@/content/aeaip-demo";

const TONE: Record<ValidityStage["tone"], { color: string; symbol: string }> = {
  ok: { color: "var(--st-available)", symbol: "●" },
  change: { color: "var(--accent)", symbol: "◆" },
  risk: { color: "var(--st-prototype)", symbol: "▲" },
  action: { color: "var(--danger)", symbol: "■" },
};

const ROWS: Array<[keyof ValidityStage["config"], string]> = [
  ["requirement", "Requirement SAT-EPS-014"],
  ["firmware", "Battery management firmware"],
  ["board", "EPS board"],
  ["icd", "EPS–OBC interface"],
  ["procedure", "Test procedure"],
];

/**
 * ValiditySequence — the configuration-validity story in five states. Step through
 * it, or play it (auto-advance stops at the end; disabled under reduced motion).
 * The configuration table shows which items differ from the evidence, row by row.
 */
export function ValiditySequence({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [n, setN] = useState(0);
  const [playing, setPlaying] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const timer = useRef<number | null>(null);
  const H = headingLevel;
  const last = VALIDITY_STAGES.length - 1;
  const v = VALIDITY_STAGES[n];
  const tone = TONE[v.tone];
  const evidenceConfig = n === last ? v.config : VALIDITY_STAGES[0].config;

  function go(i: number) {
    const next = Math.max(0, Math.min(last, i));
    setN(next);
    track("aeaip_evidence_validity_demo", { validity_step: VALIDITY_STAGES[next].step });
  }

  useEffect(() => {
    if (!playing || n >= last) return;
    timer.current = window.setTimeout(() => {
      go(n + 1);
      if (n + 1 >= last) setPlaying(false);
    }, 2400);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
    // go is stable enough for this timer; re-run only on step or play changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, n]);

  function play() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      go(n >= last ? 0 : n + 1);
      return;
    }
    if (n >= last) go(0);
    setPlaying(true);
  }

  return (
    <div>
      <ol aria-label="Evidence validity states" className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {VALIDITY_STAGES.map((s, i) => (
          <li key={s.step}>
            <button
              type="button"
              aria-current={n === i ? "step" : undefined}
              aria-controls={`${uid}-panel`}
              onClick={() => {
                setPlaying(false);
                go(i);
              }}
              className={cn(
                "relative flex min-h-12 w-full items-center gap-2 rounded-sm border px-3 py-2 text-left text-xs font-medium tracking-[0.04em] transition-colors sm:min-h-16 sm:flex-col sm:items-start sm:justify-center",
                n === i ? "border-ink bg-ink text-bg" : i < n ? "border-line-strong text-ink" : "border-line text-muted hover:border-line-strong",
              )}
            >
              <span aria-hidden style={{ color: n === i ? undefined : TONE[s.tone].color }}>
                {TONE[s.tone].symbol}
              </span>
              {s.headline}
            </button>
          </li>
        ))}
      </ol>

      <div id={`${uid}-panel`} aria-live="polite" className="mt-6 grid gap-8 rounded-sm border border-line p-6 sm:p-8 lg:grid-cols-12">
        <div key={n} className="anim-state lg:col-span-5">
          <p className="text-sm text-muted">
            Step {n + 1} of {VALIDITY_STAGES.length} · {v.title}
          </p>
          <H className="mt-2 flex items-center gap-3 font-mono text-2xl tracking-[0.02em] text-ink sm:text-3xl">
            <span aria-hidden style={{ color: tone.color }}>
              {tone.symbol}
            </span>
            {v.headline}
          </H>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">{v.body}</p>
          <p className="mt-3 text-sm text-muted">{v.who}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={n === 0}
              onClick={() => {
                setPlaying(false);
                go(n - 1);
              }}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={n === last}
              onClick={() => {
                setPlaying(false);
                go(n + 1);
              }}
            >
              Next
            </button>
            <button type="button" className="btn btn-primary" onClick={() => (playing ? setPlaying(false) : play())}>
              {playing ? "Pause" : n === last ? "Replay the story" : "Play the story"}
            </button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Configuration the evidence was produced on, compared with the configuration under review</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-3 font-normal text-muted">Item</th>
                <th scope="col" className="py-2 pr-3 font-normal text-muted">Evidence produced on</th>
                <th scope="col" className="py-2 font-normal text-muted">Under review</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([key, label], i) => {
                const a = evidenceConfig[key];
                const b = v.config[key];
                const differs = a !== b;
                return (
                  <tr key={key} className="border-b border-line align-top last:border-b-0">
                    <th scope="row" className="py-2.5 pr-3 font-normal text-ink-2">{label}</th>
                    <td className="py-2.5 pr-3 font-mono text-xs text-ink-2">{a}</td>
                    <td className="py-2.5 font-mono text-xs">
                      <span
                        key={`${n}-${key}`}
                        className={cn("inline-flex flex-wrap items-center gap-1.5", differs && "anim-state text-ink")}
                        style={differs ? { animationDelay: `${i * 90}ms` } : undefined}
                      >
                        <span
                          className={cn(
                            "rounded-full border px-1.5 text-[0.6875rem] font-sans",
                            differs ? "border-[var(--st-prototype)] text-[var(--st-prototype)]" : "border-[var(--st-available)] text-[var(--st-available)]",
                          )}
                        >
                          {differs ? "Differs" : "Match"}
                        </span>
                        {b}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
