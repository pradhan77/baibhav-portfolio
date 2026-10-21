import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust reverse proxy (e.g. Render) before rate limiter so real visitor IPs are detected
app.set('trust proxy', 1);

// Connect to MongoDB with graceful fallback to in-memory store
connectDB();

// 1. Security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. CORS Configuration
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://baibhavpradhan.com.np',
  'https://www.baibhavpradhan.com.np',
];

const envOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests without origin header (e.g. curl, uptime pingers)
    if (!origin) {
      return callback(null, true);
    }
    const normalizedOrigin = origin.replace(/\/+$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 3. Request Parsing & Size Limits (Protects against payload flooding)
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// 4. API Health Check (Does not touch database or mailer)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 5. Mount REST API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);

// 6. 404 Handler for Unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 7. Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Not allowed by CORS',
    });
  }

  console.error('[Server Error]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
});

// Start Server bound to 0.0.0.0
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Portfolio Backend] Server running in ${NODE_ENV} mode on port ${PORT} bound to 0.0.0.0`);
  console.log(`[Portfolio Backend] Base API endpoint: http://localhost:${PORT}/api`);
});

// Graceful Termination
const handleShutdown = (signal) => {
  console.log(`\n[Portfolio Backend] Received ${signal}. Closing server gracefully...`);
  server.close(() => {
    console.log('[Portfolio Backend] Closed out remaining connections.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;
