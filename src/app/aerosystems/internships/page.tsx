import { TrackView } from "@/components/analytics/track-view";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering Learning & Research Programs | Gamyaa AeroSystems",
  description:
    "Applied engineering programs across aerospace, defence, quality intelligence, cybersecurity, digital twins and advanced engineering systems, run on the Gamyaa aerospace programs site.",
  href: aero("/internships"),
});

/** Deliberately short: programs, eligibility and applications live on the external programs site. */
export default function InternshipsPage() {
  return (
    <>
      <TrackView event="internship_view" />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Internships", href: aero("/internships") },
            ]}
          />
        }
        eyebrow="Learning & research"
        title="Engineering Learning & Research Programs"
        lede="Applied engineering programs across aerospace, defence, quality intelligence, cybersecurity, digital twins and advanced engineering systems. They are separate from our commercial products and services; programs, eligibility and applications are managed on our aerospace programs site."
      >
        <div className="mt-10">
          <ButtonLink href={EXTERNAL.internships} ga={{ event: "internship_outbound_click" }} label="Explore Engineering Internships">
            Explore Engineering Internships
          </ButtonLink>
        </div>
      </PageHero>
      <Container className="pb-20">
        <div className="border-t border-line pt-8">
          <p className="text-sm text-muted">Featured program</p>
          <ArrowLink href={EXTERNAL.daqipResearch} ga={{ event: "daqip_research_click" }} label="DAQIP research internship" className="mt-1">
            Aerospace Quality Intelligence Platform research internship
          </ArrowLink>
          <p className="mt-6 text-sm text-muted">Links open aerospace.gamyaa.in in a new tab.</p>
        </div>
      </Container>
    </>
  );
}
