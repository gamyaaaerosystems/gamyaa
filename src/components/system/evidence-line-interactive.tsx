"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { track, type LineKey } from "@/lib/analytics";

export type InteractiveStep = { label: string; note?: string; detail: string };

/**
 * Evidence Line with one explanation per stage. Click, tap, keyboard focus or hover
 * selects a stage (never hover-only). Arrow keys move between stages. All
 * explanations are rendered in the HTML; only the selected one is shown.
 */
export function InteractiveEvidenceLine({
  steps,
  line,
  label,
  orientation = "auto",
}: {
  steps: readonly InteractiveStep[];
  /** Analytics key for evidence_line_step. */
  line: LineKey;
  label: string;
  orientation?: "auto" | "vertical";
}) {
  const [active, setActive] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const vertical = orientation === "vertical";

  // Hover and focus preview a stage; only an explicit click or tap is counted.
  function select(i: number, counted: boolean) {
    setActive(i);
    if (counted) track("evidence_line_step", { line, step: String(i + 1).padStart(2, "0") });
  }

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? Math.min(steps.length - 1, i + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? Math.max(0, i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? steps.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    buttons.current[next]?.focus();
  }

  return (
    <div className="grid gap-8">
      <ol
        aria-label={label}
        className={cn("relative", vertical ? "flex flex-col" : "flex flex-col md:grid")}
        style={vertical ? undefined : { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => {
          const on = i === active;
          const last = i === steps.length - 1;
          return (
            <li
              key={s.label}
              className={cn(
                "relative grid grid-cols-[1.25rem_1fr] gap-x-3",
                !vertical && "md:flex md:flex-col md:gap-0 md:pr-3",
              )}
            >
              {!last ? (
                <>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute bottom-0 left-[calc(0.625rem-0.5px)] top-[1.6rem] w-px",
                      i < active ? "bg-accent" : "bg-line-strong",
                      !vertical && "md:hidden",
                    )}
                  />
                  {!vertical ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-3 right-0 top-[1.05rem] hidden h-px transition-colors md:block",
                        i < active ? "bg-accent" : "bg-line-strong",
                      )}
                    />
                  ) : null}
                </>
              ) : null}
              <span className={cn("flex justify-center pt-[0.85rem]", !vertical && "md:justify-start md:pt-[0.7rem]")}>
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 block size-3 rounded-full border transition-colors",
                    on || i < active ? "border-accent bg-accent" : "border-ink-2 bg-bg",
                    on && "ring-4 ring-[color-mix(in_srgb,var(--accent)_22%,transparent)]",
                  )}
                />
              </span>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-pressed={on}
                aria-controls={`${uid}-detail`}
                onClick={() => select(i, true)}
                onFocus={() => select(i, false)}
                onMouseEnter={() => select(i, false)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex min-h-11 flex-col items-start rounded-sm py-2 text-left transition-colors",
                  !vertical && "md:mt-1",
                )}
              >
                <span className={cn("text-base font-medium sm:text-lg", on ? "text-accent" : "text-ink")}>{s.label}</span>
                {s.note ? <span className="mt-0.5 text-sm leading-snug text-muted">{s.note}</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
      <div id={`${uid}-detail`} aria-live="polite" className="max-w-3xl border-l-2 border-accent pl-5">
        {steps.map((s, i) => (
          <div key={s.label} hidden={i !== active}>
            <p className="font-mono text-xs text-subtle">
              Stage {i + 1} of {steps.length} · {s.label}
            </p>
            <p className="mt-2 text-lg leading-relaxed text-ink">{s.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
