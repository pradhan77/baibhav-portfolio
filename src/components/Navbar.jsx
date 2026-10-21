import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Shield } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About me', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'h-[65px] bg-[#03001427] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 border-b border-[#7042f838]'
          : 'h-[75px] bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <a href="#about" className="h-auto w-auto flex flex-row items-center group">
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center p-1 border border-[#7042f88b] bg-[#030014] mr-3 shadow-[0_0_15px_rgba(112,66,248,0.4)] group-hover:shadow-[0_0_25px_rgba(112,66,248,0.7)] transition-all duration-300">
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              BP
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-gray-200 group-hover:text-white transition">
              {personalInfo.fullName}
            </span>
            <span className="text-[11px] font-mono text-purple-300/80 -mt-0.5 hidden sm:block">
              Ethical Hacking &amp; Cybersecurity
            </span>
          </div>
        </a>

        {/* Center: Space Floating Dock Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center gap-7 border border-[#7042f861] bg-[#0300145e] backdrop-blur-md px-6 py-2.5 rounded-full text-gray-200 shadow-[0_0_20px_rgba(112,66,248,0.2)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-gray-300 hover:text-purple-400 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Right: Social Icons & Contact CTA (Desktop >= 1024px) */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-[#7042f826] transition-colors"
            title="GitHub Repositories"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-gray-300 hover:text-cyan-300 hover:bg-[#00f0ff20] transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="py-1.5 px-5 button-primary rounded-full text-xs font-medium text-white transition hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile & Tablet Controls (< 1024px) */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#contact"
            className="hidden sm:inline-flex py-1.5 px-4 button-primary rounded-full text-xs font-medium text-white transition hover:scale-105 active:scale-95 items-center gap-1.5"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#7042f826] focus:outline-none transition-colors border border-[#7042f840]"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-5 h-5 text-purple-300" /> : <Menu className="w-5 h-5 text-purple-300" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#030014]/95 backdrop-blur-xl border-b border-[#7042f861] px-6 py-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm text-gray-200 hover:text-purple-400 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-[#7042f838] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-300 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-300 hover:text-cyan-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="py-2 px-5 button-primary rounded-full text-xs font-medium text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
