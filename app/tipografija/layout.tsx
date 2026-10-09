import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Radni pregled tipografije",
  robots: {index: false, follow: false},
};

export default function TypographyLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}
