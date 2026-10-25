import type { ProblemTopic } from "@/lib/analytics";
import { aero } from "@/lib/site";
import type { Status } from "./status";

export type SolutionGroup = "manufacturing" | "certification" | "system";

/** Solutions are grouped by the assurance domain (and platform) that delivers them. */
export const SOLUTION_GROUPS: Array<{
  key: SolutionGroup;
  title: string;
  summary: string;
  platform: { label: string; name: string; href: string };
}> = [
  {
    key: "manufacturing",
    title: "Manufacturing Assurance",
    summary: "From the engineering drawing to approved inspection evidence.",
    platform: { label: "DAQIP™", name: "Platform 02 · Manufacturing Assurance Intelligence", href: aero("/daqip") },
  },
  {
    key: "certification",
    title: "Certification Assurance",
    summary: "From the certification basis to evidence ready for authority review.",
    platform: { label: "AirCert AI™", name: "Platform 03 · Certification Assurance Intelligence", href: aero("/aircert-ai") },
  },
  {
    key: "system",
    title: "System Assurance",
    summary: "Requirement, configuration, evidence and verification, connected into readiness.",
    platform: { label: "AEAIP™", name: "Platform 01 · Engineering Assurance Intelligence", href: aero("/aeaip") },
  },
];

/** Illustrative example shown on a solution page. All values are fictitious. */
export type SolutionExample = {
  title: string;
  rows: Array<[string, string]>;
  outcome: string;
};

