# MongoDB Atlas Setup für Sopi Automobile

Diese Anleitung hilft Ihnen, MongoDB Atlas einzurichten und Ihre Anwendung für Vercel Deployment vorzubereiten.

## 📋 Übersicht

MongoDB Atlas ist eine vollständig verwaltete Cloud-Datenbank, die perfekt für Serverless-Deployments wie Vercel geeignet ist.

---

## 🚀 Schritt 1: MongoDB Atlas Account erstellen

1. Besuchen Sie [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Erstellen Sie einen kostenlosen Account
3. Bestätigen Sie Ihre E-Mail-Adresse

---

## 🗄️ Schritt 2: Cluster erstellen

### 2.1 Cluster-Erstellung starten

1. Nach dem Login klicken Sie auf **"Build a Database"** oder **"Create"**
2. Wählen Sie **"M0 FREE"** (ausreichend für den Anfang)
   - 512 MB Speicher
   - Shared RAM
   - Kostenlos für immer

### 2.2 Cluster-Konfiguration

1. **Cloud Provider**: AWS (empfohlen für Vercel)
2. **Region**: Wählen Sie die nächstgelegene Region zu Ihren Nutzern
   - Für Deutschland: `eu-central-1` (Frankfurt)
   - Für Europa generell: `eu-west-1` (Irland)
3. **Cluster Name**: `SopiAutomobile` (oder beliebig)
4. Klicken Sie auf **"Create"**

⏱️ **Wartezeit**: 1-3 Minuten für Cluster-Erstellung

---

## 🔐 Schritt 3: Datenbank-Benutzer erstellen

1. Navigieren Sie zu **"Database Access"** (linkes Menü unter "Security")
2. Klicken Sie auf **"Add New Database User"**
3. Wählen Sie **"Password"** als Authentication Method
4. Konfigurieren Sie den Benutzer:
   ```
   Username: sopiautomobile-admin
   Password: [Generieren Sie ein sicheres Passwort]
   ```
   💡 **Tipp**: Klicken Sie auf "Autogenerate Secure Password" und speichern Sie es sicher!

5. **Database User Privileges**: Wählen Sie **"Read and write to any database"**
6. Klicken Sie auf **"Add User"**

⚠️ **WICHTIG**: Speichern Sie Username und Passwort - Sie benötigen diese für den Connection String!

---

## 🌐 Schritt 4: Netzwerkzugriff konfigurieren

1. Navigieren Sie zu **"Network Access"** (linkes Menü unter "Security")
2. Klicken Sie auf **"Add IP Address"**
3. Für Vercel Deployment:
   - Klicken Sie auf **"Allow Access from Anywhere"**
   - IP: `0.0.0.0/0`
   - Beschreibung: `Vercel Deployment`
   
   ⚠️ **Hinweis**: Dies ist für Serverless-Deployments notwendig, da Vercel dynamische IPs verwendet

4. Klicken Sie auf **"Confirm"**

---

## 🔗 Schritt 5: Connection String abrufen

1. Gehen Sie zurück zu **"Database"** (linkes Menü)
2. Bei Ihrem Cluster klicken Sie auf **"Connect"**
3. Wählen Sie **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. Kopieren Sie den **Connection String**:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 5.1 Connection String anpassen

Ersetzen Sie die Platzhalter:

- `<username>` → Ihr Datenbank-Username (z.B. `sopiautomobile-admin`)
- `<password>` → Ihr Datenbank-Passwort

**Beispiel**:
```
mongodb+srv://sopiautomobile-admin:MeinSicheresPasswort123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

⚠️ **WICHTIG**: 
- Keine `<` `>` Zeichen im finalen String!
- Sonderzeichen im Passwort müssen URL-encoded sein:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

---

## ⚙️ Schritt 6: Lokale Konfiguration

### 6.1 `.env.local` aktualisieren

Öffnen Sie `.env.local` und fügen Sie Ihren MongoDB Connection String ein:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://sopiautomobile-admin:MeinSicheresPasswort123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

### 6.2 Testen der Verbindung

```bash
npm run dev
```

Besuchen Sie Ihr Formular und testen Sie einen Lead-Eintrag. Prüfen Sie die Konsole auf erfolgreiche Datenbankverbindung:

```
✅ Connected to MongoDB
✅ Lead saved to database successfully
```

---

## 🚢 Schritt 7: Vercel Deployment vorbereiten

### 7.1 Vercel Dashboard öffnen

1. Gehen Sie zu [Vercel Dashboard](https://vercel.com/dashboard)
2. Wählen Sie Ihr Projekt aus

### 7.2 Umgebungsvariablen hinzufügen

1. Navigieren Sie zu **Settings** → **Environment Variables**
2. Fügen Sie folgende Variablen hinzu:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | Ihr Connection String | Production, Preview, Development |
| `RESEND_API_KEY` | Ihr Resend API Key | Production, Preview, Development |
| `FROM_EMAIL` | `Sopi Automobile <noreply@sopiautomobile.de>` | Production, Preview, Development |
| `COMPANY_EMAIL` | `verkauf@sopiautomobile.de` | Production, Preview, Development |
| `ADMIN_USERNAME` | `admin` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `Sopi2024!Secure` | Production, Preview, Development |

⚠️ **WICHTIG**: Klicken Sie bei jeder Variable auf alle drei Environments (Production, Preview, Development)!

### 7.3 Deploy

```bash
git add .
git commit -m "Migration zu MongoDB für Vercel Deployment"
git push
```

Vercel wird automatisch deployen. Prüfen Sie die Logs auf erfolgreiche Verbindung.

---

## 📊 Schritt 8: Datenbank-Monitoring

### 8.1 MongoDB Atlas Dashboard

1. **Collections**: Navigieren Sie zu "Browse Collections"
   - Datenbank: `sopiautomobile`
   - Collection: `leads`
   - Hier sehen Sie alle gespeicherten Leads

2. **Metrics**: Überwachen Sie Performance und Nutzung
   - Verbindungen
   - Operationen pro Sekunde
   - Speicherverbrauch

### 8.2 Nützliche Queries

Im MongoDB Compass oder Atlas UI können Sie Queries ausführen:

```javascript
// Alle Leads von heute
{
  "createdAt": {
    $gte: new Date(new Date().setHours(0,0,0,0))
  }
}

// Leads nach Status
{ "status": "new" }

// Leads eines bestimmten Fahrzeugs
{ "vehicle.brand": "BMW" }
```

---

## 🔧 Troubleshooting

### Fehler: "MongoServerError: bad auth"

**Lösung**:
- Überprüfen Sie Username und Passwort im Connection String
- Stellen Sie sicher, dass der Benutzer in MongoDB Atlas existiert
- Prüfen Sie URL-Encoding von Sonderzeichen

### Fehler: "MongooseServerSelectionError: connect ETIMEDOUT"

**Lösung**:
- Überprüfen Sie Network Access in MongoDB Atlas
- `0.0.0.0/0` muss erlaubt sein für Vercel
- Firewall-Einstellungen prüfen

### Fehler: "MONGODB_URI is not defined"

**Lösung**:
- Umgebungsvariable in `.env.local` (lokal) prüfen
- Umgebungsvariable in Vercel Dashboard prüfen
- Nach Änderung Vercel Re-Deploy triggern

### Verbindung funktioniert lokal, aber nicht auf Vercel

**Lösung**:
- Vercel Environment Variables überprüfen
- Alle drei Environments (Production, Preview, Development) aktiviert?
- Vercel Logs prüfen: `vercel logs`

---

## 📚 Zusätzliche Ressourcen

- [MongoDB Atlas Dokumentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver Docs](https://docs.mongodb.com/drivers/node/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Checklist

Vor dem Deployment:

- [ ] MongoDB Atlas Cluster erstellt
- [ ] Datenbank-Benutzer angelegt
- [ ] Network Access konfiguriert (0.0.0.0/0)
- [ ] Connection String kopiert und angepasst
- [ ] `.env.local` aktualisiert
- [ ] Lokaler Test erfolgreich
- [ ] Vercel Environment Variables hinzugefügt
- [ ] Code nach GitHub gepusht
- [ ] Vercel Deployment erfolgreich
- [ ] Production-Test durchgeführt

---

## 🎉 Migration abgeschlossen!

Ihre Anwendung nutzt jetzt MongoDB Atlas und ist bereit für Vercel Deployment!

**Wichtige Dateien**:
- ✅ `src/lib/db-mongodb.ts` - MongoDB Adapter
- ✅ `src/app/api/leads/route.ts` - Nutzt MongoDB
- ✅ `src/app/api/admin/leads/route.ts` - Nutzt MongoDB
- ✅ `.env.local` - MONGODB_URI konfiguriert
- ✅ Vercel Environment Variables gesetzt

Bei Fragen oder Problemen: Kontaktieren Sie den MongoDB Support oder prüfen Sie die Vercel Logs.
