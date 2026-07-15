import { Zap, Shield, Heart, Eye, Target, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'
import GetStartedButton from '@/components/GetStartedButton'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Energy-Outlet\'s mission to build structured, compound-level solar microgrids that deliver clean, reliable solar energy to hostels and apartments across Nigeria.',
  alternates: {
    canonical: '/about',
  },
}

const VALUES = [
  {
    icon: Target,
    title: 'Equity & Fairness',
    body: 'We believe clean energy is a shared resource. Our system ensures no single subscriber can overload the grid, keeping electricity fair and accessible for all tenants.',
  },
  {
    icon: Shield,
    title: 'Reliability First',
    body: 'Our advanced control layer and energy management software keep uptime high, removing reliance on unpredictable grid power and noisy, polluting generators.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    body: 'No surprise bills, no split disputes. Subscribers pay a clear, fixed monthly fee according to their usage tier, with real-time tracking from our portal.',
  },
  {
    icon: Sparkles,
    title: 'Sustainable Growth',
    body: 'By optimizing shared solar assets, we help deliver clean, sustainable solar energy directly to your apartment, reducing carbon footprints while lowering daily energy costs.',
  },
]

export default function AboutPage() {
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
      <div className="relative z-10 flex-grow pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
        <PageWrapper>
          {/* Section: Hero */}
          <section className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "monospace" }}>
                Our Mission · Powered by Innovation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight max-w-4xl mx-auto mb-6" style={{ fontFamily: "Sora, sans-serif" }}>
              Powering communities, <span className="text-primary">fairly</span> and <span className="text-primary">sustainably</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Energy-Outlet is dedicated to building structured, localized solar microgrids that deliver clean, reliable solar energy to hostels and residential apartments across Nigeria.
            </p>
          </section>

          {/* Section: Genesis / The Story */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-28 border-t border-border/40 pt-16">
            <div className="space-y-6">
              <p className="text-xs font-bold tracking-widest text-primary uppercase" style={{ fontFamily: "monospace" }}>The Genesis</p>
              <h2 className="text-3xl font-bold text-foreground leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
                Solving the challenges of shared electricity
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  In many parts of Nigeria, grid instability forces apartments and shared complexes to rely heavily on costly diesel and petrol generators. These generators are noisy, pollute the air, and require constant, manual refueling.
                </p>
                <p>
                  When complexes transition to shared solar systems, a common headache arises: without structure, one unit turning on multiple high-load devices can drain the shared battery bank, overloading the inverter and leaving the entire building in darkness.
                </p>
                <p>
                  This leads to constant friction, disputes over diesel and solar bill-splitting, and unstable power grids. <strong className="text-foreground font-bold">Energy-Outlet was built to change that.</strong>
                </p>
              </div>
            </div>

            <div className="border border-border bg-card/60 backdrop-blur rounded-xl p-8 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-xl pointer-events-none" />
              <h3 className="font-bold text-foreground text-xl mb-4 flex items-center gap-2" style={{ fontFamily: "Sora, sans-serif" }}>
                <Zap className="w-5 h-5 text-primary" fill="currentColor" />
                The Energy-Outlet Model
              </h3>
              <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                We size solar capacity to match committed resident demand. Instead of unmonitored power sharing, Energy-Outlet provisions clean solar energy under strict structure:
              </p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                  <span className="text-muted-foreground"><strong className="text-foreground font-semibold">Smart Load Management</strong>: The controller prevents individual apartments from overloading the shared inverter.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                  <span className="text-muted-foreground"><strong className="text-foreground font-semibold">Fixed Subscriptions</strong>: Residents select a plain-language plan tier that fits their budget. No surprise bills.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                  <span className="text-muted-foreground"><strong className="text-foreground font-semibold">Smart Telemetry</strong>: Real-time metering keeps the microgrid balanced and stable 24/7.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Core Values */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3" style={{ fontFamily: "monospace" }}>Our Foundation</p>
              <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Sora, sans-serif" }}>
                Guided by core principles
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
                How we approach technology, engineering, and our relationship with our subscribers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="border border-border bg-card/60 backdrop-blur rounded-xl p-8 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "Sora, sans-serif" }}>{val.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{val.body}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Section: Call to Action */}
          <section className="border border-border bg-card/60 p-8 md:p-12 rounded-xl text-center relative overflow-hidden backdrop-blur-sm max-w-4xl mx-auto shadow-2xl">
            {/* Ambient light flares */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full filter blur-2xl pointer-events-none" />

            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Ready to experience reliable solar power?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Select a monthly subscription plan that fits your household appliance needs and get started with clean, constant energy today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GetStartedButton />
              <a
                href="mailto:care@energy-outlet.space"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-muted-foreground hover:text-foreground border border-border bg-transparent hover:bg-secondary/40 transition-all"
              >
                Contact Support
              </a>
            </div>
          </section>
        </PageWrapper>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
