import type {Metadata} from "next";
import {cmsIsAvailable, getCmsSession} from "@/lib/cms/auth";
import {CMS_FIELDS} from "@/lib/cms/schema";
import {initialDraft} from "@/lib/cms/storage";
import {CmsEditor} from "./cms-editor";
import {CmsLogin} from "./cms-login";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {title:"Uređivanje sadržaja", robots:{index:false, follow:false}};

export default async function Page() {
  if (!cmsIsAvailable()) return <main className="cms-shell"><section className="cms-card"><p className="kicker">Natura Sanat CMS</p><h1>Uređivanje nije aktivno.</h1><p>CMS je dostupan samo u zaštićenom preview okruženju i nakon postavljanja sigurnih pristupnih podataka.</p></section></main>;
  const session = await getCmsSession();
  if (!session) return <main className="cms-shell"><CmsLogin/></main>;
  const draft = await initialDraft();
  const configured = {
    storage:Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    rateLimit:Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  };
  return <main className="cms-shell"><CmsEditor fields={CMS_FIELDS} initial={draft} email={session.email} canPublish={process.env.CMS_ALLOW_PUBLISH === "true"} configured={configured}/></main>;
}
