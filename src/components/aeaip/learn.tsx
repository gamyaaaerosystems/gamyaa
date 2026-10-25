import type { ReactNode } from "react";
import { EngineeringCallout } from "@/components/system/callout";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight } from "@/components/ui/icons";
import { ButtonLink, Container, JsonLd, Section, SmartLink, StatusBadge } from "@/components/ui/primitives";
import {
  AEAIP_DEMO_HREF,
  AEAIP_HREF,
  AEAIP_PUBLISHED,
  AEAIP_REVIEWED,
  LEARN_PAGES,
  learnPage,
  type LearnPage,
} from "@/content/aeaip";
import type { Reference } from "@/content/references";
import type { Status } from "@/content/status";
import { cn } from "@/lib/cn";
import type { SourceLocation } from "@/lib/analytics";
import { techArticleLd } from "@/lib/seo";
import { aero, DESIGNER } from "@/lib/site";

/* ------------------------------------------------------------------ Hero */

/**
 * KnowledgeHero: breadcrumb, topic, H1 and a 2–4 sentence direct answer (the
 * answer-first block search and answer engines quote), then an optional full-width
 * visual so the page explains visually before it explains in text.
 */
export function KnowledgeHero({
  page,
  title,
  topic,
  answer,
  status,
  visual,
  children,
}: {
  page: LearnPage;
  title: ReactNode;
  topic: string;
  answer: ReactNode;
  status?: Status;
  /** Interactive or static explanation shown directly under the answer. */
  visual?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "AEAIP™", href: AEAIP_HREF },
              { name: page.title, href: page.href },
            ]}
          />
        }
        eyebrow={
          <>
            <span>{topic}</span>
            {status ? <StatusBadge status={status} /> : null}
          </>
        }
        title={title}
      >
        <div className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">{answer}</div>
        {children}
      </PageHero>
      {visual ? (
        <section aria-label="Visual explanation" className="pb-16 md:pb-24" data-ga-section="knowledge_visual">
          <Container>{visual}</Container>
        </section>
      ) : null}
    </>
  );
}

/** @deprecated name kept for existing imports; use KnowledgeHero. */
export const LearnHero = KnowledgeHero;

/* ---------------------------------------------------------- Sections */

/** Two-column article section: numbered heading on the left, body on the right. */
export function ArticleSection({
  id,
  n,
  title,
  lede,
  children,
  className,
  wide = false,
}: {
  id: string;
  n?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Full-width body under the heading (for diagrams and tables). */
  wide?: boolean;
}) {
  const head = (
    <div className={wide ? "max-w-3xl" : "lg:col-span-4"}>
      {n ? <p className="font-mono text-xs text-subtle">{n}</p> : null}
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-medium tracking-tight text-ink sm:text-[1.875rem]">
        {title}
      </h2>
      {lede ? <div className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{lede}</div> : null}
    </div>
  );
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-ga-section={id.replace(/-/g, "_")}
      className={cn("scroll-mt-28 py-12 md:py-16", className)}
    >
      <Container>
        {wide ? (
          <>
            {head}
            <div className="mt-8">{children}</div>
          </>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            {head}
            <div className="prose-body max-w-[46rem] lg:col-span-8">{children}</div>
          </div>
        )}
      </Container>
    </section>
  );
}

/** "How AEAIP relates" callout, always with the capability's real status. */
export function AeaipRelation({ status, title = "How AEAIP™ relates", children }: { status: Status; title?: string; children: ReactNode }) {
  return (
    <EngineeringCallout title={title} status={status}>
      {children}
    </EngineeringCallout>
  );
}

