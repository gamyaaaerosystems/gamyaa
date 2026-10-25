import Link from "next/link";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight } from "@/components/ui/icons";
import { ArrowLink, Container, StatusBadge } from "@/components/ui/primitives";
import { SOLUTION_GROUPS, SOLUTIONS } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Solutions — FAI, Inspection, Supplier Quality & Airworthiness | Gamyaa AeroSystems",
  description:
    "Aerospace and defence assurance solutions: drawing intelligence, First Article Inspection, inspection, manufacturing and supplier quality, airworthiness, certification evidence and engineering assurance.",
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
        title="Solutions by engineering problem"
        lede="Each solution answers one problem and is delivered through a GAMYAA platform. Every status is stated as it is today."
      />

      <div className="pb-12 md:pb-20" data-ga-section="solutions_index">
        <Container>
          {SOLUTION_GROUPS.map((g) => {
            const items = SOLUTIONS.filter((s) => s.group === g.key);
            return (
              <section key={g.key} aria-labelledby={`group-${g.key}`} className="grid gap-8 border-t border-line-strong py-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <h2 id={`group-${g.key}`} className="heading text-2xl text-ink sm:text-[1.75rem]">
                    {g.title}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{g.summary}</p>
                  <p className="mt-5 text-sm text-muted">Delivered through</p>
                  <ArrowLink href={g.platform.href} className="mt-1">
                    {g.platform.label}
                  </ArrowLink>
                </div>
                <ul className="border-b border-line lg:col-span-8">
                  {items.map((s) => (
                    <li key={s.slug} className="border-t border-line first:border-t-0 lg:first:border-t">
                      <Link
                        href={aero(`/solutions/${s.slug}`)}
                        className="group grid gap-x-6 gap-y-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <span>
                          <h3 className="text-[1.125rem] font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
                            {s.label}
                          </h3>
                          <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">{s.intro}</span>
                        </span>
                        <span className="flex items-center gap-4">
                          <StatusBadge status={s.status} />
                          <ArrowRight className="text-subtle transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </Container>
      </div>

      <CtaBand
        title="Not sure where to start?"
        body="Most teams begin with First Article Inspection. Tell us about yours."
        primary={{ label: "Talk to Gamyaa", href: internalContact(), ga: { event: "contact_sales_click" } }}
      />
    </>
  );
}
