# 🚀 Push-Benachrichtigungen - Quick Start (5 Minuten!)

## 📱 Telegram-Benachrichtigungen einrichten

Die **schnellste und einfachste** Methode, um iPhone-Benachrichtigungen zu erhalten!

---

## ⚡ Setup in 3 Schritten

### 1️⃣ Telegram Bot erstellen (2 Minuten)

1. Öffne **Telegram** auf deinem iPhone
2. Suche nach: `@BotFather`
3. Starte den Chat und sende:
   ```
   /newbot
   ```
4. Bot-Name eingeben:
   ```
   Sopi Automobile Admin
   ```
5. Bot-Username eingeben (muss eindeutig sein):
   ```
   sopiautomobile_admin_bot
   ```
6. Du erhältst einen **Token** - kopiere ihn!
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

### 2️⃣ Chat-ID holen (1 Minute)

1. Starte einen Chat mit deinem neuen Bot
2. Sende ihm eine Nachricht: `/start`
3. Öffne im Browser:
   ```
   https://api.telegram.org/bot<DEIN_TOKEN>/getUpdates
   ```
   (Ersetze `<DEIN_TOKEN>` mit deinem Token aus Schritt 1)

4. Du siehst JSON-Output - suche nach `"chat":{"id":123456789`
5. Die Zahl nach `"id":` ist deine **Chat-ID** - kopiere sie!

### 3️⃣ Environment Variables setzen (1 Minute)

Öffne `.env.local` und füge am Ende hinzu:

```env
# Telegram Push-Benachrichtigungen
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

(Ersetze mit deinen echten Werten!)

---

## ✅ Testen

### Methode 1: Test-API aufrufen

```bash
curl -X POST http://localhost:3000/api/test-push
```

### Methode 2: Echte Lead-Anfrage

1. Starte den Dev-Server:
   ```bash
   npm run dev
   ```

2. Öffne http://localhost:3000

3. Fülle das Kontaktformular aus

4. Du erhältst eine schöne Telegram-Nachricht! 📱

---

## 🎯 Beispiel-Benachrichtigung

Du erhältst Nachrichten wie diese:

```
🚗 Neue Lead-Anfrage!

👤 Kunde: Max Mustermann
🚙 Fahrzeug: BMW 320d Touring
📞 Telefon: +49 176 12345678
🆔 Lead-ID: abc-123-xyz
⏰ Zeit: 20.01.2025, 14:35

[Zum Admin-Panel](https://sopiautomobile.de/admin)
```

---

## 🔔 Benachrichtigungen anpassen

Bearbeite `src/lib/push-notification.ts` → Funktion `sendTelegramNotification`:

```typescript
const message = `
🚗 *Neue Lead-Anfrage!*

👤 *Kunde:* ${data.customerName}
🚙 *Fahrzeug:* ${data.vehicleBrand} ${data.vehicleModel}
📞 *Telefon:* ${data.phone}
🆔 *Lead-ID:* ${data.leadId}
⏰ *Zeit:* ${new Date(data.timestamp).toLocaleString('de-DE')}

💡 *Deine eigene Nachricht hier!*

[Zum Admin-Panel](https://sopiautomobile.de/admin)
`.trim();
```

---

## 🚀 Deployment auf Vercel

1. Füge Environment Variables in Vercel hinzu:
   - Vercel Dashboard → Settings → Environment Variables
   - Füge hinzu:
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHAT_ID`

2. Re-deploy:
   ```bash
   git add .
   git commit -m "Add push notifications"
   git push
   ```

---

## 🎉 Fertig!

Du erhältst jetzt bei jeder neuen Lead-Anfrage sofort eine **Telegram-Nachricht** auf deinem iPhone!

### Vorteile
- ✅ Komplett kostenlos
- ✅ Keine zusätzliche App nötig
- ✅ Funktioniert sofort
- ✅ Zuverlässig
- ✅ Auf allen Geräten (iPhone, Android, Desktop)

---

## 🔧 Troubleshooting

### Keine Benachrichtigungen?

**1. Token überprüfen:**
```bash
curl https://api.telegram.org/bot<DEIN_TOKEN>/getMe
```
Sollte deinen Bot-Namen zurückgeben.

**2. Chat-ID überprüfen:**
```bash
curl https://api.telegram.org/bot<DEIN_TOKEN>/getUpdates
```
Deine Chat-ID sollte dort erscheinen.

**3. Test-Nachricht senden:**
```bash
curl -X POST "https://api.telegram.org/bot<DEIN_TOKEN>/sendMessage" \
  -d "chat_id=<DEINE_CHAT_ID>" \
  -d "text=Test"
```

**4. Logs überprüfen:**
```bash
# Lokal
npm run dev
# Schau in die Console

# Vercel
Vercel Dashboard → Functions → Logs
```

---

## 📈 Erweiterte Optionen

Für mehr Features siehe: **[PUSH_NOTIFICATIONS_SETUP.md](./PUSH_NOTIFICATIONS_SETUP.md)**

- **OneSignal**: Web Push (professioneller)
- **Firebase**: Für eigene iOS-App (später)

---

## 💡 Tipps

1. **Mehrere Empfänger**: Erstelle Telegram-Gruppe, füge Bot hinzu, nutze Gruppen-Chat-ID

2. **Benachrichtigungen stumm schalten**: Telegram → Bot → Benachrichtigungen anpassen

3. **Bot-Befehle hinzufügen**: Erweitere die Funktionalität mit eigenen Commands

---

**Viel Erfolg! 🎉**

Bei Fragen oder Problemen: Siehe Logs oder die ausführliche Anleitung in `PUSH_NOTIFICATIONS_SETUP.md`
