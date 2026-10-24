import type { ProblemTopic } from "@/lib/analytics";
import type { Status } from "./status";

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
  /** The real engineering problem. */
  problem: string;
  /** Who experiences it. */
  who: string[];
  /** What Gamyaa helps with: the specific workflow. */
  helps: string[];
  /** Engineering flow visual. */
  flow: string[];
  /** What becomes traceable or more efficient. */
  outcomes: string[];
  product: "daqip" | "aircert" | "both";
  status: Status;
  /** GA4 problem_discussion_click topic for this page's CTA. */
  topic: ProblemTopic;
  note?: string;
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
    problem:
      "Before a part can be inspected, someone has to read the drawing and turn every dimension, tolerance, GD&T callout and note into an inspection characteristic. That work is usually done by hand in spreadsheets, repeated at every revision, and easy to get wrong on dense aerospace drawings.",
    who: ["Manufacturing engineers", "Quality engineers", "Inspection planners", "Engineering & manufacturing architects"],
    helps: [
      "Identify dimensional characteristics, GD&T callouts, datums, tolerances and notes on the drawing",
      "Assign balloon numbers and build a characteristic list tagged to the drawing revision",
      "Present every extracted item for engineer review before it is used",
      "Carry verified characteristics into inspection planning and First Article Inspection",
    ],
    flow: ["Drawing", "Characteristics", "GD&T & Tolerances", "Engineer Review", "Characteristic List"],
    outcomes: [
      "Every characteristic traceable to a location on a specific drawing revision",
      "Less manual re-typing between drawing, spreadsheet and inspection plan",
      "A reviewed characteristic list ready for FAI and inspection",
    ],
    product: "daqip",
    status: "in-development",
    topic: "fai",
  },
  {
    slug: "first-article-inspection",
    label: "First Article Inspection",
    title: "First Article Inspection Software for Aerospace & Defence",
    metaTitle: "First Article Inspection (FAI) & AS9102 Software for Aerospace | Gamyaa AeroSystems",
    metaDescription:
      "First Article Inspection software for aerospace and defence: drawing ballooning, AS9102 Forms 1, 2 and 3, full and partial FAI, measurement evidence and FAIR review.",
    intro: "From engineering drawing to reviewed FAIR.",
    problem:
      "First Article Inspection on a complex aerospace part can mean hundreds of characteristics ballooned by hand, transcribed into spreadsheets and matched to inspection reports before a First Article Inspection Report (FAIR) can be reviewed. A drawing revision restarts much of that work.",
    who: ["Aerospace & defence manufacturers", "Suppliers delivering FAIRs to primes", "Quality and inspection teams"],
    helps: [
      "Balloon the drawing and build the characteristic list",
      "Structure Forms 1, 2 and 3 of AS9102",
      "Record measurements against each characteristic",
      "Review the FAIR and keep the approval history",
    ],
    flow: ["Drawing", "Balloon", "Characteristics", "Measurements", "AS9102", "Review"],
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
    problem:
      "Inspection plans, gauge selections, CMM programs and measurement results often live in different files and systems. When a customer or auditor asks how a characteristic was verified, the answer has to be reconstructed from several sources.",
    who: ["Inspection teams", "Metrology labs and inspection partners", "Quality engineers"],
    helps: [
      "Plan inspection characteristic by characteristic",
      "Map each characteristic to a measurement method and a gauge or machine",
      "Record each result against the requirement it verifies",
      "Bring in CMM results (planned)",
    ],
    flow: ["Requirement", "Method", "Gauge / CMM", "Measurement", "Evidence"],
    outcomes: [
      "Each measurement linked to its requirement, method and instrument",
      "Unmeasured or unmapped characteristics visible before release",
      "Inspection evidence ready for FAI and customer review",
    ],
    product: "daqip",
    status: "in-development",
    topic: "inspection",
  },
  {
    slug: "manufacturing-quality",
    label: "Manufacturing Quality",
    title: "Manufacturing Quality — Traceable Evidence Through Production",
    metaTitle: "Defence Manufacturing Quality Software | Gamyaa AeroSystems",
    metaDescription:
      "Manufacturing quality for aerospace and defence: in-process and final inspection, manufacturing records and quality evidence linked to engineering requirements.",
    intro: "In-process checks, final inspection and records held against the requirements they verify.",
    problem:
      "In-process checks, final inspection and manufacturing records are captured on travellers, check sheets and local systems. A release decision then depends on someone piecing those records together, often under schedule pressure.",
    who: ["Aerospace & defence manufacturers", "Production and quality teams", "Quality heads at MSMEs"],
    helps: [
      "Define in-process and final inspection points from the characteristic list",
      "Capture results and records against each operation",
      "Hold release decisions to complete, reviewed evidence",
    ],
    flow: ["Process", "In-process Inspection", "Final Inspection", "Records", "Release"],
    outcomes: [
      "One record of what was checked, when, by whom and against which requirement",
      "Release decisions made on complete evidence",
      "Recurring issues visible across batches (planned analytics)",
    ],
    product: "daqip",
    status: "in-development",
    topic: "manufacturing_quality",
  },
  {
    slug: "supplier-quality",
    label: "Supplier Quality",
    title: "Supplier Quality — One Evidence Standard Across the Supply Chain",
    metaTitle: "Aerospace Supplier Quality & Supplier FAIR | Gamyaa AeroSystems",
    metaDescription:
      "Aerospace supplier quality: supplier FAIR workflow, supplier inspection records, acceptance and rejection decisions, and supplier evidence in one traceable record.",
    intro: "Supplier FAIRs and inspection records reviewed against the same requirements as your own.",
    problem:
      "Primes and tier suppliers exchange FAIRs and inspection reports as PDFs and spreadsheets in different formats. Reviewing them against the drawing is slow, and the reasons behind an acceptance or rejection are hard to find later.",
    who: ["Prime contractors", "Tier suppliers", "Supplier quality engineers"],
    helps: [
      "Receive supplier FAIRs against the same characteristic structure",
      "Review supplier inspection records requirement by requirement",
      "Record acceptance or rejection with reasons and evidence",
    ],
    flow: ["Supplier FAIR", "Inspection Records", "Review", "Accept / Reject", "Evidence"],
    outcomes: [
      "Supplier evidence held to the same standard as internal evidence",
      "A traceable acceptance and rejection history per supplier and part",
      "A foundation for supplier risk insight (planned)",
    ],
    product: "daqip",
    status: "planned",
    topic: "supplier_quality",
  },
  {
    slug: "airworthiness-certification",
    label: "Airworthiness Certification",
    title: "Airworthiness Certification Engineering — Structured, Traceable, Human-Approved",
    metaTitle: "Airworthiness Certification Software & Planning Support | Gamyaa AeroSystems",
    metaDescription:
      "AI-assisted airworthiness certification engineering: certification basis, requirements mapping, compliance matrix, means of compliance, certification planning and qualification test planning.",
    intro: "Certification basis, requirements and means of compliance kept consistent across a programme.",
    problem:
      "Airworthiness certification asks a team to establish a certification basis, map every applicable requirement, agree means of compliance and plan verification, across documents that change over a multi-year programme. Smaller design organisations often lack dedicated certification staff to keep it all consistent.",
    who: ["Design organisations", "Certification and safety engineers", "Aerospace & defence MSMEs", "System architects"],
    helps: [
      "Propose a certification basis and applicable standards for engineer review",
      "Map airworthiness, system and customer requirements with source, revision and clause",
      "Build the compliance matrix and assign means of compliance",
      "Plan qualification and acceptance testing with review gates",
    ],
    flow: ["Certification Basis", "Requirements", "Means of Compliance", "Verification", "Evidence", "Authority Review"],
    outcomes: [
      "A living certification plan instead of disconnected documents",
      "Every requirement mapped to a means of compliance and an owner",
      "Earlier visibility of gaps before authority review",
    ],
    product: "aircert",
    status: "planned",
    topic: "airworthiness",
    note: "AirCert AI assists certification engineering. It does not independently certify aerospace products or replace certification authorities.",
  },
  {
    slug: "certification-evidence",
    label: "Certification Evidence",
    title: "Certification Evidence Management — From Requirement to Compliance Finding",
    metaTitle: "Certification Evidence Management | Gamyaa AeroSystems",
    metaDescription:
      "Certification evidence management for aerospace and defence: evidence graph, readiness tracking, document completeness checks and authority comment resolution.",
    intro: "Know what evidence exists, what is approved and what is still missing.",
    problem:
      "Late in a certification programme, teams discover missing test reports, outdated evidence and authority comments that were never closed. The difficulty is rarely the engineering itself; it is keeping the evidence complete and current.",
    who: ["Certification engineers", "Quality and programme managers", "Test teams"],
    helps: [
      "Link each requirement to its verification, test results and evidence",
      "Check completeness: missing, outdated or conflicting documents",
      "Track authority comments from response to closure",
      "Show evidence readiness, never a percentage certified",
    ],
    flow: ["Requirement", "Verification", "Test Result", "Evidence", "Compliance Finding", "Approval"],
    outcomes: [
      "A current view of available, approved and missing evidence",
      "Authority comments with owners and closure evidence",
      "Impact review when a standard or a design changes",
    ],
    product: "aircert",
    status: "planned",
    topic: "certification",
  },
  {
    slug: "engineering-assurance",
    label: "Engineering Assurance",
    title: "Engineering Assurance — Design to Approval as One Digital Thread",
    metaTitle: "Aerospace Engineering Assurance | Gamyaa AeroSystems",
    metaDescription:
      "Aerospace engineering assurance connecting design, certification, manufacturing, inspection, evidence and approval through DAQIP™ and AirCert AI™ within the AEAIP™ architecture.",
    intro: "Follow a design requirement to the measurement that proves it and the person who approved it.",
    problem:
      "Design assurance and manufacturing quality are usually managed by different teams in different tools. When a design changes, nobody can easily see which certification evidence, inspection plans or FAIs are affected.",
    who: ["Engineering leadership", "Quality heads", "Certification managers", "Engineering & manufacturing architects"],
    helps: [
      "Link certification and design requirements to manufacturing characteristics",
      "Show the impact of a design change across safety, test, FAI and manufacturing evidence",
      "Keep one approval history from design to delivery",
      "Carry the same evidence into system-level readiness in AEAIP™",
    ],
    flow: ["Design", "Certification", "Manufacturing", "Inspection", "Evidence", "Approval"],
    outcomes: [
      "One digital thread from requirement to measured evidence",
      "Change impact visible before it becomes a nonconformance",
      "Human review at every approval gate",
    ],
    product: "both",
    status: "research",
    topic: "general",
  },
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
