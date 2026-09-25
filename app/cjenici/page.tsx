import {Footer,Header} from "../site-components";

const priceLists = [
  {title:"Webshop i digitalni vodiči",updated:"24. 9. 2026. u 20:59",href:"/cjenici/webshop_Zelenjak-38-Zagreb_WEB-01_001_24.09.2026_20-59.csv"},
  {title:"Usluge savjetovanja",updated:"24. 9. 2026. u 20:59",href:"/cjenici/savjetovaliste_Zelenjak-38-Zagreb_U-01_001_24.09.2026_20-59.csv"},
];

export default function Page(){return <><Header/><main><section className="page-hero yellow"><div><p className="kicker">Transparentnost cijena</p><h1>Važeći cjenici</h1><p className="lede">Cjenici su dostupni u strojno čitljivom CSV formatu. Uz trenutačnu cijenu sadrže i cijenu na mjerodavni datum.</p></div></section><section className="wrap price-list-page"><div className="price-list-notice"><strong>Kako čitati sidrenu cijenu</strong><p>Za proizvode i usluge u ponudi 10. rujna 2026. prikazana je cijena koja je vrijedila tog dana. Za stavke prvi put uvedene poslije tog datuma prikazana je cijena pri prvom uvrštenju i datum uvrštenja.</p></div><div className="price-downloads">{priceLists.map(list=><article key={list.href}><div><p className="eyebrow">CSV cjenik</p><h2>{list.title}</h2><p>Ažurirano: {list.updated}</p></div><a className="button" href={list.href} download>Preuzmi .CSV</a></article>)}</div><p className="fine">Prethodne verzije cjenika čuvaju se i ostaju javno dostupne najmanje 30 dana od objave odnosno promjene.</p></section></main><Footer/></>}
