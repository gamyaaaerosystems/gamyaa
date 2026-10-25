import { cn } from "@/lib/cn";
import { TIMELINE } from "@/content/timeline";

/**
 * Company evolution on the Evidence Line: solid nodes for what has happened, the
 * accent node for now, hollow nodes for intentions. Vertical on phones, a rail from lg.
 */
export function Timeline() {
  return (
    <div>
      <ol aria-label="Gamyaa AeroSystems evolution" className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto" />
        {TIMELINE.map((m) => {
          const now = m.kind === "current";
          const ahead = m.kind === "next" || m.kind === "future";
          return (
            <li key={m.stage} className="relative grid grid-cols-[1.75rem_1fr] lg:block">
              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-1 block size-[11px] rounded-full border lg:mt-0",
                  now && "border-accent bg-accent",
                  ahead && "border-line-strong bg-bg",
                  !now && !ahead && "border-ink bg-ink",
                )}
              />
              <div className="lg:mt-6 lg:pr-4">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className={cn("font-mono text-2xl tracking-tight", now ? "text-accent" : ahead ? "text-muted" : "text-ink")}>{m.stage}</span>
                  {now ? <span className="text-sm text-accent">Now</span> : null}
                </p>
                <h3 className="mt-2 font-medium leading-snug text-ink">{m.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{m.summary}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        &ldquo;Next&rdquo; and &ldquo;Future&rdquo; are intentions, not commitments, and will change as we learn
        from customers and partners. Gamyaa AeroSystems Private Limited is planned and not yet incorporated.
      </p>
    </div>
  );
}
