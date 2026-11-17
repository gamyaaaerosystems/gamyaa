import type { CSSProperties } from "react";
import { LogoMark, LogoWord } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

/**
 * The Gamyaa AeroSystems header lockup (mark + wordmark + "AeroSystems"), built from
 * the same logo symbols as the site header. Sizes are in em, so `font-size: 10px`
 * reproduces the header exactly and any other size scales it proportionally.
 */
export function KeynoteLockup({
  className,
  style,
  title,
}: {
  className?: string;
  style?: CSSProperties;
  /** Accessible name; omit when the lockup is decorative. */
  title?: string;
}) {
  return (
    <span
      className={cn("kn-lockup", className)}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <LogoMark className="kn-lockup-mark" />
      <span className="kn-lockup-text">
        <LogoWord className="kn-lockup-word" />
        <span className="kn-lockup-label">AeroSystems</span>
      </span>
    </span>
  );
}
