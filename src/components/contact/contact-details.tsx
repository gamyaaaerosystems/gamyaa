import { CONTACT } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";

export function ContactDetails() {
  return (
    <div className="ticks border border-line bg-surface p-6 sm:p-8" data-ga-section="contact_details">
      <p className="eyebrow">Direct contact</p>
      <h2 className="mt-4 text-2xl font-medium tracking-tight text-ink">{CONTACT.person}</h2>
      <p className="mt-1 text-[0.9375rem] text-ink-2">{CONTACT.organisation}</p>
      <address className="mt-6 space-y-1 not-italic">
        <p className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-ink-2">
          <PinIcon size={18} className="shrink-0 text-subtle" />
          {CONTACT.location}
        </p>
        <p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex min-h-11 items-center gap-3 break-all text-[0.9375rem] text-ink hover:text-accent"
          >
            <MailIcon size={18} className="shrink-0 text-subtle" />
            {CONTACT.email}
          </a>
        </p>
        <p>
          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-ink hover:text-accent"
          >
            <PhoneIcon size={18} className="shrink-0 text-subtle" />
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </address>
    </div>
  );
}
