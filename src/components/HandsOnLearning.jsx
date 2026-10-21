import React from 'react';
import { Target, Flag, Globe, Server, ExternalLink, CheckCircle, Award } from 'lucide-react';
import { handsOnLearning, personalInfo } from '../data/portfolioData';

const iconMap = {
  Target: Target,
  Flag: Flag,
  Globe: Globe,
  Server: Server
};

export default function HandsOnLearning() {
  return (
    <section id="hands-on" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
            <span>Practical Learning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Hands-on Security Platforms & Labs
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Consistently practicing defensive monitoring and penetration testing concepts through structured cybersecurity platforms and simulated virtual networks.
          </p>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {handsOnLearning.map((item, idx) => {
            const Icon = iconMap[item.icon] || Target;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-3xl p-7 border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon, Title, and Badge */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/[0.04] mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {item.platform}
                        </h3>
                        <span className="text-xs text-slate-400">{item.stats}</span>
                      </div>
                    </div>

                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {item.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Target Focus Areas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{topic}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-slate-400">Continuous Practice</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    <span>View Platform Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
