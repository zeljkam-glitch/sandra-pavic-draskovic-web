import {NextResponse} from "next/server";

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value:unknown,limit:number){return typeof value==="string"?value.trim().slice(0,limit):"";}
function escapeHtml(value:string){return value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]!);}

export async function POST(request:Request){
  if(request.headers.get("origin")!==new URL(request.url).origin)return NextResponse.json({error:"Origin"},{status:403});
  if(!request.headers.get("content-type")?.includes("application/json"))return NextResponse.json({error:"Content type"},{status:415});
  let data:Record<string,unknown>;
  try{
    const text=await request.text();
    if(text.length>2000)return NextResponse.json({error:"Too large"},{status:413});
    const parsed=JSON.parse(text);
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))throw new Error();
    data=parsed;
  }catch{return NextResponse.json({error:"Invalid request"},{status:400});}
  if(data.website)return NextResponse.json({success:true});
  const name=clean(data.name,100);
  const email=clean(data.email,254).toLowerCase();
  if(!emailPattern.test(email)||data.consent!==true)return NextResponse.json({error:"Missing consent"},{status:400});

  const endpoint=process.env.NEWSLETTER_WEBHOOK_URL;
  const resendKey=process.env.RESEND_API_KEY;
  const from=process.env.CONTACT_FROM;
  const recipient=process.env.CONTACT_RECIPIENT;
  if(!endpoint&&!(resendKey&&from&&recipient&&emailPattern.test(recipient)))return NextResponse.json({error:"Delivery unavailable"},{status:503});

  try{
    let response:Response;
    if(endpoint){
      if(new URL(endpoint).protocol!=="https:")throw new Error();
      response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json",...(process.env.NEWSLETTER_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify({name,email,consent:true,source:"naturasanat.hr",subscribedAt:new Date().toISOString()}),signal:AbortSignal.timeout(10000),redirect:"error"});
    }else{
      response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${resendKey}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[recipient],reply_to:email,subject:"Nova prijava na Natura Sanat newsletter",html:`<h1>Nova prijava na newsletter</h1><p><strong>Ime:</strong> ${escapeHtml(name||"Nije navedeno")}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Privola:</strong> potvrđena<br><strong>Vrijeme:</strong> ${escapeHtml(new Date().toISOString())}</p>`}),signal:AbortSignal.timeout(10000)});
    }
    if(!response.ok)throw new Error();
    return NextResponse.json({success:true});
  }catch{return NextResponse.json({error:"Delivery failed"},{status:502});}
}
