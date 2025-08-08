import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '4px',
              marginBottom: '20px',
            }}
          >
            SELLIFYWORKS
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: '#f97316',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: '600',
              marginBottom: '40px',
            }}
          >
            AGENCIA SHOPIFY
          </div>
          
          <div
            style={{
              fontSize: 24,
              color: '#d1d5db',
              fontFamily: 'system-ui, sans-serif',
              maxWidth: '800px',
              lineHeight: '1.4',
              textAlign: 'center',
            }}
          >
            Creamos, optimizamos y hacemos crecer tiendas online que convierten
          </div>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '40px',
              padding: '16px 32px',
              backgroundColor: '#f97316',
              borderRadius: '8px',
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Partner Shopify
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
