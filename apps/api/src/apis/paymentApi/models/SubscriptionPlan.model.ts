import { Schema, model, Document } from 'mongoose';

export interface ISubscriptionPlan extends Document {
  name: string;
  price: number;
  currency: string; // ISO 4217 code, e.g. "USD"
  billingInterval: 'month' | 'year';
  isActive: boolean;
  trialDays?: number;
  features: string[];
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
      maxlength: [100, 'Plan name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be 0 or more'],
    },
    currency: {
      type: String,
      required: [true, 'Currency code is required'],
      uppercase: true,
      minlength: 3,
      maxlength: 3,
      default: 'USD',
      match: /^[A-Z]{3}$/, // ISO 4217 currency code validation
    },
    billingInterval: {
      type: String,
      required: true,
      enum: ['month', 'year'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    trialDays: {
      type: Number,
      min: [0, 'Trial days must be at least 0'],
      max: [365, 'Trial days cannot exceed 365'],
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.every(f => typeof f === 'string'),
        message: 'Features must be an array of strings',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const SubscriptionPlan = model<ISubscriptionPlan>(
  'SubscriptionPlan',
  subscriptionPlanSchema
);
