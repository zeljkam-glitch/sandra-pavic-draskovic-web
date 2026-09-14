import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandra Pavić Drašković | Edukacija o prehrani i zdravlju",
  description: "Individualne konzultacije, predavanja, radionice i edukativni sadržaji Sandre Pavić Drašković.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

/*
TODO_CONFIRM_LEGAL_DETAILS
TODO_ENGLISH_CONTENT_REVIEW
TODO_MEDICAL_TRANSLATION_REVIEW
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hr"><body>{children}</body></html>;
}
