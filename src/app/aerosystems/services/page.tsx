import { CommercialCtas, CtaBand, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, BulletList, Container, JsonLd } from "@/components/ui/primitives";
import { SERVICE_FAMILIES } from "@/content/services";
import { pageMetadata, serviceLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering & Consulting Services | Gamyaa AeroSystems",
  description:
    "Services that help teams adopt GAMYAA platforms: engineering assurance advisory, FAI / AS9102 digitalisation, certification and evidence engineering, and engineering cybersecurity.",
  href: aero("/services"),
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceLd(SERVICE_FAMILIES.map((s) => ({ name: s.title, description: s.body })), aero("/services"))} />
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
        lede="Services help customers adopt GAMYAA platforms and assurance practices. AEAIP™, DAQIP™ and AirCert AI™ remain the core of what we build."
      />

      <section aria-label="Service families" className="pb-16 md:pb-24" data-ga-section="services">
        <Container>
          <ol className="border-b border-line">
            {SERVICE_FAMILIES.map((s, i) => (
              <li key={s.title} className="grid gap-6 border-t border-line-strong py-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="heading mt-3 text-2xl text-ink sm:text-[1.75rem]">{s.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{s.body}</p>
                </div>
                <div className="lg:col-span-7">
                  <BulletList items={[...s.items]} className="text-base" />
                  <p className="mt-6 text-sm text-muted">
                    Builds towards{" "}
                    <ArrowLink href={aero(s.platform.href)} className="inline-flex min-h-6 text-ink">
                      {s.platform.label}
                    </ArrowLink>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            Engagements are scoped individually. Certification support prepares material for review by your engineers
            and the certification authority; it does not constitute approval.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Scope an engagement"
        body="Start with the assurance, quality or certification problem in front of you."
        actions={<CommercialCtas location="cta_band" />}
      />
    </>
  );
}
