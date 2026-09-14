import {Footer,Header} from "../site-components";
import {glossaryTerms} from "./data";
import {GlossaryBrowser} from "./glossary-browser";

export default function Page(){return <><Header/><main><section className="page-hero yellow"><div><p className="kicker">Pojmovnik</p><h1>Pojmovi iz prehrane, farmacije i svakodnevnog zdravlja.</h1><p className="lede">Svaka definicija bit će objavljena tek nakon stručne provjere. Za sada je dostupna struktura pojmovnika.</p></div></section><section className="glossary wrap"><GlossaryBrowser terms={glossaryTerms}/>{/* TODO_MEDICAL_CONTENT_REVIEW */}</section></main><Footer/></>}
