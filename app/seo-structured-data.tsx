const data = {
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Person",
      "@id":"https://naturasanat.hr/#sandra",
      name:"Sandra Pavić Drašković",
      alternateName:"Sandra Drašković",
      jobTitle:"magistra farmacije, fitoaromaterapeutkinja i edukatorica",
      url:"https://naturasanat.hr/sandra",
      sameAs:[
        "https://www.instagram.com/sandrapavicdraskovic/",
        "https://www.facebook.com/profile.php?id=100000258590039",
        "https://www.tiktok.com/@sandra.natura.sanat",
        "https://hr.linkedin.com/in/sandra-pavic-draskovic-39191956",
      ],
    },
    {
      "@type":"ProfessionalService",
      "@id":"https://naturasanat.hr/#business",
      name:"Natura Sanat",
      url:"https://naturasanat.hr/",
      founder:{"@id":"https://naturasanat.hr/#sandra"},
      address:{"@type":"PostalAddress",streetAddress:"Zelenjak 38",postalCode:"10000",addressLocality:"Zagreb",addressCountry:"HR"},
      areaServed:"HR",
      knowsAbout:["prehrana","dodaci prehrani","fitoaromaterapija","biljna prehrana","edukativne radionice"],
    },
    {
      "@type":"WebSite",
      "@id":"https://naturasanat.hr/#website",
      name:"Natura Sanat",
      url:"https://naturasanat.hr/",
      inLanguage:"hr-HR",
      publisher:{"@id":"https://naturasanat.hr/#business"},
    },
  ],
};

export function SeoStructuredData(){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>}
