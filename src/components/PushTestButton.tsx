'use client';

import { useState } from 'react';

export default function PushTestButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const testPush = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/test-push', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ ' + data.message);
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Fehler beim Senden: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={testPush}
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                   text-white px-6 py-3 rounded-lg font-medium shadow-lg 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 hover:shadow-xl
                   flex items-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sende...
          </>
        ) : (
          <>
            🔔 Test Push-Benachrichtigung senden
          </>
        )}
      </button>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Tipp:</strong> Konfiguriere mindestens einen Push-Dienst in <code className="bg-gray-100 px-1 rounded">.env.local</code></p>
        <p>📖 <strong>Anleitung:</strong> Siehe <code className="bg-gray-100 px-1 rounded">PUSH_NOTIFICATIONS_SETUP.md</code></p>
      </div>
    </div>
  );
}
