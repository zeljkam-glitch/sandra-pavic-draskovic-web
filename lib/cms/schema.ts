export const CMS_FIELDS = [
  {key:"brandTagline", group:"Zaglavlje i podnožje", label:"Podnaslov brenda", kind:"text", maxLength:80},
  {key:"footerDescription", group:"Zaglavlje i podnožje", label:"Opis u podnožju", kind:"textarea", maxLength:240},
  {key:"homeHeroEyebrow", group:"Naslovnica · uvod", label:"Nadnaslov", kind:"text", maxLength:80},
  {key:"homeHeroTitle", group:"Naslovnica · uvod", label:"Glavni naslov", kind:"textarea", maxLength:180},
  {key:"homeHeroText", group:"Naslovnica · uvod", label:"Uvodni tekst", kind:"textarea", maxLength:600},
  {key:"homeHeroPrimaryLabel", group:"Naslovnica · uvod", label:"Glavni gumb", kind:"text", maxLength:60},
  {key:"homeHeroSecondaryLabel", group:"Naslovnica · uvod", label:"Sporedni gumb", kind:"text", maxLength:60},
  {key:"homeHeroImage", group:"Naslovnica · uvod", label:"Pozadinska fotografija", kind:"image", maxLength:500},
  {key:"homeHeroImageAlt", group:"Naslovnica · uvod", label:"Opis fotografije za pristupačnost", kind:"text", maxLength:180},
  {key:"homeAboutEyebrow", group:"Naslovnica · o Sandri", label:"Nadnaslov", kind:"text", maxLength:120},
  {key:"homeAboutTitle", group:"Naslovnica · o Sandri", label:"Naslov", kind:"text", maxLength:180},
  {key:"homeAboutLead", group:"Naslovnica · o Sandri", label:"Prvi odlomak", kind:"textarea", maxLength:600},
  {key:"homeAboutStory", group:"Naslovnica · o Sandri", label:"Osobna priča", kind:"textarea", maxLength:1000},
  {key:"homeAboutClosing", group:"Naslovnica · o Sandri", label:"Završni odlomak", kind:"textarea", maxLength:1000},
  {key:"homeAboutImage", group:"Naslovnica · o Sandri", label:"Fotografija", kind:"image", maxLength:500},
  {key:"homeAboutImageAlt", group:"Naslovnica · o Sandri", label:"Opis fotografije za pristupačnost", kind:"text", maxLength:180},
  {key:"homeNewsletterTitle", group:"Naslovnica · newsletter", label:"Naslov", kind:"text", maxLength:180},
  {key:"homeNewsletterText", group:"Naslovnica · newsletter", label:"Tekst", kind:"textarea", maxLength:600},
  {key:"sandraEyebrow", group:"Stranica O Sandri", label:"Nadnaslov", kind:"text", maxLength:120},
  {key:"sandraTitle", group:"Stranica O Sandri", label:"Naslov", kind:"text", maxLength:180},
  {key:"sandraIntro", group:"Stranica O Sandri", label:"Uvod", kind:"textarea", maxLength:1000},
  {key:"sandraPortrait", group:"Stranica O Sandri", label:"Fotografija", kind:"image", maxLength:500},
  {key:"sandraPortraitAlt", group:"Stranica O Sandri", label:"Opis fotografije za pristupačnost", kind:"text", maxLength:180},
  {key:"sandraStoryTitle", group:"Stranica O Sandri", label:"Naslov osobne priče", kind:"text", maxLength:180},
  {key:"sandraStoryText", group:"Stranica O Sandri", label:"Osobna priča", kind:"textarea", maxLength:1800},
  {key:"sandraStoryDisclaimer", group:"Stranica O Sandri", label:"Važna napomena", kind:"textarea", maxLength:1000},
  {key:"contactTitle", group:"Kontakt", label:"Naslov", kind:"text", maxLength:180},
  {key:"contactIntro", group:"Kontakt", label:"Uvod", kind:"textarea", maxLength:600},
  {key:"contactResponseTime", group:"Kontakt", label:"Vrijeme odgovora", kind:"text", maxLength:180},
  {key:"contactImage", group:"Kontakt", label:"Fotografija", kind:"image", maxLength:500},
  {key:"contactImageAlt", group:"Kontakt", label:"Opis fotografije za pristupačnost", kind:"text", maxLength:180},
  {key:"shopTitle", group:"Webshop", label:"Naslov", kind:"text", maxLength:180},
  {key:"shopIntro", group:"Webshop", label:"Uvod", kind:"textarea", maxLength:1000},
] as const;

export type CmsField = (typeof CMS_FIELDS)[number];
export type CmsFieldKey = CmsField["key"];
export type CmsContent = Record<CmsFieldKey, string>;

