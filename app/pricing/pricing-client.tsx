'use client'

import { useState, useEffect } from 'react'
import { Zap, Check, ArrowRight, Fan, Lightbulb, Smartphone, Tv, Wind, Refrigerator, TrendingUp, CircleDollarSign, PlugZap, Shield } from 'lucide-react'
import Link from 'next/link'

const PLAN_RICH_CONFIG: Record<number, any> = {
  1: {
    subtitle: 'Essential Provisioning',
    color: '#3b82f6',
    guideline: 'Perfect for essential electronics: lights, standing fans, and personal devices.',
    appliances: [
      { icon: Fan, name: 'Standing Fan' },
      { icon: Lightbulb, name: 'LED Lighting' },
      { icon: Smartphone, name: 'Phone & Laptop' },
    ],
    features: [
      'Baseline load enforcement protection',
      'Real-time resident portal tracking',
      'WhatsApp billing receipts',
      '5-minute automated power self-restore',
    ],
  },
  2: {
    subtitle: 'Standard Distribution',
    color: '#10b981',
    popular: true,
    guideline: 'Capable of moderate household loads: multiple fans, TV, PC, and small coolers.',
    appliances: [
      { icon: Fan, name: 'Multiple Fans' },
      { icon: Lightbulb, name: 'Full Lighting' },
      { icon: Tv, name: 'TV & Home Theater' },
      { icon: Wind, name: 'Small Air Cooler' },
      { icon: Smartphone, name: 'All Electronics' },
    ],
    features: [
      'Medium-fidelity load allocations',
      'Priority grid balancing',
      'Real-time resident portal tracking',
      'WhatsApp overload notifications',
      'Priority technical support dispatch',
    ],
  },
  3: {
    subtitle: 'Premium Grid Access',
    color: '#a855f7',
    guideline: 'Sufficient for heavy household loads: refrigerator/freezer, AC units, and high-draw devices.',
    appliances: [
      { icon: Fan, name: 'Full Climate / AC' },
      { icon: Lightbulb, name: 'Smart Lighting' },
      { icon: Tv, name: 'High-End Systems' },
      { icon: Refrigerator, name: 'Refrigerator / Freezer' },
      { icon: Smartphone, name: 'Unlimited Devices' },
    ],
    features: [
      'High-fidelity energy telemetry',
      'Maximum inverter allocation limit',
      'Unrestricted P2P balancing',
      'Dedicated partner account manager',
      'Guaranteed grid priority status',
    ],
  },
}

const PARTNER_ARRANGEMENTS = [
  {
    id: 'finance-exit',
    tag: 'Arrangement 01',
    name: 'Finance & Exit',
    tagline: 'We finance your solar. You own it after payoff. We leave.',
    color: '#3b82f6',
    colorBg: 'rgba(59,130,246,0.06)',
    colorBorder: 'rgba(59,130,246,0.25)',
    icon: TrendingUp,
    upfront: '₦0',
    upfrontNote: 'BNPL — full solar financed',
    outcome: 'Full solar ownership at end of term. No more commission.',
    highlights: [
      'Gridlett installs panels, batteries & inverter',
      'Controller operated by Gridlett during term',
      'Costs recovered through tenant subscriptions',
      'At payoff: controller removed, solar is yours',
    ],
  },
  {
    id: 'finance-stay',
    tag: 'Arrangement 02',
    name: 'Finance & Stay',
    tagline: 'Zero capital. Perpetual passive income. We stay.',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.06)',
    colorBorder: 'rgba(16,185,129,0.30)',
    icon: CircleDollarSign,
    recommended: true,
    upfront: '₦0',
    upfrontNote: 'BNPL — full solar financed',
    outcome: 'Revenue share after cost recovery. Controller stays permanently.',
    highlights: [
      'Gridlett installs panels, batteries & inverter',
      'Controller stays permanently — belongs to Gridlett',
      'You earn revenue share after cost recovery',
      'Gridlett manages everything, forever',
    ],
  },
  {
    id: 'plug-in',
    tag: 'Arrangement 03',
    name: 'Plug In',
    tagline: 'You have the solar. We bring the management layer.',
    color: '#a855f7',
    colorBg: 'rgba(168,85,247,0.06)',
    colorBorder: 'rgba(168,85,247,0.25)',
    icon: PlugZap,
    upfront: 'Custom',
    upfrontNote: 'Commission only — no hardware financing',
    outcome: 'Stop billing disputes & overloads from day one.',
    highlights: [
      'You provide existing solar (or buy independently)',
      'Gridlett installs Smart Controller (stays permanently)',
      'Automated billing, limits & tenant portal',
      'Commission-based — no upfront from Gridlett',
    ],
  },
]

