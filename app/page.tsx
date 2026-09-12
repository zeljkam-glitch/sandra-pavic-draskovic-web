import Image from "next/image";
import Link from "next/link";
import {ArrowLink, Footer, Header} from "./site-components";

export default function Home(){
  return <><Header/><main>
    <section className="home-hero">
      <div className="home-hero__copy">
        <p className="kicker">Prehrana, biljke i svakodnevne navike</p>
        <h1>Brini o zdravlju prije nego što moraš.</h1>
        <p className="intro">Sandra povezuje farmaceutsko znanje s prehranom, suplementima i biljkama. Jasno objašnjava što je važno, što može pričekati i kako promjene uklopiti u stvaran život.</p>
        <p className="byline"><strong>Sandra Pavić Drašković</strong><span>mag. pharm. · fitoaromaterapeutkinja · edukatorica</span></p>
        <div className="actions"><Link className="button" href="/health-review">Rezerviraj Health Review</Link><ArrowLink href="/sandra">O Sandri</ArrowLink></div>
      </div>
      <figure className="home-hero__image"><Image src="/editorial-produce.png" alt="Svježe povrće i voće u gradskoj kuhinji" fill priority sizes="(max-width: 760px) 100vw, 48vw"/></figure>
    </section>

    <section className="statement"><div className="measure"><p className="kicker">Zdravlje prije problema</p><h2>Ne moraš čekati dijagnozu da bi se počeo bolje brinuti o sebi.</h2><p>Većina ljudi o snu, prehrani, stresu i navikama ozbiljno razmišlja tek kada se pojavi problem. Sandra pomaže razlučiti što u moru savjeta ima smisla upravo za tebe.</p></div></section>

    <section className="offer wrap" id="rad"><header><p className="kicker">Rad sa Sandrom</p><h2>Odaberi podršku koja ti sada treba.</h2></header>
      <div className="offer-list">
        <article><div><p>Individualno</p><h3>Health Review</h3></div><p>Devedeset minuta za pregled navika, pitanja i prioriteta.</p><strong>120 €</strong><ArrowLink href="/health-review">Saznaj više</ArrowLink></article>
        <article><div><p>Grupni program</p><h3>Health Reset</h3></div><p>Šest tjedana za održiviji odnos prema prehrani i zdravlju.</p><strong>329 €</strong><ArrowLink href="/health-reset">O programu</ArrowLink></article>
        <article><div><p>Za tvrtke i organizacije</p><h3>Predavanja</h3></div><p>Stručno, razumljivo i korisno i nakon izlaska iz dvorane.</p><strong>od 450 €</strong><ArrowLink href="/predavanja">Teme i suradnja</ArrowLink></article>
      </div>
    </section>

    <section className="about-home"><div className="wrap about-home__grid"><div className="about-photo"><span>Sandrin portret</span><small>TODO_CONFIRM_WITH_SANDRA</small></div><div><p className="kicker">Sandra Pavić Drašković</p><h2>Struka joj je dala temelj. Život je promijenio perspektivu.</h2><p>Sandra je magistra farmacije, fitoaromaterapeutkinja i edukatorica. Vlastito iskustvo ozbiljne bolesti utjecalo je na njezin pogled na zdravlje, ali ga ne svodi na jednu dijagnozu.</p><p>Danas radi s ljudima koji žele razumjeti svoje odluke i uvesti promjene koje mogu zadržati.</p><ArrowLink href="/sandra">Pročitaj Sandrinu priču</ArrowLink></div></div></section>

    <section className="editorial-quote"><blockquote>“Dobar plan nije onaj kojeg se držiš tri tjedna. Dobar plan ima mjesto u tvom životu.”</blockquote><p>Sandra, predloženi tekst za brand</p></section>

    <section className="book-home"><div className="wrap book-home__grid"><div><p className="kicker">Digitalne knjižice</p><h2>Pročitaj. Razumij. Primijeni.</h2></div><div><p>Sandrine knjižice obrađuju jednu temu od početka do kraja. Možeš ih preuzeti odmah nakon kupnje i vratiti im se kad zatreba.</p><p className="pending">Naslovi, naslovnice i cijene bit će dodani nakon potvrde sa Sandrom.</p><ArrowLink href="/knjizice">Pogledaj knjižice</ArrowLink></div></div></section>

    <section className="notes wrap"><header><p className="kicker">Sandra objašnjava</p><h2>Manje buke. Više konteksta.</h2></header><div className="notes-list"><Link href="/znanje"><span>Prehrana</span><h3>Trebaš li stvarno detox?</h3></Link><Link href="/znanje"><span>Suplementi</span><h3>Magnezij nije samo magnezij.</h3></Link><Link href="/znanje"><span>Prevencija</span><h3>Promjena ne mora početi bolešću.</h3></Link></div></section>

    <section className="newsletter"><div className="newsletter__inner"><div><p className="kicker">Bilješke o zdravlju</p><h2>Jedno korisno pismo, dva puta mjesečno.</h2><p>Sandra u svakom izdanju uzima jednu temu i objašnjava je bez dramatiziranja.</p></div><form><label htmlFor="email">Email adresa</label><input id="email" type="email" placeholder="ime@email.com"/><button type="button">Prijavi se</button><small>TODO_CONFIRM_WITH_SANDRA: povezati newsletter</small></form></div></section>
  </main><Footer/></>
}
