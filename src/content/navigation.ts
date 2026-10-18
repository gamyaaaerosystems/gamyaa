import { aero, parent } from "@/lib/site";
import { SOLUTIONS } from "./solutions";

export type NavItem = { label: string; href: string; match?: string[] };
export type NavGroup = { title: string; items: NavItem[] };

export const AERO_NAV: NavItem[] = [
  { label: "Products", href: aero("/products"), match: [aero("/daqip"), aero("/aircert-ai")] },
  { label: "Solutions", href: aero("/solutions") },
  { label: "Services", href: aero("/services") },
  { label: "Research", href: aero("/research") },
  { label: "Company", href: aero("/about") },
  { label: "Careers", href: aero("/careers"), match: [aero("/internships")] },
  { label: "Contact", href: aero("/contact") },
];

export const AERO_MENU_GROUPS: NavGroup[] = [
  {
    title: "Products",
    items: [
      { label: "DAQIP™", href: aero("/daqip") },
      { label: "AirCert AI™", href: aero("/aircert-ai") },
      { label: "All products", href: aero("/products") },
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
