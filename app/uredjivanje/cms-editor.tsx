"use client";

import {useMemo, useState} from "react";
import type {CmsField, CmsContent} from "@/lib/cms/schema";
import type {CmsSnapshot} from "@/lib/cms/storage";

type Props={fields:readonly CmsField[];initial:CmsSnapshot;email:string;canPublish:boolean;configured:{storage:boolean;rateLimit:boolean}};

export function CmsEditor({fields,initial,email,canPublish,configured}:Props){
  const [content,setContent]=useState<CmsContent>(initial.content);
  const [message,setMessage]=useState("");
  const [pending,setPending]=useState("");
  const groups=useMemo(()=>Array.from(new Set(fields.map(field=>field.group))),[fields]);
  function update(key:keyof CmsContent,value:string){setContent(current=>({...current,[key]:value}));}
  async function save(){
    setPending("save");setMessage("");
    const response=await fetch("/api/cms/draft",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content})});
    const data=await response.json().catch(()=>({})) as {error?:string};setPending("");
    setMessage(response.ok?"Nacrt je sigurno spremljen.":data.error||"Nacrt nije spremljen.");
    return response.ok;
  }
  async function preview(){if(await save()){setPending("preview");const response=await fetch("/api/cms/preview",{method:"POST"});setPending("");if(response.ok)window.open("/","_blank","noopener,noreferrer");else setMessage("Pregled nije moguće otvoriti.");}}
  async function publishContent(){
    if(!canPublish||!window.confirm("Objaviti spremljeni nacrt? Promjene postaju vidljive na produkciji."))return;
    setPending("publish");const response=await fetch("/api/cms/publish",{method:"POST"});const data=await response.json().catch(()=>({})) as {error?:string};setPending("");setMessage(response.ok?"Odobrene promjene su objavljene.":data.error||"Objava nije uspjela.");
  }
  async function upload(key:keyof CmsContent,file:File){
    const body=new FormData();body.set("file",file);setPending(String(key));setMessage("");
    const response=await fetch("/api/cms/upload",{method:"POST",body});const data=await response.json().catch(()=>({})) as {error?:string;path?:string};setPending("");
    if(response.ok&&data.path){update(key,data.path);setMessage("Slika je dodana nacrtu. Spremite nacrt za nastavak.");}else setMessage(data.error||"Slika nije dodana.");
  }
  async function logout(){await fetch("/api/cms/session",{method:"DELETE"});window.location.reload();}
  return <div className="cms-editor"><header className="cms-toolbar"><div><p className="kicker">Natura Sanat CMS</p><h1>Uređivanje tekstova i slika</h1><p>Prijavljeni ste kao {email}. Sve se prvo sprema kao nacrt.</p></div><button type="button" className="cms-text-button" onClick={logout}>Odjava</button></header>
    <section className="cms-readiness" aria-label="Status sustava"><span className={configured.storage?"ok":"missing"}>Pohrana {configured.storage?"spremna":"nedostaje"}</span><span className={configured.rateLimit?"ok":"missing"}>Zaštita prijave {configured.rateLimit?"spremna":"nedostaje"}</span><span className={canPublish?"warn":"ok"}>Objava {canPublish?"omogućena":"zaključana do odobrenja"}</span></section>
    {groups.map(group=><section className="cms-card" key={group}><h2>{group}</h2><div className="cms-fields">{fields.filter(field=>field.group===group).map(field=><label key={field.key}>{field.label}{field.kind==="textarea"?<textarea value={content[field.key]} maxLength={field.maxLength} rows={5} onChange={event=>update(field.key,event.target.value)}/>:field.kind==="image"?<><input value={content[field.key]} maxLength={field.maxLength} onChange={event=>update(field.key,event.target.value)}/><input className="cms-file" type="file" accept="image/jpeg,image/png,image/webp" disabled={pending===field.key} onChange={event=>{const file=event.target.files?.[0];if(file)upload(field.key,file);}}/><small>JPEG, PNG ili WebP do 5 MB. Trenutačna putanja: {content[field.key]}</small></>:<input value={content[field.key]} maxLength={field.maxLength} onChange={event=>update(field.key,event.target.value)}/>}</label>)}</div></section>)}
    <footer className="cms-actions"><div>{message&&<p role="status">{message}</p>}<small>Nacrt nije javna objava. Pregled se otvara samo u vašoj zaštićenoj sesiji.</small></div><button type="button" onClick={save} disabled={Boolean(pending)}>{pending==="save"?"Spremanje…":"Spremi nacrt"}</button><button type="button" onClick={preview} disabled={Boolean(pending)}>{pending==="preview"?"Otvaranje…":"Pregledaj nacrt"}</button><button type="button" className="button" onClick={publishContent} disabled={!canPublish||Boolean(pending)}>Objavi odobrene promjene</button></footer>
  </div>;
}
