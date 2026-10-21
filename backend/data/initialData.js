/**
 * Seed data for Baibhav Pradhan's Cybersecurity Portfolio
 * Sourced directly from approved academic & project credentials.
 */

export const initialProjects = [
  {
    title: "Wazuh to n8n SOAR Pipeline",
    category: "SOC & Defensive Security",
    tags: ["Wazuh", "n8n", "Docker", "Gemini", "SOAR", "Active Response", "iptables"],
    description: "SSH brute force alerts (rule 5712) go to an n8n webhook in Docker and are analysed by Gemini. High and critical alerts trigger a Gmail notification, then n8n calls the Wazuh API to block the attacker IP with a firewall-drop active response on the agent and sends a confirmation email.",
    githubUrl: "https://github.com/pradhan77",
    architectureKey: "soar-pipeline",
    featured: true,
    displayOrder: 1,
    highlights: [
      "SSH brute force alerts (rule 5712) dispatched to an n8n webhook running in Docker, protected by a header token check",
      "Automated threat analysis and severity evaluation powered by Gemini AI",
      "Real-time Gmail notification on high and critical incidents",
      "Automated containment: n8n triggers a Wazuh firewall-drop active response that adds an iptables DROP rule, then sends a \"Blocked\" confirmation email"
    ],
    outcomes: ["SOAR Pipeline", "Active Response", "Gemini AI Triage", "iptables Automation"]
  },
  {
    title: "Home Wazuh SOC Lab",
    category: "SOC & Defensive Security",
    tags: ["Wazuh", "SIEM", "Ubuntu", "Kali Linux", "FIM", "Log Monitoring", "Active Response"],
    description: "Built a home SOC monitoring environment using Wazuh Manager on Ubuntu and a Kali Linux endpoint. Configured endpoint monitoring, file integrity monitoring, SSH and system log collection, Rootcheck, and Active Response. Tested FIM by creating, modifying, and deleting monitored files and verifying that the events were detected.",
    githubUrl: null,
    architectureKey: "wazuh-lab",
    featured: true,
    displayOrder: 2,
    highlights: [
      "Ubuntu Server with Wazuh Manager + Kali Linux monitored endpoint",
      "FIM verified via file creation, modification, and deletion triggers",
      "SSH auth log ingestion with automated Active Response rule verification"
    ],
    outcomes: ["SIEM Architecture", "FIM Verification", "Active Response", "Log Telemetry"]
  },
  {
    title: "SSH Sentinel",
    category: "SOC & Defensive Security",
    tags: ["Python", "SSH Log Analysis", "Brute Force Detection", "Tkinter", "Unit Testing"],
    description: "Developed a Python-based SSH security log analyzer that detects repeated authentication failures, identifies source IP addresses, classifies brute-force activity by severity, and reports successful SSH logins. Includes live journal monitoring, log-file analysis, filtering, and automated unit tests.",
    githubUrl: "https://github.com/pradhan77/ssh_sentinel",
    architectureKey: "ssh-sentinel",
    featured: true,
    displayOrder: 3,
    highlights: [
      "Live systemd journalctl streaming + static auth.log parsing",
      "Threshold-based brute force classification (Low, Medium, High severity)",
      "Automated Python unittest suite covering parsing and alert rules"
    ],
    outcomes: ["Brute Force Detection", "Journalctl Parsing", "Tkinter Dashboard", "Unit Tested"]
  }
];

export const initialCertifications = [
  {
    title: "Certified Cybersecurity Educator Professional (CCEP)",
    issuer: "Red Team Leaders",
    issued: "December 9, 2025",
    expires: null,
    credentialId: "f0549ef63f03e6ff",
    verificationUrl: "https://courses.redteamleaders.com/exam-completion/f0549ef63f03e6ff",
    status: "active",
    displayOrder: 1
  },
  {
    title: "Fortinet Certified Fundamentals in Cybersecurity",
    issuer: "Fortinet",
    issued: "June 2026",
    expires: "June 2028",
    credentialId: "7727972545BP",
    verificationUrl: "https://training.fortinet.com/admin/tool/certificate/index.php",
    status: "active",
    displayOrder: 2
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issued: "May 2026",
    expires: null,
    credentialId: "b0f7cb92-d39d-4c83-a3d1-b6a9ff3eccd6",
    verificationUrl: "https://www.netacad.com/",
    status: "active",
    displayOrder: 3
  }
];

