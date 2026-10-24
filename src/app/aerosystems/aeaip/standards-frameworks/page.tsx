import Link from "next/link";
import {
  AeaipRelation,
  ArticleSection,
  LearnCta,
  LearnHero,
  LearnJsonLd,
  References,
  RelatedTopics,
} from "@/components/aeaip/learn";
import { SmartLink } from "@/components/ui/primitives";
import { learnPage } from "@/content/aeaip";
import { REFERENCES, refs, type ReferenceId } from "@/content/references";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

const page = learnPage("standards-frameworks");
const TITLE = "Aerospace Standards & Framework Mapping — NASA, ECSS, ISO, AS9100, NIST | AEAIP";
const DESCRIPTION =
  "How AEAIP is designed to map engineering evidence to systems-engineering, space, quality, configuration, airworthiness and cybersecurity frameworks — and why mapping is not compliance.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const FAMILIES: Array<{ family: string; sources: Array<ReferenceId | string>; maps: string }> = [
  {
    family: "Systems engineering",
    sources: ["iso-15288", "iso-29148", "incose-handbook", "nasa-seh", "npr-7123"],
    maps: "Requirements quality, traceability, verification and validation processes, technical reviews.",
  },
  {
    family: "Space engineering and product assurance (Europe)",
    sources: ["ecss-verification", "ecss-testing", "ecss-project", "ecss-software", "ecss-swpa"],
    maps: "Verification methods, levels and stages; test evidence; project reviews; software assurance.",
  },
  {
    family: "NASA software and environmental verification",
    sources: ["npr-7150", "nasa-std-8739-8", "gevs"],
    maps: "Software verification and assurance evidence; environmental test evidence and levels.",
  },
  {
    family: "Aerospace quality management",
    sources: ["as9100", "as9102"],
    maps: "Quality-system evidence, First Article Inspection records and product conformity (with DAQIP™).",
  },
  {
    family: "Configuration management",
    sources: ["eia-649", "iso-10007", "ecss-cm", "nasa-seh-cm"],
    maps: "Configuration identification, change control, status accounting and audits as evidence context.",
  },
  {
    family: "Airworthiness and certification",
    sources: ["arp4754b", "arp4761a", "faa", "easa", "dgca", "imap-2023", "RTCA DO-178C (airborne software)", "RTCA DO-254 (airborne electronic hardware)"],
    maps: "Development and safety assurance evidence, compliance matrices and certification evidence (with AirCert AI™).",
  },
  {
    family: "Cybersecurity",
    sources: ["nist-csf", "nist-ir-8270", "nist-ir-8401", "nist-ssdf", "nist-800-160", "spd-5", "ntia-sbom", "RTCA DO-326A / EUROCAE ED-202A (airworthiness security)"],
    maps: "Security requirements, controls, verification, findings, remediation and retest.",
  },
  {
    family: "Indian space ecosystem",
    sources: ["indian-space-policy", "in-space"],
    maps: "Authorisation and regulatory evidence for missions by Indian non-government entities.",
  },
];

const MAPPING_EXAMPLE: Array<[string, string, string]> = [
  [
    "Verification records identify the requirement version and product version verified",
    "NASA SE Handbook, product verification",
    "Evidence → produced on → configuration; requirement revision on every closure",
  ],
  [
    "Configuration status is recorded and auditable",
    "SAE EIA-649C; ISO 10007",
    "Configuration nodes, change history, as-tested versus as-built comparison",
  ],
  [
    "Each design characteristic is accounted for at First Article Inspection",
    "AS9102C (via DAQIP™)",
    "Characteristic → method → measurement → evidence → approval",
  ],
  [
    "Security requirements are verified and findings tracked to closure",
    "NIST SP 800-160 Vol. 1 Rev. 1",
    "Security requirement → control → test → finding → remediation → retest",
  ],
];

