# 📱 Push-Benachrichtigungen für iPhone - Setup-Anleitung

## 🎯 Übersicht

Dieses Dokument beschreibt die Implementierung von Push-Benachrichtigungen für neue Lead-Anfragen auf deinem iPhone. Es gibt **3 verschiedene Optionen**, sortiert nach Aufwand und Kosten.

---

## ✅ OPTION 1: OneSignal (EMPFOHLEN)

### Vorteile
- ✅ **Kostenlos** bis 10.000 Abonnenten/Monat
- ✅ **Keine iOS-App erforderlich** (Web Push)
- ✅ Funktioniert auf Safari iOS 16.4+
- ✅ DSGVO-konform (EU-Server verfügbar)
- ✅ Dashboard für Verwaltung
- ✅ Support für mehrere Plattformen

### Kosten
- **FREE Plan**: 0€ (bis 10.000 Subscribers)
- **Growth Plan**: 9$/Monat (ab 10.001 Subscribers)

---

## 🚀 OneSignal Setup (Schritt für Schritt)

### Schritt 1: OneSignal Account erstellen

1. Gehe zu: https://onesignal.com
2. Klicke auf **"Start Free"**
3. Registriere dich mit deiner E-Mail
4. Bestätige deine E-Mail-Adresse

### Schritt 2: Neue App erstellen

1. Im Dashboard: **"New App/Website"** klicken
2. App-Name: `Sopi Automobile Admin`
3. Plattform wählen: **"Web"**
4. Konfiguration:
   - **Site Name**: `Sopi Automobile`
   - **Site URL**: `https://sopiautomobile.de`
   - **Auto Resubscribe**: ON
   - **Default Notification Icon**: Logo hochladen

### Schritt 3: Credentials holen

1. In OneSignal Dashboard → **Settings** → **Keys & IDs**
2. Notiere:
   - **App ID** (z.B. `abc123-def456-ghi789`)
   - **REST API Key** (z.B. `OS-abc...xyz`)

### Schritt 4: Player ID (User ID) holen

**Methode A: Über Browser (einfacher)**
1. Öffne https://sopiautomobile.de auf deinem iPhone (Safari)
2. Erlaube Push-Benachrichtigungen wenn gefragt
3. Öffne Safari → Entwickler-Tools → Console
4. Führe aus: `OneSignal.getUserId().then(id => console.log(id))`
5. Kopiere die ID (z.B. `player123-abc456-xyz789`)

**Methode B: Über OneSignal Dashboard**
1. OneSignal Dashboard → **Audience** → **All Users**
2. Dein Gerät sollte dort erscheinen
3. Klicke drauf → kopiere die **Player ID**

### Schritt 5: Umgebungsvariablen konfigurieren

Öffne `.env.local` und füge hinzu:

```env
# OneSignal Push-Benachrichtigungen
ONESIGNAL_APP_ID=deine_app_id_hier
ONESIGNAL_API_KEY=dein_rest_api_key_hier
ONESIGNAL_USER_ID=deine_player_id_hier
```

### Schritt 6: Dependencies installieren

```bash
npm install
```

(Keine zusätzlichen Pakete erforderlich - nutzt natives `fetch`)

### Schritt 7: OneSignal SDK auf Website integrieren

Füge in `src/app/layout.tsx` im `<head>` hinzu:

