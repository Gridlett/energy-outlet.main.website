'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isInvest = pathname === '/invest';
  const isCluster = pathname?.startsWith('/c/');

  return (
    <nav className="sticky top-0 z-50 bg-[#080d1a]/80 backdrop-blur-md border-b border-[#1e2d45]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-[17px] font-bold flex items-center gap-2 text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)] animate-pulse"></span>
          Energy-Outlet
        </Link>
        
        {!isCluster && !isInvest && (
          <>
            <div className="hidden md:flex gap-7 text-sm text-slate-400 font-medium">
              <a href="#how" className="hover:text-white transition-colors">How it works</a>
              <Link href="/invest" className="hover:text-white transition-colors">Invest</Link>
            </div>
            <Link href="/c/lugbe-estate-wing-c" className="text-[13px] font-semibold px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 text-white transition-all hover:-translate-y-[1px]">
              Find your cluster
            </Link>
          </>
        )}

        {isInvest && (
          <>
            <div className="hidden md:flex gap-7 text-sm text-slate-400 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <a href="#clusters" className="hover:text-white transition-colors">Clusters</a>
              <a href="#how-funding" className="hover:text-white transition-colors">How funding works</a>
            </div>
            <a href="#clusters" className="text-[13px] font-semibold px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white transition-all hover:-translate-y-[1px]">
              View clusters
            </a>
          </>
        )}

        {isCluster && (
          <div className="hidden md:flex gap-7 text-sm text-slate-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
