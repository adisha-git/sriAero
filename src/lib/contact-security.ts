import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { site } from "@/config/site";
import { turnstileAction } from "@/lib/quote";

// Server-only helpers for /api/contact: shared rate limiting (Upstash Redis) and Cloudflare Turnstile verification.
// Both fail closed: if either service can't give a clear answer, the enquiry is not sent.

const RATE_LIMIT = { requests: 5, window: "10 m" } as const;
const RATE_LIMIT_TIMEOUT_MS = 3000;
const TURNSTILE_TIMEOUT_MS = 8000;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Names of required security env vars that are missing (values are never returned). */
export function missingSecurityConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.TURNSTILE_SECRET_KEY) missing.push("TURNSTILE_SECRET_KEY");
  if (!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)) missing.push("UPSTASH_REDIS_REST_URL");
  if (!(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)) missing.push("UPSTASH_REDIS_REST_TOKEN");
  return missing;
}

/**
 * Client IP for rate limiting. On Vercel, `x-real-ip` is set by the platform to the connecting client's address
 * (it's what @vercel/functions' ipAddress() reads), so visitors can't spoof it. Elsewhere (local dev) it's absent.
 */
export function clientIp(request: Request): string | undefined {
  return request.headers.get("x-real-ip")?.trim() || undefined;
}

let limiter: Ratelimit | undefined;

function getLimiter(): Ratelimit {
  limiter ??= new Ratelimit({
    // Reads UPSTASH_REDIS_REST_URL/TOKEN, or KV_REST_API_URL/TOKEN from the Vercel Marketplace integration.
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT.requests, RATE_LIMIT.window),
    prefix: "sriaero:contact",
    timeout: RATE_LIMIT_TIMEOUT_MS,
    // Redis is the only source of truth; no per-instance memory cache.
    ephemeralCache: false,
    analytics: false,
  });
  return limiter;
}

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number } | { ok: "unavailable" };

export async function checkRateLimit(ip: string | undefined): Promise<RateLimitResult> {
  try {
    const res = await getLimiter().limit(`ip:${ip ?? "unknown"}`);
    // On timeout the library lets the request through; treat that as an outage instead.
    if (res.reason === "timeout") return { ok: "unavailable" };
    if (res.success) return { ok: true };
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((res.reset - Date.now()) / 1000)) };
  } catch {
    return { ok: "unavailable" };
  }
}

function allowedHostnames(): Set<string> {
  const configured = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  if (configured) {
    return new Set(configured.split(",").map((h) => h.trim().toLowerCase()).filter(Boolean));
  }
  const host = new URL(site.url).hostname.toLowerCase();
  return new Set([host, host.replace(/^www\./, "")]);
}

type SiteverifyResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
  metadata?: { result_with_testing_key?: boolean };
};

export type TurnstileResult = "valid" | "invalid" | "unavailable";

export async function verifyTurnstile(token: string, ip: string | undefined): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return "unavailable";

  let result: SiteverifyResponse;
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) return "unavailable";
    result = (await res.json()) as SiteverifyResponse;
  } catch {
    return "unavailable";
  }

  const errors = result["error-codes"] ?? [];
  if (!result.success) {
    // Cloudflare-side problems with our own request mean we can't judge the visitor either way.
    if (errors.includes("internal-error") || errors.includes("invalid-input-secret") || errors.includes("missing-input-secret")) {
      console.error("[contact] Turnstile verification error:", errors.join(","));
      return "unavailable";
    }
    return "invalid"; // includes timeout-or-duplicate (expired or reused tokens)
  }

  if (!result.hostname || !allowedHostnames().has(result.hostname.toLowerCase())) return "invalid";

  // Cloudflare's test keys return no action. Accept them only outside Vercel production, for local testing.
  if (result.metadata?.result_with_testing_key) {
    return process.env.VERCEL_ENV === "production" ? "invalid" : "valid";
  }
  return result.action === turnstileAction ? "valid" : "invalid";
}
