import Link from "next/link";
import {
  AeaipRelation,
  ArticleSection,
  LearnCta,
  LearnHero,
  LearnJsonLd,
  References,
  RelatedTopics,
  ReviewStages,
} from "@/components/aeaip/learn";
import { FlowChain } from "@/components/diagrams/flow";
import { CYBER_CHAIN, EVIDENCE_LINES, learnPage } from "@/content/aeaip";
import { EvidenceLine } from "@/components/system/evidence-line";
import { ISSUES } from "@/content/aeaip-demo";
import { refs } from "@/content/references";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

const page = learnPage("cybersecurity-assurance");
const TITLE = "Aerospace Cybersecurity Assurance — Security as Engineering Evidence | AEAIP";
const DESCRIPTION =
  "Aerospace and space cybersecurity assurance as an engineering discipline: security requirements, threats, controls, verification, findings, remediation, retest and authorised review in one evidence chain.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, href: page.href });

const CHAIN_NOTES: Record<string, string> = {
  "Security Need": "What must be protected, and from what: commanding, data, availability, integrity of the mission.",
  "Security Requirement": "A verifiable statement, for example: reject replayed or out-of-sequence telecommands.",
  "Threat / Risk": "The attack path and its likelihood and consequence, from the threat model.",
  "Allocated Control": "The mechanism chosen to meet the requirement, allocated to an element of the architecture.",
  "Architecture / Component": "Where the control lives: flight software, on-board computer, radio, ground segment.",
  Configuration: "The exact build, firmware, keys and settings the control was implemented and tested on.",
  "Verification Method": "Design review, analysis, test, fuzzing or penetration testing.",
  "Security Test / Analysis Evidence": "Results, with their configuration and the tester's scope.",
  "Finding / Vulnerability": "A weakness found, with severity, affected configuration and affected requirements.",
  Remediation: "The change made, through normal change control.",
  Retest: "Re-verification on the remediated configuration, and regression of what the change touched.",
  "Verification Closure": "The requirement is closed on current evidence.",
  "Authorized Security / Engineering Review": "A named, authorised reviewer accepts the closure or the residual risk.",
};

const AREAS: Array<[string, string]> = [
  ["Secure by design", "Security requirements and threat modelling from concept, not added after CDR."],
  ["Software supply chain", "Knowing which components, versions and suppliers are in each flight and ground build."],
  ["SBOM and provenance", "A software bill of materials per build, linked to the build's verification evidence."],
  ["Firmware integrity", "Evidence that the firmware loaded on each unit is the firmware that was approved."],
  ["Secure boot", "Evidence that only authenticated software can start on the processor."],
  ["Avionics security", "Protection of on-board data buses, interfaces and maintenance ports."],
  ["Telemetry and command security", "Authentication and, where required, encryption of TT&C links, including replay protection."],
  ["Ground segment security", "Mission control, ground stations and their networks, which are often the larger attack surface."],
  ["Connected systems", "Interfaces to partners, cloud services and data users."],
  ["Mission cyber assurance", "Security risk accepted at mission level, by the right authority, with evidence."],
];

