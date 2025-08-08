import { NextRequest, NextResponse } from 'next/server'
import { consumePendingConfirmation } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(new URL('/newsletter-confirmed?status=error&message=Token faltante', request.url))
    }

    // Verificar y consumir el token
    const email = consumePendingConfirmation(token)
    
    if (!email) {
      return NextResponse.redirect(new URL('/newsletter-confirmed?status=error&message=Token inválido o expirado', request.url))
    }

    // Configuración de Klaviyo
    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
      console.error('Missing Klaviyo configuration')
      return NextResponse.redirect(new URL('/newsletter-confirmed?status=error&message=Error de configuración', request.url))
    }

    try {
      console.log(`✅ Confirming subscription for: ${email}`)

      // 1. Crear o actualizar perfil en Klaviyo
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
              email: email,
              properties: {
                subscription_confirmed: true,
                confirmation_date: new Date().toISOString(),
                source: 'website_double_optin_brevo'
              }
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
              console.log(`📝 Using existing profile: ${profileId}`)
            } else {
              throw new Error('Could not get duplicate profile ID')
            }
          } catch (parseError) {
            throw new Error('Error parsing Klaviyo duplicate profile response')
          }
        } else {
          throw new Error(`Klaviyo profile error: ${errorData}`)
        }
      } else {
        const profileData = await profileResponse.json()
        profileId = profileData.data.id
        console.log(`✨ Created new profile: ${profileId}`)
      }

      // 2. Agregar perfil a la lista
      const subscribeResponse = await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
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

      if (!subscribeResponse.ok) {
        const subscribeError = await subscribeResponse.text()
        console.error('Klaviyo subscription error:', subscribeError)
        
        // Si el perfil ya está en la lista, no es un error crítico
        if (subscribeResponse.status === 409) {
          console.log('⚠️ Profile already in list, continuing...')
        } else {
          throw new Error(`Failed to add to list: ${subscribeError}`)
        }
      } else {
        console.log('📋 Successfully added to Klaviyo list')
      }

      // 3. Registrar evento de confirmación en Klaviyo para analytics
      const confirmationEventResponse = await fetch('https://a.klaviyo.com/api/events/', {
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
                email: email,
                confirmation_date: new Date().toISOString(),
                source: 'website_double_optin',
                method: 'brevo_email'
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

      if (confirmationEventResponse.ok) {
        console.log('📊 Confirmation event recorded in Klaviyo')
      } else {
        console.log('⚠️ Could not record confirmation event (non-critical)')
      }
      
      return NextResponse.redirect(new URL('/newsletter-confirmed?status=success', request.url))

    } catch (klaviyoError) {
      console.error('Klaviyo operation failed:', klaviyoError)
      return NextResponse.redirect(new URL('/newsletter-confirmed?status=error&message=Error al procesar suscripción', request.url))
    }

  } catch (error) {
    console.error('Confirmation error:', error)
    return NextResponse.redirect(new URL('/newsletter-confirmed?status=error&message=Error interno', request.url))
  }
}
