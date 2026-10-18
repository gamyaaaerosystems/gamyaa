import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "DAQIP — Defence Aerospace Quality Intelligence Platform";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Gamyaa AeroSystems · DAQIP™",
    title: "DAQIP™",
    subtitle: "Defence Aerospace Quality Intelligence Platform. Every requirement. Every measurement. Every approval. Traceable.",
    url: "gamyaa.in/aerosystems/daqip",
  });
}
