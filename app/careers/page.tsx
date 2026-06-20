import { Zap, Briefcase, Sparkles, ArrowUpRight, GraduationCap } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Gridlett team. Explore hardware and software engineering positions in Nigeria to build smart solar grids.',
  alternates: {
    canonical: '/careers',
  },
}

export default function CareersPage() {
  return (
    <main className="relative min-h-screen bg-brand-black text-brand-text overflow-hidden flex flex-col justify-between">
      {/* Background grid texture */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] orb-blue pointer-events-none -translate-y-1/2 opacity-40" />
      <div className="fixed bottom-1/4 right-0 w-[450px] h-[450px] orb-emerald pointer-events-none translate-x-1/3 opacity-30" />

      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
        <PageWrapper>
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-3"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }}>
              <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Careers at Gridlett
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Shape the Future of <span className="text-gradient-blue">Energy Access</span>
            </h1>
            <p className="mt-4 text-brand-text max-w-xl mx-auto text-sm leading-relaxed">
              Join a fast-growing team of developers and energy engineers building the next generation of smart solar grids in Nigeria.
            </p>
          </div>

          {/* Culture / Introduction Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="glass-card rounded-2xl p-6 border border-brand-border/40 text-center">
              <GraduationCap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-display font-semibold text-white mb-2 text-base">Continuous Learning</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                We tackle hard physical and software engineering problems, expanding your expertise in IoT telemetry and energy management.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-brand-border/40 text-center">
              <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-display font-semibold text-white mb-2 text-base">Direct Social Impact</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Your lines of code directly power households, plazas, and estates, replacing noisy diesel generators with clean shared solar.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-brand-border/40 text-center">
              <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-display font-semibold text-white mb-2 text-base">Innovative Tech</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                From firmware on smart switches to real-time WebGL dashboards and advanced 3D structures, you will work with modern stacks.
              </p>
            </div>
          </div>

          {/* Open Positions Title */}
          <div className="mb-8 border-b border-brand-border/40 pb-4">
            <h2 className="font-display text-2xl font-bold text-white">Active Openings</h2>
            <p className="text-sm text-brand-muted mt-1">Explore our current hiring roles in Nigeria</p>
          </div>

          {/* Job Listings List */}
          <div className="space-y-6">
            {/* Job Card: PCB Design Engineer (Contract) */}
            <div 
              className="glass-card rounded-3xl p-6 md:p-8 border border-brand-border/60 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(21, 30, 46, 0.7), rgba(8, 13, 26, 0.8))' }}
            >
              {/* Tag Badge */}
              <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Contract · Remote / Hybrid
              </div>

              <div className="max-w-2xl space-y-4">
                <h3 className="font-display font-bold text-xl text-white md:text-2xl pt-2 md:pt-0">
                  PCB Design Engineer (Contract)
                </h3>
                
                <div className="flex flex-wrap gap-4 text-xs text-brand-muted font-medium">
                  <span><strong className="text-white font-bold">Experience</strong>: 1+ Year Minimum</span>
                  <span>•</span>
                  <span><strong className="text-white font-bold">Department</strong>: Smart Hardware Engineering</span>
                  <span>•</span>
                  <span><strong className="text-white font-bold">Location</strong>: Nigeria</span>
                </div>

                <div className="text-sm leading-relaxed text-brand-text space-y-3 pt-2">
                  <p>
                    At Gridlett, we design custom IoT smart switches and energy meters to balance grid loads in real time. We are recruiting a contract <strong className="text-white font-bold">PCB (Printed Circuit Board) Design Engineer</strong> to layout, route, and optimize our next-generation controller boards.
                  </p>
                  <p>
                    You will work alongside our firmware team to translate schematics into robust board designs, optimize Bill of Materials (BOM), and generate 3D board models (STEP/IGES) to ensure perfect integration with physical enclosures.
                  </p>
                </div>

                {/* Requirements block */}
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">Key Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-text">
                    <li><strong className="text-white font-bold">Minimum 1 year of experience</strong> in schematic capture, multi-layer routing, and Printed Circuit Board (PCB) design.</li>
                    <li>Proficient in industry-standard ECAD software (e.g., Altium Designer, KiCad, or EasyEDA).</li>
                    <li>Experience generating manufacturing files (Gerbers, NC Drill, Pick-and-Place) and optimizing BOMs.</li>
                    <li>Ability to model and export board designs in 3D format for mechanical enclosure fitting.</li>
                    <li>Strong understanding of electrical engineering principles, signal integrity, and power distribution.</li>
                  </ul>
                </div>

                {/* How to Apply */}
                <div className="pt-4 border-t border-brand-border/30 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-brand-muted">
                    To apply, send your CV and portfolio showcasing schematic/board layouts to:
                    <a href="mailto:careers@gridlett.com" className="block text-sm font-semibold text-blue-400 mt-1 hover:underline">
                      careers@gridlett.com
                    </a>
                  </div>
                  
                  <a 
                    href="mailto:careers@gridlett.com?subject=Application:%20PCB%20Design%20Engineer%20(Contract)"
                    className="btn-primary flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl text-white font-bold text-sm font-display w-full sm:w-auto"
                    style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }}
                  >
                    Apply Now
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
