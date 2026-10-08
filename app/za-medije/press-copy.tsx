"use client";

import {useState} from "react";

export function PressCopy({label,text}:{label:string;text:string}){
  const[copied,setCopied]=useState(false);

  async function copy(){
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(()=>setCopied(false),1800);
  }

  return <article className="press-copy-card">
    <div className="press-copy-heading"><span>{label}</span><button type="button" onClick={copy}>{copied?"Kopirano":"Kopiraj tekst"}</button></div>
    <p>{text}</p>
  </article>;
}
