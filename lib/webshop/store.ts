import {Redis} from "@upstash/redis";
import type {ProductKey, DownloadProductKey} from "./catalog";

export const CONSENT_VERSION = "digital-content-v1";
const CONSENT_TTL_SECONDS = 2 * 24 * 60 * 60;
const FULFILLMENT_LOCK_SECONDS = 5 * 60;
const FULFILLMENT_RECORD_SECONDS = 30 * 24 * 60 * 60;

export type ConsentRecord = {
  id: string;
  productKey: ProductKey;
  acceptedAt: string;
  version: typeof CONSENT_VERSION;
  confirmations: readonly [true, true, true, true];
};

export type OrderRecord = {
  sessionId: string;
  eventId: string;
  productKey: ProductKey;
  amountTotal: number;
  currency: "eur";
  consentId: string;
  consentVersion: string;
  consentAcceptedAt: string;
  status: "pending" | "delivered";
  deliveredAt?: string;
};

let redis: Redis | null = null;

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Upstash Redis is not configured");
  }
  redis ??= Redis.fromEnv();
  return redis;
}

function orderRetentionSeconds() {
  const value = Number(process.env.ORDER_RETENTION_SECONDS);
  if (!Number.isSafeInteger(value) || value < 86400) throw new Error("ORDER_RETENTION_SECONDS is not configured");
  return value;
}

export async function saveConsent(record: ConsentRecord) {
  await getRedis().set(`webshop:consent:${record.id}`, record, {ex: CONSENT_TTL_SECONDS});
}

export async function getConsent(id: string) {
  return getRedis().get<ConsentRecord>(`webshop:consent:${id}`);
}

export async function claimFulfillment(sessionId: string) {
  const result = await getRedis().set(`webshop:fulfillment:${sessionId}`, "processing", {nx: true, ex: FULFILLMENT_LOCK_SECONDS});
  return result === "OK";
}

export async function completeFulfillment(sessionId: string) {
  await getRedis().set(`webshop:fulfillment:${sessionId}`, "completed", {ex: FULFILLMENT_RECORD_SECONDS});
}

export async function releaseFulfillment(sessionId: string) {
  await getRedis().del(`webshop:fulfillment:${sessionId}`);
}

export async function saveOrder(record: OrderRecord) {
  await getRedis().set(`webshop:order:${record.sessionId}`, record, {ex: orderRetentionSeconds()});
}

export async function consumeDownload(sessionId: string, productKey: DownloadProductKey, expiresAt: number) {
  const ttlSeconds = Math.max(60, Math.ceil((expiresAt - Date.now()) / 1000) + 3600);
  const count = await getRedis().eval<string[], number>(
    "local count = redis.call('INCR', KEYS[1]); if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return count;",
    [`webshop:download:${sessionId}:${productKey}`],
    [String(ttlSeconds)],
  );
  return {allowed: count <= 3, count};
}
