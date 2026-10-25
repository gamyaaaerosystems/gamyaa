export type Milestone = {
  stage: string;
  title: string;
  kind: "history" | "current" | "next" | "future";
  summary: string;
};

/**
 * Company evolution as maturity stages. "Next" and "Future" are intentions, not
 * dated commitments; the detailed roadmap lives on the AEAIP™ Strategy page.
 */
export const TIMELINE: Milestone[] = [
  {
    stage: "2024",
    title: "Quality intelligence problem exploration",
    kind: "history",
    summary: "Why aerospace and defence manufacturers struggle to keep inspection and quality evidence traceable.",
  },
  {
    stage: "2025",
    title: "Workflow validation and FAI research",
    kind: "history",
    summary: "First Article Inspection, inspection and documentation workflows studied with aerospace and defence MSMEs.",
  },
  {
    stage: "2026",
    title: "DAQIP™ development, AirCert AI™ concept, AEAIP™ research & architecture",
    kind: "current",
    summary: "Quality and certification work converge into one Engineering Assurance Intelligence architecture, with satellites and spacecraft as its first focus.",
  },
  {
    stage: "Next",
    title: "Assurance validation",
    kind: "next",
    summary: "Validating the evidence foundation on satellite and spacecraft use cases, and DAQIP™ with manufacturers.",
  },
  {
    stage: "Future",
    title: "Continuous, operational and predictive assurance",
    kind: "future",
    summary: "Research directions, not commitments.",
  },
];
