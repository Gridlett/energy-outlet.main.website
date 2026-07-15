'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface InvestableItem {
  slug: string;
  name: string;
  location: string;
  cityState: string;
  capacityRequired: string;
  financingRequired: number;
  fundingProgress: number;
  isLeaseToOwn?: boolean;
  monthlyLease?: number;
  termMonths?: number;
}

const LEASE_TO_OWN_ITEMS: InvestableItem[] = [
  {
    slug: 'lekki-family-duplex',
    name: 'Lekki Family Duplex',
    location: 'Lekki, Lagos',
    cityState: 'Lekki · Lagos',
    capacityRequired: '3.5 kW',
    financingRequired: 2800000,
    fundingProgress: 75,
    isLeaseToOwn: true,
    monthlyLease: 85000,
    termMonths: 36,
  },
  {
    slug: 'surulere-salon-shop',
    name: 'Surulere Salon & Shop',
    location: 'Surulere, Lagos',
    cityState: 'Surulere · Lagos',
    capacityRequired: '2.0 kW',
    financingRequired: 1600000,
    fundingProgress: 40,
    isLeaseToOwn: true,
    monthlyLease: 55000,
    termMonths: 24,
  },
  {
    slug: 'gwarinpa-office-space',
    name: 'Gwarinpa Office Space',
    location: 'Gwarinpa, Abuja',
    cityState: 'Gwarinpa · Abuja',
    capacityRequired: '5.0 kW',
    financingRequired: 4200000,
    fundingProgress: 90,
    isLeaseToOwn: true,
    monthlyLease: 120000,
    termMonths: 36,
  }
];

export default function LeaseToOwnPage() {
  const [leaseItems, setLeaseItems] = useState<InvestableItem[]>(LEASE_TO_OWN_ITEMS);
  const [selectedItem, setSelectedItem] = useState<InvestableItem | null>(null);
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [contributionAmount, setContributionAmount] = useState('200000');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpenInvest = (item: InvestableItem, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedItem(item);
    setInvestorName('');
    setInvestorEmail('');
    setContributionAmount('200000');
    setSuccessMessage('');
    setErrors({});
  };

  const handleClose = () => {
    setSelectedItem(null);
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
      if (selectedItem) {
        const additionalPercentage = Math.round((amount / selectedItem.financingRequired) * 100);
        
        setLeaseItems(prev =>
          prev.map(c => {
            if (c.slug === selectedItem.slug) {
              const updatedProgress = Math.min(100, c.fundingProgress + additionalPercentage);
              return { ...c, fundingProgress: updatedProgress };
            }
            return c;
          })
        );

        setSuccessMessage(`Success! You have registered a mock investment of ₦${amount.toLocaleString()} in ${selectedItem.name}.`);
      }
    }, 1200);
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
            <span className="text-primary text-xs font-medium tracking-widest uppercase"
              style={{ fontFamily: "monospace" }}>
              Lease-to-Own Financing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "Sora, sans-serif" }}>
            Fund Lease-to-Own. <span className="text-primary">Steady repayments.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Fund individual solar systems installed at certified residential duplexes and commercial shops. Residents repay over fixed lease terms until they own the hardware.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { val: "₦200k", label: "Minimum ticket" },
              { val: `${leaseItems.length}`, label: "Lease items live" },
              { val: "100%", label: "Verified properties" },
              { val: "Fixed Term", label: "Lease contracts" },
            ].map(({ val, label }) => (
              <div key={label} className="border border-border bg-card/40 p-6 rounded-xl text-center backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                  {val}
                </div>
                <div className="text-xs text-muted-foreground" style={{ fontFamily: "monospace" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pb-24 w-full flex-grow">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "Sora, sans-serif" }}>
                Lease-to-Own Solar Systems
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
                Individual properties where residents or businesses lease solar systems with pre-set terms of 24 to 36 months before gaining full ownership.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {leaseItems.map((item) => (
                <div key={item.slug} className="border border-border bg-card/60 backdrop-blur rounded-xl p-8 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="text-xs text-primary font-semibold mb-2" style={{ fontFamily: "monospace" }}>
                      {item.cityState}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
                      {item.name}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between border-b border-border/40 pb-2 text-sm">
                        <span className="text-muted-foreground">System Size</span>
                        <span className="font-semibold text-foreground">{item.capacityRequired}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/40 pb-2 text-sm">
                        <span className="text-muted-foreground">Total Cost</span>
                        <span className="font-semibold text-foreground">₦{item.financingRequired.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/40 pb-2 text-sm">
                        <span className="text-muted-foreground">Monthly Lease</span>
                        <span className="font-semibold text-foreground">₦{item.monthlyLease?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/40 pb-2 text-sm">
                        <span className="text-muted-foreground">Lease Term</span>
                        <span className="font-semibold text-foreground">{item.termMonths} Months</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span>Funding Progress</span>
                        <span className="text-primary font-bold">{item.fundingProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${item.fundingProgress}%` }}></div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mb-6 text-center" style={{ fontFamily: "monospace" }}>
                      Min ticket: <span className="text-foreground font-semibold">₦200,000</span>
                    </div>

                    <button
                      onClick={(e) => handleOpenInvest(item, e)}
                      className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded hover:brightness-110 transition-all duration-200"
                    >
                      Fund Lease Option
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16 w-full">
          <div className="border border-border/40 bg-secondary/20 p-6 rounded-xl text-center text-xs text-muted-foreground max-w-3xl mx-auto backdrop-blur-sm leading-relaxed">
            This is an early product preview. Returns and repayment terms should be reviewed with proper legal and financial guidance before any funds move.
          </div>
        </section>

        <Footer />
      </div>

      {/* Investment sheet modal */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(7, 12, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="border border-border bg-[#0C1422] p-8 rounded-xl w-full max-w-md relative shadow-2xl animate-slide-up">
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 bg-transparent border-none text-muted-foreground hover:text-foreground text-2xl cursor-pointer"
            >
              &times;
            </button>

            <span className="text-xs text-primary font-semibold block mb-2" style={{ fontFamily: "monospace" }}>
              {selectedItem.cityState}
            </span>
            <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
              Fund Lease: {selectedItem.name}
            </h3>

            {successMessage ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4 animate-pulse">
                  ✓
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {successMessage}
                </p>
                <button 
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded hover:brightness-110 transition-all" 
                  onClick={handleClose}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleInvestSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inv-name" className="field-label">Full Name</label>
                  <input 
                    type="text" 
                    id="inv-name" 
                    placeholder="e.g. Tunde Alabi" 
                    value={investorName}
                    onChange={(e) => setInvestorName(e.target.value)}
                    className={`field-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="text-[#EF4444] text-xs mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="inv-email" className="field-label">Email Address</label>
                  <input 
                    type="email" 
                    id="inv-email" 
                    placeholder="e.g. tunde@email.com" 
                    value={investorEmail}
                    onChange={(e) => setInvestorEmail(e.target.value)}
                    className={`field-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="text-[#EF4444] text-xs mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label htmlFor="inv-amount" className="field-label">Contribution Amount (₦)</label>
                  <input 
                    type="number" 
                    id="inv-amount" 
                    min="200000"
                    placeholder="200000" 
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className={`field-input ${errors.amount ? 'error' : ''}`}
                  />
                  {errors.amount && <span className="text-[#EF4444] text-xs mt-1 block">{errors.amount}</span>}
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded hover:brightness-110 transition-all disabled:opacity-60 mt-4" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : `Confirm ₦${Number(contributionAmount || 0).toLocaleString()} Contribution`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
