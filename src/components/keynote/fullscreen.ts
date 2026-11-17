/**
 * Fullscreen helpers for the keynote. Browsers only grant fullscreen from a user
 * gesture (click, key press); every call here is safe to make without one and
 * fails silently, leaving the keynote in its full-viewport layout.
 */

type WebkitDocument = Omit<Document, "exitFullscreen"> & {
  exitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenEnabled?: boolean;
};
/** Older Safari (iPadOS) only has the prefixed API; iPhone Safari has neither. */
type WebkitElement = Omit<HTMLElement, "requestFullscreen"> & {
  requestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
  webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void> | void;
};

export function fullscreenElement(): Element | null {
  if (typeof document === "undefined") return null;
  const d = document as unknown as WebkitDocument;
  return d.fullscreenElement ?? d.webkitFullscreenElement ?? null;
}

export function fullscreenSupported(): boolean {
  if (typeof document === "undefined") return false;
  const d = document as unknown as WebkitDocument;
  const el = document.documentElement as unknown as WebkitElement;
  return Boolean((el.requestFullscreen || el.webkitRequestFullscreen) && (d.fullscreenEnabled ?? d.webkitFullscreenEnabled));
}

function swallow(result: Promise<void> | void) {
  if (result && typeof result.catch === "function") result.catch(() => {});
}

/** Request fullscreen for the whole document (it survives client-side navigation). */
export function requestFullscreen(): void {
  if (!fullscreenSupported() || fullscreenElement()) return;
  const el = document.documentElement as unknown as WebkitElement;
  try {
    if (el.requestFullscreen) swallow(el.requestFullscreen({ navigationUI: "hide" }));
    else swallow(el.webkitRequestFullscreen?.());
  } catch {
    /* Denied or unsupported: the full-viewport layout is the fallback. */
  }
}

export function exitFullscreen(): void {
  if (!fullscreenElement()) return;
  const d = document as unknown as WebkitDocument;
  try {
    if (d.exitFullscreen) swallow(d.exitFullscreen());
    else swallow(d.webkitExitFullscreen?.());
  } catch {
    /* Already exited. */
  }
}

export function subscribeFullscreen(onChange: () => void): () => void {
  document.addEventListener("fullscreenchange", onChange);
  document.addEventListener("webkitfullscreenchange", onChange);
  return () => {
    document.removeEventListener("fullscreenchange", onChange);
    document.removeEventListener("webkitfullscreenchange", onChange);
  };
}

/**
 * Set by the homepage Keynote button so Close can return with history.back()
 * (restoring the page the visitor came from) instead of pushing a new entry.
 */
export const KEYNOTE_RETURN_KEY = "gx-keynote-return";
