import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/icons";

/* ---------------------------------------------------------------- Flow chain */

/**
 * A linear process flow. Vertical on mobile, horizontal from md up
 * (or always vertical for long chains).
 */
export function FlowChain({
  steps,
  label,
  orientation = "responsive",
  numbered = false,
  emphasizeLast = true,
  className,
}: {
  steps: readonly string[];
  label: string;
  orientation?: "responsive" | "vertical";
  numbered?: boolean;
  emphasizeLast?: boolean;
  className?: string;
}) {
  const horizontal = orientation === "responsive";
  return (
    <ol
      aria-label={label}
      className={cn(
        "flex flex-col items-start gap-1.5",
        horizontal && "md:flex-row md:flex-wrap md:items-center md:gap-y-3",
        className,
      )}
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={`${step}-${i}`} className={cn("flex flex-col items-start gap-1.5", horizontal && "md:flex-row md:items-center")}>
            <span
              className={cn(
                "inline-flex min-h-9 items-center gap-2 border px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.08em]",
                last && emphasizeLast
                  ? "border-ink bg-ink text-bg"
                  : "border-line-strong bg-surface text-ink",
              )}
            >
              {numbered ? (
                <span className={cn("tabular-nums", last && emphasizeLast ? "opacity-70" : "text-subtle")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              {step}
            </span>
            {!last ? (
              <ArrowRight
                size={14}
                className={cn("ml-4 rotate-90 text-subtle", horizontal && "md:ml-0 md:mx-1.5 md:rotate-0")}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------------------------------------- Evidence readiness (example) */

const READINESS = [
  { label: "Requirements mapped", value: 142, of: 160 },
  { label: "Means of compliance assigned", value: 118, of: 160 },
  { label: "Evidence available", value: 87, of: 160 },
  { label: "Evidence approved internally", value: 64, of: 160 },
];

export function ReadinessPanel() {
  return (
    <figure className="ticks border border-line bg-surface p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="eyebrow">Certification Evidence Readiness</span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Illustrative example</span>
      </figcaption>
      <dl className="mt-6 space-y-5">
        {READINESS.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 text-sm">
            <dt className="text-ink-2">{r.label}</dt>
            <dd className="font-mono tabular-nums text-ink">
              {r.value} <span className="text-subtle">/ {r.of}</span>
            </dd>
            <dd aria-hidden className="col-span-2 mt-2 h-1 bg-surface-2">
              <div className="h-full bg-ink" style={{ width: `${(r.value / r.of) * 100}%` }} />
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4 text-sm">
          <dt className="text-ink-2">Open authority comments</dt>
          <dd className="font-mono tabular-nums text-ink">9</dd>
        </div>
      </dl>
      <p className="mt-6 text-xs leading-relaxed text-subtle">
        Readiness describes the state of the evidence. It is never shown as a percentage of certification.
        Figures are an illustrative example, not product or customer data.
      </p>
    </figure>
  );
}

/* --------------------------------------------- Compliance matrix (example) */

const MATRIX_COLS = [
  "Requirement",
  "Source · Rev · Clause",
  "Means of compliance",
  "Owner",
  "Evidence",
  "Verification",
  "Approval",
  "Authority comments",
] as const;

const MATRIX_ROWS: Array<Record<(typeof MATRIX_COLS)[number], string>> = [
  {
    Requirement: "Operating temperature −40 °C to +70 °C",
    "Source · Rev · Clause": "Customer environmental specification · Rev C · 4.3.2",
    "Means of compliance": "Qualification test",
    Owner: "Test engineer",
    Evidence: "Qualification test report",
    Verification: "Verified",
    Approval: "Internal review pending",
    "Authority comments": "None",
  },
  {
    Requirement: "Recovery after power interruption",
    "Source · Rev · Clause": "System specification · Rev B · 3.7",
    "Means of compliance": "Analysis + test",
    Owner: "Systems engineer",
    Evidence: "Analysis report (draft)",
    Verification: "In progress",
    Approval: "Not started",
    "Authority comments": "1 open",
  },
  {
    Requirement: "Loss-of-function failure condition classification",
    "Source · Rev · Clause": "Functional Hazard Assessment · Rev A",
    "Means of compliance": "Safety assessment",
    Owner: "Safety engineer",
    Evidence: "FHA / PSSA records",
    Verification: "Under review",
    Approval: "Not started",
    "Authority comments": "Closed",
  },
];

export function ComplianceMatrixExample() {
  return (
    <figure className="border border-line bg-surface">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-4">
        <span className="eyebrow">Compliance matrix</span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
          Illustrative example · fictitious requirements
        </span>
      </figcaption>
      <div className="lg:overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sr-only lg:not-sr-only">
            <tr>
              {MATRIX_COLS.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="border-b border-line px-4 py-3 align-bottom font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX_ROWS.map((row) => (
              <tr key={row.Requirement} className="block border-b border-line p-5 last:border-b-0 lg:table-row lg:p-0">
                {MATRIX_COLS.map((c, ci) => (
                  <td
                    key={c}
                    data-label={c}
                    className={cn(
                      "block py-1 lg:table-cell lg:px-4 lg:py-3 lg:align-top",
                      "before:mr-2 before:font-mono before:text-[0.6875rem] before:uppercase before:tracking-[0.08em] before:text-subtle before:content-[attr(data-label)] lg:before:content-none",
                      ci === 0 ? "pb-2 text-[0.9375rem] font-medium text-ink before:hidden" : "text-ink-2",
                    )}
                  >
                    {row[c]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
