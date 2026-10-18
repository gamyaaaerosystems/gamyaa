import { TrackView } from "@/components/analytics/track-view";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container, KeywordLine } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Engineering Learning & Research Programs | Gamyaa AeroSystems",
  description:
    "Applied engineering programs across aerospace, defence, quality intelligence, cybersecurity, digital twins and advanced engineering systems.",
  href: aero("/internships"),
});

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
        lede="Applied engineering programs across aerospace, defence, quality intelligence, cybersecurity, digital twins and advanced engineering systems."
      >
        <KeywordLine
          className="mt-8"
          items={["Aerospace", "Defence", "Quality intelligence", "Cybersecurity", "Digital twins", "Advanced systems"]}
        />
        <p className="mt-6 max-w-3xl text-[0.9375rem] leading-relaxed text-muted">
          These programs are separate from Gamyaa AeroSystems&apos; commercial products and services. Programs,
          eligibility and applications are managed on our aerospace programs site.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink
            href={EXTERNAL.internships}
            ga={{ event: "internship_outbound_click" }}
            label="Explore Engineering Internships"
          >
            Explore Engineering Internships →
          </ButtonLink>
        </div>
      </PageHero>
      <Container className="pb-20">
        <div className="border-t border-line pt-8">
          <ArrowLink href={EXTERNAL.daqipResearch} ga={{ event: "daqip_research_click" }} label="DAQIP research internship">
            Aerospace Quality Intelligence Platform research internship
          </ArrowLink>
          <p className="mt-6 text-sm text-muted">aerospace.gamyaa.in opens in a new tab.</p>
        </div>
      </Container>
    </>
  );
}
