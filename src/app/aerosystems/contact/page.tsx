import { ContactSection, type ContactIntent } from "@/components/contact/contact-section";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Gamyaa AeroSystems | Bangalore, India",
  description:
    "Contact Gamyaa AeroSystems about AEAIP™ and engineering assurance, a DAQIP™ demo, AirCert AI™, strategic partnerships, investor conversations or careers. Bangalore, India.",
  href: aero("/contact"),
});

/** Every intent also fires contact_intent_select with its predefined `intent` value (no free text). */
const INTENTS: ContactIntent[] = [
  {
    interest: "aeaip",
    title: "Discuss AEAIP™",
    body: "An engineering assurance or readiness problem. AEAIP™ is at Research & Architecture status.",
    subject: "AEAIP discussion",
    ga: { event: "contact_sales_click", params: { source_location: "contact_page", intent: "aeaip" }, also: "contact_intent_select" },
  },
  {
    interest: "daqip",
    title: "Request a DAQIP™ Demo",
    body: "Manufacturing assurance and First Article Inspection: see the workflow and discuss a pilot.",
    subject: "DAQIP demo request",
    ga: { event: "demo_interest", params: { product: "daqip", cta_location: "contact_page", intent: "daqip" }, also: "contact_intent_select" },
  },
  {
    interest: "aircert",
    title: "Discuss AirCert AI™",
    body: "Certification assurance: certification basis, means of compliance and evidence. AirCert AI™ is planned.",
    subject: "AirCert AI discussion",
    ga: { event: "demo_interest", params: { product: "aircert", cta_location: "contact_page", intent: "aircert" }, also: "contact_intent_select" },
  },
  {
    interest: "strategic-partnership",
    title: "Strategic Partnership",
    body: "Engineering, technology or ecosystem collaboration with Gamyaa AeroSystems.",
    subject: "Strategic partnership",
    ga: { event: "contact_intent_select", params: { intent: "strategic-partnership" } },
  },
  {
    interest: "investor",
    title: "Investor / Strategic Conversation",
    body: "A conversation about the company, its platforms and its direction.",
    subject: "Investor / strategic conversation",
    ga: { event: "contact_intent_select", params: { intent: "investor" } },
  },
  {
    interest: "careers",
    title: "Careers",
    body: "Introduce yourself if your experience fits the domains on our careers page.",
    subject: "Careers — Gamyaa AeroSystems",
    ga: { event: "career_cta_click", params: { intent: "careers" }, also: "contact_intent_select" },
  },
];

export default function AeroContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Gamyaa AeroSystems", href: aero("/") },
              { name: "Contact", href: aero("/contact") },
            ]}
          />
        }
        eyebrow="Contact"
        title="Talk to Gamyaa AeroSystems"
        lede="Choose what you would like to discuss. Email us, or call during Indian business hours."
      />
      <ContactSection formName="aerosystems_contact" intents={INTENTS} callCard={false} />
    </>
  );
}
