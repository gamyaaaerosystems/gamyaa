import { EXTERNAL } from "@/lib/site";

export type Leader = {
  name: string;
  role: string;
  /** One sentence on the person's responsibility. Drafted from the role; confirm with the person. */
  summary: string;
  /** The person's own LinkedIn profile URL. The link is hidden when absent; never reuse another person's URL. */
  linkedin?: string;
  /** Shown after the role and linked, e.g. "Co-Founder, EV.ENGINEER™". Not part of the job title. */
  credential?: { label: string; href: string };
};

export const LEADERSHIP: Leader[] = [
  {
    name: "Purushothama Padmanabha",
    role: "Founder, CEO",
    summary: "Leads company strategy, customer relationships and the direction of the GAMYAA platforms.",
    linkedin: "https://www.linkedin.com/in/purushothama-padmanabha-1a75552/",
  },
  {
    name: "Manjunatha G",
    role: "Co-Founder, Sales & Marketing",
    summary: "Leads market development, customer engagement and sales.",
    // No LinkedIn link until Manjunatha G's own profile URL is supplied.
  },
  {
    name: "Sudarshana Karkala",
    role: "Co-Founder",
    credential: { label: "EV.ENGINEER™", href: EXTERNAL.evEngineer },
    summary: "Leads engineering and product architecture across AEAIP™, DAQIP™ and AirCert AI™.",
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

export type PartnerCategory = "Engineering Partner" | "Research & Development Partner" | "Industry / Education Ecosystem";

export type Partner = {
  name: string;
  category: PartnerCategory;
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
    category: "Engineering Partner",
    analyticsName: "APEX Rocket Systems",
    description: "Rocket propulsion and launch-system engineering collaboration: hardware development and system validation.",
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
    category: "Research & Development Partner",
    analyticsName: "iTelematics",
    description: "Research and development collaboration in engineering software and connected-systems technology.",
    href: EXTERNAL.iTelematics,
    /** Display form of the domain (the URL itself stays lower-case). */
    domain: "iTelematics.com",
    actions: [
      { label: "iTelematics.com", href: EXTERNAL.iTelematics, caption: "Official website", arrow: "external" },
      { label: "EV.ENGINEER™", href: EXTERNAL.evEngineer, caption: "ev.engineer", arrow: "external" },
    ],
  },
  {
    name: "EV Society™",
    category: "Industry / Education Ecosystem",
    analyticsName: "EV Society",
    description: "Engineering education, research and industry collaboration.",
    href: EXTERNAL.evSociety,
    domain: "evsociety.org",
  },
];

/** Hiring domains, grouped. Technologies are not listed as separate categories. */
export const CAREER_DOMAINS: Array<{ title: string; body: string }> = [
  { title: "Systems Engineering / V&V", body: "Requirements, verification and validation, review readiness and configuration." },
  { title: "Aerospace Quality", body: "First Article Inspection, inspection, manufacturing and supplier quality." },
  { title: "Certification", body: "Airworthiness, certification basis, means of compliance and evidence." },
  { title: "Software / Platform", body: "Backend, frontend and the evidence-graph platform itself." },
  { title: "AI / Data", body: "Engineering AI with human verification, provenance and explainability." },
  { title: "Cybersecurity", body: "Engineering data security and cybersecurity assurance for connected systems." },
  { title: "Product Engineering", body: "Turning engineering workflows into products engineers trust." },
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
  { value: "digital-twin", label: "Digital twin" },
  { value: "services", label: "Engineering & consulting services" },
  { value: "partnership", label: "Inspection / metrology partnership" },
  { value: "ventures", label: "Gamyaa Ventures — partnership" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Other" },
] as const;

export type InterestValue = (typeof INTERESTS)[number]["value"];
