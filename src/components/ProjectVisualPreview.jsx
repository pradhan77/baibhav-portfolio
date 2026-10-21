import React from 'react';

/**
 * ProjectVisualPreview
 * Elevated architectural and security concept artwork for featured projects.
 * Clean, technical, and accurate to actual project implementations.
 */
export default function ProjectVisualPreview({ visualType, title }) {
  switch (visualType) {
    case 'soar-pipeline':
      return (
        <div className="w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#11131c] to-[#090a0f] border border-white/[0.08] p-6 flex items-center justify-center overflow-hidden relative group-hover:border-white/[0.16] transition-colors">
          <svg viewBox="0 0 680 180" className="w-full h-full max-w-2xl text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="90" x2="665" y2="90" stroke="#27272a" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />

            {/* Box 1: Wazuh Alert */}
            <rect x="15" y="44" width="105" height="92" rx="10" stroke="#38bdf8" strokeWidth="1.5" fill="#141c2b" />
            <text x="67" y="68" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Wazuh Manager</text>
            <text x="67" y="85" fill="#ffffff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Rule 5712 Alert</text>
            <line x1="25" y1="94" x2="110" y2="94" stroke="#1e293b" strokeWidth="1" />
            <text x="67" y="110" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">SSH Brute Force</text>
            <text x="67" y="124" fill="#64748b" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">HTTP Webhook</text>

            <path d="M120 90 H 145" stroke="#38bdf8" strokeWidth="1.5" />
            <polygon points="145,90 138,86 138,94" fill="#38bdf8" />

            {/* Box 2: Docker n8n SOAR */}
            <rect x="145" y="38" width="115" height="104" rx="10" stroke="#a855f7" strokeWidth="1.5" fill="#1f1530" />
            <text x="202" y="62" fill="#c084fc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">n8n (Docker)</text>
            <text x="202" y="78" fill="#ffffff" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">SOAR Orchestration</text>
            <line x1="155" y1="88" x2="250" y2="88" stroke="#3b2d54" strokeWidth="1" />
            <text x="202" y="104" fill="#d8b4fe" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Payload Ingestion</text>
            <text x="202" y="120" fill="#a855f7" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Threat Extraction</text>

            <path d="M260 90 H 285" stroke="#a855f7" strokeWidth="1.5" />
            <polygon points="285,90 278,86 278,94" fill="#a855f7" />

            {/* Box 3: Gemini Analysis */}
            <rect x="285" y="44" width="105" height="92" rx="10" stroke="#3b82f6" strokeWidth="1.5" fill="#141d30" />
            <text x="337" y="68" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Gemini API</text>
            <text x="337" y="85" fill="#ffffff" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">AI Threat Analysis</text>
            <line x1="295" y1="94" x2="380" y2="94" stroke="#1e293b" strokeWidth="1" />
            <text x="337" y="110" fill="#93c5fd" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Context Triage</text>
            <text x="337" y="124" fill="#64748b" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Severity Filter</text>

            <path d="M390 90 H 415" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="415,90 408,86 408,94" fill="#10b981" />

            {/* Box 4: Alert Notification */}
            <rect x="415" y="44" width="100" height="92" rx="10" stroke="#10b981" strokeWidth="1.5" fill="#12251e" />
            <text x="465" y="68" fill="#34d399" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Gmail Alert</text>
            <text x="465" y="85" fill="#ffffff" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">Incident Report</text>
            <line x1="425" y1="94" x2="505" y2="94" stroke="#1e3a2b" strokeWidth="1" />
            <text x="465" y="110" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">High/Critical</text>
            <text x="465" y="124" fill="#6ee7b7" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Instant Dispatch</text>

            <path d="M515 90 H 540" stroke="#f43f5e" strokeWidth="1.5" />
            <polygon points="540,90 533,86 533,94" fill="#f43f5e" />

            {/* Box 5: Auto-Block */}
            <rect x="540" y="44" width="125" height="92" rx="10" stroke="#f43f5e" strokeWidth="1.5" fill="#241219" />
            <text x="602" y="68" fill="#fb7185" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">Auto-Block</text>
            <text x="602" y="85" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Active Response</text>
            <line x1="550" y1="94" x2="655" y2="94" stroke="#4c1d2d" strokeWidth="1" />
            <text x="602" y="110" fill="#fda4af" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Wazuh API</text>
            <text x="602" y="124" fill="#f43f5e" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">iptables DROP</text>
          </svg>
          <span className="absolute bottom-3.5 right-5 text-[11px] text-zinc-500 font-mono tracking-wider uppercase">
            WAZUH TO N8N SOAR PIPELINE • DOCKER, GEMINI & AUTO-RESPONSE
          </span>
        </div>
      );

    case 'wazuh-lab':
      return (
        <div className="w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#11131c] to-[#090a0f] border border-white/[0.08] p-6 flex items-center justify-center overflow-hidden relative group-hover:border-white/[0.16] transition-colors">
          <svg viewBox="0 0 540 180" className="w-full h-full max-w-lg text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="90" x2="520" y2="90" stroke="#27272a" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />

            {/* Left Box: Monitored Endpoint (Kali Linux) */}
            <rect x="20" y="42" width="115" height="96" rx="10" stroke="#71717a" strokeWidth="1.5" fill="#18181b" />
            <text x="77" y="66" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Kali Linux</text>
            <text x="77" y="82" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Wazuh Agent</text>
            <line x1="30" y1="92" x2="125" y2="92" stroke="#27272a" strokeWidth="1" />
            <text x="77" y="108" fill="#d4d4d8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">FIM: create/mod/del</text>
            <text x="77" y="123" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="sans-serif">SSH & System Logs</text>

            {/* Channel to Manager */}
            <path d="M135 90 H 205" stroke="#a1a1aa" strokeWidth="1.5" />
            <polygon points="205,90 197,86 197,94" fill="#a1a1aa" />
            <text x="170" y="80" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="sans-serif">TCP 1514</text>

            {/* Middle Box: Wazuh Manager Core (Ubuntu VM) */}
            <rect x="205" y="32" width="160" height="116" rx="12" stroke="#d4d4d8" strokeWidth="1.5" fill="#202024" />
            <text x="285" y="56" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Wazuh Manager</text>
            <text x="285" y="72" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Ubuntu Server VM</text>
            
            <rect x="218" y="82" width="134" height="24" rx="5" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <text x="285" y="98" fill="#e4e4e7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">FIM & Rootcheck Engine</text>

            <rect x="218" y="112" width="134" height="24" rx="5" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <text x="285" y="128" fill="#e4e4e7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Active Response (firewall-drop)</text>

            {/* Channel to Dashboard */}
            <path d="M365 90 H 420" stroke="#a1a1aa" strokeWidth="1.5" />
            <polygon points="420,90 412,86 412,94" fill="#a1a1aa" />
            <text x="392" y="80" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Alerts</text>

            {/* Right Box: Wazuh Dashboard / Visualization */}
            <rect x="420" y="48" width="105" height="84" rx="10" stroke="#71717a" strokeWidth="1.5" fill="#18181b" />
            <text x="472" y="76" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Dashboard</text>
            <text x="472" y="94" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Security Events</text>
            <text x="472" y="112" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Event Triage</text>
          </svg>
          <span className="absolute bottom-3.5 right-5 text-[11px] text-zinc-500 font-mono tracking-wider uppercase">
            Wazuh SOC Monitoring Architecture & Endpoint Telemetry Flow
          </span>
        </div>
      );

    case 'ssh-sentinel':
      return (
        <div className="w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#11131c] to-[#090a0f] border border-white/[0.08] p-6 flex items-center justify-center overflow-hidden relative group-hover:border-white/[0.16] transition-colors">
          <svg viewBox="0 0 540 180" className="w-full h-full max-w-lg text-zinc-400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="90" x2="520" y2="90" stroke="#27272a" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />

            {/* Left Box: Ingestion Stream */}
            <rect x="20" y="44" width="110" height="92" rx="10" stroke="#71717a" strokeWidth="1.5" fill="#18181b" />
            <text x="75" y="70" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">SSH Ingestion</text>
            <text x="75" y="87" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="sans-serif">journalctl -u ssh</text>
            <line x1="30" y1="97" x2="120" y2="97" stroke="#27272a" strokeWidth="1" />
            <text x="75" y="114" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="sans-serif">or manual auth.log</text>

            <path d="M130 90 H 190" stroke="#a1a1aa" strokeWidth="1.5" />
            <polygon points="190,90 182,86 182,94" fill="#a1a1aa" />
            <text x="160" y="80" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Log Lines</text>

            {/* Center Box: Analysis & Severity Classification Engine */}
            <rect x="190" y="32" width="180" height="116" rx="12" stroke="#d4d4d8" strokeWidth="1.5" fill="#202024" />
            <text x="280" y="56" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Analysis & Classifier</text>
            <text x="280" y="72" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="sans-serif">IP Extraction & Attempt Tracking</text>

            <rect x="202" y="82" width="156" height="24" rx="5" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <text x="280" y="98" fill="#e4e4e7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Severity: LOW | MEDIUM | HIGH</text>

            <rect x="202" y="112" width="156" height="24" rx="5" stroke="#3f3f46" strokeWidth="1" fill="#18181b" />
            <text x="280" y="128" fill="#e4e4e7" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Success: Password / Public-Key</text>

            <path d="M370 90 H 425" stroke="#a1a1aa" strokeWidth="1.5" />
            <polygon points="425,90 417,86 417,94" fill="#a1a1aa" />
            <text x="398" y="80" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Alerts</text>

            {/* Right Box: Tkinter GUI & Unit Tests */}
            <rect x="425" y="44" width="105" height="92" rx="10" stroke="#71717a" strokeWidth="1.5" fill="#18181b" />
            <text x="477" y="70" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Tkinter GUI</text>
            <text x="477" y="87" fill="#a1a1aa" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Live Monitor View</text>
            <line x1="435" y1="97" x2="520" y2="97" stroke="#27272a" strokeWidth="1" />
            <text x="477" y="114" fill="#71717a" fontSize="9" textAnchor="middle" fontFamily="sans-serif">unittest validated</text>
          </svg>
          <span className="absolute bottom-3.5 right-5 text-[11px] text-zinc-500 font-mono tracking-wider uppercase">
            SSH Authentication Log Analysis & Brute-Force Detection Pipeline
          </span>
        </div>
      );

    default:
      return (
        <div className="w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#11131c] to-[#090a0f] border border-white/[0.08] p-6 flex items-center justify-center overflow-hidden relative group-hover:border-white/[0.16] transition-colors">
          <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
            {title}
          </span>
        </div>
      );
  }
}
