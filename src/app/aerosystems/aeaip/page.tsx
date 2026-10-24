import {
  ChangeImpactFigure,
  CoreModel,
  EngineArchitecture,
  EvidenceGraphFigure,
  GateRail,
  KeyQuestions,
  PtfFigure,
  ValidityFigure,
} from "@/components/aeaip/diagrams";
import { DesignerLink, KnowledgeIndex } from "@/components/aeaip/learn";
import { DemoPreview } from "@/components/aeaip/demo-preview";
import { FlowChain } from "@/components/diagrams/flow";
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
  StatusBadge,
} from "@/components/ui/primitives";
import {
  AEAIP,
  AEAIP_CAPABILITIES,
  AEAIP_DEMO_HREF,
  AEAIP_HREF,
  AEAIP_REVIEWED,
  AEAIP_STAGES,
  AEAIP_STRATEGY_HREF,
  AI_NEVER,
  CYBER_CHAIN,
  READINESS_QUESTIONS,
  SPECIALISED_PLATFORMS,
} from "@/content/aeaip";
import { METHOD_FAMILIES } from "@/content/verification-methods";
import { PRODUCT_STATUS, STATUS_AS_OF, STATUS_LABEL } from "@/content/status";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { aero } from "@/lib/site";

const TITLE = "AEAIP™ | Aerospace Engineering Assurance Intelligence Platform";
const DESCRIPTION =
  "AEAIP™ connects requirements, configuration, evidence, verification and readiness for defence, aerospace and space systems, starting with satellites and spacecraft. Research & Architecture.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: AEAIP_HREF, hasOwnOgImage: true });

const L = (slug: string) => aero(`/aeaip/${slug}`);

