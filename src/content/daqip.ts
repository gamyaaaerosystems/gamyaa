import type { Status } from "./status";

export const DAQIP = {
  name: "DAQIP™",
  plainName: "DAQIP",
  expanded: "Defence Aerospace Quality Intelligence Platform",
  tagline: "From Engineering Intent to Manufacturing Evidence.",
  coreMessage: "Every requirement. Every measurement. Every approval. Traceable.",
  philosophy: "AI assists. Engineers verify. Quality approves. DAQIP preserves the evidence.",
  shortExplanation:
    "A digital quality intelligence platform connecting engineering drawings, First Article Inspection, inspection, manufacturing evidence and approval.",
  oneSentence:
    "DAQIP is Gamyaa AeroSystems' defence and aerospace manufacturing quality intelligence platform for FAI, inspection, quality evidence and engineering traceability.",
  summary:
    "DAQIP connects engineering drawings, manufacturing requirements, inspection planning, First Article Inspection, measurement evidence, supplier quality and approval through a trusted digital thread.",
  definition:
    "DAQIP is the Defence Aerospace Quality Intelligence Platform developed by Gamyaa AeroSystems for aerospace and defence manufacturing quality, First Article Inspection, inspection intelligence, manufacturing evidence, supplier quality and engineering traceability.",
} as const;

export type Capability = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  status: Status;
};

export const DAQIP_CAPABILITIES: Capability[] = [
  {
    id: "drawing",
    title: "Drawing Intelligence",
    summary: "Engineering drawings turned into structured, reviewable requirements.",
    items: [
      "Engineering drawings",
      "Dimensional characteristics",
      "GD&T",
      "Tolerances",
      "Notes",
      "Revision understanding",
    ],
    status: "in-development",
  },
  {
    id: "fai",
    title: "First Article Inspection Intelligence",
    summary: "Characteristic accountability from balloon to approved FAIR.",
    items: [
      "Ballooning",
      "AS9102 Forms 1, 2 and 3",
      "Full FAI",
      "Partial FAI",
      "Delta FAI",
      "FAIR workflow",
      "Characteristic accountability",
    ],
    status: "in-development",
  },
  {
    id: "inspection",
    title: "Inspection Intelligence",
    summary: "Every characteristic mapped to a method, a gauge and a result.",
    items: [
      "Inspection planning",
      "Measurement method mapping",
      "Gauges",
      "CMM integration (planned)",
      "Inspection evidence",
    ],
    status: "in-development",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Quality",
    summary: "In-process and final inspection records linked to requirements.",
    items: [
      "In-process inspection",
      "Final inspection",
      "Manufacturing records",
      "Quality evidence",
    ],
    status: "in-development",
  },
  {
    id: "supplier",
    title: "Supplier Quality",
    summary: "Supplier FAIRs and inspection evidence held to the same standard.",
    items: [
      "Supplier FAIR workflow",
      "Supplier inspection records",
      "Acceptance / rejection",
      "Supplier evidence",
    ],
    status: "planned",
  },
  {
    id: "ncr",
    title: "Nonconformance Intelligence",
    summary: "Nonconformances traced to the characteristic and closed with evidence.",
    items: ["NCR", "MRB", "Root cause", "Corrective action", "CAPA"],
    status: "planned",
  },
  {
    id: "configuration",
    title: "Configuration Intelligence",
    summary: "Drawing revisions and their impact on inspection and FAI.",
    items: ["Drawing revisions", "Change impact", "Delta FAI", "Traceability"],
    status: "planned",
  },
  {
    id: "evidence-graph",
    title: "Quality Evidence Graph",
    summary: "Requirement → Method → Measurement → Evidence → Approval.",
    items: [
      "Requirement-level traceability",
      "Method and measurement linkage",
      "Evidence provenance",
      "Approval history",
    ],
    status: "in-development",
  },
  {
    id: "ai-assurance",
    title: "AI Assurance",
    summary: "Human-controlled AI assistance. AI never approves quality.",
    items: [
      "AI suggestions marked as unverified",
      "Engineer verification before use",
      "Quality approval remains human",
      "Every AI-assisted step recorded",
    ],
    status: "in-development",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    summary: "Engineering data protected by design.",
    items: [
      "Role-based access",
      "Audit trails",
      "Evidence integrity",
      "Provenance",
      "Protected engineering data",
    ],
    status: "in-development",
  },
  {
    id: "executive",
    title: "Executive Quality Intelligence",
    summary: "Quality trends that leadership can act on.",
    items: [
      "Supplier risk",
      "Recurring defects",
      "Inspection trends",
      "Rejection patterns",
      "Cost of poor quality",
      "Manufacturing-quality analytics",
    ],
    status: "planned",
  },
];

export const DAQIP_FAQ = [
  {
    q: "What is DAQIP?",
    a: DAQIP.definition,
  },
  {
    q: "Who makes DAQIP?",
    a: "DAQIP is developed by Gamyaa AeroSystems, Bangalore, India.",
  },
  {
    q: "Who is DAQIP for?",
    a: "Aerospace and defence manufacturers and MSMEs, their quality and inspection teams, inspection and metrology partners, and the engineering teams that define manufacturing and inspection requirements.",
  },
  {
    q: "What problem does DAQIP solve?",
    a: "Quality evidence in aerospace and defence manufacturing is often spread across drawings, spreadsheets, inspection reports and email. DAQIP links each drawing requirement to its inspection method, measurement, evidence and approval so that every characteristic can be traced and reviewed.",
  },
  {
    q: "Which standards and processes does DAQIP support?",
    a: "DAQIP is designed around First Article Inspection workflows aligned with AS9102 (Forms 1, 2 and 3; full, partial and delta FAI), GD&T-based drawing characteristics, inspection planning and nonconformance handling. Using DAQIP does not by itself make an organisation compliant with AS9102 or AS9100; compliance remains the responsibility of the organisation's quality system.",
  },
  {
    q: "Is DAQIP available today?",
    a: "DAQIP is in development. Drawing, First Article Inspection, inspection and manufacturing-quality workflows are being built first. Supplier quality, nonconformance, configuration and executive analytics are planned. Each capability on this page carries its current status.",
  },
  {
    q: "Does DAQIP approve parts automatically?",
    a: "No. AI in DAQIP assists engineers, for example by suggesting characteristics from a drawing. Engineers verify, quality approves, and DAQIP records the evidence and the approval history.",
  },
];
