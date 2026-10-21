import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="py-8 px-6 bg-[#f4fafd] border-t border-slate-200 text-center text-sm text-[#45505b]">
      <div className="container mx-auto max-w-6xl">
        <div className="font-['Raleway'] font-bold text-[#173b6c] mb-1">
          © {currentYear} <span className="text-[#149ddd]">{personalInfo.fullName}</span>. All Rights Reserved
        </div>
        <div className="text-xs text-slate-500">
          Designed in the layout &amp; style of{' '}
          <a
            href="https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#149ddd] hover:underline"
          >
            iPortfolio
          </a>
          {' '}• BSc (Hons) Ethical Hacking &amp; Cybersecurity
        </div>
      </div>
    </footer>
  );
}
