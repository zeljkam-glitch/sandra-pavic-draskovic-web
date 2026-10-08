import assert from "node:assert/strict";
import test from "node:test";
import {createNewsletterConfirmationPayload, signNewsletterConfirmationToken, verifyNewsletterConfirmationToken} from "../../lib/newsletter/confirmation-token";

const secret = "test-secret-that-is-longer-than-thirty-two-characters";
const now = Date.UTC(2026, 9, 8, 10, 0, 0);

test("valid newsletter confirmation token round-trips", () => {
  const payload = createNewsletterConfirmationPayload("Sandra@Example.com", "Sandra", now);
  const token = signNewsletterConfirmationToken(payload, secret);
  assert.deepEqual(verifyNewsletterConfirmationToken(token, now, secret), payload);
  assert.equal(payload.email, "sandra@example.com");
});

test("tampered and expired newsletter tokens are rejected", () => {
  const payload = createNewsletterConfirmationPayload("sandra@example.com", "Sandra", now);
  const token = signNewsletterConfirmationToken(payload, secret);
  assert.equal(verifyNewsletterConfirmationToken(`${token}x`, now, secret), null);
  assert.equal(verifyNewsletterConfirmationToken(token, payload.expiresAt + 1, secret), null);
});
