import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

// Validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email too long'), // RFC 5321 limit
  company: z.string()
    .max(100, 'Company name too long')
    .optional(),
  service: z.string()
    .max(100, 'Service name too long')
    .optional(),
  message: z.string()
    .min(1, 'Message is required')
    .max(2000, 'Message must be less than 2000 characters'),
  recaptchaToken: z.string()
    .min(1, 'reCAPTCHA token is required')
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    // Validate using Zod schema
    const validationResult = contactFormSchema.safeParse(body)
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

    const validatedData: ContactFormData = validationResult.data

    // Sanitize text inputs to prevent XSS
    const sanitizedData = {
      ...validatedData,
      name: DOMPurify.sanitize(validatedData.name, { ALLOWED_TAGS: [] }),
      company: validatedData.company ? DOMPurify.sanitize(validatedData.company, { ALLOWED_TAGS: [] }) : undefined,
      service: validatedData.service ? DOMPurify.sanitize(validatedData.service, { ALLOWED_TAGS: [] }) : undefined,
      message: DOMPurify.sanitize(validatedData.message, { ALLOWED_TAGS: [] })
    }

    // Verificar reCAPTCHA (solo si está configurado y no es modo desarrollo)
    const isDevMode = sanitizedData.recaptchaToken === 'dev-mode'
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!isDevMode && recaptchaSecretKey) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecretKey}&response=${sanitizedData.recaptchaToken}`
      })

      const recaptchaData = await recaptchaResponse.json()
      
      if (!recaptchaData.success) {
        console.error('reCAPTCHA verification failed:', recaptchaData)
        return NextResponse.json(
          { error: 'Verificación reCAPTCHA fallida. Por favor, inténtalo de nuevo.' },
          { status: 400 }
        )
      }
    }

    // Configurar el email para la empresa (SellifyWorks)
    const companyEmailData = {
      sender: {
        name: "SellifyWorks Contact Form",
        email: "contact@sellifyworks.com" // Debe ser un dominio verificado en Brevo
      },
      to: [
        {
          email: "contact@sellifyworks.com",
          name: "SellifyWorks"
        }
      ],
      subject: `Nuevo contacto desde la web: ${sanitizedData.name}`,
      htmlContent: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        ${sanitizedData.company ? `<p><strong>Empresa:</strong> ${sanitizedData.company}</p>` : ''}
        ${sanitizedData.service ? `<p><strong>Servicio de interés:</strong> ${sanitizedData.service}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de contacto de SellifyWorks</small></p>
      `,
      replyTo: {
        email: sanitizedData.email,
        name: sanitizedData.name
      }
    }

    // Configurar el email de confirmación para el cliente
    const clientEmailData = {
      sender: {
        name: "SellifyWorks",
        email: "contact@sellifyworks.com"
      },
      to: [
        {
          email: sanitizedData.email,
          name: sanitizedData.name
        }
      ],
      subject: "Hemos recibido tu mensaje - SellifyWorks",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #010314; margin-bottom: 20px;">¡Gracias por contactarnos!</h2>
            
            <p style="color: #333; line-height: 1.6;">Hola ${sanitizedData.name},</p>
            
            <p style="color: #333; line-height: 1.6;">
              Hemos recibido tu mensaje y queremos agradecerte por ponerte en contacto con nosotros. 
              Nuestro equipo revisará tu solicitud y te contactaremos muy pronto.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #010314; margin-top: 0;">Resumen de tu mensaje:</h3>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${sanitizedData.name}</p>
              ${sanitizedData.company ? `<p style="margin: 5px 0;"><strong>Empresa:</strong> ${sanitizedData.company}</p>` : ''}
              ${sanitizedData.service ? `<p style="margin: 5px 0;"><strong>Servicio de interés:</strong> ${sanitizedData.service}</p>` : ''}
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              En SellifyWorks nos especializamos en ayudar a empresas como la tuya a maximizar su presencia 
              en Shopify y aumentar sus ventas online. Estamos emocionados de poder ayudarte.
            </p>
            
            <p style="color: #333; line-height: 1.6;">
              Si tienes alguna pregunta urgente, no dudes en responder a este email.
            </p>
            
            <p style="color: #333; line-height: 1.6; margin-top: 30px;">
              Saludos cordiales,<br>
              <strong>El equipo de SellifyWorks</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              Este es un mensaje automático de confirmación. Por favor, no respondas a este email si no es necesario.
            </p>
          </div>
        </div>
      `
    }

    // Enviar email a la empresa
    const companyResponse = await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(companyEmailData)
    })

    console.log('Company email response status:', companyResponse.status)
    
    if (!companyResponse.ok) {
      const errorText = await companyResponse.text()
      console.error('Error sending company email (raw):', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      console.error('Error sending company email (parsed):', errorData)
      return NextResponse.json(
        { error: 'Error al enviar el email a la empresa', details: errorData },
        { status: 500 }
      )
    }

    const companyResponseData = await companyResponse.json()
    console.log('Company email sent successfully:', companyResponseData)

    // Enviar email de confirmación al cliente
    const clientResponse = await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(clientEmailData)
    })

    console.log('Client email response status:', clientResponse.status)
    
    if (!clientResponse.ok) {
      const errorText = await clientResponse.text()
      console.error('Error sending client email (raw):', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      console.error('Error sending client email (parsed):', errorData)
      // No retornamos error aquí porque el email de la empresa ya se envió
      console.log('Company email was sent, but client confirmation failed')
    } else {
      const clientResponseData = await clientResponse.json()
      console.log('Client confirmation email sent successfully:', clientResponseData)
    }

    return NextResponse.json(
      { 
        message: 'Mensaje enviado correctamente',
        success: true,
        companyEmail: companyResponseData,
        clientEmailSent: clientResponse.ok
      },
      { status: 200 }
    )

  } catch (error) {
    // Log error for debugging (server-side only)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error en contact API:', error)
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined
      })
    } else {
      // In production, only log minimal error information
      console.error('Contact API error:', error instanceof Error ? error.message : 'Unknown error')
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
