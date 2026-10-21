import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitContactMessage,
  getContactMessages,
} from '../controllers/contactController.js';
import { validateContactInput } from '../middleware/validate.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rate limiter: 5 contact submissions per 1 hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour (60 minutes)
  max: 5, // Limit each IP to 5 submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact messages sent from this IP. Please try again after an hour.',
  },
});

// Public submission with IP rate limiting & input validation
router.post('/', contactLimiter, validateContactInput, submitContactMessage);

// Protected admin inbox query
router.get('/', requireAdmin, getContactMessages);

export default router;
