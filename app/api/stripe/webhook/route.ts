import Stripe from "stripe";
import {PRODUCTS, type ProductKey} from "@/lib/webshop/catalog";
import {signDownloadToken} from "@/lib/webshop/download-token";
import {notifySeller, sendDownloadEmail} from "@/lib/webshop/email";
import {claimFulfillment, completeFulfillment, getConsent, releaseFulfillment, saveOrder} from "@/lib/webshop/store";

const DOWNLOAD_VALIDITY_MS = 48 * 60 * 60 * 1000;
let stripe: Stripe | null = null;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  stripe ??= new Stripe(key, {appInfo: {name: "Natura Sanat webshop"}});
  return stripe;
}

function deliveryEmail(session: Stripe.Checkout.Session) {
  return session.customer_details?.email || session.customer_email || null;
}

async function processPaidSession(session: Stripe.Checkout.Session, eventId: string) {
  const consentId = session.client_reference_id;
  if (!consentId) {
    console.error("Paid Stripe session has no consent reference", session.id);
    return {manualReview: true};
  }

  const consent = await getConsent(consentId);
  if (!consent || !PRODUCTS[consent.productKey]) throw new Error("Consent record is missing or expired");
  const purchasedProduct: ProductKey = consent.productKey;
  const expected = PRODUCTS[purchasedProduct];
  if (session.currency !== "eur" || session.amount_total !== expected.priceCents) throw new Error("Paid amount does not match the selected product");

  const email = deliveryEmail(session);
  if (!email) throw new Error("Stripe session has no customer email");
  if (!(await claimFulfillment(session.id))) return {duplicate: true};

  try {
    await saveOrder({
      sessionId: session.id,
      eventId,
      productKey: purchasedProduct,
      amountTotal: session.amount_total,
      currency: "eur",
      consentId,
      consentVersion: consent.version,
      consentAcceptedAt: consent.acceptedAt,
      status: "pending",
    });

    const expiresAt = Date.now() + DOWNLOAD_VALIDITY_MS;
    const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://naturasanat.hr");
    const links = expected.downloads.map(productKey => {
      const token = signDownloadToken({version: 1, sessionId: session.id, productKey, expiresAt});
      return {productKey, url: new URL(`/api/download/${encodeURIComponent(token)}`, siteUrl).toString()};
    });

    await sendDownloadEmail({email, sessionId: session.id, purchasedProduct, expiresAt, links});
    await saveOrder({
      sessionId: session.id,
      eventId,
      productKey: purchasedProduct,
      amountTotal: session.amount_total,
      currency: "eur",
      consentId,
      consentVersion: consent.version,
      consentAcceptedAt: consent.acceptedAt,
      status: "delivered",
      deliveredAt: new Date().toISOString(),
    });
    await completeFulfillment(session.id);
    try {
      await notifySeller({sessionId: session.id, productKey: purchasedProduct, status: "delivered"});
    } catch (error) {
      console.error("Seller notification failed", error instanceof Error ? error.message : "Unknown error");
    }
    return {delivered: true};
  } catch (error) {
    await releaseFulfillment(session.id);
    throw error;
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) return new Response("Webhook is not configured", {status: 503});

  const body = await request.text();
  if (body.length > 1_000_000) return new Response("Payload too large", {status: 413});

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error instanceof Error ? error.message : "Unknown error");
    return new Response("Invalid signature", {status: 400});
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return Response.json({received: true, ignored: true});
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") return Response.json({received: true, awaitingPayment: true});

  try {
    const result = await processPaidSession(session, event.id);
    if ("manualReview" in result && result.manualReview) {
      const fallbackProduct = Object.entries(PRODUCTS).find(([, product]) => product.priceCents === session.amount_total)?.[0] as ProductKey | undefined;
      if (fallbackProduct) {
        try {
          await notifySeller({sessionId: session.id, productKey: fallbackProduct, status: "manual-review", reason: "Kupnja nije pokrenuta kroz web potvrde."});
        } catch (error) {
          console.error("Manual review notification failed", error instanceof Error ? error.message : "Unknown error");
        }
      }
    }
    return Response.json({received: true, ...result});
  } catch (error) {
    console.error("Stripe fulfillment failed", session.id, error instanceof Error ? error.message : "Unknown error");
    return new Response("Fulfillment failed", {status: 500});
  }
}
