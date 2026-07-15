'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_CATEGORIES: Record<string, FAQItem[]> = {
  general: [
    {
      question: 'What is Energy Outlet?',
      answer: 'Energy Outlet is a demand-first solar microgrid system. We aggregate energy demand, install custom solar microgrids at shared residential and commercial properties, and operate the infrastructure, charging residents a simple monthly subscription.'
    },
    {
      question: 'What is the "demand-first" model?',
      answer: 'Instead of building speculative solar arrays and trying to sell power, we only build after residents in a compound have pre-committed to plan tiers. This ensures our microgrids are sized perfectly, eliminating wasted capacity and keeping pricing low.'
    },
    {
      question: 'How is this different from buying my own solar setup?',
      answer: 'With Energy Outlet, you pay zero upfront equipment costs. We own, maintain, and monitor the solar panels and battery banks. You simply pay a stable monthly subscription fee for the electricity tier you choose.'
    }
  ],
  residents: [
    {
      question: 'How do I join my building\'s solar grid?',
      answer: 'To sign up, you need the unique Cluster Code provided by your caretaker or landlord (e.g. lugbe-estate-wing-c). Click "Find your cluster" on our site, input the code, select your plan tier, and submit your registration. We will confirm details via WhatsApp.'
    },
    {
      question: 'What happens if I exceed my plan\'s power capacity?',
      answer: 'To protect the shared solar inverter from overloading, our smart control layer monitors draw limits. If you turn on an appliance exceeding your active tier limits (e.g., trying to run an electric iron on a Basic fan/bulb plan), the power to your unit will automatically trip. Power is restored immediately once the heavy appliance is unplugged.'
    },
    {
      question: 'What plan sizes are available?',
      answer: 'We typically offer three tiers: Basic (~300W typical for fans, bulbs, phone charging), Comfort (~600W typical adding a TV and occasional light iron), and Full Power (~1kW+ typical adding a low-energy refrigerator).'
    }
  ],
  investors: [
    {
      question: 'What is the minimum ticket size for funding?',
      answer: 'The minimum contribution to invest in a shared cluster or lease-to-own solar project is ₦200,000.'
    },
    {
      question: 'How are returns paid out to investors?',
      answer: 'Once a cluster is fully funded, we install the hardware and begin resident billing. Repayments are distributed monthly to investors based on the metered plans and lease payments collected from the compound.'
    },
    {
      question: 'Are listings verified before they go live for funding?',
      answer: 'Absolutely. Every cluster and lease-to-own listing undergoes a strict pre-survey: caretaker contracts are signed, residents select their plans, and system capacity is calculated based on real committed demand before the listing is published.'
    }
  ]
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<'general' | 'residents' | 'investors'>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (category: 'general' | 'residents' | 'investors') => {
    setActiveCategory(category);
    setOpenIndex(null); // Reset accordion on tab change
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden flex flex-col justify-between font-body">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0, 229, 160, 0.08) 0%, rgba(0, 191, 255, 0.03) 50%, transparent 80%)", filter: "blur(60px)" }} />
      </div>

      <Header />

      <div className="relative z-10 flex-grow pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
              Help Center
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Find answers to common questions about our compound microgrids, resident plans, and investment terms.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <section className="mb-12 flex justify-center w-full">
          <div className="inline-flex p-1 rounded-lg bg-secondary/80 border border-border">
            {(['general', 'residents', 'investors'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2.5 rounded-md text-sm font-semibold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Accordions */}
        <section className="space-y-4 mb-20">
          {FAQ_CATEGORIES[activeCategory].map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border border-border bg-card/60 backdrop-blur rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 flex justify-between items-center text-left gap-4 font-semibold text-foreground hover:text-primary transition-colors focus:outline-none"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <span className="text-base md:text-lg">{faq.question}</span>
                  {isOpen ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground shrink-0" />}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/20 bg-secondary/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* CTA section */}
        <section className="border border-border bg-card/60 p-8 md:p-12 rounded-xl text-center relative overflow-hidden backdrop-blur-sm max-w-3xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "Sora, sans-serif" }}>
            Still have questions?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Our operational representatives are online to help you with setups, pricing details, or compound surveys.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/5"
            >
              Get in touch
            </Link>
            <a
              href="mailto:care@energy-outlet.space"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-muted-foreground hover:text-foreground border border-border bg-transparent hover:bg-secondary/40 transition-all"
            >
              Email Support
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
