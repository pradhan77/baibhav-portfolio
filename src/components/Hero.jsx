import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import NetworkBackground from './NetworkBackground';

const TYPED_STRINGS = [
  "a SOC Analyst in training",
  "an ethical hacker",
  "a cybersecurity student"
];

export default function Hero() {
  const [stringIndex, setStringIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const handleType = () => {
      const currentString = TYPED_STRINGS[stringIndex];

      if (isDeleting) {
        setSubText((prev) => currentString.substring(0, prev.length - 1));
        setSpeed(60);
      } else {
        setSubText((prev) => currentString.substring(0, prev.length + 1));
        setSpeed(120);
      }

      if (!isDeleting && subText === currentString) {
        // Pause at the end of word
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && subText === "") {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % TYPED_STRINGS.length);
        setSpeed(250);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [subText, isDeleting, stringIndex, speed]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center bg-[#040b14] text-white px-6 sm:px-12 lg:px-16 overflow-hidden"
    >
      {/* Drifting network nodes animated canvas background */}
      <NetworkBackground />

      {/* Atmospheric radial lighting overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, #149ddd 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#149ddd]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10 max-w-5xl py-20">
        
        {/* 1. Status Pill Badge (Sequence 100ms) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-sky-400/20 text-xs font-mono text-sky-300 mb-6 backdrop-blur-sm shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Seeking SOC, GRC &amp; Junior Roles</span>
        </motion.div>

        {/* 2. Hero Title (Sequence 200ms) */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Raleway'] tracking-tight text-white mb-4"
        >
          {personalInfo.fullName}
        </motion.h1>

        {/* 3. Dynamic Typed Subtitle (Sequence 300ms) */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
          className="text-2xl sm:text-3xl lg:text-4xl text-gray-200 font-['Poppins'] font-normal mb-6 flex flex-wrap items-center gap-2"
        >
          <span>I&apos;m</span>
          <span className="text-white border-b-2 border-[#149ddd] font-semibold tracking-wide">
            {subText}
          </span>
          <span className="typed-cursor text-[#149ddd] text-3xl font-light">|</span>
        </motion.p>

        {/* 4. Description Bio (Sequence 400ms) */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mb-8 font-['Roboto']"
        >
          {personalInfo.heroBio}
        </motion.p>

        {/* 5. Call to Action Buttons (Sequence 500ms) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 bg-[#149ddd] hover:bg-[#149ddd]/90 active:scale-95 text-white font-['Poppins'] font-medium px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-sky-500/25 hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 active:scale-95 text-white font-['Poppins'] font-medium px-6 py-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Contact Me</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white px-4 py-3 font-['Poppins'] text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-[#149ddd] transition-colors animate-bounce flex flex-col items-center gap-1 z-10"
      >
        <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500">Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#149ddd]" />
      </a>
    </section>
  );
}
