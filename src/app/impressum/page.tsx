'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building, User, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ImpressumPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation zurück */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          {...fadeInUp}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <FileText className="text-white" size={28} />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Impressum</h1>
            <p className="text-lg text-gray-600">
              Angaben gemäß § 5 TMG und § 55 RfStV
            </p>
          </div>

          {/* Unternehmensangaben */}
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border-l-4 border-red-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Building className="text-red-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Unternehmen</h2>
              </div>
              <div className="space-y-2 text-gray-700">
                <p className="text-xl font-semibold text-red-600">Sopi Automobile</p>
                <p>Fahrzeugankauf & Verwertung</p>
                <p className="text-sm text-gray-600">
                  Einzelunternehmen nach deutschem Recht
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border-l-4 border-red-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <User className="text-red-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Inhaber</h2>
              </div>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Herr Mustafa Sopi</p>
                <p>Geschäftsführer und Inhaber</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="border-l-4 border-red-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="text-red-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Anschrift</h2>
              </div>
              <div className="space-y-1 text-gray-700">
                <p>Musterstraße 123</p>
                <p>45525 Hattingen</p>
                <p>Deutschland</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="border-l-4 border-red-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="text-red-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Kontakt</h2>
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>Telefon: 02324 123456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>E-Mail: info@sopi-automobile.de</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Geschäftszeiten: Mo-Fr 08:00-18:00 Uhr, Sa 09:00-14:00 Uhr
                </p>
              </div>
            </motion.section>

            {/* Rechtliche Angaben */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rechtliche Angaben</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Umsatzsteuer-ID</h3>
                  <p className="text-gray-700">DE123456789</p>
                  <p className="text-sm text-gray-600">
                    (gemäß § 27a Umsatzsteuergesetz)
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Handelsregister</h3>
                  <p className="text-gray-700">Nicht eingetragen</p>
                  <p className="text-sm text-gray-600">
                    (Einzelunternehmen)
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Zuständige Kammer</h3>
                  <p className="text-gray-700">IHK Mittleres Ruhrgebiet</p>
                  <p className="text-sm text-gray-600">
                    Ostring 30-32, 44787 Bochum
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Berufsbezeichnung</h3>
                  <p className="text-gray-700">Fahrzeughändler</p>
                  <p className="text-sm text-gray-600">
                    (verliehen in Deutschland)
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Verantwortlicher für Inhalte */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="border-l-4 border-blue-500 pl-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verantwortlich für den Inhalt
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Herr Mustafa Sopi</strong><br />
                Musterstraße 123<br />
                45525 Hattingen<br />
                Deutschland
              </p>
              <p className="text-sm text-gray-600">
                (gemäß § 55 Abs. 2 RStV)
              </p>
            </motion.section>

            {/* EU-Streitschlichtung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-blue-50 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                EU-Streitschlichtung
              </h2>
              <p className="text-gray-700 mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-gray-700">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </motion.section>

            {/* Verbraucherstreitbeilegung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="border-l-4 border-green-500 pl-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p className="text-gray-700">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </motion.section>

            {/* Haftungsausschluss */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-yellow-50 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftungsausschluss</h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Haftung für Inhalte</h3>
                  <p className="text-sm">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen 
                    Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind 
                    wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder 
                    gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, 
                    die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Haftung für Links</h3>
                  <p className="text-sm">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                    Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                    Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Urheberrecht</h3>
                  <p className="text-sm">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">
              Stand: {new Date().toLocaleDateString('de-DE')}
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/datenschutz" className="text-red-600 hover:text-red-700 text-sm">
                Datenschutz
              </Link>
              <Link href="/agb" className="text-red-600 hover:text-red-700 text-sm">
                AGB
              </Link>
              <Link href="/" className="text-red-600 hover:text-red-700 text-sm">
                Startseite
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}