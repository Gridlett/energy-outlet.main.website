'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cluster } from '@/lib/db';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ClusterSignupPage({ params }: PageProps) {
  const slug = params.slug;
  const [cluster, setCluster] = useState<Cluster | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState('basic');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (slug) {
      fetch(`/api/cluster/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCluster(data.data);
          } else {
            setCluster(null);
          }
        })
        .catch((err) => {
          console.error('Error fetching cluster:', err);
          setCluster(null);
        });
    }
  }, [slug]);

  if (!cluster) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground font-body">
        <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <section className="flex-grow flex items-center justify-center text-center py-24 px-6">
            <div className="max-w-md mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EF4444]/30 bg-[#EF4444]/5 mb-6 text-[#EF4444] text-xs font-semibold uppercase tracking-wider mx-auto" style={{ fontFamily: "monospace" }}>
                404 Not Found
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
                Cluster Not Found
              </h2>
              <p className="text-muted-foreground mb-8 text-sm">
                We couldn't find a surveyed cluster matching the URL path: <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono">/cluster/{slug}</code>
              </p>
              <Link href="/" className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:brightness-110 transition-all">
                Return Home
              </Link>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    );
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!phone.trim()) {
      newErrors.phone = 'WhatsApp number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid WhatsApp number';
    }
    if (!unit.trim()) {
      newErrors.unit = 'Room / unit number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const selectedPlan = cluster.plans.find(p => p.id === selectedPlanId);
    const planName = selectedPlan ? selectedPlan.name : selectedPlanId;

    // Hit the signup API
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        unit,
        planId: selectedPlanId,
        clusterSlug: slug,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.success) {
          // WhatsApp message formatting
          const text = `Hi ${cluster.caretakerName}, I just signed up for the ${planName} plan on Energy-Outlet for ${unit}. My name is ${name} (WhatsApp: ${phone}).`;
          const encodedText = encodeURIComponent(text);
          const waUrl = `https://wa.me/${cluster.caretakerPhone}?text=${encodedText}`;

          // Open in a new tab/window
          window.open(waUrl, '_blank');

          // Success alert
          alert(`Success! You have signed up for the ${planName} plan at ${cluster.name}. Redirecting you to ${cluster.caretakerName} on WhatsApp for confirmation.`);
        } else {
          // If Zod validation failed on server
          if (data.errors) {
            const apiErrors: { [key: string]: string } = {};
            Object.keys(data.errors).forEach((key) => {
              apiErrors[key] = data.errors[key][0] || 'Invalid value';
            });
            setErrors(apiErrors);
          } else {
            alert(data.error || 'Registration failed. Please check inputs and try again.');
          }
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error('Signup error:', err);
        alert('An error occurred during signup. Please try again.');
      });
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

        <header className="pt-32 pb-12 px-6 max-w-6xl mx-auto text-center w-full">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6 text-primary text-xs font-semibold uppercase tracking-wider mx-auto" style={{ fontFamily: "monospace" }}>
            {cluster.location}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8 max-w-3xl mx-auto" style={{ fontFamily: "Sora, sans-serif" }}>
            {cluster.name} is going solar.
          </h1>

          <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card/60 max-w-2xl mx-auto text-left backdrop-blur-sm">
            <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
              {cluster.caretakerInitials}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-bold">{cluster.caretakerName}, your caretaker</strong>, has set up steady solar power for this compound. Pick your plan below to join.
            </p>
          </div>
        </header>

        <section id="tiers" className="max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="text-center mb-12">
            <span className="text-xs text-primary font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "monospace" }}>Step 1</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "Sora, sans-serif" }}>Pick what you need powered</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">No need to know your wattage — just tell us what you want running.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cluster.plans.map((plan) => (
              <label 
                className="cursor-pointer group" 
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <input 
                  type="radio" 
                  name="plan" 
                  value={plan.id} 
                  checked={selectedPlanId === plan.id} 
                  onChange={() => {}}
                  className="sr-only"
                />
                <div className={`h-full border p-8 rounded-xl bg-card/40 transition-all duration-300 flex flex-col justify-between hover:border-primary/40 backdrop-blur-sm ${
                  selectedPlanId === plan.id ? 'border-primary bg-primary/[0.03] shadow-lg shadow-primary/5' : 'border-border'
                }`}>
                  <div>
                    <div className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "Sora, sans-serif" }}>{plan.name}</div>
                    <div className="text-xs text-primary font-semibold mb-6" style={{ fontFamily: "monospace" }}>{plan.capacity}</div>
                    <ul className="space-y-2 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-lg font-bold text-foreground border-t border-border/40 pt-4" style={{ fontFamily: "Sora, sans-serif" }}>
                    ₦{plan.price.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">/ month</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="text-center mb-12">
            <span className="text-xs text-primary font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "monospace" }}>Step 2</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: "Sora, sans-serif" }}>Sign up</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">We'll confirm your plan over WhatsApp before installation.</p>
          </div>

          <div className="border border-border bg-card/60 p-8 rounded-xl max-w-md mx-auto shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="field-label">Full name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="e.g. Amaka Obi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`field-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="text-[#EF4444] text-xs mt-1 block">{errors.name}</span>}
              </div>
              
              <div>
                <label htmlFor="phone" className="field-label">WhatsApp number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="e.g. 0803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`field-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <span className="text-[#EF4444] text-xs mt-1 block">{errors.phone}</span>}
              </div>

              <div>
                <label htmlFor="unit" className="field-label">Room / unit number</label>
                <input 
                  type="text" 
                  id="unit" 
                  placeholder="e.g. Block C, Room 4"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className={`field-input ${errors.unit ? 'error' : ''}`}
                />
                {errors.unit && <span className="text-[#EF4444] text-xs mt-1 block">{errors.unit}</span>}
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:brightness-110 transition-all duration-200 mt-4 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : `Join ${cluster.name}`}
              </button>
            </form>
            <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed text-center">
              By joining, you agree to the monthly plan rate shown above. No wattage calculations needed — Energy-Outlet handles metering and billing directly.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
