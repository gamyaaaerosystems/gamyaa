import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { EvidenceLine } from "@/components/system/evidence-line";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  ArrowLink,
  BulletList,
  ButtonLink,
  Container,
  JsonLd,
  Notice,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui/primitives";
import { SOLUTION_GROUPS, SOLUTIONS, solutionBySlug, type Solution, type SolutionExample } from "@/content/solutions";
import { STATUS_DESCRIPTION } from "@/content/status";
import { pageMetadata, techArticleLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export function solutionMetadata(slug: string): Metadata {
  const s = solutionBySlug(slug)!;
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, href: aero(`/solutions/${s.slug}`) });
}

const groupOf = (s: Solution) => SOLUTION_GROUPS.find((g) => g.key === s.group)!;

export function SolutionBreadcrumbs({ s }: { s: Solution }) {
  return (
    <Breadcrumbs
      items={[
        { name: "Gamyaa AeroSystems", href: aero("/") },
        { name: "Solutions", href: aero("/solutions") },
        { name: s.label, href: aero(`/solutions/${s.slug}`) },
      ]}
    />
  );
}

/** Same-group solutions first, topped up from other groups to at least three links. */
export function RelatedSolutions({ current }: { current: string }) {
  const s = solutionBySlug(current)!;
  const same = SOLUTIONS.filter((x) => x.slug !== current && x.group === s.group);
  const others = SOLUTIONS.filter((x) => x.slug !== current && x.group !== s.group);
  const list = [...same, ...others].slice(0, Math.max(3, same.length));
  return (
    <Section labelledBy="related-title" className="py-12 md:py-16">
      <Container>
        <h2 id="related-title" className="kicker">
          Related solutions
        </h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((o) => (
            <li key={o.slug} className="border-b border-line">
              <ArrowLink href={aero(`/solutions/${o.slug}`)} className="w-full justify-between py-2">
                {o.label}
              </ArrowLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Illustrative example: a small record with fictitious values. */
export function SolutionExampleFigure({ example }: { example: SolutionExample }) {
  return (
    <figure className="rounded-sm border border-line bg-surface p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-lg font-medium text-ink">{example.title}</span>
        <span className="text-xs text-muted">Illustrative example · fictitious data</span>
      </figcaption>
      <dl className="mt-6 border-b border-line">
        {example.rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 border-t border-line py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="text-[0.9375rem] text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed text-ink-2">{example.outcome}</p>
    </figure>
  );
}

/**
 * One template for every solution page:
 * Problem → Why it matters → Workflow → What GAMYAA intends to provide → Current status
 * → Relevant platform → Illustrative example → CTA. Pages may add a section after
 * "provide" (e.g. AS9102 forms), replace the example (e.g. an interactive prototype)
 * and append content before the CTA (e.g. an FAQ).
 */
export function SolutionTemplate({
  slug,
  extra,
  example,
  after,
}: {
  slug: string;
  extra?: ReactNode;
  example?: ReactNode;
  after?: ReactNode;
}) {
  const s = solutionBySlug(slug)!;
  const href = aero(`/solutions/${s.slug}`);
  const group = groupOf(s);
  const exampleNode = example ?? (s.example ? <SolutionExampleFigure example={s.example} /> : null);

  return (
    <>
      <JsonLd data={techArticleLd({ headline: s.title, description: s.metaDescription, href })} />
      <PageHero
        breadcrumbs={<SolutionBreadcrumbs s={s} />}
        eyebrow={
          <>
            <span>Solution · {group.title}</span>
            <StatusBadge status={s.status} />
          </>
        }
        title={s.title}
        lede={s.intro}
      >
        {s.note ? <Notice className="mt-8 max-w-2xl">{s.note}</Notice> : null}
      </PageHero>

      {/* Problem and why it matters */}
      <Section labelledBy="problem-title" section="solution_problem" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Problem" id="problem-title" title="The problem" />
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">{s.problem}</p>
            <h3 className="kicker mb-3 mt-10">Why it matters</h3>
            <p className="lede">{s.why}</p>
            <p className="mt-8 text-sm text-muted">Who experiences it</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {s.who.map((w) => (
                <li key={w} className="rounded-full border border-line-strong px-3 py-1.5 text-sm text-ink-2">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Workflow */}
      <Section labelledBy="workflow-title" section="solution_workflow" className="bg-surface-accent">
        <Container>
          <SectionHeader eyebrow="Workflow" id="workflow-title" title={s.flowTitle} />
          <EvidenceLine steps={s.flow} label={`${s.label} workflow`} size="lg" className="mt-12" />
        </Container>
      </Section>

      {/* What GAMYAA intends to provide, status and platform */}
      <Section labelledBy="provide-title" section="solution_provide">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Intent" id="provide-title" title="What GAMYAA intends to provide" />
            <BulletList items={s.helps} className="mt-8 text-base" />
            <h3 className="kicker mb-4 mt-12">What becomes traceable</h3>
            <BulletList items={s.outcomes} className="text-base" />
          </div>
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-sm border border-line p-6">
              <p className="text-sm text-muted">Current status</p>
              <p className="mt-3">
                <StatusBadge status={s.status} />
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{STATUS_DESCRIPTION[s.status]}</p>
            </div>
            <div className="rounded-sm border border-line p-6">
              <p className="text-sm text-muted">Relevant platform</p>
              <ArrowLink
                href={group.platform.href}
                className="mt-3 text-xl"
                ga={s.product === "aeaip" ? { event: "aeaip_explore", params: { source_location: "solution_page" } } : undefined}
                label={`Explore ${group.platform.label.replace("™", "")}`}
              >
                {group.platform.label}
              </ArrowLink>
              <p className="mt-1 text-sm text-muted">{group.platform.name}</p>
            </div>
          </div>
        </Container>
      </Section>

      {extra}

      {exampleNode ? (
        <Section labelledBy="example-title" section="solution_example" className="pt-0 md:pt-0">
          {/* A page-supplied example (an interactive prototype) gets the full width. */}
          <Container className={example ? undefined : "grid gap-10 lg:grid-cols-12"}>
            <div className={example ? undefined : "lg:col-span-4"}>
              <SectionHeader
                eyebrow="Illustrative example"
                id="example-title"
                title="What it looks like"
                lede={example ? "Interactive prototype with fictitious data. Select a balloon to follow its evidence." : "Fictitious values, for illustration only."}
              />
            </div>
            <div className={example ? "mt-10" : "lg:col-span-8"}>{exampleNode}</div>
          </Container>
        </Section>
      ) : null}

      {after}

      <RelatedSolutions current={s.slug} />

      <SolutionCta s={s} />
    </>
  );
}

function SolutionCta({ s }: { s: Solution }) {
  if (s.product === "aeaip") {
    return (
      <CtaBand
        title="See how AEAIP™ approaches engineering assurance"
        body="AEAIP™ is at Research & Architecture status. The overview explains the model; the demo shows it on fictitious spacecraft data."
        actions={
          <>
            <ButtonLink href={aero("/aeaip")} ga={{ event: "aeaip_explore", params: { source_location: "solution_page" } }} label="Explore AEAIP">
              Explore AEAIP™
            </ButtonLink>
            <ButtonLink
              href={aero("/aeaip/demo")}
              variant="secondary"
              ga={{ event: "aeaip_demo_open", params: { source_location: "solution_page" } }}
              label="Open the interactive demo"
            >
              Open the interactive demo
            </ButtonLink>
          </>
        }
      />
    );
  }
  const aircert = s.product === "aircert";
  return (
    <CtaBand
      title={aircert ? "Shape AirCert AI™ around your certification work" : `Discuss ${s.label.toLowerCase()} for your team`}
      body={
        aircert
          ? "AirCert AI™ is a planned product. Tell us how your team prepares for certification today."
          : "DAQIP™ is in development. Talk to us about a demo or about the problem you are solving."
      }
      actions={<CommercialCtas location="solution_page" topic={s.topic} product={aircert ? "aircert" : "daqip"} />}
    />
  );
}
