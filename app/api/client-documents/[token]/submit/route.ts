import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { steps } from "../../../../priprema-konzultacije/questions";
import { validInvitation } from "../../../../priprema-konzultacije/invitations";

export const dynamic = "force-dynamic";

const allowedAnswerIds = new Set(steps.flatMap((step) => step.fields.map((field) => field.id)));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, limit);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function answerTable(answers: Record<string, string>) {
  return steps.map((step) => {
    const rows = step.fields.map((field) => `<tr><th style="text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid #ddd">${escapeHtml(field.label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(answers[field.id] || "Nije navedeno")}</td></tr>`).join("");
    return `<h2 style="color:#1d4c3d">${escapeHtml(step.title)}</h2><table style="width:100%;border-collapse:collapse">${rows}</table>`;
  }).join("");
}

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!validInvitation(token)) return NextResponse.json({ error: "Poveznica nije valjana ili je istekla." }, { status: 404 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Content type" }, { status: 415 });

  let data: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 100_000) return NextResponse.json({ error: "Predani obrazac je prevelik." }, { status: 413 });
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    data = parsed;
  } catch {
    return NextResponse.json({ error: "Neispravan obrazac." }, { status: 400 });
  }

  const rawAnswers = data.answers;
  if (!rawAnswers || typeof rawAnswers !== "object" || Array.isArray(rawAnswers)) return NextResponse.json({ error: "Nedostaju odgovori." }, { status: 400 });
  const answers: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawAnswers)) {
    if (!allowedAnswerIds.has(key) || typeof value !== "string" || value.length > 3000) return NextResponse.json({ error: "Neispravno polje u upitniku." }, { status: 400 });
    answers[key] = value.trim();
  }

  const name = clean(answers.name, 100);
  const email = clean(answers.email, 254);
  const signatureName = clean(data.signatureName, 150);
  const signaturePlace = clean(data.signaturePlace, 100);
  const signatureDate = clean(data.signatureDate, 10);
  const acceptedConsent = data.acceptedConsent === true;
  const acceptedHealthData = data.acceptedHealthData === true;
  const electronicSignature = data.electronicSignature === true;

  if (!name || !emailPattern.test(email) || !signatureName || signatureName.localeCompare(name, "hr", { sensitivity: "base" }) !== 0 || !signaturePlace || !/^\d{4}-\d{2}-\d{2}$/.test(signatureDate) || !acceptedConsent || !acceptedHealthData || !electronicSignature) {
    return NextResponse.json({ error: "Provjeri obvezna polja, privole i elektronički potpis." }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const submission = {
    type: "client_consultation_documents",
    version: 1,
    submittedAt,
    invitationHash: createHash("sha256").update(token).digest("hex"),
    documentVersions: {
      consentPdfSha256: "f648c3c1b15a75dc04ab8adfa8aca11191207a14b09404625316214f2cbfb6f0",
      questionnairePdfSha256: "08e1bdc70a8b0632b470fe9d2426d290c8d57c498c1d5b96bc7ce2c47b0ec6ef",
    },
    answers,
    signature: { fullName: signatureName, place: signaturePlace, date: signatureDate, electronic: true },
    consents: { consultationConsent: true, healthDataConsent: true },
  };

  const recipient = process.env.CLIENT_DOCUMENTS_RECIPIENT?.trim();
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CLIENT_DOCUMENTS_FROM;
  const webhook = process.env.CLIENT_DOCUMENTS_WEBHOOK_URL;

  if (!recipient || !emailPattern.test(recipient)) {
    return NextResponse.json({ error: "Adresa za sigurnu dostavu dokumenata još nije postavljena." }, { status: 503 });
  }

  try {
    if (webhook) {
      if (new URL(webhook).protocol !== "https:") throw new Error("Insecure webhook");
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(process.env.CLIENT_DOCUMENTS_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CLIENT_DOCUMENTS_WEBHOOK_TOKEN}` } : {}) },
        body: JSON.stringify({ recipient, subject: `Potpisana suglasnost i upitnik: ${name}`, ...submission }),
        signal: AbortSignal.timeout(15_000),
        redirect: "error",
      });
      if (!response.ok) throw new Error("Webhook delivery failed");
    } else if (resendKey && from) {
      const html = `<h1>Nova potpisana suglasnost i upitnik</h1><p><strong>Klijent:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Potpis:</strong> ${escapeHtml(signatureName)}<br><strong>Mjesto i datum:</strong> ${escapeHtml(signaturePlace)}, ${escapeHtml(signatureDate)}<br><strong>Vrijeme predaje:</strong> ${escapeHtml(submittedAt)}</p><p>Klijent je potvrdio suglasnost za individualno savjetovanje, obradu navedenih zdravstvenih podataka za dogovorenu konzultaciju i uporabu upisanog imena kao elektroničkog potpisa.</p>${answerTable(answers)}`;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [recipient], reply_to: email, subject: `Potpisana suglasnost i upitnik: ${name}`, html }),
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error("Email delivery failed");
    } else {
      return NextResponse.json({ error: "Slanje još nije povezano s profesionalnom adresom." }, { status: 503 });
    }
    return NextResponse.json({ success: true, submittedAt }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Dokumenti nisu poslani. Pokušaj ponovno ili kontaktiraj Sandru." }, { status: 502 });
  }
}
