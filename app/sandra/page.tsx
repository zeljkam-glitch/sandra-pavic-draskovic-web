import Image from "next/image";
import type {Metadata} from "next";
import {ContentPage} from "../content-page";
import {getCmsContent} from "@/lib/cms/content";
export const metadata:Metadata={title:"Sandra Pavić Drašković",description:"Magistra farmacije, fitoaromaterapeutkinja i edukatorica iza obrta Natura Sanat.",alternates:{canonical:"/sandra"}};
export default async function Page(){const content=await getCmsContent();return <ContentPage eyebrow={content.sandraEyebrow} title={content.sandraTitle} intro={content.sandraIntro}>
<figure className="portrait-inline"><Image src={content.sandraPortrait} alt={content.sandraPortraitAlt} width={1358} height={1474} sizes="(max-width:900px) 100vw, 55vw"/></figure><h2>{content.sandraStoryTitle}</h2><p>{content.sandraStoryText}</p><p>{content.sandraStoryDisclaimer}</p>
<h2>Natura Sanat</h2><p>Obrt sam osnovala 2021. godine. Danas održavam individualna savjetovanja, predavanja i radionice te pripremam edukativne vodiče s receptima.</p><p>Rad nije ograničen na jednu dijagnozu. Podrška se prilagođava osobama koje žele djelovati preventivno, urediti prehranu i tjelesnu težinu, imati više energije, podržati sportske ciljeve, lakše proći menopauzu ili prehranu i navike uskladiti s trenutačnim zdravstvenim stanjem.</p><p>U radu me zanimaju navike koje osoba može održati: kako kupuje, priprema obroke, što već uzima i gdje zapinje. Smjernice trebaju biti razumljive i izvedive.</p>
<h2>Suradnje i edukacije</h2><p>U suradnji s udrugom Budi dobro i Institutom za gastroenterološke tumore sudjelujem u radionicama prehrane za onkološke bolesnike. Za organizacije pripremam predavanja prema potrebama publike.</p>
<h2>Granice mog rada</h2><p>Ne postavljam dijagnoze, ne propisujem liječenje i ne mijenjam terapiju. Kada pitanje prelazi opseg savjetovanja, važno je uključiti liječnika ili odgovarajućeg zdravstvenog stručnjaka.</p><a className="arrow-link" href="/savjetovanje">Kako izgleda savjetovanje →</a></ContentPage>}
