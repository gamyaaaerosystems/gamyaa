/**
 * GA4 analytics service.
 *
 * - The gtag.js snippet itself is loaded once, in the root layout (GoogleAnalytics component).
 * - Page views: sent by the `gtag('config', …)` call on first load, and by GA4 Enhanced
 *   Measurement ("Page changes based on browser history events") on client-side
 *   navigation. This file never sends `page_view`, so there are no duplicates.
 * - Every event parameter passes through `sanitizeParams`, which only forwards
 *   allow-listed keys and strips anything that looks like personal or engineering data.
 */

export const GA_MEASUREMENT_ID = "G-VRS5BMWG9R";

export type AnalyticsEventName =
  | "nav_click"
  | "view_aerosystems"
  | "view_ventures"
  | "view_daqip"
  | "daqip_research_click"
  | "demo_interest"
  | "problem_discussion_click"
  | "view_fai_solution"
  | "view_aircert_ai"
  | "aircert_learn_more_click"
  | "aircert_contact_click"
  | "contact_sales_click"
  | "email_click"
  | "phone_click"
  | "career_view"
  | "career_cta_click"
  | "internship_view"
  | "internship_outbound_click"
  | "aerospace_cybersecurity_click"
  | "partner_click"
  | "leadership_link_click"
  | "ventures_contact"
  | "ventures_focus_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "theme_change"
  | "outbound_click"
  | "aeaip_explore"
  | "aeaip_demo_open"
  | "aeaip_demo_start"
  | "aeaip_gate_select"
  | "aeaip_subsystem_select"
  | "aeaip_evidence_trace_open"
  | "aeaip_evidence_validity_demo"
  | "aeaip_reference_open"
  | "aeaip_partner_interest"
  | "aeaip_investor_interest"
  | "platform_card_click"
  | "designer_profile_click";

export const ANALYTICS_EVENTS: ReadonlySet<string> = new Set<AnalyticsEventName>([
  "nav_click",
  "view_aerosystems",
  "view_ventures",
  "view_daqip",
  "daqip_research_click",
  "demo_interest",
  "problem_discussion_click",
  "view_fai_solution",
  "view_aircert_ai",
  "aircert_learn_more_click",
  "aircert_contact_click",
  "contact_sales_click",
  "email_click",
  "phone_click",
  "career_view",
  "career_cta_click",
  "internship_view",
  "internship_outbound_click",
  "aerospace_cybersecurity_click",
  "partner_click",
  "leadership_link_click",
  "ventures_contact",
  "ventures_focus_click",
  "form_start",
  "form_submit",
  "form_error",
  "theme_change",
  "outbound_click",
  "aeaip_explore",
  "aeaip_demo_open",
  "aeaip_demo_start",
  "aeaip_gate_select",
  "aeaip_subsystem_select",
  "aeaip_evidence_trace_open",
  "aeaip_evidence_validity_demo",
  "aeaip_reference_open",
  "aeaip_partner_interest",
  "aeaip_investor_interest",
  "platform_card_click",
  "designer_profile_click",
]);

/** Parameters that may ever be sent. Anything else is dropped. */
export type AnalyticsParam =
  | "nav_label"
  | "destination"
  | "page_path"
  | "partner_name"
  | "person_name"
  | "form_name"
  | "theme"
  | "destination_domain"
  | "link_label"
  | "source_section"
  | "error_type"
  | "cta_label"
  | "product"
  | "topic"
  | "source_page"
  | "cta_location"
  | "source_location"
  | "gate"
  | "subsystem"
  | "trace_category"
  | "validity_step"
  | "reference_category"
  | "platform";

export type AnalyticsParams = Partial<Record<AnalyticsParam, string>>;

const ALLOWED_PARAMS: ReadonlySet<string> = new Set<AnalyticsParam>([
  "nav_label",
  "destination",
  "page_path",
  "partner_name",
  "person_name",
  "form_name",
  "theme",
  "destination_domain",
  "link_label",
  "source_section",
  "error_type",
  "cta_label",
  "product",
  "topic",
  "source_page",
  "cta_location",
  "source_location",
  "gate",
  "subsystem",
  "trace_category",
  "validity_step",
  "reference_category",
  "platform",
]);

