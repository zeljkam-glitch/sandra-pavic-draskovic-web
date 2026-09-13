import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandra Pavić Drašković | Zdravlje koje možeš živjeti",
  description: "Individualno savjetovanje o prehrani, suplementima i navikama te edukativna predavanja za tvrtke i udruge.",
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
