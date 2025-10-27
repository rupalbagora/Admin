import { Schema, model, Document } from "mongoose";

export interface ITermsCondition extends Document {
  title: string;
  content: string;
  accepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const termsConditionSchema = new Schema<ITermsCondition>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    accepted:{type:Boolean,default:false},
  },
  { timestamps: true }
);

export const TermsCondition = model<ITermsCondition>("TermsCondition", termsConditionSchema);
