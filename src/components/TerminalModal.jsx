import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { personalInfo, skillCategories, projects, educationData } from '../data/portfolioData';

export default function TerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'SEC_OS v3.8.4-security-hardened (x86_64-nepal-linux)' },
    { type: 'system', text: 'Type "help" to display available commands. Type "exit" to close.' },
    { type: 'output', text: `Welcome to ${personalInfo.name}'s interactive security workstation.` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'input', text: `student@portfolio:~$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    switch (lower) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help       - Show this command reference
  whoami     - Display candidate security profile
  about      - Academic background & college affiliation
  skills     - List technical skills under development
  projects   - Show security labs & project highlights
  tools      - View primary tools & arsenal
  education  - Academic credentials & Coventry affiliation
  contact    - Retrieve contact methods & social links
  date       - Show current system date & time
  clear      - Clear the terminal console
  exit       - Close this terminal modal`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `Candidate: ${personalInfo.fullName}
Role: ${personalInfo.role}
Degree: ${personalInfo.degree}
Year: ${personalInfo.year}
Location: ${personalInfo.location}
Objective: Seeking SOC Analyst & Cybersecurity Internships`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `ABOUT CANDIDATE:
${personalInfo.aboutP1}

College: ${personalInfo.college}
Affiliation: ${personalInfo.university}`
        });
        break;

      case 'skills':
        const skillsList = skillCategories
          .map((cat) => `[${cat.title.toUpperCase()}]\n  ` + cat.skills.map((s) => `• ${s.name} (${s.level})`).join('\n  '))
          .join('\n\n');
        newHistory.push({ type: 'output', text: skillsList });
        break;

      case 'projects':
        const projList = projects
          .map((p, i) => `${i + 1}. [${p.badge}] ${p.title}\n   Tools: ${p.technologies.join(', ')}\n   Takeaway: ${p.whatILearned}`)
          .join('\n\n');
        newHistory.push({ type: 'output', text: projList });
        break;

      case 'tools':
        newHistory.push({
          type: 'output',
          text: `SECURITY TOOLS & ARSENAL:
• Network: Wireshark, Nmap, Cisco Packet Tracer
• Web Security: Burp Suite Community, OWASP Juice Shop, DVWA
• Operating Systems: Kali Linux, Ubuntu Server, Windows (Sysmon)
• Scripting: Python (Sockets, Scapy), Bash CLI, Git/GitHub
• Wireless: Aircrack-ng Suite (Controlled lab environment)`
        });
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          text: `EDUCATION:
${educationData.degree}
Institution: ${educationData.institution}
Affiliated with: ${educationData.affiliation}
Status: 3rd Year (Finalist)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `COMMUNICATION CHANNELS:
Email:    ${personalInfo.email}
GitHub:   ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
TryHackMe: ${personalInfo.tryhackme}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;

      case 'cat /etc/passwd':
      case 'cat /etc/shadow':
        newHistory.push({
          type: 'error',
          text: `[ALERT] Access Denied: Operation logged and reported to local SIEM. Nice try!`
        });
        break;

      case 'nmap localhost':
      case 'nmap':
        newHistory.push({
          type: 'output',
          text: `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00012s latency).
PORT     STATE SERVICE
22/tcp   open  ssh (OpenSSH 9.3)
80/tcp   open  http (Nginx / Portfolio)
443/tcp  open  https (TLSv1.3)
Nmap done: 1 IP address scanned in 0.28 seconds`
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${trimmed}. Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] max-h-[85vh]">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-emerald-500/30 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-semibold text-slate-200 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>sec-terminal@station: ~</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen / Output Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2.5 text-slate-300">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'system' && (
                <div className="text-slate-500 font-semibold">{item.text}</div>
              )}
              {item.type === 'input' && (
                <div className="text-emerald-400 font-semibold">{item.text}</div>
              )}
              {item.type === 'output' && (
                <pre className="whitespace-pre-wrap font-mono text-slate-300 pl-2 border-l border-emerald-500/20">
                  {item.text}
                </pre>
              )}
              {item.type === 'error' && (
                <div className="text-rose-400 font-semibold pl-2">{item.text}</div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-4 py-3 bg-[#0c1220] border-t border-slate-800 flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 font-bold shrink-0">
            student@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or any command..."
            className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder-slate-600"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
