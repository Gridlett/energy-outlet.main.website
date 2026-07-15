'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ClusterLookupModal from './ClusterLookupModal';

export default function GetStartedButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-base rounded-xl shadow-lg shadow-primary/5 hover:brightness-110 transition-all"
      >
        Get started
        <ArrowRight className="w-4 h-4" />
      </button>
      <ClusterLookupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
