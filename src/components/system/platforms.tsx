import { InteractiveEvidenceLine } from "@/components/system/evidence-line-interactive";
import { EvidenceLine } from "@/components/system/evidence-line";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, SmartLink, StatusBadge } from "@/components/ui/primitives";
import {
  AEAIP,
  AEAIP_DEMO_HREF,
  AEAIP_HREF,
  ARCHITECTURE_NOTE,
  CORE_MODEL_DETAIL,
  EVIDENCE_LINES,
  SPECIALISED_PLATFORMS,
} from "@/content/aeaip";
import { PRODUCT_STATUS } from "@/content/status";
import type { SourceLocation } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export const AEAIP_STEPS = EVIDENCE_LINES.aeaip.map((s) => ({ ...s, detail: CORE_MODEL_DETAIL[s.label] }));

/** "Aerospace Engineering Assurance Intelligence Platform" in one colour and weight (inherits from its parent). */
export function AeaipFullName({ className }: { className?: string }) {
  return <span className={className}>{AEAIP.expanded}</span>;
}

export function PromiseLines({ className }: { className?: string }) {
  return (
    <ul aria-label="AEAIP promise" className={cn("space-y-2", className)}>
      {AEAIP.promiseLines.map((line) => (
        <li key={line} className="flex items-baseline gap-3">
          <span aria-hidden className="h-px w-4 shrink-0 -translate-y-[0.3em] bg-accent" />
          {line}
        </li>
      ))}
    </ul>
  );
}

/**
 * Flagship block: AEAIP is the dominant element. Text on the left, the interactive
 * Evidence Line on the right (stacked on phones). No card frame: scale and space
 * carry the hierarchy.
 */
export function FlagshipPlatform({
  location,
  headingLevel = "h2",
  headingId = "platform-aeaip-name",
}: {
  location: SourceLocation;
  headingLevel?: "h2" | "h3";
  headingId?: string;
}) {
  const H = headingLevel;
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-12" data-ga-section="platform_aeaip">
      <div className="lg:col-span-6">
        <p className="kicker">
          {AEAIP.platformNo} · Flagship
        </p>
        <H id={headingId} className="display mt-6 text-6xl text-ink sm:text-7xl lg:text-[5.5rem]">
          {AEAIP.name}
        </H>
        <p className="mt-4 text-xl font-medium leading-snug text-ink-2 sm:text-2xl">
          <AeaipFullName />
        </p>
        <StatusBadge status={PRODUCT_STATUS.aeaip} className="mt-6" />
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">{AEAIP.oneLiner}</p>
        <PromiseLines className="heading mt-8 text-2xl text-ink sm:text-[1.75rem]" />
        <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
          <SmartLink
            href={AEAIP_HREF}
            ga={{ event: "aeaip_explore", params: { source_location: location, platform: "aeaip" }, also: "platform_card_click" }}
            label="Explore AEAIP"
            className="btn btn-primary"
          >
            Explore AEAIP™
            <ArrowRight />
          </SmartLink>
          <ArrowLink
            href={AEAIP_DEMO_HREF}
            ga={{ event: "aeaip_demo_open", params: { source_location: location } }}
            label="Explore Interactive Assurance Demo"
            className="px-1"
          >
            Explore the TRR demo
          </ArrowLink>
        </div>
      </div>
      <div className="lg:col-span-6 lg:pt-16">
        <h3 className="text-xl font-medium tracking-tight text-ink">How AEAIP thinks</h3>
        <p className="mb-5 mt-1 text-sm text-muted">Select a stage.</p>
        <InteractiveEvidenceLine steps={AEAIP_STEPS} line="aeaip" label="AEAIP core model" orientation="vertical" />
        <ArrowLink
          href={`${AEAIP_HREF}#how-it-works`}
          ga={{ event: "aeaip_explore", params: { source_location: "core_model" } }}
          label="Understand the architecture"
          className="mt-6"
        >
          Understand the architecture
        </ArrowLink>
      </div>
    </div>
  );
}

