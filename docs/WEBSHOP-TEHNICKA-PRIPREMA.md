# Natura Sanat webshop — tehnička priprema

## Trenutačno stanje

Webshop je pripremljen u kodu, ali nije objavljen niti je uključena stvarna naplata. Stripe poveznice u nastavku su isključivo testne. Privatni Vercel Blob i Upstash Redis nisu otvoreni kako ne bi nastao novi trošak bez odobrenja.

Pripremljeno je:

- obvezna potvrda četiri uvjeta prije odlaska na plaćanje
- zapis potvrda s vremenom i verzijom teksta
- provjera autentičnosti Stripe webhooka, plaćenog iznosa i odabranog proizvoda
- zaštita od dvostruke isporuke istog Stripe događaja
- automatska poruka kupcu putem Resenda
- privatne poveznice koje vrijede 48 sati i dopuštaju najviše tri preuzimanja
- zasebne stranice uspješne i otkazane kupnje
- ručna obavijest prodavatelju ako je uplata stigla mimo web potvrda

## Konačne datoteke

Izvorne datoteke nalaze se samo u lokalnoj, ignoriranoj mapi `private-ebooks-source/` i ne ulaze u Git niti u javnu mapu weba.

| Izdanje | Datoteka | Stranice | SHA-256 |
| --- | --- | ---: | --- |
| Hrana za buđenje životne energije i vitalnosti | `hrana-zivotna-energija-vitalnost.pdf` | 73 | `d6d6bd2ef2cbf9c8bf96b200772302bc19972ae03fa9401a266353c3729f585b` |
| Snaga svježine | `snaga-svjezine.pdf` | 49 | `10ed315ce1b1661e3c34d6cdab077b16987515dfa245d1f95e688c0527e68f12` |
| Biljna inspiracija za blagdanski stol | `biljna-inspiracija-blagdanski-stol.pdf` | 33 | `905af9d0ed2f6ddaf2743e8fd13dfea9b64b2ae6e1d842ade9e60d68665d80b4` |

## Stripe testne poveznice

- kolekcija: `https://buy.stripe.com/test_dRm4gAf2Bddjc8M7vQ5EY00`
- Snaga svježine: `https://buy.stripe.com/test_9B6fZi5s14GN0q417s5EY01`
- Hrana za buđenje životne energije i vitalnosti: `https://buy.stripe.com/test_4gMeVe1bLb5bfkY03o5EY02`
- Biljna inspiracija za blagdanski stol: `https://buy.stripe.com/test_bJedRag6Fflr3Cg17s5EY03`

Testne poveznice smiju se postaviti samo u Vercel Preview okruženje. Produkcija ostaje bez checkout varijabli i zato prikazuje „Kupnja uskoro”.

## Završno uključivanje

1. Sandra dovršava Stripe identitet, poslovne/porezne podatke, bankovni račun i dvofaktorsku zaštitu.
2. Potvrđuju se naziv prodavatelja, adresa, OIB/PDV status, tekst računa i računovodstveni tretman digitalnih proizvoda.
3. Uz izričito odobrenje otvaraju se privatni Vercel Blob i Upstash Redis te se provjerava cijena/limit potrošnje.
4. U privatni Blob prenose se tri konačna PDF-a naredbom `pnpm ebooks:upload` u okruženju s postavljenim Vercel varijablama.
5. U Vercelu se postavljaju tajne iz `.env.example`. Stripe testne tajne i poveznice idu samo u Preview; žive vrijednosti tek nakon završnog testa i odobrenja.
6. U Stripeu se postavlja webhook `https://naturasanat.hr/api/stripe/webhook` za događaje `checkout.session.completed` i `checkout.session.async_payment_succeeded`.
7. Svaka Stripe poveznica po završetku kupnje vodi na `https://naturasanat.hr/kupnja/uspjesna`; povratak kod odustajanja vodi na `https://naturasanat.hr/kupnja/otkazana`.
8. U Resendu se potvrđuje domena pošiljatelja i testiraju dostava, odgovor kupca i obavijest prodavatelju.
9. Radi se cijeli test za sva četiri proizvoda: potvrde, testna uplata, jedna e-poruka, ispravne knjige, isteka 48 sati i blokada četvrtog preuzimanja.
10. Tek nakon provjere izrađuju se živi Stripe proizvodi/poveznice, uključuju produkcijske varijable i objavljuje webshop.
11. Odmah nakon uspješnog puštanja mijenja se pristup Drive mapi sa „svatko s poveznicom može uređivati” na samo pregled ili privatno.

## Varijable koje treba postaviti

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_CHECKOUT_BILJNA_PREHRANA`, `NEXT_PUBLIC_CHECKOUT_SVJEZA_PREHRANA`, `NEXT_PUBLIC_CHECKOUT_BLAGDANSKI_RECEPTI`, `NEXT_PUBLIC_CHECKOUT_KOLEKCIJA`
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
