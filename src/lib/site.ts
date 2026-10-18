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
   * Flip to true ONLY after incorporation of Gamyaa AeroSystems Private Limited
   * is formally confirmed. Controls legal name in footer and structured data.
   */
  aeroIncorporated: false,
  aeroLegalNameAfterIncorporation: "Gamyaa AeroSystems Private Limited",
  copyrightYear: 2026,
} as const;

export const aeroLegalName = BRAND.aeroIncorporated
  ? BRAND.aeroLegalNameAfterIncorporation
  : BRAND.aero;

export const CONTACT = {
  person: "Purushothama Padmanabha",
  organisation: "Gamyaa AeroSystems",
  location: "Bangalore, India",
  email: "gamyaa.aerosystems@gmail.com",
  phoneDisplay: "+91 98866 43942",
  phoneE164: "+919886643942",
  /**
   * Prepared for future domain mailboxes. Keep `display: false` until the
   * mailbox is configured and monitored.
   */
  futureEmails: [
    { address: "contact@gamyaa.in", display: false },
    { address: "aerosystems@gamyaa.in", display: false },
  ],
} as const;

export const EXTERNAL = {
  evSociety: "https://www.evsociety.org/",
  iTelematics: "https://itelematics.com/",
  aerospaceCybersecurity: "https://aerospace.gamyaa.in/aerospace",
  internships: "https://aerospace.gamyaa.in/internships",
  daqipResearch:
    "https://aerospace.gamyaa.in/internships/aerospace-quality-intelligence-platform",
} as const;
