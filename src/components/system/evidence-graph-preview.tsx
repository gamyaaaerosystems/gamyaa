import { cn } from "@/lib/cn";

const NODES = ["Configuration", "Design", "Test result", "NCR", "Retest", "Approval"] as const;

/**
 * EvidenceGraphPreview — a static, server-rendered glimpse of the Engineering
 * Evidence Graph: one requirement and six connected records. The interactive
 * version lives on the Evidence Graph page.
 */
export function EvidenceGraphPreview({ className }: { className?: string }) {
  const pts = NODES.map((_, i) => {
    const a = -Math.PI / 2 + (i / NODES.length) * Math.PI * 2;
    return { x: 50 + 36 * Math.cos(a), y: 50 + 36 * Math.sin(a) };
  });
  return (
    <figure className={cn("relative aspect-square w-full max-w-sm", className)} aria-label="A requirement connected to its configuration, design, test result, NCR, retest and approval">
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {pts.map((p, i) => (
          <line key={i} x1={50} y1={50} x2={p.x} y2={p.y} stroke="var(--line-strong)" strokeWidth={0.4} />
        ))}
        <circle cx={50} cy={50} r={36} fill="none" stroke="var(--line)" strokeWidth={0.3} strokeDasharray="1 2" />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-bg px-3 py-1.5 text-sm font-medium text-accent">
        Requirement
      </span>
      {NODES.map((label, i) => (
        <span
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line-strong bg-bg px-2.5 py-1 text-xs text-ink-2"
          style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
        >
          {label}
        </span>
      ))}
    </figure>
  );
}
