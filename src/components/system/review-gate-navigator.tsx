"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { GATES } from "@/content/review-gates";

/**
 * ReviewGateNavigator — the illustrative gate sequence as one selectable line.
 * Large screens show all eleven gates; phones show a scrollable selector with
 * Previous / Next. The selected gate's purpose, key question, typical evidence and
 * AEAIP readiness view appear below; full detail stays in the page body.
 */
export function ReviewGateNavigator({ initial = "TRR" }: { initial?: string }) {
  const [i, setI] = useState(Math.max(0, GATES.findIndex((g) => g.code === initial)));
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const chips = useRef<Array<HTMLButtonElement | null>>([]);
  const g = GATES[i];

  function select(n: number, focus = false) {
    const next = Math.max(0, Math.min(GATES.length - 1, n));
    setI(next);
    track("review_gate_select", { gate: GATES[next].code, source_location: "learn_page" });
    if (focus) chips.current[next]?.focus();
  }

  // Keep the selected chip centred in the phone scroller (scrolls the strip only,
  // never the page).
  useEffect(() => {
    const el = chips.current[i];
    const strip = el?.closest<HTMLElement>(".gx-scroll-x");
    if (!el || !strip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2 });
  }, [i]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight") select(i + 1, true);
    else if (e.key === "ArrowLeft") select(i - 1, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(GATES.length - 1, true);
    else return;
    e.preventDefault();
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => select(i - 1)}
          disabled={i === 0}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-line-strong disabled:opacity-30 lg:hidden"
          aria-label="Previous gate"
        >
          <span aria-hidden>←</span>
        </button>
        <div className="gx-scroll-x relative min-w-0 flex-1 overflow-x-auto lg:overflow-visible">
          <ol aria-label="Illustrative review gates" className="relative flex snap-x gap-2 py-1 lg:grid lg:grid-cols-11 lg:gap-0">
            <span aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-line-strong lg:block" />
            {GATES.map((gate, n) => {
              const on = n === i;
              return (
                <li key={gate.code} className="snap-center lg:pr-2">
                  <button
                    ref={(el) => {
                      chips.current[n] = el;
                    }}
                    type="button"
                    aria-pressed={on}
                    aria-controls={`${uid}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(n)}
                    onKeyDown={onKey}
                    className={cn(
                      "flex min-h-12 min-w-[4.75rem] flex-col items-center rounded-sm border px-2 py-2 transition-colors lg:min-w-0 lg:items-start lg:border-0 lg:px-0 lg:py-0",
                      on ? "border-ink bg-ink text-bg lg:bg-transparent lg:text-ink" : "border-line-strong text-ink-2 hover:text-ink",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 mt-[0.85rem] hidden size-3 rounded-full border lg:block",
                        on ? "border-accent bg-accent ring-4 ring-[color-mix(in_srgb,var(--accent)_22%,transparent)]" : n < i ? "border-accent bg-bg" : "border-ink-2 bg-bg",
                      )}
                    />
                    <span className={cn("font-mono text-sm tracking-[0.04em] lg:mt-3", on && "lg:text-accent")}>{gate.code}</span>
                    <span className="mt-0.5 hidden text-xs leading-snug text-muted lg:block">{gate.name}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <button
          type="button"
          onClick={() => select(i + 1)}
          disabled={i === GATES.length - 1}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-line-strong disabled:opacity-30 lg:hidden"
          aria-label="Next gate"
        >
          <span aria-hidden>→</span>
        </button>
      </div>

      <div id={`${uid}-panel`} aria-live="polite" className="mt-10">
        <div key={g.code} className="anim-state">
          <p className="text-sm text-muted">
            Gate {i + 1} of {GATES.length} · {g.stage}
          </p>
          {/* h2: the navigator sits directly under the page H1, in the hero. */}
          <h2 className="mt-1 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            <span className="font-mono text-accent">{g.code}</span> — {g.name}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-medium text-accent">Purpose</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{g.purpose}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-accent">Key question</h3>
              <p className="mt-2 text-lg leading-snug text-ink">{g.readiness}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-accent">Typical evidence</h3>
              <ul className="mt-2 space-y-1.5 text-[0.9375rem] text-ink-2">
                {g.evidence.map((e) => (
                  <li key={e} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-steel" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-accent">AEAIP readiness view</h3>
              <ul className="mt-2 space-y-1.5 text-[0.9375rem] text-ink-2">
                {g.aeaip.map((e) => (
                  <li key={e} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-accent" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a href={`#${g.code.toLowerCase()}`} className="link-arrow mt-6 text-[0.9375rem]">
            Full {g.code} explanation below ↓
          </a>
        </div>
      </div>
    </div>
  );
}
