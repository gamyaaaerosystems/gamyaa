import { NextResponse, type NextRequest } from "next/server";
import { interestLabel, validateContact, type ContactPayload } from "@/lib/contact-schema";

/**
 * Contact form endpoint.
 *
 * Protections: same-origin check (CSRF), JSON-only, body size limit, per-IP rate
 * limit, honeypot + minimum fill time (spam), shared server-side validation.
 *
 * Delivery: set RESEND_API_KEY, CONTACT_FROM_EMAIL (verified sender) and optionally
 * CONTACT_TO_EMAIL. Without them, production responds 503 and the form shows the
 * direct email / phone fallback.
 */

const MAX_BODY = 10_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;

// Per-instance limiter. For multi-instance production, pair with Vercel Firewall
// rate limiting or a shared store (see implementation report).
const hits = new Map<string, number[]>();

const ALLOWED_HOSTS = new Set(["gamyaa.in", "www.gamyaa.in", "aerosystems.gamyaa.in"]);

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(req: NextRequest): boolean {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return o.host === host || ALLOWED_HOSTS.has(o.host);
  } catch {
    return false;
  }
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ ok: false, error: "rejected" }, 403);
  if (!(req.headers.get("content-type") ?? "").includes("application/json"))
    return json({ ok: false, error: "rejected" }, 415);

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "rejected" }, 413);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let payload: Partial<ContactPayload>;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "rejected" }, 400);
  }

  // Spam signals: respond as if successful so bots learn nothing.
  const filledTooFast =
    typeof payload.startedAt !== "number" || Date.now() - payload.startedAt < MIN_FILL_MS;
  if ((payload.website ?? "").trim() !== "" || filledTooFast) return json({ ok: true });

  const fields = validateContact(payload);
  if (Object.keys(fields).length > 0) return json({ ok: false, error: "validation", fields }, 422);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "gamyaa.aerosystems@gmail.com";

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== "production") {
      // Development: accept without delivering. Never log the message contents.
      console.info("[contact] delivery not configured; accepted test submission");
      return json({ ok: true, delivered: false });
    }
    return json({ ok: false, error: "delivery_unavailable" }, 503);
  }

  const name = payload.name!.trim();
  const email = payload.email!.trim();
  const company = (payload.company ?? "").trim();
  const text = [
    `Form: ${payload.formName === "gamyaa_contact" ? "gamyaa.in/contact" : "gamyaa.in/aerosystems/contact"}`,
    `Interest: ${interestLabel(payload.interest ?? "")}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    "",
    payload.message!.trim(),
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry — ${interestLabel(payload.interest ?? "")}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error(`[contact] delivery failed with status ${res.status}`);
      return json({ ok: false, error: "server" }, 502);
    }
  } catch (err) {
    console.error("[contact] delivery error", err instanceof Error ? err.name : "unknown");
    return json({ ok: false, error: "server" }, 502);
  }

  return json({ ok: true });
}
