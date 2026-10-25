import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { AeaipCard, ArchitectureDiagram, SpecializedPlatforms } from "@/components/system/platforms";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { AEAIP_STRATEGY_HREF } from "@/content/aeaip";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_DESCRIPTION, STATUS_ORDER, type Status } from "@/content/status";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Products — AEAIP™, DAQIP™ & AirCert AI™ | Gamyaa AeroSystems",
  description:
    "Gamyaa AeroSystems Engineering Assurance Platforms: AEAIP™ (flagship, Research & Architecture), with DAQIP™ for manufacturing assurance and AirCert AI™ for certification assurance inside it. Honest status for every platform.",
  href: aero("/products"),
});

const PLATFORM_STATUS: Array<{ name: string; status: Status; href: string; capabilities: string }> = [
  { name: "AEAIP™", status: PRODUCT_STATUS.aeaip, href: aero("/aeaip"), capabilities: `${AEAIP_STRATEGY_HREF}#roadmap` },
  { name: "DAQIP™", status: PRODUCT_STATUS.daqip, href: aero("/daqip"), capabilities: `${aero("/daqip")}#capabilities` },
  { name: "AirCert AI™", status: PRODUCT_STATUS.aircert, href: aero("/aircert-ai"), capabilities: `${aero("/aircert-ai")}#capabilities` },
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
        title="Engineering Assurance Platforms"
        lede="One assurance architecture. Two specialized platforms."
      />

      <Section labelledBy="aeaip-card-name" className="pt-0 md:pt-0" section="products_platforms">
        <Container>
          <AeaipCard location="products_page" />
          <div className="mt-6">
            <h2 className="sr-only" id="specialized-title">
              Specialized platforms
            </h2>
            <SpecializedPlatforms location="products_page" title={null} />
          </div>
        </Container>
      </Section>

      <Section labelledBy="architecture-title" section="products_architecture">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Architecture"
              id="architecture-title"
              title="AEAIP above, specialised depth below"
              lede="DAQIP and AirCert AI contribute manufacturing and certification evidence to the same Engineering Evidence Graph that AEAIP uses to show readiness."
            />
          </div>
          <div className="lg:col-span-7">
            <ArchitectureDiagram />
          </div>
        </Container>
      </Section>

      <Section id="status" labelledBy="status-title" section="products_status">
        <span id="roadmap" aria-hidden className="block" />
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={`Status transparency · ${STATUS_AS_OF}`}
              id="status-title"
              title="What exists, and what does not"
              lede="No platform is generally available yet. Roadmap items are never presented as released."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="border-b border-line">
              {PLATFORM_STATUS.map((p) => (
                <li key={p.name} className="grid gap-2 border-t border-line py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                  <div>
                    <ArrowLink href={p.href} className="min-h-0 text-xl">
                      {p.name}
                    </ArrowLink>
                    <ArrowLink href={p.capabilities} className="mt-1 flex min-h-9 w-fit text-sm text-muted">
                      Capability-level status
                    </ArrowLink>
                  </div>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
            <details className="group mt-8">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-[0.9375rem] text-ink-2 hover:text-ink">
                <span aria-hidden className="text-subtle transition-transform group-open:rotate-90">
                  ›
                </span>
                What each status label means
              </summary>
              <dl className="mt-3">
                {STATUS_ORDER.map((s) => (
                  <div key={s} className="grid gap-2 border-t border-line py-3 sm:grid-cols-[14rem_1fr] sm:items-center">
                    <dt>
                      <StatusBadge status={s} />
                    </dt>
                    <dd className="text-sm text-ink-2">{STATUS_DESCRIPTION[s]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Bring us a quality, certification or readiness question"
        actions={
          <>
            <ButtonLink
              href={internalContact("aeaip")}
              ga={{ event: "contact_sales_click", params: { source_location: "products_page" } }}
              label="Discuss AEAIP"
            >
              Discuss AEAIP™
            </ButtonLink>
            <ButtonLink
              href={internalContact("daqip")}
              variant="secondary"
              ga={{ event: "demo_interest", params: { product: "daqip", cta_location: "cta_band" } }}
              label="Request a DAQIP Demo"
            >
              Request a DAQIP Demo
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
