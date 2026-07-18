import type { Metadata } from 'next'
import './globals.css'
import LogRocketInit from '../components/LogRocketInit'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'Energy Outlet — Demand-First Power Infrastructure',
    template: '%s | Energy Outlet',
  },
  description: 'Energy Outlet converts concentrated energy demand into reliable, clean on-site solar power grids for complexes and blocks in Nigeria.',
  keywords: 'solar power, energy outlet, Nigeria, energy, off-grid, subscription power, smart load limiting, smart metering, pre-paid solar, microgrid',
  metadataBase: new URL('https://energy-outlet.space'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Energy Outlet — Demand-First Power Infrastructure',
    description: 'Reliable solar electricity on a fixed monthly plan. No upfront costs. No overloading. Just clean power.',
    url: 'https://energy-outlet.space',
    siteName: 'Energy Outlet',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'Energy Outlet Icon',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Energy Outlet — Demand-First Power Infrastructure',
    description: 'Reliable solar electricity on a fixed monthly plan. No upfront costs. No overloading. Just clean power.',
    images: ['/icon.svg'],
    creator: '@energy_outlet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-brand-black antialiased">
        <LogRocketInit />
        {children}
      </body>
    </html>
  )
}
