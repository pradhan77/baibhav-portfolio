import React from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolioData';
import { Shield, Terminal, Network, Cpu } from 'lucide-react';
import SectionHeader from './SectionHeader';

const categoryIcons = [Shield, Terminal, Network, Cpu];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 sm:px-12 lg:px-16 bg-white text-[#272829]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Animated Section Title */}
        <SectionHeader
          title="Skills"
          subtitle="Demonstrated technical competencies honed through hands-on virtual laboratories, CTF challenges, Wazuh SIEM deployment, and Python tool development."
        />

        {/* Cybersecurity Domains & Tool Stack Chip Cards */}
        <div className="mt-8">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-xl font-bold font-['Raleway'] text-[#173b6c] mb-6"
          >
            Cybersecurity Domains &amp; Tool Stack
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group, gIdx) => {
              const Icon = categoryIcons[gIdx % categoryIcons.length];
              return (
                <motion.div
                  key={gIdx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: gIdx * 0.08, ease: 'easeOut' }}
                  className="bg-[#f4fafd] p-6 rounded-2xl border border-sky-100 hover:border-sky-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#149ddd]/10 text-[#149ddd] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-['Raleway'] text-[#173b6c]">
                        {group.category}
                      </h4>
                      <p className="text-xs text-[#45505b]">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Chips staggered per group */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {group.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.1 + (sIdx * 0.04), ease: 'easeOut' }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs hover:-translate-y-0.5 hover:border-[#149ddd] hover:text-[#149ddd] hover:shadow-sm transition-all duration-200 cursor-default"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#149ddd]" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
