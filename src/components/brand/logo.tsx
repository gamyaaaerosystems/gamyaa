import { cn } from "@/lib/cn";
import { MARK_PATHS, MARK_VIEWBOX, WORD_PATHS, WORD_VIEWBOX } from "./logo-paths";

/**
 * Inline SVG sprite for the GAMYAA logo. Rendered once in the root layout; every
 * logo instance references it with <use>, so the path data ships once per page
 * and the colours follow the active theme through CSS variables.
 */
export function LogoSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <linearGradient
          id="gx-grad-navy"
          gradientUnits="userSpaceOnUse"
          x1="467"
          y1="1600"
          x2="2067"
          y2="133"
        >
          <stop offset="0" stopColor="#01223E" />
          <stop offset=".62" stopColor="#06274A" />
          <stop offset="1" stopColor="#4A6072" />
        </linearGradient>
        <linearGradient
          id="gx-grad-silver"
          gradientUnits="userSpaceOnUse"
          x1="467"
          y1="1600"
          x2="2067"
          y2="133"
        >
          <stop offset="0" stopColor="#F3F5F7" />
          <stop offset=".62" stopColor="#D8DDE3" />
          <stop offset="1" stopColor="#93A3B4" />
        </linearGradient>
        <symbol id="gx-mark" viewBox={MARK_VIEWBOX}>
          {MARK_PATHS.map((p, i) => (
            <path key={i} transform={p.t} d={p.d} />
          ))}
        </symbol>
        <symbol id="gx-word" viewBox={WORD_VIEWBOX}>
          {WORD_PATHS.map((p, i) => (
            <path key={i} transform={p.t} d={p.d} />
          ))}
        </symbol>
      </defs>
    </svg>
  );
}

type LogoProps = { className?: string; title?: string };

/** <use> places the symbol at the outer origin, so the outer viewBox is 0 0 w h. */
const outerBox = (vb: string) => {
  const [, , w, h] = vb.split(" ");
  return `0 0 ${w} ${h}`;
};
const MARK_OUTER = outerBox(MARK_VIEWBOX);
const WORD_OUTER = outerBox(WORD_VIEWBOX);

/** The GAMYAA star-and-orbit mark. Aspect ratio ≈ 1.21 : 1. */
export function LogoMark({ className, title }: LogoProps) {
  return (
    <svg
      viewBox={MARK_OUTER}
      className={cn("logo-mark", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#gx-mark" />
    </svg>
  );
}

/** The GAMYAA wordmark. Aspect ratio ≈ 9.64 : 1. */
export function LogoWord({ className, title }: LogoProps) {
  return (
    <svg
      viewBox={WORD_OUTER}
      className={cn("logo-word", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#gx-word" />
    </svg>
  );
}
