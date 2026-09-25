import type { Metadata } from "next";
import "./globals.css";
import "./homepage.css";
import {CookieConsent} from "./cookie-consent";
import {SeoStructuredData} from "./seo-structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.naturasanat.hr"),
  title: {default:"Sandra Drašković | Prehrana, savjetovanje i edukacija",template:"%s | Sandra Drašković"},
  description: "Individualne konzultacije, predavanja, radionice i edukativni sadržaji Sandre Drašković.",
  openGraph:{type:"website",locale:"hr_HR",siteName:"Sandra Drašković · Natura Sanat",title:"Sandra Drašković | Prehrana, savjetovanje i edukacija",description:"Individualne konzultacije, predavanja, radionice i edukativni sadržaji o prehrani i dodacima prehrani."},
  twitter:{card:"summary_large_image",title:"Sandra Drašković | Natura Sanat",description:"Savjetovanje, radionice i edukativni sadržaji o prehrani."},
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

/*
TODO_CONFIRM_LEGAL_DETAILS: podaci poslovnog subjekta
TODO_CONFIRM_LEGAL_DETAILS: politika privatnosti
TODO_CONFIRM_LEGAL_DETAILS: kolačići
TODO_CONFIRM_LEGAL_DETAILS: uvjeti kupnje
TODO_CONFIRM_LEGAL_DETAILS: povrati za digitalne proizvode
TODO_CONFIRM_LEGAL_DETAILS: prigovori potrošača
TODO_CONFIRM_LEGAL_DETAILS: affiliate objava
TODO_CONFIRM_LEGAL_DETAILS: medicinsko odricanje od odgovornosti
TODO_CONFIRM_LEGAL_DETAILS: obrada zdravstvenih podataka
TODO_CONFIRM_FONT_WEB_LICENSE
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hr"><body><SeoStructuredData/>{children}<CookieConsent/></body></html>;
}
