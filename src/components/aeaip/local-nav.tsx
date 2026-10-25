"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type LocalNavItem = { label: string; href: string };

const pathOf = (href: string) => (href.startsWith("http") ? new URL(href).pathname : href.split("#")[0]);

/**
 * AEAIP section navigation: Overview · How it works · Learn ▾ · Demo · Strategy.
 * "Learn" is a disclosure listing the knowledge pages (a panel on desktop, a
 * full-width list on phones). Esc, outside click and navigation close it.
 */
export function AeaipLocalNav({
  overview,
  howItWorks,
  learn,
  demo,
  strategy,
}: {
  overview: LocalNavItem;
  howItWorks: LocalNavItem;
  learn: LocalNavItem[];
  demo: LocalNavItem;
  strategy: LocalNavItem;
}) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const learnActive = learn.find((l) => pathOf(l.href) === pathname);

  // Close on navigation (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape (returning focus) and on outside click.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    function onDown(e: PointerEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const item = (l: LocalNavItem, active: boolean) => (
    <Link
      href={l.href}
      aria-current={active ? "page" : undefined}
      data-ga-event="nav_click"
      data-ga-nav-label={`AEAIP ${l.label}`}
      data-ga-destination={l.href}
      className={cn(
        "relative inline-flex min-h-12 items-center whitespace-nowrap px-3 text-sm transition-colors",
        active ? "text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-accent" : "text-muted hover:text-ink",
      )}
    >
      {l.label}
    </Link>
  );

  return (
    <nav aria-label="AEAIP" className="relative z-30 border-b border-line bg-bg/95 backdrop-blur-md" data-ga-section="aeaip_local_nav">
      <div ref={wrap} className="container-x">
        <div className="flex items-center gap-1">
          <Link href={overview.href} className="mr-2 hidden min-h-12 items-center text-sm font-medium text-ink sm:inline-flex">
            AEAIP™
          </Link>
          <ul className="flex min-w-0 flex-1 items-center">
            <li className="hidden sm:block">{item(overview, pathname === pathOf(overview.href))}</li>
            <li className="hidden md:block">{item(howItWorks, false)}</li>
            <li>
              <button
                ref={button}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((o) => !o)}
                className={cn(
                  "relative inline-flex min-h-12 items-center gap-1.5 whitespace-nowrap px-3 text-sm transition-colors",
                  learnActive || open ? "text-ink" : "text-muted hover:text-ink",
                  learnActive && "after:absolute after:inset-x-3 after:bottom-0 after:h-px after:bg-accent",
                )}
              >
                Learn
                {learnActive ? <span className="hidden text-subtle lg:inline">· {learnActive.label}</span> : null}
                <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className={cn("transition-transform", open && "rotate-180")}>
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            </li>
            <li>{item(demo, pathname === pathOf(demo.href))}</li>
            <li>{item(strategy, pathname === pathOf(strategy.href))}</li>
          </ul>
        </div>

        <div
          id={panelId}
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]"
        >
          <div className="container-x py-6 sm:py-8">
            <p className="text-sm text-muted">Engineering knowledge behind AEAIP™</p>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {[overview, ...learn].map((l) => {
                const active = pathOf(l.href) === pathname;
                return (
                  <li key={l.href} className="border-t border-line">
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      data-ga-event="nav_click"
                      data-ga-nav-label={`AEAIP Learn ${l.label}`}
                      data-ga-destination={l.href}
                      className={cn(
                        "flex min-h-12 items-center justify-between gap-4 text-[0.9375rem] transition-colors",
                        active ? "text-accent" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {l.label}
                      <span aria-hidden className="text-subtle">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
