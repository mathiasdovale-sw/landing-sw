import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'privacyPolicy',
  'es',
  'Política de Privacidad | SellifyWorks'
);

const LAST_UPDATED = '24 de octubre de 2026'

const treatments: Array<{ title: string; data: string; purpose: string; basis: string; retention: string }> = [
  {
    title: 'Formulario de contacto',
    data: 'Nombre, email, empresa (opcional), servicio de interés y el contenido de tu mensaje.',
    purpose: 'Responder a tu consulta, enviarte la información o el presupuesto que solicitas y, en su caso, gestionar la relación precontractual o contractual.',
    basis: 'Aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD) y tu consentimiento al enviar el formulario (art. 6.1.a RGPD).',
    retention: 'Mientras se gestiona tu solicitud y, si no llega a haber relación comercial, un máximo de 12 meses. Si te conviertes en cliente, durante la relación y los plazos legales posteriores (p. ej., 6 años para la documentación mercantil y fiscal).',
  },
  {
    title: 'Newsletter',
    data: 'Email y fecha de alta y confirmación.',
    purpose: 'Enviarte contenidos y novedades sobre Shopify, ecommerce y nuestros servicios. El alta requiere doble confirmación (double opt-in) mediante un enlace que te enviamos por email.',
    basis: 'Tu consentimiento (art. 6.1.a RGPD y art. 21 LSSI).',
    retention: 'Hasta que te des de baja, cosa que puedes hacer en cualquier momento desde el enlace incluido en cada email o escribiéndonos.',
  },
  {
    title: 'Navegación, analítica y publicidad',
    data: 'Datos de navegación obtenidos mediante cookies: identificadores online, dirección IP, páginas visitadas, dispositivo y navegador, interacciones y grabaciones anonimizadas de sesión.',
    purpose: 'Medir y mejorar el uso de la web y medir la eficacia de nuestras campañas publicitarias.',
    basis: 'Tu consentimiento a través del banner de cookies (art. 6.1.a RGPD y art. 22.2 LSSI).',
    retention: 'Según los plazos indicados en la Política de Cookies.',
  },
  {
    title: 'Seguridad de la web',
    data: 'Dirección IP, datos técnicos del navegador y señales de interacción.',
    purpose: 'Proteger los formularios frente a spam y abusos (Google reCAPTCHA) y mantener la seguridad del servidor.',
    basis: 'Interés legítimo en garantizar la seguridad de la web (art. 6.1.f RGPD).',
    retention: 'El tiempo estrictamente necesario para esa finalidad.',
  },
]

