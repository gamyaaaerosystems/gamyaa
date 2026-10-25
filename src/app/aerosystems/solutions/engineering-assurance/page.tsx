import { KnowledgeIndex } from "@/components/aeaip/learn";
import { SolutionTemplate, solutionMetadata } from "@/components/sections/solution-template";
import { Container, Section, SectionHeader } from "@/components/ui/primitives";

export const metadata = solutionMetadata("engineering-assurance");

/** The educational bridge into AEAIP: the problem and one example here, the model on the AEAIP pages. */
export default function EngineeringAssurancePage() {
  return (
    <SolutionTemplate
      slug="engineering-assurance"
      after={
        <Section labelledBy="concepts-title" section="solution_concepts" className="pt-0 md:pt-0">
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Learn the concepts"
                id="concepts-title"
                title="The ideas behind it"
                lede="Each concept is explained in depth in the AEAIP™ knowledge pages."
              />
            </div>
            <div className="lg:col-span-8">
              <KnowledgeIndex
                source="solution_page"
                only={["engineering-evidence-graph", "configuration-assurance", "verification-validation", "review-gates"]}
              />
            </div>
          </Container>
        </Section>
      }
    />
  );
}
