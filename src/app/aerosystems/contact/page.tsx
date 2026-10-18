import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Gamyaa AeroSystems | Bangalore, India",
  description:
    "Contact Gamyaa AeroSystems about DAQIP™, First Article Inspection, AirCert AI™, engineering services or partnerships. Purushothama Padmanabha, Bangalore, India.",
  href: aero("/contact"),
});

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
        lede="Demos, pilots, partnerships and engineering questions. Write to us, or call during Indian business hours."
      />
      <section className="pb-20" data-ga-section="contact">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ContactDetails />
          </div>
          <div className="lg:col-span-8">
            <h2 className="sr-only">Send a message</h2>
            <ContactForm formName="aerosystems_contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
