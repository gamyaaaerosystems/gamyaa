import { EXTERNAL } from "@/lib/site";

export type Leader = {
  name: string;
  role: string;
  /** LinkedIn profile URL. The LinkedIn link is hidden when absent. */
  linkedin?: string;
  /** True while `linkedin` is a temporary placeholder (excluded from structured data). */
  linkedinPlaceholder?: boolean;
};

export const LEADERSHIP: Leader[] = [
  {
    name: "Purushothama Padmanabha",
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/purushothama-padmanabha-1a75552/",
  },
  {
    name: "Manjunatha G",
    role: "Co-Founder, Sales & Marketing",
    // PLACEHOLDER: replace with Manjunatha G's own profile URL, then remove linkedinPlaceholder.
    linkedin: "https://linkedin.com/in/sudarshanakarkala",
    linkedinPlaceholder: true,
  },
  {
    name: "Sudarshana Karkala",
    role: "Co-Founder",
    linkedin: "https://linkedin.com/in/sudarshanakarkala",
  },
];

export type PartnerAction = {
  label: string;
  href: string;
  /** Short qualifier shown under the link. */
  caption: string;
  /** "right" (→) or "external" (↗). */
  arrow: "right" | "external";
};

export type Partner = {
  name: string;
  analyticsName: string;
  description: string;
  /** Primary destination (whole-card link, footer link). */
  href: string;
  domain: string;
  /** When present, the card shows these links instead of being a single link. */
  actions?: readonly PartnerAction[];
};

export const PARTNERS: readonly Partner[] = [
  {
    name: "APEX Rocket Systems Private Limited",
    analyticsName: "APEX Rocket Systems",
    description:
      "Rocket propulsion and launch-system engineering collaboration focused on advancing hardware development, system validation and integrated aerospace engineering capability.",
    href: EXTERNAL.apexRocketSystems,
    domain: "apexrocketsystems.com",
    actions: [
      {
        label: "Engineering Partnership",
        href: EXTERNAL.apexEngineeringPartnership,
        caption: "Engineering collaboration concept",
        arrow: "right",
      },
      {
        label: "Official Website",
        href: EXTERNAL.apexRocketSystems,
        caption: "apexrocketsystems.com",
        arrow: "external",
      },
    ],
  },
  {
    name: "iTelematics Software Private Limited",
    analyticsName: "iTelematics",
    description: "Engineering software, connected systems and technology collaboration.",
    href: EXTERNAL.iTelematics,
    domain: "itelematics.com",
  },
  {
    name: "EV Society™",
    analyticsName: "EV Society",
    description:
      "Engineering education, research, industry collaboration and technology ecosystem initiatives.",
    href: EXTERNAL.evSociety,
    domain: "evsociety.org",
  },
];

export const CAREER_DOMAINS = [
  "Aerospace quality",
  "Airworthiness",
  "Certification engineering",
  "Manufacturing software",
  "Inspection intelligence",
  "AI / ML",
  "Cybersecurity",
  "Digital twins",
  "Systems architecture",
  "Frontend",
  "Backend",
  "Product engineering",
];

/**
 * Predefined contact intents. Only these values are accepted from ?interest=… and by
 * the contact API; the free-text message is never sent to analytics.
 */
export const INTERESTS = [
  { value: "aeaip", label: "AEAIP™ — discussion" },
  { value: "assurance-problem", label: "Discuss an engineering assurance problem" },
  { value: "spacecraft-assurance", label: "Satellite / spacecraft assurance" },
  { value: "strategic-partnership", label: "Strategic partnership" },
  { value: "investor", label: "Strategic / investor conversation" },
  { value: "daqip", label: "DAQIP™ — demo or pilot" },
  { value: "quality-problem", label: "Discuss an aerospace quality problem" },
  { value: "fai", label: "First Article Inspection / AS9102" },
  { value: "aircert", label: "AirCert AI™ — register interest" },
  { value: "services", label: "Engineering & consulting services" },
  { value: "partnership", label: "Inspection / metrology partnership" },
  { value: "ventures", label: "Gamyaa Ventures — partnership" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Other" },
] as const;

export type InterestValue = (typeof INTERESTS)[number]["value"];
