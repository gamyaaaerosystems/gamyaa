import { GATE_CODES, type GateCode, type SubsystemKey, type TraceCategory, type ValidityStep } from "@/lib/analytics";

/**
 * Interactive Assurance Demo — sample dataset.
 *
 * Everything here is FICTITIOUS: the spacecraft, requirement IDs, reports, serial
 * numbers and values were invented for this demonstration. No customer, partner,
 * supplier or real programme data is used. The readiness logic is a simple,
 * transparent rule set for teaching; it is not a flight-safety or certification
 * determination.
 */

export const DEMO_PROGRAMME = {
  name: "GX-1",
  description: "Fictitious 150 kg-class optical Earth-observation smallsat in low Earth orbit",
  phase: "System-level environmental test campaign",
  currentGate: "TRR" as GateCode,
  currentGateContext: "TRR before system-level thermal-vacuum (TVAC) testing",
} as const;

export type Subsystem = {
  key: SubsystemKey;
  name: string;
  short: string;
  description: string;
  requirements: { total: number; verified: number };
};

export const SUBSYSTEMS: Subsystem[] = [
  {
    key: "structure",
    name: "Structure & Mechanisms",
    short: "Structure",
    description: "Primary structure, launch adapter interface and solar-array deployment mechanisms.",
    requirements: { total: 48, verified: 41 },
  },
  {
    key: "eps",
    name: "Electrical Power (EPS)",
    short: "EPS",
    description: "Solar arrays, battery, battery management firmware and power distribution.",
    requirements: { total: 62, verified: 49 },
  },
  {
    key: "adcs",
    name: "Attitude Determination & Control (ADCS)",
    short: "ADCS",
    description: "Star trackers, sun sensors, gyros, reaction wheels and magnetorquers.",
    requirements: { total: 54, verified: 38 },
  },
  {
    key: "thermal",
    name: "Thermal Control",
    short: "Thermal",
    description: "Radiators, coatings, multi-layer insulation and heaters.",
    requirements: { total: 36, verified: 24 },
  },
  {
    key: "avionics",
    name: "Avionics & On-board Computer",
    short: "Avionics",
    description: "On-board computer, data handling, harness and power conditioning electronics.",
    requirements: { total: 58, verified: 45 },
  },
  {
    key: "communications",
    name: "Communications",
    short: "Comms",
    description: "S-band telemetry, tracking and command (TT&C) and X-band payload downlink.",
    requirements: { total: 44, verified: 35 },
  },
  {
    key: "payload",
    name: "Payload (optical imager)",
    short: "Payload",
    description: "Optical telescope, focal plane and payload electronics.",
    requirements: { total: 70, verified: 52 },
  },
  {
    key: "flight_software",
    name: "Flight Software",
    short: "Flight SW",
    description: "Mode management, fault detection and recovery, telemetry and command handling.",
    requirements: { total: 96, verified: 63 },
  },
  {
    key: "cybersecurity",
    name: "Cybersecurity",
    short: "Cyber",
    description: "Command authentication, secure boot, software provenance and ground-segment security.",
    requirements: { total: 28, verified: 15 },
  },
];

export const subsystemByKey = (k: string) => SUBSYSTEMS.find((s) => s.key === k);

/* ------------------------------------------------------------- Issues */

export type TraceState = "done" | "fail" | "attention" | "open" | "na";
export type TraceStep = { label: string; value: string; state: TraceState };

export type Issue = {
  id: string;
  subsystem: SubsystemKey;
  category: TraceCategory;
  title: string;
  summary: string;
  /** First gate whose readiness this item affects, and how. */
  from: GateCode;
  level: "conditional" | "blocking";
  /** Gate from which a conditional item becomes blocking. */
  escalates?: GateCode;
  critical?: boolean;
  /** The condition a review board would attach while the item is conditional. */
  condition?: string;
  trace: TraceStep[];
};

export const CATEGORY_LABEL: Record<TraceCategory, string> = {
  anomaly: "Anomaly",
  ncr: "NCR",
  evidence_gap: "Evidence gap",
  configuration_mismatch: "Configuration mismatch",
  pending_test: "Pending test",
  cybersecurity_finding: "Cybersecurity finding",
  waiver: "Waiver",
};

