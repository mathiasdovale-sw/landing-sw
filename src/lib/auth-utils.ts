import crypto from 'crypto'
import { storePendingConfirmationPersistent, consumePendingConfirmationPersistent } from './persistent-auth-utils'

// Determinar si usar persistencia (para producción)
const USE_PERSISTENT_STORAGE = process.env.NODE_ENV === 'production'

// Generar un token de confirmación único
export function generateConfirmationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Verificar si un token es válido (puedes expandir esto con expiración)
export function verifyConfirmationToken(token: string): boolean {
  // Por ahora, verificamos que sea un hex string de 64 caracteres
  return /^[a-f0-9]{64}$/i.test(token)
}

// Estructura para almacenar tokens pendientes (solo para desarrollo)
const pendingConfirmations = new Map<string, { email: string, timestamp: number }>()

// Almacenar un token de confirmación
export function storePendingConfirmation(token: string, email: string): void {
  if (USE_PERSISTENT_STORAGE) {
    storePendingConfirmationPersistent(token, email)
  } else {
    pendingConfirmations.set(token, {
      email,
      timestamp: Date.now()
    })
  }
}

// Obtener y remover un token de confirmación
export function consumePendingConfirmation(token: string): string | null {
  if (USE_PERSISTENT_STORAGE) {
    return consumePendingConfirmationPersistent(token)
  } else {
    const confirmation = pendingConfirmations.get(token)
    if (confirmation) {
      // Verificar que no haya expirado (24 horas)
      const EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 horas en ms
      if (Date.now() - confirmation.timestamp > EXPIRY_TIME) {
        pendingConfirmations.delete(token)
        return null
      }
      
      pendingConfirmations.delete(token)
      return confirmation.email
    }
    return null
  }
}
