import { NextRequest, NextResponse } from 'next/server';
import { validateLogin, createSession, destroySession } from '../../../../lib/auth';

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('🔐 Admin login attempt');
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Benutzername und Passwort erforderlich' },
        { status: 400 }
      );
    }
    
    const isValid = validateLogin(username, password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Ungültige Anmeldedaten' },
        { status: 401 }
      );
    }
    
    // Session erstellen
    await createSession();
    
    console.log('✅ Admin logged in successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Erfolgreich angemeldet',
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Anmeldefehler' },
      { status: 500 }
    );
  }
}

// DELETE - Logout
export async function DELETE() {
  try {
    await destroySession();
    
    console.log('✅ Admin logged out successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Erfolgreich abgemeldet',
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    return NextResponse.json(
      { error: 'Abmeldefehler' },
      { status: 500 }
    );
  }
}
