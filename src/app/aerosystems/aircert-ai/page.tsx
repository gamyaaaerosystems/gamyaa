import { TrackView } from "@/components/analytics/track-view";
import { ComplianceMatrixExample, FlowChain, ReadinessPanel } from "@/components/diagrams/flow";
import { CommercialCtas, CtaBand, FaqSection, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
import {
  AIRCERT,
  AIRCERT_AUDIENCE,
  AIRCERT_EVIDENCE_GRAPH,
  AIRCERT_EXTENDED,
  AIRCERT_FAQ,
  AIRCERT_GROUPS,
} from "@/content/aircert";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_LABEL } from "@/content/status";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AirCert AI™ | Airworthiness Certification Engineering Copilot",
  description:
    "AirCert AI™ assists aerospace and defence teams with certification requirements, planning, engineering documentation, test evidence and airworthiness traceability.",
  href: aero("/aircert-ai"),
  hasOwnOgImage: true,
});

export default function AircertPage() {
  return (
    <>
      <TrackView event="view_aircert_ai" />
      <JsonLd
        data={softwareLd({
          name: "AirCert AI",
          alternateName: AIRCERT.subtitle,
          href: aero("/aircert-ai"),
          description: `${AIRCERT.definition} ${AIRCERT.boundary}`,
          status: STATUS_LABEL[PRODUCT_STATUS.aircert],
          featureList: AIRCERT_GROUPS.flatMap((g) => g.capabilities.map((c) => c.title)),
        })}
      />
      <JsonLd data={faqLd(AIRCERT_FAQ)} />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Products", href: aero("/products") },
              { name: "AirCert AI™", href: aero("/aircert-ai") },
            ]}
          />
        }
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <span>Gamyaa AeroSystems · Platform 02</span>
            <StatusBadge status={PRODUCT_STATUS.aircert} />
          </span>
        }
        title={
          <>
            AirCert AI™{" "}
            <span className="mt-3 block text-2xl font-medium tracking-tight text-ink-2 sm:text-3xl lg:text-4xl">
              {AIRCERT.subtitle}
            </span>
          </>
        }
      >
        <p className="heading mt-8 text-xl text-ink sm:text-2xl">{AIRCERT.line}</p>
        <p className="lede mt-4 max-w-3xl">{AIRCERT.statement}</p>
        <FlowChain
          className="mt-8"
          label="AirCert AI workflow"
          steps={["Requirement", "Compliance", "Verification", "Evidence", "Review"]}
        />
        <Notice className="mt-8 max-w-3xl">
          <strong className="text-ink">Planned product.</strong> {AIRCERT.boundary}
        </Notice>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={internalContact("aircert")} ga={{ event: "aircert_contact_click" }} label="Discuss AirCert AI">
            Discuss AirCert AI
          </ButtonLink>
          <ButtonLink href="#capabilities" variant="secondary" label="View planned capabilities">
            View planned capabilities
          </ButtonLink>
        </div>
      </PageHero>

      {/* Definition + problem */}
      <Section labelledBy="what-is-aircert" section="aircert_definition">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="what-is-aircert" className="heading text-3xl text-ink">
              What is AirCert AI?
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">{AIRCERT.definition}</p>
            <p className="mt-4 text-[0.9375rem] text-ink-2">{AIRCERT.positioning}</p>
            <div className="mt-8 border-l-2 border-accent pl-5">
              <p className="eyebrow">AirCert AI — in one sentence</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{AIRCERT.oneSentence}</p>
            </div>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-[0.9375rem] sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Made by</dt>
                <dd className="mt-2 text-ink-2">Gamyaa AeroSystems, Bangalore, India</dd>
              </div>
              <div>
                <dt className="eyebrow">Does not</dt>
                <dd className="mt-2 text-ink-2">Certify products or replace certification authorities</dd>
              </div>
              <div>
                <dt className="eyebrow">Status ({STATUS_AS_OF})</dt>
                <dd className="mt-2 text-ink-2">{STATUS_LABEL[PRODUCT_STATUS.aircert]} · not released</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section labelledBy="problem-title" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="The problem" id="problem-title" title="Strong engineering, slow certification" />
          </div>
          <div className="lg:col-span-7">
            <p className="lede">{AIRCERT.problem}</p>
            <p className="lede mt-4 text-ink">{AIRCERT.response}</p>
            <p className="eyebrow mb-3 mt-10">Built to assist</p>
            <ul className="flex flex-wrap gap-2">
              {AIRCERT_AUDIENCE.map((a) => (
                <li key={a} className="border border-line-strong bg-surface px-3 py-1.5 text-sm text-ink-2">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities" labelledBy="caps-title" section="aircert_capabilities">
        <Container>
          <SectionHeader
            eyebrow="Intelligence layers"
            id="caps-title"
            title="Planned capabilities"
            lede={
              <>
                Twelve capability areas, grouped by engineering discipline. All are{" "}
                <strong className="font-medium text-ink">planned</strong> and not yet available.
              </>
            }
          />
          <div className="mt-12 space-y-12">
            {AIRCERT_GROUPS.map((g) => (
              <div key={g.title}>
                <div className="flex items-center gap-4 border-b border-line pb-3">
                  <h3 className="font-mono text-sm uppercase tracking-[0.12em] text-ink">{g.title}</h3>
                  <StatusBadge status="planned" />
                </div>
                <ul className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                  {g.capabilities.map((c) => (
                    <li key={c.n}>
                      <p className="font-mono text-xs text-subtle">{c.n}</p>
                      <h4 className="mt-2 text-lg font-medium leading-snug text-ink">{c.title}</h4>
                      <BulletList items={c.items} className="mt-4" />
                      {c.note ? (
                        <p className="mt-4 border-l border-accent pl-3 text-sm leading-relaxed text-ink-2">{c.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recommendation transparency */}
      <Section labelledBy="rec-title" section="recommendation">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Traceable recommendations"
              id="rec-title"
              title="Every suggestion shows its source"
              lede="When AirCert AI proposes a candidate requirement, the engineer sees where it came from and decides whether it applies."
            />
          </div>
          <div className="lg:col-span-7">
            <figure className="ticks border border-line bg-surface p-6 sm:p-8">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="eyebrow">Candidate requirement</span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                  Illustrative example
                </span>
              </figcaption>
              <p className="mt-5 text-lg text-ink">
                Equipment shall operate within specification from −40 °C to +70 °C.
              </p>
              <dl className="mt-6 grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                {[
                  ["Source", "Customer environmental specification"],
                  ["Revision", "Rev C"],
                  ["Clause", "4.3.2"],
                  ["Rationale", "Installation zone and mission profile in the product definition"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{k}</dt>
                    <dd className="mt-1 text-ink-2">{v}</dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
                    Engineer verification
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-ink">
                    <span aria-hidden className="size-2 rounded-full" style={{ background: "var(--st-prototype)" }} />
                    Awaiting engineer review. Not yet applied to the certification basis.
                  </dd>
                </div>
              </dl>
            </figure>
          </div>
        </Container>
      </Section>

      {/* Extended capabilities */}
      <Section labelledBy="ext-title" section="aircert_extended">
        <Container>
          <SectionHeader
            eyebrow="Evidence & change"
            id="ext-title"
            title="From compliance matrix to closure"
          />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {AIRCERT_EXTENDED.map((x) => (
              <li key={x.title} className="bg-surface p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium leading-snug text-ink">{x.title}</h3>
                  <StatusBadge status="planned" className="mt-0.5 shrink-0" />
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{x.body}</p>
              </li>
            ))}
            <li className="hidden bg-surface p-6 md:block lg:hidden" aria-hidden />
            <li className="hidden bg-surface p-6 lg:block" aria-hidden />
            <li className="hidden bg-surface p-6 lg:block" aria-hidden />
          </ul>

          <div className="mt-12">
            <ComplianceMatrixExample />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">Certification evidence graph</p>
              <FlowChain
                label="Certification evidence graph"
                orientation="vertical"
                numbered
                steps={AIRCERT_EVIDENCE_GRAPH}
              />
              <p className="eyebrow mb-4 mt-10">Authority comment resolution</p>
              <FlowChain
                label="Authority comment resolution"
                steps={["Comment", "Owner", "Response", "Evidence", "Closure"]}
              />
            </div>
            <div>
              <ReadinessPanel />
            </div>
          </div>
        </Container>
      </Section>

      {/* Relationship to DAQIP (full diagram lives on Engineering Assurance) */}
      <Section labelledBy="int-title" section="integration">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="AirCert AI™ + DAQIP™" id="int-title" title="Design assurance meets manufacturing assurance" />
          </div>
          <div className="lg:col-span-7">
            <p className="lede">
              AirCert AI covers design assurance and certification. DAQIP covers manufacturing assurance and quality.
              Connected, a certification requirement can be followed to the manufacturing characteristic, the
              inspection method and the FAI evidence that supports it, with human and authority review at the end.
            </p>
            <ArrowLink href={aero("/solutions/engineering-assurance")} className="mt-6">
              See the engineering assurance thread
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <FaqSection title="AirCert AI questions" items={AIRCERT_FAQ} />

      <CtaBand
        title="Shaping AirCert AI with certification engineers"
        body="If your team prepares products for military airworthiness or civil certification, we would like to understand your process."
        actions={<CommercialCtas location="cta_band" product="aircert" topic="certification" />}
      />
    </>
  );
}
