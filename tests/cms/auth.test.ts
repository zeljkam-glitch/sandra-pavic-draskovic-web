import assert from "node:assert/strict";
import {scryptSync} from "node:crypto";
import test from "node:test";

process.env.CMS_SESSION_SECRET="test-session-secret-that-is-longer-than-thirty-two-characters";
const {createCmsSessionToken,verifyCmsPassword,verifyCmsSessionToken}=await import("../../lib/cms/auth");

test("CMS session token is signed and expires",()=>{const now=Date.UTC(2026,9,13);const token=createCmsSessionToken("Sandra@Example.com",now);assert.equal(verifyCmsSessionToken(token,now)?.email,"sandra@example.com");assert.equal(verifyCmsSessionToken(`${token}x`,now),null);assert.equal(verifyCmsSessionToken(token,now+13*60*60*1000),null);});
test("CMS password verification uses a scrypt hash",()=>{const salt="test-salt";const stored=`scrypt$${salt}$${scryptSync("duga-sigurna-lozinka",salt,32).toString("base64url")}`;assert.equal(verifyCmsPassword("duga-sigurna-lozinka",stored),true);assert.equal(verifyCmsPassword("pogresna-lozinka",stored),false);});
