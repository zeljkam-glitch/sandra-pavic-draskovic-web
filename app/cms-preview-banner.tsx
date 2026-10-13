import Link from "next/link";
import {draftMode} from "next/headers";
import {cmsIsAvailable,getCmsSession} from "@/lib/cms/auth";

export async function CmsPreviewBanner(){if(!cmsIsAvailable())return null;const draft=await draftMode();if(!draft.isEnabled||!await getCmsSession())return null;return <aside className="cms-preview-banner" role="status"><span>Pregledavate neobjavljeni CMS nacrt.</span><Link href="/uredjivanje">Natrag na uređivanje</Link></aside>}
