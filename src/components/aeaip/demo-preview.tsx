import { cn } from "@/lib/cn";
import type { ReadinessLevel } from "@/content/aeaip-demo";

/** Text + symbol for every readiness level, so status never relies on colour alone. */
export const LEVEL_STYLE: Record<ReadinessLevel, { symbol: string; color: string }> = {
  READY: { symbol: "●", color: "var(--st-available)" },
  CONDITIONAL: { symbol: "◐", color: "var(--st-prototype)" },
  "NOT READY": { symbol: "○", color: "var(--danger)" },
};

export function LevelTag({ level, className }: { level: ReadinessLevel; className?: string }) {
  const s = LEVEL_STYLE[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink",
        className,
      )}
    >
      <span aria-hidden style={{ color: s.color }}>
        {s.symbol}
      </span>
      {level}
    </span>
  );
}
