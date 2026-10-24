/**
 * Engineering sources cited on AEAIP pages.
 *
 * Rules: primary/official sources only; title and revision as published; the note
 * says what we used the source for. We paraphrase and link — we never reproduce
 * standard text, tables or clauses. Links were checked on 24 October 2026.
 * Paid standards are linked to their publisher's catalogue page.
 */
export type Reference = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  note: string;
};

export const REFERENCES = {
  "nasa-seh": {
    id: "nasa-seh",
    title: "NASA Systems Engineering Handbook, NASA/SP-2016-6105 Rev 2",
    publisher: "NASA",
    url: "https://ntrs.nasa.gov/citations/20170001761",
    note: "Life-cycle phases, technical reviews and the systems-engineering process model.",
  },
  "nasa-seh-verification": {
    id: "nasa-seh-verification",
    title: "NASA Systems Engineering Handbook — 5.3 Product Verification",
    publisher: "NASA",
    url: "https://www.nasa.gov/reference/5-3-product-verification/",
    note: "Verification methods, qualification, acceptance and recording the product and requirement versions verified.",
  },
  "nasa-seh-validation": {
    id: "nasa-seh-validation",
    title: "NASA Systems Engineering Handbook — 5.4 Product Validation",
    publisher: "NASA",
    url: "https://www.nasa.gov/reference/5-4-product-validation/",
    note: "Validation against stakeholder expectations in the intended environment.",
  },
  "nasa-seh-phase-d": {
    id: "nasa-seh-phase-d",
    title: "NASA Systems Engineering Handbook — 3.7 Project Phase D: System Assembly, Integration and Test, Launch",
    publisher: "NASA",
    url: "https://www.nasa.gov/reference/3-7-project-phase-d-system-assembly-integration-and-test-launch/",
    note: "Integration and test reviews (TRR, SAR, ORR) and preparation for flight or mission readiness.",
  },
  "nasa-seh-cm": {
    id: "nasa-seh-cm",
    title: "NASA Systems Engineering Handbook — 6.5 Configuration Management",
    publisher: "NASA",
    url: "https://www.nasa.gov/reference/6-5-configuration-management/",
    note: "Baselines, change control, status accounting and configuration audits.",
  },
  "nasa-seh-assessment": {
    id: "nasa-seh-assessment",
    title: "NASA Systems Engineering Handbook — 6.7 Technical Assessment",
    publisher: "NASA",
    url: "https://www.nasa.gov/reference/6-7-technical-assessment/",
    note: "How technical reviews assess progress and readiness.",
  },
  "npr-7123": {
    id: "npr-7123",
    title: "NPR 7123.1D, NASA Systems Engineering Processes and Requirements",
    publisher: "NASA Office of the Chief Engineer",
    url: "https://nodis3.gsfc.nasa.gov/displayDir.cfm?t=NPR&c=7123&s=1D",
    note: "NASA's life-cycle and technical review entrance and success criteria (for NASA programmes).",
  },
  "npr-7150": {
    id: "npr-7150",
    title: "NPR 7150.2D, NASA Software Engineering Requirements",
    publisher: "NASA Office of the Chief Engineer",
    url: "https://nodis3.gsfc.nasa.gov/displayDir.cfm?t=NPR&c=7150&s=2D",
    note: "Software engineering requirements, including software verification and validation.",
  },
  "nasa-std-8739-8": {
    id: "nasa-std-8739-8",
    title: "NASA-STD-8739.8B, Software Assurance and Software Safety Standard",
    publisher: "NASA",
    url: "https://standards.nasa.gov/standard/NASA/NASA-STD-87398",
    note: "Software assurance, software safety and IV&V.",
  },
  swehb: {
    id: "swehb",
    title: "NASA Software Engineering Handbook (NASA-HDBK-2203)",
    publisher: "NASA",
    url: "https://swehb.nasa.gov/",
    note: "Practical guidance for NPR 7150.2 and NASA-STD-8739.8.",
  },
  gevs: {
    id: "gevs",
    title: "GSFC-STD-7000B, General Environmental Verification Standard (GEVS)",
    publisher: "NASA Goddard Space Flight Center",
    url: "https://standards.nasa.gov/standard/GSFC/GSFC-STD-7000",
    note: "Environmental verification programmes and test levels for GSFC payloads, subsystems and components.",
  },
  "ecss-verification": {
    id: "ecss-verification",
    title: "ECSS-E-ST-10-02C Rev.1, Space engineering — Verification",
    publisher: "European Cooperation for Space Standardization",
    url: "https://ecss.nl/standard/ecss-e-st-10-02c-rev-1-verification-1-february-2018/",
    note: "Verification methods (test, analysis, review-of-design, inspection), levels and stages.",
  },
  "ecss-testing": {
    id: "ecss-testing",
    title: "ECSS-E-ST-10-03C, Space engineering — Testing",
    publisher: "European Cooperation for Space Standardization",
    url: "https://ecss.nl/wp-content/uploads/standards/ecss-e/ECSS-E-ST-10-03C1June2012.pdf",
    note: "Verification by testing of space segment elements and equipment before launch.",
  },
  "ecss-project": {
    id: "ecss-project",
    title: "ECSS-M-ST-10C Rev.1, Space project management — Project planning and implementation",
    publisher: "European Cooperation for Space Standardization",
    url: "https://ecss.nl/standard/ecss-m-st-10c-rev-1-project-planning-and-implementation/",
    note: "ECSS project phasing and its own set of project reviews.",
  },
  "ecss-cm": {
    id: "ecss-cm",
    title: "ECSS-M-ST-40C Rev.1, Space project management — Configuration and information management",
    publisher: "European Cooperation for Space Standardization",
    url: "https://ecss.nl/standard/ecss-m-st-40c-rev-1-configuration-and-information-management/",
    note: "Configuration and information management for space projects.",
  },
  "ecss-software": {
    id: "ecss-software",
    title: "ECSS-E-ST-40C Rev.1, Space engineering — Software",
    publisher: "European Cooperation for Space Standardization",
    url: "https://ecss.nl/standard/ecss-e-st-40c-rev-1-software-30-april-2025",
    note: "Space software engineering processes, including verification and validation.",
  },
  "ecss-swpa": {
    id: "ecss-swpa",
    title: "ECSS-Q-ST-80C Rev.2, Space product assurance — Software product assurance",
    publisher: "European Cooperation for Space Standardization",
    url: "https://ecss.nl/standard/ecss-q-st-80c-rev-2-software-product-assurance-30-april-2025/",
    note: "Software product assurance for space projects.",
  },
  "iso-15288": {
    id: "iso-15288",
    title: "ISO/IEC/IEEE 15288:2023, Systems and software engineering — System life cycle processes",
    publisher: "ISO / IEC / IEEE",
    url: "https://www.iso.org/standard/81702.html",
    note: "Life-cycle process descriptions, including verification and validation processes.",
  },
  "iso-29148": {
    id: "iso-29148",
    title: "ISO/IEC/IEEE 29148:2018, Systems and software engineering — Requirements engineering",
    publisher: "ISO / IEC / IEEE",
    url: "https://www.iso.org/standard/72089.html",
    note: "Characteristics of well-formed requirements and requirements information items.",
  },
  "iso-10007": {
    id: "iso-10007",
    title: "ISO 10007:2017, Quality management — Guidelines for configuration management",
    publisher: "ISO (TC 176)",
    url: "https://committee.iso.org/sites/tc176/home/projects/published/iso-10007-2017.html",
    note: "Configuration management planning, identification, change control, status accounting and audit.",
  },
  "incose-handbook": {
    id: "incose-handbook",
    title: "INCOSE Systems Engineering Handbook, 5th Edition (INCOSE-TP-2003-002-05, 2023)",
    publisher: "INCOSE / Wiley",
    url: "https://www.oreilly.com/library/view/-/9781119814290/",
    note: "Systems-engineering practice aligned with ISO/IEC/IEEE 15288:2023.",
  },
  "sebok-verification": {
    id: "sebok-verification",
    title: "SEBoK — System Verification",
    publisher: "Systems Engineering Body of Knowledge (INCOSE, IEEE SMC, SERC)",
    url: "https://sebokwiki.org/wiki/System_Verification",
    note: "Open reference on verification concepts and methods.",
  },
  "sebok-validation": {
    id: "sebok-validation",
    title: "SEBoK — System Validation",
    publisher: "Systems Engineering Body of Knowledge (INCOSE, IEEE SMC, SERC)",
    url: "https://sebokwiki.org/wiki/System_Validation",
    note: "Open reference on validation concepts.",
  },
  "eia-649": {
    id: "eia-649",
    title: "SAE EIA-649C, Configuration Management Standard",
    publisher: "SAE International",
    url: "https://www.sae.org/standards/eia649c-configuration-management-standard/",
    note: "Configuration management functions and principles.",
  },
  as9100: {
    id: "as9100",
    title: "AS9100D, Quality Management Systems — Requirements for Aviation, Space and Defense Organizations",
    publisher: "SAE International / IAQG",
    url: "https://www.sae.org/standards/as9100d-quality-management-systems-requirements-aviation-space-defense-organizations/",
    note: "The aerospace quality management system standard.",
  },
  as9102: {
    id: "as9102",
    title: "AS9102C, Aerospace Series — First Article Inspection Requirements",
    publisher: "SAE International / IAQG",
    url: "https://www.sae.org/standards/as9102c-aerospace-series-first-article-inspection-requirements/",
    note: "First Article Inspection requirements and FAI Report structure.",
  },
  arp4754b: {
    id: "arp4754b",
    title: "SAE ARP4754B, Guidelines for Development of Civil Aircraft and Systems",
    publisher: "SAE International",
    url: "https://saemobilus.sae.org/content/arp4754b",
    note: "Aircraft and system development assurance (civil aviation context).",
  },
  arp4761a: {
    id: "arp4761a",
    title: "SAE ARP4761A, Guidelines for Conducting the Safety Assessment Process on Civil Aircraft, Systems, and Equipment",
    publisher: "SAE International",
    url: "https://www.sae.org/standards/content/arp4761a/",
    note: "Safety assessment processes (FHA, PSSA, SSA) in civil aviation.",
  },
  "nist-csf": {
    id: "nist-csf",
    title: "NIST Cybersecurity Framework (CSF) 2.0",
    publisher: "National Institute of Standards and Technology",
    url: "https://www.nist.gov/cyberframework",
    note: "Outcome-based cybersecurity risk management framework.",
  },
  "nist-ir-8270": {
    id: "nist-ir-8270",
    title: "NIST IR 8270, Introduction to Cybersecurity for Commercial Satellite Operations",
    publisher: "National Institute of Standards and Technology",
    url: "https://csrc.nist.gov/pubs/ir/8270/final",
    note: "Applying the CSF to commercial space vehicles and payloads.",
  },
  "nist-ir-8401": {
    id: "nist-ir-8401",
    title: "NIST IR 8401, Satellite Ground Segment: Applying the Cybersecurity Framework to Satellite Command and Control",
    publisher: "National Institute of Standards and Technology",
    url: "https://csrc.nist.gov/pubs/ir/8401/final",
    note: "A CSF profile for the satellite ground segment.",
  },
  "nist-ssdf": {
    id: "nist-ssdf",
    title: "NIST SP 800-218, Secure Software Development Framework (SSDF)",
    publisher: "National Institute of Standards and Technology",
    url: "https://csrc.nist.gov/pubs/sp/800/218/final",
    note: "Secure software development practices.",
  },
  "nist-800-160": {
    id: "nist-800-160",
    title: "NIST SP 800-160 Vol. 1 Rev. 1, Engineering Trustworthy Secure Systems",
    publisher: "National Institute of Standards and Technology",
    url: "https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final",
    note: "Systems security engineering integrated with ISO/IEC/IEEE 15288 life-cycle processes.",
  },
  "ntia-sbom": {
    id: "ntia-sbom",
    title: "The Minimum Elements for a Software Bill of Materials (SBOM), 2021",
    publisher: "U.S. National Telecommunications and Information Administration",
    url: "https://www.ntia.gov/report/2021/minimum-elements-software-bill-materials-sbom",
    note: "Baseline SBOM data fields (CISA maintains later guidance).",
  },
  "cisa-sbom": {
    id: "cisa-sbom",
    title: "Software Bill of Materials (SBOM)",
    publisher: "U.S. Cybersecurity and Infrastructure Security Agency",
    url: "https://www.cisa.gov/sbom",
    note: "Current SBOM guidance and resources.",
  },
  "spd-5": {
    id: "spd-5",
    title: "Space Policy Directive-5, Cybersecurity Principles for Space Systems (2020)",
    publisher: "The White House (archived)",
    url: "https://trumpwhitehouse.archives.gov/presidential-actions/memorandum-space-policy-directive-5-cybersecurity-principles-space-systems/",
    note: "Principles for building cybersecurity into space systems from design onward.",
  },
  "in-space": {
    id: "in-space",
    title: "IN-SPACe — Indian National Space Promotion and Authorization Centre",
    publisher: "Department of Space, Government of India",
    url: "https://www.inspace.gov.in/",
    note: "Authorisation and promotion of non-government space activities in India.",
  },
  "indian-space-policy": {
    id: "indian-space-policy",
    title: "Indian Space Policy 2023",
    publisher: "Indian Space Research Organisation (ISRO)",
    url: "https://www.isro.gov.in/media_isro/pdf/IndianSpacePolicy2023.pdf",
    note: "Roles of ISRO, IN-SPACe and non-government entities in the Indian space sector.",
  },
  "pib-space-economy": {
    id: "pib-space-economy",
    title: "Parliament Question: Strategies to expand India's share in the global space economy (24 July 2025)",
    publisher: "Press Information Bureau, Department of Space, Government of India",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2147733",
    note: "States the IN-SPACe Decadal Vision target of a USD 44 billion Indian space economy by 2033.",
  },
  "imap-2023": {
    id: "imap-2023",
    title: "Indian Military Airworthiness Procedure (IMAP-2023)",
    publisher: "DRDO / CEMILAC",
    url: "https://drdo.gov.in/drdo/sites/default/files/inline-files/IMAP2023.pdf",
    note: "Military airworthiness roles of CEMILAC and DGAQA in India.",
  },
  faa: {
    id: "faa",
    title: "FAA Aircraft Certification",
    publisher: "U.S. Federal Aviation Administration",
    url: "https://www.faa.gov/aircraft/air_cert",
    note: "Civil aircraft certification (United States).",
  },
  easa: {
    id: "easa",
    title: "European Union Aviation Safety Agency",
    publisher: "EASA",
    url: "https://www.easa.europa.eu/en",
    note: "Civil aviation certification (European Union).",
  },
  dgca: {
    id: "dgca",
    title: "Directorate General of Civil Aviation",
    publisher: "Government of India",
    url: "https://www.dgca.gov.in/",
    note: "Civil aviation regulation (India).",
  },
} as const satisfies Record<string, Reference>;

export type ReferenceId = keyof typeof REFERENCES;

export const refs = (...ids: ReferenceId[]): Reference[] => ids.map((id) => REFERENCES[id]);
