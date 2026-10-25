const SOURCES = [
  "Requirements tool",
  "PLM and CAD",
  "Test systems",
  "Quality and NCRs",
  "Software builds",
  "Simulation",
] as const;

/**
 * Fragmented engineering systems converging into one assurance view (AEAIP
 * overview, chapter 01). Lines are decorative; every label is text.
 */
export function ConvergenceDiagram() {
  return (
    <figure aria-label="Evidence from six engineering systems converging into one assurance view" className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:gap-0">
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-3">
        {SOURCES.map((s) => (
          <li key={s} className="rounded-sm border border-line-strong px-3 py-2.5 text-sm text-ink-2 md:text-[0.9375rem]">
            {s}
          </li>
        ))}
      </ul>
      {/* converging lines (md+) / single arrow (phones) */}
      <svg aria-hidden viewBox="0 0 100 300" preserveAspectRatio="none" className="hidden h-full w-full md:block">
        {SOURCES.map((_, i) => {
          const y = 25 + i * 50;
          return (
            <path
              key={i}
              d={`M0 ${y} C 55 ${y}, 45 150, 100 150`}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      <span aria-hidden className="mx-auto block h-8 w-px bg-line-strong md:hidden" />
      <div className="rounded-sm border border-accent bg-surface-accent p-5 sm:p-6">
        <p className="text-sm text-accent">One assurance view</p>
        <ul className="mt-3 space-y-2 text-[0.9375rem] text-ink">
          <li>What is verified, on which configuration</li>
          <li>What is missing or no longer valid</li>
          <li>What stands between the system and its next gate</li>
        </ul>
      </div>
      <figcaption className="sr-only">
        Requirements, PLM and CAD, test systems, quality and NCR records, software builds and simulation results are
        brought together into one view of verification status and readiness.
      </figcaption>
    </figure>
  );
}
