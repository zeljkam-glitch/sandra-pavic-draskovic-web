const data = {
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Person",
      "@id":"https://www.sandrapavicdraskovic.com/#sandra",
      name:"Sandra Pavić Drašković",
      alternateName:"Sandra Drašković",
      jobTitle:"magistra farmacije, fitoaromaterapeutkinja i edukatorica",
      url:"https://www.sandrapavicdraskovic.com/sandra",
      sameAs:[
        "https://www.instagram.com/sandrapavicdraskovic/",
        "https://www.facebook.com/profile.php?id=100000258590039",
        "https://www.tiktok.com/@sandra.natura.sanat",
        "https://hr.linkedin.com/in/sandra-pavic-draskovic-39191956",
      ],
    },
    {
      "@type":"ProfessionalService",
      "@id":"https://www.sandrapavicdraskovic.com/#business",
      name:"Natura Sanat",
      url:"https://www.sandrapavicdraskovic.com/",
      founder:{"@id":"https://www.sandrapavicdraskovic.com/#sandra"},
      address:{"@type":"PostalAddress",streetAddress:"Zelenjak 38",postalCode:"10000",addressLocality:"Zagreb",addressCountry:"HR"},
      areaServed:"HR",
      knowsAbout:["prehrana","dodaci prehrani","fitoaromaterapija","biljna prehrana","edukativne radionice"],
    },
    {
      "@type":"WebSite",
      "@id":"https://www.sandrapavicdraskovic.com/#website",
      name:"Sandra Drašković · Natura Sanat",
      url:"https://www.sandrapavicdraskovic.com/",
      inLanguage:"hr-HR",
      publisher:{"@id":"https://www.sandrapavicdraskovic.com/#business"},
    },
  ],
};

export function SeoStructuredData(){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>}
