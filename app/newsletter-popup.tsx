"use client";

import {FormEvent,useEffect,useRef,useState} from "react";

const DISMISSED_KEY="natura-sanat-newsletter-dismissed";
const CONFIRMATION_SENT_KEY="natura-sanat-newsletter-confirmation-sent";
const DISMISS_DAYS=14;
const CONFIRMATION_SENT_DAYS=1;

export function NewsletterPopup(){
  const [open,setOpen]=useState(false);
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const dialogRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const confirmationSentAt=Number(window.localStorage.getItem(CONFIRMATION_SENT_KEY)||0);
    const dismissedAt=Number(window.localStorage.getItem(DISMISSED_KEY)||0);
    const dismissalActive=Date.now()-dismissedAt<DISMISS_DAYS*24*60*60*1000;
    const confirmationRecentlySent=Date.now()-confirmationSentAt<CONFIRMATION_SENT_DAYS*24*60*60*1000;
    if(confirmationRecentlySent||dismissalActive)return;
    const timer=window.setTimeout(()=>setOpen(true),12000);
    return()=>window.clearTimeout(timer);
  },[]);

  useEffect(()=>{
    const openFromHash=()=>{if(window.location.hash==="#newsletter-prijava")setOpen(true);};
    openFromHash();
    window.addEventListener("hashchange",openFromHash);
    return()=>window.removeEventListener("hashchange",openFromHash);
  },[]);

  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement|null;
    const focusable=()=>Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled])')||[]);
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){close();return;}
      if(event.key!=="Tab")return;
      const items=focusable();
      if(!items.length)return;
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener("keydown",onKey);
    document.body.classList.add("newsletter-open");
    window.setTimeout(()=>dialogRef.current?.querySelector<HTMLInputElement>('input[name="email"]')?.focus(),50);
    return()=>{document.removeEventListener("keydown",onKey);document.body.classList.remove("newsletter-open");previous?.focus();};
  },[open]);

  function close(){
    window.localStorage.setItem(DISMISSED_KEY,String(Date.now()));
    if(window.location.hash==="#newsletter-prijava")window.history.replaceState(null,"",window.location.pathname+window.location.search);
    setOpen(false);
  }

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setStatus("sending");
    const form=new FormData(event.currentTarget);
    try{
      const response=await fetch("/api/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.get("name"),email:form.get("email"),consent:form.get("consent")==="on",website:form.get("website")})});
      if(!response.ok)throw new Error();
      window.localStorage.setItem(CONFIRMATION_SENT_KEY,String(Date.now()));
      setStatus("success");
    }catch{setStatus("error");}
  }

  return <>
    <a className="newsletter-tab" href="#newsletter-prijava" onClick={(event)=>{event.preventDefault();setOpen(true);}} aria-label="Otvori prijavu na Natura Sanat newsletter">Natura Sanat novosti</a>
    {open&&<div className="newsletter-overlay" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)close();}}>
      <div id="newsletter-prijava" className="newsletter-dialog" role="dialog" aria-modal="true" aria-labelledby="newsletter-title" ref={dialogRef}>
        <button className="newsletter-close" type="button" onClick={close} aria-label="Zatvori prijavu">×</button>
        <div className="newsletter-art" aria-hidden="true"><span>NATURA SANAT</span><strong>Više jasnoće.<br/>Manje buke.</strong><small>Prehrana · vitalnost · svakodnevne navike</small></div>
        <div className="newsletter-content">
          {status==="success"?<div className="newsletter-success"><p className="kicker">Provjerite svoju e-poštu</p><h2>Još trebate potvrditi prijavu.</h2><p>Poslali smo vam poveznicu za potvrdu. Tek nakon potvrde vaša će adresa biti dodana na newsletter listu. Ako poruke nema, provjerite neželjenu poštu.</p><button className="button" type="button" onClick={()=>setOpen(false)}>Zatvori</button></div>:<>
            <p className="kicker">Povremeno, promišljeno i korisno</p>
            <h2 id="newsletter-title">Znanje koje ima mjesto u stvarnom životu.</h2>
            <p>Primajte Sandrine tekstove, recepte i prve informacije o novim programima, predavanjima i vodičima.</p>
            <form onSubmit={submit}>
              <label>Ime <small>neobvezno</small><input name="name" type="text" autoComplete="given-name" maxLength={100}/></label>
              <label>Email adresa<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
              <label className="newsletter-consent"><input name="consent" type="checkbox" required/><span>Želim primati Natura Sanat newsletter i prihvaćam obradu svoje email adrese u tu svrhu. Privolu mogu povući u bilo kojem trenutku.</span></label>
              <label className="newsletter-trap" aria-hidden="true">Web<input name="website" tabIndex={-1} autoComplete="off"/></label>
              <button className="button" type="submit" disabled={status==="sending"}>{status==="sending"?"Prijava…":"Želim primati novosti"}</button>
              {status==="error"&&<p className="newsletter-error" role="alert">Prijava trenutačno nije dostupna. Pokušajte ponovno malo kasnije.</p>}
            </form>
            <p className="newsletter-fine">Prijava je dobrovoljna i odvojena od kontaktnih upita. Više u <a href="/privatnost">Politici privatnosti</a>.</p>
          </>}
        </div>
      </div>
    </div>}
  </>;
}
