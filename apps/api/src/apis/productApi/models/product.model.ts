import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: string;
  offer?: string;
  rating?: string;
  tag?: string;
  image: string; // single image URL
  addedBy?: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    offer: { type: String },
    rating: { type: String },
    tag: { type: String },
    image: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
