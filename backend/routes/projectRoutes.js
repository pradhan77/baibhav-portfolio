import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Read Endpoints
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected Admin CRUD Endpoints
router.post('/', requireAdmin, createProject);
router.put('/:id', requireAdmin, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
