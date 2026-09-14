import Image from "next/image";
import Link from "next/link";
import {Footer,Header} from "../site-components";

export default function Page(){return <><Header/><main>
<section className="page-hero yellow"><div><p className="kicker">Digitalne knjižice</p><h1>Znanje kojem se možeš vratiti.</h1><p className="lede">Plaćeni digitalni materijali za čitanje vlastitim tempom. Katalog se otvara nakon potvrde sadržaja i prodajnog procesa.</p></div></section>
<section className="catalog wrap"><article><figure><Image src="/editorial-produce.png" alt="Voće i povrće kao vizualna najava prve digitalne knjižice" fill sizes="(max-width: 700px) 100vw, 38vw"/></figure><div><span>U pripremi</span><h2>Prva digitalna knjižica</h2><p>Naslov, sadržaj, broj stranica i cijena objavit će se nakon stručne i komercijalne potvrde.</p><Link className="arrow-link" href="/knjizice/prva-knjizica">Pogledaj strukturu proizvoda <span aria-hidden>→</span></Link></div></article></section>
</main><Footer/></>}
