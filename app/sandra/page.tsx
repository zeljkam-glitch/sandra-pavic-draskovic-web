import Image from "next/image";
import {Footer, Header} from "../site-components";

export default function Page(){return <><Header/><main>
  <section className="sandra-hero">
    <div><p className="eyebrow">O Sandri</p><h1>Znanje koje je prošlo kroz život.</h1><p>Magistra farmacije, fitoaromaterapeutkinja i specijalistica regenerativne detoksikacije.</p></div>
    <figure><Image src="/images/sandra/sandra-green-glass.jpg" alt="Sandra Pavić Drašković u svijetlom interijeru" fill priority sizes="(max-width: 900px) 100vw, 46vw"/></figure>
  </section>
  <section className="sandra-story wrap"><div><p className="eyebrow">Moje iskustvo i misija</p><h2>Put prema zdravlju postao je put dijeljenja znanja.</h2></div><div><p>Sandra Pavić Drašković je magistra farmacije i osnivačica obrta Natura Sanat za nutricionističko i fitoaromaterapijsko savjetovanje.</p><p>Nakon dijagnoze raka debelog crijeva s metastazama u jetri 2017. godine, vlastito iskustvo povezala je s farmaceutskim znanjem, medicinskim metodama i holističkim pristupom.</p><p>Danas kroz individualna savjetovanja, Školu detoxa, edukativna predavanja, radionice i pisane materijale približava informacije koje ljudi mogu razumjeti i koristiti u svakodnevnom životu.</p></div></section>
  <section className="sandra-moments" aria-label="Sandra u svakodnevnom životu">
    <figure><Image src="/images/sandra/sandra-melon.jpeg" alt="Sandra s posudom narezanog voća na brodu" fill sizes="33vw"/></figure>
    <figure><Image src="/images/sandra/sandra-tea.jpeg" alt="Sandra uz šalicu čaja" fill sizes="33vw"/></figure>
    <figure><Image src="/images/sandra/sandra-cafe-green.jpg" alt="Sandra u kafiću drži čašu zelenog napitka" fill sizes="33vw"/></figure>
  </section>
</main><Footer/></>}
