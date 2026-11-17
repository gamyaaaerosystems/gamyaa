"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { gaAttrs, type AnalyticsParams } from "@/lib/analytics";
import { KEYNOTE_RETURN_KEY, requestFullscreen } from "./fullscreen";

/**
 * Opens the keynote in the same tab (client-side navigation, so Back returns here)
 * and asks for fullscreen while the click still counts as a user gesture. If the
 * browser declines, the keynote simply fills the viewport.
 */
export function KeynoteLink({
  href,
  className,
  children,
  ariaLabel,
  ga,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ga?: AnalyticsParams;
}) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // New-tab and new-window clicks keep their normal behaviour.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    try {
      sessionStorage.setItem(KEYNOTE_RETURN_KEY, "1");
    } catch {
      /* Storage unavailable: Close falls back to opening the AeroSystems home page. */
    }
    requestFullscreen();
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      data-ga-label="Keynote"
      {...gaAttrs("keynote_open", ga)}
    >
      {children}
    </Link>
  );
}
