import {Footer,Header} from "../site-components";

const coverage = [
  {
    outlet:"HRT Radio Split",
    date:"10. svibnja 2023.",
    title:"Gostovanje u emisiji o prehrani, voću i povrću",
    href:"https://radio.hrt.hr/radio-split/vijesti/hrana-kao-lijek-10756073",
  },
  {
    outlet:"Grad Zaprešić",
    date:"7. svibnja 2024.",
    title:"Predavanje Ključ zdravlja je u našim rukama",
    href:"https://zapresic.hr/kljuc-zdravlja-je-u-nasim-rukama/",
  },
  {
    outlet:"Hrvatska kuća disanja",
    date:"28. svibnja 2025.",
    title:"Edukativno predavanje za pacijente",
    href:"https://hrvatskakucadisanja.hr/uncategorized/vikend-ispunjen-zajednistvom-inspiracijom-i-pokretom-obiljezen-svjetski-dan-plucne-hipertenzije-u-saborskom-i-plitvicama/4352/",
  },
  {
    outlet:"Biomania",
    date:"2026.",
    title:"Sudjelovanje na Holistic Gourmet Eventu",
    href:"https://biomania.hr/hr/biomania-holistic-gourment-event/",
  },
];

export default function Page(){return <><Header/><main>
  <section className="page-hero yellow"><div><p className="kicker">Sandra u medijima</p><h1>Gostovanja, predavanja i objave.</h1><p className="lede">Odabrane vanjske poveznice o Sandrinim edukativnim aktivnostima.</p></div></section>
  <section className="glossary wrap"><div className="term-list">{coverage.map(item=><a key={item.href} href={item.href} target="_blank" rel="noreferrer"><span>{item.outlet} · {item.date}</span><strong>{item.title}</strong><b aria-hidden>↗</b></a>)}</div><p className="fine">Sadržaj i naslovi na povezanim stranicama odgovornost su njihovih izdavača.</p></section>
</main><Footer/></>}
