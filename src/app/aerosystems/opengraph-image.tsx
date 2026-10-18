import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Gamyaa AeroSystems — Intelligence for Aerospace & Defence Manufacturing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Gamyaa AeroSystems",
    title: "Intelligence for Aerospace & Defence Manufacturing",
    subtitle: "Quality · Airworthiness · Inspection · Engineering Evidence",
    url: "gamyaa.in/aerosystems",
  });
}
