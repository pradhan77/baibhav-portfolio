import crypto from 'crypto';

/**
 * Admin Authentication Middleware
 * Protects administrative write/delete CRUD endpoints.
 * Public visitors cannot freely create, update, or delete portfolio records.
 * Supports:
 * - Header: 'x-admin-key: <key>'
 * - Header: 'Authorization: Bearer <key>'
 */
export const requireAdmin = (req, res, next) => {
  const configuredKey = process.env.ADMIN_API_KEY;

  if (!configuredKey || configuredKey.trim() === '') {
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: ADMIN_API_KEY is not set.',
    });
  }

  const adminHeader = req.headers['x-admin-key'];
  const authHeader = req.headers['authorization'];
  let providedKey = adminHeader;

  if (!providedKey && authHeader && authHeader.startsWith('Bearer ')) {
    providedKey = authHeader.split(' ')[1];
  }

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Valid admin credentials required for this administrative operation.',
    });
  }

  // Constant-time comparison using fixed-length SHA-256 digests to prevent timing attacks
  const configuredHash = crypto.createHash('sha256').update(configuredKey).digest();
  const providedHash = crypto.createHash('sha256').update(providedKey).digest();
  const isMatch = crypto.timingSafeEqual(configuredHash, providedHash);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Valid admin credentials required for this administrative operation.',
    });
  }

  next();
};
