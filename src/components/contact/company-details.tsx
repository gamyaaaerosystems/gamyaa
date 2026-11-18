import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AERO_COMPANY } from "@/lib/site";

const ROWS: ReadonlyArray<{ label: string; value: ReactNode }> = [
  {
    label: "Incorporated",
    value: <time dateTime={AERO_COMPANY.incorporatedOn}>{AERO_COMPANY.incorporatedOnDisplay}</time>,
  },
  {
    label: "CIN",
    value: <span className="font-mono text-[0.875rem] tracking-[0.04em]">{AERO_COMPANY.cin}</span>,
  },
];

/**
 * Incorporation date and CIN of GAMYAA Aero Systems Private Limited, shown on the
 * About page. `#company-details` is a stable anchor for links from elsewhere.
 */
export function CompanyDetails({ className }: { className?: string }) {
  return (
    <dl
      id="company-details"
      className={cn("scroll-mt-28 divide-y divide-line border-y border-line", className)}
      data-ga-section="company_details"
    >
      {ROWS.map(({ label, value }) => (
        <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
          <dt className="text-sm leading-6 text-muted">{label}</dt>
          <dd className="text-[0.9375rem] leading-6 text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
