const STATES = [
  {
    level: "READY",
    symbol: "●",
    color: "var(--st-available)",
    meaning: "No open item affects this gate.",
  },
  {
    level: "CONDITIONAL",
    symbol: "◐",
    color: "var(--st-prototype)",
    meaning: "Open items exist; each carries a condition the board can accept.",
  },
  {
    level: "NOT READY",
    symbol: "○",
    color: "var(--danger)",
    meaning: "At least one blocker must close before the gate.",
  },
] as const;

/** The three readiness states, always as text plus a distinct symbol (never colour alone). */
export function ReadinessStates() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
      {STATES.map((s) => (
        <li key={s.level} className="bg-bg p-6 sm:p-7">
          <p className="flex items-center gap-3 font-mono text-lg tracking-[0.04em] text-ink sm:text-xl">
            <span aria-hidden style={{ color: s.color }}>
              {s.symbol}
            </span>
            {s.level}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{s.meaning}</p>
        </li>
      ))}
    </ul>
  );
}
