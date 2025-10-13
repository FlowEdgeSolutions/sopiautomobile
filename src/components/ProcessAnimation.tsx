'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, CheckCircle, ArrowRight } from 'lucide-react';

interface ProcessStep {
  id: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
  details: string[];
}

const ProcessAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: ProcessStep[] = [
    {
      id: 1,
      icon: FileText,
      title: "Daten eingeben",
      description: "Fahrzeugdaten in 30 Sekunden erfassen",
      color: "from-blue-400 to-blue-600",
      details: [
        "Marke & Modell angeben",
        "Baujahr & Kilometerstand",
        "Zustand beschreiben"
      ]
    },
    {
      id: 2,
      icon: Search,
      title: "Bewertung",
      description: "Professionelle Analyse durch Experten",
      color: "from-amber-400 to-orange-600",
      details: [
        "Marktpreis-Analyse",
        "Schaden-Bewertung",
        "Restwert-Berechnung"
      ]
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Angebot",
      description: "Faires Angebot binnen 15-30 Min erhalten",
      color: "from-green-400 to-green-600",
      details: [
        "Individuelles Angebot",
        "Transparente Kalkulation",
        "Kostenlose Abholung"
      ]
    }
  ];

  // Automatischer Schritt-Wechsel - läuft kontinuierlich
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [steps.length]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    // Entfernt: setIsPlaying(false) - Animation läuft weiter
  };

  // Entfernt: togglePlayPause Funktion - nicht mehr benötigt

  return (
    <div className="relative">
      {/* Überschrift */}
      <div className="text-center mb-8">
        <motion.h3 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          So einfach geht&apos;s
        </motion.h3>
        <p className="text-gray-600">
          In nur 3 Schritten zu Ihrem fairen Angebot
        </p>
      </div>

      {/* Schritt-Kreise mit Animationen */}
      <div className="flex items-center justify-between space-x-4 mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Animierter Schritt-Kreis */}
            <motion.div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleStepClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: currentStep === index ? 1.1 : 1,
                  rotate: currentStep === index ? [0, 10, -10, 0] : 0
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { duration: 0.6, repeat: currentStep === index ? Infinity : 0, repeatDelay: 2 }
                }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.color} shadow-lg relative overflow-hidden`}
              >
                {/* Glanz-Effekt */}
                <motion.div
                  animate={{
                    x: currentStep === index ? ['-100%', '100%'] : '-100%',
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: currentStep === index ? Infinity : 0,
                    repeatDelay: 3
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                
                <step.icon className="text-white relative z-10" size={24} />
                
                {/* Aktiver Indikator */}
                {currentStep === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                  />
                )}
              </motion.div>
              
              {/* Schritt-Nummer */}
              <motion.div
                animate={{
                  scale: currentStep === index ? 1.1 : 1,
                  color: currentStep === index ? '#DC2626' : '#6B7280'
                }}
                className="mt-2 text-sm font-bold"
              >
                {step.id}
              </motion.div>
            </motion.div>
            
            {/* Verbindungslinien zwischen Schritten */}
            {index < steps.length - 1 && (
              <motion.div className="flex-1 flex items-center justify-center">
                <motion.div
                  animate={{
                    scaleX: currentStep > index ? 1 : 0.7,
                    opacity: currentStep > index ? 1 : 0.5
                  }}
                  className="w-full h-1 bg-gradient-to-r from-gray-300 to-blue-400 rounded-full origin-left"
                />
                <ArrowRight 
                  className={`text-blue-500 ml-2 ${currentStep > index ? 'opacity-100' : 'opacity-50'}`} 
                  size={16} 
                />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Schritt-Beschreibung mit Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h4>
          <p className="text-gray-600 mb-4">
            {steps[currentStep].description}
          </p>
          
          {/* Details-Liste */}
          <div className="bg-gray-50 rounded-xl p-4">
            <ul className="space-y-2">
              {steps[currentStep].details.map((detail, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-sm text-gray-700"
                >
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Fortschrittsbalken */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-green-500 rounded-full"
            animate={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Steuerung - Entfernt, da Animation kontinuierlich läuft */}
      <div className="flex items-center justify-center space-x-4">
      </div>

      {/* Zeitangaben */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">30 Sek</div>
            <div className="text-xs text-gray-600">Erfassung</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">4 Std</div>
            <div className="text-xs text-gray-600">Bewertung</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">24 Std</div>
            <div className="text-xs text-gray-600">Angebot</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessAnimation;