import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, FolderGit2, Award, BookOpen } from 'lucide-react';

const statsData = [
  {
    icon: Flame,
    value: "500+",
    title: "TryHackMe Streak",
    description: "Days of continuous hands-on labs & CTFs",
    link: "https://tryhackme.com/p/PrAdHaN"
  },
  {
    icon: FolderGit2,
    value: "3",
    title: "Featured SOC Labs",
    description: "Wazuh SOAR Pipeline, SIEM Lab & SSH Sentinel",
    link: "#portfolio"
  },
  {
    icon: Award,
    value: "3",
    title: "Industry Certifications",
    description: "CCEP, Fortinet FCF & Cisco Cybersecurity",
    link: "#resume"
  },
  {
    icon: BookOpen,
    value: "6",
    title: "Honors Core Modules",
    description: "Pen-Testing, Web Defense, Forensics & Audit",
    link: "#resume"
  }
];

function AnimatedCounter({ rawValue, inView }) {
  const numericMatch = rawValue.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = rawValue.replace(/\d+/, '');

  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = null;
    const duration = 1200; // ms

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section id="stats" className="py-14 px-6 sm:px-12 lg:px-16 bg-[#f4fafd] border-y border-slate-100">
      <div ref={containerRef} className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
                className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-full bg-[#149ddd]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-[#149ddd]" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold font-['Raleway'] text-[#173b6c] leading-none mb-1 font-mono">
                    <AnimatedCounter rawValue={stat.value} inView={inView} />
                  </div>
                  <h4 className="text-sm font-bold text-[#272829] font-['Raleway']">
                    {stat.title}
                  </h4>
                  <p className="text-xs text-[#45505b] mt-0.5">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
