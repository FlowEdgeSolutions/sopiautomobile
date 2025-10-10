# 🚀 Vercel Deployment Guide

## ⚠️ WICHTIG: SQLite funktioniert NICHT auf Vercel!

Vercel ist eine **serverless Platform** ohne persistenten Speicher. SQLite-Datenbanken werden bei jedem Request neu erstellt und **alle Daten gehen verloren**.

## ✅ Lösung: Migration zu MongoDB Atlas

MongoDB Atlas ist eine vollständig verwaltete Cloud-Datenbank, die perfekt für Serverless-Deployments geeignet ist.

### Warum MongoDB?

- ✅ **Serverless-kompatibel**: Keine persistenten Dateien nötig
- ✅ **Kostenloser Start**: M0 Free Tier (512 MB)
- ✅ **Auto-Scaling**: Wächst mit Ihrer Anwendung
- ✅ **DSGVO-konform**: EU-Regionen verfügbar
- ✅ **Automatische Backups**: In höheren Tiers
- ✅ **Connection Pooling**: Optimiert für Serverless

---

## 🛠️ Migration durchgeführt

Die Migration zu MongoDB ist bereits abgeschlossen:

### ✅ Abgeschlossene Schritte:

1. ✅ **MongoDB Package installiert**: `npm install mongodb`
2. ✅ **MongoDB Adapter erstellt**: `src/lib/db-mongodb.ts`
3. ✅ **API Routes migriert**:
   - `src/app/api/leads/route.ts` → nutzt jetzt MongoDB
   - `src/app/api/admin/leads/route.ts` → nutzt jetzt MongoDB
4. ✅ **Environment Variables vorbereitet**: `.env.local` enthält MONGODB_URI

### 📝 Wichtige Dateien:

- **`src/lib/db-mongodb.ts`**: Vollständiger MongoDB-Adapter mit:
  - Connection Management mit Pooling
  - Alle CRUD-Operationen
  - Statistik-Funktionen
  - Separate Sales Notification
  - Indizes für Performance

- **`MONGODB_SETUP.md`**: Detaillierte Schritt-für-Schritt-Anleitung zur Einrichtung von MongoDB Atlas

---

## 🚀 Nächste Schritte für Deployment

### Schritt 1: MongoDB Atlas einrichten

Folgen Sie der detaillierten Anleitung in [`MONGODB_SETUP.md`](./MONGODB_SETUP.md):

1. MongoDB Atlas Account erstellen
2. Kostenlosen M0 Cluster erstellen
3. Datenbank-Benutzer anlegen
4. Netzwerkzugriff konfigurieren (0.0.0.0/0 für Vercel)
5. Connection String kopieren

### Schritt 2: Lokale Umgebungsvariablen

Aktualisieren Sie `.env.local` mit Ihrem MongoDB Connection String:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Schritt 3: Lokal testen

```bash
npm run dev
```

Testen Sie:
1. Formular ausfüllen und absenden
2. Admin-Dashboard: `http://localhost:3000/admin`
3. Prüfen Sie die Konsole auf erfolgreiche MongoDB-Verbindung:
   ```
   ✅ Connected to MongoDB
   ✅ Lead saved to database successfully
   ```

### Schritt 4: Vercel Environment Variables

1. Gehen Sie zu: https://vercel.com/dashboard
2. Wählen Sie Ihr Projekt
3. **Settings** → **Environment Variables**
4. Fügen Sie hinzu:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | Ihr MongoDB Connection String | Production, Preview, Development |
| `RESEND_API_KEY` | Ihr Resend API Key | Production, Preview, Development |
| `FROM_EMAIL` | `Sopi Automobile <noreply@sopiautomobile.de>` | Production, Preview, Development |
| `COMPANY_EMAIL` | `verkauf@sopiautomobile.de` | Production, Preview, Development |
| `ADMIN_USERNAME` | `admin` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `Sopi2024!Secure` | Production, Preview, Development |

