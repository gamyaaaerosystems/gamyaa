import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark, LogoWord } from "@/components/brand/logo";
import { SmartLink } from "@/components/ui/primitives";
import { PARTNERS } from "@/content/company";
import { aero, aeroLegalName, BRAND, CONTACT, EXTERNAL, parent } from "@/lib/site";

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <ul className="space-y-0.5 text-sm">{children}</ul>
    </div>
  );
}

function Item({ href, children, ga }: { href: string; children: ReactNode; ga?: Parameters<typeof SmartLink>[0]["ga"] }) {
  return (
    <li>
      <SmartLink
        href={href}
        ga={ga}
        className="inline-flex min-h-9 items-center text-ink-2 transition-colors hover:text-ink"
      >
        {children}
      </SmartLink>
    </li>
  );
}

export function ParentFooter() {
  return (
    <footer className="border-t border-line" data-ga-section="footer">
      <div
        className="container-x grid gap-10 py-14 md:grid-cols-4"
        style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom))" }}
      >
        <div>
          <Link href={parent("/")} aria-label="GAMYAA — home" className="inline-flex min-h-11 items-center gap-3">
            <LogoMark className="h-8 w-auto" />
            <LogoWord className="h-3 w-auto" />
          </Link>
        </div>
        <Col title="Businesses">
          <Item href={aero("/")} ga={{ event: "view_aerosystems" }}>
            {BRAND.aero}
          </Item>
          <Item href={parent("/ventures")} ga={{ event: "view_ventures" }}>
            {BRAND.ventures}
          </Item>
        </Col>
        <Col title="Ecosystem Initiative">
          <Item
            href={EXTERNAL.evSociety}
            ga={{ event: "partner_click", params: { partner_name: "EV Society", destination: EXTERNAL.evSociety } }}
          >
            EV Society™
          </Item>
        </Col>
        <Col title="Company">
          <Item href={parent("/privacy")}>Privacy</Item>
          <Item href={parent("/terms")}>Terms</Item>
          <Item href={parent("/contact")}>Contact</Item>
        </Col>
      </div>
      <div className="border-t border-line">
        <p className="container-x py-6 text-xs text-subtle">
          © {BRAND.copyrightYear} {BRAND.parent}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function AeroFooter() {
  return (
    <footer className="border-t border-line" data-ga-section="footer">
      <div className="container-x py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href={aero("/")} aria-label="Gamyaa AeroSystems — home" className="inline-flex min-h-11 items-center gap-3">
              <LogoMark className="h-8 w-auto" />
              <span className="flex flex-col gap-[5px]">
                <LogoWord className="h-[10px] w-auto self-start" />
                <span className="font-mono text-[0.625rem] uppercase leading-none tracking-[0.28em] text-muted">
                  AeroSystems
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">Aerospace &amp; Defence Engineering Technology</p>
            <address className="mt-6 space-y-0.5 text-sm not-italic text-ink-2">
              <p>{CONTACT.location}</p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-9 items-center hover:text-ink">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex min-h-9 items-center hover:text-ink">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
            </address>
          </div>

          <Col title="Products">
            <Item href={aero("/daqip")}>DAQIP™</Item>
            <Item href={aero("/aircert-ai")}>AirCert AI™</Item>
          </Col>

          <Col title="Solutions">
            <Item href={aero("/solutions/first-article-inspection")}>FAI</Item>
            <Item href={aero("/solutions/inspection-intelligence")}>Inspection Intelligence</Item>
            <Item href={aero("/solutions/airworthiness-certification")}>Airworthiness Certification</Item>
            <Item href={aero("/solutions/engineering-assurance")}>Engineering Assurance</Item>
          </Col>

          <div className="space-y-10">
            <Col title="Engineering Initiatives">
              <Item href={EXTERNAL.aerospaceCybersecurity} ga={{ event: "aerospace_cybersecurity_click" }}>
                Aerospace Cybersecurity
              </Item>
              <Item href={EXTERNAL.internships} ga={{ event: "internship_outbound_click" }}>
                Internships
              </Item>
            </Col>
            <Col title="Partners & Ecosystem">
              {PARTNERS.map((p) => (
                <Item
                  key={p.href}
                  href={p.href}
                  ga={{ event: "partner_click", params: { partner_name: p.analyticsName, destination: p.href } }}
                >
                  {p.name}
                </Item>
              ))}
            </Col>
          </div>

          <Col title="Company">
            <Item href={aero("/about")}>About</Item>
            <Item href={aero("/about#leadership")}>Leadership</Item>
            <Item href={aero("/careers")}>Careers</Item>
            <Item href={aero("/contact")}>Contact</Item>
            <Item href={parent("/privacy")}>Privacy</Item>
            <Item href={parent("/terms")}>Terms</Item>
            <Item href={parent("/")}>GAMYAA</Item>
          </Col>
        </div>
      </div>
      <div className="border-t border-line">
        <div
          className="container-x flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <p>
            © {BRAND.copyrightYear} {aeroLegalName}. All rights reserved.
          </p>
          <p>Bangalore, India · Designed by Gamyaa AeroSystems</p>
        </div>
      </div>
    </footer>
  );
}
