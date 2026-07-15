'use client';

import { useState, useEffect, useRef } from "react";
import { ArrowRight, MapPin, Zap, Building2, Users, TrendingUp, Shield, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(ease * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// Shared Navbar integrated

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-medium tracking-widest uppercase"
              style={{ fontFamily: "monospace" }}>
              Demand-First Power Infrastructure
            </span>
          </div>
          <h1
            className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6"
            style={{ fontFamily: "Sora, sans-serif", letterSpacing: "-0.02em" }}
          >
            Energy Outlet
            <span className="block text-primary">converts demand</span>
            <span className="block text-muted-foreground text-4xl lg:text-5xl font-normal mt-1">into power.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
            Turn concentrated energy demand into a reliable, on-site power solution. We aggregate demand, deploy infrastructure, and operate local energy hubs — right where your users are.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded font-semibold hover:brightness-110 transition-all duration-200 group">
              Partner With Us
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link href="/invest" className="flex items-center gap-2 px-6 py-3.5 border border-accent/40 text-accent rounded font-semibold hover:bg-accent/10 transition-all duration-200">
              Deploy a Site
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { val: 40, suffix: "+", label: "Sites Active" },
              { val: 98, suffix: "%", label: "Uptime SLA" },
              { val: 3, suffix: "x", label: "Owner Revenue Lift" },
            ].map(({ val, suffix, label }) => (
              <div key={label}>
                <div className="text-2xl lg:text-3xl font-bold text-primary" style={{ fontFamily: "Sora, sans-serif" }}>
                  <Counter to={val} suffix={suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "monospace" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: MapPin,
      title: "Identify High-Demand Location",
      body: "We map zones with concentrated energy demand — school hostels, residential plazas, commercial clusters — and validate the site economics.",
    },
    {
      num: "02",
      icon: Users,
      title: "Aggregate User Demand",
      body: "We onboard energy users within the location, pooling consumption profiles to create a reliable demand base that justifies on-site deployment.",
    },
    {
      num: "03",
      icon: Zap,
      title: "Deploy & Operate On-Site",
      body: "We install, own, and operate the energy infrastructure directly on the property — delivering power to users with full metering and management.",
    },
  ];

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs text-primary tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "monospace" }}>Process</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "Sora, sans-serif" }}>
            How It Works
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map(({ num, icon: Icon, title, body }, i) => (
            <div key={i}
              className="relative group rounded-xl border border-border bg-card p-8 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="absolute top-6 right-6 text-6xl font-bold text-primary/5"
                style={{ fontFamily: "Sora, sans-serif" }}>{num}</div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors mx-auto">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 text-center"
                style={{ fontFamily: "Sora, sans-serif" }}>{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm text-center">{body}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ForOwners removed

// ForUsers removed

// ─── Value Proposition ───────────────────────────────────────────────────────
function ValueProp() {
  const props = [
    {
      tag: "DEMAND_FIRST",
      title: "Deploy where demand exists — not where grid capacity allows.",
      desc: "Traditional energy follows supply. Energy Outlet follows demand. We identify proven consumption clusters and bring power to them.",
    },
    {
      tag: "SITE_HUBS",
      title: "Each location becomes a self-contained energy node.",
      desc: "Instead of long distribution chains, we build micro-utilities embedded in the physical fabric of high-demand zones.",
    },
    {
      tag: "SCALABLE_MODEL",
      title: "A replicable playbook for every qualifying site.",
      desc: "Our model scales through standardized deployment — the same process works in a student hostel or a 10-building plaza.",
    },
  ];

  return (
    <section className="py-28 bg-secondary/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <span className="text-xs text-primary tracking-widest uppercase mb-3 block"
            style={{ fontFamily: "monospace" }}>Core Value Proposition</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "Sora, sans-serif" }}>
            The micro-utility model.<br />Built for density.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {props.map(({ tag, title, desc }, i) => (
            <div key={i}
              className="group flex flex-col items-center text-center p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300">
              <div className="mb-4">
                <span className="text-xs text-primary px-2 py-1 rounded border border-primary/20 bg-primary/5"
                  style={{ fontFamily: "monospace" }}>
                  {tag}
                </span>
              </div>
              <h3 className="font-bold text-foreground leading-snug mb-3 text-center"
                style={{ fontFamily: "Sora, sans-serif" }}>{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-center">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs tracking-widest uppercase"
            style={{ fontFamily: "monospace" }}>Open for Site Partners</span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6"
          style={{ fontFamily: "Sora, sans-serif", lineHeight: "1.05" }}>
          Turn Your Location Into<br />
          <span className="text-primary">an Energy Hub.</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          If you own or operate a high-density property, we want to hear from you. No capital required — just the space and the demand.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded font-bold text-lg hover:brightness-110 transition-all group"
            style={{ fontFamily: "Sora, sans-serif" }}>
            Partner With Us
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <Link href="/invest" className="flex items-center gap-2 px-8 py-4 border border-accent/40 text-accent rounded font-bold text-lg hover:bg-accent/10 transition-all"
            style={{ fontFamily: "Sora, sans-serif" }}>
            Deploy a Site
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Zap size={12} className="text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-bold text-foreground text-sm" style={{ fontFamily: "Sora, sans-serif" }}>
            ENERGY OUTLET
          </span>
        </div>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: "monospace" }}>
          © 2025 Energy Outlet. Demand-first energy infrastructure.
        </p>
        <div className="flex gap-6">
          <Link href="/invest" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "monospace" }}>
            Invest
          </Link>
          <Link href="/lease-to-own" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "monospace" }}>
            Lease to Own
          </Link>
          <Link href="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "monospace" }}>
            About Us
          </Link>
          <Link href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "monospace" }}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page Content ────────────────────────────────────────────────────
export default function LandingPageContent() {
  return (
    <div className="bg-background text-foreground min-h-screen relative font-body">
      {/* subtle ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0, 229, 160, 0.08) 0%, rgba(0, 191, 255, 0.03) 50%, transparent 80%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[30%] left-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(0, 191, 255, 0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <ValueProp />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
