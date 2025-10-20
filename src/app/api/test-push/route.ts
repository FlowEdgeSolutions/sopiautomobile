import { NextResponse } from 'next/server';
import { sendPushNotifications } from '@/lib/push-notification';

export async function POST() {
  console.log('\n🧪 === TEST PUSH NOTIFICATION API ===');
  
  try {
    await sendPushNotifications({
      leadId: 'TEST-' + Date.now(),
      customerName: 'Max Mustermann',
      vehicleBrand: 'BMW',
      vehicleModel: '320d Touring',
      phone: '+49 176 12345678',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: '✅ Test-Push-Benachrichtigung wurde gesendet! Überprüfe dein iPhone/Telegram.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Test push failed:', error);
    return NextResponse.json({
      success: false,
      message: '❌ Fehler beim Senden der Test-Benachrichtigung',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Push Notification Test API',
    availableServices: {
      oneSignal: !!process.env.ONESIGNAL_APP_ID,
      firebase: !!process.env.FIREBASE_SERVER_KEY,
      telegram: !!process.env.TELEGRAM_BOT_TOKEN
    },
    documentation: '/PUSH_NOTIFICATIONS_SETUP.md'
  });
}
