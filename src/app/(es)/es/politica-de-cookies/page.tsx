import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'cookiePolicy',
  'es',
  'Política de Cookies | SellifyWorks'
);

const LAST_UPDATED = '24 de octubre de 2026'

// Mantener sincronizado con el escaneo de CookieYes y con los tags configurados en GTM
const cookieGroups: Array<{
  category: string
  description: string
  cookies: Array<{ name: string; provider: string; purpose: string; duration: string }>
}> = [
  {
    category: 'Técnicas o necesarias',
    description: 'Imprescindibles para que la web funcione y para recordar tus preferencias de consentimiento. Están exentas de consentimiento (art. 22.2 LSSI) y no pueden desactivarse.',
    cookies: [
      { name: 'cookieyes-consent', provider: 'SellifyWorks (CookieYes)', purpose: 'Guarda las preferencias de cookies que has elegido.', duration: '1 año' },
      { name: '_GRECAPTCHA', provider: 'Google (reCAPTCHA)', purpose: 'Protege el formulario de contacto frente a spam y uso automatizado.', duration: '6 meses' },
    ],
  },
  {
    category: 'Analíticas',
    description: 'Nos permiten medir el número de visitas y entender cómo se usa la web para mejorarla. Solo se instalan si las aceptas.',
    cookies: [
      { name: '_ga', provider: 'Google Analytics 4', purpose: 'Distingue usuarios únicos de forma estadística.', duration: '2 años' },
      { name: '_ga_<ID>', provider: 'Google Analytics 4', purpose: 'Mantiene el estado de la sesión.', duration: '2 años' },
      { name: '_clck', provider: 'Microsoft Clarity', purpose: 'Identificador de usuario de Clarity y sus preferencias.', duration: '1 año' },
      { name: '_clsk', provider: 'Microsoft Clarity', purpose: 'Agrupa las páginas vistas en una misma sesión.', duration: '1 día' },
      { name: 'CLID', provider: 'Microsoft Clarity (clarity.ms)', purpose: 'Identifica la primera visita del usuario a la web.', duration: '1 año' },
      { name: 'MUID', provider: 'Microsoft (bing.com)', purpose: 'Identificador de navegador usado por los servicios de Microsoft.', duration: '1 año' },
    ],
  },
  {
    category: 'Publicitarias',
    description: 'Permiten medir la eficacia de nuestras campañas y mostrarte anuncios relevantes en otras plataformas. Solo se instalan si las aceptas.',
    cookies: [
      { name: '_fbp', provider: 'Meta (Facebook Pixel)', purpose: 'Mide conversiones y permite mostrar anuncios en plataformas de Meta.', duration: '3 meses' },
      { name: 'fr', provider: 'Meta (facebook.com)', purpose: 'Entrega, medición y mejora de la relevancia de los anuncios.', duration: '3 meses' },
    ],
  },
]

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

