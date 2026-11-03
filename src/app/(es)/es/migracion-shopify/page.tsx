import { Metadata } from 'next'
import BuildServicePage from '@/app/_components/build-service-page'
import { migrationFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migration',
  'es',
  'Migración a Shopify con mejoras, sin cerrar tu tienda | SellifyWorks'
)

export default function MigracionShopify() {
  return <BuildServicePage service="migration" locale="es" faqs={migrationFAQsEs} />
}
