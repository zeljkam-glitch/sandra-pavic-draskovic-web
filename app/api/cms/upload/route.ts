import {randomUUID} from "node:crypto";
import {put} from "@vercel/blob";
import {NextResponse} from "next/server";
import {cmsIsAvailable,getCmsSession,sameOrigin} from "@/lib/cms/auth";

const mimeTypes:Record<string,string>={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"};
function validSignature(bytes:Uint8Array,type:string){if(type==="image/jpeg")return bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;if(type==="image/png")return bytes.slice(0,8).every((value,index)=>value===[137,80,78,71,13,10,26,10][index]);if(type==="image/webp")return new TextDecoder().decode(bytes.slice(0,4))==="RIFF"&&new TextDecoder().decode(bytes.slice(8,12))==="WEBP";return false;}
export async function POST(request:Request){
  if(!cmsIsAvailable())return NextResponse.json({error:"CMS nije dostupan."},{status:404});if(!sameOrigin(request))return NextResponse.json({error:"Origin"},{status:403});if(!await getCmsSession())return NextResponse.json({error:"Prijava je istekla."},{status:401});
  try{const form=await request.formData();const file=form.get("file");if(!(file instanceof File)||!mimeTypes[file.type]||file.size<100||file.size>5_000_000)return NextResponse.json({error:"Dopušteni su JPEG, PNG i WebP do 5 MB."},{status:400});const bytes=new Uint8Array(await file.arrayBuffer());if(!validSignature(bytes,file.type))return NextResponse.json({error:"Sadržaj datoteke ne odgovara vrsti slike."},{status:400});const name=`cms/media/${randomUUID()}.${mimeTypes[file.type]}`;await put(name,Buffer.from(bytes),{access:"private",addRandomSuffix:false,contentType:file.type,token:process.env.BLOB_READ_WRITE_TOKEN});return NextResponse.json({path:`/api/cms/media/${name.split("/").at(-1)}`});}
  catch{return NextResponse.json({error:"Slika nije spremljena."},{status:502});}
}
