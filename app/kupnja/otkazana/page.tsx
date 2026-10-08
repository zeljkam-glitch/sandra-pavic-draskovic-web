import type {Metadata} from "next";
import {Header, Footer} from "../../site-components";

export const metadata: Metadata = {title: "Kupnja nije dovršena", robots: {index: false, follow: false}};

export default function Page() {
  return <><Header/><main className="legal-page"><div className="wrap legal-copy"><p className="eyebrow">Kupnja nije dovršena</p><h1>Naplata nije provedena.</h1><p>Nije ti ništa naplaćeno. Možeš se vratiti u webshop i pokušati ponovno kada ti odgovara.</p><a className="button" href="/webshop">Povratak u webshop</a></div></main><Footer/></>;
}