export default function PoliticaDeCookiesPage() {
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
            Política de Cookies
          </h1>
          <p className="text-gray-400 text-lg">
            Información sobre el uso de cookies en nuestro sitio web
          </p>
          <p className="text-gray-500 text-sm mt-2">Última actualización: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-10 text-gray-300">

            <Section title="¿Qué son las cookies?">
              <p>
                Las cookies son pequeños archivos que se descargan en tu dispositivo (ordenador, móvil o tablet) cuando visitas una página web. Permiten, entre otras cosas, almacenar y recuperar información sobre tu navegación. Esta política también se aplica a tecnologías similares, como el almacenamiento local del navegador (localStorage y sessionStorage) o los píxeles de seguimiento.
              </p>
              <p>
                Esta política se emite en cumplimiento del artículo 22.2 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), del Reglamento (UE) 2016/679 (RGPD) y de la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos (AEPD).
              </p>
            </Section>

            <Section title="¿Quién utiliza las cookies?">
              <p>
                <strong className="text-white">Cookies propias:</strong> las que enviamos desde nuestro propio dominio (sellifyworks.com).
              </p>
              <p>
                <strong className="text-white">Cookies de terceros:</strong> las que envían otras entidades (Google, Microsoft y Meta) que tratan los datos obtenidos según sus propias políticas de privacidad.
              </p>
            </Section>

            <Section title="Cookies que utilizamos">
              <p>
                Al entrar en la web, solo se activan las cookies técnicas. Las analíticas y publicitarias permanecen bloqueadas hasta que las aceptas en el banner de cookies. Hasta entonces, Google recibe únicamente señales sin cookies y sin identificadores, gracias al Modo de Consentimiento v2 de Google.
              </p>
              {cookieGroups.map((group) => (
                <div key={group.category} className="bg-gray-800 rounded-lg p-4 not-prose">
                  <h3 className="text-xl font-semibold text-white mb-2">{group.category}</h3>
                  <p className="text-base leading-relaxed mb-4">{group.description}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-white border-b border-gray-700">
                        <tr>
                          <th className="py-2 pr-4 font-semibold">Cookie</th>
                          <th className="py-2 pr-4 font-semibold">Titular</th>
                          <th className="py-2 pr-4 font-semibold">Finalidad</th>
                          <th className="py-2 font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.cookies.map((cookie) => (
                          <tr key={cookie.name} className="border-b border-gray-700 last:border-0 align-top">
                            <td className="py-2 pr-4 font-mono text-orange-400 whitespace-nowrap">{cookie.name}</td>
                            <td className="py-2 pr-4">{cookie.provider}</td>
                            <td className="py-2 pr-4">{cookie.purpose}</td>
                            <td className="py-2 whitespace-nowrap">{cookie.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <p>
                Además, usamos el almacenamiento local del navegador para recordar el tema visual (claro u oscuro), el idioma elegido, si ya has visto el aviso de la newsletter y tu posición de scroll al navegar. Esta información no sale de tu dispositivo, no se usa para seguimiento y se considera técnica o de personalización solicitada por ti.
              </p>
            </Section>

            <Section title="Base legal">
              <p>
                Las cookies técnicas se instalan porque son necesarias para prestar el servicio que solicitas. Las analíticas y publicitarias solo se usan con tu <strong className="text-white">consentimiento</strong> (art. 6.1.a RGPD y art. 22.2 LSSI), que puedes dar o retirar en cualquier momento, de forma tan sencilla como lo diste.
              </p>
            </Section>

            <Section title="Transferencias internacionales">
              <p>
                Algunos proveedores (Google LLC, Microsoft Corporation y Meta Platforms, Inc.) pueden tratar datos en Estados Unidos. Estas empresas están adheridas al Marco de Privacidad de Datos UE-EE. UU. (EU-U.S. Data Privacy Framework), que según la Comisión Europea ofrece un nivel de protección adecuado. Puedes consultar más información en sus políticas:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Google</a></li>
                <li><a href="https://privacy.microsoft.com/es-es/privacystatement" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Microsoft (Clarity)</a></li>
                <li><a href="https://www.facebook.com/privacy/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Meta</a></li>
              </ul>
            </Section>

            <Section title="Cómo gestionar o retirar tu consentimiento">
              <p>
                Puedes cambiar tus preferencias o retirar el consentimiento en cualquier momento desde nuestro panel de configuración:
              </p>
              {/* CookieYes reabre el panel de preferencias en cualquier elemento con la clase cky-banner-element */}
              <button
                type="button"
                className="cky-banner-element not-prose inline-flex items-center px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Configurar cookies
              </button>
              <p>
                También puedes bloquear o eliminar las cookies desde la configuración de tu navegador:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Microsoft Edge</a></li>
              </ul>
              <p>
                Si bloqueas las cookies técnicas, es posible que algunas partes de la web (como el formulario de contacto) no funcionen correctamente.
              </p>
            </Section>

            <Section title="Más información">
              <p>
                Para conocer cómo tratamos tus datos personales y cómo ejercer tus derechos, consulta nuestra{' '}
                <a href="/es/politica-de-privacidad" className="text-orange-400 hover:underline">Política de Privacidad</a>. Podemos actualizar esta política cuando cambien las cookies que usamos. La fecha de la última revisión aparece al principio de esta página.
              </p>
            </Section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contacto
              </h2>
              <p className="leading-relaxed mb-4">
                Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en contactarnos.
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
