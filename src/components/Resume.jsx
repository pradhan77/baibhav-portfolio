import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, Award, GraduationCap, Flame, Shield, Download } from 'lucide-react';
import { educationData, earnedCertifications, learningMilestone, personalInfo } from '../data/portfolioData';
import SectionHeader from './SectionHeader';

function TimelineItem({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`relative pl-6 pb-6 ${className}`}
    >
      {/* Downward drawing vertical line */}
      <motion.div
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1 }
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#149ddd]"
      />

      {/* Popping node dot */}
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 }
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 22,
          delay: 0.12
        }}
        className="absolute -left-[7px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#149ddd] z-10"
      />

      {/* Item content */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-20 px-6 sm:px-12 lg:px-16 bg-[#f4fafd] text-[#272829]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Title & Download Button */}
        <SectionHeader
          title="Resume"
          description="Academic degree, verified industry credentials, and continuous hands-on learning milestones."
          action={
            <a
              href="/resume.pdf"
              download="Baibhav_Pradhan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#149ddd] hover:bg-[#149ddd]/90 text-white font-['Poppins'] text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md group hover:-translate-y-0.5 flex-shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>
          }
        />

        {/* 2 Columns: Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          
          {/* Column 1: Summary & Education */}
          <div>
            
            {/* Summary */}
            <h3 className="text-2xl font-bold font-['Raleway'] text-[#173b6c] mb-5 uppercase tracking-wide">
              Summary
            </h3>

            <TimelineItem>
              <h4 className="text-lg font-bold text-[#173b6c] uppercase mb-1">
                {personalInfo.fullName}
              </h4>
              <p className="text-sm italic text-[#45505b] mb-3 leading-relaxed">
                Dedicated Ethical Hacking &amp; Cybersecurity student focused on defensive operations, SIEM monitoring, vulnerability triage, and secure system architectures.
              </p>
              <ul className="text-sm text-[#45505b] space-y-1.5 list-disc pl-5">
                <li>{personalInfo.location}</li>
                <li>{personalInfo.email}</li>
                <li>3rd Year Undergraduate • Softwarica College / Coventry University</li>
              </ul>
            </TimelineItem>

            {/* Education */}
            <h3 className="text-2xl font-bold font-['Raleway'] text-[#173b6c] mt-8 mb-5 uppercase tracking-wide flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#149ddd]" />
              Education
            </h3>

            <TimelineItem>
              <h4 className="text-lg font-bold text-[#173b6c] uppercase mb-1">
                {educationData.degree}
              </h4>
              <h5 className="text-xs font-semibold bg-white text-[#149ddd] border border-sky-200 px-3 py-1 inline-block mb-3 rounded-full font-mono">
                2024 - 2027 (Expected)
              </h5>
              <p className="text-sm font-semibold text-[#272829] mb-1">
                {educationData.institution}
              </p>
              <p className="text-xs text-[#149ddd] font-medium mb-3">
                Affiliation: {educationData.affiliation}
              </p>
              <p className="text-sm text-[#45505b] leading-relaxed mb-4">
                {educationData.overview}
              </p>

              {/* Core Degree Modules */}
              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <span className="text-xs font-bold text-[#173b6c] uppercase tracking-wider block mb-2 font-['Raleway']">
                  Honors Security Curriculum Modules:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {educationData.coreModules.map((module, mIdx) => (
                    <motion.div
                      key={mIdx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: mIdx * 0.05 }}
                      whileHover={{ y: -2, borderColor: 'rgba(20, 157, 221, 0.4)' }}
                      className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs shadow-2xs transition-shadow hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-[#149ddd] font-semibold">
                        <span>{module.code}</span>
                        <span className="text-slate-400">{module.year}</span>
                      </div>
                      <div className="font-bold text-[#173b6c] mt-0.5">{module.title}</div>
                      <div className="text-[11px] text-[#45505b] line-clamp-2 mt-0.5">{module.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TimelineItem>

          </div>

          {/* Column 2: Industry Certifications & Milestones */}
          <div>
            <h3 className="text-2xl font-bold font-['Raleway'] text-[#173b6c] mb-5 uppercase tracking-wide flex items-center gap-2">
              <Award className="w-6 h-6 text-[#149ddd]" />
              Industry Certifications &amp; Milestones
            </h3>

            {/* Certifications Items */}
            {earnedCertifications.map((cert, cIdx) => (
              <TimelineItem key={cIdx}>
                <h4 className="text-lg font-bold text-[#173b6c] uppercase mb-1">
                  {cert.title}
                </h4>
                
                <h5 className="text-xs font-semibold bg-white text-[#149ddd] border border-sky-200 px-3 py-1 inline-block mb-2 rounded-full font-mono">
                  {cert.date}
                </h5>

                <p className="text-sm font-semibold text-[#272829] mb-1">
                  Issuer: {cert.issuer} {cert.note ? `• ${cert.note}` : ''}
                </p>

                {cert.credentialId && (
                  <p className="text-xs font-mono text-slate-500 mb-2">
                    Credential ID: <span className="font-semibold text-slate-700">{cert.credentialId}</span>
                  </p>
                )}

                <p className="text-sm text-[#45505b] leading-relaxed mb-3">
                  {cert.description}
                </p>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#149ddd] hover:text-[#173b6c] hover:underline"
                  >
                    <span>Verify Certification</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </TimelineItem>
            ))}

            {/* TryHackMe 500-Day Milestone */}
            <TimelineItem>
              <h4 className="text-lg font-bold text-[#173b6c] uppercase mb-1 flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-orange-500" />
                {learningMilestone.title}
              </h4>

              <h5 className="text-xs font-semibold bg-white text-orange-600 border border-orange-200 px-3 py-1 inline-block mb-2 rounded-full font-mono">
                Continuous CTF &amp; Lab Streak
              </h5>

              <p className="text-sm font-semibold text-[#272829] mb-1">
                Platform: {learningMilestone.issuer}
              </p>

              <p className="text-sm text-[#45505b] leading-relaxed mb-3">
                {learningMilestone.description}
              </p>

              {learningMilestone.verificationUrl && (
                <a
                  href={learningMilestone.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#149ddd] hover:text-[#173b6c] hover:underline"
                >
                  <span>Verify Milestone</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </TimelineItem>

          </div>

        </div>

      </div>
    </section>
  );
}
