export const AIRCERT = {
  name: "AirCert AI™",
  plainName: "AirCert AI",
  subtitle: "Airworthiness Certification Engineering Copilot",
  line: "Requirements. Compliance. Verification. Evidence. Traceability.",
  statement:
    "Turn certification requirements into structured plans, engineering artefacts, verification activities and traceable evidence.",
  shortExplanation:
    "AI-assisted certification engineering for requirements, planning, verification and traceable certification evidence.",
  oneSentence:
    "AirCert AI is Gamyaa AeroSystems' AI-assisted engineering copilot for airworthiness certification planning, compliance evidence and verification traceability.",
  positioning: "An AI-assisted certification engineering platform.",
  problem:
    "Aerospace and defence MSMEs often have strong design and manufacturing capability but face delays in certification because the airworthiness process is documentation-heavy, standards-intensive and difficult to trace across requirements, verification and evidence.",
  response:
    "AirCert AI helps structure and accelerate certification preparation while keeping engineering and authority decisions under human control.",
  definition:
    "AirCert AI is an Airworthiness Certification Engineering Copilot by Gamyaa AeroSystems that assists aerospace and defence teams with certification requirements, planning, compliance matrices, engineering documentation, verification activities and traceable certification evidence.",
  boundary:
    "AirCert AI assists certification engineering. It does not independently certify aerospace products, and it does not replace certification authorities or their decisions.",
} as const;

export const AIRCERT_AUDIENCE = [
  "MSMEs",
  "Engineering teams",
  "Certification engineers",
  "Safety engineers",
  "Design organisations",
  "Quality teams",
  "System architects",
];

export type AircertCapability = { n: string; title: string; items: string[]; note?: string };

export const AIRCERT_GROUPS: Array<{ title: string; capabilities: AircertCapability[] }> = [
  {
    title: "Requirements",
    capabilities: [
      {
        n: "01",
        title: "Requirements Engineering Copilot",
        items: [
          "Technical requirements",
          "Functional requirements",
          "Environmental requirements",
          "Operational requirements",
          "System requirements",
          "Customer requirements",
        ],
      },
      {
        n: "02",
        title: "Airworthiness Requirements Intelligence",
        items: [
          "Applicable certification framework",
          "Product and system type",
          "Applicable military / aerospace standards",
          "Customer requirements",
        ],
        note: "Every recommendation shows source, revision, clause, rationale and engineer verification status.",
      },
      {
        n: "05",
        title: "Technical Specification Intelligence",
        items: [
          "Technical specification requirements",
          "Interface requirements",
          "Architecture requirements",
          "Hardware / software requirements",
          "Performance requirements",
          "Environmental requirements",
        ],
      },
    ],
  },
  {
    title: "Safety",
    capabilities: [
      {
        n: "03",
        title: "Safety Engineering Intelligence",
        items: [
          "Hazard identification",
          "Safety requirement generation",
          "Failure-condition classification support",
          "Functional Hazard Assessment (FHA) support",
          "PSSA and SSA support",
          "Safety objectives and traceability",
        ],
        note: "Human review is mandatory.",
      },
    ],
  },
  {
    title: "Certification basis & planning",
    capabilities: [
      {
        n: "04",
        title: "Airworthiness Certification Criteria",
        items: [
          "Certification criteria",
          "Compliance criteria",
          "Applicable clauses",
          "Means of compliance",
          "Required evidence",
        ],
      },
      {
        n: "06",
        title: "Type Approval / Certification Basis Builder",
        items: [
          "Proposed certification basis",
          "Type approval basis",
          "Applicable standards",
          "Means of compliance and rationale",
          "Certification assumptions",
        ],
        note: "Prepares a proposal for authority review. It does not imply authority approval.",
      },
      {
        n: "07",
        title: "Airworthiness Certification Planning",
        items: [
          "Certification scope and basis",
          "Applicable requirements",
          "Compliance matrix",
          "Means of compliance",
          "Evidence and test requirements",
          "Milestones, roles and review gates",
          "Open issues",
        ],
        note: "A living project workspace, not a document generator.",
      },
    ],
  },
  {
    title: "Engineering documentation",
    capabilities: [
      {
        n: "08",
        title: "Engineering Document Intelligence",
        items: [
          "Design documents",
          "System requirements and architecture",
          "Interface documents",
          "Hardware and software design documents",
          "Engineering specifications",
          "Configuration and certification documents",
        ],
        note: "Every generated section preserves traceability to its source requirement.",
      },
    ],
  },
  {
    title: "Quality, qualification & acceptance",
    capabilities: [
      {
        n: "09",
        title: "Quality Assurance Plan",
        items: [
          "Quality assurance plan",
          "Quality checkpoints",
          "Acceptance criteria",
          "Review gates",
          "Evidence requirements",
        ],
      },
      {
        n: "10",
        title: "Qualification Test Plan",
        items: [
          "Qualification strategy",
          "Test matrix",
          "Environmental test planning",
          "Requirement-to-test mapping",
          "Acceptance criteria and evidence planning",
        ],
      },
      {
        n: "11",
        title: "Qualification Test Procedures",
        items: [
          "Procedures and preconditions",
          "Equipment",
          "Test steps and data capture",
          "Pass / fail criteria",
          "Evidence mapping",
        ],
      },
      {
        n: "12",
        title: "Acceptance Test Plan & Procedures",
        items: [
          "Acceptance test planning",
          "Acceptance criteria",
          "Test cases and procedures",
          "Approval evidence",
        ],
      },
    ],
  },
];

