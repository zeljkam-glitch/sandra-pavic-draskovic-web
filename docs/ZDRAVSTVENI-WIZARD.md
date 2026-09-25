# Zdravstveni upitnik nakon plaćene uvodne konzultacije

Izvor: ZDRAVSTVENI UPITNIK.docx, dostavljen 16. rujna 2026. Dokument je izvor pitanja, a njegove upute za pretrage i dostavu na staru adresu nisu nalog za izvođenje ili konfiguraciju weba.

## Radna verzija

Osam koraka: osnovni podaci, zdravlje, navike, dodatni kontekst, postojeća mjerenja/nalazi, tri dana prehrane, terapija/dodaci i pregled odgovora. Odgovori ostaju samo u memoriji otvorenog preglednika. Zatvaranje ili osvježavanje briše unos. Slanje i privola nisu aktivni. Nema učitavanja medicinskih priloga, pohrane u localStorage, slanja e-maila ili odgovora u zapisima aplikacije.

Stranica nije navedena u izborniku, dokumentima, blogu ni webshopu. Radni pregled: /priprema-konzultacije/pregled, dostupan samo u Vercel preview okruženju. Na njemu koristiti isključivo izmišljene podatke. To je pregled za doradu, a ne produkcijska privatna pozivnica.

## Pozivnice

Pripremljeno je izdavanje HMAC-potpisane pozivnice s nasumičnim identifikatorom i istekom nakon sedam dana. U URL-u nema imena, e-maila ili izravne reference naplate. Referenca naplate je sažeta uz tajni ključ.

Skripta scripts/questionnaire-invitation.mjs prima potvrđenu referencu naplate i HTTPS adresu weba. Zahtijeva QUESTIONNAIRE_INVITE_SECRET od najmanje 32 znaka u okruženju. Tajni ključ ne ide u kod, javne varijable ni poruke. Ručno izdavanje dopušteno je tek nakon Sandrine potvrde plaćanja uvodne konzultacije. Skripta ne provjerava naplatu i nije zamjena za vezu s procesorom plaćanja.

Stranica odbija istekle i krivotvorene pozivnice. Posjedovanje pozivnice nije potvrda identiteta. Jednokratna uporaba, pojedinačni opoziv i vezanje uz potvrđeni korisnički račun/e-mail čekaju privatnu bazu i autentifikaciju; ne predstavljati trenutni prototip kao gotov sigurni produkcijski sustav.

## Prije aktivacije

1. Sandra potvrđuje točan opseg nužnih pitanja. Stručnjak provjerava sadržaj i pravnu osnovu obrade. Plaćanje ne predstavlja zdravstvenu privolu.
2. Korisnik dobiva konkretne informacije o svrsi, primateljima, rokovima, dostavi, povlačenju privole i pravima. Ako je osnova izričita privola, bilježi se zasebno, s verzijom teksta i vremenom potvrde; ništa nije unaprijed označeno.
3. Uvodna konzultacija i potvrđena uplata povezuju se s pozivnicom. Ručni tok: Sandra potvrđuje uplatu pa izdaje pozivnicu. Automatski tok: potpisan webhook procesora plaćanja potvrđuje stvarnu naplatu za odgovarajući program, uz zaštitu od duplikata. Povratna stranica nakon checkouta nije dokaz plaćanja.
4. Prije unosa zdravstvenih podataka potvrđuje se identitet klijenta, primjerice jednokratnim kodom na njegovu potvrđenu adresu. Token sam po sebi nije dovoljna provjera identiteta.
5. U privatnoj bazi pratiti pozivnicu: izdana, otvorena, predana, istekla, opozvana. Provjera ovlasti i statusa mora se ponoviti pri predaji. Uspješna predaja atomarno zatvara pozivnicu; pogreške ne uništavaju odgovore.
6. Upitnik se sprema u privatnu šifriranu pohranu s kontrolom pristupa, definiranim rokovima i postupkom brisanja. Ne zapisivati odgovore ni tajne pozivnice u logove, analitiku ili monitoring. Provjeriti infrastrukturno zapisivanje URL-ova.
7. Na novu profesionalnu Sandrinu adresu šalje se obavijest bez zdravstvenih odgovora, s pristupom upitniku nakon prijave. Ako se želi dostava dokumenta e-mailom, način zaštite i pružatelja treba dogovoriti prije uključivanja. E-mail dostava i pohrana imaju odvojene statuse i ponovno slanje kod greške.
8. Sandrin pristup arhivi uz MFA. Nema zdravstvenih podataka u javnim URL-ovima, email naslovima, marketinškim alatima ili običnom kontaktnom webhooku.

## Izmjene u odnosu na izvornik za stručnu provjeru

- Pitanje 22 s uputama za kućni test urina čuvanog u hladnjaku nije preneseno kao zadatak. Klijentu se ne nalaže izvođenje testa. U koraku mjerenja navode se samo postojeći nalazi.
- Pitanje 27 ne nalaže novi laboratorijski paket ni slanje na pavic.sandra@yahoo.com. Pita koji su nalazi već dostupni; dostava priloga čeka zaseban siguran postupak.
- Pitanje 20 je unos postojećih mjerenja, ne obvezno mjerenje kroz tri dana.
- Pitanja o cjepivu protiv COVID-a, amalgamskim plombama i obiteljskoj povijesti ostavljena su kao neobvezna, s oznakom potrebe provjere relevantnosti. Sandra treba potvrditi koja zadržati za svoju uslugu.
- Ne traže se imena ili identifikatori članova obitelji.
- Dodan je e-mail za kontakt. Osnovna polja ime i e-mail jedina su obvezna u prototipu; prije produkcije provjeriti identitet i vezu s pozivnicom.

## Provjera

Provjereno izdavanje valjane pozivnice te odbijanje krivotvorene i istekle pozivnice. Referenca naplate nije čitljiva u URL-u. Preostala produkcijska provjera zahtijeva naplatu, privatnu bazu, autentifikaciju, dostavu i potvrđene dokumente.
