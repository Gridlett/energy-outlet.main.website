import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQClient from './faq-client'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Gridlett smart load limiting, solar subscription plans, billing, and setup for subscribers and hosts.',
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQPage() {
  return (
    <main className="relative min-h-screen bg-brand-black text-brand-text overflow-hidden flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] orb-blue pointer-events-none -translate-y-1/2 opacity-40" />
      <div className="fixed bottom-1/4 right-0 w-[450px] h-[450px] orb-emerald pointer-events-none translate-x-1/3 opacity-30" />

      {/* Header */}
      <Header />

      {/* Main Content Container wrapped in Client Transition */}
      <PageWrapper>
        <FAQClient />
        
        {/* Support Callout */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div 
            className="glass-card rounded-2xl p-6 text-center border border-brand-border/40"
            style={{ background: 'linear-gradient(135deg, rgba(30, 45, 69, 0.2), rgba(8, 13, 26, 0.4))' }}
          >
            <h3 className="font-display font-semibold text-white text-lg mb-2">Still have questions?</h3>
            <p className="text-sm text-brand-muted mb-4 max-w-md mx-auto">
              Our operations and technical support teams are always available to help clear up any queries.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Get in touch with us →
            </a>
          </div>
        </div>
      </PageWrapper>

      {/* Footer */}
      <Footer />
    </main>
  )
}
