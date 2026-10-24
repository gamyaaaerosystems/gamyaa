import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";
import { AEAIP_OG_ALT } from "@/lib/seo";

export const alt = AEAIP_OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Gamyaa AeroSystems · Platform 01",
    title: "AEAIP™",
    subtitle: "Aerospace Engineering Assurance Intelligence Platform. Requirement → Configuration → Evidence → Verification → Readiness.",
    url: "gamyaa.in/aerosystems/aeaip",
  });
}
