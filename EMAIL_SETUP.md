# E-Mail-Automatisierung mit Resend.com einrichten

## 🚀 Schnellstart

### 1. Resend.com Account erstellen
1. Gehen Sie zu [resend.com](https://resend.com)
2. Erstellen Sie einen kostenlosen Account
3. Verifizieren Sie Ihre E-Mail-Adresse

### 2. Domain hinzufügen (Empfohlen)
1. Loggen Sie sich in Resend ein
2. Gehen Sie zu "Domains" → "Add Domain"
3. Fügen Sie Ihre Domain hinzu (z.B. `sopiautomobile.de`)
4. Folgen Sie den DNS-Anweisungen zur Verifikation

### 3. API-Key erstellen
1. Gehen Sie zu "API Keys" in Resend
2. Klicken Sie "Create API Key"
3. Geben Sie einen Namen ein (z.B. "Sopi Automobile Leads")
4. Wählen Sie "Sending access"
5. Kopieren Sie den generierten API-Key

### 4. Umgebungsvariablen konfigurieren
1. Kopieren Sie `.env.local.example` zu `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Bearbeiten Sie `.env.local` und fügen Sie Ihre Werte ein:
   ```env
   # Resend API-Key (erforderlich)
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   # Absender-E-Mail (muss verifiziert sein)
   FROM_EMAIL=Sopi Automobile <noreply@sopiautomobile.de>

   # Empfänger für Unternehmens-Benachrichtigungen
   COMPANY_EMAIL=info@sopiautomobile.de

   # Optional: Weitere Empfänger (kommagetrennt)
   CC_EMAILS=manager@sopiautomobile.de,verkauf@sopiautomobile.de
   ```

## 📧 E-Mail-Funktionen

### Für Interessenten (Dankes-E-Mail)
- ✅ Persönliche Begrüßung mit Namen
- ✅ Zusammenfassung der eingereichten Fahrzeugdaten
- ✅ Nächste Schritte und Erwartungen
- ✅ Kontaktinformationen
- ✅ Professionelles Branding
- ✅ Responsive HTML-Design

### Für das Unternehmen (Benachrichtigung)
- ✅ Sofortige Benachrichtigung über neue Anfrage
- ✅ Vollständige Fahrzeug- und Kontaktdaten
- ✅ Direkte Kontakt-Buttons (Anrufen/E-Mail)
- ✅ Prioritätsbewertung basierend auf Fahrzeugzustand
- ✅ Meta-Informationen (IP, User-Agent, etc.)
- ✅ Lead-ID für Tracking

## 🔧 Erweiterte Konfiguration

### Domain-Verifikation
Für professionelle E-Mails sollten Sie Ihre eigene Domain verwenden:

1. **DNS-Records hinzufügen:**
   ```
   TXT _resend.sopiautomobile.de "resend-verify=xxxxxx"
   CNAME resend.sopiautomobile.de "resend.cname.target"
   ```

2. **E-Mail-Adressen aktualisieren:**
   ```env
   FROM_EMAIL=Sopi Automobile <noreply@sopiautomobile.de>
   COMPANY_EMAIL=leads@sopiautomobile.de
   ```

### Mehrere Benachrichtigungs-Empfänger
```env
CC_EMAILS=verkauf@sopiautomobile.de,manager@sopiautomobile.de,buchhaltung@sopiautomobile.de
```

### Webhook-Integration (Optional)
Für zusätzliche Integrationen (CRM, Analytics, etc.):
```env
WEBHOOK_URL=https://your-crm.com/api/leads
WEBHOOK_SECRET=your_webhook_secret
```

## 🔍 Testen

### Lokaler Test
1. Starten Sie den Entwicklungsserver:
   ```bash
   npm run dev
   ```

2. Öffnen Sie `http://localhost:3000`
3. Füllen Sie das Formular aus
4. Überprüfen Sie die Konsole auf E-Mail-Logs

### Produktions-Test
1. Deployen Sie die Anwendung
2. Testen Sie mit echten E-Mail-Adressen
3. Überprüfen Sie Spam-Ordner bei ersten Tests

## 📊 Monitoring

### Resend Dashboard
- Sehen Sie E-Mail-Statistiken in Resend
- Verfolgen Sie Zustellungsraten
- Überwachen Sie Bounce-Raten

### Logs überprüfen
```bash
# Entwicklung
npm run dev

# Produktion (Vercel, etc.)
# Überprüfen Sie die Serverless-Function-Logs
```

## 🚨 Troubleshooting

### Häufige Probleme

1. **E-Mails kommen nicht an:**
   - Überprüfen Sie RESEND_API_KEY
   - Verifizieren Sie FROM_EMAIL in Resend
   - Prüfen Sie Spam-Ordner

2. **Domain nicht verifiziert:**
   - Fügen Sie DNS-Records hinzu
   - Warten Sie auf Propagation (bis zu 48h)

3. **Rate Limits:**
   - Kostenloser Account: 100 E-Mails/Tag
   - Upgrade für höhere Limits

### Debug-Logs
Die API protokolliert alle E-Mail-Operationen:
```
Customer email sent: abc123
Company email sent: def456
```

## 💰 Kosten

### Resend Preise (Stand 2024)
- **Kostenlos:** 3.000 E-Mails/Monat
- **Pro:** $20/Monat für 50.000 E-Mails
- **Business:** Individuelle Preise

### Empfehlung
Für Sopi Automobile reicht der kostenlose Plan für die ersten Tests. Bei mehr als 100 Leads/Tag sollten Sie upgraden.

## 🔐 Sicherheit

### API-Key Sicherheit
- Niemals API-Keys in Git committen
- Verwenden Sie `.env.local` für lokale Entwicklung
- Für Produktion: Umgebungsvariablen in Hosting-Platform

### E-Mail-Sicherheit
- SPF, DKIM, DMARC werden automatisch von Resend konfiguriert
- Domain-Verifikation verhindert Spoofing
- HTTPS-Verschlüsselung für alle API-Calls

## 📞 Support

Bei Problemen:
1. Überprüfen Sie diese Anleitung
2. Konsultieren Sie [Resend Dokumentation](https://resend.com/docs)
3. Kontaktieren Sie den Entwickler

## ✅ Checkliste

- [ ] Resend Account erstellt
- [ ] Domain hinzugefügt und verifiziert
- [ ] API-Key generiert
- [ ] `.env.local` konfiguriert
- [ ] Lokaler Test erfolgreich
- [ ] E-Mail-Templates angepasst (optional)
- [ ] Produktions-Deployment getestet