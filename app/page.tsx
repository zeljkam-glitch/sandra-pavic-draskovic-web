import Image from "next/image";
import {ArrowLink,Footer,Header} from "./site-components";

const services=[
  {n:"01",title:"Individualne konzultacije",text:"90 minuta za jasan pregled prehrambenih navika, životnog stila, dodataka prehrani i svakodnevnih zdravstvenih odluka.",meta:"90 min · 200 €",href:"/savjetovanje"},
  {n:"02",title:"Predavanja i radionice",text:"Edukacije za tvrtke, udruge i organizacije, prilagođene publici i kontekstu događanja.",meta:"60 ili 90 min",href:"/predavanja"},
  {n:"03",title:"Digitalne knjižice",text:"Plaćeni edukativni materijali za samostalno čitanje i postupno uvođenje promjena.",meta:"U pripremi",href:"/knjizice"},
];

const faqs=[
  ["Kome su namijenjene individualne konzultacije?","Osobama koje žele bolje razumjeti prehrambene navike, životni stil, dodatke prehrani i svakodnevne zdravstvene odluke."],
  ["Kako izgleda konzultacija?","Susret traje 90 minuta i održava se putem Zooma ili uživo prema dogovoru. Nakon razgovora klijent dobiva pisane edukativne smjernice."],
  ["Mogu li Sandri poslati nalaze preko weba?","Ne. Web ne prikuplja zdravstvenu dokumentaciju. Nakon prvog kontakta Sandra šalje upute za zaseban i sigurniji postupak."],
  ["Zamjenjuju li konzultacije liječnički pregled?","Ne. Sandra ne postavlja dijagnozu, ne liječi bolest i ne mijenja terapiju koju je propisao liječnik."],
  ["Kome su namijenjena predavanja i radionice?","Tvrtkama, udrugama i organizacijama. Predavanje traje 60 minuta, a predavanje s praktičnim dijelom 90 minuta."],
  ["Kako ću dobiti kupljenu knjižicu?","Nakon što prodaja bude aktivirana, PDF će se automatski poslati na email adresu unesenu pri kupnji."],
] as const;

export default function Home(){return <><Header/><main>
<section className="hero"><div className="hero-copy"><p className="kicker">Farmaceutsko znanje za svakodnevni život</p><h1>Razumjeti prije nego što mijenjaš.</h1><p className="lede">Sandra Drašković razgovara o prehrani, dodacima prehrani i životnim navikama jasno, stručno i bez brzih obećanja.</p><div className="actions"><a className="button" href="/savjetovanje">Pošalji upit za konzultacije</a><ArrowLink href="/sandra">Upoznaj Sandru</ArrowLink></div></div><figure className="hero-photo"><Image src="/images/sandra/sandra-hero.jpg" alt="Sandra Drašković u zelenom odijelu, naslonjena uz prozor" fill priority sizes="(max-width: 800px) 100vw, 48vw"/></figure></section>
<section className="freebie-band"><div className="wrap freebie-grid"><div><p className="kicker">Besplatni PDF i newsletter</p><h2>Praktičan vodič stiže na email.</h2></div><div><p>Tema prvog PDF-a i sustav prijave još se potvrđuju. Obrazac će biti aktiviran kada budu spremni sadržaj, privola i automatska dostava.</p>{/* TODO_CONFIRM_FREEBIE_TOPIC */}{/* TODO_SELECT_NEWSLETTER_PROVIDER */}</div></div></section>
<section className="statement"><div className="wrap"><p className="kicker">Bez brzih obećanja</p><h2>Prvo razumjeti kontekst. Zatim odabrati što je stvarno provedivo.</h2></div></section>
<section className="services wrap"><header><p className="kicker">Usluge</p><h2>Konzultacije, predavanja i knjižice.</h2></header><div className="service-list">{services.map(s=><article key={s.n}><span>{s.n}</span><div><h3>{s.title}</h3><p>{s.text}</p></div><strong>{s.meta}</strong><ArrowLink href={s.href}>Detalji</ArrowLink></article>)}</div></section>
<section className="split green"><figure><Image src="/images/sandra/sandra-speaking.jpg" alt="Sandra Drašković drži predavanje pred publikom" fill sizes="(max-width: 900px) 100vw, 50vw"/></figure><div><p className="kicker">Predavanja i radionice</p><h2>Stručno, jasno i prilagođeno publici.</h2><p>Predavanje traje 60 minuta. Predavanje s praktičnom radionicom traje 90 minuta. Praktični dio može uključivati izradu smoothija.</p><ArrowLink href="/predavanja">Formati i cijene</ArrowLink></div></section>
<section className="about-band"><div className="wrap about-grid"><figure><Image src="/images/sandra/sandra-about-v1.webp" alt="Sandra Drašković stoji prekriženih ruku u svijetlom interijeru" fill sizes="(max-width: 900px) 100vw, 36vw"/></figure><div><p className="kicker">Sandra</p><h2>Magistra farmacije, fitoaromaterapeutkinja i edukatorica.</h2><p>Sandra stručne teme povezuje sa stvarnim životom i objašnjava ih razumljivim jezikom. Ne postavlja dijagnoze i ne mijenja terapiju koju je propisao liječnik.</p><ArrowLink href="/sandra">Više o Sandri</ArrowLink></div></div></section>
<section className="collab wrap"><div><p className="kicker">Edukacije i suradnje</p><h2>Rad s udrugama i organizacijama.</h2><figure style={{position:"relative",minHeight:330,margin:"48px 0 0",overflow:"hidden"}}><Image src="/images/sandra/sandra-collaboration-v1.webp" alt="Sandra Drašković razgovara u kuhinjskom prostoru" fill sizes="(max-width: 900px) 100vw, 45vw" style={{objectFit:"cover"}}/></figure></div><div><p>Sandra sudjeluje u edukativnim aktivnostima Instituta za gastroenterološke tumore (IGET) i Udruge Budi dobro.</p><p className="fine">Točan oblik suradnje još se potvrđuje. Logotipi se neće koristiti bez dopuštenja.</p></div></section>
<section className="faq wrap"><p className="kicker">Česta pitanja</p><h2>Prije nego pošalješ upit.</h2><div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
</main><Footer/></>}
