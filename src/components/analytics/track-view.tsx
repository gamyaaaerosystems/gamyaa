"use client";

import { useEffect } from "react";
import { track, type AnalyticsEventName } from "@/lib/analytics";

let lastFired: { event: string; path: string; at: number } | null = null;

/**
 * Fires a view-type event (e.g. view_daqip) when the page becomes visible.
 * Guarded so React Strict Mode's double effect in development does not double count.
 */
export function TrackView({ event }: { event: AnalyticsEventName }) {
  useEffect(() => {
    const path = window.location.pathname;
    const now = Date.now();
    if (lastFired && lastFired.event === event && lastFired.path === path && now - lastFired.at < 1000)
      return;
    lastFired = { event, path, at: now };
    track(event);
  }, [event]);
  return null;
}
