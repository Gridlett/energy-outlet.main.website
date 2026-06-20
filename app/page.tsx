import { Zap, Shield, BarChart3, Users, CheckCircle2, Building2, ArrowRight, Play, MessageSquare, Star } from 'lucide-react'
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
      'https://x.com',
      'https://linkedin.com',
      'https://instagram.com'
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
            Managed solar infrastructure &middot; Nigeria
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-5">
          <h1 className="font-display tracking-tight leading-[1.1]">
            <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold text-white">
              Power <span className="text-gradient-blue">without limits.</span>
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl mt-1 text-white">
              <span className="font-light text-slate-400">Usage </span>
              <span className="font-extrabold text-gradient-emerald">with structure.</span>
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-slate-400 font-semibold">
              For every shared building.
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-center text-base md:text-lg text-brand-text max-w-xl mx-auto leading-relaxed mb-12">
          Gridlett manages shared solar on estates, plazas, and compounds &mdash; property owners earn, residents pay fairly.
        </p>

        {/* Persona divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(30,45,69,0.8))' }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted px-2">Choose your path</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(30,45,69,0.8))' }} />
        </div>

        {/* Persona Cards — fully clickable */}
        <div className="grid sm:grid-cols-2 gap-5">

          {/* Property Owner — entire card is a link */}
          <Link
            href="/partners"
            className="group relative rounded-3xl p-7 md:p-9 border flex flex-col hover:scale-[1.015] hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] transition-all duration-500 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(8,13,26,0.85))', borderColor: 'rgba(16,185,129,0.28)' }}
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

            <div className="flex items-start justify-between mb-7">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}
              >
                &#8358;0 to install
              </span>
            </div>

            <p className="text-[14px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'rgba(52,211,153,0.6)' }}>
              Partners
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Install solar.<br />Earn passive income.
            </h2>
            <p className="text-sm text-brand-text leading-relaxed mb-7">
              We finance, install, and operate the full solar system. You provide the property and earn passive income from every subscription — for as long as Gridlett operates.
            </p>

            <ul className="space-y-2.5 mb-8">
              {[
                'Zero upfront cost — full solar financed',
                'We handle installation & all maintenance',
                'Passive income starts with the first subscriber',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-text">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="mt-auto w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm font-display text-white group-hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #34d399, #10b981)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
            >
              <Building2 className="w-4 h-4" />
              See partnership models
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Resident / Subscriber — entire card is a link */}
          <a
            href="#signup"
            className="group relative rounded-3xl p-7 md:p-9 border flex flex-col hover:scale-[1.015] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(8,13,26,0.85))', borderColor: 'rgba(59,130,246,0.22)' }}
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

            <div className="flex items-start justify-between mb-7">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}
              >
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}
              >
                3 plan tiers
              </span>
            </div>

            <p className="text-[14px] font-extrabold uppercase tracking-widest mb-2" style={{ color: 'rgba(96,165,250,0.6)' }}>
              Subscribers
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Reliable power.<br />Bills you can trust.
            </h2>
            <p className="text-sm text-brand-text leading-relaxed mb-7">
              Subscribe to a monthly energy plan and pay a fixed rate. No generator costs, no blackout, no surprise shared bills, no arguments with your neighbours.
            </p>

            <ul className="space-y-2.5 mb-8">
              {[
                'Reliable solar power around the clock',
                'Fixed monthly cost — no bill surprises',
                'Get your Cluster Code and subscribe in minutes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-text">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="mt-auto w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm font-display text-white group-hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}
            >
              <Zap className="w-4 h-4" fill="white" />
              Subscribe Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

        </div>
      </section>

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
