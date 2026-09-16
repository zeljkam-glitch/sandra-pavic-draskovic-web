import type { Metadata } from "next";
import "./globals.css";
import "./homepage.css";

export const metadata: Metadata = {
  title: "Sandra Drašković | Edukacija o prehrani i zdravlju",
  description: "Individualne konzultacije, predavanja, radionice i edukativni sadržaji Sandre Drašković.",
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
TODO_ENGLISH_CONTENT_REVIEW
TODO_MEDICAL_TRANSLATION_REVIEW
TODO_CONFIRM_FONT_WEB_LICENSE
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hr"><body>{children}</body></html>;
}
