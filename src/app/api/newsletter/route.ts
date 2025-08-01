import { NextRequest, NextResponse } from 'next/server'
import { generateConfirmationToken, storePendingConfirmation } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

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

    // Configuración de Klaviyo
    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
      console.error('Missing Klaviyo configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Verificar si el email ya está suscrito a la lista
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
        return NextResponse.json({
          success: true,
          message: 'Ya estás suscrito a nuestra newsletter'
        })
      }
    }

    // Crear o actualizar perfil en Klaviyo (sin suscribir a la lista aún)
    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: email
          }
        }
      })
    })

    let profileId: string
    
    if (!profileResponse.ok) {
      const errorData = await profileResponse.text()
      
      // Manejar perfil duplicado (usuario ya existe)
      if (profileResponse.status === 409) {
        try {
          const errorJson = JSON.parse(errorData)
          const duplicateError = errorJson.errors?.find((error: any) => 
            error.code === 'duplicate_profile'
          )
          
          if (duplicateError && duplicateError.meta?.duplicate_profile_id) {
            profileId = duplicateError.meta.duplicate_profile_id
          } else {
            return NextResponse.json(
              { error: 'Error al procesar el perfil' },
              { status: 500 }
            )
          }
        } catch (parseError) {
          console.error('Error parsing Klaviyo error response:', parseError)
          return NextResponse.json(
            { error: 'Error al procesar el perfil' },
            { status: 500 }
          )
        }
      } else {
        console.error('Klaviyo profile error:', errorData)
        return NextResponse.json(
          { error: 'Failed to create profile' },
          { status: 500 }
        )
      }
    } else {
      const profileData = await profileResponse.json()
      profileId = profileData.data.id
    }

    // Generar token de confirmación
    const confirmationToken = generateConfirmationToken()
    storePendingConfirmation(confirmationToken, email)

    // Crear URL de confirmación
    const confirmationUrl = `${BASE_URL}/api/newsletter/confirm?token=${confirmationToken}`

    // Enviar email de confirmación usando Klaviyo
    const emailResponse = await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            properties: {
              confirmation_url: confirmationUrl,
              email: email
            },
            metric: {
              data: {
                type: 'metric',
                attributes: {
                  name: 'Newsletter Confirmation Required'
                }
              }
            },
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email: email
                }
              }
            }
          }
        }
      })
    })

    if (!emailResponse.ok) {
      const emailErrorData = await emailResponse.text()
      console.error('Klaviyo email error:', emailErrorData)
      return NextResponse.json(
        { error: 'Error al enviar email de confirmación' },
        { status: 500 }
      )
    }

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
