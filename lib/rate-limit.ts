import {createHash} from "node:crypto";
import {Redis} from "@upstash/redis";

let redis: Redis | null = null;

function client() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) throw new Error("Rate limit storage is not configured");
  redis ??= Redis.fromEnv();
  return redis;
}

function requestIdentifier(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

export async function checkRateLimit(request: Request, scope: string, limit: number, windowSeconds: number) {
  const key = `rate:${scope}:${requestIdentifier(request)}`;
  const count = await client().incr(key);
  if (count === 1) await client().expire(key, windowSeconds);
  return {allowed:count <= limit, remaining:Math.max(0, limit - count)};
}
