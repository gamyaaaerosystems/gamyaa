import { TrackView } from "@/components/analytics/track-view";
import { BalloonDrawing } from "@/components/diagrams/balloon-drawing";
import { FaqSection } from "@/components/sections/shared";
import { solutionMetadata, SolutionTemplate } from "@/components/sections/solution-template";
import { ArrowLink, Container, JsonLd, Notice, Section, SectionHeader } from "@/components/ui/primitives";
import { faqLd } from "@/lib/seo";
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

const FAI_FAQ = [
  {
    q: "What is First Article Inspection software?",
    a: "First Article Inspection (FAI) software helps a manufacturer verify that the first part from a production process meets every requirement on the drawing, and records the evidence in a First Article Inspection Report (FAIR). DAQIP structures this work: ballooning the drawing, building the characteristic list, recording measurements and reviewing the FAIR.",
  },
  {
    q: "What is a FAIR in AS9102?",
    a: "A FAIR is the First Article Inspection Report defined by AS9102. It is organised as Form 1 (Part Number Accountability), Form 2 (Product Accountability: raw material, specifications, special processes and functional testing) and Form 3 (Characteristic Accountability, Verification and Compatibility Evaluation).",
  },
  {
    q: "What is balloon drawing software?",
    a: "Balloon drawing software numbers every characteristic on an engineering drawing so each one can be measured and reported. In DAQIP, balloon numbers stay linked to the drawing revision, the requirement, the inspection method, the measurement and the approval.",
  },
  {
    q: "Is DAQIP available as AS9102 FAI software today?",
    a: "DAQIP is in development. The interactive prototype on this site shows the intended FAI workflow with illustrative data. DAQIP supports AS9102-aligned workflows but does not by itself make an organisation compliant with AS9102.",
  },
];

export default function FaiPage() {
  return (
    <>
      <TrackView event="view_fai_solution" />
      <JsonLd data={faqLd(FAI_FAQ)} />
      <SolutionTemplate
        slug="first-article-inspection"
        extra={
          <Section id="as9102" labelledBy="forms-title" section="as9102" className="pt-0 md:pt-0">
            <Container>
              <SectionHeader
                eyebrow="AS9102"
                id="forms-title"
                title="AS9102 Forms 1, 2 and 3"
                lede="DAQIP structures First Article Inspection Report data around the three AS9102 forms, for full, partial and delta FAI."
              />
              <ol className="mt-12 grid border-b border-line lg:grid-cols-3 lg:gap-10 lg:border-b-0">
                {FORMS.map((f) => (
                  <li key={f.form} className="border-t border-line py-6 lg:border-t-2 lg:border-ink">
                    <p className="font-mono text-xs text-accent">{f.form}</p>
                    <h3 className="mt-2 text-lg font-medium leading-snug text-ink">{f.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{f.body}</p>
                  </li>
                ))}
              </ol>
              <dl className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-3">
                {FAI_TYPES.map((t) => (
                  <div key={t.title}>
                    <dt className="font-medium text-ink">{t.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{t.body}</dd>
                  </div>
                ))}
              </dl>
              <Notice className="mt-10 max-w-3xl">
                DAQIP supports AS9102-aligned workflows. It holds no formal AS9102 or AS9100 compliance certification,
                and using it does not by itself make an organisation compliant. FAI acceptance remains a decision of
                your quality function and, where required, your customer.
              </Notice>
            </Container>
          </Section>
        }
        example={
          <>
            <BalloonDrawing />
            <ArrowLink href={aero("/solutions/drawing-intelligence")} className="mt-6">
              How drawing intelligence feeds FAI
            </ArrowLink>
          </>
        }
        after={<FaqSection title="FAI software questions" items={FAI_FAQ} />}
      />
    </>
  );
}
