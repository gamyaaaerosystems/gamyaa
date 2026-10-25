import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type EvidenceStep = string | { label: string; note?: string; href?: string };

const norm = (s: EvidenceStep) => (typeof s === "string" ? { label: s } : s);

/**
 * Evidence Line — the GAMYAA traceability motif. A hairline connecting nodes, read
 * left to right (or top to bottom on phones). The last node is filled: the point
 * the chain is building towards (readiness, approval, closure).
 *
 * Server-rendered text, so every step is crawlable and readable without CSS.
 */
export function EvidenceLine({
  steps,
  label,
  orientation = "auto",
  size = "md",
  emphasize = "last",
  active,
  className,
}: {
  steps: readonly EvidenceStep[];
  /** Accessible name of the list. */
  label: string;
  /** auto: vertical on phones, horizontal from md. scroll: horizontal everywhere, scrolling inside on small screens. */
  orientation?: "auto" | "horizontal" | "vertical" | "scroll";
  size?: "md" | "lg";
  emphasize?: "last" | "none";
  /** Index of a step to highlight (e.g. the current review gate). */
  active?: number;
  className?: string;
}) {
  const items = steps.map(norm);
  const n = items.length;
  const vertical = orientation === "vertical";
  const auto = orientation === "auto";
  const scroll = orientation === "scroll";

  const list = (
    <ol
      aria-label={label}
      className={cn(
        "relative",
        vertical && "flex flex-col",
        auto && "flex flex-col md:grid",
        (orientation === "horizontal" || scroll) && "grid",
        scroll && "min-w-max",
      )}
      style={
        vertical
          ? undefined
          : ({ gridTemplateColumns: `repeat(${n}, minmax(${scroll ? "6.5rem" : "0"}, 1fr))` } as CSSProperties)
      }
    >
      {items.map((s, i) => {
        const last = i === n - 1;
        const strong = (emphasize === "last" && last) || active === i;
        const node = (
          <span
            aria-hidden
            className={cn(
              "relative z-10 block shrink-0 rounded-full border",
              size === "lg" ? "size-3" : "size-[11px]",
              strong ? "border-accent bg-accent" : "border-ink-2 bg-bg",
            )}
          />
        );
        const text = (
          <span className="min-w-0">
            <span
              className={cn(
                "block leading-snug",
                size === "lg" ? "text-base font-medium sm:text-lg" : "text-sm font-medium",
                strong ? "text-accent" : "text-ink",
              )}
            >
              {s.href ? (
                <Link href={s.href} className="hover:underline">
                  {s.label}
                </Link>
              ) : (
                s.label
              )}
            </span>
            {s.note ? <span className="mt-1 block text-sm leading-snug text-muted">{s.note}</span> : null}
          </span>
        );
        return (
          <li
            key={`${s.label}-${i}`}
            aria-current={active === i ? "step" : undefined}
            className={cn(
              "relative",
              // Vertical layout: node column + text, connector runs down.
              (vertical || auto) && "grid grid-cols-[1.25rem_1fr] gap-x-3 pb-5 last:pb-0",
              auto && "md:flex md:flex-col md:gap-3 md:pb-0 md:pr-4",
              (orientation === "horizontal" || scroll) && "flex flex-col gap-3 pr-4",
            )}
          >
            {!last ? (
              <>
                {/* down connector (vertical / phone) */}
                {vertical || auto ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute bottom-0 left-[calc(0.625rem-0.5px)] top-[1.05rem] w-px bg-line-strong",
                      auto && "md:hidden",
                    )}
                  />
                ) : null}
                {/* across connector (horizontal) */}
                {!vertical ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-0 h-px bg-line-strong",
                      size === "lg" ? "left-3 top-[5.5px]" : "left-[11px] top-[5px]",
                      auto && "hidden md:block",
                    )}
                  />
                ) : null}
              </>
            ) : null}
            <span className={cn("flex", (vertical || auto) && "justify-center pt-1", auto && "md:justify-start md:pt-0")}>
              {node}
            </span>
            {text}
          </li>
        );
      })}
    </ol>
  );

  if (scroll) {
    return <div className={cn("gx-scroll-x -mx-1 overflow-x-auto px-1 pb-2", className)}>{list}</div>;
  }
  return <div className={className}>{list}</div>;
}
