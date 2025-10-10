import { cookies } from 'next/headers';
import crypto from 'crypto';

// Session-Management
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 Stunden

interface AdminCredentials {
  username: string;
  password: string;
}

// Admin-Credentials aus Umgebungsvariablen
function getAdminCredentials(): AdminCredentials {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'Sopi2024!Secure',
  };
}

// Passwort-Hash erstellen (einfache Implementierung)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Login-Validierung
export function validateLogin(username: string, password: string): boolean {
  const credentials = getAdminCredentials();
  
  console.log('🔐 Login attempt for username:', username);
  
  const isValid = 
    username === credentials.username && 
    password === credentials.password;
  
  if (isValid) {
    console.log('✅ Login successful');
  } else {
    console.log('❌ Login failed - invalid credentials');
  }
  
  return isValid;
}

// Session erstellen
export async function createSession(): Promise<string> {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const sessionHash = hashPassword(sessionToken);
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // in Sekunden
    path: '/',
  });
  
  console.log('✅ Session created');
  return sessionToken;
}

// Session validieren
export async function validateSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie) {
      console.log('❌ No session cookie found');
      return false;
    }
    
    console.log('✅ Valid session found');
    return true;
  } catch (error) {
    console.error('❌ Session validation error:', error);
    return false;
  }
}

// Logout - Session löschen
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  console.log('✅ Session destroyed');
}

// Helper: Redirect zu Login wenn nicht authentifiziert
export async function requireAuth(): Promise<boolean> {
  const isAuthenticated = await validateSession();
  return isAuthenticated;
}
