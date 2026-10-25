import type { ReactNode } from "react";
import { KnowledgeIndex } from "@/components/aeaip/learn";
import { CtaBand, internalContact, PageHero } from "@/components/sections/shared";
import { EngineeringCallout } from "@/components/system/callout";
import { ConvergenceDiagram } from "@/components/system/convergence";
import { InteractiveEvidenceLine } from "@/components/system/evidence-line-interactive";
import { EvidenceGraphPreview } from "@/components/system/evidence-graph-preview";
import { AEAIP_STEPS, AeaipFullName, ArchitectureDiagram, PromiseLines } from "@/components/system/platforms";
import { ReadinessStates } from "@/components/system/readiness-states";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArrowLink, ButtonLink, Container, JsonLd, Section, StatusBadge } from "@/components/ui/primitives";
import {
  AEAIP,
  AEAIP_DEMO_HREF,
  AEAIP_HREF,
  AEAIP_REVIEWED,
  AEAIP_STRATEGY_HREF,
  AI_NEVER,
  ENGINE_FINDINGS,
} from "@/content/aeaip";
import { PRODUCT_STATUS } from "@/content/status";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { aero } from "@/lib/site";

const TITLE = "AEAIP™ | Aerospace Engineering Assurance Intelligence Platform";
const DESCRIPTION =
  "AEAIP™ connects requirements, configuration, evidence, verification and readiness for defence, aerospace and space systems, starting with satellites and spacecraft. Research & Architecture.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: AEAIP_HREF, hasOwnOgImage: true });

const L = (slug: string) => aero(`/aeaip/${slug}`);

