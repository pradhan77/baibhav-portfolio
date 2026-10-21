import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
      default: 'SOC & Defensive Security',
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'At least one tag is required'],
      default: [],
    },
    githubUrl: {
      type: String,
      trim: true,
      default: null,
    },
    architectureKey: {
      type: String,
      trim: true,
      default: null, // e.g. 'wazuh-lab' or 'ssh-sentinel'
    },
    featured: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    highlights: {
      type: [String],
      default: [],
    },
    outcomes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Optimize query ordering
projectSchema.index({ displayOrder: 1, createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);
