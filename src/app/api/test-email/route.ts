import { NextResponse } from 'next/server';
import { sendAllEmails, validateEmailConfig } from '../../../lib/email-service';

export async function POST() {
  try {
    console.log('🧪 === EMAIL TEST ROUTE STARTED (VERCEL) ===');
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
    });
    
    // Validate email configuration with detailed logging
    console.log('📋 Validating email configuration...');
    validateEmailConfig();
    console.log('✅ Email configuration is valid');
    
    // Test lead data
    const testLead = {
      id: 'vercel-test-' + Date.now(),
      timestamp: new Date().toISOString(),
      vehicle: {
        brand: 'BMW',
        model: 'X5',
        firstRegistrationYear: 2020,
        mileageKm: 50000,
        condition: 'gut'
      },
      contact: {
        name: 'Vercel Test User',
        email: 'flowedgesolution@gmail.com', // Your test email
        phone: '+49 123 456789'
      },
      meta: {
        source: 'Vercel Production Test',
        consent: true,
        userAgent: 'Vercel Test Environment',
        ip: '127.0.0.1'
      }
    };
    
    console.log('� Sending test emails for lead:', testLead.id);
    console.log('Test lead data:', JSON.stringify(testLead, null, 2));
    
    // Send emails with comprehensive error handling
    await sendAllEmails(testLead);
    
    console.log('✅ === EMAIL TEST COMPLETED SUCCESSFULLY ===');
    
    return NextResponse.json({
      success: true,
      message: 'Test emails sent successfully from Vercel',
      leadId: testLead.id,
      environment: process.env.VERCEL_ENV || 'development',
      timestamp: new Date().toISOString(),
      details: {
        customerEmail: testLead.contact.email,
        companyEmails: ['info@sopiautomobile.de', 'julianmazreku4@outlook.de'],
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
      }
    });
    
  } catch (error) {
    console.error('❌ === EMAIL TEST FAILED ===');
    console.error('Error type:', typeof error);
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      error: message,
      environment: process.env.VERCEL_ENV || 'development',
      timestamp: new Date().toISOString(),
      debugInfo: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: !!process.env.VERCEL,
        SENDGRID_API_KEY_EXISTS: !!process.env.SENDGRID_API_KEY,
        SENDGRID_FROM_EMAIL_EXISTS: !!process.env.SENDGRID_FROM_EMAIL,
        SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
      }
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Email Test Route for Vercel',
    available: true,
    instructions: 'POST to this endpoint to send test emails in production',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    }
  });
}