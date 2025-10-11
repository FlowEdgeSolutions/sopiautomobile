interface LeadData {
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

// E-Mail-Template für den Interessenten (Dankes-E-Mail)
export function getCustomerEmailTemplate(leadData: LeadData): { subject: string; html: string } {
  const vehicleConditionLabels: { [key: string]: string } = {
    'motorschaden': 'Motorschaden',
    'unfallschaden': 'Unfallschaden', 
    'getriebeschaden': 'Getriebeschaden',
    'fahrbereit': 'Fahrbereit mit Mängeln',
    'gut': 'Guter Zustand'
  };

  const conditionLabel = vehicleConditionLabels[leadData.vehicle.condition] || leadData.vehicle.condition;

  return {
    subject: `Vielen Dank für Ihre Anfrage - ${leadData.vehicle.brand} ${leadData.vehicle.model}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Sopi Automobile - Danke für Ihre Anfrage</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .tagline { opacity: 0.9; font-size: 14px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 12px; margin-bottom: 20px; }
          .vehicle-summary { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0; }
          .summary-item { margin: 8px 0; }
          .summary-label { font-weight: 600; color: #374151; }
          .next-steps { background: linear-gradient(135deg, #ecfdf5, #f0fdf4); border: 1px solid #10b981; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .steps-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 15px; }
          .step-item { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; }
          .step-number { display: inline-block; color: #10b981; font-size: 18px; font-weight: bold; margin-right: 10px; }
          .step-content { display: inline-block; vertical-align: top; }
          .step-title { font-weight: 600; color: #065f46; font-size: 15px; margin-bottom: 3px; }
          .step-description { color: #374151; font-size: 13px; line-height: 1.4; }
          .contact-info { background: #1f2937; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .contact-item { margin: 5px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <img src="https://sopiautomobile.de/logoSopi.png" alt="Sopi Automobile Logo" width="60" height="60" style="margin-right: 15px;">
            <div>
              <div class="logo">Sopi Automobile</div>
              <div class="tagline">Fahrzeugankauf Hattingen</div>
            </div>
          </div>
        </div>

        <div class="content">
          <h2>Vielen Dank für Ihre Anfrage, ${leadData.contact.name}!</h2>
          
          <p>Wir haben Ihre Anfrage zum Verkauf Ihres Fahrzeugs erfolgreich erhalten und werden uns <strong>binnen 10 Minuten</strong> bei Ihnen melden.</p>

          <div class="vehicle-summary">
            <h3 style="margin-top: 0; color: #dc2626;">📋 Zusammenfassung Ihrer Angaben</h3>
            <div class="summary-item">
              <span class="summary-label">Fahrzeug:</span> ${leadData.vehicle.brand} ${leadData.vehicle.model}
            </div>
            <div class="summary-item">
              <span class="summary-label">Baujahr:</span> ${leadData.vehicle.firstRegistrationYear}
            </div>
            <div class="summary-item">
              <span class="summary-label">Kilometerstand:</span> ${leadData.vehicle.mileageKm.toLocaleString('de-DE')} km
            </div>
            <div class="summary-item">
              <span class="summary-label">Zustand:</span> ${conditionLabel}
            </div>
            <div class="summary-item" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
              <span class="summary-label">Referenz-ID:</span> ${leadData.id.slice(0, 8).toUpperCase()}
            </div>
          </div>

          <div class="next-steps">
            <h3 style="margin-top: 0; color: #059669; text-align: center;">🚀 Nächste Schritte</h3>
            <div class="steps-grid">
              <div class="step-item">
                <span class="step-number">1</span>
                <div class="step-content">
                  <div class="step-title">Prüfung Ihrer Angaben</div>
                  <div class="step-description">Unsere Experten prüfen Ihre Fahrzeugdaten sorgfältig (5 Minuten)</div>
                </div>
              </div>
              <div class="step-item">
                <span class="step-number">2</span>
                <div class="step-content">
                  <div class="step-title">Anruf unseres Experten</div>
                  <div class="step-description">Persönliche Beratung und Rückfragen (innerhalb 10 Minuten)</div>
                </div>
              </div>
              <div class="step-item">
                <span class="step-number">3</span>
                <div class="step-content">
                  <div class="step-title">Individuelle Bewertung & faires Angebot</div>
                  <div class="step-description">Transparente Kalkulation basierend auf aktuellen Marktpreisen</div>
                </div>
              </div>
              <div class="step-item">
                <span class="step-number">4</span>
                <div class="step-content">
                  <div class="step-title">Bei Einverständnis: Kostenlose Abholung</div>
                  <div class="step-description">Bequeme Abholung direkt vor Ort, alle Formalitäten inklusive</div>
                </div>
              </div>
            </div>
          </div>

          <p><strong>Was Sie erwarten können:</strong></p>
          <ul>
            <li>✅ Faire und transparente Bewertung</li>
            <li>✅ Kostenlose Abholung vor Ort</li>
            <li>✅ Sofortige Abwicklung möglich</li>
            <li>✅ Über 15 Jahre Erfahrung</li>
          </ul>
        </div>

        <div class="contact-info">
          <h3 style="margin-top: 0;">📞 Bei Fragen erreichen Sie uns</h3>
          <div class="contact-item"><strong>Mobil:</strong> +49 157 56 99 09 49</div>
          <div class="contact-item"><strong>Festnetz:</strong> +49 232 4977 023 416</div>
          <div class="contact-item"><strong>E-Mail:</strong> info@sopiautomobile.de</div>
          <div class="contact-item"><strong>Standort:</strong> Hattingen</div>
        </div>

        <div class="footer">
          <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
          <p>© 2024 Sopi Automobile. Alle Rechte vorbehalten.</p>
        </div>
      </body>
      </html>
    `
  };
}

// E-Mail-Template für das Unternehmen (Benachrichtigung)
export function getCompanyEmailTemplate(leadData: LeadData): { subject: string; html: string } {
  const vehicleConditionLabels: { [key: string]: string } = {
    'motorschaden': 'Motorschaden',
    'unfallschaden': 'Unfallschaden',
    'getriebeschaden': 'Getriebeschaden', 
    'fahrbereit': 'Fahrbereit mit Mängeln',
    'gut': 'Guter Zustand'
  };

  const conditionLabel = vehicleConditionLabels[leadData.vehicle.condition] || leadData.vehicle.condition;
  const timestamp = new Date(leadData.timestamp).toLocaleString('de-DE');

  return {
    subject: `Neue Fahrzeugankauf-Anfrage - ${leadData.vehicle.brand} ${leadData.vehicle.model}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Neue Fahrzeugankauf-Anfrage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <img src="https://sopiautomobile.de/logoSopi.png" alt="Sopi Automobile Logo" width="50" height="50" style="margin-right: 15px;">
            <h1 style="margin: 0;">Neue Fahrzeugankauf-Anfrage</h1>
          </div>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Lead-ID: ${leadData.id.slice(0, 8).toUpperCase()}</p>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-weight: 500;">
          ⏰ <strong>Sofortige Bearbeitung erforderlich!</strong> Kunde erwartet Rückmeldung binnen 10 Minuten.
        </div>

        <div style="background: #ffffff; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; color: #1f2937; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">🚗 Fahrzeugdaten</h3>
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
            <div style="font-weight: 600; color: #374151;">Marke:</div>
            <div style="color: #1f2937;"><strong>${leadData.vehicle.brand}</strong></div>
            <div style="font-weight: 600; color: #374151;">Modell:</div>
            <div style="color: #1f2937;"><strong>${leadData.vehicle.model}</strong></div>
            <div style="font-weight: 600; color: #374151;">Erstzulassung:</div>
            <div style="color: #1f2937;">${leadData.vehicle.firstRegistrationYear}</div>
            <div style="font-weight: 600; color: #374151;">Kilometerstand:</div>
            <div style="color: #1f2937;">${leadData.vehicle.mileageKm.toLocaleString('de-DE')} km</div>
            <div style="font-weight: 600; color: #374151;">Zustand:</div>
            <div style="color: #1f2937;"><strong style="color: #dc2626;">${conditionLabel}</strong></div>
          </div>
        </div>

        <div style="background: #ffffff; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; color: #1f2937; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">👤 Kontaktdaten</h3>
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
            <div style="font-weight: 600; color: #374151;">Name:</div>
            <div style="color: #1f2937;"><strong>${leadData.contact.name}</strong></div>
            <div style="font-weight: 600; color: #374151;">E-Mail:</div>
            <div style="color: #1f2937;"><a href="mailto:${leadData.contact.email}" style="color: #3b82f6; text-decoration: none;">${leadData.contact.email}</a></div>
            <div style="font-weight: 600; color: #374151;">Telefon:</div>
            <div style="color: #1f2937;"><a href="tel:${leadData.contact.phone}" style="color: #3b82f6; text-decoration: none;">${leadData.contact.phone}</a></div>
          </div>
        </div>

        <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0; color: #059669;">🎯 Sofort-Aktionen</h3>
          <div>
            <a href="tel:${leadData.contact.phone}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px 10px 5px 0; font-weight: 500;">📞 Anrufen</a>
            <a href="mailto:${leadData.contact.email}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px 10px 5px 0; font-weight: 500;">✉️ E-Mail schreiben</a>
          </div>
        </div>

        <div style="background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; padding: 15px; border-radius: 8px; margin: 15px 0; font-weight: 500;">
          <strong>⚡ Bewertungs-Priorität:</strong> 
          ${leadData.vehicle.condition === 'motorschaden' || leadData.vehicle.condition === 'unfallschaden' ? 
            'HOCH - Schadensfahrzeug, schnelle Bewertung wichtig!' : 
            'NORMAL - Reguläre Bearbeitung'}
        </div>

        <div style="background: #ffffff; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; color: #1f2937; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">📊 Meta-Informationen</h3>
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
            <div style="font-weight: 600; color: #374151;">Zeitstempel:</div>
            <div style="color: #1f2937;">${timestamp}</div>
            <div style="font-weight: 600; color: #374151;">Quelle:</div>
            <div style="color: #1f2937;">${leadData.meta.source}</div>
            <div style="font-weight: 600; color: #374151;">IP-Adresse:</div>
            <div style="color: #1f2937;">${leadData.meta.ip}</div>
          </div>
        </div>

        <div style="background: #f3f4f6; border: 1px solid #d1d5db; padding: 15px; border-radius: 6px; font-size: 12px; color: #6b7280;">
          <strong>Technische Details:</strong><br>
          User-Agent: ${leadData.meta.userAgent}<br>
          Datenschutz-Zustimmung: ${leadData.meta.consent ? '✅ Erteilt' : '❌ Nicht erteilt'}<br>
          Lead verarbeitet: ${timestamp}
        </div>
      </body>
      </html>
    `
  };
}