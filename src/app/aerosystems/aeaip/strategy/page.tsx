import Link from "next/link";
import type { ReactNode } from "react";
import { DesignerLink } from "@/components/aeaip/learn";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { EvidenceLine } from "@/components/system/evidence-line";
import { ExecutiveSection } from "@/components/system/executive-section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink, Container, JsonLd, Notice, SmartLink, StatusBadge } from "@/components/ui/primitives";
import { AEAIP_HREF, AEAIP_REVIEWED, AEAIP_STAGES, AEAIP_STRATEGY_HREF, type RoadmapStage } from "@/content/aeaip";
import { REFERENCES } from "@/content/references";
import type { Status } from "@/content/status";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { aero } from "@/lib/site";

const TITLE = "AEAIP™ Strategy — Vision, Business Model & Roadmap | Gamyaa AeroSystems";
const DESCRIPTION =
  "The AEAIP™ strategy for leadership, partners and investors: vision, problem, customer, value, why now, Business Model Canvas, differentiation, entry market and a maturity-based roadmap.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: AEAIP_STRATEGY_HREF });

/* ---------------------------------------------------------------- Data */

const BUYERS = ["Chief Engineer", "CTO / VP Engineering", "Programme Director", "Head of Systems Engineering", "Head of V&V", "Head of Mission / Product Assurance", "Head of Quality", "Certification / Airworthiness lead"];
const USERS = ["Systems engineers", "Verification and test engineers", "Quality engineers", "Configuration management", "Software and cybersecurity engineers", "Certification engineers", "Review boards"];
const SEGMENTS_NOW = ["Satellite and spacecraft startups", "Private-space companies", "Aerospace and defence manufacturers", "Space-system integrators", "Aerospace MSMEs and subsystem suppliers", "Quality and mission-assurance organisations"];
const SEGMENTS_LATER = ["Launch-vehicle organisations", "Defence primes and system integrators", "Aircraft and advanced-air-mobility programmes", "International aerospace organisations"];

const VALUE = [
  "What is verified",
  "What evidence proves it",
  "Whether that evidence applies to the current configuration",
  "What is missing",
  "What changed",
  "What must be reverified",
  "What prevents the next readiness decision",
];

/** Business Model Canvas: one line per block on the visual; full lists in the disclosure. */
const BMC: Array<{ key: string; title: string; line: string; items: string[]; area: string; note?: string }> = [
  { key: "partners", area: "partners", title: "Key Partners", line: "Test labs, metrology, ecosystem and integration partners", note: "Categories; named partners only where verified.", items: ["Aerospace engineering organisations", "Test laboratories", "Metrology and inspection organisations", "Space and defence ecosystem partners", "Requirements / PLM / ALM integration ecosystems", "Systems-engineering specialists", "Certification and assurance specialists", "Academic and research collaborators, where appropriate"] },
  { key: "activities", area: "activities", title: "Key Activities", line: "Evidence graph, assurance reasoning, domain modelling", items: ["Platform engineering", "Evidence-graph development", "Assurance reasoning", "Aerospace domain modelling", "Framework mapping", "Cybersecurity", "Enterprise integration", "Customer validation", "Product assurance"] },
  { key: "resources", area: "resources", title: "Key Resources", line: "V&V, quality, certification and security expertise; the engineering ontology", items: ["Aerospace systems expertise", "Verification and validation expertise", "Quality and manufacturing expertise", "Certification expertise", "Cybersecurity expertise", "Software, data and AI engineering", "Engineering ontology / evidence graph", "Customer programme knowledge"] },
  { key: "value", area: "value", title: "Value Proposition", line: "Know what is verified, what is missing, and when the system is ready", items: VALUE },
  { key: "relationships", area: "relationships", title: "Customer Relationships", line: "Discovery → pilot → deployment → ongoing assurance", items: ["Engineering discovery", "Pilot / proof-of-value", "Enterprise deployment", "Programme integration", "Ongoing assurance workflows", "Support and domain configuration"] },
  { key: "channels", area: "channels", title: "Channels", line: "Direct enterprise sales, engineering pilots, partnerships", items: ["Direct enterprise sales", "Engineering pilots", "Strategic partnerships", "Industry ecosystem", "Technical content and engineering education", "Conference and industry engagement", "Partner integrations"] },
  { key: "segments", area: "segments", title: "Customer Segments", line: "Satellite and spacecraft programmes first", items: [...SEGMENTS_NOW.map((s) => `Initial: ${s}`), ...SEGMENTS_LATER.map((s) => `Later: ${s}`)] },
  { key: "costs", area: "costs", title: "Cost Structure", line: "R&D, domain experts, security, integration, pilots", items: ["R&D", "Domain experts", "Enterprise software engineering", "Security", "Integration", "Customer pilots", "Infrastructure", "Testing", "Compliance and legal", "Business development"] },
  { key: "revenue", area: "revenue", title: "Revenue Streams (proposed)", line: "Paid pilots, enterprise subscription, deployment tiers, services", note: "Proposed model, not final. No prices are published.", items: ["Paid engineering pilot / proof-of-value", "Enterprise annual software subscription", "Private-cloud / on-premise deployment tier", "Controlled / air-gapped deployment (roadmap)", "Integration services", "Specialised assurance and domain packs", "Enterprise support"] },
];

