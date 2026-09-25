import {Footer,Header} from "../site-components";
const products=[
["Omega-3 tekući veganski Superior","https://biogena.com/hr-hr/proizvodi/omega-3-tekuci-veganski-superior-49","BIOGENA_OMEGA3_AFFILIATE_URL"],
["Spirulina 400 mg","https://biogena.com/hr-hr/proizvodi/spirulina-400-mg-79","BIOGENA_SPIRULINA_AFFILIATE_URL"],
["Bio Moringa 500","https://biogena.com/hr-hr/proizvodi/bio-moringa-500-250","BIOGENA_MORINGA_AFFILIATE_URL"],
];
function partnerLink(key:string):string | null {
  const value=process.env[key];
  if (!value) return null;
  try { const url=new URL(value); return url.protocol==="https:" && (url.hostname==="biogena.com" || url.hostname.endsWith(".biogena.com")) ? url.href : null; } catch { return null; }
}
export default function Page(){return <><Header/><main><section className="page-hero green"><div><p className="kicker">Preporučujem</p><h1>Prije proizvoda dolazi pitanje: treba li ti uopće?</h1><p className="lede">Sandra ovdje izdvaja proizvode koje smatra vrijednima pogleda. Preporuka nije zamjena za provjeru deklaracije, terapije i vlastitih potreba.</p></div></section><section className="recommend wrap"><div className="affiliate-note"><strong>Napomena o partnerskim poveznicama</strong><p>Kupnja se obavlja na webu prodavatelja. Poveznice uz proviziju označene su uz pojedini proizvod. Dok takva poveznica nije ugovorena i povezana, prikazuje se obična poveznica bez postavljene partnerske provizije.</p></div><div className="recommend-list">{products.map(([name,href,key],i)=>{const affiliate=partnerLink(key);return <article key={href}><span>0{i+1}</span><h2>{name}</h2><p>Prije kupnje pročitajte deklaraciju. Ako uzimate terapiju, imate dijagnozu, trudni ste ili dojite, proizvod prvo provjerite s liječnikom ili ljekarnikom.</p><p className="product-partner-note">{affiliate ? "Partnerska poveznica: Sandra može ostvariti proviziju od kvalificirane kupnje." : "Obična poveznica: partnerska provizija još nije postavljena."}</p><a className="arrow-link" href={affiliate || href} target="_blank" rel={affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}>Otvori stranicu proizvoda <span aria-hidden>↗</span></a></article>;})}</div>{/* TODO_REPLACE_WITH_VERIFIED_AFFILIATE_LINKS */}{/* TODO_CONFIRM_PRODUCT_IMAGE_RIGHTS */}</section></main><Footer/></>}
