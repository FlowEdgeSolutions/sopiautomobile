import { MongoClient, Db, Filter } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';
import { Resend } from 'resend';

// MongoDB Connection mit Vercel Functions Optimization
let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'sopiautomobile';

// Global für Development (HMR-Unterstützung)
interface GlobalWithMongo {
  _mongoClient?: MongoClient;
}

const globalWithMongo = global as typeof globalThis & GlobalWithMongo;

// Verbindung zur MongoDB herstellen mit Vercel Functions Pool Management
async function connect(): Promise<Db> {
  if (db) return db;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI ist nicht in Umgebungsvariablen definiert');
  }

  try {
    const options = {
      maxPoolSize: 10, // Connection Pool Size
      minPoolSize: 2,
      maxIdleTimeMS: 30000, // 30 Sekunden
    };

    // Development: Wiederverwendung des Clients (HMR)
    if (process.env.NODE_ENV === 'development') {
      if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(MONGODB_URI, options);
        await globalWithMongo._mongoClient.connect();
        console.log('✅ MongoDB connected (Development - Global Client)');
      }
      client = globalWithMongo._mongoClient;
    } else {
      // Production: Vercel Functions Pool Management
      client = new MongoClient(MONGODB_URI, options);
      await client.connect();
      
      // 🚀 Vercel Functions: Connection Pool Management
      attachDatabasePool(client);
      
      console.log('✅ MongoDB connected (Production - Vercel Pool)');
    }
    
    db = client.db(DB_NAME);
    
    // Indizes erstellen
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Indizes erstellen für Performance
async function createIndexes(): Promise<void> {
  if (!db) return;
  
  const leadsCollection = db.collection('leads');
  
  await leadsCollection.createIndex({ timestamp: -1 });
  await leadsCollection.createIndex({ status: 1 });
  await leadsCollection.createIndex({ 'contact.email': 1 });
  await leadsCollection.createIndex({ createdAt: -1 });
  
  console.log('✅ MongoDB indexes created');
}

// Lead Interface
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

// MongoDB Document Interface
interface LeadDocument {
  _id: string;
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
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Lead in MongoDB einfügen
export async function insertLead(lead: Lead): Promise<void> {
  const database = await connect();
  const leadsCollection = database.collection<LeadDocument>('leads');

  const document: LeadDocument = {
    _id: lead.id, // String ID als _id verwenden
    id: lead.id,
    timestamp: lead.timestamp,
    vehicle: lead.vehicle,
    contact: lead.contact,
    meta: lead.meta,
    status: lead.status || 'new',
    notes: lead.notes || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await leadsCollection.insertOne(document);
  
  console.log('✅ Lead saved to MongoDB:', lead.id);

  // 🔔 SEPARATER PROZESS: Benachrichtigung an Verkaufsteam senden
  sendSalesNotification(lead).catch(error => {
    console.error('⚠️ Sales notification failed (non-blocking):', error);
  });
}

// Alle Leads abrufen
export async function getAllLeads(): Promise<Lead[]> {
  const database = await connect();
  const leadsCollection = database.collection<LeadDocument>('leads');

  const documents = await leadsCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return documents.map((doc: LeadDocument) => ({
    id: doc.id || doc._id,
    timestamp: doc.timestamp,
    vehicle: doc.vehicle,
    contact: doc.contact,
    meta: doc.meta,
    status: doc.status,
    notes: doc.notes || undefined,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  }));
}

// Lead nach ID abrufen
export async function getLeadById(id: string): Promise<Lead | null> {
  const database = await connect();
  const leadsCollection = database.collection<LeadDocument>('leads');

  const doc = await leadsCollection.findOne({ _id: id } as Filter<LeadDocument>);

  if (!doc) return null;

  return {
    id: doc.id || doc._id,
    timestamp: doc.timestamp,
    vehicle: doc.vehicle,
    contact: doc.contact,
    meta: doc.meta,
    status: doc.status,
    notes: doc.notes || undefined,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

// Lead-Status aktualisieren
export async function updateLeadStatus(id: string, status: string, notes?: string): Promise<void> {
  const database = await connect();
  const leadsCollection = database.collection<LeadDocument>('leads');

  await leadsCollection.updateOne(
    { _id: id } as Filter<LeadDocument>,
    {
      $set: {
        status,
        notes: notes || null,
        updatedAt: new Date(),
      },
    }
  );
  
  console.log('✅ Lead updated in MongoDB:', id);
}

// Lead löschen
export async function deleteLead(id: string): Promise<void> {
  const database = await connect();
  const leadsCollection = database.collection<LeadDocument>('leads');

  await leadsCollection.deleteOne({ _id: id } as Filter<LeadDocument>);
  
  console.log('✅ Lead deleted from MongoDB:', id);
}

// Statistiken abrufen
export async function getLeadStats() {
  const database = await connect();
  const leadsCollection = database.collection('leads');

  // Gesamt
  const total = await leadsCollection.countDocuments();

  // Status-Verteilung
  const statusPipeline = [
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ];
  const statusResult = await leadsCollection.aggregate(statusPipeline).toArray();
  const statusCounts = (statusResult as Array<{ _id: string; count: number }>).map((item) => ({
    status: item._id,
    count: item.count,
  }));

  // Heute
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const today = await leadsCollection.countDocuments({
    createdAt: { $gte: todayStart },
  });

  // Diese Woche
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const thisWeek = await leadsCollection.countDocuments({
    createdAt: { $gte: weekStart },
  });

  return {
    total,
    statusCounts,
    today,
    thisWeek,
  };
}

// 📧 Separater Prozess: Benachrichtigung an Verkaufsteam
async function sendSalesNotification(lead: Lead): Promise<void> {
  console.log('\n🔔 === SALES NOTIFICATION PROCESS (INDEPENDENT) ===');
  console.log('Lead ID:', lead.id);
  console.log('This is a separate background process, independent from customer email');
  
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping sales notification');
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'Sopi Automobile <onboarding@resend.dev>';
    
    console.log('📤 Sending sales notification to: verkauf@sopiautomobile.de');
    console.log('From:', fromEmail);
    
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

// Verbindung schließen (für graceful shutdown)
export async function closeConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

// Export-Objekt für Module-System
const mongodbModule = { 
  connect, 
  insertLead, 
  getAllLeads, 
  getLeadById, 
  updateLeadStatus, 
  deleteLead, 
  getLeadStats, 
  closeConnection 
};

export default mongodbModule;
