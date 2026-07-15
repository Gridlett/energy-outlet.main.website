'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ClusterLookupModal from '@/components/ClusterLookupModal';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  return (
    <>
      <footer className="py-14 border-t border-[#1e2d45] mt-auto w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-400">Energy Outlet</div>
          
          <div className="flex gap-6 text-[13px] text-slate-400 font-medium">
            {isHome ? (
              <>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link href="/invest" className="hover:text-white transition-colors">Invest</Link>
                <Link href="/lease-to-own" className="hover:text-white transition-colors">Lease to Own</Link>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                <button 
                  onClick={() => setIsLookupOpen(true)} 
                  className="hover:text-white transition-colors text-left bg-transparent border-none p-0 font-medium"
                >
                  Sample cluster
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link href="/invest" className="hover:text-white transition-colors">Invest</Link>
                <Link href="/lease-to-own" className="hover:text-white transition-colors">Lease to Own</Link>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </>
            )}
          </div>
        </div>
      </footer>

      <ClusterLookupModal isOpen={isLookupOpen} onClose={() => setIsLookupOpen(false)} />
    </>
  );
}
