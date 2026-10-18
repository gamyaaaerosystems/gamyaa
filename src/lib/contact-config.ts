import "server-only";

/**
 * The online contact form is shown only when email delivery is configured, so
 * visitors never see a form that cannot deliver. Evaluated at build time:
 * set RESEND_API_KEY and CONTACT_FROM_EMAIL, then redeploy. Until then the contact
 * pages offer Email Us / Call Us. CONTACT_FORM_FORCE=1 shows the form anyway (testing).
 */
export const CONTACT_FORM_ENABLED =
  Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL) ||
  process.env.CONTACT_FORM_FORCE === "1";
