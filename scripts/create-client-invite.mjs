import {createHash, createHmac, randomBytes} from "node:crypto";

const paymentReference = process.argv[2]?.trim();
const days = Number(process.argv[3] || 14);
const secret = process.env.QUESTIONNAIRE_INVITE_SECRET;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

if (!paymentReference) {
  console.error("Upotreba: npm run invite:create -- REFERENCA_KUPNJE [BROJ_DANA]");
  process.exit(1);
}

if (!secret || secret.length < 32) {
  console.error("Postavi QUESTIONNAIRE_INVITE_SECRET s najmanje 32 znaka.");
  process.exit(1);
}

if (!Number.isFinite(days) || days < 1 || days > 90) {
  console.error("Broj dana mora biti između 1 i 90.");
  process.exit(1);
}

const payload = Buffer.from(JSON.stringify({
  version: 1,
  id: randomBytes(24).toString("hex"),
  paymentReferenceHash: createHash("sha256").update(paymentReference).digest("hex"),
  exp: Math.floor(Date.now() / 1000) + Math.round(days * 24 * 60 * 60),
})).toString("base64url");

const signature = createHmac("sha256", secret).update(payload).digest("base64url");
console.log(`${siteUrl}/priprema-konzultacije/${payload}.${signature}`);
