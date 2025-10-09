import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { getCustomerEmailTemplate, getCompanyEmailTemplate } from '../../../lib/email-templates';

interface ProcessedLeadData {
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
    userAgent: string;
    ip: string;
  };
}

interface LeadData {
  vehicle: {
    brand: string;
    model: string;
    firstRegistrationYear: number;
    mileageKm: number;
    condition?: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  meta: {
    source: string;
    consent: boolean;
  };
  website?: string; // Honeypot
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (Deutsche Telefonnummern)
const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;

// Resend-Client initialisieren
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // 1. Honeypot-Prüfung (Spam-Schutz)
    if (data.website && data.website.trim() !== '') {
      console.log('Honeypot triggered:', data.website);
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // 2. Grundlegende Validierung
    if (!data.vehicle?.brand || data.vehicle.brand.trim().length < 2) {
      return NextResponse.json({ 
        error: 'Fahrzeugmarke ist erforderlich (min. 2 Zeichen)' 
      }, { status: 400 });
    }

    if (!data.vehicle?.model || data.vehicle.model.trim().length < 1) {
      return NextResponse.json({ 
        error: 'Fahrzeugmodell ist erforderlich' 
      }, { status: 400 });
    }

    if (!data.vehicle?.firstRegistrationYear || 
        data.vehicle.firstRegistrationYear < 1950 || 
        data.vehicle.firstRegistrationYear > new Date().getFullYear() + 1) {
      return NextResponse.json({ 
        error: 'Gültiges Erstzulassungsjahr erforderlich' 
      }, { status: 400 });
    }

    if (!data.vehicle?.mileageKm || data.vehicle.mileageKm < 0 || data.vehicle.mileageKm > 2000000) {
      return NextResponse.json({ 
        error: 'Gültiger Kilometerstand erforderlich (0-2.000.000 km)' 
      }, { status: 400 });
    }

    if (!data.contact?.name || data.contact.name.trim().length < 2) {
      return NextResponse.json({ 
        error: 'Name ist erforderlich (min. 2 Zeichen)' 
      }, { status: 400 });
    }

    if (!data.contact?.email || !emailRegex.test(data.contact.email)) {
      return NextResponse.json({ 
        error: 'Gültige E-Mail-Adresse erforderlich' 
      }, { status: 400 });
    }

    if (!data.contact?.phone || !phoneRegex.test(data.contact.phone)) {
      return NextResponse.json({ 
        error: 'Gültige Telefonnummer erforderlich (min. 10 Zeichen)' 
      }, { status: 400 });
    }

    if (!data.meta?.consent) {
      return NextResponse.json({ 
        error: 'Zustimmung zur Datenschutzerklärung ist erforderlich' 
      }, { status: 400 });
    }

    // 3. Lead-ID generieren
    const leadId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // 4. Lead-Daten aufbereiten
    const leadPayload = {
      id: leadId,
      timestamp,
      vehicle: {
        brand: data.vehicle.brand.trim(),
        model: data.vehicle.model.trim(),
        firstRegistrationYear: data.vehicle.firstRegistrationYear,
        mileageKm: data.vehicle.mileageKm,
        condition: data.vehicle.condition?.trim() || 'Nicht angegeben'
      },
      contact: {
        name: data.contact.name.trim(),
        email: data.contact.email.trim().toLowerCase(),
        phone: data.contact.phone.trim()
      },
      meta: {
        source: data.meta.source || 'unknown',
        consent: data.meta.consent,
        userAgent: request.headers.get('user-agent') || 'Unknown',
        ip: request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'Unknown'
      }
    };

    // 5. Webhook-Integration (falls konfiguriert)
    if (process.env.WEBHOOK_URL) {
      try {
        await sendToWebhook(leadPayload);
        console.log('Lead sent to webhook:', leadId);
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Webhook-Fehler sollten die Lead-Annahme nicht blockieren
      }
    }

    // 6. E-Mail-Benachrichtigungen senden
    try {
      await sendEmails(leadPayload);
      console.log('Email notifications sent:', leadId);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // E-Mail-Fehler sollten die Lead-Annahme nicht blockieren
    }

    // 7. Erfolgsantwort
    console.log('Lead processed successfully:', leadId);
    return NextResponse.json({
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns binnen 24 Stunden bei Ihnen.',
      leadId,
      estimatedResponseTime: '24 Stunden'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
    }, { status: 500 });
  }
}

async function sendEmails(leadData: ProcessedLeadData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY nicht konfiguriert - E-Mails werden nicht versendet');
    return;
  }

  try {
    // 1. Dankes-E-Mail an den Interessenten
    const customerTemplate = getCustomerEmailTemplate(leadData);
    const customerEmail = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [leadData.contact.email],
      subject: customerTemplate.subject,
      html: customerTemplate.html,
    });
    
    console.log('Customer email sent:', customerEmail.data?.id);

    // 2. Benachrichtigungs-E-Mail an das Unternehmen
    const companyTemplate = getCompanyEmailTemplate(leadData);
    const companyEmail = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.COMPANY_EMAIL || 'info@sopiautomobile.de'],
      subject: companyTemplate.subject,
      html: companyTemplate.html,
    });
    
    console.log('Company email sent:', companyEmail.data?.id);
    
  } catch (error) {
    console.error('Resend email error:', error);
    throw error;
  }
}

async function sendToWebhook(leadData: ProcessedLeadData): Promise<boolean> {
  if (!process.env.WEBHOOK_URL) return false;

  const response = await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'SopiAutomobile-LeadSystem/1.0',
      ...(process.env.WEBHOOK_SECRET && {
        'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`
      })
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
  }

  return true;
}

// GET-Method für Health Check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Sopi Automobile Lead API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}