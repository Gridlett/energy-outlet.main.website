import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Energy-Outlet',
  description: 'Energy-Outlet pricing plans are customized per compound, ranging from Basic fan & phone charging to Full Power fridge subscriptions.',
}

export default function PricingPage() {
  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Radial glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(63,182,171,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      <Header />

      <div className="pt-32 pb-20 flex-1 relative z-10 flex items-center justify-center">
        <div className="form-card" style={{ width: '100%', maxWidth: '720px', textAlign: 'center' }}>
          <span className="eyebrow">Survey-Based Pricing</span>
          <h2 style={{ marginBottom: '16px', fontSize: '32px' }}>Plain Language Power Tiers</h2>
          <p style={{ color: 'var(--paper-dim)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            We size solar arrays specifically to match each building's compound demand. Subscription fees are customized based on the cluster survey, with three clear tiers:
          </p>

          <div className="tiers" style={{ textAlign: 'left', marginBottom: '36px' }}>
            <div className="tier-card" style={{ cursor: 'default' }}>
              <div className="tier-name">Basic</div>
              <div className="tier-meter">~300W typical</div>
              <p style={{ fontSize: '13px', color: 'var(--paper-dim)' }}>Ideal for fans, lighting, and phone chargers. Priced starting from ₦4,000 / month depending on cluster size.</p>
            </div>
            <div className="tier-card" style={{ cursor: 'default' }}>
              <div className="tier-name">Comfort</div>
              <div className="tier-meter">~600W typical</div>
              <p style={{ fontSize: '13px', color: 'var(--paper-dim)' }}>Powers televisions, electronics, and occasional ironing. Priced starting from ₦7,500 / month depending on cluster size.</p>
            </div>
            <div className="tier-card" style={{ cursor: 'default' }}>
              <div className="tier-name">Full Power</div>
              <div className="tier-meter">~1kW+ typical</div>
              <p style={{ fontSize: '13px', color: 'var(--paper-dim)' }}>Supports 24/7 refrigerators, small appliances, and complete comfort. Priced starting from ₦12,000 / month depending on cluster size.</p>
            </div>
          </div>

          <Link href="/c/lugbe-estate-wing-c" className="btn btn-primary" style={{ width: 'fit-content' }}>
            View pricing on sample cluster page
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
