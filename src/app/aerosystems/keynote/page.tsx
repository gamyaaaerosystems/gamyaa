import { Keynote } from "@/components/keynote/keynote";
import { internalContact } from "@/components/sections/shared";
import { AEAIP_DEMO_HREF } from "@/content/aeaip";
import { pageMetadata } from "@/lib/seo";
import { aero } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Keynote — Engineering Confidence. Mission Readiness. | Gamyaa AeroSystems",
  description:
    "The Gamyaa AeroSystems keynote: why engineering evidence must match the exact configuration, and how AEAIP™ connects requirement, configuration, evidence, verification and readiness.",
  href: aero("/keynote"),
});

/**
 * Full-screen interactive keynote. It renders inside the AeroSystems layout; while it
 * is mounted, globals.css ("Keynote") hides the site header and footer and locks scroll.
 */
export default function KeynotePage() {
  return (
    <Keynote
      homeHref={aero("/")}
      demoHref={AEAIP_DEMO_HREF}
      contactHref={internalContact("assurance-problem")}
    />
  );
}
