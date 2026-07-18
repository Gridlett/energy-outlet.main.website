'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { Zap, Key, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden flex flex-col justify-between font-body">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0, 229, 160, 0.08) 0%, rgba(0, 191, 255, 0.03) 50%, transparent 80%)", filter: "blur(60px)" }} />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div className="relative z-10 flex-grow pt-32 pb-24 px-6 max-w-5xl mx-auto w-full flex items-center justify-center">
        <PageWrapper>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
                Welcome to Energy Outlet
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-3xl mx-auto mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
              Choose your path to <span className="text-gradient-emerald">clean solar energy</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We offer two ways to power your property. Select the plan that matches your needs and join the clean energy revolution.
            </p>
          </div>

          {/* Path Choice Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full mb-12">
            
            {/* Choice 1: Subscribe to Solar */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-border bg-card/60 backdrop-blur rounded-2xl p-8 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-all" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <Zap className="w-6 h-6" fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-emerald-400 transition-colors" style={{ fontFamily: "Sora, sans-serif" }}>
                  Subscribe to Energy
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Pre-installed solar capacity inside your apartment complex or hostel. Pick a customized weekly plan based on your appliances, keep your bills stable, and enjoy 24/7 power.
                </p>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Pay only for what you run</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Flexible weekly payments</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Zero upfront hardware cost</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/subscriber-signup"
                className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-500 text-black font-bold text-base rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
              >
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Choice 2: Pay Small Small (Lease) */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-border bg-card/60 backdrop-blur rounded-2xl p-8 flex flex-col justify-between hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-primary/10 transition-all" />
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                  <Key className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "Sora, sans-serif" }}>
                  Pay Small Small
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Acquire ownership of a premium custom solar setup for your plaza, business, or duplex. Indicate your weekly or monthly budget, specify requested capacity, and start leasing to own.
                </p>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Indicate your own custom budget</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Get a custom capacity estimate</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Full title transfer at end of lease</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/pay-small-small"
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold text-base rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/10"
              >
                Start Solar Lease
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>

          <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <span>Need help choosing? Contact our support line at care@energy-outlet.space</span>
          </div>
        </PageWrapper>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
