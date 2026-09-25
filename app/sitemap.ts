import type {MetadataRoute} from "next";

const baseUrl = "https://www.sandrapavicdraskovic.com";
const routes = ["", "/sandra", "/savjetovanje", "/individualni-rad", "/predavanja", "/snimke-radionica", "/webshop", "/digitalni-alati", "/pojmovnik", "/znanje", "/preporucujem", "/mediji", "/kontakt", "/privatnost", "/kolacici", "/uvjeti-kupnje", "/prigovori-i-povrati", "/dokumenti", "/cjenici"];

export default function sitemap():MetadataRoute.Sitemap {
  return routes.map((route,index)=>({
    url:`${baseUrl}${route}`,
    lastModified:new Date("2026-09-24"),
    changeFrequency:index===0?"weekly":"monthly",
    priority:index===0?1:route==="/webshop"||route==="/savjetovanje"?0.9:0.7,
  }));
}