function PlanCardSkeleton() {
  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-brand-border/40 animate-pulse min-h-[450px]">
      <div className="space-y-4 text-center">
        <div className="h-3 bg-slate-800 rounded w-1/3 mx-auto" />
        <div className="h-6 bg-slate-800 rounded w-1/2 mx-auto" />
        <div className="h-10 bg-slate-800 rounded w-2/3 mx-auto" />
      </div>
      <div className="space-y-3 my-6">
        <div className="h-4 bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-800 rounded w-5/6" />
        <div className="h-4 bg-slate-800 rounded w-4/6" />
      </div>
      <div className="h-12 bg-slate-800 rounded w-full mt-auto" />
    </div>
  )
}

export default function PricingClient() {
  const [activeTab, setActiveTab] = useState<'subscribers' | 'hosts'>('subscribers')
  const [subscriberPlans, setSubscriberPlans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
        const res = await fetch(`${baseUrl}/v1/Plan/Get/System`)
        const data = await res.json()
        if (data.status && Array.isArray(data.data)) {
          const sortedPlans = [...data.data].sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          setSubscriberPlans(sortedPlans)
        }
      } catch (err) {
        console.error('Failed to fetch pricing plans:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPlans()
  }, [])

  return (
    <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <span 
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
          style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}
        >
          <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          Flexible Pricing Systems
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Structured plans for <br className="hidden sm:inline"/>
          <span className="text-gradient-blue">every scale</span>
        </h1>
        <p className="mt-4 text-brand-text max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Select your profile to view subscription plans or microgrid installations.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-16">
        <div className="bg-brand-navy/60 border border-brand-border/40 p-1.5 rounded-2xl flex gap-1.5 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm transition-all ${
              activeTab === 'subscribers'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                : 'text-brand-text hover:text-white'
            }`}
          >
            Energy Plans
          </button>
          <button
            onClick={() => setActiveTab('hosts')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm transition-all ${
              activeTab === 'hosts'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                : 'text-brand-text hover:text-white'
            }`}
          >
            Property Partners
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch mb-16">
        {isLoading && activeTab === 'subscribers' ? (
          <>
            <PlanCardSkeleton />
            <PlanCardSkeleton />
            <PlanCardSkeleton />
          </>
        ) : activeTab === 'subscribers' ? (
          subscriberPlans.map((plan) => {
            const rich = PLAN_RICH_CONFIG[plan.sortOrder] || PLAN_RICH_CONFIG[1]
            const priceStr = plan.amount ? `₦${plan.amount.toLocaleString()}` : 'Free'
            const limitStr = plan.maxPowerDemandWatts ? `${plan.maxPowerDemandWatts.toLocaleString()} Watts Max` : 'Unlimited Limit'
            
            return (
              <div
                key={plan.id}
                className={`glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative border transition-all duration-300 ${
                  rich.popular 
                    ? 'border-blue-500 shadow-[0_20px_50px_rgba(59,130,246,0.08)] md:-translate-y-2' 
                    : 'border-brand-border/60 hover:border-brand-border'
                }`}
              >
                {rich.popular && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Header info */}
                  <div className="text-center mb-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted">
                      {rich.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white mt-1">
                      {plan.name}
                    </h3>
                    <div className="my-4 flex items-baseline justify-center gap-1">
                      <span className="text-4xl md:text-5xl font-extrabold text-white">
                        {priceStr}
                      </span>
                      <span className="text-sm text-brand-muted font-semibold">/mo</span>
                    </div>
                    <span 
                      className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
                    >
                      {limitStr}
                    </span>
                  </div>

                  <hr className="border-brand-border/30 my-6" />

                  {/* Guidelines */}
                  <div className="mb-6">
                    <p className="text-xs text-brand-muted leading-relaxed italic">
                      "{rich.guideline}"
                    </p>
                  </div>

                  {/* Appliance Meter */}
                  {rich.appliances && (
                    <div className="mb-6 bg-brand-black/40 rounded-2xl p-4 border border-brand-border/20">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted block mb-3">
                        Usage Guideline
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {rich.appliances.map((app: any) => {
                          const Icon = app.icon
                          return (
                            <span
                              key={app.name}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-navy/60 border border-brand-border/40 text-xs font-medium text-white"
                            >
                              <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              {app.name}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Features list */}
                  {rich.features && (
                    <div className="space-y-3 mb-8">
                      {rich.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-brand-text leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-4 mt-auto">
                  <Link
                    href="/#signup"
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-center font-bold text-sm font-display transition-all ${
                      rich.popular
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:opacity-90'
                        : 'border border-brand-border hover:border-brand-border/80 text-brand-text hover:text-white'
                    }`}
                  >
                    Get Connected
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })
        ) : (
          // ── Partner Arrangements Tab ──
          <>
            {/* Device ownership notice */}
            <div
              className="col-span-3 mb-2 rounded-2xl px-5 py-4 flex items-start gap-3 border"
              style={{ background: 'rgba(59,130,246,0.05)', borderColor: 'rgba(59,130,246,0.2)' }}
            >
              <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-brand-text leading-relaxed">
                <span className="text-white font-semibold">The Gridlett Smart Controller always belongs to Gridlett</span> — in every arrangement. You never buy the device. You benefit from it.
              </p>
            </div>

            {PARTNER_ARRANGEMENTS.map((arr) => {
              const Icon = arr.icon
              return (
                <div
                  key={arr.id}
                  className="rounded-3xl p-6 md:p-8 flex flex-col justify-between relative border transition-all duration-300"
                  style={{ background: arr.colorBg, borderColor: arr.colorBorder }}
                >
                  {arr.recommended && (
                    <span
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full shadow-lg"
                      style={{ background: arr.color }}
                    >
                      Most Popular
                    </span>
                  )}

                  <div>
                    {/* Icon + tag */}
                    <div className="flex items-center gap-2.5 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${arr.color}18`, border: `1px solid ${arr.color}30` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: arr.color }} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: arr.color }}>
                        {arr.tag}
                      </span>
                    </div>

                    {/* Name + tagline */}
                    <h3 className="font-display font-bold text-xl text-white mb-1">{arr.name}</h3>
                    <p className="text-xs text-brand-text leading-relaxed mb-5">{arr.tagline}</p>

                    {/* Upfront */}
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="font-display text-4xl font-extrabold text-white">{arr.upfront}</span>
                      <span className="text-xs text-brand-muted">{arr.upfrontNote}</span>
                    </div>

                    <hr className="border-brand-border/20 mb-5" />

                    {/* Highlights */}
                    <div className="space-y-2.5 mb-5">
                      {arr.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: arr.color }} />
                          <span className="text-brand-text leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Outcome */}
                    <div
                      className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                      style={{ background: `${arr.color}10`, borderLeft: `3px solid ${arr.color}60`, color: '#cbd5e1' }}
                    >
                      <span className="font-bold text-white">Outcome: </span>{arr.outcome}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-6 mt-auto space-y-2">
                    <Link
                      href="/partners"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-center font-bold text-sm font-display transition-all text-white hover:opacity-90"
                      style={{ background: arr.color }}
                    >
                      Full arrangement details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-center text-sm font-semibold border border-brand-border text-brand-text hover:text-white hover:border-brand-border/80 transition-all"
                    >
                      Talk to us →
                    </Link>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      {/* Extra Pricing Note */}
      <div
        className="glass-card rounded-3xl p-6 md:p-8 border border-brand-border/40 text-center max-w-3xl mx-auto"
        style={{ background: 'rgba(21, 30, 46, 0.4)' }}
      >
        <h4 className="font-display font-semibold text-white text-base mb-2">
          {activeTab === 'subscribers' ? 'Need dynamic limits?' : 'Ready to get started?'}
        </h4>
        <p className="text-xs text-brand-muted leading-relaxed max-w-xl mx-auto">
          {activeTab === 'subscribers'
            ? 'Energy access is controlled at the cluster level by your estate hosts. Wattage limits represent real-time draw limits, not monthly energy volume caps. If you need custom quotas, consult your estate manager.'
            : 'Each partnership arrangement is tailored to your property. Visit our dedicated Partners page for full details on how each model works, or contact us directly to book a free site assessment.'}
        </p>
        {activeTab === 'hosts' && (
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Explore all partner arrangements →
          </Link>
        )}
      </div>
    </div>
  )
}
