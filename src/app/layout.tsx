import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sopi Automobile - Fahrzeugankauf mit Schaden in Hattingen | Kostenlose Bewertung",
  description: "🚗 Verkaufen Sie Ihr Auto mit Motorschaden, Unfallschaden oder Getriebeschaden bei Sopi Automobile Hattingen. ✅ Kostenlose Bewertung in 30 Sekunden ✅ Faire Preise ✅ Schnelle Abholung. Über 2.500 zufriedene Kunden!",
  keywords: "Fahrzeugankauf Hattingen, Auto verkaufen Motorschaden, Unfallwagen ankauf, Fahrzeug mit Schaden verkaufen, Autoankauf Bochum, Getriebeschaden verkaufen, Fahrzeugbewertung kostenlos, Auto Totalschaden verkaufen, PKW Ankauf NRW, Sopi Automobile",
  authors: [{ name: "Julian Mazreku", url: "https://sopi-automobile.de" }],
  creator: "Sopi Automobile - Julian Mazreku",
  publisher: "Sopi Automobile",
  category: "Automotive",
  classification: "Fahrzeugankauf, Gebrauchtwagen, Unfallwagen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sopi-automobile.de'),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
    },
  },
  verification: {
    google: "your-google-verification-code", // TODO: Google Search Console Verification Code hinzufügen
  },
  icons: {
    icon: [
      {
        url: '/logoSopi.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logoSopi.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    shortcut: '/logoSopi.png',
    apple: {
      url: '/logoSopi.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  openGraph: {
    title: "Sopi Automobile - #1 Fahrzeugankauf in Hattingen | Auch mit Schäden",
    description: "🚗 Verkaufen Sie Ihr Auto schnell & unkompliziert! ✅ Kostenlose Bewertung in 30 Sek ✅ Faire Preise ✅ 5★ Google Bewertungen ✅ Über 2.500 zufriedene Kunden in Hattingen & Umgebung.",
    url: "https://sopi-automobile.de",
    siteName: "Sopi Automobile",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: '/logoSopi.png',
        width: 1200,
        height: 630,
        alt: 'Sopi Automobile - Fahrzeugankauf Hattingen',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sopi Automobile - Fahrzeugankauf Hattingen",
    description: "🚗 Auto verkaufen auch mit Schäden! ✅ Kostenlose Bewertung ✅ 5★ Bewertungen ✅ Schnelle Abholung in Hattingen & Umgebung",
    images: ['/logoSopi.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-site-verification': 'your-google-verification-code', // TODO: Ersetzen mit echtem Code
    'msvalidate.01': 'your-bing-verification-code', // TODO: Bing Webmaster Tools
    'fb:admins': 'your-facebook-admin-id', // TODO: Facebook Admin ID falls verwendet
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Strukturierte Daten für lokales SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sopi-automobile.de/#organization",
    "name": "Sopi Automobile",
    "alternateName": ["Sopi Automobile Hattingen", "Fahrzeugankauf Hattingen"],
    "description": "Professioneller Fahrzeugankauf in Hattingen - auch mit Motorschaden, Unfallschaden oder Getriebeschaden. Kostenlose Bewertung und faire Preise.",
    "url": "https://sopi-automobile.de",
    "telephone": "+4915756990949",
    "email": "info@sopiautomobile.de",
    "founder": {
      "@type": "Person",
      "name": "Julian Mazreku",
      "jobTitle": "Gründer & Geschäftsführer"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bredenscheider Str. 119",
      "addressLocality": "Hattingen",
      "postalCode": "45527",
      "addressCountry": "DE",
      "addressRegion": "Nordrhein-Westfalen"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.399",
      "longitude": "7.184"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Hattingen"
      },
      {
        "@type": "City", 
        "name": "Bochum"
      },
      {
        "@type": "City",
        "name": "Essen"
      },
      {
        "@type": "City",
        "name": "Wuppertal"
      },
      {
        "@type": "City",
        "name": "Dortmund"
      }
    ],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": ["Cash", "Bank transfer"],
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-14:00"
    ],
    "image": "https://sopi-automobile.de/logoSopi.png",
    "logo": "https://sopi-automobile.de/logoSopi.png",
    "sameAs": [
      "https://www.google.com/maps/place/Sopi+Automobile",
      "https://www.facebook.com/SopiAutomobile",
      "https://www.instagram.com/sopiautomobile"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fahrzeugankauf Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fahrzeugankauf mit Motorschaden",
            "description": "Ankauf von Fahrzeugen mit defektem Motor - faire Bewertung und schnelle Abwicklung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Unfallwagen Ankauf",
            "description": "Professioneller Ankauf von Unfallfahrzeugen aller Marken und Modelle"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Getriebeschaden Fahrzeugankauf",
            "description": "Ankauf von Fahrzeugen mit Getriebeschaden - kostenlose Bewertung vor Ort"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "7",
      "bestRating": "5",
      "worstRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sergej Götz"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Sopi Automobile hat unser Auto mit Motorschaden aufgekauft. Uns wurde ein fairer Preis geboten und die Abwicklung war wirklich professionell und verlief reibungslos."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Felix"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Ein super freundlicher junger Mann mit viel Ahnung. Dankeschön."
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sopi-automobile.de/#website",
    "url": "https://sopi-automobile.de",
    "name": "Sopi Automobile",
    "description": "Fahrzeugankauf in Hattingen - auch mit Schäden. Kostenlose Bewertung, faire Preise, schnelle Abholung.",
    "publisher": {
      "@id": "https://sopi-automobile.de/#organization"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://sopi-automobile.de/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ]
  };

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        {/* Strukturierte Daten */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        
        {/* Zusätzliche SEO Meta Tags */}
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content="Hattingen" />
        <meta name="geo.position" content="51.399;7.184" />
        <meta name="ICBM" content="51.399, 7.184" />
        
        {/* Hreflang für internationale SEO */}
        <link rel="alternate" hrefLang="de" href="https://sopi-automobile.de/" />
        <link rel="alternate" hrefLang="de-DE" href="https://sopi-automobile.de/" />
        <link rel="alternate" hrefLang="x-default" href="https://sopi-automobile.de/" />
        
        {/* DNS Prefetch für Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect für kritische Ressourcen */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
