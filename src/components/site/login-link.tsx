import { gaAttrs } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { EXTERNAL } from "@/lib/site";

/** Tablets below each header's breakpoint use the menu, so there is no separate tablet source. */
export type LoginSource = "desktop_header" | "mobile_menu";

/**
 * Login entry point: a plain same-tab link to the dedicated GAMYAA login domain. No
 * authentication happens on this site. Outlined but a step quieter than the Contact CTA.
 */
export function LoginLink({
  source,
  variant = "header",
  className,
}: {
  source: LoginSource;
  variant?: "header" | "menu";
  className?: string;
}) {
  return (
    <a
      href={EXTERNAL.login}
      aria-label="Login to GAMYAA"
      data-ga-label="login"
      {...gaAttrs("login_click", { source })}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink",
        variant === "header" ? "min-h-10 px-3 text-[0.875rem]" : "min-h-12 w-full px-4 text-base",
        className,
      )}
    >
      Login
    </a>
  );
}