```tsx
{/* OneSignal Web Push */}
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" defer></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
        safari_web_id: "web.onesignal.auto.your-safari-web-id",
        notifyButton: {
          enable: false,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });
  `
}} />
```

**WICHTIG**: Erstelle auch `NEXT_PUBLIC_ONESIGNAL_APP_ID` in `.env.local`:
```env
NEXT_PUBLIC_ONESIGNAL_APP_ID=deine_app_id_hier
```

### Schritt 8: Testen

1. Starte den Dev-Server:
   ```bash
   npm run dev
   ```

2. Öffne das Kontaktformular auf der Website

3. Sende eine Test-Anfrage

4. Du solltest eine Push-Benachrichtigung auf deinem iPhone erhalten!

### Schritt 9: Vercel Deployment

Füge die Environment Variables in Vercel hinzu:

1. Vercel Dashboard → Dein Projekt → **Settings** → **Environment Variables**
2. Füge hinzu:
   - `ONESIGNAL_APP_ID`
   - `ONESIGNAL_API_KEY`
   - `ONESIGNAL_USER_ID`
   - `NEXT_PUBLIC_ONESIGNAL_APP_ID`

3. Re-deploy:
   ```bash
   git push
   ```

---

## 🔥 OPTION 2: Firebase Cloud Messaging (FCM)

### Vorteile
- ✅ **Kostenlos** (unbegrenzt)
- ✅ Google-Infrastruktur
- ✅ Zuverlässig und skalierbar
- ❌ **Erfordert native iOS-App** (komplexer)

### Nachteile
- ❌ Aufwendiger (iOS-App entwickeln erforderlich)
- ❌ Apple Developer Account nötig (99€/Jahr)
- ❌ App Store Veröffentlichung

### Setup (Kurzversion)

1. **Firebase Projekt erstellen**: https://console.firebase.google.com
2. **iOS-App hinzufügen**: Bundle ID registrieren
3. **APNs Certificate hochladen**: In Firebase Console
4. **Server Key holen**: Firebase → Project Settings → Cloud Messaging
5. **iOS-App entwickeln**: Swift/React Native/Flutter
6. **Device Token holen**: In der App nach Registration

```env
# Firebase Push-Benachrichtigungen
FIREBASE_SERVER_KEY=dein_server_key_hier
FIREBASE_DEVICE_TOKEN=dein_device_token_hier
```

**Aufwand**: 40-80 Stunden Entwicklung (iOS-App)

---

## 📲 OPTION 3: Telegram Bot (Einfachste Alternative!)

### Vorteile
- ✅ **Komplett kostenlos**
- ✅ **Extrem einfach** (5 Minuten Setup)
- ✅ Keine zusätzliche App nötig (Telegram bereits installiert)
- ✅ Sofort einsatzbereit
- ✅ Funktioniert auf allen Geräten

### Setup (5 Minuten!)

#### Schritt 1: Telegram Bot erstellen

1. Öffne Telegram auf deinem iPhone
2. Suche nach: **@BotFather**
3. Starte Chat und sende: `/newbot`
4. Bot-Name: `Sopi Automobile Admin`
5. Bot-Username: `sopiautomobile_admin_bot` (muss unique sein)
6. Du erhältst einen **Token** (z.B. `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

#### Schritt 2: Chat ID holen

1. Starte Chat mit deinem neuen Bot
2. Sende eine Nachricht: `/start`
3. Öffne im Browser: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   (Ersetze `<TOKEN>` mit deinem Bot-Token)
4. Suche nach `"chat":{"id":123456789` - das ist deine **Chat ID**

#### Schritt 3: Umgebungsvariablen setzen

```env
# Telegram Push-Benachrichtigungen
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

#### Schritt 4: Fertig!

Beim nächsten Lead erhältst du eine schöne formatierte Telegram-Nachricht! 🎉

---

## 🔧 Integration in Admin-Bereich

### Optional: Push-Button im Admin-Panel

Erstelle `src/components/PushTestButton.tsx`:

```tsx
'use client';

