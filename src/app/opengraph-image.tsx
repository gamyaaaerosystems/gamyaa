import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "GAMYAA — Aerospace & Defence Engineering Intelligence. Building the Future.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "GAMYAA",
    title: "Aerospace & Defence Engineering Intelligence.",
    subtitle: "Building the Future.",
    url: "gamyaa.in",
  });
}
