const crypto = require('crypto')

// Generar una clave JWT segura de 64 caracteres
const jwtSecret = crypto.randomBytes(32).toString('hex')

console.log('🔑 Generated JWT Secret:')
console.log(jwtSecret)
console.log('\n📋 Add this to your .env.local file:')
console.log(`JWT_SECRET=${jwtSecret}`)
console.log('\n⚠️  And also add it to your Vercel environment variables!')
