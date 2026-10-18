"use client";

import { useEffect } from "react";

/**
 * Highlights the contact option matching ?interest=… (e.g. arriving from
 * "Request a DAQIP Demo"), without making the page dynamic.
 */
export function IntentHighlight() {
  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (!interest || !/^[a-z-]{1,32}$/.test(interest)) return;
    const el = document.querySelector<HTMLElement>(`[data-interest="${interest}"]`);
    el?.setAttribute("data-highlight", "true");
  }, []);
  return null;
}
