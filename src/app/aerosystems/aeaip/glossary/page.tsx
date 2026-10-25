import { LearnCta, LearnHero, LearnJsonLd, References, RelatedTopics } from "@/components/aeaip/learn";
import { GlossaryBrowser } from "@/components/system/glossary-browser";
import { Container, JsonLd } from "@/components/ui/primitives";
import { learnPage } from "@/content/aeaip";
import { GLOSSARY } from "@/content/glossary";
import { refs } from "@/content/references";
import { definedTermSetLd, pageMetadata } from "@/lib/seo";

const page = learnPage("glossary");
const TITLE = "Engineering Assurance Glossary — Verification, Reviews, Configuration & Quality Terms | AEAIP";
const DESCRIPTION =
  "Plain definitions of aerospace engineering assurance terms: verification, validation, qualification, acceptance, configuration baseline, NCR, waiver, TRR, CDR, FRR, HIL, SBOM, FAI and more.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

export default function GlossaryPage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Engineering assurance glossary"
        description={DESCRIPTION}
        about={["Aerospace engineering terminology", "Verification and validation", "Configuration management", "Engineering reviews"]}
      />
      <JsonLd data={definedTermSetLd({ name: "Engineering assurance glossary", href: page.href, terms: GLOSSARY })} />

      <LearnHero
        page={page}
        topic="Glossary"
        title="Engineering assurance glossary"
        answer={
          <p>
            Plain-language definitions of the verification, review, configuration and quality terms used across this
            site. Where frameworks use a term differently, the definition says so, and each term links to the page that
            explains it in depth.
          </p>
        }
      />

      <section aria-label="Glossary terms" className="pb-16 md:pb-24" data-ga-section="glossary">
        <Container>
          <GlossaryBrowser terms={GLOSSARY} />
        </Container>
      </section>

      <RelatedTopics
        current={page.slug}
        slugs={["verification-validation", "review-gates", "configuration-assurance", "engineering-evidence-graph", "satellites-spacecraft"]}
      />
      <References items={refs("nasa-seh", "iso-15288", "eia-649", "ecss-verification", "as9102", "sebok-verification")} />
      <LearnCta title="Missing a term?" body="Tell us which engineering assurance terms your teams use differently." />
    </>
  );
}
