import type { SubsystemKey } from "@/lib/analytics";

/**
 * Generic satellite subsystems with representative requirements and evidence, used
 * by the Satellites & Spacecraft page (explorer and table). Representative only:
 * actual content depends on the mission, design and programme standards.
 */
export type SpacecraftArea = {
  key: string;
  name: string;
  /** Matching part of the 3D model, if it has one. */
  view: SubsystemKey | null;
  requirements: string;
  evidence: string[];
};

export const SPACECRAFT_AREAS: SpacecraftArea[] = [
  {
    key: "mission",
    name: "Mission",
    view: null,
    requirements: "Objectives, coverage, revisit, lifetime, orbit and disposal",
    evidence: ["Mission analysis", "Concept of operations", "End-to-end mission simulation"],
  },
  {
    key: "payload",
    name: "Payload",
    view: "payload",
    requirements: "Imaging resolution, MTF, signal-to-noise, data volume",
    evidence: ["Optical and radiometric tests", "Calibration", "MTF measurement on the flight model"],
  },
  {
    key: "eps",
    name: "Electrical power (EPS)",
    view: "eps",
    requirements: "Power generation, energy balance, battery charge control, bus regulation",
    evidence: ["Power budget analysis", "Solar-array illumination tests", "Battery and charge-regulation tests"],
  },
  {
    key: "adcs",
    name: "ADCS / GNC",
    view: "adcs",
    requirements: "Pointing accuracy, stability, slew rates, safe-mode behaviour",
    evidence: ["Simulation and Monte Carlo analysis", "Sensor polarity and phasing tests", "HIL closed-loop tests"],
  },
  {
    key: "avionics",
    name: "Avionics / on-board computer",
    view: "avionics",
    requirements: "Processing, memory, data handling, radiation tolerance, interfaces",
    evidence: ["Functional and interface tests", "Radiation analysis", "EMC tests", "Worst-case timing"],
  },
  {
    key: "flight_software",
    name: "Flight software",
    view: "flight_software",
    requirements: "Modes, fault detection and recovery, commanding, telemetry",
    evidence: ["Requirements-based tests", "SIL / HIL campaigns", "Regression and coverage", "Code analysis"],
  },
  {
    key: "communications",
    name: "Communications",
    view: "communications",
    requirements: "Link margins, frequency plan, data rates, ground compatibility",
    evidence: ["Link-budget analysis", "RF tests", "End-to-end RF compatibility with ground stations"],
  },
  {
    key: "thermal",
    name: "Thermal",
    view: "thermal",
    requirements: "Unit temperature limits with margin in all modes",
    evidence: ["Thermal analysis", "Thermal balance and thermal-vacuum tests", "Model correlation"],
  },
  {
    key: "structure",
    name: "Structures & mechanisms",
    view: "structure",
    requirements: "Strength, stiffness, natural frequencies, deployments",
    evidence: ["Structural analysis", "Sine and random vibration", "Shock", "Deployment tests"],
  },
  {
    key: "propulsion",
    name: "Propulsion (where applicable)",
    view: null,
    requirements: "Thrust, impulse, leak tightness, contamination",
    evidence: ["Proof and leak tests", "Hot-fire or flow tests", "Cleanliness verification"],
  },
  {
    key: "cybersecurity",
    name: "Cybersecurity",
    view: "cybersecurity",
    requirements: "Command authentication, secure boot, software provenance",
    evidence: ["Threat model", "Secure-design review", "Penetration test and retest", "SBOM per build"],
  },
  {
    key: "ground",
    name: "Ground segment",
    view: null,
    requirements: "Command and control, scheduling, data reception and security",
    evidence: ["Ground system verification", "End-to-end tests", "Operations rehearsals", "Security assessments"],
  },
];
