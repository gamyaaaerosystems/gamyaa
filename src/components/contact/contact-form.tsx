"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { INTERESTS } from "@/content/company";
import { CONTACT, parent } from "@/lib/site";
import {
  LIMITS,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "interest", "message"];

const SERVER_MESSAGES: Record<string, string> = {
  rate_limited: "Too many messages were sent from this connection. Please try again in a few minutes.",
  delivery_unavailable: "The contact form is not accepting messages right now.",
  validation: "Some fields need attention.",
  rejected: "Your message could not be sent from this page.",
  server: "Something went wrong on our side.",
  network: "We could not reach the server. Please check your connection.",
};

export function ContactForm({
  formName,
  defaultInterest = "",
}: {
  formName: ContactPayload["formName"];
  defaultInterest?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);
  const uid = useId();
  const fid = (f: string) => `${uid}-${f}`;
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselect interest from ?interest=… without making the page dynamic.
  useEffect(() => {
    startedAt.current = Date.now();
    const q = new URLSearchParams(window.location.search).get("interest");
    // The select is uncontrolled; set the DOM value directly.
    if (q && interestRef.current && INTERESTS.some((i) => i.value === q)) interestRef.current.value = q;
  }, []);

  function onStart() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_name: formName });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: ContactPayload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      interest: String(fd.get("interest") ?? "") as ContactPayload["interest"],
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
      formName,
    };

    const v = validateContact(payload);
    setErrors(v);
    setServerError(null);
    if (Object.keys(v).length > 0) {
      track("form_error", { form_name: formName, error_type: "validation" });
      const first = FIELD_ORDER.find((f) => v[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: ContactErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        track("form_submit", { form_name: formName });
        formRef.current?.reset();
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      const code = data.error && SERVER_MESSAGES[data.error] ? data.error : "server";
      if (data.fields) setErrors(data.fields);
      setServerError(code);
      setStatus("error");
      track("form_error", { form_name: formName, error_type: code });
    } catch {
      setServerError("network");
      setStatus("error");
      track("form_error", { form_name: formName, error_type: "network" });
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-line bg-surface p-6 outline-none sm:p-8"
      >
        <p className="eyebrow">Message sent</p>
        <p className="mt-3 text-xl font-medium text-ink">Thank you. We will reply by email.</p>
        <p className="mt-2 text-[0.9375rem] text-ink-2">
          For anything urgent, call{" "}
          <a href={`tel:${CONTACT.phoneE164}`} className="text-accent underline">
            {CONTACT.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            started.current = false;
            startedAt.current = Date.now();
          }}
          className="btn btn-secondary mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass = (f: ContactField) =>
    cn(
      "mt-2 block w-full rounded-[2px] border bg-surface px-3.5 py-3 text-base text-ink placeholder:text-subtle",
      "focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
      errors[f] ? "border-[var(--danger)]" : "border-line-strong",
    );

  const err = (f: ContactField) =>
    errors[f] ? (
      <p id={fid(`${f}-error`)} className="mt-1.5 text-sm text-[var(--danger)]">
        {errors[f]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onFocus={onStart}
      onInput={onStart}
      aria-describedby={fid("note")}
      className="space-y-5"
    >
      {serverError ? (
        <div role="alert" className="border-l-2 border-[var(--danger)] bg-surface px-4 py-3 text-sm text-ink-2">
          <p className="font-medium text-ink">{SERVER_MESSAGES[serverError]}</p>
          <p className="mt-1">
            You can also email{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-accent underline">
              {CONTACT.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${CONTACT.phoneE164}`} className="text-accent underline">
              {CONTACT.phoneDisplay}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fid("name")} className="text-sm font-medium text-ink">
            Name <span className="text-subtle">(required)</span>
          </label>
          <input
            id={fid("name")}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? fid("name-error") : undefined}
            className={fieldClass("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={fid("email")} className="text-sm font-medium text-ink">
            Work email <span className="text-subtle">(required)</span>
          </label>
          <input
            id={fid("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? fid("email-error") : undefined}
            className={fieldClass("email")}
          />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fid("company")} className="text-sm font-medium text-ink">
            Company
          </label>
          <input
            id={fid("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? fid("company-error") : undefined}
            className={fieldClass("company")}
          />
          {err("company")}
        </div>
        <div>
          <label htmlFor={fid("interest")} className="text-sm font-medium text-ink">
            Interest <span className="text-subtle">(required)</span>
          </label>
          <select
            id={fid("interest")}
            name="interest"
            required
            ref={interestRef}
            defaultValue={defaultInterest}
            aria-invalid={errors.interest ? true : undefined}
            aria-describedby={errors.interest ? fid("interest-error") : undefined}
            className={cn(fieldClass("interest"), "appearance-none bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
              backgroundPosition: "calc(100% - 18px) 50%, calc(100% - 13px) 50%",
              backgroundSize: "5px 5px, 5px 5px",
            }}
          >
            <option value="">Select…</option>
            {INTERESTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
          {err("interest")}
        </div>
      </div>

      <div>
        <label htmlFor={fid("message")} className="text-sm font-medium text-ink">
          Message <span className="text-subtle">(required)</span>
        </label>
        <textarea
          id={fid("message")}
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? fid("message-error") : fid("message-hint")}
          className={cn(fieldClass("message"), "resize-y")}
        />
        {errors.message ? (
          err("message")
        ) : (
          <p id={fid("message-hint")} className="mt-1.5 text-sm text-subtle">
            A few lines about your team and what you would like to discuss.
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p id={fid("note")} className="text-xs leading-relaxed text-subtle">
        Please do not include engineering drawings, part numbers, programme names or controlled technical data in
        this form. File uploads are not accepted. We use your details only to reply. See our{" "}
        <a href={parent("/privacy")} className="underline">
          privacy notice
        </a>
        .
      </p>

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
