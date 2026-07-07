'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getClusterBySlug, Cluster } from '@/lib/db';

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
      const found = getClusterBySlug(slug);
      if (found) {
        setCluster(found);
      }
    }
  }, [slug]);

  if (!cluster) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
        <div className="relative z-10">
          <Header />
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="wrap">
            <span className="eyebrow" style={{ color: 'var(--grid-red)' }}>404 Not Found</span>
            <h2 style={{ marginBottom: '16px' }}>Cluster Not Found</h2>
            <p style={{ color: 'var(--paper-dim)', marginBottom: '32px' }}>
              We couldn't find a surveyed cluster matching the URL path: <code className="mono">/c/{slug}</code>
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </section>
        </div>
        <div className="relative z-10">
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
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
      <div className="relative z-10">
        <Header />

      <header style={{ padding: '64px 0 40px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <span className="eyebrow">{cluster.location}</span>
          <h1 style={{ fontSize: 'clamp(28px, 4.4vw, 44px)', lineHeight: 1.05, maxWidth: '700px', marginBottom: '8px' }}>
            {cluster.name} is going solar.
          </h1>

          <div className="invite-banner">
            <div className="avatar">{cluster.caretakerInitials}</div>
            <p>
              <strong>{cluster.caretakerName}, your caretaker,</strong> has set up steady solar power for this compound. Pick your plan below to join.
            </p>
          </div>
        </div>
      </header>

      <section id="tiers">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow mono">Step 1</span>
            <h2>Pick what you need powered</h2>
            <p>No need to know your wattage — just tell us what you want running.</p>
          </div>

          <div className="tiers">
            {cluster.plans.map((plan) => (
              <label 
                className="plan-select" 
                style={{ position: 'relative', cursor: 'pointer' }}
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <input 
                  type="radio" 
                  name="plan" 
                  value={plan.id} 
                  checked={selectedPlanId === plan.id} 
                  onChange={() => {}}
                  style={{ position: 'absolute', opacity: 0 }}
                />
                <div className={`tier-card ${selectedPlanId === plan.id ? 'selected' : ''}`}>
                  <div className="tier-name">{plan.name}</div>
                  <div className="tier-meter">{plan.capacity}</div>
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mono" style={{ color: 'var(--paper-dim)', fontSize: '13px', marginTop: 'auto', paddingTop: '16px' }}>
                    ₦{plan.price.toLocaleString()} / month
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow mono">Step 2</span>
            <h2>Sign up</h2>
            <p>We'll confirm your plan over WhatsApp before installation.</p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSignupSubmit}>
              <div className="form-field">
                <label htmlFor="name">Full name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="e.g. Amaka Obi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={errors.name ? { borderColor: 'var(--grid-red)' } : {}}
                />
                {errors.name && <span style={{ color: 'var(--grid-red)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>
              
              <div className="form-field">
                <label htmlFor="phone">WhatsApp number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="e.g. 0803 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={errors.phone ? { borderColor: 'var(--grid-red)' } : {}}
                />
                {errors.phone && <span style={{ color: 'var(--grid-red)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="unit">Room / unit number</label>
                <input 
                  type="text" 
                  id="unit" 
                  placeholder="e.g. Block C, Room 4"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  style={errors.unit ? { borderColor: 'var(--grid-red)' } : {}}
                />
                {errors.unit && <span style={{ color: 'var(--grid-red)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.unit}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : `Join ${cluster.name}`}
              </button>
            </form>
            <p className="disclosure">
              By joining, you agree to the monthly plan rate shown above. No wattage calculations needed — Energy-Outlet handles metering and billing directly.
            </p>
          </div>
        </div>
      </section>

      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
