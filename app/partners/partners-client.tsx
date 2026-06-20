'use client'

import Link from 'next/link'
import {
  Building2, Zap, ArrowRight, Check, ChevronDown,
  TrendingUp, Wrench, HandCoins, Shield, PlugZap,
  CircleDollarSign, HelpCircle, BadgeCheck, Activity,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

// ── Data ────────────────────────────────────────────────────────

const ARRANGEMENTS = [
  {
    id: 'finance-stay',
    tag: 'Arrangement 01',
    name: 'Partner Financing',
    tagline: 'Zero capital. Perpetual passive income. We become long-term partners.',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.06)',
    colorBorder: 'rgba(16,185,129,0.30)',
    icon: CircleDollarSign,
    recommended: true,
    outcome: 'Ongoing revenue share after cost recovery. Gridlett manages everything, forever.',
    youBring: [
      'Property access and tenant base',
      'Willingness to promote Gridlett subscriptions',
    ],
    gridlettBrings: [
      'Full solar panels, batteries & inverter installation',
      'Gridlett Smart Controller (stays permanently — ours)',
      'Tenant portal, billing automation & WhatsApp alerts',
      'Full lifecycle technical maintenance, forever',
    ],
    duringTerm: 'Gridlett collects tenant payments, operates the controller, and recovers hardware costs. You receive a partner dashboard showing live cluster performance.',
    atCompletion: 'Hardware costs recovered. You start receiving your revenue share on every tenant subscription. Gridlett continues commission. The controller stays — we keep operating.',
    bestFor: 'Landlords, caretakers, and facility managers who want recurring passive income with zero operational headache — now and indefinitely.',
  },
  {
    id: 'plug-in',
    tag: 'Arrangement 02',
    name: 'Plug-In Partnership',
    tagline: 'You own the system. We provide the smart controls and billing automation.',
    color: '#a855f7',
    colorBg: 'rgba(168,85,247,0.06)',
    colorBorder: 'rgba(168,85,247,0.25)',
    icon: PlugZap,
    outcome: 'Stop billing disputes and battery overloads today. Commission-only relationship.',
    youBring: [
      'Existing solar panels, inverter & battery bank',
      'OR capital to purchase your own system independently',
      'Tenant base ready to subscribe',
    ],
    gridlettBrings: [
      'Gridlett Smart Controller installation (stays permanently — ours)',
      'Tenant portal & subscription management platform',
      'Automated billing, WhatsApp notifications & load limits',
      'Technical support for the controller',
    ],
    duringTerm: 'Gridlett installs the Smart Controller on your existing setup and activates the platform. Tenant subscriptions go live. You collect through the partner dashboard. Gridlett takes commission.',
    atCompletion: 'No payoff term — this is an ongoing commission arrangement. Controller belongs to Gridlett. Exit is by mutual agreement with advance notice.',
    bestFor: 'Property owners with functioning solar who are losing money to battery overloads, unpaid bills, or billing disputes — and want it solved fast.',
  },
  {
    id: 'finance-exit',
    tag: 'Arrangement 03',
    name: 'Financing Only',
    tagline: 'We finance your solar. You own it after payoff. We leave.',
    color: '#3b82f6',
    colorBg: 'rgba(59,130,246,0.06)',
    colorBorder: 'rgba(59,130,246,0.25)',
    icon: TrendingUp,
    outcome: 'Full solar ownership at end of term. Zero ongoing commission.',
    youBring: [
      'Property roof/ground space for installation',
      'Fixed monthly financing payments',
    ],
    gridlettBrings: [
      'Full solar panels, batteries & inverter installation',
      'Gridlett Smart Controller (managed by us during term)',
      'Uptime monitoring & full hardware maintenance during term',
    ],
    duringTerm: 'You make fixed monthly financing payments. Gridlett operates the controller and handles all system maintenance to ensure stable power.',
    atCompletion: 'Financing term ends. Gridlett transfers full solar ownership to you and removes the controller. You run the system independently with zero ongoing fees.',
    bestFor: 'Individual property owners or developers who want to buy solar on a monthly payment plan and eventually own it outright with zero operational fees.',
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Submit an Enquiry',
    body: 'Fill out our partner contact form. Tell us your property type, location, and current power situation.',
    icon: HandCoins,
  },
  {
    step: '02',
    title: 'Site Assessment',
    body: 'Our team visits the property, assesses the solar potential, existing infrastructure, and tenant capacity.',
    icon: Activity,
  },
  {
    step: '03',
    title: 'Arrangement Proposal',
    body: 'We recommend the right arrangement for your situation and send a clear proposal — no hidden terms.',
    icon: BadgeCheck,
  },
  {
    step: '04',
    title: 'Installation & Go Live',
    body: 'Hardware is installed. Cluster is configured. Tenants get their Cluster Code and subscribe within days.',
    icon: Zap,
  },
]

