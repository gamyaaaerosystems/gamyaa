import { TrackView } from "@/components/analytics/track-view";
import { BalloonDrawing } from "@/components/diagrams/balloon-drawing";
import { FlowChain } from "@/components/diagrams/flow";
import { CommercialCtas, CtaBand, FaqSection, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowRight } from "@/components/ui/icons";
import {
  ArrowLink,
  BulletList,
  Container,
  JsonLd,
  Notice,
  Section,
  SectionHeader,
  SmartLink,
  StatusBadge,
} from "@/components/ui/primitives";
import { DAQIP, DAQIP_CAPABILITIES, DAQIP_FAQ } from "@/content/daqip";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_LABEL } from "@/content/status";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { aero, EXTERNAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "DAQIP™ | Defence Aerospace Quality Intelligence Platform",
  description:
    "DAQIP™ connects engineering drawings, First Article Inspection, AS9102, inspection, supplier quality, manufacturing evidence and approval.",
  href: aero("/daqip"),
  hasOwnOgImage: true,
});

const FAI = aero("/solutions/first-article-inspection");

/** Only things a visitor can genuinely use on this site today. No planned features. */
const EXPLORE_TODAY: Array<{ title: string; body: string; href: string }> = [
  {
    title: "Interactive balloon drawing",
    body: "Select ballooned characteristics on an original, fictitious aerospace drawing.",
    href: "#fai-prototype",
  },
  {
    title: "Characteristic traceability",
    body: "Follow one characteristic to its requirement, process, inspection method, measurement, evidence and approval.",
    href: "#fai-prototype",
  },
  {
    title: "Engineering requirement mapping",
    body: "How dimensions, GD&T, datums and notes become reviewable requirements.",
    href: aero("/solutions/drawing-intelligence"),
  },
  {
    title: "FAI workflow model",
    body: "Drawing → Balloon → Characteristics → Measurements → AS9102 → Review.",
    href: FAI,
  },
  {
    title: "AS9102 structure",
    body: "How First Article Inspection data is organised across Forms 1, 2 and 3.",
    href: `${FAI}#as9102`,
  },
  {
    title: "Quality evidence graph",
    body: "Requirement → Method → Measurement → Evidence → Approval.",
    href: "#capabilities",
  },
  {
    title: "Product architecture",
    body: "The eleven intelligence layers, each with its current status.",
    href: "#capabilities",
  },
];

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
          <span className="flex flex-wrap items-center gap-3">
            <span>Gamyaa AeroSystems · Platform 01</span>
            <StatusBadge status={PRODUCT_STATUS.daqip} />
          </span>
        }
        title={
          <>
            DAQIP™{" "}
            <span className="mt-3 block text-2xl font-medium tracking-tight text-ink-2 sm:text-3xl lg:text-4xl">
              {DAQIP.expanded}
            </span>
          </>
        }
        lede={DAQIP.shortExplanation}
      >
        <p className="heading mt-8 text-xl text-ink sm:text-2xl">{DAQIP.coreMessage}</p>
        <CommercialCtas location="hero" className="mt-10" />
        <ArrowLink
          href={EXTERNAL.daqipResearch}
          ga={{ event: "daqip_research_click" }}
          label="Research & Product Development"
          className="mt-4"
        >
          Research &amp; Product Development
        </ArrowLink>
      </PageHero>

      {/* Canonical definition + one-sentence answer */}
      <Section labelledBy="what-is-daqip" section="daqip_definition">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="what-is-daqip" className="heading text-3xl text-ink">
              What is DAQIP?
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">{DAQIP.definition}</p>
            <div className="mt-8 border-l-2 border-accent pl-5">
              <p className="eyebrow">DAQIP — in one sentence</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{DAQIP.oneSentence}</p>
            </div>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-[0.9375rem] sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Made by</dt>
                <dd className="mt-2 text-ink-2">Gamyaa AeroSystems, Bangalore, India</dd>
              </div>
              <div>
                <dt className="eyebrow">For</dt>
                <dd className="mt-2 text-ink-2">Aerospace &amp; defence manufacturers, suppliers, quality and inspection teams</dd>
              </div>
              <div>
                <dt className="eyebrow">Status ({STATUS_AS_OF})</dt>
                <dd className="mt-2 text-ink-2">{STATUS_LABEL[PRODUCT_STATUS.daqip]}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* What you can explore today */}
      <Section labelledBy="explore-title" section="explore_today">
        <Container>
          <SectionHeader
            eyebrow="Available on this site now"
            id="explore-title"
            title="What You Can Explore Today"
            lede="DAQIP is in development. These interactive demonstrations and models use illustrative data. They show how DAQIP is designed to work; they are not the released product."
          />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE_TODAY.map((x) => (
              <li key={x.title} className="bg-surface">
                <SmartLink href={x.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-surface-2">
                  <span className="text-[1.0625rem] font-medium leading-snug text-ink">{x.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{x.body}</span>
                  <ArrowRight className="mt-5 text-subtle transition-transform group-hover:translate-x-1" />
                </SmartLink>
              </li>
            ))}
            <li className="hidden bg-surface sm:block lg:hidden" aria-hidden />
            <li className="hidden bg-surface lg:block" aria-hidden />
          </ul>
        </Container>
      </Section>

      {/* Interactive prototype */}
      <Section id="fai-prototype" labelledBy="trace-title" section="balloon_drawing">
        <Container>
          <SectionHeader
            eyebrow="Interactive FAI prototype"
            id="trace-title"
            title="Follow one characteristic from drawing to approval"
            lede="Select a balloon. Each characteristic carries its requirement, manufacturing operation, inspection method, measurement, evidence, reviewer and approval decision."
          />
          <FlowChain
            className="mt-8"
            label="Characteristic traceability"
            steps={["Drawing", "Characteristic", "Inspection Method", "Measurement", "Evidence", "Approval"]}
          />
          <div className="mt-10">
            <BalloonDrawing />
          </div>
        </Container>
      </Section>

      {/* Workflow */}
      <Section labelledBy="daqip-core" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="daqip-core" className="display text-3xl text-ink sm:text-5xl">
              {DAQIP.tagline}
            </h2>
            <p className="mt-8 max-w-3xl font-mono text-sm leading-relaxed text-ink-2">{DAQIP.philosophy}</p>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Workflow</p>
            <FlowChain
              label="DAQIP workflow"
              orientation="vertical"
              steps={["Engineering", "Manufacturing", "Inspection", "Evidence", "Approval"]}
            />
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities" labelledBy="capabilities-title" section="capabilities">
        <Container>
          <SectionHeader
            eyebrow="Intelligence layers"
            id="capabilities-title"
            title="DAQIP capabilities"
            lede={`Each layer is labelled with its status as of ${STATUS_AS_OF}. Roadmap items are not presented as released.`}
          />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {DAQIP_CAPABILITIES.map((c) => (
              <li key={c.id} className="flex flex-col bg-surface p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium leading-snug text-ink">{c.title}</h3>
                  <StatusBadge status={c.status} className="mt-0.5 shrink-0" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>
                {c.id === "evidence-graph" ? (
                  <p className="mt-4 font-mono text-[0.75rem] leading-relaxed text-accent">
                    Requirement → Method → Measurement → Evidence → Approval
                  </p>
                ) : null}
                <BulletList items={c.items} className="mt-5" />
              </li>
            ))}
            <li className="hidden bg-surface md:block lg:hidden" aria-hidden />
            <li className="hidden bg-surface lg:block" aria-hidden />
          </ul>
        </Container>
      </Section>

      {/* AI assurance */}
      <Section labelledBy="ai-title" section="ai_assurance">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="AI assurance"
              id="ai-title"
              title="Human engineering authority, by design"
              lede="AI in DAQIP is an assistant. It never approves a part, a characteristic or a report."
            />
          </div>
          <div className="lg:col-span-7">
            <ol className="divide-y divide-line border-y border-line">
              {[
                ["AI assists", "Suggests characteristics, GD&T and methods from the drawing, marked as unverified."],
                ["Engineers verify", "Every suggestion is reviewed, corrected or rejected by an engineer."],
                ["Quality approves", "Approval is a recorded human decision with name, role and time."],
                ["DAQIP preserves the evidence", "Requirement, method, measurement, evidence and approval stay linked."],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
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
            <ArrowLink href={FAI} className="mt-6">
              First Article Inspection with DAQIP
            </ArrowLink>
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
