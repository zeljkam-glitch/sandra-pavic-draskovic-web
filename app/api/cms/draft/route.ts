import {NextResponse} from "next/server";
import {cmsIsAvailable,getCmsSession,sameOrigin} from "@/lib/cms/auth";
import {saveDraft} from "@/lib/cms/storage";

export async function PUT(request:Request){
  if(!cmsIsAvailable())return NextResponse.json({error:"CMS nije dostupan."},{status:404});
  if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});
  const session=await getCmsSession();if(!session)return NextResponse.json({error:"Prijava je istekla."},{status:401});
  try{const raw=await request.text();if(raw.length>50000)return NextResponse.json({error:"Sadržaj je prevelik."},{status:413});const data=JSON.parse(raw);const snapshot=await saveDraft(data.content,session.email);return NextResponse.json({success:true,updatedAt:snapshot.updatedAt});}
  catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Nacrt nije spremljen."},{status:400});}
}
