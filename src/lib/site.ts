/**
 * Site-wide configuration and URL helpers.
 *
 * All AeroSystems links go through `aero()`, all parent-site links through `parent()`.
 * This lets the AeroSystems experience move to https://aerosystems.gamyaa.in by
 * flipping NEXT_PUBLIC_AEROSYSTEMS_CANONICAL=subdomain (see next.config.ts) without
 * rewriting any page, and keeps exactly one canonical URL per page.
 */

export const PRIMARY_ORIGIN = "https://gamyaa.in";
export const AERO_SUBDOMAIN_ORIGIN = "https://aerosystems.gamyaa.in";
export const AERO_BASE_PATH = "/aerosystems";

export type AeroCanonicalMode = "path" | "subdomain";

export const AERO_CANONICAL_MODE: AeroCanonicalMode =
  process.env.NEXT_PUBLIC_AEROSYSTEMS_CANONICAL === "subdomain" ? "subdomain" : "path";

function normalise(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") || path.startsWith("#") ? path : `/${path}`;
}

/** Link to a page inside Gamyaa AeroSystems, e.g. aero("/daqip"). */
export function aero(path = "/"): string {
  const p = normalise(path);
  if (AERO_CANONICAL_MODE === "subdomain") return `${AERO_SUBDOMAIN_ORIGIN}${p || "/"}`;
  return `${AERO_BASE_PATH}${p}`;
}

/** Link to a page on the parent gamyaa.in site, e.g. parent("/privacy"). */
export function parent(path = "/"): string {
  const p = normalise(path) || "/";
  if (AERO_CANONICAL_MODE === "subdomain") return `${PRIMARY_ORIGIN}${p}`;
  return p;
}

/**
 * Link to the GAMYAA home page from inside AeroSystems. Absolute, because on
 * aerosystems.gamyaa.in a relative "/" opens AeroSystems instead.
 */
export const PARENT_HOME = PRIMARY_ORIGIN;

/** Absolute canonical URL for an href produced by aero() or parent(). */
export function absoluteUrl(href: string): string {
  const url = href.startsWith("http") ? href : `${PRIMARY_ORIGIN}${href === "/" ? "" : href}`;
  // Canonical URLs never carry a trailing slash (except the bare origin).
  return url.replace(/(?<!:\/)\/$/, "") || PRIMARY_ORIGIN;
}

export const BRAND = {
  parent: "GAMYAA",
  aero: "Gamyaa AeroSystems",
  ventures: "Gamyaa Ventures",
  /**
   * Incorporation of GAMYAA Aero Systems Private Limited is confirmed (October 2026).
   * Controls legal name in footer and structured data.
   */
  aeroIncorporated: true,
  aeroLegalNameAfterIncorporation: "GAMYAA Aero Systems Private Limited",
  copyrightYear: 2026,
} as const;

export const aeroLegalName = BRAND.aeroIncorporated
  ? BRAND.aeroLegalNameAfterIncorporation
  : BRAND.aero;

/**
 * Corporate-domain mailboxes, prepared for launch. Set `active: true` on one once it
 * is configured and monitored; it then becomes the primary email across the site.
 */
const CORPORATE_EMAILS = [
  { address: "contact@gamyaa.in", active: false },
  { address: "aerosystems@gamyaa.in", active: false },
] as const;

const CURRENT_EMAIL = "gamyaa.aerosystems@gmail.com";

export const CONTACT = {
  person: "Purushothama Padmanabha",
  role: "Founder, CEO",
  organisation: "Gamyaa AeroSystems",
  location: "Bangalore, India",
  email: (CORPORATE_EMAILS.find((e) => e.active)?.address ?? CURRENT_EMAIL) as string,
  phoneDisplay: "+91 98866 43942",
  phoneE164: "+919886643942",
} as const;

export const EXTERNAL = {
  evSociety: "https://www.evsociety.org/",
  iTelematics: "https://itelematics.com/",
  apexRocketSystems: "https://www.apexrocketsystems.com/",
  apexEngineeringPartnership: "https://aerospace.ev.engineer/space/partners/apexrocketsystems",
  aerospaceCybersecurity: "https://aerospace.gamyaa.in/aerospace",
  spaceResearch: "https://aerospace.ishavasyam.org/space",
  internships: "https://aerospace.gamyaa.in/internships",
  daqipResearch:
    "https://aerospace.gamyaa.in/internships/aerospace-quality-intelligence-platform",
  designerProfile: "https://aerospace.gamyaa.in/about/sudarshana-karkala",
  evEngineer: "https://ev.engineer",
  uflight: "https://www.uflight.in/",
  uflightCybersecurity: "https://cybersecurity.uflight.in/",
  /** Official GAMYAA login entry point. Authentication happens there, never on this site. */
  login: "https://login.gamyaa.in/",
} as const;

/** Design credit shown in the AeroSystems footer and on AEAIP pages. */
export const DESIGNER = {
  name: "Sudarshana Karkala",
  credential: "EV.ENGINEER™",
  href: EXTERNAL.designerProfile,
  credentialHref: EXTERNAL.evEngineer,
} as const;
