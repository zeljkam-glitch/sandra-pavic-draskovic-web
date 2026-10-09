import {get} from "@vercel/blob";
import {getDownloadProduct} from "@/lib/webshop/catalog";
import {verifyDownloadToken} from "@/lib/webshop/download-token";
import {consumeDownload} from "@/lib/webshop/store";

export async function GET(_request: Request, context: {params: Promise<{token: string}>}) {
  const {token} = await context.params;
  const payload = verifyDownloadToken(token);
  if (!payload) return new Response("Poveznica je neispravna ili je istekla.", {status: 410});

  try {
    const product = getDownloadProduct(payload.productKey);
    const blob = await get(product.blobPath, {access: "private"});
    if (!blob || blob.statusCode !== 200) return new Response("Datoteka nije pronađena.", {status: 404});
    const download = await consumeDownload(payload.sessionId, payload.productKey, payload.expiresAt);
    if (!download.allowed) return new Response("Dosegnut je najveći broj preuzimanja.", {status: 410});

    return new Response(blob.stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${product.downloadFilename}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Secure ebook download failed", error instanceof Error ? error.message : "Unknown error");
    return new Response("Preuzimanje trenutačno nije dostupno.", {status: 503});
  }
}
