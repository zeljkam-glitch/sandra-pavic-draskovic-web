import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import {put} from "@vercel/blob";

const files = [
  ["private-ebooks-source/hrana-zivotna-energija-vitalnost.pdf", "ebooks/hrana-zivotna-energija-vitalnost.pdf"],
  ["private-ebooks-source/snaga-svjezine.pdf", "ebooks/snaga-svjezine.pdf"],
  ["private-ebooks-source/biljna-inspiracija-blagdanski-stol.pdf", "ebooks/biljna-inspiracija-blagdanski-stol.pdf"],
];

for (const [source, pathname] of files) {
  const body = await readFile(resolve(source));
  const blob = await put(pathname, body, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: "application/pdf",
    cacheControlMaxAge: 3600,
  });
  console.log(`${source} -> ${blob.pathname}`);
}
