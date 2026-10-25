import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ENGINE_FINDINGS, ENGINE_FLOW } from "@/content/aeaip";

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
                    <span className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-accent">Human decision</span>
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

/** Evidence validity states used across the site (text labels, never colour alone). */
export const VALIDITY_STATES: Array<{ state: string; meaning: string; who: string }> = [
  { state: "Current", meaning: "Produced on the configuration and requirement revision now under review.", who: "Shown by AEAIP; confirmed at closure by the responsible engineer." },
  { state: "At Risk", meaning: "Something in the evidence's configuration, procedure or requirement has changed since it was produced.", who: "Flagged automatically (concept)." },
  { state: "Retained with rationale", meaning: "An engineer has shown, for example by delta analysis or similarity, that the change does not affect this evidence.", who: "Engineering decision, recorded with rationale." },
  { state: "Reverification Required", meaning: "The change affects the evidence; the verification must be repeated or re-analysed.", who: "Engineering decision." },
  { state: "Superseded", meaning: "Replaced by newer evidence for the current configuration. Kept for history.", who: "Recorded on closure of the new evidence." },
];
