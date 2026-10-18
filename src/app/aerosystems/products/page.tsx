import { IntegrationDiagram } from "@/components/diagrams/flow";
import { ProductCards } from "@/components/sections/aero";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
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
        primary={{ label: "Talk to Gamyaa", href: internalContact(), ga: { event: "contact_sales_click" } }}
      />
    </>
  );
}
