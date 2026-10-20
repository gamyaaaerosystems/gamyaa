"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/content/navigation";

function isActive(pathname: string, item: NavItem) {
  // In-page anchors (e.g. /aerosystems#partners) aren't sections of the site.
  if (item.href.includes("#")) return false;
  const candidates = [item.href, ...(item.match ?? [])].map((h) =>
    h.startsWith("http") ? new URL(h).pathname : h,
  );
  return candidates.some((h) => {
    const base = h.split("#")[0];
    return pathname === base || pathname.startsWith(`${base}/`);
  });
}

/** Desktop navigation with aria-current on the active section. */
export function NavLinks({ items, ctaLast = false }: { items: NavItem[]; ctaLast?: boolean }) {
  const pathname = usePathname() ?? "";
  return (
    <ul className="flex items-center gap-1">
      {items.map((item, i) => {
        const active = isActive(pathname, item);
        const asButton = ctaLast && i === items.length - 1;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              data-ga-event="nav_click"
              data-ga-nav-label={item.label}
              data-ga-destination={item.href}
              className={cn(
                "inline-flex min-h-10 items-center whitespace-nowrap rounded-sm px-3 text-[0.875rem] transition-colors",
                asButton
                  ? "ml-2 border border-line-strong text-ink hover:border-ink"
                  : active
                    ? "text-ink"
                    : "text-muted hover:text-ink",
              )}
            >
              <span className={cn("relative", active && !asButton && "after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-ink")}>
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
