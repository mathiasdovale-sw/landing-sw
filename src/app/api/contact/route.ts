import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  message: string
  recaptchaToken: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validar datos requeridos
    if (!body.name || !body.email || !body.message || !body.recaptchaToken) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben estar completos' },
        { status: 400 }
      )
    }

    // Verificar reCAPTCHA (solo si está configurado y no es modo desarrollo)
    const isDevMode = body.recaptchaToken === 'dev-mode'
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!isDevMode && recaptchaSecretKey) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecretKey}&response=${body.recaptchaToken}`
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
      subject: `Nuevo contacto desde la web: ${body.name}`,
      htmlContent: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        ${body.company ? `<p><strong>Empresa:</strong> ${body.company}</p>` : ''}
        ${body.service ? `<p><strong>Servicio de interés:</strong> ${body.service}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de contacto de SellifyWorks</small></p>
      `,
      replyTo: {
        email: body.email,
        name: body.name
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
          email: body.email,
          name: body.name
        }
      ],
      subject: "Hemos recibido tu mensaje - SellifyWorks",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #010314; margin-bottom: 20px;">¡Gracias por contactarnos!</h2>
            
            <p style="color: #333; line-height: 1.6;">Hola ${body.name},</p>
            
            <p style="color: #333; line-height: 1.6;">
              Hemos recibido tu mensaje y queremos agradecerte por ponerte en contacto con nosotros. 
              Nuestro equipo revisará tu solicitud y te contactaremos muy pronto.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #010314; margin-top: 0;">Resumen de tu mensaje:</h3>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${body.name}</p>
              ${body.company ? `<p style="margin: 5px 0;"><strong>Empresa:</strong> ${body.company}</p>` : ''}
              ${body.service ? `<p style="margin: 5px 0;"><strong>Servicio de interés:</strong> ${body.service}</p>` : ''}
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
    console.error('Error en contact API:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}
