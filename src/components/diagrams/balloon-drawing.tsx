"use client";

import { useId, useState, type SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Original, fictitious engineering drawing (flanged bushing) with FAI balloons.
 * Not derived from any customer drawing. All values are illustrative.
 */

type Approval = "approved" | "pending" | "rejected";

type Characteristic = {
  id: number;
  /** Balloon centre in drawing units (viewBox 0 0 800 520). */
  x: number;
  y: number;
  feature: string;
  requirement: string;
  process: string;
  method: string;
  measurement: string;
  evidence: string;
  reviewer: string;
  approval: Approval;
  approvalText: string;
};

const CHARS: Characteristic[] = [
  {
    id: 14,
    x: 572,
    y: 368,
    feature: "Overall length",
    requirement: "25.40 ±0.10 mm",
    process: "Op 20 · CNC turning, face to length",
    method: "Height gauge on surface plate",
    measurement: "25.43 mm · within tolerance",
    evidence: "Inspection record · AS9102 Form 3, line 14",
    reviewer: "Quality engineer · verified",
    approval: "approved",
    approvalText: "Approved",
  },
  {
    id: 15,
    x: 372,
    y: 336,
    feature: "Flange diameter",
    requirement: "Ø40.00 ±0.05 mm",
    process: "Op 10 · CNC turning",
    method: "Outside micrometer, 25–50 mm",
    measurement: "Ø39.98 mm · within tolerance",
    evidence: "Inspection record · AS9102 Form 3, line 15",
    reviewer: "Quality engineer · verified",
    approval: "approved",
    approvalText: "Approved",
  },
  {
    id: 16,
    x: 366,
    y: 124,
    feature: "Hole pattern position",
    requirement: "4× Ø5.50 ±0.05 · position Ø0.10 to A | B | C",
    process: "Op 30 · CNC drilling",
    method: "CMM · position evaluation to datums A | B | C",
    measurement: "Ø0.06 worst hole · within tolerance",
    evidence: "CMM report · AS9102 Form 3, line 16",
    reviewer: "Quality engineer · review in progress",
    approval: "pending",
    approvalText: "Pending review",
  },
  {
    id: 17,
    x: 708,
    y: 220,
    feature: "Bore diameter · datum B",
    requirement: "Ø12.00 ±0.02 mm",
    process: "Op 20 · bore and ream",
    method: "Bore gauge, verified on CMM",
    measurement: "Ø12.008 mm · within tolerance",
    evidence: "CMM report · AS9102 Form 3, line 17",
    reviewer: "Quality engineer · verified",
    approval: "approved",
    approvalText: "Approved",
  },
  {
    id: 18,
    x: 708,
    y: 150,
    feature: "Bore surface texture",
    requirement: "Ra 1.6 µm maximum",
    process: "Op 20 · finish ream",
    method: "Stylus roughness tester",
    measurement: "Ra 1.1 µm · within limit",
    evidence: "Roughness record · AS9102 Form 3, line 18",
    reviewer: "Quality engineer · verified",
    approval: "approved",
    approvalText: "Approved",
  },
  {
    id: 19,
    x: 530,
    y: 84,
    feature: "Flatness of face A",
    requirement: "Flatness 0.02 mm",
    process: "Op 40 · face grinding",
    method: "CMM · plane evaluation",
    measurement: "0.027 mm · out of tolerance",
    evidence: "CMM report · nonconformance report raised",
    reviewer: "Quality engineer · referred to MRB",
    approval: "rejected",
    approvalText: "Rejected · NCR open",
  },
];

const W = 800;
const H = 520;

const APPROVAL_STYLE: Record<Approval, string> = {
  approved: "var(--st-available)",
  pending: "var(--st-prototype)",
  rejected: "var(--danger)",
};

export function BalloonDrawing({ initial = 17 }: { initial?: number }) {
  const [selected, setSelected] = useState(initial);
  // Sanitised so it is safe inside url(#…) references.
  const uid = `gx${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const current = CHARS.find((c) => c.id === selected) ?? CHARS[0];

  const chain: Array<[string, string]> = [
    ["Characteristic", `#${current.id} · ${current.feature}`],
    ["Engineering Requirement", current.requirement],
    ["Manufacturing Process", current.process],
    ["Inspection Method", current.method],
    ["Measurement", current.measurement],
    ["Evidence", current.evidence],
    ["Reviewer", current.reviewer],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Drawing */}
      <div className="lg:col-span-8">
        <div className="ticks border border-line bg-[var(--sheet)] p-2 sm:p-3">
          <div className="gx-drawing relative" data-sel={selected}>
            <DrawingSheet uid={uid} />
            {CHARS.map((c) => (
              <button
                key={c.id}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => setSelected(c.id)}
                className={cn(
                  "absolute grid size-[24px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-mono text-[11px] leading-none transition-colors sm:size-[26px] sm:text-[12px]",
                  "before:absolute before:-inset-2 before:content-['']",
                  c.id === selected
                    ? "border-[var(--sheet-dim)] bg-[var(--sheet-dim)] text-[var(--sheet)]"
                    : "border-[var(--sheet-line)] bg-[var(--sheet)] text-[var(--sheet-line)] hover:border-[var(--sheet-dim)]",
                )}
                style={{ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%` }}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p id={`${uid}-label`} className="eyebrow mb-2">
            Select a characteristic
          </p>
          <div role="group" aria-labelledby={`${uid}-label`} className="flex flex-wrap gap-2">
            {CHARS.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={c.id === selected}
                aria-controls={`${uid}-trace`}
                onClick={() => setSelected(c.id)}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border px-3 font-mono text-xs transition-colors",
                  c.id === selected
                    ? "border-ink bg-ink text-bg"
                    : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
                )}
              >
                <span className="sr-only">Characteristic</span>#{c.id}
                <span className="hidden sm:inline">{c.feature.split(" · ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trace panel */}
      <div className="lg:col-span-4">
        <div id={`${uid}-trace`} className="border border-line bg-surface p-5 sm:p-6" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <p className="eyebrow">Evidence trace</p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Illustrative</p>
          </div>
          <ol key={selected} className="mt-5">
            {chain.map(([label, value], i) => (
              <li
                key={label}
                className="anim-fade-up relative pb-4 pl-6"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <span aria-hidden className="absolute left-[3.5px] top-[1.15rem] bottom-0 w-px bg-line-strong" />
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.4rem] size-2 rounded-full border border-ink-2 bg-surface"
                />
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">{label}</p>
                <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink">{value}</p>
              </li>
            ))}
            <li
              className="anim-fade-up relative pl-6"
              style={{ animationDelay: `${chain.length * 45}ms` }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-[0.4rem] size-2 rounded-full"
                style={{ background: APPROVAL_STYLE[current.approval] }}
              />
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">Approval</p>
              <p className="mt-0.5 text-[0.9375rem] font-medium leading-snug text-ink">{current.approvalText}</p>
            </li>
          </ol>
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-subtle">
            Fictitious part and values for illustration only. In DAQIP, AI may suggest characteristics; engineers
            verify them and quality approves.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Sheet */

const dim = { stroke: "var(--sheet-dim)", strokeWidth: 0.8, fill: "none" } as const;
const thin = { stroke: "var(--sheet-line)", strokeWidth: 0.6, fill: "none" } as const;
const outline = { stroke: "var(--sheet-line)", strokeWidth: 1.4, fill: "none" } as const;
const center = { ...thin, strokeDasharray: "12 3 2 3" } as const;
const T = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  fill: "var(--sheet-line)",
} as const;
const TD = { ...T, fill: "var(--sheet-dim)" } as const;

function Arrow({ x, y, dir }: { x: number; y: number; dir: "up" | "down" | "left" | "right" }) {
  const s = 6;
  const w = 2.2;
  const pts = {
    up: `${x},${y} ${x - w},${y + s} ${x + w},${y + s}`,
    down: `${x},${y} ${x - w},${y - s} ${x + w},${y - s}`,
    left: `${x},${y} ${x + s},${y - w} ${x + s},${y + w}`,
    right: `${x},${y} ${x - s},${y - w} ${x - s},${y + w}`,
  }[dir];
  return <polygon points={pts} fill="var(--sheet-dim)" />;
}

function DatumBox({ x, y, letter }: { x: number; y: number; letter: string }) {
  return (
    <g>
      <rect x={x} y={y} width={16} height={16} {...thin} strokeWidth={0.9} />
      <text x={x + 8} y={y + 11.5} textAnchor="middle" {...T} fontSize={10}>
        {letter}
      </text>
    </g>
  );
}

/** Highlight overlay: invisible until its characteristic is selected (see globals.css). */
function HL(props: SVGProps<SVGPathElement> & { c: number }) {
  const { c, ...rest } = props;
  return <path data-c={c} className="gx-hl" fill="none" {...rest} />;
}

function DrawingSheet({ uid }: { uid: string }) {
  const cx = 180;
  const cy = 220;
  const holes: Array<[number, number]> = [
    [cx, cy - 60],
    [cx + 60, cy],
    [cx, cy + 60],
    [cx - 60, cy],
  ];
  const zonesX = Array.from({ length: 8 }, (_, i) => i);
  const zonesY = ["A", "B", "C", "D"];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-labelledby={`${uid}-t ${uid}-d`}
    >
      <title id={`${uid}-t`}>Illustrative engineering drawing with FAI balloons</title>
      <desc id={`${uid}-d`}>
        A fictitious flanged bushing shown in an end view and section A–A, with balloons 14 to 19 on the overall
        length 25.40 ±0.10, flange diameter Ø40.00 ±0.05, a four-hole pattern with position tolerance to datums A, B
        and C, bore diameter Ø12.00 ±0.02, bore surface texture Ra 1.6 and flatness 0.02 on datum face A.
      </desc>
      <defs>
        <pattern id={`${uid}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--sheet-hatch)" strokeWidth="0.9" />
        </pattern>
      </defs>

      {/* Frame and zones */}
      <rect x="8" y="8" width="784" height="504" {...thin} strokeWidth={1.1} />
      <rect x="24" y="24" width="752" height="472" {...thin} strokeWidth={0.9} />
      {zonesX.map((i) => (
        <g key={`zx${i}`}>
          {i > 0 ? (
            <>
              <line x1={24 + i * 94} y1="8" x2={24 + i * 94} y2="24" {...thin} />
              <line x1={24 + i * 94} y1="496" x2={24 + i * 94} y2="512" {...thin} />
            </>
          ) : null}
          <text x={71 + i * 94} y="19.5" textAnchor="middle" {...T} fontSize={8}>
            {8 - i}
          </text>
          <text x={71 + i * 94} y="507.5" textAnchor="middle" {...T} fontSize={8}>
            {8 - i}
          </text>
        </g>
      ))}
      {zonesY.map((l, i) => (
        <g key={`zy${l}`}>
          {i > 0 ? (
            <>
              <line x1="8" y1={24 + i * 118} x2="24" y2={24 + i * 118} {...thin} />
              <line x1="776" y1={24 + i * 118} x2="792" y2={24 + i * 118} {...thin} />
            </>
          ) : null}
          <text x="16" y={86 + i * 118} textAnchor="middle" {...T} fontSize={8}>
            {zonesY[3 - i]}
          </text>
          <text x="784" y={86 + i * 118} textAnchor="middle" {...T} fontSize={8}>
            {zonesY[3 - i]}
          </text>
        </g>
      ))}

      {/* ---------------- End view ---------------- */}
      <g>
        <circle cx={cx} cy={cy} r={80} {...outline} />
        <circle cx={cx} cy={cy} r={40} {...outline} />
        <circle cx={cx} cy={cy} r={26.5} {...thin} />
        <circle cx={cx} cy={cy} r={24} {...outline} />
        <circle cx={cx} cy={cy} r={60} {...center} />
        {holes.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={11} {...outline} strokeWidth={1.2} />
            <line x1={x - 15} y1={y} x2={x + 15} y2={y} {...thin} strokeWidth={0.5} />
            <line x1={x} y1={y - 15} x2={x} y2={y + 15} {...thin} strokeWidth={0.5} />
          </g>
        ))}
        <line x1={cx - 94} y1={cy} x2={cx + 94} y2={cy} {...center} />
        <line x1={cx} y1={cy - 94} x2={cx} y2={cy + 94} {...center} />

        {/* Cutting plane A–A */}
        <line x1={cx} y1={112} x2={cx} y2={124} stroke="var(--sheet-line)" strokeWidth={2} />
        <line x1={cx} y1={316} x2={cx} y2={328} stroke="var(--sheet-line)" strokeWidth={2} />
        <line x1={cx} y1={115} x2={cx - 18} y2={115} {...thin} strokeWidth={0.9} />
        <polygon points={`${cx - 22},115 ${cx - 15},112.5 ${cx - 15},117.5`} fill="var(--sheet-line)" />
        <line x1={cx} y1={325} x2={cx - 18} y2={325} {...thin} strokeWidth={0.9} />
        <polygon points={`${cx - 22},325 ${cx - 15},322.5 ${cx - 15},327.5`} fill="var(--sheet-line)" />
        <text x={cx - 30} y={119} textAnchor="middle" {...T} fontSize={11}>
          A
        </text>
        <text x={cx - 30} y={329} textAnchor="middle" {...T} fontSize={11}>
          A
        </text>

        {/* Hole callout + position FCF (#16) */}
        <line x1={187.8} y1={152.2} x2={226} y2={114} {...dim} />
        <Arrow x={187.8} y={152.2} dir="down" />
        <line x1={226} y1={114} x2={236} y2={114} {...dim} />
        <text x={238} y={110} {...TD} data-c="16">
          4× Ø5.50 ±0.05
        </text>
        <g data-c="16">
          <rect x={238} y={116} width={106} height={16} {...thin} strokeWidth={0.9} />
          {[256, 296, 312, 328].map((x) => (
            <line key={x} x1={x} y1={116} x2={x} y2={132} {...thin} strokeWidth={0.9} />
          ))}
          <circle cx={247} cy={124} r={4} {...thin} strokeWidth={0.9} />
          <line x1={241} y1={124} x2={253} y2={124} {...thin} strokeWidth={0.9} />
          <line x1={247} y1={118} x2={247} y2={130} {...thin} strokeWidth={0.9} />
          <text x={276} y={127.5} textAnchor="middle" {...T}>
            Ø0.10
          </text>
          <text x={304} y={127.5} textAnchor="middle" {...T}>
            A
          </text>
          <text x={320} y={127.5} textAnchor="middle" {...T}>
            B
          </text>
          <text x={336} y={127.5} textAnchor="middle" {...T}>
            C
          </text>
        </g>
        <line x1={344} y1={124} x2={355} y2={124} {...dim} />

        {/* Datum C on hole */}
        <polygon points="251,215 251,225 259,220" fill="var(--sheet-line)" />
        <line x1={259} y1={220} x2={270} y2={220} {...thin} strokeWidth={0.9} />
        <DatumBox x={270} y={212} letter="C" />

        <text x={cx} y={356} textAnchor="middle" {...T} fontSize={9} letterSpacing="2">
          END VIEW
        </text>

        <HL c={15} d={`M ${cx - 80} ${cy} a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0`} />
        <HL c={17} d={`M ${cx - 24} ${cy} a 24 24 0 1 0 48 0 a 24 24 0 1 0 -48 0`} />
        <HL c={18} d={`M ${cx - 24} ${cy} a 24 24 0 1 0 48 0 a 24 24 0 1 0 -48 0`} />
        {holes.map(([x, y]) => (
          <HL key={`hl${x}${y}`} c={16} d={`M ${x - 11} ${y} a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0`} />
        ))}
      </g>

      {/* ---------------- Section A–A ---------------- */}
      <g>
        {[
          "M440,140 H472 V149 H440 Z",
          "M440,171 H472 V180 H542 V196 H440 Z",
          "M440,300 H472 V291 H440 Z",
          "M440,269 H472 V260 H542 V244 H440 Z",
        ].map((d) => (
          <g key={d}>
            <path d={d} fill={`url(#${uid}-hatch)`} />
            <path d={d} {...outline} />
          </g>
        ))}
        <line x1={424} y1={220} x2={560} y2={220} {...center} />
        <line x1={430} y1={160} x2={482} y2={160} {...center} />
        <line x1={430} y1={280} x2={482} y2={280} {...center} />

        {/* Ø40 (#15) */}
        <line x1={436} y1={140} x2={402} y2={140} {...thin} />
        <line x1={436} y1={300} x2={402} y2={300} {...thin} />
        <line x1={408} y1={140} x2={408} y2={300} {...dim} data-c="15" />
        <Arrow x={408} y={140} dir="up" />
        <Arrow x={408} y={300} dir="down" />
        <text x={402} y={220} textAnchor="middle" transform="rotate(-90 402 220)" dy={-3} {...TD} data-c="15">
          Ø40.00 ±0.05
        </text>
        <line x1={381} y1={327} x2={400} y2={262} {...dim} />

        {/* Length 25.40 (#14) */}
        <line x1={440} y1={304} x2={440} y2={352} {...thin} />
        <line x1={542} y1={264} x2={542} y2={352} {...thin} />
        <line x1={440} y1={344} x2={542} y2={344} {...dim} data-c="14" />
        <Arrow x={440} y={344} dir="left" />
        <Arrow x={542} y={344} dir="right" />
        <text x={491} y={339} textAnchor="middle" {...TD} data-c="14">
          25.40 ±0.10
        </text>
        <line x1={562} y1={361} x2={527} y2={341} {...dim} />

        {/* Ø12 bore + datum B (#17) */}
        <line x1={546} y1={196} x2={606} y2={196} {...thin} />
        <line x1={546} y1={244} x2={606} y2={244} {...thin} />
        <line x1={598} y1={196} x2={598} y2={244} {...dim} data-c="17" />
        <Arrow x={598} y={196} dir="up" />
        <Arrow x={598} y={244} dir="down" />
        <text x={606} y={224} {...TD} data-c="17">
          Ø12.00 ±0.02
        </text>
        <line x1={697} y1={220} x2={684} y2={220} {...dim} />
        <polygon points="593,252 603,252 598,260" fill="var(--sheet-line)" />
        <line x1={598} y1={260} x2={598} y2={270} {...thin} strokeWidth={0.9} />
        <DatumBox x={590} y={270} letter="B" />

        {/* Surface texture Ra 1.6 (#18) */}
        <path d="M618,186 L624,196 L636,174 H668" {...thin} strokeWidth={0.9} data-c="18" />
        <text x={638} y={170} {...TD} data-c="18">
          Ra 1.6
        </text>
        <line x1={698} y1={156} x2={671} y2={174} {...dim} />

        {/* Flatness on face A (#19) + datum A */}
        <line x1={440} y1={136} x2={440} y2={80} {...thin} />
        <line x1={440} y1={84} x2={446} y2={84} {...thin} />
        <g data-c="19">
          <rect x={446} y={76} width={56} height={16} {...thin} strokeWidth={0.9} />
          <line x1={464} y1={76} x2={464} y2={92} {...thin} strokeWidth={0.9} />
          <polygon points="449,88 453,80 461,80 457,88" {...thin} strokeWidth={0.9} />
          <text x={483} y={87.5} textAnchor="middle" {...T}>
            0.02
          </text>
        </g>
        <line x1={503} y1={84} x2={519} y2={84} {...dim} />
        <polygon points="440,107 440,117 432,112" fill="var(--sheet-line)" />
        <line x1={432} y1={112} x2={422} y2={112} {...thin} strokeWidth={0.9} />
        <DatumBox x={406} y={104} letter="A" />

        <text x={491} y={392} textAnchor="middle" {...T} fontSize={9} letterSpacing="2">
          SECTION A–A
        </text>

        <HL c={15} d="M440,140 H472 M440,300 H472" />
        <HL c={14} d="M440,140 V300 M542,180 V260" />
        <HL c={17} d="M440,196 H542 M440,244 H542" />
        <HL c={18} d="M440,196 H542" />
        <HL c={19} d="M440,140 V300" />
      </g>

      {/* Leader stubs from balloons (balloons themselves are HTML buttons) */}
      <line x1={366} y1={124} x2={356} y2={124} {...dim} />

      {/* Notes */}
      <g {...T} fontSize={8.5}>
        <text x={40} y={432} fontSize={9} letterSpacing="1.5">
          NOTES
        </text>
        <text x={40} y={448}>1. DIMENSIONS IN MILLIMETRES.</text>
        <text x={40} y={462}>2. BREAK SHARP EDGES 0.2 MAX.</text>
        <text x={40} y={476}>3. ILLUSTRATIVE DRAWING. NOT FOR MANUFACTURE.</text>
      </g>

      {/* Title block */}
      <g>
        <rect x={520} y={416} width={256} height={80} {...thin} strokeWidth={0.9} />
        <line x1={520} y1={436} x2={776} y2={436} {...thin} />
        <line x1={520} y1={460} x2={776} y2={460} {...thin} />
        <line x1={520} y1={478} x2={776} y2={478} {...thin} />
        <line x1={622} y1={460} x2={622} y2={496} {...thin} />
        <line x1={690} y1={460} x2={690} y2={496} {...thin} />
        <text x={528} y={430} {...T} fontSize={9} letterSpacing="1.2">
          GAMYAA AEROSYSTEMS
        </text>
        <text x={768} y={430} textAnchor="end" {...T} fontSize={7.5}>
          ILLUSTRATIVE
        </text>
        <text x={528} y={452} {...T} fontSize={8.5}>
          TITLE  FLANGED BUSHING · FICTITIOUS PART
        </text>
        <text x={528} y={472} {...T} fontSize={7.5}>
          DWG  DEMO-01
        </text>
        <text x={630} y={472} {...T} fontSize={7.5}>
          REV  C
        </text>
        <text x={698} y={472} {...T} fontSize={7.5}>
          SCALE  2:1
        </text>
        <text x={528} y={490} {...T} fontSize={7.5}>
          UNITS  mm
        </text>
        <text x={630} y={490} {...T} fontSize={7.5}>
          SHEET  1/1
        </text>
        <text x={698} y={490} {...T} fontSize={7}>
          NOT A CUSTOMER DWG
        </text>
      </g>
    </svg>
  );
}