export const ISSUES: Issue[] = [
  {
    id: "ANM-0219",
    subsystem: "flight_software",
    category: "anomaly",
    title: "FSW-247 failed in hardware-in-the-loop test",
    summary: "Safe-mode transition took 2.7 s against a 2 s requirement; corrective action implemented, retest pending.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "HIL retest on build 4.2.1 passes before the TVAC functional sequence starts.",
    trace: [
      { label: "Subsystem", value: "Flight Software", state: "done" },
      {
        label: "Requirement FSW-247",
        value: "Transition from NOMINAL to SAFE mode within 2 s of a watchdog timeout, preserving the last 60 s of housekeeping telemetry.",
        state: "done",
      },
      { label: "Verification method", value: "Test — hardware-in-the-loop (HIL)", state: "done" },
      { label: "HIL test", value: "HIL campaign C3 on the flat-sat, fault-injection case FI-12", state: "done" },
      { label: "Test procedure", value: "TP-FSW-118 Rev C · approved", state: "done" },
      {
        label: "Applicable configuration",
        value: "FSW build 4.2.0 · OBC engineering model S/N 002 (Rev D) · HIL simulator v3.1",
        state: "done",
      },
      { label: "Test result", value: "FAIL — transition 2.7 s; telemetry buffer truncated to 41 s", state: "fail" },
      {
        label: "Anomaly",
        value: "ANM-0219 (major) — telemetry flush blocked the mode-manager task",
        state: "attention",
      },
      { label: "Corrective action", value: "CA-0219 — flush moved to a low-priority task; FSW build 4.2.1", state: "done" },
      { label: "Retest status", value: "HIL retest C3-R on build 4.2.1 · scheduled, not yet run", state: "open" },
      { label: "Verification closure", value: "Open — awaiting retest evidence", state: "open" },
      {
        label: "Authorized review",
        value: "Not started — closure needs the flight software lead and the chief engineer",
        state: "open",
      },
    ],
  },
  {
    id: "TST-FSW-031",
    subsystem: "flight_software",
    category: "pending_test",
    title: "HIL retest of FSW-247 on build 4.2.1",
    summary: "Retest is scheduled before the TVAC functional sequence; its result closes ANM-0219.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "Run before the first TVAC functional test; results reviewed by the flight software lead.",
    trace: [
      { label: "Requirement", value: "FSW-247 — safe-mode transition within 2 s", state: "done" },
      { label: "Driver", value: "Corrective action CA-0219 (anomaly ANM-0219)", state: "done" },
      { label: "Test procedure", value: "TP-FSW-118 Rev C · unchanged, still applicable", state: "done" },
      { label: "Configuration to test", value: "FSW build 4.2.1 on OBC engineering model S/N 002", state: "done" },
      { label: "Regression scope", value: "Mode-manager and telemetry regression set (112 cases)", state: "open" },
      { label: "Status", value: "Scheduled · not yet run", state: "open" },
    ],
  },
  {
    id: "SAT-EPS-014",
    subsystem: "eps",
    category: "configuration_mismatch",
    title: "Battery charge evidence produced on an earlier configuration",
    summary: "Verified in June on BMS firmware 2.3.0 and PCB Rev B; both have since changed. Evidence validity: At Risk.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "Requirement reopened; evidence is not counted as verified until the delta test passes.",
    trace: [
      { label: "Subsystem", value: "Electrical Power (EPS)", state: "done" },
      {
        label: "Requirement SAT-EPS-014 (Rev 3)",
        value: "Terminate battery charging at 4.10 V ±0.015 V per cell between 0 °C and 40 °C",
        state: "done",
      },
      { label: "Verification method", value: "Test — EPS functional test across temperature", state: "done" },
      { label: "Evidence", value: "TR-EPS-114 (June) · PASS at 4.102 V per cell", state: "done" },
      {
        label: "Evidence configuration",
        value: "Requirement Rev 2 · BMS FW 2.3.0 · PCB Rev B · ICD Rev C · TP-EPS-022 Rev A",
        state: "done",
      },
      {
        label: "Changes since",
        value: "Requirement Rev 3 · BMS FW 2.4.0 · PCB Rev C · ICD Rev D · TP-EPS-022 Rev B",
        state: "attention",
      },
      { label: "Evidence validity", value: "At Risk — configuration no longer matches the baseline under review", state: "attention" },
      { label: "Engineering disposition", value: "Reverification Required (delta analysis DA-EPS-009, EPS lead)", state: "open" },
      { label: "Verification closure", value: "Reopened", state: "open" },
    ],
  },
  {
    id: "TST-EPS-022",
    subsystem: "eps",
    category: "pending_test",
    title: "Delta charge-termination test on BMS FW 2.4.0",
    summary: "Reverification of SAT-EPS-014, planned in the TVAC functional sequence.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "Included in the TVAC functional sequence and reported before the hot plateau ends.",
    trace: [
      { label: "Requirement", value: "SAT-EPS-014 Rev 3", state: "done" },
      { label: "Driver", value: "Reverification required after BMS FW 2.4.0 and PCB Rev C", state: "done" },
      { label: "Test procedure", value: "TP-EPS-022 Rev B · approved", state: "done" },
      { label: "Configuration to test", value: "Flight battery assembly with BMS FW 2.4.0 · PCB Rev C", state: "done" },
      { label: "Status", value: "Planned in TVAC functional sequence", state: "open" },
    ],
  },
  {
    id: "CFG-ADCS-007",
    subsystem: "adcs",
    category: "configuration_mismatch",
    title: "Star tracker 2 replaced; test article list not updated",
    summary: "Unit S/N 0031 swapped for S/N 0034 after a connector issue; the as-run configuration list still shows S/N 0031.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "Test article configuration list updated to Rev F before the test starts.",
    trace: [
      { label: "Subsystem", value: "ADCS", state: "done" },
      { label: "Configuration item", value: "Star tracker 2 · S/N 0031 → S/N 0034 (same part number and revision)", state: "attention" },
      { label: "Affected evidence", value: "Alignment measurement AL-ADCS-004 recorded on S/N 0031", state: "attention" },
      { label: "Similarity rationale", value: "Draft — same lot, acceptance data available for S/N 0034", state: "open" },
      { label: "Test article configuration list", value: "Update to Rev F pending", state: "open" },
      { label: "Authorized review", value: "Configuration manager and ADCS lead", state: "open" },
    ],
  },
  {
    id: "NCR-0142",
    subsystem: "avionics",
    category: "ncr",
    title: "Harness connector J12 backshell torque out of tolerance",
    summary: "Dispositioned use-as-is by engineering; Material Review Board signature pending.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "MRB signature obtained before the article enters the chamber.",
    trace: [
      { label: "Subsystem", value: "Avionics & On-board Computer", state: "done" },
      { label: "Requirement", value: "AVI-HRN-033 — connector backshell torque per harness drawing", state: "done" },
      { label: "Inspection", value: "Torque audit during integration · 0.9 N·m measured vs 1.1 N·m minimum", state: "fail" },
      { label: "NCR", value: "NCR-0142 raised", state: "attention" },
      { label: "Disposition", value: "Use-as-is proposed: vibration margin analysis AN-STR-021 shows no loosening risk", state: "done" },
      { label: "Material Review Board", value: "Signature pending (quality and avionics lead)", state: "open" },
      { label: "Closure", value: "Open", state: "open" },
    ],
  },
  {
    id: "SEC-F-031",
    subsystem: "cybersecurity",
    category: "cybersecurity_finding",
    title: "Command authentication replay window",
    summary: "Penetration test of the TT&C command path found a replay window; fix implemented in FSW 4.2.1, retest pending.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "No uplink commanding outside the test procedure until the retest passes.",
    trace: [
      { label: "Security requirement", value: "SEC-012 — reject replayed or out-of-sequence telecommands", state: "done" },
      { label: "Threat", value: "Replay of captured telecommands on the S-band uplink", state: "done" },
      { label: "Allocated control", value: "Authenticated commands with a monotonic sequence counter", state: "done" },
      { label: "Configuration", value: "FSW build 4.2.0 · ground command encoder v1.8", state: "done" },
      { label: "Verification method", value: "Penetration test PT-02 on the flat-sat", state: "done" },
      { label: "Finding", value: "SEC-F-031 (medium) — counter accepted within a 30 s window after reset", state: "fail" },
      { label: "Remediation", value: "Counter persisted across resets; FSW build 4.2.1", state: "done" },
      { label: "Retest", value: "PT-02 retest on build 4.2.1 · pending", state: "open" },
      { label: "Authorized security review", value: "Not started", state: "open" },
    ],
  },
  {
    id: "EVG-SEC-004",
    subsystem: "cybersecurity",
    category: "evidence_gap",
    title: "SBOM not regenerated for FSW build 4.2.1",
    summary: "The software bill of materials on file describes build 4.2.0.",
    from: "TRR",
    level: "conditional",
    escalates: "SAR",
    condition: "SBOM for build 4.2.1 issued before the build is declared the flight candidate.",
    trace: [
      { label: "Requirement", value: "SEC-021 — maintain a software bill of materials for every flight build", state: "done" },
      { label: "Evidence on file", value: "SBOM for FSW build 4.2.0", state: "attention" },
      { label: "Current configuration", value: "FSW build 4.2.1", state: "attention" },
      { label: "Gap", value: "No SBOM or composition analysis for the current build", state: "open" },
    ],
  },
  {
    id: "EVG-THM-002",
    subsystem: "thermal",
    category: "evidence_gap",
    title: "Thermal model correlation report",
    summary: "Model correlation against system TVAC results is needed before acceptance.",
    from: "SAR",
    level: "blocking",
    trace: [
      { label: "Requirement", value: "THM-001 — thermal design maintains all units within limits with 5 °C margin", state: "done" },
      { label: "Verification method", value: "Analysis, correlated by test", state: "done" },
      { label: "Prerequisite", value: "System TVAC results (this campaign)", state: "open" },
      { label: "Evidence", value: "Correlation report — not yet produced", state: "open" },
    ],
  },
  {
    id: "WVR-007",
    subsystem: "thermal",
    category: "waiver",
    title: "Radiator coating emissivity below specification",
    summary: "Measured 0.86 against 0.88 required; accepted at CDR with analysis. Customer acceptance pending.",
    from: "SAR",
    level: "conditional",
    escalates: "FRR",
    trace: [
      { label: "Requirement", value: "THM-014 — radiator emissivity ≥ 0.88", state: "done" },
      { label: "Inspection", value: "Emissivity measured 0.86 on coating batch B-3", state: "fail" },
      { label: "Waiver", value: "WVR-007 · analysis shows margin retained with 0.86", state: "done" },
      { label: "Internal approval", value: "Approved at CDR by the chief engineer", state: "done" },
      { label: "Customer acceptance", value: "Pending", state: "open" },
    ],
  },
  {
    id: "EVG-PL-011",
    subsystem: "payload",
    category: "evidence_gap",
    title: "Imager MTF evidence from engineering model only",
    summary: "Modulation transfer function results exist for the engineering model; flight-model data is pending.",
    from: "SAR",
    level: "blocking",
    trace: [
      { label: "Requirement", value: "PL-006 — system MTF ≥ 0.12 at Nyquist", state: "done" },
      { label: "Evidence on file", value: "MTF test on engineering model EM-1", state: "attention" },
      { label: "Applicability", value: "Engineering model optics differ from flight model in focal-plane mount", state: "attention" },
      { label: "Flight-model test", value: "Planned after TVAC", state: "open" },
    ],
  },
  {
    id: "TST-COM-009",
    subsystem: "communications",
    category: "pending_test",
    title: "End-to-end RF compatibility with the ground station",
    summary: "Not yet performed with the operational ground station.",
    from: "ORR",
    level: "blocking",
    trace: [
      { label: "Requirement", value: "COM-002 — TT&C link compatible with the operational ground network", state: "done" },
      { label: "Verification method", value: "Test — end-to-end RF compatibility", state: "done" },
      { label: "Status", value: "Scheduled after shipment to the launch site", state: "open" },
    ],
  },
  {
    id: "TST-SEC-012",
    subsystem: "cybersecurity",
    category: "pending_test",
    title: "Ground segment penetration test",
    summary: "Mission control and ground station interfaces not yet tested.",
    from: "ORR",
    level: "blocking",
    trace: [
      { label: "Security requirement", value: "SEC-030 — ground segment hardened per the mission security plan", state: "done" },
      { label: "Verification method", value: "Penetration test of mission control and station interfaces", state: "done" },
      { label: "Status", value: "Not yet performed", state: "open" },
    ],
  },
  {
    id: "EVG-STR-005",
    subsystem: "structure",
    category: "evidence_gap",
    title: "Launch adapter fit check",
    summary: "Mechanical fit check with the launch-vehicle adapter is planned at the launch site.",
    from: "FRR",
    level: "blocking",
    trace: [
      { label: "Requirement", value: "STR-040 — interface to the launch adapter per the launch-vehicle ICD", state: "done" },
      { label: "Verification method", value: "Inspection and fit check", state: "done" },
      { label: "Status", value: "Planned at the launch site", state: "open" },
    ],
  },
  {
    id: "EVG-COM-014",
    subsystem: "communications",
    category: "evidence_gap",
    title: "Frequency authorisation evidence not linked",
    summary: "Spectrum and operating authorisation records are not yet linked to the mission readiness package.",
    from: "MRR",
    level: "blocking",
    trace: [
      { label: "Requirement", value: "MIS-009 — operate only under valid frequency and operating authorisations", state: "done" },
      { label: "Evidence", value: "Authorisation records held by the programme office, not yet linked", state: "open" },
    ],
  },
];

