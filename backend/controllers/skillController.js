import mongoose from 'mongoose';
import { Skill } from '../models/Skill.js';
import { initialSkills } from '../data/initialData.js';

/**
 * @route   GET /api/skills
 * @desc    Get categorized cybersecurity skills
 * @access  Public
 */
export const getSkills = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const skills = await Skill.find().sort({ displayOrder: 1 }).lean();
      if (skills.length > 0) {
        return res.status(200).json({
          success: true,
          count: skills.length,
          data: skills,
        });
      }
    }

    return res.status(200).json({
      success: true,
      count: initialSkills.length,
      data: initialSkills,
      source: 'initial-dataset',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/skills
 * @desc    Add a skill category
 * @access  Private (Admin Only)
 */
export const createSkill = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { category, description, skills, displayOrder } = req.body;

    if (!category || !description || !Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: 'Category, description, and skills array are required.' });
    }

    const skillGroup = await Skill.create({
      category,
      description,
      skills,
      displayOrder: displayOrder || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Skill category created successfully.',
      data: skillGroup,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/skills/:id
 * @desc    Update a skill category
 * @access  Private (Admin Only)
 */
export const updateSkill = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid skill ID.' });
    }

    const skillGroup = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skillGroup) {
      return res.status(404).json({ success: false, message: 'Skill category not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Skill category updated successfully.',
      data: skillGroup,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/skills/:id
 * @desc    Delete a skill category
 * @access  Private (Admin Only)
 */
export const deleteSkill = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid skill ID.' });
    }

    const skillGroup = await Skill.findByIdAndDelete(id);

    if (!skillGroup) {
      return res.status(404).json({ success: false, message: 'Skill category not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Skill category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
