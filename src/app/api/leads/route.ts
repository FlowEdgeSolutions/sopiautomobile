import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendMultipleEmails, validateSendGridConfig } from '../../../lib/email-sendgrid';
import { getCustomerEmailTemplate, getCompanyEmailTemplate } from '../../../lib/email-templates';
import { insertLead } from '../../../lib/db-mongodb';

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

// SendGrid ist jetzt der primäre E-Mail-Service
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('\n🚀 === LEAD API REQUEST STARTED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request URL:', request.url);
  console.log('Request method:', request.method);
  console.log('User-Agent:', request.headers.get('user-agent'));
  console.log('Content-Type:', request.headers.get('content-type'));
  
  try {
    console.log('\n📋 PARSING REQUEST DATA...');
    const data: LeadData = await request.json();
    console.log('Raw request data:', JSON.stringify(data, null, 2));

    // 1. Honeypot-Prüfung (Spam-Schutz)
    console.log('\n🍯 HONEYPOT CHECK...');
    if (data.website && data.website.trim() !== '') {
      console.log('❌ HONEYPOT TRIGGERED:', data.website);
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    console.log('✅ Honeypot check passed');

    console.log('\n🔍 VALIDATING INPUT DATA...');

    // 2. Grundlegende Validierung
    console.log('Validating vehicle brand:', data.vehicle?.brand);
    if (!data.vehicle?.brand || data.vehicle.brand.trim().length < 2) {
      console.log('❌ VALIDATION FAILED: Brand too short or missing');
      return NextResponse.json({ 
        error: 'Fahrzeugmarke ist erforderlich (min. 2 Zeichen)' 
      }, { status: 400 });
    }

    console.log('Validating vehicle model:', data.vehicle?.model);
    if (!data.vehicle?.model || data.vehicle.model.trim().length < 1) {
      console.log('❌ VALIDATION FAILED: Model missing');
      return NextResponse.json({ 
        error: 'Fahrzeugmodell ist erforderlich' 
      }, { status: 400 });
    }

    console.log('Validating vehicle year:', data.vehicle?.firstRegistrationYear);
    if (!data.vehicle?.firstRegistrationYear || 
        data.vehicle.firstRegistrationYear < 1950 || 
        data.vehicle.firstRegistrationYear > new Date().getFullYear() + 1) {
      console.log('❌ VALIDATION FAILED: Invalid year');
      return NextResponse.json({ 
        error: 'Gültiges Erstzulassungsjahr erforderlich' 
      }, { status: 400 });
    }

    console.log('Validating vehicle mileage:', data.vehicle?.mileageKm);
    if (!data.vehicle?.mileageKm || data.vehicle.mileageKm < 0 || data.vehicle.mileageKm > 2000000) {
      console.log('❌ VALIDATION FAILED: Invalid mileage');
      return NextResponse.json({ 
        error: 'Gültiger Kilometerstand erforderlich (0-2.000.000 km)' 
      }, { status: 400 });
    }

    console.log('Validating contact name:', data.contact?.name);
    if (!data.contact?.name || data.contact.name.trim().length < 2) {
      console.log('❌ VALIDATION FAILED: Name too short');
      return NextResponse.json({ 
        error: 'Name ist erforderlich (min. 2 Zeichen)' 
      }, { status: 400 });
    }

    console.log('Validating contact email:', data.contact?.email);
    if (!data.contact?.email || !emailRegex.test(data.contact.email)) {
      console.log('❌ VALIDATION FAILED: Invalid email format');
      return NextResponse.json({ 
        error: 'Gültige E-Mail-Adresse erforderlich' 
      }, { status: 400 });
    }

    console.log('Validating contact phone:', data.contact?.phone);
    if (!data.contact?.phone || !phoneRegex.test(data.contact.phone)) {
      console.log('❌ VALIDATION FAILED: Invalid phone format');
      return NextResponse.json({ 
        error: 'Gültige Telefonnummer erforderlich (min. 10 Zeichen)' 
      }, { status: 400 });
    }

    console.log('Validating consent:', data.meta?.consent);
    if (!data.meta?.consent) {
      console.log('❌ VALIDATION FAILED: Consent not given');
      return NextResponse.json({ 
        error: 'Zustimmung zur Datenschutzerklärung ist erforderlich' 
      }, { status: 400 });
    }
    
    console.log('✅ ALL VALIDATIONS PASSED');

    // 3. Lead-ID generieren
    console.log('\n🎫 GENERATING LEAD ID...');
    const leadId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    console.log('Generated Lead ID:', leadId);
    console.log('Timestamp:', timestamp);

    // 4. Lead-Daten aufbereiten
    console.log('\n📝 PROCESSING LEAD DATA...');
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
    
    console.log('Processed lead payload:', JSON.stringify(leadPayload, null, 2));

    // 5. Lead in MongoDB-Datenbank speichern
    console.log('\n💾 SAVING TO DATABASE...');
    try {
      await insertLead(leadPayload);
      console.log('✅ Lead saved to database successfully:', leadId);
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      // Datenbank-Fehler sollten die Lead-Annahme nicht blockieren
    }

    // 6. Webhook-Integration (falls konfiguriert)
    console.log('\n🔗 WEBHOOK INTEGRATION CHECK...');
    console.log('WEBHOOK_URL configured:', !!process.env.WEBHOOK_URL);
    if (process.env.WEBHOOK_URL) {
      console.log('Webhook URL:', process.env.WEBHOOK_URL);
      try {
        console.log('Sending to webhook...');
        await sendToWebhook(leadPayload);
        console.log('✅ Lead sent to webhook successfully:', leadId);
      } catch (webhookError) {
        console.error('❌ Webhook error:', webhookError);
        // Webhook-Fehler sollten die Lead-Annahme nicht blockieren
      }
    } else {
      console.log('⏭️ Skipping webhook - not configured');
    }

    // 7. E-Mail-Benachrichtigungen senden
    console.log('\n📧 EMAIL NOTIFICATIONS...');
    console.log('RESEND_API_KEY configured:', !!process.env.RESEND_API_KEY);
    try {
      console.log('Starting email sending process...');
      await sendEmails(leadPayload);
      console.log('✅ Email notifications sent successfully:', leadId);
    } catch (emailError) {
      console.error('❌ Email error:', emailError);
      // E-Mail-Fehler sollten die Lead-Annahme nicht blockieren
    }

    // 8. Erfolgsantwort
    console.log('\n✅ === LEAD PROCESSING COMPLETED SUCCESSFULLY ===');
    console.log('Lead ID:', leadId);
    console.log('Processing time:', new Date().toISOString());
    
    const successResponse = {
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns binnen 24 Stunden bei Ihnen.',
      leadId,
      estimatedResponseTime: '24 Stunden'
    };
    
    console.log('Success response:', JSON.stringify(successResponse, null, 2));
    return NextResponse.json(successResponse);

  } catch (error) {
    console.error('\n❌ === LEAD PROCESSING FAILED ===');
    console.error('Error details:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Timestamp:', new Date().toISOString());
    
    return NextResponse.json({ 
      error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
    }, { status: 500 });
  }
}

