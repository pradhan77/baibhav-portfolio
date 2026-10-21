import mongoose from 'mongoose';
import { Certification } from '../models/Certification.js';
import { initialCertifications } from '../data/initialData.js';

/**
 * @route   GET /api/certifications
 * @desc    Get all certifications
 * @access  Public
 */
export const getCertifications = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const certs = await Certification.find().sort({ displayOrder: 1 }).lean();
      if (certs.length > 0) {
        return res.status(200).json({
          success: true,
          count: certs.length,
          data: certs,
        });
      }
    }

    return res.status(200).json({
      success: true,
      count: initialCertifications.length,
      data: initialCertifications,
      source: 'initial-dataset',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/certifications
 * @desc    Add a certification
 * @access  Private (Admin Only)
 */
export const createCertification = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { title, issuer, issued, expires, credentialId, verificationUrl, status, displayOrder } = req.body;

    if (!title || !issuer || !issued) {
      return res.status(400).json({ success: false, message: 'Title, issuer, and issued date are required.' });
    }

    const cert = await Certification.create({
      title,
      issuer,
      issued,
      expires: expires || null,
      credentialId: credentialId || null,
      verificationUrl: verificationUrl || null,
      status: status || 'active',
      displayOrder: displayOrder || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Certification created successfully.',
      data: cert,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/certifications/:id
 * @desc    Update a certification
 * @access  Private (Admin Only)
 */
export const updateCertification = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid certification ID.' });
    }

    const cert = await Certification.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Certification updated successfully.',
      data: cert,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/certifications/:id
 * @desc    Delete a certification
 * @access  Private (Admin Only)
 */
export const deleteCertification = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid certification ID.' });
    }

    const cert = await Certification.findByIdAndDelete(id);

    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certification not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Certification deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
