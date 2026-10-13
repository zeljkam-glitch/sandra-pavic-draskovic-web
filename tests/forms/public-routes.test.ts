import assert from "node:assert/strict";
import test from "node:test";
import {POST as contactPost} from "../../app/api/contact/route";
import {POST as newsletterPost} from "../../app/api/newsletter/route";
import {POST as clientDocumentsPost} from "../../app/api/client-documents/[token]/submit/route";

function jsonRequest(path: string, body: Record<string, unknown>, origin = "https://naturasanat.hr") {
  return new Request(`https://naturasanat.hr${path}`, {
    method: "POST",
    headers: {origin, "content-type": "application/json"},
    body: JSON.stringify(body),
  });
}

test("public forms reject cross-origin submissions", async () => {
  const contact = await contactPost(jsonRequest("/api/contact", {}, "https://attacker.example"));
  const newsletter = await newsletterPost(jsonRequest("/api/newsletter", {}, "https://attacker.example"));
  assert.equal(contact.status, 403);
  assert.equal(newsletter.status, 403);
});

test("contact honeypot and newsletter consent are enforced", async () => {
  const contact = await contactPost(jsonRequest("/api/contact", {website: "spam", name: "Bot", email: "bot@example.com", topic: "ostalo", message: "spam"}));
  const newsletter = await newsletterPost(jsonRequest("/api/newsletter", {email: "reader@example.com", consent: false}));
  assert.equal(contact.status, 400);
  assert.equal(newsletter.status, 400);
});

test("health questionnaire submission is fail-closed by default", async () => {
  const previous = process.env.CLIENT_DOCUMENTS_SUBMISSION_ENABLED;
  delete process.env.CLIENT_DOCUMENTS_SUBMISSION_ENABLED;
  try {
    const response = await clientDocumentsPost(
      jsonRequest("/api/client-documents/pregled/submit", {}),
      {params: Promise.resolve({token: "pregled"})},
    );
    assert.equal(response.status, 503);
  } finally {
    if (previous !== undefined) process.env.CLIENT_DOCUMENTS_SUBMISSION_ENABLED = previous;
  }
});
