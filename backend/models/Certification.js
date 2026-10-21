import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certification title is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Certification issuer is required'],
      trim: true,
    },
    issued: {
      type: String,
      required: [true, 'Issue date is required'],
      trim: true,
    },
    expires: {
      type: String,
      trim: true,
      default: null,
    },
    credentialId: {
      type: String,
      trim: true,
      default: null,
    },
    verificationUrl: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'in-progress', 'archived'],
      default: 'active',
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

certificationSchema.index({ displayOrder: 1, createdAt: -1 });

export const Certification = mongoose.model('Certification', certificationSchema);
