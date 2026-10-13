# Domena i objava

## Trenutačno stanje

- Vercel projekt: `sandra-pavic-draskovic-web`
- Sve četiri adrese (`naturasanat.hr`, `www.naturasanat.hr`, `sandrapavicdraskovic.com` i `www.sandrapavicdraskovic.com`) verificirane su i pridružene Vercel projektu.
- Vercel 13. listopada 2026. ne prikazuje postavljeno preusmjeravanje ni za jednu od četiri projektne domene. Tvrdnja da se `.com` varijante već trajno preusmjeravaju zato nije potvrđena.
- DNS još koristi MyDataKnox nameservere: `ns1.mydataknox.com` i `ns2.mydataknox.com`.
- Produkcijski deployment grane `main` i preview sigurnosne grane su spremni, ali Vercel SSO zaštita i dalje vrijedi za sve deploymente. Zaštitu ne uklanjati prije Sandrina odobrenja.

## Domene i DNS

Za `naturasanat.hr` prvo treba dobiti podatke o registraru i postojećim DNS zapisima. Ne mijenjati MX ni postojeće TXT zapise za e-mail. Nakon povezivanja obje domene s Vercel projektom postaviti `naturasanat.hr` kao primarnu domenu.

Za `sandrapavicdraskovic.com` promijeniti samo web zapise:

1. Ukloniti stari `A` zapis za `@` koji vodi na `185.62.75.97`.
2. Dodati dva `A` zapisa za `@`:
   - `216.198.79.1`
   - `64.29.17.1`
3. Promijeniti `www` u `CNAME`:
   - `8c98d1fd65a6fb03.vercel-dns-017.com`

Vercel kao alternativu prihvaća generički A zapis `76.76.21.21` i CNAME `cname.vercel-dns.com`, ali gore navedeni projektni zapisi trenutačno su njihov prvi preporučeni izbor.

## Nakon promjene

- pričekati DNS propagaciju
- ponovno pokrenuti Vercel provjeru obje domene
- provjeriti HTTPS certifikat za vršnu i `www` domenu
- postaviti `naturasanat.hr` kao primarnu domenu, a ostale tri varijante trajno preusmjeriti na nju uz očuvanje putanje; to je promjena javnog usmjeravanja i provodi se tek uz konačno odobrenje
- provjeriti da e-mail i dalje radi
- tek nakon sadržajne i pravne potvrde ukloniti zabranu indeksiranja