/* --------------------------------------------------- Gate evaluation */

export type GateRecord = { decision: string; note: string };

/** Gates already held in this fictitious programme (historical record). */
export const COMPLETED_GATES: Partial<Record<GateCode, GateRecord>> = {
  MCR: { decision: "GO", note: "Mission need and optical EO concept agreed." },
  SRR: { decision: "GO", note: "System requirements baselined; 14 TBDs assigned owners." },
  SDR: { decision: "GO", note: "Architecture and allocation accepted; power margin action closed." },
  PDR: { decision: "GO", note: "Six actions raised; all closed." },
  CDR: { decision: "GO WITH CONDITIONS", note: "Waiver WVR-007 (radiator emissivity) approved and carried forward." },
  SIR: { decision: "GO", note: "Two NCRs on incoming harnesses closed before integration." },
};

export type ReadinessLevel = "READY" | "CONDITIONAL" | "NOT READY";
export type Overall = "GO" | "GO WITH CONDITIONS" | "NOT READY";

const gateIndex = (g: GateCode) => GATE_CODES.indexOf(g);

export function gateMode(g: GateCode): "completed" | "current" | "forecast" {
  if (COMPLETED_GATES[g]) return "completed";
  return gateIndex(g) === gateIndex(DEMO_PROGRAMME.currentGate) ? "current" : "forecast";
}