const DIFFERENTIATION = [
  "Aerospace, defence and space domain focus",
  "Satellites and spacecraft as the first deep vertical",
  "Requirement → Configuration → Evidence → Verification → Readiness",
  "Configuration-aware evidence applicability",
  "Review-gate readiness intelligence",
  "DAQIP™ manufacturing-assurance depth",
  "AirCert AI™ certification-assurance depth",
  "Cybersecurity assurance integrated into engineering evidence",
  "Human-authority governance",
  "Digital twin and simulation evidence integration",
  "Operational telemetry evidence",
  "Predicted → Tested → Flown traceability",
  "Long-term continuous and predictive assurance",
];

const POSITIONING: Array<[string, string, string, string]> = [
  ["Requirements management / ALM", "IBM DOORS / DOORS Next, Jama Connect, Siemens Polarion and similar", "Requirements authoring, traceability, verification tracking, change and review workflows.", "Use them as the requirements system of record; add configuration-aware evidence validity and gate readiness across tool boundaries."],
  ["PLM / engineering data", "Siemens Teamcenter and other PLM systems", "Product structure, parts, revisions and engineering change.", "Use their configuration data as the source of truth for what changed and where."],
  ["MBSE", "SysML-based modelling environments", "Architecture, behaviour and requirement relationships as models.", "Treat model elements and model versions as nodes and evidence context."],
  ["Test, simulation and lab systems", "Test benches, HIL rigs, simulation tools such as MATLAB / Simulink", "Producing test and analysis results.", "Link results to the configuration and procedure that produced them."],
  ["Quality, inspection and FAI", "QMS, inspection and metrology systems", "Manufacturing quality, FAI, nonconformance and corrective action.", "Bring product-conformity evidence into system readiness, with DAQIP™ for depth."],
  ["Issue management and source control", "Jira, GitHub, GitLab and similar", "Defects, tasks, code and builds.", "Link anomalies, fixes and builds to the requirements and evidence they affect."],
  ["New AI-assisted assurance tools", "Emerging requirements-quality, traceability and certification tools", "Specific assurance tasks, often within one discipline.", "Focus on aerospace, defence and space system readiness with human-authority governance."],
];

const ROLES: Array<[string, string]> = [
  ["Customer", "The organisation that adopts and pays for AEAIP."],
  ["User", "The engineers and review boards who work in it every day."],
  ["Economic buyer", "The person accountable for the readiness outcome and the budget."],
  ["Technology integration ecosystem", "Engineering tools AEAIP is intended to connect to. Not partners unless an agreement exists."],
  ["Engineering partner", "An organisation GAMYAA works with on engineering problems or validation."],
  ["Strategic partner", "An organisation that shapes or extends the platform's reach in a market."],
  ["Investor", "A party that funds the company. Not a customer and not a partner by default."],
];

const ENTERPRISE: Array<[string, Status]> = [
  ["Data residency", "architecture"],
  ["Role-based access control", "architecture"],
  ["Audit trail", "architecture"],
  ["Data provenance", "architecture"],
  ["Encryption in transit and at rest", "architecture"],
  ["Export-control awareness", "architecture"],
  ["Customer data isolation", "architecture"],
  ["Private cloud", "planned"],
  ["On-premise deployment", "planned"],
  ["Single sign-on", "planned"],
  ["Air-gapped / controlled environments", "roadmap"],
];

const HORIZONS: RoadmapStage["horizon"][] = ["Current", "Near-term", "Research", "Long-term Vision"];

/* ------------------------------------------------------------ Helpers */

