/**
 * =====================================================================
 * PORTFOLIO CONFIGURATION FILE
 * =====================================================================
 * All personal information, skills, projects, tools, certifications,
 * and social links are managed here.
 */

export const personalInfo = {
  name: "Baibhav", 
  fullName: "Baibhav Pradhan",
  role: "Ethical Hacking & Cybersecurity",
  status: "3rd-Year Student | Actively Seeking SOC, GRC & Junior Cybersecurity Roles",
  location: "Kathmandu, Nepal",
  college: "Softwarica College of IT & E-Commerce, Nepal",
  university: "Coventry University (UK Affiliated)",
  degree: "BSc (Hons) Ethical Hacking & Cybersecurity",
  year: "3rd Year Student",
  email: "pradhanbaibhav28@gmail.com",
  github: "https://github.com/pradhan77?tab=repositories",
  linkedin: "https://www.linkedin.com/in/baibhav-pradhan-1835b6399/",
  tryhackme: "https://tryhackme.com/p/PrAdHaN",
  
  heroBio: "3rd-year Ethical Hacking & Cybersecurity student at Softwarica College of IT & E-Commerce (Coventry University). Passionate about SOC operations, ethical hacking, defensive security, and network resilience. Actively honing practical offensive & defensive skills through hands-on labs and CTFs.",
  
  aboutShort: "I am a 3rd-year undergraduate studying Ethical Hacking & Cybersecurity based in Nepal, studying at Softwarica College of IT & E-Commerce affiliated with Coventry University, UK. My academic and practical focus centers around defensive security operations (SOC / Blue Team), ethical hacking methodologies, network security analysis, and web application security.",

  aboutDetails: "Rather than treating cybersecurity as mere theory, I invest consistent hours into hands-on laboratories, CTF challenges, packet analysis, and simulated vulnerability assessments. I believe in developing a solid, ground-up grasp of Linux internals, TCP/IP networking, and common attack vectors to build resilient defensive postures.",

  // Key facts displayed in About section
  keyFacts: [
    {
      title: "Core Specialization",
      detail: "SOC & Blue Team operations, Ethical Hacking, Network Security, and Web Application Security."
    },
    {
      title: "Academic Background",
      detail: "3rd-Year Student in BSc (Hons) Ethical Hacking & Cybersecurity at Softwarica College, affiliated with Coventry University (UK)."
    },
    {
      title: "Practical Methodology",
      detail: "Hands-on laboratories, virtual machine environments, Wireshark packet capture, and CTFs."
    },
    {
      title: "Current Goal",
      detail: "I am actively seeking SOC Analyst internships, GRC internships, junior cybersecurity roles, and cybersecurity projects."
    }
  ],

  stats: [
    { label: "Degree Standing", value: "3rd Year Student" },
    { label: "Institution", value: "Softwarica / Coventry" },
    { label: "Focus", value: "SOC & Ethical Hacking" },
    { label: "Location", value: "Kathmandu, Nepal" }
  ]
};

// =====================================================================
// SKILLS (Grouped by domain)
// =====================================================================
export const skillGroups = [
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
    ]
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
    ]
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
    ]
  },
  {
    category: "Scripting & Tooling",
    description: "Automation, scanning, and development workflows",
    skills: [
      "Python (Sockets & Security Scripts)",
      "Bash Shell Scripting",
      "Git & GitHub",
      "Nmap Port Scanning",
      "Gobuster",
      "VS Code"
    ]
  }
];

