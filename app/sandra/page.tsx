import Image from "next/image";
import {Footer, Header} from "../site-components";

export default function Page(){return <><Header/><main>
  <section className="sandra-hero">
    <div><p className="eyebrow">O Sandri</p><h1>Stručnost bez distance. Iskustvo bez dramatiziranja.</h1><p>Farmaceutsko znanje, fitoaromaterapija i edukacija povezani s odlukama koje imaju smisla u stvarnom životu.</p></div>
    <figure><Image src="/images/sandra/sandra-green-glass.jpg" alt="Sandra Pavić Drašković u svijetlom interijeru" fill priority sizes="(max-width: 900px) 100vw, 46vw"/></figure>
  </section>
  <section className="sandra-story wrap"><div><p className="eyebrow">Između znanja i života</p><h2>Znanje je bilo početak. Iskustvo je promijenilo perspektivu.</h2></div><div><p>Sandra Pavić Drašković je magistra farmacije, fitoaromaterapeutkinja i edukatorica. Svoj rad gradi između stručnog znanja i iskustva stvarnog života.</p><p>Njezino osobno iskustvo ozbiljne bolesti dio je perspektive, ali nije jedina tema njezina rada.</p><p>Danas želi ljudima približiti odluke o prehrani, suplementima, biljkama i navikama bez dramatiziranja i brzih obećanja.</p><p className="todo">TODO_CONFIRM_WITH_SANDRA · biografija, kvalifikacije i vremenska crta</p></div></section>
  <section className="sandra-moments" aria-label="Sandra u svakodnevnom životu">
    <figure><Image src="/images/sandra/sandra-melon.jpeg" alt="Sandra s posudom narezanog voća na brodu" fill sizes="33vw"/></figure>
    <figure><Image src="/images/sandra/sandra-tea.jpeg" alt="Sandra uz šalicu čaja" fill sizes="33vw"/></figure>
    <figure><Image src="/images/sandra/sandra-cafe-green.jpg" alt="Sandra u kafiću drži čašu zelenog napitka" fill sizes="33vw"/></figure>
  </section>
</main><Footer/></>}