/** Full-width AEAIP card (products page): identity, promise and the core Evidence Line. */
export function AeaipCard({ location }: { location: SourceLocation }) {
  return (
    <article
      aria-labelledby="aeaip-card-name"
      className="relative overflow-hidden rounded-sm border border-accent/60 bg-surface p-6 sm:p-10 lg:p-12"
      data-ga-section="platform_aeaip"
    >
      <div aria-hidden className="tech-grid absolute inset-0 opacity-60" />
      <div className="relative grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-accent">{AEAIP.platformNo} · Flagship</span>
            <StatusBadge status={PRODUCT_STATUS.aeaip} />
          </div>
          <h2 id="aeaip-card-name" className="display mt-6 text-5xl text-ink sm:text-6xl">
            {AEAIP.name}
          </h2>
          <p className="mt-3 text-lg font-medium text-ink-2 sm:text-xl">
            <AeaipFullName />
          </p>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">{AEAIP.oneLiner}</p>
        </div>
        <PromiseLines className="heading self-end text-xl text-ink sm:text-2xl lg:col-span-5" />
      </div>
      <EvidenceLine steps={EVIDENCE_LINES.aeaip} label="AEAIP core model" className="relative mt-10" />
      <SmartLink
        href={AEAIP_HREF}
        ga={{ event: "aeaip_explore", params: { source_location: location, platform: "aeaip" }, also: "platform_card_click" }}
        label="Explore AEAIP"
        className="btn btn-primary relative mt-10"
      >
        Explore AEAIP™
        <ArrowRight />
      </SmartLink>
    </article>
  );
}

/**
 * The two specialised platforms, visibly hanging from AEAIP: a trunk line from the
 * flagship splits into both cards (a vertical rail on phones).
 */
