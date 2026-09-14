"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import type {GlossaryTerm} from "./data";

const categories=["sve","prehrana","dodaci prehrani","vitamini i minerali","biljke","fitoaromaterapija","san i oporavak","stres","prevencija","zdravstvena pismenost"];

export function GlossaryBrowser({terms}:{terms:GlossaryTerm[]}){const[q,setQ]=useState("");const[cat,setCat]=useState("sve");const[letter,setLetter]=useState("sve");const letters=Array.from(new Set(terms.map(t=>t.title[0].toLocaleUpperCase("hr")))).sort();const shown=useMemo(()=>terms.filter(t=>(cat==="sve"||t.category===cat)&&(letter==="sve"||t.title.startsWith(letter))&&t.title.toLocaleLowerCase("hr").includes(q.toLocaleLowerCase("hr"))),[terms,q,cat,letter]);return <><div className="glossary-tools"><label>Pretraži po nazivu<input value={q} onChange={e=>setQ(e.target.value)} type="search" placeholder="Upiši pojam"/></label><label>Kategorija<select value={cat} onChange={e=>setCat(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label></div><div className="alphabet" aria-label="Filtriranje po početnom slovu"><button onClick={()=>setLetter("sve")} aria-pressed={letter==="sve"}>Sve</button>{letters.map(l=><button key={l} onClick={()=>setLetter(l)} aria-pressed={letter===l}>{l}</button>)}</div><div className="term-list">{shown.map(t=><Link key={t.slug} href={"/pojmovnik/"+t.slug}><span>{t.category}</span><strong>{t.title}</strong><b aria-hidden>→</b></Link>)}</div>{!shown.length&&<p>Nema pojmova za odabrane filtre.</p>}</>}
