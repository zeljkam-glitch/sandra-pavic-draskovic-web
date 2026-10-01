# Natura Sanat newsletter u Airtableu

## Tablica

U odabranoj Airtable bazi izraditi tablicu `Newsletter` sa sljedećim poljima:

| Polje | Vrsta |
| --- | --- |
| Email | Email; može biti primarno polje |
| Ime | Single line text |
| Status | Single select, opcija `Aktivan` |
| Izvor | Single line text |
| Datum prijave | Date, uključiti vrijeme i GMT/UTC |
| Privola | Checkbox |
| Verzija privole | Single line text |

## Pristup

Izraditi Airtable Personal Access Token s dopuštenjima:

- `data.records:read`
- `data.records:write`

Token ograničiti samo na Natura Sanat bazu. Lozinka Airtable računa nije potrebna i ne smije se dijeliti.

## Vercel varijable

U Preview i Production okruženja dodati:

- `AIRTABLE_TOKEN`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_NEWSLETTER_TABLE_ID`

Ponovna prijava postojeće email adrese ažurira postojeći zapis umjesto stvaranja duplikata.

## Važno

Airtable ovdje služi za sigurnu evidenciju prijava. Za stvarno slanje newslettera i poveznicu za automatsku odjavu i dalje treba povezati email/newsletter pružatelja usluge.