export const initialEducation = [
  {
    degree: "BSc (Hons) Ethical Hacking & Cybersecurity",
    institution: "Softwarica College / Coventry University",
    affiliation: "Coventry University (UK Affiliated)",
    period: "2023 - Present",
    location: "Kathmandu, Nepal",
    currentYear: "3rd Year Student",
    description: "Rigorous undergraduate curriculum emphasizing practical defensive security, ethical hacking methodologies, system hardening, and network protocol analysis.",
    displayOrder: 1,
    modules: [
      {
        code: "ST5067CEM",
        title: "Web Security",
        year: "Year 2",
        description: "OWASP Top 10 vulnerabilities, secure web architecture, and defensive remediation."
      },
      {
        code: "ST5063CEM",
        title: "Practical Pen-Testing",
        year: "Year 2",
        description: "Hands-on penetration testing methodologies, reconnaissance, exploitation, and reporting."
      },
      {
        code: "ST5064CEM",
        title: "Networking",
        year: "Year 2",
        description: "Enterprise network design, TCP/IP protocol analysis, routing, switching, and firewall concepts."
      },
      {
        code: "ST4060CEM",
        title: "Digital Forensic Fundamentals",
        year: "Year 1",
        description: "Evidence handling, forensic disk imaging, file system forensics, and artifact analysis."
      },
      {
        code: "ST6050CEM",
        title: "Security Audit and Monitoring",
        year: "Year 3",
        description: "SOC operations, SIEM configuration, compliance frameworks, log analysis, and audit trails."
      },
      {
        code: "ST6052CEM",
        title: "Reverse Engineering",
        year: "Year 3",
        description: "Assembly language basics, binary analysis, malware disassembly, and static code triage."
      }
    ]
  }
];

export const initialSkills = [
  {
    category: "Defensive Security & SOC",
    description: "Monitoring, threat detection, and system hardening",
    skills: [
      "SOC Operations",
      "Security Monitoring",
      "Vulnerability Assessment",
      "Log Analysis & Triage",
      "Threat Detection Concepts",
      "Linux System Hardening"
    ],
    displayOrder: 1
  },
  {
    category: "Ethical Hacking & Web Security",
    description: "Vulnerability analysis and security testing",
    skills: [
      "Ethical Hacking Methodologies",
      "Web Application Security",
      "OWASP Top 10 Vulnerabilities",
      "Burp Suite Community",
      "Reconnaissance & Enumeration"
    ],
    displayOrder: 2
  },
  {
    category: "Networking & Systems",
    description: "Core protocols, administration, and traffic analysis",
    skills: [
      "Network Security Protocols",
      "TCP/IP Stack & Subnetting",
      "Wireshark Packet Analysis",
      "Linux Administration (Kali / Ubuntu)",
      "Cisco Packet Tracer",
      "Routing & Switching Basics"
    ],
    displayOrder: 3
  },
  {
    category: "Scripting & Tooling",
    description: "Automation, scanning, and development workflows",
    skills: [
      "Python (Security Scripting)",
      "Bash Shell Scripting",
      "Nmap Network Scanning",
      "Git & GitHub Version Control",
      "VS Code",
      "Regex Log Parsing"
    ],
    displayOrder: 4
  }
];

export const learningMilestones = [
  {
    title: "500-Day TryHackMe Streak",
    platform: "TryHackMe",
    profileUrl: "https://tryhackme.com/p/PrAdHaN",
    description: "Consistent daily engagement with hands-on labs, security rooms, and practical defensive & offensive challenges.",
    type: "milestone"
  }
];
