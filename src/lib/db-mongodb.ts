import { MongoClient, Db, Filter } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

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

  // � E-Mail-Benachrichtigung wurde in src/app/api/leads/route.ts verlagert
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
