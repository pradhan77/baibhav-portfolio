import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border ${
        isError
          ? 'border-rose-500/60 text-rose-100 shadow-[0_0_24px_rgba(244,63,94,0.3)]'
          : 'border-emerald-500/40 text-slate-100 shadow-2xl'
      } backdrop-blur-md animate-slideUp font-mono text-xs`}
    >
      {isError ? (
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      )}
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded text-slate-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
