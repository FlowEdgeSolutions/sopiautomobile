'use client';

import { motion } from 'framer-motion';
import { Scale, FileText, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AGBPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          {...fadeInUp}
          className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Scale className="text-white" size={28} />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Geschäftsbedingungen für den Fahrzeugankauf
            </p>
          </div>

          <div className="space-y-8">
            {/* Geltungsbereich */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border-l-4 border-green-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="text-green-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 1 Geltungsbereich</h2>
              </div>
              <div className="space-y-3 text-gray-700 text-sm">
                <p>
                  (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend &ldquo;AGB&rdquo;) gelten für alle 
                  Geschäftsbeziehungen zwischen Sopi Automobile, Herr Mustafa Sopi, 
                  Bredenscheider Str. 119, 45527 Hattingen (nachfolgend &ldquo;Unternehmen&rdquo;) und seinen Kunden 
                  (nachfolgend &ldquo;Verkäufer&rdquo; oder &ldquo;Kunde&rdquo;).
                </p>
                <p>
                  (2) Diese AGB gelten ausschließlich. Abweichende, entgegenstehende oder 
                  ergänzende AGB des Kunden werden nicht Vertragsbestandteil, es sei denn, 
                  ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
                </p>
                <p>
                  (3) Diese AGB gelten auch für alle künftigen Geschäftsbeziehungen, 
                  auch wenn sie nicht nochmals ausdrücklich vereinbart werden.
                </p>
              </div>
            </motion.section>

            {/* Vertragsschluss */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-green-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="text-green-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 2 Vertragsschluss</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  (1) Die Bewertungsanfrage über das Online-Formular stellt noch kein 
                  verbindliches Angebot dar, sondern eine unverbindliche Anfrage.
                </p>
                <p>
                  (2) Nach Prüfung der Fahrzeugdaten erstellen wir ein unverbindliches 
                  Angebot, das 7 Tage gültig ist.
                </p>
                <p>
                  (3) Ein Kaufvertrag kommt erst durch die beiderseitige Unterzeichnung 
                  eines schriftlichen Kaufvertrags oder durch die Übergabe des Fahrzeugs 
                  gegen Zahlung des vereinbarten Kaufpreises zustande.
                </p>
                <p>
                  (4) Alle Angebote sind freibleibend und unverbindlich, solange nicht 
                  ausdrücklich etwas anderes vereinbart wurde.
                </p>
              </div>
            </motion.section>

            {/* Fahrzeugbewertung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="border-l-4 border-blue-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="text-blue-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 3 Fahrzeugbewertung und Besichtigung</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  (1) Die Bewertung erfolgt zunächst auf Basis der vom Verkäufer gemachten Angaben.
                </p>
                <p>
                  (2) Das endgültige Angebot wird erst nach einer Besichtigung vor Ort erstellt. 
                  Hierbei behalten wir uns vor, den zunächst genannten Preis entsprechend 
                  dem tatsächlichen Zustand des Fahrzeugs anzupassen.
                </p>
                <p>
                  (3) Weichen die tatsächlichen Gegebenheiten erheblich von den gemachten Angaben ab, 
                  können wir vom Angebot zurücktreten oder eine Preisanpassung vornehmen.
                </p>
                <p>
                  (4) Die Besichtigung ist für den Verkäufer kostenlos und unverbindlich.
                </p>
              </div>
            </motion.section>

            {/* Gewährleistung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="text-yellow-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 4 Gewährleistung und Haftung</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  (1) Als gewerblicher Käufer erwerben wir alle Fahrzeuge unter Ausschluss 
                  jeglicher Gewährleistung.
                </p>
                <p>
                  (2) Der Verkäufer versichert, dass das Fahrzeug frei von Rechten Dritter ist 
                  und er berechtigt ist, über das Fahrzeug zu verfügen.
                </p>
                <p>
                  (3) Der Verkäufer haftet für alle Schäden, die durch unrichtige oder 
                  unvollständige Angaben entstehen.
                </p>
                <p>
                  (4) Unsere Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, 
                  außer bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
                </p>
              </div>
            </motion.section>

            {/* Zahlung und Abholung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="border-l-4 border-red-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="text-red-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 5 Zahlung und Abholung</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  (1) Die Zahlung erfolgt bei Abholung des Fahrzeugs in bar oder per 
                  Überweisung nach vorheriger Vereinbarung.
                </p>
                <p>
                  (2) Die Abholung erfolgt kostenlos im Umkreis von 50 km um Hattingen. 
                  Für weitere Entfernungen berechnen wir 1,00 € pro Kilometer.
                </p>
                <p>
                  (3) Nach Vertragsschluss holen wir das Fahrzeug innerhalb von 7 Werktagen ab, 
                  sofern nicht anders vereinbart.
                </p>
                <p>
                  (4) Alle erforderlichen Dokumente (Fahrzeugbrief, Fahrzeugschein, Schlüssel, 
                  etc.) sind bei der Abholung vollständig zu übergeben.
                </p>
              </div>
            </motion.section>

            {/* Rücktritt */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-red-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="text-red-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 6 Rücktrittsrecht</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="bg-white rounded-xl p-4 border border-red-200">
                  <h3 className="font-semibold text-red-600 mb-2">Wichtiger Hinweis</h3>
                  <p>
                    Da es sich um den gewerblichen Ankauf von Gebrauchtwagen handelt, 
                    steht Ihnen als Verkäufer <strong>kein Widerrufsrecht</strong> nach den 
                    Vorschriften über Fernabsatzverträge zu.
                  </p>
                </div>
                
                <p>
                  (1) Ein Rücktritt vom Vertrag ist nur aus wichtigem Grund möglich.
                </p>
                <p>
                  (2) Als wichtiger Grund gilt insbesondere:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bewusst falsche Angaben zum Fahrzeugzustand</li>
                  <li>Verschweigen wesentlicher Mängel oder Schäden</li>
                  <li>Fehlende Berechtigung zur Veräußerung</li>
                </ul>
                <p>
                  (3) Bei berechtigtem Rücktritt werden bereits gezahlte Beträge erstattet.
                </p>
              </div>
            </motion.section>

            {/* Datenschutz */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="border-l-4 border-purple-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="text-purple-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 7 Datenschutz</h2>
              </div>
              
              <div className="space-y-3 text-gray-700 text-sm">
                <p>
                  (1) Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer 
                  Datenschutzerklärung, die Bestandteil dieser AGB ist.
                </p>
                <p>
                  (2) Mit der Nutzung unserer Dienste stimmen Sie der Verarbeitung 
                  Ihrer Daten gemäß der Datenschutzerklärung zu.
                </p>
                <p>
                  (3) Sie können Ihre Einwilligung jederzeit widerrufen. 
                  Details finden Sie in unserer{' '}
                  <Link href="/datenschutz" className="text-purple-600 hover:text-purple-700 underline">
                    Datenschutzerklärung
                  </Link>.
                </p>
              </div>
            </motion.section>

            {/* Schlussbestimmungen */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Scale className="text-gray-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">§ 8 Schlussbestimmungen</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  (1) <strong>Anwendbares Recht:</strong> Es gilt ausschließlich deutsches Recht 
                  unter Ausschluss des UN-Kaufrechts.
                </p>
                <p>
                  (2) <strong>Gerichtsstand:</strong> Erfüllungsort und Gerichtsstand ist Hattingen, 
                  sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder 
                  öffentlich-rechtliches Sondervermögen ist.
                </p>
                <p>
                  (3) <strong>Salvatorische Klausel:</strong> Sollten einzelne Bestimmungen 
                  dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der 
                  übrigen Bestimmungen unberührt.
                </p>
                <p>
                  (4) <strong>Änderungen:</strong> Änderungen und Ergänzungen dieser AGB 
                  bedürfen der Schriftform.
                </p>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Kontakt bei Fragen</h3>
                  <p>
                    Sopi Automobile<br />
                    Herr Mustafa Sopi<br />
                    Bredenscheider Str. 119, 45527 Hattingen<br />
                    Mobil: +49 157 56 99 09 49<br />
                    Festnetz: +49 232 4977 023 416<br />
                    E-Mail: verkauf@sopiautomobile.de.de
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">
              Stand: {new Date().toLocaleDateString('de-DE')} | 
              Diese AGB wurden mit größter Sorgfalt erstellt. Für deren Rechtswirksamkeit 
              übernehmen wir jedoch keine Gewähr.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:space-x-6 sm:gap-0">
              <Link href="/impressum" className="text-green-600 hover:text-green-700 text-sm px-2 py-1">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-green-600 hover:text-green-700 text-sm px-2 py-1">
                Datenschutz
              </Link>
              <Link href="/" className="text-green-600 hover:text-green-700 text-sm px-2 py-1">
                Startseite
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}