import { TrackView } from "@/components/analytics/track-view";
import { BalloonDrawing } from "@/components/diagrams/balloon-drawing";
import { CommercialCtas, CtaBand, FaqSection, PageHero } from "@/components/sections/shared";
import { EvidenceLine } from "@/components/system/evidence-line";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  ArrowLink,
  BulletList,
  Container,
  JsonLd,
  Notice,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui/primitives";
import { EVIDENCE_LINES } from "@/content/aeaip";
import { DAQIP, DAQIP_CAPABILITIES, DAQIP_FAQ } from "@/content/daqip";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_LABEL } from "@/content/status";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "DAQIP™ | Defence Aerospace Quality Intelligence Platform",
  description:
    "DAQIP™, Platform 02 within AEAIP™: Manufacturing Assurance Intelligence connecting engineering drawings, First Article Inspection, AS9102, inspection, supplier quality, manufacturing evidence and approval.",
  href: aero("/daqip"),
  hasOwnOgImage: true,
});

const FAI = aero("/solutions/first-article-inspection");

export default function DaqipPage() {
  return (
    <>
      <TrackView event="view_daqip" />
      <JsonLd
        data={softwareLd({
          name: "DAQIP",
          alternateName: DAQIP.expanded,
          href: aero("/daqip"),
          description: DAQIP.definition,
          status: STATUS_LABEL[PRODUCT_STATUS.daqip],
          featureList: DAQIP_CAPABILITIES.map((c) => `${c.title} (${STATUS_LABEL[c.status]})`),
        })}
      />
      <JsonLd data={faqLd(DAQIP_FAQ)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Products", href: aero("/products") },
              { name: "DAQIP™", href: aero("/daqip") },
            ]}
          />
        }
        eyebrow={
          <>
            <span>Platform 02 · Manufacturing Assurance Intelligence</span>
            <StatusBadge status={PRODUCT_STATUS.daqip} />
          </>
        }
        title={
          <>
            DAQIP™
            <span className="mt-3 block text-2xl font-medium tracking-tight text-ink-2 sm:text-3xl lg:text-4xl">
              {DAQIP.expanded}
            </span>
          </>
        }
        aside={
          <div className="rounded-sm border border-line p-6 sm:p-8">
            <p className="mb-5 text-sm text-muted">One characteristic, from drawing to approval</p>
            <EvidenceLine steps={EVIDENCE_LINES.daqip} label="DAQIP Evidence Line" orientation="vertical" size="lg" />
          </div>
        }
      >
        <p className="heading mt-8 max-w-2xl text-xl text-ink sm:text-2xl">{DAQIP.coreMessage}</p>
        <p className="lede mt-4 max-w-2xl">{DAQIP.shortExplanation}</p>
        <p className="mt-6 text-[0.9375rem] text-ink-2">
          Part of{" "}
          <ArrowLink
            href={aero("/aeaip")}
            ga={{ event: "aeaip_explore", params: { source_location: "daqip_page" } }}
            label="Explore AEAIP"
            className="inline-flex min-h-6"
          >
            AEAIP™
          </ArrowLink>
          : the Manufacturing Assurance Intelligence specialization within the AEAIP™ architecture.
        </p>
        <CommercialCtas location="hero" className="mt-10" />
      </PageHero>

      {/* Interactive FAI prototype first: the most useful thing on the page */}
      <Section id="fai-prototype" labelledBy="trace-title" section="balloon_drawing" className="pt-0 md:pt-0">
        <Container>
          <SectionHeader
            eyebrow="Interactive FAI prototype · illustrative data"
            id="trace-title"
            title="Follow one characteristic from drawing to approval"
            lede="Select a balloon. Each characteristic carries its requirement, operation, inspection method, measurement, evidence, reviewer and approval."
          />
          <div className="mt-10">
            <BalloonDrawing />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <ArrowLink href={FAI}>First Article Inspection with DAQIP</ArrowLink>
            <ArrowLink href={`${FAI}#as9102`}>AS9102 Forms 1, 2 and 3</ArrowLink>
            <ArrowLink href={aero("/solutions/drawing-intelligence")}>Drawing intelligence</ArrowLink>
            <ArrowLink href={EXTERNAL.daqipResearch} ga={{ event: "daqip_research_click" }} label="Research & Product Development">
              DAQIP research programme
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Definition */}
      <Section labelledBy="what-is-daqip" section="daqip_definition" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="what-is-daqip" className="heading text-[2rem] text-ink sm:text-[2.625rem]">
              What is DAQIP?
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">{DAQIP.definition}</p>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-[0.9375rem] sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">Made by</dt>
                <dd className="mt-1 text-ink-2">Gamyaa AeroSystems, Bangalore, India</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">For</dt>
                <dd className="mt-1 text-ink-2">Aerospace &amp; defence manufacturers, suppliers, quality and inspection teams</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Status ({STATUS_AS_OF})</dt>
                <dd className="mt-1 text-ink-2">{STATUS_LABEL[PRODUCT_STATUS.daqip]}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* Capabilities: compact rows, detail on demand */}
      <Section id="capabilities" labelledBy="capabilities-title" section="capabilities">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Intelligence layers"
              id="capabilities-title"
              title="DAQIP capabilities"
              lede={`Status as of ${STATUS_AS_OF}. Roadmap items are not presented as released.`}
            />
          </div>
          <ul className="border-b border-line lg:col-span-8">
            {DAQIP_CAPABILITIES.map((c) => (
              <li key={c.id} className="border-t border-line">
                <details className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3">
                    <span>
                      <span className="block text-[1.0625rem] font-medium text-ink">{c.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{c.summary}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <StatusBadge status={c.status} />
                      <span aria-hidden className="text-subtle transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="pb-5">
                    {c.id === "evidence-graph" ? (
                      <p className="mb-3 text-sm text-accent">Requirement → Method → Measurement → Evidence → Approval</p>
                    ) : null}
                    <BulletList items={c.items} className="sm:columns-2 sm:gap-8 [&>li]:break-inside-avoid" />
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* AI assurance (DAQIP-specific authority: Quality) */}
      <Section labelledBy="ai-title" section="ai_assurance" className="pt-0 md:pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="AI assurance"
              id="ai-title"
              title={DAQIP.philosophy}
              lede="AI in DAQIP is an assistant. It never approves a part, a characteristic or a report. Across AEAIP the principle is: authorized authorities approve; for product conformity in DAQIP, that authority is Quality."
            />
          </div>
          <div className="lg:col-span-7">
            <ol className="border-b border-line">
              {[
                ["AI assists", "Suggests characteristics, GD&T and methods from the drawing, marked as unverified."],
                ["Engineers verify", "Every suggestion is reviewed, corrected or rejected by an engineer."],
                ["Quality approves", "Approval is a recorded human decision with name, role and time."],
                ["DAQIP preserves the evidence", "Requirement, method, measurement, evidence and approval stay linked."],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5">
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-medium text-ink">{t}</h3>
                    <p className="mt-1 text-[0.9375rem] text-ink-2">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Notice className="mt-6">
              DAQIP supports AS9102-aligned First Article Inspection workflows. It does not by itself make an
              organisation compliant with AS9102 or AS9100, and it holds no formal compliance certification.
            </Notice>
          </div>
        </Container>
      </Section>

      <FaqSection title="DAQIP questions" items={DAQIP_FAQ} />

      <CtaBand
        title="See DAQIP on a First Article Inspection workflow"
        body="We are looking for aerospace and defence manufacturers to pilot DAQIP on real FAI and inspection work."
        actions={<CommercialCtas location="cta_band" topic="fai" />}
      />
    </>
  );
}
