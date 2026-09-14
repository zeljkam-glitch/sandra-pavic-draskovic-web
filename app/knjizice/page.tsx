import Image from "next/image";
import {Footer,Header} from "../site-components";

export default function Page(){return <><Header/><main>
<section className="page-hero yellow"><div><p className="kicker">Digitalne knjižice</p><h1>Praktični materijali za čitanje vlastitim tempom.</h1><p className="lede">Katalog će biti otvoren kada sadržaj, cijene i postupak kupnje budu potvrđeni.</p></div></section>
<section className="catalog wrap"><article><figure><Image src="/images/sandra/sandra-booklet-cover-v1.webp" alt="Bočice sa zelenim napitcima i svježe mikrozelenje na kuhinjskom pultu" fill sizes="(max-width: 700px) 100vw, 38vw"/></figure><div><span>U pripremi</span><h2>Prva digitalna knjižica</h2><p>Naslov, sadržaj, broj stranica i cijena čekaju Sandrinu potvrdu.</p><a className="arrow-link" href="/knjizice/prva-knjizica">Što će sadržavati <span aria-hidden>→</span></a></div></article></section>
</main><Footer/></>}