function Disclosure({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group mt-8 border-y border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[1.0625rem] text-ink">
        {summary}
        <span aria-hidden className="text-subtle transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-8">{children}</div>
    </details>
  );
}

function Pills({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-full border border-line-strong px-3 py-1.5 text-sm text-ink-2">
          {i}
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- Page */

export default function StrategyPage() {
  const pib = REFERENCES["pib-space-economy"];
  return (
    <>
      <JsonLd
        data={webPageLd({
          name: TITLE,
          description: DESCRIPTION,
          href: AEAIP_STRATEGY_HREF,
          dateModified: AEAIP_REVIEWED.iso,
          about: ["Engineering assurance", "Business model", "Product roadmap"],
        })}
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "AEAIP™", href: AEAIP_HREF },
              { name: "Strategy", href: AEAIP_STRATEGY_HREF },
            ]}
          />
        }
        eyebrow="AEAIP™ strategy · for leadership, partners and investors"
        title="The business of Engineering Assurance Intelligence"
        lede="The problem, the customer, the business model, the differentiation and a staged roadmap, in plain terms."
      >
        <Notice className="mt-8 max-w-2xl">
          AEAIP is at Research &amp; Architecture status. Nothing on this page is a commitment to dates, a financial
          projection, or an offer or solicitation of securities.
        </Notice>
      </PageHero>

      <ExecutiveSection
        id="vision"
        kicker="Vision"
        statement="To become a trusted Engineering Assurance Intelligence layer for critical aerospace, defence and space systems."
      >
        <p className="text-sm font-medium text-accent">Mission</p>
        <p className="mt-2 text-xl leading-snug tracking-tight text-ink">
          Transform fragmented engineering requirements, configurations and evidence into continuous, traceable and
          decision-ready assurance from concept to operation.
        </p>
      </ExecutiveSection>

      <ExecutiveSection
        id="problem"
        kicker="Problem"
        statement="Readiness is decided on evidence that is expensive to assemble and easy to get wrong."
        className="bg-surface-accent"
      >
        <p>
          The evidence exists, spread across requirements, PLM, test, quality and software systems, and it is rebuilt by
          hand for every review. The costly failure is evidence that looks complete but no longer applies to the
          configuration under review, found late, when fixing it means retest, schedule slip or a waiver.
        </p>
      </ExecutiveSection>

      <ExecutiveSection id="customer" kicker="Customer" statement="The person accountable for the readiness decision.">
        <p>The economic buyer is senior engineering leadership; the users are the engineers who produce and review evidence.</p>
        <p className="mt-6 text-sm text-muted">Economic buyers</p>
        <div className="mt-2">
          <Pills items={BUYERS} />
        </div>
        <p className="mt-6 text-sm text-muted">Users</p>
        <div className="mt-2">
          <Pills items={USERS} />
        </div>
      </ExecutiveSection>

      <ExecutiveSection id="value" kicker="Value proposition" statement="Know what is verified. Know what is missing. Know when the system is ready.">
        <ol className="space-y-2">
          {VALUE.map((v, i) => (
            <li key={v} className="flex gap-4 border-t border-line pt-2">
              <span className="w-6 shrink-0 font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {v}
            </li>
          ))}
        </ol>
      </ExecutiveSection>

      <ExecutiveSection
        id="why-now"
        kicker="Why now"
        statement="More teams are building critical space systems, often without large assurance departments."
        className="bg-surface-accent"
      >
        <ul className="space-y-4">
          <li>
            India opened space activities to non-government entities under the{" "}
            <SmartLink href={REFERENCES["indian-space-policy"].url} className="text-accent underline">
              Indian Space Policy 2023
            </SmartLink>
            , with{" "}
            <SmartLink href={REFERENCES["in-space"].url} className="text-accent underline">
              IN-SPACe
            </SmartLink>{" "}
            as the authorising and promoting agency.
          </li>
          <li>
            The Department of Space stated in Parliament on 24 July 2025 that its initiatives converge on the IN-SPACe
            Decadal Vision target of a USD 44 billion Indian space economy by 2033 (
            <SmartLink href={pib.url} className="text-accent underline">
              Press Information Bureau
            </SmartLink>
            ).
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted">Each figure cites an official source and date; no third-party market-size estimates are used.</p>
      </ExecutiveSection>

      {/* Business model: one visual, detail behind a disclosure */}
      <section id="business-model" aria-labelledby="business-model-title" data-ga-section="exec_business_model" className="scroll-mt-28 py-20 md:py-28">
        <Container>
          <p className="kicker">Business model</p>
          <h2 id="business-model-title" className="heading mt-5 max-w-3xl text-[2rem] text-ink sm:text-[2.75rem]">
            AEAIP Business Model Canvas
          </h2>
          <p className="lede mt-4 max-w-2xl">Public, strategic view. Revenue streams are proposed, not final; no prices are published.</p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2 lg:grid-cols-5">
            {(["partners", "activities", "value", "relationships", "segments", "resources", "channels"] as const).map((k) => {
              const b = BMC.find((x) => x.key === k)!;
              const tall = k === "partners" || k === "value" || k === "segments";
              return (
                <div key={k} className={`flex flex-col bg-bg p-5 sm:p-6 ${tall ? "lg:row-span-2" : ""} ${k === "value" ? "bg-surface-accent" : ""}`}>
                  <p className="text-sm font-medium text-accent">{b.title}</p>
                  <p className={`mt-3 leading-snug text-ink ${k === "value" ? "text-xl" : "text-[0.9375rem]"}`}>{b.line}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-px grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2">
            {(["costs", "revenue"] as const).map((k) => {
              const b = BMC.find((x) => x.key === k)!;
              return (
                <div key={k} className="bg-bg p-5 sm:p-6">
                  <p className="text-sm font-medium text-accent">{b.title}</p>
                  <p className="mt-3 text-[0.9375rem] leading-snug text-ink">{b.line}</p>
                </div>
              );
            })}
          </div>
          <Disclosure summary="Full canvas detail">
            <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {BMC.map((b) => (
                <div key={b.key}>
                  <h3 className="text-sm font-medium text-accent">{b.title}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-ink-2">
                    {b.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  {b.note ? <p className="mt-2 text-xs text-muted">{b.note}</p> : null}
                </div>
              ))}
            </div>
          </Disclosure>
        </Container>
      </section>

      <ExecutiveSection
        id="differentiation"
        kicker="Differentiation"
        statement="This is where GAMYAA intends to build differentiated engineering depth."
        className="bg-surface-accent"
        wide
      >
        <p className="max-w-3xl">
          Intent, not a claim of superiority. GAMYAA did not invent requirements traceability or engineering assurance;
          existing tools do a great deal well. We keep the engineering systems that already work and aim to provide a
          connected assurance view across their evidence.
        </p>
        <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATION.map((d, i) => (
            <li key={d} className="flex gap-3 border-t border-line py-3 text-[0.9375rem] text-ink">
              <span className="w-6 shrink-0 font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {d}
            </li>
          ))}
        </ol>
        <Disclosure summary="How AEAIP intends to complement existing engineering tools">
          <div className="gx-scroll-x overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
              <caption className="sr-only">System categories and how AEAIP intends to complement them</caption>
              <thead>
                <tr className="border-b border-line">
                  {["System category", "Examples", "Primary purpose", "How AEAIP intends to complement it"].map((h) => (
                    <th key={h} scope="col" className="py-3 pr-4 font-normal text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {POSITIONING.map(([c, e, p, h]) => (
                  <tr key={c} className="border-b border-line align-top last:border-b-0">
                    <th scope="row" className="py-3 pr-4 font-medium text-ink">{c}</th>
                    <td className="py-3 pr-4 text-ink-2">{e}</td>
                    <td className="py-3 pr-4 text-ink-2">{p}</td>
                    <td className="py-3 text-ink">{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <StatusBadge status="roadmap" /> Named products are possible future integration targets only. Trademarks
            belong to their owners; naming them implies no partnership, endorsement or integration.
          </p>
        </Disclosure>
      </ExecutiveSection>

      <ExecutiveSection id="entry-market" kicker="Entry market" statement="Satellites and spacecraft first.">
        <p>
          One spacecraft programme connects nearly every assurance discipline, on one schedule, with no repair after
          launch. Depth there earns the trust of engineers who review evidence for a living.
        </p>
        <p className="mt-6 text-sm text-muted">Initial segments</p>
        <div className="mt-2">
          <Pills items={SEGMENTS_NOW} />
        </div>
        <p className="mt-6 text-sm text-muted">Later expansion (architecture intended to apply; not implemented)</p>
        <div className="mt-2">
          <Pills items={SEGMENTS_LATER} />
        </div>
        <Link href={aero("/aeaip/satellites-spacecraft")} className="link-arrow mt-6">
          Satellite and spacecraft assurance →
        </Link>
      </ExecutiveSection>

      {/* Roadmap */}
      <section id="roadmap" aria-labelledby="roadmap-title" data-ga-section="exec_roadmap" className="scroll-mt-28 bg-surface-accent py-20 md:py-28">
        <Container>
          <p className="kicker">Roadmap</p>
          <h2 id="roadmap-title" className="heading mt-5 max-w-3xl text-[2rem] text-ink sm:text-[2.75rem]">
            Six maturity stages. No dates.
          </h2>
          <p className="lede mt-4 max-w-2xl">There is no committed schedule. Every stage shows its truthful status.</p>
          <EvidenceLine
            className="mt-12"
            orientation="scroll"
            emphasize="none"
            active={0}
            label="AEAIP maturity stages"
            steps={AEAIP_STAGES.map((s) => ({ label: `${s.n} · ${s.title}`, note: s.items.join(" · ") }))}
          />
          <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {HORIZONS.map((h) => (
              <li key={h} className="border-t border-line pt-3">
                <p className="text-sm font-medium text-ink">{h}</p>
                <ul className="mt-2 space-y-2">
                  {AEAIP_STAGES.filter((s) => s.horizon === h).map((s) => (
                    <li key={s.n} className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
                      Stage {s.n} <StatusBadge status={s.status} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            DAQIP™ is In Development and AirCert AI™ is Planned; their capability status is on the{" "}
            <Link href={`${aero("/products")}#status`} className="text-accent underline">
              products page
            </Link>
            .
          </p>
        </Container>
      </section>

      <ExecutiveSection
        id="engagement"
        kicker="Strategic engagement"
        statement="Built in India. Designed for globally rigorous engineering programmes."
      >
        <p>
          Engineering teams, strategic partners and investors are welcome to start a conversation. We keep these roles
          distinct, so &ldquo;partner&rdquo; always means a verified relationship.
        </p>
        <Disclosure summary="Customers, users, partners and investors: how we use each word">
          <dl className="space-y-3 text-sm">
            {ROLES.map(([r, m]) => (
              <div key={r} className="grid gap-1 border-t border-line pt-3 sm:grid-cols-[12rem_1fr]">
                <dt className="font-medium text-ink">{r}</dt>
                <dd className="text-ink-2">{m}</dd>
              </div>
            ))}
          </dl>
        </Disclosure>
        <Disclosure summary="Enterprise deployment principles">
          <ul className="space-y-2 text-sm">
            {ENTERPRISE.map(([t, s]) => (
              <li key={t} className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-2">
                <span className="text-ink-2">{t}</span>
                <StatusBadge status={s} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Architecture = a principle being designed in; Planned = a planned enterprise requirement. None is implemented
            yet. No certifications such as SOC 2, ISO/IEC 27001 or CMMC are held or claimed.
          </p>
        </Disclosure>
      </ExecutiveSection>

      <section aria-label="About this page" className="pb-12">
        <Container>
          <p className="text-sm text-muted">
            GAMYAA AeroSystems — Engineering Assurance Research · Designed by{" "}
            <DesignerLink location="strategy_page" className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink" />{" "}
            · Last reviewed <time dateTime={AEAIP_REVIEWED.iso}>{AEAIP_REVIEWED.display}</time>
          </p>
        </Container>
      </section>

      <CtaBand
        title="Engage with GAMYAA on AEAIP™"
        body="We will be candid about what exists today."
        actions={
          <>
            <ButtonLink
              href={internalContact("assurance-problem")}
              ga={{ event: "contact_sales_click", params: { source_location: "strategy_page" } }}
              label="Discuss an Engineering Assurance Problem"
            >
              Discuss an Engineering Assurance Problem
            </ButtonLink>
            <ButtonLink
              href={internalContact("strategic-partnership")}
              variant="secondary"
              ga={{ event: "aeaip_partner_interest", params: { source_location: "strategy_page" } }}
              label="Explore a Strategic Partnership"
            >
              Explore a Strategic Partnership
            </ButtonLink>
            <ButtonLink
              href={internalContact("investor")}
              variant="secondary"
              ga={{ event: "aeaip_investor_interest", params: { source_location: "strategy_page" } }}
              label="Strategic / Investor Conversation"
            >
              Strategic / Investor Conversation
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
