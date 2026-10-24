import Link from "next/link";
import type { ReactNode } from "react";
import { DesignerLink } from "@/components/aeaip/learn";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  ArrowLink,
  ButtonLink,
  Container,
  JsonLd,
  Notice,
  Section,
  SectionHeader,
  SmartLink,
  StatusBadge,
} from "@/components/ui/primitives";
import { AEAIP_HREF, AEAIP_REVIEWED, AEAIP_STAGES, AEAIP_STRATEGY_HREF, type RoadmapStage } from "@/content/aeaip";
import { REFERENCES } from "@/content/references";
import type { Status } from "@/content/status";
import { cn } from "@/lib/cn";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { aero } from "@/lib/site";

const TITLE = "AEAIP™ Strategy — Vision, Business Model & Roadmap | Gamyaa AeroSystems";
const DESCRIPTION =
  "The AEAIP™ strategy for leadership, partners and investors: vision, mission, operating principles, Business Model Canvas, competitive positioning, differentiation and a maturity-based roadmap.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: AEAIP_STRATEGY_HREF });

const PRINCIPLES: Array<[string, string]> = [
  ["Evidence before assertion", "Every engineering conclusion should be traceable to objective evidence."],
  ["Human authority", "AI may assist; authorized people remain accountable."],
  ["Configuration fidelity", "Evidence is meaningful only in the context of the configuration it proves."],
  ["Explainability", "Readiness decisions must be understandable and reviewable."],
  ["Security by design", "Engineering evidence for aerospace and defence systems requires strong information protection."],
  ["Interoperability", "AEAIP should complement existing systems of record rather than forcing unnecessary replacement."],
  ["Status honesty", "Research, prototypes and roadmap items must never be presented as released capability."],
];

const ROLES: Array<[string, string, string]> = [
  ["Customer", "The organisation that adopts and pays for AEAIP.", "A satellite manufacturer, space-system integrator or aerospace supplier."],
  ["User", "The people who work in AEAIP every day.", "Systems, verification, test, quality, software, cybersecurity and certification engineers; review boards."],
  ["Economic buyer", "The person accountable for the outcome and the budget.", "Chief Engineer, CTO / VP Engineering, Programme Director, Head of Mission or Product Assurance."],
  ["Technology integration ecosystem", "Engineering tools AEAIP is intended to connect to. Not partners unless an agreement exists.", "Requirements, PLM, MBSE, test, quality and source-control systems."],
  ["Engineering partner", "An organisation GAMYAA works with on engineering problems or validation.", "Test laboratories, metrology organisations, systems-engineering specialists."],
  ["Strategic partner", "An organisation that shapes or extends the platform's reach in a market.", "Space and defence ecosystem organisations, integrators, research collaborators."],
  ["Investor", "A party that funds the company. Not a customer and not a partner by default.", "Strategic or financial investors."],
];

