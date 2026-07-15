'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';
import ClusterLookupModal from '@/components/ClusterLookupModal';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          !isHome || scrolled
            ? "bg-[#070C14]/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Zap size={14} className="text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-bold text-slate-200 tracking-wide" style={{ fontFamily: "Sora, sans-serif" }}>
              ENERGY OUTLET
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                  How It Works
                </a>
              </>
            ) : (
              <>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                  Home
                </Link>
              </>
            )}
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              About Us
            </Link>
            <Link href="/invest" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              Invest
            </Link>
            <Link href="/lease-to-own" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              Lease to Own
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              FAQ
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLookupOpen(true)}
              className="text-xs px-3 py-1.5 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 font-medium hidden sm:inline-block"
            >
              Find your cluster
            </button>
          </div>
        </div>
      </nav>

      <ClusterLookupModal isOpen={isLookupOpen} onClose={() => setIsLookupOpen(false)} />
    </>
  );
}
