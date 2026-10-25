import { cn } from "@/lib/cn";

type Row = { stage: string; value: string; flag?: { text: string; tone: "changed" | "risk" | "condition" } };

const ROWS: Row[] = [
  { stage: "Requirement", value: "SAT-EPS-014 · battery charge termination · Rev 3" },
  { stage: "Configuration", value: "BMS firmware 2.4.0 · EPS board Rev C", flag: { text: "Changed", tone: "changed" } },
  { stage: "Evidence", value: "TR-EPS-114 · produced on firmware 2.3.0, Rev B", flag: { text: "At risk", tone: "risk" } },
  { stage: "Verification", value: "Reopened · delta test planned" },
  { stage: "Readiness", value: "TRR · go with conditions", flag: { text: "Condition", tone: "condition" } },
];

const TONE: Record<NonNullable<Row["flag"]>["tone"], string> = {
  changed: "border-line-strong text-ink-2",
  risk: "border-[var(--st-prototype)] text-[var(--st-prototype)]",
  condition: "border-accent text-accent",
};

/**
 * AssuranceFlow — the system-level hero visual: one requirement traced along the
 * AEAIP chain, showing why configuration sits between requirement and evidence.
 * Fictitious example. The trace draws once on load (skipped under reduced motion).
 */
export function AssuranceFlow({ className }: { className?: string }) {
  return (
    <figure
      className={cn("relative rounded-sm border border-line bg-surface/70 p-6 backdrop-blur-[2px] sm:p-8", className)}
      aria-label="Illustrative assurance trace for one requirement"
    >
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">Readiness trace</span>
        <span className="text-xs text-subtle">Illustrative</span>
      </figcaption>
      <ol className="relative mt-7">
        <span
          aria-hidden
          className="anim-trace absolute bottom-3 left-[5px] top-3 w-px origin-top bg-gradient-to-b from-line-strong via-line-strong to-accent"
        />
        {ROWS.map((r, i) => {
          const last = i === ROWS.length - 1;
          return (
            <li
              key={r.stage}
              className="anim-fade-up relative grid grid-cols-[1.75rem_1fr] pb-5 last:pb-0"
              style={{ animationDelay: `${250 + i * 140}ms` }}
            >
              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-1.5 block size-[11px] rounded-full border",
                  last ? "border-accent bg-accent" : "border-ink-2 bg-surface",
                )}
              />
              <div>
                <p className={cn("text-sm font-medium", last ? "text-accent" : "text-muted")}>{r.stage}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] leading-snug text-ink">
                  {r.value}
                  {r.flag ? (
                    <span className={cn("rounded-full border px-2 py-px text-xs", TONE[r.flag.tone])}>{r.flag.text}</span>
                  ) : null}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-7 border-t border-line pt-4 text-sm text-muted">
        AI assists. Engineers verify. Authorized authorities approve.
      </p>
    </figure>
  );
}
