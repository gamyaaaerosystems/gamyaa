import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink, Container, Notice, Section, SectionHeader } from "@/components/ui/primitives";
import { CtaBand, PageHero } from "@/components/sections/shared";
import { VENTURE_FOCUS, VENTURE_MODES } from "@/content/ventures";
import { pageMetadata } from "@/lib/seo";
import { parent } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Gamyaa Ventures | Strategic Ventures for Aerospace, Defence, Space & Deep Tech",
  description:
    "Gamyaa Ventures explores, builds and supports engineering-led ventures strengthening aerospace, defence, space and advanced manufacturing.",
  href: parent("/ventures"),
  siteName: "GAMYAA",
  hasOwnOgImage: true,
});

const contactHref = `${parent("/contact")}?interest=ventures`;

export default function VenturesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "GAMYAA", href: parent("/") },
              { name: "Gamyaa Ventures", href: parent("/ventures") },
            ]}
          />
        }
        eyebrow="Strategic Ventures for Aerospace, Defence, Space & Deep Tech"
        title="Gamyaa Ventures"
      >
        <p className="display mt-6 max-w-3xl text-2xl text-ink-2 sm:text-3xl">
          Backing the systems behind the next aerospace era.
        </p>
        <p className="lede mt-6 max-w-2xl">
          We explore, build and support engineering-led ventures strengthening aerospace, defence, space and advanced
          manufacturing.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={contactHref} ga={{ event: "ventures_contact" }} label="Partner With Gamyaa">
            Partner With Gamyaa
          </ButtonLink>
          <ButtonLink
            href="#focus-areas"
            variant="secondary"
            ga={{ event: "ventures_focus_click" }}
            label="Explore Focus Areas"
          >
            Explore Focus Areas
          </ButtonLink>
        </div>
      </PageHero>

      <Section id="focus-areas" labelledBy="focus-title" section="ventures_focus">
        <Container>
          <SectionHeader
            eyebrow="Focus areas"
            title="Where we look for engineering-led ventures"
            id="focus-title"
          />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {VENTURE_FOCUS.map((f, i) => (
              <li key={f.title} className="bg-surface p-6">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-medium text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
            <li className="hidden bg-surface p-6 sm:block" aria-hidden />
          </ul>
        </Container>
      </Section>

      <Section labelledBy="modes-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="How we work" title="Venture building and collaboration" id="modes-title" />
          </div>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {VENTURE_MODES.map((m) => (
                <li key={m.title} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                  <h3 className="font-medium text-ink">{m.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2 sm:col-span-2">{m.body}</p>
                </li>
              ))}
            </ul>
            <Notice className="mt-8">
              Gamyaa Ventures is a strategic venture-building and collaboration initiative. It is not a registered
              investment fund, does not manage third-party capital and does not solicit investment.
            </Notice>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Building something for aerospace, defence or space?"
        body="Tell us about the engineering problem you are solving and where you are today."
        primary={{ label: "Partner With Gamyaa", href: contactHref, ga: { event: "ventures_contact" } }}
      />
    </>
  );
}
