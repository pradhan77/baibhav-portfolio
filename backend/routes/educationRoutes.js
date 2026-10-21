import express from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', requireAdmin, createEducation);
router.put('/:id', requireAdmin, updateEducation);
router.delete('/:id', requireAdmin, deleteEducation);

export default router;
