'use client';

import QuickForm from '../components/QuickForm';
import ProcessAnimation from '../components/ProcessAnimation';
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
      title: "24h Antwort",
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
      name: "Michael K.",
      location: "Hattingen",
      rating: 5,
      text: "Super schnelle Abwicklung! Trotz Motorschaden einen fairen Preis erhalten.",
      vehicle: "BMW 3er, 2018"
    },
    {
      name: "Sandra M.",
      location: "Bochum",
      rating: 5,
      text: "Sehr professionell und ehrlich. Kann Sopi Automobile nur weiterempfehlen!",
      vehicle: "VW Golf, 2020"
    },
    {
      name: "Thomas R.",
      location: "Essen",
      rating: 5,
      text: "Unkomplizierte Abholung und faire Bewertung. Gerne wieder!",
      vehicle: "Audi A4, 2019"
    }
  ];



  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Fixierte Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="nav-glass border-b border-gray-100 fixed w-full z-50 top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative flex items-center justify-center">
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
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Sopi Automobile</h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Fahrzeugankauf Hattingen</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <a 
                href="tel:+4923241234567" 
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group min-h-[44px] px-2"
              >
                <Phone size={20} className="group-hover:text-red-600" />
                <span className="text-base font-semibold">02324 123456</span>
              </a>
              
              <a 
                href="mailto:info@sopi-automobile.de" 
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group min-h-[44px] px-2"
              >
                <Mail size={20} className="group-hover:text-red-600" />
                <span className="text-base font-semibold">info@sopi-automobile.de</span>
              </a>
              
              <a 
                href="https://maps.google.com/maps?q=Musterstra%C3%9Fe+123,+45525+Hattingen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors cursor-pointer group min-h-[44px] px-2"
              >
                <MapPin size={20} className="group-hover:text-red-600" />
                <span className="text-base font-semibold">Musterstraße 123, Hattingen</span>
              </a>

              {/* Desktop Legal Links */}
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <Link href="/impressum" className="text-sm text-gray-600 hover:text-red-600 transition-colors min-h-[44px] flex items-center px-2">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-sm text-gray-600 hover:text-red-600 transition-colors min-h-[44px] flex items-center px-2">
                  Datenschutz
                </Link>
                <Link href="/agb" className="text-sm text-gray-600 hover:text-red-600 transition-colors min-h-[44px] flex items-center px-2">
                  AGB
                </Link>
              </div>
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
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Sopi Automobile</h2>
                    <p className="text-sm text-gray-600">Fahrzeugankauf Hattingen</p>
                  </div>

                  {/* Contact Links */}
                  <div className="space-y-3">
                    <a 
                      href="tel:+4923241234567" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <Phone size={20} />
                      <div>
                        <span className="font-semibold block">Anrufen</span>
                        <span className="text-sm text-gray-500">02324 123456</span>
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:info@sopi-automobile.de" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <Mail size={20} />
                      <div>
                        <span className="font-semibold block">E-Mail schreiben</span>
                        <span className="text-sm text-gray-500">info@sopi-automobile.de</span>
                      </div>
                    </a>
                    
                    <a 
                      href="https://maps.google.com/maps?q=Musterstra%C3%9Fe+123,+45525+Hattingen" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-xl hover:bg-red-50 min-h-[48px]"
                    >
                      <MapPin size={20} />
                      <div>
                        <span className="font-semibold block">Route planen</span>
                        <span className="text-sm text-gray-500">Musterstraße 123, Hattingen</span>
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
      <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Mobile: Formular zuerst, Desktop: Links Content + Animation */}
            <motion.div
              {...fadeInUp}
              className="space-y-6 order-2 lg:order-1"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  <Star size={16} />
                  <span>4.8/5 Sterne • 2500+ zufriedene Kunden</span>
                </motion.div>

                <h1 className="text-responsive-3xl font-bold text-gray-900 leading-tight">
                  Verkaufen Sie Ihr{' '}
                  <span className="text-red-600">beschädigtes Fahrzeug</span>{' '}
                  schnell und unkompliziert
                </h1>
              </div>

              {/* Prozess Animation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                <ProcessAnimation />
              </div>
            </motion.div>

            {/* Mobile: Formular zuerst, Desktop: Rechts Formular */}
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Das sagen unsere Kunden
            </h2>
            <p className="text-xl text-gray-600">
              Über 2.500 zufriedene Kunden vertrauen bereits auf unseren Service
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{testimonial.rating}/5</span>
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location} • {testimonial.vehicle}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                  <span>02324 123456</span>
                </div>
                <div className="text-red-200">oder</div>
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>info@sopi-automobile.de</span>
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
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>02324 123456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>info@sopi-automobile.de</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>Musterstraße 123<br />45525 Hattingen</span>
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
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
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
    </main>
  );
}