// =====================================================================
// PROJECTS (With visual preview metadata)
// =====================================================================
export const projects = [
  {
    id: "proj-soar-pipeline",
    title: "Wazuh to n8n SOAR Pipeline",
    category: "SOC & Defensive Security",
    badge: "SOAR & Detection Automation",
    visualType: "soar-pipeline",
    previewCaption: "Wazuh to n8n SOAR Pipeline • Docker, Gemini & Auto-Response",
    description: "SSH brute force alerts (rule 5712) go to an n8n webhook in Docker and are analysed by Gemini. High and critical alerts trigger a Gmail notification, then n8n calls the Wazuh API to block the attacker IP with a firewall-drop active response on the agent and sends a confirmation email.",
    status: "Complete. Alert, AI analysis, automatic block and confirmation email working end to end",
    technologies: [
      "Wazuh",
      "n8n",
      "Docker",
      "Gemini",
      "SOAR",
      "Active Response",
      "iptables"
    ],
    whatILearned: "Configured custom Wazuh integrations using rule 5712 triggers dispatched via HTTP webhook to a self-hosted n8n instance orchestrated in Docker. Designed an automated workflow querying the Gemini API to summarize attack telemetry, extract attacking IP geolocations, determine true threat severity, dispatch structured email notifications via Gmail, and trigger automated containment via the Wazuh Active Response API to block malicious IPs using iptables DROP rules.",
    githubUrl: "https://github.com/pradhan77",
    highlights: [
      "SSH brute force alerts (rule 5712) dispatched to an n8n webhook running in Docker, protected by a header token check",
      "Automated threat analysis and severity evaluation powered by Gemini AI",
      "Real-time Gmail notification on high and critical incidents",
      "Automated containment: n8n triggers a Wazuh firewall-drop active response that adds an iptables DROP rule, then sends a \"Blocked\" confirmation email"
    ]
  },
  {
    id: "proj-wazuh",
    title: "Home Wazuh SOC Lab",
    category: "SOC & Defensive Security",
    badge: "Home SOC Lab",
    visualType: "wazuh-lab",
    previewCaption: "Wazuh SOC Monitoring Architecture & Endpoint Telemetry Flow",
    description: "Built a home SOC monitoring environment using Wazuh Manager on Ubuntu and a Kali Linux endpoint. Configured endpoint monitoring, file integrity monitoring, SSH and system log collection, Rootcheck, and Active Response. Tested FIM by creating, modifying, and deleting monitored files and verifying that the events were detected.",
    technologies: [
      "Wazuh",
      "SIEM",
      "Ubuntu",
      "Kali Linux",
      "FIM",
      "Log Monitoring",
      "Active Response"
    ],
    whatILearned: "Configured Wazuh Manager on an Ubuntu VM with Kali Linux as an agent over TCP 1514. Ingested journald, SSH, system, Nginx, Apache, and dpkg logs, configured Rootcheck, and implemented Active Response using firewall-drop. Rigorously verified File Integrity Monitoring (FIM) through real-time file creation, modification, and deletion detections. (Note: SCA and Syscollector are currently disabled due to a string limit constraint).",
    githubUrl: null,
    highlights: [
      "Wazuh Manager on Ubuntu VM monitoring Kali Linux agent over TCP 1514",
      "File Integrity Monitoring (FIM) verified across create, modify, and delete events",
      "Journald, SSH, and system log collection with Rootcheck and Active Response (firewall-drop)"
    ]
  },
  {
    id: "proj-ssh-sentinel",
    title: "SSH Sentinel",
    category: "SOC & Defensive Security",
    badge: "Python Security Tool",
    visualType: "ssh-sentinel",
    previewCaption: "SSH Authentication Log Analysis & Brute-Force Detection Pipeline",
    description: "Developed a Python-based SSH security log analyzer that detects repeated authentication failures, identifies source IP addresses, classifies brute-force activity by severity, and reports successful SSH logins. Includes live journal monitoring, log-file analysis, filtering, and automated unit tests.",
    technologies: [
      "Python",
      "SSH Log Analysis",
      "Brute Force Detection",
      "Tkinter",
      "Unit Testing"
    ],
    whatILearned: "Implemented journalctl streaming and manual file ingestion for SSH logs, robust regex parsing for IP extraction and attempt tracking, and dynamic threshold-based alert classification (LOW, MEDIUM, HIGH). Added detection for password and public-key successes, built a responsive Tkinter monitoring interface with auto-refresh, and validated core logic with automated unittest suites.",
    githubUrl: "https://github.com/pradhan77/ssh_sentinel",
    highlights: [
      "Failed SSH authentication detection, source IP extraction, and attempt counting",
      "Severity classification (LOW, MEDIUM, HIGH) with filterable detection views",
      "Live journalctl streaming, Tkinter desktop GUI, and automated unit tests"
    ]
  }
];

