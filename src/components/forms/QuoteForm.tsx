"use client";

import { useRef, useState } from "react";
import { AlertTriangle, Loader2, Send } from "lucide-react";
import { airports, site } from "@/config/site";
import { emailPattern, honeypotField, maxLengths, serviceOptions, turnstileAction } from "@/lib/quote";
import { Turnstile, type TurnstileHandle } from "./Turnstile";

// Public by design: Turnstile site keys are embedded in the page. The secret key stays on the server.
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type Values = {
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

type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  name: "",
  company: "",
  phone: "",
  email: "",
  aircraft: "",
  airport: "",
  airportOther: "",
  services: [],
  date: "",
  message: "",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a phone number, including area code.";
  if (!emailPattern.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.aircraft.trim().length < 2) e.aircraft = "Please tell us the aircraft type or registration.";
  if (!v.airport) e.airport = "Please choose a home airport.";
  if (v.airport === "Other" && v.airportOther.trim().length < 2) e.airportOther = "Please tell us which airport.";
  if (v.services.length === 0) e.services = "Choose at least one service.";
  if (v.date && v.date < new Date().toISOString().slice(0, 10)) e.date = "Please choose a date in the future.";
  return e;
}

const fieldOrder: (keyof Values)[] = ["name", "company", "phone", "email", "aircraft", "airport", "airportOther", "services", "date", "message"];

