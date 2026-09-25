"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

const fontPacks = [
  {id:"fraunces", number:"01", name:"Fraunces + Inter", character:"Mekši, urbani editorial", note:"Najbliže osjećaju Kinsleyja bez korištenja licenciranog Mackinaca."},
  {id:"gloock", number:"02", name:"Gloock + Inter", character:"Oštriji, modni editorial", note:"Najsofisticiranija opcija. Dobro pristaje Sandrinoj stylish strani."},
  {id:"newsreader", number:"03", name:"Newsreader + Schibsted", character:"Miran stručni autoritet", note:"Najbolji balans za duže tekstove o zdravlju, bez kliničkog dojma."},
  {id:"instrument", number:"04", name:"Instrument Serif + Cousine", character:"Suvremen i nekonvencionalan", note:"Najbliže jednom od ponuđenih Squarespace font paketa, ali je namjerno izražajniji."},
];

export default function TypographyTest(){
  const [active,setActive]=useState(fontPacks[0]);
  return <main className={`font-lab font-lab--${active.id}`}>
    <header className="font-lab__top"><strong>Tipografija za Sandru</strong><span>Odaberi font paket</span><Link href="/">Povratak na web</Link></header>
    <div className="font-lab__layout">
      <section className="font-lab__stage" aria-live="polite">
        <div className="font-preview">
          <header className="font-preview__nav"><strong>Sandra Pavić Drašković</strong><nav aria-label="Primjer navigacije"><span>O Sandri</span><span>Programi</span><span>Znanje</span></nav><span className="font-preview__nav-cta">Rezerviraj</span></header>
          <div className="font-preview__hero">
            <div className="font-preview__copy"><p className="font-preview__kicker">Prehrana · biljke · zdrave navike</p><h1>Brini o zdravlju prije nego što moraš.</h1><p>Sandra povezuje farmaceutsko znanje s prehranom, suplementima i biljkama. Bez brzih rješenja i nepotrebnog dramatiziranja.</p><span className="font-preview__button">Pronađi svoj sljedeći korak</span></div>
            <figure><Image src="/images/sandra/sandra-hero.jpg" alt="Sandra Pavić Drašković" fill priority sizes="(max-width: 900px) 100vw, 38vw"/></figure>
          </div>
          <div className="font-preview__statement"><p>Zdravlje prije problema</p><h2>Ne moraš čekati dijagnozu da bi se počeo bolje brinuti o sebi.</h2></div>
        </div>
        <div className="font-lab__details"><span>{active.name}</span><span>Č ć Ž ž Š š Đ đ</span><span>0123456789</span></div>
      </section>

      <aside className="font-lab__panel" aria-label="Font paketi">
        <div><p className="font-lab__eyebrow">Font packs</p><h2>Odaberi serif</h2><p>Svaka opcija mijenja naslov, body tekst, navigaciju i CTA. Gledaj cjelinu, ne samo jedno slovo.</p></div>
        <div className="font-lab__options">
          {fontPacks.map(option=><button key={option.id} type="button" onClick={()=>setActive(option)} aria-pressed={active.id===option.id} className={`font-option font-option--${option.id}`}>
            <span className="font-option__number">{option.number}</span><span className="font-option__sample">Aa</span><span className="font-option__text"><strong>{option.name}</strong><small>{option.character}</small></span>
          </button>)}
        </div>
        <p className="font-lab__note"><strong>{active.name}</strong><span>{active.note}</span></p>
        <div className="font-lab__palette" aria-label="Predložena paleta"><span/><span/><span/><span/></div>
      </aside>
    </div>
  </main>
}

