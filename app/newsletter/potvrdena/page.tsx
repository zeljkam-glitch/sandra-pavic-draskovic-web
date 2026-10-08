import type {Metadata} from "next";
import Link from "next/link";
import {Header, Footer} from "../../site-components";

export const metadata: Metadata = {title:"Newsletter potvrđen", robots:{index:false, follow:false}};

export default async function Page({searchParams}:{searchParams:Promise<{status?:string}>}) {
  const {status} = await searchParams;
  const success = status === "success";
  const expired = status === "expired";
  return <><Header/><main className="empty-state wrap"><p className="kicker">Natura Sanat novosti</p>
    {success ? <><h1>Prijava je potvrđena.</h1><p>Dobro došli u Natura Sanat krug. Primat ćete samo odabrane stručne sadržaje i važne novosti.</p><Link className="button" href="/">Povratak na naslovnicu</Link></> : <><h1>{expired ? "Poveznica je istekla." : "Potvrda trenutačno nije uspjela."}</h1><p>{expired ? "Ponovno zatražite prijavu kako biste dobili novu poveznicu." : "Pokušajte ponovno malo kasnije ili zatražite novu poveznicu."}</p><Link className="button" href="/#newsletter-prijava">Ponovi prijavu</Link></>}
  </main><Footer/></>;
}
