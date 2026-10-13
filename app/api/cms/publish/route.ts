import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {cmsIsAvailable,getCmsSession,sameOrigin} from "@/lib/cms/auth";
import {publishDraft} from "@/lib/cms/storage";

export async function POST(request:Request){
  if(!cmsIsAvailable()||process.env.CMS_ALLOW_PUBLISH!=="true")return NextResponse.json({error:"Objava je zaključana do odobrenja."},{status:403});
  if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});
  const session=await getCmsSession();if(!session)return NextResponse.json({error:"Prijava je istekla."},{status:401});
  try{const snapshot=await publishDraft(session.email);for(const path of ["/","/sandra","/kontakt","/webshop"])revalidatePath(path);return NextResponse.json({success:true,updatedAt:snapshot.updatedAt});}
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Objava nije uspjela."},{status:400});}
}
