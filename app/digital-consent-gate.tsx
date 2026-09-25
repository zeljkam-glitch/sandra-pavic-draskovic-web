"use client";

import {useState} from "react";

export function DigitalConsentGate({product,price,checkoutUrl}:{product:string;price:number;checkoutUrl?:string}){
  const [open,setOpen]=useState(false);
  const [accepted,setAccepted]=useState([false,false,false,false]);
  const [ready,setReady]=useState(false);
  const allAccepted=accepted.every(Boolean);
  const toggle=(index:number)=>setAccepted(items=>items.map((item,i)=>i===index?!item:item));

  if(!checkoutUrl)return <div className="guide-coming-soon"><strong>Kupnja uskoro</strong><p>Vodič još nije moguće kupiti. Naplata i sigurna dostava uključit će se nakon završne provjere izdanja i uvjeta kupnje.</p></div>;

  return <div className="consent-gate">
    <button className="button consent-open" type="button" onClick={()=>{setOpen(value=>!value);setReady(false);}} aria-expanded={open}>{open?"Zatvori uvjete":"Uvjeti prije kupnje"}</button>
    {open&&<div className="consent-card">
      <p className="consent-step">Obvezna potvrda prije digitalnog preuzimanja</p>
      <h3>{product}</h3>
      <p className="consent-summary">{price} € · digitalno izdanje. Nijedna kućica nije unaprijed označena.</p>
      <div className="consent-checks">
        <label><input type="checkbox" checked={accepted[0]} onChange={()=>toggle(0)}/><span>Prihvaćam <a href="/uvjeti-kupnje" target="_blank">Uvjete kupnje i korištenja digitalnog sadržaja ↗</a>.</span></label>
        <label><input type="checkbox" checked={accepted[1]} onChange={()=>toggle(1)}/><span>Pročitao/la sam <a href="/privatnost" target="_blank">Obavijest o privatnosti ↗</a>.</span></label>
        <label><input type="checkbox" checked={accepted[2]} onChange={()=>toggle(2)}/><span>Razumijem da je vodič edukativan, nije medicinska usluga, ne postavlja dijagnozu, ne liječi bolest i ne zamjenjuje liječnika ni propisanu terapiju.</span></label>
        <label><input type="checkbox" checked={accepted[3]} onChange={()=>toggle(3)}/><span>Izričito tražim da isporuka digitalnog sadržaja započne odmah nakon kupnje i potvrđujem da nakon početka isporuke gubim pravo na jednostrani raskid, u opsegu dopuštenom zakonom.</span></label>
      </div>
      {!ready?<button className="button consent-continue" type="button" disabled={!allAccepted} onClick={()=>setReady(true)}>Nastavi prema plaćanju</button>:<a className="button consent-continue" href={checkoutUrl} rel="nofollow">Otvori sigurnu naplatu</a>}
      <p className="fine legal-review-note">Radni pravni tekst. Prije uključivanja prodaje potrebna je završna provjera hrvatskog odvjetnika ili stručnjaka za zaštitu potrošača.</p>
    </div>}
  </div>;
}
