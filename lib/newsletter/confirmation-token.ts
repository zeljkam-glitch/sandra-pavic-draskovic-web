import {createHmac, randomBytes, timingSafeEqual} from "node:crypto";

export const NEWSLETTER_CONSENT_VERSION = "newsletter-v2-double-opt-in";
export const NEWSLETTER_CONFIRMATION_TTL_MS = 24 * 60 * 60 * 1000;

export type NewsletterConfirmationPayload = {
  version: 1;
  email: string;
  name: string;
  requestedAt: string;
  expiresAt: number;
  nonce: string;
  consentVersion: typeof NEWSLETTER_CONSENT_VERSION;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tokenSecret() {
  const secret = process.env.NEWSLETTER_CONFIRMATION_SECRET;
  if (!secret || secret.length < 32) throw new Error("NEWSLETTER_CONFIRMATION_SECRET must contain at least 32 characters");
  return secret;
}

function signature(payload: string, secret = tokenSecret()) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createNewsletterConfirmationPayload(email: string, name: string, now = Date.now()): NewsletterConfirmationPayload {
  return {
    version: 1,
    email: email.toLowerCase(),
    name,
    requestedAt: new Date(now).toISOString(),
    expiresAt: now + NEWSLETTER_CONFIRMATION_TTL_MS,
    nonce: randomBytes(16).toString("base64url"),
    consentVersion: NEWSLETTER_CONSENT_VERSION,
  };
}

export function signNewsletterConfirmationToken(payload: NewsletterConfirmationPayload, secret?: string) {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${signature(encoded, secret)}`;
}

export function verifyNewsletterConfirmationToken(token: string, now = Date.now(), secret?: string): NewsletterConfirmationPayload | null {
  const [encoded, suppliedSignature, extra] = token.split(".");
  if (!encoded || !suppliedSignature || extra) return null;

  let expectedSignature: string;
  try {
    expectedSignature = signature(encoded, secret);
  } catch {
    return null;
  }
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) return null;

  try {
    const value = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Record<string, unknown>;
    if (
      value.version !== 1 ||
      typeof value.email !== "string" ||
      value.email.length > 254 ||
      !emailPattern.test(value.email) ||
      typeof value.name !== "string" ||
      value.name.length > 100 ||
      typeof value.requestedAt !== "string" ||
      Number.isNaN(Date.parse(value.requestedAt)) ||
      typeof value.expiresAt !== "number" ||
      !Number.isSafeInteger(value.expiresAt) ||
      value.expiresAt <= now ||
      typeof value.nonce !== "string" ||
      !/^[A-Za-z0-9_-]{20,32}$/.test(value.nonce) ||
      value.consentVersion !== NEWSLETTER_CONSENT_VERSION
    ) return null;

    return value as NewsletterConfirmationPayload;
  } catch {
    return null;
  }
}
