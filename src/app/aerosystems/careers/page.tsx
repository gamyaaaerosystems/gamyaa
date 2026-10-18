import { TrackView } from "@/components/analytics/track-view";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { CAREER_DOMAINS } from "@/content/company";
import { pageMetadata } from "@/lib/seo";
import { aero, CONTACT, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers | Gamyaa AeroSystems",
  description:
    "Careers at Gamyaa AeroSystems in aerospace quality, airworthiness, certification engineering, manufacturing software, inspection intelligence, AI/ML, cybersecurity and systems architecture.",
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
        lede="We are building engineering intelligence for aerospace and defence quality and certification. The work is precise, evidence-driven and close to real manufacturing."
      />

      <Section labelledBy="domains-title" bordered={false} className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Domains" id="domains-title" title="Where we expect to hire" />
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
            {CAREER_DOMAINS.map((d) => (
              <li key={d} className="border border-line-strong bg-surface px-3.5 py-2 text-[0.9375rem] text-ink-2">
                {d}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="openings-title" section="careers_openings">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Openings" id="openings-title" title="Current opportunities" />
          </div>
          <div className="lg:col-span-8">
            <div className="border border-dashed border-line-strong p-6 sm:p-8">
              <p className="text-lg text-ink">Current opportunities will be published here.</p>
              <p className="mt-2 text-[0.9375rem] text-ink-2">
                There are no open positions listed at the moment. If your experience fits the domains above, you
                are welcome to introduce yourself.
              </p>
              <ButtonLink
                href={mailto}
                className="mt-6"
                ga={{ event: "career_cta_click" }}
                label="Introduce yourself"
              >
                Introduce yourself
              </ButtonLink>
            </div>
            <ArrowLink href={EXTERNAL.internships} ga={{ event: "internship_outbound_click" }} className="mt-8" label="Engineering internships">
              Looking for an internship? Explore engineering internships
            </ArrowLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
