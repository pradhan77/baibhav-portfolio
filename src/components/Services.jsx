import React from 'react';
import { ShieldAlert, SearchCheck, Network, FileCheck, TerminalSquare, FileText } from 'lucide-react';

const services = [
  {
    icon: ShieldAlert,
    title: "Defensive SOC & SIEM Monitoring",
    description: "Configuring endpoint telemetry agents, centralizing journald and authentication logs, and designing alert rules for active threat detection."
  },
  {
    icon: SearchCheck,
    title: "Vulnerability Assessment & Web Defense",
    description: "Evaluating web applications against OWASP Top 10 vulnerabilities, intercepting HTTP requests with Burp Suite, and verifying remediation patches."
  },
  {
    icon: Network,
    title: "Network Traffic & Protocol Inspection",
    description: "Deep packet inspection using Wireshark, protocol behavior validation (TCP, UDP, DNS, SSH, HTTP), and identifying anomalous network traffic patterns."
  },
  {
    icon: FileCheck,
    title: "Endpoint Hardening & File Integrity (FIM)",
    description: "Real-time file change monitoring, Linux user privilege segmentation, and configuring automated response pipelines such as firewall-drop."
  },
  {
    icon: TerminalSquare,
    title: "Security Automation & Python Tooling",
    description: "Building customized security utilities in Python and Bash for log parsing, brute-force identification, and repetitive event investigation."
  },
  {
    icon: FileText,
    title: "Security Auditing & Governance Baselines",
    description: "Reviewing security posture, evaluating audit logs against industry standards, and creating structured technical reports for stakeholders."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 sm:px-12 lg:px-16 bg-[#f4fafd] text-[#272829]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Title */}
        <div className="section-title">
          <h2>Services &amp; Capabilities</h2>
          <p>
            Core technical competencies and defensive security services honed through academic honors coursework and hands-on laboratory simulations.
          </p>
        </div>

        {/* 6 Service Cards Grid (matching iPortfolio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#149ddd] text-white flex items-center justify-center mb-5 group-hover:bg-white group-hover:text-[#149ddd] group-hover:border group-hover:border-[#149ddd] transition-all flex-shrink-0 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold font-['Raleway'] text-[#173b6c] group-hover:text-[#149ddd] transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#45505b] leading-relaxed font-['Roboto']">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
