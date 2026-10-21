import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Award, MapPin, Mail, School, GraduationCap, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import SectionHeader from './SectionHeader';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 sm:px-12 lg:px-16 bg-white text-[#272829]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Title */}
        <SectionHeader
          title="About"
          description={personalInfo.aboutShort}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-6">
          
          {/* Profile Visual Card (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-sky-200">
              <div className="relative inline-block mx-auto mb-4">
                <img
                  src="/profile.svg"
                  alt={personalInfo.fullName}
                  className="w-48 h-48 rounded-2xl object-cover border-4 border-white shadow-md mx-auto bg-[#040b14]"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#149ddd] text-white p-2 rounded-xl shadow">
                  <Shield className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold font-['Raleway'] text-[#173b6c]">
                {personalInfo.fullName}
              </h3>
              <p className="text-xs font-mono text-[#149ddd] uppercase tracking-wider mt-1 mb-4">
                3rd Year Honors Student
              </p>

              <div className="bg-white border border-slate-200/80 rounded-xl p-3 text-left space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Degree:</span>
                  <span className="font-semibold text-[#173b6c]">BSc (Hons)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Institution:</span>
                  <span className="font-semibold text-[#173b6c]">Softwarica / Coventry</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-500">Graduation:</span>
                  <span className="font-semibold text-emerald-600">2027</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Content (Col 8) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h3 className="text-2xl font-bold font-['Raleway'] text-[#173b6c] mb-3">
              Ethical Hacking &amp; Defensive Cybersecurity Student
            </h3>
            
            <p className="italic text-[#45505b] mb-6 leading-relaxed">
              Focusing on defensive security operations (SOC / Blue Team), ethical hacking methodologies, network security analysis, and web application security.
            </p>

            {/* Two-Column Info List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-6 pb-6 text-[15px]">
              
              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">Degree:</strong>{' '}
                  <span className="text-[#272829]">BSc (Hons) Ethical Hacking</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">Expected Grad:</strong>{' '}
                  <span className="text-[#272829]">2027</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">University:</strong>{' '}
                  <span className="text-[#272829]">Coventry University (UK)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">College:</strong>{' '}
                  <span className="text-[#272829]">Softwarica College, Nepal</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">Location:</strong>{' '}
                  <span className="text-[#272829]">{personalInfo.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">Email:</strong>{' '}
                  <a href={`mailto:${personalInfo.email}`} className="text-[#149ddd] hover:underline">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">Current Year:</strong>{' '}
                  <span className="text-[#272829]">3rd Year Undergraduate</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#173b6c] font-semibold">Availability:</strong>{' '}
                  <span className="text-emerald-700 font-medium">Open to SOC &amp; Junior Roles</span>
                </div>
              </div>

            </div>

            {/* Narrative Paragraph */}
            <p className="text-[#45505b] leading-relaxed border-t border-slate-100 pt-5 font-['Roboto']">
              {personalInfo.aboutDetails}
            </p>

            {/* Highlighted Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {personalInfo.keyFacts.map((fact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -3, borderColor: 'rgba(20, 157, 221, 0.4)' }}
                  className="p-4 bg-[#f4fafd] border border-sky-100 rounded-xl transition-shadow hover:shadow-sm"
                >
                  <h4 className="font-['Raleway'] font-bold text-sm text-[#173b6c] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#149ddd]" />
                    {fact.title}
                  </h4>
                  <p className="text-xs text-[#45505b] leading-relaxed">
                    {fact.detail}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
