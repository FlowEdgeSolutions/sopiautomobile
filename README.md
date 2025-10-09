# Sopi Automobile - Fahrzeugankauf Website

Eine moderne Next.js Website für Sopi Automobile in Hattingen - spezialisiert auf den Ankauf von Fahrzeugen mit Schäden.

## 🚗 Features

- **Responsive Design** - Optimiert für alle Geräte
- **Lead-Generierung** - Intelligentes Kontaktformular mit Fahrzeugdaten
- **E-Mail-Automatisierung** - Automatische Bestätigungen via Resend.com
- **SEO-optimiert** - Vollständige Meta-Tags und strukturierte Daten
- **Moderne UI** - Tailwind CSS mit Framer Motion Animationen

## 🛠️ Technologie-Stack

- **Framework**: Next.js 15 mit Turbopack
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Formulare**: React Hook Form
- **Icons**: Lucide React
- **E-Mail**: Resend.com
- **Hosting**: Vercel

## 🚀 Installation

1. Repository klonen:
   ```bash
   git clone https://github.com/IHR_USERNAME/sopiautomobile-website.git
   cd sopiautomobile-website
   ```

2. Dependencies installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen konfigurieren:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fügen Sie Ihre Resend API-Keys in `.env.local` ein.

4. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

## 📧 E-Mail-Konfiguration

Die Website nutzt Resend.com für automatische E-Mails:

1. Erstellen Sie einen Account bei [resend.com](https://resend.com)
2. Generieren Sie einen API-Key
3. Konfigurieren Sie die Umgebungsvariablen in `.env.local`

Detaillierte Anleitung: siehe `EMAIL_SETUP.md`

## 🌐 Deployment

### Vercel (Empfohlen)
1. Verbinden Sie Ihr GitHub Repository mit Vercel
2. Konfigurieren Sie die Umgebungsvariablen in Vercel
3. Deploy erfolgt automatisch bei Git Push

### Andere Anbieter
Das Projekt kann auch auf anderen Next.js-kompatiblen Hosting-Anbietern deployed werden.

## 📱 Funktionen

### Kontaktformular
- **Marken-Dropdown** mit Suchfunktion
- **Fahrzeugdaten** erfassen (Marke, Modell, Jahr, KM, Zustand)
- **Kontaktdaten** mit Validierung
- **Spam-Schutz** mit Honeypot

### E-Mail-Automatisierung
- **Kundenbestätigung** mit Zusammenfassung der Angaben
- **Unternehmensbenachrichtigung** mit Lead-Details
- **Responsive HTML-Templates**

### SEO & Performance
- **Optimierte Meta-Tags**
- **Strukturierte Daten**
- **Core Web Vitals** optimiert
- **Responsive Images**

## 📞 Kontakt

**Sopi Automobile**
- Telefon: 02324 123456
- E-Mail: verkauf@sopiautomobile.de.de
- Adresse: Musterstraße 123, 45525 Hattingen

## 📄 Lizenz

© 2024 Sopi Automobile. Alle Rechte vorbehalten.