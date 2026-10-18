import { IntegrationDiagram } from "@/components/diagrams/flow";
import { ProductCards } from "@/components/sections/aero";
import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { AIRCERT_GROUPS } from "@/content/aircert";
import { DAQIP_CAPABILITIES } from "@/content/daqip";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_DESCRIPTION, STATUS_LABEL, type Status } from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Products — DAQIP™ & AirCert AI™ | Gamyaa AeroSystems",
  description:
    "Gamyaa AeroSystems engineering intelligence platforms: DAQIP™ for aerospace and defence quality, FAI and inspection, and AirCert AI™ for airworthiness certification engineering.",
  href: aero("/products"),
});

const STATUSES: Status[] = ["available", "prototype", "in-development", "research", "planned"];

type RoadmapItem = { product: string; title: string };

const ROADMAP: Array<{ status: Status; items: RoadmapItem[] }> = [
  {
    status: "in-development",
    items: DAQIP_CAPABILITIES.filter((c) => c.status === "in-development").map((c) => ({ product: "DAQIP™", title: c.title })),
  },
  {
    status: "research",
    items: [{ product: "DAQIP™ + AirCert AI™", title: "Engineering assurance integration" }],
  },
  {
    status: "planned",
    items: [
      ...DAQIP_CAPABILITIES.filter((c) => c.status === "planned").map((c) => ({ product: "DAQIP™", title: c.title })),
      ...AIRCERT_GROUPS.map((g) => ({ product: "AirCert AI™", title: g.title })),
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Products", href: aero("/products") },
            ]}
          />
        }
        eyebrow="Products"
        title="Engineering Intelligence Platforms"
        lede="Two platforms, one digital thread: DAQIP™ for manufacturing quality and inspection evidence, AirCert AI™ for airworthiness certification engineering."
      />

      <Section labelledBy="platforms-title" bordered={false} className="pt-0 md:pt-0">
        <Container>
          <h2 id="platforms-title" className="sr-only">
            Platforms
          </h2>
          <ProductCards />
        </Container>
      </Section>

      <Section labelledBy="status-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Status transparency"
              id="status-title"
              title="What is available, and what is not"
              lede={`Every capability on this site carries one of these labels. As of ${STATUS_AS_OF}: DAQIP is ${STATUS_LABEL[PRODUCT_STATUS.daqip].toLowerCase()} and AirCert AI is ${STATUS_LABEL[PRODUCT_STATUS.aircert].toLowerCase()}.`}
            />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {STATUSES.map((s) => (
              <li key={s} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:items-center">
                <span>
                  <StatusBadge status={s} />
                </span>
                <span className="text-[0.9375rem] text-ink-2">{STATUS_DESCRIPTION[s]}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="roadmap" labelledBy="roadmap-title" section="roadmap">
        <Container>
          <SectionHeader
            eyebrow="Product roadmap"
            id="roadmap-title"
            title="Current, in-development and planned capabilities"
            lede={`As of ${STATUS_AS_OF}, no capability is generally available yet. The interactive demonstrations on this site use illustrative data.`}
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-3">
            {ROADMAP.map((col) => (
              <div key={col.status} className="bg-surface p-6 sm:p-8">
                <StatusBadge status={col.status} />
                <ul className="mt-6 space-y-3">
                  {col.items.map((i) => (
                    <li key={`${i.product}-${i.title}`} className="border-b border-line pb-3 last:border-b-0">
                      <p className="text-[0.9375rem] text-ink">{i.title}</p>
                      <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{i.product}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            The roadmap shows intent, not a commitment. Status labels are updated when the underlying reality changes.
          </p>
        </Container>
      </Section>

      <Section labelledBy="thread-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Integration"
              id="thread-title"
              title="Design → Certification → Manufacturing → Inspection → Evidence → Approval"
            />
          </div>
          <div className="lg:col-span-7">
            <IntegrationDiagram />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Talk to us about your quality or certification workflow"
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
