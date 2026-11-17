import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/primitives";
import {
  KN_AEAIP,
  KN_ARCHITECTURE,
  KN_DEMO,
  KN_EXAMPLE,
  KN_OPENING,
  KN_PROBLEM,
  KN_THANKS,
  shortFw,
  type KeynoteSlideId,
  type ReadinessState,
} from "@/content/keynote";
import { gaAttrs } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { KeynoteLockup } from "./lockup";
import { HERO_DOWNLINK, HERO_VIEW, Satellite } from "./satellite";

/**
 * The six keynote slides. Each is one title, at most three points and one visual.
 *
 * Motion is CSS only (globals.css, "Keynote"): `.kn-in` / `.kn-fade` / `.kn-draw`
 * play once when a slide is entered going forward, staggered by `--d`; going back
 * shows the slide already built. Build steps are presenter-controlled through the
 * `build` prop and animate with CSS transitions.
 */

/** Custom properties for inline styles (choreography delays, positions). */
const vars = (v: Record<string, string | number>) => v as CSSProperties;
const d = (ms: number) => vars({ "--d": `${ms}ms` });
const pad2 = (n: number) => String(n).padStart(2, "0");
/** Geometry is rounded so server and browser render identical attribute values. */
const rd = (n: number, p = 2) => Math.round(n * 10 ** p) / 10 ** p;

export type SlideLinks = { demoHref: string; contactHref: string };

export function SlideBody({ id, build, links }: { id: KeynoteSlideId; build: number; links: SlideLinks }) {
  switch (id) {
    case "confidence":
      return <Opening />;
    case "problem":
      return <Problem build={build} />;
    case "aeaip":
      return <Aeaip build={build} />;
    case "architecture":
      return <Architecture />;
    case "demo":
      return <Demo href={links.demoHref} />;
    case "thanks":
      return <Thanks contactHref={links.contactHref} />;
  }
}

/* ------------------------------------------------------------ Shared */

