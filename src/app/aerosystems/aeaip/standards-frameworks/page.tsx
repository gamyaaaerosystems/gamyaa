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
import { StandardsReference, type StandardRow } from "@/components/system/standards-reference";
import { learnPage } from "@/content/aeaip";
import { REFERENCES, refs, type ReferenceId } from "@/content/references";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

const page = learnPage("standards-frameworks");
const TITLE = "Aerospace Standards & Framework Mapping — NASA, ECSS, ISO, AS9100, NIST | AEAIP";
const DESCRIPTION =
  "How AEAIP is designed to map engineering evidence to systems-engineering, space, quality, configuration, airworthiness and cybersecurity frameworks — and why mapping is not compliance.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const CATEGORIES: Array<{ name: string; maps: string }> = [
  { name: "Systems Engineering", maps: "requirements quality, traceability, verification and validation processes, technical reviews and configuration management." },
  { name: "Space", maps: "verification methods, levels and stages; environmental test evidence; project reviews; national authorisation evidence." },
  { name: "Software", maps: "software verification, coverage and assurance evidence tied to reproducible builds." },
  { name: "Quality", maps: "quality-system evidence, First Article Inspection records and product conformity (with DAQIP™)." },
  { name: "Cybersecurity", maps: "security requirements, controls, verification, findings, remediation and retest." },
  { name: "Certification", maps: "development and safety assurance evidence, compliance matrices and certification evidence (with AirCert AI™)." },
];

const TAGS: Partial<Record<ReferenceId, string[]>> = {
  "nasa-seh": ["Systems Engineering", "Space"],
  "npr-7123": ["Systems Engineering", "Space"],
  "iso-15288": ["Systems Engineering"],
  "iso-29148": ["Systems Engineering"],
  "incose-handbook": ["Systems Engineering"],
  "nasa-seh-cm": ["Systems Engineering"],
  "eia-649": ["Systems Engineering", "Quality"],
  "iso-10007": ["Systems Engineering", "Quality"],
  "ecss-verification": ["Space"],
  "ecss-testing": ["Space"],
  "ecss-project": ["Space"],
  "ecss-cm": ["Space", "Systems Engineering"],
  gevs: ["Space"],
  "npr-7150": ["Software", "Space"],
  "nasa-std-8739-8": ["Software", "Space"],
  "ecss-software": ["Software", "Space"],
  "ecss-swpa": ["Software", "Space"],
  as9100: ["Quality"],
  as9102: ["Quality"],
  arp4754b: ["Certification"],
  arp4761a: ["Certification"],
  faa: ["Certification"],
  easa: ["Certification"],
  dgca: ["Certification"],
  "imap-2023": ["Certification"],
  "nist-csf": ["Cybersecurity"],
  "nist-ir-8270": ["Cybersecurity", "Space"],
  "nist-ir-8401": ["Cybersecurity", "Space"],
  "nist-ssdf": ["Cybersecurity", "Software"],
  "nist-800-160": ["Cybersecurity", "Systems Engineering"],
  "spd-5": ["Cybersecurity", "Space"],
  "ntia-sbom": ["Cybersecurity", "Software"],
  "indian-space-policy": ["Space"],
  "in-space": ["Space"],
};

const UNLINKED: StandardRow[] = [
  { id: "do-178c", title: "RTCA DO-178C, Software Considerations in Airborne Systems and Equipment Certification", publisher: "RTCA", note: "Airborne software development assurance.", categories: ["Software", "Certification"] },
  { id: "do-254", title: "RTCA DO-254, Design Assurance Guidance for Airborne Electronic Hardware", publisher: "RTCA", note: "Airborne electronic hardware design assurance.", categories: ["Certification"] },
  { id: "do-326a", title: "RTCA DO-326A / EUROCAE ED-202A, Airworthiness Security Process Specification", publisher: "RTCA / EUROCAE", note: "Airworthiness security for aircraft systems.", categories: ["Cybersecurity", "Certification"] },
];

const ROWS: StandardRow[] = [
  ...(Object.keys(TAGS) as ReferenceId[]).map((id) => ({
    id,
    title: REFERENCES[id].title,
    publisher: REFERENCES[id].publisher,
    url: REFERENCES[id].url,
    note: REFERENCES[id].note,
    categories: TAGS[id]!,
  })),
  ...UNLINKED,
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
        title="Standards and frameworks, by category"
        lede="Frameworks a programme may apply, depending on its domain, customer and jurisdiction. Filter by category; links go to the publisher or official source."
        wide
      >
        <StandardsReference rows={ROWS} categories={CATEGORIES} />
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
