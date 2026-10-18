import Link from "next/link";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight } from "@/components/ui/icons";
import { Container, StatusBadge } from "@/components/ui/primitives";
import { SOLUTIONS } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Solutions — FAI, Inspection, Supplier Quality & Airworthiness | Gamyaa AeroSystems",
  description:
    "Aerospace and defence engineering solutions from Gamyaa AeroSystems: drawing intelligence, First Article Inspection, inspection intelligence, manufacturing and supplier quality, airworthiness certification and certification evidence.",
  href: aero("/solutions"),
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Solutions", href: aero("/solutions") },
            ]}
          />
        }
        eyebrow="Solutions"
        title="Solutions by engineering workflow"
        lede="Each solution is delivered through DAQIP™, AirCert AI™ or both, and carries its current status."
      />
      <section className="pb-8" aria-label="All solutions">
        <Container>
          <ul className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {SOLUTIONS.map((s, i) => (
              <li key={s.slug} className="bg-surface">
                <Link
                  href={aero(`/solutions/${s.slug}`)}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-surface-2 sm:p-8"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <StatusBadge status={s.status} />
                  </span>
                  <span className="mt-6 text-xl font-medium tracking-tight text-ink">{s.label}</span>
                  <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{s.metaDescription}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    View solution
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand
        title="Not sure where to start?"
        body="Most teams begin with First Article Inspection. Tell us about yours."
        primary={{ label: "Talk to Gamyaa", href: internalContact(), ga: { event: "contact_sales_click" } }}
      />
    </>
  );
}
