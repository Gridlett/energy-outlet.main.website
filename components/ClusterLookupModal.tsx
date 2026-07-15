'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface ClusterLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClusterLookupModal({ isOpen, onClose }: ClusterLookupModalProps) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = code.trim();
    if (!trimmed) {
      setError('Please enter a compound or cluster code');
      return;
    }

    // Format the slug: lowercase, replace spaces/slashes with dashes
    const slug = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/[\s_]+/g, '-')     // replace spaces with dash
      .replace(/-+/g, '-');        // deduplicate dashes

    router.push(`/cluster/${slug}`);
    onClose();
    setCode('');
  };

  const handleSampleClick = (sampleCode: string) => {
    router.push(`/cluster/${sampleCode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#070C14]/80 backdrop-blur-md z-50 flex items-center justify-center p-6 transition-all duration-300">
      <div className="border border-border bg-[#0C1422] p-8 rounded-xl w-full max-w-md relative shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-transparent border-none text-muted-foreground hover:text-foreground text-2xl cursor-pointer"
        >
          &times;
        </button>

        <span className="text-xs text-primary font-semibold block mb-2" style={{ fontFamily: "monospace" }}>
          Private Solar Microgrid
        </span>
        <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
          Find Your Cluster
        </h3>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          Energy-Outlet compounds are private solar grids. Enter the unique cluster code provided by your caretaker or landlord to pick your plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cluster-code" className="field-label">Compound / Cluster Code</label>
            <input 
              type="text" 
              id="cluster-code" 
              placeholder="e.g. lugbe-estate-wing-c" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`field-input ${error ? 'error' : ''}`}
              autoFocus
            />
            {error && <span className="text-[#EF4444] text-xs mt-1.5 block">{error}</span>}
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2"
          >
            Access Compound Grid
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="border-t border-border/40 mt-6 pt-5">
          <span className="text-xs text-muted-foreground block mb-2" style={{ fontFamily: "monospace" }}>
            Sample compound codes to try:
          </span>
          <div className="flex flex-wrap gap-2">
            {['lugbe-estate-wing-c', 'bodija-student-hostel', 'ojota-residential-block'].map((sample) => (
              <button
                key={sample}
                onClick={() => handleSampleClick(sample)}
                className="text-[11px] px-2.5 py-1.5 rounded border border-border bg-secondary/50 text-slate-300 hover:border-primary/40 hover:text-primary transition-all font-mono"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
