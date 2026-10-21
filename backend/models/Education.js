import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree name is required'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    affiliation: {
      type: String,
      trim: true,
      default: 'Coventry University (UK Affiliated)',
    },
    period: {
      type: String,
      trim: true,
      default: '2023 - Present',
    },
    location: {
      type: String,
      trim: true,
      default: 'Kathmandu, Nepal',
    },
    currentYear: {
      type: String,
      trim: true,
      default: '3rd Year Student',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    modules: {
      type: [moduleSchema],
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

educationSchema.index({ displayOrder: 1, createdAt: -1 });

export const Education = mongoose.model('Education', educationSchema);
