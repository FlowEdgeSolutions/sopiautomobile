import sgMail from '@sendgrid/mail';
import { getCustomerEmailTemplate, getCompanyEmailTemplate } from './email-templates';

// SendGrid Configuration
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface LeadData {
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

export interface EmailConfig {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

// Validate SendGrid configuration
export function validateEmailConfig(): void {
  console.log('🔑 Validating email configuration...');
  console.log('Environment check:');
  console.log('- SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
  console.log('- SENDGRID_FROM_EMAIL exists:', !!process.env.SENDGRID_FROM_EMAIL);
  console.log('- SENDGRID_FROM_EMAIL value:', process.env.SENDGRID_FROM_EMAIL);
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- VERCEL:', !!process.env.VERCEL);
  
  if (!process.env.SENDGRID_API_KEY) {
    console.error('❌ SENDGRID_API_KEY environment variable is missing');
    throw new Error('SENDGRID_API_KEY environment variable is required');
  }
  
  if (!process.env.SENDGRID_FROM_EMAIL) {
    console.error('❌ SENDGRID_FROM_EMAIL environment variable is missing');
    throw new Error('SENDGRID_FROM_EMAIL environment variable is required');
  }
  
  console.log('✅ Email configuration validated successfully');
}

// Send single email
export async function sendEmail(config: EmailConfig): Promise<void> {
  try {
    console.log('📧 === STARTING EMAIL SEND PROCESS ===');
    validateEmailConfig();
    
    const msg = {
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: config.html,
    };

    console.log('📤 Sending email with config:', {
      from: config.from,
      to: config.to,
      subject: config.subject,
      htmlLength: config.html.length,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: !!process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
      }
    });

    const response = await sgMail.send(msg);
    
    console.log('✅ Email sent successfully');
    console.log('Response status:', response[0].statusCode);
    console.log('Message ID:', response[0].headers['x-message-id']);
    console.log('Response headers:', JSON.stringify(response[0].headers, null, 2));
    
  } catch (error: unknown) {
    console.error('❌ === EMAIL SENDING FAILED ===');
    console.error('Error details:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { status?: number; body?: unknown } };
      console.error('SendGrid error details:', {
        status: sgError.response?.status,
        body: sgError.response?.body,
      });
      
      // More specific error handling for production
      if (sgError.response?.status === 401) {
        console.error('🔑 SendGrid API Key is invalid or missing');
      } else if (sgError.response?.status === 403) {
        console.error('🚫 SendGrid: Permission denied - check domain verification');
      } else if (sgError.response?.status === 400) {
        console.error('📝 SendGrid: Bad request - check email format or content');
      }
    }
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Final error message:', message);
    throw new Error(`Email sending failed: ${message}`);
  }
}

// Send customer confirmation email
export async function sendCustomerConfirmation(leadData: LeadData): Promise<void> {
  const emailTemplate = getCustomerEmailTemplate(leadData);
  
  const config: EmailConfig = {
    from: process.env.SENDGRID_FROM_EMAIL!,
    to: [leadData.contact.email],
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  };
  
  console.log('\n📧 === CUSTOMER CONFIRMATION EMAIL ===');
  console.log('Lead ID:', leadData.id);
  console.log('Customer:', leadData.contact.name);
  console.log('Email:', leadData.contact.email);
  
  await sendEmail(config);
  
  console.log('✅ Customer confirmation email sent successfully');
  console.log('✅ === CUSTOMER EMAIL PROCESS COMPLETED ===\n');
}

// Send company notification email (single address only)
export async function sendCompanyNotifications(leadData: LeadData): Promise<void> {
  const emailTemplate = getCompanyEmailTemplate(leadData);
  
  // Send only to the configured company email
  const companyEmail = process.env.COMPANY_EMAIL || 'julianmazreku4@outlook.de';
  
  const config: EmailConfig = {
    from: process.env.SENDGRID_FROM_EMAIL!,
    to: [companyEmail],
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  };
  
  console.log('\n🏢 === COMPANY NOTIFICATION EMAIL ===');
  console.log('Lead ID:', leadData.id);
  console.log('Sending to:', companyEmail);
  
  await sendEmail(config);
  
  console.log('✅ Company notification email sent successfully');
  console.log('✅ === COMPANY EMAIL PROCESS COMPLETED ===\n');
}

// Send all emails for a lead (customer + company)
export async function sendAllEmails(leadData: LeadData): Promise<void> {
  try {
    console.log('\n🚀 === STARTING EMAIL PROCESS FOR LEAD ===');
    console.log('Lead ID:', leadData.id);
    console.log('Customer:', leadData.contact.name);
    console.log('Vehicle:', `${leadData.vehicle.brand} ${leadData.vehicle.model}`);
    
    // Send emails in parallel for better performance
    await Promise.all([
      sendCustomerConfirmation(leadData),
      sendCompanyNotifications(leadData)
    ]);
    
    console.log('🎉 === ALL EMAILS SENT SUCCESSFULLY ===\n');
    
  } catch (error: unknown) {
    console.error('❌ === EMAIL PROCESS FAILED ===');
    console.error('Lead ID:', leadData.id);
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', message);
    throw error;
  }
}

const emailService = {
  sendEmail,
  sendCustomerConfirmation,
  sendCompanyNotifications,
  sendAllEmails,
  validateEmailConfig
};

export default emailService;