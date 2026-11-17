import { useId, type SVGProps } from "react";
import { MODEL, normalize, project, rotate, type V3 } from "@/components/aeaip/spacecraft-view";

/**
 * Keynote rendering of the same procedurally built small satellite used by the
 * AEAIP™ demo (fictitious GX-1). The view is projected once at module load and
 * drawn as static SVG: nothing is recomputed per frame.
 */

type Poly = { d: string; fill: string; lines: string; cell: boolean };

export type SatelliteView = {
  polys: Poly[];
  /** viewBox in model units: x, y, width, height. */
  box: [number, number, number, number];
  /** Projects a model-space point to viewBox coordinates. */
  at: (p: V3) => [number, number];
};

function buildView(yaw: number, pitch: number, lightDir: V3, pad = 0.06): SatelliteView {
  const light = normalize(lightDir);
  const drawn: Array<Poly & { depth: number }> = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const path = (pts: Array<[number, number]>) =>
    pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(3)} ${y.toFixed(3)}`).join("");

  for (const face of MODEL) {
    const n = rotate(face.n, yaw, pitch);
    if (!face.twoSided && n[1] <= 0.002) continue;
    const pts = face.pts.map((p) => rotate(p, yaw, pitch));
    const depth = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    const nn = normalize(n[1] < 0 ? [-n[0], -n[1], -n[2]] : n);
    const lit = Math.max(0, nn[0] * light[0] + nn[1] * light[1] + nn[2] * light[2]);
    const flat = pts.map(project);
    for (const [x, y] of flat) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    const pct = Math.round(12 + lit * 88);
    const [litVar, shadeVar] =
      face.tone === "cell"
        ? ["--gx-cell-lit", "--gx-cell-shade"]
        : face.tone === "dark"
          ? ["--gx-dark-lit", "--gx-dark-shade"]
          : ["--gx-lit", "--gx-shade"];
    drawn.push({
      d: `${path(flat)}Z`,
      fill: `color-mix(in srgb, var(${litVar}) ${pct}%, var(${shadeVar}))`,
      lines: (face.lines ?? [])
        .map(([a, b]) => path([project(rotate(a, yaw, pitch)), project(rotate(b, yaw, pitch))]))
        .join(""),
      cell: face.tone === "cell",
      depth,
    });
  }
  drawn.sort((a, b) => a.depth - b.depth);
  const w = maxX - minX;
  const h = maxY - minY;
  // Rounded so the server-rendered and hydrated viewBox strings are identical.
  const r4 = (n: number) => Math.round(n * 1e4) / 1e4;
  return {
    polys: drawn.map(({ d, fill, lines, cell }) => ({ d, fill, lines, cell })),
    box: [r4(minX - w * pad), r4(minY - h * pad), r4(w * (1 + 2 * pad)), r4(h * (1 + 2 * pad))],
    at: (p) => project(rotate(p, yaw, pitch)),
  };
}

/** Three-quarter view from slightly below the orbit plane, lit from the upper left. */
export const HERO_VIEW = buildView(0.78, 0.3, [-0.62, 0.5, 0.6]);

/** Bottom of the launch adapter ring: where the downlink lines on slide 1 leave the spacecraft. */
export const HERO_DOWNLINK: V3 = [0, 0, -1.04];

export function Satellite({
  view,
  ...svg
}: { view: SatelliteView } & Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">) {
  const sheen = `kn-sheen-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [x, y, w, h] = view.box;
  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} aria-hidden="true" focusable="false" {...svg}>
      <defs>
        {/* A soft specular sweep across the solar cells: the only "material" effect. */}
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.07" />
        </linearGradient>
      </defs>
      {view.polys.map((p, i) => (
        <g key={i}>
          <path d={p.d} style={{ fill: p.fill }} stroke="var(--gx-edge)" strokeWidth={0.006} strokeLinejoin="round" />
          {p.cell ? <path d={p.d} fill={`url(#${sheen})`} /> : null}
          {p.lines ? <path d={p.lines} stroke="var(--gx-edge)" strokeWidth={0.0045} fill="none" opacity={0.65} /> : null}
        </g>
      ))}
    </svg>
  );
}
