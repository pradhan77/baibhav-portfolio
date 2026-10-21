/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        iportfolio: {
          sidebar: '#040b14',
          accent: '#149ddd',
          accentHover: '#37b3ed',
          title: '#173b6c',
          text: '#272829',
          muted: '#45505b',
          light: '#f4fafd',
          border: '#dce8f8',
        },
        cyber: {
          bg: '#070b12',
          surface: '#0d1322',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.18)',
          borderGreen: 'rgba(16, 185, 129, 0.25)',
          green: '#10b981',
          cyan: '#06b6d4',
          teal: '#14b8a6',
          sky: '#38bdf8',
          accent: '#00f2fe',
          muted: '#94a3b8',
          darkText: '#cbd5e1'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
        nav: ['Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 16px rgba(6, 182, 212, 0.7))' },
        }
      }
    },
  },
  plugins: [],
};
