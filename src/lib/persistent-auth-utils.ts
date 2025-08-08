import fs from 'fs'
import path from 'path'

// Para producción, considera usar una base de datos real
// Este es un simple almacenamiento en archivo para persistencia entre reinicios

const TOKENS_FILE_PATH = path.join(process.cwd(), 'data', 'pending-confirmations.json')

interface PendingConfirmation {
  email: string
  timestamp: number
}

// Asegurar que el directorio existe
function ensureDataDirectory(): void {
  const dataDir = path.dirname(TOKENS_FILE_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Leer tokens desde archivo
function readTokensFromFile(): Map<string, PendingConfirmation> {
  try {
    if (!fs.existsSync(TOKENS_FILE_PATH)) {
      return new Map()
    }
    
    const data = fs.readFileSync(TOKENS_FILE_PATH, 'utf-8')
    const parsed = JSON.parse(data)
    return new Map(Object.entries(parsed))
  } catch (error) {
    console.error('Error reading tokens file:', error)
    return new Map()
  }
}

// Escribir tokens al archivo
function writeTokensToFile(tokens: Map<string, PendingConfirmation>): void {
  try {
    ensureDataDirectory()
    const data = Object.fromEntries(tokens)
    fs.writeFileSync(TOKENS_FILE_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing tokens file:', error)
  }
}

// Limpiar tokens expirados
function cleanExpiredTokens(tokens: Map<string, PendingConfirmation>): void {
  const EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 horas
  const now = Date.now()
  
  for (const [token, confirmation] of tokens.entries()) {
    if (now - confirmation.timestamp > EXPIRY_TIME) {
      tokens.delete(token)
    }
  }
}

// Almacenar un token de confirmación con persistencia
export function storePendingConfirmationPersistent(token: string, email: string): void {
  const tokens = readTokensFromFile()
  cleanExpiredTokens(tokens)
  
  tokens.set(token, {
    email,
    timestamp: Date.now()
  })
  
  writeTokensToFile(tokens)
}

// Obtener y remover un token de confirmación con persistencia
export function consumePendingConfirmationPersistent(token: string): string | null {
  const tokens = readTokensFromFile()
  cleanExpiredTokens(tokens)
  
  const confirmation = tokens.get(token)
  if (confirmation) {
    const EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 horas
    if (Date.now() - confirmation.timestamp > EXPIRY_TIME) {
      tokens.delete(token)
      writeTokensToFile(tokens)
      return null
    }
    
    tokens.delete(token)
    writeTokensToFile(tokens)
    return confirmation.email
  }
  
  return null
}

// Función para limpiar tokens expirados (ejecutar como cron job)
export function cleanupExpiredTokens(): void {
  const tokens = readTokensFromFile()
  const initialSize = tokens.size
  cleanExpiredTokens(tokens)
  
  if (tokens.size !== initialSize) {
    writeTokensToFile(tokens)
    console.log(`Cleaned up ${initialSize - tokens.size} expired tokens`)
  }
}
