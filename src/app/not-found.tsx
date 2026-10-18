import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { aero, parent } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | GAMYAA" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-404" className="relative flex flex-1 items-center overflow-hidden">
      <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
      <div className="container-x relative py-24">
        <LogoMark className="h-12 w-auto" />
        <p className="eyebrow mt-10">Error 404</p>
        <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">This page could not be found.</h1>
        <p className="lede mt-4 max-w-xl">The link may be out of date, or the page may have moved.</p>
        <ul className="mt-10 flex flex-col gap-3 xs:flex-row">
          <li>
            <Link href={parent("/")} className="btn btn-primary">
              GAMYAA home
            </Link>
          </li>
          <li>
            <Link href={aero("/")} className="btn btn-secondary">
              Gamyaa AeroSystems
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
