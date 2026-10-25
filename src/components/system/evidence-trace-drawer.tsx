"use client";

import { useEffect, useId, useRef } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { CATEGORY_LABEL, type Issue, type TraceState } from "@/content/aeaip-demo";

export const TRACE_MARK: Record<TraceState, { symbol: string; label: string; color: string }> = {
  done: { symbol: "●", label: "Complete", color: "var(--st-available)" },
  fail: { symbol: "✕", label: "Failed", color: "var(--danger)" },
  attention: { symbol: "▲", label: "Needs attention", color: "var(--st-prototype)" },
  open: { symbol: "○", label: "Open", color: "var(--subtle)" },
  na: { symbol: "–", label: "Not applicable", color: "var(--subtle)" },
};

/**
 * EvidenceTraceDrawer — one item's evidence trace in a native modal <dialog>:
 * a right-hand drawer on large screens, a bottom sheet on phones. Focus is trapped
 * while open, Esc and the backdrop close it, and focus returns to the opener.
 */
export function EvidenceTraceDrawer({
  issue,
  subsystemName,
  condition,
  onClose,
}: {
  issue: Issue | null;
  subsystemName?: string;
  /** Condition text when the item is a condition at the selected gate. */
  condition?: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (issue && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
    } else if (!issue && d.open) {
      d.close();
    }
  }, [issue]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="gx-drawer"
      onClose={() => {
        onClose();
        (opener.current as HTMLElement | null)?.focus?.();
      }}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      {issue ? (
        <div className="flex max-h-[inherit] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm text-muted">
                {issue.id} · {CATEGORY_LABEL[issue.category]}
                {subsystemName ? ` · ${subsystemName}` : ""}
              </p>
              <h2 id={titleId} className="mt-1 text-xl font-medium leading-snug tracking-tight text-ink">
                {issue.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-line-strong hover:border-ink"
              autoFocus
            >
              <CloseIcon size={18} />
              <span className="sr-only">Close evidence trace</span>
            </button>
          </div>
          <div className="overflow-y-auto px-5 py-5 sm:px-6" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">{issue.summary}</p>
            <ol className="mt-6" aria-label={`Evidence trace for ${issue.id}`}>
              {issue.trace.map((t, i) => {
                const m = TRACE_MARK[t.state];
                const last = i === issue.trace.length - 1;
                return (
                  <li key={t.label} className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-4 last:pb-0">
                    {!last ? <span aria-hidden className="absolute bottom-0 left-[0.7rem] top-6 w-px bg-line-strong" /> : null}
                    <span aria-hidden className="relative z-10 grid size-6 place-items-center bg-bg text-xs" style={{ color: m.color }}>
                      {m.symbol}
                    </span>
                    <div>
                      <p className="text-sm text-muted">
                        {t.label} <span className="sr-only">— {m.label}</span>
                      </p>
                      <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink">{t.value}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            {condition ? (
              <p className="mt-6 border-l-2 border-[var(--st-prototype)] pl-3 text-sm text-ink-2">
                <span className="font-medium text-ink">Condition: </span>
                {condition}
              </p>
            ) : null}
            <ul aria-label="Legend" className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-3 text-xs text-muted">
              {(["done", "fail", "attention", "open"] as TraceState[]).map((k) => (
                <li key={k} className="flex items-center gap-1.5">
                  <span aria-hidden style={{ color: TRACE_MARK[k].color }}>
                    {TRACE_MARK[k].symbol}
                  </span>
                  {TRACE_MARK[k].label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Fictitious data. Not a flight-safety or certification determination.</p>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
