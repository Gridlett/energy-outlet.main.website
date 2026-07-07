import React from 'react';

export default function Waveform() {
  return (
    <div className="wave-box" style={{ marginBottom: '56px' }}>
      <svg viewBox="0 0 800 110" preserveAspectRatio="none">
        <path 
          className="grid-trace" 
          d="M0,55 L40,55 L55,20 L70,90 L85,10 L100,95 L115,55 L160,55 L175,30 L190,80 L205,55 L400,55" 
        />
        <path 
          className="solar-trace" 
          d="M400,55 C440,30 460,80 500,55 C540,30 560,80 600,55 C640,30 660,80 700,55 L800,55" 
        />
      </svg>
      <div className="wave-label">
        <span className="tag-red">◂ UNSTABLE GRID · 0–230V, unscheduled</span>
        <span className="tag-teal">CLUSTER SOLAR · steady, metered ▸</span>
      </div>
    </div>
  );
}
