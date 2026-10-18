import { cn } from "@/lib/cn";
import { TIMELINE, type Milestone } from "@/content/timeline";
import { TimelineRail } from "./timeline-rail";

const KIND_LABEL: Record<Milestone["kind"], string> = {
  history: "Completed",
  current: "Now",
  roadmap: "Roadmap",
  vision: "Vision",
};

/** Evolution timeline: vertical on phones/tablets, horizontal rail on desktop. */
export function Timeline() {
  return (
    <div>
      {/* Mobile & tablet: vertical scrolling timeline */}
      <ol className="lg:hidden" aria-label="Gamyaa AeroSystems timeline">
        {TIMELINE.map((m, i) => {
          const future = m.kind === "roadmap" || m.kind === "vision";
          const key = m.kind === "current";
          const last = i === TIMELINE.length - 1;
          const nextFuture = !last && (TIMELINE[i + 1].kind === "roadmap" || TIMELINE[i + 1].kind === "vision");
          return (
            <li key={m.year} className="relative grid grid-cols-[1.25rem_1fr] gap-x-4 pb-8 last:pb-0">
              <div className="relative flex justify-center">
                {!last ? (
                  <span
                    aria-hidden
                    className="absolute bottom-0 top-5 w-px"
                    style={
                      nextFuture || future
                        ? {
                            backgroundImage: "linear-gradient(180deg, var(--line-strong) 50%, transparent 50%)",
                            backgroundSize: "1px 8px",
                          }
                        : { background: "var(--line-strong)" }
                    }
                  />
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-1.5 block rounded-full border",
                    key ? "size-[14px] border-accent bg-accent" : "size-[11px]",
                    !key && (future ? "border-dashed border-line-strong bg-bg" : "border-ink bg-ink"),
                  )}
                />
              </div>
              <div className={cn(key && "-mx-1 border border-accent bg-surface-accent p-4")}>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className={cn("font-mono tabular-nums tracking-tight text-ink", key ? "text-3xl" : "text-2xl")}>
                    {m.year}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[0.625rem] uppercase tracking-[0.1em]",
                      key || future ? "text-accent" : "text-subtle",
                    )}
                  >
                    {future ? "Roadmap / Vision — not guaranteed" : KIND_LABEL[m.kind]}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted">{m.phase}</p>
                {m.kind === "vision" ? (
                  <blockquote className="mt-2 text-lg font-medium leading-snug text-ink">“{m.title}”</blockquote>
                ) : (
                  <h3 className="mt-2 text-lg font-medium leading-snug text-ink">{m.title}</h3>
                )}
                {m.summary ? <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{m.summary}</p> : null}
                {m.flow ? (
                  <p className="mt-3 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.08em] text-accent">
                    {m.flow}
                  </p>
                ) : null}
                {m.points.length > 0 ? (
                  <ul className="mt-3 space-y-1.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-2">
                        <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-steel" />
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal rail */}
      <div className="hidden lg:block">
        <TimelineRail items={TIMELINE} />
      </div>

      <p className="mt-8 max-w-3xl text-xs leading-relaxed text-subtle">
        2027 onwards describes our roadmap and vision. These are intentions, not commitments or guarantees, and
        they will change as we learn from customers and partners. Gamyaa AeroSystems Private Limited is planned and
        not yet incorporated.
      </p>
    </div>
  );
}
