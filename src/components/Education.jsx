import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import { educationData as initialEdu } from '../data/portfolioData';
import { getEducation } from '../services/api';
import { slideInFromTop, fadeIn } from '../lib/motion';

export default function Education() {
  const [edu, setEdu] = useState(initialEdu);

  useEffect(() => {
    let isMounted = true;
    getEducation()
      .then((data) => {
        if (isMounted && data && data.degree) {
          setEdu(data);
        }
      })
      .catch((err) => {
        console.info('[Education] Using fallback data:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="education" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="flex flex-col items-center justify-center text-center mb-16"
      >
        <div className="Welcome-box py-1.5 px-3.5 border border-[#7042f88b] rounded-full inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#b49bff]" />
          <span className="Welcome-text text-xs font-mono uppercase tracking-wider">
            Academic Degree
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Formal{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Education
          </span>
        </h2>
        <p className="text-xl sm:text-2xl text-purple-300/80 mt-2">
          Rigorous British undergraduate curriculum in ethical hacking &amp; network security
        </p>
      </motion.div>

      {/* Main Degree Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn(0.1)}
        className="space-card rounded-3xl p-8 sm:p-10 mb-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#7042f838]">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#7042f826] border border-[#7042f861] text-cyan-300 font-semibold">
                {edu.yearOfStudy}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-purple-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Expected Graduation: {edu.expectedGraduation}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {edu.degree}
            </h3>

            <div className="space-y-1 text-sm sm:text-base text-gray-200">
              <div className="font-semibold text-white">{edu.institution}</div>
              <div className="text-purple-300/90 text-sm">Affiliated with {edu.affiliation}</div>
              <div className="text-xs text-gray-400 flex items-center gap-1 pt-1 font-mono">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {edu.location}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#7042f818] border border-[#7042f840] max-w-sm shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider font-mono mb-1">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Program Standing</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              3rd-year student completing British honors degree curriculum with emphasis on defensive SOC monitoring, practical penetration testing, and software security.
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed pt-6 font-normal">
          {edu.overview}
        </p>
      </motion.div>

      {/* Core Academic Modules */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300/90 font-mono mb-6 text-center sm:text-left">
          Key Academic Modules
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {edu.coreModules.map((module, idx) => (
            <motion.div
              key={module.code || idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(idx * 0.08)}
              className="space-card rounded-2xl p-6 space-y-2 hover:border-purple-400/60 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-[#7042f820] text-purple-300 border border-[#7042f840]">
                  {module.code}
                </span>
                <span className="text-gray-400">{module.year}</span>
              </div>

              <h5 className="text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                {module.title}
              </h5>

              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                {module.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
