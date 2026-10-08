import type {Metadata} from "next";
import {Header, Footer} from "../../site-components";

export const metadata: Metadata = {title: "Kupnja je zaprimljena", robots: {index: false, follow: false}};

export default function Page() {
  return <><Header/><main className="legal-page"><div className="wrap legal-copy"><p className="eyebrow">Hvala na kupnji</p><h1>Provjeri svoju e-poštu.</h1><p>Nakon što Stripe potvrdi uplatu, na adresu unesenu pri plaćanju stići će sigurne poveznice za preuzimanje kupljenih e-knjiga.</p><p>Poveznice vrijede 48 sati i svaka dopušta najviše tri preuzimanja. Ako poruka ne stigne u nekoliko minuta, provjeri neželjenu poštu ili se javi putem <a href="/kontakt">kontaktnog obrasca</a>.</p><a className="button" href="/webshop">Povratak u webshop</a></div></main><Footer/></>;
}
