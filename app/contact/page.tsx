import { MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactClient from './contact-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Operations',
  description: 'Get in touch with Gridlett. Reach out to our operational representatives in Nigeria for smart controller installations, compound hosting, or subscription queries.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-brand-black text-brand-text overflow-hidden flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] orb-blue pointer-events-none -translate-y-1/2 opacity-40" />
      <div className="fixed bottom-1/4 right-0 w-[450px] h-[450px] orb-emerald pointer-events-none translate-x-1/3 opacity-30" />

      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
            <MessageSquare className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            Get in touch
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Contact <span className="text-gradient-emerald">Operations</span>
          </h1>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Have questions about shared solar grids or need assistance with your subscription? Send us a message.
          </p>
        </div>

        {/* Stateful Form and Info Channels */}
        <ContactClient />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
