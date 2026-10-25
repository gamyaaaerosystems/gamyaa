"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CHANGE_IMPACT_EXAMPLE } from "@/content/aeaip";

/**
 * ChangeImpactPropagation — one engineering change spreading through the evidence
 * graph: requirements, verification results, tests, qualification artefacts, a
 * cybersecurity assessment, and finally gate readiness. Illustrative (Concept).
 * The propagation is staggered so its direction reads; reduced motion shows it at once.
 */
export function ChangeImpactPropagation() {
  const [applied, setApplied] = useState(false);
  const steps = [...CHANGE_IMPACT_EXAMPLE];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-4">
        <div className={cn("rounded-sm border p-6 transition-colors duration-500", applied ? "border-accent bg-surface-accent" : "border-line-strong")}>
          <p className="text-sm text-muted">Engineering change</p>
          <p className="mt-2 text-2xl font-medium tracking-tight text-ink">Flight computer board</p>
          <p className="mt-1 font-mono text-lg text-ink">
            Rev D <span aria-hidden className="text-accent">→</span>
            <span className="sr-only"> to </span> Rev E
          </p>
          <button type="button" onClick={() => setApplied((a) => !a)} aria-pressed={applied} className={cn("btn mt-6 w-full", applied ? "btn-secondary" : "btn-primary")}>
            {applied ? "Reset" : "Apply the change"}
          </button>
        </div>
        <p className="mt-4 text-sm text-muted">Illustrative result on sample data. Continuous assurance is at Concept status.</p>
      </div>

      <ol aria-live="polite" aria-label="Impact of the change" className="relative lg:col-span-8">
        <span aria-hidden className={cn("absolute bottom-6 left-[5px] top-6 w-px transition-colors duration-700", applied ? "bg-accent" : "bg-line-strong")} />
        {steps.map((s, i) => (
          <li key={s.label} className="relative grid grid-cols-[1.75rem_1fr] items-center py-2.5">
            <span
              aria-hidden
              className={cn("relative z-10 block size-[11px] rounded-full border transition-colors duration-500", applied ? "border-accent bg-accent" : "border-ink-2 bg-bg")}
              style={{ transitionDelay: applied ? `${i * 180}ms` : "0ms" }}
            />
            <div className="flex items-baseline gap-4 border-b border-line pb-2.5">
              <span
                key={applied ? `on-${i}` : `off-${i}`}
                className={cn("w-14 shrink-0 font-mono text-3xl tabular-nums tracking-tight sm:text-4xl", applied ? "anim-state text-ink" : "text-line-strong")}
                style={applied ? { animationDelay: `${i * 180}ms` } : undefined}
              >
                {applied ? s.value : "–"}
              </span>
              <span className={cn("text-[1.0625rem] leading-snug transition-colors", applied ? "text-ink" : "text-muted")}>{s.label}</span>
            </div>
          </li>
        ))}
        <li className="relative grid grid-cols-[1.75rem_1fr] items-center pt-4">
          <span
            aria-hidden
            className={cn("relative z-10 block size-[11px] rounded-full border transition-colors duration-500", applied ? "border-[var(--st-prototype)] bg-[var(--st-prototype)]" : "border-accent bg-accent")}
            style={{ transitionDelay: applied ? `${steps.length * 180}ms` : "0ms" }}
          />
          <p className="text-[1.0625rem] text-ink">
            TRR readiness:{" "}
            <span key={applied ? "after" : "before"} className="anim-state font-mono font-medium" style={applied ? { animationDelay: `${steps.length * 180}ms` } : undefined}>
              {applied ? "◐ GO WITH CONDITIONS" : "● GO"}
            </span>
          </p>
        </li>
      </ol>
    </div>
  );
}
