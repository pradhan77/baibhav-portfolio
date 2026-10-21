import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { initialProjects } from '../data/initialData.js';

/**
 * @route   GET /api/projects
 * @desc    Get all security projects
 * @access  Public
 */
export const getProjects = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
      if (projects.length > 0) {
        return res.status(200).json({
          success: true,
          count: projects.length,
          data: projects,
        });
      }
    }

    // Resilient fallback to curated initial data if database is empty or offline
    return res.status(200).json({
      success: true,
      count: initialProjects.length,
      data: initialProjects,
      source: 'initial-dataset',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const project = await Project.findById(id).lean();
      if (project) {
        return res.status(200).json({ success: true, data: project });
      }
    }

    const fallback = initialProjects.find((p, idx) => p._id === id || String(idx) === id || p.architectureKey === id);
    if (fallback) {
      return res.status(200).json({ success: true, data: fallback });
    }

    return res.status(404).json({ success: false, message: 'Project not found.' });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Admin Only)
 */
export const createProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { title, category, description, tags, githubUrl, architectureKey, featured, displayOrder, highlights, outcomes } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const project = await Project.create({
      title,
      category: category || 'SOC & Defensive Security',
      description,
      tags: Array.isArray(tags) ? tags : [],
      githubUrl: githubUrl || null,
      architectureKey: architectureKey || null,
      featured: featured !== undefined ? featured : true,
      displayOrder: displayOrder || 0,
      highlights: Array.isArray(highlights) ? highlights : [],
      outcomes: Array.isArray(outcomes) ? outcomes : [],
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project by ID
 * @access  Private (Admin Only)
 */
export const updateProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project ID format.' });
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project by ID
 * @access  Private (Admin Only)
 */
export const deleteProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently offline. Please start MongoDB to perform write operations.',
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project ID format.' });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