/** How an open item affects a gate: not at all, as a condition, or as a blocker. */
export function issueEffect(issue: Issue, gate: GateCode): "none" | "conditional" | "blocking" {
  const gi = gateIndex(gate);
  if (gi < gateIndex(issue.from)) return "none";
  if (issue.level === "blocking") return "blocking";
  if (issue.escalates && gi >= gateIndex(issue.escalates)) return "blocking";
  return "conditional";
}

export function issuesForGate(gate: GateCode) {
  return ISSUES.map((i) => ({ issue: i, effect: issueEffect(i, gate) })).filter((x) => x.effect !== "none");
}

export function subsystemReadiness(key: SubsystemKey, gate: GateCode): ReadinessLevel {
  const effects = issuesForGate(gate).filter((x) => x.issue.subsystem === key).map((x) => x.effect);
  if (effects.includes("blocking")) return "NOT READY";
  if (effects.includes("conditional")) return "CONDITIONAL";
  return "READY";
}

export function overallReadiness(gate: GateCode): Overall {
  const levels = SUBSYSTEMS.map((s) => subsystemReadiness(s.key, gate));
  if (levels.includes("NOT READY")) return "NOT READY";
  if (levels.includes("CONDITIONAL")) return "GO WITH CONDITIONS";
  return "GO";
}

