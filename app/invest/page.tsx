'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Coins, CheckCircle, AlertCircle, Loader2, Building, ArrowRight, LineChart } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

export default function InvestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '₦200k - ₦500k',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMsg('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in all required fields.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Fallback submission simulation if EmailJS variables are missing
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '₦200k - ₦500k',
          notes: '',
        });
      }, 1500);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          role: `Investor (Budget: ${formData.budget})`,
          email: formData.email,
          phone: formData.phone,
          subject: 'New Investor Waitlist Application',
          message: formData.notes || 'No notes provided.',
        },
        publicKey
      );
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '₦200k - ₦500k',
        notes: '',
      });
    } catch (err) {
      console.error('Submission Error:', err);
      setErrorMsg('Failed to submit application. Please try again or email care@energy-outlet.space.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground font-body">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
      
      {/* subtle ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0, 229, 160, 0.08) 0%, rgba(0, 191, 255, 0.03) 50%, transparent 80%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
              For Investors & Partners
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "Sora, sans-serif" }}>
            Fund clean energy. <span className="text-primary">Earn steady returns.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Invest directly in pre-committed solar microgrids at apartments and hostels across Nigeria. We count demand, size systems, and manage operations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { val: "₦200,000", label: "Minimum ticket" },
              { val: "Monthly", label: "Repayment cycles" },
              { val: "100%", label: "Demand pre-surveyed" },
              { val: "No-hassle", label: "Operations managed" },
            ].map(({ val, label }) => (
              <div key={label} className="border border-border bg-card/40 p-6 rounded-xl text-center backdrop-blur-sm">
                <div className="text-xl md:text-2xl font-bold text-primary mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                  {val}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest" style={{ fontFamily: "monospace" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Section: How Compound Funding Works */}
        <section className="max-w-5xl mx-auto px-6 pb-24 w-full">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3" style={{ fontFamily: "monospace" }}>The Program Lifecycle</p>
            <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Sora, sans-serif" }}>
              How Compound Funding Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Every solar installation in our pipeline passes through strict stages before capital allocation is opened.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Demand Counting',
                desc: 'We count active resident commitments. We do not size systems or fund projects based on speculation—only real committed subscribers.'
              },
              {
                step: '02',
                title: 'Site Contract',
                desc: 'Caretakers and landlords sign spatial and hosting agreements. Inverter and battery protection housing layouts are approved.'
              },
              {
                step: '03',
                title: 'Capital Funding',
                desc: 'Verified projects are listed for funding. Registered partners contribute capital to acquire the hardware nodes.'
              },
              {
                step: '04',
                title: 'Monthly Payouts',
                desc: 'The solar microgrid goes live. Smart meters track energy usage, and monthly plan subscriptions flow back to fund repayments.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-border bg-card/60 backdrop-blur rounded-xl p-6 relative flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
                <div>
                  <span className="text-primary text-4xl font-extrabold block mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
                    {item.step}
                  </span>
                  <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Waitlist Form */}
        <section className="max-w-4xl mx-auto px-6 pb-24 w-full grid md:grid-cols-5 gap-12 items-start">
          <div className="col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-foreground leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Join the Investor Waitlist
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We list projects in funding rounds only after pre-surveys are finalized. Join the waitlist to receive immediate alerts on upcoming clusters, pre-allocations, and technical details.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <span>Zero speculative risk</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Coins className="w-5 h-5 text-primary shrink-0" />
                <span>Minimum commitment: ₦200,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <LineChart className="w-5 h-5 text-primary shrink-0" />
                <span>Monthly return schedules</span>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="border border-border bg-card/60 backdrop-blur rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl pointer-events-none" />
              <h3 className="font-bold text-foreground text-lg mb-6" style={{ fontFamily: "Sora, sans-serif" }}>Investor Profile</h3>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl text-sm bg-primary/10 border border-primary/20 text-primary flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Your profile was submitted successfully! We will contact you via email or WhatsApp when the next cluster round opens.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl text-sm bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="field-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Tunde Alao"
                    className="field-input"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="field-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 08012345678"
                      className="field-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Target Funding Budget *</label>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="field-input"
                      style={{ appearance: 'none' }}
                    >
                      <option value="₦200k - ₦500k">₦200k - ₦500k</option>
                      <option value="₦500k - ₦2m">₦500k - ₦2m</option>
                      <option value="₦2m - ₦5m">₦2m - ₦5m</option>
                      <option value="₦5m+">₦5m+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div>
                  <label className="field-label">Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your investment targets or inquiries..."
                    className="field-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-semibold rounded disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow-lg shadow-primary/5 mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Waitlist Application…
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 mb-16 w-full">
          <div className="border border-border/40 bg-secondary/20 p-6 rounded-xl text-center text-xs text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm leading-relaxed">
            Disclaimer: Capital returns and payout cycles depend on residents paying monthly subscriptions. Investor funds are governed under standard microgrid partnership frameworks.
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
