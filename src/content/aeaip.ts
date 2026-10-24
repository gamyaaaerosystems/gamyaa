import type { ReferenceCategory } from "@/lib/analytics";
import { aero } from "@/lib/site";
import type { Status } from "./status";

/**
 * AEAIP™ — the flagship Engineering Assurance Intelligence architecture.
 * DAQIP™ (Platform 02) and AirCert AI™ (Platform 03) are specialisations within it.
 *
 * Status rule: AEAIP is Research & Architecture. Nothing here is released software.
 */
export const AEAIP = {
  name: "AEAIP™",
  plainName: "AEAIP",
  expanded: "Aerospace Engineering Assurance Intelligence Platform",
  platformNo: "Platform 01",
  category: "Engineering Assurance Intelligence",
  market: "Defence · Aerospace · Space",
  chain: ["Requirement", "Configuration", "Evidence", "Verification", "Readiness"] as const,
  promise: "Know what is verified. Know what is missing. Know when the system is ready.",
  /** The promise as three separate statements (one per line on the platform card). */
  promiseLines: ["Know what is verified.", "Know what is missing.", "Know when the system is ready."] as const,
  question: "Can we prove that this critical system is ready?",
  governance: "AI assists. Engineers verify. Authorized authorities approve.",
  initialFocus: "Satellites & Spacecraft",
  expansion: "Launch systems · defence aerospace systems · aircraft and advanced aerospace systems",
  statement: "From engineering requirement to verified evidence and readiness decision.",
  definition:
    "AEAIP is the Aerospace Engineering Assurance Intelligence Platform being researched and architected by Gamyaa AeroSystems. It is designed to connect engineering requirements, the exact configuration being evaluated, verification evidence and review decisions, so that teams can see what is verified, what is missing and what stands between them and the next readiness gate.",
  oneSentence:
    "AEAIP is Gamyaa AeroSystems' flagship Engineering Assurance Intelligence architecture for defence, aerospace and space systems, with satellites and spacecraft as its first engineering focus.",
} as const;

/** Mandatory date shown on every AEAIP knowledge page ("last reviewed"). */
export const AEAIP_REVIEWED = { iso: "2026-10-24", display: "24 October 2026" } as const;
export const AEAIP_PUBLISHED = { iso: "2026-10-24", display: "24 October 2026" } as const;

export const AEAIP_HREF = aero("/aeaip");
export const AEAIP_DEMO_HREF = aero("/aeaip/demo");
export const AEAIP_STRATEGY_HREF = aero("/aeaip/strategy");

/* ------------------------------------------------------- Core model */

export const CORE_MODEL: Array<{ step: (typeof AEAIP.chain)[number]; question: string; body: string }> = [
  {
    step: "Requirement",
    question: "What must be proven?",
    body: "The stakeholder, system and derived requirements, with their source, revision and allocation.",
  },
  {
    step: "Configuration",
    question: "Which exact system is being evaluated?",
    body: "Requirement baseline, hardware and software revisions, test article and tool versions.",
  },
  {
    step: "Evidence",
    question: "What objective evidence exists?",
    body: "Test, analysis, inspection, demonstration and review records, with provenance.",
  },
  {
    step: "Verification",
    question: "Does the evidence close the requirement?",
    body: "Results assessed against criteria, open issues resolved and closure reviewed by a person.",
  },
  {
    step: "Readiness",
    question: "What stands between us and the next gate?",
    body: "Open items, conditions and risks, presented to the board that makes the decision.",
  },
];

/** The questions AEAIP is designed to answer (brief §7), grouped for reading. */
export const READINESS_QUESTIONS: Array<{ group: string; items: string[] }> = [
  {
    group: "Requirement & configuration",
    items: [
      "What needs to be proven, and which requirement defines it?",
      "Which system, subsystem or component implements it?",
      "Which exact configuration is being evaluated?",
    ],
  },
  {
    group: "Verification & evidence",
    items: [
      "How will it be verified: test, analysis, inspection, demonstration or simulation?",
      "What evidence exists, and is it complete?",
      "Is that evidence still applicable to the current configuration?",
    ],
  },
  {
    group: "Issues & closure",
    items: [
      "Are there unresolved anomalies, NCRs, deviations or waivers?",
      "Has corrective action been completed?",
      "Has the retest or re-analysis been performed?",
    ],
  },
  {
    group: "Authority & readiness",
    items: [
      "Has an authorized person reviewed the evidence?",
      "Can the requirement legitimately be closed?",
      "What remains open before the next engineering review or readiness gate?",
    ],
  },
];