⚠️ **WICHTIG**: Alle Umgebungsvariablen für **alle drei Environments** aktivieren!

### Schritt 5: Deploy

```bash
# Code commiten
git add .
git commit -m "Migration zu MongoDB für Vercel Deployment"
git push
```

Vercel wird automatisch deployen!

### Schritt 6: Deployment verifizieren

1. **Build Logs prüfen**: 
   - Vercel Dashboard → Deployments → Latest Deployment → Build Logs
   - Achten Sie auf: `✅ Connected to MongoDB`

2. **Production testen**:
   - Formular auf Ihrer Domain: `https://sopiautomobile.de`
   - Admin-Dashboard: `https://sopiautomobile.de/admin`
   - Test-Lead erstellen
   - Im Dashboard prüfen

3. **MongoDB Atlas prüfen**:
   - MongoDB Atlas Dashboard
   - **Database** → **Browse Collections**
   - Collection: `sopiautomobile` → `leads`
   - Ihre Test-Leads sollten erscheinen

---

## 📊 Code-Änderungen im Detail

### Migration von SQLite zu MongoDB

#### Vorher (SQLite - `db.ts`):
```typescript
import Database from 'better-sqlite3';

const db = new Database('./data/leads.db');

export function insertLead(lead: Lead): void {
  const stmt = db.prepare(`INSERT INTO leads (...)`);
  stmt.run(...);
}
```

#### Nachher (MongoDB - `db-mongodb.ts`):
```typescript
import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (db) return db; // Connection Pooling
  client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  db = client.db('sopiautomobile');
  return db;
}

export async function insertLead(lead: Lead): Promise<void> {
  const database = await connect();
  await database.collection('leads').insertOne(lead);
}
```

### Wichtige Änderungen:

1. **Synchron → Asynchron**: Alle Funktionen sind jetzt `async`
2. **Connection Pooling**: Wiederverwendung von DB-Verbindungen
3. **Document-basiert**: Keine SQL-Queries mehr, JSON-Dokumente
4. **Indizes**: Performance-Optimierung für häufige Queries

---

## 🔧 Troubleshooting

### Build schlägt fehl: "MONGODB_URI is not defined"

**Lösung**:
- Prüfen Sie Vercel Environment Variables
- Stellen Sie sicher, dass alle Environments aktiviert sind
- Re-Deploy triggern nach Änderung

### Fehler: "MongoServerError: bad auth"

**Lösung**:
- Username/Passwort im Connection String prüfen
- Sonderzeichen URL-encoden (`@` → `%40`)
- Datenbank-Benutzer in MongoDB Atlas prüfen

### Fehler: "MongooseServerSelectionError: connect ETIMEDOUT"

**Lösung**:
- Network Access in MongoDB Atlas prüfen
- `0.0.0.0/0` muss erlaubt sein für Vercel
- Firewall-Einstellungen prüfen

### Verbindung funktioniert lokal, aber nicht auf Vercel

**Lösung**:
- Vercel Environment Variables überprüfen
- Vercel Logs prüfen: `vercel logs [deployment-url]`
- MongoDB Atlas Network Access: `0.0.0.0/0` erlaubt?

---



## 📊 Vergleich: MongoDB vs. andere Lösungen

| Feature | MongoDB Atlas | Vercel Postgres | Railway + SQLite |
|---------|--------------|-----------------|------------------|
| Serverless | ✅ Ja | ✅ Ja | ❌ Nein |
| Auto-Scaling | ✅ Ja | ✅ Ja | ⚠️ Limitiert |
| Kostenloser Start | ✅ 512 MB | ❌ $20/Monat | ✅ $5/Monat |
| Setup | 🔧 Einfach | 🔧 Einfach | 🔧 Sehr einfach |
| Migration nötig | ✅ Abgeschlossen | ⚠️ Nein | ⚠️ Nein |
| DSGVO (EU) | ✅ Frankfurt | ✅ Frankfurt | ✅ Konfigurierbar |
| Backups | ✅ Automatisch | ✅ Automatisch | ⚠️ Manuell |

