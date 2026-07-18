'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { ShieldCheck, Loader2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ItemRow {
  name: string;
  watts: string;
  price: number;
  qty: number;
}

export default function SubscriberSignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    email: '',
    preferredCommunication: 'Both',
    signatureName: '',
    agreed: false
  });

  const [items, setItems] = useState<ItemRow[]>([
    { name: 'Bulb', watts: '60W', price: 1000, qty: 0 },
    { name: 'Fan', watts: '150W', price: 2500, qty: 0 },
    { name: 'TV', watts: '200W', price: 3800, qty: 0 },
    { name: 'Small Appliance', watts: '300W', price: 6000, qty: 0 },
    { name: 'Big Appliance', watts: '600W', price: 12000, qty: 0 },
    { name: 'Biggest Appliance', watts: '900W', price: 18000, qty: 0 },
  ]);

  const [totalWeeklyPayment, setTotalWeeklyPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate totals
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotalWeeklyPayment(total);
  }, [items]);

  const handleQtyChange = (index: number, val: string) => {
    const qty = Math.max(0, parseInt(val, 10) || 0);
    setItems(prev => prev.map((item, idx) => idx === index ? { ...item, qty } : item));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMsg('');

    if (!formData.fullName || !formData.phoneNumber || !formData.address || !formData.signatureName) {
      setErrorMsg('Please fill in all required fields.');
      setSubmitStatus('error');
      return;
    }

    if (!formData.agreed) {
      setErrorMsg('You must agree to the terms to submit.');
      setSubmitStatus('error');
      return;
    }

    if (totalWeeklyPayment === 0) {
      setErrorMsg('Please select at least one item quantity to calculate a subscription.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7890';
      const payload = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address.trim(),
        email: formData.email.trim() || null,
        preferredCommunication: formData.preferredCommunication,
        itemSelectionsJson: JSON.stringify(
          items
            .filter(i => i.qty > 0)
            .map(i => ({ item: i.name, watts: i.watts, price: i.price, qty: i.qty, subtotal: i.price * i.qty }))
        ),
        totalWeeklyPayment: totalWeeklyPayment,
        signatureName: formData.signatureName.trim()
      };

      const res = await fetch(`${baseUrl}/v1/PublicApplications/submit-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const respData = await res.json();
      if (!res.ok || respData.status === false) {
        throw new Error(respData.message || 'Failed to submit application.');
      }

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phoneNumber: '',
        address: '',
        email: '',
        preferredCommunication: 'Both',
        signatureName: '',
        agreed: false
      });
      setItems(items.map(item => ({ ...item, qty: 0 })));
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit subscription request. Please try again.');
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
          style={{ background: "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, rgba(0, 191, 255, 0.03) 50%, transparent 80%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
          <Link href="/welcome" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to welcome selector
          </Link>

          <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
                GridLett Subscriber Sign-Up
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
              Subscriber Sign-Up Form
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Fill in your customer details and appliance load requirements below to calculate your subscription setup.
            </p>
          </header>

          <div className="border border-border bg-card/60 backdrop-blur rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-xl pointer-events-none" />

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ fontFamily: "Sora, sans-serif" }}>Request Received!</h3>
                    <p className="text-sm text-emerald-400/90 leading-relaxed">
                      Thank you for submitting your subscriber registration. A confirmation WhatsApp/SMS will be sent shortly, and our logistics team will contact you to schedule an audit.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Customer Information */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4 pb-2 border-b border-border/40" style={{ fontFamily: "monospace" }}>
                  1. Customer Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="field-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Kolawole Cole"
                      className="field-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 08012345678"
                      className="field-input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="field-label">Installation Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Apartment A4, Block 2, Bodija Estate, Ibadan"
                      className="field-input"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="field-label">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="field-input"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Mode of Communication */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4 pb-2 border-b border-border/40" style={{ fontFamily: "monospace" }}>
                  2. Preferred Mode of Communication
                </h3>
                <div className="flex flex-wrap gap-6 items-center">
                  {['WhatsApp', 'SMS', 'Both'].map((mode) => (
                    <label key={mode} className="flex items-center gap-3 cursor-pointer select-none text-slate-350">
                      <input
                        type="radio"
                        name="preferredCommunication"
                        value={mode}
                        checked={formData.preferredCommunication === mode}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-emerald-500 rounded-full border border-border"
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Item Selection */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-2 pb-2 border-b border-border/40" style={{ fontFamily: "monospace" }}>
                  3. Item Selection
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Select the items and quantities you want to run. Your total weekly payment is calculated below.
                </p>

                <div className="overflow-x-auto rounded-xl border border-border bg-[#0B111E]/40">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border bg-[#10192C]/70">
                        <th className="p-4 font-semibold text-slate-200">Item</th>
                        <th className="p-4 font-semibold text-slate-200">Watts</th>
                        <th className="p-4 font-semibold text-slate-200">Weekly Price</th>
                        <th className="p-4 font-semibold text-slate-200 text-center">Qty</th>
                        <th className="p-4 font-semibold text-slate-200 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {items.map((item, idx) => (
                        <tr key={item.name} className="hover:bg-[#10192C]/20 transition-colors">
                          <td className="p-4 font-medium text-slate-200">{item.name}</td>
                          <td className="p-4 font-mono text-slate-400">{item.watts}</td>
                          <td className="p-4 font-mono text-slate-400">₦{item.price.toLocaleString()}</td>
                          <td className="p-4 text-center">
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={item.qty || ''}
                              onChange={(e) => handleQtyChange(idx, e.target.value)}
                              placeholder="0"
                              className="w-16 bg-[#080D1A] border border-border rounded px-2.5 py-1 text-center font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-slate-200">
                            ₦{(item.price * item.qty).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#10192C]/50 border-t border-border font-bold text-base">
                        <td colSpan={4} className="p-4 text-slate-200">TOTAL WEEKLY PAYMENT</td>
                        <td className="p-4 text-right font-mono text-emerald-400 text-lg">
                          ₦{totalWeeklyPayment.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Section 4: Agreement */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4 pb-2 border-b border-border/40" style={{ fontFamily: "monospace" }}>
                  4. Agreement
                </h3>
                <div className="p-5 rounded-xl border border-border bg-[#0B111E]/40 text-xs text-muted-foreground leading-relaxed mb-6">
                  By checking the agreement box below, I confirm that the information provided above is accurate and I agree to make consistent, timely payments in line with the plan selected. I understand that non-payment may result in service disconnection in accordance with Gridlett's terms of service, and that continued access to power is contingent on my account remaining in good standing.
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer select-none text-slate-350">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-emerald-500 rounded border border-border mt-0.5"
                      required
                    />
                    <span className="text-xs">I agree to the terms of the subscriber statement.</span>
                  </label>

                  <div className="grid sm:grid-cols-2 gap-5 pt-2">
                    <div>
                      <label className="field-label">Customer Signature (Type Name) *</label>
                      <input
                        type="text"
                        name="signatureName"
                        value={formData.signatureName}
                        onChange={handleInputChange}
                        placeholder="e.g. Kolawole Cole"
                        className="field-input font-handwriting"
                        required
                      />
                    </div>
                    <div>
                      <label className="field-label">Date</label>
                      <input
                        type="text"
                        value={new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}
                        className="field-input opacity-70 bg-secondary/10"
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreed || totalWeeklyPayment === 0}
                className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-500 text-black font-bold text-base rounded-xl disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 mt-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Application…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
