"use client";

import { FormEvent, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function IntakeForm() {
  const [consent, setConsent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Ime i prezime: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Telefon: ${data.get("phone") || "nije navedeno"}`,
      `Tema: ${data.get("topic")}`,
      `Način savjetovanja: ${data.get("format")}`,
      "",
      "Molim informaciju o prikladnosti uvodnog savjetovanja i dostupnim terminima.",
      "Potvrđujem da u ovom upitu nisam navela zdravstvene ili druge osjetljive podatke.",
    ].join("\n");
    window.location.href = `mailto:pavic.sandra@yahoo.com?subject=${encodeURIComponent("Upit za uvodno savjetovanje")}&body=${encodeURIComponent(body)}`;
  }

  return <form className="intake-form" onSubmit={submit}>
    <label>Ime i prezime<input name="name" required autoComplete="name" /></label>
    <label>Email adresa<input name="email" type="email" required autoComplete="email" /></label>
    <label>Telefon <span>(nije obavezno)</span><input name="phone" type="tel" autoComplete="tel" /></label>
    <label>Što te zanima?<select name="topic" required defaultValue=""><option value="" disabled>Odaberi temu</option><option>Individualna prehrana</option><option>Detox ili sirova prehrana</option><option>Suplementacija</option><option>Prehrana sportaša</option><option>Kontrolno savjetovanje</option><option>Drugo</option></select></label>
    <label>Željeni način<select name="format" required defaultValue="online"><option value="online">Online</option><option value="uživo u Zagrebu">Uživo u Zagrebu</option><option value="svejedno">Svejedno</option></select></label>
    <div className="intake-warning"><strong>Ne upisuj zdravstvene podatke u ovaj obrazac.</strong><p>Dokumentacija se dogovara naknadno, sigurnim putem i tek nakon informirane suglasnosti.</p></div>
    <label className="consent-check"><Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} aria-required="true" /><span>Suglasna/suglasan sam da me Sandra kontaktira radi odgovora na ovaj upit. Pročitao/la sam napomenu o privatnosti i ne šaljem zdravstvene podatke.</span></label>
    <button className="button" type="submit" disabled={!consent}>Pripremi poruku Sandri</button>
    <small>Prije slanja moći ćeš pregledati i izmijeniti poruku u svojoj email aplikaciji.</small>
  </form>;
}