export default function PushTestButton() {
  const testPush = async () => {
    const response = await fetch('/api/test-push', {
      method: 'POST',
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <button
      onClick={testPush}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      🔔 Test Push-Benachrichtigung
    </button>
  );
}
```

Erstelle Test-API: `src/app/api/test-push/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { sendPushNotifications } from '@/lib/push-notification';

export async function POST() {
  try {
    await sendPushNotifications({
      leadId: 'TEST-123',
      customerName: 'Max Mustermann',
      vehicleBrand: 'BMW',
      vehicleModel: '320d',
      phone: '+49 176 12345678',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Test-Benachrichtigung gesendet!'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Fehler beim Senden'
    }, { status: 500 });
  }
}
```

---

## 📊 Vergleich der Optionen

| Feature | OneSignal | Firebase | Telegram |
|---------|-----------|----------|----------|
| **Kosten** | Kostenlos (bis 10k) | Kostenlos | Kostenlos |
| **Setup-Zeit** | 30 Min | 40-80 Std | 5 Min |
| **iOS-App nötig** | ❌ Nein | ✅ Ja | ❌ Nein |
| **Apple Developer** | ❌ Nein | ✅ Ja (99€) | ❌ Nein |
| **DSGVO** | ✅ Ja | ⚠️ Komplex | ⚠️ Russland |
| **Professionalität** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Zuverlässigkeit** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎯 Empfehlung

### Für sofortigen Start: **Telegram** (5 Minuten)
→ Schnell, einfach, kostenlos - perfekt zum Testen

### Für professionelle Lösung: **OneSignal** (30 Minuten)
→ Beste Balance aus Einfachheit, Kosten und Features

### Für Enterprise: **Firebase** (später)
→ Wenn du später eine eigene iOS-App entwickelst

---

## 🧪 Testing & Debugging

### OneSignal Test

```bash
curl -X POST https://onesignal.com/api/v1/notifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic YOUR_API_KEY" \
  -d '{
    "app_id": "YOUR_APP_ID",
    "include_player_ids": ["YOUR_PLAYER_ID"],
    "contents": {"en": "Test Notification"}
  }'
```

### Telegram Test

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -d "chat_id=<CHAT_ID>" \
  -d "text=Test Nachricht"
```

### Logs überprüfen

Im Vercel Dashboard → Dein Projekt → **Functions** → Logs

---

## 🔒 Sicherheit & Datenschutz

### Best Practices

1. **Niemals sensible Daten in Push-Notifications**
   - ❌ Keine vollständigen Namen
   - ❌ Keine E-Mail-Adressen
   - ❌ Keine Adressen
   - ✅ Nur Lead-ID und Fahrzeugtyp

2. **Verschlüsselte Verbindungen**
   - Alle Dienste nutzen HTTPS/TLS

3. **Environment Variables**
   - Niemals API-Keys in Git committen
   - Nutze `.env.local` (bereits in `.gitignore`)

4. **DSGVO-Compliance**
   - OneSignal: EU-Server aktivieren
   - Firebase: Google Cloud Region `europe-west3`
   - Telegram: Datenschutzerklärung anpassen

---

## 📞 Support & Troubleshooting

### OneSignal funktioniert nicht?

1. **Browser Console** öffnen (Safari → Entwickler → Console)
2. Nach Fehlern suchen
3. OneSignal Dashboard → **Delivery** → Check Status
4. Safari Einstellungen → **Websites** → Push-Benachrichtigungen prüfen

### Telegram funktioniert nicht?

1. Bot-Token korrekt?
   ```bash
   curl https://api.telegram.org/bot<TOKEN>/getMe
   ```
2. Chat-ID korrekt?
3. Bot wurde gestartet? (Sende `/start` an Bot)

### Firebase funktioniert nicht?

1. Device Token aktuell?
2. APNs Certificate gültig?
3. Server Key korrekt?

---

## 🚀 Nächste Schritte

1. **Wähle eine Option** (Empfehlung: OneSignal oder Telegram)
2. **Folge der Setup-Anleitung** oben
3. **Teste mit Test-API** (`/api/test-push`)
4. **Führe echten Test** durch (Kontaktformular ausfüllen)
5. **Feinjustierung** (Benachrichtigungstext, Icons, etc.)

---

## 📝 Changelog

- **2025-01-20**: Initial Setup-Dokumentation
- Push-Benachrichtigungen implementiert (OneSignal, Firebase, Telegram)
- Integration in Lead-API

---

## 🤝 Hilfe benötigt?

Bei Fragen oder Problemen:
1. Überprüfe die Logs in Vercel
2. Teste die API mit Postman/curl
3. Kontaktiere mich für weitere Unterstützung

---

**Viel Erfolg! 🎉**
