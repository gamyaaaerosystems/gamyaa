import type { Status } from "./status";

export type Solution = {
  slug: string;
  /** Short label for navigation and cards. */
  label: string;
  /** H1 on the solution page. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  flow: string[];
  covers: string[];
  forWho: string;
  product: "daqip" | "aircert" | "both";
  status: Status;
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
    intro:
      "Every inspection starts with the drawing. Drawing Intelligence identifies dimensional characteristics, GD&T, tolerances and notes, and keeps them tied to the drawing revision they came from, so engineers review a structured list instead of re-typing the drawing.",
    flow: ["Drawing", "Characteristics", "GD&T & Tolerances", "Notes", "Reviewed Requirements"],
    covers: [
      "Dimensional characteristics and drawing ballooning",
      "GD&T, datums and feature control frames",
      "Tolerances and units",
      "Drawing notes and referenced specifications",
      "Revision-aware characteristic lists",
      "Engineer verification of every extracted characteristic",
    ],
    forWho: "Manufacturing engineers, quality engineers and inspection planners.",
    product: "daqip",
    status: "in-development",
  },
  {
    slug: "first-article-inspection",
    label: "First Article Inspection",
    title: "First Article Inspection — From Drawing to Approved FAIR",
    metaTitle: "First Article Inspection (FAI) & AS9102 Software | Gamyaa AeroSystems",
    metaDescription:
      "AS9102-aligned First Article Inspection: drawing ballooning, Forms 1, 2 and 3, full and partial FAI, revision comparison, measurement evidence, FAIR review and approval history.",
    intro:
      "First Article Inspection proves that a production process can make a part that meets every requirement on the drawing. DAQIP structures the work from drawing to approved First Article Inspection Report (FAIR), with each characteristic accounted for.",
    flow: ["Drawing", "Balloon", "Characteristics", "Measurements", "AS9102", "Review", "Approval"],
    covers: [],
    forWho: "Aerospace and defence manufacturers, suppliers and quality teams.",
    product: "daqip",
    status: "in-development",
  },
  {
    slug: "inspection-intelligence",
    label: "Inspection Intelligence",
    title: "Inspection Intelligence — Every Characteristic, a Method and a Result",
    metaTitle: "Aerospace Inspection Software & Inspection Planning | Gamyaa AeroSystems",
    metaDescription:
      "Plan aerospace inspection by characteristic: measurement methods, gauges, CMM results and inspection evidence, each linked back to the drawing requirement.",
    intro:
      "Inspection Intelligence connects each requirement to how it will be measured, with which gauge or machine, and what result was recorded, so inspection evidence is complete and reviewable.",
    flow: ["Requirement", "Method", "Gauge / CMM", "Measurement", "Evidence"],
    covers: [
      "Inspection planning by characteristic",
      "Measurement method mapping",
      "Gauge assignment",
      "CMM result integration (planned)",
      "Inspection evidence linked to requirements",
    ],
    forWho: "Inspection teams, metrology labs and inspection partners.",
    product: "daqip",
    status: "in-development",
  },
  {
    slug: "manufacturing-quality",
    label: "Manufacturing Quality",
    title: "Manufacturing Quality — Traceable Evidence Through Production",
    metaTitle: "Defence Manufacturing Quality Software | Gamyaa AeroSystems",
    metaDescription:
      "Manufacturing quality for aerospace and defence: in-process and final inspection, manufacturing records and quality evidence linked to engineering requirements.",
    intro:
      "Manufacturing Quality keeps in-process and final inspection records connected to the engineering requirements they verify, so release decisions are made on complete evidence.",
    flow: ["Process", "In-process Inspection", "Final Inspection", "Records", "Release"],
    covers: [
      "In-process inspection",
      "Final inspection",
      "Manufacturing records",
      "Quality evidence and release",
    ],
    forWho: "Production, quality and manufacturing engineering teams in aerospace and defence MSMEs.",
    product: "daqip",
    status: "in-development",
  },
  {
    slug: "supplier-quality",
    label: "Supplier Quality",
    title: "Supplier Quality — One Evidence Standard Across the Supply Chain",
    metaTitle: "Aerospace Supplier Quality & Supplier FAIR | Gamyaa AeroSystems",
    metaDescription:
      "Aerospace supplier quality: supplier FAIR workflow, supplier inspection records, acceptance and rejection decisions, and supplier evidence in one traceable record.",
    intro:
      "Supplier Quality applies the same characteristic-level traceability to supplier deliveries: supplier FAIRs, inspection records and acceptance decisions held against the same requirements.",
    flow: ["Supplier FAIR", "Inspection Records", "Review", "Accept / Reject", "Evidence"],
    covers: [
      "Supplier FAIR workflow",
      "Supplier inspection records",
      "Acceptance and rejection",
      "Supplier evidence",
    ],
    forWho: "Prime contractors, tier suppliers and supplier quality engineers.",
    product: "daqip",
    status: "planned",
  },
  {
    slug: "airworthiness-certification",
    label: "Airworthiness Certification",
    title: "Airworthiness Certification Engineering — Structured, Traceable, Human-Approved",
    metaTitle: "Airworthiness Certification Software & Planning Support | Gamyaa AeroSystems",
    metaDescription:
      "AI-assisted airworthiness certification engineering: certification basis, requirements mapping, compliance matrix, means of compliance, certification planning and qualification test planning.",
    intro:
      "Airworthiness certification is documentation-heavy and standards-intensive. AirCert AI is planned to help teams structure the certification basis, map requirements, plan means of compliance and prepare traceable evidence, with every decision kept under engineering and authority control.",
    flow: ["Certification Basis", "Requirements", "Means of Compliance", "Verification", "Evidence", "Authority Review"],
    covers: [
      "Proposed certification basis and applicable standards",
      "Airworthiness and system requirements mapping",
      "Compliance matrix and means of compliance",
      "Certification planning with milestones and review gates",
      "Qualification and acceptance test planning",
      "Military airworthiness and civil certification contexts",
    ],
    forWho: "Design organisations, certification and safety engineers, and aerospace MSMEs.",
    product: "aircert",
    status: "planned",
    note: "AirCert AI assists certification engineering. It does not certify products or replace certification authorities.",
  },
  {
    slug: "certification-evidence",
    label: "Certification Evidence",
    title: "Certification Evidence Management — From Requirement to Compliance Finding",
    metaTitle: "Certification Evidence Management | Gamyaa AeroSystems",
    metaDescription:
      "Certification evidence management for aerospace and defence: evidence graph, readiness tracking, document completeness checks and authority comment resolution.",
    intro:
      "Certification evidence is only useful when it is complete, current and traceable. This solution connects requirements, verification, test results and evidence to compliance findings, and shows what is still missing.",
    flow: ["Requirement", "Verification", "Test Result", "Evidence", "Compliance Finding", "Approval"],
    covers: [
      "Certification evidence graph",
      "Certification evidence readiness (never a % certified)",
      "Document completeness checks",
      "Authority comment resolution",
      "Standard revision impact review",
    ],
    forWho: "Certification engineers, quality teams and programme managers.",
    product: "aircert",
    status: "planned",
  },
  {
    slug: "engineering-assurance",
    label: "Engineering Assurance",
    title: "Engineering Assurance — Design to Approval as One Digital Thread",
    metaTitle: "Aerospace Engineering Assurance | Gamyaa AeroSystems",
    metaDescription:
      "Aerospace engineering assurance connecting design, certification, manufacturing, inspection, evidence and approval through DAQIP™ and AirCert AI™.",
    intro:
      "Engineering assurance means a design requirement can be followed all the way to the measurement that proves it and the person who approved it. Connecting AirCert AI and DAQIP is how Gamyaa AeroSystems intends to deliver that thread.",
    flow: ["Design", "Certification", "Manufacturing", "Inspection", "Evidence", "Approval"],
    covers: [
      "Certification requirement to manufacturing characteristic linkage",
      "Change impact across design, test and FAI evidence",
      "Unified evidence and approval history",
      "Human review at every approval gate",
    ],
    forWho: "Engineering leadership, quality heads and certification managers.",
    product: "both",
    status: "research",
  },
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