const PARTNER_FAQS = [
  {
    question: 'Do I need to already have solar panels to partner with Gridlett?',
    answer: 'No. Two of our three models (Partner Financing and Financing Only) provide full solar installation at zero upfront cost. Only the "Plug-In Partnership" requires existing solar infrastructure or independent purchase.',
  },
  {
    question: 'What commission does Gridlett take?',
    answer: 'Commission rates are agreed during the proposal stage and depend on the arrangement, property size, and installation complexity. We are transparent — you will see the exact percentage in your partner agreement before signing.',
  },
  {
    question: 'What happens if a tenant stops paying?',
    answer: 'The Gridlett platform automatically suspends access for non-paying tenants. Your cluster\'s battery bank is protected — unpaid tenants cannot continue drawing power. Collections are Gridlett\'s responsibility, not yours.',
  },
  {
    question: 'Can I register multiple properties?',
    answer: 'Yes. Each property gets its own Cluster Code and partner dashboard. You can manage multiple clusters from a single partner account in the Gridlett portal.',
  },
  {
    question: 'Who owns the Gridlett Smart Controller?',
    answer: 'The Gridlett Smart Controller belongs to Gridlett in every arrangement. Under Financing Only, it is removed at payoff. Under Partner Financing and Plug-In Partnership, it remains installed permanently. This means you never carry maintenance liability for the device.',
  },
  {
    question: 'What if I want to exit the partnership?',
    answer: 'Exit terms depend on your model. Financing Only has a natural completion point. Partner Financing and Plug-In Partnership require mutual agreement with a notice period. All terms are clearly stated in your partner agreement — no surprises.',
  },
]

// ── Sub-components ───────────────────────────────────────────────

function ArrangementCard({ arrangement }: { arrangement: typeof ARRANGEMENTS[0] }) {
  const Icon = arrangement.icon
  return (
    <div
      className="rounded-3xl p-8 md:p-10 border relative overflow-hidden"
      style={{ background: arrangement.colorBg, borderColor: arrangement.colorBorder }}
    >
      {arrangement.recommended && (
        <span
          className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{ background: arrangement.color, color: '#fff' }}
        >
          Most Popular
        </span>
      )}

      {/* Tag + icon */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${arrangement.color}18`, border: `1px solid ${arrangement.color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color: arrangement.color }} />
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: arrangement.color }}>
          {arrangement.tag}
        </span>
      </div>

      {/* Name + tagline */}
      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2">
        {arrangement.name}
      </h3>
      <p className="text-brand-text text-sm md:text-base leading-relaxed mb-8">
        {arrangement.tagline}
      </p>

      {/* Two-column breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* You bring */}
        <div className="bg-brand-black/30 rounded-2xl p-5 border border-brand-border/20">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted mb-3">
            What you bring
          </p>
          <ul className="space-y-2.5">
            {arrangement.youBring.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-text">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: arrangement.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Gridlett brings */}
        <div className="bg-brand-black/30 rounded-2xl p-5 border border-brand-border/20">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted mb-3">
            What Gridlett brings
          </p>
          <ul className="space-y-2.5">
            {arrangement.gridlettBrings.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-text">
                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: arrangement.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* During term + at completion */}
      <div className="space-y-4 mb-8">
        <div className="rounded-xl p-4 border border-brand-border/20 bg-brand-black/20">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-muted mb-1.5">
            During the term
          </p>
          <p className="text-sm text-brand-text leading-relaxed">{arrangement.duringTerm}</p>
        </div>
        <div
          className="rounded-xl p-4 border"
          style={{ background: `${arrangement.color}08`, borderColor: `${arrangement.color}25` }}
        >
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: arrangement.color }}>
            At completion / ongoing
          </p>
          <p className="text-sm text-white leading-relaxed">{arrangement.atCompletion}</p>
        </div>
      </div>

      {/* Best for */}
      <p className="text-xs text-brand-muted italic mb-8">
        ✦ Best for: {arrangement.bestFor}
      </p>

      {/* CTA */}
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm font-display transition-all hover:opacity-90 text-white"
        style={{ background: arrangement.color, boxShadow: `0 4px 20px ${arrangement.color}30` }}
      >
        Talk to us about this arrangement
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

function PartnerFAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${open ? 'border-emerald-500/40' : 'border-brand-border/40 hover:border-brand-border/80'
        }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-white text-sm md:text-base pr-4">{question}</span>
        <div
          className="shrink-0 w-8 h-8 rounded-lg bg-brand-border/40 flex items-center justify-center text-brand-text transition-transform duration-250"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      {open && (
        <div className="px-5 pb-6 md:px-6 md:pb-6 text-sm text-brand-text leading-relaxed border-t border-brand-border/20 pt-4">
          {answer}
        </div>
      )}
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────

export default function PartnersClient() {
  return (
    <div className="relative z-10 flex-1">

      {/* ── HERO & ARRANGEMENTS ── */}
      <section className="pt-36 pb-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            Partnership Models
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Power your property.{' '}
            <span className="text-gradient-emerald">Earn from every unit.</span>
          </h1>
          <p className="text-brand-text max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Not a subscription. Not a product purchase. These are business arrangements — each designed for a different property situation. All include the Gridlett Smart Controller.
          </p>
        </div>

        <div className="space-y-8">
          {ARRANGEMENTS.map((arrangement) => (
            <ArrangementCard key={arrangement.id} arrangement={arrangement} />
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="px-6 max-w-5xl mx-auto mb-24">
        <h2 className="font-display text-2xl font-bold text-white text-center mb-8">
          At a glance
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-brand-border/40">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-border/40" style={{ background: 'rgba(21,30,46,0.6)' }}>
                <th className="text-left px-6 py-4 font-display font-bold text-brand-muted text-xs uppercase tracking-wider w-[30%]">Feature</th>
                <th className="px-5 py-4 font-display font-bold text-emerald-400 text-xs uppercase tracking-wider text-center">Partner Financing</th>
                <th className="px-5 py-4 font-display font-bold text-purple-400 text-xs uppercase tracking-wider text-center">Plug-In Partnership</th>
                <th className="px-5 py-4 font-display font-bold text-blue-400 text-xs uppercase tracking-wider text-center">Financing Only</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/20">
              {[
                { feature: 'Upfront cost', vals: ['₦0', '₦0 (need own solar)', '₦0'] },
                { feature: 'Gridlett installs solar', vals: ['Yes', 'No', 'Yes'] },
                { feature: 'Controller ownership', vals: ['Gridlett', 'Gridlett ', 'Gridlett (removed at payoff)'] },
                { feature: 'Revenue share for partner', vals: ['Yes (after cost recovery)', 'Yes (from day 1)', 'No'] },
                { feature: 'Ongoing Gridlett commission', vals: ['Yes', 'Yes', 'No'] },
                { feature: 'Full solar ownership', vals: ['No', 'Already yours', 'Yes (at term end)'] },
                { feature: 'Maintenance responsibility', vals: ['Gridlett', 'Gridlett (controller only)', 'Gridlett (during term)'] },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(8,13,26,0.4)' : 'transparent' }}>
                  <td className="px-6 py-4 text-brand-text font-medium">{row.feature}</td>
                  {row.vals.map((val, j) => (
                    <td key={j} className="px-5 py-4 text-center text-white/80">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="px-6 max-w-5xl mx-auto mb-24 border-t border-brand-border/30 pt-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            From enquiry to go-live
          </h2>
          <p className="text-brand-text text-sm max-w-lg mx-auto">
            Most properties are live within 2–4 weeks of site assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative">
                <div className="glass-card rounded-2xl p-6 border border-brand-border/40 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500/60 block mb-2">
                    Step {step.step}
                  </span>
                  <h3 className="font-display font-semibold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-xs text-brand-text leading-relaxed">{step.body}</p>
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-brand-border" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── PARTNER FAQ ── */}
      <section className="px-6 max-w-4xl mx-auto mb-24 border-t border-brand-border/30 pt-20">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            Partner FAQ
          </div>
          <h2 className="font-display text-3xl font-bold text-white">
            Questions from property owners
          </h2>
        </div>

        <div className="space-y-4">
          {PARTNER_FAQS.map((faq, idx) => (
            <PartnerFAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 max-w-4xl mx-auto mb-24">
        <div
          className="rounded-3xl p-10 md:p-14 text-center border relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(8,13,26,0.8))', borderColor: 'rgba(16,185,129,0.2)' }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 orb-emerald pointer-events-none opacity-30" />

          <div className="relative z-10">
            <Building2 className="w-10 h-10 text-emerald-400 mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to bring Gridlett to your property?
            </h2>
            <p className="text-brand-text max-w-lg mx-auto text-sm leading-relaxed mb-8">
              Fill out our partner enquiry form and we'll schedule a free site assessment. No commitment. No jargon. Just a clear proposal for your property.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-white font-bold text-base font-display hover:opacity-95 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #34d399, #10b981)', boxShadow: '0 4px 24px rgba(16,185,129,0.3)' }}
            >
              Book a property assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
