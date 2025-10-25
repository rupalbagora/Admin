import { Schema, model, Document } from "mongoose";

export interface ITermsCondition extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const termsConditionSchema = new Schema<ITermsCondition>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const TermsCondition = model<ITermsCondition>("TermsCondition", termsConditionSchema);
