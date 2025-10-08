'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, Car, User, Shield, Clock, Star, AlertCircle, ArrowRight, ArrowLeft, ChevronDown, Search } from 'lucide-react';

interface QuickFormData {
  // Fahrzeugdaten
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  
  // Kontaktdaten
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  website?: string; // Honeypot
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  leadId?: string;
}

type FormStep = 'vehicle' | 'contact';

const QuickForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('vehicle');
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState: { errors }, reset, trigger, getValues, setValue } = useForm<QuickFormData>();

  // Automarken - beliebteste zuerst, dann alphabetisch
  const carBrands = [
    // Beliebteste Marken
    'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Opel', 'Ford', 'Renault', 'Toyota', 'Peugeot', 'Skoda',
    // Alphabetisch sortierte weitere Marken
    'Acura', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen',
    'Dacia', 'Daewoo', 'Daihatsu', 'Dodge', 'DS', 'Ferrari', 'Fiat', 'Genesis', 'GMC', 'Honda', 'Hummer', 'Hyundai',
    'Infiniti', 'Isuzu', 'Iveco', 'Jaguar', 'Jeep', 'Kia', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus',
    'Lincoln', 'Lotus', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mini', 'Mitsubishi', 'Nissan', 'Pagani',
    'Polestar', 'Porsche', 'Ram', 'Rolls-Royce', 'Saab', 'Seat', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Volvo'
  ];

  // Gefilterte Marken basierend auf Suchbegriff
  const filteredBrands = carBrands.filter(brand =>
    brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  const vehicleConditions = [
    { value: 'motorschaden', label: 'Motorschaden', color: 'text-red-600' },
    { value: 'unfallschaden', label: 'Unfallschaden', color: 'text-orange-600' },
    { value: 'getriebeschaden', label: 'Getriebeschaden', color: 'text-yellow-600' },
    { value: 'fahrbereit', label: 'Fahrbereit mit Mängeln', color: 'text-blue-600' },
    { value: 'gut', label: 'Guter Zustand', color: 'text-green-600' },
  ];

  // Dropdown außerhalb klicken -> schließen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setBrandDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setValue('brand', brand);
    setBrandDropdownOpen(false);
    setBrandSearchTerm('');
  };

  const handleNextStep = async () => {
    // Validiere nur die Fahrzeugdaten-Felder
    const isValid = await trigger(['brand', 'model', 'year', 'mileage', 'condition']);
    if (isValid) {
      setCurrentStep('contact');
    }
  };

  const handlePrevStep = () => {
    setCurrentStep('vehicle');
  };

  const onSubmit = async (data: QuickFormData) => {
    setFormState({ status: 'loading' });
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle: {
            brand: data.brand,
            model: data.model,
            firstRegistrationYear: data.year,
            mileageKm: data.mileage,
            condition: data.condition,
          },
          contact: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
          meta: {
            source: 'quick-form-hero',
            consent: data.consent,
          },
          website: data.website, // Honeypot
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormState({
          status: 'success',
          message: result.message,
          leadId: result.leadId,
        });
        reset();
      } else {
        setFormState({
          status: 'error',
          message: result.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        });
      }
    } catch {
      setFormState({
        status: 'error',
        message: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      });
    }
  };

  const resetForm = () => {
    setFormState({ status: 'idle' });
    setCurrentStep('vehicle');
    setSelectedBrand('');
    setBrandSearchTerm('');
    setBrandDropdownOpen(false);
    reset();
  };

  // Success State
  if (formState.status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/95 backdrop-blur-lg border border-green-200 rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="mx-auto text-green-500" size={64} />
          </motion.div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">Anfrage erhalten!</h3>
            <p className="text-gray-600">{formState.message}</p>
            {formState.leadId && (
              <p className="text-sm text-gray-500">
                Referenz-ID: <span className="font-mono">{formState.leadId.slice(0, 8)}</span>
              </p>
            )}
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-green-700">
              <Clock size={16} />
              <span className="text-sm font-semibold">Nächste Schritte:</span>
            </div>
            <ul className="mt-2 text-sm text-green-600 space-y-1">
              <li>• Prüfung Ihrer Angaben (2-4 Stunden)</li>
              <li>• Anruf unseres Experten (innerhalb 24h)</li>
              <li>• Individuelle Bewertung & Angebot</li>
            </ul>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetForm}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200"
          >
            Neue Anfrage starten
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
    >
      {/* Header mit Schritt-Anzeige */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          {currentStep === 'vehicle' ? (
            <Car className="text-white" size={28} />
          ) : (
            <User className="text-white" size={28} />
          )}
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentStep === 'vehicle' ? 'Fahrzeugdaten' : 'Kontaktdaten'}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4">
          {currentStep === 'vehicle' 
            ? 'Schritt 1 von 2: Geben Sie Ihre Fahrzeugdaten ein'
            : 'Schritt 2 von 2: Ihre Kontaktdaten für das Angebot'
          }
        </p>

        {/* Motivierender 30-Sekunden Text nur bei Fahrzeugdaten */}
        {currentStep === 'vehicle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4"
          >
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Clock size={16} className="text-green-600" />
              <span className="text-sm font-semibold">
                ⚡ In nur 30 Sekunden zur kostenlosen Bewertung!
              </span>
            </div>
            <p className="text-xs text-green-600 text-center mt-1">
              Schnell ausfüllen • Sofort Angebot erhalten • Kostenlos & unverbindlich
            </p>
          </motion.div>
        )}

        {/* Fortschrittsbalken */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
            animate={{ 
              width: currentStep === 'vehicle' ? '50%' : '100%'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="text-center">
          <Shield className="text-green-500 mx-auto mb-1" size={20} />
          <p className="text-xs text-gray-600">100% Sicher</p>
        </div>
        <div className="text-center">
          <Clock className="text-blue-500 mx-auto mb-1" size={20} />
          <p className="text-xs text-gray-600">24h Antwort</p>
        </div>
        <div className="text-center">
          <Star className="text-yellow-500 mx-auto mb-1" size={20} />
          <p className="text-xs text-gray-600">4.8/5 Sterne</p>
        </div>
      </div>

      {/* Error State */}
      {formState.status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle size={16} />
            <span className="text-sm font-semibold">Fehler:</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{formState.message}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot - Hidden field */}
        <input
          type="text"
          {...register('website')}
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
          tabIndex={-1}
          autoComplete="off"
        />

        <AnimatePresence mode="wait">
          {currentStep === 'vehicle' && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Fahrzeugdaten Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Car className="text-red-500" size={20} />
                  <h4 className="text-lg font-semibold text-gray-900">Fahrzeugdaten</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marke *
                    </label>
                    <div className="relative" ref={brandDropdownRef}>
                      {/* Hidden input für react-hook-form */}
                      <input
                        type="hidden"
                        {...register('brand', {
                          required: 'Marke ist erforderlich'
                        })}
                      />
                      
                      {/* Dropdown Button */}
                      <button
                        type="button"
                        onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-left flex items-center justify-between ${
                          errors.brand ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                      >
                        <span className={selectedBrand ? 'text-gray-900' : 'text-gray-500'}>
                          {selectedBrand || 'z.B. VW'}
                        </span>
                        <ChevronDown 
                          className={`transition-transform duration-200 ${
                            brandDropdownOpen ? 'transform rotate-180' : ''
                          }`} 
                          size={20} 
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {brandDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-hidden"
                          >
                            {/* Suchfeld */}
                            <div className="p-3 border-b border-gray-200">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                  type="text"
                                  placeholder="Marke suchen..."
                                  value={brandSearchTerm}
                                  onChange={(e) => setBrandSearchTerm(e.target.value)}
                                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 search-input"
                                  autoFocus
                                />
                              </div>
                            </div>
                            
                            {/* Marken Liste */}
                            <div className="max-h-48 overflow-y-auto">
                              {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand, index) => (
                                  <button
                                    key={brand}
                                    type="button"
                                    onClick={() => handleBrandSelect(brand)}
                                    className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors ${
                                      index < 10 ? 'font-semibold text-red-600' : 'text-gray-700'
                                    } ${
                                      selectedBrand === brand ? 'bg-red-100 text-red-700' : ''
                                    }`}
                                  >
                                    {brand}
                                    {index < 10 && (
                                      <span className="ml-2 text-xs text-red-500">Beliebt</span>
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-3 text-gray-500 text-center">
                                  Keine Marke gefunden
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {errors.brand && (
                      <p className="mt-1 text-xs text-red-600">{errors.brand.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modell *
                    </label>
                    <input
                      type="text"
                      {...register('model', {
                        required: 'Modell ist erforderlich',
                        minLength: { value: 1, message: 'Modell erforderlich' }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.model ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="z.B. 3er"
                    />
                    {errors.model && (
                      <p className="mt-1 text-xs text-red-600">{errors.model.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Baujahr *
                    </label>
                    <input
                      type="number"
                      {...register('year', {
                        required: 'Baujahr ist erforderlich',
                        min: { value: 1950, message: 'Jahr muss ab 1950 sein' },
                        max: { value: new Date().getFullYear() + 1, message: 'Ungültiges Jahr' }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.year ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="2020"
                    />
                    {errors.year && (
                      <p className="mt-1 text-xs text-red-600">{errors.year.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kilometer *
                    </label>
                    <input
                      type="number"
                      {...register('mileage', {
                        required: 'Kilometerstand ist erforderlich',
                        min: { value: 0, message: 'Muss 0 oder höher sein' },
                        max: { value: 2000000, message: 'Zu hoher Kilometerstand' }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.mileage ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="150000"
                    />
                    {errors.mileage && (
                      <p className="mt-1 text-xs text-red-600">{errors.mileage.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zustand *
                  </label>
                  <select
                    {...register('condition', { required: 'Bitte wählen Sie einen Zustand' })}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.condition ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                  >
                    <option value="">Fahrzeugzustand auswählen...</option>
                    {vehicleConditions.map((condition) => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                  {errors.condition && (
                    <p className="mt-1 text-xs text-red-600">{errors.condition.message}</p>
                  )}
                </div>
              </div>

              {/* Weiter Button */}
              <motion.button
                type="button"
                onClick={handleNextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Weiter zu den Kontaktdaten</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentStep === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Fahrzeug-Zusammenfassung */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-green-800 mb-2">Ihre Fahrzeugdaten:</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>Fahrzeug:</strong> {getValues('brand')} {getValues('model')}</p>
                  <p><strong>Baujahr:</strong> {getValues('year')}</p>
                  <p><strong>Kilometerstand:</strong> {getValues('mileage')?.toLocaleString('de-DE')} km</p>
                  <p><strong>Zustand:</strong> {vehicleConditions.find(c => c.value === getValues('condition'))?.label}</p>
                </div>
              </div>

              {/* Kontaktdaten Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="text-red-500" size={20} />
                  <h4 className="text-lg font-semibold text-gray-900">Kontaktdaten</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vollständiger Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', {
                      required: 'Name ist erforderlich',
                      minLength: { value: 2, message: 'Mindestens 2 Zeichen' }
                    })}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Max Mustermann"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'E-Mail ist erforderlich',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Ungültige E-Mail-Adresse'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="max@email.de"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Telefonnummer ist erforderlich',
                      pattern: {
                        value: /^[\+]?[\d\s\-\(\)]{10,}$/,
                        message: 'Ungültige Telefonnummer (min. 10 Zeichen)'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="0123 456789"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Datenschutz */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent', {
                      required: 'Zustimmung ist erforderlich'
                    })}
                    className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                    <a href="/datenschutz" target="_blank" className="text-red-600 hover:text-red-700 underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zu und willige in die Kontaktaufnahme ein.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-red-600">{errors.consent.message}</p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  type="button"
                  onClick={handlePrevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft size={20} />
                  <span>Zurück</span>
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={formState.status === 'loading'}
                  whileHover={{ scale: formState.status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: formState.status === 'loading' ? 1 : 0.98 }}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {formState.status === 'loading' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Wird übermittelt...</span>
                    </div>
                  ) : (
                    'Kostenlose Bewertung anfordern'
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Footer */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 SSL-verschlüsselt • 🚀 Antwort in 24h • 💰 100% kostenlos</p>
          <p>Über 2.500 zufriedene Kunden in Hattingen und Umgebung</p>
        </div>
      </form>
    </motion.div>
  );
};

export default QuickForm;