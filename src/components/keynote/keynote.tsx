"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type TouchEvent,
} from "react";
import { KEYNOTE_SLIDES } from "@/content/keynote";
import { THEME_COLOR } from "@/lib/theme";
import {
  exitFullscreen,
  fullscreenElement,
  fullscreenSupported,
  KEYNOTE_RETURN_KEY,
  requestFullscreen,
  subscribeFullscreen,
} from "./fullscreen";
import { KeynoteLockup } from "./lockup";
import { SlideBody, type SlideLinks } from "./slides";
import "./keynote.css";

/**
 * Keynote presentation controller.
 *
 * - One slide is mounted at a time (plus the outgoing one during its 0.7 s exit), so
 *   animations on inactive slides never run.
 * - Next/Previous step through a slide's builds before changing slide; going back
 *   lands on the previous slide fully built.
 * - The slide number is mirrored in the URL hash with replaceState, so a reload
 *   resumes in place while Back still leaves the keynote in one step.
 * - Keyboard (← → Space PageUp/PageDown Home End 1–6 F Esc), swipe and on-screen
 *   controls. The scroll wheel is deliberately ignored.
 */

const COUNT = KEYNOTE_SLIDES.length;
const lastBuild = (i: number) => KEYNOTE_SLIDES[i].builds.length - 1;
const EXIT_MS = 700;
const IDLE_MS = 2800;

type Instance = {
  slide: number;
  build: number;
  dir: "fwd" | "back";
  /** True once the presenter has stepped through builds on this slide. */
  stepped: boolean;
  key: number;
};
type State = { current: Instance; leaving: Instance | null; seq: number };
type Action =
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; slide: number; instant?: boolean }
  | { type: "restart" }
  | { type: "reset" }
  | { type: "settled"; key: number };

const INITIAL: State = { current: { slide: 0, build: 0, dir: "fwd", stepped: false, key: 0 }, leaving: null, seq: 0 };

function enter(s: State, slide: number, build: number, dir: Instance["dir"], instant = false): State {
  const seq = s.seq + 1;
  return { seq, current: { slide, build, dir, stepped: false, key: seq }, leaving: instant ? null : s.current };
}

function reducer(s: State, a: Action): State {
  const { slide, build } = s.current;
  switch (a.type) {
    case "next":
      if (build < lastBuild(slide)) return { ...s, current: { ...s.current, build: build + 1, stepped: true } };
      return slide < COUNT - 1 ? enter(s, slide + 1, 0, "fwd") : s;
    case "prev":
      if (build > 0) return { ...s, current: { ...s.current, build: build - 1, stepped: true } };
      return slide > 0 ? enter(s, slide - 1, lastBuild(slide - 1), "back") : s;
    case "goto": {
      const i = Math.max(0, Math.min(COUNT - 1, a.slide));
      if (i === slide) return s;
      return i > slide ? enter(s, i, 0, "fwd", a.instant) : enter(s, i, lastBuild(i), "back", a.instant);
    }
    case "restart":
      return enter(s, 0, 0, "fwd");
    case "reset":
      // Back to the opening, as a new instance so its entrance plays when shown again.
      return s.seq === 0 ? s : { seq: s.seq + 1, current: { ...INITIAL.current, key: s.seq + 1 }, leaving: null };
    case "settled":
      return s.leaving?.key === a.key ? { ...s, leaving: null } : s;
  }
}

