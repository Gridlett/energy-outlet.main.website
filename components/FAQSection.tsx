'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${
        isOpen ? 'border-brand-blue/50' : 'border-brand-border/40 hover:border-brand-border/80'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-white text-base md:text-lg pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0 w-8 h-8 rounded-lg bg-brand-border/40 flex items-center justify-center text-brand-text"
        >
          <ChevronDown className="w-4.5 h-4.5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-6 md:px-6 md:pb-6 text-sm md:text-base text-brand-text leading-relaxed border-t border-brand-border/20 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQS = [
  {
    question: 'What is Gridlett?',
    answer: 'Gridlett is a smart electricity access system that brings stable, solar power to shared properties (plazas, residential blocks, and estates) in Nigeria using automated load management and flexible tier subscriptions.',
  },
  {
    question: 'How does the Smart Controller prevent grid overload?',
    answer: 'Our smart control hardware is installed alongside the solar system. It monitors each unit’s real-time electricity draw. If your usage exceeds your tier capacity (e.g. running heavy appliances), the controller temporarily cuts power to your unit, protecting the battery bank and inverter from blowing. Power is restored automatically once the load is reduced.',
  },
  {
    question: 'How does the ₦0 upfront cost installation work?',
    answer: 'Gridlett partners with property owners and solar providers. We supply and set up the solar panels, batteries, and smart control layer without demanding upfront equipment costs. Residents pay only for their monthly energy subscription.',
  },
  {
    question: 'Can I change my subscription tier?',
    answer: 'Yes! You can upgrade or downgrade your tier through the resident portal at any time. Changes will take effect in your next billing cycle.',
  },
  {
    question: 'What is a "Cluster Code"?',
    answer: 'A Cluster Code is a unique ID generated for each Gridlett-enabled building or estate. You can get this code from your landlord, property developer, or facility manager. You need it to sign up and join the grid.',
  },
  {
    question: 'Who handles maintenance of the solar hardware?',
    answer: 'Gridlett and its partner solar technicians handle all maintenance, battery monitoring, panel cleaning, and technical issues. There are no surprise repair levies for residents.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative z-10 py-20 px-6 border-t border-brand-border/40">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
            <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            Support Center
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Frequently Asked{' '}
            <span className="text-gradient-emerald">Questions</span>
          </h2>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Everything you need to know about subscribing to Gridlett solar grids.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
