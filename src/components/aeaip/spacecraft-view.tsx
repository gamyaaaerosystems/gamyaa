"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { SubsystemKey } from "@/lib/analytics";
import type { ReadinessLevel } from "@/content/aeaip-demo";

/**
 * Procedurally assembled, generic small-satellite model rendered in 3D without WebGL:
 * vertices are rotated and projected in JavaScript and drawn as SVG polygons
 * (painter's algorithm, back-face culling, simple Lambert shading). No external
 * assets, no 3D library, works on every modern browser.
 *
 * The model is decorative for assistive technology: the subsystem list next to it is
 * the accessible equivalent. Keyboard: arrow keys rotate, Home resets.
 */

type V3 = [number, number, number];
type Face = { pts: V3[]; n: V3; sub: SubsystemKey; tone?: "cell" | "dark"; lines?: Array<[V3, V3]>; twoSided?: boolean };

/* ------------------------------------------------------------ Geometry */

function box(min: V3, max: V3, sub: SubsystemKey, tone?: Face["tone"]): Face[] {
  const [x0, y0, z0] = min;
  const [x1, y1, z1] = max;
  return [
    { sub, tone, n: [0, 0, 1], pts: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]] },
    { sub, tone, n: [0, 0, -1], pts: [[x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [x1, y0, z0]] },
    { sub, tone, n: [1, 0, 0], pts: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]] },
    { sub, tone, n: [-1, 0, 0], pts: [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]] },
    { sub, tone, n: [0, 1, 0], pts: [[x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0]] },
    { sub, tone, n: [0, -1, 0], pts: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]] },
  ];
}

/** Cylinder along an axis. `c` is the centre of the start cap. */
function cylinder(c: V3, axis: "x" | "y" | "z", r: number, len: number, sub: SubsystemKey, n = 18, tone?: Face["tone"]): Face[] {
  const map = (u: number, v: number, w: number): V3 =>
    axis === "z" ? [c[0] + u, c[1] + v, c[2] + w] : axis === "y" ? [c[0] + u, c[1] + w, c[2] + v] : [c[0] + w, c[1] + u, c[2] + v];
  const dir: V3 = axis === "z" ? [0, 0, 1] : axis === "y" ? [0, 1, 0] : [1, 0, 0];
  const faces: Face[] = [];
  const ring = Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2);
  ring.forEach((a, i) => {
    const b = ring[(i + 1) % n];
    const m = (a + b) / 2;
    const nn = map(Math.cos(m), Math.sin(m), 0);
    faces.push({
      sub,
      tone,
      n: [nn[0] - c[0], nn[1] - c[1], nn[2] - c[2]],
      pts: [map(r * Math.cos(a), r * Math.sin(a), 0), map(r * Math.cos(b), r * Math.sin(b), 0), map(r * Math.cos(b), r * Math.sin(b), len), map(r * Math.cos(a), r * Math.sin(a), len)],
    });
  });
  faces.push({ sub, tone: "dark", n: dir, pts: ring.map((a) => map(r * Math.cos(a), r * Math.sin(a), len)) });
  faces.push({ sub, tone, n: [-dir[0], -dir[1], -dir[2]], pts: [...ring].reverse().map((a) => map(r * Math.cos(a), r * Math.sin(a), 0)) });
  return faces;
}

/** Shallow parabolic-looking dish (cone), open upward, drawn two-sided. */
function dish(c: V3, r: number, depth: number, sub: SubsystemKey, n = 18): Face[] {
  const faces: Face[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const b = ((i + 1) / n) * Math.PI * 2;
    const p1: V3 = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), c[2] + depth];
    const p2: V3 = [c[0] + r * Math.cos(b), c[1] + r * Math.sin(b), c[2] + depth];
    const m = (a + b) / 2;
    faces.push({ sub, twoSided: true, n: [-Math.cos(m) * depth, -Math.sin(m) * depth, r], pts: [c, p1, p2] });
  }
  return faces;
}

function cellLines(x0: number, x1: number, y: number, z0: number, z1: number, cols: number, rows: number): Array<[V3, V3]> {
  const lines: Array<[V3, V3]> = [];
  for (let i = 1; i < cols; i++) {
    const x = x0 + ((x1 - x0) * i) / cols;
    lines.push([[x, y, z0], [x, y, z1]]);
  }
  for (let j = 1; j < rows; j++) {
    const z = z0 + ((z1 - z0) * j) / rows;
    lines.push([[x0, y, z], [x1, y, z]]);
  }
  return lines;
}

