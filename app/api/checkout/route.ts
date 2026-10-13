import {randomUUID} from "node:crypto";
import Stripe from "stripe";
import {NextResponse} from "next/server";
import {getStripePriceId, isProductKey} from "@/lib/webshop/catalog";
import {CONSENT_VERSION, saveConsent} from "@/lib/webshop/store";
import {checkRateLimit} from "@/lib/rate-limit";

let stripe:Stripe|null=null;
function getStripe(){const key=process.env.STRIPE_SECRET_KEY;if(!key)throw new Error("Stripe nije konfiguriran");stripe??=new Stripe(key,{appInfo:{name:"Natura Sanat webshop"}});return stripe;}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({error: "Origin"}, {status: 403});
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({error: "Content type"}, {status: 415});

  try {
    const raw = await request.text();
    if (raw.length > 2000) return NextResponse.json({error: "Too large"}, {status: 413});
    const data = JSON.parse(raw) as {productKey?: unknown; confirmations?: unknown};
    if (!isProductKey(data.productKey) || !Array.isArray(data.confirmations) || data.confirmations.length !== 4 || !data.confirmations.every(value => value === true)) {
      return NextResponse.json({error: "Potrebne su sve potvrde prije kupnje."}, {status: 400});
    }

    const priceId = getStripePriceId(data.productKey);
    if (!priceId || !process.env.STRIPE_SECRET_KEY) return NextResponse.json({error: "Kupnja još nije aktivna."}, {status: 503});
    try { const rate = await checkRateLimit(request, "checkout", 12, 60 * 60); if (!rate.allowed) return NextResponse.json({error:"Previše pokušaja. Pokušajte poslije."},{status:429}); }
    catch { return NextResponse.json({error:"Sigurnosna provjera trenutačno nije dostupna."},{status:503}); }

    const consentId = randomUUID();
    await saveConsent({
      id: consentId,
      productKey: data.productKey,
      acceptedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
      confirmations: [true, true, true, true],
    });
    const siteUrl=new URL(process.env.NEXT_PUBLIC_SITE_URL||request.url);
    const session=await getStripe().checkout.sessions.create({
      mode:"payment",
      line_items:[{price:priceId,quantity:1}],
      client_reference_id:consentId,
      metadata:{productKey:data.productKey},
      success_url:new URL("/kupnja/uspjesna?session_id={CHECKOUT_SESSION_ID}",siteUrl).toString(),
      cancel_url:new URL("/kupnja/otkazana",siteUrl).toString(),
      customer_creation:"always",
    },{idempotencyKey:`natura-checkout-${consentId}`});
    if(!session.url)throw new Error("Stripe Checkout URL nedostaje");
    return NextResponse.json({url:session.url});
  } catch (error) {
    console.error("Webshop checkout preparation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({error: "Kupnju trenutačno nije moguće otvoriti."}, {status: 502});
  }
}
