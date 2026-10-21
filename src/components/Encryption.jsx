import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { slideInFromTop } from '../lib/motion';

export default function Encryption() {
  const videoRef = useRef(null);

  // Performance: Pause video when scrolled out of view, resume when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full h-full py-20 px-6 sm:px-10 z-10 overflow-hidden">
      
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="flex flex-col items-center justify-center text-center z-[20] mb-8"
      >
        <div className="Welcome-box py-1 px-3.5 border border-[#7042f88b] rounded-full inline-flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
          <span className="Welcome-text text-xs font-mono uppercase tracking-wider">
            Defensive Security &amp; Encryption
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Performance &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Security
          </span>
        </h2>
      </motion.div>

      {/* Interactive Space Lock Graphic */}
      <div className="flex flex-col items-center justify-center my-6 z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto p-4 rounded-3xl bg-[#030014]/40 backdrop-blur-sm border border-[#7042f835] hover:border-[#7042f890] transition-all duration-300 shadow-[0_0_30px_rgba(112,66,248,0.25)] hover:shadow-[0_0_50px_rgba(112,66,248,0.5)]">
          <img
            src="/lock-top.png"
            alt="Lock Shackle"
            width={50}
            height={50}
            className="w-[50px] translate-y-4 transition-transform duration-300 ease-out group-hover:translate-y-8 drop-shadow-[0_0_12px_rgba(112,66,248,0.8)]"
          />
          <img
            src="/lock-main.png"
            alt="Lock Body"
            width={70}
            height={70}
            className="w-[70px] z-10 drop-shadow-[0_0_16px_rgba(0,240,255,0.6)]"
          />
          <div className="Welcome-box px-4 py-1 border my-3 border-[#7042f88b] rounded-full">
            <span className="Welcome-text text-xs font-mono">End-to-End Cryptography</span>
          </div>
        </div>
      </div>

      {/* Space Background Video */}
      <div className="w-full flex items-start justify-center absolute top-0 pointer-events-none opacity-40 z-0">
        <video
          ref={videoRef}
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto max-w-5xl object-cover"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* Footer Caption */}
      <div className="z-[20] mt-8 px-4 text-center">
        <p className="text-xl sm:text-2xl text-gray-300 font-medium max-w-xl mx-auto">
          Secure data with cryptographic protocols, File Integrity Monitoring (FIM) &amp; active threat response
        </p>
        <p className="text-xs text-purple-300/70 font-mono mt-2">
          Wazuh SIEM • SSH Sentinel • Rootcheck • Firewall Drop Telemetry
        </p>
      </div>

    </section>
  );
}
