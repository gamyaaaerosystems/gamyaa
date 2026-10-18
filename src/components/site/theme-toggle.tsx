"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/ui/icons";
import { DEFAULT_THEME, THEME_COLOR, THEME_STORAGE_KEY, type ThemePref } from "@/lib/theme";

const EVENT = "gx-theme";

function read(): ThemePref {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" || t === "system" ? t : DEFAULT_THEME;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function apply(pref: ThemePref) {
  document.documentElement.setAttribute("data-theme", pref);
  const resolved =
    pref === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : pref;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[resolved]);
  window.dispatchEvent(new Event(EVENT));
}

const OPTIONS: Array<{ value: ThemePref; label: string; Icon: typeof SunIcon }> = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
];

/**
 * Light / Dark / System selector built on native radio inputs (keyboard support for free).
 * The pre-paint script in the root layout applies the stored preference before first paint.
 */
export function ThemeToggle({ showLabels = false, className }: { showLabels?: boolean; className?: string }) {
  const pref = useSyncExternalStore(subscribe, read, () => DEFAULT_THEME);
  const name = useId();

  // Keep tabs in sync when the preference changes in another tab.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== THEME_STORAGE_KEY) return;
      const v = e.newValue;
      apply(v === "light" || v === "dark" || v === "system" ? v : DEFAULT_THEME);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function choose(next: ThemePref) {
    apply(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) — preference applies to this page only */
    }
    track("theme_change", { theme: next });
  }

  return (
    <fieldset className={cn("inline-flex", className)}>
      <legend className="sr-only">Colour theme</legend>
      <div className="inline-flex rounded-full border border-line p-0.5">
        {OPTIONS.map(({ value, label, Icon }) => (
          <label
            key={value}
            className={cn(
              "relative inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full text-xs text-muted transition-colors hover:text-ink",
              showLabels ? "min-h-11 px-4" : "size-8",
              "has-[:checked]:bg-surface-2 has-[:checked]:text-ink",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]",
            )}
            title={label}
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={pref === value}
              onChange={() => choose(value)}
              className="sr-only"
            />
            <Icon size={15} />
            <span className={showLabels ? undefined : "sr-only"}>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
