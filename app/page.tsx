import { Metadata } from 'next'
import LandingPageContent from '@/components/LandingPageContent'

export const metadata: Metadata = {
  title: 'Energy-Outlet - Reliable Solar Subscriptions',
  description: 'Energy-Outlet installs solar systems inside apartments and hostels across Nigeria. Residents pick the power they need. Investors fund the capacity.',
  alternates: {
    canonical: 'https://energy-outlet.com',
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Energy-Outlet',
    'url': 'https://energy-outlet.com',
    'logo': 'https://energy-outlet.com/icon.svg',
    'description': 'Energy-Outlet installs solar systems inside apartments and hostels across Nigeria.',
    'sameAs': [
      'https://x.com',
      'https://linkedin.com',
      'https://instagram.com'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'care@energy-outlet.space',
      'contactType': 'operations support',
      'areaServed': 'NG',
      'availableLanguage': 'English'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageContent />
    </>
  )
}
