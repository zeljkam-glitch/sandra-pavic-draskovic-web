import type {Metadata} from "next";
import {LegalPage} from "../legal-page";

export const metadata:Metadata={title:"Prigovori, otkazivanje i digitalni sadržaj",description:"Informacije o pisanom prigovoru, otkazivanju termina i budućoj isporuci digitalnog sadržaja Natura Sanat.",alternates:{canonical:"/prigovori-i-povrati"}};

export default function Page(){return <LegalPage title="Prigovori, otkazivanje i digitalni sadržaj" intro="Ovdje su odvojene upute za prigovor na uslugu, promjenu termina i buduće digitalne kupnje. Web trenutačno ne provodi online naplatu.">
<section><h2>Pisani prigovor</h2><p>Prigovor možeš poslati putem <a href="/kontakt">kontaktnog obrasca</a> ili poštom na: Natura Sanat, Zelenjak 38, 10000 Zagreb. Navedi ime, kontakt, uslugu ili narudžbu na koju se prigovor odnosi i jasan opis problema. Nemoj slati nepotrebne zdravstvene podatke.</p><p>Primitak i odgovor evidentiraju se u skladu s primjenjivim propisima. Slanje prigovora ne umanjuje druga prava potrošača.</p></section>
<section><h2>Promjena ili otkazivanje termina</h2><p>Točni rokovi i eventualne naknade moraju biti navedeni u ponudi prije prihvata usluge. Ako ponuda još nije prihvaćena, poslani upit nije rezervacija. Ako je termin potvrđen, javi se čim prije kako bi Sandra mogla potvrditi dostupne mogućnosti.</p></section>
<section><h2>Usluga ugovorena na daljinu</h2><p>Prije ugovaranja korisnik mora dobiti informacije o cijeni, pružatelju, opsegu, trajanju, načinu izvršenja i primjenjivom pravu na jednostrani raskid. Za početak pružanja usluge prije isteka primjenjivog roka traži se zaseban izričit zahtjev kada ga zakon zahtijeva.</p></section>
<section><h2>Digitalni vodiči i snimke</h2><p>Prije buduće naplate bit će jasno navedeni format, način i rok dostave, tehnički uvjeti, cijena te pravila za neusklađen ili nedostupan sadržaj. Ako kupac traži trenutačnu isporuku digitalnog sadržaja, potrebne potvrde prikazat će se odvojeno i neće biti unaprijed označene.</p><p>Arhivske snimke radionica trenutačno nisu u prodaji, pa se za njih ne sklapa ugovor niti provodi povrat.</p></section>
<section><h2>Radna pravna verzija</h2><p className="notice">Ova stranica je radna informativna struktura. Prije aktivacije naplate treba uskladiti konačne uvjete, obrazac za jednostrani raskid, evidenciju prigovora i tekstove potvrda s pravnim stručnjakom.</p></section>
</LegalPage>}
