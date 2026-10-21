import mongoose from 'mongoose';
import { ContactMessage } from '../models/ContactMessage.js';
import { sendNotificationEmail } from '../config/mailer.js';

// In-memory fallback message store if MongoDB is not running during local inspection
const inMemoryMessages = [];

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact message from visitor
 * @access  Public (Validated)
 */
export const submitContactMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || null;
  const userAgent = req.headers['user-agent'] || null;

  let savedMessage = null;

  // 1. Persist message to backend store (MongoDB if connected, in-memory store as fallback)
  try {
    if (mongoose.connection.readyState === 1) {
      savedMessage = await ContactMessage.create({
        name,
        email,
        subject: subject || '',
        message,
        status: 'new',
        ipAddress,
        userAgent,
      });
      console.log(`[Contact API] Message saved to MongoDB from ${name} <${email}>`);
    } else {
      savedMessage = {
        _id: 'mem_' + Date.now(),
        name,
        email,
        subject: subject || '',
        message,
        status: 'new',
        ipAddress,
        userAgent,
        createdAt: new Date(),
      };
      inMemoryMessages.push(savedMessage);
      console.log(`[Contact API] Stored in-memory message from ${name} <${email}> (MongoDB not currently connected)`);
    }
  } catch (saveError) {
    console.error('[Contact API] Failed to save contact message to database:', saveError);
    return res.status(500).json({
      success: false,
      message: 'Unable to save your message at this time. Please try again later.',
    });
  }

  // 2. Dispatch notification email to pradhanbaibhav28@gmail.com via Nodemailer (Gmail SMTP)
  // If email fails but message was saved, log error on server and still show visitor success message
  try {
    await sendNotificationEmail({
      name,
      email,
      subject,
      message,
      timestamp: savedMessage.createdAt || new Date(),
    });
    console.log(`[Contact API] Notification email successfully sent for message from ${email}`);
  } catch (emailError) {
    console.error('[Contact API] Email notification failed (message was saved successfully):', emailError.message || emailError);
  }

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been sent successfully.',
  });
};

/**
 * @route   GET /api/contact
 * @desc    Retrieve all submitted contact messages
 * @access  Private (Admin Only)
 */
export const getContactMessages = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    }

    return res.status(200).json({
      success: true,
      count: inMemoryMessages.length,
      data: inMemoryMessages,
      source: 'in-memory-store',
    });
  } catch (error) {
    next(error);
  }
};
