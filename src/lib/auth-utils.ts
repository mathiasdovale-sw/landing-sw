import crypto from 'crypto'

// JWT Token approach for stateless authentication (works in Vercel)
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
    throw new Error('JWT_SECRET environment variable is required in production')
  }
  console.warn('⚠️  JWT_SECRET not set! Using fallback secret for development only.')
  return 'wJzsub4lwH9A3yt2YtRDlmAc7RfsWeUoIziw8L780bw='
})()

// Validate JWT_SECRET strength
if (JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long for security')
}

interface TokenPayload {
  email: string
  timestamp: number
  exp: number
  iat: number // issued at
}

// Generar un token de confirmación único usando JWT
export function generateConfirmationToken(email: string): string {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }
  
  const now = Math.floor(Date.now() / 1000)
  const payload: TokenPayload = {
    email,
    timestamp: Date.now(),
    iat: now,
    exp: now + (24 * 60 * 60) // Expira en 24 horas
  }
  
  // Simple JWT implementation (base64 encode)
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url')
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')
  
  // Create signature
  const data = `${encodedHeader}.${encodedPayload}`
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest('base64url')
  
  return `${data}.${signature}`
}

// Verificar si un token es válido y devolver el email
export function consumePendingConfirmation(token: string): string | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      console.error('Invalid token format')
      return null
    }

    const [headerB64, payloadB64, signature] = parts
    
    // Verify signature
    const data = `${headerB64}.${payloadB64}`
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(data)
      .digest('base64url')
    
    if (signature !== expectedSignature) {
      console.error('Invalid token signature')
      return null
    }

    // Decode payload
    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString()
    )

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (now > payload.exp) {
      console.error('Token expired')
      return null
    }

    return payload.email
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

// Legacy function for backward compatibility (no longer needed)
export function storePendingConfirmation(token: string, email: string): void {
  // This function is no longer needed with JWT approach
  // but kept for compatibility
  console.log('Using JWT tokens - storePendingConfirmation is deprecated')
}

// Verificar si un token es válido (legacy function)
export function verifyConfirmationToken(token: string): boolean {
  return consumePendingConfirmation(token) !== null
}
