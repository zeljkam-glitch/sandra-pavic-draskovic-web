"use client";

import {FormEvent, useState} from "react";

export function CmsLogin() {
  const [error,setError]=useState("");
  const [pending,setPending]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); setPending(true); setError("");
    const form=new FormData(event.currentTarget);
    const response=await fetch("/api/cms/session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:form.get("email"),password:form.get("password")})});
    setPending(false);
    if(response.ok) window.location.reload(); else setError(response.status===429?"Previše pokušaja. Pričekajte 15 minuta.":"Pristupni podaci nisu ispravni ili CMS nije potpuno povezan.");
  }
  return <section className="cms-card cms-login"><p className="kicker">Natura Sanat CMS</p><h1>Uređivanje sadržaja</h1><p>Prijava je dostupna samo u zaštićenom preview okruženju.</p><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Lozinka<input name="password" type="password" autoComplete="current-password" required minLength={14}/></label>{error&&<p className="notice" role="alert">{error}</p>}<button className="button" disabled={pending}>{pending?"Provjera…":"Prijavi se"}</button></form></section>;
}