/** "#3" → slide index 2. Anything else → 0. */
function slideFromHash(hash: string): number {
  const n = Number.parseInt(hash.replace(/^#/, ""), 10);
  return Number.isInteger(n) && n >= 1 && n <= COUNT ? n - 1 : 0;
}

const noopSubscribe = () => () => {};
const isFullscreen = () => fullscreenElement() !== null;
const serverFalse = () => false;

export function Keynote({ homeHref, ...links }: SlideLinks & { homeHref: string }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const rootRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  /** Opened from the site's Keynote button: Close returns with history.back(). */
  const returnable = useRef(false);
  const fsExitedAt = useRef(0);
  const fullscreen = useSyncExternalStore(subscribeFullscreen, isFullscreen, serverFalse);
  const canFullscreen = useSyncExternalStore(noopSubscribe, fullscreenSupported, serverFalse);
  const [idle, setIdle] = useState(false);

  const next = useCallback(() => dispatch({ type: "next" }), []);
  const prev = useCallback(() => dispatch({ type: "prev" }), []);
  const restart = useCallback(() => dispatch({ type: "restart" }), []);
  const toggleFullscreen = useCallback(() => (fullscreenElement() ? exitFullscreen() : requestFullscreen()), []);
  const close = useCallback(() => {
    exitFullscreen();
    if (returnable.current) router.back();
    else router.push(homeHref);
  }, [router, homeHref]);

  // Next.js keeps visited routes mounted but hidden (React <Activity>). `data-keynote`
  // drives the global CSS that hides the site header and footer and locks scroll, so it
  // must only be present while the keynote is visible. Hiding also rewinds to the
  // opening; returning with back/forward resumes from the slide in the URL hash.
  useLayoutEffect(() => {
    const root = rootRef.current;
    root?.setAttribute("data-keynote", "");
    return () => {
      root?.removeAttribute("data-keynote");
      dispatch({ type: "reset" });
    };
  }, []);

  // Shown: focus, return path, deep link, browser colour; restore everything on exit.
  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
    try {
      if (sessionStorage.getItem(KEYNOTE_RETURN_KEY) === "1") returnable.current = true;
      sessionStorage.removeItem(KEYNOTE_RETURN_KEY);
    } catch {
      /* Storage unavailable. */
    }
    const initial = slideFromHash(window.location.hash);
    if (initial > 0) dispatch({ type: "goto", slide: initial, instant: true });

    const meta = document.querySelector('meta[name="theme-color"]');
    const previousColor = meta?.getAttribute("content");
    meta?.setAttribute("content", THEME_COLOR.dark);

    const onHash = () => dispatch({ type: "goto", slide: slideFromHash(window.location.hash) });
    window.addEventListener("hashchange", onHash);
    const offFullscreen = subscribeFullscreen(() => {
      if (!fullscreenElement()) fsExitedAt.current = Date.now();
    });

    return () => {
      window.removeEventListener("hashchange", onHash);
      offFullscreen();
      if (meta && previousColor) meta.setAttribute("content", previousColor);
      // Leaving the keynote by any route (Close, Back, a link) restores the normal site.
      // Deferred, so a development re-run of this effect (still visible) keeps fullscreen.
      window.setTimeout(() => {
        if (!document.querySelector("[data-keynote]")) exitFullscreen();
      }, 0);
    };
  }, []);

  // Mirror the slide in the hash without adding history entries. Through the router (a
  // hash-only replace), so Next.js also restores it on back/forward.
  const slide = state.current.slide;
  useEffect(() => {
    const hash = slide === 0 ? "" : `#${slide + 1}`;
    if (window.location.hash === hash) return;
    router.replace(`${window.location.pathname}${window.location.search}${hash}`, { scroll: false });
  }, [slide, router]);

  // Unmount the outgoing slide once its exit transition has finished.
  const leavingKey = state.leaving?.key;
  useEffect(() => {
    if (leavingKey === undefined) return;
    const t = window.setTimeout(() => dispatch({ type: "settled", key: leavingKey }), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [leavingKey]);

  // Keep keyboard focus inside the keynote when the focused control leaves with its slide.
  const currentKey = state.current.key;
  useEffect(() => {
    const root = rootRef.current;
    if (root && !root.contains(document.activeElement)) root.focus({ preventScroll: true });
  }, [currentKey]);

  // Keyboard and presentation remotes (which send arrows / PageUp / PageDown).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      const onButton = Boolean(target?.closest("button"));
      const onControl = onButton || Boolean(target?.closest("a[href]"));
      let handled = true;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          if (!e.repeat) next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          if (!e.repeat) prev();
          break;
        case " ":
          // A focused button activates itself with Space; don't advance twice.
          if (onButton) return;
          if (!e.repeat) (e.shiftKey ? prev : next)();
          break;
        case "Enter":
          if (onControl) return;
          if (!e.repeat) next();
          break;
        case "Home":
          dispatch({ type: "goto", slide: 0 });
          break;
        case "End":
          dispatch({ type: "goto", slide: COUNT - 1 });
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Escape":
          // In fullscreen the browser exits fullscreen itself; only a second Escape closes.
          if (fullscreenElement() || Date.now() - fsExitedAt.current < 500) return;
          close();
          break;
        default:
          if (/^[1-9]$/.test(e.key) && Number(e.key) <= COUNT) dispatch({ type: "goto", slide: Number(e.key) - 1 });
          else handled = false;
      }
      if (!handled) return;
      e.preventDefault();
      // Presenting from the keyboard or a remote: tuck the controls away.
      setIdle(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggleFullscreen, close]);

  // In fullscreen, controls fade after a few seconds without mouse movement.
  useEffect(() => {
    let t = 0;
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      setIdle(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), IDLE_MS);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearTimeout(t);
    };
  }, []);

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    if (e.touches.length !== 1) {
      touch.current = null;
      return;
    }
    const p = e.touches[0];
    touch.current = { x: p.clientX, y: p.clientY, t: e.timeStamp };
  }
  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const s = touch.current;
    touch.current = null;
    const p = e.changedTouches[0];
    if (!s || !p) return;
    const dx = p.clientX - s.x;
    const dy = p.clientY - s.y;
    // A deliberate horizontal swipe only; vertical drags scroll a tall phone layout.
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.5 || e.timeStamp - s.t > 900) return;
    if (dx < 0) next();
    else prev();
  }

  const cur = state.current;
  const def = KEYNOTE_SLIDES[cur.slide];
  const instances = state.leaving ? [state.leaving, cur] : [cur];
  const atStart = cur.slide === 0 && cur.build === 0;
  const atEnd = cur.slide === COUNT - 1 && cur.build === lastBuild(cur.slide);
  const step = def.builds[cur.build];
  const announcement = `Slide ${cur.slide + 1} of ${COUNT}: ${def.label}.${step ? ` ${step}` : ""}`;

  return (
    <div
      ref={rootRef}
      className="gx-keynote"
      data-keynote=""
      data-slide={def.id}
      data-idle={fullscreen && idle ? "" : undefined}
      data-ga-section="keynote"
      role="region"
      aria-roledescription="keynote"
      aria-label="Gamyaa AeroSystems keynote"
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">Gamyaa AeroSystems Keynote</h1>

      {instances.map((inst) => {
        const leaving = inst !== cur;
        const d = KEYNOTE_SLIDES[inst.slide];
        return (
          <section
            key={inst.key}
            className="kn-slide"
            data-id={d.id}
            data-state={leaving ? "leaving" : "active"}
            data-dir={inst.dir}
            data-stepped={inst.stepped ? "" : undefined}
            role="group"
            aria-roledescription="slide"
            aria-label={`${inst.slide + 1} of ${COUNT}: ${d.label}`}
            aria-hidden={leaving || undefined}
            inert={leaving}
          >
            <div className="kn-bg tech-grid" aria-hidden />
            <SlideBody id={d.id} build={inst.build} links={links} />
          </section>
        );
      })}

      <div className="kn-chrome">
        <div className="kn-top">
          <KeynoteLockup className="kn-chrome-lockup" />
          <div className="kn-actions">
            <ControlButton label="Restart presentation" hint="Restart" onClick={restart}>
              <RestartIcon />
            </ControlButton>
            {canFullscreen ? (
              <ControlButton label="Full screen" hint="Full screen (F)" pressed={fullscreen} onClick={toggleFullscreen}>
                {fullscreen ? <CollapseIcon /> : <ExpandIcon />}
              </ControlButton>
            ) : null}
            <ControlButton label="Close keynote" hint="Close (Esc)" onClick={close}>
              <CloseGlyph />
            </ControlButton>
          </div>
        </div>

        <div className="kn-bottom">
          <p className="kn-count" aria-hidden>
            <span className="kn-count-now">{String(cur.slide + 1).padStart(2, "0")}</span>
            <span className="kn-count-sep">/</span>
            {String(COUNT).padStart(2, "0")}
          </p>
          <ol className="kn-markers" aria-label="Slides">
            {KEYNOTE_SLIDES.map((s, i) => {
              const fill = i < cur.slide ? 1 : i > cur.slide ? 0 : (cur.build + 1) / s.builds.length;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className="kn-marker"
                    aria-label={`Slide ${i + 1}: ${s.label}`}
                    aria-current={i === cur.slide ? "step" : undefined}
                    title={`${i + 1}. ${s.label}`}
                    onClick={() => dispatch({ type: "goto", slide: i })}
                  >
                    <span className="kn-marker-bar">
                      <span style={{ transform: `scaleX(${fill})` }} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="kn-nav">
            <ControlButton label="Previous" hint="Previous (←)" disabled={atStart} onClick={prev} outline>
              <ChevronIcon dir="left" />
            </ControlButton>
            <ControlButton label="Next" hint="Next (→ or Space)" disabled={atEnd} onClick={next} outline>
              <ChevronIcon dir="right" />
            </ControlButton>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------- Controls */

function ControlButton({
  label,
  hint,
  onClick,
  children,
  disabled = false,
  pressed,
  outline = false,
}: {
  label: string;
  hint: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  pressed?: boolean;
  outline?: boolean;
}) {
  return (
    <button
      type="button"
      className={outline ? "kn-btn kn-btn-outline" : "kn-btn"}
      aria-label={label}
      aria-pressed={pressed}
      // aria-disabled keeps the button focusable, so focus is not lost at the first or last slide.
      aria-disabled={disabled || undefined}
      title={hint}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {children}
    </button>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg {...iconProps}>
      <path d={dir === "left" ? "M14.5 6 8.5 12l6 6" : "M9.5 6l6 6-6 6"} />
    </svg>
  );
}
function RestartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4.5v3.7h3.7" />
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" />
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 4.5V9H4.5M19.5 9H15V4.5M15 19.5V15h4.5M4.5 15H9v4.5" />
    </svg>
  );
}
function CloseGlyph() {
  return (
    <svg {...iconProps}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </svg>
  );
}
