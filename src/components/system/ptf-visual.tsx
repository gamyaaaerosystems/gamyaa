const MIN = 0;
const MAX = 35;
const LIMIT = { lo: 5, hi: 30 };
const pct = (t: number) => `${((t - MIN) / (MAX - MIN)) * 100}%`;

const ROWS = [
  { stage: "Predicted", source: "Thermal model, hot case", kind: "Simulation", value: 27.5, text: "27.5 °C" },
  { stage: "Tested", source: "Qualification TVAC, hot plateau", kind: "Qualification test", value: 28.9, text: "28.9 °C · model correlated (+1.4 °C)" },
  { stage: "Flown", source: "Flight telemetry, first 90 days", kind: "Flight telemetry", range: [21, 26] as const, text: "21–26 °C observed" },
] as const;

/**
 * Predicted → Tested → Flown for one requirement: each evidence stage plotted against
 * the same 5–30 °C limit band, so margin can be read at a glance. Fictitious values.
 */
export function PtfVisual() {
  return (
    <figure aria-label="Battery temperature requirement: predicted, tested and flown evidence against the 5 to 30 °C limit" className="rounded-sm border border-line p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-lg font-medium text-ink">THM-008 · battery 5 °C to 30 °C in all operating modes</span>
        <span className="text-sm text-muted">Illustrative</span>
      </figcaption>

      <ol className="mt-8 space-y-7">
        {ROWS.map((r) => (
          <li key={r.stage} className="grid gap-3 md:grid-cols-[11rem_1fr] md:items-center md:gap-6">
            <div>
              <p className="text-lg font-medium text-accent">{r.stage}</p>
              <p className="text-sm text-muted">
                {r.kind} · {r.source}
              </p>
            </div>
            <div>
              <div className="relative h-9">
                {/* axis and limit band */}
                <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
                <span
                  aria-hidden
                  className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--st-available)_16%,transparent)]"
                  style={{ left: pct(LIMIT.lo), width: `calc(${pct(LIMIT.hi)} - ${pct(LIMIT.lo)})` }}
                />
                <span aria-hidden className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-[var(--st-available)]" style={{ left: pct(LIMIT.lo) }} />
                <span aria-hidden className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-[var(--danger)]" style={{ left: pct(LIMIT.hi) }} />
                {"range" in r && r.range ? (
                  <span
                    aria-hidden
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-accent"
                    style={{ left: pct(r.range[0]), width: `calc(${pct(r.range[1])} - ${pct(r.range[0])})` }}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-bg"
                    style={{ left: pct("value" in r ? r.value : 0) }}
                  />
                )}
              </div>
              <p className="mt-1 text-[0.9375rem] text-ink">{r.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-2 border-t border-line pt-4 text-sm text-muted md:ml-[17rem] md:grid-cols-3">
        <span>Axis 0–35 °C</span>
        <span>
          <span aria-hidden className="mr-1.5 inline-block h-2 w-4 rounded-full bg-[color-mix(in_srgb,var(--st-available)_30%,transparent)] align-middle" />
          Allowed band 5–30 °C
        </span>
        <span>
          <span aria-hidden className="mr-1.5 inline-block h-3 w-px bg-[var(--danger)] align-middle" />
          30 °C limit
        </span>
      </div>
    </figure>
  );
}
