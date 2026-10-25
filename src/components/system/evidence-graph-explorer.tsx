"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { GRAPH_CENTER, GRAPH_CHANGE, GRAPH_NODES, type GraphNode } from "@/content/aeaip-graph";

type State = "current" | "changed" | "review";

const STATE_LABEL: Record<State, string> = { current: "Current", changed: "Changed", review: "Review required" };

/** Position of node i on an ellipse around the centre (percent of the canvas). */
function pos(i: number, n: number) {
  const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return { x: 50 + 38 * Math.cos(a), y: 50 + 39 * Math.sin(a) };
}

/** Order in which the change propagates, for the staggered transition. */
const PROPAGATION: Record<string, number> = { hardware: 0, result: 1, retest: 2, approval: 3 };

/**
 * EvidenceGraphExplorer — one requirement and the records connected to it. Select a
 * node to see the relationship; apply a configuration change to watch evidence
 * produced on the old revision move to "Review required".
 *
 * Large screens: radial graph. Phones: the same graph as a focused list.
 */
export function EvidenceGraphExplorer() {
  const [selected, setSelected] = useState<GraphNode["id"]>("result");
  const [changed, setChanged] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const n = GRAPH_NODES.length;

  const stateOf = (node: GraphNode): State => (changed && node.onChange ? node.onChange : "current");
  const current = GRAPH_NODES.find((x) => x.id === selected)!;
  const reviewCount = GRAPH_NODES.filter((x) => x.onChange === "review").length;

  function open(node: GraphNode) {
    setSelected(node.id);
    track("evidence_graph_node_open", { node_type: node.id });
  }
  function toggleChange() {
    const next = !changed;
    setChanged(next);
    if (next) {
      setSelected("result");
      track("evidence_graph_node_open", { node_type: "configuration_change" });
    }
  }

  const nodeClass = (s: State, on: boolean) =>
    cn(
      "rounded-sm border bg-surface text-left transition-[border-color,background-color,box-shadow] duration-500",
      s === "changed" && "border-accent bg-surface-accent",
      s === "review" && "border-[var(--st-prototype)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--st-prototype)_18%,transparent)]",
      s === "current" && (on ? "border-ink" : "border-line-strong hover:border-ink"),
      on && s !== "current" && "ring-1 ring-ink",
    );

  const stateTag = (s: State) =>
    s === "current" ? null : (
      <span
        className={cn(
          "mt-1 inline-block rounded-full border px-1.5 text-[0.6875rem] font-medium",
          s === "changed" ? "border-accent text-accent" : "border-[var(--st-prototype)] text-[var(--st-prototype)]",
        )}
      >
        {STATE_LABEL[s]}
      </span>
    );

  return (
    <div>
      {/* Controls + live summary */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="max-w-2xl text-[0.9375rem] text-ink-2">
          {changed ? (
            <>
              <span className="font-medium text-ink">{reviewCount} records need review.</span> {GRAPH_CHANGE.summary}
            </>
          ) : (
            <>All evidence for R-042 is current. Select any record, or change the configuration.</>
          )}
        </p>
        <button
          type="button"
          aria-pressed={changed}
          onClick={toggleChange}
          className={cn("btn shrink-0", changed ? "btn-secondary" : "btn-primary")}
        >
          {changed ? "Reset the example" : `Change configuration: ${GRAPH_CHANGE.label}`}
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Radial graph (lg+) */}
        <div className="relative hidden aspect-[16/11] lg:col-span-8 lg:block" role="group" aria-label="Evidence graph for requirement R-042">
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {GRAPH_NODES.map((node, i) => {
              const p = pos(i, n);
              const s = stateOf(node);
              return (
                <line
                  key={node.id}
                  x1={50}
                  y1={50}
                  x2={p.x}
                  y2={p.y}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={node.id === selected ? 1.6 : 1}
                  strokeDasharray={s === "review" ? "4 4" : undefined}
                  className="transition-[stroke] duration-500"
                  style={{
                    stroke: s === "review" ? "var(--st-prototype)" : s === "changed" ? "var(--accent)" : node.id === selected ? "var(--ink-2)" : "var(--line-strong)",
                    transitionDelay: changed && node.onChange ? `${(PROPAGATION[node.id] ?? 0) * 220}ms` : "0ms",
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-accent bg-bg px-4 py-3 text-center">
            <p className="text-xs text-accent">{GRAPH_CENTER.kind}</p>
            <p className="mt-0.5 text-lg font-medium text-ink">{GRAPH_CENTER.value}</p>
            <p className="mt-1 text-xs leading-snug text-muted">{GRAPH_CENTER.text}</p>
          </div>
          {GRAPH_NODES.map((node, i) => {
            const p = pos(i, n);
            const s = stateOf(node);
            const on = node.id === selected;
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={on}
                aria-controls={`${uid}-detail`}
                onClick={() => open(node)}
                className={cn("absolute w-[9.5rem] -translate-x-1/2 -translate-y-1/2 px-3 py-2", nodeClass(s, on))}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transitionDelay: changed && node.onChange ? `${(PROPAGATION[node.id] ?? 0) * 220}ms` : "0ms",
                }}
              >
                <span className="block text-[0.6875rem] text-muted">{node.kind}</span>
                <span className="block text-sm font-medium leading-snug text-ink">
                  {s === "changed" ? node.changedValue : node.value}
                </span>
                {stateTag(s)}
              </button>
            );
          })}
        </div>

        {/* Focused list (below lg) */}
        <div className="lg:hidden">
          <div className="rounded-sm border border-accent px-4 py-3">
            <p className="text-xs text-accent">{GRAPH_CENTER.kind}</p>
            <p className="text-lg font-medium text-ink">{GRAPH_CENTER.value}</p>
            <p className="mt-1 text-sm text-muted">{GRAPH_CENTER.text}</p>
          </div>
          <ul className="relative ml-3 border-l border-line-strong pl-4 pt-3">
            {GRAPH_NODES.map((node) => {
              const s = stateOf(node);
              const on = node.id === selected;
              return (
                <li key={node.id} className="relative mt-2">
                  <span aria-hidden className="absolute -left-4 top-6 h-px w-4 bg-line-strong" />
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => open(node)}
                    className={cn("flex min-h-12 w-full flex-col px-3 py-2", nodeClass(s, on))}
                  >
                    <span className="text-xs text-muted">
                      {node.relation} · {node.kind}
                    </span>
                    <span className="text-[0.9375rem] font-medium text-ink">{s === "changed" ? node.changedValue : node.value}</span>
                    {stateTag(s)}
                  </button>
                  {on ? <NodeDetail node={node} state={s} compact /> : null}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Detail panel (lg+) */}
        <div id={`${uid}-detail`} aria-live="polite" className="hidden lg:col-span-4 lg:block">
          <NodeDetail node={current} state={stateOf(current)} />
        </div>
      </div>
    </div>
  );
}

function NodeDetail({ node, state, compact = false }: { node: GraphNode; state: State; compact?: boolean }) {
  return (
    <div className={cn("anim-state", compact ? "mt-2 border-l-2 border-accent py-1 pl-3" : "border-l-2 border-accent pl-5")}>
      {!compact ? <p className="text-sm text-muted">{node.kind}</p> : null}
      {!compact ? (
        <p className="mt-0.5 text-xl font-medium tracking-tight text-ink">
          {state === "changed" ? node.changedValue : node.value}
        </p>
      ) : null}
      <p className={cn("text-sm text-accent", !compact && "mt-2")}>
        R-042 — {node.relation} → {node.kind.toLowerCase()}
      </p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{node.detail}</p>
      {state !== "current" && node.why ? (
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
          <span className="font-medium">{STATE_LABEL[state]}: </span>
          {node.why}
        </p>
      ) : null}
    </div>
  );
}
