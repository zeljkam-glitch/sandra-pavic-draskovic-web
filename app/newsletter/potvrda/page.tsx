import type {Metadata} from "next";
import Link from "next/link";
import {Header, Footer} from "../../site-components";
import {verifyNewsletterConfirmationToken} from "../../../lib/newsletter/confirmation-token";

export const metadata: Metadata = {title:"Potvrda newslettera", robots:{index:false, follow:false}};

export default async function Page({searchParams}:{searchParams:Promise<{token?:string}>}) {
  const {token = ""} = await searchParams;
  const valid = token.length <= 3000 && Boolean(verifyNewsletterConfirmationToken(token));
  return <><Header/><main className="empty-state wrap">
    <p className="kicker">Natura Sanat novosti</p>
    {valid ? <>
      <h1>Još samo potvrdite prijavu.</h1>
      <p>Klikom na gumb vaša će adresa biti dodana na newsletter listu. Odjaviti se možete u bilo kojem trenutku putem poveznice u svakoj poruci.</p>
      <form action="/api/newsletter/confirm" method="post"><input type="hidden" name="token" value={token}/><button className="button" type="submit">Potvrđujem prijavu</button></form>
    </> : <><h1>Poveznica više nije važeća.</h1><p>Vratite se na naslovnicu i ponovno zatražite prijavu kako biste dobili novu poveznicu.</p><Link className="button" href="/#newsletter-prijava">Ponovi prijavu</Link></>}
  </main><Footer/></>;
}
