import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Gamyaa Ventures — Backing the systems behind the next aerospace era.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Gamyaa Ventures",
    title: "Backing the systems behind the next aerospace era.",
    subtitle: "Strategic ventures for aerospace, defence, space and deep tech",
    url: "gamyaa.in/ventures",
  });
}
