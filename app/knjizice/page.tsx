import Image from "next/image";
import {Footer,Header} from "../site-components";

export default function Page(){return <><Header/><main>
<section className="page-hero yellow"><div><p className="kicker">Digitalne knjižice</p><h1>Za dane kad ti treba odgovor, a ne još jedno pretraživanje.</h1><p className="lede">Kratki, pregledni materijali koje možeš spremiti, podcrtati i ponovno otvoriti kad ti zatrebaju.</p></div></section>
<section className="catalog wrap"><article><figure><Image src="/images/sandra/sandra-booklet-cover-v1.webp" alt="Bočice sa zelenim napitcima i svježe mikrozelenje na kuhinjskom pultu" fill sizes="(max-width: 700px) 100vw, 38vw"/></figure><div><span>U pripremi</span><h2>Prva knjižica nastaje polako. Namjerno.</h2><p>Naslov, sadržaj i cijena bit će objavljeni kad svaka stranica bude dovoljno jasna da je možeš stvarno koristiti, a ne samo pročitati.</p><a className="arrow-link" href="/knjizice/prva-knjizica">Zaviriti u sadržaj <span aria-hidden>→</span></a></div></article></section>
</main><Footer/></>}