const processors: Array<{ name: string; service: string; location: string }> = [
  { name: 'Vercel Inc.', service: 'Alojamiento de la web', location: 'EE. UU. (Data Privacy Framework y cláusulas contractuales tipo)' },
  { name: 'Sendinblue SAS (Brevo)', service: 'Envío de emails transaccionales (contacto y confirmación de newsletter)', location: 'Unión Europea (Francia)' },
  { name: 'Klaviyo, Inc.', service: 'Gestión de la lista y envío de la newsletter', location: 'EE. UU. (Data Privacy Framework)' },
  { name: 'Google Ireland Ltd. / Google LLC', service: 'Google Analytics, Google Tag Manager, reCAPTCHA y Google Fonts', location: 'UE y EE. UU. (Data Privacy Framework)' },
  { name: 'Microsoft Ireland Operations Ltd. / Microsoft Corp.', service: 'Microsoft Clarity (analítica de uso)', location: 'UE y EE. UU. (Data Privacy Framework)' },
  { name: 'Meta Platforms Ireland Ltd. / Meta Platforms, Inc.', service: 'Meta Pixel (medición publicitaria)', location: 'UE y EE. UU. (Data Privacy Framework)' },
  { name: 'CookieYes Limited', service: 'Gestión del consentimiento de cookies', location: 'Reino Unido (decisión de adecuación de la Comisión Europea)' },
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

export default function PoliticaDePrivacidadPage() {
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
            Política de Privacidad
          </h1>
          <p className="text-gray-400 text-lg">
            Información sobre cómo protegemos y utilizamos tus datos personales
          </p>
          <p className="text-gray-500 text-sm mt-2">Última actualización: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-10 text-gray-300">

            <Section title="Introducción">
              <p>
                En SellifyWorks nos tomamos en serio la protección de tus datos personales. Esta política explica qué datos tratamos, para qué, con qué base legal, durante cuánto tiempo y qué derechos tienes. Se aplica al sitio web sellifyworks.com y se ha redactado conforme al Reglamento (UE) 2016/679 General de Protección de Datos (RGPD), la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) y la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI).
              </p>
            </Section>

            {/* TODO legal: falta NIF y domicilio completo del responsable (art. 13 RGPD). Completar al darse de alta. */}
            <Section title="1. Responsable del tratamiento">
              <ul className="list-none space-y-1 pl-0">
                <li><strong className="text-white">Responsable:</strong> Mathias Do Vale (SellifyWorks)</li>
                <li><strong className="text-white">Domicilio:</strong> Barcelona, España</li>
                <li><strong className="text-white">Email de contacto:</strong> <a href="mailto:contact@sellifyworks.com" className="text-orange-400 hover:underline">contact@sellifyworks.com</a></li>
              </ul>
              <p>
                Puedes consultar el resto de datos identificativos en el{' '}
                <a href="/es/aviso-legal" className="text-orange-400 hover:underline">Aviso Legal</a>.
              </p>
            </Section>

            <Section title="2. Qué datos tratamos, para qué y con qué base legal">
              <p>
                Solo tratamos los datos que nos facilitas directamente o que se obtienen al navegar por la web, y siempre para finalidades concretas:
              </p>
              {treatments.map((t) => (
                <div key={t.title} className="bg-gray-800 rounded-lg p-4 not-prose">
                  <h3 className="text-xl font-semibold text-white mb-3">{t.title}</h3>
                  <dl className="space-y-2 text-base">
                    <div><dt className="inline font-semibold text-white">Datos: </dt><dd className="inline">{t.data}</dd></div>
                    <div><dt className="inline font-semibold text-white">Finalidad: </dt><dd className="inline">{t.purpose}</dd></div>
                    <div><dt className="inline font-semibold text-white">Base legal: </dt><dd className="inline">{t.basis}</dd></div>
                    <div><dt className="inline font-semibold text-white">Conservación: </dt><dd className="inline">{t.retention}</dd></div>
                  </dl>
                </div>
              ))}
              <p>
                Los campos marcados como obligatorios en los formularios son necesarios para atender tu solicitud. Si no los rellenas, no podremos gestionarla. Al enviarnos tus datos, garantizas que son verdaderos y que nos avisarás de cualquier cambio.
              </p>
              <p>
                No tomamos decisiones automatizadas ni elaboramos perfiles con efectos jurídicos sobre ti. Una vez terminados los plazos de conservación, los datos se bloquean durante el tiempo en que puedan surgir responsabilidades legales y después se eliminan.
              </p>
            </Section>

            <Section title="3. Destinatarios de los datos">
              <p>
                No vendemos ni cedemos tus datos a terceros, salvo por obligación legal (por ejemplo, a la Administración Tributaria, a Juzgados o a las Fuerzas y Cuerpos de Seguridad).
              </p>
              <p>
                Para prestar nuestros servicios contamos con proveedores que acceden a datos como encargados del tratamiento. Con todos ellos existe un acuerdo de encargo del tratamiento que garantiza la confidencialidad y la seguridad de los datos (art. 28 RGPD):
              </p>
              <div className="overflow-x-auto not-prose">
                <table className="w-full text-sm text-left">
                  <thead className="text-white border-b border-gray-700">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Proveedor</th>
                      <th className="py-2 pr-4 font-semibold">Servicio</th>
                      <th className="py-2 font-semibold">Ubicación / garantía</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processors.map((p) => (
                      <tr key={p.name} className="border-b border-gray-700 last:border-0 align-top">
                        <td className="py-2 pr-4 text-white">{p.name}</td>
                        <td className="py-2 pr-4">{p.service}</td>
                        <td className="py-2">{p.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="4. Transferencias internacionales">
              <p>
                Algunos de los proveedores anteriores pueden tratar datos fuera del Espacio Económico Europeo, principalmente en Estados Unidos. En esos casos, las transferencias se basan en la adhesión del proveedor al Marco de Privacidad de Datos UE-EE. UU. (decisión de adecuación de la Comisión Europea de 10 de julio de 2023) o en cláusulas contractuales tipo aprobadas por la Comisión Europea (art. 46 RGPD).
              </p>
            </Section>

            <Section title="5. Tus derechos">
              <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-white">Acceso:</strong> saber si tratamos tus datos y obtener una copia.</li>
                <li><strong className="text-white">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                <li><strong className="text-white">Supresión:</strong> pedir que eliminemos tus datos cuando ya no sean necesarios.</li>
                <li><strong className="text-white">Oposición:</strong> oponerte a un tratamiento, en particular al basado en interés legítimo.</li>
                <li><strong className="text-white">Limitación:</strong> pedir que conservemos tus datos solo para formular o defender reclamaciones.</li>
                <li><strong className="text-white">Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.</li>
                <li><strong className="text-white">Retirar tu consentimiento</strong> en cualquier momento, sin que afecte a la licitud del tratamiento anterior a la retirada.</li>
              </ul>
              <p>
                Para ejercerlos, escríbenos a{' '}
                <a href="mailto:contact@sellifyworks.com" className="text-orange-400 hover:underline">contact@sellifyworks.com</a>{' '}
                con el asunto &quot;Protección de datos&quot; e indica el derecho que quieres ejercer. Si tenemos dudas razonables sobre tu identidad, podremos pedirte información adicional para confirmarla. Te responderemos en el plazo máximo de un mes.
              </p>
              <p>
                Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación ante la{' '}
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Agencia Española de Protección de Datos</a>{' '}
                (C/ Jorge Juan, 6, 28001 Madrid).
              </p>
            </Section>

            <Section title="6. Comunicaciones comerciales">
              <p>
                Solo te enviaremos comunicaciones comerciales por email si te has suscrito a nuestra newsletter y lo has confirmado, o si ya eres cliente y se trata de servicios similares a los que contrataste (art. 21.2 LSSI). En cualquier caso, puedes darte de baja gratis desde el enlace incluido en cada email.
              </p>
            </Section>

            <Section title="7. Menores de edad">
              <p>
                Esta web está dirigida a profesionales y empresas. No recogemos de forma consciente datos de menores de 14 años (art. 7 LOPDGDD). Si detectamos que lo hemos hecho, eliminaremos esos datos.
              </p>
            </Section>

            <Section title="8. Seguridad">
              <p>
                Aplicamos medidas técnicas y organizativas adecuadas al riesgo para proteger tus datos frente a pérdida, alteración o acceso no autorizado. Entre ellas: cifrado de las comunicaciones (HTTPS), validación de formularios, protección antispam y acceso restringido a la información.
              </p>
            </Section>

            <Section title="9. Cookies">
              <p>
                Esta web utiliza cookies propias y de terceros. Puedes consultar el detalle y configurar tus preferencias en nuestra{' '}
                <a href="/es/politica-de-cookies" className="text-orange-400 hover:underline">Política de Cookies</a>.
              </p>
            </Section>

            <Section title="10. Cambios en esta política">
              <p>
                Podemos modificar esta política para adaptarla a cambios legales o a nuevos tratamientos. Publicaremos cualquier cambio en esta página y actualizaremos la fecha que aparece al principio.
              </p>
            </Section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contacto
              </h2>
              <p className="leading-relaxed mb-4">
                Si tienes alguna pregunta sobre nuestra política de privacidad o quieres ejercer tus derechos, contacta con nosotros.
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