/** What the Assurance Intelligence Engine™ is designed to help identify. */
export const ENGINE_FINDINGS = [
  "Verification coverage",
  "Missing evidence",
  "Stale evidence",
  "Configuration mismatches",
  "Unverified requirements",
  "Open tests",
  "Failed tests",
  "NCRs",
  "Anomalies",
  "Waivers",
  "Risks",
  "Cybersecurity findings",
  "Change impact",
  "Review-gate readiness",
] as const;

export const ENGINE_FLOW = [
  "Engineering systems + engineering evidence",
  "Engineering Evidence Graph™",
  "Assurance Intelligence Engine™",
  "Engineer / Review Board / Authorized Authority",
  "Readiness Decision",
] as const;

/** Things AI in AEAIP never does. Shown wherever AI is discussed. */
export const AI_NEVER = [
  "Certify an aircraft",
  "Approve a spacecraft for flight",
  "Replace the Chief Engineer",
  "Provide regulatory approval",
  "Autonomously declare a system safe",
] as const;

export const AI_WORKFLOWS = [
  "Requirements interpretation",
  "Requirement quality assistance",
  "Traceability assistance",
  "Verification planning assistance",
  "Evidence classification",
  "Evidence gap analysis",
  "Change-impact assistance",
  "NCR / anomaly analysis",
  "Review preparation",
  "Certification assistance",
  "Readiness analysis",
] as const;

/* --------------------------------------------- Platform hierarchy */

export type PlatformCard = {
  key: "aeaip" | "daqip" | "aircert";
  no: string;
  name: string;
  expanded: string;
  category: string;
  href: string;
  cta: string;
  relation?: string;
};

export const SPECIALISED_PLATFORMS: PlatformCard[] = [
  {
    key: "daqip",
    no: "Platform 02",
    name: "DAQIP™",
    expanded: "Defence Aerospace Quality Intelligence Platform",
    category: "Manufacturing Assurance Intelligence",
    href: aero("/daqip"),
    cta: "Explore DAQIP™",
    relation: "DAQIP™ is the Manufacturing Assurance Intelligence specialization within the AEAIP™ architecture.",
  },
  {
    key: "aircert",
    no: "Platform 03",
    name: "AirCert AI™",
    expanded: "Airworthiness Certification Engineering Copilot",
    category: "Certification Assurance Intelligence",
    href: aero("/aircert-ai"),
    cta: "Explore AirCert AI™",
    relation: "AirCert AI™ is the Certification Assurance Intelligence specialization within the AEAIP™ architecture.",
  },
];

export const ARCHITECTURE_NOTE =
  "DAQIP™ and AirCert AI™ are specialized assurance platforms within the AEAIP™ architecture.";

/* ------------------------------------------------ Capability status */

/**
 * Status of each AEAIP building block as of October 2026. These were set from the
 * current state of the work (no AEAIP software exists yet) and must be confirmed by
 * the product owner before they are changed.
 */
export const AEAIP_CAPABILITIES: Array<{ id: string; title: string; summary: string; status: Status; href?: string }> = [
  {
    id: "platform",
    title: "AEAIP™ platform",
    summary: "Overall assurance architecture and satellite-first domain model.",
    status: "research-architecture",
    href: aero("/aeaip"),
  },
  {
    id: "evidence-graph",
    title: "Engineering Evidence Graph™",
    summary: "Node and relationship model for requirements, configuration and evidence.",
    status: "architecture",
    href: aero("/aeaip/engineering-evidence-graph"),
  },
  {
    id: "engine",
    title: "Assurance Intelligence Engine™",
    summary: "Reasoning over the graph for coverage, gaps, validity and readiness.",
    status: "research",
    href: aero("/aeaip/engineering-evidence-graph#engine"),
  },
  {
    id: "validity",
    title: "Configuration-aware evidence validity",
    summary: "Whether evidence still applies to the configuration under review.",
    status: "research",
    href: aero("/aeaip/configuration-assurance"),
  },
  {
    id: "gates",
    title: "Configurable Assurance Gates",
    summary: "Review gates, criteria and required evidence defined per programme.",
    status: "architecture",
    href: aero("/aeaip/review-gates"),
  },
  {
    id: "cyber",
    title: "Cybersecurity assurance",
    summary: "Security requirements, findings and retest in the same evidence model.",
    status: "research",
    href: aero("/aeaip/cybersecurity-assurance"),
  },
  {
    id: "continuous",
    title: "Continuous Engineering Assurance",
    summary: "Change impact, suspect evidence and reverification across the graph.",
    status: "concept",
    href: aero("/aeaip/continuous-assurance"),
  },
  {
    id: "operational",
    title: "Operational evidence (Predicted → Tested → Flown)",
    summary: "Simulation, ground test and flight telemetry linked to requirements.",
    status: "concept",
    href: aero("/aeaip/operational-evidence"),
  },
  {
    id: "integrations",
    title: "Engineering-tool integrations",
    summary: "Requirements, PLM, MBSE, test and quality systems as evidence sources.",
    status: "roadmap",
    href: `${aero("/aeaip/strategy")}#positioning`,
  },
  {
    id: "predictive",
    title: "Predictive assurance",
    summary: "Risk patterns and likely verification problems before they occur.",
    status: "vision",
    href: `${aero("/aeaip/strategy")}#roadmap`,
  },
  {
    id: "demo",
    title: "Interactive Assurance Demo",
    summary: "Fictitious satellite readiness scenario you can explore on this site.",
    status: "concept-demo",
    href: aero("/aeaip/demo"),
  },
];

