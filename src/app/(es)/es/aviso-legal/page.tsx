import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { getCanonicalBaseUrl } from "@/lib/seo-utils";

// Página solo en español: no usa generatePageMetadata para no declarar un hreflang /en inexistente
const canonical = `${getCanonicalBaseUrl()}/es/aviso-legal`

export const metadata: Metadata = {
  title: 'Aviso Legal | SellifyWorks',
  description: 'Aviso legal de SellifyWorks: datos identificativos del titular, condiciones de uso, propiedad intelectual y legislación aplicable al sitio web sellifyworks.com.',
  alternates: { canonical },
  openGraph: {
    title: 'Aviso Legal | SellifyWorks',
    url: canonical,
    siteName: 'SellifyWorks',
    locale: 'es_ES',
    type: 'website',
  },
}

const LAST_UPDATED = '24 de octubre de 2026'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
        {title}
      </h2>
      <div className="space-y-4 leading-relaxed">{children}</div>
    </section>
  )
}

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen">
      <VisualBreadcrumbs maxWidth="max-w-4xl" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Aviso Legal
          </h1>
          <p className="text-gray-400 text-lg">
            Condiciones de uso e información sobre el titular del sitio web
          </p>
          <p className="text-gray-500 text-sm mt-2">Última actualización: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-10 text-gray-300">

            {/* TODO legal: falta NIF y domicilio completo del titular (art. 10 LSSI). Completar al darse de alta. */}
            <Section title="1. Datos identificativos">
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), te informamos de los datos del titular de este sitio web:
              </p>
              <ul className="list-none space-y-1 pl-0">
                <li><strong className="text-white">Titular:</strong> Mathias Do Vale</li>
                <li><strong className="text-white">Nombre comercial:</strong> SellifyWorks</li>
                <li><strong className="text-white">Domicilio:</strong> Barcelona, España</li>
                <li><strong className="text-white">Email:</strong> <a href="mailto:contact@sellifyworks.com" className="text-orange-400 hover:underline">contact@sellifyworks.com</a></li>
                <li><strong className="text-white">Sitio web:</strong> https://www.sellifyworks.com</li>
                <li><strong className="text-white">Actividad:</strong> consultoría, desarrollo y optimización de tiendas online en Shopify</li>
              </ul>
            </Section>

            <Section title="2. Objeto y aceptación">
              <p>
                Este aviso legal regula el acceso y el uso del sitio web sellifyworks.com (en adelante, &quot;la web&quot;). Al navegar por la web adquieres la condición de usuario y aceptas estas condiciones. Si no estás de acuerdo con ellas, te pedimos que no uses la web.
              </p>
            </Section>

            <Section title="3. Condiciones de uso">
              <p>
                El acceso a la web es gratuito, salvo el coste de la conexión a internet. Te comprometes a usarla de forma diligente, conforme a la ley, a la buena fe y a estas condiciones. En particular, te comprometes a no:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Usar la web con fines ilícitos o que perjudiquen los derechos de terceros.</li>
                <li>Introducir virus o cualquier otro sistema que pueda dañar la web o los equipos de otros usuarios.</li>
                <li>Enviar a través de los formularios información falsa o de terceros sin su autorización.</li>
                <li>Intentar acceder a áreas restringidas de los sistemas de la web.</li>
              </ul>
            </Section>

            <Section title="4. Propiedad intelectual e industrial">
              <p>
                Todos los contenidos de la web (textos, imágenes, diseño, logotipos, código fuente, marcas y demás elementos) son propiedad del titular o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.
              </p>
              <p>
                Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa, salvo para uso personal y privado. Puedes citar contenidos del blog siempre que indiques la fuente y enlaces a la página original.
              </p>
            </Section>

            <Section title="5. Responsabilidad">
              <p>
                Trabajamos para que la información de la web sea correcta y esté actualizada, pero no garantizamos que esté libre de errores ni que la web esté disponible de forma ininterrumpida. Los contenidos tienen carácter informativo y no sustituyen el asesoramiento profesional personalizado.
              </p>
              <p>
                No nos hacemos responsables de los daños que pudieran derivarse de interrupciones del servicio, de virus o de un uso indebido de la web, salvo que se deban a dolo o negligencia por nuestra parte.
              </p>
            </Section>

            <Section title="6. Enlaces a terceros">
              <p>
                La web puede incluir enlaces a sitios de terceros. No controlamos esos sitios ni respondemos de sus contenidos ni de sus políticas de privacidad. Si tenemos conocimiento efectivo de que un enlace lleva a contenido ilícito, lo retiraremos (art. 17 LSSI).
              </p>
            </Section>

            <Section title="7. Protección de datos y cookies">
              <p>
                Los datos personales que nos facilites se tratarán según lo indicado en nuestra{' '}
                <a href="/es/politica-de-privacidad" className="text-orange-400 hover:underline">Política de Privacidad</a>. Para el uso de cookies, consulta la{' '}
                <a href="/es/politica-de-cookies" className="text-orange-400 hover:underline">Política de Cookies</a>.
              </p>
            </Section>

            <Section title="8. Legislación aplicable y jurisdicción">
              <p>
                Este aviso legal se rige por la legislación española. Para resolver cualquier conflicto, las partes se someten a los Juzgados y Tribunales de Barcelona. Si el usuario es consumidor, serán competentes los juzgados de su domicilio, conforme a la normativa de consumidores y usuarios.
              </p>
            </Section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contacto
              </h2>
              <p className="leading-relaxed mb-4">
                Si tienes cualquier duda sobre este aviso legal, escríbenos.
              </p>
              <p className="text-orange-400">
                Email: contact@sellifyworks.com
              </p>
            </section>

            {/* Back Button */}
            <div className="text-center pt-8">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Volver al inicio
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
