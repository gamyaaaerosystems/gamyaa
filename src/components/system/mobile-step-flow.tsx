"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * MobileStepFlow — a short sequence shown side by side on larger screens and one
 * step at a time on phones (with step tabs and Previous / Next). Every step's
 * content is in the HTML; on phones the inactive ones are hidden.
 */
export function MobileStepFlow({
  steps,
  label,
}: {
  steps: ReadonlyArray<{ title: string; kicker?: string; content: ReactNode }>;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <div>
      {/* Phone step tabs */}
      <div role="tablist" aria-label={label} className="flex gap-2 md:hidden">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "flex min-h-11 flex-1 items-center justify-center rounded-sm border px-2 text-sm",
              i === active ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-2",
            )}
          >
            {s.title}
          </button>
        ))}
      </div>
      <ol className="mt-5 grid gap-px md:mt-0 md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:overflow-hidden md:rounded-sm md:border md:border-line md:bg-line" style={{ ["--n" as string]: steps.length }}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            id={`${uid}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${i}`}
            className={cn("bg-surface p-5 sm:p-6", i !== active && "max-md:hidden")}
          >
            {s.kicker ? <p className="text-sm font-medium text-accent">{s.kicker}</p> : null}
            <h3 className="mt-1 text-xl font-medium tracking-tight text-ink">{s.title}</h3>
            <div className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{s.content}</div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex justify-between md:hidden">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={active === 0}
          onClick={() => setActive((a) => Math.max(0, a - 1))}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={active === steps.length - 1}
          onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
