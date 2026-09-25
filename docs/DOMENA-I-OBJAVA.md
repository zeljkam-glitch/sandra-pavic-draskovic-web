# Domena i objava

## Trenutačno stanje

- Vercel projekt: `sandra-pavic-draskovic-web`
- Domena `naturasanat.hr` i poddomena `www.naturasanat.hr` dodane su projektu i vlasništvo je potvrđeno.
- DNS još koristi MyDataKnox nameservere: `ns1.mydataknox.com` i `ns2.mydataknox.com`.
- Stari A zapis vodi na `185.62.75.97`, a postojeći web vraća HTTP 503.
- Nova verzija nije preuzela javni promet. Objavljena je samo kao Vercel preview.

## Preporučena DNS promjena u MyDataKnoxu

Ne mijenjati nameservere, MX ni postojeće TXT zapise za e-mail. Promijeniti samo web zapise:

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
- postaviti jednu verziju kao primarnu, a drugu preusmjeriti
- provjeriti da e-mail i dalje radi
- tek nakon sadržajne i pravne potvrde ukloniti zabranu indeksiranja
