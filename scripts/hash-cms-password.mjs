import {randomBytes, scryptSync} from "node:crypto";
import {createInterface} from "node:readline/promises";

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error("Pokrenite skriptu u interaktivnom terminalu.");
  process.exit(1);
}

const terminal = createInterface({input:process.stdin, output:process.stdout});
process.stdout.write("Nova CMS lozinka (unos se neće prikazati): ");
process.stdin.setRawMode(true);
let password = "";
for await (const chunk of process.stdin) {
  const character = chunk.toString();
  if (character === "\r" || character === "\n") break;
  if (character === "\u0003") process.exit(130);
  if (character === "\u007f") password = password.slice(0, -1);
  else password += character;
}
process.stdin.setRawMode(false);
process.stdout.write("\n");
terminal.close();

if (password.length < 14) {
  console.error("Lozinka mora imati najmanje 14 znakova.");
  process.exit(1);
}
const salt = randomBytes(16).toString("base64url");
const hash = scryptSync(password, salt, 32).toString("base64url");
password = "";
console.log(`scrypt$${salt}$${hash}`);
