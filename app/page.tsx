import Image from "next/image";
import {ArrowLink, Footer, Header} from "./site-components";

const services = [
  {n:"01", eyebrow:"Kad želiš razgovor jedan na jedan", title:"Individualne konzultacije", text:"Ako imaš punu glavu savjeta, a i dalje ne znaš odakle krenuti, ovdje zajedno gledamo cijelu sliku. Bez osude i bez popisa nemogućih pravila.", meta:"Prema odabranom programu", detail:"Upitnik prije susreta · razgovor · pisane smjernice", href:"/savjetovanje", cta:"Pogledaj kako izgleda"},
  {n:"02", eyebrow:"Kad znanje treba doći do ljudi", title:"Predavanja i radionice", text:"Za udruge, tvrtke i zajednice koje ne žele još jedno predavanje puno pojmova, nego temu o kojoj će publika nastaviti razgovarati.", meta:"60 ili 90 min", detail:"Predavanje · pitanja publike · mogući praktični dio", href:"/predavanja", cta:"Pogledaj formate"},
  {n:"03", eyebrow:"Kad želiš učiti svojim tempom", title:"Digitalne knjižice", text:"Materijali koje ne moraš pročitati u jednom dahu. Otvori ih kad ti zatrebaju, podcrtaj važno i kreni od jedne promjene.", meta:"U pripremi", detail:"Jasna tema · praktične upute · najava izdanja", href:"/knjizice", cta:"Otvori knjižice"},
];

const collaborations = [
  {name:"Udruga Budi dobro", logo:"/logos/budi-dobro.jpg", logoClass:"logo-budi", text:"Besplatne radionice prehrane u programima podrške onkološkim bolesnicima. Priprema i kušanje obroka dio su zajedničkog učenja.", href:"https://budidobro.hr/"},
  {name:"Institut za gastroenterološke tumore (IGET)", logo:"/logos/iget.png", logoClass:"logo-iget", text:"Radionice zdrave hrane u suradnji s Institutom za gastroenterološke tumore, namijenjene onkološkim bolesnicima.", href:"https://iget.hr/"},
  {name:"Preživjela. Što sada?", logo:"/logos/prezivjela.png", logoClass:"logo-prezivjela", text:"Suradnja na sadržajima za život nakon liječenja. Jer oporavak ne završava izlaskom iz bolnice, a dobra informacija ponekad mijenja cijeli dan.", href:"https://www.prezivjela.com/"},
];

const faqs = [
  ["Kome su namijenjene individualne konzultacije?", "Tebi ako si se zasitila općih savjeta i želiš razumjeti što u tvojoj prehrani, terapiji, dodacima i životnom ritmu stvarno traži pažnju."],
  ["Kako izgleda konzultacija?", "Prije susreta Sandra upoznaje tvoj kontekst kroz upitnik. Zatim slijedi 90 minuta razgovora, online ili uživo prema dogovoru, a nakon susreta dobivaš pisane edukativne smjernice."],
  ["Mogu li Sandri poslati nalaze preko weba?", "Ne. Web ne prikuplja zdravstvenu dokumentaciju. Nakon prvog kontakta dobit ćeš upute za zaseban i sigurniji postupak."],
  ["Zamjenjuju li konzultacije liječnički pregled?", "Ne. Sandra ne postavlja dijagnozu, ne liječi bolest i ne mijenja terapiju koju je propisao liječnik. Pomaže ti razumjeti informacije i pripremiti bolja pitanja za zdravstveni tim."],
  ["Kome su namijenjena predavanja i radionice?", "Tvrtkama, udrugama i organizacijama koje žele stručnu temu približiti ljudima bez suhoparne teorije. Predavanje traje 60 minuta, a format s praktičnim dijelom 90 minuta."],
  ["Kada stižu knjižice i besplatni vodič?", "Kad sadržaj prođe stručnu provjeru i kad dostava bude postavljena kako treba. Moći ćeš ih preuzeti i čitati vlastitim tempom, bez traženja nastavka priče po društvenim mrežama."],
] as const;

