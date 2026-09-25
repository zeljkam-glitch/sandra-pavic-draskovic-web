"use client";

import { useRef, useState, type FormEvent } from "react";
import { steps } from "./questions";

type DeliveryStatus = "idle" | "sending" | "sent" | "error";

export function Questionnaire({ preview, token }: { preview: boolean; token: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [signatureName, setSignatureName] = useState("");
  const [signaturePlace, setSignaturePlace] = useState("");
  const [signatureDate, setSignatureDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [acceptedConsent, setAcceptedConsent] = useState(false);
  const [acceptedHealthData, setAcceptedHealthData] = useState(false);
  const [electronicSignature, setElectronicSignature] = useState(false);
  const [status, setStatus] = useState<DeliveryStatus>("idle");
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const review = step === steps.length;
  const total = steps.length + 1;
  const downloadBase = `/api/client-documents/${encodeURIComponent(token)}/pdf`;
  const readyToSign = Boolean(signatureName && signaturePlace && signatureDate && acceptedConsent && acceptedHealthData && electronicSignature);

  function move(next: number) {
    setStep(next);
    setStatus("idle");
    setError("");
    requestAnimationFrame(() => {
      heading.current?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  async function submitDocuments(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!review) {
      move(step + 1);
      return;
    }
    if (!readyToSign) return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(`/api/client-documents/${encodeURIComponent(token)}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, signatureName, signaturePlace, signatureDate, acceptedConsent, acceptedHealthData, electronicSignature }),
      });
      const result = await response.json().catch(() => ({})) as {error?: string};
      if (!response.ok) throw new Error(result.error || "Dokumenti nisu poslani.");
      setStatus("sent");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Dokumenti nisu poslani. Pokušaj ponovno.");
      setStatus("error");
    }
  }

  if (status === "sent") return <main className="questionnaire-shell">
    <div className="questionnaire-brand"><a className="brand" href="/">Sandra Drašković</a><span>Privatni dokumenti klijenta</span></div>
    <section className="questionnaire-card questionnaire-success" role="status"><p className="kicker">Predaja je dovršena</p><h1>Hvala, dokumenti su potpisani i poslani Sandri.</h1><p>Na e-mail adresu Sandre poslan je ispunjeni upitnik, potvrde privole i zapis elektroničkog potpisa s datumom predaje.</p><div className="private-downloads"><a className="button" href={`${downloadBase}/suglasnost`}>Preuzmi suglasnost u PDF-u</a><a className="arrow-link" href={`${downloadBase}/upitnik`}>Preuzmi upitnik u PDF-u</a></div></section>
  </main>;

  return <main className="questionnaire-shell">
    <div className="questionnaire-brand"><a className="brand" href="/">Sandra Drašković</a><span>Privatni dokumenti klijenta</span></div>
    <div className="questionnaire-preview" role="status">{preview ? "Pregled radne verzije. Koristi samo izmišljene odgovore." : "Ova privatna poveznica namijenjena je samo osobi kojoj ju je Sandra poslala nakon kupnje."} Podaci se šalju tek nakon završnog pregleda i elektroničkog potpisa.</div>
    <section className="private-document-intro"><div><p className="kicker">PDF dokumenti</p><h1>Suglasnost i upitnik prije konzultacije</h1><p>Obrasce možeš ispuniti i potpisati online. Ako ti je lakše, preuzmi PDF, ispuni ga ručno i vrati Sandri dogovorenim sigurnim kanalom.</p></div><div className="private-downloads"><a className="button" href={`${downloadBase}/suglasnost`}>Preuzmi suglasnost u PDF-u</a><a className="arrow-link" href={`${downloadBase}/upitnik`}>Preuzmi upitnik u PDF-u</a></div></section>
    <section className="questionnaire-card"><div className="questionnaire-progress"><span>Korak {step + 1} od {total}</span><span>{review ? "Pregled, privole i potpis" : steps[step].title}</span></div><progress max={total} value={step + 1} aria-label="Napredak ispunjavanja" />
    <h1 tabIndex={-1} ref={heading}>{review ? "Provjeri i elektronički potpiši." : steps[step].title}</h1><p className="questionnaire-intro">{review ? "Pregledaj odgovore. Možeš se vratiti i dopuniti bilo koji korak prije potpisivanja i slanja." : steps[step].intro}</p>
    <form ref={form} onSubmit={submitDocuments}>
      {!review && <div className="questionnaire-fields">{steps[step].fields.map((field) => <label key={field.id}><span className="questionnaire-label">{field.label}<small>{field.required ? "Obvezno" : "Neobvezno"}</small></span>{field.help && <span className="questionnaire-help">{field.help}</span>}{field.type === "textarea" ? <textarea rows={4} maxLength={3000} value={answers[field.id] || ""} onChange={(event) => setAnswers({ ...answers, [field.id]: event.target.value })} /> : <input type={field.type || "text"} required={field.required} min={field.min} max={field.max} step={field.type === "number" ? "any" : undefined} maxLength={300} value={answers[field.id] || ""} onChange={(event) => setAnswers({ ...answers, [field.id]: event.target.value })} autoComplete={field.id === "name" ? "name" : field.id === "email" ? "email" : field.id === "phone" ? "tel" : "off"} />}</label>)}</div>}
      {review && <div className="questionnaire-review">
        {steps.map((section, index) => <section key={section.title}><header><h2>{section.title}</h2><button type="button" className="arrow-link" onClick={() => move(index)}>Uredi</button></header><dl>{section.fields.map((field) => <div key={field.id}><dt>{field.label}</dt><dd>{answers[field.id] || "Nije navedeno"}</dd></div>)}</dl></section>)}
        <section className="questionnaire-consent"><p className="kicker">Suglasnost i privole</p><h2>Potvrde prije potpisa</h2><details><summary>Pročitaj sažetak suglasnosti</summary><ol><li>Savjetovanje je edukativno i nije namijenjeno dijagnosticiranju ili liječenju bolesti.</li><li>Savjeti ne zamjenjuju liječnički pregled, propisanu terapiju, operaciju, kemoterapiju ili zračenje.</li><li>Medicinska pomoć i odluke o terapiji ostaju u nadležnosti kvalificiranog zdravstvenog djelatnika.</li><li>Podaci uneseni u ovaj upitnik obrađuju se za pripremu i provedbu dogovorenog individualnog savjetovanja.</li><li>Klijent ima pravo na pristup, ispravak, brisanje i ograničenje obrade u skladu s primjenjivim pravilima.</li></ol><p>Cijeli tekst suglasnosti dostupan je u PDF dokumentu iznad.</p></details>
        <div className="consent-checks">
          <label><input type="checkbox" checked={acceptedConsent} onChange={(event) => setAcceptedConsent(event.target.checked)} /><span>Pročitao/la sam suglasnost, razumijem prirodu i granice savjetovanja te prihvaćam njezin sadržaj.</span></label>
          <label><input type="checkbox" checked={acceptedHealthData} onChange={(event) => setAcceptedHealthData(event.target.checked)} /><span>Izričito pristajem na obradu podataka o zdravlju koje sam naveo/la u ovom upitniku, isključivo radi pripreme i provedbe dogovorene konzultacije.</span></label>
        </div></section>
        <section className="questionnaire-signature"><p className="kicker">Elektronički potpis</p><h2>Potpis dokumentacije</h2><div className="signature-fields"><label><span>Ime i prezime, jednako kao u upitniku</span><input required value={signatureName} onChange={(event) => setSignatureName(event.target.value)} autoComplete="name" maxLength={150} /></label><label><span>Mjesto</span><input required value={signaturePlace} onChange={(event) => setSignaturePlace(event.target.value)} maxLength={100} /></label><label><span>Datum</span><input required type="date" value={signatureDate} onChange={(event) => setSignatureDate(event.target.value)} /></label></div><label className="electronic-signature-confirm"><input type="checkbox" checked={electronicSignature} onChange={(event) => setElectronicSignature(event.target.checked)} /><span>Potvrđujem da upisano ime predstavlja moj elektronički potpis te da želim potpisati i poslati ovu suglasnost i upitnik Sandri.</span></label><p className="fine">Uz predaju se bilježe sadržaj odgovora, potvrđene privole te datum i vrijeme slanja. Poveznicu nemoj prosljeđivati drugima.</p></section>
        {status === "error" && <p role="alert" className="notice">{error}</p>}
      </div>}
      <div className="questionnaire-actions">{step > 0 ? <button type="button" className="arrow-link" onClick={() => move(step - 1)}>← Natrag</button> : <span className="fine">Možeš ostaviti neobvezna polja prazna.</span>}{review ? <button type="submit" className="button" disabled={!readyToSign || status === "sending"}>{status === "sending" ? "Šaljem..." : "Potpiši i pošalji Sandri"}</button> : <button className="button" type="submit">{step === steps.length - 1 ? "Pregledaj odgovore" : "Nastavi →"}</button>}</div>
    </form></section><p className="questionnaire-footnote">Obrazac služi pripremi razgovora. Ne daje dijagnozu ni preporuke za liječenje. Zdravstvene podatke nemoj slati drugim kanalima osim onima koje je Sandra dogovorila.</p>
  </main>;
}
