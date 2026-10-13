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

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!validInvitation(token)) return NextResponse.json({ error: "Poveznica nije valjana ili je istekla." }, { status: 404 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "Origin" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Content type" }, { status: 415 });
  if (process.env.CLIENT_DOCUMENTS_SUBMISSION_ENABLED !== "true") {
    return NextResponse.json({ error: "Sigurna predaja zdravstvenih podataka još nije aktivirana." }, { status: 503 });
  }

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
      consentPdfSha256: "2b84669dda7ed716884929d8c0ce3ab1486b1c3b559ecda0ebe436431c261edc",
      questionnairePdfSha256: "a3487f42160f532cbe3446e64558bb36d76494b376f5298a997d3e23e56fca18",
    },
    answers,
    signature: { fullName: signatureName, place: signaturePlace, date: signatureDate, electronic: true },
    consents: { consultationConsent: true, healthDataConsent: true },
  };

  const webhook = process.env.CLIENT_DOCUMENTS_WEBHOOK_URL;
  if (!webhook || !process.env.CLIENT_DOCUMENTS_WEBHOOK_TOKEN) return NextResponse.json({ error: "Sigurna predaja zdravstvenih podataka još nije povezana." }, { status: 503 });

  try {
    const target = new URL(webhook);
    if (target.protocol !== "https:") throw new Error("Insecure webhook");
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.CLIENT_DOCUMENTS_WEBHOOK_TOKEN}` },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(15_000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Webhook delivery failed");
    return NextResponse.json({ success: true, submittedAt }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Dokumenti nisu poslani. Pokušaj ponovno ili kontaktiraj Sandru." }, { status: 502 });
  }
}
