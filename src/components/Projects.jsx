import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Shield, Terminal, CheckCircle2, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { projects as initialProjects } from '../data/portfolioData';
import { getProjects } from '../services/api';
import ProjectVisualPreview from './ProjectVisualPreview';
import SectionHeader from './SectionHeader';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [projectList, setProjectList] = useState(initialProjects);
  const [expandedLearnings, setExpandedLearnings] = useState({});

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProjectList(data);
        }
      })
      .catch((err) => {
        console.info('[Portfolio Notice] Using fallback data:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    'All',
    'SOC & Defensive Security'
  ];

  const filteredProjects = filter === 'All'
    ? projectList
    : projectList.filter((p) => p.category === filter);

  const toggleLearnMore = (id) => {
    setExpandedLearnings((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="portfolio" className="py-20 px-6 sm:px-12 lg:px-16 bg-white text-[#272829]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Title */}
        <SectionHeader
          title="Portfolio"
          description="Hands-on defensive cybersecurity labs and software tooling developed to master SIEM log ingestion, active response, file integrity monitoring, and brute-force detection."
        />

        {/* Portfolio Category Filters (iPortfolio style with animated sliding pill) */}
        <div className="flex justify-center items-center gap-3 my-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-['Raleway'] transition-colors cursor-pointer border ${
                filter === cat
                  ? 'border-transparent text-white'
                  : 'border-slate-200 bg-[#f4fafd] text-[#45505b] hover:text-[#149ddd] hover:bg-sky-50'
              }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#149ddd] rounded-full shadow-sm -z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Project Showcase Grid with exit/enter transitions and hover lift */}
        <motion.div layout className="grid grid-cols-1 gap-12 mt-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id || project.title || idx}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
                whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(20, 157, 221, 0.18)' }}
                className="bg-[#ffffff] border border-slate-200 rounded-2xl shadow-sm transition-colors duration-300 overflow-hidden p-6 sm:p-8"
              >
                {/* Architecture Blueprint Preview Frame */}
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-800 bg-[#070b12]">
                  <ProjectVisualPreview
                    visualType={project.visualType}
                    title={project.title}
                  />
                </div>

                {/* Title & Badge Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold font-['Raleway'] text-[#173b6c]">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#eef7ff] text-[#149ddd] border border-sky-200">
                      {project.badge || project.category}
                    </span>
                  </div>

                  {/* External GitHub Action */}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#173b6c] hover:bg-[#149ddd] text-white text-xs font-semibold font-['Raleway'] transition-all hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                      Local Lab Environment
                    </span>
                  )}
                </div>

                {/* Project Status Badge if present */}
                {project.status && (
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span><strong>Status:</strong> {project.status.replace(/^Status:\s*/i, '')}</span>
                  </div>
                )}

                {/* Project Description */}
                <p className="text-sm sm:text-base text-[#45505b] leading-relaxed mb-5 font-['Roboto']">
                  {project.description}
                </p>

                {/* Technical Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="bg-[#f4fafd] p-4 sm:p-5 rounded-xl border border-sky-100 mb-5">
                    <h4 className="text-xs font-bold font-['Raleway'] text-[#173b6c] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#149ddd]" />
                      Key Architectural Highlights:
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#45505b]">
                      {project.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#149ddd] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deep Dive Collapsible with smooth height transition */}
                {project.whatILearned && (
                  <div className="mb-5">
                    <button
                      onClick={() => toggleLearnMore(project.id || idx)}
                      className="flex items-center gap-1.5 text-xs font-bold font-['Raleway'] text-[#149ddd] hover:text-[#173b6c] transition-colors cursor-pointer group"
                    >
                      <span>{expandedLearnings[project.id || idx] ? 'Hide Technical Details' : 'Read Full Implementation Details'}</span>
                      {expandedLearnings[project.id || idx] ? (
                        <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedLearnings[project.id || idx] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                            {project.whatILearned}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
