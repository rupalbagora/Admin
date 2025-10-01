import mongoose, { Schema, Document } from 'mongoose';

export type Feature = 'attendance' | 'timeTable' | 'exam';

export interface ISubscription extends Document {
  startDate: Date;
  endDate: Date;
  amount: number;
  studentLimit: number;
  staffLimit: number;
  features: Feature[];
}

const subscriptionSchema = new Schema<ISubscription>({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  studentLimit: {
    type: Number,
    required: true,
    min: 0
  },
  staffLimit: {
    type: Number,
    required: true,
    min: 0
  },
  features: {
    type: [String],
    enum: ['attendance', 'timeTable', 'exam'],
    required: true,
    default: []
  }
}, { timestamps: true });

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);