function buildModel(): Face[] {
  const f: Face[] = [];
  // Structure: bus and launch adapter ring
  f.push(...box([-0.5, -0.5, -0.6], [0.5, 0.5, 0.6], "structure"));
  f.push(...cylinder([0, 0, -0.82], "z", 0.32, 0.22, "structure", 20, "dark"));
  // EPS: two solar-array wings on yokes
  for (const s of [1, -1]) {
    const xa = s > 0 ? 0.5 : -0.75;
    const xb = s > 0 ? 0.75 : -0.5;
    f.push(...box([xa, -0.035, 0.07], [xb, 0.035, 0.14], "eps", "dark"));
    const p0 = s > 0 ? 0.75 : -2.35;
    const p1 = s > 0 ? 2.35 : -0.75;
    const wing = box([p0, -0.02, -0.4], [p1, 0.02, 0.6], "eps", "cell");
    wing[4].lines = cellLines(p0, p1, 0.021, -0.4, 0.6, 6, 3);
    wing[5].lines = cellLines(p0, p1, -0.021, -0.4, 0.6, 6, 3);
    f.push(...wing);
  }
  // Thermal: radiator plate on the -Y face, with fin lines
  const rad = box([-0.4, -0.54, -0.45], [0.4, -0.5, 0.45], "thermal");
  rad[5].lines = Array.from({ length: 7 }, (_, i): [V3, V3] => {
    const x = -0.4 + 0.1 * (i + 1);
    return [[x, -0.541, -0.42], [x, -0.541, 0.42]];
  });
  f.push(...rad);
  // Payload: optical imager barrel on the +Y face
  f.push(...cylinder([0, 0.5, -0.12], "y", 0.23, 0.52, "payload", 20));
  // ADCS: two star-tracker baffles on the top deck
  f.push(...cylinder([0.3, -0.3, 0.6], "z", 0.075, 0.2, "adcs", 14));
  f.push(...cylinder([-0.3, -0.3, 0.6], "z", 0.075, 0.2, "adcs", 14));
  // Avionics: on-board computer and data-handling unit on the top deck
  f.push(...box([-0.42, 0.04, 0.6], [-0.02, 0.42, 0.8], "avionics"));
  // Communications: X-band dish on a mast, S-band patch on the -X face
  f.push(...cylinder([0.25, 0.2, 0.6], "z", 0.03, 0.3, "communications", 10, "dark"));
  f.push(...dish([0.25, 0.2, 0.9], 0.27, 0.1, "communications"));
  f.push(...box([-0.53, -0.18, -0.15], [-0.5, 0.18, 0.15], "communications", "dark"));
  return f;
}

/** The model is static, so it is built once per page load. */
const MODEL = buildModel();

/** Where each subsystem's marker sits on the model. */
const ANCHORS: Record<SubsystemKey, V3> = {
  structure: [0.5, 0.5, -0.45],
  eps: [1.75, 0, 0.6],
  adcs: [0.3, -0.3, 0.82],
  thermal: [0, -0.55, 0.2],
  avionics: [-0.22, 0.24, 0.82],
  communications: [0.25, 0.2, 1.02],
  payload: [0, 1.04, -0.12],
  flight_software: [-0.42, 0.42, 0.72],
  cybersecurity: [0.06, 0.26, 0.98],
};

/** Physical parts shown for subsystems that have no geometry of their own. */
const PROXY: Partial<Record<SubsystemKey, SubsystemKey[]>> = {
  flight_software: ["avionics"],
  cybersecurity: ["communications", "avionics"],
};

/** Yaw that best presents each subsystem to the viewer. */
const PREFERRED_YAW: Partial<Record<SubsystemKey, number>> = {
  payload: 0.3,
  thermal: Math.PI + 0.35,
  eps: 0.95,
  communications: -0.55,
  structure: 0.6,
};

const DEFAULT_YAW = 0.6;
const DEFAULT_PITCH = 0.42;
const LIGHT: V3 = normalize([-0.45, 0.75, 0.55]);

function normalize(v: V3): V3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

function rotate(p: V3, yaw: number, pitch: number): V3 {
  const [x, y, z] = p;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = x * cy - y * sy;
  const y1 = x * sy + y * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  // y2 is depth towards the viewer; z2 is screen-up.
  return [x1, y1 * cp + z * sp, -y1 * sp + z * cp];
}

const F = 9; // perspective focal length (model units)
function project(p: V3): [number, number] {
  const s = F / (F - p[1]);
  return [p[0] * s, -p[2] * s];
}

/* ---------------------------------------------------------- Component */

