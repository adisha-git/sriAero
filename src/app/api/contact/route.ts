import { Resend } from "resend";
import { airports } from "@/config/site";
import { checkRateLimit, clientIp, missingSecurityConfig, verifyTurnstile } from "@/lib/contact-security";
import { emailPattern, honeypotField, maxLengths, serviceOptions, turnstileTokenMaxLength } from "@/lib/quote";

// Enquiries are emailed through Resend. Credentials and addresses stay server-side:
// RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL, plus the Turnstile and Upstash keys (see .env.example).
// Order: rate limit → size/parse → honeypot → field validation → Turnstile → Resend.

const MAX_BODY_BYTES = 20_000;
const airportValues = new Set([...airports.map((a) => `${a.code} · ${a.name}`), "Other"]);

type Quote = {
  name: string;
  company: string;
  phone: string;
  email: string;
  aircraft: string;
  airport: string;
  airportOther: string;
  services: string[];
  date: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof Quote, string>>;

/** Trims a value and strips control characters; keeps newlines only where asked. */
function clean(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  const stripped = multiline
    ? value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim();
}

function parse(body: Record<string, unknown>): { quote: Quote; errors: FieldErrors } {
  const quote: Quote = {
    name: clean(body.name),
    company: clean(body.company),
    phone: clean(body.phone),
    email: clean(body.email),
    aircraft: clean(body.aircraft),
    airport: clean(body.airport),
    airportOther: clean(body.airportOther),
    services: Array.isArray(body.services) ? body.services.map((s) => clean(s)) : [],
    date: clean(body.date),
    message: clean(body.message, true),
  };

  const e: FieldErrors = {};
  const tooLong = (k: keyof typeof maxLengths) => quote[k].length > maxLengths[k];

  if (quote.name.length < 2 || tooLong("name")) e.name = "Please enter your name.";
  if (tooLong("company")) e.company = "Company name is too long.";
  const digits = quote.phone.replace(/\D/g, "").length;
  if (digits < 10 || digits > 15 || tooLong("phone")) e.phone = "Please enter a phone number, including area code.";
  if (!emailPattern.test(quote.email) || tooLong("email")) e.email = "Please enter a valid email address.";
  if (quote.aircraft.length < 2 || tooLong("aircraft")) e.aircraft = "Please tell us the aircraft type or registration.";
  if (!airportValues.has(quote.airport)) e.airport = "Please choose a home airport.";
  if (quote.airport === "Other") {
    if (quote.airportOther.length < 2 || tooLong("airportOther")) e.airportOther = "Please tell us which airport.";
  } else {
    quote.airportOther = "";
  }
  if (quote.services.length === 0 || quote.services.some((s) => !serviceOptions.includes(s))) {
    e.services = "Choose at least one service.";
  }
  quote.services = [...new Set(quote.services)];
  if (quote.date) {
    // Allow yesterday (UTC) so visitors in North American time zones aren't rejected late in the day.
    const earliest = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(quote.date) || Number.isNaN(Date.parse(quote.date)) || quote.date < earliest) {
      e.date = "Please choose a date in the future.";
    }
  }
  if (tooLong("message")) e.message = `Please keep this under ${maxLengths.message} characters.`;

  return { quote, errors: e };
}

function emailText(q: Quote): string {
  const airport = q.airport === "Other" ? `Other: ${q.airportOther}` : q.airport;
  return [
    "New quote request from the SriAero website",
    "",
    `Name:            ${q.name}`,
    `Company:         ${q.company || "—"}`,
    `Phone:           ${q.phone}`,
    `Email:           ${q.email}`,
    `Aircraft:        ${q.aircraft}`,
    `Home airport:    ${airport}`,
    `Preferred date:  ${q.date || "—"}`,
    "",
    "Services wanted:",
    ...q.services.map((s) => `  - ${s}`),
    "",
    "Message:",
    q.message || "—",
    "",
    "Reply to this email to respond directly to the customer.",
  ].join("\n");
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

const securityUnavailable = () =>
  json(
    {
      ok: false,
      error: "security_unavailable",
      message: "Our spam protection is temporarily unavailable, so your request wasn't sent. Please try again in a few minutes.",
    },
    503,
  );

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  const missingSecurity = missingSecurityConfig();
  if (!apiKey || !from || !to || missingSecurity.length > 0) {
    console.error("[contact] Missing configuration. Check RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL", missingSecurity.join(", "));
    return json({ ok: false, error: "not_configured" }, 500);
  }

  // Rate limit every request before any parsing or third-party calls.
  const ip = clientIp(request);
  const limit = await checkRateLimit(ip);
  if (limit.ok === "unavailable") {
    console.error("[contact] Rate limiter unavailable.");
    return securityUnavailable();
  }
  if (!limit.ok) {
    const minutes = Math.ceil(limit.retryAfterSeconds / 60);
    return Response.json(
      {
        ok: false,
        error: "rate_limited",
        message: `Too many quote requests from your network. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Body is not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_request" }, 400);
  }

  // Honeypot filled in: answer like a success so bots don't learn to adapt, but send nothing.
  if (clean(body[honeypotField])) return json({ ok: true });

  const { quote, errors } = parse(body);
  if (Object.keys(errors).length > 0) return json({ ok: false, error: "invalid_fields", fields: errors }, 400);

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token || token.length > turnstileTokenMaxLength) {
    return json(
      { ok: false, error: "verification_required", message: "Please complete the security check, then send your request again." },
      400,
    );
  }
  const verification = await verifyTurnstile(token, ip);
  if (verification === "unavailable") {
    console.error("[contact] Turnstile verification unavailable.");
    return securityUnavailable();
  }
  if (verification === "invalid") {
    return json(
      { ok: false, error: "verification_failed", message: "The security check failed or expired. Please complete it again, then resend." },
      403,
    );
  }

  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: quote.email,
      subject: `Quote request: ${quote.name} · ${quote.aircraft}`.slice(0, 200),
      text: emailText(quote),
    });
    if (error || !data) {
      // Log the provider's error type only, never the enquiry itself.
      console.error("[contact] Resend rejected the email:", error?.name, error?.statusCode);
      return json({ ok: false, error: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] Resend request failed:", err instanceof Error ? err.name : "unknown error");
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}
