'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Database, Mail, Lock, FileText, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DatenschutzPage() {
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
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="text-white" size={28} />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
            <p className="text-base sm:text-lg text-gray-600">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten
            </p>
          </div>

          <div className="space-y-8">
            {/* Einleitung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border-l-4 border-blue-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="text-blue-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">1. Datenschutz auf einen Blick</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-base sm:text-lg font-semibold">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
                <h3 className="text-base sm:text-lg font-semibold">Datenerfassung auf dieser Website</h3>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                  Dessen Kontaktdaten können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; 
                  in dieser Datenschutzerklärung entnehmen.
                </p>
              </div>
            </motion.section>

            {/* Verantwortliche Stelle */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Users className="text-blue-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">2. Verantwortliche Stelle</h2>
              </div>
              <div className="text-gray-700">
                <p className="mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="bg-white rounded-xl p-4 border border-blue-200">
                  <p className="font-semibold">Sopi Automobile</p>
                  <p>Herr Mustafa Sopi</p>
                  <p>Bredenscheider Str. 119</p>
                  <p>45525 Hattingen</p>
                  <p>Deutschland</p>
                  <br />
                  <p>Mobil: +49 157 56 99 09 49</p>
                  <p>Festnetz: +49 232 4977 023 416</p>
                  <p>E-Mail: verkauf@sopiautomobile.de.de</p>
                </div>
                <p className="mt-4 text-sm">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder 
                  gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen 
                  Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>
              </div>
            </motion.section>

            {/* Datenerfassung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="border-l-4 border-green-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Database className="text-green-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">3. Datenerfassung auf dieser Website</h2>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Fahrzeugbewertung und Kontaktformular</h3>
                  <p className="mb-3">
                    Wenn Sie unser Bewertungsformular nutzen, erheben wir folgende Daten:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Fahrzeugdaten:</strong> Marke, Modell, Baujahr, Kilometerstand, Zustand</li>
                    <li><strong>Kontaktdaten:</strong> Name, E-Mail-Adresse, Telefonnummer</li>
                    <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Informationen, Zeitstempel</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) 
                    und Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Zweck:</strong> Fahrzeugbewertung, Angebotserstellung, Kundenbetreuung
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Speicherdauer:</strong> 3 Jahre nach letztem Kontakt oder bis zum Widerruf Ihrer Einwilligung
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Server-Log-Dateien</h3>
                  <p className="mb-3">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in 
                    so genannten Server-Log-Dateien:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Browsertyp und Browserversion</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Diese Daten sind nicht bestimmten Personen zuordenbar und werden nach 
                    7 Tagen automatisch gelöscht.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* E-Mail-Versand */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-green-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="text-green-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">4. E-Mail-Versand und Newsletter</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Automatische E-Mail-Bestätigungen</h3>
                  <p className="text-sm">
                    Nach Übermittlung einer Bewertungsanfrage erhalten Sie automatisch eine 
                    Bestätigungs-E-Mail. Diese dient der Auftragsabwicklung und erfolgt auf 
                    Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">E-Mail-Service-Provider</h3>
                  <p className="text-sm">
                    Für den E-Mail-Versand nutzen wir externe Dienstleister (z.B. SendGrid, Mailgun). 
                    Diese verarbeiten Ihre Daten ausschließlich in unserem Auftrag und sind 
                    vertraglich zur Einhaltung der DSGVO verpflichtet.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Cookies */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="border-l-4 border-yellow-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="text-yellow-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">5. Cookies und Tracking</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Cookies</h3>
                  <p className="text-sm mb-3">
                    Diese Website verwendet nur technisch notwendige Cookies für den ordnungsgemäßen 
                    Betrieb. Diese Cookies speichern keine personenbezogenen Daten.
                  </p>
                  <p className="text-sm">
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse 
                    an der technischen Funktionsfähigkeit der Website)
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Verzicht auf Tracking</h3>
                  <p className="text-sm">
                    Wir verwenden bewusst keine Tracking-Tools wie Google Analytics oder ähnliche 
                    Dienste, um Ihre Privatsphäre zu schützen.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Ihre Rechte */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-red-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="text-red-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">6. Ihre Rechte</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-sm">
                  Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-600 mb-2">Auskunftsrecht</h4>
                    <p className="text-sm">
                      Sie können jederzeit Auskunft über die von uns gespeicherten 
                      personenbezogenen Daten verlangen.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-600 mb-2">Berichtigungsrecht</h4>
                    <p className="text-sm">
                      Sie können die Berichtigung unrichtiger oder die Vervollständigung 
                      unvollständiger Daten verlangen.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-600 mb-2">Löschungsrecht</h4>
                    <p className="text-sm">
                      Sie können die Löschung Ihrer Daten verlangen, soweit keine 
                      gesetzlichen Aufbewahrungspflichten bestehen.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-600 mb-2">Widerspruchsrecht</h4>
                    <p className="text-sm">
                      Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, 
                      soweit diese auf berechtigtem Interesse beruht.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-600 mb-2">Datenübertragbarkeit</h4>
                    <p className="text-sm">
                      Sie können verlangen, dass wir Ihre Daten in einem strukturierten 
                      Format zur Verfügung stellen.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-600 mb-2">Beschwerderecht</h4>
                    <p className="text-sm">
                      Sie können sich bei einer Datenschutz-Aufsichtsbehörde über 
                      unsere Datenverarbeitung beschweren.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-red-200">
                  <h4 className="font-semibold text-red-600 mb-2">Kontakt für Datenschutzanfragen</h4>
                  <p className="text-sm">
                    E-Mail: datenschutz@sopiautomobile.de<br />
                    Telefon: 02324 123456<br />
                    Post: Sopi Automobile, Bredenscheider Str. 119, 45527 Hattingen
                  </p>
                </div>
              </div>
            </motion.section>

            {/* SSL-Verschlüsselung */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="border-l-4 border-purple-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="text-purple-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">7. SSL-Verschlüsselung</h2>
              </div>
              
              <div className="text-gray-700">
                <p className="text-sm mb-3">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung 
                  vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung 
                  erkennen Sie daran, dass die Adresszeile des Browsers von &ldquo;http://&rdquo; auf 
                  &ldquo;https://&rdquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p className="text-sm">
                  Wenn die SSL-Verschlüsselung aktiviert ist, können die Daten, die Sie an 
                  uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </div>
            </motion.section>

            {/* Datensicherheit */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-purple-50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="text-purple-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">8. Datensicherheit</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-sm">
                  Wir haben umfangreiche technische und betriebliche Schutzmaßnahmen getroffen, 
                  um Ihre Daten vor zufälligen oder vorsätzlichen Manipulationen, Verlust, 
                  Zerstörung oder dem Zugriff unberechtigter Personen zu schützen.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technische Maßnahmen</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>SSL/TLS-Verschlüsselung</li>
                      <li>Sichere Serverumgebung</li>
                      <li>Regelmäßige Sicherheitsupdates</li>
                      <li>Firewall-Schutz</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Organisatorische Maßnahmen</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Zugriffsbeschränkungen</li>
                      <li>Regelmäßige Mitarbeiterschulungen</li>
                      <li>Datenschutz-Richtlinien</li>
                      <li>Incident-Response-Verfahren</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Änderungen */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="border-l-4 border-gray-500 pl-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="text-gray-500" size={24} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">9. Änderungen der Datenschutzerklärung</h2>
              </div>
              
              <div className="text-gray-700">
                <p className="text-sm">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie 
                  stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen 
                  unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren 
                  erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
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
              Stand: {new Date().toLocaleDateString('de-DE')} | 
                  Bei Fragen wenden Sie sich gerne an: datenschutz@sopiautomobile.de
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:space-x-6 sm:gap-0 mt-4">
              <Link href="/impressum" className="text-blue-600 hover:text-blue-700 text-sm px-2 py-1">
                Impressum
              </Link>
              <Link href="/agb" className="text-blue-600 hover:text-blue-700 text-sm px-2 py-1">
                AGB
              </Link>
              <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm px-2 py-1">
                Startseite
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}