import Link from "next/link";

const options=[
 {id:"instrument",className:"specimen--one",number:"01",name:"Instrument Serif + Manrope",note:"Najmodernija kombinacija. Instrument Serif ima editorial karakter bez klasičnog, starinskog dojma. Manrope je čist i dovoljno topao za zdravstvene teme."},
 {id:"cormorant",className:"specimen--two",number:"02",name:"Cormorant Garamond + Inter",note:"Najizraženiji modni i časopisni smjer. Serif je elegantniji i dramatičniji. Ova kombinacija traži vrlo discipliniran layout i malo velikih izjava."},
 {id:"newsreader",className:"specimen--three",number:"03",name:"Newsreader + IBM Plex Sans",note:"Najmirnija i najozbiljnija kombinacija. Ima urednički autoritet, ali ostaje suvremena i čitljiva. Dobro podnosi duže zdravstvene tekstove."}
];

export default function TypographyTest(){
 return <main className="type-test">
  <nav className="type-test__nav" aria-label="Tipografske opcije"><strong>Tipografija za Sandru</strong><div>{options.map(o=><a key={o.id} href={"#"+o.id}>{o.number}</a>)}<Link href="/">Web</Link></div></nav>
  <header className="type-intro"><h1>Isti sadržaj. Tri tipografska sustava.</h1><p>Gledaj oblik naslova, hrvatske znakove, čitljivost odlomka i odnos serifa sa sans serifom. Boja je ovdje sekundarna.</p></header>
  {options.map(o=><section id={o.id} className={"specimen "+o.className} key={o.id}>
   <div className="specimen__meta"><span>{o.number}</span><span>{o.name}</span></div>
   <div className="specimen__grid">
    <div><h2>Brini o zdravlju prije nego što moraš.</h2><p className="specimen__body">Sandra povezuje farmaceutsko znanje s prehranom, suplementima i biljkama. Pomaže ljudima razumjeti što im je važno i kako zdravije odluke uklopiti u svakodnevni život.</p><p className="specimen__byline">Sandra Pavić Drašković<span>mag. pharm. · fitoaromaterapeutkinja · edukatorica</span></p><span className="specimen__cta">Rezerviraj Health Review</span></div>
    <blockquote>“Znanje vrijedi tek kada ga možeš primijeniti.”</blockquote>
   </div>
   <p className="specimen__chars">Č ć ž š đ · ABCDEFGHIJKLMNOPRSTUVZ · abcdefghijklmnoprstuvz · 0123456789</p>
   <p className="specimen__note">{o.note}</p>
  </section>)}
 </main>
}
