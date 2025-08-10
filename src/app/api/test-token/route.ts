import { NextRequest, NextResponse } from 'next/server'
import { generateConfirmationToken, consumePendingConfirmation } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    console.log(`🧪 Testing token system for: ${email}`)
    
    // 1. Generar token
    const token = generateConfirmationToken(email)
    console.log(`✅ Generated token: ${token.substring(0, 20)}...`)
    
    // 2. Inmediatamente verificar el token (simular confirmación)
    const extractedEmail = consumePendingConfirmation(token)
    console.log(`✅ Extracted email: ${extractedEmail}`)
    
    // 3. Intentar usar el mismo token otra vez (debería fallar para tokens únicos, pero en JWT funciona múltiples veces)
    const secondTry = consumePendingConfirmation(token)
    console.log(`🔄 Second try: ${secondTry}`)
    
    return NextResponse.json({
      success: true,
      results: {
        originalEmail: email,
        tokenGenerated: true,
        tokenPrefix: token.substring(0, 20) + '...',
        extractedEmail: extractedEmail,
        secondTry: secondTry,
        matches: email === extractedEmail
      }
    })
    
  } catch (error) {
    console.error('Token test error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Test failed', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  if (!token) {
    return NextResponse.json({ error: 'Token parameter required' }, { status: 400 })
  }
  
  try {
    const email = consumePendingConfirmation(token)
    
    return NextResponse.json({
      success: true,
      tokenValid: email !== null,
      extractedEmail: email
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 400 })
  }
}
