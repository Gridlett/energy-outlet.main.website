'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isInvest = pathname === '/invest';
  const isCluster = pathname?.startsWith('/c/');

  return (
    <footer className="py-14 border-t border-[#1e2d45] mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-slate-400">Energy-Outlet — a Gridlett product</div>
        
        <div className="flex gap-6 text-[13px] text-slate-400 font-medium">
          {!isCluster && !isInvest && (
            <>
              <a href="#how" className="hover:text-white transition-colors">How it works</a>
              <Link href="/invest" className="hover:text-white transition-colors">Invest</Link>
              <Link href="/c/lugbe-estate-wing-c" className="hover:text-white transition-colors">Sample cluster</Link>
            </>
          )}

          {isInvest && (
            <>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <a href="#how-funding" className="hover:text-white transition-colors">How funding works</a>
              <a href="#clusters" className="hover:text-white transition-colors">Clusters</a>
            </>
          )}

          {isCluster && (
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          )}
        </div>
      </div>
    </footer>
  );
}
