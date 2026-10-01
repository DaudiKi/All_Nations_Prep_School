/**
 * Spam and abuse guards for the public enquiry form.
 */

/**
 * Rate limiting.
 *
 * In-memory, which is correct for a single instance and NOT correct for
 * serverless, where each instance keeps its own counter. Swap for Upstash
 * Redis before launch — the interface below is deliberately the same shape so
 * the swap touches only this file.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_IN_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    hits.set(key, recent);
    return { ok: false, retryAfter };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true, retryAfter: 0 };
}

/**
 * Cloudflare Turnstile.
 *
 * Returns true when no secret is configured, so the form works in development.
 * `turnstileConfigured()` lets the route log loudly in production instead of
 * quietly accepting everything.
 */
export const turnstileConfigured = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
