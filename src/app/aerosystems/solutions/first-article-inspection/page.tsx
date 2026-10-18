import { TrackView } from "@/components/analytics/track-view";
import { BalloonDrawing } from "@/components/diagrams/balloon-drawing";
import { FlowChain } from "@/components/diagrams/flow";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { RelatedSolutions, solutionMetadata, SolutionBreadcrumbs } from "@/components/sections/solution-template";
import {
  ArrowLink,
  BulletList,
  ButtonLink,
  Container,
  JsonLd,
  Notice,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui/primitives";
import { solutionBySlug } from "@/content/solutions";
import { techArticleLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = solutionMetadata("first-article-inspection");

const FORMS = [
  {
    form: "Form 1",
    title: "Part Number Accountability",
    body: "Identifies the part, its drawing and revision, the organisation and the FAI type, and lists any sub-assemblies and detail parts.",
  },
  {
    form: "Form 2",
    title: "Product Accountability",
    body: "Raw material, specifications, special processes and functional testing, with the certificates and approvals that support them.",
  },
  {
    form: "Form 3",
    title: "Characteristic Accountability, Verification and Compatibility Evaluation",
    body: "Every design characteristic, its requirement, the measured result and whether it conforms, with any nonconformance referenced.",
  },
];

const FAI_TYPES = [
  {
    title: "Full FAI",
    body: "All characteristics of a new part, a new production source or after a significant lapse in production.",
  },
  {
    title: "Partial FAI",
    body: "Only the characteristics affected by a change in design, process, source or tooling.",
  },
  {
    title: "Delta FAI",
    body: "A partial FAI driven by drawing revision comparison: DAQIP identifies what changed between revisions so only affected characteristics are re-verified.",
  },
];

export default function FaiPage() {
  const s = solutionBySlug("first-article-inspection")!;
  const href = aero(`/solutions/${s.slug}`);
  return (
    <>
      <TrackView event="view_fai_solution" />
      <JsonLd data={techArticleLd({ headline: s.title, description: s.metaDescription, href })} />

      <PageHero
        breadcrumbs={<SolutionBreadcrumbs s={s} />}
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <span>Solution · DAQIP™</span>
            <StatusBadge status={s.status} />
          </span>
        }
        title={s.title}
        lede={s.intro}
      >
        <div className="mt-10">
          <FlowChain label="First Article Inspection workflow" steps={s.flow} />
        </div>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={internalContact("fai")} ga={{ event: "request_demo_click" }} label="Request an FAI demo">
            Request an FAI demo
          </ButtonLink>
          <ButtonLink href={aero("/daqip")} variant="secondary" label="Explore DAQIP">
            Explore DAQIP™
          </ButtonLink>
        </div>
      </PageHero>

      <Section labelledBy="balloon-title" section="balloon_drawing">
        <Container>
          <SectionHeader
            eyebrow="Drawing → Balloon → Characteristics"
            id="balloon-title"
            title="Ballooning that stays connected to the evidence"
            lede="Each balloon is a characteristic with a requirement, an inspection method, a measured result, evidence and an approval decision."
          />
          <div className="mt-12">
            <BalloonDrawing />
          </div>
        </Container>
      </Section>

      <Section labelledBy="forms-title" section="as9102">
        <Container>
          <SectionHeader
            eyebrow="AS9102"
            id="forms-title"
            title="AS9102 Forms 1, 2 and 3"
            lede="DAQIP structures First Article Inspection Report data around the three AS9102 forms."
          />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-3">
            {FORMS.map((f) => (
              <li key={f.form} className="bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{f.form}</p>
                <h3 className="mt-3 text-lg font-medium leading-snug text-ink">{f.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{f.body}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {FAI_TYPES.map((t) => (
              <li key={t.title} className="border border-line p-6">
                <h3 className="font-medium text-ink">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="scope-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Scope" id="scope-title" title="What DAQIP covers in FAI" />
          </div>
          <div className="lg:col-span-8">
            <BulletList
              className="text-base sm:columns-2 sm:gap-10 [&>li]:break-inside-avoid [&>li]:mb-2"
              items={[
                "AS9102 Forms 1, 2 and 3",
                "Full FAI and partial FAI",
                "Drawing revision comparison and delta FAI",
                "GD&T characteristics and datums",
                "Material and special-process evidence",
                "Measurement results by characteristic",
                "FAIR review with comments and resolution",
                "Approval history with reviewer and date",
              ]}
            />
            <Notice className="mt-10">
              DAQIP supports AS9102-aligned workflows. It holds no formal AS9102 or AS9100 compliance certification,
              and using it does not by itself make an organisation compliant. FAI acceptance remains a decision of
              your quality function and, where required, your customer.
            </Notice>
            <ArrowLink href={aero("/solutions/drawing-intelligence")} className="mt-6">
              How drawing intelligence feeds FAI
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <RelatedSolutions current={s.slug} />

      <CtaBand
        title="Run your next First Article Inspection with traceable evidence"
        body="Tell us about your parts, your current FAI process and your customers' requirements."
        primary={{ label: "Request an FAI demo", href: internalContact("fai"), ga: { event: "request_demo_click" } }}
      />
    </>
  );
}
