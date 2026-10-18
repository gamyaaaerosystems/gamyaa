import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/shared";
import { pageMetadata } from "@/lib/seo";
import { parent } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact GAMYAA | Aerospace, Defence & Deep Tech",
  description:
    "Contact GAMYAA about Gamyaa AeroSystems, Gamyaa Ventures, partnerships and engineering collaboration. Bangalore, India.",
  href: parent("/contact"),
});

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
        lede="Questions about Gamyaa AeroSystems, Gamyaa Ventures or a partnership. We reply by email."
      />
      <section className="pb-20" data-ga-section="contact">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ContactDetails />
          </div>
          <div className="lg:col-span-8">
            <h2 className="sr-only">Send a message</h2>
            <ContactForm formName="gamyaa_contact" />
          </div>
        </Container>
      </section>
    </>
  );
}
