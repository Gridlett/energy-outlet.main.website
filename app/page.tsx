import { Zap, Shield, BarChart3, Users, CheckCircle2, Building2, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Energy-Outlet - Reliable Solar Subscriptions',
  description: 'Energy-Outlet installs solar systems inside apartments and hostels across Nigeria. Residents pick the power they need. Investors fund the capacity.',
  alternates: {
    canonical: 'https://energy-outlet.com',
  },
}

const HOW_IT_WORKS = [
  {
    icon: Building2,
    step: '01',
    title: 'Survey the site',
    body: 'We walk the property with the landlord and map it as a cluster — one compound, one shared solar install, one line.',
    color: 'emerald',
  },
  {
    icon: Shield,
    step: '02',
    title: 'Secure the space',
    body: 'We agree terms with the landlord and pay an agreed fee to install and operate on the property.',
    color: 'blue',
  },
  {
    icon: Users,
    step: '03',
    title: 'Residents pick their tier',
    body: 'No one needs to know their wattage. They tell us what they want powered, and we classify the tier.',
    color: 'emerald',
  },
  {
    icon: BarChart3,
    step: '04',
    title: 'We size the system',
    body: 'Every tier maps to a wattage. We sum the whole cluster\'s real demand and size the solar capacity to match.',
    color: 'blue',
  },
  {
    icon: CheckCircle2,
    step: '05',
    title: 'Investors fund the capacity',
    body: 'Surveyed, sized clusters go live for funding — capacity required, financing needed, and a minimum ticket, all listed before anyone commits.',
    color: 'emerald',
  },
]

function HeroPowerOrb() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* ambient glow layers */}
      <div className="absolute inset-0 orb-blue rounded-full opacity-50" />
      <div className="absolute inset-8 orb-emerald rounded-full opacity-45" style={{ animationDelay: '1s' }} />

      {/* pulse rings */}
      <div className="absolute w-48 h-48 rounded-full border border-blue-500/20 pulse-ring" />
      <div className="absolute w-48 h-48 rounded-full border border-blue-500/20 pulse-ring-delay" />
      <div className="absolute w-32 h-32 rounded-full border border-emerald-500/30" style={{ animation: 'ring-pulse 2s ease-out 1.4s infinite' }} />

      {/* Core icon */}
      <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1E2D45, #0D1525)', border: '2px solid rgba(59,130,246,0.4)', boxShadow: '0 0 40px rgba(59,130,246,0.25), inset 0 0 20px rgba(59,130,246,0.05)' }}>
        <Zap className="w-10 h-10 animate-pulse" style={{ color: '#3b82f6', filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.8))' }} fill="#3b82f6" />
      </div>
    </div>
  )
}

function HowItWorks() {
  return (
    <section className="py-24 px-6 border-t border-brand-border/30" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">The process</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            One compound.{' '}
            <span className="text-gradient-emerald">One survey.</span>{' '}
            One solar install.
          </h2>
          <p className="mt-4 text-brand-text max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            A cluster is a mapped location — a single property where we install solar and meter every resident's demand individually.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {HOW_IT_WORKS.map((item) => {
            const Icon = item.icon
            const isBlue = item.color === 'blue'
            return (
              <div key={item.step} className="glass-card rounded-2xl p-6 group"
                style={{ transition: 'border-color 0.3s' }}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: isBlue ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)',
                      border: `1px solid ${isBlue ? 'rgba(59,130,246,0.25)' : 'rgba(16,185,129,0.25)'}`,
                    }}>
                    <Icon className="w-5 h-5" style={{ color: isBlue ? '#3b82f6' : '#10B981' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: isBlue ? '#3b82f688' : '#10B98188' }}>
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg leading-snug mb-2">{item.title}</h3>
                    <p className="text-brand-text text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Energy-Outlet',
    'url': 'https://energy-outlet.com',
    'logo': 'https://energy-outlet.com/icon.svg',
    'description': 'Energy-Outlet installs solar systems inside apartments and hostels across Nigeria.',
    'sameAs': [
      'https://x.com',
      'https://linkedin.com',
      'https://instagram.com'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'care@energy-outlet.space',
      'contactType': 'operations support',
      'areaServed': 'NG',
      'availableLanguage': 'English'
    }
  }

  return (
    <main className="relative overflow-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* ── Centred energy field background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Central radial glow — blue core */}
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full animate-orb-breath-1"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.03) 45%, transparent 70%)', filter: 'blur(40px)' }}
        />
        {/* Secondary emerald glow — slightly offset */}
        <div
          className="absolute top-[42%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full animate-orb-breath-2"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }}
        />
        {/* Large pulse ring 1 */}
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pulse-ring"
          style={{ border: '1px solid rgba(59,130,246,0.06)' }}
        />
        {/* Large pulse ring 2 */}
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full pulse-ring-delay"
          style={{ border: '1px solid rgba(59,130,246,0.04)' }}
        />
        {/* Large pulse ring 3 */}
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[920px] rounded-full"
          style={{ border: '1px solid rgba(59,130,246,0.025)', animation: 'ring-pulse 4s ease-out 1.2s infinite' }}
        />
        {/* Far emerald ring */}
        <div
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full"
          style={{ border: '1px solid rgba(16,185,129,0.02)', animation: 'ring-pulse 5s ease-out 2s infinite' }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <Header />

      {/* ── HERO ── */}
      <section className="relative z-10 pt-32 pb-16 px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Managed solar clusters &middot; Nigeria
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-5">
          <h1 className="font-display tracking-tight leading-[1.1]">
            <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold text-white">
              The <span className="text-gradient-emerald">grid flickers.</span>
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl mt-1 text-white">
              Your <span className="text-gradient-blue">cluster won't.</span>
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-center text-base md:text-xl text-brand-text max-w-4xl mx-auto leading-relaxed mb-16">
          Energy-Outlet installs solar systems inside apartments and hostels across Nigeria. Residents pick the power they need. Investors fund the capacity. Nobody waits on PHCN.
        </p>

        {/* Audience Write-ups (Instead of the toggle/cards) */}
        <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto w-full mb-16">
          <div className="text-center md:text-right px-6 flex-1">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">Fund solar capacity, earn from monthly plans</h3>
            <p className="text-base text-brand-text">Every cluster is sized before it's listed for funding.</p>
          </div>
          
          <div className="hidden md:block w-[1px] h-20 bg-brand-border/50 mx-8"></div>
          
          <div className="text-center md:text-left px-6 flex-1">
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">Have an invite from your landlord or caretaker?</h3>
            <p className="text-base text-brand-text">Pick your tier, sign up, and power on.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center max-w-xs mx-auto">
          <Link
            href="/invest"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm font-display text-white transition-transform hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}
          >
            <Zap className="w-4 h-4 fill-white" />
            View clusters
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  )
}
