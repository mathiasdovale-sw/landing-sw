# Tests - SellifyWorks Blog App

Este proyecto utiliza **Cypress** para testing end-to-end de la aplicación.

## 🧪 Tipos de Tests

### 1. **Tests de Homepage** (`01-homepage.cy.ts`)
- Carga correcta de la página principal
- Navegación funcional
- Elementos principales visibles
- Responsive design

### 2. **Tests de Newsletter** (`02-newsletter.cy.ts`)
- Popup de newsletter
- Suscripción con email válido
- Validación de email inválido
- Manejo de emails ya suscritos
- Newsletter en footer

### 3. **Tests de Blog** (`03-blog.cy.ts`)
- Listado de posts
- Navegación a posts individuales
- Metadata de posts
- Responsive design

### 4. **Tests de API** (`04-api.cy.ts`)
- Endpoint `/api/newsletter`
- Validación de emails
- Manejo de errores
- Responses correctos

### 5. **Tests de Performance** (`05-performance.cy.ts`)
- Tiempos de carga
- SEO básico (meta tags)
- Accesibilidad (alt text)
- Jerarquía de headings

## 🚀 Comandos de Testing

```bash
# Abrir Cypress UI para desarrollo
npm run test:open

# Ejecutar todos los tests en modo headless
npm run test

# Ejecutar tests con servidor en desarrollo automático
npm run test:dev

# Ejecutar tests para CI/CD
npm run test:ci
```

## 📋 Configuración

### Cypress Config (`cypress.config.ts`)
- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Video**: Deshabilitado (para desarrollo)
- **Screenshots**: Solo en fallos

### Comandos Personalizados (`cypress/support/commands.ts`)
- `subscribeToNewsletter(email)`: Suscribirse al newsletter
- `forceShowNewsletterPopup()`: Forzar mostrar popup

## 🎯 Estrategia de Testing

### ✅ **Qué se testea**
1. **Funcionalidad crítica**: Newsletter signup
2. **Navegación**: Entre páginas principales
3. **API endpoints**: Respuestas correctas
4. **Performance básica**: Tiempos de carga
5. **SEO y accesibilidad**: Meta tags, alt text

### ❌ **Qué NO se testea**
- Integración real con Brevo/Klaviyo (se usa mocking)
- Tests unitarios de componentes (se usa E2E)
- Pruebas de carga intensiva

## 🔧 Debugging

### Para debuggear tests:
1. `npm run test:open` - Abre Cypress UI
2. Selecciona el test específico
3. Usa `cy.pause()` para parar ejecución
4. Inspecciona elementos en DevTools

### Para tests fallidos:
- Screenshots se guardan en `cypress/screenshots/`
- Logs detallados en consola de Cypress
- Verificar selectores CSS en DevTools

## 📝 Fixtures de Datos

### `cypress/fixtures/emails.json`
- Emails válidos para testing
- Emails inválidos para validación
- Email existente para tests de duplicados

## 🚨 Consideraciones Importantes

1. **Tests dependen del servidor local** (`localhost:3000`)
2. **Newsletter popup** tiene timing de 3 segundos
3. **API mocking** para evitar spam en servicios reales
4. **Responsive testing** en viewport iPhone 6
5. **Tests son independientes** (no dependen entre sí)

## 🔄 CI/CD Integration

Para integrar en CI/CD, usar:
```bash
npm run test:ci
```

Este comando:
1. Inicia el servidor Next.js
2. Espera que esté listo en puerto 3000
3. Ejecuta todos los tests
4. Cierra el servidor automáticamente

## 📊 Coverage y Métricas

Los tests cubren:
- ✅ **Funcionalidad principal**: Newsletter
- ✅ **Navegación básica**: Home ↔ Blog
- ✅ **API endpoints**: POST /api/newsletter
- ✅ **Performance básica**: < 5s load time
- ✅ **SEO fundamental**: Meta tags
- ✅ **Accesibilidad básica**: Alt text

---

*Para más información sobre Cypress: https://docs.cypress.io/*
