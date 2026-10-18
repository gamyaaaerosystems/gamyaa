# Engineering reference articles — content program

A plan for ten engineering reference articles that build search authority for DAQIP™ and AirCert AI™. None are published yet: per the V1.1 brief, pages are added only when they carry real engineering value.

## Standards every article must meet

- **Written or reviewed by a practising quality or certification engineer.** Name the reviewer and their role on the page.
- **Cite primary sources** (the SAE/IAQG standard, the regulator's guidance) by title and revision. Do not reproduce copyrighted standard text; paraphrase and reference it.
- **Use original diagrams or fictitious examples only.** Never use customer drawings, part numbers or programme names.
- **Explain the topic first.** Mention DAQIP or AirCert AI only where it genuinely helps the reader, with its current status (In Development / Planned).
- **Follow the product language rules:** no "guaranteed", "certified by AI", "100% compliant", or "automatic approval".
- **Format:** one H1, a two-sentence answer at the top (for answer engines), then depth. Mark up as `TechArticle` and `BreadcrumbList`; add `FAQPage` only when the page shows the Q&A.
- **Location:** publish under `/aerosystems/insights/<slug>` (to be created with the first article) and add each article to `sitemap.ts`.

## Priority order

| # | Working title | Search intent | Internal links to |
| --- | --- | --- | --- |
| 1 | What is AS9102? | Definition and scope of the aerospace FAI standard | FAI solution, DAQIP |
| 2 | First Article Inspection explained | When FAI is required, who does it, what "pass" means | FAI solution |
| 3 | AS9102 Forms 1, 2 and 3 | Field-by-field purpose of each form | FAI solution (`#as9102`) |
| 4 | Full vs partial FAI | When a partial or delta FAI is enough, and what triggers a full FAI | FAI solution, Drawing Intelligence |
| 5 | What is a balloon drawing? | Ballooning conventions, numbering, revisions | DAQIP prototype (`#fai-prototype`) |
| 6 | Aerospace inspection evidence | What makes inspection evidence traceable and auditable | Inspection Intelligence |
| 7 | What is airworthiness certification? | Military and civil contexts, roles of the design organisation and the authority | Airworthiness Certification, AirCert AI |
| 8 | Certification basis vs means of compliance | How the two relate in a certification plan | AirCert AI, Certification Evidence |
| 9 | Engineering evidence traceability | Requirement → method → measurement → evidence → approval | Engineering Assurance |
| 10 | Aerospace MSME certification challenges | Documentation load, staffing, evidence consistency | AirCert AI, Research (`#workflow-validation`) |

## Outline template

1. **In two sentences:** the direct answer.
2. **Why it matters:** the engineering or business consequence.
3. **How it works:** the process, with an original diagram.
4. **Common mistakes:** practical, specific.
5. **Worked example:** fictitious part or requirement.
6. **How teams manage it today, and where software helps** (status-labelled).
7. **References:** standard titles and revisions, regulator guidance.
8. **Reviewer, date and revision history.**