export default function AeaipPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({
          name: TITLE,
          description: DESCRIPTION,
          href: AEAIP_HREF,
          dateModified: AEAIP_REVIEWED.iso,
          about: ["Engineering assurance", "Spacecraft verification", "Requirements traceability", "Configuration management"],
        })}
      />

      {/* 1 · Hero */}
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "AEAIP™", href: AEAIP_HREF },
            ]}
          />
        }
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <span>
              {AEAIP.platformNo} · {AEAIP.category}
            </span>
            <StatusBadge status={PRODUCT_STATUS.aeaip} />
          </span>
        }
        title={
          <>
            AEAIP™{" "}
            <span className="mt-3 block text-2xl font-medium tracking-tight text-ink-2 sm:text-3xl lg:text-4xl">
              {AEAIP.expanded}
            </span>
          </>
        }
      >
        <p className="heading mt-8 max-w-3xl text-xl text-ink sm:text-2xl">{AEAIP.promise}</p>
        <FlowChain className="mt-8" label="AEAIP core engineering chain" steps={AEAIP.chain} />
        <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink
            href={AEAIP_DEMO_HREF}
            ga={{ event: "aeaip_demo_open", params: { source_location: "aeaip_hero" } }}
            label="Explore Interactive Assurance Demo"
          >
            Explore Interactive Assurance Demo
          </ButtonLink>
          <ButtonLink
            href={internalContact("aeaip")}
            variant="secondary"
            ga={{ event: "contact_sales_click", params: { source_location: "aeaip_hero" } }}
            label="Discuss AEAIP"
          >
            Discuss AEAIP™
          </ButtonLink>
        </div>
        <Notice className="mt-8 max-w-3xl">
          <strong className="text-ink">Research &amp; Architecture.</strong> AEAIP is not released software. This page
          describes what it is designed to do; the interactive demo uses fictitious data. Every capability below carries
          its current status.
        </Notice>
      </PageHero>

      {/* 2 · What AEAIP is, and the question it answers */}
      <Section labelledBy="what-is-aeaip" section="aeaip_definition">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="what-is-aeaip" className="heading text-3xl text-ink">
              What is AEAIP?
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-relaxed tracking-tight text-ink sm:text-2xl">{AEAIP.definition}</p>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-[0.9375rem] sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Made by</dt>
                <dd className="mt-2 text-ink-2">Gamyaa AeroSystems, Bangalore, India</dd>
              </div>
              <div>
                <dt className="eyebrow">Initial engineering focus</dt>
                <dd className="mt-2 text-ink-2">{AEAIP.initialFocus}</dd>
              </div>
              <div>
                <dt className="eyebrow">Status ({STATUS_AS_OF})</dt>
                <dd className="mt-2 text-ink-2">{STATUS_LABEL[PRODUCT_STATUS.aeaip]} · not released</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section id="problem" labelledBy="problem-title" section="aeaip_problem" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="The problem AEAIP addresses"
              id="problem-title"
              title={AEAIP.question}
              lede={
                <>
                  <p>
                    Requirements live in one tool, configuration in another, test reports in a third, and NCRs, anomalies
                    and waivers in a fourth. Before every review, engineers rebuild the connections by hand.
                  </p>
                  <p className="mt-4">
                    The hard part is rarely producing evidence. It is knowing whether the evidence you have still proves
                    what you need, for the exact system you are about to test, ship or fly.
                  </p>
                </>
              }
            />
          </div>
          <div className="space-y-8 lg:col-span-7">
            {READINESS_QUESTIONS.map((g) => (
              <div key={g.group}>
                <h3 className="eyebrow mb-3">{g.group}</h3>
                <KeyQuestions items={g.items} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3 · Core model */}
      <Section labelledBy="model-title" section="core_model">
        <Container>
          <SectionHeader
            eyebrow="Core engineering model"
            id="model-title"
            title="Requirement → Configuration → Evidence → Verification → Readiness"
            lede="Configuration sits between requirement and evidence on purpose: evidence proves a requirement only for the configuration it was produced on."
          />
          <div className="mt-10">
            <CoreModel detailed />
          </div>
        </Container>
      </Section>

      {/* 4 · Engineering Evidence Graph */}
      <Section labelledBy="graph-title" section="evidence_graph">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Core technology 01"
              id="graph-title"
              title="Engineering Evidence Graph™"
              lede="The traceability and engineering-context model. Every node knows its revision, its configuration, where it came from and who approved it, so the graph can be walked from a mission need to a test result and back."
            />
            <p className="mt-6 flex items-center gap-3 text-sm text-muted">
              <StatusBadge status="architecture" /> Data model in definition.
            </p>
            <ArrowLink
              href={L("engineering-evidence-graph")}
              className="mt-6"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "evidence_graph", source_location: "aeaip_body" } }}
            >
              How the Engineering Evidence Graph works
            </ArrowLink>
          </div>
          <div className="lg:col-span-8">
            <EvidenceGraphFigure compact />
          </div>
        </Container>
      </Section>

      {/* 5 · Assurance Intelligence Engine */}
      <Section id="engine" labelledBy="engine-title" section="engine">
        <Container>
          <SectionHeader
            eyebrow="Core technology 02"
            id="engine-title"
            title="Assurance Intelligence Engine™"
            lede="Reasons over the Engineering Evidence Graph to show coverage, gaps, stale evidence, configuration mismatches and what blocks the next gate. It prepares the picture. People make the decision."
          />
          <div className="mt-10">
            <EngineArchitecture />
          </div>
        </Container>
      </Section>

      {/* 6 · Human authority */}
      <Section labelledBy="authority-title" section="human_authority" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Human authority model" id="authority-title" title={AEAIP.governance} />
            <p className="lede mt-5">
              AI is an enabling capability inside engineering workflows, not a separate platform and not an approver.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ol className="divide-y divide-line border-y border-line">
              {[
                ["AI assists", "Interprets requirements, suggests trace links, classifies evidence and drafts gap lists. Every suggestion is labelled and reviewable."],
                ["Engineers verify", "Engineers accept, correct or reject each suggestion, assess results and propose closure."],
                ["Authorized authorities approve", "Closure, risk acceptance and readiness are recorded decisions by named, authorised people: a chief engineer, review board, quality or certification authority."],
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
            <div className="mt-8 border border-line bg-surface p-5">
              <p className="eyebrow">AI in AEAIP never</p>
              <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-[0.9375rem] text-ink-2 sm:grid-cols-2">
                {AI_NEVER.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-[var(--danger)]" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7 · Initial focus */}
      <Section labelledBy="focus-title" section="initial_focus">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Initial engineering focus"
              id="focus-title"
              title="Satellites & Spacecraft"
              lede="Architected broadly, proven deeply in one domain first. A spacecraft programme connects nearly every assurance discipline in one product, on one schedule, with no chance to repair it after launch."
            />
            <ArrowLink
              href={L("satellites-spacecraft")}
              className="mt-6"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "satellite_assurance", source_location: "aeaip_body" } }}
            >
              Satellite and spacecraft assurance in depth
            </ArrowLink>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">One programme, every discipline</p>
            <ul className="flex flex-wrap gap-2">
              {[
                "Mission requirements",
                "Systems engineering",
                "Hardware",
                "Software",
                "Avionics",
                "Power",
                "Thermal",
                "Structures",
                "ADCS",
                "Communications",
                "Payloads",
                "Cybersecurity",
                "Manufacturing",
                "Environmental qualification",
                "Integration",
                "Test",
                "Mission readiness",
                "Operations",
                "Telemetry",
              ].map((x) => (
                <li key={x} className="border border-line-strong bg-surface px-3 py-1.5 text-sm text-ink-2">
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow">First deep implementation</p>
                <p className="mt-2 text-[0.9375rem] text-ink">Satellites &amp; spacecraft</p>
              </div>
              <div>
                <p className="eyebrow">Later expansion directions</p>
                <p className="mt-2 text-[0.9375rem] text-ink-2">
                  Launch systems, defence aerospace systems, aircraft and advanced aerospace systems. The architecture is
                  intended to apply; these implementations do not exist yet.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8 · Configurable Assurance Gates */}
      <Section labelledBy="gates-title" section="assurance_gates">
        <Container>
          <SectionHeader
            eyebrow="Configurable Assurance Gates"
            id="gates-title"
            title="Readiness, gate by gate"
            lede="AEAIP does not hard-code one organisation's lifecycle. Each programme defines its reviews, their order, entrance and success criteria, and the evidence each one needs. The satellite demo uses the illustrative sequence below."
          />
          <div className="mt-10">
            <GateRail highlight="TRR" />
          </div>
          <ArrowLink
            href={L("review-gates")}
            className="mt-4"
            ga={{ event: "aeaip_reference_open", params: { reference_category: "reviews", source_location: "aeaip_body" } }}
          >
            What each review is for, and the evidence it needs
          </ArrowLink>
        </Container>
      </Section>

      {/* 9 · Verification methods */}
      <Section labelledBy="methods-title" section="verification_methods">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Verification methods"
              id="methods-title"
              title="From inspection to hardware-in-the-loop"
              lede="AEAIP is designed to hold evidence from classical, model-based, software, security and operational verification in one model. Methods are selected per requirement and programme."
            />
            <ArrowLink
              href={`${L("verification-validation")}#methods`}
              className="mt-6"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "verification", source_location: "aeaip_body" } }}
            >
              The verification method taxonomy
            </ArrowLink>
          </div>
          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {METHOD_FAMILIES.map((f) => (
              <li key={f.id} className="bg-surface p-5">
                <h3 className="text-[1.0625rem] font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.methods
                    .slice(0, 4)
                    .map((m) => m.name)
                    .join(" · ")}
                  {f.methods.length > 4 ? ` · +${f.methods.length - 4} more` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 10–11 · DAQIP and AirCert within AEAIP */}
      <Section labelledBy="specialised-title" section="specialised_platforms">
        <Container>
          <SectionHeader
            eyebrow="Specialized assurance platforms"
            id="specialised-title"
            title="Manufacturing and certification assurance, inside one architecture"
            lede="AEAIP owns the system-level chain from requirement to readiness. Two specialised platforms provide depth where the evidence is most demanding."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {SPECIALISED_PLATFORMS.map((p) => (
              <li key={p.key} className="card flex flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">
                    {p.no} · {p.category}
                  </span>
                  <StatusBadge status={PRODUCT_STATUS[p.key as "daqip" | "aircert"]} />
                </div>
                <h3 className="mt-6 text-3xl font-medium tracking-tight text-ink">{p.name}</h3>
                <p className="mt-1 text-[0.9375rem] font-medium text-ink-2">{p.expanded}</p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {p.key === "daqip"
                    ? "Drawing intelligence, First Article Inspection and AS9102 workflows, inspection and measurement evidence, supplier quality, NCR and deviation evidence, and quality approval. In AEAIP terms: the evidence that the product was built to its design."
                    : "Certification basis, airworthiness requirements, compliance and verification planning, safety and qualification evidence, compliance matrices and approval workflows. In AEAIP terms: the evidence a certification authority reviews."}
                </p>
                <ArrowLink
                  href={p.href}
                  className="mt-6 self-start"
                  ga={{ event: "platform_card_click", params: { platform: p.key as "daqip" | "aircert", source_location: "aeaip_body" } }}
                >
                  {p.cta}
                </ArrowLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 12 · Cybersecurity */}
      <Section labelledBy="cyber-title" section="cybersecurity_assurance">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Cybersecurity assurance"
              id="cyber-title"
              title="Security is part of assurance"
              lede="A security finding is handled like an NCR: traced to the requirement and configuration it affects, remediated, retested and closed by an authorised reviewer."
            />
            <p className="mt-6 flex items-center gap-3 text-sm text-muted">
              <StatusBadge status="research" />
            </p>
            <ArrowLink
              href={L("cybersecurity-assurance")}
              className="mt-4"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "cybersecurity", source_location: "aeaip_body" } }}
            >
              Cybersecurity as engineering assurance
            </ArrowLink>
          </div>
          <div className="lg:col-span-8">
            <FlowChain label="Cybersecurity assurance chain" steps={CYBER_CHAIN} numbered />
          </div>
        </Container>
      </Section>

      {/* 13 · Configuration-aware evidence validity */}
      <Section labelledBy="validity-title" section="evidence_validity">
        <Container>
          <SectionHeader
            eyebrow="Key differentiator"
            id="validity-title"
            title="Configuration-Aware Evidence Validity"
            lede="Evidence is not useful merely because it exists. AEAIP is designed to determine whether evidence applies to the exact requirement baseline, hardware and software configuration, test article and verification context now under review."
          />
          <div className="mt-10">
            <ValidityFigure />
          </div>
          <ArrowLink
            href={L("configuration-assurance")}
            className="mt-4"
            ga={{ event: "aeaip_reference_open", params: { reference_category: "configuration", source_location: "aeaip_body" } }}
          >
            Why verified evidence can stop being valid
          </ArrowLink>
        </Container>
      </Section>

      {/* 14 · Continuous assurance */}
      <Section labelledBy="continuous-title" section="continuous_assurance">
        <Container>
          <SectionHeader
            eyebrow="Continuous Engineering Assurance"
            id="continuous-title"
            title="When something changes, see what it touches"
            lede="Instead of re-checking readiness before each review, AEAIP is intended to follow each engineering change through the graph as it happens."
          />
          <div className="mt-10">
            <ChangeImpactFigure />
          </div>
          <ArrowLink
            href={L("continuous-assurance")}
            className="mt-4"
            ga={{ event: "aeaip_reference_open", params: { reference_category: "continuous_assurance", source_location: "aeaip_body" } }}
          >
            Change impact, suspect evidence and reverification
          </ArrowLink>
        </Container>
      </Section>

      {/* 15 · Predicted → Tested → Flown */}
      <Section labelledBy="ptf-title" section="operational_evidence">
        <Container>
          <SectionHeader
            eyebrow="Operational evidence"
            id="ptf-title"
            title="Predicted → Tested → Flown"
            lede="One requirement, followed from the model that predicted it, through the test that measured it, to the telemetry that shows how it actually behaved. Digital twins and telemetry are evidence sources inside AEAIP, not separate platforms."
          />
          <div className="mt-10">
            <PtfFigure />
          </div>
          <ArrowLink
            href={L("operational-evidence")}
            className="mt-4"
            ga={{ event: "aeaip_reference_open", params: { reference_category: "operational_evidence", source_location: "aeaip_body" } }}
          >
            Simulation, qualification and flight telemetry as one evidence chain
          </ArrowLink>
        </Container>
      </Section>

      {/* 16 · Demo preview (static; the interactive demo is its own route) */}
      <Section labelledBy="demo-title" section="demo_preview" className="bg-surface-accent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Interactive demo"
              id="demo-title"
              title="Are we ready for TRR?"
              lede="Explore a fictitious small satellite: pick a review gate and a subsystem, open an issue, and follow it from requirement to authorised review. Then watch verified evidence become stale when the configuration changes."
            />
            <ButtonLink
              href={AEAIP_DEMO_HREF}
              className="mt-8"
              ga={{ event: "aeaip_demo_open", params: { source_location: "aeaip_body" } }}
              label="Explore Interactive Assurance Demo"
            >
              Explore Interactive Assurance Demo
            </ButtonLink>
            <p className="mt-4 text-sm text-muted">Illustrative engineering assurance demonstration. Not a flight-safety or certification determination.</p>
          </div>
          <div className="lg:col-span-7">
            <DemoPreview />
          </div>
        </Container>
      </Section>

      {/* 17–18 · Standards and integration philosophy */}
      <Section labelledBy="philosophy-title" section="philosophy">
        <Container>
          <h2 id="philosophy-title" className="sr-only">
            Standards and integration philosophy
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="card flex flex-col p-6 sm:p-8">
              <p className="eyebrow">Standards &amp; framework mapping</p>
              <h3 className="mt-4 text-2xl font-medium tracking-tight text-ink">Map to frameworks. Never claim them.</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                AEAIP is designed to map engineering evidence and workflows against applicable engineering, assurance,
                quality, safety, cybersecurity and certification frameworks. Mapping evidence to a framework is not the
                same as compliance with it, and AEAIP holds no compliance certification.
              </p>
              <ArrowLink
                href={L("standards-frameworks")}
                className="mt-6 self-start"
                ga={{ event: "aeaip_reference_open", params: { reference_category: "standards", source_location: "aeaip_body" } }}
              >
                Standards &amp; framework mapping
              </ArrowLink>
            </article>
            <article className="card flex flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow">Integration philosophy</p>
                <StatusBadge status="roadmap" />
              </div>
              <h3 className="mt-4 text-2xl font-medium tracking-tight text-ink">
                Keep the engineering systems that already work.
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                Requirements, PLM, MBSE, test and quality systems remain the systems of record. AEAIP is intended to
                provide a connected assurance view across their evidence. No integrations are implemented today.
              </p>
              <ArrowLink href={`${AEAIP_STRATEGY_HREF}#positioning`} className="mt-6 self-start">
                How AEAIP intends to complement existing tools
              </ArrowLink>
            </article>
          </div>
        </Container>
      </Section>

      {/* 19 · Roadmap and status */}
      <Section id="status" labelledBy="status-title" section="aeaip_status">
        <Container>
          <SectionHeader
            eyebrow={`Status as of ${STATUS_AS_OF}`}
            id="status-title"
            title="What exists, and what does not"
            lede="Research and roadmap items are never presented as released capability."
          />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {AEAIP_CAPABILITIES.map((c) => (
              <li key={c.id} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                <div>
                  {c.href ? (
                    <ArrowLink href={c.href} className="min-h-0 text-[1.0625rem]">
                      {c.title}
                    </ArrowLink>
                  ) : (
                    <p className="text-[1.0625rem] font-medium text-ink">{c.title}</p>
                  )}
                  <p className="mt-0.5 text-sm text-muted">{c.summary}</p>
                </div>
                <span>
                  <StatusBadge status={c.status} />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <p className="eyebrow mb-4">Product evolution — maturity stages, no dates</p>
            <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
              {AEAIP_STAGES.map((s) => (
                <li key={s.n} className="flex flex-col bg-surface p-5">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                    Stage {s.n} · {s.horizon}
                  </p>
                  <h3 className="mt-2 text-[1.0625rem] font-medium leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.items.join(" · ")}</p>
                  <StatusBadge status={s.status} className="mt-4 self-start" />
                </li>
              ))}
            </ol>
            <ArrowLink href={`${AEAIP_STRATEGY_HREF}#roadmap`} className="mt-4">
              The AEAIP roadmap and strategy
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Knowledge base */}
      <Section id="learn" labelledBy="learn-title" section="aeaip_learn">
        <Container>
          <SectionHeader
            eyebrow="AEAIP knowledge"
            id="learn-title"
            title="Learn the engineering behind AEAIP"
            lede="Reference pages written to teach first: verification, reviews, configuration, security and spacecraft assurance."
          />
          <div className="mt-10">
            <KnowledgeIndex source="aeaip_body" />
          </div>
          <p className="mt-8 text-sm text-muted">
            GAMYAA AeroSystems — Engineering Assurance Research · Designed by{" "}
            <DesignerLink location="aeaip_body" className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink" />{" "}
            · Last reviewed <time dateTime={AEAIP_REVIEWED.iso}>{AEAIP_REVIEWED.display}</time>
          </p>
        </Container>
      </Section>

      <CtaBand
        title="Bring us a real readiness problem."
        body="We are researching AEAIP with engineering teams. Tell us how your programme decides it is ready for its next review."
        actions={
          <>
            <ButtonLink
              href={internalContact("assurance-problem")}
              ga={{ event: "contact_sales_click", params: { source_location: "aeaip_cta" } }}
              label="Discuss an Engineering Assurance Problem"
            >
              Discuss an Engineering Assurance Problem
            </ButtonLink>
            <ButtonLink
              href={internalContact("strategic-partnership")}
              variant="secondary"
              ga={{ event: "aeaip_partner_interest", params: { source_location: "aeaip_cta" } }}
              label="Explore a Strategic Partnership"
            >
              Explore a Strategic Partnership
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