function SourceItem({ source }: { source: ReferenceId | string }) {
  const ref = (REFERENCES as Record<string, (typeof REFERENCES)[ReferenceId]>)[source];
  if (!ref) return <li className="text-ink-2">{source}</li>;
  return (
    <li>
      <SmartLink href={ref.url} label={`reference_${ref.id}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
        {ref.title}
      </SmartLink>
    </li>
  );
}

export default function StandardsFrameworksPage() {
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Standards and framework mapping for aerospace engineering assurance"
        description={DESCRIPTION}
        about={["Aerospace standards", "Framework mapping", "Compliance evidence", "Systems engineering standards"]}
      />

      <LearnHero
        page={page}
        topic="Standards"
        title="Standards & framework mapping for aerospace engineering assurance"
        answer={
          <>
            <p>
              AEAIP is designed to map engineering evidence and workflows against applicable engineering, assurance,
              quality, safety, cybersecurity and certification frameworks.
            </p>
            <p className="mt-3">
              Mapping shows which evidence supports which expectation of a framework. It is not certification and does
              not make an organisation compliant; compliance remains the organisation&apos;s responsibility, assessed by
              its customers, auditors and authorities.
            </p>
          </>
        }
      />

      <ArticleSection id="mapping-vs-compliance" n="01" title="Mapping is not compliance">
        <p>
          Engineering organisations work to frameworks that their customers, regulators and own quality systems
          invoke. A mapping connects a framework&apos;s expectations to the evidence that addresses them, so gaps are
          visible before an audit or review rather than during it.
        </p>
        <p>To be explicit about what is not claimed:</p>
        <ul>
          <li>AEAIP is not &ldquo;NASA compliant&rdquo;, and GAMYAA has no NASA affiliation or endorsement.</li>
          <li>AEAIP is not &ldquo;ECSS certified&rdquo;; ECSS publishes standards rather than certifying software tools.</li>
          <li>Using AEAIP or DAQIP™ does not guarantee AS9100 or AS9102 compliance.</li>
          <li>Neither AEAIP nor AirCert AI™ guarantees airworthiness or provides regulatory approval.</li>
          <li>No security certification (such as SOC 2 or ISO/IEC 27001) is held for AEAIP.</li>
        </ul>
      </ArticleSection>

      <ArticleSection
        id="how"
        n="02"
        title="How a mapping works"
        lede="Illustrative examples. Framework expectations are paraphrased and referenced, never reproduced."
        wide
      >
        <div className="gx-scroll-x overflow-x-auto border border-line bg-surface">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">Illustrative framework-to-evidence mapping</caption>
            <thead>
              <tr className="border-b border-line">
                {["Expectation (paraphrased)", "Referenced framework", "Evidence pattern in AEAIP"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-subtle">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MAPPING_EXAMPLE.map(([a, b, c]) => (
                <tr key={a} className="border-b border-line align-top last:border-b-0">
                  <td className="px-4 py-3 text-ink">{a}</td>
                  <td className="px-4 py-3 text-ink-2">{b}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-2">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ArticleSection>

      <ArticleSection
        id="families"
        n="03"
        title="Framework families"
        lede="Frameworks a programme may apply, depending on its domain, customer and jurisdiction. Links go to the publisher or official source."
        wide
      >
        <ul className="divide-y divide-line border-y border-line">
          {FAMILIES.map((f) => (
            <li key={f.family} className="grid gap-4 py-6 lg:grid-cols-12">
              <h3 className="text-lg font-medium text-ink lg:col-span-3">{f.family}</h3>
              <ul className="space-y-1.5 text-sm lg:col-span-6">
                {f.sources.map((s) => (
                  <SourceItem key={s} source={s} />
                ))}
              </ul>
              <p className="text-sm text-ink-2 lg:col-span-3">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">AEAIP would map · </span>
                {f.maps}
              </p>
            </li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection id="copyright" n="04" title="Standards are referenced, not reproduced">
        <p>
          Many aerospace standards are copyrighted and sold by their publishers. GAMYAA does not reproduce their text,
          tables, clauses or diagrams, and does not invent clause numbers. Where an organisation maps its evidence to a
          licensed standard, it does so using its own licensed copy; AEAIP is designed to hold the reference and the
          organisation&apos;s own interpretation, not the standard&apos;s text.
        </p>
      </ArticleSection>

      <ArticleSection id="tailoring" n="05" title="Frameworks are tailored per programme">
        <p>
          Programmes rarely apply a framework wholesale. They tailor it: selecting applicable requirements, adjusting
          levels, adding customer-specific expectations. The tailoring is itself an engineering decision that needs to
          be visible.
        </p>
        <p>
          That is why AEAIP treats frameworks and review gates as configuration, not code; see{" "}
          <Link href={`${aero("/aeaip/review-gates")}#configurable`}>Configurable Assurance Gates</Link>.
        </p>
        <AeaipRelation status="research">
          <p>
            Framework mapping is part of AEAIP research. DAQIP™ is designed around AS9102-aligned First Article
            Inspection; AirCert AI™ is planned to support certification compliance matrices. None of these imply
            compliance or certification.
          </p>
        </AeaipRelation>
      </ArticleSection>

      <RelatedTopics
        current={page.slug}
        slugs={["verification-validation", "review-gates", "cybersecurity-assurance", "configuration-assurance", "glossary"]}
      />
      <References
        status="research"
        items={refs("nasa-seh", "npr-7123", "iso-15288", "ecss-verification", "ecss-project", "as9100", "as9102", "eia-649", "arp4754b", "nist-csf")}
      />
      <LearnCta
        title="Which frameworks does your programme answer to?"
        body="Tell us which standards your customers invoke, and where evidence mapping costs you the most time."
      />
    </>
  );
}
