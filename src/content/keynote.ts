import { AEAIP } from "./aeaip";
import { LEADERSHIP } from "./company";
import { DEMO_PROGRAMME, ISSUES, issueEffect, VALIDITY_STAGES } from "./aeaip-demo";
import { PRODUCT_STATUS, type Status } from "./status";

/**
 * Keynote (/aerosystems/keynote): the six-slide presentation.
 *
 * Approved wording lives here; slide layouts live in src/components/keynote/.
 * The worked example is the fictitious GX-1 programme from the AEAIP™ demo
 * (src/content/aeaip-demo.ts), so its values and the readiness state are derived
 * from the same data and rules, never typed in separately.
 */

export type KeynoteSlideId = "confidence" | "problem" | "aeaip" | "architecture" | "demo" | "thanks";

export type KeynoteSlide = {
  id: KeynoteSlideId;
  /** Accessible name, progress-marker label and screen-reader announcement. */
  label: string;
  /**
   * Presenter-controlled build steps (Next reveals the next step before moving on).
   * Each entry is announced to screen readers when that step appears.
   */
  builds: readonly string[];
};

/* ------------------------------------------------------- Worked example */

const EPS_ITEM = ISSUES.find((i) => i.id === "SAT-EPS-014")!;
const BEFORE = VALIDITY_STAGES[0].config;
const AFTER = VALIDITY_STAGES[VALIDITY_STAGES.length - 1].config;

export type ReadinessState = "Ready" | "Conditional" | "Blocked";

const READINESS: Record<ReturnType<typeof issueEffect>, ReadinessState> = {
  none: "Ready",
  conditional: "Conditional",
  blocking: "Blocked",
};

export const KN_EXAMPLE = {
  requirement: EPS_ITEM.id,
  requirementTitle: "Battery charge termination",
  evidence: "TR-EPS-114",
  firmware: { before: BEFORE.firmware, after: AFTER.firmware },
  board: { before: BEFORE.board, after: AFTER.board },
  gate: DEMO_PROGRAMME.currentGate,
  /** Readiness of this requirement at the current gate, from the demo's own rules. */
  readiness: READINESS[issueEffect(EPS_ITEM, DEMO_PROGRAMME.currentGate)],
  /** Gate at which the open item stops being a condition and becomes a blocker. */
  blockingFrom: EPS_ITEM.escalates,
} as const;

/** Short form used on slides: "BMS FW 2.3.0" → "FW 2.3.0", "PCB Rev B" stays. */
export const shortFw = (v: string) => v.replace(/^BMS\s+/, "");

/* --------------------------------------------------------------- Slides */

export const KN_OPENING = {
  title: "Engineering Confidence.",
  secondary: "Mission Readiness.",
  points: ["Defence", "Aerospace", "Space"],
} as const;

export const KN_PROBLEM = {
  title: "Can We Prove It?",
  points: ["Fragmented Engineering Evidence", "Changing Hardware & Software", "Uncertain Readiness"],
  /** The one critical problem the slide resolves to; `emphasis` is set in amber. */
  finding: { lead: "The evidence was produced on a configuration that ", emphasis: "no longer exists." },
} as const;

export const KN_AEAIP = {
  title: AEAIP.name,
  subtitle: AEAIP.expanded,
  status: PRODUCT_STATUS.aeaip,
  points: ["Know What Is Verified", "Know What Is Missing", "Know When the System Is Ready"],
  /** The word in each point highlighted in the accent colour once its build step is reached. */
  emphasis: ["Verified", "Missing", "Ready"],
  chain: AEAIP.chain,
  governance: ["AI assists", "Engineers verify", "Authorized authorities approve"],
} as const;

/** Matches the status badge on /aerosystems/digital-twin. Update both together. */
export const DIGITAL_TWIN_STATUS: Status = "research";

export const KN_ARCHITECTURE = {
  title: "One Architecture.",
  secondary: "Multiple Applications.",
  core: { name: AEAIP.name, role: "Core Assurance Intelligence", status: PRODUCT_STATUS.aeaip },
  twin: {
    name: "Satellite Digital Twin",
    tagline: "Hardware · Software · Power & Energy",
    status: DIGITAL_TWIN_STATUS,
  },
  apps: [
    { key: "daqip", name: "DAQIP™", tagline: "Manufacturing Quality Intelligence", status: PRODUCT_STATUS.daqip },
    {
      key: "aircert",
      name: "AirCert AI™",
      tagline: "Certification Engineering Intelligence",
      status: PRODUCT_STATUS.aircert,
    },
  ],
} as const;

export const KN_DEMO = {
  title: "LIVE DEMO",
  secondary: "Engineering Assurance in Action.",
  points: ["Trace a Requirement", "Inspect the Evidence", "Understand Readiness"],
  cta: "Launch Live Demo",
  note: "Concept demonstration · fictitious data · opens in a new tab",
} as const;

const KEYNOTE_FOUNDERS = ["Purushothama Padmanabha", "Sudarshana Karkala"];

export const KN_THANKS = {
  title: "Thank You.",
  secondary: "Let's Build Engineering Confidence.",
  /**
   * Founders shown on the closing slide (owner's selection, 17 November 2026). Titles and
   * experience come from the About page data (src/content/company.ts), in its order.
   */
  founders: LEADERSHIP.filter((p) => KEYNOTE_FOUNDERS.includes(p.name)).map(
    ({ name, role, experience, affiliations }) => ({ name, role, experience, affiliations }),
  ),
  site: "aerosystems.gamyaa.in",
  cta: "Discuss an Engineering Assurance Problem",
} as const;

export const KEYNOTE_SLIDES: readonly KeynoteSlide[] = [
  { id: "confidence", label: "Engineering Confidence. Mission Readiness.", builds: [""] },
  {
    id: "problem",
    label: "Can We Prove It?",
    builds: [
      "Five engineering records, kept in separate places and not linked to each other.",
      `The hardware and software change: ${KN_EXAMPLE.board.before} becomes ${KN_EXAMPLE.board.after}, ${KN_EXAMPLE.firmware.before} becomes ${KN_EXAMPLE.firmware.after}.`,
      `The test evidence was produced on ${KN_EXAMPLE.board.before} and ${KN_EXAMPLE.firmware.before}. It no longer matches the configuration, so readiness is uncertain.`,
    ],
  },
  {
    id: "aeaip",
    label: "AEAIP™ — Aerospace Engineering Assurance Intelligence Platform",
    builds: [
      `Requirement ${KN_EXAMPLE.requirement} is connected to its configuration, evidence and verification.`,
      `Configuration changes to ${KN_EXAMPLE.firmware.after} and ${KN_EXAMPLE.board.after}. Evidence ${KN_EXAMPLE.evidence} is now at risk and verification is reopened.`,
      `Readiness at ${KN_EXAMPLE.gate}: ${KN_EXAMPLE.readiness}. A delta test is required before ${KN_EXAMPLE.blockingFrom}.`,
    ],
  },
  { id: "architecture", label: "One Architecture. Multiple Applications.", builds: [""] },
  { id: "demo", label: "Live Demo — Engineering Assurance in Action.", builds: [""] },
  { id: "thanks", label: "Thank You. Let's Build Engineering Confidence.", builds: [""] },
];
