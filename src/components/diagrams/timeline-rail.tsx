"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import type { Milestone } from "@/content/timeline";

const KIND_LABEL: Record<Milestone["kind"], string> = {
  history: "Completed",
  current: "Now",
  roadmap: "Roadmap",
  vision: "Vision",
};

/**
 * Desktop timeline: a horizontal rail of year tabs with a detail panel.
 * 2026 is selected by default as the transition to Product + Company.
 */
export function TimelineRail({ items, initial = "2026" }: { items: Milestone[]; initial?: string }) {
  const [active, setActive] = useState(initial);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const index = items.findIndex((m) => m.year === active);
  const current = items[index] ?? items[0];
  const firstFuture = items.findIndex((m) => m.kind === "roadmap" || m.kind === "vision");

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(items[next].year);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      {/* Phase brackets */}
      <div aria-hidden className="mb-3 grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        <div className="border-t border-line-strong pt-2" style={{ gridColumn: `1 / ${firstFuture + 1}` }}>
          <span className="eyebrow">History · Product</span>
        </div>
        <div
          className="ml-3 border-t border-dashed border-line-strong pt-2"
          style={{ gridColumn: `${firstFuture + 1} / ${items.length + 1}` }}
        >
          <span className="eyebrow">Roadmap / Vision — not guaranteed</span>
        </div>
      </div>

      <div className="relative">
        {/* Rail */}
        <div aria-hidden className="absolute left-0 right-0 top-[7px] flex">
          <div className="h-px bg-line-strong" style={{ width: `${(firstFuture / items.length) * 100}%` }} />
          <div
            className="h-px flex-1"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--line-strong) 50%, transparent 50%)",
              backgroundSize: "8px 1px",
            }}
          />
        </div>

        <div role="tablist" aria-label="Gamyaa AeroSystems timeline" className="relative grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
          {items.map((m, i) => {
            const selected = m.year === active;
            const key = m.kind === "current";
            const future = m.kind === "roadmap" || m.kind === "vision";
            return (
              <button
                key={m.year}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${uid}-tab-${m.year}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${m.year}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(m.year)}
                onKeyDown={onKey}
                className="group flex flex-col items-start pr-3 text-left"
              >
                <span className="relative flex h-[14px] items-center">
                  <span
                    className={cn(
                      "block rounded-full border transition-all",
                      key ? "size-[14px] border-accent" : "size-[11px]",
                      selected
                        ? key
                          ? "bg-accent"
                          : "border-ink bg-ink"
                        : future
                          ? "border-dashed border-line-strong bg-bg"
                          : key
                            ? "bg-surface-accent"
                            : "border-ink-2 bg-bg",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "mt-4 font-mono tabular-nums tracking-tight transition-colors",
                    key ? "text-3xl" : "text-2xl",
                    selected ? "text-ink" : "text-muted group-hover:text-ink",
                  )}
                >
                  {m.year}
                </span>
                <span className={cn("mt-1 text-sm leading-snug", selected ? "text-ink-2" : "text-subtle")}>
                  {m.phase}
                </span>
                <span
                  className={cn(
                    "mt-2 font-mono text-[0.625rem] uppercase tracking-[0.1em]",
                    key ? "text-accent" : "text-subtle",
                  )}
                >
                  {KIND_LABEL[m.kind]}
                </span>
                <span
                  aria-hidden
                  className={cn("mt-3 h-px w-8 transition-colors", selected ? "bg-ink" : "bg-transparent")}
                />
              </button>
            );
          })}
        </div>
      </div>

      {items.map((m) => (
        <div
          key={m.year}
          role="tabpanel"
          id={`${uid}-panel-${m.year}`}
          aria-labelledby={`${uid}-tab-${m.year}`}
          hidden={m.year !== current.year}
          tabIndex={0}
          className={cn(
            "mt-8 border p-8",
            m.kind === "current" ? "border-accent bg-surface-accent" : "border-line bg-surface",
          )}
        >
          <MilestoneBody m={m} />
        </div>
      ))}
    </div>
  );
}

export function MilestoneBody({ m }: { m: Milestone }) {
  const future = m.kind === "roadmap" || m.kind === "vision";
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow">
          {m.year} · {m.phase}
          {future ? <span className="ml-2 text-accent">· {KIND_LABEL[m.kind]}</span> : null}
        </p>
        {m.kind === "vision" ? (
          <blockquote className="mt-3 text-2xl font-medium leading-snug tracking-tight text-ink">“{m.title}”</blockquote>
        ) : (
          <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight text-ink">{m.title}</h3>
        )}
        {m.summary ? <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{m.summary}</p> : null}
        {m.flow ? <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-accent">{m.flow}</p> : null}
      </div>
      {m.points.length > 0 ? (
        <ul className="grid content-start gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:col-span-7">
          {m.points.map((p) => (
            <li key={p} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-2">
              <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-steel" />
              {p}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