export function SpecializedPlatforms({
  location,
  title = "Specialized assurance inside AEAIP™",
  headingLevel = "h2",
}: {
  location: SourceLocation;
  title?: string | null;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const CH = headingLevel === "h2" ? "h3" : "h4";
  return (
    <div>
      {title ? (
        <H id="specialized-title" className="heading max-w-3xl text-[2rem] text-ink sm:text-[2.625rem]">
          {title}
        </H>
      ) : null}
      {title ? <p className="lede mt-4 max-w-2xl">{ARCHITECTURE_NOTE}</p> : null}
      {/* Connector (md+): AEAIP trunk splitting to both platforms. It uses the same two-column
          grid and gap as the cards, so each leg lands exactly on its card's centre. */}
      <div aria-hidden className="relative z-10 mt-12 hidden md:block">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent bg-surface-accent px-4 py-1.5 text-sm text-ink">
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-medium">AEAIP™</span>
            <span className="text-muted">Platform 01</span>
          </span>
        </div>
        <span className="mx-auto block h-6 w-px bg-accent" />
        <div className="grid grid-cols-2 gap-6">
          {[0, 1].map((col) => (
            <div key={col} className="relative h-8">
              <span className={cn("absolute top-0 h-px bg-accent", col === 0 ? "-right-3 left-1/2" : "-left-3 right-1/2")} />
              <span className="absolute bottom-0 left-1/2 top-0 w-px bg-accent" />
              <span className="absolute bottom-0 left-1/2 size-[9px] -translate-x-1/2 translate-y-1/2 rounded-full border border-accent bg-bg" />
            </div>
          ))}
        </div>
      </div>
      {/* Phones: the same AEAIP root node, with a rail that ends at the last platform. */}
      <div aria-hidden className="relative mt-10 flex items-center gap-3 pb-5 md:hidden">
        <span className="relative z-10 size-[11px] rounded-full border border-accent bg-accent" />
        <span className="text-sm">
          <span className="font-medium text-ink">AEAIP™</span> <span className="text-muted">Platform 01</span>
        </span>
        <span className="absolute bottom-0 left-[5px] top-1/2 w-px bg-accent" />
      </div>
      <ul className="relative grid gap-4 md:grid-cols-2 md:gap-6">
        {SPECIALISED_PLATFORMS.map((p, i) => {
          const line = p.key === "daqip" ? EVIDENCE_LINES.daqip : EVIDENCE_LINES.aircert;
          const last = i === SPECIALISED_PLATFORMS.length - 1;
          return (
            <li key={p.key} className="relative pl-6 md:pl-0" data-ga-section={`platform_${p.key}`}>
              <span aria-hidden className={cn("absolute left-[5px] top-0 w-px bg-accent md:hidden", last ? "h-10" : "-bottom-4")} />
              <span aria-hidden className="absolute left-[5px] top-10 h-px w-[19px] bg-accent md:hidden" />
              <article aria-labelledby={`platform-${p.key}-name`} className="card flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-muted">{p.no}</span>
                  <StatusBadge status={PRODUCT_STATUS[p.key as "daqip" | "aircert"]} />
                </div>
                <CH id={`platform-${p.key}-name`} className="mt-5 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {p.name}
                </CH>
                <p className="mt-2 text-[0.9375rem] text-ink-2">{p.expanded}</p>
                <p className="mt-4 text-[0.9375rem] font-medium text-accent">{p.category}</p>
                {/* Non-breaking space keeps each arrow with the step before it when the chain wraps. */}
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">{line.map((s) => s.label).join(" → ")}</p>
                <ArrowLink
                  href={p.href}
                  ga={{ event: "platform_card_click", params: { platform: p.key as "daqip" | "aircert", source_location: location } }}
                  label={p.cta}
                  className="mt-6 self-start"
                >
                  {p.cta}
                </ArrowLink>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const CROSS_CUTTING = ["Software", "Cybersecurity", "Simulation", "Test", "Telemetry"] as const;

/**
 * Architecture diagram: AEAIP umbrella → DAQIP and AirCert, with cross-cutting
 * evidence sources feeding the same graph. Plain HTML so every label is text.
 */
export function ArchitectureDiagram({ compact = false, caption = true }: { compact?: boolean; caption?: boolean }) {
  return (
    <figure aria-label="AEAIP architecture" className="rounded-sm border border-line p-5 sm:p-8">
      <div className="rounded-sm border border-accent bg-surface-accent px-5 py-7 text-center sm:py-9">
        <p className="text-sm text-accent">Platform 01 · Engineering Assurance Intelligence</p>
        <p className="mt-3 text-2xl font-medium tracking-tight text-ink sm:text-3xl">AEAIP™</p>
        {!compact ? (
          // Non-breaking spaces keep each arrow with the step before it when the chain wraps.
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            {["Requirement", "Configuration", "Evidence", "Verification", "Readiness"].join(" → ")}
          </p>
        ) : null}
      </div>
      {/* Legs share the boxes' grid and gap, so each lands on its box's centre. */}
      <div aria-hidden className="relative grid grid-cols-2 gap-3 sm:gap-5">
        {[0, 1].map((col) => (
          <div key={col} className="relative h-10">
            <span className="absolute bottom-0 left-1/2 top-0 w-px bg-line-strong" />
            <span className="absolute bottom-0 left-1/2 size-[7px] -translate-x-1/2 translate-y-1/2 rounded-full border border-line-strong bg-bg" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {SPECIALISED_PLATFORMS.map((p) => (
          <div key={p.key} className="rounded-sm border border-line-strong bg-surface px-4 py-6 text-center sm:py-7">
            <p className="text-lg font-medium text-ink">{p.name}</p>
            <p className="mt-2 text-sm text-muted">{p.category.replace(" Intelligence", "")}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-dashed border-line-strong pt-6">
        <p className="text-sm text-muted">Cross-cutting evidence into the same graph</p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {CROSS_CUTTING.map((c) => (
            <li key={c} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-2">
              {c}
            </li>
          ))}
        </ul>
      </div>
      {caption ? (
        <figcaption className="sr-only">
          AEAIP is the umbrella. DAQIP provides manufacturing assurance and AirCert AI provides certification assurance
          within it. Software, cybersecurity, simulation, test and telemetry evidence feed the same Engineering Evidence
          Graph.
        </figcaption>
      ) : null}
    </figure>
  );
}

