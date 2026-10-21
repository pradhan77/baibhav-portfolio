/**
 * API Service Layer
 * Interfaces between the React frontend and the Express REST API backend.
 * Provides resilient fallbacks to local data if the backend server is unreachable.
 */

import {
  projects as fallbackProjects,
  earnedCertifications as fallbackCerts,
  educationData as fallbackEducation,
  skillGroups as fallbackSkills,
} from '../data/portfolioData';

// Base URL for API calls. Detects Vite environment.
// In local development, falls back to http://localhost:5000 when VITE_API_URL is unset.
// In production builds, VITE_API_URL is used as given.
const rawEnvUrl = import.meta.env.VITE_API_URL;
const rawBase = rawEnvUrl
  ? rawEnvUrl.trim().replace(/\/+$/, '')
  : (import.meta.env.DEV ? 'http://localhost:5000' : '');

// Normalize so requests to ${API_BASE}/api/... never produce double slashes or duplicate /api
export const API_BASE = rawBase.endsWith('/api') ? rawBase.slice(0, -4) : rawBase;
const API_URL = `${API_BASE}/api`;

/**
 * Helper to execute fetch requests with timeouts and standardized error handling.
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Fetch all security projects
 */
export async function getProjects() {
  try {
    const response = await fetchWithTimeout(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error(`Projects API responded with status ${response.status}`);
    }
    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length >= fallbackProjects.length) {
      // Map MongoDB document format to frontend project card expectations
      return json.data.map((proj, idx) => ({
        id: proj._id || `proj-${idx}`,
        title: proj.title,
        category: proj.category || 'SOC & Defensive Security',
        badge: proj.category || 'SOC & Defensive Security',
        visualType: proj.architectureKey || (proj.title.toLowerCase().includes('soar') ? 'soar-pipeline' : proj.title.toLowerCase().includes('wazuh') ? 'wazuh-lab' : 'ssh-sentinel'),
        previewCaption: proj.architectureKey === 'soar-pipeline' || proj.title.toLowerCase().includes('soar')
          ? 'Wazuh to n8n SOAR Pipeline • Docker, Gemini & Auto-Response'
          : proj.architectureKey === 'wazuh-lab'
            ? 'Wazuh SOC Monitoring Architecture & Endpoint Telemetry Flow'
            : 'SSH Authentication Log Analysis & Brute-Force Detection Pipeline',
        description: proj.description,
        status: proj.status || (proj.title.toLowerCase().includes('soar') ? 'Complete. Alert, AI analysis, automatic block and confirmation email working end to end' : null),
        technologies: proj.tags || [],
        githubUrl: proj.githubUrl || null,
        highlights: proj.highlights && proj.highlights.length > 0 ? proj.highlights : [proj.description],
        whatILearned: proj.whatILearned || proj.description,
      }));
    }
    return fallbackProjects;
  } catch (error) {
    console.info('[API Notice] Using fallback projects data:', error.message);
    return fallbackProjects;
  }
}

/**
 * Fetch all verified certifications
 */
export async function getCertifications() {
  try {
    const response = await fetchWithTimeout(`${API_URL}/certifications`);
    if (!response.ok) {
      throw new Error(`Certifications API responded with status ${response.status}`);
    }
    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      const mappedCerts = json.data.map((cert) => {
        let verifyUrl = cert.verificationUrl;
        if (!verifyUrl) {
          if (cert.title && cert.title.toLowerCase().includes('fortinet')) {
            verifyUrl = 'https://training.fortinet.com/admin/tool/certificate/index.php';
          } else if (cert.title && (cert.title.toLowerCase().includes('cisco') || cert.title.toLowerCase().includes('introduction to cybersecurity'))) {
            verifyUrl = 'https://www.netacad.com/';
          } else if (cert.title && cert.title.toLowerCase().includes('ccep')) {
            verifyUrl = 'https://courses.redteamleaders.com/exam-completion/f0549ef63f03e6ff';
          }
        }
        return {
          title: cert.title,
          issuer: cert.issuer,
          date: cert.issued ? (cert.expires ? `Issued ${cert.issued} • Expires ${cert.expires}` : cert.issued) : '',
          credentialId: cert.credentialId || null,
          verificationUrl: verifyUrl || null,
          stage: 'Earned Certification',
          category: 'Professional Credential',
          description: `${cert.title} issued by ${cert.issuer}.`,
        };
      });

      return mappedCerts.sort((a, b) => {
        if (a.title.toLowerCase().includes('ccep')) return 1;
        if (b.title.toLowerCase().includes('ccep')) return -1;
        return 0;
      });
    }
    return fallbackCerts;
  } catch (error) {
    console.info('[API Notice] Using fallback certifications data:', error.message);
    return fallbackCerts;
  }
}

/**
 * Fetch degree and academic coursework
 */
export async function getEducation() {
  try {
    const response = await fetchWithTimeout(`${API_URL}/education`);
    if (!response.ok) {
      throw new Error(`Education API responded with status ${response.status}`);
    }
    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      const record = json.data[0];
      return {
        degree: record.degree,
        institution: record.institution,
        affiliation: record.affiliation,
        location: record.location,
        yearOfStudy: record.currentYear,
        expectedGraduation: '2027',
        overview: record.description || fallbackEducation.overview,
        coreModules: Array.isArray(record.modules) && record.modules.length > 0
          ? record.modules.map((m) => ({
              code: m.code,
              title: m.title,
              year: m.year,
              desc: m.description,
            }))
          : fallbackEducation.coreModules,
      };
    }
    return fallbackEducation;
  } catch (error) {
    console.info('[API Notice] Using fallback education data:', error.message);
    return fallbackEducation;
  }
}

/**
 * Fetch categorized cybersecurity skills
 */
export async function getSkills() {
  try {
    const response = await fetchWithTimeout(`${API_URL}/skills`);
    if (!response.ok) {
      throw new Error(`Skills API responded with status ${response.status}`);
    }
    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((group) => ({
        category: group.category,
        description: group.description,
        skills: group.skills,
      }));
    }
    return fallbackSkills;
  } catch (error) {
    console.info('[API Notice] Using fallback skills data:', error.message);
    return fallbackSkills;
  }
}

/**
 * Submit contact message to Express backend API
 * Uses 60-second request timeout to allow free-tier backend instances to wake up.
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function sendContactMessage(data) {
  const response = await fetchWithTimeout(`${API_BASE}/api/contact`, {
    method: 'POST',
    body: JSON.stringify(data),
  }, 60000);

  const json = await response.json().catch(() => ({}));

  if (!response.ok || !json.success) {
    const errorMessage = json.message || 'Failed to submit contact message. Please try again.';
    throw new Error(errorMessage);
  }

  return json;
}