// =====================================================================
// EDUCATION
// =====================================================================
export const educationData = {
  degree: "BSc (Hons) Ethical Hacking & Cybersecurity",
  institution: "Softwarica College of IT & E-Commerce",
  affiliation: "Coventry University, United Kingdom",
  location: "Kathmandu, Nepal",
  yearOfStudy: "3rd Year Student",
  expectedGraduation: "2027",
  overview: "A comprehensive British honors degree program designed in partnership with Coventry University (UK) that integrates theoretical security foundations with rigorous hands-on laboratory modules across web defense, practical penetration testing, networking, digital forensics, security auditing, and reverse engineering.",
  coreModules: [
    { code: "ST5067CEM", title: "Web Security", year: "Year 2", desc: "Core web security principles, web application vulnerabilities, and defensive mitigations." },
    { code: "ST5063CEM", title: "Practical Pen-Testing", year: "Year 2", desc: "Hands-on penetration testing workflows, vulnerability assessment, and security tooling." },
    { code: "ST5064CEM", title: "Networking", year: "Year 2", desc: "Network architectures, communications protocols, packet routing, and network administration." },
    { code: "ST4060CEM", title: "Digital Forensic Fundamentals", year: "Year 1", desc: "Foundational digital forensics, evidence acquisition, analysis techniques, and integrity." },
    { code: "ST6050CEM", title: "Security Audit and Monitoring", year: "Year 3", desc: "Security auditing methodologies, compliance frameworks, log monitoring, and telemetry analysis." },
    { code: "ST6052CEM", title: "Reverse Engineering", year: "Year 3", desc: "Binary analysis fundamentals, software inspection, disassembly principles, and malware behavior concepts." }
  ]
};

// =====================================================================
// CERTIFICATIONS & MILESTONES (Actual, verified credentials)
// =====================================================================
export const earnedCertifications = [
  {
    title: "Fortinet Certified Fundamentals in Cybersecurity",
    subTitle: "Fortinet Certified Fundamentals – Cybersecurity (NSE 1–2)",
    issuer: "Fortinet",
    date: "Issued June 2026 • Expires June 2028",
    credentialId: "7727972545BP",
    note: null,
    verificationUrl: "https://training.fortinet.com/admin/tool/certificate/index.php",
    stage: "Earned Certification",
    category: "Professional Credential",
    description: "Fortinet Certified Fundamentals – Cybersecurity (NSE 1–2) validating fundamental knowledge of threat environments and security architecture defense."
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Issued May 2026",
    credentialId: "b0f7cb92-d39d-4c83-a3d1-b6a9ff3eccd6",
    note: null,
    verificationUrl: "https://www.netacad.com/",
    stage: "Earned Certification",
    category: "Professional Credential",
    description: "Foundational credential covering global cyber threat awareness, data confidentiality, and baseline defense principles."
  },
  {
    title: "Certified Cybersecurity Educator Professional (CCEP)",
    issuer: "Red Team Leaders",
    date: "December 9, 2025",
    credentialId: null,
    note: "Founder and Instructor",
    verificationUrl: "https://courses.redteamleaders.com/exam-completion/f0549ef63f03e6ff",
    stage: "Earned Certification",
    category: "Professional Credential",
    description: "Certified Cybersecurity Educator Professional (CCEP) credential issued by Red Team Leaders (Founder and Instructor)."
  }
];

export const academicDegree = {
  title: "BSc (Hons) Ethical Hacking & Cybersecurity",
  institution: "Softwarica College of IT & E-Commerce / Coventry University (UK)",
  status: "3rd Year Student • Expected Graduation 2027",
  stage: "Academic Degree",
  description: "Enrolled in a 3-year British honors undergraduate degree program covering Web Security, Practical Pen-Testing, Networking, Digital Forensics, Security Audit, and Reverse Engineering."
};

export const learningMilestone = {
  title: "500-Day TryHackMe Streak",
  issuer: "TryHackMe",
  badge: "Learning Milestone",
  stage: "Achievement",
  description: "A 500-day continuous learning streak on TryHackMe, demonstrating consistent hands-on cybersecurity learning.",
  verificationUrl: "https://tryhackme.com/PrAdHaN/streaks/500-day-streak?utm_campaign=social_share&utm_medium=social&utm_content=streak&utm_source=linkedin"
};

// Default export alias for compatibility
export const certifications = earnedCertifications;
