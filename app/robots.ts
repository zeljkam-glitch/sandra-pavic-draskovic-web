import type {MetadataRoute} from "next";

export default function robots():MetadataRoute.Robots {
  return {
    rules:{userAgent:"*",allow:"/",disallow:["/priprema-konzultacije/","/api/","/dokumenti/suglasnosti","/tipografija"]},
    sitemap:"https://naturasanat.hr/sitemap.xml",
  };
}
