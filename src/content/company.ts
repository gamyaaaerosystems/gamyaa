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
    role: "Co-Founder & CEO",
    linkedin: "https://www.linkedin.com/in/purushothama-padmanabha-1a75552/",
  },
  {
    name: "Manjunath G",
    role: "Co-Founder, Sales & Marketing",
    // PLACEHOLDER: replace with Manjunath G's own profile URL, then remove linkedinPlaceholder.
    linkedin: "https://linkedin.com/in/sudarshanakarkala",
    linkedinPlaceholder: true,
  },
  {
    name: "Sudarshana Karkala",
    role: "Co-Founder, Director",
    linkedin: "https://linkedin.com/in/sudarshanakarkala",
  },
];

export const PARTNERS = [
  {
    name: "EV Society™",
    analyticsName: "EV Society",
    description:
      "Engineering education, research, industry collaboration and technology ecosystem initiatives.",
    href: EXTERNAL.evSociety,
    domain: "evsociety.org",
  },
  {
    name: "iTelematics Software Private Limited",
    analyticsName: "iTelematics",
    description: "Engineering software, connected systems and technology collaboration.",
    href: EXTERNAL.iTelematics,
    domain: "itelematics.com",
  },
] as const;

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

export const AUDIENCES = [
  {
    title: "Engineering & Manufacturing Architects",
    body: "Turn engineering requirements into manufacturing and inspection-ready digital structures.",
  },
  {
    title: "Aerospace & Defence Manufacturers",
    body: "Build consistent, traceable engineering and manufacturing evidence.",
  },
  {
    title: "Inspection & Metrology Partners",
    body: "Connect inspection methods, gauges, CMM results and evidence directly to requirements.",
  },
  {
    title: "Quality & Certification Teams",
    body: "Review requirements, evidence, test results and approval status across the lifecycle.",
  },
];

export const LIFECYCLE = [
  { n: "01", title: "Design", body: "Design intent and engineering requirements." },
  { n: "02", title: "Airworthiness", body: "Certification basis, safety and compliance." },
  { n: "03", title: "Manufacturing", body: "Processes and characteristics to produce." },
  { n: "04", title: "Inspection", body: "Methods, gauges and measurements." },
  { n: "05", title: "Evidence", body: "Traceable records with provenance." },
  { n: "06", title: "Approval", body: "Human review and recorded decisions." },
];

export const INTERESTS = [
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
