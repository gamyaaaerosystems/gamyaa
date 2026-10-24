import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gaAttrs, type AnalyticsEventName, type AnalyticsParams } from "@/lib/analytics";
import { STATUS_DESCRIPTION, STATUS_LABEL, type Status } from "@/content/status";
import { ArrowRight, ArrowUpRight } from "./icons";

/* ----------------------------------------------------------- Layout */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

export function Section({
  id,
  labelledBy,
  className,
  children,
  bordered = true,
  section,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
  bordered?: boolean;
  /** Analytics source_section for links inside this section. */
  section?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-ga-section={section}
      className={cn("py-16 md:py-24", bordered && "border-t border-line", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  id,
  lede,
  as: Tag = "h2",
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  id?: string;
  lede?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag
        id={id}
        className={cn(
          "heading text-ink",
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl display" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Tag>
      {lede ? <div className="lede mt-5">{lede}</div> : null}
    </div>
  );
}

/* ----------------------------------------------------------- Status */

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const color = {
    available: "var(--st-available)",
    prototype: "var(--st-prototype)",
    "concept-demo": "var(--st-prototype)",
    "in-development": "var(--st-development)",
    "research-architecture": "var(--st-research)",
    research: "var(--st-research)",
    architecture: "var(--st-research)",
    concept: "var(--st-planned)",
    planned: "var(--st-planned)",
    roadmap: "var(--st-planned)",
    vision: "var(--st-planned)",
  }[status];
  // Not-yet-started items get a hollow dot so status never relies on hue alone.
  const hollow = status === "planned" || status === "roadmap" || status === "vision" || status === "concept";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-2",
        className,
      )}
      title={STATUS_DESCRIPTION[status]}
    >
      <span
        aria-hidden
        className="inline-block size-1.5 rounded-full"
        style={hollow ? { boxShadow: `inset 0 0 0 1px ${color}` } : { background: color }}
      />
      <span className="sr-only">Status: </span>
      {STATUS_LABEL[status]}
    </span>
  );
}

/* ------------------------------------------------------------ Links */

export type GA = { event: AnalyticsEventName; params?: AnalyticsParams; also?: AnalyticsEventName };

function isExternal(href: string) {
  return /^https?:\/\//.test(href) && !href.startsWith("https://gamyaa.in");
}

/**
 * Link that renders next/link for internal routes and a new-tab anchor for
 * external URLs. Analytics are attached as data attributes (no client JS).
 */
export function SmartLink({
  href,
  className,
  children,
  ga,
  label,
  ariaLabel,
  newTab,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ga?: GA;
  /** Stable analytics label (never personal data). */
  label?: string;
  ariaLabel?: string;
  newTab?: boolean;
}) {
  const data = {
    ...(ga ? gaAttrs(ga.event, ga.params, ga.also) : {}),
    ...(label ? { "data-ga-label": label } : {}),
  };
  const external = isExternal(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  if (external) {
    const openNew = newTab ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(openNew ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...data}
      >
        {children}
        {openNew ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-label={ariaLabel} {...data}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  ga,
  label,
  arrow,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ga?: GA;
  label?: string;
  /** Override the arrow; defaults to ↗ for external URLs, → otherwise. */
  arrow?: "right" | "external";
}) {
  const external = /^https?:\/\//.test(href) && !href.startsWith("https://gamyaa.in");
  return (
    <SmartLink href={href} className={cn("link-arrow", className)} ga={ga} label={label}>
      <span>{children}</span>
      {(arrow ?? (external ? "external" : "right")) === "external" ? (
        <ArrowUpRight className="arrow shrink-0" />
      ) : (
        <ArrowRight className="arrow shrink-0" />
      )}
    </SmartLink>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ga,
  label,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  ga?: GA;
  label?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", className)}
      ga={ga}
      label={label}
    >
      {children}
    </SmartLink>
  );
}

/* ---------------------------------------------------------- JSON-LD */

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* ----------------------------------------------------- Small pieces */

export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "border-l-2 border-accent bg-surface-accent px-4 py-3 text-sm leading-relaxed text-ink-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function KeywordLine({ items, className }: { items: string[]; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.1em] text-subtle",
        className,
      )}
    >
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-2">
          {item}
          {i < items.length - 1 ? (
            <>
              <span className="sr-only">,</span>
              <span aria-hidden className="text-steel">
                ·
              </span>
            </>
          ) : null}
        </span>
      ))}
    </p>
  );
}

export function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2 text-[0.9375rem] text-ink-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-steel" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
