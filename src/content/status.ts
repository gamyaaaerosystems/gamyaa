/**
 * Product status transparency.
 *
 * Every capability shown on the site carries one of these labels. Update them here
 * ONLY when the underlying reality changes — never label a roadmap item as released.
 */
export type Status =
  | "available"
  | "prototype"
  | "concept-demo"
  | "in-development"
  | "research-architecture"
  | "research"
  | "architecture"
  | "concept"
  | "planned"
  | "roadmap"
  | "vision";

export const STATUS_LABEL: Record<Status, string> = {
  available: "Available",
  prototype: "Prototype",
  "concept-demo": "Concept Demonstration",
  "in-development": "In Development",
  "research-architecture": "Research & Architecture",
  research: "Research",
  architecture: "Architecture",
  concept: "Concept",
  planned: "Planned",
  roadmap: "Roadmap",
  vision: "Long-term Vision",
};

export const STATUS_DESCRIPTION: Record<Status, string> = {
  available: "Released and usable today.",
  prototype: "Working prototype used for validation; not a released product.",
  "concept-demo":
    "Browser-based demonstration with fictitious data that explains a concept; not product software.",
  "in-development": "Actively being built; not yet generally available.",
  "research-architecture":
    "Problem research and platform architecture are under way; no software has been released.",
  research: "Under research and problem validation.",
  architecture: "Data model and architecture are being defined; implementation has not started.",
  concept: "Defined as an engineering concept; no working implementation yet.",
  planned: "On the roadmap; development has not started or is at concept stage.",
  roadmap: "An intended future direction, such as an integration. Not scheduled or committed.",
  vision: "A long-term research direction. Not a product commitment.",
};

/** Order used by status legends (most mature first). */
export const STATUS_ORDER: Status[] = [
  "available",
  "prototype",
  "concept-demo",
  "in-development",
  "research-architecture",
  "research",
  "architecture",
  "concept",
  "planned",
  "roadmap",
  "vision",
];

/** Product-level status (as of October 2026). */
export const PRODUCT_STATUS = {
  aeaip: "research-architecture",
  daqip: "in-development",
  aircert: "planned",
} as const satisfies Record<string, Status>;

export const STATUS_AS_OF = "October 2026";
