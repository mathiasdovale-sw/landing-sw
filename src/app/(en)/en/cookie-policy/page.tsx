import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'cookiePolicy',
  'en',
  'Cookie Policy | SellifyWorks'
);

const LAST_UPDATED = 'October 24, 2026'

// Keep in sync with the CookieYes scan, the GTM tags and the Spanish version of this page
const cookieGroups: Array<{
  category: string
  description: string
  cookies: Array<{ name: string; provider: string; purpose: string; duration: string }>
}> = [
  {
    category: 'Technical or necessary',
    description: 'Essential for the website to work and to remember your consent choices. They are exempt from consent (art. 22.2 LSSI) and cannot be disabled.',
    cookies: [
      { name: 'cookieyes-consent', provider: 'SellifyWorks (CookieYes)', purpose: 'Stores the cookie preferences you have chosen.', duration: '1 year' },
      { name: '_GRECAPTCHA', provider: 'Google (reCAPTCHA)', purpose: 'Protects the contact form against spam and automated use.', duration: '6 months' },
    ],
  },
  {
    category: 'Analytics',
    description: 'They allow us to measure visits and understand how the website is used so we can improve it. They are only set if you accept them.',
    cookies: [
      { name: '_ga', provider: 'Google Analytics 4', purpose: 'Statistically distinguishes unique users.', duration: '2 years' },
      { name: '_ga_<ID>', provider: 'Google Analytics 4', purpose: 'Keeps the session state.', duration: '2 years' },
      { name: '_clck', provider: 'Microsoft Clarity', purpose: 'Clarity user ID and preferences.', duration: '1 year' },
      { name: '_clsk', provider: 'Microsoft Clarity', purpose: 'Groups page views into a single session.', duration: '1 day' },
      { name: 'CLID', provider: 'Microsoft Clarity (clarity.ms)', purpose: 'Identifies the user\'s first visit to the website.', duration: '1 year' },
      { name: 'MUID', provider: 'Microsoft (bing.com)', purpose: 'Browser identifier used by Microsoft services.', duration: '1 year' },
    ],
  },
  {
    category: 'Advertising',
    description: 'They allow us to measure the effectiveness of our campaigns and show you relevant ads on other platforms. They are only set if you accept them.',
    cookies: [
      { name: '_fbp', provider: 'Meta (Facebook Pixel)', purpose: 'Measures conversions and enables ads on Meta platforms.', duration: '3 months' },
      { name: 'fr', provider: 'Meta (facebook.com)', purpose: 'Delivers, measures and improves the relevance of ads.', duration: '3 months' },
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

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Information about the use of cookies on our website
          </p>
          <p className="text-gray-500 text-sm mt-2">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-10 text-gray-300">

            <Section title="What are cookies?">
              <p>
                Cookies are small files downloaded to your device (computer, phone or tablet) when you visit a website. Among other things, they allow information about your browsing to be stored and retrieved. This policy also covers similar technologies, such as browser storage (localStorage and sessionStorage) and tracking pixels.
              </p>
              <p>
                This policy is issued in compliance with article 22.2 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI), Regulation (EU) 2016/679 (GDPR) and the cookie guidelines of the Spanish Data Protection Agency (AEPD).
              </p>
            </Section>

            <Section title="Who uses cookies?">
              <p>
                <strong className="text-white">First-party cookies:</strong> those sent from our own domain (sellifyworks.com).
              </p>
              <p>
                <strong className="text-white">Third-party cookies:</strong> those sent by other companies (Google, Microsoft and Meta), which process the data obtained under their own privacy policies.
              </p>
            </Section>

            <Section title="Cookies we use">
              <p>
                When you arrive on the website, only technical cookies are active. Analytics and advertising cookies stay blocked until you accept them in the cookie banner. Until then, Google only receives cookieless signals without identifiers, through Google Consent Mode v2.
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
                          <th className="py-2 pr-4 font-semibold">Owner</th>
                          <th className="py-2 pr-4 font-semibold">Purpose</th>
                          <th className="py-2 font-semibold">Duration</th>
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
                We also use browser storage to remember the visual theme (light or dark), your chosen language, whether you have already seen the newsletter prompt, and your scroll position while browsing. This information never leaves your device, is not used for tracking, and is considered technical or personalisation requested by you.
              </p>
            </Section>

            <Section title="Legal basis">
              <p>
                Technical cookies are set because they are necessary to provide the service you request. Analytics and advertising cookies are only used with your <strong className="text-white">consent</strong> (art. 6.1.a GDPR and art. 22.2 LSSI), which you can give or withdraw at any time, as easily as you gave it.
              </p>
            </Section>

            <Section title="International transfers">
              <p>
                Some providers (Google LLC, Microsoft Corporation and Meta Platforms, Inc.) may process data in the United States. These companies participate in the EU-U.S. Data Privacy Framework, which the European Commission considers to offer an adequate level of protection. You can find more information in their policies:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Google</a></li>
                <li><a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Microsoft (Clarity)</a></li>
                <li><a href="https://www.facebook.com/privacy/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Meta</a></li>
              </ul>
            </Section>

            <Section title="How to manage or withdraw your consent">
              <p>
                You can change your preferences or withdraw your consent at any time from our settings panel:
              </p>
              {/* CookieYes reopens the preferences panel on any element with the cky-banner-element class */}
              <button
                type="button"
                className="cky-banner-element not-prose inline-flex items-center px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                Cookie settings
              </button>
              <p>
                You can also block or delete cookies in your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Microsoft Edge</a></li>
              </ul>
              <p>
                If you block technical cookies, some parts of the website (such as the contact form) may not work properly.
              </p>
            </Section>

            <Section title="More information">
              <p>
                To learn how we process your personal data and how to exercise your rights, see our{' '}
                <a href="/en/privacy-policy" className="text-orange-400 hover:underline">Privacy Policy</a>. We may update this policy when the cookies we use change. The date of the latest revision is shown at the top of this page.
              </p>
            </Section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contact
              </h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about our cookie policy, please don&apos;t hesitate to contact us.
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