/* ---------------------------------------------------- Knowledge pages */

export type LearnPage = {
  slug: string;
  href: string;
  /** Short label for local navigation. */
  nav: string;
  /** Card / link title (descriptive anchor text). */
  title: string;
  summary: string;
  category: ReferenceCategory;
};

export const LEARN_PAGES: LearnPage[] = [
  {
    slug: "engineering-evidence-graph",
    href: aero("/aeaip/engineering-evidence-graph"),
    nav: "Evidence Graph",
    title: "Engineering Evidence Graph™",
    summary: "Nodes, relationships, provenance and change impact: how evidence is connected to requirements.",
    category: "evidence_graph",
  },
  {
    slug: "verification-validation",
    href: aero("/aeaip/verification-validation"),
    nav: "Verification & Validation",
    title: "Verification vs validation, and verification methods",
    summary: "The difference between V and V, the classical methods, qualification, acceptance and modern verification.",
    category: "verification",
  },
  {
    slug: "review-gates",
    href: aero("/aeaip/review-gates"),
    nav: "Review Gates",
    title: "Spacecraft review gates, from MCR to MRR",
    summary: "Purpose, typical questions and evidence for eleven configurable engineering reviews.",
    category: "reviews",
  },
  {
    slug: "configuration-assurance",
    href: aero("/aeaip/configuration-assurance"),
    nav: "Configuration",
    title: "Configuration-aware evidence validity",
    summary: "Why a verified requirement can stop being verified when the configuration changes.",
    category: "configuration",
  },
  {
    slug: "cybersecurity-assurance",
    href: aero("/aeaip/cybersecurity-assurance"),
    nav: "Cybersecurity",
    title: "Cybersecurity as engineering assurance",
    summary: "Security requirements, threats, findings, remediation and retest in one evidence chain.",
    category: "cybersecurity",
  },
  {
    slug: "continuous-assurance",
    href: aero("/aeaip/continuous-assurance"),
    nav: "Continuous Assurance",
    title: "Continuous engineering assurance and change impact",
    summary: "What a component change does to requirements, verification results and readiness.",
    category: "continuous_assurance",
  },
  {
    slug: "operational-evidence",
    href: aero("/aeaip/operational-evidence"),
    nav: "Predicted → Tested → Flown",
    title: "Predicted → Tested → Flown: operational evidence",
    summary: "Linking simulation, ground qualification and flight telemetry to the same requirement.",
    category: "operational_evidence",
  },
  {
    slug: "satellites-spacecraft",
    href: aero("/aeaip/satellites-spacecraft"),
    nav: "Satellites & Spacecraft",
    title: "Satellite and spacecraft assurance",
    summary: "Subsystems, environmental testing, qualification, acceptance and mission readiness evidence.",
    category: "satellite_assurance",
  },
  {
    slug: "standards-frameworks",
    href: aero("/aeaip/standards-frameworks"),
    nav: "Standards",
    title: "Standards & framework mapping",
    summary: "How engineering evidence maps to systems-engineering, quality, safety and security frameworks.",
    category: "standards",
  },
  {
    slug: "glossary",
    href: aero("/aeaip/glossary"),
    nav: "Glossary",
    title: "Engineering assurance glossary",
    summary: "Plain definitions of verification, configuration, review and quality terms used on this site.",
    category: "glossary",
  },
];

export const learnPage = (slug: string) => LEARN_PAGES.find((p) => p.slug === slug)!;

/* -------------------------------------------------- Trust & audience */

