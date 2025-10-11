import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

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
  const startTime = Date.now();
  
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

  console.log('✅ Lead saved to database successfully with ID:', lead.id);
  console.log('⏱️ Database operation completed in:', Date.now() - startTime, 'ms');
  
  // 📧 E-Mail-Benachrichtigung wurde in src/app/api/leads/route.ts verlagert
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
