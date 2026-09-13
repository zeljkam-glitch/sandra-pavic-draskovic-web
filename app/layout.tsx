import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandra Pavić Drašković | Zdravlje koje možeš živjeti",
  description: "Škola detoxa, individualno savjetovanje o prehrani i suplementima te edukativna predavanja Sandre Pavić Drašković.",
  other: {
    "codex-preview": "sandra-editorial-health",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
