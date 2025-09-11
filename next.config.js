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
    ]
  },
}

module.exports = nextConfig
