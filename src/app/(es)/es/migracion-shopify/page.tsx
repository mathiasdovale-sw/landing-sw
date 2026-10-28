import { Metadata } from 'next'
import MigrationPage from '@/app/_components/migration-page'
import { migrationFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migration',
  'es',
  'Migración a Shopify con mejoras, sin cerrar tu tienda | SellifyWorks'
)

export default function MigracionShopify() {
  return <MigrationPage locale="es" faqs={migrationFAQsEs} />
}
