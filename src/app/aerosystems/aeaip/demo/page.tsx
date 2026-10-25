import { AssuranceDemo } from "@/components/aeaip/assurance-demo";
import { LevelTag } from "@/components/aeaip/demo-preview";
import { KnowledgeIndex } from "@/components/aeaip/learn";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink, Container, JsonLd, Notice, Section, SectionHeader, StatusBadge } from "@/components/ui/primitives";
import { AEAIP_DEMO_HREF, AEAIP_HREF, AEAIP_REVIEWED } from "@/content/aeaip";
import {
  CATEGORY_LABEL,
  COMPLETED_GATES,
  DEMO_PROGRAMME,
  gateMetrics,
  ISSUES,
  overallReadiness,
  SUBSYSTEMS,
  subsystemReadiness,
  VALIDITY_STAGES,
} from "@/content/aeaip-demo";
import { GATES } from "@/content/review-gates";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { aero } from "@/lib/site";

const TITLE = "Interactive Assurance Demo — Are We Ready for TRR? | AEAIP™";
const DESCRIPTION =
  "Explore a fictitious satellite's readiness for a Test Readiness Review: subsystem status, evidence gaps, NCRs, configuration mismatches, an evidence trace from requirement to review, and stale evidence after a change.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: AEAIP_DEMO_HREF });

