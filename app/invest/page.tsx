'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getClusters, Cluster } from '@/lib/db';

export default function InvestPage() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [contributionAmount, setContributionAmount] = useState('200000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Initial fetch from db helper
    setClusters(getClusters());
  }, []);

  const handleOpenInvest = (cluster: Cluster, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCluster(cluster);
    setInvestorName('');
    setInvestorEmail('');
    setContributionAmount('200000');
    setSuccessMessage('');
    setErrors({});
  };

  const handleClose = () => {
    setSelectedCluster(null);
  };

  const handleInvestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!investorName.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!investorEmail.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(investorEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount < 200000) {
      newErrors.amount = 'Minimum contribution is ₦200,000';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedCluster) {
        // Calculate new progress locally to update UI instantly
        const additionalPercentage = Math.round((amount / selectedCluster.financingRequired) * 100);
        
        // Update clusters state
        setClusters(prevClusters => 
          prevClusters.map(c => {
            if (c.slug === selectedCluster.slug) {
              const updatedProgress = Math.min(100, c.fundingProgress + additionalPercentage);
              return { ...c, fundingProgress: updatedProgress };
            }
            return c;
          })
        );

        setSuccessMessage(`Success! You have registered a mock investment of ₦${amount.toLocaleString()} in ${selectedCluster.name}.`);
      }
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
      
      <div className="relative z-10">
        <Header />

      <header style={{ padding: '96px 0 64px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <span className="eyebrow teal">For investors</span>
          <h1 style={{ fontSize: 'clamp(34px, 5.4vw, 58px)', lineHeight: 1.05, maxWidth: '780px', marginBottom: '24px' }}>
            Fund the compound. Get paid as it powers on.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--paper-dim)', maxWidth: '600px', marginBottom: '40px' }}>
            Every cluster on Energy-Outlet is already surveyed before it's listed — the landlord agreement is signed, resident demand is counted, and the solar capacity is sized. You're not funding an idea, you're funding a metered install with residents already committed to a monthly plan.
          </p>

          <div className="stat-row">
            <div className="stat">
              <div className="num">₦200k</div>
              <div className="label">Minimum contribution</div>
            </div>
            <div className="stat">
              <div className="num">{clusters.length || '3'}</div>
              <div className="label">Clusters live now</div>
            </div>
            <div className="stat">
              <div className="num">100%</div>
              <div className="label">Clusters surveyed pre-listing</div>
            </div>
            <div className="stat">
              <div className="num">Monthly</div>
              <div className="label">Resident plan billing</div>
            </div>
          </div>
        </div>
      </header>

      <section id="how-funding">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow mono teal">How funding works</span>
            <h2>What happens before you ever see a listing</h2>
            <p>We don't list a cluster until the demand side is already real — this is the order of operations.</p>
          </div>
          <div className="steps">
            <div className="step teal">
              <div className="num"></div>
              <div>
                <h3>Landlord agreement signed</h3>
                <p>Space is secured on the property, with terms already agreed and paid.</p>
              </div>
            </div>
            <div className="step teal">
              <div className="num"></div>
              <div>
                <h3>Resident demand counted</h3>
                <p>Residents have already chosen their plan — Basic, Comfort, or Full Power — before the cluster is listed.</p>
              </div>
            </div>
            <div className="step teal">
              <div className="num"></div>
              <div>
                <h3>Capacity sized and priced</h3>
                <p>The solar capacity required and the financing needed are calculated from real, committed demand — not projections.</p>
              </div>
            </div>
            <div className="step teal">
              <div className="num"></div>
              <div>
                <h3>Cluster goes live for funding</h3>
                <p>You see exactly what's required, what's already been raised, and the minimum ticket — ₦200,000.</p>
              </div>
            </div>
            <div className="step teal">
              <div className="num"></div>
              <div>
                <h3>Install, then billing begins</h3>
                <p>Once funded, the system is installed and residents' monthly plan payments begin flowing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clusters">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow mono teal">Live listings</span>
            <h2>Clusters ready for investment</h2>
            <p>Capacity, financing required, and minimum ticket are known before you commit — nothing here is speculative.</p>
          </div>

          <div className="clusters">
            {clusters.map((cluster) => (
              <div className="cluster-card" key={cluster.slug}>
                <div>
                  <div className="loc">{cluster.cityState}</div>
                  <div className="name">{cluster.name}</div>
                </div>
                <div className="meter-row">
                  <span>Capacity required</span>
                  <span className="val">{cluster.capacityRequired}</span>
                </div>
                <div className="meter-row">
                  <span>Financing required</span>
                  <span className="val">₦{cluster.financingRequired.toLocaleString()}</span>
                </div>
                <div className="progress">
                  <div style={{ width: `${cluster.fundingProgress}%` }}></div>
                </div>
                <div className="meter-row">
                  <span>Funded</span>
                  <span className="val">{cluster.fundingProgress}%</span>
                </div>
                <div className="min-ticket">
                  Minimum contribution <b>₦200,000</b>
                </div>
                <button 
                  className="btn btn-teal cta" 
                  onClick={(e) => handleOpenInvest(cluster, e)}
                >
                  Invest in this cluster
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: 'none' }}>
        <div className="wrap">
          <div className="notice">
            This is an early product preview. Returns and repayment terms should be reviewed with proper legal and financial guidance before any funds move.
          </div>
        </div>
      </section>

      {/* Investment sheet modal */}
      {selectedCluster && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(18,20,28,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="form-card" style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
            <button 
              onClick={handleClose} 
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--paper-dim)',
                fontSize: '24px',
                cursor: 'pointer',
                lineHeight: 1
              }}
            >
              &times;
            </button>

            <span className="eyebrow teal" style={{ marginBottom: '8px' }}>
              {selectedCluster.location}
            </span>
            <h3 style={{ marginBottom: '24px', fontSize: '24px' }}>
              Invest in {selectedCluster.name}
            </h3>

            {successMessage ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(63, 182, 171, 0.1)',
                  border: '2px solid var(--teal)',
                  color: 'var(--teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
                <p style={{ color: 'var(--paper)', fontSize: '15px', marginBottom: '24px' }}>
                  {successMessage}
                </p>
                <button className="btn btn-teal" style={{ width: '100%' }} onClick={handleClose}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleInvestSubmit}>
                <div className="form-field">
                  <label htmlFor="inv-name">Full Name</label>
                  <input 
                    type="text" 
                    id="inv-name" 
                    placeholder="e.g. Tunde Alabi" 
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    style={errors.name ? { borderColor: 'var(--grid-red)' } : {}}
                  />
                  {errors.name && <span style={{ color: 'var(--grid-red)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="inv-email">Email Address</label>
                  <input 
                    type="email" 
                    id="inv-email" 
                    placeholder="e.g. tunde@email.com" 
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                    style={errors.email ? { borderColor: 'var(--grid-red)' } : {}}
                  />
                  {errors.email && <span style={{ color: 'var(--grid-red)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="inv-amount">Contribution Amount (₦)</label>
                  <input 
                    type="number" 
                    id="inv-amount" 
                    min="200000"
                    placeholder="200000" 
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    style={errors.amount ? { borderColor: 'var(--grid-red)' } : {}}
                  />
                  {errors.amount && <span style={{ color: 'var(--grid-red)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.amount}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-teal" 
                  style={{ width: '100%', marginTop: '12px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : `Confirm ₦${Number(contributionAmount || 0).toLocaleString()} Contribution`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
