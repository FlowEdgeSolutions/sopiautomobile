'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Accessibility, Volume2, VolumeX, Type, Eye } from 'lucide-react';

const NavigationFeatures: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Scroll-to-Top Visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to Top Funktion
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Accessibility Features
  const adjustFontSize = (increase: boolean) => {
    const newSize = increase 
      ? Math.min(fontSize + 10, 150) 
      : Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast', !highContrast);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      // Einfache Text-to-Speech Implementation
      const utterance = new SpeechSynthesisUtterance(
        'Sprachausgabe aktiviert. Fahren Sie mit der Maus über Texte, um sie vorlesen zu lassen.'
      );
      utterance.lang = 'de-DE';
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  };

  const resetAccessibility = () => {
    setFontSize(100);
    setHighContrast(false);
    setVoiceEnabled(false);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast');
    speechSynthesis.cancel();
  };

  return (
    <>
      {/* High Contrast CSS */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%) brightness(90%);
        }
        .high-contrast * {
          color: #000 !important;
          background-color: #fff !important;
          border-color: #000 !important;
        }
        .high-contrast a,
        .high-contrast button {
          color: #0066cc !important;
          text-decoration: underline !important;
        }
      `}</style>

      {/* Fixed Navigation Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        {/* Accessibility Panel */}
        <AnimatePresence>
          {accessibilityOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-4 mb-2 w-72"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">Barrierefreiheit</h3>
                <button
                  onClick={() => setAccessibilityOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3">
                {/* Schriftgröße */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 flex items-center">
                    <Type size={16} className="mr-2" />
                    Schriftgröße
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => adjustFontSize(false)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold"
                    >
                      A-
                    </button>
                    <span className="text-xs w-12 text-center">{fontSize}%</span>
                    <button
                      onClick={() => adjustFontSize(true)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Hoher Kontrast */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 flex items-center">
                    <Eye size={16} className="mr-2" />
                    Hoher Kontrast
                  </span>
                  <button
                    onClick={toggleHighContrast}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      highContrast ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        highContrast ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Sprachausgabe */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 flex items-center">
                    {voiceEnabled ? <Volume2 size={16} className="mr-2" /> : <VolumeX size={16} className="mr-2" />}
                    Sprachausgabe
                  </span>
                  <button
                    onClick={toggleVoice}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      voiceEnabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetAccessibility}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Zurücksetzen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessibility Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAccessibilityOpen(!accessibilityOpen)}
          className={`w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
            accessibilityOpen ? 'bg-blue-600' : ''
          }`}
          aria-label="Barrierefreiheits-Optionen"
        >
          <Accessibility size={24} />
        </motion.button>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
              aria-label="Nach oben scrollen"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavigationFeatures;