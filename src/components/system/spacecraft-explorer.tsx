"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { SubsystemKey } from "@/lib/analytics";
import { SPACECRAFT_AREAS } from "@/content/spacecraft";

const SpacecraftView = dynamic(() => import("@/components/aeaip/spacecraft-view"), {
  ssr: false,
  loading: () => <div className="aspect-[16/10] w-full rounded-sm border border-dashed border-line-strong" />,
});

const NAMES = Object.fromEntries(
  SPACECRAFT_AREAS.filter((a) => a.view).map((a) => [a.view as SubsystemKey, a.name]),
) as Record<SubsystemKey, string>;

/**
 * SpacecraftAssuranceExplorer — a generic spacecraft with its assurance areas around
 * it. Select an area (list or model) to see its typical requirements and evidence.
 * The 3D model loads on large screens, or on request on phones.
 */
export function SpacecraftAssuranceExplorer() {
  const [key, setKey] = useState("eps");
  const [wide, setWide] = useState(false);
  const [modelOnPhone, setModelOnPhone] = useState(false);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const area = SPACECRAFT_AREAS.find((a) => a.key === key)!;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <fieldset className="lg:col-span-3">
        <legend className="mb-3 text-sm text-muted">Assurance areas</legend>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {SPACECRAFT_AREAS.map((a) => {
            const on = a.key === key;
            return (
              <label
                key={a.key}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center rounded-sm border px-3 text-sm transition-colors lg:w-full",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
                  on ? "border-ink bg-ink text-bg" : "border-line text-ink-2 hover:border-line-strong hover:text-ink",
                )}
              >
                <input type="radio" name={`${uid}-area`} checked={on} onChange={() => setKey(a.key)} className="sr-only" />
                {a.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="lg:col-span-5">
        <div className="relative rounded-sm border border-line p-3">
          <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            {wide || modelOnPhone ? (
              <SpacecraftView
                selected={area.view}
                levels={{}}
                names={NAMES}
                onSelect={(k) => {
                  const match = SPACECRAFT_AREAS.find((a) => a.view === k);
                  if (match) setKey(match.key);
                }}
              />
            ) : (
              <button
                type="button"
                onClick={() => setModelOnPhone(true)}
                className="flex min-h-12 w-full items-center justify-center rounded-sm border border-dashed border-line-strong text-sm text-ink-2"
              >
                Show the 3D spacecraft view
              </button>
            )}
          </div>
        </div>
        {area.view === null ? (
          <p className="mt-2 text-sm text-muted">{area.name} has no single part on the spacecraft: it spans the whole system.</p>
        ) : null}
      </div>

      <div aria-live="polite" className="lg:col-span-4">
        <div key={area.key} className="anim-state border-l-2 border-accent pl-5">
          <p className="text-sm text-muted">Typical evidence</p>
          {/* h2: the explorer sits directly under the page H1, in the hero. */}
          <h2 className="mt-1 text-2xl font-medium tracking-tight text-ink">{area.name}</h2>
          <p className="mt-3 text-[0.9375rem] text-ink-2">
            <span className="text-muted">Requirements · </span>
            {area.requirements}
          </p>
          <ul className="mt-4 space-y-2">
            {area.evidence.map((e) => (
              <li key={e} className="flex gap-3 text-[0.9375rem] text-ink">
                <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-accent" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
