import type { MetadataRoute } from "next";
import { PRIMARY_ORIGIN } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${PRIMARY_ORIGIN}/sitemap.xml`,
    host: PRIMARY_ORIGIN,
  };
}
