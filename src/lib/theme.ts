export type ThemePref = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "gamyaa-theme";

/** Theme used when the visitor has not chosen one. */
export const DEFAULT_THEME: ThemePref = "dark";

export const THEME_COLOR = { light: "#f6f5f1", dark: "#05080f" } as const;

/**
 * Inline pre-paint script: applies the stored theme (or the dark default) before the
 * first paint, and keeps the browser UI colour in step with it.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"&&t!=="system")t="${DEFAULT_THEME}";var d=document.documentElement;d.setAttribute("data-theme",t);var r=t==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;var c=r==="dark"?"${THEME_COLOR.dark}":"${THEME_COLOR.light}";var s=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c)};s();document.addEventListener("DOMContentLoaded",s)}catch(e){}})()`;
