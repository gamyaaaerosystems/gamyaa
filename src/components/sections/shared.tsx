import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { CtaLocation, DemoProduct, ProblemTopic } from "@/lib/analytics";
import { aero } from "@/lib/site";
import { LEADERSHIP, PARTNERS } from "@/content/company";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader, SmartLink } from "@/components/ui/primitives";
import { LinkedInIcon } from "@/components/ui/icons";

/* --------------------------------------------------------- Leadership */

/** Pass `id="leadership"` only on the About page (footer links to /about#leadership). */
export function LeadershipSection({ id }: { id?: string }) {
  return (
    <Section id={id} labelledBy="leadership-title" section="leadership">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="Gamyaa AeroSystems" id="leadership-title" title="Leadership" />
        </div>
        <ul className="border-b border-line lg:col-span-8">
          {LEADERSHIP.map((p) => (
            <li key={p.name} className="grid gap-x-8 gap-y-2 border-t border-line py-6 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {p.role}
                  {p.credential ? (
                    <>
                      ,{" "}
                      <SmartLink
                        href={p.credential.href}
                        label="ev_engineer"
                        className="text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink"
                      >
                        {p.credential.label}
                      </SmartLink>
                    </>
                  ) : null}
                </p>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">{p.summary}</p>
              </div>
              {p.linkedin ? (
                <SmartLink
                  href={p.linkedin}
                  label="linkedin"
                  ga={{ event: "leadership_link_click", params: { person_name: p.name } }}
                  className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-ink-2 hover:text-ink"
                  ariaLabel={`${p.name} on LinkedIn (opens in a new tab)`}
                >
                  <LinkedInIcon size={15} />
                  LinkedIn
                </SmartLink>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------- Partners */

/** Verified partners only, by category. Planned tool integrations are never shown as partners. */
export function PartnersSection() {
  return (
    <Section id="partners" labelledBy="partners-title" section="partners">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="Ecosystem" id="partners-title" title="Partners & Ecosystem" />
        </div>
        <ul className="border-b border-line lg:col-span-8">
          {PARTNERS.map((p) => (
            <li key={p.href} className="grid gap-x-8 gap-y-3 border-t border-line py-6 md:grid-cols-[12rem_1fr]">
              <p className="text-sm text-muted">{p.category}</p>
              <div>
                <h3 className="text-lg font-medium text-ink">{p.name}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
                  {(p.actions ?? [{ label: p.domain, href: p.href, caption: "", arrow: "external" as const }]).map((a) => (
                    <ArrowLink
                      key={a.href}
                      href={a.href}
                      arrow={a.arrow}
                      label={`${p.analyticsName}: ${a.label}`}
                      ga={{ event: "partner_click", params: { partner_name: p.analyticsName, destination: a.href } }}
                    >
                      {a.label}
                    </ArrowLink>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ FAQ */

export function FaqSection({
  title,
  eyebrow = "Questions",
  items,
  id = "faq",
}: {
  title: string;
  eyebrow?: string;
  items: ReadonlyArray<{ q: string; a: string }>;
  id?: string;
}) {
  return (
    <Section id={id} section="faq">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow={eyebrow} title={title} />
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {items.map((i) => (
            <div key={i.q} className="py-6">
              <h3 className="text-lg font-medium text-ink">{i.q}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{i.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------- CTA band */

export function CtaBand({
  title,
  body,
  primary,
  secondary,
  actions,
}: {
  title: string;
  body?: ReactNode;
  primary?: { label: string; href: string; ga?: Parameters<typeof ButtonLink>[0]["ga"] };
  secondary?: { label: string; href: string; ga?: Parameters<typeof ButtonLink>[0]["ga"] };
  /** Custom action row (e.g. <CommercialCtas />) instead of primary/secondary. */
  actions?: ReactNode;
}) {
  return (
    <Section section="cta">
      <Container>
        <div className="ticks relative overflow-hidden border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
          <div className="relative max-w-2xl">
            <h2 className="heading text-3xl text-ink sm:text-4xl">
              {title}
            </h2>
            {body ? <div className="lede mt-4">{body}</div> : null}
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              {actions}
              {primary ? (
                <ButtonLink href={primary.href} ga={primary.ga} label={primary.label}>
                  {primary.label}
                </ButtonLink>
              ) : null}
              {secondary ? (
                <ButtonLink href={secondary.href} variant="secondary" ga={secondary.ga} label={secondary.label}>
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------- Page hero (inner) */

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  breadcrumbs,
  className,
  aside,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
  /** Optional visual beside the heading on large screens (stacked below on phones). */
  aside?: ReactNode;
}) {
  const text = (
    <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
      {eyebrow ? <div className="kicker mb-6 flex-wrap">{eyebrow}</div> : null}
      <h1 className="display text-[2.25rem] text-ink sm:text-5xl lg:text-[3.75rem]">{title}</h1>
      {lede ? <div className="lede mt-6 max-w-2xl">{lede}</div> : null}
      {children}
    </div>
  );
  return (
    <section className={cn("relative overflow-hidden", className)} data-ga-section="hero">
      <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
      <Container className="relative pb-16 pt-10 md:pb-24 md:pt-14">
        {breadcrumbs}
        {aside ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {text}
            <div className="lg:col-span-5">{aside}</div>
          </div>
        ) : (
          text
        )}
      </Container>
    </section>
  );
}

export const internalContact = (interest?: string) =>
  interest ? `${aero("/contact")}?interest=${interest}` : aero("/contact");

/* ------------------------------------------------------ Commercial CTAs */

export const DEMO_HREF = internalContact("daqip");
export const PROBLEM_HREF = internalContact("quality-problem");

/** GA config for "Request a DAQIP Demo" (or AirCert AI interest). */
export const demoGa = (location: CtaLocation, product: DemoProduct = "daqip") => ({
  event: "demo_interest" as const,
  params: { product, cta_location: location },
});

/** GA config for "Discuss an Aerospace Quality Problem". */
export const problemGa = (location: CtaLocation, topic: ProblemTopic = "general") => ({
  event: "problem_discussion_click" as const,
  params: { topic, cta_location: location },
});

/** The two commercial actions used across AeroSystems. */
export function CommercialCtas({
  location,
  topic = "general",
  product = "daqip",
  className,
}: {
  location: CtaLocation;
  topic?: ProblemTopic;
  product?: DemoProduct;
  className?: string;
}) {
  const demo =
    product === "aircert"
      ? { label: "Register interest in AirCert AI", href: internalContact("aircert") }
      : { label: "Request a DAQIP Demo", href: DEMO_HREF };
  return (
    <div className={cn("flex flex-col gap-3 xs:flex-row xs:flex-wrap", className)}>
      <ButtonLink href={demo.href} ga={demoGa(location, product)} label={demo.label}>
        {demo.label}
      </ButtonLink>
      <ButtonLink href={PROBLEM_HREF} variant="secondary" ga={problemGa(location, topic)} label="Discuss an Aerospace Quality Problem">
        Discuss an Aerospace Quality Problem
      </ButtonLink>
    </div>
  );
}
