import type {MetadataRoute} from "next";

export default function robots():MetadataRoute.Robots {
  return {
    rules:{userAgent:"*",allow:"/",disallow:["/priprema-konzultacije/","/api/client-documents/","/dokumenti/suglasnosti"]},
    sitemap:"https://www.sandrapavicdraskovic.com/sitemap.xml",
  };
}
