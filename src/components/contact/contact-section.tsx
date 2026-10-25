import type { AnalyticsEventName, AnalyticsParams } from "@/lib/analytics";
import { gaAttrs } from "@/lib/analytics";
import { CONTACT_FORM_ENABLED } from "@/lib/contact-config";
import { CONTACT } from "@/lib/site";
import { ArrowRight, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { BulletList, Container, Notice } from "@/components/ui/primitives";
import type { ContactPayload } from "@/lib/contact-schema";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { IntentHighlight } from "./intent-highlight";

export type ContactIntent = {
  interest: string;
  title: string;
  body: string;
  subject: string;
  /** `also` fires a second event with the same parameters (e.g. contact_intent_select). */
  ga: { event: AnalyticsEventName; params?: AnalyticsParams; also?: AnalyticsEventName };
};

const EMAIL_BODY = [
  "Company:",
  "Your role:",
  "What you would like to discuss:",
  "The problem or programme context (no controlled data):",
  "Timeline:",
  "",
  "(Please do not include drawings, part numbers, controlled technical data or proprietary engineering files.)",
].join("\n");

const mailto = (subject: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(EMAIL_BODY)}`;

const CONTROLLED_DATA_WARNING =
  "Do not email controlled technical data or proprietary engineering files until a secure method is agreed.";

/**
 * Contact actions + details. Shows the online form only when email delivery is
 * configured; otherwise offers Email Us / Call Us, so a broken form is never shown.
 * With many intents (`callCard={false}`), the phone number stays in the details panel.
 */
export function ContactSection({
  formName,
  intents,
  callCard = true,
}: {
  formName: ContactPayload["formName"];
  intents: ContactIntent[];
  callCard?: boolean;
}) {
  return (
    <section className="pb-20" data-ga-section="contact">
      <IntentHighlight />
      <Container>
        <h2 className="sr-only">How to reach us</h2>
        {/* Intent cards (plus "Call Us"): three across; two-by-two / four across when there are four. */}
        <ul
          className={
            !callCard ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : intents.length >= 3 ? "grid gap-4 md:grid-cols-2 xl:grid-cols-4" : "grid gap-4 md:grid-cols-3"
          }
        >
          {intents.map((i) => (
            <li key={i.interest}>
              {/* Plain <a>: a full load lets the form read ?interest, and mailto needs no router. */}
              <a
                href={CONTACT_FORM_ENABLED ? `?interest=${i.interest}#contact-form` : mailto(i.subject)}
                data-interest={i.interest}
                {...gaAttrs(i.ga.event, i.ga.params, i.ga.also)}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-line-strong data-[highlight=true]:border-accent data-[highlight=true]:bg-surface-accent sm:p-7"
              >
                <MailIcon size={20} className="text-subtle" />
                <span className="mt-5 text-lg font-medium leading-snug text-ink">{i.title}</span>
                <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">{i.body}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  {CONTACT_FORM_ENABLED ? "Use the form" : "Email Us"}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
          {callCard ? (
            <li>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="card group flex h-full flex-col p-6 transition-colors hover:border-line-strong sm:p-7"
              >
                <PhoneIcon size={20} className="text-subtle" />
                <span className="mt-5 text-lg font-medium leading-snug text-ink">Call Us</span>
                <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                  {CONTACT.person} ({CONTACT.role}), {CONTACT.organisation}. Indian business hours.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  {CONTACT.phoneDisplay}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ) : null}
        </ul>

        <Notice className="mt-6 max-w-3xl">{CONTROLLED_DATA_WARNING}</Notice>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ContactDetails />
          </div>
          <div className="lg:col-span-8">
            {CONTACT_FORM_ENABLED ? (
              <div id="contact-form" className="scroll-mt-24">
                <h2 className="sr-only">Send a message</h2>
                <ContactForm formName={formName} />
              </div>
            ) : (
              <div className="border border-line bg-surface p-6 sm:p-8">
                <h2 className="text-2xl font-medium tracking-tight text-ink">Email us</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  Write to{" "}
                  <a href={mailto("Enquiry — Gamyaa")} className="break-all text-accent underline">
                    {CONTACT.email}
                  </a>
                  . It helps to include:
                </p>
                <BulletList
                  className="mt-4"
                  items={[
                    "Your company and role",
                    "What you would like to discuss: engineering assurance, FAI and inspection, certification, a partnership or careers",
                    "How you handle it today, and your timeline",
                  ]}
                />
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  Please do not send engineering drawings, part numbers, programme names or controlled technical data
                  by email at this stage. We will agree a secure way to share engineering material if needed.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
