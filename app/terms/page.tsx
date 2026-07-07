import { FileText } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the Energy-Outlet Terms of Service. Understand monthly subscriptions, capacity limits, automated load limiting, and hardware ownership terms.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
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
      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
            <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            Legal Center
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
            Terms of <span className="text-gradient-blue">Service</span>
          </h1>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Last Updated: June 2026. Please read these terms carefully before subscribing.
          </p>
        </div>

        {/* Terms Document Body wrapped in Client Transition */}
        <PageWrapper>
          <div
            className="glass-card rounded-3xl p-6 md:p-10 border border-brand-border/60 space-y-8 text-sm md:text-base leading-relaxed text-brand-text"
            style={{ background: 'rgba(21, 30, 46, 0.6)' }}
          >
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">1.</span> Acceptance of Agreement
              </h2>
              <p>
                By subscribing to or using any electricity grid managed by Energy-Outlet, a Gridlett product ("the Service"), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a residential household or commercial tenant, you warrant that you have authority to bind that household or business entity to these terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">2.</span> Service Description & Limits
              </h2>
              <p>
                Gridlett operates energy control layers to distribute solar electricity to multiple users. The Service is not unlimited. Each subscriber selects a capacity tier (e.g., Lite, Standard, Heavy). Gridlett reserves the right to manage and balance total inverter capacity to preserve battery life and assure fair uptime for all property subscribers.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">3.</span> Fair Access & Automated Load Limiting
              </h2>
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-brand-text space-y-2">
                <p className="font-semibold text-white">CRITICAL CLAUSE: Smart Energy Control</p>
                <p>
                  Our proprietary Smart Controller monitors load draw in real time. If your usage exceeds the capacity defined by your subscription tier (such as running heavy appliances like an A/C on a plan not rated for A/C), the controller will **automatically suspend supply to your unit**.
                </p>
                <p>
                  Uptime will automatically restore after a brief cooldown period (typically 5 minutes), provided you have switched off the high-draw appliances. Repeated overloading may lead to temporary account locking or administrative review.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">4.</span> Payments & Billing Policies
              </h2>
              <p>
                Gridlett operates on a prepaid, monthly billing cycle. Access is granted only upon receipt of payment. Subscriptions are recurring unless cancelled. No refunds or partial billing credits will be issued for voluntary cancellations or grid disruptions beyond the control of our engineering partners.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">5.</span> Hardware Ownership & Tampering
              </h2>
              <p>
                All solar arrays, inverters, storage batteries, wiring, and smart control meters remain the exclusive property of Gridlett or its authorized engineering partners. Bypassing, rewiring, opening, or tampering with the Gridlett Smart Control hardware is strictly prohibited and constitutes a material breach of this agreement.
              </p>
              <p className="text-red-400 font-semibold">
                Any detected hardware bypass or tampering will result in immediate termination of energy access, blocklisting from the grid, and report of fraud to the property manager.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">6.</span> Limitation of Liability
              </h2>
              <p>
                While Gridlett strives to deliver near-100% solar availability, we do not guarantee uninterrupted power. Gridlett shall not be held liable for damages, lost revenue, food spoilage, or hardware failures arising from weather conditions, prolonged low-solar periods, utility provider interferences, or customer equipment failure.
              </p>
            </section>
          </div>
        </PageWrapper>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
