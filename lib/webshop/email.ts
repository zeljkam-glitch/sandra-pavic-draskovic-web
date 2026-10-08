import type {DownloadProductKey, ProductKey} from "./catalog";
import {PRODUCTS} from "./catalog";

type DownloadLink = {productKey: DownloadProductKey; url: string};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[character]!);
}

async function sendResendEmail(payload: {to: string[]; subject: string; html: string; replyTo?: string}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FULFILLMENT_FROM;
  if (!apiKey || !from) throw new Error("Resend fulfillment email is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json"},
    body: JSON.stringify({from, to: payload.to, subject: payload.subject, html: payload.html, reply_to: payload.replyTo}),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Resend delivery failed (${response.status})`);
}

export async function sendDownloadEmail(input: {email: string; sessionId: string; purchasedProduct: ProductKey; expiresAt: number; links: DownloadLink[]}) {
  const expiry = new Intl.DateTimeFormat("hr-HR", {dateStyle: "long", timeStyle: "short", timeZone: "Europe/Zagreb"}).format(input.expiresAt);
  const links = input.links.map(({productKey, url}) => `<li style="margin:0 0 14px"><strong>${escapeHtml(PRODUCTS[productKey].title)}</strong><br><a href="${escapeHtml(url)}">Preuzmi PDF</a></li>`).join("");
  const replyTo = process.env.FULFILLMENT_REPLY_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  await sendResendEmail({
    to: [input.email],
    replyTo,
    subject: `Tvoja Natura Sanat e-knjiga – ${PRODUCTS[input.purchasedProduct].title}`,
    html: `<h1>Hvala na kupnji.</h1><p>Uplata je potvrđena. Tvoje sigurne poveznice za preuzimanje nalaze se ispod.</p><ul>${links}</ul><p>Poveznice vrijede do <strong>${escapeHtml(expiry)}</strong> i svaka dopušta najviše tri preuzimanja. Nemoj ih prosljeđivati drugim osobama.</p><p>Ako imaš poteškoća, odgovori na ovu poruku i navedi broj narudžbe <strong>${escapeHtml(input.sessionId)}</strong>.</p>`,
  });
}

export async function notifySeller(input: {sessionId: string; productKey: ProductKey; status: "delivered" | "manual-review"; reason?: string}) {
  const recipient = process.env.FULFILLMENT_NOTIFY_TO;
  if (!recipient) return;
  const reason = input.reason ? `<p><strong>Razlog:</strong> ${escapeHtml(input.reason)}</p>` : "";
  await sendResendEmail({
    to: [recipient],
    subject: input.status === "delivered" ? "Natura Sanat: e-knjiga je isporučena" : "Natura Sanat: potrebna je ručna provjera narudžbe",
    html: `<h1>${input.status === "delivered" ? "Automatska isporuka dovršena" : "Potrebna je ručna provjera"}</h1><p><strong>Proizvod:</strong> ${escapeHtml(PRODUCTS[input.productKey].title)}<br><strong>Stripe narudžba:</strong> ${escapeHtml(input.sessionId)}</p>${reason}`,
  });
}
