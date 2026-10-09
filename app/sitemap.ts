import type {MetadataRoute} from "next";

const baseUrl = "https://naturasanat.hr";
const routes = ["", "/en", "/sandra", "/savjetovanje", "/individualni-rad", ...["individualni-plan-prehrane","fitoaromaterapija-i-suplementacija","podrska-tijelu-i-redukcija-stresa","sirova-prehrana","detox-tijela","put-zdravlja"].map(slug=>`/individualni-rad/${slug}`), "/predavanja", "/snimke-radionica", "/webshop", "/iskustva", "/digitalni-alati", "/preporucujem", "/mediji", "/za-medije", "/kontakt", "/privatnost", "/kolacici", "/uvjeti-kupnje", "/prigovori-i-povrati", "/dokumenti", "/cjenici"];

export default function sitemap():MetadataRoute.Sitemap {
  return routes.map((route,index)=>({
    url:`${baseUrl}${route}`,
    lastModified:new Date("2026-09-24"),
    changeFrequency:index===0?"weekly":"monthly",
    priority:index===0?1:route==="/webshop"||route==="/savjetovanje"?0.9:0.7,
  }));
}
