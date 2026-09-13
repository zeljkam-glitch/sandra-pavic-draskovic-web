import Image from "next/image";
import { Footer, Header } from "../site-components";

const coverage = [
  {
    outlet: "Živim / Jutarnji list",
    date: "7. srpnja 2025.",
    title: "Rak debelog crijeva s metastazama u jetri bio je moj poziv na buđenje",
    href: "https://www.jutarnji.hr/zivim/rastem/rak-debelog-crijeva-s-metastazama-u-jetri-bio-je-moj-poziv-na-budenje-jedna-namirnica-mi-je-danas-obavezna-15601334",
  },
  {
    outlet: "Živim / Jutarnji list",
    date: "2. lipnja 2024.",
    title: "Razgovor sa Sandrom o aloe veri i svakodnevnoj primjeni",
    href: "https://www.jutarnji.hr/zivim/ucim/ova-besmrtna-biljka-nova-je-voda-s-limunom-pijte-je-ujutro-cisti-jetru-i-bubrege-ali-njezina-moc-tu-ne-staje-15466698",
  },
  {
    outlet: "HRT Radio Split",
    date: "10. svibnja 2023.",
    title: "Hrana kao lijek: voćem i povrćem do zdravlja",
    href: "https://radio.hrt.hr/radio-split/vijesti/hrana-kao-lijek-10756073",
  },
  {
    outlet: "Večernji list",
    date: "26. svibnja 2023.",
    title: "Rak debelog crijeva nije bolest samo starih ljudi",
    href: "https://www.vecernji.hr/lifestyle/rak-debelog-crijeva-nije-bolest-samo-starih-ljudi-1683157",
  },
  {
    outlet: "Grad Zaprešić",
    date: "7. svibnja 2024.",
    title: "Ključ zdravlja je u našim rukama",
    href: "https://zapresic.hr/kljuc-zdravlja-je-u-nasim-rukama/",
  },
  {
    outlet: "Hrvatska kuća disanja",
    date: "28. svibnja 2025.",
    title: "Edukativno predavanje o zdravoj prehrani za pacijente",
    href: "https://hrvatskakucadisanja.hr/uncategorized/vikend-ispunjen-zajednistvom-inspiracijom-i-pokretom-obiljezen-svjetski-dan-plucne-hipertenzije-u-saborskom-i-plitvicama/4352/",
  },
  {
    outlet: "Bljesak.info",
    date: "11. rujna 2025.",
    title: "Najava predavanja Hrana – put do zdravlja u Mostaru",
    href: "https://bljesak.info/magazin/zdravlje/nutricentar-dovodi-sandru-pavic-draskovic-u-mostar-prica-o-ozdravljenju-i-snazi-prehrane/532067",
  },
  {
    outlet: "Biomania",
    date: "2026.",
    title: "Sandra Pavić Drašković na Holistic Gourmet Eventu",
    href: "https://biomania.hr/hr/biomania-holistic-gourment-event/",
  },
];

const photos = [
  { src: "/images/sandra/sandra-hero.jpg", title: "Portret — vertikalno", detail: "1920 × 2879 px", download: "Sandra-Pavic-Draskovic-portret.jpg" },
  { src: "/images/sandra/sandra-speaking.jpg", title: "Predavanje — horizontalno", detail: "1600 × 1200 px", download: "Sandra-Pavic-Draskovic-predavanje.jpg" },
  { src: "/images/sandra/sandra-green-glass.jpg", title: "Lifestyle — vertikalno", detail: "1920 × 2879 px", download: "Sandra-Pavic-Draskovic-lifestyle.jpg" },
];

