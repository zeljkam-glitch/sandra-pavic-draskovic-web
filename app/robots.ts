import type {MetadataRoute} from "next";

export default function robots():MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
    return {rules:{userAgent:"*",disallow:"/"}};
  }
  return {
    rules:{userAgent:"*",allow:"/",disallow:["/priprema-konzultacije/","/api/","/dokumenti/suglasnosti","/tipografija"]},
    sitemap:"https://naturasanat.hr/sitemap.xml",
  };
}
