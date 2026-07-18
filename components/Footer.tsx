'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Zap size={12} className="text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-bold text-foreground text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
            ENERGY OUTLET
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center md:text-left" style={{ fontFamily: 'monospace' }}>
          © 2025 Energy Outlet by Gridlett. Demand-first energy infrastructure.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
          <Link href="/invest" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: 'monospace' }}>
            Invest
          </Link>
          <Link href="/lease-to-own" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: 'monospace' }}>
            Lease to Own
          </Link>
          <Link href="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: 'monospace' }}>
            About Us
          </Link>
          <Link href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: 'monospace' }}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
