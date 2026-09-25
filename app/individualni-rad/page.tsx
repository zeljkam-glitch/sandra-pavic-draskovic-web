import type {Metadata} from "next";
import {Header,Footer,ArrowLink} from "../site-components";

export const metadata:Metadata={
  title:"Individualno savjetovanje o prehrani, mogući nastavci",
  description:"Mogući nastavci individualnog rada sa Sandrom Drašković nakon obveznog uvodnog savjetovanja: prehrana, dodaci, biljni pripravci i kontrolni razgovori.",
  alternates:{canonical:"/individualni-rad"},
};

const services=[
  {code:"IND-2",title:"Individualne smjernice prehrane",duration:"2 × 90 min",documents:"Relevantni postojeći nalazi samo ako ih Sandra zatraži",description:"Dva susreta za analizu svakodnevnih obroka, izvedive promjene i pisane edukativne smjernice prilagođene ciljevima, navikama i liječničkim preporukama.",includes:["pregled prehrambenih navika i ciljeva","slaganje obroka i praktična organizacija","pisane smjernice nakon dogovorenog opsega"]},
  {code:"IND-3",title:"Dodaci prehrani i biljni pripravci",duration:"1 × 90 min",documents:"Popis lijekova i dodataka; nalazi samo kada su relevantni",description:"Edukativni pregled onoga što osoba već uzima, deklaracija, mogućih preklapanja i pitanja koja treba provjeriti s liječnikom ili ljekarnikom.",includes:["popis postojećih lijekova, dodataka i biljnih pripravaka","čitanje sastava, doziranja i upozorenja","pisani sažetak pitanja za zdravstveni tim"]},
  {code:"IND-4",title:"Svakodnevne tehnike opuštanja i brige o sebi",duration:"1 × 90 min",documents:"U pravilu ne; zdravstvene okolnosti navode se samo ako utječu na sigurnost",description:"Edukativni razgovor o izvedivim tehnikama opuštanja, odmora i rutine. Ne uključuje terapijsku masažu, liječenje ili obećanje „čišćenja” organizma.",includes:["tehnike disanja, opuštanja i vođene pažnje","rutine sna, odmora i kretanja prema mogućnostima","sigurnosne granice i upućivanje stručnjaku kada je potrebno"]},
  {code:"IND-5",title:"Sirova prehrana: procjena i postupan prijelaz",duration:"2 × 90 min",documents:"Prema procjeni nakon uvodnog savjetovanja",description:"Za osobe koje žele razumjeti mogućnosti i ograničenja sirove prehrane bez tvrdnje da je jedna varijanta prehrane najbolja za sve.",includes:["procjena sadašnjeg jelovnika i razloga za promjenu","sigurnost hrane i nutritivna raznolikost","postupno uključivanje sirovih obroka i recepata"]},
  {code:"IND-6",title:"Prehrambene navike, probava i svakodnevna rutina",duration:"3 × 90 min",documents:"Prema procjeni; ne šalje se prije privole",description:"Trodijelni edukativni proces o prehrani, probavi, unosu tekućine i svakodnevnim navikama. Ne tvrdi da uklanja toksine niti zamjenjuje medicinsku obradu simptoma.",includes:["procjena navika i jelovnika","postupne promjene prehrane i rutina","praćenje podnošljivosti i pisane smjernice"]},
  {code:"IND-7",title:"Dulja individualna podrška",duration:"5 × 90 min",documents:"Prema dogovorenom opsegu i samo nakon izričite privole",description:"Više termina za osobe kojima je potreban sporiji tempo, dodatna objašnjenja i praćenje primjene dogovorenih prehrambenih i životnih navika.",includes:["prehrambene navike i slaganje obroka","sigurna uporaba dodataka i biljnih pripravaka","praćenje primjene bez jamstva zdravstvenog ishoda"]},
  {code:"IND-8",title:"Kontrolno savjetovanje",duration:"30 ili 60 min",documents:"Nova dokumentacija samo ako je relevantna za promjenu od zadnjeg susreta",description:"Nastavni razgovor za postojeće klijente: napredak, poteškoće, pojašnjenja i dogovorene prilagodbe ranijih edukativnih smjernica.",includes:["kratka provjera primjene i pitanja","dogovorene prilagodbe postojećih smjernica","novi opsežan plan nije automatski uključen"]},
] as const;

