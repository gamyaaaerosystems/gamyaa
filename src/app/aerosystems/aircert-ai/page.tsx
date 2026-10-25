import { TrackView } from "@/components/analytics/track-view";
import { ComplianceMatrixExample, ReadinessPanel } from "@/components/diagrams/flow";
import { CommercialCtas, CtaBand, FaqSection, internalContact, PageHero } from "@/components/sections/shared";
import { EvidenceLine } from "@/components/system/evidence-line";
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
  SmartLink,
  StatusBadge,
} from "@/components/ui/primitives";
import { EVIDENCE_LINES } from "@/content/aeaip";
import { AIRCERT, AIRCERT_AUDIENCE, AIRCERT_EXTENDED, AIRCERT_FAQ, AIRCERT_GROUPS, type AircertCapability } from "@/content/aircert";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_LABEL } from "@/content/status";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AirCert AI™ | Airworthiness Certification Engineering Copilot",
  description:
    "AirCert AI™, Platform 03 within AEAIP™: Certification Assurance Intelligence assisting teams with certification basis, requirements, compliance planning, verification and traceable certification evidence.",
  href: aero("/aircert-ai"),
  hasOwnOgImage: true,
});

const ALL = AIRCERT_GROUPS.flatMap((g) => g.capabilities);
const byN = (...ns: string[]) => ns.map((n) => ALL.find((c) => c.n === n)!).filter(Boolean);

