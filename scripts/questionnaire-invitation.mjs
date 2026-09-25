import { createHmac, randomBytes } from 'node:crypto';
// Issue manually only after Sandra confirms payment of the introductory consultation.
const [reference, origin] = process.argv.slice(2);
const secret = process.env.QUESTIONNAIRE_INVITE_SECRET;
if (!secret || secret.length < 32 || !reference || !origin || new URL(origin).protocol !== 'https:') {
  throw new Error('Required: secret of at least 32 characters, confirmed payment reference, HTTPS site origin.');
}
const payload = Buffer.from(JSON.stringify({id:randomBytes(24).toString('hex'),paymentReferenceHash:createHmac('sha256',secret).update(reference).digest('hex'),exp:Math.floor(Date.now()/1000)+7*86400,version:1})).toString('base64url');
const signature = createHmac('sha256',secret).update(payload).digest('base64url');
process.stdout.write(new URL(`/priprema-konzultacije/${payload}.${signature}`,origin).href+'\n');