export function gateMetrics(gate: GateCode) {
  const open = issuesForGate(gate).map((x) => x.issue);
  const count = (c: TraceCategory) => open.filter((i) => i.category === c).length;
  const verified = SUBSYSTEMS.reduce((n, s) => n + s.requirements.verified, 0);
  const total = SUBSYSTEMS.reduce((n, s) => n + s.requirements.total, 0);
  return {
    verified,
    total,
    evidenceGaps: count("evidence_gap"),
    openNcrs: count("ncr"),
    configMismatches: count("configuration_mismatch"),
    pendingTests: count("pending_test"),
    cyberFindings: count("cybersecurity_finding"),
    criticalAnomalies: open.filter((i) => i.category === "anomaly" && i.critical).length,
    openAnomalies: count("anomaly"),
    waivers: count("waiver"),
  };
}

/* ------------------------------------------- Evidence validity scenario */

export type ValidityStage = {
  step: ValidityStep;
  /** Large state label used by the validity sequence. */
  headline: "VERIFIED" | "CONFIGURATION CHANGED" | "EVIDENCE AT RISK" | "REVERIFICATION REQUIRED" | "CURRENT AGAIN";
  tone: "ok" | "change" | "risk" | "action";
  title: string;
  state: "Current" | "Change detected" | "At Risk" | "Reverification Required" | "Current — reverified";
  body: string;
  who: string;
  config: { requirement: string; firmware: string; board: string; icd: string; procedure: string };
};

