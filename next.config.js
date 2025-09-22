/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ayuda con problemas de hidratación
    optimizePackageImports: ['lucide-react'],
  },
  // Mejorar la detección de cambios en desarrollo
  reactStrictMode: true,
  // Configuración para mejorar la hidratación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Redirecciones para URLs canónicas
  async redirects() {
    return [
      // === CANONICALIZACIÓN WWW ===
      // Force www subdomain for SEO consistency
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'sellifyworks.com',
          },
        ],
        destination: 'https://www.sellifyworks.com/:path*',
        permanent: true,
      },

      // === REDIRECCIÓN PÁGINA PRINCIPAL ===
      // Redirección de / a /es/ (español por defecto)
      {
        source: '/',
        destination: '/es/',
        permanent: true,
      },

      // === REDIRECCIONES DE ABOUT ===
      // Redirección de /about a /es/sobre-nosotros (español por defecto)
      {
        source: '/about',
        destination: '/es/sobre-nosotros',
        permanent: true,
      },
      // Redirección de /sobre-nosotros a /es/sobre-nosotros
      {
        source: '/sobre-nosotros',
        destination: '/es/sobre-nosotros',
        permanent: true,
      },
      // Redirección de la ruta antigua de español
      {
        source: '/es/about',
        destination: '/es/sobre-nosotros',
        permanent: true,
      },

      // === REDIRECCIONES DE CONTACTO ===
      // Redirección de /contact a /es/contacto (español por defecto)
      {
        source: '/contact',
        destination: '/es/contacto',
        permanent: true,
      },
      // Redirección de /contacto a /es/contacto
      {
        source: '/contacto',
        destination: '/es/contacto',
        permanent: true,
      },

      // === REDIRECCIONES DE POLÍTICAS ===
      // Política de cookies
      {
        source: '/cookie-policy',
        destination: '/es/politica-de-cookies',
        permanent: true,
      },
      {
        source: '/politica-de-cookies',
        destination: '/es/politica-de-cookies',
        permanent: true,
      },
      // Política de privacidad
      {
        source: '/privacy-policy',
        destination: '/es/politica-de-privacidad',
        permanent: true,
      },
      {
        source: '/politica-de-privacidad',
        destination: '/es/politica-de-privacidad',
        permanent: true,
      },

      // === REDIRECCIONES DE BLOG ===
      // Blog/Posts
      {
        source: '/blog',
        destination: '/es/blog',
        permanent: true,
      },

      // === REDIRECCIONES DE NEWSLETTER ===
      // Newsletter confirmado
      {
        source: '/newsletter-confirmed',
        destination: '/es/suscripcion-confirmada',
        permanent: true,
      },
      {
        source: '/suscripcion-confirmada',
        destination: '/es/suscripcion-confirmada',
        permanent: true,
      },

      // === REDIRECCIÓN DE DOMINIO SEGURA ===
      // Solo redirección de dominio base, no paths wildcards para prevenir Open Redirects
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'sellifyworks.com',
          },
        ],
        destination: 'https://www.sellifyworks.com/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
