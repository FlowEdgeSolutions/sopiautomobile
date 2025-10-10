import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Session Cookie Name (muss mit auth.ts übereinstimmen)
const SESSION_COOKIE_NAME = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Prüfen ob es eine Admin-Route ist (außer Login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    console.log('🔒 Middleware: Checking auth for:', pathname);
    
    // Session-Cookie prüfen
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie) {
      console.log('❌ Middleware: No session cookie - redirecting to login');
      
      // Redirect zu Login mit return URL
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      
      return NextResponse.redirect(loginUrl);
    }
    
    console.log('✅ Middleware: Valid session found - allowing access');
  }
  
  // Login-Page: Wenn bereits eingeloggt, zu Dashboard weiterleiten
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    
    if (sessionCookie) {
      console.log('✅ Middleware: Already logged in - redirecting to dashboard');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

// Middleware nur auf Admin-Routen anwenden
export const config = {
  matcher: ['/admin/:path*'],
};
