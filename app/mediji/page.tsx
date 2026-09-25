import {Footer,Header} from "../site-components";

const coverage = [
  {
    outlet:"Kreni Zdravo",
    date:"24. ožujka 2026.",
    title:"Najava predavanja Hrana kao lijek na Farmaceutsko-biokemijskom fakultetu",
    href:"https://krenizdravo.dnevnik.hr/prehrana/dodite-i-poslusajte-pobijedila-rak-s-metastazama-otkriva-kako-je-hranu-pretvorila-u-svoj-lijek",
  },
  {
    outlet:"Biomania",
    date:"2026.",
    title:"Sudjelovanje na Holistic Gourmet Eventu",
    href:"https://biomania.hr/hr/biomania-holistic-gourment-event/",
  },
  {
    outlet:"Živim / Jutarnji list",
    date:"7. srpnja 2025.",
    title:"Rak debelog crijeva s metastazama u jetri bio je moj poziv na buđenje",
    href:"https://www.jutarnji.hr/zivim/rastem/rak-debelog-crijeva-s-metastazama-u-jetri-bio-je-moj-poziv-na-budenje-jedna-namirnica-mi-je-danas-obavezna-15601334",
  },
  {
    outlet:"Estetica.hr",
    date:"9. lipnja 2025.",
    title:"Sandra na konferenciji Estetica for You",
    href:"https://estetica.hr/estetica-for-you-odrzana-prva-estetska-konferencija-otvorena-za-javnost-u-hrvatskoj/",
  },
  {
    outlet:"Hrvatska kuća disanja",
    date:"28. svibnja 2025.",
    title:"Edukativno predavanje za pacijente",
    href:"https://hrvatskakucadisanja.hr/uncategorized/vikend-ispunjen-zajednistvom-inspiracijom-i-pokretom-obiljezen-svjetski-dan-plucne-hipertenzije-u-saborskom-i-plitvicama/4352/",
  },
  {
    outlet:"Udruga Budi dobro",
    date:"21. lipnja 2024.",
    title:"Radionica Hrana: put do zdravlja u Jastrebarskom",
    href:"https://budidobro.hr/novosti/radionica-hrana-put-do-zdravlja-u-jastrebarskom-25-lipnja-2024",
  },
  {
    outlet:"Udruga Budi dobro",
    date:"8. svibnja 2024.",
    title:"U Zaprešiću održana radionica Hrana: put do zdravlja",
    href:"https://budidobro.hr/novosti/u-zapresicu-odrzana-radionica-hrana-put-do-zdravlja",
  },
  {
    outlet:"Grad Zaprešić",
    date:"7. svibnja 2024.",
    title:"Predavanje Ključ zdravlja je u našim rukama",
    href:"https://zapresic.hr/kljuc-zdravlja-je-u-nasim-rukama/",
  },
  {
    outlet:"Živim / Jutarnji list",
    date:"19. travnja 2024.",
    title:"Rekli su mi da je rak neizlječiv, a ja sam ga pobijedila za samo 3,5 mjeseca",
    href:"https://www.jutarnji.hr/zivim/rastem/rekli-su-mi-da-je-rak-neizljeciv-a-ja-sam-ga-pobijedila-za-samo-3-5-mjeseca-vjerujem-da-je-kljuc-u-ovoj-prehrani-15451625",
  },
  {
    outlet:"Onkološki vodič · Medikol / IGET",
    date:"2023.",
    title:"Radionice o prehrani za osobe liječene od kolorektalnog karcinoma",
    href:"https://medikol.hr/wp-content/uploads/2023/06/vodic-pdf-s-oglasima.pdf",
  },
  {
    outlet:"HRT Radio Split",
    date:"10. svibnja 2023.",
    title:"Gostovanje u emisiji Hrana kao lijek: voćem i povrćem do zdravlja",
    href:"https://radio.hrt.hr/radio-split/vijesti/hrana-kao-lijek-10756073",
  },
  {
    outlet:"Kuća Betanija",
    date:"6. listopada 2021.",
    title:"Sandrina smoothionica u programu oporavka onkoloških bolesnika",
    href:"https://www.kuca-betanija.hr/udruga-budi-dobro-cuje-osobu-u-cjelini/",
  },
  {
    outlet:"Udruga Budi dobro",
    date:"Program radionica",
    title:"Hrana kao lijek",
    href:"https://budidobro.hr/projekti/hrana-kao-lijek",
  },
];

export default function Page(){return <><Header/><main>
  <section className="page-hero yellow"><div><p className="kicker">Sandra u medijima</p><h1>Razgovori koji su izašli izvan četiri zida.</h1><p className="lede">Intervjui, javna predavanja, radionice i događanja na kojima je Sandra govorila o prehrani, navikama i vlastitom iskustvu.</p></div></section>
  <section className="video-feature"><div className="wrap video-grid"><div><p className="kicker">Video intervju</p><h2>Razgovor sa Sandrom za Zelenarium.</h2><p>Sandra govori o svojem osobnom iskustvu, promjeni prehrane i putu koji je prethodio radu kroz Natura Sanat.</p><a className="arrow-link" href="https://www.youtube.com/watch?v=by1VXYxP88Y" target="_blank" rel="noreferrer">Pogledaj na YouTubeu ↗</a></div><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/by1VXYxP88Y" title="Intervju sa Sandrom Pavić Drašković za Zelenarium" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div></section>
  <section className="glossary wrap"><header className="media-list-header"><p className="kicker">Objave i gostovanja</p><h2>Sve na jednom mjestu.</h2></header><div className="term-list">{coverage.map(item=><a key={item.href} href={item.href} target="_blank" rel="noreferrer"><span>{item.outlet} · {item.date}</span><strong>{item.title}</strong><b aria-hidden>↗</b></a>)}</div><p className="fine">Poveznice vode na stranice izvornih izdavača. Njihovi naslovi i sadržaj odgovornost su tih izdavača.</p></section>
</main><Footer/></>}
