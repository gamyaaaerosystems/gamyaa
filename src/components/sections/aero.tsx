import { AEAIP_DEMO_HREF } from "@/content/aeaip";
import { PRODUCT_STATUS, type Status } from "@/content/status";
import { aero } from "@/lib/site";
import { SmartLink, StatusBadge } from "@/components/ui/primitives";

/** Compact maturity chips: what exists today, at a glance. */
export function MaturityChips() {
  const items: Array<{ name: string; status: Status; href: string }> = [
    { name: "AEAIP™", status: PRODUCT_STATUS.aeaip, href: aero("/aeaip") },
    { name: "Engineering Evidence Graph™", status: "architecture", href: aero("/aeaip/engineering-evidence-graph") },
    { name: "Assurance Intelligence Engine™", status: "research", href: `${aero("/aeaip/engineering-evidence-graph")}#engine` },
    { name: "Interactive Demo", status: "concept-demo", href: AEAIP_DEMO_HREF },
    { name: "DAQIP™", status: PRODUCT_STATUS.daqip, href: aero("/daqip") },
    { name: "AirCert AI™", status: PRODUCT_STATUS.aircert, href: aero("/aircert-ai") },
  ];
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((i) => (
        <li key={i.name}>
          <SmartLink
            href={i.href}
            label={`status_${i.name}`}
            className="inline-flex min-h-12 items-center gap-3 rounded-full border border-line-strong py-1.5 pl-4 pr-2 transition-colors hover:border-ink"
          >
            <span className="text-[0.9375rem] text-ink">{i.name}</span>
            <StatusBadge status={i.status} />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