const BASE = { requirement: "Rev 2", firmware: "BMS FW 2.3.0", board: "PCB Rev B", icd: "ICD Rev C", procedure: "TP-EPS-022 Rev A" };
const NOW = { requirement: "Rev 3", firmware: "BMS FW 2.4.0", board: "PCB Rev C", icd: "ICD Rev D", procedure: "TP-EPS-022 Rev B" };

export const VALIDITY_STAGES: ValidityStage[] = [
  {
    step: "verified",
    headline: "VERIFIED",
    tone: "ok",
    title: "June: requirement verified",
    state: "Current",
    body: "TR-EPS-114 passes at 4.102 V per cell. The evidence and the baseline under review are the same configuration.",
    who: "Closed by the EPS lead; approved at the June verification board.",
    config: BASE,
  },
  {
    step: "change",
    headline: "CONFIGURATION CHANGED",
    tone: "change",
    title: "Configuration changes",
    state: "Change detected",
    body: "The battery management firmware moves to 2.4.0, the board to Rev C, the EPS–OBC interface to Rev D, the test procedure to Rev B, and the requirement tolerance is tightened in Rev 3.",
    who: "Each change was approved through normal change control.",
    config: NOW,
  },
  {
    step: "at_risk",
    headline: "EVIDENCE AT RISK",
    tone: "risk",
    title: "Evidence validity: At Risk",
    state: "At Risk",
    body: "The June evidence was produced on a configuration that no longer matches the baseline. AEAIP flags it; it does not delete or silently keep it.",
    who: "Flagged automatically (concept). No human decision yet.",
    config: NOW,
  },
  {
    step: "reverify",
    headline: "REVERIFICATION REQUIRED",
    tone: "action",
    title: "Engineering disposition: Reverification Required",
    state: "Reverification Required",
    body: "Delta analysis shows the charge-termination logic changed in firmware 2.4.0, so the result cannot be retained by rationale. The requirement is reopened and a retest is planned.",
    who: "Decided by the EPS lead, recorded with analysis DA-EPS-009.",
    config: NOW,
  },
  {
    step: "reverified",
    headline: "CURRENT AGAIN",
    tone: "ok",
    title: "Retest on the current configuration",
    state: "Current — reverified",
    body: "TP-EPS-022 Rev B passes at 4.098 V per cell on BMS FW 2.4.0 and PCB Rev C. The June evidence is marked superseded and kept for history.",
    who: "Proposed for closure by the EPS lead; approval by the verification board.",
    config: NOW,
  },
];
