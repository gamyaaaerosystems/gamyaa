import { aero } from "@/lib/site";

/**
 * Engineering assurance glossary. Original, plain-language definitions. Where usage
 * differs between frameworks, the definition says so. `see` links to the page that
 * explains the term in depth.
 */
export type Term = { term: string; slug: string; definition: string; group: string; see?: string };

const VV = aero("/aeaip/verification-validation");
const GATES = aero("/aeaip/review-gates");
const CONFIG = aero("/aeaip/configuration-assurance");
const GRAPH = aero("/aeaip/engineering-evidence-graph");
const SAT = aero("/aeaip/satellites-spacecraft");
const CYBER = aero("/aeaip/cybersecurity-assurance");
const FAI = aero("/solutions/first-article-inspection");

export const GLOSSARY: Term[] = [
  /* Requirements & evidence */
  {
    group: "Requirements & evidence",
    term: "Requirement",
    slug: "requirement",
    definition:
      "A statement of what a system must do or be, written so that it can be verified. Good requirements are necessary, unambiguous, feasible and traceable to a need.",
    see: GRAPH,
  },
  {
    group: "Requirements & evidence",
    term: "Derived requirement",
    slug: "derived-requirement",
    definition:
      "A requirement created by the design team to implement a higher-level requirement, for example a subsystem power limit derived from a system power budget. It traces to its parent and carries a rationale.",
    see: GRAPH,
  },
  {
    group: "Requirements & evidence",
    term: "Evidence",
    slug: "evidence",
    definition:
      "A record that supports a verification conclusion: a test report, analysis, inspection record, review record or telemetry set. Evidence is meaningful only together with the configuration and conditions it was produced under.",
    see: CONFIG,
  },
  {
    group: "Requirements & evidence",
    term: "Traceability",
    slug: "traceability",
    definition:
      "The ability to follow a requirement up to the need it serves and down to the design, verification and evidence that satisfy it, in both directions.",
    see: GRAPH,
  },
  {
    group: "Requirements & evidence",
    term: "Verification matrix",
    slug: "verification-matrix",
    definition:
      "A table listing each requirement with its verification method, level, planned event, evidence and closure status. Often called a verification cross-reference matrix (VCRM) or verification control document.",
    see: VV,
  },
  {
    group: "Requirements & evidence",
    term: "Evidence validity",
    slug: "evidence-validity",
    definition:
      "Whether a piece of evidence still applies to the requirement baseline and configuration currently under review. In the AEAIP model, evidence can be current, at risk, require reverification or be superseded.",
    see: CONFIG,
  },
  {
    group: "Requirements & evidence",
    term: "Engineering Evidence Graph™",
    slug: "engineering-evidence-graph",
    definition:
      "GAMYAA's model (in architecture) for connecting needs, requirements, design, configuration, verification, evidence, issues and approvals as typed nodes and relationships.",
    see: GRAPH,
  },
  /* Verification */
  {
    group: "Verification",
    term: "Verification",
    slug: "verification",
    definition:
      "Confirmation, through objective evidence, that a product meets its specified requirements. It answers: did we build the product right?",
    see: VV,
  },
  {
    group: "Verification",
    term: "Validation",
    slug: "validation",
    definition:
      "Confirmation that the product fulfils its intended use and stakeholder needs in its intended environment. It answers: did we build the right product?",
    see: VV,
  },
  {
    group: "Verification",
    term: "Qualification",
    slug: "qualification",
    definition:
      "Verification that a design meets its requirements with margin, usually by testing a dedicated unit at levels beyond the expected environment. Done once for a design.",
    see: VV,
  },
  {
    group: "Verification",
    term: "Acceptance",
    slug: "acceptance",
    definition:
      "Verification that each production or flight unit was built correctly and is free of workmanship defects, usually at expected environment levels. Done for every unit.",
    see: VV,
  },
  {
    group: "Verification",
    term: "Protoflight",
    slug: "protoflight",
    definition:
      "An approach in which the flight unit itself is tested to levels between acceptance and qualification, used when no separate qualification unit is built. It accepts more risk to the flight hardware.",
    see: SAT,
  },
  {
    group: "Verification",
    term: "Certification",
    slug: "certification",
    definition:
      "Formal recognition by an authorised body that a product, design or organisation meets a defined set of requirements. Software tools can help prepare certification evidence; they do not certify.",
    see: aero("/aircert-ai"),
  },
  {
    group: "Verification",
    term: "Test article pedigree",
    slug: "test-article-pedigree",
    definition:
      "The documented history and configuration of the unit that was tested, and how it differs from the flight configuration. It decides whether a test result can be used as evidence for flight.",
    see: CONFIG,
  },
  {
    group: "Verification",
    term: "TVAC",
    slug: "tvac",
    definition:
      "Thermal vacuum testing: operating hardware in vacuum across hot and cold temperature extremes to verify thermal design and functional performance in a space-like environment.",
    see: SAT,
  },
  /* Model-based */
  {
    group: "Model-based engineering",
    term: "MBSE",
    slug: "mbse",
    definition:
      "Model-based systems engineering: using a connected system model, rather than separate documents, as the primary record of requirements, architecture, behaviour and verification.",
    see: VV,
  },
  {
    group: "Model-based engineering",
    term: "MIL (model-in-the-loop)",
    slug: "mil",
    definition: "Testing a control or software design model against a simulated plant before code is produced.",
    see: VV,
  },
  {
    group: "Model-based engineering",
    term: "SIL (software-in-the-loop)",
    slug: "sil",
    definition: "Testing compiled software on a host computer against simulated hardware and environment.",
    see: VV,
  },
  {
    group: "Model-based engineering",
    term: "PIL (processor-in-the-loop)",
    slug: "pil",
    definition: "Testing software on the target or a representative processor with simulated surroundings.",
    see: VV,
  },
  {
    group: "Model-based engineering",
    term: "HIL (hardware-in-the-loop)",
    slug: "hil",
    definition:
      "Testing real hardware, such as a flight computer, connected to simulated sensors, actuators and dynamics, so closed-loop behaviour can be verified on the bench.",
    see: VV,
  },
  {
    group: "Model-based engineering",
    term: "Digital twin",
    slug: "digital-twin",
    definition:
      "A model kept in step with a specific physical system using its data. In AEAIP, digital twins are treated as sources of engineering evidence.",
    see: aero("/aeaip/operational-evidence"),
  },
  /* Issues */
  {
    group: "Issues & dispositions",
    term: "NCR",
    slug: "ncr",
    definition:
      "Nonconformance report: the record raised when a product or process does not meet a requirement. It is investigated and dispositioned, for example rework, repair, use-as-is or scrap.",
    see: aero("/daqip"),
  },
  {
    group: "Issues & dispositions",
    term: "MRB",
    slug: "mrb",
    definition: "Material Review Board: the authorised group that decides the disposition of nonconforming items.",
    see: aero("/daqip"),
  },
  {
    group: "Issues & dispositions",
    term: "Anomaly",
    slug: "anomaly",
    definition:
      "An unexpected behaviour or result during test or operation that must be investigated, explained and resolved or accepted.",
    see: aero("/aeaip/demo"),
  },
  {
    group: "Issues & dispositions",
    term: "Deviation",
    slug: "deviation",
    definition:
      "Approved permission to depart from a requirement, usually granted before the work is done and limited in scope. Exact definitions vary by framework.",
  },
  {
    group: "Issues & dispositions",
    term: "Waiver",
    slug: "waiver",
    definition:
      "Approved acceptance of an item or condition that does not meet a requirement, usually after the fact, with its risk accepted by the responsible authority. Some frameworks, including NASA's, distinguish deviation and waiver by when the requirement entered configuration control.",
  },
  {
    group: "Issues & dispositions",
    term: "Corrective action",
    slug: "corrective-action",
    definition:
      "Action taken to remove the cause of a nonconformance or anomaly and prevent recurrence, followed by verification that it worked.",
  },
  /* Configuration */
  {
    group: "Configuration",
    term: "Configuration baseline",
    slug: "configuration-baseline",
    definition:
      "An approved, controlled description of a product at a point in time, such as requirements, design or as-built, that can only change through formal change control.",
    see: CONFIG,
  },
  {
    group: "Configuration",
    term: "Configuration item",
    slug: "configuration-item",
    definition:
      "Hardware, software or documentation that is placed under configuration management and identified by part number, revision or version.",
    see: CONFIG,
  },
  {
    group: "Configuration",
    term: "SBOM",
    slug: "sbom",
    definition:
      "Software bill of materials: a list of the components, versions and suppliers that make up a software build.",
    see: CYBER,
  },
  /* Reviews */
  ...(
    [
      ["MCR", "Mission Concept Review", "Confirms the mission need and that a feasible concept exists."],
      ["SRR", "System Requirements Review", "Confirms the system requirements are a sound, verifiable baseline."],
      ["SDR", "System Definition Review", "Confirms the architecture and requirement allocation meet the system requirements."],
      ["PDR", "Preliminary Design Review", "Confirms the preliminary design meets requirements with acceptable risk, before detailed design."],
      ["CDR", "Critical Design Review", "Confirms the detailed design is complete and ready to build and verify."],
      ["SIR", "System Integration Review", "Confirms items, facilities and procedures are ready for integration."],
      ["TRR", "Test Readiness Review", "Confirms a formal test is ready to start and will produce valid evidence."],
      ["SAR", "System Acceptance Review", "Confirms the system is built, verified and ready for acceptance."],
      ["ORR", "Operational Readiness Review", "Confirms systems, procedures and people are ready to operate."],
      ["FRR", "Flight Readiness Review", "Determines whether the flight system is ready for a safe and successful flight."],
      [
        "MRR",
        "Mission Readiness Review",
        "In GAMYAA's illustrative model, the final integrated readiness review across flight, ground, launch and operations.",
      ],
    ] as const
  ).map(([code, name, def]) => ({
    group: "Engineering reviews",
    term: `${code} — ${name}`,
    slug: code.toLowerCase(),
    definition: `${def} Review sets and criteria are defined by each programme.`,
    see: `${GATES}#${code.toLowerCase()}`,
  })),
  /* Quality & assurance */
  {
    group: "Quality & assurance",
    term: "FAI",
    slug: "fai",
    definition:
      "First Article Inspection: a complete, documented verification that the first production article meets every drawing and specification requirement.",
    see: FAI,
  },
  {
    group: "Quality & assurance",
    term: "AS9102",
    slug: "as9102",
    definition:
      "The aerospace standard (SAE / IAQG) that defines First Article Inspection requirements and the structure of the First Article Inspection Report.",
    see: FAI,
  },
  {
    group: "Quality & assurance",
    term: "Mission assurance",
    slug: "mission-assurance",
    definition:
      "The disciplined application of engineering, quality, safety, reliability and risk practices across the life cycle to raise confidence that a mission will succeed.",
    see: SAT,
  },
  {
    group: "Quality & assurance",
    term: "Product assurance",
    slug: "product-assurance",
    definition:
      "In ECSS usage, the discipline that covers quality assurance, dependability, safety, EEE components, materials and processes, and software product assurance for space products.",
    see: aero("/aeaip/standards-frameworks"),
  },
];
