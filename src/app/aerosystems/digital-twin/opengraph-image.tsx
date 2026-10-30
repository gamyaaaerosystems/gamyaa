import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Digital Twin — Aerospace, Defence & Space";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Gamyaa AeroSystems · Digital Twin",
    title: "Digital Twin",
    subtitle: "Physics-based, mathematical-model and data-driven twins for Aerospace, Defence & Space.",
    url: "gamyaa.in/aerosystems/digital-twin",
  });
}
