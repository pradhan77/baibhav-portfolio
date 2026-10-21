import mongoose from 'mongoose';
import { Education } from '../models/Education.js';
import { initialEducation } from '../data/initialData.js';

/**
 * @route   GET /api/education
 * @desc    Get education credentials and coursework
 * @access  Public
 */
export const getEducation = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const edu = await Education.find().sort({ displayOrder: 1 }).lean();
      if (edu.length > 0) {
        return res.status(200).json({
          success: true,
          count: edu.length,
          data: edu,
        });
      }
    }

    return res.status(200).json({
      success: true,
      count: initialEducation.length,
      data: initialEducation,
      source: 'initial-dataset',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/education
 * @desc    Add an education record
 * @access  Private (Admin Only)
 */
export const createEducation = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { degree, institution, affiliation, period, location, currentYear, description, modules, displayOrder } = req.body;

    if (!degree || !institution) {
      return res.status(400).json({ success: false, message: 'Degree and institution are required.' });
    }

    const edu = await Education.create({
      degree,
      institution,
      affiliation: affiliation || 'Coventry University (UK Affiliated)',
      period: period || '2023 - Present',
      location: location || 'Kathmandu, Nepal',
      currentYear: currentYear || '3rd Year Student',
      description: description || '',
      modules: Array.isArray(modules) ? modules : [],
      displayOrder: displayOrder || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Education record created successfully.',
      data: edu,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/education/:id
 * @desc    Update education record
 * @access  Private (Admin Only)
 */
export const updateEducation = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid education ID.' });
    }

    const edu = await Education.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!edu) {
      return res.status(404).json({ success: false, message: 'Education record not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Education record updated successfully.',
      data: edu,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/education/:id
 * @desc    Delete education record
 * @access  Private (Admin Only)
 */
export const deleteEducation = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid education ID.' });
    }

    const edu = await Education.findByIdAndDelete(id);

    if (!edu) {
      return res.status(404).json({ success: false, message: 'Education record not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Education record deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
