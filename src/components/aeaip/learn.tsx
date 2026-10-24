import type { ReactNode } from "react";
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
 * Knowledge-page hero: breadcrumb, topic label, H1 and a 2–4 sentence direct answer
 * (the answer-first block that search and answer engines quote).
 */
export function LearnHero({
  page,
  title,
  topic,
  answer,
  status,
  children,
}: {
  page: LearnPage;
  title: ReactNode;
  topic: string;
  answer: ReactNode;
  status?: Status;
  children?: ReactNode;
}) {
  return (
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
        <span className="flex flex-wrap items-center gap-3">
          <span>AEAIP knowledge · {topic}</span>
          {status ? <StatusBadge status={status} /> : null}
        </span>
      }
      title={title}
    >
      <div className="mt-8 max-w-3xl border-l-2 border-accent pl-5">
        <p className="eyebrow">In short</p>
        <div className="mt-2 text-lg leading-relaxed text-ink sm:text-xl">{answer}</div>
      </div>
      {children}
    </PageHero>
  );
}

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
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-medium tracking-tight text-ink sm:text-[1.75rem]">
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
      className={cn("scroll-mt-28 border-t border-line py-12 md:py-16", className)}
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
            <div className="prose-body lg:col-span-8">{children}</div>
          </div>
        )}
      </Container>
    </section>
  );
}

/** "How AEAIP relates" block, always with the capability's real status. */
export function AeaipRelation({ status, title = "How AEAIP™ relates", children }: { status: Status; title?: string; children: ReactNode }) {
  return (
    <aside className="ticks border border-line bg-surface-accent p-5 sm:p-6" aria-label={title}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow">{title}</p>
        <StatusBadge status={status} />
      </div>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">{children}</div>
    </aside>
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
              className="inline-flex min-h-10 items-center border border-line-strong bg-surface px-3 font-mono text-xs uppercase tracking-[0.08em] text-ink hover:border-ink"
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
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((p) => (
        <li key={p.slug} className="bg-surface">
          <SmartLink
            href={p.href}
            ga={{ event: "aeaip_reference_open", params: { reference_category: p.category, source_location: source } }}
            label={p.title}
            className="group flex h-full flex-col p-6 transition-colors hover:bg-surface-2"
          >
            <H className="text-[1.0625rem] font-medium leading-snug text-ink">{p.title}</H>
            <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</span>
            <ArrowRight className="mt-5 text-subtle transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export function RelatedTopics({ slugs, current }: { slugs: string[]; current: string }) {
  return (
    <Section id="related" labelledBy="related-title" section="related_topics">
      <Container>
        <h2 id="related-title" className="heading text-2xl text-ink sm:text-3xl">
          Related topics
        </h2>
        <div className="mt-8">
          <KnowledgeIndex only={slugs.filter((s) => s !== current)} source="learn_page" />
        </div>
      </Container>
    </Section>
  );
}

/** Visible authorship, review date and status (also reflected in TechArticle JSON-LD). */
export function Authorship({ status }: { status?: Status }) {
  return (
    <dl className="grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-2">
      <div>
        <dt className="eyebrow">Published by</dt>
        <dd className="mt-2 text-ink-2">Gamyaa AeroSystems — Engineering Assurance Research</dd>
      </div>
      <div>
        <dt className="eyebrow">Designed by</dt>
        <dd className="mt-2">
          <DesignerLink location="learn_page" className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink" />
        </dd>
      </div>
      <div>
        <dt className="eyebrow">Last reviewed</dt>
        <dd className="mt-2 text-ink-2">
          <time dateTime={AEAIP_REVIEWED.iso}>{AEAIP_REVIEWED.display}</time>
        </dd>
      </div>
      <div>
        <dt className="eyebrow">Status</dt>
        <dd className="mt-2">{status ? <StatusBadge status={status} /> : <span className="text-ink-2">Educational reference</span>}</dd>
      </div>
    </dl>
  );
}

export function DesignerLink({ className, location }: { className?: string; location: SourceLocation }) {
  return (
    <SmartLink
      href={DESIGNER.href}
      className={className}
      label="designer_profile"
      ga={{ event: "designer_profile_click", params: { source_location: location } }}
      ariaLabel={`Designed by ${DESIGNER.name}, ${DESIGNER.credential} — profile (opens in a new tab)`}
    >
      {DESIGNER.name}, {DESIGNER.credential}
    </SmartLink>
  );
}

export function References({ items, status }: { items: Reference[]; status?: Status }) {
  return (
    <Section id="references" labelledBy="references-title" section="references">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="references-title" className="heading text-2xl text-ink sm:text-3xl">
            References / Engineering Sources
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Explanations on this page are original GAMYAA paraphrase. Standards are referenced, not reproduced; paid
            standards link to their publisher. Referencing a framework does not imply compliance with it.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="divide-y divide-line border-y border-line">
            {items.map((r, i) => (
              <li key={r.id} className="grid grid-cols-[2rem_1fr] gap-x-3 py-4">
                <span className="font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <SmartLink
                    href={r.url}
                    label={`reference_${r.id}`}
                    className="text-[0.9375rem] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                  >
                    {r.title}
                  </SmartLink>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{r.publisher}</p>
                  <p className="mt-1 text-sm text-ink-2">{r.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Authorship status={status} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

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
