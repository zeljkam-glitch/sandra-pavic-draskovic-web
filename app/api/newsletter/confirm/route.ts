import {NextResponse} from "next/server";
import {verifyNewsletterConfirmationToken} from "../../../../lib/newsletter/confirmation-token";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function resendRequest(path: string, init: RequestInit, apiKey: string) {
  return fetch(`https://api.resend.com${path}`, {
    ...init,
    headers:{Authorization:`Bearer ${apiKey}`, "Content-Type":"application/json", ...(init.headers || {})},
    signal:AbortSignal.timeout(10000),
    cache:"no-store",
  });
}

export async function POST(request: Request) {
  const resultUrl = new URL("/newsletter/potvrdena", request.url);
  try {
    const form = await request.formData();
    const token = form.get("token");
    if (typeof token !== "string" || token.length > 3000) throw new Error("Invalid token");
    const payload = verifyNewsletterConfirmationToken(token);
    if (!payload || !emailPattern.test(payload.email)) {
      resultUrl.searchParams.set("status", "expired");
      return NextResponse.redirect(resultUrl, 303);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("Resend is not configured");
    const encodedEmail = encodeURIComponent(payload.email);
    const existing = await resendRequest(`/contacts/${encodedEmail}`, {method:"GET"}, apiKey);

    if (existing.status === 404) {
      const body: Record<string, unknown> = {
        email:payload.email,
        first_name:payload.name || undefined,
        unsubscribed:false,
      };
      if (process.env.RESEND_SEGMENT_ID) body.segments = [{id:process.env.RESEND_SEGMENT_ID}];
      const created = await resendRequest("/contacts", {method:"POST", body:JSON.stringify(body)}, apiKey);
      if (!created.ok) throw new Error("Unable to create contact");
    } else if (existing.ok) {
      const updated = await resendRequest(`/contacts/${encodedEmail}`, {
        method:"PATCH",
        body:JSON.stringify({unsubscribed:false, ...(payload.name ? {first_name:payload.name} : {})}),
      }, apiKey);
      if (!updated.ok) throw new Error("Unable to update contact");
      if (process.env.RESEND_SEGMENT_ID) {
        const added = await resendRequest(`/contacts/${encodedEmail}/segments/${encodeURIComponent(process.env.RESEND_SEGMENT_ID)}`, {method:"POST"}, apiKey);
        if (!added.ok && added.status !== 409) throw new Error("Unable to add contact to segment");
      }
    } else {
      throw new Error("Unable to retrieve contact");
    }

    resultUrl.searchParams.set("status", "success");
    return NextResponse.redirect(resultUrl, 303);
  } catch {
    resultUrl.searchParams.set("status", "error");
    return NextResponse.redirect(resultUrl, 303);
  }
}