const LEVEL_COLOR: Record<ReadinessLevel, string> = {
  READY: "var(--st-available)",
  CONDITIONAL: "var(--st-prototype)",
  "NOT READY": "var(--danger)",
};

const VB = { x: -2.6, y: -1.72, w: 5.2, h: 3.25 };

export default function SpacecraftView({
  selected,
  levels,
  names,
  onSelect,
  onInteract,
}: {
  selected: SubsystemKey | null;
  levels: Partial<Record<SubsystemKey, ReadinessLevel>>;
  names: Record<SubsystemKey, string>;
  onSelect: (key: SubsystemKey) => void;
  onInteract?: () => void;
}) {
  const [view, setView] = useState({ yaw: DEFAULT_YAW, pitch: DEFAULT_PITCH });
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number; moved: boolean } | null>(null);
  const anim = useRef<number | null>(null);
  const viewRef = useRef(view);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // Turn the model towards the selected subsystem (instant under reduced motion).
  useEffect(() => {
    if (!selected) return;
    const target = PREFERRED_YAW[selected];
    if (target === undefined) return;
    const from = viewRef.current.yaw;
    // Shortest way round.
    let delta = (target - from) % (Math.PI * 2);
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setView((v) => ({ ...v, yaw: from + delta }));
      return;
    }
    const start = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 450);
      const e = 1 - Math.pow(1 - k, 3);
      setView((v) => ({ ...v, yaw: from + delta * e }));
      if (k < 1) anim.current = requestAnimationFrame(step);
    };
    if (anim.current) cancelAnimationFrame(anim.current);
    anim.current = requestAnimationFrame(step);
    return () => {
      if (anim.current) cancelAnimationFrame(anim.current);
    };
  }, [selected]);

  const highlighted = useMemo(() => {
    if (!selected) return { primary: new Set<SubsystemKey>(), proxy: new Set<SubsystemKey>() };
    const proxy = PROXY[selected];
    return proxy
      ? { primary: new Set<SubsystemKey>(), proxy: new Set<SubsystemKey>(proxy) }
      : { primary: new Set<SubsystemKey>([selected]), proxy: new Set<SubsystemKey>() };
  }, [selected]);

  const drawn = useMemo(() => {
    const out: Array<{ d: string; depth: number; light: number; face: Face; lines: string[] }> = [];
    for (const face of MODEL) {
      const n = rotate(face.n, view.yaw, view.pitch);
      const facing = n[1];
      if (!face.twoSided && facing <= 0.002) continue;
      const pts = face.pts.map((p) => rotate(p, view.yaw, view.pitch));
      const depth = pts.reduce((s, p) => s + p[1], 0) / pts.length;
      const nn = normalize(facing < 0 ? [-n[0], -n[1], -n[2]] : n);
      const light = Math.max(0, nn[0] * LIGHT[0] + nn[1] * LIGHT[1] + nn[2] * LIGHT[2]);
      const d = pts
        .map((p, i) => {
          const [sx, sy] = project(p);
          return `${i ? "L" : "M"}${sx.toFixed(3)} ${sy.toFixed(3)}`;
        })
        .join("") + "Z";
      const lines = (face.lines ?? []).map(([a, b]) => {
        const [ax, ay] = project(rotate(a, view.yaw, view.pitch));
        const [bx, by] = project(rotate(b, view.yaw, view.pitch));
        return `M${ax.toFixed(3)} ${ay.toFixed(3)}L${bx.toFixed(3)} ${by.toFixed(3)}`;
      });
      out.push({ d, depth, light, face, lines });
    }
    return out.sort((a, b) => a.depth - b.depth);
  }, [view]);

  const markers = useMemo(
    () =>
      (Object.keys(ANCHORS) as SubsystemKey[]).map((k) => {
        const r = rotate(ANCHORS[k], view.yaw, view.pitch);
        const [x, y] = project(r);
        return { k, x, y, depth: r[1] };
      }),
    [view],
  );

  function onPointerDown(e: PointerEvent<SVGSVGElement>) {
    if (anim.current) cancelAnimationFrame(anim.current);
    drag.current = { x: e.clientX, y: e.clientY, yaw: view.yaw, pitch: view.pitch, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<SVGSVGElement>) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    if (!d.moved) onInteract?.();
    d.moved = true;
    setView({ yaw: d.yaw + dx * 0.012, pitch: Math.max(-0.15, Math.min(1.1, d.pitch + dy * 0.008)) });
  }
  function onPointerUp(e: PointerEvent<SVGSVGElement>) {
    const d = drag.current;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (d && !d.moved) {
      // A tap or click: select whatever is under the pointer.
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const sub = (el as SVGElement | null)?.closest?.("[data-sub]")?.getAttribute("data-sub") as SubsystemKey | null;
      if (sub) onSelect(sub);
    }
  }

  function rotateBy(dyaw: number, dpitch = 0) {
    onInteract?.();
    setView((v) => ({ yaw: v.yaw + dyaw, pitch: Math.max(-0.15, Math.min(1.1, v.pitch + dpitch)) }));
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") rotateBy(-0.2);
    else if (e.key === "ArrowRight") rotateBy(0.2);
    else if (e.key === "ArrowUp") rotateBy(0, -0.1);
    else if (e.key === "ArrowDown") rotateBy(0, 0.1);
    else if (e.key === "Home") setView({ yaw: DEFAULT_YAW, pitch: DEFAULT_PITCH });
    else return;
    e.preventDefault();
  }

  const label = selected ? markers.find((m) => m.k === selected) : null;
  const labelPos = label ? { left: ((label.x - VB.x) / VB.w) * 100, top: ((label.y - VB.y) / VB.h) * 100 } : null;

  return (
    <div className="relative">
      <div
        role="group"
        tabIndex={0}
        aria-label="3D view of the fictitious GX-1 satellite. Arrow keys rotate, Home resets. Use the subsystem list to select a subsystem."
        onKeyDown={onKeyDown}
        className="gx-model relative aspect-[16/10] w-full overflow-hidden"
      >
        <svg
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          className="block h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          {drawn.map(({ d, light, face, lines }, i) => {
            const isPrimary = highlighted.primary.has(face.sub);
            const isProxy = highlighted.proxy.has(face.sub);
            const dim = selected && !isPrimary && !isProxy;
            const pct = Math.round(18 + light * 82);
            const base =
              isPrimary
                ? `color-mix(in srgb, var(--gx-sel-lit) ${pct}%, var(--gx-sel-shade))`
                : face.tone === "cell"
                  ? `color-mix(in srgb, var(--gx-cell-lit) ${pct}%, var(--gx-cell-shade))`
                  : face.tone === "dark"
                    ? `color-mix(in srgb, var(--gx-dark-lit) ${pct}%, var(--gx-dark-shade))`
                    : `color-mix(in srgb, var(--gx-lit) ${pct}%, var(--gx-shade))`;
            return (
              <g key={i} data-sub={face.sub} opacity={dim ? 0.38 : 1}>
                <path
                  d={d}
                  style={{ fill: base }}
                  stroke={isPrimary || isProxy ? "var(--accent-2)" : "var(--gx-edge)"}
                  strokeWidth={isPrimary || isProxy ? 0.012 : 0.006}
                  strokeDasharray={isProxy ? "0.04 0.03" : undefined}
                  strokeLinejoin="round"
                />
                {lines.length ? (
                  <path d={lines.join("")} stroke="var(--gx-edge)" strokeWidth={0.005} fill="none" opacity={0.7} />
                ) : null}
              </g>
            );
          })}
          {markers.map((m) => {
            const level = levels[m.k];
            const active = m.k === selected;
            return (
              <g key={m.k} data-sub={m.k} className="cursor-pointer">
                <circle cx={m.x} cy={m.y} r={0.11} fill="transparent" />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={active ? 0.055 : 0.04}
                  fill={level ? LEVEL_COLOR[level] : "var(--subtle)"}
                  stroke="var(--bg)"
                  strokeWidth={0.015}
                />
              </g>
            );
          })}
        </svg>
        {label && labelPos ? (
          <div
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap border border-line-strong bg-bg/95 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink shadow-sm"
            style={{ left: `${Math.min(88, Math.max(12, labelPos.left))}%`, top: `${Math.max(14, labelPos.top)}%` }}
          >
            {names[label.k]}
            {levels[label.k] ? <span className="ml-2 text-subtle">· {levels[label.k]}</span> : null}
          </div>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-subtle">Drag, swipe or use arrow keys to rotate. Tap a part to select it.</p>
        <div className="flex gap-1">
          {[
            { label: "Rotate left", glyph: "↺", fn: () => rotateBy(-0.5) },
            { label: "Rotate right", glyph: "↻", fn: () => rotateBy(0.5) },
            { label: "Reset view", glyph: "⟲", fn: () => setView({ yaw: DEFAULT_YAW, pitch: DEFAULT_PITCH }) },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={b.fn}
              className="inline-flex size-11 items-center justify-center border border-line-strong font-mono text-base text-ink hover:border-ink"
              aria-label={b.label}
              title={b.label}
            >
              <span aria-hidden>{b.glyph}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
