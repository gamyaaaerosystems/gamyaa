/**
 * Services are grouped into four families. They exist to help teams adopt GAMYAA
 * platforms and assurance practices; the platforms remain the company's core.
 */
export const SERVICE_FAMILIES = [
  {
    title: "Engineering Assurance Advisory",
    body: "An assessment of how requirements, configuration, verification evidence and review readiness are managed today, and a practical path to traceable, decision-ready assurance.",
    items: [
      "Requirements traceability from customer and airworthiness requirements to verification evidence",
      "Verification and review-readiness assessment",
      "AI in engineering workflows, with human verification, provenance and controls designed in",
    ],
    platform: { label: "AEAIP™", href: "/aeaip" },
  },
  {
    title: "Manufacturing / FAI Digitalisation",
    body: "Moving First Article Inspection, inspection and quality records from spreadsheets and paper to characteristic-level digital evidence.",
    items: [
      "Inspection, FAI and quality-evidence practice review against aerospace and defence customer expectations",
      "FAI digitalisation aligned with AS9102 Forms 1, 2 and 3",
      "Inspection workflow automation: characteristics, methods, gauges and measurement capture",
      "Nonconformance, review and approval workflows with clear ownership and audit trails",
    ],
    platform: { label: "DAQIP™", href: "/daqip" },
  },
  {
    title: "Certification & Evidence Engineering",
    body: "Structuring certification plans, compliance matrices and engineering evidence for review by your engineers and the certification authority.",
    items: [
      "Certification plan and compliance matrix structuring",
      "Means of compliance and verification planning support",
      "Evidence completeness review ahead of authority reviews",
    ],
    platform: { label: "AirCert AI™", href: "/aircert-ai" },
  },
  {
    title: "Engineering Cybersecurity / Integration",
    body: "Security for engineering data and connected aerospace systems, and planning how engineering tools become trusted evidence sources.",
    items: [
      "Access control, audit trails and evidence integrity for sensitive engineering data",
      "Security for connected, embedded and digital engineering environments",
      "Integration planning for requirements, PLM, test and quality systems as evidence sources",
    ],
    platform: { label: "AEAIP™ cybersecurity assurance", href: "/aeaip/cybersecurity-assurance" },
  },
] as const;
