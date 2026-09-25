import { ContentPage } from "../content-page";
import { MealPlanner } from "./meal-planner";
export default function Page() { return <ContentPage eyebrow="Digitalni alati" title="Manje improvizacije kroz tjedan." intro="Besplatni tjedni planer obroka. Zapiši vlastite ideje i popis za kupnju, pa spremi plan za sebe. Bez prijave."><MealPlanner/><p className="fine">Ovo je prazan organizacijski planer, bez prehrambenih preporuka. Unos ostaje u ovoj otvorenoj stranici i ne šalje se Sandri; spremi ga prije zatvaranja.</p></ContentPage>; }
