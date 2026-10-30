import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, Notice } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/shared";
import { pageMetadata } from "@/lib/seo";
import { CONTACT, parent } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Notice | GAMYAA",
  description:
    "How gamyaa.in uses Google Analytics 4, cookies, local storage and contact form data, and how to exercise your privacy rights.",
  href: parent("/privacy"),
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "GAMYAA", href: parent("/") },
              { name: "Privacy", href: parent("/privacy") },
            ]}
          />
        }
        eyebrow="Legal"
        title="Privacy Notice"
        lede="This notice explains what this website collects, why, and the choices you have. It covers gamyaa.in, including Gamyaa AeroSystems and Gamyaa Ventures pages."
      />
      <Container className="pb-20">
        <div className="max-w-3xl">
          <Notice>
            Draft for legal review. This notice reflects how the website is built today and must be reviewed by
            qualified counsel (including against India&apos;s Digital Personal Data Protection Act, 2023) before
            public launch.
          </Notice>
          <div className="prose-body mt-10">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-subtle">Last updated: October 2026</p>

            <h2>Who we are</h2>
            <p>
              This website is operated by GAMYAA and GAMYAA Aero Systems Private Limited, Bangalore, India. For privacy questions,
              email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>

            <h2>Analytics (Google Analytics 4)</h2>
            <p>
              We use Google Analytics 4 to understand how the site is used: which pages are visited, which links and
              buttons are used, and general device and location information at country or city level. Google
              Analytics sets first-party cookies (for example <code>_ga</code> and <code>_ga_*</code>) to distinguish
              visits.
            </p>
            <p>We deliberately do not send any of the following to Google Analytics:</p>
            <ul>
              <li>names, email addresses or phone numbers, including anything typed into forms;</li>
              <li>engineering drawings, file names, part numbers, measurements or CMM data;</li>
              <li>customer project identifiers, programme names, requirement content or test results;</li>
              <li>certification identifiers, document titles or authentication identifiers.</li>
            </ul>
            <p>
              Event data is limited to an allow-list of technical fields such as the page path, the label of the
              button used, the destination domain of an outbound link and the selected colour theme. Links that
              open your email app or dialler are counted, but the address or number is never recorded.
            </p>

            <h2>Cookies and local storage</h2>
            <ul>
              <li>
                <strong>Analytics cookies</strong> set by Google Analytics, as described above.
              </li>
              <li>
                <strong>Theme preference</strong> stored in your browser&apos;s local storage under the key{" "}
                <code>gamyaa-theme</code> (light, dark or system). It never leaves your device.
              </li>
            </ul>
            <p>
              The site is built so that a consent banner can be enabled to load analytics only after you opt in.
              You can also block or delete cookies in your browser settings, or use Google&apos;s opt-out browser
              add-on.
            </p>

            <h2>Contact form</h2>
            <p>
              When you use the contact form, we receive your name, work email, company, area of interest and
              message, and use them only to reply to you. Please do not send drawings, part numbers or controlled
              technical data through the form; file uploads are not accepted. Messages are delivered to our team by
              email through a transactional email provider.
            </p>

            <h2>Third-party links</h2>
            <p>
              This site links to other websites, including aerospace.gamyaa.in, EV Society™, iTelematics and
              LinkedIn. Their privacy practices are their own.
            </p>

            <h2>Retention</h2>
            <p>
              Contact enquiries are kept for as long as needed to respond and to maintain a record of business
              correspondence, and are then deleted. Google Analytics data retention is set in the Google Analytics
              property (to be confirmed at launch, for example 14 months).
            </p>

            <h2>Your rights</h2>
            <p>
              You may ask to access, correct or delete personal data you have sent us, or withdraw consent where we
              rely on it. Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will respond within a
              reasonable time.
            </p>

            <h2>Security</h2>
            <p>
              The site is served over HTTPS with security headers including a Content Security Policy, and the
              contact form is protected against cross-site requests and automated abuse.
            </p>

            <h2>Changes</h2>
            <p>We will update this page when our practices change and revise the date above.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