async function sendEmails(leadData: ProcessedLeadData): Promise<void> {
  console.log('\n📧 === EMAIL SENDING PROCESS STARTED (SendGrid) ===');
  console.log('Lead ID:', leadData.id);
  console.log('Strategy: Customer confirmation + Company notification via SendGrid');
  
  // Umgebungsvariablen prüfen
  console.log('\n🔑 ENVIRONMENT VARIABLES CHECK:');
  console.log('SENDGRID_API_KEY configured:', !!process.env.SENDGRID_API_KEY);
  console.log('FROM_EMAIL:', process.env.FROM_EMAIL);
  console.log('COMPANY_EMAIL:', process.env.COMPANY_EMAIL);
  
  // SendGrid-Konfiguration validieren
  const configValidation = validateSendGridConfig();
  if (!configValidation.valid) {
    console.warn('❌ SendGrid nicht korrekt konfiguriert:', configValidation.error);
    return;
  }

  try {
    // E-Mail-Konfiguration bestimmen
    console.log('\n⚙️ EMAIL CONFIGURATION:');
    
    const fromEmail = process.env.FROM_EMAIL || 'noreply@sopiautomobile.de';
    const companyEmail = process.env.COMPANY_EMAIL || 'Julianmazreku4@outlook.de';
    
    console.log('Selected FROM_EMAIL:', fromEmail);
    console.log('Selected COMPANY_EMAIL:', companyEmail);
    
    // 👤 Kunden-Bestätigung vorbereiten
    console.log('\n👤 === CUSTOMER EMAIL PREPARATION ===');
    const customerTemplate = getCustomerEmailTemplate(leadData);
    console.log('Customer email template generated');
    console.log('Customer email subject:', customerTemplate.subject);
    console.log('Customer email recipient:', leadData.contact.email);
    
    // 🏢 Unternehmens-Benachrichtigung vorbereiten
    console.log('\n🏢 === COMPANY NOTIFICATION EMAIL PREPARATION ===');
    const companyTemplate = getCompanyEmailTemplate(leadData);
    console.log('Company email template generated');
    console.log('Company email subject:', companyTemplate.subject);
    console.log('Company email recipient:', companyEmail);
    
    // 📧 E-Mails parallel versenden
    console.log('\n📤 Sending emails via SendGrid...');
    const emailStart = Date.now();
    
    const emailResults = await sendMultipleEmails([
      {
        to: leadData.contact.email,
        from: fromEmail,
        subject: customerTemplate.subject,
        html: customerTemplate.html
      },
      {
        to: companyEmail,
        from: fromEmail,
        subject: companyTemplate.subject,
        html: companyTemplate.html
      }
    ]);
    
    const emailTime = Date.now() - emailStart;
    console.log('SendGrid emails completed in:', emailTime + 'ms');
    
    // Ergebnisse verarbeiten
    const [customerResult, companyResult] = emailResults;
    
    if (customerResult.success) {
      console.log('✅ Customer email sent successfully with Message ID:', customerResult.messageId);
    } else {
      console.log('❌ Customer email failed:', customerResult.error);
      console.warn('⚠️ Customer email sending failed, but lead processing continues');
    }
    
    if (companyResult.success) {
      console.log('✅ Company notification email sent successfully with Message ID:', companyResult.messageId);
    } else {
      console.log('❌ Company notification email failed:', companyResult.error);
      console.warn('⚠️ Company email sending failed, but lead processing continues');
    }
    
    console.log('\n📊 EMAIL SENDING SUMMARY:');
    console.log('👤 Customer confirmation: ' + (customerResult.success ? '✅ SUCCESS' : '❌ FAILED'));
    console.log('🏢 Company notification: ' + (companyResult.success ? '✅ SUCCESS' : '❌ FAILED'));
    
    console.log('\n✅ === EMAIL SENDING PROCESS COMPLETED ===');
    
  } catch (error) {
    console.error('\n❌ === EMAIL SENDING PROCESS FAILED ===');
    console.error('Email error details:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}

async function sendToWebhook(leadData: ProcessedLeadData): Promise<boolean> {
  console.log('\n🔗 === WEBHOOK SENDING PROCESS ===');
  console.log('WEBHOOK_URL:', process.env.WEBHOOK_URL);
  console.log('WEBHOOK_SECRET configured:', !!process.env.WEBHOOK_SECRET);
  
  if (!process.env.WEBHOOK_URL) {
    console.log('⏭️ No webhook URL configured, skipping...');
    return false;
  }

  console.log('Preparing webhook payload...');
  const webhookPayload = JSON.stringify(leadData);
  console.log('Webhook payload size:', webhookPayload.length, 'bytes');
  
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'SopiAutomobile-LeadSystem/1.0',
    ...(process.env.WEBHOOK_SECRET && {
      'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`
    })
  };
  
  console.log('Webhook headers:', Object.keys(headers));
  console.log('\n📤 Sending webhook request...');
  
  const webhookStart = Date.now();
  
  const response = await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers,
    body: webhookPayload,
  });
  
  const webhookTime = Date.now() - webhookStart;
  console.log('Webhook request completed in:', webhookTime + 'ms');
  console.log('Webhook response status:', response.status, response.statusText);
  
  if (!response.ok) {
    console.error('❌ Webhook failed with status:', response.status);
    const errorText = await response.text();
    console.error('Webhook error response:', errorText);
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
  }
  
  console.log('✅ Webhook sent successfully');
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