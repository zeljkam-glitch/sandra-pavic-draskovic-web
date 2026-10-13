# Natura Sanat CMS i pregled nacrta

CMS je ugrađen u web i dostupan na `/uredjivanje`, ali samo na Vercel preview deploymentu. Produkcijska ruta uvijek odbija pristup. Uz to se koriste prijava, vremenski ograničena HttpOnly sesija, provjera origin zaglavlja, ograničenje pokušaja prijave u Upstash Redis bazi i privatna Vercel Blob pohrana.

## Što Sandra može mijenjati

- ključne tekstove naslovnice
- glavne tekstove stranica O Sandri, Kontakt i Webshop
- podnaslov brenda i opis u podnožju
- četiri glavne fotografije i njihove opise za pristupačnost

Polja su ograničena duljinom, a uneseni sadržaj prikazuje se kao običan tekst bez izvođenja HTML-a. Fotografije se provjeravaju po MIME tipu, stvarnom potpisu datoteke i veličini do 5 MB.

## Sigurna aktivacija previewa

Na Preview okruženje postaviti:

- `CMS_ENABLED=true`
- `CMS_ALLOW_PUBLISH=false`
- `CMS_ADMIN_EMAIL` — Sandrina adresa za prijavu
- `CMS_PASSWORD_HASH` — rezultat naredbe `pnpm cms:hash-password`
- `CMS_SESSION_SECRET` — zasebna nasumična tajna od najmanje 32 znaka
- `BLOB_READ_WRITE_TOKEN`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Varijable `CMS_PASSWORD_HASH`, `CMS_SESSION_SECRET`, Blob token i Redis token moraju biti Vercel Secrets. Ne koristiti produkcijske Stripe ili Resend tajne za CMS.

## Radni tok

1. Sandra se prijavi na zaštićeni preview `/uredjivanje`.
2. Promijeni tekstove ili slike i odabere **Spremi nacrt**.
3. Odabere **Pregledaj nacrt**. Nacrt je vidljiv samo u njezinoj prijavljenoj preglednoj sesiji i jasno označen žutom trakom.
4. Nakon sadržajnog, pravnog i vizualnog odobrenja posebno se postavlja `CMS_ALLOW_PUBLISH=true` samo na Preview okruženje.
5. Sandra objavi odobreni nacrt. Nakon završetka odobrenja varijabla se ponovno vraća na `false`.

Dok Sandra ne odobri javnu objavu, `CMS_ALLOW_PUBLISH` ostaje `false`, a zaštita projekta se ne uklanja.
