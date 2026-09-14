import {Footer,Header} from "../site-components";
import {glossaryTerms} from "./data";
import {GlossaryBrowser} from "./glossary-browser";

export default function Page(){return <><Header/><main><section className="page-hero yellow"><div><p className="kicker">Pojmovnik</p><h1>Stručni pojmovi, bez pretpostavki.</h1><p className="lede">Definicije se objavljuju tek nakon stručne provjere. Trenutačno je dostupna struktura i popis pojmova za uređivanje.</p></div></section><section className="glossary wrap"><GlossaryBrowser terms={glossaryTerms}/><p className="fine">TODO_MEDICAL_CONTENT_REVIEW</p></section></main><Footer/></>}
