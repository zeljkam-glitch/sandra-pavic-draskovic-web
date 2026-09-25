import Image from "next/image";
import { Header, Footer } from "../site-components";
import { ContactForm } from "./contact-form";

export const dynamic = "force-dynamic";
export default async function Page({ searchParams }: { searchParams: Promise<{ tema?: string; program?: string }> }) {
  const params = await searchParams;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@sandrapavicdraskovic.com";
  const enabled = Boolean(process.env.CONTACT_WEBHOOK_URL || (process.env.RESEND_API_KEY && process.env.CONTACT_FROM && process.env.CONTACT_RECIPIENT));
  return <><Header/><main className="contact-page"><div className="wrap contact-layout"><section className="contact-intro"><p className="kicker">Kontakt</p><h1>Počnimo jednim razgovorom.</h1><p>Odaberi što te zanima i ostavi adresu za odgovor. Ako još ne znaš što pitati, dovoljno je samo odabrati temu.</p><p className="contact-response-time"><strong>Vrijeme odgovora</strong><br/>Sandra odgovara u pravilu u roku od dva radna dana.</p><figure><Image src="/images/sandra/sandra-cafe-green.jpg" alt="Sandra za stolom, s osmijehom" width={1358} height={1474} sizes="(max-width:900px) 100vw, 35vw"/></figure><p className="contact-caption">Konzultacije · predavanja · suradnje</p></section><section className="contact-card" aria-label="Pošalji upit Sandri"><ContactForm initialTopic={params.tema} program={params.program} enabled={enabled} contactEmail={contactEmail}/><div className="contact-privacy"><p>Upit te ne obvezuje na rezervaciju ili kupnju i ne prijavljuje te na newsletter.</p><p>Ako obrazac ne radi, javi se na <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p><a href="/privatnost">Kako obrađujemo podatke →</a></div></section></div></main><Footer/></>;
}
