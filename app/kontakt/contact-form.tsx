"use client";

import { useState, type FormEvent } from "react";

const topics = [
  ["konzultacije", "Individualne konzultacije"],
  ["predavanje", "Predavanje ili radionica"],
  ["suradnja", "Prijedlog suradnje"],
  ["ostalo", "Imam drugo pitanje"],
] as const;

export function ContactForm({ initialTopic, program, enabled, contactEmail }: { initialTopic?: string; program?: string; enabled: boolean; contactEmail: string }) {
  const [topic, setTopic] = useState(topics.some(([id]) => id === initialTopic) ? initialTopic! : "konzultacije");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error("Upit nije poslan. Pokušaj ponovno malo kasnije; uneseni podaci ostaju u formi.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upit nije poslan. Pokušaj ponovno.");
      setStatus("error");
    }
  }
  if (status === "sent") return <div className="contact-success" role="status"><h2>Hvala, upit je zaprimljen.</h2><p>Sandra će odgovoriti na adresu koju si ostavila, u pravilu u roku od dva radna dana.</p><button className="arrow-link" onClick={() => setStatus("idle")}>Napiši novi upit</button></div>;
  return <form className="contact-form" onSubmit={submit}>
    <fieldset><legend>Što te zanima?</legend><div className="contact-topics">{topics.map(([id, label]) => <label key={id} className={topic === id ? "selected" : ""}><input type="radio" name="topic" value={id} checked={topic === id} onChange={() => setTopic(id)} />{label}</label>)}</div></fieldset>
    {program && topic === "konzultacije" && <p className="contact-program">Upit za: <strong>{program.slice(0, 150)}</strong><input type="hidden" name="program" value={program.slice(0, 150)} /></p>}
    <div className="contact-fields"><label><span className="contact-label">Tvoje ime <small>Obvezno</small></span><input name="name" autoComplete="given-name" required maxLength={100} /></label><label><span className="contact-label">Email za odgovor <small>Obvezno</small></span><input type="email" name="email" autoComplete="email" required maxLength={254} /></label></div>
    {topic === "konzultacije" && <label><span className="contact-label">Kako ti odgovara razgovarati?<small>Neobvezno</small></span><select name="format" defaultValue="Dogovor"><option value="Dogovor">Dogovorit ćemo se</option><option>Online</option><option>Uživo</option></select></label>}
    {topic === "predavanje" && <div className="contact-fields"><label><span className="contact-label">Organizacija ili publika <small>Neobvezno</small></span><input name="audience" maxLength={200} placeholder="Npr. udruga, tvrtka ili tim" /></label><label><span className="contact-label">Okvirni termin <small>Neobvezno</small></span><input name="date" maxLength={100} placeholder="Npr. studeni ili još ne znamo" /></label></div>}
    <label><span className="contact-label">{topic === "ostalo" ? "Tvoje pitanje" : "Tvoja poruka"}<small>{topic === "ostalo" ? "Obvezno" : "Neobvezno"}</small></span><textarea name="message" rows={4} required={topic === "ostalo"} maxLength={3000} placeholder={topic === "predavanje" ? "Ako znaš, dodaj temu i broj sudionika." : topic === "suradnja" ? "Opiši ukratko svoju ideju." : "Dovoljno je nekoliko riječi. Možeš i ostaviti prazno."} /></label>
    <div className="contact-trap" aria-hidden="true"><label>Web stranica<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="fine">Za ovaj upit dovoljni su kontakt i tema. Nalaze i zdravstvenu dokumentaciju dostavljaš zasebno, nakon dogovora.</p>
    {!enabled && <p className="contact-preview-note" role="status">Slanje kroz obrazac još se povezuje s profesionalnom adresom. Do tada se možeš javiti na <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>}
    {status === "error" && <p role="alert" className="notice">{error} Možeš se javiti i na <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>}
    <button className="button" type="submit" disabled={!enabled || status === "sending"}>{status === "sending" ? "Šaljem…" : "Pošalji upit"}</button>
  </form>;
}
