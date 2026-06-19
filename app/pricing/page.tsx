import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingClient from './pricing-client'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans & Hardware Models',
  description: 'View Gridlett subscription plans for subscribers (Essential 300W, Standard 1200W, Premium 2300W) and hardware/financing options for property hosts.',
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-brand-black text-brand-text overflow-hidden flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] orb-blue pointer-events-none -translate-y-1/2 opacity-40" />
      <div className="fixed bottom-1/4 right-0 w-[450px] h-[450px] orb-emerald pointer-events-none translate-x-1/3 opacity-30" />

      {/* Header */}
      <Header />

      {/* Pricing Client Section wrapped in Client Transition */}
      <PageWrapper>
        <PricingClient />
      </PageWrapper>

      {/* Footer */}
      <Footer />
    </main>
  )
}
