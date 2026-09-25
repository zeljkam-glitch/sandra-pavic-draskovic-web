import type {Metadata} from "next";
import {Header,Footer,ArrowLink} from "../site-components";

export const metadata:Metadata={
  title:"Snimke radionica o prehrani",
  description:"Edukativne radionice Sandre Drašković o biljnoj prehrani, sokovima, smoothie-jima, ljetnoj prehrani i svakodnevnim navikama.",
  alternates:{canonical:"/snimke-radionica"},
};

const recordings=[
  {code:"VID-1",title:"Kako tijelo obrađuje i izlučuje tvari",description:"Edukativna radionica o svakodnevnim navikama, probavi, unosu tekućine i kritičkom čitanju popularnih tvrdnji o „detoxu”."},
  {code:"VID-2",title:"Sirova prehrana: mogućnosti i ograničenja",description:"Pregled namirnica, sastavljanja obroka, higijene hrane i pitanja koja treba razmotriti prije većih promjena prehrane."},
  {code:"VID-3",title:"Prehrana i svakodnevna zaštita kože ljeti",description:"Edukativni sadržaj o hidraciji, sezonskim obrocima i ulozi prehrane uz uobičajene mjere zaštite kože."},
  {code:"VID-4",title:"Sokovi i smoothieji u svakodnevnoj prehrani",description:"Priprema, izbor sastojaka i praktična razlika između napitka, međuobroka i cjelovitog obroka."},
  {code:"VID-5",title:"Cjelovita biljna prehrana: slaganje obroka",description:"Osnove raznolikog biljnog jelovnika, pripreme namirnica i slaganja uravnoteženih svakodnevnih obroka."},
] as const;

const faq=[
  ["Mogu li sada kupiti snimke?","Ne. Snimke trenutačno nisu u prodaji. Prije objave Sandra treba provjeriti stručnu aktualnost sadržaja, autorska prava, uvjete pristupa i cijenu."],
  ["Jesu li radionice medicinska usluga?","Ne. Riječ je o edukativnim sadržajima koji ne postavljaju dijagnozu, ne propisuju terapiju i ne zamjenjuju pregled ili savjet liječnika."],
  ["Trebam li poslati medicinsku dokumentaciju?","Ne. Za gledanje edukativne snimke ili sudjelovanje na grupnoj radionici medicinska dokumentacija nije potrebna."],
] as const;

export default function Page(){
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))};
  return <><Header/><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
    <section className="page-hero green"><div><p className="kicker">Edukativne teme</p><h1>Snimke radionica</h1><p className="lede">Ovdje su predstavljene teme Sandrinih edukativnih radionica. Snimke trenutačno nisu u prodaji.</p></div></section>
    <section className="recordings wrap"><header><p className="kicker">Snimke radionica</p><h2>Teme koje će prije objave biti stručno i pravno provjerene.</h2><p className="notice">Opisi jasno predstavljaju edukativni sadržaj, bez obećanja liječenja, „čišćenja” organizma ili zajamčenih zdravstvenih ishoda.</p></header><div className="recordings-grid">{recordings.map(item=><article className="recording-card" key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.description}</p><strong>Nije u prodaji</strong></article>)}</div></section>
    <section className="faq wrap"><p className="kicker">Česta pitanja</p><h2>Prije gledanja ili prijave</h2><div className="faq-list">{faq.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><div className="actions"><ArrowLink href="/predavanja">Aktualna predavanja i radionice</ArrowLink><ArrowLink href="/webshop">Aktualni digitalni vodiči</ArrowLink></div></section>
  </main><Footer/></>;
}
