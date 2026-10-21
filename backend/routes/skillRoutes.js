import express from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', requireAdmin, createSkill);
router.put('/:id', requireAdmin, updateSkill);
router.delete('/:id', requireAdmin, deleteSkill);

export default router;
