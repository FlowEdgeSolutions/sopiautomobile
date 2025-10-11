import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 === EMAIL DIAGNOSIS STARTED ===');
    
    // 1. Environment Variables Check
    const envCheck = {
      SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
      SENDGRID_FROM_EMAIL: !!process.env.SENDGRID_FROM_EMAIL,
      // Hide the actual values for security
      SENDGRID_API_KEY_PREFIX: process.env.SENDGRID_API_KEY?.substring(0, 10) + '...',
      SENDGRID_FROM_EMAIL_VALUE: process.env.SENDGRID_FROM_EMAIL,
    };
    
    console.log('Environment Variables:', envCheck);
    
    // 2. SendGrid Configuration Test
    let sendGridTest = 'Not tested';
    try {
      const sgMail = await import('@sendgrid/mail');
      sgMail.default.setApiKey(process.env.SENDGRID_API_KEY!);
      sendGridTest = 'SendGrid module loaded successfully';
    } catch (error) {
      sendGridTest = `SendGrid error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
    
    // 3. Runtime Environment Check
    const runtimeInfo = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      timestamp: new Date().toISOString(),
    };
    
    const diagnosis = {
      success: true,
      environment: runtimeInfo,
      sendGrid: {
        configured: envCheck.SENDGRID_API_KEY && envCheck.SENDGRID_FROM_EMAIL,
        test: sendGridTest,
        apiKeyPrefix: envCheck.SENDGRID_API_KEY_PREFIX,
        fromEmail: envCheck.SENDGRID_FROM_EMAIL_VALUE,
      },
      recommendations: [] as string[]
    };
    
    // Generate recommendations
    if (!envCheck.SENDGRID_API_KEY) {
      diagnosis.recommendations.push('❌ SENDGRID_API_KEY environment variable is missing');
    }
    
    if (!envCheck.SENDGRID_FROM_EMAIL) {
      diagnosis.recommendations.push('❌ SENDGRID_FROM_EMAIL environment variable is missing');
    }
    
    if (envCheck.SENDGRID_FROM_EMAIL_VALUE && !envCheck.SENDGRID_FROM_EMAIL_VALUE.includes('@sopiautomobile.de')) {
      diagnosis.recommendations.push('⚠️ FROM_EMAIL should use @sopiautomobile.de domain');
    }
    
    if (diagnosis.recommendations.length === 0) {
      diagnosis.recommendations.push('✅ Email configuration looks good - check SendGrid domain verification');
    }
    
    console.log('Diagnosis completed:', diagnosis);
    console.log('✅ === EMAIL DIAGNOSIS COMPLETED ===');
    
    return NextResponse.json(diagnosis);
    
  } catch (error) {
    console.error('❌ Diagnosis failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}