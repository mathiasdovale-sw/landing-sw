# Newsletter API - Klaviyo Integration

Esta API integra el newsletter de tu sitio web con Klaviyo para gestionar suscriptores.

## 🚀 Configuración

### 1. Obtener credenciales de Klaviyo

1. **API Key privada:**
   - Ve a tu cuenta de Klaviyo
   - Navega a **Settings → API Keys**
   - Crea una nueva **Private API Key**
   - Asegúrate de que tenga permisos para:
     - `Profiles: Read/Write`
     - `Lists: Read/Write`
     - `Subscriptions: Read/Write`

2. **List ID:**
   - Ve a **Audience → Lists & Segments**
   - Selecciona la lista donde quieres agregar suscriptores
   - Copia el **List ID** de la URL o configuración

### 2. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Klaviyo Configuration
KLAVIYO_PRIVATE_API_KEY=pk_your_private_api_key_here
KLAVIYO_LIST_ID=your_list_id_here

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Estructura de archivos creados

```
src/
├── app/
│   ├── api/
│   │   └── newsletter/
│   │       └── route.ts          # API endpoint
│   └── _components/
│       ├── newsletter-popup.tsx  # Popup actualizado
│       └── footer.tsx           # Footer actualizado
└── .env.example                 # Plantilla de variables
```

## 📡 API Endpoint

### POST `/api/newsletter`

Suscribe un email a la newsletter usando Klaviyo.

**Request:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Response exitosa:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Response con error:**
```json
{
  "error": "Error message"
}
```

## 🎯 Funcionalidades

### ✅ Implementadas:
- **Validación de email** (formato y requerido)
- **Creación automática de perfiles** en Klaviyo
- **Suscripción a lista específica**
- **Manejo de errores** completo
- **Estados de carga** en UI
- **Prevención de duplicados** (Klaviyo maneja esto automáticamente)
- **Integración en popup y footer**

### 🔄 Flujo de funcionamiento:

1. Usuario ingresa email en popup o footer
2. Frontend envía POST a `/api/newsletter`
3. API valida el email
4. API crea/actualiza perfil en Klaviyo
5. API suscribe perfil a la lista
6. Frontend muestra mensaje de éxito o error

## 🛠️ Personalización

### Cambiar configuración de Klaviyo:

En `src/app/api/newsletter/route.ts`:

```typescript
// Agregar campos personalizados al perfil
const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
  // ...
  body: JSON.stringify({
    data: {
      type: 'profile',
      attributes: {
        email: email,
        first_name: firstName, // Opcional
        last_name: lastName,   // Opcional
        location: {            // Opcional
          city: "Barcelona"
        },
        subscriptions: {
          email: {
            marketing: {
              consent: 'SUBSCRIBED'
            }
          }
        }
      }
    }
  })
})
```

### Agregar eventos personalizados:

```typescript
// Después de la suscripción exitosa
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
        event_name: 'Newsletter Signup',
        time: new Date().toISOString(),
        profile: {
          email: email
        },
        properties: {
          source: 'website_popup' // o 'website_footer'
        }
      }
    }
  })
})
```

## 🔧 Testing

Para probar la integración:

1. **Desarrollo local:**
   ```bash
   npm run dev
   ```

2. **Verificar en Klaviyo:**
   - Ve a tu lista en Klaviyo
   - Verifica que los nuevos suscriptores aparezcan
   - Revisa los logs de actividad

3. **Testing de errores:**
   - Intenta suscribir un email inválido
   - Verifica que los mensajes de error se muestren correctamente

## 📝 Notas importantes

- **Rate limits:** Klaviyo tiene límites de rate, la API maneja esto automáticamente
- **GDPR compliance:** Asegúrate de tener el consentimiento apropiado
- **Double opt-in:** Considera configurar double opt-in en Klaviyo para cumplimiento
- **Webhooks:** Puedes configurar webhooks en Klaviyo para eventos adicionales

## 🚨 Troubleshooting

### Error común: "Missing Klaviyo configuration"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que el archivo `.env.local` esté en la raíz del proyecto

### Error: "Failed to create profile"
- Verifica que la API key tenga los permisos correctos
- Revisa que la API key sea privada, no pública

### Error: "Failed to subscribe to list"
- Verifica que el List ID sea correcto
- Asegúrate de que la lista existe y esté activa en Klaviyo
