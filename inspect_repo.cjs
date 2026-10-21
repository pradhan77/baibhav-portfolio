const fs = require('fs');

async function inspectFiles() {
  const files = [
    'components/main/star-background.tsx',
    'components/main/hero.tsx',
    'components/sub/hero-content.tsx',
    'components/main/encryption.tsx',
    'components/main/navbar.tsx',
    'components/main/skills.tsx',
    'components/sub/skill-text.tsx',
    'components/main/projects.tsx',
    'components/sub/project-card.tsx',
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
    'constants/index.ts',
    'lib/motion.ts'
  ];

  for (const f of files) {
    try {
      const url = `https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/${f}`;
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        console.log(`\n=================== ${f} ===================`);
        console.log(text.slice(0, 1500));
      } else {
        console.log(`Failed to fetch ${f}: ${res.status}`);
      }
    } catch (e) {
      console.error(`Error on ${f}:`, e.message);
    }
  }
}

inspectFiles();
