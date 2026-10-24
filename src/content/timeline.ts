export type Milestone = {
  year: string;
  phase: string;
  title: string;
  kind: "history" | "current" | "roadmap" | "vision";
  summary?: string;
  points: string[];
  flow?: string;
};

/**
 * Evolution timeline. 2024–2026 are history/current; 2027 onwards is
 * Roadmap / Vision and must always be presented as such.
 */
export const TIMELINE: Milestone[] = [
  {
    year: "2024",
    phase: "Idea",
    title: "December 2024",
    kind: "history",
    summary: "Initial aerospace and defence quality intelligence concept.",
    points: [
      "Idea to solve real-world aerospace and defence manufacturing, inspection, quality and engineering workflow challenges",
    ],
  },
  {
    year: "2025",
    phase: "POC",
    title: "POC & Customer Problem Validation",
    kind: "history",
    summary: "Problem validation and early engineering workflows.",
    points: [
      "Study aerospace / defence MSME quality challenges",
      "Validate FAI, inspection and documentation pain points",
      "Develop early engineering concepts and proof-of-concept workflows",
    ],
  },
  {
    year: "2026",
    phase: "Product & Company",
    title: "DAQIP™, AirCert AI™ and the AEAIP™ architecture",
    kind: "current",
    summary:
      "DAQIP™ in development, the AirCert AI™ concept, and convergence into one Engineering Assurance Intelligence architecture: AEAIP™.",
    points: [
      "Build DAQIP™ — Defence Aerospace Quality Intelligence Platform",
      "First Article Inspection / AS9102 intelligence",
      "Drawing, inspection and manufacturing-quality workflows",
      "Introduce the AirCert AI™ concept for airworthiness certification engineering",
      "Establish Gamyaa AeroSystems",
      "Converge quality and certification work into one architecture: AEAIP™ (Research & Architecture, October 2026)",
      "Choose satellites and spacecraft as AEAIP's first engineering focus",
      "Planned registration of Gamyaa AeroSystems Private Limited, India",
    ],
  },
  {
    year: "2027",
    phase: "Customer Validation",
    title: "From Product to Industry Adoption",
    kind: "roadmap",
    summary: "DAQIP pilots, and AEAIP evidence-foundation work with engineering teams.",
    points: [
      "DAQIP customer pilots",
      "AEAIP evidence foundation validated with satellite and spacecraft engineering teams",
      "Aerospace & defence MSME deployments",
      "Inspection and metrology partner integrations",
      "Supplier-quality workflows",
      "Advance AirCert AI from concept toward product",
      "Secure engineering evidence and compliance workflows",
    ],
  },
  {
    year: "2028",
    phase: "Cross-Domain Assurance",
    title: "Verification, Manufacturing and Certification Assurance in AEAIP™",
    kind: "roadmap",
    summary: "DAQIP™ and AirCert AI™ working within the AEAIP™ architecture.",
    flow: "Requirement → Configuration → Evidence → Verification → Readiness",
    points: [
      "Verification intelligence and configuration-aware evidence validity",
      "DAQIP™ manufacturing and AirCert AI™ certification evidence in one graph",
      "Human-governed, AI-assisted engineering workflows",
      "Partner and aerospace supply-chain ecosystem expansion",
    ],
  },
  {
    year: "2029",
    phase: "Aerospace Ecosystem",
    title: "Scale Beyond Individual Workflows",
    kind: "roadmap",
    summary: "Expand engineering intelligence across the aerospace supply chain.",
    points: [
      "Continuous engineering assurance across defence, aerospace and space programmes",
      "Global aerospace supply chains",
    ],
  },
  {
    year: "2030",
    phase: "Vision",
    title: "A trusted Engineering Assurance Intelligence layer for critical defence, aerospace and space systems.",
    kind: "vision",
    points: [],
  },
];
