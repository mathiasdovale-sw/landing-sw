import { NextRequest, NextResponse } from 'next/server'
import { consumePendingConfirmation } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token de confirmación requerido' },
        { status: 400 }
      )
    }

    // Verificar y consumir el token
    const email = consumePendingConfirmation(token)
    
    if (!email) {
      return NextResponse.json(
        { error: 'Token de confirmación inválido o expirado' },
        { status: 400 }
      )
    }

    // Configuración de Klaviyo
    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
      console.error('Missing Klaviyo configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Buscar el perfil por email
    const profileSearchResponse = await fetch(`https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`, {
      method: 'GET',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-02-15'
      }
    })

    if (!profileSearchResponse.ok) {
      console.error('Error searching for profile')
      return NextResponse.json(
        { error: 'Error al buscar el perfil' },
        { status: 500 }
      )
    }

    const profileSearchData = await profileSearchResponse.json()
    
    if (!profileSearchData.data || profileSearchData.data.length === 0) {
      return NextResponse.json(
        { error: 'Perfil no encontrado' },
        { status: 404 }
      )
    }

    const profileId = profileSearchData.data[0].id

    // Suscribir el perfil a la lista
    const listSubscriptionResponse = await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-02-15'
      },
      body: JSON.stringify({
        data: [
          {
            type: 'profile',
            id: profileId
          }
        ]
      })
    })

    if (!listSubscriptionResponse.ok) {
      const errorData = await listSubscriptionResponse.text()
      console.error('Klaviyo list subscription error:', errorData)
      
      // Si ya está suscrito, considerarlo como éxito
      if (listSubscriptionResponse.status === 409) {
        return NextResponse.redirect(new URL('/newsletter-confirmed?status=already-subscribed', request.url))
      }
      
      return NextResponse.json(
        { error: 'Error al completar la suscripción' },
        { status: 500 }
      )
    }

    // Registrar el evento de confirmación exitosa
    await fetch('https://a.klaviyo.com/api/events/', {
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
              email: email
            },
            metric: {
              data: {
                type: 'metric',
                attributes: {
                  name: 'Newsletter Subscription Confirmed'
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

    // Redirigir a una página de confirmación exitosa
    return NextResponse.redirect(new URL('/newsletter-confirmed?status=success', request.url))

  } catch (error) {
    console.error('Newsletter confirmation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
