"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type LocalNavItem = { label: string; href: string };

/**
 * Secondary navigation for the AEAIP section. One row that scrolls horizontally on
 * small screens (the page itself never scrolls sideways); the active page is
 * scrolled into view and marked with aria-current.
 */
export function AeaipLocalNav({ items }: { items: LocalNavItem[] }) {
  const pathname = usePathname() ?? "";
  const listRef = useRef<HTMLUListElement>(null);

  const isActive = (href: string) => {
    const path = href.startsWith("http") ? new URL(href).pathname : href;
    return pathname === path;
  };

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    active?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <nav aria-label="AEAIP" className="border-b border-line bg-surface" data-ga-section="aeaip_local_nav">
      <div className="container-x flex items-stretch gap-4">
        <span className="hidden shrink-0 items-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle md:flex">
          AEAIP™ · Learn
        </span>
        <ul
          ref={listRef}
          className="gx-scroll-x -mx-1 flex min-w-0 flex-1 items-stretch gap-0.5 overflow-x-auto px-1"
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  data-ga-event="nav_click"
                  data-ga-nav-label={`AEAIP ${item.label}`}
                  data-ga-destination={item.href}
                  className={cn(
                    "relative inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[0.8125rem] transition-colors",
                    active
                      ? "text-ink after:absolute after:inset-x-2.5 after:bottom-0 after:h-px after:bg-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