const BMC: Record<string, { title: string; items: string[]; note?: string }> = {
  partners: {
    title: "Key Partners",
    items: [
      "Aerospace engineering organisations",
      "Test laboratories",
      "Metrology and inspection organisations",
      "Space and defence ecosystem partners",
      "Requirements / PLM / ALM integration ecosystems",
      "Systems-engineering specialists",
      "Certification and assurance specialists",
      "Academic and research collaborators, where appropriate",
    ],
    note: "Categories. Named partners appear only where a relationship is verified.",
  },
  activities: {
    title: "Key Activities",
    items: [
      "Platform engineering",
      "Evidence-graph development",
      "Assurance reasoning",
      "Aerospace domain modelling",
      "Framework mapping",
      "Cybersecurity",
      "Enterprise integration",
      "Customer validation",
      "Product assurance",
    ],
  },
  resources: {
    title: "Key Resources",
    items: [
      "Aerospace systems expertise",
      "Verification and validation expertise",
      "Quality and manufacturing expertise",
      "Certification expertise",
      "Cybersecurity expertise",
      "Software, data and AI engineering",
      "Engineering ontology / evidence graph",
      "Customer programme knowledge",
    ],
  },
  value: {
    title: "Value Proposition",
    items: [
      "What is verified",
      "What evidence proves it",
      "Whether that evidence applies to the current configuration",
      "What is missing",
      "What changed",
      "What must be reverified",
      "What prevents the next readiness decision",
    ],
  },
  relationships: {
    title: "Customer Relationships",
    items: [
      "Engineering discovery",
      "Pilot / proof-of-value",
      "Enterprise deployment",
      "Programme integration",
      "Ongoing assurance workflows",
      "Support and domain configuration",
    ],
  },
  channels: {
    title: "Channels",
    items: [
      "Direct enterprise sales",
      "Engineering pilots",
      "Strategic partnerships",
      "Industry ecosystem",
      "Technical content and engineering education",
      "Conference and industry engagement",
      "Partner integrations",
    ],
  },
  segments: {
    title: "Customer Segments",
    items: [
      "Initial: satellite and spacecraft startups",
      "Initial: private-space companies",
      "Initial: aerospace and defence manufacturers",
      "Initial: space-system integrators",
      "Initial: aerospace MSMEs and subsystem suppliers",
      "Initial: quality and mission-assurance organisations",
      "Later: launch-vehicle organisations",
      "Later: defence primes and system integrators",
      "Later: aircraft and advanced-air-mobility programmes",
      "Later: international aerospace organisations",
    ],
  },
  costs: {
    title: "Cost Structure",
    items: [
      "R&D",
      "Domain experts",
      "Enterprise software engineering",
      "Security",
      "Integration",
      "Customer pilots",
      "Infrastructure",
      "Testing",
      "Compliance and legal",
      "Business development",
    ],
  },
  revenue: {
    title: "Revenue Streams (proposed)",
    items: [
      "Paid engineering pilot / proof-of-value",
      "Enterprise annual software subscription",
      "Private-cloud / on-premise deployment tier",
      "Controlled / air-gapped deployment (roadmap)",
      "Integration services",
      "Specialised assurance and domain packs",
      "Enterprise support",
    ],
    note: "Proposed model, not final. No prices are published.",
  },
};

const POSITIONING: Array<[string, string, string, string]> = [
  [
    "Requirements management / ALM",
    "IBM DOORS / DOORS Next, Jama Connect, Siemens Polarion and similar",
    "Requirements authoring, traceability, verification tracking, change and review workflows.",
    "Use them as the requirements system of record; add configuration-aware evidence validity and gate readiness across tool boundaries.",
  ],
  [
    "PLM / engineering data",
    "Siemens Teamcenter and other PLM systems",
    "Product structure, parts, revisions and engineering change.",
    "Use their configuration data as the source of truth for what changed and where.",
  ],
  [
    "MBSE",
    "SysML-based modelling environments",
    "Architecture, behaviour and requirement relationships as models.",
    "Treat model elements and model versions as nodes and evidence context.",
  ],
  [
    "Test, simulation and lab systems",
    "Test benches, HIL rigs, simulation tools such as MATLAB / Simulink",
    "Producing test and analysis results.",
    "Link results to the configuration and procedure that produced them.",
  ],
  [
    "Quality, inspection and FAI",
    "QMS, inspection and metrology systems",
    "Manufacturing quality, FAI, nonconformance and corrective action.",
    "Bring product-conformity evidence into system readiness, with DAQIP™ for depth.",
  ],
  [
    "Issue management and source control",
    "Jira, GitHub, GitLab and similar",
    "Defects, tasks, code and builds.",
    "Link anomalies, fixes and builds to the requirements and evidence they affect.",
  ],
  [
    "New AI-assisted assurance tools",
    "Emerging requirements-quality, traceability and certification tools",
    "Specific assurance tasks, often within one discipline.",
    "Focus on aerospace, defence and space system readiness with human-authority governance.",
  ],
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

const ENTERPRISE: Array<[string, string, Status]> = [
  ["Data residency", "Customer chooses where engineering evidence is stored.", "architecture"],
  ["Private cloud", "Deployment in the customer's own cloud tenancy.", "planned"],
  ["On-premise deployment", "Deployment inside the customer's facility.", "planned"],
  ["Air-gapped / controlled environments", "Operation without external connectivity, for controlled programmes.", "roadmap"],
  ["Role-based access control", "Access by role, programme and data classification.", "architecture"],
  ["Audit trail", "Every change, suggestion and approval recorded.", "architecture"],
  ["Data provenance", "Origin and integrity of every evidence record.", "architecture"],
  ["Encryption", "In transit and at rest.", "architecture"],
  ["Single sign-on", "Integration with enterprise identity providers.", "planned"],
  ["Export-control awareness", "Handling of controlled technical data by classification and jurisdiction.", "architecture"],
  ["Customer data isolation", "No commingling of one customer's engineering data with another's.", "architecture"],
];

const HORIZONS: RoadmapStage["horizon"][] = ["Current", "Near-term", "Research", "Long-term Vision"];

function BmcBlock({ k, className }: { k: keyof typeof BMC; className?: string }) {
  const b = BMC[k];
  return (
    <section aria-labelledby={`bmc-${k}`} className={cn("flex flex-col bg-surface p-5", className)}>
      <h3 id={`bmc-${k}`} className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-accent">
        {b.title}
      </h3>
      <ul className="mt-3 flex-1 space-y-1.5 text-sm leading-snug text-ink-2">
        {b.items.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="mt-[0.6em] h-px w-2 shrink-0 bg-steel" />
            {i}
          </li>
        ))}
      </ul>
      {b.note ? <p className="mt-3 border-t border-line pt-2 text-xs text-subtle">{b.note}</p> : null}
    </section>
  );
}