const faq=[
  ["Mogu li odmah rezervirati jedan od ovih nastavaka?","Ne. Svaki individualni rad prvo prolazi kroz uvodno savjetovanje, nakon kojeg Sandra procjenjuje je li nastavak potreban i koji opseg ima smisla."],
  ["Kako saznajem cijenu nastavka?","Za svaki predloženi nastavak prije prihvata dobivaš pisanu ponudu s ukupnom cijenom, trajanjem i uključenim materijalima."],
  ["Moram li poslati medicinsku dokumentaciju?","Ne u prvom upitu. Relevantni postojeći dokumenti traže se samo kada su potrebni za dogovoreni individualni rad, nakon obavijesti o obradi i odgovarajuće privole."],
  ["Mijenja li Sandra terapiju ili tumači nalaze kao liječnik?","Ne. Sandra ne postavlja dijagnozu, ne mijenja lijekove ni onkološku ili drugu terapiju. Nalazi mogu dati kontekst za edukativni razgovor, a medicinska pitanja ostaju u nadležnosti liječnika."],
] as const;

export default function Page(){
  const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))};
  return <><Header/><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="page-hero green"><div><p className="kicker">Nakon uvodnog savjetovanja</p><h1>Mogući nastavci individualnog rada</h1><p className="lede">Ovo nije katalog za samostalnu kupnju. Sandra nakon uvodnog razgovora može predložiti jedan od ovih nastavaka ili zaključiti da daljnji rad nije potreban.</p></div></section>
    <section className="continuations wrap"><header><p className="kicker">Jasno definirane mogućnosti nastavka</p><h2>Opseg se dogovara prije svakog nastavka.</h2><p>Nazivi i opisi jasno navode što pojedina usluga uključuje, bez tvrdnji o liječenju, „čišćenju” tijela, jačanju imuniteta ili zajamčenom rezultatu.</p><div className="notice"><strong>Sve informacije dobivaš prije prihvata.</strong> Cijena, broj termina i uključeni materijali navode se u zasebnoj pisanoj ponudi.</div></header>
      <div className="continuation-list">{services.map(service=><article id={service.code.toLowerCase()} key={service.code}><div className="continuation-meta"><span>{service.code}</span><strong>{service.duration}</strong></div><div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.includes.map(item=><li key={item}>{item}</li>)}</ul><p className="document-requirement"><strong>Dokumentacija:</strong> {service.documents}</p></div></article>)}</div>
    </section>
    <section className="privacy wrap"><div><p className="kicker">Granice individualnog rada</p><h2>Posebno oprezno uz terapiju, trudnoću i ozbiljna stanja.</h2></div><div><p>Prehrana, dodaci i biljni pripravci mogu biti relevantni za razgovor, ali ne smiju se prikazivati kao liječenje, priprema za trudnoću, potpora kemoterapiji ili način sprječavanja bolesti bez odgovarajuće medicinske procjene.</p><p className="notice">Kod trudnoće ili dojenja, onkološkog liječenja, kronične bolesti, akutnih simptoma ili mogućih interakcija korisnik se upućuje liječniku odnosno odgovarajućem zdravstvenom stručnjaku.</p><ArrowLink href="/dokumenti">Kada je dokumentacija potrebna</ArrowLink></div></section>
    <section className="faq wrap"><p className="kicker">Česta pitanja</p><h2>Prije odluke o nastavku</h2><div className="faq-list">{faq.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="final-cta"><div className="wrap"><p className="kicker">Obvezan prvi korak</p><h2>Najprije uvodno savjetovanje.</h2><p>Ne moraš unaprijed birati program. Prvo se procjenjuje tvoj kontekst, a zatim dobivaš jasnu preporuku ima li nastavak smisla.</p><div className="actions"><a className="button" href="/savjetovanje#upit">Zatraži uvodno savjetovanje</a><ArrowLink href="/savjetovanje">Kako izgleda prvi korak</ArrowLink></div></div></section>
  </main><Footer/></>;
}