export const TRUST_PRINCIPLES: Array<{ title: string; body: string }> = [
  { title: "Evidence before assertion", body: "Every readiness claim points to objective evidence." },
  { title: "Configuration matters", body: "Evidence counts only for the configuration it proves." },
  { title: "Human authority remains accountable", body: "Named people review, close and approve." },
  { title: "AI assists, never silently approves", body: "Every AI suggestion is visible and reviewable." },
  { title: "Traceability must be explainable", body: "Any status can be followed back to its source." },
  { title: "Security is part of assurance", body: "Security findings close like any other finding." },
];

export const AUDIENCES: Array<{ title: string; body: string }> = [
  { title: "Chief Engineers", body: "One view of what is proven, what is open and what blocks the next gate." },
  { title: "Systems Engineering & V&V", body: "Requirements, verification methods and closure evidence that stay connected." },
  { title: "Mission / Product Assurance", body: "Anomalies, NCRs, waivers and retest status traced to the requirement they affect." },
  { title: "Quality & Manufacturing Assurance", body: "FAI, inspection and product-conformity evidence through DAQIP™." },
  { title: "Certification / Airworthiness", body: "Compliance planning and certification evidence through AirCert AI™." },
  { title: "Programme Leadership", body: "Readiness, conditions and risk in terms a review board can act on." },
];

/* ------------------------------------------------------- Roadmap */

export type RoadmapStage = {
  n: number;
  title: string;
  horizon: "Current" | "Near-term" | "Research" | "Long-term Vision";
  items: string[];
  status: Status;
};

/** Maturity-based stages. No dates: there is no committed schedule. */
export const AEAIP_STAGES: RoadmapStage[] = [
  {
    n: 1,
    title: "Evidence Foundation",
    horizon: "Current",
    items: ["Requirements", "Configuration", "Evidence relationships", "Verification matrix", "Human approval"],
    status: "research-architecture",
  },
  {
    n: 2,
    title: "Verification Intelligence",
    horizon: "Near-term",
    items: ["Coverage", "Gaps", "Evidence validity", "Readiness views"],
    status: "research",
  },
  {
    n: 3,
    title: "Continuous Assurance",
    horizon: "Research",
    items: ["Change impact", "Suspect evidence", "Reverification"],
    status: "concept",
  },
  {
    n: 4,
    title: "Cross-Domain Assurance",
    horizon: "Research",
    items: ["Manufacturing (DAQIP™)", "Certification (AirCert AI™)", "Cybersecurity", "Software", "System integration"],
    status: "concept",
  },
  {
    n: 5,
    title: "Operational Assurance",
    horizon: "Long-term Vision",
    items: ["Simulation", "Ground test", "Flight telemetry"],
    status: "vision",
  },
  {
    n: 6,
    title: "Predictive Assurance",
    horizon: "Long-term Vision",
    items: ["Risk patterns", "Likely verification problems", "Readiness threats"],
    status: "vision",
  },
];

/** Engineering Evidence Graph™ — recommended node chain (brief §8). */
export const EVIDENCE_GRAPH_CHAIN = [
  "Mission / Need",
  "Stakeholder Requirement",
  "System Requirement",
  "Derived Requirement",
  "Architecture",
  "Subsystem / Component",
  "Interface",
  "Design Artifact",
  "Configuration",
  "Implementation / Manufacturing",
  "Inspection · Analysis · Simulation · Demonstration · Test",
  "Raw Evidence",
  "NCR · Anomaly · Risk · Deviation · Waiver",
  "Corrective Action",
  "Retest / Re-analysis",
  "Verification Closure",
  "Authorized Approval",
  "Review / Certification / Mission Readiness",
] as const;

export const CYBER_CHAIN = [
  "Security Need",
  "Security Requirement",
  "Threat / Risk",
  "Allocated Control",
  "Architecture / Component",
  "Configuration",
  "Verification Method",
  "Security Test / Analysis Evidence",
  "Finding / Vulnerability",
  "Remediation",
  "Retest",
  "Verification Closure",
  "Authorized Security / Engineering Review",
] as const;

export const PTF_CHAIN = [
  "Requirement",
  "Simulation / Digital Twin Evidence",
  "Ground Qualification Evidence",
  "Acceptance Evidence",
  "Flight Telemetry",
  "Actual Operational Performance",
] as const;

/** Illustrative change-impact result (brief §11). Concept only. */
export const CHANGE_IMPACT_EXAMPLE = [
  { value: 12, label: "requirements affected" },
  { value: 4, label: "verification results potentially invalidated" },
  { value: 3, label: "tests may require rerun" },
  { value: 2, label: "qualification artefacts affected" },
  { value: 1, label: "cybersecurity assessment affected" },
] as const;