function Block({ id, eyebrow, title, lede, children, className }: { id: string; eyebrow: string; title: ReactNode; lede?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`} section={`strategy_${id}`} className={cn("scroll-mt-28", className)}>
      <Container>
        <SectionHeader eyebrow={eyebrow} id={`${id}-title`} title={title} lede={lede} />
        <div className="mt-10">{children}</div>
      </Container>
    </Section>
  );
}

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
        eyebrow="AEAIP™ strategy · For leadership, partners and investors"
        title="The business of Engineering Assurance Intelligence"
        lede="How GAMYAA intends to build AEAIP: the problem, the customer, the business model, the differentiation and a staged roadmap. Written for CEOs, CTOs, technical leadership, strategic partners and investors."
      >
        <Notice className="mt-8 max-w-3xl">
          This page describes strategy and intent. AEAIP is at Research &amp; Architecture status. Nothing here is a
          commitment to dates, a financial projection, or an offer or solicitation of securities.
        </Notice>
      </PageHero>

      {/* Vision & mission */}
      <Section labelledBy="vision-title" section="strategy_vision">
        <Container className="grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
          <div className="bg-surface p-6 sm:p-10">
            <h2 id="vision-title" className="eyebrow">
              Vision
            </h2>
            <p className="heading mt-5 text-2xl text-ink sm:text-3xl">
              To become a trusted Engineering Assurance Intelligence layer for critical aerospace, defence and space
              systems.
            </p>
          </div>
          <div className="bg-surface p-6 sm:p-10">
            <h2 className="eyebrow">Mission</h2>
            <p className="heading mt-5 text-2xl text-ink sm:text-3xl">
              Transform fragmented engineering requirements, configurations and evidence into continuous, traceable and
              decision-ready assurance from concept to operation.
            </p>
          </div>
        </Container>
      </Section>

      <Block id="principles" eyebrow="Operating principles" title="How we make decisions">
        <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map(([t, b], i) => (
            <li key={t} className="bg-surface p-6">
              <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-medium text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{b}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block
        id="problem"
        eyebrow="The problem"
        title="Readiness is decided on evidence that is expensive to assemble and easy to get wrong"
        className="bg-surface-accent"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
            <p>
              Every critical aerospace programme ends up asking the same question at every gate: can we prove this
              system is ready? The evidence exists, spread across requirements tools, PLM, test systems, quality systems,
              spreadsheets and email. Assembling it into a review package is manual, and it is rebuilt for every review.
            </p>
            <p>
              The costly failure is not missing evidence; it is evidence that looks complete but no longer applies to the
              configuration under review. It is found late, in audits, test anomalies or acceptance reviews, when fixing
              it means retest, schedule slip or a waiver.
            </p>
            <p>
              The buyer is the person accountable for that decision: the Chief Engineer, the head of mission or product
              assurance, the programme director. The value is fewer surprises at gates, less effort per review, and a
              readiness position they can defend.
            </p>
          </div>
          <div className="border border-line bg-surface p-6">
            <p className="eyebrow">Market context (sourced)</p>
            <ul className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
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
                The Department of Space has stated in Parliament (24 July 2025) that its initiatives converge on the
                IN-SPACe Decadal Vision target of a USD 44 billion Indian space economy by 2033.{" "}
                <SmartLink href={pib.url} className="text-accent underline">
                  Source: Press Information Bureau
                </SmartLink>
                .
              </li>
              <li>
                More private teams building spacecraft means more programmes that need verification, review and
                readiness discipline, often without large assurance departments.
              </li>
            </ul>
            <p className="mt-5 border-t border-line pt-3 text-xs text-subtle">
              We do not use third-party market-size estimates on this page. Each figure cites an official source and
              date.
            </p>
          </div>
        </div>
      </Block>

      <Block
        id="roles"
        eyebrow="Who is who"
        title="Customers, users, buyers, partners and investors are different"
        lede="We keep these roles separate, so that “partner” always means a verified relationship."
      >
        <div className="gx-scroll-x overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Stakeholder roles</caption>
            <thead>
              <tr className="border-b border-line">
                {["Role", "Meaning", "Examples (categories)"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLES.map(([r, m, e]) => (
                <tr key={r} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-4 py-3 font-medium text-ink">{r}</th>
                  <td className="px-4 py-3 text-ink-2">{m}</td>
                  <td className="px-4 py-3 text-ink-2">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block
        id="business-model"
        eyebrow="Business Model Canvas"
        title="AEAIP Business Model Canvas"
        lede="Strategic, public-facing view. No confidential financial assumptions; revenue streams are proposed, not final."
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          <BmcBlock k="partners" className="lg:row-span-2" />
          <BmcBlock k="activities" />
          <BmcBlock k="value" className="lg:row-span-2" />
          <BmcBlock k="relationships" />
          <BmcBlock k="segments" className="lg:row-span-2" />
          <BmcBlock k="resources" />
          <BmcBlock k="channels" />
        </div>
        <div className="grid gap-px overflow-hidden border border-t-0 border-line bg-line md:grid-cols-2">
          <BmcBlock k="costs" />
          <BmcBlock k="revenue" />
        </div>
      </Block>

      <Block
        id="positioning"
        eyebrow="Competitive positioning"
        title="Keep the engineering systems that already work"
        lede="AEAIP is intended to provide a connected assurance view across their evidence. GAMYAA did not invent requirements traceability or engineering assurance, and these tools already do a great deal well."
      >
        <div className="gx-scroll-x overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">System categories and how AEAIP intends to complement them</caption>
            <thead>
              <tr className="border-b border-line">
                {["System category", "Examples", "Primary purpose", "How AEAIP intends to complement it"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POSITIONING.map(([c, e, p, h]) => (
                <tr key={c} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-4 py-3 font-medium text-ink">{c}</th>
                  <td className="px-4 py-3 text-ink-2">{e}</td>
                  <td className="px-4 py-3 text-ink-2">{p}</td>
                  <td className="px-4 py-3 text-ink">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-ink">Integration roadmap</h3>
              <StatusBadge status="roadmap" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Intended integration categories: requirements management, ALM, PLM, MBSE, source control, issue management,
              simulation, test systems, MES, QMS, inspection and metrology systems, and supplier systems.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Future integration targets may include DOORS / DOORS Next, Jama Connect, Polarion, Teamcenter, Jira,
              GitHub / GitLab, MATLAB / Simulink, and MES and test systems. None is implemented today.
            </p>
          </div>
          <p className="self-end text-xs leading-relaxed text-subtle">
            Product names are trademarks of their respective owners and are named only to describe tool categories and
            possible future integration targets. Naming them does not imply a partnership, endorsement or integration.
            No unsupported comparison of capabilities is made.
          </p>
        </div>
      </Block>

      <Block
        id="differentiation"
        eyebrow="Strategic differentiation"
        title="This is where GAMYAA intends to build differentiated engineering depth"
        lede="Intent, not a claim of superiority. We do not say no one else does these things; we say this is the combination we are committed to building."
      >
        <ol className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATION.map((d, i) => (
            <li key={d} className="flex gap-3 border-b border-line pb-3 text-[0.9375rem] text-ink">
              <span className="w-6 shrink-0 font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {d}
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            ["AEAIP™", "System-level verification and readiness.", AEAIP_HREF],
            ["DAQIP™", "Manufacturing assurance: drawings, FAI, inspection and product conformity.", aero("/daqip")],
            ["AirCert AI™", "Certification assurance: compliance planning and certification evidence.", aero("/aircert-ai")],
          ].map(([n, b, h]) => (
            <div key={n} className="card p-6">
              <h3 className="text-xl font-medium text-ink">{n}</h3>
              <p className="mt-2 text-sm text-ink-2">{b}</p>
              <ArrowLink href={h} className="mt-3 text-sm">
                {n}
              </ArrowLink>
            </div>
          ))}
        </div>
      </Block>

      <Block
        id="roadmap"
        eyebrow="Product evolution"
        title="A maturity-based roadmap"
        lede="Stages, not dates. There is no committed schedule, and every stage shows its truthful status."
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
          {HORIZONS.map((h) => (
            <div key={h} className="bg-surface p-5 sm:p-6">
              <p className="eyebrow">{h}</p>
              <ol className="mt-4 space-y-5">
                {AEAIP_STAGES.filter((s) => s.horizon === h).map((s) => (
                  <li key={s.n}>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">Stage {s.n}</p>
                    <h3 className="mt-1 text-lg font-medium text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink-2">{s.items.join(" · ")}</p>
                    <StatusBadge status={s.status} className="mt-3" />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          DAQIP™ is In Development and AirCert AI™ is Planned; their capability roadmaps are on the{" "}
          <Link href={`${aero("/products")}#roadmap`} className="text-accent underline">
            product roadmap
          </Link>
          .
        </p>
      </Block>

      <Block
        id="enterprise"
        eyebrow="Enterprise and international readiness"
        title="Built in India. Designed for globally rigorous engineering programs."
        lede="Enterprise concerns are addressed at architecture level. Each item shows whether it is an architecture principle, a planned enterprise requirement or a roadmap item. None is implemented yet, and no international deployments are claimed."
      >
        <ul className="divide-y divide-line border-y border-line">
          {ENTERPRISE.map(([t, b, s]) => (
            <li key={t} className="grid gap-2 py-4 sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-6">
              <span className="font-medium text-ink">{t}</span>
              <span className="text-sm text-ink-2">{b}</span>
              <span>
                <StatusBadge status={s} />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Architecture = an architecture principle being designed in. Planned = a planned enterprise requirement. No
          certifications such as SOC 2, ISO/IEC 27001 or CMMC are held or claimed.
        </p>
      </Block>

      <Section labelledBy="authorship-title" section="strategy_authorship">
        <Container>
          <h2 id="authorship-title" className="sr-only">
            About this page
          </h2>
          <p className="text-sm text-muted">
            GAMYAA AeroSystems — Engineering Assurance Research · Designed by{" "}
            <DesignerLink location="strategy_page" className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink" />{" "}
            · Last reviewed <time dateTime={AEAIP_REVIEWED.iso}>{AEAIP_REVIEWED.display}</time>
          </p>
        </Container>
      </Section>

      <CtaBand
        title="Engage with GAMYAA on AEAIP™"
        body="Engineering teams, strategic partners and investors are welcome to start a conversation. We will be candid about what exists today."
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
