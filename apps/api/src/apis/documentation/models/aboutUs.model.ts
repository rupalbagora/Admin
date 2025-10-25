import mongoose, { Document, Schema } from "mongoose";

export interface IAboutUs extends Document {
  title: string;
  content: string;
  updatedAt: Date;
}

const AboutUsSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const AboutUs = mongoose.model<IAboutUs>("AboutUs", AboutUsSchema);
