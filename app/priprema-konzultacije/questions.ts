export type Question = { id: string; label: string; type?: "text" | "email" | "tel" | "number" | "textarea"; help?: string; required?: boolean; min?: number; max?: number };
export const steps: { title: string; intro: string; fields: Question[] }[] = [
  {title:"Upoznajmo te",intro:"Počnimo osnovnim podacima. Odgovori ostaju u ovom otvorenom obrascu dok ga ispunjavaš.",fields:[
    {id:"name",label:"Ime i prezime",required:true}, {id:"email",label:"Email za kontakt",type:"email",required:true}, {id:"phone",label:"Broj mobitela",type:"tel"},
    {id:"weight",label:"Tjelesna težina (kg)",type:"number",min:1,max:500}, {id:"height",label:"Tjelesna visina (cm)",type:"number",min:30,max:250}, {id:"birthYear",label:"Godina rođenja",type:"number",min:1900,max:2026}, {id:"occupation",label:"Zanimanje"}]},
  {title:"Razlog dolaska i zdravlje",intro:"Opiši svojim riječima ono što je važno za dogovorenu konzultaciju. Ako nešto ne znaš ili ne želiš navesti u ovoj fazi, ostavi prazno.",fields:[
    {id:"reason",label:"Povijest bolesti i razlog javljanja",type:"textarea"}, {id:"symptoms",label:"Trenutačni simptomi i tegobe",type:"textarea"},
    {id:"pastConditions",label:"Ranije bolesti i alergije",type:"textarea",help:"Primjerice alergije, kožne promjene, respiratorne ili urinarne infekcije, žučni ili bubrežni kamenci."},
    {id:"cysts",label:"Ciste ili polipi, ako ih imaš",type:"textarea"},
    {id:"covidVaccine",label:"Cijepljenje protiv COVID-a: cjepivo i okvirni datum",help:"Odgovori samo ako je podatak relevantan za dogovorenu konzultaciju."},
    {id:"covid",label:"Preboljeni COVID i okvirni datum"}]},
  {title:"Svakodnevne navike",intro:"San, stres, kretanje i probava dio su svakodnevnog konteksta.",fields:[
    {id:"stress",label:"Procjena stresa od 1 do 10",type:"number",min:1,max:10}, {id:"sleep",label:"Imaš li poteškoće sa spavanjem?",type:"textarea"},
    {id:"exercise",label:"Tjelovježba: vrsta, učestalost i trajanje",type:"textarea"}, {id:"sweating",label:"Znojenje: koliko i kada?",type:"textarea"},
    {id:"stools",label:"Učestalost stolice dnevno ili tjedno"}]},
  {title:"Dodatni zdravstveni kontekst",intro:"Odgovori samo na pitanja koja su relevantna za dogovorenu konzultaciju. Nemoj navoditi imena članova obitelji.",fields:[
    {id:"family",label:"Relevantna obiteljska povijest bolesti",type:"textarea",help:"Općenito, za roditelje i bake/djedove; bez njihovih identifikacijskih podataka."},
    {id:"pregnancy",label:"Trudnoće i glukoza u trudnoći, ako je primjenjivo",type:"textarea"},
    {id:"fillings",label:"Amalgamske plombe: broj i okvirno vrijeme uklanjanja",type:"textarea",help:"Odgovori samo ako je podatak relevantan za dogovorenu konzultaciju."}]},
  {title:"Postojeća mjerenja i nalazi",intro:"Upiši samo podatke koje već imaš. Ovaj obrazac ne traži nova mjerenja, kućne testove ili laboratorijske pretrage.",fields:[
    {id:"pressure",label:"Postojeća mjerenja krvnog tlaka",type:"textarea",help:"Ako postoje, dodaj datum, vrijeme i ruku na kojoj je mjereno. Izvornik predviđa tri dana; unos nije obvezan."},
    {id:"pulse",label:"Postojeća mjerenja pulsa"},
    {id:"availableResults",label:"Koje postojeće nalaze imaš na raspolaganju?",type:"textarea",help:"Samo navedi vrste nalaza. Dostava dokumenata dogovara se zasebno; ovdje nema učitavanja priloga."}]},
  {title:"Prehrana kroz tri dana",intro:"Zapiši tri uobičajena dana. Nije potrebno mijenjati prehranu radi ispunjavanja.",fields:[
    ...[1,2,3].map(day=>({id:`food${day}`,label:`Dan ${day}: obroci i međuobroci`,type:"textarea" as const,help:"Doručak, ručak, večera i međuobroci. Dodaj približne količine ako ih znaš."})),
    {id:"drinks",label:"Što piješ i koliko dnevno?",type:"textarea",help:"Voda, kava, čaj, sokovi i ostala pića."}]},
  {title:"Lijekovi i dodaci",intro:"Prepiši ono što već uzimaš. Obrazac ne daje preporuke za promjenu terapije.",fields:[
    {id:"medications",label:"Trenutačni lijekovi",type:"textarea",help:"Naziv, doza i koliko puta dnevno uzimaš."},
    {id:"supplements",label:"Vitamini, minerali i drugi dodaci",type:"textarea",help:"Naziv, doza i koliko puta dnevno uzimaš."},
    {id:"notes",label:"Želiš li dodati još nešto za razgovor?",type:"textarea"}]}
];
