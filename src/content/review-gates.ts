import type { GateCode } from "@/lib/analytics";

/**
 * Configurable Assurance Gates — the illustrative satellite/spacecraft lifecycle
 * used on this site. Review names, order, entrance criteria, success criteria and
 * required evidence are configurable per programme; this sequence is NOT presented
 * as "the NASA lifecycle", and no gate is claimed to be mandatory under any
 * framework. MRR means Mission Readiness Review in this GAMYAA model.
 *
 * All text is original GAMYAA explanation at an educational level.
 */
export type Gate = {
  code: GateCode;
  name: string;
  /** Where the gate sits in the illustrative lifecycle. */
  stage: string;
  purpose: string;
  questions: string[];
  evidence: string[];
  readiness: string;
  aeaip: string[];
};

export const GATES: Gate[] = [
  {
    code: "MCR",
    name: "Mission Concept Review",
    stage: "Concept",
    purpose:
      "Confirms that the mission need is understood and agreed, that the objectives are clear, and that at least one concept can plausibly meet them within the known cost, schedule and technical constraints.",
    questions: [
      "Is the mission need stated clearly enough that stakeholders agree on it?",
      "Is at least one concept feasible, and were credible alternatives compared?",
      "Have the driving requirements and the largest risks been identified?",
    ],
    evidence: [
      "Mission need and stakeholder expectations",
      "Draft concept of operations",
      "Alternative concepts and trade studies",
      "Preliminary mission objectives and success criteria",
      "Feasibility analyses and an initial risk list",
    ],
    readiness: "Is the concept credible enough to commit to formulation?",
    aeaip: [
      "Stakeholder needs captured as traceable nodes rather than slideware",
      "Trade studies linked to the objectives they informed",
      "Driving risks recorded with an owner",
    ],
  },
  {
    code: "SRR",
    name: "System Requirements Review",
    stage: "Requirements",
    purpose:
      "Confirms that the system requirements are complete enough, consistent, traceable to stakeholder needs and verifiable, so that architecture and design work can begin against a sound baseline.",
    questions: [
      "Does every system requirement trace to a stakeholder need or a stated constraint?",
      "Is every requirement verifiable, with a planned verification method?",
      "Are external interfaces and constraints identified, such as launch, ground and regulatory needs?",
    ],
    evidence: [
      "System requirements with rationale",
      "Traceability to mission objectives and stakeholder needs",
      "Planned verification method per requirement",
      "External interface requirements",
      "List of open items still to be determined or confirmed",
    ],
    readiness: "Are the requirements a baseline the team can design to?",
    aeaip: [
      "Requirements with no parent need or no rationale",
      "Requirements with no planned verification method",
      "Open to-be-determined items, each with an owner and a closure date",
    ],
  },
  {
    code: "SDR",
    name: "System Definition Review",
    stage: "Definition",
    purpose:
      "Confirms that the proposed architecture can satisfy the system requirements, and that requirements have been allocated and derived down to subsystems with defined interfaces. Some frameworks call this a Mission Definition Review.",
    questions: [
      "Does the architecture satisfy the system requirements?",
      "Has every system requirement been allocated, and are derived requirements justified?",
      "Are the major internal interfaces defined, and are technology risks understood?",
    ],
    evidence: [
      "System architecture and functional and physical decomposition",
      "Allocated and derived requirements",
      "Interface definitions between subsystems",
      "Mass, power, data and link budgets with margins",
      "Technology readiness assessments and an updated risk list",
    ],
    readiness: "Is the architecture ready to be designed in detail?",
    aeaip: [
      "System requirements that are not yet allocated to any subsystem",
      "Budgets and margins linked to the analyses that produced them",
      "Interfaces without an owner on both sides",
    ],
  },
  {
    code: "PDR",
    name: "Preliminary Design Review",
    stage: "Preliminary design",
    purpose:
      "Shows that the preliminary design meets the requirements with acceptable risk and adequate margin, that interfaces and verification plans are defined well enough, and that the project can proceed to detailed design.",
    questions: [
      "Does the preliminary design meet every requirement with adequate margin?",
      "Is there a verification approach for every requirement?",
      "Are long-lead items, heritage assumptions and key risks under control?",
    ],
    evidence: [
      "Preliminary design and the analyses that support it",
      "Subsystem specifications and preliminary interface control documents",
      "Draft verification plan or verification matrix",
      "Heritage and similarity assessments",
      "Preliminary safety, reliability and failure-mode analyses",
    ],
    readiness: "Can we commit to detailed design?",
    aeaip: [
      "Requirements with no design response yet",
      "Analyses that were run on an earlier design revision",
      "Verification-plan coverage, requirement by requirement",
    ],
  },
  {
    code: "CDR",
    name: "Critical Design Review",
    stage: "Detailed design",
    purpose:
      "Shows that the detailed design is complete and mature, meets the requirements with adequate margin, and is ready for fabrication, assembly, integration and verification.",
    questions: [
      "Is the design complete enough to build, under configuration control?",
      "Do the detailed analyses close against the requirements?",
      "Are the verification and test plans, and the qualification approach, complete?",
    ],
    evidence: [
      "Released drawings, schematics and software design",
      "Final structural, thermal, power and link analyses",
      "Baselined interface control documents",
      "Verification, test and qualification plans",
      "Parts, materials and processes lists; updated hazard and failure-mode analyses",
    ],
    readiness: "Can we build it, and will we be able to prove it?",
    aeaip: [
      "Whether each analysis matches the released design revision",
      "Requirements without a planned verification event",
      "Open design issues and their effect on the build-to baseline",
    ],
  },
  {
    code: "SIR",
    name: "System Integration Review",
    stage: "Integration",
    purpose:
      "Confirms that the components and subsystems to be integrated are complete and accepted, and that the facilities, support equipment, procedures and people for integration are ready.",
    questions: [
      "Are the items to be integrated complete, accepted and in the expected configuration?",
      "Are integration procedures, ground support equipment and facilities ready?",
      "Are interface verification results available for what will be connected?",
    ],
    evidence: [
      "Component and subsystem acceptance data",
      "Integration plan, procedures and ground support equipment readiness",
      "Interface verification results (fit checks, electrical interface tests)",
      "As-built configuration of each incoming item",
      "Open nonconformances and waivers against incoming items",
    ],
    readiness: "Can integration start without avoidable rework?",
    aeaip: [
      "As-built against as-designed configuration for each item",
      "Open NCRs on items about to be integrated",
      "Interface evidence for every connection in the integration sequence",
    ],
  },
  {
    code: "TRR",
    name: "Test Readiness Review",
    stage: "Test",
    purpose:
      "Confirms that the test article, facility, procedures, instrumentation, people and data systems are ready to start a formal verification test, so that the test produces valid, traceable evidence. A programme may hold a TRR for each major test.",
    questions: [
      "Is the test article in the configuration the evidence must represent?",
      "Are the procedures approved and traced to the requirements they verify?",
      "Are prerequisite tests complete and open anomalies dispositioned?",
      "Are pass/fail criteria, calibration, data capture and safety controls in place?",
    ],
    evidence: [
      "Approved test plan and test procedure",
      "Requirement-to-test mapping",
      "Test article configuration and pedigree",
      "Facility and instrumentation calibration records",
      "Prerequisite test results and open anomaly, NCR and waiver dispositions",
      "Hazard controls and the test safety plan",
    ],
    readiness: "Will this test produce evidence that counts?",
    aeaip: [
      "Configuration match between the test article and the configuration under review",
      "Procedure revision approved and linked to its requirements",
      "Open issues, dependencies and the requirements the test is expected to close",
    ],
  },
  {
    code: "SAR",
    name: "System Acceptance Review",
    stage: "Acceptance",
    purpose:
      "Confirms that the system has been built and verified, meets its requirements or has approved exceptions, and is ready to be accepted by the customer or shipped for launch.",
    questions: [
      "Is verification closed for every requirement, or is each exception approved?",
      "Does the as-built configuration match the configuration that was verified?",
      "Is the acceptance data package complete?",
    ],
    evidence: [
      "Verification closure records for every requirement",
      "Acceptance test results",
      "As-built configuration and configuration audit results",
      "Acceptance data package",
      "Approved waivers and deviations; open item list",
    ],
    readiness: "Can ownership transfer with full knowledge of what is proven?",
    aeaip: [
      "Verification closure state across the whole requirement set",
      "Evidence validity against the as-built configuration",
      "Approval state of every waiver and deviation",
    ],
  },
  {
    code: "ORR",
    name: "Operational Readiness Review",
    stage: "Operations preparation",
    purpose:
      "Confirms that the system, ground segment, procedures, documentation and people are ready to operate the mission, including contingency response.",
    questions: [
      "Have operations procedures been validated in end-to-end tests and rehearsals?",
      "Are the ground segment and command-and-control links ready, including their security?",
      "Are contingency procedures and anomaly response defined and practised?",
    ],
    evidence: [
      "Operations procedures and flight rules",
      "End-to-end tests between flight and ground systems",
      "Mission simulations and rehearsals",
      "Operator training records",
      "Ground segment verification and security assessments; contingency plans",
    ],
    readiness: "Can people operate the system safely and effectively?",
    aeaip: [
      "Validation evidence for each operations procedure",
      "Ground segment and security evidence, including remediation retests",
      "Open operations items carried from earlier gates",
    ],
  },
  {
    code: "FRR",
    name: "Flight Readiness Review",
    stage: "Flight preparation",
    purpose:
      "Examines the tests, analyses, demonstrations and audits that support flight, to determine whether the flight system is ready for a safe and successful launch, including its launch vehicle and range interfaces.",
    questions: [
      "Is the flight configuration the configuration that was verified?",
      "Are launch vehicle and launch site interfaces verified?",
      "Is every open anomaly and waiver dispositioned, with residual risk accepted by the right authority?",
    ],
    evidence: [
      "Launch vehicle interface verification",
      "Final verification closure",
      "Final flight software configuration",
      "Open anomalies and waivers with risk acceptance",
      "Launch site processing records and safety approvals",
    ],
    readiness: "Is the remaining risk known, accepted by the right authority and acceptable for flight?",
    aeaip: [
      "Final configuration compared with the verified configuration",
      "Evidence invalidated by late changes",
      "Residual risk and the authority that accepted it",
    ],
  },
  {
    code: "MRR",
    name: "Mission Readiness Review",
    stage: "Mission",
    purpose:
      "In this GAMYAA model, the final integrated look across the flight system, launch, ground segment and operations, to confirm that the mission as a whole is ready to proceed. Some programmes combine this with the FRR or use launch readiness reviews instead.",
    questions: [
      "Are flight, ground and operations readiness all confirmed, with no unresolved conflicts?",
      "Are mission-level risks accepted by the responsible authority?",
      "Are go/no-go criteria for launch and early operations defined?",
    ],
    evidence: [
      "FRR and ORR outcomes and their conditions",
      "Mission-level risk acceptance",
      "Launch and early operations plan",
      "Readiness of external partners such as launch provider and ground stations",
      "Applicable regulatory authorisations and frequency coordination",
    ],
    readiness: "Is the whole mission, not only the spacecraft, ready?",
    aeaip: [
      "Conditions carried forward from every earlier gate",
      "Status of authorisations and external dependencies",
      "One consolidated, explainable readiness position for the board",
    ],
  },
];

export const gateByCode = (code: string) => GATES.find((g) => g.code === code);
