import assert from "node:assert/strict";
import test from "node:test";
import {signDownloadToken, verifyDownloadToken} from "../../lib/webshop/download-token";

const secret = "test-secret-that-is-longer-than-thirty-two-characters";
const now = Date.UTC(2026, 9, 8, 10, 0, 0);

test("valid download token round-trips", () => {
  const token = signDownloadToken({version: 1, sessionId: "cs_test_123", productKey: "svjeza-prehrana", expiresAt: now + 60_000}, secret);
  assert.deepEqual(verifyDownloadToken(token, now, secret), {version: 1, sessionId: "cs_test_123", productKey: "svjeza-prehrana", expiresAt: now + 60_000});
});

test("tampered and expired tokens are rejected", () => {
  const token = signDownloadToken({version: 1, sessionId: "cs_test_123", productKey: "biljna-prehrana", expiresAt: now + 60_000}, secret);
  assert.equal(verifyDownloadToken(`${token}x`, now, secret), null);
  assert.equal(verifyDownloadToken(token, now + 60_001, secret), null);
});