**Empfehlung**: MongoDB Atlas (bereits implementiert!) 🎉

---

## 📄 Datenmigration (falls SQLite-Daten existieren)

Falls Sie bereits Leads in SQLite gespeichert haben:

### Export aus SQLite:

```javascript
// scripts/export-sqlite-to-json.js
const Database = require('better-sqlite3');
const fs = require('fs');

const db = new Database('./data/leads.db');
const leads = db.prepare('SELECT * FROM leads').all();

fs.writeFileSync('./leads-export.json', JSON.stringify(leads, null, 2));
console.log(`✅ Exported ${leads.length} leads`);
```

### Import in MongoDB:

```javascript
// scripts/import-to-mongodb.js
const { MongoClient } = require('mongodb');
const fs = require('fs');

const MONGODB_URI = process.env.MONGODB_URI;
const leads = JSON.parse(fs.readFileSync('./leads-export.json'));

async function importLeads() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db('sopiautomobile');
  
  // Transform SQLite structure to MongoDB structure
  const transformedLeads = leads.map(row => ({
    _id: row.id,
    id: row.id,
    timestamp: row.timestamp,
    vehicle: {
      brand: row.vehicle_brand,
      model: row.vehicle_model,
      firstRegistrationYear: row.vehicle_first_registration_year,
      mileageKm: row.vehicle_mileage_km,
      condition: row.vehicle_condition,
    },
    contact: {
      name: row.contact_name,
      email: row.contact_email,
      phone: row.contact_phone,
    },
    meta: {
      source: row.meta_source,
      consent: row.meta_consent,
      userAgent: row.meta_user_agent,
      ip: row.meta_ip,
    },
    status: row.status,
    notes: row.notes,
    createdAt: new Date(row.created_at || row.timestamp),
    updatedAt: new Date(row.updated_at || row.timestamp),
  }));
  
  await db.collection('leads').insertMany(transformedLeads);
  console.log(`✅ Imported ${transformedLeads.length} leads`);
  
  await client.close();
}

importLeads();
```

### Migration durchführen:

```bash
node scripts/export-sqlite-to-json.js
node scripts/import-to-mongodb.js
```

---

## ✅ Deployment-Checklist

Vor dem Production-Deployment:

- [ ] MongoDB Atlas Cluster erstellt (M0 Free Tier)
- [ ] Datenbank-Benutzer angelegt
- [ ] Network Access konfiguriert (0.0.0.0/0)
- [ ] Connection String getestet (lokal)
- [ ] `.env.local` aktualisiert mit MONGODB_URI
- [ ] Lokaler Test erfolgreich (Formular + Dashboard)
- [ ] Vercel Environment Variables hinzugefügt (alle 6 Variablen)
- [ ] Alle Environments aktiviert (Production, Preview, Development)
- [ ] Code committet und gepusht
- [ ] Vercel Build erfolgreich
- [ ] Production-Test durchgeführt
- [ ] MongoDB Atlas: Leads sichtbar in Collection
- [ ] E-Mail-Versand getestet
- [ ] Admin-Dashboard getestet

---

## 🎉 Fertig!

Ihre Anwendung ist jetzt bereit für Vercel Deployment mit MongoDB Atlas!

**Wichtige Links**:
- 📚 [MongoDB Setup Anleitung](./MONGODB_SETUP.md)
- 🔗 [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
- 🚀 [Vercel Dashboard](https://vercel.com/dashboard)
- 📧 [Resend Dashboard](https://resend.com/emails)

**Bei Problemen**:
1. Prüfen Sie Vercel Logs: `vercel logs`
2. Prüfen Sie MongoDB Atlas Logs
3. Vergleichen Sie Environment Variables (lokal vs. Vercel)
4. Testen Sie Connection String separat

Viel Erfolg mit Ihrem Deployment! 🚀🎉
