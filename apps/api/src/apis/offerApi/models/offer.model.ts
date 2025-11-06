import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOffer extends Document {
  title: string;
  discount: string;
  date: string;
  description?: string;
  gender: string;
  imageUrl: string;
  addedBy: Types.ObjectId;
}

const offerSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true },
    discount: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    gender: { type: String, required: true, default: "male" },
    imageUrl: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Offer = mongoose.model<IOffer>("Offer", offerSchema);
export default Offer;