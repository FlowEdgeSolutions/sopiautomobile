// Push-Benachrichtigungssystem für neue Leads
// Unterstützt OneSignal, Firebase und Telegram

interface PushNotificationData {
  leadId: string;
  customerName: string;
  vehicleBrand: string;
  vehicleModel: string;
  phone: string;
  timestamp: string;
}

// ===========================
// OPTION 1: OneSignal (Web Push - EMPFOHLEN)
// ===========================

export async function sendOneSignalPush(data: PushNotificationData): Promise<boolean> {
  console.log('\n🔔 === ONESIGNAL PUSH NOTIFICATION ===');
  console.log('Lead ID:', data.leadId);
  
  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_API_KEY;
  const userId = process.env.ONESIGNAL_USER_ID;

  if (!appId || !apiKey) {
    console.log('⏭️ OneSignal not configured, skipping...');
    return false;
  }

  try {
    const notification = {
      app_id: appId,
      // Option A: An spezifischen Benutzer (empfohlen)
      include_player_ids: userId ? [userId] : undefined,
      // Option B: An alle Abonnenten
      included_segments: !userId ? ['All'] : undefined,
      
      headings: { en: '🚗 Neue Lead-Anfrage!' },
      contents: { 
        en: `${data.customerName} - ${data.vehicleBrand} ${data.vehicleModel}\n📞 ${data.phone}` 
      },
      data: {
        leadId: data.leadId,
        type: 'new_lead',
        url: `https://sopiautomobile.de/admin`
      },
      url: 'https://sopiautomobile.de/admin',
      ios_badgeType: 'Increase',
      ios_badgeCount: 1
    };

    console.log('Sending OneSignal notification...');
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${apiKey}`
      },
      body: JSON.stringify(notification)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ OneSignal error:', result);
      throw new Error(`OneSignal failed: ${JSON.stringify(result)}`);
    }

    console.log('✅ OneSignal notification sent successfully');
    console.log('Recipients:', result.recipients);
    return true;
    
  } catch (error) {
    console.error('❌ OneSignal push failed:', error);
    throw error;
  }
}

// ===========================
// OPTION 2: Firebase Cloud Messaging (FCM)
// ===========================

export async function sendFirebasePush(data: PushNotificationData): Promise<boolean> {
  console.log('\n🔥 === FIREBASE PUSH NOTIFICATION ===');
  console.log('Lead ID:', data.leadId);
  
  const serverKey = process.env.FIREBASE_SERVER_KEY;
  const deviceToken = process.env.FIREBASE_DEVICE_TOKEN;

  if (!serverKey || !deviceToken) {
    console.log('⏭️ Firebase not configured, skipping...');
    return false;
  }

  try {
    const message = {
      to: deviceToken,
      notification: {
        title: '🚗 Neue Lead-Anfrage!',
        body: `${data.customerName} - ${data.vehicleBrand} ${data.vehicleModel}\n📞 ${data.phone}`,
        sound: 'default',
        badge: 1
      },
      data: {
        leadId: data.leadId,
        type: 'new_lead',
        clickAction: 'https://sopiautomobile.de/admin'
      },
      priority: 'high'
    };

    console.log('Sending Firebase notification...');
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${serverKey}`
      },
      body: JSON.stringify(message)
    });

    const result = await response.json();
    
    if (!response.ok || result.failure > 0) {
      console.error('❌ Firebase error:', result);
      throw new Error(`Firebase failed: ${JSON.stringify(result)}`);
    }

    console.log('✅ Firebase notification sent successfully');
    console.log('Message ID:', result.results?.[0]?.message_id);
    return true;
    
  } catch (error) {
    console.error('❌ Firebase push failed:', error);
    throw error;
  }
}

// ===========================
// OPTION 3: Telegram Bot (Einfachste Alternative)
// ===========================

export async function sendTelegramNotification(data: PushNotificationData): Promise<boolean> {
  console.log('\n📱 === TELEGRAM NOTIFICATION ===');
  console.log('Lead ID:', data.leadId);
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('⏭️ Telegram not configured, skipping...');
    return false;
  }

  try {
    const message = `
🚗 *Neue Lead-Anfrage!*

👤 *Kunde:* ${data.customerName}
🚙 *Fahrzeug:* ${data.vehicleBrand} ${data.vehicleModel}
📞 *Telefon:* ${data.phone}
🆔 *Lead-ID:* ${data.leadId}
⏰ *Zeit:* ${new Date(data.timestamp).toLocaleString('de-DE')}

[Zum Admin-Panel](https://sopiautomobile.de/admin)
    `.trim();

    console.log('Sending Telegram notification...');
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      }
    );

    const result = await response.json();
    
    if (!result.ok) {
      console.error('❌ Telegram error:', result);
      throw new Error(`Telegram failed: ${result.description}`);
    }

    console.log('✅ Telegram notification sent successfully');
    console.log('Message ID:', result.result?.message_id);
    return true;
    
  } catch (error) {
    console.error('❌ Telegram notification failed:', error);
    throw error;
  }
}

// ===========================
// MAIN FUNCTION: Send All Configured Push Notifications
// ===========================

export async function sendPushNotifications(data: PushNotificationData): Promise<void> {
  console.log('\n🚀 === STARTING PUSH NOTIFICATION PROCESS ===');
  console.log('Lead ID:', data.leadId);
  
  const results = await Promise.allSettled([
    sendOneSignalPush(data).catch(e => {
      console.error('OneSignal failed but continuing:', e);
      return false;
    }),
    sendFirebasePush(data).catch(e => {
      console.error('Firebase failed but continuing:', e);
      return false;
    }),
    sendTelegramNotification(data).catch(e => {
      console.error('Telegram failed but continuing:', e);
      return false;
    })
  ]);

  const successCount = results.filter(
    r => r.status === 'fulfilled' && r.value === true
  ).length;

  console.log(`✅ Push notifications: ${successCount}/${results.length} successful`);
  
  if (successCount === 0) {
    console.warn('⚠️ No push notifications were sent (all services disabled or failed)');
  }
}
