import React from 'react';
import { Calendar, CheckCircle2, Clock, ChevronRight, Milestone } from 'lucide-react';
import { journeyMilestones } from '../data/portfolioData';

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
            <span>Milestones & Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Cybersecurity Journey
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            From foundational computer networking and Linux internals to practical ethical hacking, SOC incident triage, and ongoing laboratory research.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-white/[0.08] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {journeyMilestones.map((milestone, idx) => {
            const isCurrent = milestone.status.includes('Active') || milestone.status.includes('Progress');
            const isTargeted = milestone.status.includes('Targeted') || milestone.status.includes('Planned');

            return (
              <div key={idx} className="relative group">
                
                {/* Node on line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/30'
                      : isTargeted
                      ? 'bg-slate-950 border-cyan-400/80'
                      : 'bg-slate-900 border-slate-600'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-slate-950' : 'bg-slate-300'}`} />
                </div>

                {/* Milestone Card */}
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/[0.06] space-y-5">
                  
                  {/* Top Bar: Phase, Year, and Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {milestone.phase}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {milestone.year}
                      </span>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isTargeted
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {isCurrent ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{milestone.status}</span>
                    </span>
                  </div>

                  {/* Title & Affiliation */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {milestone.institution}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {milestone.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block">
                      Core Learnings & Activities:
                    </span>
                    {milestone.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tool Badges */}
                  <div className="pt-4 border-t border-white/[0.04] flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 mr-2">Tools & Environments:</span>
                    {milestone.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
