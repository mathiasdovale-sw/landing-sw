import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { generateConfirmationToken, storePendingConfirmation } from '@/lib/auth-utils'
import { getNewsletterConfirmationTemplate, detectLanguageFromReferer } from '@/lib/email-templates'

// Validation schema
const newsletterSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email too long') // RFC 5321 limit
    .transform(email => email.toLowerCase().trim())
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Validate using Zod schema
    const validationResult = newsletterSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    // Sanitize email (additional safety)
    const sanitizedEmail = DOMPurify.sanitize(email, { ALLOWED_TAGS: [] })

    // Detect language from referer header
    const referer = request.headers.get('referer')
    const language = detectLanguageFromReferer(referer)
    console.log(`🌍 Detected language: ${language} from referer: ${referer}`)

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
    console.log(`🔍 Checking if ${sanitizedEmail} is already subscribed...`)
    const listProfilesResponse = await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/profiles/?filter=equals(email,"${sanitizedEmail}")`, {
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
        console.log(`⚠️ Email ${sanitizedEmail} is already subscribed to the list`)
        
        const alreadySubscribedMessages = {
          es: 'Ya estás suscrito a nuestra newsletter',
          en: 'You are already subscribed to our newsletter'
        }
        
        return NextResponse.json({
          success: true,
          message: alreadySubscribedMessages[language]
        })
      } else {
        console.log(`✅ Email ${sanitizedEmail} is not subscribed yet, proceeding with confirmation flow`)
      }
    } else {
      console.log(`⚠️ Could not check subscription status for ${sanitizedEmail}, proceeding with confirmation flow`)
    }

    // Generar token de confirmación
    const confirmationToken = generateConfirmationToken(sanitizedEmail)
    
    // La función storePendingConfirmation ya no es necesaria con JWT
    // pero la mantenemos para compatibilidad
    storePendingConfirmation(confirmationToken, sanitizedEmail)

    // Crear URL de confirmación con idioma
    const confirmationUrl = `${BASE_URL}/api/newsletter/confirm?token=${confirmationToken}&lang=${language}`

    // Get email template based on detected language
    const emailTemplate = getNewsletterConfirmationTemplate(sanitizedEmail, confirmationUrl, language)

    // Enviar email de confirmación usando Brevo
    console.log(`📧 Sending confirmation email via Brevo to: ${sanitizedEmail} in ${language}`)
    
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: "SellifyWorks",
          email: "contact@sellifyworks.com"
        },
        to: [
          {
            email: sanitizedEmail,
            name: sanitizedEmail.split('@')[0]
          }
        ],
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.htmlContent,
        textContent: emailTemplate.textContent
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

    // Response messages based on language
    const responseMessages = {
      es: 'Te hemos enviado un email de confirmación. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para completar tu suscripción.',
      en: 'We have sent you a confirmation email. Please check your inbox and click the link to complete your subscription.'
    }

    return NextResponse.json({
      success: true,
      message: responseMessages[language],
      language: language
    })

  } catch (error) {
    // Log error appropriately based on environment
    if (process.env.NODE_ENV === 'development') {
      console.error('Newsletter subscription error:', error)
    } else {
      console.error('Newsletter subscription error:', error instanceof Error ? error.message : 'Unknown error')
    }
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.',
        // Only include error details in development
        ...(process.env.NODE_ENV === 'development' && {
          details: error instanceof Error ? error.message : 'Error desconocido'
        })
      },
      { status: 500 }
    )
  }
}
