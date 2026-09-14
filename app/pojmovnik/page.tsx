import {Footer,Header} from "../site-components";
import {glossaryTerms} from "./data";
import {GlossaryBrowser} from "./glossary-browser";

export default function Page(){return <><Header/><main><section className="page-hero yellow"><div><p className="kicker">Pojmovnik</p><h1>Kad riječ zvuči kompliciranije od onoga što zapravo znači.</h1><p className="lede">Mjesto za izraze iz prehrane, farmacije i zdravlja na koje nailaziš u nalazima, člancima i razgovorima. Bez preskakanja objašnjenja.</p></div></section><section className="glossary wrap"><GlossaryBrowser terms={glossaryTerms}/>{/* TODO_MEDICAL_CONTENT_REVIEW */}</section></main><Footer/></>}
