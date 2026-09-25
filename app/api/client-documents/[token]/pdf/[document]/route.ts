import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { validInvitation } from "../../../../../priprema-konzultacije/invitations";

export const dynamic = "force-dynamic";

const documents = {
  suglasnost: {
    file: "suglasnost-sandra-pavic-draskovic.pdf",
    download: "Suglasnost-Sandra-Pavic-Draskovic.pdf",
  },
  upitnik: {
    file: "upitnik-prije-konzultacije-sandra-pavic-draskovic.pdf",
    download: "Upitnik-prije-konzultacije-Sandra-Pavic-Draskovic.pdf",
  },
} as const;

export async function GET(_request: Request, { params }: { params: Promise<{ token: string; document: string }> }) {
  const { token, document } = await params;
  if (!validInvitation(token)) return NextResponse.json({ error: "Poveznica nije valjana ili je istekla." }, { status: 404 });
  const selected = documents[document as keyof typeof documents];
  if (!selected) return NextResponse.json({ error: "Dokument nije pronađen." }, { status: 404 });

  try {
    const bytes = await readFile(path.join(process.cwd(), "private-documents", selected.file));
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${selected.download}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch {
    return NextResponse.json({ error: "Dokument trenutačno nije dostupan." }, { status: 503 });
  }
}
