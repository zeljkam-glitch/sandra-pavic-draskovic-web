export type GlossaryTerm={slug:string;title:string;category:string;related:string[];articles:string[];booklets:string[];reviewed:string|null};
export const glossaryTerms:GlossaryTerm[]=[
{slug:"omega-3-masne-kiseline",title:"Omega-3 masne kiseline",category:"prehrana",related:["dodaci-prehrani"],articles:[],booklets:[],reviewed:null},
{slug:"dodaci-prehrani",title:"Dodaci prehrani",category:"dodaci prehrani",related:["omega-3-masne-kiseline"],articles:[],booklets:[],reviewed:null},
{slug:"fitoaromaterapija",title:"Fitoaromaterapija",category:"fitoaromaterapija",related:["biljni-pripravci"],articles:[],booklets:[],reviewed:null},
{slug:"biljni-pripravci",title:"Biljni pripravci",category:"biljke",related:["fitoaromaterapija"],articles:[],booklets:[],reviewed:null},
{slug:"san-i-oporavak",title:"San i oporavak",category:"san i oporavak",related:["stres"],articles:[],booklets:[],reviewed:null},
{slug:"stres",title:"Stres",category:"stres",related:["san-i-oporavak"],articles:[],booklets:[],reviewed:null},
{slug:"zdravstvena-pismenost",title:"Zdravstvena pismenost",category:"zdravstvena pismenost",related:[],articles:[],booklets:[],reviewed:null},
];
/* Svaki zapis zahtijeva TODO_MEDICAL_CONTENT_REVIEW prije objave definicije. */