export const DEFAULT_CMS_CONTENT: CmsContent = {
  brandTagline:"Holistički put zdravlja",
  footerDescription:"Individualno savjetovanje o prehrani, dodacima prehrani i zdravim životnim navikama.",
  homeHeroEyebrow:"Natura Sanat",
  homeHeroTitle:"Holistički put zdravlja sa Sandrom Pavić Drašković",
  homeHeroText:"Individualno savjetovanje o prehrani i zdravim životnim navikama za očuvanje zdravlja i vitalnosti, kvalitetniju prehranu, osobne ciljeve te podršku prilagođenu vašem trenutačnom zdravstvenom stanju.",
  homeHeroPrimaryLabel:"Započnite ovdje",
  homeHeroSecondaryLabel:"Upoznajte me",
  homeHeroImage:"/natura-sanat-forest-hero-v2.webp",
  homeHeroImageAlt:"Sunčeve zrake kroz zelenu šumsku krošnju",
  homeAboutEyebrow:"Stručnost · iskustvo · cjelovit pristup",
  homeAboutTitle:"Znanje povezano s osobnim iskustvom.",
  homeAboutLead:"Ja sam Sandra Pavić Drašković, magistra farmacije, fitoaromaterapeutkinja i specijalistica regenerativne detoksikacije.",
  homeAboutStory:"Nakon dijagnoze raka debelog crijeva s metastazama u jetri 2017. godine, uz onkološko liječenje u svoj sam život uvela duboke promjene prehrane i životnih navika. Od kraja 2017. bolest je u remisiji, bez znakova povratka.",
  homeAboutClosing:"Danas povezujem stručno znanje i osobno iskustvo kako bih ljudima pomogla razumjeti vlastite potrebe i napraviti održive promjene. Jer put prema zdravlju za mene nije samo teorija koju sam učila. To je put koji sam i sama prošla.",
  homeAboutImage:"/images/sandra/sandra-about-v1.webp",
  homeAboutImageAlt:"Sandra Pavić Drašković",
  homeNewsletterTitle:"Znanje koje možete primijeniti.",
  homeNewsletterText:"Povremeno primite Sandrine stručne i razumljive tekstove, nove recepte te informacije o programima, predavanjima i radionicama.",
  sandraEyebrow:"Sandra Pavić Drašković",
  sandraTitle:"Znanje povezano s osobnim iskustvom.",
  sandraIntro:"Magistra sam farmacije, fitoaromaterapeutkinja, specijalistica regenerativne detoksikacije i edukatorica. Kroz Natura Sanat radim s ljudima koji žele bolje razumjeti prehranu, dodatke i svoje svakodnevne navike.",
  sandraPortrait:"/images/sandra/sandra-cafe-green.jpg",
  sandraPortraitAlt:"Sandra Pavić Drašković za stolom sa zelenim napitkom",
  sandraStoryTitle:"Zašto radim ovaj posao",
  sandraStoryText:"Godine 2017. dijagnosticiran mi je rak debelog crijeva s metastazama u jetri. Bolest je promijenila moj život i način na koji slušam ljude. Dobro poznajem osjećaj kad imaš mnogo pitanja, a teško je odvojiti korisnu informaciju od obećanja.",
  sandraStoryDisclaimer:"Moja priča je osobno iskustvo, ne dokaz učinkovitosti određene prehrane ili pripravka. Ne koristim je kao jamstvo tuđeg oporavka. Prehrambena podrška ne zamjenjuje onkološko liječenje.",
  contactTitle:"Počnimo jednim razgovorom.",
  contactIntro:"Odaberi što te zanima i ostavi adresu za odgovor. Ako još ne znaš što pitati, dovoljno je samo odabrati temu.",
  contactResponseTime:"Sandra odgovara u pravilu u roku od dva radna dana.",
  contactImage:"/images/sandra/sandra-collaboration-v1.webp",
  contactImageAlt:"Sandra Pavić Drašković u svijetloj kuhinji",
  shopTitle:"Više od recepata.",
  shopIntro:"Znanje, iskustvo i recepti koje sam godinama stvarala, proučavala i primjenjivala na svojem putu prema zdravlju.",
};

const fieldByKey = new Map(CMS_FIELDS.map(field => [field.key, field]));

export function parseCmsContent(value: unknown): CmsContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Neispravan sadržaj.");
  const input = value as Record<string, unknown>;
  const output = {...DEFAULT_CMS_CONTENT};
  for (const key of Object.keys(input)) {
    const field = fieldByKey.get(key as CmsFieldKey);
    if (!field || typeof input[key] !== "string") throw new Error("Neispravno polje sadržaja.");
    const text = input[key].trim();
    if (!text || text.length > field.maxLength) throw new Error(`Polje ${field.label} nije ispravno.`);
    if (field.kind === "image" && !isAllowedImagePath(text)) throw new Error(`Slika ${field.label} nije dopuštena.`);
    output[key as CmsFieldKey] = text;
  }
  return output;
}

export function isAllowedImagePath(value: string) {
  if (value.includes("..") || value.includes("//")) return false;
  return /^\/[A-Za-z0-9_./-]+\.(?:avif|gif|jpe?g|png|webp)$/i.test(value) || /^\/api\/cms\/media\/[0-9a-f-]{36}\.(?:jpe?g|png|webp)$/i.test(value);
}
