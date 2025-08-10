import { generateConfirmationToken, consumePendingConfirmation } from '@/lib/auth-utils'

export default function TokenTest() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">🧪 Test del Sistema de Tokens JWT</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Para probar manualmente:</h2>
        <p className="text-sm">
          1. Abre la consola del navegador (F12)<br/>
          2. Ejecuta estas líneas para generar y verificar un token:
        </p>
        <pre className="bg-gray-800 text-green-400 p-2 rounded mt-2 text-xs overflow-x-auto">
{`// Simular generación de token
const testEmail = 'test@example.com'
console.log('Generando token para:', testEmail)

// Hacer una petición de test
fetch('/api/test-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: testEmail })
})
.then(res => res.json())
.then(data => console.log('Resultado:', data))`}
        </pre>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <h2 className="font-semibold mb-2">✅ Sistema actualizado:</h2>
        <ul className="text-sm space-y-1">
          <li>• Tokens JWT sin estado (funciona en Vercel)</li>
          <li>• No requiere sistema de archivos</li>
          <li>• Autoexpirante en 24 horas</li>
          <li>• Firmado cryptográficamente</li>
        </ul>
      </div>
    </div>
  )
}
