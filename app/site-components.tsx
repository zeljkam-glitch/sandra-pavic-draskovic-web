const links = [
  ["/","Početna"],["/savjetovanje","Započnite ovdje"],["/individualni-rad","Savjetovanja"],
  ["/individualni-rad#programi","Programi"],["/predavanja","Online i radionice"],["/znanje","Blog"],["/sandra","O meni"],["/kontakt","Kontakt"],
] as const;

export const ArrowLink=({href,children}:{href:string;children:React.ReactNode})=><Link className="arrow-link" href={href}>{children}<span aria-hidden>→</span></Link>;

const footerServices = [["/savjetovanje","Uvodno savjetovanje"],["/individualni-rad","Mogući nastavci rada"],["/predavanja","Predavanja i radionice"],["/snimke-radionica","Arhiva snimki"],["/webshop","Edukativni vodiči"]] as const;
const footerKnowledge = [["/iskustva","Iskustva polaznica"],["/znanje","Blog i objave"],["/pojmovnik","Pojmovnik"],["/digitalni-alati","Digitalni alati"],["/mediji","Sandra u medijima"],["/za-medije","Za medije i organizatore"],["/preporucujem","Preporuke proizvoda"]] as const;
const footerLegal = [["/kontakt","Pošalji upit"],["/privatnost","Privatnost"],["/kolacici","Kolačići"],["/uvjeti-kupnje","Uvjeti usluga"],["/prigovori-i-povrati","Prigovori i povrati"],["/dokumenti","Suglasnosti i priprema"],["/cjenici","Cjenici (.CSV)"],["/sitemap.xml","Mapa stranice"]] as const;
const footerSocials = [["https://www.instagram.com/sandrapavicdraskovic/","Instagram"],["https://www.facebook.com/profile.php?id=100000258590039","Facebook"],["https://www.tiktok.com/@sandra.natura.sanat","TikTok"],["https://hr.linkedin.com/in/sandra-pavic-draskovic-39191956","LinkedIn"]] as const;

function FooterLinks({items}:{items:readonly (readonly [string,string])[]}){return <div className="footer-link-list">{items.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</div>}

export function Header(){return <header className="site-header"><div className="header-inner"><Link className="brand header-brand" href="/" aria-label="Natura Sanat, početna"><Image src="/natura-sanat-logo-green.png" alt="" width={58} height={57}/><span><b>NATURA SANAT</b><small>Holistički put zdravlja</small></span></Link><nav aria-label="Glavna navigacija">{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav><Link className="header-cta" href="/kontakt?tema=konzultacije">Pošaljite upit</Link><details className="mobile-menu"><summary>Izbornik</summary><div>{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}<Link href="/kontakt?tema=konzultacije">Pošaljite upit</Link></div></details></div></header>}

export function Footer(){return <footer><div className="wrap footer-compact">
  <div className="footer-intro"><div><Link className="footer-brand-lockup" href="/"><Image src="/natura-sanat-logo-green.png" alt="Natura Sanat" width={64} height={62}/><span><b>NATURA SANAT</b><small>Sandra Pavić Drašković, mag. pharm.<br/>fitoaromaterapeutkinja i edukatorica</small></span></Link><p className="footer-description">Individualno savjetovanje o prehrani, dodacima prehrani i zdravim životnim navikama.</p></div><nav className="footer-socials" aria-label="Društvene mreže">{footerSocials.map(([href,label])=><a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}</nav></div>
  <div className="footer-desktop-nav"><nav aria-label="Usluge"><strong>Usluge</strong><FooterLinks items={footerServices}/></nav><nav aria-label="Znanje i sadržaj"><strong>Znanje i sadržaj</strong><FooterLinks items={footerKnowledge}/></nav></div>
  <div className="footer-mobile-nav"><details><summary>Usluge</summary><FooterLinks items={footerServices}/></details><details><summary>Znanje i sadržaj</summary><FooterLinks items={footerKnowledge}/></details><details><summary>Kontakt i pravno</summary><FooterLinks items={footerLegal}/></details></div>
  <nav className="footer-legal" aria-label="Kontakt i pravno"><strong>Kontakt i pravno</strong><FooterLinks items={footerLegal}/></nav>
  <p className="footer-disclaimer">Edukativni sadržaj ne zamjenjuje liječnički pregled, dijagnozu niti propisanu terapiju.</p>
</div><div className="wrap copyright"><span>© {new Date().getFullYear()} Natura Sanat</span><span>Savjetodavne i edukativne usluge za punoljetne osobe (18+).</span><a className="footer-credit" href="https://www.saltybrandstudio.com/hr" target="_blank" rel="noopener noreferrer">Strategija brenda · sadržaj · UX/UI · dizajn i razvoj weba — Salty Brand Studio ↗</a></div></footer>}
import Image from "next/image";
import Link from "next/link";
