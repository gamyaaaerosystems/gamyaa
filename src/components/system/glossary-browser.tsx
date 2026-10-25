"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Term } from "@/content/glossary";

const letterOf = (t: string) => t.charAt(0).toUpperCase();

/**
 * Glossary reference: search, A–Z navigation and alphabetical entries. Every term is
 * rendered in the HTML (crawlable, deep-linkable by #slug); search only hides rows.
 */
export function GlossaryBrowser({ terms }: { terms: Term[] }) {
  const [q, setQ] = useState("");
  const uid = useId();
  const sorted = useMemo(() => [...terms].sort((a, b) => a.term.localeCompare(b.term, "en")), [terms]);
  const letters = useMemo(() => Array.from(new Set(sorted.map((t) => letterOf(t.term)))), [sorted]);
  const needle = q.trim().toLowerCase();
  const match = (t: Term) => !needle || `${t.term} ${t.definition} ${t.group}`.toLowerCase().includes(needle);
  const count = sorted.filter(match).length;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor={`${uid}-q`} className="text-sm text-muted">
            Search the glossary
          </label>
          <input
            id={`${uid}-q`}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. waiver, TRR, HIL"
            className="mt-2 block min-h-12 w-full rounded-sm border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-subtle focus:border-ink focus:outline-none"
            aria-describedby={`${uid}-count`}
          />
        </div>
        <p id={`${uid}-count`} aria-live="polite" className="text-sm text-muted">
          {count} of {sorted.length} terms
        </p>
      </div>

      <nav aria-label="Alphabetical index" className="mt-6">
        <ul className="flex flex-wrap gap-1">
          {letters.map((l) => (
            <li key={l}>
              <a
                href={`#letter-${l.toLowerCase()}`}
                className="inline-flex size-11 items-center justify-center rounded-sm border border-line font-mono text-sm text-ink-2 hover:border-ink hover:text-ink"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10">
        {letters.map((l) => {
          const group = sorted.filter((t) => letterOf(t.term) === l);
          const visible = group.filter(match);
          return (
            <section key={l} id={`letter-${l.toLowerCase()}`} aria-labelledby={`letter-${l}-h`} hidden={visible.length === 0} className="scroll-mt-28 border-t border-line-strong py-6">
              <h2 id={`letter-${l}-h`} className="font-mono text-2xl text-accent">
                {l}
              </h2>
              <dl className="mt-2">
                {group.map((t) => (
                  <div key={t.slug} id={t.slug} hidden={!match(t)} className="grid scroll-mt-28 gap-1 border-t border-line py-4 first:border-t-0 md:grid-cols-[16rem_1fr] md:gap-8">
                    <dt className="text-lg font-medium text-ink">{t.term}</dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {t.definition}
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span className="text-muted">{t.group}</span>
                        {t.see ? (
                          <Link href={t.see} className="inline-flex min-h-6 items-center text-accent hover:underline">
                            Read more →
                          </Link>
                        ) : null}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
        {count === 0 ? <p className="text-[0.9375rem] text-muted">No terms match &ldquo;{q}&rdquo;.</p> : null}
      </div>
    </div>
  );
}
