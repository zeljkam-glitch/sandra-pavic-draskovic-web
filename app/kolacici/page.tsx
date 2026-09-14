import {LegalPage} from "../legal-page";

export default function Page(){return <LegalPage title="Politika kolačića" intro="Ova politika mora uvijek odgovarati stvarnom tehničkom stanju weba.">
  <section><h2>Trenutačno stanje</h2><p>Web ne koristi marketinške alate niti Meta Pixel. Ako hosting postavlja tehnički nužne kolačiće radi sigurnosti i rada stranice, oni se ne koriste za oglašavanje.</p></section>
  <section><h2>Newsletter i analitika</h2><p>Prije uključivanja newsletter obrasca, analitike ili drugih vanjskih servisa provjerit će se postavljaju li dodatne kolačiće ili druge tehnologije praćenja.</p></section>
  <section><h2>Privola</h2><p>Ako se uvedu analitički ili marketinški kolačići, neće se aktivirati prije izbora korisnika. Prihvaćanje i odbijanje moraju biti jednako jednostavni, a privola se mora moći naknadno povući.</p>{/* TODO_CONFIRM_COOKIE_AUDIT */}{/* TODO_CONFIRM_LEGAL_DETAILS */}</section>
</LegalPage>}
