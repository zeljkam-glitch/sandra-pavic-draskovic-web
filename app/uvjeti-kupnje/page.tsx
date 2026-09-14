import {LegalPage} from "../legal-page";

export default function Page(){return <LegalPage title="Uvjeti kupnje i korištenja" intro="Prodaja još nije aktivna. Ovi uvjeti moraju se dovršiti prije prve naplate.">
  <section><h2>Prodavatelj i kontakt</h2><p>Prije početka prodaje potrebno je objaviti puni naziv poslovnog subjekta, adresu, identifikacijske podatke, profesionalni email i način podnošenja pisanog prigovora.</p>{/* TODO_CONFIRM_LEGAL_DETAILS */}{/* TODO_PROFESSIONAL_EMAIL */}</section>
  <section><h2>Cijene i plaćanje</h2><p>Cijena svakog digitalnog proizvoda bit će prikazana prije kupnje. Potrebno je potvrditi uključuje li cijena PDV, odabrati pružatelja plaćanja i definirati postupak izdavanja računa.</p>{/* TODO_CONFIRM_BOOKLET_PRICE */}{/* TODO_SELECT_PAYMENT_PROVIDER */}{/* TODO_CONFIRM_INVOICE_PROCESS */}</section>
  <section><h2>Dostava digitalnog sadržaja</h2><p>Nakon uspješnog plaćanja kupac treba dobiti poveznicu ili PDF na unesenu email adresu. Rok, način dostave i podrška u slučaju tehničkog problema moraju biti navedeni na stranici proizvoda.</p>{/* TODO_CONFIGURE_AUTOMATIC_DELIVERY */}</section>
  <section><h2>Odustanak i povrat</h2><p>Prije trenutne isporuke digitalnog sadržaja potrebno je pravilno urediti izričitu suglasnost kupca za početak isporuke i obavijest o mogućem gubitku prava na jednostrani raskid. Konačan tekst treba pravno provjeriti.</p>{/* TODO_CONFIRM_DIGITAL_REFUND_PROCESS */}</section>
  <section><h2>Medicinsko odricanje od odgovornosti</h2><p>Sadržaj weba i digitalnih proizvoda služi edukaciji. Ne predstavlja dijagnozu, liječenje ni zamjenu za liječnički pregled ili propisanu terapiju.</p></section>
</LegalPage>}
