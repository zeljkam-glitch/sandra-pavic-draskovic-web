# Završna evidencija · 13. listopada 2026.

## Implementirano i provjerljivo bez stvarnih transakcija

- siguran CMS za ključne tekstove i slike, s nacrtom, privatnim previewom i zaključanom objavom
- autentikacija urednice, vremenski ograničena HttpOnly sesija, CSRF/origin provjera i ograničenje pokušaja prijave
- privatna Blob pohrana CMS sadržaja i slika
- dodatno ograničenje učestalosti za kontakt, newsletter i pokretanje checkouta
- postojeći Stripe webhook nastavlja provjeravati potpis, plaćeni status, valutu, cijenu, privolu i duplikate
- automatska dostava ostaje potpisana, vremenski ograničena i ograničena na tri preuzimanja po izdanju
- newsletter ostaje dvostruko potvrđen; kontakt i newsletter ne dijele privolu

## Namjerno nije aktivirano

- CMS objava (`CMS_ALLOW_PUBLISH=false`)
- javno uklanjanje Vercel zaštite
- stvarna Stripe naplata ili slanje poruka
- zdravstveni upitnik (`CLIENT_DOCUMENTS_SUBMISSION_ENABLED=false`)

## Potrebni pristupi, ključevi ili potvrde

- Upstash Redis URL i token: CMS zaštita prijave, obrasci, privole, narudžbe i ograničenje preuzimanja
- CMS email, hash lozinke i sesijska tajna za Preview
- Stripe testni ključ, webhook tajna i četiri testna Price identifikatora s točnim EUR iznosima
- konačne PDF datoteke u privatnom Blob spremištu
- Resend API ključ, verificirane domene pošiljatelja, newsletter segment i adrese pošiljatelja/odgovora
- sadržajno i pravno odobrenje cijena, uvjeta digitalne isporuke, odricanja od 14-dnevnog prava te poreznog/fiskalnog postupka
- Sandrino izričito odobrenje prije javne objave ili uklanjanja zaštite

## Domene i Vercel

- `naturasanat.hr`, `www.naturasanat.hr`, `sandrapavicdraskovic.com` i `www.sandrapavicdraskovic.com` verificirane su i pridružene projektu
- Vercel SSO zaštita ostaje uključena za sve deploymente
- projektna konfiguracija trenutačno nema trajna preusmjeravanja; nakon odobrenja treba zadržati `naturasanat.hr` kao kanonsku adresu, a druge tri varijante preusmjeriti uz očuvanje putanje
