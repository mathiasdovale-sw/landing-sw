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

    // Configurar el email para Brevo
    const emailData = {
      sender: {
        name: "SellifyWorks Contact Form",
        email: "sellifyworks@gmail.com" // Debe ser un dominio verificado en Brevo
      },
      to: [
        {
          email: "sellifyworks@gmail.com",
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

    // Enviar email usando Brevo API
    const response = await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(emailData)
    })

    console.log('Brevo response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error de Brevo (raw):', errorText)
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      console.error('Error de Brevo (parsed):', errorData)
      return NextResponse.json(
        { error: 'Error al enviar el email', details: errorData },
        { status: 500 }
      )
    }

    const responseData = await response.json()
    console.log('Email enviado exitosamente:', responseData)

    return NextResponse.json(
      { 
        message: 'Mensaje enviado correctamente',
        success: true,
        brevoResponse: responseData
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
