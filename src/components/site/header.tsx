import Link from "next/link";
import { LogoMark, LogoWord } from "@/components/brand/logo";
import { AERO_MENU_GROUPS, AERO_NAV, PARENT_NAV } from "@/content/navigation";
import { aero, CONTACT, parent } from "@/lib/site";
import { LoginLink } from "./login-link";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

function ParentBrand() {
  return (
    <Link href={parent("/")} className="flex min-h-11 items-center gap-3" aria-label="GAMYAA — home">
      <LogoMark className="h-7 w-auto" />
      <LogoWord className="h-[11px] w-auto" />
    </Link>
  );
}

function AeroBrand() {
  return (
    <Link
      href={aero("/")}
      className="flex min-h-11 items-center gap-3"
      aria-label="Gamyaa AeroSystems — home"
    >
      <LogoMark className="h-7 w-auto" />
      <span className="flex flex-col gap-[5px]">
        <LogoWord className="h-[9px] w-auto self-start" />
        <span className="font-mono text-[0.625rem] uppercase leading-none tracking-[0.28em] text-muted">
          AeroSystems
        </span>
      </span>
    </Link>
  );
}

function SkipLink({ target }: { target: string }) {
  return (
    <a
      href={`#${target}`}
      className="sr-only-focusable fixed left-4 top-3 z-50 rounded-sm bg-btn px-4 py-2 text-sm text-btn-ink"
    >
      Skip to content
    </a>
  );
}

export function ParentHeader() {
  return (
    <>
      <SkipLink target="main-gamyaa" />
      <header
        className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md"
        data-ga-section="header"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <ParentBrand />
          {/* lg, not sm: with Login the inline nav needs ~800px; below that the menu (which has Login) is used. */}
          <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex">
            <NavLinks items={PARENT_NAV} />
            <LoginLink source="desktop_header" />
            <ThemeToggle />
          </nav>
          <MobileMenu className="lg:hidden" primary={PARENT_NAV} brand={<ParentBrand />} />
        </div>
      </header>
    </>
  );
}

export function AeroHeader() {
  return (
    <>
      <SkipLink target="main-aero" />
      <header
        className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md"
        data-ga-section="header"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <AeroBrand />
          {/* xl, not lg: the full AeroSystems nav needs ~1120px on one line. */}
          <nav aria-label="Primary" className="hidden items-center gap-3 xl:flex">
            <NavLinks items={AERO_NAV} ctaLast />
            <LoginLink source="desktop_header" />
            <ThemeToggle />
          </nav>
          <MobileMenu
            className="xl:hidden"
            primary={AERO_NAV}
            groups={AERO_MENU_GROUPS}
            brand={<AeroBrand />}
            footer={
              <div className="flex flex-col gap-1 text-sm text-muted">
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center text-ink-2">
                  {CONTACT.email}
                </a>
                <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex min-h-11 items-center text-ink-2">
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            }
          />
        </div>
      </header>
    </>
  );
}
