import { Schema, model, Document } from "mongoose";

export interface IPrivacyPolicy extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const privacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const PrivacyPolicy = model<IPrivacyPolicy>("PrivacyPolicy", privacyPolicySchema);
