import nodemailer from 'nodemailer';

/**
 * Escapes HTML characters in user-supplied strings to prevent HTML injection / XSS in email clients.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Dispatches notification email for new contact submissions via Gmail SMTP.
 * Credentials are read exclusively from environment variables: GMAIL_USER and GMAIL_APP_PASSWORD.
 * If credentials are missing, logs one warning and gracefully skips sending without crashing.
 * Never logs the app password or any part of it.
 */
export async function sendNotificationEmail({ name, email, subject, message, timestamp }) {
  const gmailUser = process.env.GMAIL_USER ? process.env.GMAIL_USER.trim() : '';
  const gmailPass = process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.trim() : '';

  if (!gmailUser || !gmailPass) {
    console.warn('[Email Warning] GMAIL_USER or GMAIL_APP_PASSWORD is missing. Skipping email dispatch.');
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const cleanSubject = subject && subject.trim() ? subject.trim() : name.trim();
    const emailSubject = `Portfolio message: ${cleanSubject}`;
    const formattedTimestamp = timestamp
      ? new Date(timestamp).toLocaleString('en-US', { timeZoneName: 'short' })
      : new Date().toLocaleString('en-US', { timeZoneName: 'short' });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || 'N/A');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const textBody = `Portfolio message received:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject || 'N/A'}\n` +
      `Timestamp: ${formattedTimestamp}\n\n` +
      `Message:\n${message}\n`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #272829; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
        <h2 style="color: #173b6c; border-bottom: 2px solid #149ddd; padding-bottom: 8px; margin-top: 0;">
          New Portfolio Inquiry
        </h2>
        <p style="margin: 8px 0;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #149ddd;">${safeEmail}</a></p>
        <p style="margin: 8px 0;"><strong>Subject:</strong> ${safeSubject}</p>
        <p style="margin: 8px 0;"><strong>Timestamp:</strong> ${formattedTimestamp}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <h3 style="color: #173b6c; margin-bottom: 8px;">Message Content:</h3>
        <div style="background-color: #f8fafc; border-left: 4px solid #149ddd; padding: 14px 18px; border-radius: 4px; font-size: 14px;">
          ${safeMessage}
        </div>
        <p style="font-size: 12px; color: #64748b; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
          Direct reply available via your email client's Reply button (Reply-To is configured to ${safeEmail}).
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: 'pradhanbaibhav28@gmail.com',
      replyTo: email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('[Email Warning] Failed to send email via SMTP:', error.message);
    return null;
  }
}
