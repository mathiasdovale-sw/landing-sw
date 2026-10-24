import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'privacyPolicy',
  'en',
  'Privacy Policy | SellifyWorks'
);

const LAST_UPDATED = 'October 24, 2026'

const treatments: Array<{ title: string; data: string; purpose: string; basis: string; retention: string }> = [
  {
    title: 'Contact form',
    data: 'Name, email, company (optional), service of interest and the content of your message.',
    purpose: 'To answer your enquiry, send you the information or quote you request and, where applicable, manage the pre-contractual or contractual relationship.',
    basis: 'Pre-contractual steps taken at your request (art. 6.1.b GDPR) and your consent when submitting the form (art. 6.1.a GDPR).',
    retention: 'While your request is being handled and, if no business relationship follows, for a maximum of 12 months. If you become a client, for the duration of the relationship and the subsequent legal periods (e.g. 6 years for commercial and tax records).',
  },
  {
    title: 'Newsletter',
    data: 'Email address and date of sign-up and confirmation.',
    purpose: 'To send you content and news about Shopify, ecommerce and our services. Sign-up requires double confirmation (double opt-in) through a link we email to you.',
    basis: 'Your consent (art. 6.1.a GDPR and art. 21 LSSI).',
    retention: 'Until you unsubscribe, which you can do at any time through the link included in every email or by writing to us.',
  },
  {
    title: 'Browsing, analytics and advertising',
    data: 'Browsing data collected through cookies: online identifiers, IP address, pages visited, device and browser, interactions and anonymised session recordings.',
    purpose: 'To measure and improve how the website is used and to measure the effectiveness of our advertising campaigns.',
    basis: 'Your consent through the cookie banner (art. 6.1.a GDPR and art. 22.2 LSSI).',
    retention: 'As set out in the Cookie Policy.',
  },
  {
    title: 'Website security',
    data: 'IP address, technical browser data and interaction signals.',
    purpose: 'To protect forms against spam and abuse (Google reCAPTCHA) and keep the server secure.',
    basis: 'Legitimate interest in keeping the website secure (art. 6.1.f GDPR).',
    retention: 'Only as long as strictly necessary for that purpose.',
  },
]

