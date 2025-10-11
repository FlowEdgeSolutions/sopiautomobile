'use client';

import QuickForm from '../components/QuickForm';
import ProcessAnimation from '../components/ProcessAnimation';
import NavigationFeatures from '../components/NavigationFeatures';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Car, Phone, Mail, MapPin, Clock, Shield, Star, 
  Award, Menu, X,
  Facebook, Instagram, Twitter 
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: Clock,
      title: "10 Min Antwort",
      description: "Schnelle Rückmeldung binnen einem Tag",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "100% Sicher",
      description: "SSL-verschlüsselt und DSGVO-konform",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Award,
      title: "Faire Preise",
      description: "Transparente und marktgerechte Bewertung",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Car,
      title: "Alle Zustände",
      description: "Auch mit Motor- oder Unfallschaden",
      color: "from-red-500 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Driton Mazreku",
      location: "Google Rezension",
      rating: 5,
      text: "Wir sind seit einiger Zeit Gewerbekunden bei Sopi Automobile und schätzen die zuverlässige Zusammenarbeit sehr. Die Auswahl an Fahrzeugen, die kompetente Beratung..."
    },
    {
      name: "Sergej Götz",
      location: "Google Rezension",
      rating: 5,
      text: "Sopi Automobile hat unser Auto mit Motorschaden aufgekauft. Uns wurde ein fairer Preis geboten und die Abwicklung war wirklich professionell und verlief reibungslos."
    },
    {
      name: "Ciho Ka",
      location: "Google Rezension",
      rating: 5,
      text: "Ich wurde freundlich empfangen und die Probefahrt verlief problemlos. Der Verkäufer nahm sich Zeit, um all meine Fragen zu beantworten und zeigte großes Verständnis."
    },
    {
      name: "Sanel Sabani",
      location: "Google Rezension",
      rating: 5,
      text: "Ich habe mir einen kleinen privaten Traum erfüllt und das Erlebnis wurde mir durch die gute Beratung des Personals einfach nur noch schöner gemacht! Sehr empfehlenswert."
    },
    {
      name: "Felix",
      location: "Google Rezension",
      rating: 5,
      text: "Ein super freundlicher junger Mann mit viel Ahnung. Dankeschön."
    },
    {
      name: "Stark Bau Hattingen",
      location: "Google Rezension",
      rating: 5,
      text: "Ich hab mich bei Sopi Automobile direkt wohlgefühlt. Ich wurde gut aufgeklärt und informiert. Weiter so!"
    },
    {
      name: "Kingsley",
      location: "Google Rezension",
      rating: 5,
      text: "Super hilfsbereit, freundlich und fair immer wieder gerne."
    }
  ];



  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* SEO-optimierte Hauptüberschrift (versteckt für Design) */}
      <h1 className="sr-only">
        Sopi Automobile Hattingen - Fahrzeugankauf auch mit Motorschaden, Unfallschaden und Getriebeschaden. 
        Kostenlose Bewertung in 30 Sekunden. Über 2.500 zufriedene Kunden mit 5-Sterne-Bewertungen.
      </h1>
      {/* Fixierte Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="nav-glass border-b border-gray-100 fixed w-full z-50 top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logoSopi.png"
                  alt="Sopi Automobile Logo"
                  width={80}
                  height={80}
                  className="rounded-xl object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">Sopi Automobile</h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Fahrzeugankauf Hattingen</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Kontakt-Gruppe */}
              <div className="flex items-center space-x-3">
                <a 
                  href="tel:+4915756990949" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group min-h-[40px] px-2"
                >
                  <Phone size={16} className="group-hover:text-red-600" />
                  <span className="text-xs font-semibold">Mobil</span>
                </a>
                
                <a 
                  href="mailto:verkauf@sopiautomobile.de.de" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group min-h-[40px] px-2"
                >
                  <Mail size={16} className="group-hover:text-red-600" />
                  <span className="text-xs font-semibold">E-Mail</span>
                </a>
                
                <a 
                  href="https://maps.google.com/maps?q=Bredenscheider+Str.+119,+45527+Hattingen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group min-h-[40px] px-2"
                >
                  <MapPin size={16} className="group-hover:text-red-600" />
                  <span className="text-xs font-semibold">Anfahrt</span>
                </a>
              </div>
              
              {/* Kompakte Trennlinie */}
              <div className="h-6 w-px bg-gray-300"></div>
              
              {/* Rechtliche Links */}
              <div className="flex items-center space-x-2">
                <Link href="/impressum" className="text-xs text-gray-600 hover:text-red-600 transition-colors min-h-[40px] flex items-center px-1 font-medium">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-xs text-gray-600 hover:text-red-600 transition-colors min-h-[40px] flex items-center px-1 font-medium">
                  Datenschutz
                </Link>
                <Link href="/agb" className="text-xs text-gray-600 hover:text-red-600 transition-colors min-h-[40px] flex items-center px-1 font-medium">
                  AGB
                </Link>
              </div>
              
              {/* Kompakte Trennlinie */}
              <div className="h-6 w-px bg-gray-300"></div>
              
              {/* Kompakter CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200 shadow-md hover:shadow-lg min-h-[40px] flex items-center"
              >
                Jetzt bewerten
              </motion.button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center w-12 h-12 text-gray-700 hover:text-red-600 transition-colors rounded-xl hover:bg-gray-100"
                aria-label="Menü öffnen"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 rounded-b-2xl shadow-lg"
              >
                <div className="px-4 py-6 space-y-4">
                  {/* Mobile Company Info */}
                  <div className="sm:hidden mb-6 pb-4 border-b border-gray-100">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block">
                      <h2 className="text-lg font-bold text-gray-900 mb-1 hover:text-red-600 transition-colors">Sopi Automobile</h2>
                      <p className="text-sm text-gray-600">Fahrzeugankauf Hattingen</p>
                    </Link>
                  </div>

                  {/* Contact Links */}
                  <div className="space-y-3">
                    <a 
                      href="tel:+4915756990949" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <Phone size={20} />
                      <div>
                        <span className="font-semibold block">Mobil anrufen</span>
                        <span className="text-sm text-gray-500">+49 157 56 99 09 49</span>
                      </div>
                    </a>
                    
                    <a 
                      href="tel:+4923249770234"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <Phone size={20} />
                      <div>
                        <span className="font-semibold block">Festnetz anrufen</span>
                        <span className="text-sm text-gray-500">+49 232 4977 023 416</span>
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:verkauf@sopiautomobile.de.de" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <Mail size={20} />
                      <div>
                        <span className="font-semibold block">E-Mail schreiben</span>
                        <span className="text-sm text-gray-500">verkauf@sopiautomobile.de.de</span>
                      </div>
                    </a>
                    
                    <a 
                      href="https://maps.google.com/maps?q=Bredenscheider+Str.+119,+45527+Hattingen" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <MapPin size={20} />
                      <div>
                        <span className="font-semibold block">Route planen</span>
                        <span className="text-sm text-gray-500">Bredenscheider Str. 119, Hattingen</span>
                      </div>
                    </a>
                  </div>

                  {/* Mobile Legal Links */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 gap-2">
                      <Link 
                        href="/impressum" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center py-3 px-4 text-gray-600 hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 min-h-[48px] font-medium"
                      >
                        Impressum
                      </Link>
                      <Link 
                        href="/datenschutz" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center py-3 px-4 text-gray-600 hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 min-h-[48px] font-medium"
                      >
                        Datenschutz
                      </Link>
                      <Link 
                        href="/agb" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center py-3 px-4 text-gray-600 hover:text-red-600 transition-colors rounded-xl hover:bg-gray-50 min-h-[48px] font-medium"
                      >
                        AGB
                      </Link>
                    </div>
                  </div>

                  {/* Mobile CTA Button */}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 shadow-lg min-h-[48px]"
                    >
                      Jetzt Bewertung anfordern
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-16 overflow-hidden" role="banner" aria-labelledby="hero-title">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/full.jpg"
              alt="Sopi Automobile Werkstatt Hintergrund"
              fill
              className="object-cover opacity-5"
              priority={false}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Mobile Header - Überschrift über Formular */}
          <motion.div
            {...fadeInUp}
            className="lg:hidden mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              <Star size={16} />
              <span>4,8/5 Sterne • 2500+ zufriedene Kunden</span>
            </motion.div>

            <h1 className="text-responsive-3xl font-bold text-gray-900 leading-tight" id="hero-title">
              Verkaufen Sie Ihr{' '}
              <span className="text-red-600">beschädigtes Fahrzeug</span>{' '}
              schnell und unkompliziert
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Mobile: Prozess-Animation, Desktop: Links Content + Animation */}
            <motion.div
              {...fadeInUp}
              className="space-y-6 order-2 lg:order-1"
            >
              {/* Desktop Header - nur auf Desktop sichtbar */}
              <div className="space-y-4 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  <Star size={16} />
                  <span>4,8/5 Sterne • 2500+ zufriedene Kunden</span>
                </motion.div>

                <h2 className="text-responsive-3xl font-bold text-gray-900 leading-tight" id="hero-title">
                  Verkaufen Sie Ihr{' '}
                  <span className="text-red-600">beschädigtes Fahrzeug</span>{' '}
                  schnell und unkompliziert
                </h2>
              </div>

              {/* Prozess Animation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                <ProcessAnimation />
              </div>
            </motion.div>

            {/* Mobile: Formular nach Header, Desktop: Rechts Formular */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:mt-0 mt-8 order-1 lg:order-2"
            >
              <QuickForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" aria-labelledby="features-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4" id="features-title">
              Warum Sopi Automobile?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Über 15 Jahre Erfahrung im Fahrzeugankauf. Vertrauen Sie auf unsere 
              Expertise und faire Geschäftspraktiken.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Gallery Section */}
      <section className="py-20 bg-white" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4" id="services-title">
              Unser Service in Aktion
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von der Abholung bis zur Reparatur - wir kümmern uns um alles rund um Ihr Fahrzeug.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Abschlepp-Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/abschlepp1.jpg"
                  alt="Professioneller Abschleppdienst von Sopi Automobile in Hattingen - Fahrzeugabholung vor Ort auch bei Motorschaden"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Abschleppdienst</h3>
                  <p className="text-sm opacity-90">Professionelle Abholung vor Ort</p>
                </div>
              </div>
            </motion.div>

            {/* Range Rover Abschlepp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/rangerover_abschlepp.jpg"
                  alt="Abschleppen eines Range Rover durch Sopi Automobile - Auch Luxusfahrzeuge und Premiummarken werden angekauft"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Luxusfahrzeuge</h3>
                  <p className="text-sm opacity-90">Auch hochwertige Fahrzeuge</p>
                </div>
              </div>
            </motion.div>

            {/* Reparatur-Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/repar.jpg"
                  alt="Professionelle Fahrzeugreparatur in der Werkstatt von Sopi Automobile Hattingen - Fachgerechte Instandsetzung"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Reparatur-Service</h3>
                  <p className="text-sm opacity-90">Professionelle Werkstatt</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" aria-labelledby="testimonials-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4" id="testimonials-title">
              Das sagen unsere Kunden
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900">4,8/5</span>
              <span className="text-gray-600">• Google Bewertungen</span>
            </div>
            <p className="text-xl text-gray-600">
              Authentische Bewertungen unserer zufriedenen Kunden
            </p>
          </motion.div>

          {/* Horizontaler Bewertungs-Slider */}
          <div className="relative overflow-hidden">
            {/* Kontinuierlicher horizontaler Scroll */}
            <motion.div
              className="flex space-x-6 py-8"
              animate={{
                x: [0, -100 * testimonials.length]
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Testimonials doppelt rendern für nahtlosen Loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-96 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Google Badge */}
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-100 rounded-full px-3 py-1 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Google</span>
                      </div>
                    </div>
                  </div>

                  {/* Sterne */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>

                  {/* Bewertungstext */}
                  <blockquote className="text-gray-800 text-sm leading-relaxed mb-4 italic min-h-[80px]">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>

                  {/* Kunden-Info */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Google Bewertung
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient Overlays für smooth Edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* FAQ Section für SEO */}
      <section className="py-20 bg-white" aria-labelledby="faq-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4" id="faq-title">
              Häufig gestellte Fragen
            </h2>
            <p className="text-xl text-gray-600">
              Alles was Sie über den Fahrzeugankauf bei Sopi Automobile wissen müssen
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              {...fadeInUp}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Kaufen Sie auch Fahrzeuge mit Motorschaden?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, wir kaufen alle Fahrzeuge - auch mit Motorschaden, Unfallschaden oder Getriebeschaden. 
                Unser Expertenteam bewertet jeden Wagen fair und bietet Ihnen einen angemessenen Preis, 
                unabhängig vom Zustand.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Wie schnell erhalte ich ein Angebot?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nach dem Ausfüllen unseres 30-Sekunden-Formulars erhalten Sie innerhalb von 10 Minuten 
                ein unverbindliches Angebot. Bei dringenden Anfragen können wir auch schneller reagieren.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ist die Fahrzeugbewertung wirklich kostenlos?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, die Bewertung Ihres Fahrzeugs ist 100% kostenlos und unverbindlich. 
                Sie gehen keinerlei Verpflichtungen ein und können unser Angebot in Ruhe prüfen.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Holen Sie das Fahrzeug auch bei mir ab?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Selbstverständlich! Wir bieten einen kostenlosen Abholservice in Hattingen und Umgebung. 
                Auch nicht fahrbereite Fahrzeuge holen wir mit unserem Abschleppdienst direkt bei Ihnen ab.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Welche Fahrzeugmarken kaufen Sie an?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Wir kaufen alle gängigen Fahrzeugmarken: Volkswagen, BMW, Mercedes-Benz, Audi, Opel, Ford, 
                Toyota, Renault und viele weitere. Auch Luxusfahrzeuge und Oldtimer nehmen wir gerne in Zahlung.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Bereit für Ihr faires Angebot?
              </h2>
              <p className="text-xl text-red-100">
                Starten Sie jetzt - kostenlos und unverbindlich
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Jetzt Bewertung anfordern
              </motion.button>
              
              <div className="flex items-center space-x-4 text-red-100">
                <div className="flex items-center space-x-1">
                  <Phone size={16} />
                  <span>+49 157 56 99 09 49</span>
                </div>
                <div className="text-red-200">oder</div>
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>verkauf@sopiautomobile.de.de</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <Image
                    src="/logoSopi.png"
                    alt="Sopi Automobile Logo"
                    width={64}
                    height={64}
                    className="rounded-xl object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sopi Automobile</h3>
                  <p className="text-gray-400 text-base">Fahrzeugankauf Hattingen</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Ihr vertrauensvoller Partner für den Ankauf von Fahrzeugen 
                aller Art - auch mit Schäden.
              </p>
              
              {/* Kleines Gründer-Bild und Info im Footer */}
              <div className="flex items-center space-x-3 pt-3 border-t border-gray-800">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-red-600 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/Julian.png"
                      alt="Julian Mazreku"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Gründer & Geschäftsführer</p>
                  <p className="text-xs text-gray-300 font-medium">Julian Mazreku</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>Mobil: +49 157 56 99 09 49</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>Festnetz: +49 232 4977 023 416</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>verkauf@sopiautomobile.de.de</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>Bredenscheider Str. 119<br />45527 Hattingen</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Fahrzeugankauf mit Schäden</li>
                <li>• Kostenlose Bewertung</li>
                <li>• Kostenlose Abholung</li>
                <li>• Sofortige Abwicklung</li>
                <li>• Alle Fahrzeugtypen</li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-white transition-colors">AGB</Link></li>
              </ul>
              
              <div className="space-y-2">
                <h5 className="font-semibold">Folgen Sie uns</h5>
                <div className="flex space-x-3">
                  <Facebook className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
                  <Instagram className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
                  <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Sopi Automobile. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
      
      {/* Navigation Features */}
      <NavigationFeatures />
    </main>
  );
}