import {NextResponse} from "next/server";
import {CMS_SESSION_COOKIE, CMS_SESSION_MAX_AGE, cmsIsAvailable, createCmsSessionToken, sameOrigin, verifyCmsPassword} from "@/lib/cms/auth";
import {checkRateLimit} from "@/lib/rate-limit";

export async function POST(request:Request){
  if(!cmsIsAvailable())return NextResponse.json({error:"Not available"},{status:404});
  if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});
  try{const rate=await checkRateLimit(request,"cms-login",8,15*60);if(!rate.allowed)return NextResponse.json({error:"Rate limit"},{status:429});}catch{return NextResponse.json({error:"Security service unavailable"},{status:503});}
  let data:{email?:unknown;password?:unknown};
  try{const raw=await request.text();if(raw.length>1000)throw new Error();data=JSON.parse(raw);}catch{return NextResponse.json({error:"Invalid request"},{status:400});}
  const email=typeof data.email==="string"?data.email.trim().toLowerCase():"";
  const password=typeof data.password==="string"?data.password:"";
  const expectedEmail=process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase();
  if(!expectedEmail||email!==expectedEmail||!verifyCmsPassword(password))return NextResponse.json({error:"Unauthorized"},{status:401});
  const response=NextResponse.json({success:true});
  response.cookies.set(CMS_SESSION_COOKIE,createCmsSessionToken(email),{httpOnly:true,secure:true,sameSite:"strict",path:"/",maxAge:CMS_SESSION_MAX_AGE,priority:"high"});
  return response;
}

export async function DELETE(request:Request){
  if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});
  const response=NextResponse.json({success:true});response.cookies.set(CMS_SESSION_COOKIE,"",{httpOnly:true,secure:true,sameSite:"strict",path:"/",maxAge:0});return response;
}
