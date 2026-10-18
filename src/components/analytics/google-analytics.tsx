import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

/**
 * Consent architecture: set to true when a consent banner is introduced. While true,
 * this component renders nothing and the consent manager is responsible for loading
 * the same snippet after the visitor opts in.
 */
const REQUIRE_CONSENT_BEFORE_LOADING = false;

/**
 * GA4 (gtag.js), loaded exactly once from the root layout.
 * The inline configuration below is the snippet supplied for G-VRS5BMWG9R, unchanged.
 * Disabled outside production builds and when NEXT_PUBLIC_GA_DISABLED=1.
 */
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  if (process.env.NEXT_PUBLIC_GA_DISABLED === "1") return null;
  if (REQUIRE_CONSENT_BEFORE_LOADING) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
