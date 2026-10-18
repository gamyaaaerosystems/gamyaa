/**
 * Product status transparency.
 *
 * Every capability shown on the site carries one of these labels. Update them here
 * ONLY when the underlying reality changes — never label a roadmap item as released.
 */
export type Status = "available" | "prototype" | "in-development" | "research" | "planned";

export const STATUS_LABEL: Record<Status, string> = {
  available: "Available",
  prototype: "Prototype",
  "in-development": "In Development",
  research: "Research",
  planned: "Planned",
};

export const STATUS_DESCRIPTION: Record<Status, string> = {
  available: "Released and usable today.",
  prototype: "Working prototype used for validation; not a released product.",
  "in-development": "Actively being built; not yet generally available.",
  research: "Under research and problem validation.",
  planned: "On the roadmap; development has not started or is at concept stage.",
};

/** Product-level status (as of October 2026). */
export const PRODUCT_STATUS = {
  daqip: "in-development",
  aircert: "planned",
} as const satisfies Record<string, Status>;

export const STATUS_AS_OF = "October 2026";
