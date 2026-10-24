/**
 * Verification method taxonomy used on /aerosystems/aeaip/verification-validation.
 * Original GAMYAA explanations. Methods are selected per requirement, programme and
 * applicable framework; not every method applies to every programme.
 */
export type Method = { name: string; body: string; example?: string };
export type MethodFamily = { id: string; title: string; summary: string; methods: Method[] };

export const METHOD_FAMILIES: MethodFamily[] = [
  {
    id: "classical",
    title: "Classical verification",
    summary:
      "The four methods most aerospace verification matrices start from. Each requirement is assigned one or more of them.",
    methods: [
      {
        name: "Inspection",
        body: "Visual or dimensional examination of the product, or of its drawings and records, to confirm a physical feature, marking or documented attribute.",
        example: "Confirming connector keying and labelling on a harness.",
      },
      {
        name: "Analysis",
        body: "Calculation, modelling or simulation that shows a requirement is met, used when testing is impractical or as a complement to test.",
        example: "Structural margin analysis of a bracket under launch loads.",
      },
      {
        name: "Demonstration",
        body: "Operating the product to show that it performs a function, with little or no quantitative data collected.",
        example: "Showing that a deployment mechanism releases on command.",
      },
      {
        name: "Test",
        body: "Operating the product under controlled conditions and measuring its response against defined pass/fail criteria. The most resource-intensive method.",
        example: "Measuring battery charge regulation across temperature.",
      },
    ],
  },
  {
    id: "extended",
    title: "Extended aerospace assurance",
    summary:
      "Methods and evidence classes that sit around the classical four in spacecraft and aircraft programmes.",
    methods: [
      {
        name: "Qualification",
        body: "Proves that the design meets its requirements with margin, typically by testing a qualification unit at levels beyond the expected environment. Done once per design.",
        example: "Random vibration at qualification levels on a qualification model.",
      },
      {
        name: "Acceptance",
        body: "Shows that each flight unit is built correctly and free of workmanship defects, typically at levels equal to the expected environment. Done on every unit.",
        example: "Acceptance thermal cycling of each flight battery.",
      },
      {
        name: "Similarity / heritage",
        body: "Reuses evidence from an identical or closely similar item, with a documented comparison of design, configuration, environment and application.",
        example: "Claiming qualification of a reaction wheel flown on a previous mission.",
      },
      {
        name: "Review of design",
        body: "Verification by reviewing approved design documentation, drawings or records against the requirement. ECSS treats this as a formal method.",
        example: "Confirming an interface definition against the ICD.",
      },
      {
        name: "Certification / compliance evidence",
        body: "Evidence assembled to show compliance with a certification basis or regulatory requirement, for review by the responsible authority.",
        example: "Compliance records submitted for an airworthiness approval.",
      },
      {
        name: "Independent review / assessment",
        body: "Assessment by people or organisations independent of the developer, such as independent verification and validation (IV&V) of software.",
        example: "IV&V of fault-management flight software.",
      },
    ],
  },
  {
    id: "digital",
    title: "Model-based and digital verification",
    summary:
      "Verification that relies on models and simulation. Its evidence is only as good as the model's own validation and configuration.",
    methods: [
      {
        name: "MBSE-supported verification",
        body: "Requirements, architecture and verification relationships held in a system model, so coverage and impact can be queried rather than compiled by hand.",
      },
      {
        name: "Physics-based simulation",
        body: "Thermal, structural, orbital, power or RF models that predict behaviour. Typically correlated against test results before being relied on.",
      },
      {
        name: "Monte Carlo / uncertainty analysis",
        body: "Running a model many times with varied inputs to estimate the probability of meeting a requirement, not only the nominal case.",
      },
      {
        name: "Model-in-the-loop (MIL)",
        body: "Control or software design models executed against simulated plant models before code exists.",
      },
      {
        name: "Software-in-the-loop (SIL)",
        body: "Compiled flight software executed on a host computer against simulated hardware and environment.",
      },
      {
        name: "Processor-in-the-loop (PIL)",
        body: "Flight software running on the target processor, or a representative one, with simulated surroundings.",
      },
      {
        name: "Hardware-in-the-loop (HIL)",
        body: "Real flight or engineering-model hardware connected to simulated sensors, actuators and dynamics, so closed-loop behaviour can be tested on the bench.",
      },
      {
        name: "Digital twins",
        body: "A model maintained alongside a specific physical system and updated with its data. In AEAIP a digital twin is an evidence source, not a separate platform.",
      },
      {
        name: "Scenario-based verification",
        body: "Verifying behaviour across defined operational scenarios, such as safe-mode entry or eclipse transitions, rather than single requirements in isolation.",
      },
      {
        name: "Automated regression",
        body: "Re-running a defined test set automatically after each change, so previously verified behaviour is re-confirmed.",
      },
    ],
  },
  {
    id: "software",
    title: "Software assurance",
    summary: "Evidence that software meets its requirements and was built from a known, reproducible configuration.",
    methods: [
      { name: "Requirements-based testing", body: "Test cases derived from, and traced to, software requirements." },
      { name: "Unit verification", body: "Verification of individual software units in isolation." },
      { name: "Integration verification", body: "Verification of interfaces and interactions between software components." },
      { name: "System verification", body: "Verification of the integrated software on representative hardware." },
      { name: "Static analysis", body: "Analysis of source code without executing it, for defects, rule violations and vulnerabilities." },
      { name: "Dynamic analysis", body: "Analysis of software behaviour while it executes, such as timing, memory and resource use." },
      {
        name: "Coverage evidence",
        body: "Measured statement, branch or condition coverage, at the level the applicable software standard requires.",
      },
      {
        name: "Formal methods (where justified)",
        body: "Mathematical proof of selected properties, typically reserved for the most critical logic.",
      },
      {
        name: "Configuration reproducibility",
        body: "Evidence that the verified binary can be rebuilt exactly from controlled source, tools and settings.",
      },
      {
        name: "CI/CD evidence (where controlled)",
        body: "Automated build and test records, usable as evidence only when the pipeline itself is under configuration control.",
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity assurance",
    summary: "Security verification treated like any other verification: requirements, methods, findings, remediation and retest.",
    methods: [
      { name: "Threat modelling", body: "Systematic identification of threats, attack paths and the assets they target." },
      { name: "Security requirement verification", body: "Verifying that each security requirement is implemented and effective." },
      { name: "Secure-design review", body: "Review of architecture and design against security principles and the threat model." },
      { name: "Static application security testing", body: "Source or binary analysis for security weaknesses, where applicable." },
      { name: "Dynamic application security testing", body: "Testing running software or services for exploitable weaknesses, where applicable." },
      { name: "Software composition analysis", body: "Identifying third-party components and their known vulnerabilities." },
      { name: "SBOM / software provenance", body: "A software bill of materials and the origin of each component for a given build." },
      { name: "Fuzzing", body: "Feeding malformed or unexpected inputs, for example to command parsers, to find failures." },
      { name: "Penetration testing", body: "Authorised attempts to exploit the system as an attacker would." },
      { name: "Configuration verification", body: "Checking that security-relevant settings match the approved configuration." },
      { name: "Firmware integrity", body: "Evidence that the firmware loaded is the firmware that was approved." },
      { name: "Secure boot evidence", body: "Evidence that only authenticated software can start on the processor." },
      { name: "Communications-security evidence", body: "Evidence for authentication and encryption of command and telemetry links." },
      { name: "Supply-chain security evidence", body: "Evidence about the origin and handling of hardware and software components." },
      { name: "Retest after remediation", body: "Re-verification that a finding is fixed and nothing else was broken." },
    ],
  },
  {
    id: "operational",
    title: "Operational evidence",
    summary: "Evidence produced after launch. It can confirm, refine or challenge what was predicted and tested.",
    methods: [
      { name: "Telemetry", body: "Measured spacecraft data downlinked during operations." },
      { name: "Health monitoring", body: "Trending of telemetry against limits to detect degradation." },
      { name: "Anomaly evidence", body: "Records of in-flight anomalies, their investigation and resolution." },
      { name: "Actual mission performance", body: "Measured performance against mission requirements and success criteria." },
      { name: "Field / flight behaviour", body: "Observed behaviour across the fleet or mission life, fed back into future designs." },
    ],
  },
];
