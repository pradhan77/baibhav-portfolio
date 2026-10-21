import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Project } from '../models/Project.js';
import { Certification } from '../models/Certification.js';
import { Education } from '../models/Education.js';
import { Skill } from '../models/Skill.js';
import {
  initialProjects,
  initialCertifications,
  initialEducation,
  initialSkills,
} from '../data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

  console.log(`[Seed Script] Connecting to MongoDB at ${uri}...`);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed Script] Connected to MongoDB.');

    // 1. Seed Projects
    await Project.deleteMany({});
    const createdProjects = await Project.insertMany(initialProjects);
    console.log(`[Seed Script] Successfully seeded ${createdProjects.length} projects.`);

    // 2. Seed Certifications
    await Certification.deleteMany({});
    const createdCerts = await Certification.insertMany(initialCertifications);
    console.log(`[Seed Script] Successfully seeded ${createdCerts.length} certifications.`);

    // 3. Seed Education
    await Education.deleteMany({});
    const createdEdu = await Education.insertMany(initialEducation);
    console.log(`[Seed Script] Successfully seeded ${createdEdu.length} education records.`);

    // 4. Seed Skills
    await Skill.deleteMany({});
    const createdSkills = await Skill.insertMany(initialSkills);
    console.log(`[Seed Script] Successfully seeded ${createdSkills.length} skill groups.`);

    console.log('[Seed Script] Database seeding completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Script Error] Failed to seed database: ${error.message}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();
