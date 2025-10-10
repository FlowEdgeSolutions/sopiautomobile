# 🔐 Admin-Login Anleitung

## Zugriff auf das Admin-Dashboard

Das Admin-Dashboard ist jetzt mit einem Login-System geschützt.

### 📍 Login-Seite

**URL**: `http://localhost:3000/admin/login`

### 🔑 Standard-Anmeldedaten

```
Benutzername: admin
Passwort:     Sopi2024!Secure
```

⚠️ **WICHTIG**: Ändern Sie diese Credentials in der Produktionsumgebung!

## 🛡️ Sicherheitshinweise

### Server-seitige Authentifizierung

✅ **Next.js Middleware** schützt alle `/admin/*` Routen
- **Vor** dem Rendern wird die Session geprüft
- Nicht-authentifizierte Benutzer werden sofort zu `/admin/login` umgeleitet
- Bereits eingeloggte Benutzer werden von `/admin/login` zu `/admin` weitergeleitet
- **Kein Flash** von geschütztem Inhalt

### Wie es funktioniert

1. **Benutzer besucht `/admin`**
   - Middleware prüft Session-Cookie
   - **OHNE Cookie**: Redirect zu `/admin/login?returnUrl=/admin`
   - **MIT Cookie**: Seite wird geladen

2. **Benutzer besucht `/admin/login`**
   - Middleware prüft Session-Cookie
   - **MIT Cookie**: Redirect zu `/admin` (bereits eingeloggt)
   - **OHNE Cookie**: Login-Seite wird angezeigt

3. **Nach Login**
   - Session-Cookie wird gesetzt
   - Redirect zur ursprünglich angeforderten Seite (returnUrl)

### Credentials ändern

1. Öffnen Sie die Datei `.env.local`
2. Ändern Sie die folgenden Zeilen:
   ```env
   ADMIN_USERNAME=IhrNeuerBenutzername
   ADMIN_PASSWORD=IhrSicheresPasswort
   ```
3. Starten Sie den Server neu

### Passwort-Anforderungen (Empfehlung)

- ✅ Mindestens 12 Zeichen
- ✅ Groß- und Kleinbuchstaben
- ✅ Zahlen und Sonderzeichen
- ✅ Nicht im Wörterbuch vorhanden

## 📋 Funktionen

### Nach dem Login haben Sie Zugriff auf:

- ✅ **Lead-Übersicht**: Alle eingegangenen Anfragen
- ✅ **Statistiken**: Gesamt, Heute, Diese Woche, Konversionsrate
- ✅ **Suche & Filter**: Schnelles Finden von Leads
- ✅ **Status-Verwaltung**: Leads kategorisieren (Neu, Kontaktiert, Qualifiziert, etc.)
- ✅ **Notizen**: Interne Vermerke zu jedem Lead
- ✅ **CSV-Export**: Daten exportieren für Excel/Sheets
- ✅ **Lead-Details**: Vollständige Ansicht aller Informationen

### Session-Dauer

- **Automatisches Logout**: Nach 24 Stunden Inaktivität
- **Manuelles Logout**: Über den "Abmelden"-Button oben rechts

## 🔄 Workflow

1. **Login** auf `/admin/login`
2. **Dashboard** wird automatisch geladen
3. **Arbeiten** mit Leads
4. **Logout** über Button oder automatisch nach 24h

## 🚨 Fehlerbehebung

### "Ungültige Anmeldedaten"

- Prüfen Sie Tippfehler
- Überprüfen Sie `.env.local` Datei
- Starten Sie den Server neu nach Änderungen

### "Nicht authentifiziert"

- Session abgelaufen (24h)
- Cookies wurden gelöscht
- Erneut einloggen erforderlich

### Zugriff verweigert

- Prüfen Sie, ob `.env.local` existiert
- Verifizieren Sie die Umgebungsvariablen
- Console-Logs im Terminal prüfen

## 💻 Technische Details

### Technische Details

#### Authentifizierungs-Architektur

```
Benutzer-Request → Next.js Middleware → Session-Check → Entscheidung
                                              |
                        +---------------------+---------------------+
                        |                                           |
                   Session OK                              Session fehlt/ungültig
                        |                                           |
                  Seite laden                            Redirect zu /admin/login
```

#### Middleware ([`src/middleware.ts`](file://c:\Users\KhaledAyub\Music\Sopiautomobile\Sop\nextjs-app\src\middleware.ts))

- **Läuft vor jeder Request** zu `/admin/*`
- **Server-seitig**: Keine Client-Rendering-Probleme
- **Automatische Redirects**: Login ↔ Dashboard
- **Return URL Support**: Nach Login zurück zur ursprünglichen Seite

### Authentifizierung

- **Session-basiert**: Sichere HTTP-Only Cookies
- **Hash-Verschlüsselung**: SHA-256 für Session-Tokens
- **Schutz**: Alle Admin-APIs sind geschützt

### API-Endpunkte

- `POST /api/admin/auth` - Login
- `DELETE /api/admin/auth` - Logout
- `GET /api/admin/leads` - Leads abrufen (geschützt)
- `PATCH /api/admin/leads` - Lead aktualisieren (geschützt)
- `DELETE /api/admin/leads` - Lead löschen (geschützt)

## 📞 Support

Bei Problemen oder Fragen:
1. Prüfen Sie die Console-Logs
2. Überprüfen Sie die `.env.local` Datei
3. Starten Sie den Dev-Server neu: `npm run dev`

---

**Letzte Aktualisierung**: 2025-10-10
**Version**: 1.0.0
