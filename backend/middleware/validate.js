/**
 * Input Validation & Sanitization Middleware
 */

// Email regex according to HTML5 and RFC standards
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const validateContactInput = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // Spam protection: check hidden honeypot field.
  // Bots auto-fill all visible and hidden form fields. If populated, silently drop.
  const honeypot = req.body._hp_website || req.body.website || req.body.honeypot;
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    console.warn(`[Spam Protection] Bot honeypot triggered by IP ${req.ip || 'unknown'}. Silently dropping submission.`);
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  }

  const errors = [];

  // 1. Validate Name (Required, max 100 characters)
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required.');
  } else if (name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters.');
  }

  // 2. Validate Email (Required, valid email format)
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push('Please provide a valid email address.');
  }

  // 3. Validate Subject (Optional, max 150 characters)
  if (subject && typeof subject === 'string' && subject.trim().length > 150) {
    errors.push('Subject cannot exceed 150 characters.');
  }

  // 4. Validate Message (Required, max 3000 characters)
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Message is required.');
  } else if (message.trim().length > 3000) {
    errors.push('Message cannot exceed 3000 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  // Sanitized trimmed fields
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = typeof subject === 'string' ? subject.trim() : '';
  req.body.message = message.trim();

  next();
};
