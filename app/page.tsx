import type {Metadata} from "next";
import Image from "next/image";
import {ArrowLink, Footer, Header} from "./site-components";

export const metadata:Metadata={alternates:{canonical:"/"}};

const services = [
  {n:"01", eyebrow:"Prvi korak individualnog rada", title:"Uvodno savjetovanje", text:"Temeljita procjena prehrane, dodataka prehrani, navika i ciljeva prije odluke o daljnjem individualnom radu.", meta:"90+ min · 200 €", detail:"Online ili uživo u Zagrebu", href:"/savjetovanje", cta:"Pogledaj kako izgleda"},
  {n:"02", eyebrow:"Za tvrtke, udruge i zajednice", title:"Predavanja i radionice", text:"Stručne teme približene ljudima bez suhoparne teorije, uz prostor za pitanja i mogući praktični dio.", meta:"60 ili 90 min", detail:"Ponuda prema temi, publici i formatu", href:"/predavanja", cta:"Pogledaj formate"},
  {n:"03", eyebrow:"Učenje vlastitim tempom", title:"Edukativni vodiči s receptima", text:"Materijali kojima se možeš vraćati kad planiraš obroke, kupuješ namirnice ili želiš krenuti od jedne izvedive promjene.", meta:"Od 29 €", detail:"Tri digitalna izdanja u pripremi", href:"/webshop", cta:"Pogledaj vodiče"},
];

const faqs = [
  ["Kome su namijenjene individualne konzultacije?", "Osobama koje žele razumjeti prehranu, dodatke prehrani i svakodnevne navike u kontekstu vlastite terapije, ciljeva i stvarnog života."],
  ["Kako izgleda konzultacija?", "Prije susreta Sandra upoznaje tvoj kontekst kroz dogovorene informacije. Zatim slijedi najmanje 90 minuta razgovora, online ili uživo u Zagrebu, a nakon susreta dobivaš pisane edukativne smjernice."],
  ["Mogu li Sandri poslati nalaze preko prvog obrasca?", "Ne. U prvom upitu šalješ samo kontakt i temu. Ako je dokumentacija potrebna, nakon dogovora dobivaš upute za zaseban i sigurniji postupak."],
  ["Zamjenjuju li konzultacije liječnički pregled?", "Ne. Sandra ne postavlja dijagnozu, ne liječi bolest i ne mijenja propisanu terapiju. Pomaže ti razumjeti informacije i pripremiti bolja pitanja za zdravstveni tim."],
  ["Kome su namijenjena predavanja i radionice?", "Tvrtkama, udrugama i organizacijama koje žele stručnu temu približiti ljudima na razumljiv i primjenjiv način."],
  ["Mogu li već kupiti edukativne vodiče?", "Ponudu, sadržaj i cijene možeš pogledati na stranici Vodiči. Online kupnja bit će uključena nakon povezivanja naplate i sigurne dostave digitalnih izdanja."],
] as const;

