import {draftMode} from "next/headers";
import {NextResponse} from "next/server";
import {cmsIsAvailable,getCmsSession,sameOrigin} from "@/lib/cms/auth";

export async function POST(request:Request){if(!cmsIsAvailable())return NextResponse.json({error:"Not available"},{status:404});if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});if(!await getCmsSession())return NextResponse.json({error:"Unauthorized"},{status:401});(await draftMode()).enable();return NextResponse.json({success:true});}
export async function DELETE(request:Request){if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});(await draftMode()).disable();return NextResponse.json({success:true});}
