import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";
import { AERO_OG_ALT } from "@/lib/seo";

export const alt = AERO_OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Gamyaa AeroSystems",
    title: "Engineering Assurance Intelligence",
    subtitle: "Defence · Aerospace · Space. From engineering requirement to verified evidence and readiness decision.",
    url: "gamyaa.in/aerosystems",
  });
}