function Points({
  items,
  lit = items.length,
  start = 0,
  emphasis,
  className,
}: {
  items: readonly string[];
  /** Points from this index on are dimmed until their build step arrives. */
  lit?: number;
  start?: number;
  /** Per point, the closing word to highlight in the accent colour once lit. */
  emphasis?: readonly string[];
  className?: string;
}) {
  return (
    <ol className={cn("kn-points", className)}>
      {items.map((p, i) => {
        const em = emphasis?.[i];
        const split = em && p.endsWith(em) ? p.length - em.length : -1;
        return (
          <li key={p} className="kn-in kn-point" data-lit={i < lit} style={d(start + i * 110)}>
            <span className="kn-point-no" aria-hidden>
              {pad2(i + 1)}
            </span>
            {split >= 0 ? (
              <span>
                {p.slice(0, split)}
                <span className="kn-em">{em}</span>
              </span>
            ) : (
              <span>{p}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** "A · B · C" that wraps only between items, never leaving a dot at a line edge. */
function SepList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("kn-sep-list", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** "AEAIP™" with a typographically scaled trademark sign. */
function Mark({ name }: { name: string }) {
  const base = name.replace("™", "");
  return (
    <>
      {base}
      {name.includes("™") ? <span className="kn-tm">™</span> : null}
    </>
  );
}

/* ---------------------------------------------- 01 Engineering Confidence */

const SCENE_W = 1600;
const SAT = { x: 880, y: 96, w: 640 };
const SAT_H = rd((SAT.w * HERO_VIEW.box[3]) / HERO_VIEW.box[2]);
const LIMB = { cx: 1150, cy: 2735, r: 2050 };
const limbY = (x: number) => rd(LIMB.cy - Math.sqrt(LIMB.r * LIMB.r - (x - LIMB.cx) * (x - LIMB.cx)));

const [dlx, dly] = HERO_VIEW.at(HERO_DOWNLINK);
const DOWNLINK = {
  x: rd(SAT.x + ((dlx - HERO_VIEW.box[0]) / HERO_VIEW.box[2]) * SAT.w),
  y: rd(SAT.y + ((dly - HERO_VIEW.box[1]) / HERO_VIEW.box[3]) * SAT_H),
};
const GROUND = [790, 960, 1130, 1300, 1460].map((x, i) => ({ x, y: limbY(x), label: KN_AEAIP.chain[i] }));
const downlinkPath = (g: { x: number; y: number }) => {
  const mx = (DOWNLINK.x + g.x) / 2 + (g.x - DOWNLINK.x) * 0.12;
  const my = (DOWNLINK.y + g.y) / 2;
  return `M${DOWNLINK.x} ${DOWNLINK.y}Q${rd(mx)} ${rd(my)} ${g.x} ${g.y}`;
};

function OpeningScene() {
  const satCx = rd(SAT.x + SAT.w / 2);
  const satCy = rd(SAT.y + SAT_H / 2);
  return (
    <div className="kn-scene kn-opening-scene" aria-hidden>
      <svg viewBox={`0 0 ${SCENE_W} 900`} className="kn-scene-svg kn-settle" focusable="false">
        <defs>
          <radialGradient id="kn-o-glow">
            <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0.13" />
            <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kn-o-earth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1a2e" />
            <stop offset="0.08" stopColor="#070e1a" />
            <stop offset="0.3" stopColor="var(--bg)" />
          </linearGradient>
          <linearGradient id="kn-o-fade" gradientUnits="userSpaceOnUse" x1="260" y1="0" x2="980" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="kn-o-mask" maskUnits="userSpaceOnUse" x="-800" y="0" width="3200" height="1600">
            <rect x="-800" y="0" width="3200" height="1600" fill="url(#kn-o-fade)" />
          </mask>
          {GROUND.map((g, i) => (
            <linearGradient
              key={g.label}
              id={`kn-o-l${i}`}
              gradientUnits="userSpaceOnUse"
              x1={DOWNLINK.x}
              y1={DOWNLINK.y}
              x2={g.x}
              y2={g.y}
            >
              <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0" />
              <stop offset="0.3" stopColor="var(--accent-2)" stopOpacity="0.14" />
              <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.55" />
            </linearGradient>
          ))}
        </defs>

        <circle className="kn-fade kn-breathe" style={d(1300)} cx={satCx} cy={satCy} r={430} fill="url(#kn-o-glow)" />

        {/* Earth limb: a dark body with a thin atmospheric line, fading out to the left. */}
        <g mask="url(#kn-o-mask)" className="kn-fade" style={d(1200)}>
          <circle cx={LIMB.cx} cy={LIMB.cy} r={LIMB.r} fill="url(#kn-o-earth)" />
          <circle cx={LIMB.cx} cy={LIMB.cy} r={LIMB.r + 6} fill="none" stroke="var(--accent-2)" strokeOpacity="0.045" strokeWidth="36" />
          <circle cx={LIMB.cx} cy={LIMB.cy} r={LIMB.r + 1} fill="none" stroke="var(--accent-2)" strokeOpacity="0.12" strokeWidth="7" />
          <circle cx={LIMB.cx} cy={LIMB.cy} r={LIMB.r} fill="none" stroke="var(--accent-2)" strokeOpacity="0.75" strokeWidth="1.3" />
        </g>

        {/* Verification network: the spacecraft linked to the five assurance stages. */}
        {GROUND.map((g, i) => (
          <path
            key={`l${g.label}`}
            d={downlinkPath(g)}
            pathLength={1}
            fill="none"
            stroke={`url(#kn-o-l${i})`}
            strokeWidth={1.1}
            className="kn-draw"
            style={d(2050 + i * 90)}
          />
        ))}
        {GROUND.map((g, i) => (
          <path
            key={`p${g.label}`}
            d={downlinkPath(g)}
            pathLength={1}
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth={2}
            strokeLinecap="round"
            className="kn-pulse"
            style={vars({ "--d": `${3300 + i * 700}ms`, "--t": "3.5s" })}
          />
        ))}
        {GROUND.map((g, i) => (
          <g key={`n${g.label}`} transform={`translate(${g.x} ${g.y})`}>
            <g className="kn-pop" style={d(2550 + i * 90)}>
              <circle r={11} fill="var(--bg)" stroke="var(--line-strong)" />
              <circle r={3.6} fill="var(--accent-2)" />
            </g>
            <text y={40} textAnchor="middle" className="kn-scene-label kn-fade" style={d(2800 + i * 90)}>
              {g.label}
            </text>
          </g>
        ))}

        <Satellite view={HERO_VIEW} x={SAT.x} y={SAT.y} width={SAT.w} height={SAT_H} className="kn-fade" style={d(1450)} />
      </svg>
    </div>
  );
}

function Opening() {
  return (
    <>
      <div className="kn-overture" aria-hidden>
        <KeynoteLockup className="kn-overture-lockup" />
      </div>
      <div className="kn-frame kn-opening">
        <OpeningScene />
        <div className="kn-opening-copy">
          <KeynoteLockup className="kn-in kn-opening-lockup" style={d(1650)} title="Gamyaa AeroSystems" />
          <h2 className="kn-display kn-hero">
            <span className="kn-in kn-line" style={d(1800)}>
              Engineering
            </span>{" "}
            <span className="kn-in kn-line" style={d(1930)}>
              Confidence.
            </span>
          </h2>
          <p className="kn-in kn-second" style={d(2280)}>
            {KN_OPENING.secondary}
          </p>
          <ul className="kn-domains">
            {KN_OPENING.points.map((p, i) => (
              <li key={p} className="kn-in" style={d(2600 + i * 120)}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------- 02 Can We Prove It? */

type Pt = [number, number];
type Card = {
  key: "req" | "hw" | "sw" | "test" | "ver";
  type: string;
  /** Top-left corner in % of the constellation: landscape, portrait. */
  at: Pt;
  atP: Pt;
};

const CARDS: Card[] = [
  { key: "req", type: "Requirement", at: [0, 4], atP: [0, 0] },
  { key: "hw", type: "Hardware configuration", at: [58, 2], atP: [44, 19] },
  { key: "sw", type: "Software version", at: [63, 40], atP: [44, 39] },
  { key: "test", type: "Test evidence", at: [11, 57], atP: [0, 58] },
  { key: "ver", type: "Verification status", at: [52, 77], atP: [44, 78] },
];
const CARD_W = 34;
const CARD_W_P = 56;
const CARD_H = 20;
const CARD_H_P = 18;

/** Relationships between the records. The last two are the ones that break. */
const LINKS: Array<[Card["key"], Card["key"]]> = [
  ["req", "hw"],
  ["req", "test"],
  ["hw", "sw"],
  ["test", "ver"],
];
const CRITICAL: Array<[Card["key"], Card["key"]]> = [
  ["test", "hw"],
  ["test", "sw"],
];

function centre(key: Card["key"], portrait: boolean): Pt {
  const c = CARDS.find((k) => k.key === key)!;
  const [x, y] = portrait ? c.atP : c.at;
  return portrait
    ? [x + CARD_W_P / 2, (y + CARD_H_P / 2) * 1.25]
    : [(x + CARD_W / 2) * 1.6, y + CARD_H / 2];
}

function Links({ portrait }: { portrait: boolean }) {
  const stub = (a: Pt, b: Pt, f = 0.4) => `M${a[0]} ${a[1]}L${a[0] + (b[0] - a[0]) * f} ${a[1] + (b[1] - a[1]) * f}`;
  return (
    <svg
      className={cn("kn-links", portrait ? "kn-portrait-only" : "kn-landscape-only")}
      viewBox={portrait ? "0 0 100 125" : "0 0 160 100"}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      {LINKS.map(([a, b]) => {
        const pa = centre(a, portrait);
        const pb = centre(b, portrait);
        return (
          <g key={`${a}-${b}`}>
            <path className="kn-link" d={stub(pa, pb)} />
            <path className="kn-link" d={stub(pb, pa)} />
          </g>
        );
      })}
      {CRITICAL.map(([a, b]) => {
        const pa = centre(a, portrait);
        const pb = centre(b, portrait);
        return (
          <g key={`${a}-${b}`}>
            <path className="kn-link kn-link-quiet" d={stub(pa, pb)} />
            <path className="kn-link kn-link-quiet" d={stub(pb, pa)} />
            <path className="kn-link-critical" d={`M${pa[0]} ${pa[1]}L${pb[0]} ${pb[1]}`} />
          </g>
        );
      })}
    </svg>
  );
}

function Constellation({ build }: { build: number }) {
  const changed = build >= 1;
  const stale = build >= 2;
  const ex = KN_EXAMPLE;
  const content: Record<Card["key"], { value: ReactNode; detail: string; tone?: "change" | "risk" }> = {
    req: { value: ex.requirement, detail: ex.requirementTitle },
    hw: changed
      ? { value: ex.board.after, detail: `Changed from ${ex.board.before}`, tone: "change" }
      : { value: ex.board.before, detail: "EPS board" },
    sw: changed
      ? { value: ex.firmware.after, detail: `Changed from ${shortFw(ex.firmware.before)}`, tone: "change" }
      : { value: ex.firmware.before, detail: "Battery management" },
    test: stale
      ? {
          value: `${ex.evidence} · Pass`,
          detail: `Tested on ${ex.board.before} · ${shortFw(ex.firmware.before)}`,
          tone: "risk",
        }
      : { value: `${ex.evidence} · Pass`, detail: "Charge termination test" },
    ver: stale
      ? {
          value: (
            <>
              Verified<span className="kn-q">?</span>
            </>
          ),
          detail: "Closed on outdated evidence",
          tone: "risk",
        }
      : { value: "Verified", detail: "Closed in June" },
  };
  const mid = (a: Card["key"], b: Card["key"]) => {
    const [ax, ay] = centre(a, false);
    const [bx, by] = centre(b, false);
    return vars({ "--x": `${rd((ax + bx) / 3.2)}%`, "--y": `${rd((ay + by) / 2)}%` });
  };

  return (
    <figure className="kn-constellation" data-build={build}>
      <Links portrait={false} />
      <Links portrait />
      {CARDS.map((c, i) => {
        const k = content[c.key];
        return (
          <div
            key={c.key}
            className="kn-card-pos kn-in"
            style={vars({
              "--d": `${520 + i * 120}ms`,
              "--x": `${c.at[0]}%`,
              "--y": `${c.at[1]}%`,
              "--px": `${c.atP[0]}%`,
              "--py": `${c.atP[1]}%`,
            })}
          >
            <div className="kn-card kn-float ticks" data-tone={k.tone} style={vars({ "--ft": `${7 + i * 1.3}s`, "--fd": `${-i * 1.7}s` })}>
              <p className="kn-card-type">{c.type}</p>
              <p className="kn-card-value">
                <span key={String(k.tone)} className="kn-swap">
                  {k.value}
                </span>
              </p>
              <p className="kn-card-detail">
                <span key={k.detail} className="kn-swap">
                  {k.tone === "risk" ? <span aria-hidden>▲ </span> : null}
                  {k.detail}
                </span>
              </p>
            </div>
          </div>
        );
      })}
      {CRITICAL.map(([a, b]) => (
        <span key={`${a}${b}`} className="kn-neq" data-show={stale} style={mid(a, b)} aria-hidden>
          ≠
        </span>
      ))}
      <figcaption className="kn-finding" data-show={stale}>
        {KN_PROBLEM.finding.lead}
        <span className="kn-finding-em">{KN_PROBLEM.finding.emphasis}</span>
      </figcaption>
    </figure>
  );
}

function Problem({ build }: { build: number }) {
  return (
    <div className="kn-frame kn-problem">
      <h2 className="kn-display kn-h kn-in" style={d(60)}>
        {KN_PROBLEM.title}
      </h2>
      <div className="kn-problem-side">
        <Points items={KN_PROBLEM.points} lit={build + 1} start={260} className="kn-points-strong" />
        <p className="kn-tag kn-in" style={d(700)}>
          Illustrative · fictitious data
        </p>
      </div>
      <Constellation build={build} />
    </div>
  );
}

/* ------------------------------------------------------------- 03 AEAIP™ */

type Tone = "neutral" | "ok" | "change" | "risk" | "conditional" | "blocked";

const READINESS_TONE: Record<ReadinessState, Tone> = { Ready: "ok", Conditional: "conditional", Blocked: "blocked" };

/** Readiness and validity are always shape + text, never colour alone. */
function Marker({ tone }: { tone: Tone }) {
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden focusable="false">
      <circle r={11} className="kn-mk-ring" />
      {tone === "neutral" ? <circle r={4.5} className="kn-mk-hollow" /> : null}
      {tone === "ok" ? <circle r={5} fill="var(--kn-ok)" /> : null}
      {tone === "change" ? <rect x={-4.2} y={-4.2} width={8.4} height={8.4} transform="rotate(45)" fill="var(--accent-2)" /> : null}
      {tone === "risk" ? <path d="M0 -5.6L5.4 4.2H-5.4Z" fill="var(--kn-amber)" /> : null}
      {tone === "conditional" ? (
        <>
          <circle r={5} fill="none" stroke="var(--kn-amber)" strokeWidth={1.4} />
          <path d="M0 -5A5 5 0 0 0 0 5Z" fill="var(--kn-amber)" />
        </>
      ) : null}
      {tone === "blocked" ? <circle r={5} fill="none" stroke="var(--danger)" strokeWidth={1.4} /> : null}
    </svg>
  );
}

function Chain({ build }: { build: number }) {
  const changed = build >= 1;
  const decided = build >= 2;
  const ex = KN_EXAMPLE;
  const nodes: Array<{ value: string; tone: Tone; delay?: number; flag?: string }> = [
    { value: ex.requirement, tone: "neutral" },
    {
      value: changed
        ? `${shortFw(ex.firmware.after)} · ${ex.board.after}`
        : `${shortFw(ex.firmware.before)} · ${ex.board.before}`,
      tone: changed ? "change" : "neutral",
      flag: changed ? "Changed" : undefined,
    },
    { value: `${ex.evidence} · ${changed ? "At risk" : "Pass"}`, tone: changed ? "risk" : "ok", delay: 380 },
    { value: changed ? "Reopened" : "Closed", tone: changed ? "risk" : "ok", delay: 700 },
    {
      value: decided ? `${ex.gate} · ${ex.readiness}` : ex.gate,
      tone: decided ? READINESS_TONE[ex.readiness] : "neutral",
    },
  ];
  const states: ReadinessState[] = ["Ready", "Conditional", "Blocked"];

  return (
    <div className="kn-chain-wrap">
      <ol className="kn-chain" aria-label="Assurance chain (illustrative)">
        {nodes.map((n, i) => (
          <li
            key={KN_AEAIP.chain[i]}
            className="kn-node kn-in"
            data-tone={n.tone}
            data-seg={i === nodes.length - 1 ? undefined : changed && i >= 1 ? "broken" : "ok"}
            style={vars({ "--d": `${700 + i * 120}ms`, "--td": `${n.delay ?? 0}ms` })}
          >
            {i < nodes.length - 1 ? (
              <span className="kn-node-link" aria-hidden>
                <span className="kn-flow" style={vars({ "--i": i })} />
              </span>
            ) : null}
            <span className="kn-mk">
              <span key={n.tone} className="kn-swap kn-mk-shape">
                <Marker tone={n.tone} />
              </span>
              {i === 1 && changed ? <span className="kn-ripple" aria-hidden /> : null}
            </span>
            <span className="kn-node-text">
              <span className="kn-node-step">{KN_AEAIP.chain[i]}</span>
              <span className="kn-node-value">
                <span key={n.value} className="kn-swap">
                  {n.value}
                </span>
                {n.flag ? <span className="kn-flag">{n.flag}</span> : null}
              </span>
              {i === nodes.length - 1 ? (
                <span className="kn-scale" data-show={decided}>
                  {states.map((s) => (
                    <span key={s} className="kn-scale-item" data-active={s === ex.readiness}>
                      <span className="kn-scale-mk">
                        <Marker tone={READINESS_TONE[s]} />
                      </span>
                      {s}
                    </span>
                  ))}
                  <span className="kn-scale-note">Delta test required before {ex.blockingFrom}</span>
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Aeaip({ build }: { build: number }) {
  return (
    <div className="kn-frame kn-aeaip">
      <div className="kn-aeaip-head">
        <h2 className="kn-display kn-aeaip-title kn-in" style={d(60)}>
          <Mark name={KN_AEAIP.title} />
        </h2>
        <p className="kn-aeaip-sub kn-in" style={d(220)}>
          {KN_AEAIP.subtitle}
        </p>
        <p className="kn-in kn-aeaip-status" style={d(360)}>
          <StatusBadge status={KN_AEAIP.status} className="kn-badge" />
        </p>
      </div>
      <Points
        items={KN_AEAIP.points}
        emphasis={KN_AEAIP.emphasis}
        lit={build + 1}
        start={380}
        className="kn-aeaip-points"
      />
      <Chain build={build} />
      <div className="kn-aeaip-foot kn-in" style={d(1300)}>
        <p className="kn-governance">
          {KN_AEAIP.governance.map((g, i) => (
            <span key={g}>
              {i ? <span className="kn-sep" aria-hidden>·</span> : null}
              {g}
              {i < KN_AEAIP.governance.length - 1 ? <span className="sr-only">.</span> : null}
            </span>
          ))}
        </p>
        <p className="kn-tag">Concept demonstration · fictitious data</p>
      </div>
    </div>
  );
}

/* -------------------------------------------- 04 One Architecture */

/** Battery state of charge over one low-Earth orbit: simulated, for illustration only. */
const SOC = (soc: number) => 86 - ((soc - 70) / 30) * 58;
const SOC_PATH = `M0 ${SOC(82)}C40 ${SOC(92)} 70 ${SOC(99.5)} 100 ${SOC(100)}L151 ${SOC(100)}L240 ${SOC(82)}`;

function EnergyChart() {
  return (
    <svg viewBox="0 0 240 112" className="kn-energy" aria-hidden focusable="false">
      <defs>
        <linearGradient id="kn-soc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={151} y={4} width={89} height={82} className="kn-eclipse" />
      <text x={195.5} y={14} textAnchor="middle" className="kn-chart-label">
        Eclipse
      </text>
      <text x={4} y={14} className="kn-chart-label">
        Sunlight
      </text>
      <line x1={0} x2={240} y1={86} y2={86} className="kn-axis" />
      <path d={`${SOC_PATH}L240 86L0 86Z`} fill="url(#kn-soc-fill)" />
      <path d={SOC_PATH} className="kn-soc" pathLength={1} />
      <text x={125.5} y={SOC(100) - 6} textAnchor="middle" className="kn-chart-label kn-chart-muted">
        Charge limit
      </text>
      <circle r={3.4} className="kn-soc-dot kn-motion-only">
        <animateMotion dur="9s" repeatCount="indefinite" path={SOC_PATH} />
      </circle>
      <text x={0} y={104} className="kn-chart-label">
        State of charge · 1 orbit
      </text>
      <text x={240} y={104} textAnchor="end" className="kn-chart-label kn-chart-accent">
        Simulated
      </text>
    </svg>
  );
}

function Architecture() {
  const a = KN_ARCHITECTURE;
  const chain: Array<[string, string]> = [
    ["Hardware", "EPS · battery"],
    ["Software", KN_EXAMPLE.firmware.after],
    ["Simulation", "Orbit energy balance"],
    ["Evidence", "Linked to AEAIP™"],
  ];
  return (
    <div className="kn-frame kn-arch">
      <h2 className="kn-display kn-h kn-arch-title">
        <span className="kn-in kn-line" style={d(60)}>
          {a.title}
        </span>{" "}
        <span className="kn-in kn-line kn-quiet" style={d(200)}>
          {a.secondary}
        </span>
      </h2>
      <div className="kn-arch-diagram">
        <svg className="kn-arch-links kn-landscape-only kn-fade" style={d(900)} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden focusable="false">
          {["M47 50H57.5", "M57.5 50C63.5 50 64 25 70.8 25", "M57.5 50C63.5 50 64 75 70.8 75"].map((p) => (
            <g key={p}>
              <path d={p} className="kn-arch-link" />
              <path d={p} className="kn-arch-link kn-arch-flow anim-evidence" />
            </g>
          ))}
        </svg>

        {/* Wrapper carries the entrance; the frame keeps the Digital Twin page's orbiting light. */}
        <div className="kn-twin-cell kn-in" style={d(380)}>
        <article className="kn-twin twin-frame ticks" aria-labelledby="kn-twin-name">
          <p className="kicker kn-kicker">Initial focus</p>
          <div className="kn-twin-head">
            <h3 id="kn-twin-name" className="kn-twin-name">
              {a.twin.name}
            </h3>
            <StatusBadge status={a.twin.status} className="kn-badge" />
          </div>
          <p className="kn-twin-tag">{a.twin.tagline}</p>
          <div className="kn-twin-body">
            <Satellite view={HERO_VIEW} className="kn-twin-sat" />
            <EnergyChart />
          </div>
          <ol className="kn-twin-chain" aria-label="How the twin connects to verification">
            {chain.map(([k, v]) => (
              <li key={k}>
                <span className="kn-twin-k">{k}</span>
                <span className="kn-twin-v">{v}</span>
              </li>
            ))}
          </ol>
        </article>
        </div>

        <div className="kn-hub-cell kn-in" style={d(620)}>
          <div className="kn-hub">
            <span className="kn-hub-ring" aria-hidden />
            <span className="kn-hub-name">
              <Mark name={a.core.name} />
            </span>
            <span className="kn-hub-role">{a.core.role}</span>
          </div>
          <StatusBadge status={a.core.status} className="kn-badge" />
        </div>

        <ul className="kn-apps">
          {a.apps.map((app, i) => (
            <li key={app.key} className="kn-app kn-in" style={d(820 + i * 140)}>
              <h3 className="kn-app-name">
                <Mark name={app.name} />
              </h3>
              <p className="kn-app-tag">{app.tagline}</p>
              <StatusBadge status={app.status} className="kn-badge" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- 05 Live Demo */

/** Fine lines drawn in from beyond the edges, converging on the title. */
const CONVERGE = (() => {
  const c = { x: 800, y: 330 };
  const n = 18;
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + 0.17;
    const s = { x: c.x + Math.cos(a) * 1250, y: c.y + Math.sin(a) * 820 };
    const e = { x: c.x + Math.cos(a) * 470, y: c.y + Math.sin(a) * 150 };
    // Control point swung slightly around the centre so the lines arrive in a gentle spiral.
    const b = a + 0.22;
    const k = { x: c.x + Math.cos(b) * 860, y: c.y + Math.sin(b) * 420 };
    return `M${s.x.toFixed(0)} ${s.y.toFixed(0)}Q${k.x.toFixed(0)} ${k.y.toFixed(0)} ${e.x.toFixed(0)} ${e.y.toFixed(0)}`;
  });
})();

function Convergence() {
  return (
    <div className="kn-scene" aria-hidden>
      <svg viewBox="0 0 1600 900" className="kn-scene-svg" focusable="false">
        <defs>
          {/* Lines fade out before they reach the copy, and towards the screen edges. */}
          <radialGradient id="kn-c-fade" gradientUnits="userSpaceOnUse" cx="800" cy="330" r="1150">
            <stop offset="0.2" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.44" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.72" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="kn-c-mask" maskUnits="userSpaceOnUse" x="-1000" y="-800" width="3600" height="2500">
            <rect x="-1000" y="-800" width="3600" height="2500" fill="url(#kn-c-fade)" />
          </mask>
        </defs>
        <g mask="url(#kn-c-mask)">
          {CONVERGE.map((p, i) => (
            <path key={p} d={p} pathLength={1} className="kn-converge kn-draw" style={d(80 + (i % 6) * 110)} />
          ))}
          {CONVERGE.map((p, i) => (
            <path
              key={`p${p}`}
              d={p}
              pathLength={1}
              className="kn-pulse kn-converge-pulse"
              style={vars({ "--d": `${1700 + ((i * 7) % 18) * 260}ms`, "--t": "4.6s" })}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function Demo({ href }: { href: string }) {
  return (
    <div className="kn-frame kn-demo">
      <Convergence />
      <div className="kn-demo-copy">
        <h2 className="kn-display kn-demo-title kn-in" style={vars({ "--d": "200ms", "--kn-rise": "0px" })}>
          {KN_DEMO.title}
        </h2>
        <p className="kn-in kn-second" style={d(520)}>
          {KN_DEMO.secondary}
        </p>
        <ol className="kn-demo-steps">
          {KN_DEMO.points.map((p, i) => (
            <li key={p} className="kn-in" style={d(780 + i * 120)}>
              <span className="kn-point-no" aria-hidden>
                {pad2(i + 1)}
              </span>
              {p}
            </li>
          ))}
        </ol>
        <div className="kn-in kn-demo-cta" style={d(1250)}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary kn-btn-lg"
            data-ga-label="Launch Live Demo"
            {...gaAttrs("aeaip_demo_open")}
          >
            {KN_DEMO.cta}
            <ArrowUpRight size={20} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="kn-tag">{KN_DEMO.note}</p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- 06 Thank You */

function Thanks({ contactHref }: { contactHref: string }) {
  const t = KN_THANKS;
  return (
    <div className="kn-frame kn-thanks">
      <KeynoteLockup className="kn-in kn-thanks-lockup" style={d(60)} title="Gamyaa AeroSystems" />
      <h2 className="kn-display kn-hero kn-in" style={d(260)}>
        {t.title}
      </h2>
      <p className="kn-in kn-second" style={d(440)}>
        {t.secondary}
      </p>
      <ul className="kn-founders" aria-label="Founders" style={vars({ "--n": t.founders.length })}>
        {t.founders.map((f, i) => (
          <li key={f.name} className="kn-in" style={d(680 + i * 120)}>
            <p className="kn-founder-name">{f.name}</p>
            <p className="kn-founder-role">{f.role}</p>
            {f.experience?.map((line) => (
              <SepList key={line} items={line.split(" · ")} className="kn-founder-exp" />
            ))}
            {f.affiliations ? <SepList items={f.affiliations.split(" · ")} className="kn-founder-ex" /> : null}
          </li>
        ))}
      </ul>
      <div className="kn-thanks-foot kn-in" style={d(1100)}>
        <p className="kn-site">{t.site}</p>
        <Link href={contactHref} className="btn btn-secondary kn-btn-md" data-ga-label="Discuss an Engineering Assurance Problem" {...gaAttrs("contact_sales_click")}>
          {t.cta}
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