export default function Home() {
  return <><Header/><main>
    <section className="hero">
      <div className="hero-copy"><p className="kicker">Natura Sanat · individualno savjetovanje</p><h1>Savjetovanje prilagođeno vama, vašem zdravlju i svakodnevici.</h1><p className="lede">Za osobe koje žele razumjeti prehranu, dodatke i svakodnevne navike u kontekstu vlastite terapije, ciljeva i stvarnog života.</p><div className="hero-facts" aria-label="Osnovne informacije"><span><strong>90+ min</strong> trajanje</span><span><strong>200 €</strong> uvodno savjetovanje</span><span><strong>Online / Zagreb</strong> način održavanja</span></div><div className="actions"><a className="button" href="/savjetovanje#upit">Zatraži uvodno savjetovanje</a><ArrowLink href="#kako-radimo">Kako izgleda proces</ArrowLink></div><p className="hero-note">Svaki individualni rad započinje uvodnim savjetovanjem.</p></div>
      <figure className="hero-photo"><Image src="/images/sandra/sandra-hero.jpg" alt="Sandra Drašković u bijelom puloveru uz prozor" fill priority sizes="(max-width: 800px) 100vw, 48vw"/></figure>
    </section>

    <section className="trust-strip" aria-label="Stručnost i najvažnije suradnje"><div className="wrap trust-strip-inner"><p><strong>mag. pharm.</strong><span>fitoaromaterapeutkinja</span><span>edukatorica</span></p><p><span>Suradnje</span><a href="https://budidobro.hr/" target="_blank" rel="noreferrer">Budi dobro</a><a href="https://iget.hr/" target="_blank" rel="noreferrer">IGET</a><a href="https://www.prezivjela.com/" target="_blank" rel="noreferrer">Preživjela. Što sada?</a></p></div></section>

    <section className="audience wrap"><div><p className="kicker">Kome je savjetovanje namijenjeno</p><h2>Kad opći savjeti više nisu dovoljni.</h2></div><div><p>Jedan savjet kaže izbaci. Drugi kaže dodaj. Između njih su tvoja terapija, san, obitelj, posao, ciljevi i dani kad nema mjesta za savršen plan.</p><p>Sandra zato ne kreće od gotovog jelovnika. Najprije sagledava ono što već radiš, što želiš postići, što uzimaš i koje su promjene u tvojoj svakodnevici stvarno izvedive.</p><p className="notice">Savjetovanje je edukativno. Ne postavlja dijagnozu, ne mijenja liječničku terapiju i ne zamjenjuje liječnički pregled.</p></div></section>

    <section className="process wrap" id="kako-radimo"><header><p className="kicker">Kako Sandra radi</p><h2>Od prvog javljanja do jasne preporuke.</h2></header><ol className="process-grid"><li><span>01</span><h3>Kratki upit</h3><p>Šalješ samo kontakt i temu. U ovoj fazi ne šalješ medicinsku dokumentaciju.</p></li><li><span>02</span><h3>Dogovor i suglasnost</h3><p>Ako je usluga prikladna, dobivaš informacije o opsegu, privatnosti, plaćanju i terminu.</p></li><li><span>03</span><h3>Uvodno savjetovanje</h3><p>Najmanje 90 minuta, online ili uživo u Zagrebu. Sandra prije termina proučava dogovorene informacije.</p></li><li><span>04</span><h3>Preporuka što dalje</h3><p>Proces može završiti ovdje ili slijedi zaseban prijedlog prikladnog nastavka rada.</p></li></ol></section>

    <section className="services"><header><p className="kicker">Usluge</p><h2>Nije svima potreban isti razgovor. Ni isti način rada.</h2></header><div className="product-list">{services.map(s=><article key={s.n}><div className="product-index"><span>{s.n}</span><small>{s.eyebrow}</small></div><div><h3>{s.title}</h3><p>{s.text}</p><p className="product-detail">{s.detail}</p></div><div className="product-action"><strong>{s.meta}</strong><ArrowLink href={s.href}>{s.cta}</ArrowLink></div></article>)}</div></section>

    <section className="about-band"><div className="wrap about-grid"><figure><Image src="/images/sandra/sandra-about-v1.webp" alt="Sandra Drašković stoji prekriženih ruku u svijetlom interijeru" fill sizes="(max-width: 900px) 100vw, 36vw"/></figure><div><p className="kicker">O Sandri</p><h2>Stručno znanje. Osobno razumijevanje.</h2><p>Sandra je magistra farmacije, fitoaromaterapeutkinja i edukatorica. Kroz Natura Sanat pomaže ljudima jasnije razumjeti prehranu, dodatke i navike, uz poštovanje liječničkih preporuka i granica savjetovanja.</p><p>Njezine preporuke moraju imati mjesto u stvarnom danu. Zato razgovor ne počinje savršenim planom, nego osobom, njezinim pitanjima i onime što je u ovom trenutku moguće promijeniti.</p><ArrowLink href="/sandra">Više o Sandri</ArrowLink></div></div></section>

    <section className="faq wrap"><p className="kicker">Prije nego pošalješ upit</p><h2>Pitanja koja je dobro razjasniti odmah.</h2><div className="faq-list">{faqs.map(([question, answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

    <section className="final-cta"><div className="wrap"><p className="kicker">Prvi korak</p><h2>Svaki individualni rad započinje uvodnim savjetovanjem.</h2><p>U najmanje 90 minuta Sandra sagledava tvoju prehranu, dodatke, navike i ciljeve te preporučuje ima li smisla i kako nastaviti.</p><div className="actions"><a className="button" href="/savjetovanje#upit">Zatraži uvodno savjetovanje</a><ArrowLink href="/savjetovanje">Saznaj što uključuje</ArrowLink></div></div></section>
  </main><Footer/></>;
}
