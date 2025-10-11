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
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY environment variable is required');
  }
  
  if (!process.env.SENDGRID_FROM_EMAIL) {
    throw new Error('SENDGRID_FROM_EMAIL environment variable is required');
  }
}

// Send single email
export async function sendEmail(config: EmailConfig): Promise<void> {
  try {
    validateEmailConfig();
    
    const msg = {
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: config.html,
    };

    console.log('📤 Sending email:', {
      from: config.from,
      to: config.to,
      subject: config.subject,
    });

    const response = await sgMail.send(msg);
    
    console.log('✅ Email sent successfully');
    console.log('Response status:', response[0].statusCode);
    console.log('Message ID:', response[0].headers['x-message-id']);
    
  } catch (error: unknown) {
    console.error('❌ Email sending failed:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { status?: number; body?: unknown } };
      console.error('SendGrid error details:', {
        status: sgError.response?.status,
        body: sgError.response?.body,
      });
    }
    
    const message = error instanceof Error ? error.message : 'Unknown error';
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

// Send company notification emails (to both addresses)
export async function sendCompanyNotifications(leadData: LeadData): Promise<void> {
  const emailTemplate = getCompanyEmailTemplate(leadData);
  
  // Send to both company email addresses simultaneously
  const companyEmails = [
    'info@sopiautomobile.de',
    'julianmazreku4@outlook.de'
  ];
  
  const config: EmailConfig = {
    from: process.env.SENDGRID_FROM_EMAIL!,
    to: companyEmails,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  };
  
  console.log('\n🏢 === COMPANY NOTIFICATION EMAILS ===');
  console.log('Lead ID:', leadData.id);
  console.log('Sending to:', companyEmails.join(', '));
  
  await sendEmail(config);
  
  console.log('✅ Company notification emails sent successfully');
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