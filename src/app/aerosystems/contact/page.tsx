import { ContactSection, type ContactIntent } from "@/components/contact/contact-section";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Gamyaa AeroSystems | Bangalore, India",
  description:
    "Contact Gamyaa AeroSystems about AEAIP™, DAQIP™, AirCert AI™, engineering assurance problems, strategic partnerships or engineering services. Purushothama Padmanabha, Bangalore, India.",
  href: aero("/contact"),
});

const INTENTS: ContactIntent[] = [
  {
    interest: "aeaip",
    title: "Discuss AEAIP™",
    body: "Engineering assurance, spacecraft verification and review readiness. AEAIP is at Research & Architecture status.",
    subject: "AEAIP discussion",
    ga: { event: "contact_sales_click", params: { source_location: "contact_page" } },
  },
  {
    interest: "daqip",
    title: "Request a DAQIP Demo",
    body: "See the First Article Inspection and traceability workflow, and discuss a pilot on one of your parts.",
    subject: "DAQIP demo request",
    ga: { event: "demo_interest", params: { product: "daqip", cta_location: "contact_page" } },
  },
  {
    interest: "quality-problem",
    title: "Discuss an Aerospace Quality Problem",
    body: "FAI, inspection, supplier quality, manufacturing quality, airworthiness or certification evidence.",
    subject: "Aerospace quality problem — discussion",
    ga: { event: "problem_discussion_click", params: { topic: "general", cta_location: "contact_page" } },
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
        lede="Engineering assurance problems, AEAIP™ discussions, DAQIP™ demos, partnerships and engineering questions. Email us, or call during Indian business hours."
      />
      <ContactSection formName="aerosystems_contact" intents={INTENTS} />
    </>
  );
}
