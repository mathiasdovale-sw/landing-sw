import { NextRequest, NextResponse } from 'next/server'
import { generateConfirmationToken, storePendingConfirmation } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    // Agregar mejor manejo de JSON parsing
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Configuración
    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID
    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID || !BREVO_API_KEY) {
      console.error('Missing configuration keys')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Verificar si el email ya está suscrito a la lista
    console.log(`🔍 Checking if ${email} is already subscribed...`)
    const listProfilesResponse = await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/profiles/?filter=equals(email,"${email}")`, {
      method: 'GET',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-02-15'
      }
    })

    if (listProfilesResponse.ok) {
      const listProfilesData = await listProfilesResponse.json()
      if (listProfilesData.data && listProfilesData.data.length > 0) {
        console.log(`⚠️ Email ${email} is already subscribed to the list`)
        return NextResponse.json({
          success: true,
          message: 'Ya estás suscrito a nuestra newsletter'
        })
      } else {
        console.log(`✅ Email ${email} is not subscribed yet, proceeding with confirmation flow`)
      }
    } else {
      console.log(`⚠️ Could not check subscription status for ${email}, proceeding with confirmation flow`)
    }

    // Generar token de confirmación
    const confirmationToken = generateConfirmationToken()
    storePendingConfirmation(confirmationToken, email)

    // Crear URL de confirmación
    const confirmationUrl = `${BASE_URL}/api/newsletter/confirm?token=${confirmationToken}`

    // Enviar email de confirmación usando Brevo
    console.log(`📧 Sending confirmation email via Brevo to: ${email}`)
    
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: "SellifyWorks",
          email: "contact@sellifyworks.com" // Cambia por tu email verificado en Brevo
        },
        to: [
          {
            email: email,
            name: email.split('@')[0] // Usar la parte antes del @ como nombre
          }
        ],
        subject: "Confirma tu suscripción a SellifyWorks",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Confirma tu suscripción</title>
          </head>
          <body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
              <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <div style="text-align: center; margin-bottom: 30px;">
                      <h1 style="color: #000000; font-family: 'Bebas Neue', Arial; font-size: 32px; margin: 0; letter-spacing: 1px;">¡CONFIRMA TU SUSCRIPCIÓN!</h1>
                      <div style="width: 50px; height: 3px; background-color: #000000; margin: 20px auto;"></div>
                  </div>
                  
                  <div style="margin-bottom: 30px;">
                      <p style="margin-bottom: 20px; font-size: 16px;">¡Hola!</p>
                      
                      <p style="margin-bottom: 20px; font-size: 16px;">
                          Gracias por suscribirte a nuestra newsletter de <strong>SellifyWorks</strong>. Para completar tu suscripción y comenzar a recibir nuestros tips exclusivos sobre Shopify y comercio electrónico, solo necesitas confirmar tu dirección de email.
                      </p>
                      
                      <div style="text-align: center; margin: 40px 0;">
                          <a href="${confirmationUrl}" 
                             style="background-color: #000000; color: white; padding: 16px 32px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; transition: background-color 0.3s;">
                              CONFIRMAR SUSCRIPCIÓN
                          </a>
                      </div>
                      
                      <p style="margin-bottom: 20px; font-size: 14px; color: #666;">
                          Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:
                      </p>
                      
                      <p style="word-break: break-all; background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 12px; border-left: 3px solid #000000;">
                          ${confirmationUrl}
                      </p>
                      
                      <p style="margin-top: 30px; font-size: 12px; color: #999;">
                          Este enlace expirará en 24 horas por motivos de seguridad.
                      </p>
                  </div>
                  
                  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                  
                  <div style="text-align: center; font-size: 12px; color: #999;">
                      <p style="margin: 5px 0;">¿No te suscribiste? Puedes ignorar este email de forma segura.</p>
                      <p style="margin: 5px 0;">${new Date().getFullYear()} SellifyWorks. Todos los derechos reservados.</p>
                      <p style="margin: 5px 0;">Barcelona, España</p>
                  </div>
              </div>
          </body>
          </html>
        `,
        textContent: `
¡Confirma tu suscripción a SellifyWorks!

Hola,

Gracias por suscribirte a nuestra newsletter. Para completar tu suscripción, haz clic en el siguiente enlace:

${confirmationUrl}

Este enlace expirará en 24 horas.

Si no te suscribiste, puedes ignorar este email.

SellifyWorks - Barcelona, España
        `
      })
    })

    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text()
      console.error('Brevo email error:', brevoError)
      return NextResponse.json(
        { error: 'Error al enviar email de confirmación' },
        { status: 500 }
      )
    }

    const brevoData = await brevoResponse.json()
    console.log('✅ Email sent via Brevo:', brevoData.messageId)

    return NextResponse.json({
      success: true,
      message: 'Te hemos enviado un email de confirmación. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para completar tu suscripción.'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
