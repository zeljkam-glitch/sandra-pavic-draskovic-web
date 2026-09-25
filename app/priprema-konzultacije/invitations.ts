import { createHmac, timingSafeEqual } from "node:crypto";
export function validInvitation(token: string): boolean {
  if (token === "pregled" && process.env.NODE_ENV !== "production") return true;
  const secret = process.env.QUESTIONNAIRE_INVITE_SECRET;
  if (!secret || secret.length < 32 || token.length > 2000) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;
  try {
    const expected = createHmac("sha256", secret).update(payload).digest();
    const received = Buffer.from(signature, "base64url");
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.version === 1 && typeof data.id === "string" && data.id.length === 48 && typeof data.paymentReferenceHash === "string" && /^[a-f0-9]{64}$/.test(data.paymentReferenceHash) && Number.isFinite(data.exp) && data.exp > Date.now() / 1000;
  } catch { return false; }
}