export default function DemoPage() {
  const gate = DEMO_PROGRAMME.currentGate;
  const m = gateMetrics(gate);
  return (
    <>
      <JsonLd
        data={webPageLd({
          name: TITLE,
          description: DESCRIPTION,
          href: AEAIP_DEMO_HREF,
          dateModified: AEAIP_REVIEWED.iso,
          about: ["Test Readiness Review", "Spacecraft verification", "Evidence traceability"],
        })}
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "AEAIP™", href: AEAIP_HREF },
              { name: "Interactive Assurance Demo", href: AEAIP_DEMO_HREF },
            ]}
          />
        }
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <span>Illustrative Engineering Assurance Demonstration</span>
            <StatusBadge status="concept-demo" />
          </span>
        }
        title="Are we ready for TRR?"
        lede={`${DEMO_PROGRAMME.name}, a ${DEMO_PROGRAMME.description.charAt(0).toLowerCase()}${DEMO_PROGRAMME.description.slice(1)}, is preparing for its ${DEMO_PROGRAMME.currentGateContext}. Choose a gate and a subsystem, open an issue, and follow the evidence.`}
      >
        <Notice className="mt-8 max-w-3xl">
          <strong className="text-ink">Not a flight-safety or certification determination.</strong> All data is
          fictitious and invented for this demonstration. It shows how AEAIP is designed to present readiness; it is not
          AEAIP software, and the readiness logic is a simplified teaching model.
        </Notice>
      </PageHero>

      <Section labelledBy="demo-interactive" bordered={false} className="pt-0 md:pt-0" section="demo">
        <Container>
          <h2 id="demo-interactive" className="sr-only">
            Interactive readiness explorer
          </h2>
          <AssuranceDemo />
        </Container>
      </Section>

      {/* About the demo: rules and the full text version, collapsed but in the HTML
          (crawlable, screen-reader friendly, no JavaScript needed). */}
      <Section labelledBy="about-demo" section="demo_about" className="pt-0 md:pt-0">
        <Container>
          <h2 id="about-demo" className="kicker">
            About this demo
          </h2>
          <details className="group mt-6 border-t border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-lg text-ink">
              How the demo decides readiness
              <span aria-hidden className="text-subtle transition-transform group-open:rotate-45">+</span>
            </summary>
          <div className="max-w-3xl space-y-4 pb-8 text-[0.9375rem] leading-relaxed text-ink-2">
            <p>
              Every open item records the first gate it affects and whether it is a <strong className="text-ink">condition</strong>{" "}
              or a <strong className="text-ink">blocker</strong> there. Many conditions become blockers at a later gate:
              an anomaly that may be open while a test starts must be closed before acceptance.
            </p>
            <ul className="space-y-1.5">
              <li>A subsystem is NOT READY if any blocking item affects it, CONDITIONAL if only conditions do, otherwise READY.</li>
              <li>The overall recommendation is NOT READY if any subsystem is NOT READY, GO WITH CONDITIONS if any is CONDITIONAL, otherwise GO.</li>
              <li>Every count on the panel is the number of listed items of that type, so every number can be opened.</li>
              <li>Gates already held show their recorded decision; later gates show a forecast from today&apos;s evidence.</li>
            </ul>
            <p>
              Real programmes define their own criteria through Configurable Assurance Gates, and the decision is always
              the review board&apos;s.
            </p>
          </div>
          </details>

          <details className="group border-y border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-lg text-ink">
              <span id="text-version">Text version of the {DEMO_PROGRAMME.name} sample data</span>
              <span aria-hidden className="text-subtle transition-transform group-open:rotate-45">+</span>
            </summary>
          <p className="max-w-3xl text-[0.9375rem] text-ink-2">
            The complete demo dataset as text: the same content the interactive view presents.
          </p>
          <div className="mt-8 grid gap-10 pb-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="text-lg font-medium text-ink">
                {gate} readiness: {overallReadiness(gate)} (illustrative)
              </h3>
              <table className="mt-4 w-full border-collapse text-left text-sm">
                <caption className="sr-only">Subsystem readiness for {gate}</caption>
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Subsystem</th>
                    <th scope="col" className="py-2 pr-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">Verified</th>
                    <th scope="col" className="py-2 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">{gate}</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBSYSTEMS.map((s) => (
                    <tr key={s.key} className="border-b border-line">
                      <th scope="row" className="py-2 pr-3 font-normal text-ink">{s.name}</th>
                      <td className="py-2 pr-3 font-mono text-xs text-ink-2">
                        {s.requirements.verified}/{s.requirements.total}
                      </td>
                      <td className="py-2">
                        <LevelTag level={subsystemReadiness(s.key, gate)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-ink-2">
                Requirements verified {m.verified} of {m.total}; evidence gaps {m.evidenceGaps}; open NCRs {m.openNcrs};
                configuration mismatches {m.configMismatches}; pending tests {m.pendingTests}; cybersecurity findings{" "}
                {m.cyberFindings}; critical anomalies {m.criticalAnomalies}.
              </p>
              <h3 className="mt-10 text-lg font-medium text-ink">Gates already held</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-2">
                {GATES.filter((g) => COMPLETED_GATES[g.code]).map((g) => (
                  <li key={g.code}>
                    <span className="font-mono text-ink">{g.code}</span> — {COMPLETED_GATES[g.code]!.decision}.{" "}
                    {COMPLETED_GATES[g.code]!.note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-lg font-medium text-ink">Open items and their evidence traces</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {ISSUES.map((i) => (
                  <li key={i.id}>
                    <details className="group py-3">
                      <summary className="flex min-h-11 cursor-pointer list-none flex-col justify-center gap-0.5">
                        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-subtle">
                          {i.id} · {CATEGORY_LABEL[i.category]} · from {i.from}
                          {i.escalates ? ` · blocking from ${i.escalates}` : i.level === "blocking" ? " · blocking" : ""}
                        </span>
                        <span className="text-[0.9375rem] text-ink">
                          {i.title}
                          <span aria-hidden className="ml-2 text-subtle group-open:hidden">+</span>
                          <span aria-hidden className="ml-2 hidden text-subtle group-open:inline">−</span>
                        </span>
                      </summary>
                      <p className="mt-2 text-sm text-ink-2">{i.summary}</p>
                      <ol className="mt-3 space-y-1 border-l border-line-strong pl-4 text-sm">
                        {i.trace.map((t) => (
                          <li key={t.label}>
                            <span className="text-subtle">{t.label}:</span> <span className="text-ink-2">{t.value}</span>
                          </li>
                        ))}
                      </ol>
                      {i.condition ? <p className="mt-2 text-sm text-ink-2">Condition: {i.condition}</p> : null}
                    </details>
                  </li>
                ))}
              </ul>
              <h3 className="mt-10 text-lg font-medium text-ink">Evidence validity scenario (SAT-EPS-014)</h3>
              <ol className="mt-3 space-y-2 text-sm text-ink-2">
                {VALIDITY_STAGES.map((v, n) => (
                  <li key={v.step}>
                    <span className="font-mono text-ink">{n + 1}. {v.state}</span> — {v.body}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          </details>
          <p className="mt-6 text-xs text-muted">
            Sample data last reviewed <time dateTime={AEAIP_REVIEWED.iso}>{AEAIP_REVIEWED.display}</time>. Fictitious;
            any resemblance to a real programme, requirement or serial number is coincidental.
          </p>
        </Container>
      </Section>

      <Section labelledBy="demo-learn" section="demo_learn">
        <Container>
          <SectionHeader eyebrow="Go deeper" id="demo-learn" title="The engineering behind the demo" />
          <div className="mt-8">
            <KnowledgeIndex only={["review-gates", "configuration-assurance", "verification-validation"]} source="demo_page" />
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Would this answer your next readiness review?"
        body="Tell us what your review board needs to see. AEAIP is being researched with engineering teams."
        actions={
          <>
            <ButtonLink
              href={internalContact("spacecraft-assurance")}
              ga={{ event: "contact_sales_click", params: { source_location: "demo_page" } }}
              label="Discuss satellite assurance"
            >
              Discuss satellite / spacecraft assurance
            </ButtonLink>
            <ButtonLink href={AEAIP_HREF} variant="secondary" label="Back to AEAIP">
              Back to AEAIP™
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
