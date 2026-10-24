import type { MetadataRoute } from "next";
import { LEARN_PAGES } from "@/content/aeaip";
import { SOLUTIONS } from "@/content/solutions";
import { absoluteUrl, aero, parent } from "@/lib/site";

// Update when content changes materially. Fixed values keep the sitemap static and
// make lastmod truthful per page rather than "now" on every build.
const V1 = "2026-10-19";
const AEAIP_RELEASE = "2026-10-24";

type Entry = [href: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified: string];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    [parent("/"), 1, "monthly", AEAIP_RELEASE],
    [aero("/"), 1, "weekly", AEAIP_RELEASE],
    // AEAIP™ flagship and its knowledge pages
    [aero("/aeaip"), 0.95, "weekly", AEAIP_RELEASE],
    ...LEARN_PAGES.map((p): Entry => [p.href, p.slug === "glossary" ? 0.6 : 0.8, "monthly", AEAIP_RELEASE]),
    [aero("/aeaip/demo"), 0.8, "monthly", AEAIP_RELEASE],
    [aero("/aeaip/strategy"), 0.7, "monthly", AEAIP_RELEASE],
    // Platforms and products
    [aero("/products"), 0.8, "monthly", AEAIP_RELEASE],
    [aero("/daqip"), 0.9, "weekly", AEAIP_RELEASE],
    [aero("/aircert-ai"), 0.9, "weekly", AEAIP_RELEASE],
    [aero("/solutions"), 0.7, "monthly", AEAIP_RELEASE],
    ...SOLUTIONS.map(
      (s): Entry => [
        aero(`/solutions/${s.slug}`),
        s.slug === "first-article-inspection" ? 0.9 : 0.7,
        "monthly",
        s.slug === "engineering-assurance" ? AEAIP_RELEASE : V1,
      ],
    ),
    [aero("/services"), 0.6, "monthly", AEAIP_RELEASE],
    [aero("/research"), 0.6, "monthly", AEAIP_RELEASE],
    [aero("/about"), 0.6, "monthly", AEAIP_RELEASE],
    [aero("/careers"), 0.5, "monthly", V1],
    [aero("/internships"), 0.5, "monthly", V1],
    [aero("/contact"), 0.6, "yearly", AEAIP_RELEASE],
    [parent("/ventures"), 0.7, "monthly", V1],
    [parent("/contact"), 0.4, "yearly", V1],
    [parent("/privacy"), 0.2, "yearly", V1],
    [parent("/terms"), 0.2, "yearly", V1],
  ];
  return entries.map(([href, priority, changeFrequency, lastModified]) => ({
    url: absoluteUrl(href),
    lastModified,
    changeFrequency,
    priority,
  }));
}
