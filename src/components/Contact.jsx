import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send, Copy, Check, CheckCircle2, AlertCircle, Github, Linkedin, Flame, Loader2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sendContactMessage } from '../services/api';
import SectionHeader from './SectionHeader';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _hp_website: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onShowToast) onShowToast("Email copied to clipboard.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setStatusMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setIsWakingUp(false);
    setSubmitStatus(null);
    setStatusMessage('');

    // Timer for Render free-tier cold start indicator (> 5 seconds)
    const wakingUpTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 5000);

    try {
      const response = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        _hp_website: formData._hp_website ? formData._hp_website.trim() : '',
      });

      setSubmitStatus('success');
      setStatusMessage(response.message || 'Thank you! Your message has been sent successfully.');
      if (onShowToast) onShowToast("Message sent successfully!", "success");
      setFormData({ name: '', email: '', subject: '', message: '', _hp_website: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      const isUnreachable =
        error.name === 'AbortError' ||
        error.name === 'TypeError' ||
        (error.message && (
          error.message.toLowerCase().includes('fetch') ||
          error.message.toLowerCase().includes('network') ||
          error.message.toLowerCase().includes('abort') ||
          error.message.toLowerCase().includes('timeout') ||
          error.message.toLowerCase().includes('failed to reach')
        ));

      if (isUnreachable) {
        setStatusMessage('Cannot reach the server. Please email me directly at pradhanbaibhav28@gmail.com');
      } else {
        setStatusMessage(error.message || 'Cannot reach the server. Please email me directly at pradhanbaibhav28@gmail.com');
      }
      if (onShowToast) onShowToast("Submission failed. Please try again.", "error");
    } finally {
      clearTimeout(wakingUpTimer);
      setIsWakingUp(false);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-12 lg:px-16 bg-white text-[#272829]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Title */}
        <SectionHeader
          title="Contact"
          description="Interested in discussing an internship, junior cybersecurity position, or defensive security project? Reach out directly using the form or channels below."
        />

        {/* 2-Column Contact Layout (matching iPortfolio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          
          {/* Left Column: Info Wrap (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_0_24px_rgba(0,0,0,0.06)] space-y-6"
          >
            
            {/* Address / Location */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#149ddd]/10 text-[#149ddd] group-hover:bg-[#149ddd] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Raleway'] text-[#173b6c] mb-1">
                  Location
                </h3>
                <p className="text-sm text-[#45505b]">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Email Channel */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#149ddd]/10 text-[#149ddd] group-hover:bg-[#149ddd] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold font-['Raleway'] text-[#173b6c] mb-1">
                  Direct Email
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm text-[#149ddd] hover:underline font-mono"
                  >
                    {personalInfo.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold font-['Raleway'] text-[#173b6c] uppercase tracking-wider mb-3">
                Verified Online Presence:
              </h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#149ddd] text-slate-700 hover:text-white text-xs font-medium border border-slate-200 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#173b6c] text-slate-700 hover:text-white text-xs font-medium border border-slate-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-orange-500 text-slate-700 hover:text-white text-xs font-medium border border-slate-200 transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-500 group-hover:text-white" />
                  <span>TryHackMe</span>
                </a>
              </div>
            </div>

            {/* Recruiter Notice Box */}
            <div className="bg-[#f4fafd] p-4 rounded-xl border border-sky-100 text-xs text-[#45505b] leading-relaxed">
              <span className="font-bold text-[#173b6c] block mb-1">
                Looking for:
              </span>
              SOC Analyst Internships, Junior Defensive Security positions, and GRC Entry roles.
            </div>

          </motion.div>

          {/* Right Column: Contact Form (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-[0_0_24px_rgba(0,0,0,0.06)]"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Spam Honeypot Field (hidden from genuine users) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="hp-website">Do not fill this out</label>
                <input
                  type="text"
                  id="hp-website"
                  name="_hp_website"
                  value={formData._hp_website || ''}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name-field" className="block text-xs font-bold font-['Raleway'] text-[#173b6c] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name-field"
                    name="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#149ddd] focus:ring-4 focus:ring-[#149ddd]/20 focus:shadow-[0_0_16px_rgba(20,157,221,0.22)] text-sm text-[#272829] outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email-field" className="block text-xs font-bold font-['Raleway'] text-[#173b6c] uppercase tracking-wider mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email-field"
                    name="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. recruiter@company.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#149ddd] focus:ring-4 focus:ring-[#149ddd]/20 focus:shadow-[0_0_16px_rgba(20,157,221,0.22)] text-sm text-[#272829] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject-field" className="block text-xs font-bold font-['Raleway'] text-[#173b6c] uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject-field"
                  name="subject"
                  maxLength={150}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. SOC Analyst Internship Opportunity"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#149ddd] focus:ring-4 focus:ring-[#149ddd]/20 focus:shadow-[0_0_16px_rgba(20,157,221,0.22)] text-sm text-[#272829] outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message-field" className="block text-xs font-bold font-['Raleway'] text-[#173b6c] uppercase tracking-wider mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message-field"
                  name="message"
                  required
                  maxLength={3000}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message or inquiry here..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#149ddd] focus:ring-4 focus:ring-[#149ddd]/20 focus:shadow-[0_0_16px_rgba(20,157,221,0.22)] text-sm text-[#272829] outline-none transition-all duration-300 resize-y"
                />
              </div>

              {/* Status Message */}
              {submitStatus === 'success' && (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button with Loading Spinner & Success Checkmark & Hover Lift */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-2 bg-[#149ddd] hover:bg-[#149ddd]/90 text-white font-['Poppins'] font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white flex-shrink-0" />
                      <span>Sending Message...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Free tier wake-up notification (>5 seconds) */}
                {isSubmitting && isWakingUp && (
                  <p className="mt-2.5 text-xs text-amber-600 font-medium animate-pulse">
                    The server is waking up, this can take up to a minute...
                  </p>
                )}
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
