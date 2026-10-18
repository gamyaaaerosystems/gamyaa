import { cn } from "@/lib/cn";
import { LIFECYCLE } from "@/content/company";
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

/* -------------------------------------------------------- Lifecycle diagram */

const COVERAGE: Record<string, string> = {
  Design: "AirCert AI™",
  Airworthiness: "AirCert AI™",
  Manufacturing: "DAQIP™",
  Inspection: "DAQIP™",
  Evidence: "DAQIP™ + AirCert AI™",
  Approval: "Human authority",
};

/** DESIGN → AIRWORTHINESS → MANUFACTURING → INSPECTION → EVIDENCE → APPROVAL */
export function LifecycleDiagram() {
  return (
    <figure className="ticks border border-line bg-surface p-6 sm:p-8 lg:p-10">
      <figcaption className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <span className="eyebrow">Connected engineering lifecycle</span>
        <span className="font-mono text-xs text-subtle">FIG. 01</span>
      </figcaption>
      <div className="relative">
        <div
          aria-hidden
          className="anim-scale-x pointer-events-none absolute left-[11px] right-0 top-[11px] hidden h-px bg-line-strong lg:block"
        />
        <ol className="grid grid-cols-1 lg:grid-cols-6">
          {LIFECYCLE.map((s, i) => {
            const last = i === LIFECYCLE.length - 1;
            return (
              <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0 lg:pr-5">
                <div className="relative flex shrink-0 flex-col items-center lg:items-start">
                  <span
                    className={cn(
                      "z-10 grid size-[23px] place-items-center rounded-full border bg-surface",
                      last ? "border-accent" : "border-line-strong",
                    )}
                  >
                    <span className={cn("size-[7px] rounded-full", last ? "bg-accent" : "bg-ink")} />
                  </span>
                  {!last ? (
                    <span aria-hidden className="absolute bottom-[-0.5rem] top-[23px] w-px bg-line-strong lg:hidden" />
                  ) : null}
                </div>
                <div className="lg:mt-6">
                  <p className="font-mono text-xs text-subtle">{s.n}</p>
                  <h3 className="mt-1 font-mono text-sm uppercase tracking-[0.12em] text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-accent lg:hidden">
                    {COVERAGE[s.title]}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div aria-hidden className="mt-10 hidden grid-cols-6 gap-x-4 lg:grid">
        <Bracket className="col-span-2" title="AirCert AI™" sub="Design assurance · Certification" />
        <Bracket className="col-span-3" title="DAQIP™" sub="Manufacturing assurance · Quality" />
        <Bracket className="col-span-1" title="Human authority" sub="Review · Approval" accent />
      </div>
      <p className="sr-only">
        AirCert AI covers design and airworthiness. DAQIP covers manufacturing, inspection and quality evidence.
        Approval always remains a human decision.
      </p>
    </figure>
  );
}

function Bracket({ className, title, sub, accent }: { className?: string; title: string; sub: string; accent?: boolean }) {
  return (
    <div className={className}>
      <div className={cn("h-2 border-x border-b", accent ? "border-accent" : "border-line-strong")} />
      <p className={cn("mt-3 text-sm font-medium", accent ? "text-accent" : "text-ink")}>{title}</p>
      <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{sub}</p>
    </div>
  );
}

/* ------------------------------------------------- DAQIP + AirCert AI thread */

const THREAD: Array<{ lane: "aircert" | "daqip"; title: string }> = [
  { lane: "aircert", title: "Certification Requirement" },
  { lane: "aircert", title: "Design Requirement" },
  { lane: "daqip", title: "Manufacturing Characteristic" },
  { lane: "daqip", title: "Inspection Method" },
  { lane: "daqip", title: "Measurement" },
  { lane: "daqip", title: "FAI / Evidence" },
  { lane: "aircert", title: "Certification Evidence" },
];

export function IntegrationDiagram() {
  return (
    <figure className="ticks border border-line bg-surface p-6 sm:p-8 lg:p-10">
      <figcaption className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <span className="eyebrow">One digital thread</span>
        <span className="font-mono text-xs text-subtle">FIG. 02</span>
      </figcaption>

      <div aria-hidden className="mb-6 hidden grid-cols-[1fr_3rem_1fr] lg:grid">
        <div className="pr-6 text-right">
          <p className="text-sm font-medium text-ink">AirCert AI™</p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
            Design Assurance / Certification
          </p>
        </div>
        <div />
        <div className="pl-6">
          <p className="text-sm font-medium text-ink">DAQIP™</p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
            Manufacturing Assurance / Quality
          </p>
        </div>
      </div>

      <ol aria-label="Certification requirement to approval across AirCert AI and DAQIP">
        {THREAD.map((step, i) => (
          <li
            key={step.title}
            className="grid grid-cols-[1.5rem_1fr] gap-x-4 lg:grid-cols-[1fr_3rem_1fr] lg:gap-x-0"
          >
            <div className="relative col-start-1 row-start-1 flex justify-center lg:col-start-2">
              <span aria-hidden className="absolute inset-y-0 w-px bg-line-strong" />
              <span
                aria-hidden
                className={cn(
                  "relative mt-3.5 size-[9px] rounded-full border",
                  step.lane === "daqip" ? "border-ink bg-ink" : "border-accent bg-surface",
                )}
              />
            </div>
            <div
              className={cn(
                "col-start-2 row-start-1 pb-3",
                step.lane === "aircert" ? "lg:col-start-1 lg:pr-6 lg:text-right" : "lg:col-start-3 lg:pl-6",
              )}
            >
              <div className="inline-flex flex-col border border-line bg-bg px-3.5 py-2 text-left lg:min-w-64">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> ·{" "}
                  {step.lane === "aircert" ? "AirCert AI™" : "DAQIP™"}
                </span>
                <span className="text-[0.9375rem] text-ink">{step.title}</span>
              </div>
            </div>
          </li>
        ))}
        <li className="grid grid-cols-[1.5rem_1fr] gap-x-4 lg:grid-cols-1">
          <div className="relative flex justify-center lg:hidden">
            <span aria-hidden className="absolute top-0 h-3.5 w-px bg-line-strong" />
          </div>
          <div className="lg:flex lg:flex-col lg:items-center">
            <span aria-hidden className="hidden h-4 w-px bg-line-strong lg:block" />
            <div className="inline-flex flex-col border border-accent bg-surface-accent px-4 py-2.5 lg:items-center">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-accent">08 · Human</span>
              <span className="text-[0.9375rem] font-medium text-ink">Human / Authority Review</span>
            </div>
          </div>
        </li>
      </ol>
    </figure>
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