export function QuoteForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentName, setSentName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const sending = useRef(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return; // already transmitting
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    if (!turnstileToken) {
      setErrorMessage("Please complete the security check, then send your request again.");
      setStatus("error");
      return;
    }

    const honeypot = new FormData(e.currentTarget).get(honeypotField) ?? "";
    sending.current = true;
    setErrorMessage("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, [honeypotField]: honeypot, turnstileToken }),
      });
      const result = (await res.json().catch(() => null)) as { ok?: boolean; fields?: Errors; message?: string } | null;
      if (!res.ok || !result?.ok) {
        // The server re-validates; show any field errors it found next to the fields.
        if (result?.fields && Object.keys(result.fields).length > 0) setErrors(result.fields);
        setErrorMessage(result?.message ?? "");
        turnstileRef.current?.reset(); // tokens are single-use; get a fresh one for the retry
        setStatus("error");
        return;
      }
      setSentName(values.name.trim().split(" ")[0]);
      setValues(initial);
      setErrors({});
      setTouched({});
      setStatus("sent");
      formRef.current?.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setErrorMessage("");
      turnstileRef.current?.reset();
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  if (status === "sent") return <Cleared name={sentName} />;

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined);
  const describe = (k: keyof Values) => (err(k) ? `${k}-error` : undefined);
  const inputClass = (k: keyof Values) =>
    `mt-2 block min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-navy placeholder:text-slate/60 transition-colors focus:border-horizon focus:outline-none focus-visible:outline-2 focus-visible:outline-horizon ${
      err(k) ? "border-red-700" : "border-aluminium"
    }`;

  return (
    <form
      ref={formRef}
      name="quote"
      method="POST"
      noValidate
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <p className="hidden" aria-hidden="true">
        <label>
          Leave this empty: <input name={honeypotField} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={err("name")}>
          <input id="name" name="name" data-field="name" maxLength={maxLengths.name} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} aria-invalid={!!err("name")} aria-describedby={describe("name")} aria-required="true" className={inputClass("name")} />
        </Field>
        <Field id="company" label="Company" hint="Optional" error={err("company")}>
          <input id="company" name="company" data-field="company" maxLength={maxLengths.company} autoComplete="organization" value={values.company} onChange={(e) => set("company", e.target.value)} className={inputClass("company")} />
        </Field>
        <Field id="phone" label="Phone" required error={err("phone")}>
          <input id="phone" name="phone" data-field="phone" maxLength={maxLengths.phone} type="tel" inputMode="tel" autoComplete="tel" placeholder="(403) 000-0000" value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} aria-invalid={!!err("phone")} aria-describedby={describe("phone")} aria-required="true" className={inputClass("phone")} />
        </Field>
        <Field id="email" label="Email" required error={err("email")}>
          <input id="email" name="email" data-field="email" maxLength={maxLengths.email} type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} aria-invalid={!!err("email")} aria-describedby={describe("email")} aria-required="true" className={inputClass("email")} />
        </Field>
        <Field id="aircraft" label="Aircraft type or registration" required error={err("aircraft")}>
          <input id="aircraft" name="aircraft" data-field="aircraft" maxLength={maxLengths.aircraft} placeholder="e.g. King Air 350 · C-GXXX" value={values.aircraft} onChange={(e) => set("aircraft", e.target.value)} onBlur={() => blur("aircraft")} aria-invalid={!!err("aircraft")} aria-describedby={describe("aircraft")} aria-required="true" className={inputClass("aircraft")} />
        </Field>
        <Field id="airport" label="Home airport" required error={err("airport")}>
          <select id="airport" name="airport" data-field="airport" value={values.airport} onChange={(e) => set("airport", e.target.value)} onBlur={() => blur("airport")} aria-invalid={!!err("airport")} aria-describedby={describe("airport")} aria-required="true" className={`${inputClass("airport")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231E4D7B%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
            <option value="">Select an airport</option>
            {airports.map((a) => (
              <option key={a.code} value={`${a.code} · ${a.name}`}>
                {a.code} · {a.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
        {values.airport === "Other" && (
          <Field id="airportOther" label="Which airport?" required error={err("airportOther")} className="sm:col-span-2">
            <input id="airportOther" name="airport_other" data-field="airportOther" maxLength={maxLengths.airportOther} value={values.airportOther} onChange={(e) => set("airportOther", e.target.value)} onBlur={() => blur("airportOther")} aria-invalid={!!err("airportOther")} aria-describedby={describe("airportOther")} aria-required="true" className={inputClass("airportOther")} />
          </Field>
        )}
      </div>

      <fieldset aria-describedby={describe("services")} aria-invalid={!!err("services")}>
        <legend className="font-display font-medium text-navy">
          Services wanted <span className="text-red-700" aria-hidden="true">*</span>
          <span className="sr-only"> (required, choose at least one)</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((s, i) => {
            const checked = values.services.includes(s);
            return (
              <label
                key={s}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-[0.94rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber ${
                  checked ? "border-horizon bg-horizon/5 text-navy" : "border-aluminium bg-white text-slate hover:border-horizon/50"
                }`}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={s}
                  data-field={i === 0 ? "services" : undefined}
                  checked={checked}
                  onChange={() => {
                    setTouched((t) => ({ ...t, services: true }));
                    set("services", checked ? values.services.filter((x) => x !== s) : [...values.services, s]);
                  }}
                  className="size-4 shrink-0 accent-horizon"
                />
                {s}
              </label>
            );
          })}
        </div>
        {err("services") && <ErrorText id="services-error">{err("services")}</ErrorText>}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-[1fr_2fr]">
        <Field id="date" label="Preferred date" hint="Optional" error={err("date")}>
          <input id="date" name="preferred_date" data-field="date" type="date" suppressHydrationWarning min={new Date().toISOString().slice(0, 10)} value={values.date} onChange={(e) => set("date", e.target.value)} onBlur={() => blur("date")} aria-invalid={!!err("date")} aria-describedby={describe("date")} className={inputClass("date")} />
        </Field>
        <Field id="message" label="Anything else?" hint="Optional" error={err("message")}>
          <textarea id="message" name="message" data-field="message" maxLength={maxLengths.message} rows={4} placeholder="Condition, timing, hangar access, ground time available…" value={values.message} onChange={(e) => set("message", e.target.value)} className={`${inputClass("message")} min-h-32 resize-y`} />
        </Field>
      </div>

      {turnstileSiteKey && (
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          action={turnstileAction}
          onToken={setTurnstileToken}
          onUnavailable={() => {
            setErrorMessage("The security check couldn't load. Please refresh the page and try again.");
            setStatus("error");
          }}
          className="min-h-[65px]"
        />
      )}

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-700/30 bg-red-50 p-4 text-red-900">
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            {errorMessage ? `${errorMessage} You can also call ` : <>Your request didn&apos;t go through. Please try again, or call </>}
            <a href={site.contact.phoneHref} className="font-semibold underline">
              {site.contact.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.contact.email}`} className="font-semibold underline">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-aluminium pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">
          <span className="text-red-700" aria-hidden="true">*</span> Required. We only use your details to reply to this request.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="shine inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-amber px-7 font-display font-semibold text-navy transition-colors hover:bg-amber-300 disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="relative z-[2] size-4 animate-spin" />
              <span className="relative z-[2]">Transmitting…</span>
            </>
          ) : (
            <>
              <span className="relative z-[2]">Request a Quote</span>
              <Send aria-hidden="true" className="relative z-[2] size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 font-display font-medium text-navy">
        <span>
          {label} {required && <span className="text-red-700" aria-hidden="true">*</span>}
        </span>
        {hint && <span className="label-mono text-[0.65rem] text-slate">{hint}</span>}
      </label>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm text-red-700">
      <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </p>
  );
}

/** Success state with a small takeoff animation. */
function Cleared({ name }: { name: string }) {
  return (
    <div role="status" className="blueprint relative overflow-hidden rounded-2xl p-8 text-center text-cloud sm:p-12">
      <div aria-hidden="true" className="relative mx-auto h-24 max-w-xs">
        {/* runway */}
        <div className="absolute inset-x-0 bottom-4 h-1 rounded-full bg-aluminium/25" />
        <div className="absolute inset-x-4 bottom-[18px] flex justify-between">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-amber opacity-10"
              style={{ animation: `runway-light 0.3s ease-out ${i * 0.08}s forwards` }}
            />
          ))}
        </div>
        <svg
          viewBox="0 0 24 24"
          className="absolute bottom-5 left-1/2 size-9 -ml-4 text-sky [animation:takeoff_1.8s_var(--ease-flight)_0.5s_forwards] opacity-0"
        >
          <path
            fill="currentColor"
            d="M22 12c0-.8-.7-1.3-1.5-1.3h-5.3L10.6 3H8.4l2.3 7.7H6.1L4.3 8H2.8l1.1 4-1.1 4h1.5l1.8-2.7h4.6L8.4 21h2.2l4.6-7.7h5.3c.8 0 1.5-.5 1.5-1.3Z"
          />
        </svg>
      </div>
      <p className="label-mono mt-4 text-amber">Request received · Squawk 1200</p>
      <h2 className="mt-3 text-4xl font-medium">Cleared for takeoff ✈</h2>
      <p className="mx-auto mt-4 max-w-md text-mist">
        Thanks{name ? `, ${name}` : ""}. Your request is with us, and we&apos;ll reply by phone or email, {site.contact.responseTime}.
      </p>
      <p className="mt-6 font-mono text-sm text-sky">
        Need us sooner?{" "}
        <a href={site.contact.phoneHref} className="text-cloud underline hover:text-sky">
          {site.contact.phoneDisplay}
        </a>
      </p>
    </div>
  );
}
