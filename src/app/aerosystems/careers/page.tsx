import { TrackView } from "@/components/analytics/track-view";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { CAREER_DOMAINS } from "@/content/company";
import { pageMetadata } from "@/lib/seo";
import { aero, CONTACT } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers | Gamyaa AeroSystems",
  description:
    "Careers at Gamyaa AeroSystems, building Engineering Assurance Intelligence: systems engineering and V&V, aerospace quality, certification, software, AI, cybersecurity and product.",
  href: aero("/careers"),
});

const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Careers — Gamyaa AeroSystems")}`;

export default function CareersPage() {
  return (
    <>
      <TrackView event="career_view" />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Careers", href: aero("/careers") },
            ]}
          />
        }
        eyebrow="Careers"
        title="Build Engineering Systems That Matter"
        lede="Engineering Assurance Intelligence for Defence · Aerospace · Space. The work is precise, evidence-driven and close to the engineers who must make readiness decisions."
      />

      <Section labelledBy="domains-title" section="careers_domains" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Domains" id="domains-title" title="Where we expect to hire" />
          </div>
          <dl className="border-b border-line lg:col-span-8">
            {CAREER_DOMAINS.map((d) => (
              <div key={d.title} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[15rem_1fr] sm:gap-8">
                <dt className="font-medium text-ink">{d.title}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-2">{d.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section labelledBy="openings-title" section="careers_openings" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Openings" id="openings-title" title="Current opportunities" />
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-sm border border-dashed border-line-strong p-6 sm:p-8">
              <p className="text-lg text-ink">Current opportunities will be published here.</p>
              <p className="mt-2 text-[0.9375rem] text-ink-2">
                There are no open positions listed at the moment. If your experience fits the domains above, you
                are welcome to introduce yourself.
              </p>
              <ButtonLink href={mailto} className="mt-6" ga={{ event: "career_cta_click" }} label="Introduce yourself">
                Introduce yourself
              </ButtonLink>
            </div>
            <ArrowLink href={aero("/internships")} className="mt-8">
              Looking for an internship? Engineering learning &amp; research programs
            </ArrowLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
