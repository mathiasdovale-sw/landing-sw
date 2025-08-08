# Configuración del Formulario de Contacto

## Configuración de reCAPTCHA

Para que el formulario de contacto funcione correctamente, necesitas configurar reCAPTCHA v2:

### 1. Crear cuenta en Google reCAPTCHA

1. Ve a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Inicia sesión con tu cuenta de Google
3. Clic en "Crear" o "+"

### 2. Configurar el sitio

- **Etiqueta**: SellifyWorks Contact Form
- **Tipo de reCAPTCHA**: reCAPTCHA v2 ("No soy un robot")
- **Dominios**: 
  - `localhost` (para desarrollo)
  - `tu-dominio.com` (para producción)

### 3. Obtener las claves

Después de crear el sitio, Google te proporcionará:
- **Clave del sitio** (Site Key) - Pública
- **Clave secreta** (Secret Key) - Privada

### 4. Configurar variables de entorno

Actualiza tu archivo `.env.local`:

```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

### 5. Configuración de Brevo

Asegúrate de que tu email remitente esté verificado en Brevo:

1. Ve a tu panel de Brevo
2. Configura y verifica el dominio o email remitente
3. Si usas `sellifyworks@gmail.com` como remitente, debe estar verificado

## Funcionalidades

- ✅ Formulario de contacto funcional
- ✅ Envío de emails vía Brevo
- ✅ Protección anti-bot con reCAPTCHA
- ✅ Validación de campos
- ✅ Mensajes de éxito/error
- ✅ Estados de carga
- ✅ Responsive design

## Testing

Para probar en desarrollo:
1. Asegúrate de tener las variables de entorno configuradas
2. Ejecuta `npm run dev`
3. Ve al formulario de contacto
4. Completa todos los campos y el reCAPTCHA
5. Envía el formulario

Los emails llegarán a `sellifyworks@gmail.com` con formato HTML profesional.
