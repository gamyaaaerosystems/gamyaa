import { PlatformHierarchy } from "@/components/aeaip/diagrams";
import { IntegrationDiagram } from "@/components/diagrams/flow";
import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { AEAIP_CAPABILITIES } from "@/content/aeaip";
import { AIRCERT_GROUPS } from "@/content/aircert";
import { DAQIP_CAPABILITIES } from "@/content/daqip";
import {
  PRODUCT_STATUS,
  STATUS_AS_OF,
  STATUS_DESCRIPTION,
  STATUS_LABEL,
  STATUS_ORDER,
  type Status,
} from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Products — AEAIP™, DAQIP™ & AirCert AI™ | Gamyaa AeroSystems",
  description:
    "Gamyaa AeroSystems Engineering Assurance Intelligence platforms: AEAIP™ (flagship, Research & Architecture), DAQIP™ for manufacturing assurance and AirCert AI™ for certification assurance, with honest status for every capability.",
  href: aero("/products"),
});

type RoadmapItem = { product: string; title: string; status: Status };

const aeaipItems = (statuses: Status[]): RoadmapItem[] =>
  AEAIP_CAPABILITIES.filter((c) => c.id !== "demo" && statuses.includes(c.status)).map((c) => ({
    product: "AEAIP™",
    title: c.title,
    status: c.status,
  }));

const ROADMAP: Array<{ title: string; items: RoadmapItem[] }> = [
  {
    title: "In development",
    items: DAQIP_CAPABILITIES.filter((c) => c.status === "in-development").map((c) => ({
      product: "DAQIP™",
      title: c.title,
      status: c.status,
    })),
  },
  {
    title: "Research & architecture",
    items: [
      ...aeaipItems(["research-architecture", "architecture", "research"]),
      { product: "DAQIP™ + AirCert AI™", title: "Engineering assurance integration", status: "research" },
    ],
  },
  {
    title: "Planned",
    items: [
      ...DAQIP_CAPABILITIES.filter((c) => c.status === "planned").map((c) => ({
        product: "DAQIP™",
        title: c.title,
        status: c.status,
      })),
      ...AIRCERT_GROUPS.map((g) => ({ product: "AirCert AI™", title: g.title, status: "planned" as const })),
    ],
  },
  { title: "Concept, roadmap & vision", items: aeaipItems(["concept", "roadmap", "vision"]) },
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
        title="Engineering Assurance Intelligence Platforms"
        lede="Three platforms, one architecture. AEAIP™ is the flagship for system-level verification and readiness; DAQIP™ and AirCert AI™ are specialized assurance platforms within it, for manufacturing and certification."
      />

      <Section labelledBy="platforms-title" bordered={false} className="pt-0 md:pt-0">
        <Container>
          <h2 id="platforms-title" className="sr-only">
            Platforms
          </h2>
          <PlatformHierarchy location="products_page" />
        </Container>
      </Section>

      <Section labelledBy="status-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Status transparency"
              id="status-title"
              title="What is available, and what is not"
              lede={`Every capability on this site carries one of these labels. As of ${STATUS_AS_OF}: AEAIP is at ${STATUS_LABEL[PRODUCT_STATUS.aeaip]}, DAQIP is ${STATUS_LABEL[PRODUCT_STATUS.daqip].toLowerCase()} and AirCert AI is ${STATUS_LABEL[PRODUCT_STATUS.aircert].toLowerCase()}.`}
            />
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {STATUS_ORDER.map((s) => (
              <li key={s} className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:items-center">
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
            title="Current, in-development, research and planned capabilities"
            lede={`As of ${STATUS_AS_OF}, no capability is generally available yet. The interactive demonstrations on this site use illustrative data.`}
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {ROADMAP.map((col) => (
              <div key={col.title} className="bg-surface p-6 sm:p-8">
                <h3 className="eyebrow">{col.title}</h3>
                <ul className="mt-6 space-y-3">
                  {col.items.map((i) => (
                    <li key={`${i.product}-${i.title}`} className="border-b border-line pb-3 last:border-b-0">
                      <p className="text-[0.9375rem] text-ink">{i.title}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                        {i.product}
                        <StatusBadge status={i.status} />
                      </p>
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
              eyebrow="DAQIP™ + AirCert AI™ within AEAIP™"
              id="thread-title"
              title="Design → Certification → Manufacturing → Inspection → Evidence → Approval"
              lede="Within the AEAIP architecture, a certification requirement can be followed to the manufactured characteristic, the measurement that verified it and the human review that accepted it. Integration is in research."
            />
          </div>
          <div className="lg:col-span-7">
            <IntegrationDiagram />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Talk to us about your quality, certification or readiness workflow"
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