export default function Page(){return <><Header/><main className="press-page">
  <section className="press-hero"><div className="wrap press-hero__grid"><div><p className="kicker">Za medije</p><h1>Materijali za priču o boljitku.</h1><p>Biografija, teme, ranije objave i fotografije Sandre Pavić Drašković — pripremljeno za novinare, urednike, podcaste i organizatore događanja.</p></div><aside><strong>Medijski kontakt</strong><a href="mailto:pavic.sandra@yahoo.com?subject=Medijski%20upit">pavic.sandra@yahoo.com</a><a className="button" href="#fotografije">Preuzmite fotografije</a></aside></div></section>

  <section className="press-position wrap"><div><p className="kicker">Ključna riječ</p><strong>Boljitak.</strong></div><div><h2>Zdravije ne mora značiti radikalno.</h2><p>Sandra ne ostaje na općenitim preporukama. Objašnjava razlike između mogućih izbora, način primjene i važnost individualnog konteksta. Cilj nije savršenstvo, nego boljitak koji osoba može ostvariti u okviru svojih mogućnosti.</p><blockquote>“Ne moraš odmah promijeniti sve. Važno je razumjeti što za tebe može biti bolji sljedeći izbor.”</blockquote></div></section>

  <section className="press-copy"><div className="wrap"><header><p className="kicker">Tekst spreman za objavu</p><h2>Kratka i proširena biografija</h2></header><div className="press-copy__grid"><article><span>Kratka biografija</span><p>Sandra Pavić Drašković je magistra farmacije, fitoaromaterapeutkinja i specijalistica regenerativne detoksikacije. Osnivačica je obrta Natura Sanat, kroz koji održava individualna savjetovanja, Školu detoxa te edukativna predavanja o prehrani i holističkom pristupu zdravlju.</p></article><article><span>Proširena biografija</span><p>Sandra Pavić Drašković je magistra farmacije, fitoaromaterapeutkinja i specijalistica regenerativne detoksikacije te osnivačica obrta Natura Sanat. Nakon dijagnoze raka debelog crijeva s metastazama u jetri 2017. godine, vlastito iskustvo povezala je s medicinskim metodama, farmaceutskim znanjem i holističkim pristupom. Danas kroz individualna savjetovanja, Školu detoxa, edukativna predavanja, radionice i pisane materijale ljudima približava praktične informacije o prehrani i životnim navikama. U središtu njezina rada nije zahtjev za savršenstvom, nego boljitak: razumljiv, postepen i ostvariv pomak u okviru stvarnih mogućnosti svake osobe.</p></article></div></div></section>

  <section className="press-topics wrap"><div><p className="kicker">Teme za razgovor</p><h2>O čemu Sandra može govoriti</h2></div><ul><li>Zašto zdravija prehrana ne mora početi velikim odricanjem</li><li>Detox kao proces učenja, a ne kratki izazov</li><li>Kako razlikovati općeniti savjet od individualno korisne preporuke</li><li>Pravilno kombiniranje namirnica i jednostavnija priprema obroka</li><li>Integrativni pristup tijekom i nakon ozbiljne dijagnoze</li><li>Prehrana, navike i energija na radnom mjestu</li><li>Što osobno iskustvo može dati edukaciji — i gdje su njegove granice</li></ul></section>

  <section className="press-coverage"><div className="wrap"><header><p className="kicker">Sandra u medijima</p><h2>Objave, razgovori i gostovanja</h2></header><div className="coverage-list">{coverage.map(item=><a key={item.href} href={item.href} target="_blank" rel="noreferrer"><span>{item.outlet}<small>{item.date}</small></span><strong>{item.title}</strong><b aria-hidden>↗</b></a>)}</div></div></section>

  <section className="press-photos wrap" id="fotografije"><header><p className="kicker">Fotografije za preuzimanje</p><h2>Odaberite format koji odgovara objavi.</h2><p>Fotografije su dostupne za uredničke objave o Sandri. Potpis fotografije: osobna arhiva Sandre Pavić Drašković.</p></header><div className="press-photo-grid">{photos.map(photo=><article key={photo.src}><figure><Image src={photo.src} alt={photo.title} fill sizes="(max-width: 760px) 100vw, 33vw"/></figure><div><strong>{photo.title}</strong><span>{photo.detail} · JPG</span><a href={photo.src} download={photo.download}>Preuzmi fotografiju ↓</a></div></article>)}</div></section>

  <section className="press-contact"><div className="wrap"><p className="kicker">Intervju, gostovanje ili predavanje</p><h2>Pošaljite temu, format i rok.</h2><a className="button" href="mailto:pavic.sandra@yahoo.com?subject=Medijski%20upit%20za%20Sandru%20Pavi%C4%87%20Dra%C5%A1kovi%C4%87">Kontaktirajte Sandru</a><p>Informacije na ovoj stranici namijenjene su predstavljanju Sandrina rada. Njezina edukacija i savjetovanja nisu zamjena za liječnički pregled, dijagnozu ili propisanu terapiju.</p></div></section>
  </main><Footer/></>}
