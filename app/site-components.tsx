import Link from "next/link";

const links = [
  ["/sandra","Sandra"],["/savjetovanje","Konzultacije"],["/predavanja","Predavanja"],
  ["/knjizice","Knjižice"],["/pojmovnik","Pojmovnik"],["/znanje","Znanje"],
  ["/preporucujem","Preporučujem"],["/kontakt","Kontakt"],
] as const;

export const ArrowLink=({href,children}:{href:string;children:React.ReactNode})=><Link className="arrow-link" href={href}>{children}<span aria-hidden>→</span></Link>;

export function Header(){return <header className="site-header"><div className="header-inner"><Link className="brand" href="/">Sandra Pavić Drašković</Link><nav aria-label="Glavna navigacija">{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav><div className="languages" aria-label="Odabir jezika"><Link href="/hr" lang="hr">HR</Link><span>/</span><Link href="/en" lang="en">EN</Link></div><details className="mobile-menu"><summary>Izbornik</summary><div>{links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}<Link href="/hr">HR</Link><Link href="/en">EN</Link></div></details></div></header>}

export function Footer(){return <footer><div className="wrap footer-grid"><div><Link className="brand" href="/">Sandra Pavić Drašković</Link><p>mag. pharm. · fitoaromaterapeutkinja · edukatorica</p><p className="natura">Natura Sanat</p></div><div><strong>Usluge</strong><Link href="/savjetovanje">Individualne konzultacije</Link><Link href="/predavanja">Predavanja i radionice</Link><Link href="/knjizice">Digitalne knjižice</Link></div><div><strong>Sadržaj</strong><Link href="/pojmovnik">Pojmovnik</Link><Link href="/znanje">Znanje</Link><Link href="/preporucujem">Preporučujem</Link></div><div><strong>Kontakt i pravno</strong><Link href="/kontakt">Pošalji upit</Link><span className="todo">TODO_PROFESSIONAL_EMAIL</span><span className="fine">Edukativni sadržaj ne zamjenjuje liječnički pregled, dijagnozu ni propisanu terapiju.</span></div></div><div className="wrap copyright">© {new Date().getFullYear()} Sandra Pavić Drašković <span>V1 u pripremi</span></div></footer>}
