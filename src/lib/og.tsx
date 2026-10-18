import { ImageResponse } from "next/og";
import { MARK_PATHS, MARK_VIEWBOX } from "@/components/brand/logo-paths";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="467" y1="1600" x2="2067" y2="133"><stop offset="0" stop-color="#F3F5F7"/><stop offset=".62" stop-color="#D8DDE3"/><stop offset="1" stop-color="#93A3B4"/></linearGradient></defs><g fill="url(#g)">${MARK_PATHS.map((p) => `<path transform="${p.t}" d="${p.d}"/>`).join("")}</g></svg>`;
const MARK_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

/** Shared Open Graph card: graphite background, silver GAMYAA mark, engineering grid. */
export async function renderOg({
  eyebrow,
  title,
  subtitle,
  url,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  url: string;
}) {
  const mark = MARK_DATA_URI;

  const gridLines = Array.from({ length: 20 }, (_, i) => i);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0B0D",
          color: "#ECEEF0",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {gridLines.map((i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 600 + i * 40,
              width: 1,
              background: "rgba(236,238,240,0.05)",
            }}
          />
        ))}
        {gridLines.slice(0, 16).map((i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              left: 600,
              right: 0,
              top: i * 40,
              height: 1,
              background: "rgba(236,238,240,0.05)",
            }}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mark}
          width={300}
          height={247}
          alt=""
          style={{ position: "absolute", right: 96, top: 170, opacity: 0.9 }}
        />

        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#9AA1AA", textTransform: "uppercase" }}>
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#C3C8CF", lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 22, color: "#A9D4F5", letterSpacing: 1 }}>{url}</div>
          <div style={{ display: "flex", width: 160, height: 1, background: "rgba(236,238,240,0.3)" }} />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
