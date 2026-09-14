import Image from "next/image";
import Link from "next/link";
import {Footer,Header} from "../site-components";

export default function Page(){return <><Header/><main>
<section className="page-hero green"><div><p className="kicker">Za tvrtke, udruge i organizacije</p><h1>Predavanja i praktične radionice.</h1><p className="lede">Jasno vođene edukacije o prehrani i svakodnevnim zdravstvenim odlukama.</p></div></section>
<section className="split"><figure><Image src="/images/sandra/sandra-speaking.jpg" alt="Sandra Pavić Drašković tijekom edukativnog predavanja" fill priority sizes="(max-width: 900px) 100vw, 50vw"/></figure><div><p className="kicker">Dva formata</p><h2>Od stručnog predavanja do praktičnog rada.</h2><div className="price-row"><div><span>Predavanje</span><strong>60 minuta</strong></div><b>500 €</b></div><div className="price-row"><div><span>Predavanje s radionicom</span><strong>90 minuta</strong></div><b>550 €</b></div><p>Praktični dio može uključivati izradu smoothija.</p><span className="todo">TODO_CONFIRM_CURRENT_PRICES</span><Link className="button" href="/kontakt?tema=predavanje">Pošalji upit za predavanje</Link></div></section>
<section className="collab wrap"><div><p className="kicker">Edukacije i suradnje</p><h2>Iskustvo rada u različitim kontekstima.</h2></div><div><p>Sandra surađuje s Institutom za gastroenterološke tumore, IGET, i Udrugom Budi dobro.</p><p className="fine">TODO_CONFIRM_INSTITUTIONAL_COLLABORATION · TODO_CONFIRM_LOGO_USAGE_PERMISSION</p></div></section>
</main><Footer/></>}
