import type { Metadata } from "next";
import "./globals.css";
import "./homepage.css";
import {CookieConsent} from "./cookie-consent";
import {NewsletterPopup} from "./newsletter-popup";
import {SeoStructuredData} from "./seo-structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://naturasanat.hr"),
  title: {default:"Natura Sanat | Sandra Pavić Drašković",template:"%s | Natura Sanat"},
  description: "Individualne konzultacije, predavanja, radionice i edukativni sadržaji Sandre Drašković.",
  openGraph:{type:"website",locale:"hr_HR",siteName:"Natura Sanat",title:"Natura Sanat | Sandra Pavić Drašković",description:"Individualno savjetovanje, programi, radionice i edukativni vodiči o prehrani i zdravim životnim navikama."},
  twitter:{card:"summary_large_image",title:"Sandra Drašković | Natura Sanat",description:"Savjetovanje, radionice i edukativni sadržaji o prehrani."},
  robots: { index: true, follow: true },
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
  return <html lang="hr"><body><SeoStructuredData/>{children}<NewsletterPopup/><CookieConsent/></body></html>;
}
