import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {services} from "../../_data/services";
import {ArrowLink,Footer,Header} from "../../site-components";

export function generateStaticParams(){return services.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const service=services.find(item=>item.slug===slug);if(!service)return{};return{title:service.title,description:service.lead,alternates:{canonical:`/individualni-rad/${slug}`}}}

export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const service=services.find(item=>item.slug===slug);if(!service)notFound();return <><Header/><main>
  <section className={`service-detail-hero ${service.featured?"featured":""}`}><div className="wrap"><p className="kicker">{service.eyebrow}</p><h1>{service.title}</h1><p>{service.lead}</p><div className="service-detail-facts"><span><small>Trajanje</small><strong>{service.duration}</strong></span><span><small>Cijena programa</small><strong>{service.price}</strong></span></div></div></section>
  <section className="service-detail wrap"><div><p className="kicker">Individualno prilagođen rad</p><h2>Što program donosi</h2>{service.description.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<h3>U cijenu je uključeno</h3><ul>{service.includes.map(item=><li key={item}>{item}</li>)}</ul>{service.guide&&<p className="notice">{service.guide}</p>}</div><aside><h2>Plaćanje i početak</h2><p>{service.payment}</p><p>Za nove klijente uvodna individualna procjena i savjetovanje od 150 € ugovara se i plaća zasebno prije preporuke ovog programa.</p><p>Slanje upita nije rezervacija. Nakon što dogovorimo prikladnost usluge i termin, primit ćete pisanu ponudu i podatke za plaćanje.</p><a className="button" href={`/kontakt?tema=programi&program=${encodeURIComponent(service.title)}`}>Pošaljite upit</a><ArrowLink href="/uvjeti-kupnje">Uvjeti plaćanja i otkazivanja</ArrowLink></aside></section>
  <section className="final-cta"><div className="wrap"><p className="kicker">Prvi korak za nove klijente</p><h2>Sve počinje uvodnom procjenom.</h2><p>Najprije upoznajemo vaš kontekst. Tek nakon toga biramo program i potvrđujemo opseg rada.</p><div className="actions"><a className="button" href="/savjetovanje">Uvodno savjetovanje</a></div></div></section>
  </main><Footer/></>}
