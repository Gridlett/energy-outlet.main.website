import { Zap, Shield, BarChart3, Users, CheckCircle2, Building2, Play, Star, MessageSquare } from 'lucide-react'
import SignupSection from '@/components/SignupSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reliable Solar Subscriptions',
  description: 'Gridlett delivers structured electricity access in Nigeria. Get reliable solar power on a fixed monthly subscription. No upfront costs, no overload blowouts, no noise.',
  alternates: {
    canonical: 'https://gridlett.com',
  },
}

// ── Static data ────────────────────────────────────────────────
const STATS = [
  { value: '99.9%', label: 'Uptime reliability' },
  { value: '3 tiers', label: 'Usage plans' },
  { value: '₦0', label: 'Upfront host cost' },
  { value: '24/7', label: 'Edge monitoring' },
]

const HOW_IT_WORKS = [
  {
    icon: Building2,
    step: 'A',
    title: 'Property host registers',
    body: 'The property host or manager registers the property. Gridlett installs the solar assets and smart edge controllers.',
    color: 'blue',
  },
  {
    icon: Users,
    step: 'B',
    title: 'Subscribers select a tier',
    body: 'Tenants and residents pick a monthly plan tier (Essential, Standard, or Premium) that fits their budget. No surprise bills.',
    color: 'emerald',
  },
  {
    icon: Shield,
    step: 'C',
    title: 'Gridlett enforces limits',
    body: 'Our edge controllers monitor load draws in real-time, preventing users from exceeding their allocated plan limits.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    step: 'D',
    title: 'Uptime stays stable',
    body: 'No single occupant can drain the batteries or overload the inverter. Uptime stays high for the entire building.',
    color: 'emerald',
  },
]

const TESTIMONIALS = [
  {
    quote: "Our commercial plaza generator costs dropped by 70%. Gridlett's automatic limit protection means we never argue with tenants about overloads or split bills.",
    author: "Alhaji Ibrahim K.",
    role: "Plaza Host (Property Owner)",
    location: "Lagos",
  },
  {
    quote: "I run my software agency all day from home. No generator fumes, no sudden blackouts, and I pay a fixed monthly tier. It has changed how I work.",
    author: "Chinedu O.",
    role: "Resident Subscriber",
    location: "Abuja",
  },
  {
    quote: "We retrofitted Gridlett smart switches onto our existing estate solar system. It finally secured our battery bank and made subscription collection seamless.",
    author: "Mrs. Amina Y.",
    role: "Estate Host (Facility Manager)",
    location: "Port Harcourt",
  },
]

const PROOF_ITEMS = [
  'No generator noise',
  'No power blackout',
  'No shared-bill disputes',
  'No upfront hardware cost',
]

// ── Components ─────────────────────────────────────────────────

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

function StatsBand() {
  return (
    <div className="border-y border-brand-border/50 py-10"
      style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.03), rgba(16,185,129,0.03))' }}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold font-display text-gradient-blue">{s.value}</p>
            <p className="text-sm text-brand-muted mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProofBadges() {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {PROOF_ITEMS.map((item) => (
        <span key={item}
          className="flex items-center gap-1.5 text-sm text-brand-text px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {item}
        </span>
      ))}
    </div>
  )
}

function HowItWorks() {
  return (
    <section className="py-24 px-6 border-t border-brand-border/30" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">The system</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Structured power,{' '}
            <span className="text-gradient-emerald">shared fairly</span>
          </h2>
          <p className="mt-4 text-brand-text max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Gridlett sits between the solar assets and the end users — enforcing capacity boundaries,
            collecting subscriptions, and keeping the microgrid stable.
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

// ── New Section: B2B/B2C Split Paths ───────────────────────────
function SplitPaths() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full border-t border-brand-border/30">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">Which describes you?</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
          Explore the Gridlett Network
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Host Card — shown first (primary business focus) */}
        <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 flex flex-col justify-between"
          style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(8, 13, 26, 0.6))' }}>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">For Property Owners</h3>
            <p className="text-sm text-brand-text leading-relaxed mb-6">
              Own a commercial plaza, estate, or residential compound? Eliminate noise and disputes by installing shared solar with ₦0 upfront cost (BNPL) or retrofitting your existing solar asset.
            </p>
          </div>
          <Link href="/partners" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors w-fit pt-4">
            Explore partnership models →
          </Link>
        </div>

        {/* Subscriber Card */}
        <div className="glass-card rounded-3xl p-8 border border-brand-border/50 flex flex-col justify-between"
          style={{ background: 'linear-gradient(135deg, rgba(30, 45, 69, 0.4), rgba(8, 13, 26, 0.6))' }}>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">For Subscribers</h3>
            <p className="text-sm text-brand-text leading-relaxed mb-6">
              Live in a Gridlett-enabled building? Fund your wallet and subscribe to a fixed monthly power limit. Plans are set by your property — ask your landlord or facility manager for your Cluster Code.
            </p>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors w-fit pt-4">
            See Energy Plans →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── New Section: UAT Video Showcase ───────────────────────────
