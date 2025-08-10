# Solución: Sistema de Tokens para Vercel

## Problema identificado

El sistema anterior de tokens utilizaba el sistema de archivos local para almacenar tokens pendientes de confirmación. Esto no funciona en Vercel porque:

1. **Sistema de archivos de solo lectura**: Las funciones serverless de Vercel no pueden escribir archivos
2. **No persistencia entre invocaciones**: Cada función se ejecuta en un contenedor limpio
3. **El directorio `data/` no es persistente**: Se pierde entre ejecuciones

## Solución implementada

Se implementó un sistema de **tokens JWT sin estado** que:

✅ **Funciona en Vercel**: No requiere escritura de archivos
✅ **Sin estado**: Toda la información está en el token
✅ **Seguro**: Usa HMAC SHA-256 para firmar los tokens
✅ **Autoexpirante**: Los tokens expiran automáticamente en 24 horas

## Cambios realizados

### 1. Actualizado `src/lib/auth-utils.ts`
- Eliminada la dependencia de archivos persistentes
- Implementado sistema JWT personalizado
- Los tokens ahora contienen el email y fecha de expiración
- Verificación criptográfica con HMAC SHA-256

### 2. Actualizado `src/app/api/newsletter/route.ts`
- La función `generateConfirmationToken()` ahora requiere el email como parámetro
- El token generado contiene toda la información necesaria

### 3. Añadida variable de entorno `JWT_SECRET`
- Clave secreta para firmar los tokens JWT
- Debe ser de al menos 32 caracteres
- **IMPORTANTE**: Debe configurarse también en Vercel

### 4. Script para generar claves JWT
- `scripts/generate-jwt-secret.js` genera claves seguras automáticamente

## Configuración en Vercel

Para que funcione en producción, debes añadir estas variables de entorno en Vercel:

```bash
JWT_SECRET=cb3881bf4f7d0ea6e3458d0f3353519cf213a58dc5e6b3e553fc9581dc696da2
```

### Pasos en Vercel Dashboard:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade `JWT_SECRET` con el valor generado
4. Redeploya tu aplicación

## Cómo funciona ahora

1. **Suscripción**: Usuario ingresa email → se genera token JWT con email y expiración
2. **Token JWT**: Contiene `{email, timestamp, exp}` firmado con `JWT_SECRET`
3. **Confirmación**: Usuario hace clic en enlace → se verifica firma y expiración → se extrae email del token
4. **Sin almacenamiento**: No se guarda nada en archivos ni base de datos

## Ventajas

- ✅ **Compatible con Vercel** y cualquier plataforma serverless
- ✅ **Sin dependencias externas** (no necesita base de datos)
- ✅ **Seguro** con verificación criptográfica
- ✅ **Autoexpirante** (24 horas)
- ✅ **Escalable** sin límites de almacenamiento

## Testing

Para probar que funciona:

1. Inicia el servidor local: `npm run dev`
2. Suscríbete a la newsletter
3. Revisa el email de confirmación
4. Haz clic en el enlace de confirmación
5. Verifica que la confirmación funciona correctamente

El sistema ahora es **100% compatible con Vercel** y debería funcionar perfectamente en producción.
