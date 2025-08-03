# Configuración de Brevo para Double Opt-in - SellifyWorks

## 🚀 **Configuración inicial**

### 1. **Crear cuenta en Brevo**
1. Ve a [brevo.com](https://brevo.com) y crea una cuenta
2. Verifica tu email
3. Completa la configuración inicial

### 2. **Obtener API Key**
1. Ve a **Settings** → **API Keys**
2. Crea una nueva API Key con permisos de **Send emails**
3. Copia la API Key y agrégala al archivo `.env.local`:

```bash
BREVO_API_KEY=xkeysib-tu_api_key_aqui
```

### 3. **Configurar dominio de envío**
1. Ve a **Settings** → **Senders & IP**
2. Agrega tu dominio (ej: `sellifyworks.com`)
3. Verifica el dominio siguiendo las instrucciones DNS
4. Una vez verificado, actualiza el sender email en el código

## 🧪 **Testing**

### Test básico de Brevo:
```bash
curl -X POST http://localhost:3000/api/test-brevo \
  -H "Content-Type: application/json" \
  -d '{"email":"tu-email@gmail.com"}'
```

### Test completo del flow:
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"tu-email@gmail.com"}'
```

## 🔄 **Nuevo flujo optimizado**

1. **Usuario se suscribe** → `POST /api/newsletter`
2. **Brevo envía email** de confirmación inmediatamente
3. **Usuario hace clic** → `GET /api/newsletter/confirm?token=...`
4. **Klaviyo crea perfil** y lo agrega a la lista
5. **Usuario confirmado** ✅

## ✅ **Ventajas de la migración**

### Brevo para emails:
- 🚀 **Mejor deliverability** - Los emails llegan más confiablemente
- ⚡ **Envío instantáneo** - No depende de flows de Klaviyo
- 🎨 **Templates flexibles** - HTML completo sin restricciones
- 📊 **Analytics detallados** - Métricas de apertura, clics, etc.
- 💰 **Rate limits generosos** - Más emails por mes en plan gratuito

### Klaviyo para listas:
- 📋 **Gestión de suscriptores** - Una vez confirmados
- 📈 **Segmentación avanzada** - Para campaigns futuras
- 🎯 **Analytics de comportamiento** - Tracking de eventos
- 📧 **Newsletters regulares** - Para contenido periódico

## 🛠 **Personalización**

### Email template (en `/api/newsletter/route.ts`):
- **Colores**: Negro/blanco siguiendo el branding
- **Tipografías**: Bebas Neue + Poppins
- **Responsive**: Optimizado para móvil
- **Branding**: Logo y footer de SellifyWorks

### Sender configuration:
```javascript
sender: {
  name: "SellifyWorks",
  email: "noreply@sellifyworks.com" // Cambiar por tu dominio verificado
}
```

## 🐛 **Troubleshooting**

### Errores comunes:
- **401**: API Key incorrecta o mal configurada
- **400**: Email sender no verificado en Brevo
- **402**: Cuota de emails agotada (plan gratuito tiene límites)
- **404**: Endpoint incorrecto

### Verificar configuración:
```bash
# Ver logs del servidor
npm run dev

# Test de conectividad
curl -X POST http://localhost:3000/api/test-brevo \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'
```

## 📈 **Métricas y Analytics**

### En Brevo:
- **Delivered**: Emails entregados
- **Opened**: Emails abiertos  
- **Clicked**: Links clickeados
- **Bounced**: Emails rebotados

### En Klaviyo:
- **Newsletter Subscription Confirmed**: Evento de confirmación
- **Profiles**: Perfiles creados y agregados a lista
- **List Growth**: Crecimiento de la lista

## 🔄 **Migración completada**

✅ **Sistema híbrido optimizado**:
- Brevo: Emails transaccionales confiables
- Klaviyo: Gestión de listas y newsletters
- Frontend: Sin cambios (mismos mensajes al usuario)

## 🔗 **Referencias**
- [Brevo API Documentation](https://developers.brevo.com/reference/sendtransacemail)
- [Klaviyo API Documentation](https://developers.klaviyo.com/en/reference)

---
*Configuración actualizada: Agosto 2025*
