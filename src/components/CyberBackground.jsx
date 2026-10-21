import React from 'react';

/**
 * CyberBackground
 * Subtle, luxury dark gradient atmosphere with soft ambient diffuse lighting
 * and an ultra-fine grain texture for tactile depth.
 */
export default function CyberBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Rich dark canvas base */}
      <div className="absolute inset-0 bg-[#090a0f]" />

      {/* Soft, high-diffusion ambient radial gradients */}
      <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-gradient-to-b from-white/[0.045] via-zinc-800/[0.03] to-transparent rounded-full blur-[140px]" />
      
      <div className="absolute top-[28%] -right-[15%] w-[850px] h-[750px] bg-gradient-to-bl from-zinc-700/[0.025] to-transparent rounded-full blur-[160px]" />

      <div className="absolute top-[65%] -left-[15%] w-[850px] h-[750px] bg-gradient-to-tr from-zinc-800/[0.025] to-transparent rounded-full blur-[160px]" />

      {/* Fine tactile noise overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
    </div>
  );
}
