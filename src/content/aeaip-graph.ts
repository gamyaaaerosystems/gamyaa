import type { GraphNodeType } from "@/lib/analytics";

/**
 * Engineering Evidence Graph™ example (fictitious): one requirement and the records
 * connected to it, used by the interactive explorer and the static preview.
 */
export type GraphNode = {
  id: GraphNodeType;
  kind: string;
  value: string;
  /** Relationship from the requirement's point of view. */
  relation: string;
  detail: string;
  /** Effect of the configuration change in the example. */
  onChange?: "changed" | "review";
  changedValue?: string;
  why?: string;
};

export const GRAPH_CENTER = {
  kind: "Requirement",
  value: "R-042",
  text: "The on-board computer shall enter safe mode within 2 s of a watchdog timeout.",
};

export const GRAPH_NODES: GraphNode[] = [
  {
    id: "design",
    kind: "Design revision",
    value: "OBC design Rev C",
    relation: "implemented by",
    detail: "The released design that implements R-042: fault-management logic and watchdog circuit.",
  },
  {
    id: "interface",
    kind: "Interface",
    value: "ICD OBC–EPS Rev D",
    relation: "constrained by",
    detail: "Defines the watchdog reset line and power sequencing between the computer and the power system.",
  },
  {
    id: "hardware",
    kind: "Hardware revision",
    value: "OBC board Rev D",
    relation: "configuration",
    detail: "The board revision the verification was performed on.",
    onChange: "changed",
    changedValue: "OBC board Rev E",
    why: "A new board revision is approved: a different oscillator and reset supervisor.",
  },
  {
    id: "software",
    kind: "Software revision",
    value: "FSW build 4.2.1",
    relation: "configuration",
    detail: "The flight software build the verification ran on.",
  },
  {
    id: "procedure",
    kind: "Test procedure",
    value: "TP-118 Rev C",
    relation: "verified by",
    detail: "The approved HIL procedure with fault-injection case FI-12.",
  },
  {
    id: "result",
    kind: "Test result",
    value: "HIL pass · 1.6 s",
    relation: "evidence",
    detail: "Measured safe-mode entry of 1.6 s, produced on board Rev D and build 4.2.1.",
    onChange: "review",
    why: "Produced on board Rev D. Timing depends on the oscillator and reset supervisor that changed in Rev E.",
  },
  {
    id: "ncr",
    kind: "NCR",
    value: "NCR-0142 · closed",
    relation: "affected by",
    detail: "A harness torque nonconformance on the test article, dispositioned use-as-is and closed.",
  },
  {
    id: "corrective_action",
    kind: "Corrective action",
    value: "CA-0219",
    relation: "resolved by",
    detail: "Telemetry flush moved to a low-priority task after an earlier HIL anomaly.",
  },
  {
    id: "retest",
    kind: "Retest",
    value: "HIL C3-R · pass",
    relation: "evidence",
    detail: "Retest after the corrective action, on board Rev D.",
    onChange: "review",
    why: "Also produced on board Rev D, so it carries the same configuration dependency.",
  },
  {
    id: "approval",
    kind: "Approval",
    value: "Chief Engineer · closed",
    relation: "approved by",
    detail: "Closure of R-042 approved on the basis of the test result and retest.",
    onChange: "review",
    why: "The closure relied on evidence that is now under review, so the approval must be revisited.",
  },
];

export const GRAPH_CHANGE = {
  label: "OBC board Rev D → Rev E",
  summary:
    "The board revision changed. Three records relied on Rev D, so they move to Review Required. Nothing is deleted and nothing is silently kept: an engineer decides whether to retain the evidence with a rationale or reverify.",
};
