import express from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCertifications);
router.post('/', requireAdmin, createCertification);
router.put('/:id', requireAdmin, updateCertification);
router.delete('/:id', requireAdmin, deleteCertification);

export default router;
