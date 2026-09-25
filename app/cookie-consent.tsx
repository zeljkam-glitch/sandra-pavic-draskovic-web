"use client";

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

type CookieChoice = {analytics:boolean;marketing:boolean;version:string;savedAt:string};
const storageKey = "natura-sanat-cookie-choice";
const version = "2026-09-24";

export function CookieConsent(){
  const pathname=usePathname();
  const english=pathname.startsWith("/en");
  const [open,setOpen]=useState(false);
  const [details,setDetails]=useState(false);
  const [analytics,setAnalytics]=useState(false);
  const [marketing,setMarketing]=useState(false);

  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(storageKey);
      if(!saved)setOpen(true);
    }catch{setOpen(true);}
  },[]);

  function save(choice:Omit<CookieChoice,"version"|"savedAt">){
    const record:CookieChoice={...choice,version,savedAt:new Date().toISOString()};
    try{window.localStorage.setItem(storageKey,JSON.stringify(record));}catch{}
    setAnalytics(choice.analytics);setMarketing(choice.marketing);setOpen(false);setDetails(false);
    window.dispatchEvent(new CustomEvent("natura-cookie-choice",{detail:record}));
  }

  return <>
    <button className="cookie-reopen" type="button" onClick={()=>setOpen(true)}>{english?"Cookie settings":"Postavke kolačića"}</button>
    {open&&<div className="cookie-layer" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="cookie-panel">
        <div className="cookie-copy"><p className="kicker">{english?"Your choice":"Tvoj izbor"}</p><h2 id="cookie-title">{english?"Cookies under your control.":"Kolačići pod tvojom kontrolom."}</h2><p>{english?"We currently use only the storage required for the website to work and to remember this choice. Analytics and marketing are not active without your consent.":"Trenutačno koristimo samo nužnu pohranu za rad stranice i pamćenje ovog izbora. Analitika i marketing nisu aktivni bez tvoje privole."}</p><a href="/kolacici">{english?"Cookie policy (Croatian) →":"Pročitaj Politiku kolačića →"}</a></div>
        {details&&<div className="cookie-options">
          <label><span><strong>{english?"Necessary":"Nužni"}</strong><small>{english?"Website operation and saving your choice.":"Rad stranice i spremanje izbora."}</small></span><input type="checkbox" checked disabled aria-label={english?"Necessary cookies are always enabled":"Nužni kolačići uvijek su uključeni"}/></label>
          <label><span><strong>{english?"Analytics":"Analitički"}</strong><small>{english?"Visit measurement, only if a tool is introduced.":"Mjerenje posjeta, tek ako se alat uvede."}</small></span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label>
          <label><span><strong>{english?"Marketing":"Marketinški"}</strong><small>{english?"Advertising and tracking, only if introduced.":"Oglašavanje i praćenje, tek ako se alat uvede."}</small></span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label>
        </div>}
        <div className="cookie-actions">
          <button type="button" className="cookie-secondary" onClick={()=>save({analytics:false,marketing:false})}>{english?"Reject optional":"Odbij neobavezne"}</button>
          <button type="button" className="cookie-secondary" onClick={()=>details?save({analytics,marketing}):setDetails(true)}>{details?(english?"Save choice":"Spremi odabir"):(english?"Settings":"Postavke")}</button>
          <button type="button" className="button" onClick={()=>save({analytics:true,marketing:true})}>{english?"Accept all":"Prihvati sve"}</button>
        </div>
      </div>
    </div>}
  </>;
}
