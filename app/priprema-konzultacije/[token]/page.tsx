import type { Metadata } from "next";
import { validInvitation } from "../invitations";
import { Questionnaire } from "../questionnaire";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Priprema za konzultaciju | Sandra Drašković", robots: {index:false,follow:false}, referrer:"no-referrer" };
export default async function Page({params}:{params:Promise<{token:string}>}) {
  const { token }=await params;
  const preview = token === "pregled" && process.env.NODE_ENV !== "production";
  if (!preview && !validInvitation(token)) return <main className="questionnaire-shell"><a className="brand" href="/">Sandra Drašković</a><section className="questionnaire-card"><p className="kicker">Priprema za konzultaciju</p><h1>Pozivnica nije dostupna.</h1><p>Poveznica je istekla ili nije valjana. Zatraži novu poveznicu od Sandre nakon potvrde plaćanja uvodne konzultacije.</p></section></main>;
  return <Questionnaire preview={preview} token={token}/>;
}
