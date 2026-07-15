import { MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactClient from './contact-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Operations',
  description: 'Get in touch with Energy Outlet. Reach out to our operational representatives in Nigeria for smart controller installations, compound hosting, or subscription queries.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden flex flex-col justify-between font-body">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0, 229, 160, 0.08) 0%, rgba(0, 191, 255, 0.03) 50%, transparent 80%)", filter: "blur(60px)" }} />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div className="relative z-10 flex-grow pt-32 pb-24 px-6 max-w-6xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
              Get in touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Contact <span className="text-primary">Operations</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
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
