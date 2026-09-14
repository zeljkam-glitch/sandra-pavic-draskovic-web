import {Footer,Header} from "./site-components";

export function LegalPage({title,intro,children}:{title:string;intro:string;children:React.ReactNode}){
  return <><Header/><main><section className="page-hero yellow"><div><p className="kicker">Pravne informacije</p><h1>{title}</h1><p className="lede">{intro}</p></div></section><article className="legal-copy wrap">{children}<nav className="legal-links" aria-label="Povezane pravne informacije"><a className="arrow-link" href="/privatnost">Privatnost</a><a className="arrow-link" href="/kolacici">Kolačići</a><a className="arrow-link" href="/uvjeti-kupnje">Uvjeti kupnje</a></nav></article></main><Footer/></>;
}