export default function Home() {
  return <><Header/><main>
    <section className="hero">
      <div className="hero-copy"><p className="kicker">Prehrana. Dodaci. Stvarni život.</p><h1>Zdravlje nije popis zabrana.</h1><p className="lede">Kad se savjeti, nalazi, terapija i svakodnevica više ne slažu, Sandra ti pomaže odvojiti važno od buke. Da znaš što radiš, zašto to radiš i gdje je granica.</p><div className="actions"><a className="button" href="/savjetovanje">Pošalji upit za konzultacije</a><ArrowLink href="/sandra">Upoznaj Sandru</ArrowLink></div></div>
      <figure className="hero-photo"><Image src="/images/sandra/sandra-hero.jpg" alt="Sandra Drašković u zelenom odijelu, naslonjena uz prozor" fill priority sizes="(max-width: 800px) 100vw, 48vw"/></figure>
    </section>


    <section className="problem"><div className="wrap problem-grid">
      <div><p className="kicker">Previše savjeta. Premalo konteksta.</p><h2>Internet zna što bi svi trebali. Ne zna kako živiš ti.</h2></div>
      <div className="problem-copy"><p>Jedan savjet kaže izbaci. Drugi kaže dodaj. Treći obećava da će riješiti sve. A između njih su tvoja terapija, san, obitelj, posao i dani kad jednostavno nemaš snage za savršen plan.</p><p>Zato Sandra ne kreće od jelovnika. Kreće od tebe. Od onoga što već radiš, što te muči i što je u ovom trenutku uopće moguće promijeniti.</p></div>
    </div></section>

    <section className="process wrap"><header><p className="kicker">Kako Sandra radi</p><h2>Prvo život kakav jest. Tek onda ono što mijenjamo.</h2></header><ol className="process-grid">
      <li><span>01</span><h3>Donosiš cijelu priču</h3><p>Ne samo što jedeš. Važni su i lijekovi, dodaci, nalazi, san, stres i ritam u kojem stvarno živiš.</p></li>
      <li><span>02</span><h3>Tražimo što je važno</h3><p>Sandra povezuje informacije, objašnjava nejasno i odvaja ono što traži pažnju od onoga što samo stvara strah.</p></li>
      <li><span>03</span><h3>Biramo prvi pomak</h3><p>Ne mijenjamo sve. Biramo ono što sada ima smisla i što može izdržati običan ponedjeljak.</p></li>
      <li><span>04</span><h3>Ne odlaziš praznih ruku</h3><p>Dobivaš pisane edukativne smjernice, da važno ne ostane samo u razgovoru.</p></li>
    </ol></section>

    <section className="services"><header><p className="kicker">Usluge</p><h2>Nije svima potreban isti razgovor. Ni isti način rada.</h2></header><div className="product-list">{services.map(s=><article key={s.n}>
      <div className="product-index"><span>{s.n}</span><small>{s.eyebrow}</small></div>
      <div><h3>{s.title}</h3><p>{s.text}</p><p className="product-detail">{s.detail}</p></div>
      <div className="product-action"><strong>{s.meta}</strong><ArrowLink href={s.href}>{s.cta}</ArrowLink></div>
    </article>)}</div></section>

    <section className="authority"><div className="wrap authority-grid">
      <div><p className="kicker">Stručnost u praksi</p><h2>Stručno ne mora zvučati hladno.</h2><p className="authority-lede">Sandra spaja farmaceutsko obrazovanje, fitoaromaterapiju i godine edukativnog rada. Zna objasniti složeno, ali i stati tamo gdje razgovor pripada liječniku.</p><ArrowLink href="/mediji">Objave i gostovanja</ArrowLink></div>
      <div className="authority-points">
        <article><strong>Što uzimaš nije fusnota.</strong><p>Lijekovi, dodaci prehrani i biljni pripravci moraju se gledati zajedno, a ne svaki u svom odvojenom svijetu.</p></article>
        <article><strong>Prirodno nije automatski bezazleno.</strong><p>Biljni pripravak može imati svoje mjesto, ali i granice. Važno je znati razliku.</p></article>
        <article><strong>Znanje vrijedi kad ga možeš upotrijebiti.</strong><p>Dobra edukacija ne ostavlja publiku s još više pojmova, nego s boljim pitanjima i jasnijom slikom.</p></article>
      </div>
    </div></section>

    <section className="collaborations wrap"><header><p className="kicker">Suradnje</p><h2>Ovo znanje već živi među ljudima.</h2><p>U radionici, predavaonici i sadržaju koji netko otvori kad mu je najpotrebniji. Sandra surađuje tamo gdje stručna informacija treba postati stvarno korisna.</p></header><div className="collaboration-grid">{collaborations.map(c=><article key={c.name}>
      <a className="logo-frame" href={c.href} target="_blank" rel="noreferrer" aria-label={`Otvori web stranice: ${c.name}`}><Image className={c.logoClass} src={c.logo} alt={`Logotip ${c.name}`} fill sizes="(max-width: 900px) 100vw, 33vw"/></a>
      <h3>{c.name}</h3><p>{c.text}</p><a className="collab-link" href={c.href} target="_blank" rel="noreferrer">Posjeti organizaciju <span aria-hidden>↗</span></a>
    </article>)}</div></section>

    <section className="outcomes"><div className="wrap outcomes-grid">
      <div><p className="kicker">Iskustvo suradnje</p><h2>Dobar razgovor ne završava osjećajem da sve radiš pogrešno.</h2><p>Trebao bi završiti olakšanjem. Ne zato što je sve riješeno, nego zato što napokon vidiš što je važno i odakle možeš krenuti.</p></div>
      <div className="outcome-list">
        <article><span>01</span><div><h3>Napokon vidiš cijelu sliku</h3><p>Navike, terapija, dodaci i svakodnevica više nisu četiri odvojena problema.</p></div></article>
        <article><span>02</span><div><h3>Znaš što može čekati</h3><p>Ne moraš sve popraviti danas. Znaš što prvo traži pažnju i što treba provjeriti sa svojim liječnikom.</p></div></article>
        <article><span>03</span><div><h3>Imaš se čemu vratiti</h3><p>Pisane smjernice čuvaju ono važno kad se svakodnevica ponovno ubrza.</p></div></article>
      </div>
    </div></section>

    <section className="about-band"><div className="wrap about-grid"><figure><Image src="/images/sandra/sandra-about-v1.webp" alt="Sandra Drašković stoji prekriženih ruku u svijetlom interijeru" fill sizes="(max-width: 900px) 100vw, 36vw"/></figure><div><p className="kicker">O Sandri</p><h2>Sandra nije tu da ti zada još jedan savršen život.</h2><p>Tu je da s tobom pogleda onaj koji već živiš. Kao magistra farmacije, fitoaromaterapeutkinja i edukatorica zna koliko detalji znače. Kao osoba koja razgovara s ljudima zna i da nijedna preporuka ne vrijedi mnogo ako za nju nema mjesta u stvarnom danu.</p><ArrowLink href="/sandra">Više o Sandri</ArrowLink></div></div></section>

    <section className="content-system"><div className="wrap content-grid">
      <div><p className="kicker">Znanje kojem se možeš vratiti</p><h2>Dobra informacija ne bi trebala nestati u feedu.</h2></div>
      <div><p>Na blogu obrađujemo pitanja iz savjetovanja, a u pojmovniku objašnjavamo izraze na koje nailaziš u tekstovima o prehrani i dodacima. Svaki tekst ima izvore i jasno navedene granice primjene.</p><div className="content-links"><ArrowLink href="/znanje">Čitaj blog</ArrowLink><ArrowLink href="/pojmovnik">Otvori pojmovnik</ArrowLink><span>Newsletter i prvi PDF vodič uskoro</span></div></div>
    </div></section>

    <section className="faq wrap"><p className="kicker">Prije nego pošalješ upit</p><h2>Pitanja koja je dobro razjasniti odmah.</h2><div className="faq-list">{faqs.map(([question, answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

    <section className="final-cta"><div className="wrap"><p className="kicker">Prvi korak</p><h2>Ako više ne znaš čemu vjerovati, krenimo od onoga što znaš o sebi.</h2><p>Ne trebaš pripremiti savršeno pitanje. Napiši što te dovelo ovdje i zanima li te konzultacija, predavanje ili suradnja.</p><div className="actions"><a className="button" href="/kontakt">Pošalji upit</a><ArrowLink href="/savjetovanje">Kako izgleda konzultacija</ArrowLink></div></div></section>
  </main><Footer/></>;
}
