import React, { useState } from 'react';
import { 
  Terminal, 
  Activity, 
  Radio, 
  Bug, 
  FolderSearch, 
  Wifi, 
  Code, 
  TerminalSquare, 
  GitBranch, 
  Network, 
  Shield, 
  Laptop, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { toolsData } from '../data/portfolioData';

const iconMap = {
  Terminal: Terminal,
  Activity: Activity,
  Radio: Radio,
  Bug: Bug,
  FolderSearch: FolderSearch,
  Wifi: Wifi,
  Code: Code,
  TerminalSquare: TerminalSquare,
  GitBranch: GitBranch,
  Network: Network,
  Shield: Shield,
  Laptop: Laptop
};

export default function ToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Network Recon',
    'Network Analysis',
    'Web Security',
    'Operating Systems',
    'Defensive / SOC'
  ];

  const filteredTools = toolsData.filter((tool) => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesQuery = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.note.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="tools" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
            <span>Security Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Tools & Technologies
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Software utilities, network packet analyzers, and platforms I actively practice with in virtual laboratories and coursework.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTools.map((tool, idx) => {
            const Icon = iconMap[tool.icon] || Terminal;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-5 border border-white/[0.06] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      {tool.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {tool.note}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Lab Tooling</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          * Displayed solely as technologies and tools utilized in coursework and hands-on laboratory environments.
        </div>

      </div>
    </section>
  );
}
