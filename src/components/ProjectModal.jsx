import React from 'react';
import { X, Github, ExternalLink, BookOpen, CheckCircle, Shield } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0c101b] border border-white/[0.1] rounded-3xl p-7 sm:p-9 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-8 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span>{project.badge}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <div className="space-y-6 text-sm text-slate-300">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Project Overview:
            </h4>
            <p className="text-slate-300 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Key Lab Features */}
          {project.features && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Implementation & Features:
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What I Learned */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-1.5">
            <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>What I Learned & Key Takeaway:</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {project.whatILearned}
            </p>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Technologies & Tools:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
