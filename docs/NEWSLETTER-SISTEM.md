# Natura Sanat newsletter

Web koristi Resend kao jedini sustav za slanje i upravljanje kontaktima. Airtable nije potreban za osnovni rad newslettera.

## Tok prijave

1. Posjetitelj unosi ime (neobvezno), email i zasebno prihvaća newsletter privolu.
2. Web šalje potvrdnu poruku s potpisanom poveznicom koja vrijedi 24 sata.
3. Poveznica otvara Natura Sanat stranicu na kojoj posjetitelj još jednom izričito potvrđuje prijavu. Time se izbjegava automatska potvrda koju ponekad izazovu sigurnosni skeneri e-pošte.
4. Tek nakon potvrde kontakt se dodaje u Resend i, ako je postavljen `RESEND_SEGMENT_ID`, u odabrani segment.
5. Broadcast poruke šalju se iz Resend sučelja i moraju sadržavati Resendovu poveznicu za odjavu.

## Potrebne Vercel varijable

- `RESEND_API_KEY` — ključ s ovlastima potrebnima za slanje i kontakte
- `NEWSLETTER_FROM` — primjer: `Natura Sanat <potvrda@newsletter.naturasanat.hr>`
- `NEWSLETTER_REPLY_TO` — primjer: `info@naturasanat.hr`
- `NEWSLETTER_CONFIRMATION_SECRET` — nasumična tajna od najmanje 32 znaka
- `RESEND_SEGMENT_ID` — ID segmenta "Natura Sanat newsletter"; nije obvezan, ali se preporučuje radi urednog ciljanja Broadcasta

## Resend priprema

- verificirati `newsletter.naturasanat.hr`
- napraviti segment `Natura Sanat newsletter`
- napraviti ograničeni API ključ i spremiti ga samo u Vercel
- u Broadcast predlošku uključiti automatsku Resend odjavu
- prije prvog pravog slanja provesti test s vlastitom adresom

Postojeće kontakte uvesti samo ako postoji dokaz valjane privole. Kontaktni obrazac, kupnja i newsletter ostaju odvojene svrhe.
