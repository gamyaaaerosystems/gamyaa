import { INTERESTS, type InterestValue } from "@/content/company";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  interest: InterestValue | "";
  message: string;
  /** Honeypot: must stay empty. */
  website: string;
  /** Client timestamp when the form was rendered (ms). */
  startedAt: number;
  formName: "aerosystems_contact" | "gamyaa_contact";
};

export type ContactField = "name" | "email" | "company" | "interest" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;
const INTEREST_VALUES = new Set<string>(INTERESTS.map((i) => i.value));

export const LIMITS = {
  name: 100,
  email: 200,
  company: 120,
  message: 4000,
  messageMin: 10,
} as const;

/** Shared by the client form and the API route so both enforce the same rules. */
export function validateContact(p: Partial<ContactPayload>): ContactErrors {
  const e: ContactErrors = {};
  const name = (p.name ?? "").trim();
  const email = (p.email ?? "").trim();
  const company = (p.company ?? "").trim();
  const message = (p.message ?? "").trim();

  if (name.length < 2) e.name = "Please enter your name.";
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (!email) e.email = "Please enter your work email.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";

  if (company.length > LIMITS.company) e.company = `Please keep the company name under ${LIMITS.company} characters.`;

  if (!p.interest || !INTEREST_VALUES.has(p.interest)) e.interest = "Please choose an area of interest.";

  if (message.length < LIMITS.messageMin) e.message = "Please add a short message (at least 10 characters).";
  else if (message.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`;

  return e;
}

export function interestLabel(value: string): string {
  return INTERESTS.find((i) => i.value === value)?.label ?? "General enquiry";
}
