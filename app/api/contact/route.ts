import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Content type" }, { status: 415 });
  let data: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 12000) return NextResponse.json({ error: "Too large" }, { status: 413 });
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    data = parsed;
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  if (data.website) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const limits: Record<string, number> = { name: 100, email: 254, topic: 30, program: 150, format: 30, audience: 200, date: 100, message: 3000 };
  const payload: Record<string, string> = {};
  for (const [field, limit] of Object.entries(limits)) {
    if (data[field] !== undefined && (typeof data[field] !== "string" || (data[field] as string).length > limit)) return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    payload[field] = ((data[field] as string) || "").trim();
  }
  if (!payload.name || !emailPattern.test(payload.email) || !["konzultacije", "predavanje", "suradnja", "ostalo"].includes(payload.topic) || (payload.topic === "ostalo" && !payload.message)) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const recipient = process.env.CONTACT_RECIPIENT;
  if (!endpoint && !(resendKey && from && recipient && emailPattern.test(recipient))) return NextResponse.json({ error: "Delivery unavailable" }, { status: 503 });
  try {
    let response: Response;
    if (endpoint) {
      if (new URL(endpoint).protocol !== "https:") throw new Error();
      response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10000), redirect: "error" });
    } else {
      const subject = payload.topic === "predavanje" ? "Novi upit za predavanje ili radionicu" : payload.topic === "suradnja" ? "Novi prijedlog suradnje" : payload.topic === "ostalo" ? "Novo pitanje s weba" : "Novi upit za individualno savjetovanje";
      const html = `<h1>${escapeHtml(subject)}</h1><p><strong>Ime:</strong> ${escapeHtml(payload.name)}<br><strong>Email:</strong> ${escapeHtml(payload.email)}<br><strong>Tema:</strong> ${escapeHtml(payload.topic)}${payload.program ? `<br><strong>Program:</strong> ${escapeHtml(payload.program)}` : ""}${payload.format ? `<br><strong>Način razgovora:</strong> ${escapeHtml(payload.format)}` : ""}${payload.audience ? `<br><strong>Organizacija ili publika:</strong> ${escapeHtml(payload.audience)}` : ""}${payload.date ? `<br><strong>Okvirni termin:</strong> ${escapeHtml(payload.date)}` : ""}</p><h2>Poruka</h2><p style="white-space:pre-wrap">${escapeHtml(payload.message || "Nije navedena.")}</p>`;
      response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [recipient], reply_to: payload.email, subject, html }), signal: AbortSignal.timeout(10000) });
    }
    if (!response.ok) throw new Error();
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Delivery failed" }, { status: 502 }); }
}
