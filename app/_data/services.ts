export type Service = {
  slug:string;
  title:string;
  eyebrow:string;
  duration:string;
  price:string;
  lead:string;
  description:string[];
  includes:string[];
  guide?:string;
  payment:string;
  featured?:boolean;
};

export type ControlService = {
  slug:string;
  title:string;
  duration:string;
  price:string;
  description:string;
  includes:string;
  payment:string;
};

export const services:Service[]=[
  {slug:"individualni-plan-prehrane",title:"Individualni plan prehrane",eyebrow:"Prehrana prema vašoj svakodnevici",duration:"2 × 90 min",price:"400 €",lead:"Praktičan i individualno prilagođen plan prehrane koji polazi od vaših potreba, navika, ciljeva i trenutačnog zdravstvenog stanja.",description:["Kroz dva povezana savjetovanja prolazimo principe prehrane, izbor i kombiniranje namirnica te konkretne smjernice koje možete dugoročno primjenjivati.","Plan ne počinje zabranama ni univerzalnim jelovnikom. Nastaje iz razgovora, vašeg ritma života i onoga što je za vas stvarno izvedivo."],includes:["dva individualna savjetovanja po 90 minuta","pripremu i pregled dogovorenih informacija","individualni pisani plan i protokol prehrane"],payment:"Plaćanje u cijelosti ili 2 × 200 €, prije svakog termina."},
  {slug:"fitoaromaterapija-i-suplementacija",title:"Fitoaromaterapija i suplementacija",eyebrow:"Ciljano i promišljeno",duration:"60 min",price:"150 €",lead:"Individualne smjernice za promišljenu primjenu vitamina, minerala, dodataka prehrani i fitoaromaterapijskih pripravaka.",description:["Kada je relevantno, u obzir se uzimaju laboratorijski nalazi, postojeća terapija i dodaci koje već koristite.","Savjetovanje je edukativno i ne uključuje postavljanje dijagnoze, propisivanje terapije niti promjenu liječničkih preporuka."],includes:["pregled popisa lijekova, dodataka i biljnih pripravaka","čitanje sastava, doziranja i upozorenja","pisani sažetak preporuka i pitanja za zdravstveni tim"],payment:"Iznos od 150 € plaća se u cijelosti prije potvrde termina."},
  {slug:"podrska-tijelu-i-redukcija-stresa",title:"Podrška tijelu i redukcija stresa",eyebrow:"Navike za opuštanje i svakodnevnu brigu",duration:"90 min",price:"200 €",lead:"Individualne smjernice i praktične tehnike za uvođenje navika usmjerenih opuštanju, upravljanju stresom i svakodnevnoj brizi o tijelu.",description:["Razgovor je usmjeren na izvedive rutine odmora, sna, kretanja, disanja i vođene pažnje u skladu s vašim mogućnostima.","Usluga nije psihoterapija ni medicinsko liječenje. Kada je potrebna druga vrsta podrške, preporučuje se odgovarajući stručnjak."],includes:["jedno individualno savjetovanje od 90 minuta","praktične tehnike i prijedlog osobne rutine","pisane smjernice za samostalnu primjenu"],payment:"Iznos od 200 € plaća se u cijelosti prije potvrde termina."},
  {slug:"sirova-prehrana",title:"Sirova prehrana",eyebrow:"Postupan i nutritivno promišljen pristup",duration:"2 × 90 min",price:"400 €",lead:"Za osobe koje žele prijeći na sirovu prehranu ili je kvalitetnije uključiti u postojeći način prehrane.",description:["Zajedno procjenjujemo sadašnji jelovnik, ciljeve, sigurnost hrane i načine postizanja veće nutritivne raznolikosti.","Cilj je oblikovati cjelovit i realan pristup bez tvrdnje da je jedna vrsta prehrane najbolja za sve."],includes:["dva individualna savjetovanja po 90 minuta","plan postupnog uvođenja promjena","individualne pisane smjernice","vodič Snaga svježine uključen u cijenu"],guide:"Na dar dobivate vodič Snaga svježine s 27 biljnih i bezglutenskih recepata, vrijednosti 39 €.",payment:"Plaćanje u cijelosti ili 2 × 200 €, prije svakog termina."},
  {slug:"detox-tijela",title:"Detox tijela",eyebrow:"Tri povezana koraka",duration:"3 × 90 min",price:"600 €",lead:"Postupan individualni program koji povezuje prehrambene promjene, unos tekućine i svakodnevne zdrave navike.",description:["Program je edukativan. Naziv detox opisuje strukturirano pojednostavljivanje prehrane i navika, a ne medicinsko uklanjanje toksina ili liječenje bolesti.","Tri susreta omogućuju da promjene uvedemo postupno, pratimo kako ih primjenjujete i prilagodimo smjernice vašoj svakodnevici."],includes:["tri individualna savjetovanja po 90 minuta","pripremu i praćenje između susreta","individualne pisane smjernice","vodič Snaga svježine uključen u cijenu"],guide:"Na dar dobivate vodič Snaga svježine s 27 biljnih i bezglutenskih recepata, vrijednosti 39 €.",payment:"Plaćanje u cijelosti ili 3 × 200 €, prije svakog termina."},
  {slug:"put-zdravlja",title:"Put zdravlja",eyebrow:"Najcjelovitiji individualni program",duration:"4 × 90 min + 1 × 60 min",price:"950 €",lead:"Cjeloviti program za osobe koje žele povezati prehranu, suplementaciju, životne navike i podršku tijelu u jedan dosljedan, individualno prilagođen proces.",description:["Svaki od pet susreta nadovezuje se na prethodni. Zato program nije samo zbroj termina, nego kontinuitet pripreme, praćenja, prilagodbe i primjene između susreta.","Cijena uključuje vrijeme savjetovanja, stručnu pripremu, pregled dogovorenih informacija, individualne pisane smjernice i cijelu Natura Sanat kolekciju vodiča za lakšu primjenu naučenog."],includes:["četiri individualna savjetovanja po 90 minuta i završno savjetovanje od 60 minuta","pripremu i praćenje kroz cijeli proces","povezivanje prehrane, dodataka, navika i redukcije stresa","individualne pisane smjernice","sva tri Natura Sanat vodiča s ukupno 102 recepta"],guide:"Na dar dobivate cijelu Natura Sanat kolekciju: tri vodiča, 102 biljna i bezglutenska recepta, vrijednosti 122 €.",payment:"Plaćanje u cijelosti ili 5 × 190 €, prije svakog termina.",featured:true},
];

export const controlServices:ControlService[]=[
  {slug:"kontrolna-konzultacija",title:"Kontrolna konzultacija",duration:"do 45 min",price:"100 €",description:"Za provjeru napretka, dodatna pitanja, nove nalaze i manju prilagodbu ranije dogovorenih smjernica.",includes:"Nastavljamo na već obrađenoj temi bez izrade novog pisanog protokola.",payment:"Iznos od 100 € plaća se u cijelosti prije potvrde termina."},
  {slug:"prosirena-konzultacija",title:"Proširena individualna konzultacija + novi pisani protokol",duration:"do 90 min",price:"200 €",description:"Za širu ponovnu procjenu, nove nalaze, promijenjene potrebe ili novo područje unutar postojećeg rada.",includes:"Uključuje novi individualni pisani protokol i smjernice nakon konzultacije.",payment:"Iznos od 200 € plaća se u cijelosti prije potvrde termina."},
];

export const controlCondition="Ako se otvara potpuno novo područje, potrebna je nova uvodna procjena ili je od zadnjeg rada prošlo više od godinu dana, prvi korak ponovno je uvodno savjetovanje.";
