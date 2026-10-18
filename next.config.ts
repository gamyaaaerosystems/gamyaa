import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * AeroSystems canonical host.
 *
 * "path"      (default) → https://gamyaa.in/aerosystems is canonical.
 *                         aerosystems.gamyaa.in serves the same pages: the bare domain
 *                         opens aerosystems.gamyaa.in/aerosystems, parent-site pages go
 *                         to gamyaa.in, and canonical tags keep gamyaa.in indexed.
 * "subdomain"           → https://aerosystems.gamyaa.in is canonical.
 *                         gamyaa.in/aerosystems/* is redirected to the subdomain and
 *                         the subdomain is served from the /aerosystems route tree.
 *
 * Must match NEXT_PUBLIC_AEROSYSTEMS_CANONICAL used by src/lib/site.ts.
 */
const aeroCanonical =
  process.env.NEXT_PUBLIC_AEROSYSTEMS_CANONICAL === "subdomain" ? "subdomain" : "path";
const AERO_HOST = "aerosystems\\.gamyaa\\.in";
const PARENT_HOST = "(?:www\\.)?gamyaa\\.in";

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' is required for Next.js inline bootstrap scripts on statically
  // rendered pages (nonces would force dynamic rendering). See docs/IMPLEMENTATION_REPORT.md.
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com${isProd ? "" : " ws: wss:"}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), browsing-topics=()",
  },
  // includeSubDomains / preload are intentionally omitted until every gamyaa.in
  // subdomain is confirmed to serve HTTPS. See the implementation report.
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=63072000" }] : []),
];

/** Future SEO entry points → current canonical pages (avoids duplicate content). */
const seoEntryRedirects: Array<[string, string]> = [
  ["/daqip", "/aerosystems/daqip"],
  ["/aircert-ai", "/aerosystems/aircert-ai"],
  ["/first-article-inspection-software", "/aerosystems/solutions/first-article-inspection"],
  ["/as9102-fai-software", "/aerosystems/solutions/first-article-inspection"],
  ["/aerospace-quality-management-software", "/aerosystems/daqip"],
  ["/airworthiness-certification-software", "/aerosystems/solutions/airworthiness-certification"],
  ["/aerospace-certification-ai", "/aerosystems/aircert-ai"],
  ["/certification-evidence-management", "/aerosystems/solutions/certification-evidence"],
  ["/defence-manufacturing-quality", "/aerosystems/solutions/manufacturing-quality"],
  ["/aerospace-inspection-software", "/aerosystems/solutions/inspection-intelligence"],
  ["/aerosystems/leadership", "/aerosystems/about#leadership"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    const hostRules =
      aeroCanonical === "path"
        ? [
            // aerosystems.gamyaa.in → aerosystems.gamyaa.in/aerosystems (same host).
            {
              source: "/",
              has: [{ type: "host" as const, value: AERO_HOST }],
              destination: "/aerosystems",
              permanent: false,
            },
            // Parent-site pages live on gamyaa.in.
            {
              source: "/:path(ventures|contact|privacy|terms)",
              has: [{ type: "host" as const, value: AERO_HOST }],
              destination: "https://gamyaa.in/:path",
              permanent: false,
            },
          ]
        : [
            {
              source: "/aerosystems",
              has: [{ type: "host" as const, value: PARENT_HOST }],
              destination: "https://aerosystems.gamyaa.in",
              permanent: true,
            },
            {
              source: "/aerosystems/:path*",
              has: [{ type: "host" as const, value: PARENT_HOST }],
              destination: "https://aerosystems.gamyaa.in/:path*",
              permanent: true,
            },
          ];

    return [
      ...hostRules,
      ...seoEntryRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    if (aeroCanonical !== "subdomain") return [];
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host" as const, value: AERO_HOST }],
          destination: "/aerosystems",
        },
        {
          // Anything that is not a framework asset, API route, file with an extension,
          // or already-prefixed path is served from the /aerosystems route tree.
          source: "/:path((?!_next/|api/|aerosystems(?:/|$))[^.]+)",
          has: [{ type: "host" as const, value: AERO_HOST }],
          destination: "/aerosystems/:path",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
