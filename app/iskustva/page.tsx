import type {Metadata} from "next";
import {testimonials} from "../_data/testimonials";
import {Footer, Header} from "../site-components";

export const metadata:Metadata={
  title:"Iskustva polaznica",
  description:"Iskustva polaznica Sandrinih programa, radionica i korisnica edukativnih vodiča.",
  alternates:{canonical:"/iskustva"},
};

export default function IskustvaPage(){
  return <><Header/><main>
    <section className="page-hero yellow"><div><p className="kicker">Iskustva polaznica</p><h1>Što kažu osobe koje su učile uz Sandru.</h1><p className="lede">Iskustva iz Sandrinih programa, radionica i edukativnih vodiča.</p></div></section>
    <section className="testimonials testimonials-archive"><div className="wrap"><div className="testimonial-grid">{testimonials.map(testimonial=><figure className="testimonial-card" key={`${testimonial.name}-${testimonial.context}`}><blockquote>“{testimonial.quote}”</blockquote><figcaption><strong>{testimonial.name}</strong><span>{testimonial.context}</span></figcaption></figure>)}</div><p className="testimonial-note">Izjave su jezično uređene i skraćene radi čitljivosti, bez mijenjanja smisla.</p></div></section>
    <section className="final-cta"><div className="wrap"><p className="kicker">Prvi korak</p><h2>Želiš provjeriti je li Sandrin način rada prikladan za tebe?</h2><p>Pošalji kratki upit bez medicinske dokumentacije. Sandra će ti odgovoriti o mogućem sljedećem koraku.</p><div className="actions"><a className="button" href="/savjetovanje#upit">Pošalji kratki upit</a></div></div></section>
  </main><Footer/></>;
}
