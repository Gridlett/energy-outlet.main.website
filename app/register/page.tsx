import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Energy-Outlet',
  description: 'Energy-Outlet subscriptions are invite-only. Access your cluster via the unique link shared by your compound caretaker.',
}

export default function RegisterPage() {
  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Radial glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,169,59,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      <Header />

      <div className="pt-32 pb-20 flex-1 relative z-10 flex items-center justify-center">
        <div className="form-card" style={{ width: '100%', maxWidth: '520px', textAlign: 'center' }}>
          <span className="eyebrow">Invite-Only Access</span>
          <h2 style={{ marginBottom: '16px', fontSize: '28px' }}>Registration Required via Cluster Link</h2>
          <p style={{ color: 'var(--paper-dim)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
            Energy-Outlet installs custom microgrids inside specific compounds. To sign up, you must use the private link provided by your compound caretaker or landlord (e.g., <code className="mono">/c/lugbe-estate-wing-c</code>).
          </p>

          <div style={{ padding: '16px', background: 'rgba(242,169,59,0.05)', border: '1px dashed rgba(242,169,59,0.2)', borderRadius: '8px', marginBottom: '28px', textAlign: 'left', fontSize: '13px' }}>
            <strong>Caretakers & Landlords:</strong> If you want to host a solar cluster on your property and offer subscription plans to your residents, email our engineering team at <a href="mailto:care@energy-outlet.space" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>care@energy-outlet.space</a>.
          </div>

          <Link href="/c/lugbe-estate-wing-c" className="btn btn-primary" style={{ width: '100%' }}>
            View Sample Cluster Page
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
