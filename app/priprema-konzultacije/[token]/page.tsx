import type { Metadata } from "next";
import Link from "next/link";
import { validInvitation } from "../invitations";
import { Questionnaire } from "../questionnaire";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Priprema za konzultaciju | Sandra Drašković", robots: {index:false,follow:false}, referrer:"no-referrer" };
export default async function Page({params}:{params:Promise<{token:string}>}) {
  const { token }=await params;
  const preview = token === "pregled" && process.env.NODE_ENV !== "production";
  if (!preview && !validInvitation(token)) return <main className="questionnaire-shell"><Link className="brand" href="/">Sandra Drašković</Link><section className="questionnaire-card"><p className="kicker">Priprema za konzultaciju</p><h1>Pozivnica nije dostupna.</h1><p>Poveznica je istekla ili nije valjana. Zatraži novu poveznicu od Sandre nakon potvrde plaćanja uvodne konzultacije.</p></section></main>;
  if (!preview && process.env.CLIENT_DOCUMENTS_SUBMISSION_ENABLED !== "true") return <main className="questionnaire-shell"><Link className="brand" href="/">Sandra Drašković</Link><section className="questionnaire-card"><p className="kicker">Priprema za konzultaciju</p><h1>Sigurna predaja još nije dostupna.</h1><p>Zdravstveni upitnik ostat će isključen dok ne budu potvrđeni privatna pohrana, kontrola pristupa, rokovi čuvanja i siguran kanal dostave. Javi se Sandri radi dogovora.</p></section></main>;
  return <Questionnaire preview={preview} token={token}/>;
}
