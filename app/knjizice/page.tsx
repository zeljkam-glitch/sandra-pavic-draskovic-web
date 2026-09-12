import Link from "next/link";
import {ArrowLink,Footer,Header} from "../site-components";

export default function Page(){
 return <><Header/><main className="shop">
  <section className="shop-hero"><p className="kicker">Digitalne knjižice</p><h1>Za čitanje vlastitim tempom.</h1><p>Svaka knjižica obrađuje jednu temu. Nakon kupnje PDF stiže na email i ostaje ti za kasnije.</p></section>
  <section className="shop-list wrap">
   <article><span>U pripremi</span><div><h2>Sandrine knjižice uskoro dolaze ovdje.</h2><p>Nakon sastanka dodat ćemo stvarne naslove, naslovnice, opise, ogledne stranice i cijene.</p></div><div className="shop-meta"><strong>TODO_CONFIRM_WITH_SANDRA</strong><Link className="button disabled-link" aria-disabled="true" href="#priprema">Kupnja još nije aktivna</Link></div></article>
  </section>
  <section id="priprema" className="shop-format"><div className="wrap"><p className="kicker">Prije objave</p><h2>Što još trebamo od Sandre?</h2><p>Gotove PDF datoteke, podatke o autorstvu, cijene, nekoliko stranica za pregled i odluku o sustavu naplate. Zdravstveni sadržaj treba pregledati prije prodaje.</p><ArrowLink href="/">Povratak na naslovnicu</ArrowLink><p className="todo">TODO_MEDICAL_CONTENT_REVIEW<br/>TODO_CONFIRM_LEGAL_DETAILS</p></div></section>
 </main><Footer/></>
}