export const AIRCERT_EXTENDED = [
  {
    title: "Compliance Matrix",
    body: "For every certification requirement: applicability, source, clause, means of compliance, owner, required evidence, verification status, approval status and authority comments.",
  },
  {
    title: "Certification Evidence Graph",
    body: "Airworthiness requirement through design, safety, verification, test, result and evidence to compliance finding and approval, as one connected record.",
  },
  {
    title: "Certification Evidence Readiness",
    body: "Shows how much of the evidence is mapped, assigned, available and internally approved. It never shows a percentage of certification.",
  },
  {
    title: "Document Completeness Checker",
    body: "Identifies missing documents, outdated or incomplete evidence, conflicting revisions, missing approvals and unmapped requirements.",
  },
  {
    title: "Authority Comment Resolution",
    body: "Comment → Owner → Response → Evidence → Closure, tracked for every comment raised in review.",
  },
  {
    title: "Change Impact Analysis",
    body: "When a design changes, identifies potentially affected requirements, safety analyses, test plans, design documents, qualification evidence, FAI, manufacturing evidence and approval records.",
  },
  {
    title: "Standard Revision Intelligence",
    body: "When standards or guidance change, shows which certification artefacts may require review. Human verification required.",
  },
];

export const AIRCERT_EVIDENCE_GRAPH = [
  "Airworthiness Requirement",
  "Design Requirement",
  "Safety Requirement",
  "Verification Method",
  "Test",
  "Result",
  "Evidence",
  "Compliance Finding",
  "Approval",
];

export const AIRCERT_FAQ = [
  { q: "What is AirCert AI?", a: AIRCERT.definition },
  {
    q: "Does AirCert AI certify aerospace products?",
    a: "No. AirCert AI assists certification engineering work such as requirements mapping, planning, documentation and evidence preparation. Certification decisions remain with the responsible engineers, the design organisation and the certification authority.",
  },
  { q: "Who makes AirCert AI?", a: "AirCert AI is being developed by Gamyaa AeroSystems, Bangalore, India." },
  {
    q: "Who is AirCert AI for?",
    a: "Aerospace and defence MSMEs, engineering and design teams, certification and safety engineers, quality teams and system architects preparing products for airworthiness certification or type approval.",
  },
  {
    q: "What problem does AirCert AI address?",
    a: `${AIRCERT.problem} ${AIRCERT.response}`,
  },
  {
    q: "Is AirCert AI available today?",
    a: "No. AirCert AI is a planned product. The capabilities described on this page are the intended scope and are not yet released.",
  },
  {
    q: "How does AirCert AI relate to DAQIP?",
    a: "AirCert AI covers airworthiness, certification and design assurance. DAQIP covers manufacturing, inspection, First Article Inspection and quality evidence. Together they are intended to connect a certification requirement to the manufacturing and inspection evidence that supports it.",
  },
];
