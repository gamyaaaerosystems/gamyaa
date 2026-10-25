import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark, LogoWord } from "@/components/brand/logo";
import { ArrowUpRight } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/primitives";
import { aero, aeroLegalName, BRAND, CONTACT, DESIGNER, EXTERNAL, parent, PARENT_HOME } from "@/lib/site";

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <ul className="space-y-0.5 text-sm">{children}</ul>
    </div>
  );
}

function Item({
  href,
  children,
  ga,
  external,
}: {
  href: string;
  children: ReactNode;
  ga?: Parameters<typeof SmartLink>[0]["ga"];
  /** Show ↗ for sites outside GAMYAA (they open in a new tab). */
  external?: boolean;
}) {
  return (
    <li>
      <SmartLink
        href={href}
        ga={ga}
        className="inline-flex min-h-9 items-center gap-1.5 text-ink-2 transition-colors hover:text-ink"
      >
        {children}
        {external ? <ArrowUpRight size={12} className="text-subtle" /> : null}
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
          {/* Mirrors homepage Division 03; external site, tracked as an outbound click (domain only). */}
          <Item href={EXTERNAL.uflight} external>
            UFlight™
          </Item>
        </Col>
        <Col title="Ecosystem Initiative">
          <Item
            href={EXTERNAL.evSociety}
            ga={{ event: "partner_click", params: { partner_name: "EV Society", destination: EXTERNAL.evSociety } }}
            external
          >
            EV Society™
          </Item>
          <Item
            href={EXTERNAL.evEngineer}
            ga={{ event: "partner_click", params: { partner_name: "EV.ENGINEER", destination: EXTERNAL.evEngineer } }}
            external
          >
            EV.ENGINEER™
          </Item>
        </Col>
        <Col title="Company">
          <Item href={parent("/privacy")}>Privacy</Item>
          <Item href={parent("/terms")}>Terms</Item>
          <Item href={parent("/contact")}>Contact</Item>
        </Col>
      </div>
      <div className="border-t border-line">
        <div
          className="container-x flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <p>
            © {BRAND.copyrightYear} {BRAND.parent}. All rights reserved.
          </p>
          <PoweredBy />
        </div>
      </div>
    </footer>
  );
}

/** Bottom-row credit shared by both footers: "Powered by EV.ENGINEER™, Bangalore, India". */
function PoweredBy() {
  return (
    <p>
      Powered by{" "}
      <SmartLink
        href={DESIGNER.credentialHref}
        label="ev_engineer"
        ga={{ event: "designer_profile_click", params: { source_location: "footer" } }}
        className="inline-flex min-h-9 items-center text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink"
      >
        {DESIGNER.credential}
      </SmartLink>
      , Bangalore, India
    </p>
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
            <p className="mt-4 max-w-xs text-sm text-muted">
              Engineering Assurance Intelligence
              <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">
                Defence · Aerospace · Space
              </span>
            </p>
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

          <div className="space-y-10">
            <Col title="Platforms">
              <Item href={aero("/aeaip")}>AEAIP™</Item>
              <Item href={aero("/daqip")}>DAQIP™</Item>
              <Item href={aero("/aircert-ai")}>AirCert AI™</Item>
              <Item href={aero("/products")}>All products</Item>
            </Col>
            <Col title="AEAIP™ Learn">
              <Item href={aero("/aeaip/demo")} ga={{ event: "aeaip_demo_open", params: { source_location: "footer" } }}>
                Interactive Assurance Demo
              </Item>
              <Item href={aero("/aeaip/review-gates")}>Review gates</Item>
              <Item href={aero("/aeaip/verification-validation")}>Verification &amp; validation</Item>
              <Item href={aero("/aeaip/configuration-assurance")}>Configuration assurance</Item>
              <Item href={aero("/aeaip/glossary")}>Glossary</Item>
              <Item href={aero("/aeaip/strategy")}>Strategy</Item>
            </Col>
          </div>

          <Col title="Solutions">
            <Item href={aero("/solutions/first-article-inspection")}>First Article Inspection</Item>
            <Item href={aero("/solutions/inspection-intelligence")}>Inspection Intelligence</Item>
            <Item href={aero("/solutions/airworthiness-certification")}>Airworthiness Certification</Item>
            <Item href={aero("/solutions/engineering-assurance")}>Engineering Assurance</Item>
          </Col>

          <Col title="Engineering Initiatives">
            <Item href={EXTERNAL.aerospaceCybersecurity} ga={{ event: "aerospace_cybersecurity_click" }}>
              Aerospace Cybersecurity
            </Item>
            <Item href={EXTERNAL.spaceResearch}>Space Research</Item>
            <Item href={EXTERNAL.internships} ga={{ event: "internship_outbound_click" }}>
              Internships
            </Item>
          </Col>

          <Col title="Company">
            <Item href={aero("/about")}>About</Item>
            <Item href={aero("/about#leadership")}>Leadership</Item>
            <Item href={aero("/careers")}>Careers</Item>
            <Item href={aero("/contact")}>Contact</Item>
            <Item href={parent("/privacy")}>Privacy</Item>
            <Item href={parent("/terms")}>Terms</Item>
            <Item href={PARENT_HOME}>GAMYAA</Item>
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
          <PoweredBy />
        </div>
      </div>
    </footer>
  );
}
