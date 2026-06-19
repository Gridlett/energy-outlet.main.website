import type { Metadata } from 'next'
import './globals.css'
import LogRocketInit from '../components/LogRocketInit'

export const metadata: Metadata = {
  title: {
    default: 'Gridlett — Power.. to let | Smart Solar Subscriptions',
    template: '%s | Gridlett',
  },
  description: 'Gridlett is a structured electricity access system that delivers reliable, clean solar power to homes and businesses in Nigeria while controlling fair usage automatically.',
  keywords: 'solar power, electricity access, Nigeria, energy, off-grid, subscription power, smart load limiting, smart metering, pre-paid solar, microgrid',
  metadataBase: new URL('https://gridlett.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gridlett — Power.. to let | Smart Solar Subscriptions',
    description: 'Reliable solar electricity on a fixed monthly plan. No upfront costs. No overloading. Just clean power.',
    url: 'https://gridlett.com',
    siteName: 'Gridlett',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'Gridlett Icon',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Gridlett — Power.. to let | Smart Solar Subscriptions',
    description: 'Reliable solar electricity on a fixed monthly plan. No upfront costs. No overloading. Just clean power.',
    images: ['/icon.svg'],
    creator: '@gridlett',
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
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-brand-black antialiased">
        <LogRocketInit />
        {children}
      </body>
    </html>
  )
}