/* AEAIP enumerations. Values are generic categories, never IDs or free text. */
export const GATE_CODES = ["MCR", "SRR", "SDR", "PDR", "CDR", "SIR", "TRR", "SAR", "ORR", "FRR", "MRR"] as const;
export type GateCode = (typeof GATE_CODES)[number];

export const SUBSYSTEM_KEYS = [
  "structure",
  "eps",
  "adcs",
  "thermal",
  "avionics",
  "communications",
  "payload",
  "flight_software",
  "cybersecurity",
] as const;
export type SubsystemKey = (typeof SUBSYSTEM_KEYS)[number];

export type SourceLocation =
  | "aero_hero"
  | "platform_card"
  | "core_model"
  | "aero_cta"
  | "products_page"
  | "daqip_page"
  | "aircert_page"
  | "aeaip_hero"
  | "aeaip_body"
  | "aeaip_cta"
  | "learn_page"
  | "demo_page"
  | "strategy_page"
  | "contact_page"
  | "footer";
export type TraceCategory =
  | "anomaly"
  | "ncr"
  | "evidence_gap"
  | "configuration_mismatch"
  | "pending_test"
  | "cybersecurity_finding"
  | "waiver";
export type ValidityStep = "verified" | "change" | "at_risk" | "reverify" | "reverified";
export type ReferenceCategory =
  | "verification"
  | "reviews"
  | "configuration"
  | "cybersecurity"
  | "standards"
  | "continuous_assurance"
  | "operational_evidence"
  | "satellite_assurance"
  | "evidence_graph"
  | "glossary";
export type PlatformKey = "aeaip" | "daqip" | "aircert";

/**
 * Enumerated parameters accept only these values. `person_name` is limited to the
 * publicly listed leadership team (company information, never visitor data).
 */
const ENUM_PARAMS: Partial<Record<AnalyticsParam, ReadonlySet<string>>> = {
  theme: new Set(["light", "dark", "system"]),
  partner_name: new Set(["EV Society", "iTelematics", "APEX Rocket Systems"]),
  person_name: new Set(["Purushothama Padmanabha", "Manjunatha G", "Sudarshana Karkala"]),
  form_name: new Set(["aerosystems_contact", "gamyaa_contact"]),
  error_type: new Set([
    "validation",
    "rate_limited",
    "network",
    "server",
    "delivery_unavailable",
    "rejected",
  ]),
  product: new Set(["daqip", "aircert"]),
  topic: new Set([
    "fai",
    "inspection",
    "supplier_quality",
    "airworthiness",
    "certification",
    "manufacturing_quality",
    "general",
  ]),
  cta_location: new Set([
    "hero",
    "product_card",
    "engineering_evidence",
    "problems",
    "cta_band",
    "contact_page",
    "solution_page",
    "page_body",
  ]),
  source_location: new Set<SourceLocation>([
    "aero_hero",
    "platform_card",
    "core_model",
    "aero_cta",
    "products_page",
    "daqip_page",
    "aircert_page",
    "aeaip_hero",
    "aeaip_body",
    "aeaip_cta",
    "learn_page",
    "demo_page",
    "strategy_page",
    "contact_page",
    "footer",
  ]),
  gate: new Set<string>(GATE_CODES),
  subsystem: new Set<string>(SUBSYSTEM_KEYS),
  trace_category: new Set<TraceCategory>([
    "anomaly",
    "ncr",
    "evidence_gap",
    "configuration_mismatch",
    "pending_test",
    "cybersecurity_finding",
    "waiver",
  ]),
  validity_step: new Set<ValidityStep>(["verified", "change", "at_risk", "reverify", "reverified"]),
  reference_category: new Set<ReferenceCategory>([
    "verification",
    "reviews",
    "configuration",
    "cybersecurity",
    "standards",
    "continuous_assurance",
    "operational_evidence",
    "satellite_assurance",
    "evidence_graph",
    "glossary",
  ]),
  platform: new Set(["aeaip", "daqip", "aircert"]),
};

