import type { MetadataRoute } from "next";
import { PRIMARY_ORIGIN } from "@/lib/site";

/**
 * Everything public is crawlable; only the contact API is excluded.
 *
 * OAI-SearchBot (ChatGPT search discovery) is named explicitly so the intent is
 * visible. A crawler that matches a named group ignores "*", so the group repeats the
 * /api/ exclusion. GPTBot (model training) is a separate control and is deliberately
 * left to the "*" rule, unchanged from the existing policy.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${PRIMARY_ORIGIN}/sitemap.xml`,
    host: PRIMARY_ORIGIN,
  };
}
