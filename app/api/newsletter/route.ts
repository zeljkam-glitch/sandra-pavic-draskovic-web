import {createHash} from "node:crypto";
import {NextResponse} from "next/server";
import {createNewsletterConfirmationPayload, signNewsletterConfirmationToken} from "../../../lib/newsletter/confirmation-token";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]!);
}

function confirmationEmail(name: string, confirmationUrl: string) {
  const greeting = name ? `Pozdrav ${escapeHtml(name)},` : "Pozdrav,";
  return `<!doctype html><html lang="hr"><body style="margin:0;background:#f5f2e9;color:#24372a;font-family:Arial,sans-serif"><div style="max-width:600px;margin:0 auto;padding:40px 24px"><div style="background:#fff;padding:40px;border-radius:20px"><p style="font-size:12px;letter-spacing:.12em;color:#60743f">NATURA SANAT</p><h1 style="font-family:Georgia,serif;font-weight:400;font-size:36px;line-height:1.1">Potvrdite prijavu na newsletter</h1><p>${greeting}</p><p>Primili smo zahtjev za prijavu na Natura Sanat novosti. Kliknite na gumb ispod i zatim potvrdite prijavu na otvorenoj stranici.</p><p style="margin:32px 0"><a href="${escapeHtml(confirmationUrl)}" style="display:inline-block;background:#45613f;color:#fff;text-decoration:none;padding:15px 22px;border-radius:28px;font-weight:700">Potvrdi email adresu</a></p><p style="font-size:13px;color:#667066">Poveznica vrijedi 24 sata. Ako niste zatražili prijavu, zanemarite ovu poruku i nećete biti dodani na listu.</p></div></div></body></html>`;
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({error:"Origin"}, {status:403});
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({error:"Content type"}, {status:415});

  let data: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 2000) return NextResponse.json({error:"Too large"}, {status:413});
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    data = parsed;
  } catch {
    return NextResponse.json({error:"Invalid request"}, {status:400});
  }

  if (data.website) return NextResponse.json({success:true});
  const name = clean(data.name, 100);
  const email = clean(data.email, 254).toLowerCase();
  if (!emailPattern.test(email) || data.consent !== true) return NextResponse.json({error:"Missing consent"}, {status:400});

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  if (!resendKey || !from || !process.env.NEWSLETTER_CONFIRMATION_SECRET) return NextResponse.json({error:"Delivery unavailable"}, {status:503});

  try {
    const payload = createNewsletterConfirmationPayload(email, name);
    const token = signNewsletterConfirmationToken(payload);
    const confirmationUrl = new URL("/newsletter/potvrda", request.url);
    confirmationUrl.searchParams.set("token", token);
    const idempotencyKey = createHash("sha256")
      .update(`newsletter-confirmation:${email}:${Math.floor(Date.now() / 3_600_000)}`)
      .digest("hex");

    const response = await fetch("https://api.resend.com/emails", {
      method:"POST",
      headers:{Authorization:`Bearer ${resendKey}`, "Content-Type":"application/json", "Idempotency-Key":idempotencyKey},
      body:JSON.stringify({
        from,
        to:[email],
        ...(process.env.NEWSLETTER_REPLY_TO ? {reply_to:process.env.NEWSLETTER_REPLY_TO} : {}),
        subject:"Potvrdite prijavu na Natura Sanat newsletter",
        html:confirmationEmail(name, confirmationUrl.toString()),
        tags:[{name:"purpose", value:"newsletter-confirmation"}],
      }),
      signal:AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Resend confirmation failed");
    return NextResponse.json({success:true});
  } catch {
    return NextResponse.json({error:"Delivery failed"}, {status:502});
  }
}
