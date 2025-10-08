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
          .next-steps { background: linear-gradient(135deg, #ecfdf5, #f0fdf4); border: 2px solid #10b981; padding: 25px; border-radius: 12px; margin: 25px 0; }
          .steps-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 20px; }
          .step-item { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; position: relative; }
          .step-number { position: absolute; top: -10px; left: 20px; background: #10b981; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }
          .step-content { margin-left: 10px; }
          .step-title { font-weight: 700; color: #065f46; font-size: 16px; margin-bottom: 5px; }
          .step-description { color: #374151; font-size: 14px; line-height: 1.5; }
          .contact-info { background: #1f2937; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .contact-item { margin: 5px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🚗 Sopi Automobile</div>
          <div class="tagline">Fahrzeugankauf Hattingen</div>
        </div>

        <div class="content">
          <h2>Vielen Dank für Ihre Anfrage, ${leadData.contact.name}!</h2>
          
          <p>Wir haben Ihre Anfrage zum Verkauf Ihres Fahrzeugs erfolgreich erhalten und werden uns <strong>binnen 24 Stunden</strong> bei Ihnen melden.</p>

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
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">Prüfung Ihrer Angaben</div>
                  <div class="step-description">Unsere Experten prüfen Ihre Fahrzeugdaten sorgfältig (2-4 Stunden)</div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Anruf unseres Experten</div>
                  <div class="step-description">Persönliche Beratung und Rückfragen (innerhalb 24h)</div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Individuelle Bewertung & faires Angebot</div>
                  <div class="step-description">Transparente Kalkulation basierend auf aktuellen Marktpreisen</div>
                </div>
              </div>
              <div class="step-item">
                <div class="step-number">4</div>
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
          <div class="contact-item"><strong>Telefon:</strong> 02324 123456</div>
          <div class="contact-item"><strong>E-Mail:</strong> info@sopi-automobile.de</div>
          <div class="contact-item"><strong>Adresse:</strong> Musterstraße 123, 45525 Hattingen</div>
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
    subject: `🚗 Neue Fahrzeugankauf-Anfrage - ${leadData.vehicle.brand} ${leadData.vehicle.model}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Neue Fahrzeugankauf-Anfrage</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px; }
          .alert { background: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-weight: 500; }
          .section { background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 20px; }
          .section h3 { margin-top: 0; color: #1f2937; border-bottom: 2px solid #dc2626; padding-bottom: 8px; }
          .data-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; }
          .data-label { font-weight: 600; color: #374151; }
          .data-value { color: #1f2937; }
          .contact-actions { background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .contact-button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px 10px 5px 0; font-weight: 500; }
          .priority { background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .meta-info { background: #f3f4f6; border: 1px solid #d1d5db; padding: 15px; border-radius: 6px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">🚨 Neue Fahrzeugankauf-Anfrage</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Lead-ID: ${leadData.id.slice(0, 8).toUpperCase()}</p>
        </div>

        <div class="alert">
          ⏰ <strong>Sofortige Bearbeitung erforderlich!</strong> Kunde erwartet Rückmeldung binnen 24h.
        </div>

        <div class="section">
          <h3>🚗 Fahrzeugdaten</h3>
          <div class="data-grid">
            <div class="data-label">Marke:</div>
            <div class="data-value"><strong>${leadData.vehicle.brand}</strong></div>
            <div class="data-label">Modell:</div>
            <div class="data-value"><strong>${leadData.vehicle.model}</strong></div>
            <div class="data-label">Erstzulassung:</div>
            <div class="data-value">${leadData.vehicle.firstRegistrationYear}</div>
            <div class="data-label">Kilometerstand:</div>
            <div class="data-value">${leadData.vehicle.mileageKm.toLocaleString('de-DE')} km</div>
            <div class="data-label">Zustand:</div>
            <div class="data-value"><strong style="color: #dc2626;">${conditionLabel}</strong></div>
          </div>
        </div>

        <div class="section">
          <h3>👤 Kontaktdaten</h3>
          <div class="data-grid">
            <div class="data-label">Name:</div>
            <div class="data-value"><strong>${leadData.contact.name}</strong></div>
            <div class="data-label">E-Mail:</div>
            <div class="data-value"><a href="mailto:${leadData.contact.email}">${leadData.contact.email}</a></div>
            <div class="data-label">Telefon:</div>
            <div class="data-value"><a href="tel:${leadData.contact.phone}">${leadData.contact.phone}</a></div>
          </div>
        </div>

        <div class="contact-actions">
          <h3 style="margin-top: 0; color: #059669;">🎯 Sofort-Aktionen</h3>
          <a href="tel:${leadData.contact.phone}" class="contact-button">📞 Anrufen</a>
          <a href="mailto:${leadData.contact.email}" class="contact-button">✉️ E-Mail schreiben</a>
        </div>

        <div class="priority">
          <strong>⚡ Bewertungs-Priorität:</strong> 
          ${leadData.vehicle.condition === 'motorschaden' || leadData.vehicle.condition === 'unfallschaden' ? 
            'HOCH - Schadensfahrzeug, schnelle Bewertung wichtig!' : 
            'NORMAL - Reguläre Bearbeitung'}
        </div>

        <div class="section">
          <h3>📊 Meta-Informationen</h3>
          <div class="data-grid">
            <div class="data-label">Zeitstempel:</div>
            <div class="data-value">${timestamp}</div>
            <div class="data-label">Quelle:</div>
            <div class="data-value">${leadData.meta.source}</div>
            <div class="data-label">IP-Adresse:</div>
            <div class="data-value">${leadData.meta.ip}</div>
          </div>
        </div>

        <div class="meta-info">
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