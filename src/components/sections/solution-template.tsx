import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FlowChain, IntegrationDiagram } from "@/components/diagrams/flow";
import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  ArrowLink,
  BulletList,
  Container,
  JsonLd,
  Notice,
  Section,
  StatusBadge,
} from "@/components/ui/primitives";
import { SOLUTIONS, solutionBySlug, type Solution } from "@/content/solutions";
import { pageMetadata, techArticleLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export function solutionMetadata(slug: string): Metadata {
  const s = solutionBySlug(slug)!;
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, href: aero(`/solutions/${s.slug}`) });
}

const PRODUCT_LINK: Record<Solution["product"], Array<{ label: string; href: string; note: string }>> = {
  daqip: [{ label: "DAQIP™", href: aero("/daqip"), note: "Defence Aerospace Quality Intelligence Platform" }],
  aircert: [{ label: "AirCert AI™", href: aero("/aircert-ai"), note: "Airworthiness Certification Engineering Copilot" }],
  both: [
    { label: "AEAIP™", href: aero("/aeaip"), note: "Engineering Assurance Intelligence architecture" },
    { label: "AirCert AI™", href: aero("/aircert-ai"), note: "Design assurance / certification" },
    { label: "DAQIP™", href: aero("/daqip"), note: "Manufacturing assurance / quality" },
  ],
};

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

export function RelatedSolutions({ current }: { current: string }) {
  const others = SOLUTIONS.filter((x) => x.slug !== current);
  return (
    <Section labelledBy="related-title">
      <Container>
        <h2 id="related-title" className="eyebrow">
          Related solutions
        </h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
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

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-mono text-xs text-subtle">{n}</p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">{title}</h2>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}

/** Solution page: Problem → Who → What we help with → Flow → Outcome → Product → CTA. */
export function SolutionTemplate({ slug }: { slug: string }) {
  const s = solutionBySlug(slug)!;
  const href = aero(`/solutions/${s.slug}`);
  const aircertOnly = s.product === "aircert";
  return (
    <>
      <JsonLd data={techArticleLd({ headline: s.title, description: s.metaDescription, href })} />
      <PageHero
        breadcrumbs={<SolutionBreadcrumbs s={s} />}
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <span>Solution</span>
            <StatusBadge status={s.status} />
          </span>
        }
        title={s.title}
        lede={s.intro}
      >
        {s.note ? <Notice className="mt-8 max-w-3xl">{s.note}</Notice> : null}
      </PageHero>

      <section className="pb-6" data-ga-section="solution_detail">
        <Container>
          <Block n="01" title="Problem">
            <p className="lede">{s.problem}</p>
          </Block>
          <Block n="02" title="Who experiences it">
            <ul className="flex flex-wrap gap-2">
              {s.who.map((w) => (
                <li key={w} className="border border-line-strong bg-surface px-3 py-1.5 text-[0.9375rem] text-ink-2">
                  {w}
                </li>
              ))}
            </ul>
          </Block>
          <Block n="03" title="What Gamyaa helps with">
            <BulletList items={s.helps} className="text-base" />
          </Block>
          <Block n="04" title="Engineering flow">
            <FlowChain label={`${s.label} engineering flow`} steps={s.flow} />
            {s.product === "both" ? (
              <div className="mt-10">
                <IntegrationDiagram />
              </div>
            ) : null}
          </Block>
          <Block n="05" title="Evidence & outcome">
            <BulletList items={s.outcomes} className="text-base" />
          </Block>
          <Block n="06" title="Related product">
            <ul className={s.product === "both" ? "grid gap-4 sm:grid-cols-3" : "grid gap-4 sm:grid-cols-2"}>
              {PRODUCT_LINK[s.product].map((p) => (
                <li key={p.href} className="border border-line bg-surface p-5">
                  <ArrowLink href={p.href} className="text-lg">
                    {p.label}
                  </ArrowLink>
                  <p className="mt-1 text-sm text-muted">{p.note}</p>
                </li>
              ))}
            </ul>
          </Block>
        </Container>
      </section>

      <RelatedSolutions current={s.slug} />

      <CtaBand
        title={aircertOnly ? "Shape AirCert AI around your certification work" : `Discuss ${s.label.toLowerCase()} for your team`}
        body={
          aircertOnly
            ? "AirCert AI is a planned product. Tell us how your team prepares for certification today."
            : "DAQIP is in development. Talk to us about a demo or about the problem you are solving."
        }
        actions={
          <CommercialCtas location="solution_page" topic={s.topic} product={aircertOnly ? "aircert" : "daqip"} />
        }
      />
    </>
  );
}