/** Seven categories, default collapsed. Capability numbers follow content/aircert.ts. */
const CATEGORIES: Array<{ title: string; capabilities: AircertCapability[]; evidence?: boolean }> = [
  { title: "Requirements", capabilities: byN("01", "02", "05") },
  { title: "Safety", capabilities: byN("03") },
  { title: "Certification Basis", capabilities: byN("04", "06") },
  { title: "Planning", capabilities: byN("07") },
  { title: "Engineering Documentation", capabilities: byN("08") },
  { title: "Qualification / Acceptance", capabilities: byN("09", "10", "11", "12") },
  { title: "Evidence", capabilities: [], evidence: true },
];

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
          featureList: ALL.map((c) => c.title),
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
          <>
            <span>Platform 03 · Certification Assurance Intelligence</span>
            <StatusBadge status={PRODUCT_STATUS.aircert} />
          </>
        }
        title={
          <>
            AirCert AI™
            <span className="mt-3 block text-2xl font-medium tracking-tight text-ink-2 sm:text-3xl lg:text-4xl">
              {AIRCERT.subtitle}
            </span>
          </>
        }
        aside={
          <div className="rounded-sm border border-line p-6 sm:p-8">
            <p className="mb-5 text-sm text-muted">The certification journey it is designed to support</p>
            <EvidenceLine steps={EVIDENCE_LINES.aircert} label="AirCert AI journey" orientation="vertical" size="lg" />
          </div>
        }
      >
        <p className="lede mt-8 max-w-2xl">{AIRCERT.statement}</p>
        <p className="mt-6 text-[0.9375rem] text-ink-2">
          Part of{" "}
          <SmartLink
            href={aero("/aeaip")}
            ga={{ event: "aeaip_explore", params: { source_location: "aircert_page" } }}
            label="Explore AEAIP"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            AEAIP™
          </SmartLink>
          : the Certification Assurance Intelligence specialization within the AEAIP™ architecture.
        </p>
        <Notice className="mt-8 max-w-2xl">
          <strong className="text-ink">Planned product.</strong> {AIRCERT.boundary}
        </Notice>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={internalContact("aircert")} ga={{ event: "aircert_contact_click" }} label="Discuss AirCert AI">
            Discuss AirCert AI™
          </ButtonLink>
          <ButtonLink href="#capabilities" variant="secondary" label="View planned capabilities">
            View planned capabilities
          </ButtonLink>
        </div>
      </PageHero>

      {/* Definition and problem */}
      <Section labelledBy="what-is-aircert" section="aircert_definition" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="what-is-aircert" className="heading text-[2rem] text-ink sm:text-[2.625rem]">
              What is AirCert AI?
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">{AIRCERT.definition}</p>
            <p className="lede mt-6">{AIRCERT.problem}</p>
            <p className="mt-6 text-sm text-muted">Built to assist</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {AIRCERT_AUDIENCE.map((a) => (
                <li key={a} className="rounded-full border border-line-strong px-3 py-1.5 text-sm text-ink-2">
                  {a}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-[0.9375rem] sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted">Made by</dt>
                <dd className="mt-1 text-ink-2">Gamyaa AeroSystems, Bangalore, India</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Does not</dt>
                <dd className="mt-1 text-ink-2">Certify products or replace certification authorities</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Status ({STATUS_AS_OF})</dt>
                <dd className="mt-1 text-ink-2">{STATUS_LABEL[PRODUCT_STATUS.aircert]} · not released</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* Capabilities: seven categories, collapsed */}
      <Section id="capabilities" labelledBy="caps-title" section="aircert_capabilities">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Planned capabilities"
              id="caps-title"
              title="Seven areas of certification assurance"
              lede="The capabilities below describe the planned AirCert AI engineering architecture and workflow direction."
            />
            {/* One status for the whole section, rather than "Planned" on every row. */}
            <p className="mt-5">
              <StatusBadge status={PRODUCT_STATUS.aircert} />
            </p>
          </div>
          {/* Collapsed by default; `name` lets only one area be open at a time. */}
          <div className="border-b border-line lg:col-span-8">
            {CATEGORIES.map((cat) => (
              <details key={cat.title} name="aircert-capabilities" className="group border-t border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-[1.0625rem] font-medium text-ink">{cat.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {cat.evidence ? AIRCERT_EXTENDED.map((x) => x.title).join(" · ") : cat.capabilities.map((c) => c.title).join(" · ")}
                    </span>
                  </span>
                  <span aria-hidden className="shrink-0 text-subtle transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  {cat.evidence ? (
                    <>
                      <dl className="grid gap-x-8 md:grid-cols-2">
                        {AIRCERT_EXTENDED.map((x) => (
                          <div key={x.title} className="border-t border-line py-3">
                            <dt className="font-medium text-ink">{x.title}</dt>
                            <dd className="mt-1 text-sm leading-relaxed text-ink-2">{x.body}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-8">
                        <ComplianceMatrixExample />
                      </div>
                      <div className="mt-6 max-w-xl">
                        <ReadinessPanel />
                      </div>
                    </>
                  ) : (
                    <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                      {cat.capabilities.map((c) => (
                        <li key={c.n}>
                          <p className="font-mono text-xs text-subtle">{c.n}</p>
                          <h3 className="mt-1 font-medium text-ink">{c.title}</h3>
                          <BulletList items={c.items} className="mt-3" />
                          {c.note ? <p className="mt-3 border-l border-accent pl-3 text-sm leading-relaxed text-ink-2">{c.note}</p> : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* Traceable recommendation example */}
      <Section labelledBy="rec-title" section="recommendation" className="pt-0 md:pt-0">
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
            <figure className="rounded-sm border border-line bg-surface p-6 sm:p-8">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-ink">Candidate requirement</span>
                <span className="text-xs text-muted">Illustrative example</span>
              </figcaption>
              <p className="mt-5 text-lg text-ink">Equipment shall operate within specification from −40 °C to +70 °C.</p>
              <dl className="mt-6 grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                {[
                  ["Source", "Customer environmental specification"],
                  ["Revision", "Rev C"],
                  ["Clause", "4.3.2"],
                  ["Rationale", "Installation zone and mission profile in the product definition"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-muted">{k}</dt>
                    <dd className="mt-1 text-ink-2">{v}</dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="text-muted">Engineer verification</dt>
                  <dd className="mt-1 flex items-center gap-2 text-ink">
                    <span aria-hidden className="size-2 rounded-full" style={{ background: "var(--st-prototype)" }} />
                    Awaiting engineer review. Not yet applied to the certification basis.
                  </dd>
                </div>
              </dl>
            </figure>
            <ArrowLink href={aero("/solutions/engineering-assurance")} className="mt-6">
              How certification and manufacturing evidence connect
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
