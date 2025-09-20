import React from 'react';

const Waveform = () => (
  <div className="flex items-end justify-center gap-1 h-6 w-full" aria-hidden="true">
    {[...Array(5)].map((_, i) => <span key={i} className="w-1 bg-[--color-strawberry-pink] rounded-full animate-waveform" style={{ height: `${Math.random() * 16 + 8}px`, animationDelay: `-${(Math.random() * 0.5).toFixed(2)}s` }}></span>)}
  </div>
);

export default Waveform;
