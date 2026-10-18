import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, Container, JsonLd, Section } from "@/components/ui/primitives";
import { SERVICES } from "@/content/services";
import { pageMetadata, serviceLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering & Consulting Services | Gamyaa AeroSystems",
  description:
    "Aerospace manufacturing quality consulting, FAI / AS9102 digitalisation, inspection workflow automation, certification documentation support, requirements traceability and aerospace engineering cybersecurity.",
  href: aero("/services"),
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceLd(SERVICES.map((s) => ({ name: s.title, description: s.body })), aero("/services"))} />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Services", href: aero("/services") },
            ]}
          />
        }
        eyebrow="Services"
        title="Engineering & Consulting Services"
        lede="Focused engineering engagements that complement our platforms. DAQIP™ and AirCert AI™ remain the core of what we build; services help teams adopt traceable quality and certification practices along the way."
      />

      <section aria-label="Service offerings" className="pb-16 md:pb-24" data-ga-section="services">
        <Container>
          <ol className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-xl font-medium tracking-tight text-ink">{s.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">
            Engagements are scoped individually. Certification documentation support prepares material for review
            by your engineers and the certification authority; it does not constitute approval.
          </p>
        </Container>
      </section>

      <Section labelledBy="platform-link-title">
        <Container className="grid gap-6 md:grid-cols-2">
          <h2 id="platform-link-title" className="sr-only">
            Related platforms
          </h2>
          <ArrowLink href={aero("/daqip")}>DAQIP™ — Defence Aerospace Quality Intelligence Platform</ArrowLink>
          <ArrowLink href={aero("/aircert-ai")}>AirCert AI™ — Airworthiness Certification Engineering Copilot</ArrowLink>
        </Container>
      </Section>

      <CtaBand
        title="Scope an engagement"
        body="Start with the quality or certification problem in front of you."
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