const processors: Array<{ name: string; service: string; location: string }> = [
  { name: 'Vercel Inc.', service: 'Website hosting', location: 'USA (Data Privacy Framework and standard contractual clauses)' },
  { name: 'Sendinblue SAS (Brevo)', service: 'Transactional emails (contact and newsletter confirmation)', location: 'European Union (France)' },
  { name: 'Klaviyo, Inc.', service: 'Newsletter list management and sending', location: 'USA (Data Privacy Framework)' },
  { name: 'Google Ireland Ltd. / Google LLC', service: 'Google Analytics, Google Tag Manager, reCAPTCHA and Google Fonts', location: 'EU and USA (Data Privacy Framework)' },
  { name: 'Microsoft Ireland Operations Ltd. / Microsoft Corp.', service: 'Microsoft Clarity (usage analytics)', location: 'EU and USA (Data Privacy Framework)' },
  { name: 'Meta Platforms Ireland Ltd. / Meta Platforms, Inc.', service: 'Meta Pixel (advertising measurement)', location: 'EU and USA (Data Privacy Framework)' },
  { name: 'CookieYes Limited', service: 'Cookie consent management', location: 'United Kingdom (European Commission adequacy decision)' },
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

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Information about how we protect and use your personal data
          </p>
          <p className="text-gray-500 text-sm mt-2">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-10 text-gray-300">

            <Section title="Introduction">
              <p>
                At SellifyWorks we take the protection of your personal data seriously. This policy explains what data we process, why, on what legal basis, for how long and what rights you have. It applies to the website sellifyworks.com and has been drafted in accordance with Regulation (EU) 2016/679, the General Data Protection Regulation (GDPR), Spanish Organic Law 3/2018 on Personal Data Protection and Digital Rights (LOPDGDD) and Spanish Law 34/2002 on Information Society Services (LSSI).
              </p>
            </Section>

            {/* TODO legal: controller's tax ID (NIF) and full address still missing (art. 13 GDPR). Add once registered. */}
            <Section title="1. Data controller">
              <ul className="list-none space-y-1 pl-0">
                <li><strong className="text-white">Controller:</strong> Mathias Do Vale (SellifyWorks)</li>
                <li><strong className="text-white">Address:</strong> Barcelona, Spain</li>
                <li><strong className="text-white">Contact email:</strong> <a href="mailto:contact@sellifyworks.com" className="text-orange-400 hover:underline">contact@sellifyworks.com</a></li>
              </ul>
              <p>
                Further identification details are available in our{' '}
                <a href="/es/aviso-legal" className="text-orange-400 hover:underline">Legal Notice</a> (in Spanish).
              </p>
            </Section>

            <Section title="2. What data we process, why and on what legal basis">
              <p>
                We only process data you give us directly or that is collected while you browse the website, and always for specific purposes:
              </p>
              {treatments.map((t) => (
                <div key={t.title} className="bg-gray-800 rounded-lg p-4 not-prose">
                  <h3 className="text-xl font-semibold text-white mb-3">{t.title}</h3>
                  <dl className="space-y-2 text-base">
                    <div><dt className="inline font-semibold text-white">Data: </dt><dd className="inline">{t.data}</dd></div>
                    <div><dt className="inline font-semibold text-white">Purpose: </dt><dd className="inline">{t.purpose}</dd></div>
                    <div><dt className="inline font-semibold text-white">Legal basis: </dt><dd className="inline">{t.basis}</dd></div>
                    <div><dt className="inline font-semibold text-white">Retention: </dt><dd className="inline">{t.retention}</dd></div>
                  </dl>
                </div>
              ))}
              <p>
                Fields marked as required in the forms are necessary to handle your request. If you leave them empty, we will not be able to process it. By sending us your data, you confirm that it is accurate and agree to let us know of any changes.
              </p>
              <p>
                We do not make automated decisions or build profiles that have legal effects on you. Once the retention periods end, data is blocked for as long as legal liabilities may arise and is then deleted.
              </p>
            </Section>

            <Section title="3. Recipients of the data">
              <p>
                We do not sell or share your data with third parties, except where required by law (for example, with the Tax Agency, courts or law enforcement).
              </p>
              <p>
                To provide our services we rely on providers that access data as processors. We have a data processing agreement with each of them that guarantees the confidentiality and security of the data (art. 28 GDPR):
              </p>
              <div className="overflow-x-auto not-prose">
                <table className="w-full text-sm text-left">
                  <thead className="text-white border-b border-gray-700">
                    <tr>
                      <th className="py-2 pr-4 font-semibold">Provider</th>
                      <th className="py-2 pr-4 font-semibold">Service</th>
                      <th className="py-2 font-semibold">Location / safeguard</th>
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

            <Section title="4. International transfers">
              <p>
                Some of the providers above may process data outside the European Economic Area, mainly in the United States. In those cases, transfers rely on the provider&apos;s participation in the EU-U.S. Data Privacy Framework (European Commission adequacy decision of 10 July 2023) or on standard contractual clauses approved by the European Commission (art. 46 GDPR).
              </p>
            </Section>

            <Section title="5. Your rights">
              <p>You can exercise the following rights at any time:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-white">Access:</strong> find out whether we process your data and get a copy.</li>
                <li><strong className="text-white">Rectification:</strong> correct inaccurate or incomplete data.</li>
                <li><strong className="text-white">Erasure:</strong> ask us to delete your data when it is no longer needed.</li>
                <li><strong className="text-white">Objection:</strong> object to processing, in particular processing based on legitimate interest.</li>
                <li><strong className="text-white">Restriction:</strong> ask us to keep your data only to establish or defend legal claims.</li>
                <li><strong className="text-white">Portability:</strong> receive your data in a structured, commonly used format.</li>
                <li><strong className="text-white">Withdraw your consent</strong> at any time, without affecting the lawfulness of processing carried out before the withdrawal.</li>
              </ul>
              <p>
                To exercise them, write to{' '}
                <a href="mailto:contact@sellifyworks.com" className="text-orange-400 hover:underline">contact@sellifyworks.com</a>{' '}
                with the subject &quot;Data protection&quot; and tell us which right you want to exercise. If we have reasonable doubts about your identity, we may ask for additional information to confirm it. We will reply within one month at the latest.
              </p>
              <p>
                If you believe we have not handled your rights properly, you can lodge a complaint with the{' '}
                <a href="https://www.aepd.es/en" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Spanish Data Protection Agency (AEPD)</a>{' '}
                (C/ Jorge Juan, 6, 28001 Madrid, Spain) or with the supervisory authority of your country of residence in the EU.
              </p>
            </Section>

            <Section title="6. Marketing communications">
              <p>
                We will only send you marketing emails if you have subscribed to our newsletter and confirmed it, or if you are already a client and the emails concern services similar to those you purchased (art. 21.2 LSSI). Either way, you can unsubscribe for free through the link included in every email.
              </p>
            </Section>

            <Section title="7. Minors">
              <p>
                This website is aimed at professionals and businesses. We do not knowingly collect data from children under 14 (art. 7 LOPDGDD). If we find that we have, we will delete that data.
              </p>
            </Section>

            <Section title="8. Security">
              <p>
                We apply technical and organisational measures appropriate to the risk to protect your data against loss, alteration or unauthorised access. These include encrypted communications (HTTPS), form validation, spam protection and restricted access to information.
              </p>
            </Section>

            <Section title="9. Cookies">
              <p>
                This website uses first-party and third-party cookies. You can see the details and set your preferences in our{' '}
                <a href="/en/cookie-policy" className="text-orange-400 hover:underline">Cookie Policy</a>.
              </p>
            </Section>

            <Section title="10. Changes to this policy">
              <p>
                We may change this policy to reflect legal changes or new processing activities. Any changes will be published on this page and the date at the top will be updated. If this English version differs from the Spanish one, the Spanish version prevails.
              </p>
            </Section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contact
              </h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about our privacy policy or want to exercise your rights, please contact us.
              </p>
              <p className="text-orange-400">
                Email: contact@sellifyworks.com
              </p>
            </section>

            {/* Back Button */}
            <div className="text-center pt-8">
              <a
                href="/en/"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Back to home
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
