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
}

module.exports = nextConfig
