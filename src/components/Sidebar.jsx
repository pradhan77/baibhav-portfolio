import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  FileText,
  FolderGit2,
  ShieldCheck,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Flame,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Sidebar({ activeSection, setActiveSection, onNavClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: ShieldCheck },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const activeIndex = navLinks.findIndex((item) => item.id === activeSection);
  const [pillTop, setPillTop] = useState(activeIndex !== -1 ? activeIndex * 52 : 0);
  const [pillHeight, setPillHeight] = useState(48);
  const [isReady, setIsReady] = useState(true);
  const itemRefs = useRef([]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update sliding pill position based on active item DOM position
  useEffect(() => {
    const updatePill = () => {
      const idx = navLinks.findIndex((item) => item.id === activeSection);
      if (idx !== -1 && itemRefs.current[idx]) {
        const el = itemRefs.current[idx];
        setPillTop(el.offsetTop);
        setPillHeight(el.offsetHeight);
        setIsReady(true);
      }
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeSection]);

  // Handle click on nav link
  const handleItemClick = (sectionId) => {
    setIsOpen(false);
    if (onNavClick) {
      onNavClick(sectionId);
    } else if (setActiveSection) {
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        className="xl:hidden fixed top-4 right-4 z-[9999] w-11 h-11 rounded-full bg-[#149ddd] text-white flex items-center justify-center shadow-lg hover:bg-[#149ddd]/90 transition-colors duration-150 motion-reduce:transition-none cursor-pointer focus:outline-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[996] transition-opacity"
        />
      )}

      {/* Fixed Left Sidebar Container (visible from first paint, no container entrance animation) */}
      <aside
        id="header"
        className={`fixed top-0 bottom-0 left-0 w-[300px] bg-[#040b14] text-white z-[997] transition-transform duration-300 ease-in-out overflow-y-auto px-4 py-6 border-r border-slate-800/80 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        }`}
      >
        <div>
          {/* Profile Avatar Frame (static ring, green dot with slow 3s opacity pulse) */}
          <div className="profile-img text-center pt-2 pb-4">
            <div className="relative inline-block">
              <img
                src="/profile.svg"
                alt={personalInfo.fullName}
                className="w-[120px] h-[120px] rounded-full mx-auto border-8 border-white/10 shadow-xl object-cover bg-[#0b1b33]"
              />
              <span
                className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#040b14] animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] motion-reduce:animate-none"
                title="Available for opportunities"
              />
            </div>

            {/* Author Name */}
            <h1 className="text-2xl font-bold font-['Raleway'] tracking-wide text-white mt-3 mb-1">
              <a href="#hero" onClick={() => handleItemClick('hero')}>
                {personalInfo.fullName}
              </a>
            </h1>

            {/* Professional Subtitle */}
            <p className="text-xs text-sky-400 font-mono tracking-wider uppercase mb-4">
              Ethical Hacking &amp; Cybersecurity
            </p>

            {/* Social Links Row (150ms bg fade to accent blue, no scaling) */}
            <div className="flex items-center justify-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#149ddd] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-150 ease-out motion-reduce:transition-none"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#149ddd] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-150 ease-out motion-reduce:transition-none"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TryHackMe Profile"
                className="group w-9 h-9 rounded-full bg-white/5 hover:bg-[#149ddd] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-150 ease-out motion-reduce:transition-none"
                title="TryHackMe (500+ Streak)"
              >
                <Flame className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors duration-150 ease-out motion-reduce:transition-none" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email Baibhav Pradhan"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#149ddd] text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-150 ease-out motion-reduce:transition-none"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Menu with Single Sliding Highlight Pill */}
          <nav className="mt-4">
            <ul className="relative flex flex-col gap-1">
              {/* Single highlight pill that slides using transform: translateY only */}
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 pointer-events-none bg-[#0f1824] rounded-r-lg border-l-[3px] border-[#149ddd] z-0"
                style={{
                  top: 0,
                  height: `${pillHeight}px`,
                  transform: `translateY(${pillTop}px)`,
                  transition: prefersReducedMotion
                    ? 'none'
                    : 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: isReady ? 1 : 0,
                }}
              />

              {navLinks.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.li
                    key={item.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.3,
                            delay: index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    className="relative z-10"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.id);
                      }}
                      className={`group flex items-center gap-3 px-3 py-3 rounded-r-lg border-l-[3px] border-transparent font-['Poppins'] text-[15px] select-none cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none ${
                        isActive
                          ? 'text-white font-bold bg-transparent'
                          : 'text-[#a8a9b4] hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-150 ease-out group-hover:translate-x-[2px] motion-reduce:transform-none motion-reduce:transition-none ${
                          isActive
                            ? 'text-[#149ddd]'
                            : 'text-[#a8a9b4] group-hover:text-[#149ddd]'
                        }`}
                      />
                      <span
                        className={`transition-colors duration-150 ease-out motion-reduce:transition-none ${
                          isActive
                            ? 'text-white font-bold'
                            : 'text-[#a8a9b4] group-hover:text-white font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Sidebar Footer info */}
        <div className="pt-6 border-t border-slate-800/60 text-center">
          <p className="text-[11px] text-gray-400 font-mono">
            Coventry University • 3rd Year
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            Kathmandu, Nepal
          </p>
        </div>
      </aside>
    </>
  );
}
