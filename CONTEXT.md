# Contexto del Proyecto - SellifyWorks

## 📋 Descripción General
Este es un proyecto de **landing page y blog** para SellifyWorks, una agencia especializada en desarrollo y optimización de tiendas Shopify en Barcelona.

## 🎯 Objetivos del Proyecto
- **Landing Page**: Presentar los servicios de la agencia y convertir visitantes en clientes
- **Blog**: Compartir contenido sobre e-commerce, Shopify y tendencias del sector
- **Generación de leads**: Capturar emails a través de newsletter y formularios
- **SEO**: Posicionamiento para términos relacionados con Shopify y e-commerce

## 🛠 Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fuentes**: Poppins (principal), Bebas Neue (títulos)
- **Iconos**: Lucide React
- **Newsletter**: Integración con API propia
- **Hosting**: Vercel (presumiblemente)

## 🎨 Diseño y Branding
- **Colores principales**: Negro (#000000) y blanco (#FFFFFF)
- **Estilo**: Minimalista, moderno, profesional
- **Tipografía**: 
  - Bebas Neue para títulos principales (impacto visual)
  - Poppins para texto general (legibilidad)
- **Logo**: logoSW.png (ubicado en `/assets/img/`)

## 🏗 Estructura del Proyecto
```
/src/app/
├── _components/          # Componentes reutilizables
├── api/newsletter/       # API para newsletter
├── posts/               # Páginas del blog
└── globals.css          # Estilos globales

/_posts/                 # Contenido del blog (Markdown)
/public/assets/          # Imágenes y recursos estáticos
```

## 📱 Componentes Principales
- **HeaderHome**: Hero section de la landing
- **Navbar**: Navegación principal
- **Footer**: Newsletter signup + info de la empresa
- **NewsletterPopup**: Popup para captura de emails
- **Blog components**: Para mostrar y formatear posts

## 🎯 Filosofía de Desarrollo
### ✅ PRINCIPIOS CLAVE:

1. **SIMPLICIDAD ANTE TODO**
   - Preferir soluciones simples y directas
   - Evitar over-engineering
   - Código limpio y fácil de mantener

2. **MENOS ES MÁS**
   - Componentes pequeños y enfocados
   - Dependencias mínimas
   - Funcionalidad esencial primero

3. **RENDIMIENTO**
   - Optimización de imágenes
   - Carga de fuentes optimizada
   - SSR/SSG donde sea apropiado

4. **UX/UI LIMPIA**
   - Interfaz intuitiva
   - Navegación clara
   - Responsive design

### ❌ EVITAR:
- Soluciones complejas cuando existe una simple
- Librerías pesadas para funcionalidades básicas
- Componentes con demasiadas responsabilidades
- Over-abstraction

## 🚀 Funcionalidades Principales
- ✅ Landing page con hero section
- ✅ Sistema de newsletter
- ✅ Blog con posts en Markdown
- ✅ Responsive design
- ✅ SEO optimizado
- ✅ Gestión de fuentes optimizada

## 🎨 Convenciones de Código
- **Componentes**: PascalCase (`HeaderHome.tsx`)
- **Archivos**: kebab-case para utilidades
- **CSS**: Tailwind classes, minimal custom CSS
- **Tipos**: TypeScript interfaces en `/interfaces/`

## 📝 Próximas Iteraciones
- Formulario de contacto
- Casos de estudio
- Testimonios de clientes
- Integración con CMS (opcional)

## 🤖 Instrucciones para IA Assistant
Cuando trabajes en este proyecto:
1. **Prioriza la simplicidad** en cada solución
2. **Usa Tailwind CSS** para estilos (evita CSS custom innecesario)
3. **Mantén componentes pequeños** y con una sola responsabilidad
4. **Optimiza para rendimiento** pero sin complicar el código
5. **Respeta el branding** (negro/blanco, tipografías establecidas)
6. **Piensa en mobile-first** para responsive design
7. **Documenta cambios importantes** en este archivo si es necesario

## 📞 Contacto del Proyecto
- **Agencia**: SellifyWorks
- **Especialización**: Shopify Development & E-commerce
- **Ubicación**: Barcelona, España
- **Target**: Empresas que quieren vender más en Shopify

---
*Última actualización: Agosto 2025*
