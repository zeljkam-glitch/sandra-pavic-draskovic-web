import assert from "node:assert/strict";
import test from "node:test";
import {getCheckoutUrl} from "../../lib/webshop/catalog";

test("checkout accepts only Stripe HTTPS payment links", () => {
  const key = "NEXT_PUBLIC_CHECKOUT_BILJNA_PREHRANA";
  const previous = process.env[key];
  try {
    process.env[key] = "https://buy.stripe.com/test_123";
    assert.equal(getCheckoutUrl("biljna-prehrana")?.href, "https://buy.stripe.com/test_123");
    process.env[key] = "http://buy.stripe.com/test_123";
    assert.equal(getCheckoutUrl("biljna-prehrana"), null);
    process.env[key] = "https://buy.stripe.com.example.test/test_123";
    assert.equal(getCheckoutUrl("biljna-prehrana"), null);
  } finally {
    if (previous === undefined) delete process.env[key]; else process.env[key] = previous;
  }
});