function Chapter({ id, n, title, intro, children, className }: { id: string; n: string; title: string; intro?: string; children: ReactNode; className?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`} section={`chapter_${n}`} className={className}>
      <Container>
        <p className="kicker">Chapter {n}</p>
        <h2 id={`${id}-title`} className="heading mt-5 max-w-4xl text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
          {title}
        </h2>
        {intro ? <p className="lede mt-5 max-w-2xl">{intro}</p> : null}
        <div className="mt-12">{children}</div>
      </Container>
    </Section>
  );
}

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
          <>
            <span>
              {AEAIP.platformNo} · {AEAIP.category}
            </span>
            <StatusBadge status={PRODUCT_STATUS.aeaip} />
          </>
        }
        title={
          <>
            AEAIP™
            <span className="mt-4 block text-2xl font-medium tracking-tight text-ink-2 sm:text-3xl lg:text-[2.25rem]">
              <AeaipFullName />
            </span>
          </>
        }
        aside={<PromiseLines className="heading text-2xl text-ink sm:text-3xl" />}
      >
        <p className="lede mt-8 max-w-xl">{AEAIP.oneLiner}</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink
            href={AEAIP_DEMO_HREF}
            ga={{ event: "aeaip_demo_open", params: { source_location: "aeaip_hero" } }}
            label="Explore TRR Demo"
          >
            Explore the TRR Demo
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
        <EngineeringCallout title="Research & Architecture" className="mt-10 max-w-2xl">
          <p>
            AEAIP is not released software. This page describes what it is designed to do, and the demo uses
            fictitious data. <ArrowLink href={`${aero("/products")}#status`} className="inline-flex min-h-6 text-sm">See status</ArrowLink>
          </p>
        </EngineeringCallout>
      </PageHero>

      {/* 01 — The question */}
      <Chapter
        id="question"
        n="01"
        title={AEAIP.question}
        intro="The evidence exists, spread across requirements, PLM, test, quality and software systems. Before every review, engineers rebuild the connections by hand, and still cannot be sure the evidence applies to the exact system they are about to test, ship or fly."
      >
        <ConvergenceDiagram />
      </Chapter>

      {/* 02 — The model */}
      <Chapter
        id="how-it-works"
        n="02"
        title="Requirement → Configuration → Evidence → Verification → Readiness"
        intro="Configuration sits between requirement and evidence on purpose: evidence proves a requirement only for the configuration it was produced on."
        className="bg-surface-accent"
      >
        <InteractiveEvidenceLine steps={AEAIP_STEPS} line="aeaip" label="AEAIP core model" />
      </Chapter>

      {/* 03 — The intelligence */}
      <Chapter id="intelligence" n="03" title="Two core technologies">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">Engineering Evidence Graph™</h3>
              <StatusBadge status="architecture" />
            </div>
            <p className="mt-2 text-lg text-accent">What connects what?</p>
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-ink-2">
              Every requirement, configuration item, test, issue and approval as a node; every dependency as a typed
              relationship, traversable in both directions.
            </p>
            <EvidenceGraphPreview className="mt-8" />
            <ArrowLink
              href={L("engineering-evidence-graph")}
              className="mt-6"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "evidence_graph", source_location: "aeaip_body" } }}
            >
              Explore the Evidence Graph
            </ArrowLink>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">Assurance Intelligence Engine™</h3>
              <StatusBadge status="research" />
            </div>
            <p className="mt-2 text-lg text-accent">What does it identify?</p>
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-ink-2">
              It reasons over the graph and prepares findings for the engineer and the review board. It never closes a
              requirement or makes the decision.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {ENGINE_FINDINGS.map((f) => (
                <li key={f} className="rounded-full border border-line-strong px-3 py-1.5 text-sm text-ink-2">
                  {f}
                </li>
              ))}
            </ul>
            <ArrowLink
              href={`${L("engineering-evidence-graph")}#engine`}
              className="mt-6"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "evidence_graph", source_location: "aeaip_body" } }}
            >
              How Assurance Intelligence works
            </ArrowLink>
          </div>
        </div>
      </Chapter>

      {/* 04 — The decision */}
      <Chapter
        id="decision"
        n="04"
        title="AEAIP prepares the evidence picture. Authorized people make the decision."
        className="bg-surface-accent"
      >
        <ReadinessStates />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xl tracking-tight text-ink sm:text-2xl">{AEAIP.governance}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              AI in AEAIP never: {AI_NEVER.map((x) => x.toLowerCase()).join("; ")}.
            </p>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <ButtonLink
              href={AEAIP_DEMO_HREF}
              ga={{ event: "aeaip_demo_open", params: { source_location: "aeaip_body" } }}
              label="Explore TRR Demo"
            >
              Explore the TRR Demo
            </ButtonLink>
          </div>
        </div>
      </Chapter>

      {/* 05 — The architecture */}
      <Chapter
        id="architecture"
        n="05"
        title="One architecture: system readiness, with manufacturing and certification depth"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ArchitectureDiagram />
          </div>
          <div className="space-y-5 lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-ink-2">
              DAQIP™ brings manufacturing and FAI evidence; AirCert AI™ brings certification evidence. Software,
              cybersecurity, simulation, test and telemetry evidence feed the same graph.
            </p>
            <ArrowLink href={aero("/daqip")}>DAQIP™ — Manufacturing Assurance</ArrowLink>
            <ArrowLink href={aero("/aircert-ai")} className="flex">
              AirCert AI™ — Certification Assurance
            </ArrowLink>
            <ArrowLink
              href={L("cybersecurity-assurance")}
              className="flex"
              ga={{ event: "aeaip_reference_open", params: { reference_category: "cybersecurity", source_location: "aeaip_body" } }}
            >
              Cybersecurity as assurance
            </ArrowLink>
          </div>
        </div>
      </Chapter>

      {/* Initial focus */}
      <Section labelledBy="focus-title" section="initial_focus">
        <Container>
          <div className="grid gap-10 border-t border-line-strong pt-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker">Initial engineering focus</p>
              <h2 id="focus-title" className="display mt-5 text-5xl text-ink sm:text-6xl">
                {AEAIP.initialFocus}
              </h2>
              <p className="lede mt-5 max-w-xl">
                Architected for defence, aerospace and space systems; proven first where one programme connects nearly
                every assurance discipline. Launch, defence aerospace and aircraft are later expansion directions.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end lg:justify-end">
              <ButtonLink
                href={L("satellites-spacecraft")}
                ga={{ event: "aeaip_reference_open", params: { reference_category: "satellite_assurance", source_location: "aeaip_body" } }}
                label="Explore Satellite Assurance"
              >
                Explore Satellite Assurance
              </ButtonLink>
              <ButtonLink
                href={AEAIP_DEMO_HREF}
                variant="secondary"
                ga={{ event: "aeaip_demo_open", params: { source_location: "aeaip_body" } }}
                label="Explore Demo"
              >
                Explore the Demo
              </ButtonLink>
              <ButtonLink href={AEAIP_STRATEGY_HREF} variant="secondary" label="Strategy and investors">
                Strategy / Investors
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Learn */}
      <Section id="learn" labelledBy="learn-title" section="aeaip_learn" className="pt-0 md:pt-0">
        <Container>
          <h2 id="learn-title" className="kicker">
            Learn the engineering behind AEAIP
          </h2>
          <div className="mt-6">
            <KnowledgeIndex source="aeaip_body" />
          </div>
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
