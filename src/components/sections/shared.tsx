import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { aero, EXTERNAL } from "@/lib/site";
import { LEADERSHIP, PARTNERS } from "@/content/company";
import { ArrowLink, ButtonLink, Container, Section, SectionHeader, SmartLink } from "@/components/ui/primitives";
import { ArrowUpRight, LinkedInIcon } from "@/components/ui/icons";

/* --------------------------------------------------------- Leadership */

/** Pass `id="leadership"` only on the About page (footer links to /about#leadership). */
export function LeadershipSection({ id }: { id?: string }) {
  return (
    <Section id={id} section="leadership">
      <Container>
        <SectionHeader eyebrow="Leadership" title="The team building Gamyaa AeroSystems" />
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {LEADERSHIP.map((p) => (
            <li key={p.name} className="flex flex-col bg-surface p-6 sm:p-8">
              <span
                aria-hidden
                className="grid size-14 place-items-center border border-line-strong font-mono text-sm tracking-[0.1em] text-ink-2"
              >
                {p.initials}
              </span>
              <h3 className="mt-6 text-lg font-medium text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.role}</p>
              {p.linkedin ? (
                <SmartLink
                  href={p.linkedin}
                  label="linkedin"
                  ga={{ event: "leadership_link_click", params: { person_name: p.name } }}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm text-ink-2 hover:text-ink"
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

export function PartnersSection() {
  return (
    <Section section="partners">
      <Container>
        <SectionHeader eyebrow="Ecosystem" title="Partners & Ecosystem" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {PARTNERS.map((p) => (
            <li key={p.href}>
              <SmartLink
                href={p.href}
                label={p.analyticsName}
                ga={{ event: "partner_click", params: { partner_name: p.analyticsName, destination: p.href } }}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-lg font-medium text-ink">{p.name}</span>
                  <ArrowUpRight className="mt-1 shrink-0 text-subtle transition-colors group-hover:text-ink" />
                </span>
                <span className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{p.description}</span>
                <span className="mt-6 font-mono text-xs text-subtle">{p.domain}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------ Engineering Initiatives */

export function EngineeringInitiatives() {
  const items = [
    {
      title: "Aerospace Cybersecurity",
      body: "Engineering cybersecurity for connected aerospace systems, avionics, telemetry, embedded systems and digital engineering environments.",
      cta: "Explore Aerospace Cybersecurity",
      href: EXTERNAL.aerospaceCybersecurity,
      event: "aerospace_cybersecurity_click" as const,
    },
    {
      title: "Engineering Internships",
      body: "Applied engineering programs across aerospace, defence, quality intelligence, airworthiness, cybersecurity, digital twins and advanced systems.",
      cta: "Explore Internships",
      href: EXTERNAL.internships,
      event: "internship_outbound_click" as const,
    },
  ];
  return (
    <Section section="engineering_initiatives">
      <Container>
        <SectionHeader eyebrow="Beyond the platforms" title="Engineering Initiatives" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <article key={i.title} className="card flex flex-col p-6 sm:p-8">
              <h3 className="text-xl font-medium tracking-tight text-ink">{i.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{i.body}</p>
              <ArrowLink href={i.href} ga={{ event: i.event }} label={i.cta} className="mt-6 self-start">
                {i.cta}
              </ArrowLink>
            </article>
          ))}
        </div>
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
}: {
  title: string;
  body?: ReactNode;
  primary: { label: string; href: string; ga?: Parameters<typeof ButtonLink>[0]["ga"] };
  secondary?: { label: string; href: string; ga?: Parameters<typeof ButtonLink>[0]["ga"] };
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
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href={primary.href} ga={primary.ga} label={primary.label}>
                {primary.label}
              </ButtonLink>
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
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)} data-ga-section="hero">
      <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
      <Container className="relative pb-14 pt-10 md:pb-20 md:pt-14">
        {breadcrumbs}
        <div className="max-w-4xl">
          {eyebrow ? <div className="eyebrow mb-5">{eyebrow}</div> : null}
          <h1 className="display text-[2.25rem] text-ink sm:text-5xl lg:text-[3.75rem]">{title}</h1>
          {lede ? <div className="lede mt-6 max-w-3xl">{lede}</div> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}

export const internalContact = (interest?: string) =>
  interest ? `${aero("/contact")}?interest=${interest}` : aero("/contact");
