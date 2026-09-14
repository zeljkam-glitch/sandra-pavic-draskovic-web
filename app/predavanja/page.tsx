import Image from "next/image";
import {Footer,Header} from "../site-components";

export default function Page(){return <><Header/><main>
<section className="page-hero green"><div><p className="kicker">Za tvrtke, udruge i organizacije</p><h1>Predavanja i radionice o prehrani i zdravlju.</h1><p className="lede">Sadržaj i način izvođenja prilagođavaju se publici i događanju.</p></div></section>
<section className="split"><figure><Image src="/images/sandra/sandra-speaking.jpg" alt="Sandra Drašković tijekom edukativnog predavanja" fill priority sizes="(max-width: 900px) 100vw, 50vw"/></figure><div><p className="kicker">Dva formata</p><h2>Predavanje ili predavanje s praktičnim dijelom.</h2><div className="price-row"><div><span>Predavanje</span><strong>60 minuta</strong></div><b>500 €</b></div><div className="price-row"><div><span>Predavanje s radionicom</span><strong>90 minuta</strong></div><b>550 €</b></div><p>Praktični dio može uključivati izradu smoothija.</p>{/* TODO_CONFIRM_CURRENT_PRICES */}<a className="button" href="/kontakt?tema=predavanje">Pošalji upit za predavanje</a></div></section>
<section className="collab wrap"><div><p className="kicker">Edukacije i suradnje</p><h2>Rad s udrugama i organizacijama.</h2></div><div><p>Sandra sudjeluje u edukativnim aktivnostima Instituta za gastroenterološke tumore (IGET) i Udruge Budi dobro.</p>{/* TODO_CONFIRM_INSTITUTIONAL_COLLABORATION */}{/* TODO_CONFIRM_LOGO_USAGE_PERMISSION */}</div></section>
</main><Footer/></>}