export type Solution = {
  slug: string;
  /** Short label for navigation and cards. */
  label: string;
  /** H1 on the solution page. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line summary shown under the H1. */
  intro: string;
  group: SolutionGroup;
  /** The real engineering problem. */
  problem: string;
  /** Why it matters: the consequence if the problem is left alone. */
  why: string;
  /** Who experiences it. */
  who: string[];
  /** What Gamyaa helps with: the specific workflow. */
  helps: string[];
  /** Workflow shown as an Evidence Line. */
  flow: string[];
  flowTitle: string;
  /** What becomes traceable or more efficient. */
  outcomes: string[];
  product: "daqip" | "aircert" | "aeaip";
  status: Status;
  /** GA4 problem_discussion_click topic for this page's CTA. */
  topic: ProblemTopic;
  note?: string;
  example?: SolutionExample;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "drawing-intelligence",
    label: "Drawing Intelligence",
    title: "Drawing Intelligence — Engineering Drawings as Structured Requirements",
    metaTitle: "Drawing Intelligence & Ballooning for Aerospace | Gamyaa AeroSystems",
    metaDescription:
      "Turn aerospace and defence engineering drawings into structured characteristics: dimensions, GD&T, tolerances, notes and revisions, ready for inspection and FAI.",
    intro: "From a dense aerospace drawing to a reviewed, revision-aware list of characteristics.",
    group: "manufacturing",
    problem:
      "Before a part can be inspected, someone has to read the drawing and turn every dimension, tolerance, GD&T callout and note into an inspection characteristic. That work is usually done by hand in spreadsheets, repeated at every revision, and easy to get wrong on dense aerospace drawings.",
    why:
      "Characteristics are the foundation of every inspection and FAI that follows. An error made at the drawing stage is carried into every downstream measurement and report, and is found late, if at all.",
    who: ["Manufacturing engineers", "Quality engineers", "Inspection planners", "Engineering & manufacturing architects"],
    helps: [
      "Identify dimensional characteristics, GD&T callouts, datums, tolerances and notes on the drawing",
      "Assign balloon numbers and build a characteristic list tagged to the drawing revision",
      "Present every extracted item for engineer review before it is used",
      "Carry verified characteristics into inspection planning and First Article Inspection",
    ],
    flow: ["Drawing", "Characteristics", "GD&T & Tolerances", "Engineer Review", "Characteristic List"],
    flowTitle: "From drawing to a reviewed characteristic list",
    outcomes: [
      "Every characteristic traceable to a location on a specific drawing revision",
      "Less manual re-typing between drawing, spreadsheet and inspection plan",
      "A reviewed characteristic list ready for FAI and inspection",
    ],
    product: "daqip",
    status: "in-development",
    topic: "fai",
    example: {
      title: "Machined housing drawing, Rev C",
      rows: [
        ["Characteristics suggested", "48"],
        ["Accepted by the engineer", "45"],
        ["Corrected", "2 tolerances"],
        ["Rejected", "1 duplicated note"],
        ["Tagged to", "Drawing Rev C"],
      ],
      outcome: "47 verified characteristics go into the inspection plan. Nothing is used without engineer review.",
    },
  },
  {
    slug: "first-article-inspection",
    label: "First Article Inspection",
    title: "First Article Inspection Software for Aerospace & Defence",
    metaTitle: "First Article Inspection (FAI) & AS9102 Software for Aerospace | Gamyaa AeroSystems",
    metaDescription:
      "First Article Inspection software for aerospace and defence: drawing ballooning, AS9102 Forms 1, 2 and 3, full and partial FAI, measurement evidence and FAIR review.",
    intro: "From engineering drawing to reviewed FAIR.",
    group: "manufacturing",
    problem:
      "First Article Inspection on a complex aerospace part can mean hundreds of characteristics ballooned by hand, transcribed into spreadsheets and matched to inspection reports before a First Article Inspection Report (FAIR) can be reviewed. A drawing revision restarts much of that work.",
    why:
      "A FAIR is the evidence that a production process can make a conforming part. When characteristics are missed or evidence cannot be traced, the FAI is repeated, deliveries slip and customer confidence suffers.",
    who: ["Aerospace & defence manufacturers", "Suppliers delivering FAIRs to primes", "Quality and inspection teams"],
    helps: [
      "Balloon the drawing and build the characteristic list",
      "Structure Forms 1, 2 and 3 of AS9102",
      "Record measurements against each characteristic",
      "Review the FAIR and keep the approval history",
    ],
    flow: ["Drawing", "Balloon", "Characteristics", "Measurements", "AS9102", "Review"],
    flowTitle: "From drawing to a reviewed FAIR",
    outcomes: [
      "Every characteristic accounted for on Form 3",
      "Partial and delta FAI scoped from what actually changed",
      "A FAIR whose evidence can be traced back to the drawing",
    ],
    product: "daqip",
    status: "in-development",
    topic: "fai",
  },
  {
    slug: "inspection-intelligence",
    label: "Inspection Intelligence",
    title: "Inspection Intelligence — Every Characteristic, a Method and a Result",
    metaTitle: "Aerospace Inspection Software & Inspection Planning | Gamyaa AeroSystems",
    metaDescription:
      "Plan aerospace inspection by characteristic: measurement methods, gauges, CMM results and inspection evidence, each linked back to the drawing requirement.",
    intro: "Know how every requirement was measured, with what, and what the result was.",
    group: "manufacturing",
    problem:
      "Inspection plans, gauge selections, CMM programs and measurement results often live in different files and systems. When a customer or auditor asks how a characteristic was verified, the answer has to be reconstructed from several sources.",
    why:
      "Customers, auditors and investigations ask how a characteristic was verified. When methods and results are disconnected, the answer is slow to give and hard to defend.",
    who: ["Inspection teams", "Metrology labs and inspection partners", "Quality engineers"],
    helps: [
      "Plan inspection characteristic by characteristic",
      "Map each characteristic to a measurement method and a gauge or machine",
      "Record each result against the requirement it verifies",
      "Bring in CMM results (planned)",
    ],
    flow: ["Requirement", "Method", "Gauge / CMM", "Measurement", "Evidence"],
    flowTitle: "From requirement to inspection evidence",
    outcomes: [
      "Each measurement linked to its requirement, method and instrument",
      "Unmeasured or unmapped characteristics visible before release",
      "Inspection evidence ready for FAI and customer review",
    ],
    product: "daqip",
    status: "in-development",
    topic: "inspection",
    example: {
      title: "Balloon 14: bore diameter",
      rows: [
        ["Requirement", "Ø12.000 +0.018 / 0 mm, drawing Rev C"],
        ["Method", "CMM, probing programme v3"],
        ["Instrument", "CMM-02, calibration current"],
        ["Result", "Ø12.011 mm · conforms"],
        ["Evidence", "CMM report linked to balloon 14"],
      ],
      outcome: "Asked how balloon 14 was verified, the team opens one record instead of four files.",
    },
  },
  {
    slug: "manufacturing-quality",
    label: "Manufacturing Quality",
    title: "Manufacturing Quality — Traceable Evidence Through Production",
    metaTitle: "Defence Manufacturing Quality Software | Gamyaa AeroSystems",
    metaDescription:
      "Manufacturing quality for aerospace and defence: in-process and final inspection, manufacturing records and quality evidence linked to engineering requirements.",
    intro: "In-process checks, final inspection and records held against the requirements they verify.",
    group: "manufacturing",
    problem:
      "In-process checks, final inspection and manufacturing records are captured on travellers, check sheets and local systems. A release decision then depends on someone piecing those records together, often under schedule pressure.",
    why:
      "A release decision is only as good as the records behind it. Gaps found after shipment become escapes, concessions and rework.",
    who: ["Aerospace & defence manufacturers", "Production and quality teams", "Quality heads at MSMEs"],
    helps: [
      "Define in-process and final inspection points from the characteristic list",
      "Capture results and records against each operation",
      "Hold release decisions to complete, reviewed evidence",
    ],
    flow: ["Process", "In-process Inspection", "Final Inspection", "Records", "Release"],
    flowTitle: "From process to release on complete evidence",
    outcomes: [
      "One record of what was checked, when, by whom and against which requirement",
      "Release decisions made on complete evidence",
      "Recurring issues visible across batches (planned analytics)",
    ],
    product: "daqip",
    status: "in-development",
    topic: "manufacturing_quality",
    example: {
      title: "Batch release, 20 parts",
      rows: [
        ["In-process checks", "6 of 6 recorded"],
        ["Final inspection", "20 of 20 parts recorded"],
        ["Missing record", "Operator sign-off at operation 40"],
        ["Release", "Held until the record is complete"],
      ],
      outcome: "The batch is released on complete, reviewed evidence, not on a reconstruction under schedule pressure.",
    },
  },
  {
    slug: "supplier-quality",
    label: "Supplier Quality",
    title: "Supplier Quality — One Evidence Standard Across the Supply Chain",
    metaTitle: "Aerospace Supplier Quality & Supplier FAIR | Gamyaa AeroSystems",
    metaDescription:
      "Aerospace supplier quality: supplier FAIR workflow, supplier inspection records, acceptance and rejection decisions, and supplier evidence in one traceable record.",
    intro: "Supplier FAIRs and inspection records reviewed against the same requirements as your own.",
    group: "manufacturing",
    problem:
      "Primes and tier suppliers exchange FAIRs and inspection reports as PDFs and spreadsheets in different formats. Reviewing them against the drawing is slow, and the reasons behind an acceptance or rejection are hard to find later.",
    why:
      "A prime's product is only as conforming as its supply chain. Inconsistent supplier evidence slows acceptance and makes the reasons for a rejection hard to defend later.",
    who: ["Prime contractors", "Tier suppliers", "Supplier quality engineers"],
    helps: [
      "Receive supplier FAIRs against the same characteristic structure",
      "Review supplier inspection records requirement by requirement",
      "Record acceptance or rejection with reasons and evidence",
    ],
    flow: ["Supplier FAIR", "Inspection Records", "Review", "Accept / Reject", "Evidence"],
    flowTitle: "From supplier FAIR to an accepted, evidenced part",
    outcomes: [
      "Supplier evidence held to the same standard as internal evidence",
      "A traceable acceptance and rejection history per supplier and part",
      "A foundation for supplier risk insight (planned)",
    ],
    product: "daqip",
    status: "planned",
    topic: "supplier_quality",
    example: {
      title: "Supplier FAIR for a machined fitting",
      rows: [
        ["Characteristics submitted", "37 of 38"],
        ["Missing", "Balloon 22, thread gauge result"],
        ["Decision", "Returned to the supplier with the reason"],
        ["History", "Reason and evidence kept with the part"],
      ],
      outcome: "Acceptance and rejection decisions are traceable per supplier and per part.",
    },
  },
  {
    slug: "airworthiness-certification",
    label: "Airworthiness Certification",
    title: "Airworthiness Certification Engineering — Structured, Traceable, Human-Approved",
    metaTitle: "Airworthiness Certification Software & Planning Support | Gamyaa AeroSystems",
    metaDescription:
      "AI-assisted airworthiness certification engineering: certification basis, requirements mapping, compliance matrix, means of compliance, certification planning and qualification test planning.",
    intro: "Certification basis, requirements and means of compliance kept consistent across a programme.",
    group: "certification",
    problem:
      "Airworthiness certification asks a team to establish a certification basis, map every applicable requirement, agree means of compliance and plan verification, across documents that change over a multi-year programme. Smaller design organisations often lack dedicated certification staff to keep it all consistent.",
    why:
      "Gaps discovered late in certification cost schedule and force rework of plans, tests and documents that were already agreed with the authority.",
    who: ["Design organisations", "Certification and safety engineers", "Aerospace & defence MSMEs", "System architects"],
    helps: [
      "Propose a certification basis and applicable standards for engineer review",
      "Map airworthiness, system and customer requirements with source, revision and clause",
      "Build the compliance matrix and assign means of compliance",
      "Plan qualification and acceptance testing with review gates",
    ],
    flow: ["Certification Basis", "Requirements", "Means of Compliance", "Verification", "Evidence", "Authority Review"],
    flowTitle: "From certification basis to authority review",
    outcomes: [
      "A living certification plan instead of disconnected documents",
      "Every requirement mapped to a means of compliance and an owner",
      "Earlier visibility of gaps before authority review",
    ],
    product: "aircert",
    status: "planned",
    topic: "airworthiness",
    note: "AirCert AI assists certification engineering. It does not independently certify aerospace products or replace certification authorities.",
    example: {
      title: "Equipment environmental requirement",
      rows: [
        ["Requirement", "Operate within specification from −40 °C to +70 °C"],
        ["Source", "Customer specification Rev C, clause 4.3.2"],
        ["Means of compliance", "Qualification test"],
        ["Verification", "Thermal test planned before qualification review"],
        ["Owner", "Certification engineer, assigned"],
      ],
      outcome: "The requirement is mapped, owned and planned before the qualification test plan is frozen.",
    },
  },
  {
    slug: "certification-evidence",
    label: "Certification Evidence",
    title: "Certification Evidence Management — From Requirement to Compliance Finding",
    metaTitle: "Certification Evidence Management | Gamyaa AeroSystems",
    metaDescription:
      "Certification evidence management for aerospace and defence: evidence graph, readiness tracking, document completeness checks and authority comment resolution.",
    intro: "Know what evidence exists, what is approved and what is still missing.",
    group: "certification",
    problem:
      "Late in a certification programme, teams discover missing test reports, outdated evidence and authority comments that were never closed. The difficulty is rarely the engineering itself; it is keeping the evidence complete and current.",
    why:
      "An authority review judges evidence, not intent. Missing or outdated evidence found at the review delays the programme and erodes the authority's confidence.",
    who: ["Certification engineers", "Quality and programme managers", "Test teams"],
    helps: [
      "Link each requirement to its verification, test results and evidence",
      "Check completeness: missing, outdated or conflicting documents",
      "Track authority comments from response to closure",
      "Show evidence readiness, never a percentage certified",
    ],
    flow: ["Requirement", "Verification", "Test Result", "Evidence", "Compliance Finding", "Approval"],
    flowTitle: "From requirement to compliance finding",
    outcomes: [
      "A current view of available, approved and missing evidence",
      "Authority comments with owners and closure evidence",
      "Impact review when a standard or a design changes",
    ],
    product: "aircert",
    status: "planned",
    topic: "certification",
    example: {
      title: "Evidence view before an authority review",
      rows: [
        ["Evidence approved", "160 items"],
        ["Outdated", "3 items, superseded by a design change"],
        ["Missing", "5 test reports"],
        ["Authority comments open", "4, each with an owner"],
      ],
      outcome: "The team sees its gaps months before the review, not the week before. Readiness is shown as evidence, never as a percentage certified.",
    },
  },
  {
    slug: "engineering-assurance",
    label: "Engineering Assurance",
    title: "Engineering Assurance",
    metaTitle: "Engineering Assurance for Aerospace & Space Systems | Gamyaa AeroSystems",
    metaDescription:
      "Engineering assurance connects requirements, configuration, evidence and verification so that readiness decisions rest on current evidence. How AEAIP™ approaches it for defence, aerospace and space programmes.",
    intro: "Know whether the evidence behind a readiness decision still applies to the configuration you are reviewing.",
    group: "system",
    problem:
      "Engineering evidence is fragmented across requirements tools, PLM, test reports, quality systems and spreadsheets. Each holds part of the picture; none shows whether the evidence still matches the configuration under review.",
    why:
      "A design change can quietly invalidate test results, qualification evidence and inspections that were valid yesterday. Without a connected view, a readiness decision may rest on evidence that no longer applies.",
    who: ["Chief engineers", "Systems and V&V engineers", "Mission and product assurance", "Quality and certification managers"],
    helps: [
      "Link requirements, configuration items, evidence and verification results in one engineering evidence graph",
      "Flag evidence at risk when the configuration it was produced on changes",
      "Show review readiness by gate, with every open item and its reason",
      "Keep the readiness decision with the engineers and authorities who own it",
    ],
    flow: ["Requirement", "Configuration", "Evidence", "Verification", "Readiness"],
    flowTitle: "Requirement to readiness",
    outcomes: [
      "Evidence that is known to match the configuration it claims to verify",
      "Change impact visible before it becomes a nonconformance",
      "A readiness view that explains itself, item by item",
    ],
    product: "aeaip",
    status: "research-architecture",
    topic: "general",
    example: {
      title: "Flight computer board, Rev D → Rev E",
      rows: [
        ["Affected evidence", "Thermal vacuum test, EMC test, board inspection"],
        ["State", "Evidence at risk"],
        ["Action", "Reverification required before the test readiness review"],
      ],
      outcome: "The change is visible at the review gate before it becomes a nonconformance.",
    },
  },
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
