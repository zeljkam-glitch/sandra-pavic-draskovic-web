import {createHmac, timingSafeEqual} from "node:crypto";
import {isProductKey, type DownloadProductKey} from "./catalog";

export type DownloadTokenPayload = {
  version: 1;
  sessionId: string;
  productKey: DownloadProductKey;
  expiresAt: number;
};

function tokenSecret() {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret || secret.length < 32) throw new Error("DOWNLOAD_TOKEN_SECRET must contain at least 32 characters");
  return secret;
}

function signature(payload: string, secret = tokenSecret()) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signDownloadToken(payload: DownloadTokenPayload, secret?: string) {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${signature(encoded, secret)}`;
}

export function verifyDownloadToken(token: string, now = Date.now(), secret?: string): DownloadTokenPayload | null {
  const [encoded, suppliedSignature, extra] = token.split(".");
  if (!encoded || !suppliedSignature || extra) return null;

  const expectedSignature = signature(encoded, secret);
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) return null;

  try {
    const value = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Record<string, unknown>;
    if (
      value.version !== 1 ||
      typeof value.sessionId !== "string" ||
      !value.sessionId.startsWith("cs_") ||
      !isProductKey(value.productKey) ||
      value.productKey === "kolekcija" ||
      typeof value.expiresAt !== "number" ||
      !Number.isSafeInteger(value.expiresAt) ||
      value.expiresAt <= now
    ) return null;

    return {
      version: 1,
      sessionId: value.sessionId,
      productKey: value.productKey,
      expiresAt: value.expiresAt,
    } as DownloadTokenPayload;
  } catch {
    return null;
  }
}
