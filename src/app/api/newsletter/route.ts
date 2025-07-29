import { NextRequest, NextResponse } from 'next/server'

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

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
      console.error('Missing Klaviyo configuration')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Crear o actualizar perfil en Klaviyo
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

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text()
      console.error('Klaviyo profile error:', errorData)
      
      // Manejar perfil duplicado (usuario ya existe)
      if (profileResponse.status === 409) {
        try {
          const errorJson = JSON.parse(errorData)
          const duplicateError = errorJson.errors?.find((error: any) => 
            error.code === 'duplicate_profile'
          )
          
          if (duplicateError && duplicateError.meta?.duplicate_profile_id) {
            // Usar el ID del perfil existente para suscribirlo a la lista
            const existingProfileId = duplicateError.meta.duplicate_profile_id
            console.log('Using existing profile ID:', existingProfileId)
            
            // Intentar suscribir el perfil existente a la lista
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
                    id: existingProfileId
                  }
                ]
              })
            })

            if (listSubscriptionResponse.ok) {
              return NextResponse.json({
                success: true,
                message: 'Successfully subscribed to newsletter',
                note: 'Profile already existed, added to list'
              })
            } else {
              // Si falla la suscripción a la lista, probablemente ya esté suscrito
              const listErrorData = await listSubscriptionResponse.text()
              console.log('List subscription response:', listErrorData)
              
              return NextResponse.json({
                success: true,
                message: 'Ya estás suscrito a nuestra newsletter',
                note: 'Profile and subscription already exist'
              })
            }
          } else {
            return NextResponse.json(
              { error: 'Este email ya está registrado en nuestro sistema' },
              { status: 409 }
            )
          }
        } catch (parseError) {
          console.error('Error parsing Klaviyo error response:', parseError)
          return NextResponse.json(
            { error: 'Este email ya está suscrito a nuestra newsletter' },
            { status: 409 }
          )
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 500 }
      )
    }

    const profileData = await profileResponse.json()
    const profileId = profileData.data.id

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
      return NextResponse.json(
        { error: 'Failed to subscribe to list' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
