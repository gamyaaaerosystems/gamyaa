"use client";

import { useEffect } from "react";
import {
  ANALYTICS_EVENTS,
  track,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "@/lib/analytics";

/** data-ga-nav-label → nav_label */
function paramsFromDataset(ds: DOMStringMap): AnalyticsParams {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(ds)) {
    if (!key.startsWith("ga") || key === "gaEvent" || key === "gaSection" || key === "gaLabel")
      continue;
    if (value === undefined) continue;
    const name = key
      .slice(2)
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    out[name] = value;
  }
  return out as AnalyticsParams;
}

function sectionOf(el: Element): string | undefined {
  return (el.closest("[data-ga-section]") as HTMLElement | null)?.dataset.gaSection;
}

/**
 * One delegated click listener for the whole site.
 *  1. Elements with data-ga-event fire that event with their data-ga-* params.
 *  2. mailto: / tel: links fire email_click / phone_click (never the address or number).
 *  3. Links to other domains fire outbound_click (domain only).
 */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target instanceof Element ? e.target : null;
      const el = target?.closest<HTMLElement>("a[href], button, [data-ga-event]");
      if (!el) return;

      const ds = el.dataset;
      const source_section = sectionOf(el);
      const declared = ds.gaEvent;
      if (declared && ANALYTICS_EVENTS.has(declared)) {
        track(declared as AnalyticsEventName, {
          ...(source_section ? { source_section } : {}),
          ...paramsFromDataset(ds),
        });
      }

      if (!(el instanceof HTMLAnchorElement)) return;
      const href = el.getAttribute("href") ?? "";

      if (/^mailto:/i.test(href)) {
        if (declared !== "email_click") track("email_click", { source_section });
        return;
      }
      if (/^tel:/i.test(href)) {
        if (declared !== "phone_click") track("phone_click", { source_section });
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (!/^https?:$/.test(url.protocol) || url.host === window.location.host) return;
      track("outbound_click", {
        destination_domain: url.hostname,
        link_label: ds.gaLabel ?? "link",
        source_section,
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
