import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Award, CheckCircle, ShieldCheck, Flame, GraduationCap } from 'lucide-react';
import { earnedCertifications as initialCerts, academicDegree, learningMilestone } from '../data/portfolioData';
import { getCertifications } from '../services/api';
import { slideInFromTop, fadeIn } from '../lib/motion';

export default function Certifications() {
  const [certs, setCerts] = useState(initialCerts);

  useEffect(() => {
    let isMounted = true;
    getCertifications()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setCerts(data);
        }
      })
      .catch((err) => {
        console.info('[Certifications] Using fallback data:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="certifications" className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="flex flex-col items-center justify-center text-center mb-16"
      >
        <div className="Welcome-box py-1.5 px-3.5 border border-[#7042f88b] rounded-full inline-flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-[#00f0ff]" />
          <span className="Welcome-text text-xs font-mono uppercase tracking-wider">
            Verified Credentials &amp; Achievements
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Certifications &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Milestones
          </span>
        </h2>
        <p className="text-xl sm:text-2xl text-purple-300/80 mt-2">
          Verified industry credentials, degree standing, and continuous learning streaks
        </p>
      </motion.div>

      <div className="space-y-12">
        
        {/* 1. Earned Industry Certifications */}
        <div className="space-y-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-300/90 font-mono">
            Earned Industry Certifications
          </div>

          <div className="grid grid-cols-1 gap-6">
            {certs.map((cert, idx) => (
              <motion.div
                key={cert.title || idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn(idx * 0.1)}
                className="space-card rounded-3xl p-7 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-300">
                    <span className="text-white font-semibold">{cert.issuer}</span>
                    <span className="text-gray-500">•</span>
                    <span>{cert.date}</span>
                    {cert.credentialId && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-cyan-300">ID: {cert.credentialId}</span>
                      </>
                    )}
                    {cert.note && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-yellow-300">{cert.note}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    {cert.title}
                  </h3>

                  {cert.subTitle && (
                    <p className="text-xs text-purple-200 font-mono font-medium">
                      {cert.subTitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                <div className="shrink-0 flex flex-wrap md:flex-col items-start md:items-end gap-3 pt-2 md:pt-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#7042f826] border border-[#7042f861] text-cyan-300">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Earned Certification</span>
                  </span>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full button-primary text-white text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(112,66,248,0.4)]"
                    >
                      <span>Verify Certification</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Academic Degree Card */}
        <div className="space-y-4 pt-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-300/90 font-mono">
            Academic Degree Standing
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0.2)}
            className="space-card rounded-3xl p-7 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-300">
                <span className="text-white font-semibold">{academicDegree.institution}</span>
                <span className="text-gray-500">•</span>
                <span className="text-cyan-300">{academicDegree.status}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {academicDegree.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {academicDegree.description}
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-[#7042f820] text-purple-200 border border-[#7042f861]">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>Academic Degree</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3. TryHackMe Learning Milestone */}
        <div className="space-y-4 pt-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-300/90 font-mono">
            Continuous Learning Achievement
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0.25)}
            className="space-card rounded-3xl p-7 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-[#7042f870] hover:border-yellow-400/50"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-yellow-300">
                <Flame className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="font-semibold text-white">{learningMilestone.issuer}</span>
                <span className="text-gray-500">•</span>
                <span>{learningMilestone.badge}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {learningMilestone.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {learningMilestone.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap md:flex-col items-start md:items-end gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 border border-yellow-500/30 text-yellow-300">
                <Flame className="w-3.5 h-3.5" />
                <span>500 Days Active</span>
              </span>

              {learningMilestone.verificationUrl && (
                <a
                  href={learningMilestone.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full button-primary text-white text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(112,66,248,0.4)]"
                >
                  <span>Verify Streak</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
