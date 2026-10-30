import { aero, parent } from "@/lib/site";
import { SOLUTIONS } from "./solutions";

export type NavItem = { label: string; href: string; match?: string[] };
export type NavGroup = { title: string; items: NavItem[] };

/**
 * One AEAIP™ entry in the global navigation; its knowledge pages are reached through
 * the AEAIP section's own local navigation, not from here.
 */
export const AERO_NAV: NavItem[] = [
  { label: "AEAIP™", href: aero("/aeaip") },
  { label: "Products", href: aero("/products"), match: [aero("/daqip"), aero("/aircert-ai")] },
  { label: "Digital Twin", href: aero("/digital-twin") },
  { label: "Solutions", href: aero("/solutions") },
  { label: "Services", href: aero("/services") },
  { label: "Research", href: aero("/research") },
  { label: "Partners & Ecosystem", href: aero("/about#partners") },
  { label: "Company", href: aero("/about") },
  { label: "Contact", href: aero("/contact") },
];

export const AERO_MENU_GROUPS: NavGroup[] = [
  {
    title: "Products",
    items: [
      { label: "AEAIP™", href: aero("/aeaip") },
      { label: "DAQIP™", href: aero("/daqip") },
      { label: "AirCert AI™", href: aero("/aircert-ai") },
      { label: "All products", href: aero("/products") },
    ],
  },
  {
    title: "AEAIP™ Learn",
    items: [
      { label: "Interactive Assurance Demo", href: aero("/aeaip/demo") },
      { label: "Review gates", href: aero("/aeaip/review-gates") },
      { label: "Verification & validation", href: aero("/aeaip/verification-validation") },
      { label: "Configuration assurance", href: aero("/aeaip/configuration-assurance") },
      { label: "Strategy", href: aero("/aeaip/strategy") },
    ],
  },
  {
    title: "Solutions",
    items: SOLUTIONS.map((s) => ({ label: s.label, href: aero(`/solutions/${s.slug}`) })),
  },
  {
    title: "Company",
    items: [
      { label: "About", href: aero("/about") },
      { label: "Leadership", href: aero("/about#leadership") },
      { label: "Services", href: aero("/services") },
      { label: "Research", href: aero("/research") },
      { label: "Careers", href: aero("/careers") },
      { label: "Internships", href: aero("/internships") },
    ],
  },
];

export const PARENT_NAV: NavItem[] = [
  { label: "AeroSystems", href: aero("/") },
  { label: "Ventures", href: parent("/ventures") },
  { label: "Contact", href: parent("/contact") },
];
