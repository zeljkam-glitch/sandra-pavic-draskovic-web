export const PRODUCT_KEYS = [
  "biljna-prehrana",
  "svjeza-prehrana",
  "blagdanski-recepti",
  "kolekcija",
] as const;

export type ProductKey = (typeof PRODUCT_KEYS)[number];
export type DownloadProductKey = Exclude<ProductKey, "kolekcija">;

type Product = {
  title: string;
  priceCents: number;
  checkoutEnv: string;
  downloads: readonly DownloadProductKey[];
  blobPath?: string;
  downloadFilename?: string;
};

export const PRODUCTS: Record<ProductKey, Product> = {
  "biljna-prehrana": {
    title: "Hrana koja budi životnu energiju i vitalnost",
    priceCents: 4900,
    checkoutEnv: "NEXT_PUBLIC_CHECKOUT_BILJNA_PREHRANA",
    downloads: ["biljna-prehrana"],
    blobPath: "ebooks/hrana-zivotna-energija-vitalnost.pdf",
    downloadFilename: "natura-sanat-hrana-zivotna-energija-vitalnost.pdf",
  },
  "svjeza-prehrana": {
    title: "Snaga svježine",
    priceCents: 3900,
    checkoutEnv: "NEXT_PUBLIC_CHECKOUT_SVJEZA_PREHRANA",
    downloads: ["svjeza-prehrana"],
    blobPath: "ebooks/snaga-svjezine.pdf",
    downloadFilename: "natura-sanat-snaga-svjezine.pdf",
  },
  "blagdanski-recepti": {
    title: "Biljna inspiracija za blagdanski stol",
    priceCents: 3400,
    checkoutEnv: "NEXT_PUBLIC_CHECKOUT_BLAGDANSKI_RECEPTI",
    downloads: ["blagdanski-recepti"],
    blobPath: "ebooks/biljna-inspiracija-blagdanski-stol.pdf",
    downloadFilename: "natura-sanat-biljna-inspiracija-blagdanski-stol.pdf",
  },
  kolekcija: {
    title: "Sandrina kompletna kolekcija",
    priceCents: 10000,
    checkoutEnv: "NEXT_PUBLIC_CHECKOUT_KOLEKCIJA",
    downloads: ["biljna-prehrana", "svjeza-prehrana", "blagdanski-recepti"],
  },
};

export function isProductKey(value: unknown): value is ProductKey {
  return typeof value === "string" && PRODUCT_KEYS.includes(value as ProductKey);
}

export function getCheckoutUrl(productKey: ProductKey) {
  const value = process.env[PRODUCTS[productKey].checkoutEnv]?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "buy.stripe.com") return null;
    return url;
  } catch {
    return null;
  }
}

export function getDownloadProduct(productKey: DownloadProductKey) {
  const product = PRODUCTS[productKey];
  if (!product.blobPath || !product.downloadFilename) throw new Error("Download product is not configured");
  return {...product, blobPath: product.blobPath, downloadFilename: product.downloadFilename};
}
