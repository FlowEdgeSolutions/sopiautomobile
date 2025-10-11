import { NextResponse } from 'next/server';
import { sendAllEmails, validateEmailConfig } from '../../../lib/email-service';

export async function POST() {
  try {
    console.log('🧪 === EMAIL TEST ROUTE STARTED ===');
    
    // Validate email configuration
    validateEmailConfig();
    console.log('✅ Email configuration is valid');
    
    // Test lead data
    const testLead = {
      id: 'test-' + Date.now(),
      timestamp: new Date().toISOString(),
      vehicle: {
        brand: 'BMW',
        model: 'X5',
        firstRegistrationYear: 2020,
        mileageKm: 50000,
        condition: 'gut'
      },
      contact: {
        name: 'Max Mustermann',
        email: 'test@example.com',
        phone: '+49 123 456789'
      },
      meta: {
        source: 'Website Test',
        consent: true,
        userAgent: 'Test Browser',
        ip: '127.0.0.1'
      }
    };
    
    console.log('📤 Sending test emails...');
    await sendAllEmails(testLead);
    
    console.log('✅ === EMAIL TEST COMPLETED SUCCESSFULLY ===');
    
    return NextResponse.json({
      success: true,
      message: 'Test emails sent successfully',
      leadId: testLead.id
    });
    
  } catch (error) {
    console.error('❌ === EMAIL TEST FAILED ===');
    console.error('Error:', error);
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      error: message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Email Test Route',
    available: true,
    instructions: 'POST to this endpoint to send test emails'
  });
}