# Natura Sanat webshop — tehnička priprema

## Trenutačno stanje

Webshop je pripremljen u kodu, ali nije objavljen niti je uključena stvarna naplata. Privatni Vercel Blob povezan je s projektom, dok Upstash Redis i Stripe varijable nisu potvrđeni kao postavljeni.

Pripremljeno je:

- obvezna potvrda četiri uvjeta prije odlaska na plaćanje
- zapis potvrda s vremenom i verzijom teksta
- provjera autentičnosti Stripe webhooka, plaćenog iznosa i odabranog proizvoda
- zaštita od dvostruke isporuke istog Stripe događaja
- automatska poruka kupcu putem Resenda
- privatne poveznice koje vrijede 48 sati i dopuštaju najviše tri preuzimanja
- zasebne stranice uspješne i otkazane kupnje
- ručna obavijest prodavatelju ako je uplata stigla mimo web potvrda

Jedinični testovi pokrivaju potpis i istek tokena, provjeru Stripe Price identifikatora te stabilan ključ koji sprječava dvostruko slanje iste dostavne poruke pri ponovljenom webhooku. Nisu provedeni stvarna ni testna Stripe naplata, stvarni webhook, slanje kroz Resend, dohvat iz privatnog Bloba ni Redis ograničenje preuzimanja. Zbog toga se integracija ne smije opisivati kao operativna.

## Konačne datoteke

Izvorne datoteke nalaze se samo u lokalnoj, ignoriranoj mapi `private-ebooks-source/` i ne ulaze u Git niti u javnu mapu weba.

| Izdanje | Datoteka | Stranice | SHA-256 |
| --- | --- | ---: | --- |
| Hrana za buđenje životne energije i vitalnosti | `hrana-zivotna-energija-vitalnost.pdf` | 73 | `d6d6bd2ef2cbf9c8bf96b200772302bc19972ae03fa9401a266353c3729f585b` |
| Snaga svježine | `snaga-svjezine.pdf` | 49 | `10ed315ce1b1661e3c34d6cdab077b16987515dfa245d1f95e688c0527e68f12` |
| Biljna inspiracija za blagdanski stol | `biljna-inspiracija-blagdanski-stol.pdf` | 33 | `905af9d0ed2f6ddaf2743e8fd13dfea9b64b2ae6e1d842ade9e60d68665d80b4` |

## Stripe testni proizvodi i cijene

Za svaki proizvod treba izraditi jednokratnu Stripe cijenu u EUR i u Preview postaviti njezin `price_...` identifikator. Web zatim na poslužitelju otvara novu Checkout Session, veže je uz zapis četiri potvrde i tek tada vraća Stripe URL pregledniku. Time se ne oslanja na promjenjive parametre dijeljene Payment Link poveznice.

Testni ključ i testni Price identifikatori smiju se postaviti samo u Vercel Preview okruženje. Produkcija ostaje bez Stripe varijabli i zato prikazuje „Kupnja uskoro”.

## Završno uključivanje

1. Sandra dovršava Stripe identitet, poslovne/porezne podatke, bankovni račun i dvofaktorsku zaštitu.
2. Potvrđuju se naziv prodavatelja, adresa, OIB/PDV status, tekst računa i računovodstveni tretman digitalnih proizvoda.
3. Uz izričito odobrenje otvaraju se privatni Vercel Blob i Upstash Redis te se provjerava cijena/limit potrošnje.
4. U privatni Blob prenose se tri konačna PDF-a naredbom `pnpm ebooks:upload` u okruženju s postavljenim Vercel varijablama.
5. U Vercelu se postavljaju tajne iz `.env.example`. Stripe testna tajna i testni Price identifikatori idu samo u Preview; žive vrijednosti tek nakon završnog testa i odobrenja.
6. U Stripeu se postavlja webhook `https://naturasanat.hr/api/stripe/webhook` za događaje `checkout.session.completed` i `checkout.session.async_payment_succeeded`.
7. Checkout Session po završetku kupnje vodi na `https://naturasanat.hr/kupnja/uspjesna`; povratak kod odustajanja vodi na `https://naturasanat.hr/kupnja/otkazana`.
8. U Resendu se potvrđuje domena pošiljatelja i testiraju dostava, odgovor kupca i obavijest prodavatelju.
9. Radi se cijeli test za sva četiri proizvoda: potvrde, testna uplata, jedna e-poruka, ispravne knjige, isteka 48 sati i blokada četvrtog preuzimanja.
10. Tek nakon provjere izrađuju se živi Stripe proizvodi i cijene, uključuju produkcijske varijable i objavljuje webshop.
11. Odmah nakon uspješnog puštanja mijenja se pristup Drive mapi sa „svatko s poveznicom može uređivati” na samo pregled ili privatno.

## Varijable koje treba postaviti

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_BILJNA_PREHRANA`, `STRIPE_PRICE_SVJEZA_PREHRANA`, `STRIPE_PRICE_BLAGDANSKI_RECEPTI`, `STRIPE_PRICE_KOLEKCIJA`
- `BLOB_STORE_ID`, `BLOB_READ_WRITE_TOKEN`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `DOWNLOAD_TOKEN_SECRET` — duga, nasumična tajna
- `ORDER_RETENTION_SECONDS` — razdoblje čuvanja evidencije dogovoreno s računovođom/pravnikom
- `RESEND_API_KEY`, `FULFILLMENT_FROM`, `FULFILLMENT_REPLY_TO`, `FULFILLMENT_NOTIFY_TO`
- `NEXT_PUBLIC_SITE_URL=https://naturasanat.hr`

## Prije objave obvezno potvrditi

- pravni tekst uvjeta kupnje, privatnosti, gubitka prava na raskid i zdravstvenog odricanja
- treba li Stripe automatski račun ili samo potvrda uplate te numeraciju/fiskalizaciju računa
- službene podatke prodavatelja i adresu za prigovore
- konačnu adresu pošiljatelja i primatelja obavijesti
- dopušteno razdoblje čuvanja minimalne evidencije narudžbe i potvrda

Konačne PDF-ove ne treba slati kao privitke. Kupac dobiva potpisane poveznice, a Stripe ostaje glavni izvor podataka o uplati i adresi e-pošte kupca.
