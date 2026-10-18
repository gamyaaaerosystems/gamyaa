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
    title: "DAQIP™ + Gamyaa AeroSystems",
    kind: "current",
    summary: "DAQIP™, the AirCert AI™ concept and the formation of Gamyaa AeroSystems.",
    points: [
      "Build DAQIP™ — Defence Aerospace Quality Intelligence Platform",
      "First Article Inspection / AS9102 intelligence",
      "Drawing, inspection and manufacturing-quality workflows",
      "Introduce the AirCert AI™ concept for airworthiness certification engineering",
      "Establish Gamyaa AeroSystems",
      "Planned registration of Gamyaa AeroSystems Private Limited, India",
    ],
  },
  {
    year: "2027",
    phase: "Customer Validation",
    title: "From Product to Industry Adoption",
    kind: "roadmap",
    summary: "DAQIP pilots and industry feedback.",
    points: [
      "DAQIP customer pilots",
      "Aerospace & defence MSME deployments",
      "Inspection and metrology partner integrations",
      "Supplier-quality workflows",
      "Advance AirCert AI from concept toward product",
      "Secure engineering evidence and compliance workflows",
    ],
  },
  {
    year: "2028",
    phase: "Engineering Assurance Integration",
    title: "Quality + Airworthiness + Certification Intelligence",
    kind: "roadmap",
    summary: "DAQIP + AirCert AI integration.",
    flow: "Design → Certification → Manufacturing → Inspection → Evidence → Approval",
    points: [
      "Integrate DAQIP™ and AirCert AI™ intelligence layers",
      "Advanced AI-assisted engineering workflows",
      "Certification evidence graph",
      "Manufacturing-quality intelligence",
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
      "Unified engineering intelligence for aerospace, defence, space and advanced manufacturing",
      "Global aerospace supply chains",
    ],
  },
  {
    year: "2030",
    phase: "Vision",
    title: "Trusted engineering intelligence from requirement to evidence and approval.",
    kind: "vision",
    points: [],
  },
];
