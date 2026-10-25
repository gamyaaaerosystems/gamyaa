"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type StandardRow = {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  note: string;
  categories: string[];
};

/**
 * Filterable standards reference. Every row is rendered in the HTML; the filter only
 * hides rows. Links go to publishers and official sources.
 */
export function StandardsReference({
  rows,
  categories,
}: {
  rows: StandardRow[];
  categories: Array<{ name: string; maps: string }>;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const active = categories.find((c) => c.name === filter);
  const shown = rows.filter((r) => !filter || r.categories.includes(filter));

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {[null, ...categories.map((c) => c.name)].map((name) => (
          <button
            key={name ?? "all"}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors",
              filter === name ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
            )}
          >
            {name ?? "All"}
            <span className="ml-2 font-mono text-xs opacity-70">
              {name ? rows.filter((r) => r.categories.includes(name)).length : rows.length}
            </span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 min-h-6 text-sm text-muted">
        {active ? (
          <>
            <span className="text-ink">{active.name}</span> — AEAIP would map: {active.maps}
          </>
        ) : (
          <>{rows.length} references across {categories.length} categories.</>
        )}
      </p>
      <ul className="mt-4 border-b border-line">
        {rows.map((r) => (
          <li
            key={r.id}
            hidden={!shown.includes(r)}
            className="grid gap-2 border-t border-line py-4 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-8"
          >
            <div>
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-label={`reference_${r.id}`}
                  className="text-[0.9375rem] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                >
                  {r.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-[0.9375rem] font-medium text-ink">{r.title}</span>
              )}
              <p className="mt-1 text-sm text-muted">
                {r.publisher} — {r.note}
              </p>
            </div>
            <ul aria-label="Categories" className="flex flex-wrap content-start gap-1.5 md:justify-end">
              {r.categories.map((c) => (
                <li key={c} className="rounded-full border border-line px-2 py-0.5 text-xs text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