export type DemoProduct = "daqip" | "aircert";
export type ProblemTopic =
  | "fai"
  | "inspection"
  | "supplier_quality"
  | "airworthiness"
  | "certification"
  | "manufacturing_quality"
  | "general";
export type CtaLocation =
  | "hero"
  | "product_card"
  | "engineering_evidence"
  | "problems"
  | "cta_band"
  | "contact_page"
  | "solution_page"
  | "page_body";

/** Commercial CTA events also carry the page they were clicked on. */
const WITH_SOURCE_PAGE: ReadonlySet<string> = new Set(["demo_interest", "problem_discussion_click"]);

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_RE = /\+?\d[\d\s().-]{6,}\d/;
const LONG_DIGITS_RE = /\d{5,}/; // part numbers, IDs, measurements
const MAX_LEN = 80;

function cleanFreeText(value: string): string | undefined {
  const v = value.replace(/\s+/g, " ").trim();
  if (!v) return undefined;
  if (EMAIL_RE.test(v) || PHONE_RE.test(v) || LONG_DIGITS_RE.test(v)) return "[redacted]";
  return v.slice(0, MAX_LEN);
}

/** Reduce a URL or path to something safe: path only for internal, host+path for external. */
export function cleanDestination(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) return undefined;
  if (/^mailto:/i.test(value)) return "mailto";
  if (/^tel:/i.test(value)) return "tel";
  if (value.startsWith("#")) return value.slice(0, MAX_LEN);
  try {
    const base = typeof window !== "undefined" ? window.location.origin : "https://gamyaa.in";
    const url = new URL(value, base);
    const internal = typeof window !== "undefined" && url.origin === window.location.origin;
    const out = internal ? url.pathname : `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
    return cleanFreeText(out);
  } catch {
    return undefined;
  }
}

export function sanitizeParams(params: Record<string, unknown>): AnalyticsParams {
  const out: AnalyticsParams = {};
  for (const [key, raw] of Object.entries(params)) {
    if (!ALLOWED_PARAMS.has(key) || typeof raw !== "string") continue;
    const k = key as AnalyticsParam;
    const allowed = ENUM_PARAMS[k];
    if (allowed) {
      if (allowed.has(raw)) out[k] = raw;
      continue;
    }
    if (k === "destination" || k === "page_path" || k === "source_page") {
      const d = cleanDestination(raw);
      if (d) out[k] = d;
      continue;
    }
    if (k === "destination_domain") {
      const d = raw.toLowerCase().replace(/^www\./, "");
      if (/^[a-z0-9.-]{1,80}$/.test(d)) out[k] = d;
      continue;
    }
    const v = cleanFreeText(raw);
    if (v) out[k] = v;
  }
  return out;
}

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

const DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === "1";

/** Send a GA4 event. Safe to call anywhere on the client; no-ops on the server. */
export function track(name: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  if (!ANALYTICS_EVENTS.has(name)) return;
  const clean: Record<string, unknown> = sanitizeParams({
    page_path: window.location.pathname,
    ...(WITH_SOURCE_PAGE.has(name) ? { source_page: window.location.pathname } : {}),
    ...params,
  });
  if (DEBUG) clean.debug_mode = true;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, clean);
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, clean);
  }
}

/**
 * Data-attribute contract for server-rendered elements (no client JS per element):
 *   data-ga-event="partner_click" data-ga-partner-name="EV Society"
 *   data-ga-also="platform_card_click" (optional second event, same parameters)
 * The global AnalyticsListener reads these on click.
 */
export function gaAttrs(
  event: AnalyticsEventName,
  params: AnalyticsParams = {},
  /** Optional second event fired by the same click with the same parameters. */
  also?: AnalyticsEventName,
): Record<string, string> {
  const attrs: Record<string, string> = { "data-ga-event": event };
  if (also) attrs["data-ga-also"] = also;
  for (const [k, v] of Object.entries(params)) {
    if (v) attrs[`data-ga-${k.replace(/_/g, "-")}`] = v;
  }
  return attrs;
}
