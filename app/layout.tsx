import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandra Pavić Drašković | Zdravlje koje možeš živjeti",
  description: "Farmaceutsko znanje, prehrana, suplementi, biljke i održive svakodnevne navike.",
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
