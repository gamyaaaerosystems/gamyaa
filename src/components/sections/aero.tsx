import { AEAIP, AEAIP_CAPABILITIES, AEAIP_DEMO_HREF } from "@/content/aeaip";
import { PRODUCT_STATUS, type Status } from "@/content/status";
import { aero, EXTERNAL } from "@/lib/site";
import { ArrowLink, StatusBadge } from "@/components/ui/primitives";

/** Hero visual: one requirement followed along the AEAIP chain (fictitious). */
export function ReadinessRecordCard() {
  const rows: Array<[string, string]> = [
    ["Requirement", "SAT-EPS-014 · battery charge termination"],
    ["Configuration", "BMS FW 2.4.0 · PCB Rev C"],
    ["Evidence", "TR-EPS-114 · produced on FW 2.3.0, Rev B"],
    ["Verification", "Reopened · reverification required"],
  ];
  return (
    <figure
      className="ticks border border-line bg-surface"
      aria-label="Illustrative readiness record for one requirement"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">Readiness record</span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">Illustrative</span>
      </div>
      <div className="px-5 pb-5 pt-4">
        <p className="font-mono text-xs text-subtle">Gate</p>
        <p className="mt-0.5 text-3xl font-medium tracking-tight text-ink">TRR</p>
        <dl className="relative mt-5">
          <span aria-hidden className="absolute bottom-[1.05rem] left-[4px] top-[1.05rem] w-px bg-line-strong" />
          {rows.map(([k, v], i) => (
            <div key={k} className="relative grid grid-cols-[6.75rem_1fr] items-baseline gap-x-3 py-1.5 pl-6">
              <span
                aria-hidden
                className="anim-fade-up absolute left-0 top-[0.8rem] size-[9px] rounded-full border border-ink bg-surface"
                style={{ animationDelay: `${300 + i * 90}ms` }}
              />
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{k}</dt>
              <dd className="text-sm text-ink">{v}</dd>
            </div>
          ))}
          <div className="relative grid grid-cols-[6.75rem_1fr] items-baseline gap-x-3 py-1.5 pl-6">
            <span
              aria-hidden
              className="anim-fade-up absolute left-0 top-[0.8rem] size-[9px] rounded-full"
              style={{ background: "var(--st-prototype)", animationDelay: "700ms" }}
            />
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Readiness</dt>
            <dd className="text-sm font-medium text-ink">Condition: delta test before TVAC</dd>
          </div>
        </dl>
        <p className="mt-4 border border-[var(--st-prototype)] px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink">
          Evidence validity: At Risk
        </p>
      </div>
      <figcaption className="border-t border-line px-5 py-3 text-xs text-subtle">{AEAIP.governance}</figcaption>
    </figure>
  );
}

/** "What exists today": status honesty across all three platforms. */
export function WhatExistsToday() {
  const pick = (id: string) => AEAIP_CAPABILITIES.find((c) => c.id === id)!;
  const rows: Array<{ title: string; note: string; status: Status; href: string }> = [
    {
      title: "Interactive Assurance Demo (AEAIP™)",
      note: "Fictitious satellite readiness scenario you can explore now.",
      status: "concept-demo",
      href: AEAIP_DEMO_HREF,
    },
    {
      title: "Interactive FAI prototype (DAQIP™)",
      note: "Ballooned drawing and characteristic traceability with illustrative data.",
      status: "concept-demo",
      href: `${aero("/daqip")}#fai-prototype`,
    },
    { title: "DAQIP™ platform", note: "Drawing, FAI, inspection and manufacturing-quality workflows.", status: PRODUCT_STATUS.daqip, href: aero("/daqip") },
    { title: "AEAIP™ platform", note: pick("platform").summary, status: PRODUCT_STATUS.aeaip, href: aero("/aeaip") },
    { title: "Engineering Evidence Graph™", note: pick("evidence-graph").summary, status: "architecture", href: aero("/aeaip/engineering-evidence-graph") },
    { title: "Assurance Intelligence Engine™", note: pick("engine").summary, status: "research", href: `${aero("/aeaip/engineering-evidence-graph")}#engine` },
    { title: "AirCert AI™ platform", note: "Certification planning and certification evidence.", status: PRODUCT_STATUS.aircert, href: aero("/aircert-ai") },
    { title: "Engineering-tool integrations", note: "Requirements, PLM, MBSE, test and quality systems.", status: "roadmap", href: `${aero("/aeaip/strategy")}#positioning` },
    { title: "Predictive assurance", note: "Risk patterns and likely verification problems.", status: "vision", href: `${aero("/aeaip/strategy")}#roadmap` },
  ];
  return (
    <ul className="divide-y divide-line border-y border-line">
      {rows.map((r) => (
        <li key={r.title} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
          <div>
            <ArrowLink href={r.href} className="min-h-0 text-[1.0625rem]">
              {r.title}
            </ArrowLink>
            <p className="mt-0.5 text-sm text-muted">{r.note}</p>
          </div>
          <span>
            <StatusBadge status={r.status} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Compact links to content that moved off the landing page. */
export function GoDeeper() {
  const links: Array<[string, string]> = [
    ["Solutions by engineering workflow", aero("/solutions")],
    ["Product roadmap and status", `${aero("/products")}#roadmap`],
    ["Company evolution, 2024 to today", `${aero("/about")}#timeline-title`],
    ["Engineering research & product development", aero("/research")],
    ["Engineering & consulting services", aero("/services")],
    ["DAQIP research programme", EXTERNAL.daqipResearch],
  ];
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {links.map(([label, href]) => (
        <li key={href} className="border-b border-line">
          <ArrowLink href={href} className="w-full justify-between py-2" label={label}>
            {label}
          </ArrowLink>
        </li>
      ))}
    </ul>
  );
}
