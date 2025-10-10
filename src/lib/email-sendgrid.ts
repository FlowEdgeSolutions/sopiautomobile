import sgMail from '@sendgrid/mail';

// SendGrid-Client initialisieren
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sendet eine E-Mail über SendGrid
 */
export async function sendEmail(emailData: EmailData): Promise<SendEmailResult> {
  console.log('📧 SendGrid E-Mail wird versendet...');
  console.log('Empfänger:', emailData.to);
  console.log('Betreff:', emailData.subject);
  console.log('Absender:', emailData.from || process.env.FROM_EMAIL);

  if (!process.env.SENDGRID_API_KEY) {
    console.error('❌ SENDGRID_API_KEY nicht konfiguriert');
    return {
      success: false,
      error: 'SendGrid API-Key nicht konfiguriert'
    };
  }

  try {
    const msg = {
      to: emailData.to,
      from: emailData.from || process.env.FROM_EMAIL || 'noreply@sopiautomobile.de',
      subject: emailData.subject,
      html: emailData.html,
    };

    console.log('📤 SendGrid API-Aufruf wird gestartet...');
    const startTime = Date.now();
    
    const [response] = await sgMail.send(msg);
    
    const endTime = Date.now();
    console.log(`✅ SendGrid E-Mail erfolgreich versendet in ${endTime - startTime}ms`);
    console.log('Response Status:', response.statusCode);
    console.log('Message ID:', response.headers['x-message-id']);

    return {
      success: true,
      messageId: response.headers['x-message-id'] as string
    };

  } catch (error: unknown) {
    console.error('❌ SendGrid E-Mail-Fehler:', error);
    
    let errorMessage = 'Unbekannter Fehler';
    
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { body?: { errors?: Array<{ message: string }> } } };
      if (sgError.response?.body?.errors) {
        errorMessage = sgError.response.body.errors.map((e: { message: string }) => e.message).join(', ');
      }
    } else if (error instanceof Error && error.message) {
      errorMessage = error.message;
    }

    console.error('Fehlerdetails:', errorMessage);

    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * Sendet mehrere E-Mails parallel über SendGrid
 */
export async function sendMultipleEmails(emails: EmailData[]): Promise<SendEmailResult[]> {
  console.log(`📧 ${emails.length} E-Mails werden parallel über SendGrid versendet...`);
  
  const promises = emails.map(email => sendEmail(email));
  const results = await Promise.allSettled(promises);
  
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      console.error(`❌ E-Mail ${index + 1} fehlgeschlagen:`, result.reason);
      return {
        success: false,
        error: result.reason?.message || 'Unbekannter Fehler'
      };
    }
  });
}

/**
 * Prüft die SendGrid-Konfiguration
 */
export function validateSendGridConfig(): { valid: boolean; error?: string } {
  if (!process.env.SENDGRID_API_KEY) {
    return {
      valid: false,
      error: 'SENDGRID_API_KEY Umgebungsvariable fehlt'
    };
  }

  if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    return {
      valid: false,
      error: 'SENDGRID_API_KEY Format ist ungültig (sollte mit "SG." beginnen)'
    };
  }

  if (!process.env.FROM_EMAIL) {
    return {
      valid: false,
      error: 'FROM_EMAIL Umgebungsvariable fehlt'
    };
  }

  return { valid: true };
}