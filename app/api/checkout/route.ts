import {randomUUID} from "node:crypto";
import {NextResponse} from "next/server";
import {getCheckoutUrl, isProductKey} from "@/lib/webshop/catalog";
import {CONSENT_VERSION, saveConsent} from "@/lib/webshop/store";

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

    const checkoutUrl = getCheckoutUrl(data.productKey);
    if (!checkoutUrl) return NextResponse.json({error: "Kupnja još nije aktivna."}, {status: 503});

    const consentId = randomUUID();
    await saveConsent({
      id: consentId,
      productKey: data.productKey,
      acceptedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
      confirmations: [true, true, true, true],
    });
    checkoutUrl.searchParams.set("client_reference_id", consentId);
    return NextResponse.json({url: checkoutUrl.toString()});
  } catch (error) {
    console.error("Webshop checkout preparation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({error: "Kupnju trenutačno nije moguće otvoriti."}, {status: 502});
  }
}
