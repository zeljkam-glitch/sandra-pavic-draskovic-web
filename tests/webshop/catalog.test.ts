import assert from "node:assert/strict";
import test from "node:test";
import {getStripePriceId} from "../../lib/webshop/catalog";

test("checkout accepts only Stripe price identifiers", () => {
  const key = "STRIPE_PRICE_BILJNA_PREHRANA";
  const previous = process.env[key];
  try {
    process.env[key] = "price_123abcABC";
    assert.equal(getStripePriceId("biljna-prehrana"), "price_123abcABC");
    process.env[key] = "plink_123";
    assert.equal(getStripePriceId("biljna-prehrana"), null);
    process.env[key] = "price_123?unexpected=true";
    assert.equal(getStripePriceId("biljna-prehrana"), null);
  } finally {
    if (previous === undefined) delete process.env[key]; else process.env[key] = previous;
  }
});
