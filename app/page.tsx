import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Footer, Header } from "./site-components";

const steps = [
  ["01", "Kratki upit", "Javljaš se kroz obrazac i biraš temu. U ovoj fazi ne šalješ osjetljivu medicinsku dokumentaciju."],
  ["02", "Dokumenti i suglasnost", "Ako je savjetovanje prikladno, dobivaš upute za sigurnu dostavu dokumentacije i obaveznu informiranu suglasnost."],
  ["03", "Uvodno savjetovanje", "Najmanje 90 minuta, online ili uživo u Zagrebu. Prije termina Sandra proučava dostavljene informacije."],
  ["04", "Procjena i sljedeći korak", "Nakon razgovora dobivaš preporuku: završetak procesa, kontrolno savjetovanje ili prijedlog individualnog plana prehrane i suplementacije."],
];

export default function Home() {
  return <><Header /><main>
    <section className="home-hero home-hero--service">
      <div className="home-hero__copy">
        <p className="kicker">Natura Sanat · individualno savjetovanje</p>
        <h1>Prvo razumijemo cijelu sliku.</h1>
        <p className="intro">Stručno vođeno savjetovanje o prehrani, suplementima i navikama za ljude koji žele jasan, izvediv sljedeći korak — bez gotovih rješenja prije razgovora.</p>
        <div className="hero-facts" aria-label="Osnovne informacije"><span><strong>90+ min</strong> trajanje</span><span><strong>200 €</strong> uvodno savjetovanje</span><span><strong>Online / Zagreb</strong> način održavanja</span></div>
        <div className="actions"><Link className="button" href="/savjetovanje#upit">Zatraži uvodno savjetovanje</Link><ArrowLink href="#kako-radimo">Kako izgleda proces</ArrowLink></div>
      </div>
      <figure className="home-hero__image"><Image src="/images/sandra/sandra-hero.jpg" alt="Sandra Pavić Drašković" fill priority sizes="(max-width: 760px) 100vw, 48vw" /></figure>
    </section>

    <section className="service-intro wrap" id="pocni">
      <div><p className="kicker">Za koga je savjetovanje</p><h2>Individualan pristup počinje procjenom, ne planom.</h2></div>
      <div className="service-intro__copy"><p>Savjetovanje je namijenjeno odraslim osobama i sportašima koji žele sagledati prehranu, dodatke prehrani i svakodnevne navike u vlastitom kontekstu.</p><p>Teme mogu uključivati individualnu prehranu, sirovu prehranu, regenerativni pristup i detox. Uvodni termin je obavezan prije odluke o daljnjem individualnom radu.</p></div>
    </section>

    <section className="school-home">
      <figure><Image src="/images/sandra/sandra-melon.jpeg" alt="Sandra s posudom svježeg voća" fill sizes="(max-width: 900px) 100vw, 46vw" /></figure>
      <div><p className="kicker">Online edukativni program</p><h2>Škola detoxa</h2><p className="school-home__lead">Ne mora svatko odmah primijeniti sve. Ali svatko može razumjeti kako detox izgleda u holističkom smislu.</p><p>Škola je osmišljena za učenje vlastitim tempom: od pripreme i tranzicije do detaljnih smjernica za prehranu, svakodnevne navike i cjelovit pristup detoksu.</p><div className="school-home__facts"><span>Vlastiti tempo</span><span>Detaljne smjernice</span><span>Znanje za dugoročno</span></div><ArrowLink href="/skola-detoxa">Upoznaj Školu detoxa</ArrowLink></div>
    </section>

    <section className="process-section" id="kako-radimo"><div className="wrap"><header><p className="kicker">Kako radimo</p><h2>Od prvog javljanja do jasne preporuke.</h2></header><div className="process-grid">{steps.map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="pathways wrap"><header><p className="kicker">Ostali oblici rada</p><h2>Različite potrebe. Jednako temeljit pristup.</h2></header><div className="pathway-grid">
      <article><span>Individualno</span><h3>Prehrana i suplementacija</h3><p>Pregled ciljeva, navika i postojeće dokumentacije prije odluke treba li ti individualni plan ili kontrolno savjetovanje.</p><ArrowLink href="/savjetovanje">Detalji i cijena</ArrowLink></article>
      <article><span>Sportaši</span><h3>Prehrana u ritmu treninga</h3><p>Individualna procjena prehrane i suplementacije u odnosu na opterećenje, oporavak, ciljeve i svakodnevni raspored.</p><ArrowLink href="/savjetovanje#upit">Pošalji upit</ArrowLink></article>
      <article><span>Tvrtke i udruge</span><h3>Edukativna predavanja</h3><p>Predavanja i radionice za grupe. Ne uključuju osobnu zdravstvenu procjenu pa individualna suglasnost nije potrebna.</p><ArrowLink href="/predavanja">Teme i suradnja</ArrowLink></article>
      <article><span>Mediji</span><h3>Gostovanja i stručni doprinos</h3><p>Razgovori, intervjui i edukativni sadržaji o prehrani, biljkama, suplementima i zdravstvenoj pismenosti.</p><a className="arrow-link" href="mailto:pavic.sandra@yahoo.com?subject=Medijski%20upit%20za%20Sandru%20Pavi%C4%87%20Dra%C5%A1kovi%C4%87">Pošalji medijski upit <span aria-hidden>→</span></a></article>
    </div></section>

    <section className="decision-section"><div className="wrap decision-grid"><div><p className="kicker">Uvodno savjetovanje</p><h2>90 minuta za procjenu što dalje.</h2><p>Prije termina Sandra proučava dogovorene informacije i dokumente. Na savjetovanju zajedno prolazite prioritete, očekivanja i mogućnosti. Individualni plan prehrane ili suplementacije nije automatski uključen — predlaže se samo ako procjena pokaže da je to smislen sljedeći korak.</p></div><aside><span>Cijena</span><strong>200 €</strong><p>Online ili uživo u Zagrebu. Plaćanje se obavlja nakon potvrde termina, a prije savjetovanja.</p><Link className="button" href="/savjetovanje#upit">Zatraži termin</Link></aside></div></section>

    <section className="safety-section wrap"><div><p className="kicker">Jasne granice</p><h2>Suglasnost i privatnost nisu sitna slova.</h2></div><div><p>Prije obrade zdravstvenih informacija potrebna je informirana suglasnost. Bez nje individualno savjetovanje i pregled dokumentacije ne mogu započeti.</p><p>Savjetovanje nije dijagnostika, liječnički pregled ni zamjena za propisanu terapiju. Za hitna stanja i medicinske odluke potrebno je obratiti se liječniku.</p><ArrowLink href="/savjetovanje#suglasnost">Pročitaj prije slanja upita</ArrowLink></div></section>

    <section className="about-home"><div className="wrap about-home__grid"><figure className="about-photo"><Image src="/images/sandra/sandra-portrait-square.jpeg" alt="Portret Sandre Pavić Drašković" fill sizes="(max-width: 900px) 100vw, 38vw" /></figure><div><p className="kicker">Sandra Pavić Drašković</p><h2>Farmaceutsko znanje i iskustvo koje vidi osobu, ne samo popis navika.</h2><p>Sandra je magistra farmacije, fitoaromaterapeutkinja, savjetnica za zdravu prehranu i edukatorica. Kroz Natura Sanat radi individualno, održava predavanja i radionice te približava stručne teme ljudima koji žele donositi informiranije odluke.</p><ArrowLink href="/sandra">Upoznaj Sandru</ArrowLink></div></div></section>
  </main><Footer /></>;
}
