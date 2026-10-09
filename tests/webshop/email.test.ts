import assert from "node:assert/strict";
import test from "node:test";
import {sendDownloadEmail} from "../../lib/webshop/email";

test("download delivery uses a stable Resend idempotency key", async () => {
  const previousFetch = globalThis.fetch;
  const previousKey = process.env.RESEND_API_KEY;
  const previousFrom = process.env.FULFILLMENT_FROM;
  let request: Request | undefined;
  process.env.RESEND_API_KEY = "re_test";
  process.env.FULFILLMENT_FROM = "Natura Sanat <test@example.com>";
  globalThis.fetch = async (input, init) => {
    request = new Request(input, init);
    return new Response(null, {status: 200});
  };

  try {
    await sendDownloadEmail({
      email: "buyer@example.com",
      sessionId: "cs_test_123",
      purchasedProduct: "biljna-prehrana",
      expiresAt: Date.UTC(2026, 9, 9, 12),
      links: [{productKey: "biljna-prehrana", url: "https://naturasanat.hr/api/download/token"}],
    });
    assert.equal(request?.headers.get("Idempotency-Key"), "natura-delivery-cs_test_123");
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
    if (previousFrom === undefined) delete process.env.FULFILLMENT_FROM; else process.env.FULFILLMENT_FROM = previousFrom;
  }
});
