"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { NavGroup, NavItem } from "@/content/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LoginLink } from "./login-link";
import { ThemeToggle } from "./theme-toggle";

/**
 * Full-screen sheet menu built on the native <dialog> element:
 * focus is trapped, Esc closes, the background is inert, and focus returns
 * to the trigger on close.
 */
export function MobileMenu({
  primary,
  groups = [],
  brand,
  footer,
  className,
}: {
  primary: NavItem[];
  groups?: NavGroup[];
  brand: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();

  // Close after navigation.
  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  function close() {
    ref.current?.close();
  }

  return (
    <div className={className}>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-sm text-ink"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
      >
        <MenuIcon size={22} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={ref}
        id={id}
        aria-label="Site menu"
        className="gx-sheet"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if ((e.target as Element).closest("a")) close();
        }}
      >
        <div
          className="flex h-full flex-col overflow-y-auto"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-line">
            {brand}
            <button
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-sm"
              autoFocus
            >
              <CloseIcon size={22} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 pt-6">
            <ul className="divide-y divide-line border-b border-line">
              {primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-ga-event="nav_click"
                    data-ga-nav-label={item.label}
                    data-ga-destination={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between text-2xl tracking-tight text-ink"
                  >
                    {item.label}
                    <span aria-hidden className="font-mono text-xs text-subtle">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {groups.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 py-8 xs:grid-cols-2">
                {groups.map((g) => (
                  <div key={g.title}>
                    <p className="eyebrow mb-2">{g.title}</p>
                    <ul>
                      {g.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            data-ga-event="nav_click"
                            data-ga-nav-label={item.label}
                            data-ga-destination={item.href}
                            className={cn("flex min-h-11 items-center text-[0.9375rem] text-ink-2 hover:text-ink")}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </nav>

          <div className="container-x mt-auto flex flex-col gap-4 border-t border-line pt-6">
            <LoginLink source="mobile_menu" variant="menu" />
            <ThemeToggle showLabels />
            {footer}
          </div>
        </div>
      </dialog>
    </div>
  );
}
