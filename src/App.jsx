import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import Toast from './components/Toast';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'error' }
  const isClickScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    if (typeof msg === 'object' && msg !== null) {
      setToast({ message: msg.message, type: msg.type || 'success' });
    } else {
      setToast({ message: msg, type });
    }
    setTimeout(() => setToast(null), 3500);
  };

  const handleNavClick = (sectionId) => {
    isClickScrollingRef.current = true;
    setActiveSection(sectionId);

    clearTimeout(scrollEndTimerRef.current);
    // Fallback timer: re-enable scrollspy after 1.2s max if smooth scroll stops
    scrollEndTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1200);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scrollspy observer to detect active section in view (middle of viewport)
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'resume', 'portfolio', 'contact'];

    const handleScroll = () => {
      // Ignore scrollspy updates while a click-triggered smooth scroll is running
      if (isClickScrollingRef.current) {
        clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 150);
        return;
      }

      // Bottom of page check (e.g. short contact section)
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (isAtBottom) {
        const lastId = sectionIds[sectionIds.length - 1];
        setActiveSection((prev) => (prev !== lastId ? lastId : prev));
        return;
      }

      // Pick the section that occupies the middle of the viewport
      const middleY = window.innerHeight / 2;

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= middleY && rect.bottom > middleY) {
            setActiveSection((prev) => (prev !== id ? id : prev));
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#272829] antialiased selection:bg-[#149ddd]/20 selection:text-[#149ddd]">
      
      {/* 1. Left Fixed Sidebar (iPortfolio Navigation) */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onNavClick={handleNavClick}
      />

      {/* 2. Main Content Stream (Offset by 300px on desktop) */}
      <main className="xl:ml-[300px] min-h-screen flex flex-col bg-white">
        
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Stats Counter Section */}
        <Stats />

        {/* Skills Section */}
        <Skills />

        {/* Resume Timeline Section (Academic + Certifications) */}
        <Resume />

        {/* Portfolio Showcase Section (Wazuh Lab + SSH Sentinel) */}
        <Projects />

        {/* Contact Section */}
        <Contact onShowToast={showToast} />

        {/* Footer */}
        <Footer />

      </main>

      {/* Scroll-to-Top Button */}
      <ScrollTop />

      {/* Interactive Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
