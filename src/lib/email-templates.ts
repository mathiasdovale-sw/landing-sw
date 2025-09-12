// Email templates for newsletter subscription confirmation

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export function getNewsletterConfirmationTemplate(
  email: string, 
  confirmationUrl: string, 
  language: 'es' | 'en' = 'es'
): EmailTemplate {
  
  const templates = {
    es: {
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
    },
    en: {
      subject: "Confirm your SellifyWorks subscription",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirm your subscription</title>
        </head>
        <body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #000000; font-family: 'Bebas Neue', Arial; font-size: 32px; margin: 0; letter-spacing: 1px;">CONFIRM YOUR SUBSCRIPTION!</h1>
                    <div style="width: 50px; height: 3px; background-color: #000000; margin: 20px auto;"></div>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <p style="margin-bottom: 20px; font-size: 16px;">Hello!</p>
                    
                    <p style="margin-bottom: 20px; font-size: 16px;">
                        Thank you for subscribing to <strong>SellifyWorks</strong> newsletter. To complete your subscription and start receiving our exclusive tips about Shopify and e-commerce, you just need to confirm your email address.
                    </p>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <a href="${confirmationUrl}" 
                           style="background-color: #000000; color: white; padding: 16px 32px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; transition: background-color 0.3s;">
                            CONFIRM SUBSCRIPTION
                        </a>
                    </div>
                    
                    <p style="margin-bottom: 20px; font-size: 14px; color: #666;">
                        If the button doesn't work, you can copy and paste this link into your browser:
                    </p>
                    
                    <p style="word-break: break-all; background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 12px; border-left: 3px solid #000000;">
                        ${confirmationUrl}
                    </p>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #999;">
                        This link will expire in 24 hours for security reasons.
                    </p>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <div style="text-align: center; font-size: 12px; color: #999;">
                    <p style="margin: 5px 0;">Didn't subscribe? You can safely ignore this email.</p>
                    <p style="margin: 5px 0;">${new Date().getFullYear()} SellifyWorks. All rights reserved.</p>
                    <p style="margin: 5px 0;">Barcelona, Spain</p>
                </div>
            </div>
        </body>
        </html>
      `,
      textContent: `
Confirm your SellifyWorks subscription!

Hello,

Thank you for subscribing to our newsletter. To complete your subscription, click on the following link:

${confirmationUrl}

This link will expire in 24 hours.

If you didn't subscribe, you can safely ignore this email.

SellifyWorks - Barcelona, Spain
      `
    }
  };

  return templates[language];
}

// Function to detect language from referer URL
export function detectLanguageFromReferer(referer: string | null): 'es' | 'en' {
  if (!referer) return 'es'; // Default to Spanish
  
  try {
    const url = new URL(referer);
    const pathname = url.pathname;
    
    // Check if the path starts with /en
    if (pathname.startsWith('/en')) {
      return 'en';
    }
    
    // Default to Spanish for /es or any other path
    return 'es';
  } catch (error) {
    // If URL parsing fails, default to Spanish
    return 'es';
  }
}

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

// Get company email template for contact form
export function getContactCompanyEmailTemplate(
  data: ContactFormData,
  language: 'es' | 'en' = 'es'
): EmailTemplate {
  
  const templates = {
    es: {
      subject: `Nuevo contacto desde la web: ${data.name}`,
      htmlContent: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
        ${data.service ? `<p><strong>Servicio de interés:</strong> ${data.service}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>Este mensaje fue enviado desde el formulario de contacto de SellifyWorks</small></p>
      `,
      textContent: `
Nuevo mensaje de contacto

Nombre: ${data.name}
Email: ${data.email}
${data.company ? `Empresa: ${data.company}` : ''}
${data.service ? `Servicio de interés: ${data.service}` : ''}

Mensaje:
${data.message}

Este mensaje fue enviado desde el formulario de contacto de SellifyWorks
      `
    },
    en: {
      subject: `New contact from website: ${data.name}`,
      htmlContent: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.service ? `<p><strong>Service of interest:</strong> ${data.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>This message was sent from the SellifyWorks contact form</small></p>
      `,
      textContent: `
New contact message

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
${data.service ? `Service of interest: ${data.service}` : ''}

Message:
${data.message}

This message was sent from the SellifyWorks contact form
      `
    }
  };

  return templates[language];
}

// Get client confirmation email template for contact form
export function getContactClientEmailTemplate(
  data: ContactFormData,
  language: 'es' | 'en' = 'es'
): EmailTemplate {
  
  const templates = {
    es: {
      subject: "Hemos recibido tu mensaje - SellifyWorks",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #010314; margin-bottom: 20px;">¡Gracias por contactarnos!</h2>
            
            <p style="color: #333; line-height: 1.6;">Hola ${data.name},</p>
            
            <p style="color: #333; line-height: 1.6;">
              Hemos recibido tu mensaje y queremos agradecerte por ponerte en contacto con nosotros. 
              Nuestro equipo revisará tu solicitud y te contactaremos muy pronto.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #010314; margin-top: 0;">Resumen de tu mensaje:</h3>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${data.name}</p>
              ${data.company ? `<p style="margin: 5px 0;"><strong>Empresa:</strong> ${data.company}</p>` : ''}
              ${data.service ? `<p style="margin: 5px 0;"><strong>Servicio de interés:</strong> ${data.service}</p>` : ''}
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
      `,
      textContent: `
¡Gracias por contactarnos!

Hola ${data.name},

Hemos recibido tu mensaje y queremos agradecerte por ponerte en contacto con nosotros. Nuestro equipo revisará tu solicitud y te contactaremos muy pronto.

Resumen de tu mensaje:
Nombre: ${data.name}
${data.company ? `Empresa: ${data.company}` : ''}
${data.service ? `Servicio de interés: ${data.service}` : ''}

En SellifyWorks nos especializamos en ayudar a empresas como la tuya a maximizar su presencia en Shopify y aumentar sus ventas online. Estamos emocionados de poder ayudarte.

Si tienes alguna pregunta urgente, no dudes en responder a este email.

Saludos cordiales,
El equipo de SellifyWorks

Este es un mensaje automático de confirmación.
      `
    },
    en: {
      subject: "We have received your message - SellifyWorks",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #010314; margin-bottom: 20px;">Thank you for contacting us!</h2>
            
            <p style="color: #333; line-height: 1.6;">Hello ${data.name},</p>
            
            <p style="color: #333; line-height: 1.6;">
              We have received your message and want to thank you for getting in touch with us. 
              Our team will review your request and contact you very soon.
            </p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #010314; margin-top: 0;">Summary of your message:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>
              ${data.company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${data.company}</p>` : ''}
              ${data.service ? `<p style="margin: 5px 0;"><strong>Service of interest:</strong> ${data.service}</p>` : ''}
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              At SellifyWorks we specialize in helping companies like yours maximize their presence 
              on Shopify and increase their online sales. We are excited to be able to help you.
            </p>
            
            <p style="color: #333; line-height: 1.6;">
              If you have any urgent questions, feel free to reply to this email.
            </p>
            
            <p style="color: #333; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong>The SellifyWorks team</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This is an automatic confirmation message. Please do not reply to this email unless necessary.
            </p>
          </div>
        </div>
      `,
      textContent: `
Thank you for contacting us!

Hello ${data.name},

We have received your message and want to thank you for getting in touch with us. Our team will review your request and contact you very soon.

Summary of your message:
Name: ${data.name}
${data.company ? `Company: ${data.company}` : ''}
${data.service ? `Service of interest: ${data.service}` : ''}

At SellifyWorks we specialize in helping companies like yours maximize their presence on Shopify and increase their online sales. We are excited to be able to help you.

If you have any urgent questions, feel free to reply to this email.

Best regards,
The SellifyWorks team

This is an automatic confirmation message.
      `
    }
  };

  return templates[language];
}