import {createHmac, scryptSync, timingSafeEqual} from "node:crypto";
import {cookies} from "next/headers";

export const CMS_SESSION_COOKIE = "natura_cms_session";
export const CMS_SESSION_MAX_AGE = 12 * 60 * 60;

type SessionPayload = {email:string; role:"editor"; exp:number};

function sessionSecret() {
  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("CMS_SESSION_SECRET nije postavljen.");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function createCmsSessionToken(email: string, now = Date.now()) {
  const payload: SessionPayload = {email:email.trim().toLowerCase(), role:"editor", exp:Math.floor(now / 1000) + CMS_SESSION_MAX_AGE};
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyCmsSessionToken(token: string, now = Date.now()): SessionPayload | null {
  const [encoded, supplied, extra] = token.split(".");
  if (!encoded || !supplied || extra) return null;
  const expected = sign(encoded);
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);
  if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (payload.role !== "editor" || typeof payload.email !== "string" || !Number.isSafeInteger(payload.exp) || payload.exp <= Math.floor(now / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function verifyCmsPassword(password: string, stored = process.env.CMS_PASSWORD_HASH || "") {
  const [algorithm, salt, expected, extra] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !expected || extra || password.length > 200) return false;
  try {
    const actual = scryptSync(password, salt, 32);
    const expectedBuffer = Buffer.from(expected, "base64url");
    return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
  } catch {
    return false;
  }
}

export async function getCmsSession() {
  const token = (await cookies()).get(CMS_SESSION_COOKIE)?.value;
  return token ? verifyCmsSessionToken(token) : null;
}

export function cmsIsAvailable() {
  return process.env.CMS_ENABLED === "true" && process.env.VERCEL_ENV !== "production";
}

export function sameOrigin(request: Request) {
  try { return request.headers.get("origin") === new URL(request.url).origin; }
  catch { return false; }
}
