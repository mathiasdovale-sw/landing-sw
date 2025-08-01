# Configuración del Template de Confirmación en Klaviyo

## Instrucciones para configurar Double Opt-in en Klaviyo

### 1. Crear un Flow de Confirmación

1. Ve a **Flows** en tu dashboard de Klaviyo
2. Haz clic en **Create Flow**
3. Selecciona **Create From Scratch**
4. Nombra el flow: "Newsletter Double Opt-in Confirmation"

### 2. Configurar el Trigger

1. Selecciona **Metric** como trigger
2. Busca y selecciona el métrico: **Newsletter Confirmation Required**
3. Este es el evento que se envía cuando alguien se suscribe inicialmente

### 3. Agregar Acción de Email

1. Arrastra un bloque de **Email** después del trigger
2. Diseña el email con el siguiente contenido sugerido:

#### Subject: "Confirma tu suscripción a [Nombre de tu empresa]"

#### HTML Template:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirma tu suscripción</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb;">¡Confirma tu suscripción!</h1>
    </div>
    
    <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
        <p style="margin-bottom: 20px;">¡Hola!</p>
        
        <p style="margin-bottom: 20px;">
            Gracias por suscribirte a nuestra newsletter. Para completar tu suscripción y comenzar a recibir nuestros tips exclusivos sobre Shopify y comercio electrónico, solo necesitas confirmar tu dirección de email.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ event.confirmation_url }}" 
               style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Confirmar Suscripción
            </a>
        </div>
        
        <p style="margin-bottom: 20px;">
            Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:
        </p>
        
        <p style="word-break: break-all; background-color: #e5e7eb; padding: 10px; border-radius: 4px; font-family: monospace;">
            {{ event.confirmation_url }}
        </p>
        
        <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
            Este enlace expirará en 24 horas por motivos de seguridad.
        </p>
    </div>
    
    <div style="text-align: center; font-size: 14px; color: #6b7280;">
        <p>¿No te suscribiste? Puedes ignorar este email de forma segura.</p>
        <p>© {{ "now"|date:"Y" }} [Tu Empresa]. Todos los derechos reservados.</p>
    </div>
</body>
</html>
```

### 4. Configurar las Variables

En el email template, Klaviyo automáticamente tendrá acceso a:
- `{{ event.confirmation_url }}` - La URL de confirmación generada
- `{{ event.email }}` - El email del suscriptor

### 5. Configurar Timing

- **Send Time**: Immediately (enviar inmediatamente)
- **Send Window**: 24/7 (enviar en cualquier momento)

### 6. Activar el Flow

1. Revisa toda la configuración
2. Haz clic en **Review and Turn On**
3. Activa el flow

## Variables de Entorno Necesarias

Asegúrate de tener estas variables en tu archivo `.env.local`:

```env
KLAVIYO_PRIVATE_API_KEY=tu_clave_privada_de_klaviyo
KLAVIYO_LIST_ID=tu_id_de_lista
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Cambia por tu dominio en producción
```

## Testing

Para probar el flujo completo:

1. Usa un email de prueba en tu formulario de suscripción
2. Verifica que recibas el email de confirmación
3. Haz clic en el enlace de confirmación
4. Verifica que seas redirigido a la página de confirmación exitosa
5. Verifica en Klaviyo que el perfil esté ahora suscrito a la lista

## Notas Importantes

- Los tokens de confirmación expiran en 24 horas
- En esta implementación, los tokens se almacenan en memoria. Para producción, considera usar una base de datos o Redis
- El sistema verifica automáticamente si un email ya está suscrito antes de enviar confirmación
- Se registran eventos en Klaviyo para tracking: "Newsletter Confirmation Required" y "Newsletter Subscription Confirmed"
