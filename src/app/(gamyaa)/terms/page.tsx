import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, Notice } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/shared";
import { pageMetadata } from "@/lib/seo";
import { CONTACT, parent } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use | GAMYAA",
  description: "Terms of use for the gamyaa.in website. Placeholder pending legal review.",
  href: parent("/terms"),
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "GAMYAA", href: parent("/") },
              { name: "Terms", href: parent("/terms") },
            ]}
          />
        }
        eyebrow="Legal"
        title="Terms of Use"
      />
      <Container className="pb-20">
        <div className="max-w-3xl">
          <Notice>
            <strong>Legal review required before public launch.</strong> The text below is a clearly marked
            placeholder. It has not been reviewed by counsel and must not be relied on as final terms.
          </Notice>
          <div className="prose-body mt-10">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-subtle">Placeholder · October 2026</p>

            <h2>1. About this website</h2>
            <p>
              gamyaa.in provides general information about GAMYAA, Gamyaa AeroSystems and Gamyaa Ventures. Gamyaa
              AeroSystems Private Limited is planned and not yet incorporated; until it is, references to Gamyaa
              AeroSystems describe the business and not a registered company.
            </p>

            <h2>2. Information only</h2>
            <p>
              Content on this site is for general information. Product descriptions include capabilities that are in
              development, in research or planned, and are labelled as such. Nothing on this site is an offer,
              warranty, certification or statement of regulatory compliance.
            </p>

            <h2>3. No certification or approval</h2>
            <p>
              DAQIP™ and AirCert AI™ are intended to assist engineering, quality and certification work. They do not
              certify products, grant airworthiness approval or replace the decisions of engineers, quality
              functions or certification authorities.
            </p>

            <h2>4. Intellectual property</h2>
            <p>
              GAMYAA, Gamyaa AeroSystems, DAQIP™ and AirCert AI™ names, logos and site content belong to their
              respective owners. Illustrative drawings on this site are fictitious and are not customer data.
            </p>

            <h2>5. Third-party sites</h2>
            <p>Links to other websites are provided for convenience. We are not responsible for their content.</p>

            <h2>6. Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
