import type { Metadata } from "next";
import { FlowChain } from "@/components/diagrams/flow";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
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

const PRODUCT_LINK: Record<Solution["product"], Array<{ label: string; href: string }>> = {
  daqip: [{ label: "Explore DAQIP™", href: aero("/daqip") }],
  aircert: [{ label: "Explore AirCert AI™", href: aero("/aircert-ai") }],
  both: [
    { label: "Explore DAQIP™", href: aero("/daqip") },
    { label: "Explore AirCert AI™", href: aero("/aircert-ai") },
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

/** Concise solution page used for every solution except First Article Inspection. */
export function SolutionTemplate({ slug }: { slug: string }) {
  const s = solutionBySlug(slug)!;
  const href = aero(`/solutions/${s.slug}`);
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

      <Section labelledBy="flow-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="flow-title" className="heading text-2xl text-ink sm:text-3xl">
              Workflow
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FlowChain label={`${s.label} workflow`} steps={s.flow} />
          </div>
        </Container>
      </Section>

      <Section labelledBy="covers-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="covers-title" className="heading text-2xl text-ink sm:text-3xl">
              What it covers
            </h2>
          </div>
          <div className="lg:col-span-8">
            <BulletList items={s.covers} className="text-base" />
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">For</dt>
                <dd className="mt-2 text-[0.9375rem] text-ink-2">{s.forWho}</dd>
              </div>
              <div>
                <dt className="eyebrow">Delivered through</dt>
                <dd className="mt-1 flex flex-col">
                  {PRODUCT_LINK[s.product].map((p) => (
                    <ArrowLink key={p.href} href={p.href}>
                      {p.label}
                    </ArrowLink>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <RelatedSolutions current={s.slug} />

      <CtaBand
        title={`Discuss ${s.label.toLowerCase()} for your team`}
        primary={{
          label: "Talk to Gamyaa",
          href: internalContact(s.product === "aircert" ? "aircert" : "daqip"),
          ga: { event: s.product === "aircert" ? "aircert_contact_click" : "contact_sales_click" },
        }}
      />
    </>
  );
}
