import type { MetadataRoute } from "next";
import { SOLUTIONS } from "@/content/solutions";
import { absoluteUrl, aero, parent } from "@/lib/site";

// Update when content changes materially. A fixed value keeps the sitemap static.
const LAST_MODIFIED = "2026-10-19";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    [parent("/"), 1, "monthly"],
    [aero("/"), 1, "weekly"],
    [aero("/products"), 0.8, "monthly"],
    [aero("/daqip"), 0.9, "weekly"],
    [aero("/aircert-ai"), 0.9, "weekly"],
    [aero("/solutions"), 0.7, "monthly"],
    ...SOLUTIONS.map(
      (s) =>
        [aero(`/solutions/${s.slug}`), s.slug === "first-article-inspection" ? 0.9 : 0.7, "monthly"] as [
          string,
          number,
          "monthly",
        ],
    ),
    [aero("/services"), 0.6, "monthly"],
    [aero("/research"), 0.6, "monthly"],
    [aero("/about"), 0.6, "monthly"],
    [aero("/careers"), 0.5, "monthly"],
    [aero("/internships"), 0.5, "monthly"],
    [aero("/contact"), 0.6, "yearly"],
    [parent("/ventures"), 0.7, "monthly"],
    [parent("/contact"), 0.4, "yearly"],
    [parent("/privacy"), 0.2, "yearly"],
    [parent("/terms"), 0.2, "yearly"],
  ];
  return entries.map(([href, priority, changeFrequency]) => ({
    url: absoluteUrl(href),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