/** Applicable review stages, each linking to its section on the review-gates page. */
export function ReviewStages({ codes, note }: { codes: string[]; note?: ReactNode }) {
  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {codes.map((c) => (
          <li key={c}>
            <SmartLink
              href={`${aero("/aeaip/review-gates")}#${c.toLowerCase()}`}
              className="inline-flex min-h-11 items-center rounded-sm border border-line-strong px-3.5 font-mono text-sm text-ink hover:border-ink"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "reviews", source_location: "learn_page" } }}
              label={`Review gate ${c}`}
            >
              {c}
            </SmartLink>
          </li>
        ))}
      </ul>
      {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------ Related, refs */

/** Knowledge links as a quiet two-column list (not a card grid). */
export function KnowledgeIndex({
  exclude,
  only,
  source,
  headingLevel = "h3",
}: {
  exclude?: string;
  only?: string[];
  source: SourceLocation;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const pages = only ? only.map(learnPage) : LEARN_PAGES.filter((p) => p.slug !== exclude);
  return (
    <ul className="grid gap-x-12 md:grid-cols-2">
      {pages.map((p) => (
        <li key={p.slug} className="border-t border-line">
          <SmartLink
            href={p.href}
            ga={{ event: "aeaip_reference_open", params: { reference_category: p.category, source_location: source } }}
            label={p.title}
            className="group flex items-start justify-between gap-6 py-5"
          >
            <span>
              <H className="text-[1.0625rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">{p.title}</H>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{p.summary}</span>
            </span>
            <ArrowRight className="mt-1 shrink-0 text-subtle transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export function RelatedTopics({ slugs, current }: { slugs: string[]; current: string }) {
  return (
    <Section id="related" labelledBy="related-title" section="related_topics" className="py-16 md:py-20">
      <Container>
        <h2 id="related-title" className="kicker">
          Related topics
        </h2>
        <div className="mt-6">
          <KnowledgeIndex only={slugs.filter((s) => s !== current)} source="learn_page" />
        </div>
      </Container>
    </Section>
  );
}

/** Visible authorship, review date and status (also reflected in TechArticle JSON-LD). */
export function Authorship({ status }: { status?: Status }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
      <span>Gamyaa AeroSystems — Engineering Assurance Research</span>
      <span aria-hidden>·</span>
      <span>
        Designed by{" "}
        <DesignerLink location="learn_page" className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink" />
      </span>
      <span aria-hidden>·</span>
      <span>
        Last reviewed <time dateTime={AEAIP_REVIEWED.iso}>{AEAIP_REVIEWED.display}</time>
      </span>
      {status ? <StatusBadge status={status} /> : null}
    </p>
  );
}

/** Design credit, as in the footer: "Designed by EV.ENGINEER™", linked to ev.engineer. */
export function DesignerLink({ className, location }: { className?: string; location: SourceLocation }) {
  return (
    <SmartLink
      href={DESIGNER.credentialHref}
      className={className}
      label="ev_engineer"
      ga={{ event: "designer_profile_click", params: { source_location: location } }}
    >
      {DESIGNER.credential}
    </SmartLink>
  );
}

/** ReferenceList: compact, numbered official sources with authorship underneath. */
export function ReferenceList({ items, status }: { items: Reference[]; status?: Status }) {
  return (
    <Section id="references" labelledBy="references-title" section="references" className="py-16 md:py-20">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 id="references-title" className="text-xl font-medium tracking-tight text-ink">
            References / Engineering Sources
          </h2>
          <p className="max-w-xl text-sm text-muted">
            Original GAMYAA explanations. Standards are referenced, not reproduced; referencing a framework does not
            imply compliance with it.
          </p>
        </div>
        <ol className="mt-6 grid gap-x-12 md:grid-cols-2">
          {items.map((r, i) => (
            <li key={r.id} className="grid grid-cols-[2rem_1fr] gap-x-2 border-t border-line py-3.5">
              <span className="pt-0.5 font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <SmartLink
                  href={r.url}
                  label={`reference_${r.id}`}
                  className="text-[0.9375rem] text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                >
                  {r.title}
                </SmartLink>
                <p className="mt-0.5 text-sm text-muted">
                  {r.publisher} — {r.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 border-t border-line pt-6">
          <Authorship status={status} />
        </div>
      </Container>
    </Section>
  );
}

/** @deprecated name kept for existing imports; use ReferenceList. */
export const References = ReferenceList;

/* --------------------------------------------------------------- CTA */

export function LearnCta({ title, body }: { title: string; body?: ReactNode }) {
  return (
    <CtaBand
      title={title}
      body={body}
      actions={
        <>
          <ButtonLink
            href={internalContact("assurance-problem")}
            ga={{ event: "contact_sales_click", params: { source_location: "learn_page" } }}
            label="Discuss an Engineering Assurance Problem"
          >
            Discuss an Engineering Assurance Problem
          </ButtonLink>
          <ButtonLink
            href={AEAIP_DEMO_HREF}
            variant="secondary"
            ga={{ event: "aeaip_demo_open", params: { source_location: "learn_page" } }}
            label="Explore Interactive Assurance Demo"
          >
            Explore Interactive Assurance Demo
          </ButtonLink>
        </>
      }
    />
  );
}

/** TechArticle JSON-LD for a knowledge page, matching its visible authorship block. */
export function LearnJsonLd({ page, headline, description, about }: { page: LearnPage; headline: string; description: string; about: string[] }) {
  return (
    <JsonLd
      data={techArticleLd({
        headline,
        description,
        href: page.href,
        datePublished: AEAIP_PUBLISHED.iso,
        dateModified: AEAIP_REVIEWED.iso,
        about,
        withDesigner: true,
        isPartOfHref: AEAIP_HREF,
      })}
    />
  );
}