export default function CybersecurityAssurancePage() {
  const finding = ISSUES.find((i) => i.id === "SEC-F-031")!;
  return (
    <>
      <LearnJsonLd
        page={page}
        headline="Cybersecurity as engineering assurance for aerospace and space systems"
        description={DESCRIPTION}
        about={["Aerospace cybersecurity assurance", "Space system cybersecurity", "Software bill of materials", "Security verification"]}
      />

      <LearnHero
        page={page}
        topic="Cybersecurity"
        status="research"
        title="Cybersecurity as engineering assurance for aerospace and space systems"
        answer={
          <>
            <p>
              Aerospace cybersecurity assurance treats security like any other engineering property: stated as
              requirements, allocated to the architecture, verified by analysis and test, and closed with evidence.
            </p>
            <p className="mt-3">
              A security finding follows the same path as a nonconformance — remediation, retest, closure and authorised
              review — and is tied to the configuration it was found on.
            </p>
          </>
        }
        visual={<EvidenceLine steps={EVIDENCE_LINES.cyber} label="Security assurance Evidence Line" size="lg" />}
      />

      <ArticleSection id="why" n="01" title="Why security belongs in the assurance chain">
        <p>
          Spacecraft and aircraft are long-lived, expensive to modify and, in the case of spacecraft, impossible to
          reach physically after launch. They are commanded over radio links, built from software and hardware supplied
          by many organisations, and operated through ground systems connected to wider networks.
        </p>
        <p>
          A security weakness is therefore a mission risk in the same sense as a structural margin or a thermal limit.
          Public policy has said so explicitly: the United States&apos; Space Policy Directive-5 calls for cybersecurity
          to be built into space systems from design onward, and NIST has published Cybersecurity Framework guidance for
          commercial satellite operations and for the satellite ground segment.
        </p>
        <p>
          When security lives in a separate report, its findings do not appear in the readiness picture until someone
          copies them across. In AEAIP they are part of the same graph as every other finding.
        </p>
      </ArticleSection>

      <ArticleSection id="chain" n="02" title="The security assurance chain" wide>
        <dl className="grid gap-x-12 md:grid-cols-2">
          {CYBER_CHAIN.map((s, i) => (
            <div key={s} className="grid grid-cols-[2rem_1fr] border-t border-line py-3.5">
              <span className="font-mono text-xs text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <dt className="text-[0.9375rem] font-medium text-ink">{s}</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-ink-2">{CHAIN_NOTES[s]}</dd>
              </div>
            </div>
          ))}
        </dl>
      </ArticleSection>

      <ArticleSection id="areas" n="03" title="Where security assurance applies" wide>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(([t, b]) => (
            <li key={t} className="border-t border-line py-5">
              <h3 className="text-[0.9375rem] font-medium text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
            </li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection id="verification" n="04" title="How security is verified">
        <p>
          Security verification uses the same verification logic as everything else, with its own methods: threat
          modelling and secure-design review early; static and dynamic security testing, software composition analysis
          and fuzzing during development; penetration testing on representative configurations; and configuration
          verification, firmware integrity and secure-boot evidence on the flight article.
        </p>
        <p>
          The full list sits in the{" "}
          <Link href={`${aero("/aeaip/verification-validation")}#methods-cybersecurity`}>verification method taxonomy</Link>.
          Which methods apply depends on the system, its threat model and the programme&apos;s security requirements.
        </p>
      </ArticleSection>

      <ArticleSection id="configuration" n="05" title="Security evidence expires with configuration">
        <p>
          A penetration test is evidence about the build, keys and settings it was run against. A software bill of
          materials describes one build. When the flight software moves from 4.2.0 to 4.2.1, both need to be re-examined.
        </p>
        <p>
          This is configuration-aware evidence validity applied to security, and it is where security and engineering
          most often fall out of step: a remediation is made, the build changes, and the security evidence still on
          file describes the old build. See{" "}
          <Link href={learnPage("configuration-assurance").href}>configuration-aware evidence validity</Link>.
        </p>
      </ArticleSection>

      <ArticleSection id="example" n="06" title="Worked example: a command-path finding" lede="Fictitious finding from the Interactive Assurance Demo.">
        <FlowChain label="Example security finding trace" orientation="vertical" numbered steps={finding.trace.map((t) => `${t.label}: ${t.value}`)} />
        <p>
          At TRR this finding is a condition, not a blocker: commanding during the test is limited to the procedure.
          At SAR it becomes a blocker until the retest passes and an authorised reviewer closes it.
        </p>
      </ArticleSection>

      <ArticleSection id="frameworks" n="07" title="Frameworks and guidance">
        <p>
          AEAIP is designed to map security evidence to the frameworks a programme applies, without claiming
          compliance with any of them. Commonly referenced guidance includes:
        </p>
        <ul>
          <li>NIST Cybersecurity Framework 2.0, and its space profiles in NIST IR 8270 (commercial satellite operations) and NIST IR 8401 (satellite ground segment).</li>
          <li>NIST SP 800-218 (Secure Software Development Framework) and NIST SP 800-160 Vol. 1 Rev. 1 (systems security engineering).</li>
          <li>Software bill of materials guidance from NTIA and CISA.</li>
          <li>For aircraft, the airworthiness security process defined in RTCA DO-326A / EUROCAE ED-202A.</li>
          <li>The customer&apos;s and nation&apos;s own security requirements, which take precedence.</li>
        </ul>
        <AeaipRelation status="research">
          <p>
            Cybersecurity assurance in AEAIP is in research: security requirements, findings, remediation and retest as
            first-class nodes in the Engineering Evidence Graph, with the same validity and readiness logic as other
            evidence. GAMYAA does not hold security certifications for AEAIP, and none are claimed.
          </p>
        </AeaipRelation>
      </ArticleSection>

      <ArticleSection id="stages" n="08" title="Where it matters in the lifecycle">
        <ReviewStages
          codes={["SRR", "CDR", "TRR", "SAR", "ORR", "FRR"]}
          note="Security requirements at SRR, secure-design review by CDR, testing and retest through TRR and SAR, ground-segment readiness at ORR."
        />
      </ArticleSection>

      <RelatedTopics
        current={page.slug}
        slugs={["configuration-assurance", "verification-validation", "satellites-spacecraft", "standards-frameworks", "engineering-evidence-graph"]}
      />
      <References
        status="research"
        items={refs("nist-csf", "nist-ir-8270", "nist-ir-8401", "nist-ssdf", "nist-800-160", "ntia-sbom", "cisa-sbom", "spd-5")}
      />
      <LearnCta
        title="Where do your security findings live?"
        body="Tell us how security evidence reaches your review boards today."
      />
    </>
  );
}
