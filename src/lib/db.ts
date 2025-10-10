import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Resend } from 'resend';

// Datenbank-Pfad - im Projektverzeichnis speichern
const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'leads.db');

// Sicherstellen, dass das data-Verzeichnis existiert
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Datenbank-Verbindung
const db = new Database(dbPath);

// Datenbank-Schema initialisieren
function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      timestamp TEXT NOT NULL,
      
      -- Fahrzeugdaten
      vehicle_brand TEXT NOT NULL,
      vehicle_model TEXT NOT NULL,
      vehicle_first_registration_year INTEGER NOT NULL,
      vehicle_mileage_km INTEGER NOT NULL,
      vehicle_condition TEXT NOT NULL,
      
      -- Kontaktdaten
      contact_name TEXT NOT NULL,
      contact_email TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      
      -- Metadaten
      meta_source TEXT NOT NULL,
      meta_consent INTEGER NOT NULL,
      meta_user_agent TEXT,
      meta_ip TEXT,
      
      -- Status und Verwaltung
      status TEXT DEFAULT 'new',
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- Index für schnellere Abfragen
    CREATE INDEX IF NOT EXISTS idx_timestamp ON leads(timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_email ON leads(contact_email);
    CREATE INDEX IF NOT EXISTS idx_created_at ON leads(created_at DESC);
  `);
}

// Datenbank beim Start initialisieren
initializeDatabase();

export interface Lead {
  id: string;
  timestamp: string;
  vehicle: {
    brand: string;
    model: string;
    firstRegistrationYear: number;
    mileageKm: number;
    condition: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  meta: {
    source: string;
    consent: boolean;
    userAgent?: string;
    ip?: string;
  };
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LeadRow {
  id: string;
  timestamp: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_first_registration_year: number;
  vehicle_mileage_km: number;
  vehicle_condition: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  meta_source: string;
  meta_consent: number;
  meta_user_agent: string | null;
  meta_ip: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Lead in die Datenbank einfügen
export function insertLead(lead: Lead): void {
  const stmt = db.prepare(`
    INSERT INTO leads (
      id, timestamp,
      vehicle_brand, vehicle_model, vehicle_first_registration_year, vehicle_mileage_km, vehicle_condition,
      contact_name, contact_email, contact_phone,
      meta_source, meta_consent, meta_user_agent, meta_ip,
      status
    ) VALUES (
      ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?
    )
  `);

  stmt.run(
    lead.id,
    lead.timestamp,
    lead.vehicle.brand,
    lead.vehicle.model,
    lead.vehicle.firstRegistrationYear,
    lead.vehicle.mileageKm,
    lead.vehicle.condition,
    lead.contact.name,
    lead.contact.email,
    lead.contact.phone,
    lead.meta.source,
    lead.meta.consent ? 1 : 0,
    lead.meta.userAgent || null,
    lead.meta.ip || null,
    lead.status || 'new'
  );

  // 🔔 SEPARATER PROZESS: Benachrichtigung an Verkaufsteam senden
  // Wird asynchron ausgeführt, unabhängig vom Formular-/Kunden-E-Mail-Prozess
  sendSalesNotification(lead).catch(error => {
    console.error('⚠️ Sales notification failed (non-blocking):', error);
    // Fehler werden geloggt, blockieren aber nicht den Haupt-Prozess
  });
}

// 📧 Separater Prozess: Benachrichtigung an Verkaufsteam
async function sendSalesNotification(lead: Lead): Promise<void> {
  console.log('\n🔔 === SALES NOTIFICATION PROCESS (INDEPENDENT) ===');
  console.log('Lead ID:', lead.id);
  console.log('This is a separate background process, independent from customer email');
  
  // Resend API Key prüfen
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping sales notification');
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'Sopi Automobile <onboarding@resend.dev>';
    
    console.log('📤 Sending sales notification to: verkauf@sopiautomobile.de');
    console.log('From:', fromEmail);
    
    // E-Mail-Template für Verkaufsteam
    const salesEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .lead-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .section { margin: 20px 0; }
          .section-title { color: #dc2626; font-weight: bold; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #dc2626; padding-bottom: 5px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { color: #666; font-weight: 500; }
          .value { color: #333; font-weight: 600; }
          .highlight { background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🚗 Neuer Lead eingetragen!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Sofortiger Handlungsbedarf - Kunde wartet auf Rückmeldung</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <strong>⏰ Lead-Zeitstempel:</strong> ${new Date(lead.timestamp).toLocaleString('de-DE')}<br>
              <strong>🆔 Lead-ID:</strong> ${lead.id}
            </div>
            
            <div class="lead-card">
              <div class="section">
                <div class="section-title">👤 KONTAKTDATEN</div>
                <div class="info-row">
                  <span class="label">Name:</span>
                  <span class="value">${lead.contact.name}</span>
                </div>
                <div class="info-row">
                  <span class="label">E-Mail:</span>
                  <span class="value"><a href="mailto:${lead.contact.email}">${lead.contact.email}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">Telefon:</span>
                  <span class="value"><a href="tel:${lead.contact.phone}">${lead.contact.phone}</a></span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">🚗 FAHRZEUGDATEN</div>
                <div class="info-row">
                  <span class="label">Fahrzeug:</span>
                  <span class="value">${lead.vehicle.brand} ${lead.vehicle.model}</span>
                </div>
                <div class="info-row">
                  <span class="label">Erstzulassung:</span>
                  <span class="value">${lead.vehicle.firstRegistrationYear}</span>
                </div>
                <div class="info-row">
                  <span class="label">Kilometerstand:</span>
                  <span class="value">${lead.vehicle.mileageKm.toLocaleString('de-DE')} km</span>
                </div>
                <div class="info-row">
                  <span class="label">Zustand:</span>
                  <span class="value">${lead.vehicle.condition}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">📊 META-INFORMATIONEN</div>
                <div class="info-row">
                  <span class="label">Quelle:</span>
                  <span class="value">${lead.meta.source}</span>
                </div>
                <div class="info-row">
                  <span class="label">IP-Adresse:</span>
                  <span class="value">${lead.meta.ip || 'Nicht erfasst'}</span>
                </div>
                <div class="info-row">
                  <span class="label">Datenschutz:</span>
                  <span class="value">${lead.meta.consent ? '✅ Zugestimmt' : '❌ Nicht zugestimmt'}</span>
                </div>
              </div>
            </div>
            
            <div class="highlight">
              <strong>⚡ Nächste Schritte:</strong><br>
              1. Lead im Admin-Dashboard öffnen<br>
              2. Kunden innerhalb von 24h kontaktieren<br>
              3. Status auf "Kontaktiert" setzen nach Anruf
            </div>
            
            <div class="footer">
              <p>Diese E-Mail wurde automatisch generiert, wenn ein neuer Lead in die Datenbank eingetragen wird.</p>
              <p>© ${new Date().getFullYear()} Sopi Automobile - Lead Management System</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: 'verkauf@sopiautomobile.de',
      subject: `🚗 Neuer Lead: ${lead.vehicle.brand} ${lead.vehicle.model} - ${lead.contact.name}`,
      html: salesEmailHtml,
    });
    
    if (result.error) {
      console.error('❌ Sales notification failed:', result.error.message);
      throw new Error(result.error.message);
    }
    
    console.log('✅ Sales notification sent successfully');
    console.log('Email ID:', result.data?.id);
    console.log('✅ === SALES NOTIFICATION PROCESS COMPLETED ===\n');
    
  } catch (error) {
    console.error('❌ === SALES NOTIFICATION PROCESS FAILED ===');
    console.error('Error:', error);
    throw error;
  }
}

// Alle Leads abrufen
export function getAllLeads(): Lead[] {
  const stmt = db.prepare(`
    SELECT 
      id, timestamp,
      vehicle_brand, vehicle_model, vehicle_first_registration_year, vehicle_mileage_km, vehicle_condition,
      contact_name, contact_email, contact_phone,
      meta_source, meta_consent, meta_user_agent, meta_ip,
      status, notes, created_at, updated_at
    FROM leads
    ORDER BY created_at DESC
  `);

  const rows = stmt.all() as LeadRow[];

  return rows.map(row => ({
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
      consent: row.meta_consent === 1,
      userAgent: row.meta_user_agent || undefined,
      ip: row.meta_ip || undefined,
    },
    status: row.status,
    notes: row.notes || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

// Lead nach ID abrufen
export function getLeadById(id: string): Lead | null {
  const stmt = db.prepare(`
    SELECT 
      id, timestamp,
      vehicle_brand, vehicle_model, vehicle_first_registration_year, vehicle_mileage_km, vehicle_condition,
      contact_name, contact_email, contact_phone,
      meta_source, meta_consent, meta_user_agent, meta_ip,
      status, notes, created_at, updated_at
    FROM leads
    WHERE id = ?
  `);

  const row = stmt.get(id) as LeadRow | undefined;

  if (!row) return null;

  return {
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
      consent: row.meta_consent === 1,
      userAgent: row.meta_user_agent || undefined,
      ip: row.meta_ip || undefined,
    },
    status: row.status,
    notes: row.notes || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Lead-Status aktualisieren
export function updateLeadStatus(id: string, status: string, notes?: string): void {
  const stmt = db.prepare(`
    UPDATE leads
    SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(status, notes || null, id);
}

// Lead löschen
export function deleteLead(id: string): void {
  const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
  stmt.run(id);
}

// Statistiken abrufen
export function getLeadStats() {
  const totalStmt = db.prepare('SELECT COUNT(*) as total FROM leads');
  const total = (totalStmt.get() as { total: number }).total;

  const statusStmt = db.prepare('SELECT status, COUNT(*) as count FROM leads GROUP BY status');
  const statusCounts = statusStmt.all();

  const todayStmt = db.prepare(`
    SELECT COUNT(*) as count 
    FROM leads 
    WHERE DATE(created_at) = DATE('now')
  `);
  const today = (todayStmt.get() as { count: number }).count;

  const weekStmt = db.prepare(`
    SELECT COUNT(*) as count 
    FROM leads 
    WHERE created_at >= datetime('now', '-7 days')
  `);
  const thisWeek = (weekStmt.get() as { count: number }).count;

  return {
    total,
    statusCounts,
    today,
    thisWeek,
  };
}

export default db;
