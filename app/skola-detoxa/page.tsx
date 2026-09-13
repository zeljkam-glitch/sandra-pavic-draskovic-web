import Image from "next/image";
import { Footer, Header } from "../site-components";

const themes = [
  ["01", "Razumijevanje detoksa", "Što detox jest, što nije i zašto nije riječ o brzom planu koji se samo ‘odradi’."],
  ["02", "Priprema i tranzicija", "Kako promjene uvoditi postepeno, pažljivo i u skladu s vlastitim mogućnostima."],
  ["03", "Prehrana u praksi", "Pravilno kombiniranje namirnica, tranzicijska i sirova prehrana te praktične ideje i recepti."],
  ["04", "Detox na svim razinama", "Navike, okruženje, stres, emocije i svakodnevni izbori kao dio cjelovitog pristupa."],
];

const reviews = [
  ["“Dobila sam puno više od očekivanog. Jako puno korisnih informacija vezanih za zdravlje, detox tijela i pravilno kombiniranje namirnica.”", "Vesna S."],
  ["“Ovaj program puno je više od toga. Za one koji žele promijeniti životni stil, ovo je pravi mali vodič.”", "Katarina B."],
  ["“Dobili smo detaljne upute kako provesti detox. Naučili smo da mu treba pristupiti osmišljeno i pažljivo.”", "N."],
];

export default function Page(){return <><Header/><main className="school-page">
  <section className="school-hero"><div><p className="kicker">Online edukativni program</p><h1>Škola detoxa</h1><p className="school-hero__lead">Nije desetodnevni izazov. Nije brzi plan. To je znanje koje možeš usvajati vlastitim tempom i primjenjivati u mjeri koja ti odgovara.</p><a className="button" href="#prijava">Zatraži informacije</a></div><figure><Image src="/images/sandra/sandra-green-glass.jpg" alt="Sandra Pavić Drašković sa zelenim napitkom" fill priority sizes="(max-width: 900px) 100vw, 43vw"/></figure></section>

  <section className="school-intro wrap"><div><p className="kicker">Zašto škola</p><h2>Svi mogu naučiti. Ne moraju svi odmah primijeniti sve.</h2></div><div><p>Detox u holističkom smislu nije nešto što se završi za nekoliko dana. To je proces koji traži razumijevanje, postepenost i svijest o tome kako prehrana, navike, stres i okruženje djeluju zajedno.</p><p>Škola detoxa daje ti detaljne smjernice da razumiješ cijeli proces. Ako želiš ući dublje, imaš jasan put. Ako još nisi spremna ili spreman na potpunu primjenu, znanje ostaje s tobom dok ne dođe pravi trenutak.</p></div></section>

  <section className="school-themes"><div className="wrap"><header><p className="kicker">Što učiš</p><h2>Od pripreme do dugoročne primjene.</h2></header><div className="school-theme-grid">{themes.map(([n,title,text])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

  <section className="school-pace"><div className="wrap school-pace__grid"><div><p className="kicker">Vlastiti tempo</p><h2>Program se prilagođava životu, ne obrnuto.</h2></div><div><p>Sadržaj je organiziran tako da ga možeš prolaziti, ponovno mu se vraćati i uvoditi promjene korak po korak. Cilj nije savršenstvo ni pritisak, nego razumijevanje i održivost.</p><ul><li>detaljne, jasno povezane smjernice</li><li>praktični primjeri, recepti i kombinacije namirnica</li><li>priprema i tranzicija prije dubljeg detoksa</li><li>znanje koje možeš koristiti dugoročno</li></ul></div></div></section>

  <section className="school-reviews wrap"><header><p className="kicker">Iskustva polaznica</p><h2>Što je ostalo nakon programa.</h2></header><div>{reviews.map(([quote,name])=><blockquote key={name}><p>{quote}</p><cite>{name}</cite></blockquote>)}</div><small>Iskustva su osobna i rezultati nisu zajamčeni.</small></section>

  <section className="school-cta" id="prijava"><div className="wrap"><p className="kicker">Prijava i informacije</p><h2>Želiš učiti o detoxu bez žurbe?</h2><p>Pošalji Sandri poruku za informacije o sadržaju, pristupu programu, cijeni i aktualnom upisu.</p><a className="button" href="mailto:pavic.sandra@yahoo.com?subject=Upit%20za%20%C5%A0kolu%20detoxa">Javi se za Školu detoxa</a><p className="legal-note">Škola detoxa je edukativni program. Ne postavlja dijagnozu, ne mijenja terapiju i nije zamjena za liječnički pregled ili liječenje.</p></div></section>
</main><Footer/></>}
