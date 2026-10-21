import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
    },
    skills: {
      type: [String],
      required: [true, 'Skill list is required'],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ displayOrder: 1, createdAt: -1 });

export const Skill = mongoose.model('Skill', skillSchema);