function UATVideoShowcase() {
  return (
    <section className="py-24 px-6 border-t border-brand-border/30 max-w-5xl mx-auto w-full">
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="col-span-2 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            System Walkthrough
          </div>
          <h2 className="font-display text-3xl font-bold text-white leading-tight">
            See the control layer in action
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            During our User Acceptance Testing (UAT), we verified live inverter telemetry and automatic limit cutoff. Watch how our edge controllers instantly respond to load overloads.
          </p>
          <ul className="space-y-2.5 text-xs text-brand-muted">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              Real-time telemetry streams
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              Automatic overload cutoff demonstration
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              Local edge control verification
            </li>
          </ul>
        </div>

        {/* Video Frame Mockup */}
        <div className="col-span-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-border/80 bg-brand-navy/60 group shadow-2xl flex items-center justify-center">
            {/* Dark Overlay Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            {/* Pulse Play Icon */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-blue-400 transition-all duration-300 shadow-xl shadow-blue-500/30">
              <Play className="w-6 h-6 fill-white ml-1" />
            </div>

            {/* Mock Telemetry HUD overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GRID_EDGE_01: ONLINE
              </span>
              <span className="bg-slate-900/80 px-2 py-1 rounded border border-emerald-500/20">
                LIMIT: 1200W · LOAD: 420W
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── New Section: Testimonials Grid ────────────────────────────
function Testimonials() {
  return (
    <section className="py-24 px-6 border-t border-brand-border/30 max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }}>
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          Early Pilot Feedback
        </div>
        <h2 className="font-display text-3xl font-bold text-white">
          Trusted by hosts & subscribers
        </h2>
        <p className="mt-4 text-brand-text max-w-md mx-auto text-sm leading-relaxed">
          See how our structured solar grids are resolving the challenges of shared electricity access in Nigeria.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 border border-brand-border/40 flex flex-col justify-between relative"
          >
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-brand-text leading-relaxed mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="border-t border-brand-border/20 pt-4 flex flex-col">
              <span className="text-xs font-bold text-white">{t.author}</span>
              <span className="text-[10px] text-brand-muted font-medium mt-0.5">
                {t.role} · {t.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────
export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Gridlett',
    'url': 'https://gridlett.com',
    'logo': 'https://gridlett.com/icon.svg',
    'description': 'Gridlett is a structured electricity access system delivering reliable, clean solar power to homes and businesses in Nigeria while controlling fair usage automatically.',
    'sameAs': [
      'https://twitter.com/gridlett',
      'https://linkedin.com/company/gridlett',
      'https://instagram.com/gridlett'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'operations@gridlett.com',
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

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 orb-blue pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-1/4 right-0 w-80 h-80 orb-emerald pointer-events-none translate-x-1/3" />

      {/* ── NAVBAR ── */}
      <Header />

      {/* ── HERO ── */}
      <section className="relative z-10 pt-36 pb-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Now active · Across Nigeria
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
          <span className="whitespace-nowrap">Power <span className="text-gradient-blue">without</span></span>
          {' '}<span className="text-gradient-blue">limits.</span>
          <br />
          <span className="text-white/70 font-light">Usage</span>{' '}
          <span className="text-gradient-emerald">with structure.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed">
          Gridlett is a structured electricity access system that delivers reliable solar power
          to multiple households — while ensuring no one ever exceeds their fair share.
        </p>

        <ProofBadges />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="#signup"
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base font-display hover:opacity-95 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 24px rgba(59,130,246,0.3)' }}>
            <Zap className="w-5 h-5" fill="white" />
            Get connected
          </a>
          <a href="#how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-brand-text hover:text-white transition-colors"
            style={{ border: '1px solid #1E2D45' }}>
            See how it works →
          </a>
        </div>

        {/* Hero orb */}
        <div className="mt-16 relative">
          <HeroPowerOrb />
          <p className="text-xs text-brand-muted mt-4 tracking-widest uppercase font-medium">
            controlled energy access
          </p>
        </div>
      </section>

      {/* ── B2B/B2C SPLIT PATHS ── */}
      <SplitPaths />

      {/* ── STATS BAND ── */}
      <StatsBand />

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── UAT VIDEO SHOWCASE ── (coming soon — no video yet) */}
      {/* <UATVideoShowcase /> */}

      {/* ── TESTIMONIALS GRID ── (coming soon — no quotes yet) */}
      {/* <Testimonials /> */}

      {/* ── SIGNUP SECTION (Client Component) ── */}
      <SignupSection />

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  )
}
