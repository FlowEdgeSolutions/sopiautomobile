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
  title: "Sopi Automobile - Fahrzeugankauf mit Schaden | Hattingen",
  description: "Verkaufen Sie Ihr beschädigtes Fahrzeug schnell und unkompliziert an Sopi Automobile in Hattingen. Faire Bewertung, schnelle Abwicklung - auch bei Motorschaden, Unfallschäden oder Getriebeschäden.",
  keywords: "Fahrzeugankauf, Auto verkaufen, Motorschaden, Unfallwagen, Hattingen, Getriebeschaden, Fahrzeug mit Schaden, Autoankauf",
  authors: [{ name: "Sopi Automobile" }],
  creator: "Sopi Automobile",
  publisher: "Sopi Automobile",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sopi-automobile.de'),
  alternates: {
    canonical: '/',
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
    title: "Sopi Automobile - Fahrzeugankauf mit Schaden | Hattingen",
    description: "Verkaufen Sie Ihr beschädigtes Fahrzeug schnell und unkompliziert. Faire Bewertung binnen 24h.",
    url: "https://sopi-automobile.de",
    siteName: "Sopi Automobile",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sopi Automobile - Fahrzeugankauf mit Schaden",
    description: "Verkaufen Sie Ihr beschädigtes Fahrzeug schnell und unkompliziert.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
