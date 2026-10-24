import { LearnCta, LearnHero, LearnJsonLd, References, RelatedTopics } from "@/components/aeaip/learn";
import { ArrowLink, Container, JsonLd } from "@/components/ui/primitives";
import { learnPage } from "@/content/aeaip";
import { GLOSSARY } from "@/content/glossary";
import { refs } from "@/content/references";
import { definedTermSetLd, pageMetadata } from "@/lib/seo";

const page = learnPage("glossary");
const TITLE = "Engineering Assurance Glossary — Verification, Reviews, Configuration & Quality Terms | AEAIP";
const DESCRIPTION =
  "Plain definitions of aerospace engineering assurance terms: verification, validation, qualification, acceptance, configuration baseline, NCR, waiver, TRR, CDR, FRR, HIL, SBOM, FAI and more.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const GROUPS = Array.from(new Set(GLOSSARY.map((t) => t.group)));
const groupId = (g: string) => g.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

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
            site. Where frameworks use a term differently, the definition says so. Each term links to the page that
            explains it in depth.
          </p>
        }
      >
        <nav aria-label="Glossary sections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <li key={g}>
                <a
                  href={`#${groupId(g)}`}
                  className="inline-flex min-h-10 items-center border border-line-strong bg-surface px-3 text-sm text-ink-2 hover:border-ink hover:text-ink"
                >
                  {g}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </LearnHero>

      {GROUPS.map((g) => (
        <section
          key={g}
          id={groupId(g)}
          aria-labelledby={`${groupId(g)}-title`}
          className="scroll-mt-28 border-t border-line py-12 md:py-16"
          data-ga-section="glossary"
        >
          <Container className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <h2 id={`${groupId(g)}-title`} className="text-2xl font-medium tracking-tight text-ink lg:col-span-4">
              {g}
            </h2>
            <dl className="divide-y divide-line border-y border-line lg:col-span-8">
              {GLOSSARY.filter((t) => t.group === g).map((t) => (
                <div key={t.slug} id={t.slug} className="scroll-mt-28 py-5">
                  <dt className="text-lg font-medium text-ink">{t.term}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    {t.definition}
                    {t.see ? (
                      <ArrowLink href={t.see} className="mt-1 flex min-h-9 w-fit text-sm" label={`glossary_${t.slug}`}>
                        Read more about {t.term.split(" — ")[0]}
                      </ArrowLink>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ))}

      <RelatedTopics
        current={page.slug}
        slugs={["verification-validation", "review-gates", "configuration-assurance", "engineering-evidence-graph", "satellites-spacecraft"]}
      />
      <References items={refs("nasa-seh", "iso-15288", "eia-649", "ecss-verification", "as9102", "sebok-verification")} />
      <LearnCta title="Missing a term?" body="Tell us which engineering assurance terms your teams use differently." />
    </>
  );
}
