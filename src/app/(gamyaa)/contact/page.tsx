import { ContactSection, type ContactIntent } from "@/components/contact/contact-section";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { parent } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact GAMYAA | Aerospace, Defence & Deep Tech",
  description:
    "Contact GAMYAA about Gamyaa AeroSystems, Gamyaa Ventures, partnerships and engineering collaboration. Bangalore, India.",
  href: parent("/contact"),
});

const INTENTS: ContactIntent[] = [
  {
    interest: "daqip",
    title: "Gamyaa AeroSystems",
    body: "DAQIP™ demos, AirCert AI™, engineering services and aerospace quality problems.",
    subject: "Gamyaa AeroSystems enquiry",
    ga: { event: "contact_sales_click" },
  },
  {
    interest: "ventures",
    title: "Gamyaa Ventures",
    body: "Venture building, strategic collaboration and technology partnerships.",
    subject: "Gamyaa Ventures — partnership",
    ga: { event: "ventures_contact" },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "GAMYAA", href: parent("/") },
              { name: "Contact", href: parent("/contact") },
            ]}
          />
        }
        eyebrow="Contact"
        title="Talk to GAMYAA"
        lede="Questions about Gamyaa AeroSystems, Gamyaa Ventures or a partnership."
      />
      <ContactSection formName="gamyaa_contact" intents={INTENTS} />
    </>
  );
}
