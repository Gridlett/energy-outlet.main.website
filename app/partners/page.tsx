import { Metadata } from 'next'
import PartnersClient from './partners-client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'

export const metadata: Metadata = {
  title: 'Partner with Gridlett | Property Owners & Developers',
  description:
    'Bring structured solar power to your estate, plaza, or compound. Gridlett offers three flexible partnership arrangements — from zero-capital BNPL to plug-in management on existing solar. No upfront cost. Commission-based. Device always ours.',
  openGraph: {
    title: 'Partner with Gridlett | Property Owners & Developers',
    description:
      'Eliminate generator noise, billing disputes, and battery blowouts. Gridlett installs and operates smart solar infrastructure on your property — you earn, we manage.',
    url: 'https://gridlett.com/partners',
    siteName: 'Gridlett',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner with Gridlett | Property Owners & Developers',
    description:
      'Three property partnership models — Finance & Exit, Finance & Stay, and Plug In. All zero upfront. Gridlett device always ours.',
  },
  alternates: {
    canonical: 'https://gridlett.com/partners',
  },
}

export default function PartnersPage() {
  return (
    <PageWrapper>
      <Header />
      <PartnersClient />
      <Footer />
    </PageWrapper>
  )
}
