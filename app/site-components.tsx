const links = [
  ["/sandra","O Sandri"],["/savjetovanje","Savjetovanje"],["/predavanja","Predavanja"],
  ["/webshop","Vodiči"],["/znanje","Znanje"],["/kontakt","Kontakt"],
] as const;

export const ArrowLink=({href,children}:{href:string;children:React.ReactNode})=><a className="arrow-link" href={href}>{children}<span aria-hidden>→</span></a>;

const footerServices = [["/savjetovanje","Uvodno savjetovanje"],["/individualni-rad","Mogući nastavci rada"],["/predavanja","Predavanja i radionice"],["/snimke-radionica","Arhiva snimki"],["/webshop","Edukativni vodiči"]] as const;
const footerKnowledge = [["/iskustva","Iskustva polaznica"],["/znanje","Blog i objave"],["/pojmovnik","Pojmovnik"],["/digitalni-alati","Digitalni alati"],["/mediji","Sandra u medijima"],["/preporucujem","Preporuke proizvoda"]] as const;
const footerLegal = [["/kontakt","Pošalji upit"],["/privatnost","Privatnost"],["/kolacici","Kolačići"],["/uvjeti-kupnje","Uvjeti usluga"],["/prigovori-i-povrati","Prigovori i povrati"],["/dokumenti","Suglasnosti i priprema"],["/cjenici","Cjenici (.CSV)"],["/sitemap.xml","Mapa stranice"]] as const;
const footerSocials = [["https://www.instagram.com/sandrapavicdraskovic/","Instagram"],["https://www.facebook.com/profile.php?id=100000258590039","Facebook"],["https://www.tiktok.com/@sandra.natura.sanat","TikTok"],["https://hr.linkedin.com/in/sandra-pavic-draskovic-39191956","LinkedIn"]] as const;

function FooterLinks({items}:{items:readonly (readonly [string,string])[]}){return <div className="footer-link-list">{items.map(([href,label])=><a key={href} href={href}>{label}</a>)}</div>}

export function Header(){return <header className="site-header"><div className="header-inner"><a className="brand header-brand" href="/" aria-label="Sandra Pavić Drašković, početna">Sandra Pavić Drašković</a><nav aria-label="Glavna navigacija">{links.map(([href,label])=><a key={href} href={href}>{label}</a>)}</nav><div className="languages" aria-label="Odabir jezika"><a href="/hr" lang="hr">HR</a><span>/</span><a href="/en" lang="en">EN</a></div><details className="mobile-menu"><summary>Izbornik</summary><div>{links.map(([href,label])=><a key={href} href={href}>{label}</a>)}<a href="/hr">HR</a><a href="/en">EN</a></div></details></div></header>}

export function Footer(){return <footer><div className="wrap footer-compact">
  <div className="footer-intro"><div><a className="brand" href="/">Sandra Pavić Drašković</a><p className="footer-credentials">mag. pharm. · fitoaromaterapeutkinja · edukatorica</p><p className="footer-description">Nutricionističko i fitoaromaterapijsko savjetovanje.</p></div><nav className="footer-socials" aria-label="Društvene mreže">{footerSocials.map(([href,label])=><a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}</nav></div>
  <div className="footer-desktop-nav"><nav aria-label="Usluge"><strong>Usluge</strong><FooterLinks items={footerServices}/></nav><nav aria-label="Znanje i sadržaj"><strong>Znanje i sadržaj</strong><FooterLinks items={footerKnowledge}/></nav></div>
  <div className="footer-mobile-nav"><details><summary>Usluge</summary><FooterLinks items={footerServices}/></details><details><summary>Znanje i sadržaj</summary><FooterLinks items={footerKnowledge}/></details><details><summary>Kontakt i pravno</summary><FooterLinks items={footerLegal}/></details></div>
  <nav className="footer-legal" aria-label="Kontakt i pravno"><strong>Kontakt i pravno</strong><FooterLinks items={footerLegal}/></nav>
  <p className="footer-disclaimer">Edukativni sadržaj ne zamjenjuje liječnički pregled, dijagnozu niti propisanu terapiju.</p>
</div><div className="wrap copyright"><span>© {new Date().getFullYear()} Sandra Pavić Drašković</span><span className="copyright-brand"><a className="footer-natura-mark" href="/" aria-label="Natura Sanat, početna"><img src="/natura-sanat-logo-green.png" alt="Natura Sanat" width={42} height={41} loading="lazy" decoding="async"/></a><span>Natura Sanat</span></span></div></footer>}
